# 🧪 SynthMed — Local Testing Guide

Panduan menjalankan SynthMed di localhost untuk testing sebelum deploy ke production.

---

## ✅ Prerequisites

- Python 3.8+ (cek: `python --version`)
- Virtual environment sudah ada (`.venv/`)
- Node.js Optional (untuk Live Server)

---

## 🚀 Step 1: Setup Backend

### 1.1 Aktivasi Virtual Environment
```bash
# Windows (PowerShell)
.\.venv\Scripts\Activate.ps1

# Windows (Command Prompt)
.venv\Scripts\activate.bat

# Linux/Mac
source .venv/bin/activate
```

### 1.2 Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

**Expected output:**
```
Successfully installed fastapi-0.115.* uvicorn-0.30.* sdv-1.17.* sdmetrics-0.14.0 pandas-2.2.* numpy-1.26.* slowapi-0.1.*
```

### 1.3 Jalankan Backend Server
```bash
cd ..
uvicorn backend.app:app --host 127.0.0.1 --port 8000 --log-level info
```

Catatan:
- Untuk proses training yang lama, hindari `--reload` karena restart otomatis dapat memutus stream dan menghapus state session di memori.

**Expected output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

✅ **Backend ready!** Buka http://localhost:8000 di browser → Anda seharusnya bisa lihat JSON response

---

## 🎨 Step 2: Setup Frontend

### Option A: Menggunakan Live Server (VS Code)

**Paling mudah!**

1. Install extension: **Live Server** (by Ritwick Dey)
2. Right-click pada `index.html` → "Open with Live Server"
3. Browser akan otomatis buka `http://localhost:5500`

### Option B: Menggunakan Python SimpleHTTPServer

```bash
# Buka terminal baru (jangan henti backend)
# Pastikan sudah di folder root (d:\PWEB\ETS)

python -m http.server 5500 --bind 127.0.0.1
```

**Expected output:**
```
Serving HTTP on 127.0.0.1 port 5500 (http://127.0.0.1:5500/)
```

### Option C: Menggunakan Node.js http-server

```bash
npm install -g http-server
http-server -p 5500
```

---

## 📋 Step 3: Cek Backend Health

Buka terminal baru dan jalankan:

```bash
curl http://localhost:8000/
```

**Expected response:**
```json
{
  "status": "online",
  "service": "SynthMed GAN API v3.0 — Optimized",
  "active_sessions": 0
}
```

---

## 🧪 Step 4: Test Full Workflow

### 4.1 Buka Frontend
- **Browser Access:** http://localhost:5500/
- **Halaman Utama:** index.html (landing page)
- **Dokumentasi:** http://localhost:5500/docs.html
- **Synthesizer:** http://localhost:5500/synthesize.html

### 4.2 Test Upload Data

1. Buka **synthesize.html**
2. Klik "Browse Files" atau drag-drop `sample_dataset.csv`
3. File berhasil di-upload → lanjut ke Step 2

### 4.3 Test Synthesis

1. **Step 2:** Pilih kolom target, tolak beberapa kolom (test column filtering)
2. **Step 3:** 
   - Pilih multiplier (misal 3x)
   - Pilih model (CTGAN atau TVAE)
   - Set epochs (300-500)
3. Klik "Mulai Sintesis"

### 4.4 Monitor Backend Logs

Di terminal backend, Anda seharusnya lihat:
```
INFO:SynthMedAPI:Preprocessing: 1000 → 985 rows (15 removed)
INFO:SynthMedAPI:Metadata OK: 8 kolom terdeteksi
...
INFO:SynthMedAPI:Training CTGAN... [############] 100%
INFO:SynthMedAPI:Quality metrics computed
```

### 4.5 Test Results

- ✅ Download CSV (synthetic data)
- ✅ Lihat quality report
- ✅ Compare charts (original vs synthetic)

---

## 🛠️ Step 5: Test Rate Limiting (Optional)

Buka terminal baru dan jalankan:

```bash
# Test 6 requests cepat (limit adalah 5 per jam)
for i in {1..6}; do
  echo "Request $i..."
  curl -X POST http://localhost:8000/train-gan \
    -F "file=@sample_dataset.csv" \
    -F "epochs=100" \
    -F "model_type=ctgan"
  echo ""
done
```

**Expected:** Request ke-6 akan error (429 Too Many Requests)

---

## 📊 Architecture Lokal

```
┌─────────────────────────────────────────────────────┐
│ Browser: http://localhost:5500                      │
│ (Frontend: HTML, CSS, JavaScript)                   │
└────────────────────┬────────────────────────────────┘
                     │ XHR/Fetch
                     ↓
┌─────────────────────────────────────────────────────┐
│ Backend: http://localhost:8000                      │
│ /train-gan          (POST) - Upload & train         │
│ /synthesize-gan     (POST) - Generate synthetic     │
│ /health-check       (GET)  - Status                 │
└─────────────────────────────────────────────────────┘
```

---

## 🐛 Troubleshooting

### Error: "Port 8000 already in use"
```bash
# Windows (PowerShell)
# Lihat proses yang listen di port 8000
Get-NetTCPConnection -LocalPort 8000 -State Listen | Select-Object LocalAddress,LocalPort,OwningProcess

# Kill prosesnya (ganti <PID> sesuai output)
Stop-Process -Id <PID> -Force

# Catatan: jangan pakai variabel $pid (PowerShell punya variabel otomatis $PID yang read-only).

# macOS/Linux
# lsof -i :8000 -sTCP:LISTEN -n -P
# kill -9 <PID>
```

### Error: "ModuleNotFoundError: No module named 'sdv'"
```bash
# Pastikan virtual env aktif
.venv\Scripts\Activate.ps1

# Re-install dependencies
pip install -r backend/requirements.txt
```

### Error: "CORS error di browser"
- Pastikan backend running di `http://localhost:8000`
- Check browser console (F12) untuk error detail
- CORS sudah configure untuk `localhost` di app.py

### Error: "API_BASE is empty production"
Di `synthesize.js` line 5, pastikan:
```javascript
const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:8000' 
  : '';
```

Untuk localhost, harus return `'http://localhost:8000'`

### Backend tidak respond/timeout
- Cek CPU usage (training model membutuhkan resource)
- Coba dataset lebih kecil untuk testing awal
- Kurangi `epochs` (misal 100 saja untuk test)

---

## 📝 Testing Checklist

Sebelum declare "siap deploy", pastikan semua ini bekerja:

- [ ] **Frontend Loading:** Semua halaman bisa di-access
  - [ ] index.html
  - [ ] docs.html
  - [ ] synthesize.html

- [ ] **Backend Health:** curl health-check berhasil
  - [ ] Status: online
  - [ ] Active sessions: 0

- [ ] **Upload Data:**
  - [ ] Drag-drop CSV accepted
  - [ ] Metadata detected
  - [ ] Columns listed

- [ ] **Column Selection:**
  - [ ] Bisa pilih/deselect kolom
  - [ ] "Next" button enabled saat ada kolom terpilih

- [ ] **Model Training:**
  - [ ] CTGAN training works
  - [ ] TVAE training works
  - [ ] Progress bar update real-time
  - [ ] Training selesai, masuk Step 4

- [ ] **Synthesis:**
  - [ ] Data baru di-generate
  - [ ] Jumlah row sesuai multiplier
  - [ ] Kolom sesuai selection

- [ ] **Quality Report:**
  - [ ] Score ditampilkan
  - [ ] Fallback mode works (jika SDMetrics error)
  - [ ] Charts render proper

- [ ] **Download:**
  - [ ] CSV bisa di-download
  - [ ] File format correct
  - [ ] Data lengkap

- [ ] **Mobile:**
  - [ ] Responsive di mobile (shrink browser window)
  - [ ] Touch/tap works

- [ ] **Error Handling:**
  - [ ] Upload invalid file → error message
  - [ ] Network error → fallback UI
  - [ ] Session timeout → clear state

- [ ] **Performance:**
  - [ ] Small dataset (<500 rows): < 1 minute training
  - [ ] Large dataset (>5000 rows): < 3 minutes training
  - [ ] No memory leaks (check browser DevTools)

---

## 🎯 Common Test Scenarios

### Scenario 1: Quick Test (5 min)
```
1. Upload sample_dataset.csv
2. Select all columns
3. CTGAN, 2x multiplier, 100 epochs
4. Generate → Download
5. Check result
```

### Scenario 2: Full Test (15 min)
```
1. Upload sample_dataset.csv
2. Deselect 2-3 columns (test filtering)
3. TVAE (test model switch), 5x multiplier, 300 epochs
4. Generate → Download
5. Check quality report
6. Refresh page → test session cleanup
```

### Scenario 3: Stress Test (optional)
```
1. Upload large file (>20MB or >10k rows)
2. High multiplier (50x)
3. High epochs (800)
4. Monitor CPU/Memory
5. Check timeout handling
```

---

## 📚 File untuk Testing

Sudah ada `sample_dataset.csv` di root folder. Kalau mau test dengan data lain:

1. Buat CSV dengan format:
```
colA,colB,colC
1,john,100.5
2,jane,200.3
```

2. Upload ke synthesizer

---

## ✅ Semuanya Siap?

Kalau semua checklist ✅, berarti siap untuk:
1. Berpindah ke environment else (staging/UAT)
2. Final production deployment

---

## 📞 Quick Command Reference

```bash
# Terminal 1: Backend
.venv\Scripts\Activate.ps1
uvicorn backend.app:app --host 127.0.0.1 --port 8000 --log-level info

# Terminal 2: Frontend (vs code - right-click index.html)
# Or:
python -m http.server 5500 --bind 127.0.0.1

# Terminal 3: Testing
curl http://localhost:8000/
curl http://localhost:5500/
```

---

**Status:** Ready untuk local testing  
**Next:** Setelah all tests ✅, siap untuk deploy!
