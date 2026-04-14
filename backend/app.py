from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from sdv.single_table import CTGANSynthesizer, TVAESynthesizer
from sdv.metadata import SingleTableMetadata
from sdmetrics.reports.single_table import QualityReport
from sdmetrics.single_column import KSComplement, TVComplement
from sdmetrics.column_pairs import CorrelationSimilarity
import pandas as pd
import numpy as np
import io
import logging
import time
import json
import asyncio
import threading
import queue

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("SynthMedAPI")

app = FastAPI(title="SynthMed GAN API v3.0 — Optimized")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =============================================
# Global State
# =============================================
synthesizer = None
training_df = None       # Keep original dataframe for evaluation
training_metadata = None # Keep metadata for evaluation

# =============================================
# Mathematical Foundation:
#
# CTGAN Loss (Adversarial Min-Max):
#   min_G max_D V(D,G) = E[log D(x)] + E[log(1 - D(G(z)))]
#
# TVAE Loss (ELBO = Reconstruction + KL-Divergence):
#   L = L_reconstruction + β · D_KL(q(z|x) || p(z))
#   D_KL = -0.5 * Σ(1 + log(σ²) - μ² - σ²)
#
# Quality Metrics:
#   KSComplement = 1 - sup|F_real(x) - F_synth(x)|
#   TVComplement = 1 - 0.5 * Σ|p_i - q_i|
#   CorrelationSimilarity = 1 - |r_real - r_synth|
# =============================================

def get_optimized_params(model_type: str, n_rows: int, n_cols: int, epochs: int):
    """
    Return optimized hyperparameters based on dataset size.
    
    For small datasets (< 500 rows):
      - Smaller embedding to prevent overfitting in latent space
      - More discriminator steps for stronger gradient signal to G
      - Lower learning rates for stable convergence
    
    For medium datasets (500-5000 rows):
      - Standard embedding with moderate tuning
    
    For large datasets (> 5000 rows):
      - Larger capacity networks
    """
    if model_type.lower() == "tvae":
        # TVAE: Variational Autoencoder approach
        # Loss = Reconstruction(MSE + CrossEntropy) + β·KL_Divergence
        if n_rows < 500:
            return {
                "epochs": epochs,
                "batch_size": min(100, n_rows),
                "embedding_dim": 64,
                "compress_dims": (64, 64),
                "decompress_dims": (64, 64),
                "l2scale": 1e-5,       # L2 regularization to prevent overfitting
                "loss_factor": 2,       # Weight for reconstruction vs KL
                "enforce_min_max_values": True,
                "enforce_rounding": True,
            }
        elif n_rows < 5000:
            return {
                "epochs": epochs,
                "batch_size": min(256, n_rows),
                "embedding_dim": 128,
                "compress_dims": (128, 128),
                "decompress_dims": (128, 128),
                "l2scale": 1e-5,
                "loss_factor": 2,
                "enforce_min_max_values": True,
                "enforce_rounding": True,
            }
        else:
            return {
                "epochs": epochs,
                "batch_size": min(500, n_rows),
                "embedding_dim": 256,
                "compress_dims": (256, 256),
                "decompress_dims": (256, 256),
                "l2scale": 1e-6,
                "loss_factor": 2,
                "enforce_min_max_values": True,
                "enforce_rounding": True,
            }
    else:
        # CTGAN: Adversarial approach  
        # Loss_D = -E[log D(x)] - E[log(1 - D(G(z)))]
        # Loss_G = -E[log D(G(z))]
        if n_rows < 500:
            return {
                "epochs": epochs,
                "batch_size": min(100, n_rows),
                "embedding_dim": 64,
                "generator_dim": (128, 128),
                "discriminator_dim": (128, 128),
                "generator_lr": 1e-4,         # Lower LR = more stable
                "discriminator_lr": 1e-4,
                "discriminator_steps": 5,      # More D updates per G update
                "pac": 1,                      # Better for small datasets
                "enforce_min_max_values": True,
                "enforce_rounding": True,
                "verbose": True,
            }
        elif n_rows < 5000:
            return {
                "epochs": epochs,
                "batch_size": min(256, n_rows),
                "embedding_dim": 128,
                "generator_dim": (256, 256),
                "discriminator_dim": (256, 256),
                "generator_lr": 2e-4,
                "discriminator_lr": 2e-4,
                "discriminator_steps": 3,
                "pac": 1,
                "enforce_min_max_values": True,
                "enforce_rounding": True,
                "verbose": True,
            }
        else:
            return {
                "epochs": epochs,
                "batch_size": min(500, n_rows),
                "embedding_dim": 256,
                "generator_dim": (256, 256),
                "discriminator_dim": (256, 256),
                "generator_lr": 2e-4,
                "discriminator_lr": 2e-4,
                "discriminator_steps": 1,
                "pac": 10,
                "enforce_min_max_values": True,
                "enforce_rounding": True,
                "verbose": True,
            }


def preprocess_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    """
    Clean and preprocess the dataframe before training.
    - Remove fully empty rows/columns
    - Remove duplicate rows
    - Handle infinite values
    """
    original_rows = len(df)
    
    # Remove completely empty columns
    df = df.dropna(axis=1, how='all')
    
    # Remove completely empty rows
    df = df.dropna(how='all')
    
    # Remove exact duplicate rows
    df = df.drop_duplicates()
    
    # Replace infinite values with NaN, then forward-fill
    df = df.replace([np.inf, -np.inf], np.nan)
    
    # For remaining NaN in numeric columns, fill with column median
    for col in df.select_dtypes(include=[np.number]).columns:
        if df[col].isna().any():
            df[col] = df[col].fillna(df[col].median())
    
    # For remaining NaN in string columns, fill with mode
    for col in df.select_dtypes(include=['object']).columns:
        if df[col].isna().any():
            mode_val = df[col].mode()
            if len(mode_val) > 0:
                df[col] = df[col].fillna(mode_val[0])
    
    cleaned_rows = len(df)
    logger.info(f"Preprocessing: {original_rows} → {cleaned_rows} rows ({original_rows - cleaned_rows} removed)")
    
    return df.reset_index(drop=True)


def compute_quality_metrics(real_df: pd.DataFrame, synthetic_df: pd.DataFrame, metadata: SingleTableMetadata):
    """
    Compute quality metrics using SDMetrics library.
    
    Uses three complementary metrics:
    
    1. KSComplement (numerical columns):
       Score = 1 - sup|F_real(x) - F_synth(x)| 
       Based on Kolmogorov-Smirnov test statistic
    
    2. TVComplement (categorical columns):
       Score = 1 - 0.5 * Σ|p_i - q_i|
       Based on Total Variation Distance
    
    3. CorrelationSimilarity (column pairs):
       Score = 1 - |r_real - r_synth|
       Based on Pearson correlation coefficient comparison
    """
    results = {
        "overall_score": 0,
        "column_shapes_score": 0,
        "column_pair_trends_score": 0,
        "column_details": [],
        "pair_details": [],
    }
    
    try:
        # Get metadata dict for sdmetrics
        meta_dict = metadata.to_dict()
        
        # Generate full quality report
        report = QualityReport()
        report.generate(real_df, synthetic_df, meta_dict)
        
        def safe_float(val, default=0):
            """Convert NaN/inf to a safe default for JSON serialization."""
            import math
            try:
                f = float(val)
                return default if (math.isnan(f) or math.isinf(f)) else f
            except (TypeError, ValueError):
                return default
        
        overall = safe_float(report.get_score(), 0)
        results["overall_score"] = round(overall * 100, 1)
        
        # Column shapes breakdown
        try:
            shapes_details = report.get_details(property_name='Column Shapes')
            scores = [safe_float(s) for s in shapes_details['Score']]
            results["column_shapes_score"] = round(
                (sum(scores) / len(scores)) * 100, 1
            ) if len(scores) > 0 else 0
            
            for _, row in shapes_details.iterrows():
                results["column_details"].append({
                    "column": str(row.get("Column", "")),
                    "metric": str(row.get("Metric", "")),
                    "score": round(safe_float(row.get("Score", 0)) * 100, 1)
                })
        except Exception as e:
            logger.warning(f"Column shapes error: {e}")
        
        # Column pair trends breakdown
        try:
            pairs_details = report.get_details(property_name='Column Pair Trends')
            pair_scores = [safe_float(s) for s in pairs_details['Score']]
            results["column_pair_trends_score"] = round(
                (sum(pair_scores) / len(pair_scores)) * 100, 1
            ) if len(pair_scores) > 0 else 0
            
            for _, row in pairs_details.iterrows():
                col1 = str(row.get("Column 1", ""))
                col2 = str(row.get("Column 2", ""))
                results["pair_details"].append({
                    "columns": f"{col1} ↔ {col2}",
                    "metric": str(row.get("Metric", "")),
                    "score": round(safe_float(row.get("Score", 0)) * 100, 1)
                })
        except Exception as e:
            logger.warning(f"Column pair trends error: {e}")
            
    except Exception as e:
        logger.error(f"Quality metrics error: {e}")
        import traceback
        traceback.print_exc()
        results["overall_score"] = -1  # Signal error
        results["error"] = str(e)
    
    return results


# =============================================
# API Endpoints
# =============================================

@app.get("/")
async def health_check():
    return {"status": "online", "service": "SynthMed GAN Backend v3.0 — Optimized"}

@app.post("/train-gan")
async def train_gan(
    file: UploadFile = File(...), 
    epochs: int = Form(300),
    model_type: str = Form("ctgan")
):
    msg_queue = queue.Queue()

    def run_training():
        global synthesizer, training_df, training_metadata
        try:
            # Step 1: Read & Preprocess CSV
            msg_queue.put({"type": "status", "step": 1, "message": "Membaca file CSV..."})
            content = file.file.read()
            df = pd.read_csv(io.BytesIO(content))
            
            msg_queue.put({"type": "status", "step": 1, "message": f"Data dimuat: {len(df)} baris, {len(df.columns)} kolom"})
            time.sleep(0.2)
            
            # Preprocess
            msg_queue.put({"type": "status", "step": 1, "message": "Preprocessing data (cleaning, deduplicate)..."})
            df = preprocess_dataframe(df)
            
            n_rows, n_cols = len(df), len(df.columns)
            
            # Step 2: Metadata Detection
            msg_queue.put({"type": "status", "step": 2, "message": "Menganalisis metadata & distribusi kolom..."})
            metadata = SingleTableMetadata()
            metadata.detect_from_dataframe(df)
            
            # Store for evaluation later
            training_df = df.copy()
            training_metadata = metadata
            
            msg_queue.put({"type": "status", "step": 2, "message": f"Metadata OK: {n_cols} kolom terdeteksi"})
            time.sleep(0.2)
            
            # Step 3: Get optimized parameters & Initialize
            params = get_optimized_params(model_type, n_rows, n_cols, epochs)
            
            param_summary = f"embedding={params.get('embedding_dim', 128)}"
            if model_type.lower() != "tvae":
                param_summary += f", disc_steps={params.get('discriminator_steps', 1)}"
                param_summary += f", lr={params.get('generator_lr', 2e-4)}"
            
            msg_queue.put({
                "type": "status", "step": 3, 
                "message": f"Inisialisasi {model_type.upper()} ({param_summary})..."
            })
            
            if model_type.lower() == "tvae":
                synthesizer = TVAESynthesizer(metadata, **params)
            else:
                synthesizer = CTGANSynthesizer(metadata, **params)
            
            # Signal training start
            msg_queue.put({
                "type": "training_start", 
                "message": f"Training {model_type.upper()} ({epochs} epochs, {n_rows} baris)...",
                "epochs": epochs,
                "model": model_type.upper(),
                "params": {k: str(v) for k, v in params.items()}
            })
            
            start_time = time.time()
            synthesizer.fit(df)
            elapsed = round(time.time() - start_time, 1)
            
            logger.info(f"Training completed in {elapsed}s with params: {params}")
            
            msg_queue.put({
                "type": "complete", 
                "message": f"Training selesai dalam {elapsed} detik!",
                "elapsed": elapsed,
                "rows": n_rows
            })
            
        except Exception as e:
            logger.error(f"Training error: {str(e)}")
            import traceback
            traceback.print_exc()
            msg_queue.put({"type": "error", "message": str(e)})
        finally:
            msg_queue.put(None)

    threading.Thread(target=run_training, daemon=True).start()

    async def event_generator():
        try:
            while True:
                try:
                    msg = msg_queue.get_nowait()
                    if msg is None:
                        break
                    yield json.dumps(msg) + "\n"
                except queue.Empty:
                    await asyncio.sleep(0.2)
                    continue
        except asyncio.CancelledError:
            logger.info("Client disconnected during streaming")
            return
        except GeneratorExit:
            logger.info("Generator closed by client")
            return

    return StreamingResponse(event_generator(), media_type="application/x-ndjson")


@app.post("/synthesize-gan")
async def synthesize_gan(num_rows: int = Form(1000)):
    global synthesizer
    if synthesizer is None:
        raise HTTPException(status_code=400, detail="Synthesizer belum dilatih!")
    
    try:
        logger.info(f"Generating {num_rows} synthetic rows...")
        synthetic_df = synthesizer.sample(num_rows=num_rows)
        data = synthetic_df.to_dict(orient="records")
        logger.info(f"Successfully generated {len(data)} rows")
        return {
            "synthetic_data": data,
            "total_rows": len(data),
            "method": str(type(synthesizer).__name__),
            "quality": "high"
        }
    except Exception as e:
        logger.error(f"Synthesis error: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Gagal generate data: {str(e)}")


@app.post("/evaluate")
async def evaluate_quality(num_rows: int = Form(0)):
    """
    Evaluate synthetic data quality using SDMetrics.
    
    Mathematical basis:
    - KSComplement: 1 - Kolmogorov-Smirnov statistic (numerical)
    - TVComplement: 1 - Total Variation Distance (categorical)
    - CorrelationSimilarity: 1 - |r_real - r_synth| (pairs)
    
    Returns overall quality score and per-column breakdown.
    """
    global synthesizer, training_df, training_metadata
    
    if synthesizer is None or training_df is None:
        raise HTTPException(status_code=400, detail="Model belum dilatih!")
    
    try:
        # Generate synthetic data for evaluation
        eval_rows = num_rows if num_rows > 0 else len(training_df)
        logger.info(f"Evaluating quality with {eval_rows} synthetic rows...")
        
        synthetic_df = synthesizer.sample(num_rows=eval_rows)
        
        # Compute SDMetrics quality scores
        metrics = compute_quality_metrics(training_df, synthetic_df, training_metadata)
        
        logger.info(f"Quality evaluation complete: {metrics['overall_score']}% overall")
        
        return {
            "overall_score": metrics["overall_score"],
            "column_shapes_score": metrics["column_shapes_score"],
            "column_pair_trends_score": metrics["column_pair_trends_score"],
            "column_details": metrics["column_details"],
            "pair_details": metrics["pair_details"],
            "eval_rows": eval_rows,
            "method": str(type(synthesizer).__name__),
        }
    except Exception as e:
        logger.error(f"Evaluation error: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Gagal evaluasi: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
