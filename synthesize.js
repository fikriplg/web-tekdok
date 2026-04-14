// ===== SYNTHMED SYNTHESIZER - AI NEURAL CORE =====

let originalData = [];
let originalHeaders = [];
let syntheticData = [];
let selectedColumns = [];
let multiplier = 2;
let colStats = [];

document.addEventListener('DOMContentLoaded', () => {
  initUpload();
  initConfig();
  initNavToggle();
  initTabs();
});

// ===== NAVIGATION =====
function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('active');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    toggle.classList.remove('active');
    links.classList.remove('active');
  }));
}

// ===== STEP 1: FILE UPLOAD =====
function initUpload() {
  const zone = document.getElementById('uploadZone');
  const input = document.getElementById('fileInput');
  const browse = document.getElementById('btnBrowse');
  const remove = document.getElementById('btnRemove');
  const next1 = document.getElementById('btnNext1');

  if (!zone) return;

  // Click to browse
  zone.addEventListener('click', (e) => {
    if (e.target !== browse) input.click();
  });
  browse.addEventListener('click', (e) => {
    e.stopPropagation();
    input.click();
  });

  // Drag & drop
  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) handleFile(file);
  });

  // File selected
  input.addEventListener('change', (e) => {
    if (e.target.files[0]) handleFile(e.target.files[0]);
  });

  // Remove file
  remove.addEventListener('click', resetUpload);

  // Next button
  next1.addEventListener('click', () => {
    if (originalData.length > 0) goToStep(2);
  });

  // Sample data button
  const sampleBtn = document.getElementById('btnSample');
  if (sampleBtn) {
    sampleBtn.addEventListener('click', () => {
      const sampleCSV = `patient_id,age,gender,blood_pressure_systolic,blood_pressure_diastolic,heart_rate,cholesterol_total,blood_sugar,bmi,diagnosis
P001,45,Laki-laki,130,85,78,210,105,27.3,Hipertensi
P002,62,Perempuan,145,92,82,245,180,31.2,Diabetes Mellitus
P003,38,Laki-laki,120,78,72,190,95,24.1,Normal
P004,55,Perempuan,138,88,75,230,110,28.7,Hipertensi
P005,71,Laki-laki,155,95,88,260,210,29.5,Diabetes Mellitus
P006,29,Perempuan,115,72,68,175,88,22.4,Normal
P007,48,Laki-laki,142,90,80,225,130,26.8,Hipertensi
P008,66,Perempuan,150,93,85,250,195,30.1,Diabetes Mellitus
P009,34,Laki-laki,118,75,70,185,92,23.5,Normal
P010,52,Perempuan,135,86,76,215,108,27.9,Hipertensi
P011,43,Laki-laki,128,82,74,200,98,25.6,Normal
P012,68,Perempuan,148,94,86,255,205,31.8,Diabetes Mellitus
P013,41,Laki-laki,125,80,71,195,96,24.8,Normal
P014,57,Perempuan,140,89,79,235,145,29.2,Hipertensi
P015,73,Laki-laki,158,96,90,265,220,30.4,Diabetes Mellitus
P016,31,Perempuan,112,70,66,170,85,21.8,Normal
P017,50,Laki-laki,136,87,77,220,115,27.1,Hipertensi
P018,64,Perempuan,152,95,84,248,190,30.6,Diabetes Mellitus
P019,36,Laki-laki,122,76,69,188,90,23.2,Normal
P020,59,Perempuan,144,91,81,240,160,28.4,Hipertensi
P021,47,Laki-laki,132,84,76,208,102,26.5,Hipertensi
P022,70,Perempuan,156,97,89,258,215,31.5,Diabetes Mellitus
P023,33,Laki-laki,116,73,67,178,87,22.1,Normal
P024,54,Perempuan,139,88,78,228,125,28.9,Hipertensi
P025,65,Laki-laki,149,93,83,252,200,30.8,Diabetes Mellitus
P026,28,Perempuan,110,68,65,168,82,21.3,Normal
P027,46,Laki-laki,134,85,75,212,106,26.2,Hipertensi
P028,61,Perempuan,147,92,82,242,175,29.8,Diabetes Mellitus
P029,40,Laki-laki,124,79,73,192,94,24.5,Normal
P030,58,Perempuan,141,90,80,238,150,28.1,Hipertensi`;

      document.getElementById('fileName').textContent = 'sample_dataset.csv';
      document.getElementById('fileSize').textContent = '30 baris × 10 kolom';
      document.getElementById('fileInfo').classList.remove('hidden');
      document.getElementById('uploadZone').style.display = 'none';
      document.querySelector('.sample-divider').style.display = 'none';
      sampleBtn.style.display = 'none';
      parseCSV(sampleCSV);
    });
  }
}

function handleFile(file) {
  if (file.size > 10 * 1024 * 1024) {
    alert('File terlalu besar! Maksimal 10MB.');
    return;
  }

  document.getElementById('fileName').textContent = file.name;
  document.getElementById('fileSize').textContent = formatFileSize(file.size);
  document.getElementById('fileInfo').classList.remove('hidden');
  document.getElementById('uploadZone').style.display = 'none';

  const reader = new FileReader();
  reader.onload = (e) => {
    parseCSV(e.target.result);
  };
  reader.readAsText(file);
}

function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) { alert('File CSV harus memiliki minimal 2 baris (header + data)'); return; }

  originalHeaders = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  originalData = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === originalHeaders.length) {
      originalData.push(values);
    }
  }

  if (originalData.length === 0) { alert('Tidak ada data valid yang ditemukan.'); return; }

  showPreview();
  selectedColumns = [...originalHeaders];
  document.getElementById('btnNext1').classList.remove('disabled');
  document.getElementById('btnNext1').disabled = false;
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') inQuotes = !inQuotes;
    else if (ch === ',' && !inQuotes) { result.push(current.trim()); current = ''; }
    else current += ch;
  }
  result.push(current.trim());
  return result;
}

function showPreview() {
  const table = document.getElementById('previewTable');
  const preview = document.getElementById('dataPreview');
  const summary = document.getElementById('dataSummary');

  let html = '<thead><tr>';
  originalHeaders.forEach(h => html += `<th>${escapeHtml(h)}</th>`);
  html += '</tr></thead><tbody>';

  const previewRows = originalData.slice(0, 5);
  previewRows.forEach(row => {
    html += '<tr>';
    row.forEach(val => html += `<td>${escapeHtml(val)}</td>`);
    html += '</tr>';
  });
  html += '</tbody>';
  table.innerHTML = html;

  const numericCount = originalHeaders.filter((_, i) => isNumericColumn(i)).length;
  summary.innerHTML = `
    <span>📋 <strong>${originalHeaders.length}</strong> kolom</span>
    <span>📊 <strong>${originalData.length}</strong> baris</span>
    <span>🔢 <strong>${numericCount}</strong> kolom numerik</span>
    <span>📝 <strong>${originalHeaders.length - numericCount}</strong> kolom kategorikal</span>
  `;
  preview.classList.remove('hidden');
}

function resetUpload() {
  originalData = [];
  originalHeaders = [];
  document.getElementById('fileInput').value = '';
  document.getElementById('fileInfo').classList.add('hidden');
  document.getElementById('dataPreview').classList.add('hidden');
  document.getElementById('uploadZone').style.display = '';
  document.getElementById('btnNext1').classList.add('disabled');
  document.getElementById('btnNext1').disabled = true;
}

// ===== STEP 2: CONFIGURATION =====
function initConfig() {
  const multPlus = document.getElementById('multPlus');
  const multMinus = document.getElementById('multMinus');
  const back2 = document.getElementById('back2');
  const next2 = document.getElementById('next2');
  const epochSlider = document.getElementById('epochSlider');

  if (multPlus) {
    multPlus.addEventListener('click', () => { if (multiplier < 100) { multiplier++; updateMultiplier(); } });
    multMinus.addEventListener('click', () => { if (multiplier > 2) { multiplier--; updateMultiplier(); } });
  }

  if (epochSlider) {
    epochSlider.addEventListener('input', (e) => {
      document.getElementById('epochValue').textContent = e.target.value;
    });
  }

  if (back2) back2.addEventListener('click', () => goToStep(1));
  if (next2) {
    next2.addEventListener('click', () => {
      selectedColumns = [];
      document.querySelectorAll('.col-chip.selected').forEach(chip => {
        selectedColumns.push(chip.dataset.col);
      });
      if (selectedColumns.length === 0) { alert('Pilih minimal 1 kolom!'); return; }
      goToStep(3);
      startGeneration();
    });
  }
}

function updateMultiplier() {
  const multEl = document.getElementById('multValue');
  const estEl = document.getElementById('outputEstimate');
  if (multEl) multEl.textContent = multiplier;
  if (estEl) estEl.textContent = `Estimasi: ${(originalData.length * multiplier).toLocaleString('id-ID')} baris output`;
}

function buildColumnChips() {
  const list = document.getElementById('columnList');
  if (!list) return;
  list.innerHTML = '';
  originalHeaders.forEach((col, i) => {
    const type = isNumericColumn(i) ? 'num' : 'cat';
    const chip = document.createElement('div');
    chip.className = 'col-chip selected';
    chip.dataset.col = col;
    chip.innerHTML = `<span>${escapeHtml(col)}</span><span class="col-type">${type}</span>`;
    chip.addEventListener('click', () => chip.classList.toggle('selected'));
    list.appendChild(chip);
  });
}

// ===== STEP 3: GENERATION =====
let progressTimer = null;

async function startGeneration() {
  const totalTarget = originalData.length * multiplier;

  resetGenerationUI();
  document.getElementById('genStep1').classList.add('active');

  const formData = new FormData();
  let csvContent = originalHeaders.join(',') + '\n' + 
      originalData.map(row => row.map(v => `"${v}"`).join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
    
  const epochs = document.getElementById('epochSlider').value;
  const modelType = document.querySelector('input[name="ganModel"]:checked').value;
    
  formData.append('file', blob, 'dataset.csv');
  formData.append('epochs', epochs);
  formData.append('model_type', modelType);

  try {
    const response = await fetch('http://localhost:8000/train-gan', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error('Backend error: ' + response.status);

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let trainingDone = false;

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const msg = JSON.parse(line);
          handleStreamMessage(msg);
          if (msg.type === 'complete') trainingDone = true;
          if (msg.type === 'error') {
            stopProgressSimulation();
            alert('❌ Error backend: ' + msg.message);
            goToStep(2);
            return;
          }
        } catch(e) { console.warn('JSON parse error:', e, line); }
      }
    }

    stopProgressSimulation();

    if (trainingDone) {
      // Step 4: Fetch synthetic data
      updateStepUI(4, 50, 'Mengambil data sintetis dari model...');
      document.getElementById('genStep4').classList.add('active');
      await fetchSynthesis(totalTarget);
    } else {
      alert('❌ Training selesai tanpa konfirmasi dari server.');
      goToStep(2);
    }

  } catch (e) {
    stopProgressSimulation();
    console.error('Generation error:', e);
    alert('❌ Gagal menghubungi backend AI!\nPastikan server Python berjalan:\nuvicorn app:app --reload --port 8000');
    goToStep(2);
  }
}

function handleStreamMessage(msg) {
  const overall = document.getElementById('genOverallFill');
  const overallText = document.getElementById('genOverallText');

  if (msg.type === 'status') {
    const step = msg.step || 1;
    
    if (step === 1) {
      updateStepUI(1, 100, msg.message);
      overall.style.width = '15%';
      overallText.textContent = '15% selesai';
    } else if (step === 2) {
      // Mark step 1 done, activate step 2
      document.getElementById('genStep1').classList.add('done');
      document.getElementById('genStatus1').textContent = '✅';
      document.getElementById('genStep2').classList.add('active');
      updateStepUI(2, 100, msg.message);
      overall.style.width = '30%';
      overallText.textContent = '30% selesai';
    } else if (step === 3) {
      document.getElementById('genStep2').classList.add('done');
      document.getElementById('genStatus2').textContent = '✅';
      document.getElementById('genStep3').classList.add('active');
      updateStepUI(3, 10, msg.message);
      overall.style.width = '35%';
      overallText.textContent = '35% selesai';
    }
    
  } else if (msg.type === 'training_start') {
    // Mark steps 1,2 as done, step 3 active
    document.getElementById('genStep1').classList.add('done');
    document.getElementById('genStatus1').textContent = '✅';
    document.getElementById('genStep2').classList.add('done');
    document.getElementById('genStatus2').textContent = '✅';
    document.getElementById('genStep3').classList.add('active');
    
    updateStepUI(3, 5, msg.message);
    
    // Start simulated progress animation
    startProgressSimulation(msg.epochs || 300);
    
  } else if (msg.type === 'complete') {
    stopProgressSimulation();
    
    // Mark step 3 as done
    updateStepUI(3, 100, msg.message);
    document.getElementById('genStep3').classList.add('done');
    document.getElementById('genStatus3').textContent = '✅';
    
    // Activate step 4
    document.getElementById('genStep4').classList.add('active');
    updateStepUI(4, 30, 'Model siap, mengambil data...');
    
    overall.style.width = '85%';
    overallText.textContent = '85% selesai';
    
  } else if (msg.type === 'error') {
    stopProgressSimulation();
    console.error('Backend error:', msg.message);
  }
}

function startProgressSimulation(epochs) {
  let simProgress = 5;
  // Estimate: ~0.5s per epoch for small datasets, slower for large
  const estimatedSeconds = Math.max(10, epochs * 0.3);
  const incrementPerTick = 85 / (estimatedSeconds * 2); // tick every 500ms, go up to ~90%
  
  progressTimer = setInterval(() => {
    if (simProgress < 90) {
      simProgress += incrementPerTick * (1 - simProgress / 100); // slow down as it approaches 90%
      simProgress = Math.min(90, simProgress);
      
      updateStepUI(3, simProgress, `Neural Training: ${Math.round(simProgress)}%`);
      
      const overallVal = 35 + (simProgress * 0.5);
      document.getElementById('genOverallFill').style.width = overallVal + '%';
      document.getElementById('genOverallText').textContent = Math.round(overallVal) + '% selesai';
    }
  }, 500);
}

function stopProgressSimulation() {
  if (progressTimer) {
    clearInterval(progressTimer);
    progressTimer = null;
  }
}

async function fetchSynthesis(totalTarget) {
  try {
    const genRes = await axios.post('http://localhost:8000/synthesize-gan',
      new URLSearchParams({ num_rows: totalTarget.toString() })
    );
    syntheticData = genRes.data.synthetic_data.map(row => {
      return originalHeaders.map(h => row[h]);
    });
    
    updateStepUI(4, 100, 'Data sintetis berhasil dihasilkan!');
    document.getElementById('genStep4').classList.add('done');
    document.getElementById('genStatus4').textContent = '✅';
    document.getElementById('genOverallFill').style.width = '100%';
    document.getElementById('genOverallText').textContent = '100% Selesai! 🎉';
    
    setTimeout(() => { goToStep(4); showResults(); }, 1000);
  } catch (e) {
    console.error('Synthesis error:', e);
    alert('❌ Gagal men-generate data sintetis dari model.\nError: ' + (e.response?.data?.detail || e.message));
    goToStep(2);
  }
}


function updateStepUI(stepNum, percent, label) {
  const fill = document.getElementById(`genFill${stepNum}`);
  const labelEl = document.querySelector(`#genStep${stepNum} .gen-label`);
  if (fill) fill.style.width = percent + '%';
  if (labelEl && label) labelEl.textContent = label;
}

// ===== STEP 4: RESULTS =====
function showResults() {
  document.getElementById('totalRows').textContent = syntheticData.length.toLocaleString('id-ID');

  const table = document.getElementById('resultTable');
  let html = '<thead><tr>';
  originalHeaders.forEach(h => html += `<th>${escapeHtml(h)}</th>`);
  html += '</tr></thead><tbody>';
  syntheticData.slice(0, 10).forEach(row => {
    html += '<tr>';
    row.forEach(val => html += `<td>${escapeHtml(val)}</td>`);
    html += '</tr>';
  });
  html += '</tbody>';
  table.innerHTML = html;

  // Show loading state, then fetch real quality metrics from backend
  buildQualityReport();
  buildComparison();

  document.getElementById('btnDownload').addEventListener('click', downloadCSV);
  document.getElementById('btnNewSynthesis').addEventListener('click', () => {
    resetUpload();
    syntheticData = [];
    goToStep(1);
    resetGenerationUI();
  });
}

async function buildQualityReport() {
  const grid = document.getElementById('qualityGrid');
  
  // Show loading state
  grid.innerHTML = `
    <div class="quality-item" style="grid-column: 1/-1; padding: 32px;">
      <div class="quality-score good" style="font-size: 1.2rem;">⏳ Mengevaluasi kualitas...</div>
      <div class="quality-label">Menghitung KSComplement, TVComplement, CorrelationSimilarity via SDMetrics</div>
    </div>
  `;

  try {
    // Call backend SDMetrics evaluation
    const evalRes = await axios.post('http://localhost:8000/evaluate',
      new URLSearchParams({ num_rows: originalData.length.toString() })
    );
    
    const data = evalRes.data;
    const overall = data.overall_score;
    const shapesScore = data.column_shapes_score;
    const pairsScore = data.column_pair_trends_score;
    
    // Determine score class
    const scoreClass = (s) => s >= 80 ? 'good' : s >= 60 ? 'ok' : '';
    
    // Build quality grid with real SDMetrics scores
    let html = `
      <div class="quality-item">
        <div class="quality-score ${scoreClass(overall)}">${overall.toFixed(1)}%</div>
        <div class="quality-label">Skor Keseluruhan (SDMetrics)</div>
      </div>
      <div class="quality-item">
        <div class="quality-score ${scoreClass(shapesScore)}">${shapesScore.toFixed(1)}%</div>
        <div class="quality-label">Column Shapes (KS + TV)</div>
      </div>
      <div class="quality-item">
        <div class="quality-score ${scoreClass(pairsScore)}">${pairsScore.toFixed(1)}%</div>
        <div class="quality-label">Pair Trends (Korelasi)</div>
      </div>
      <div class="quality-item">
        <div class="quality-score good">${syntheticData.length.toLocaleString('id-ID')}</div>
        <div class="quality-label">Total Baris × ${multiplier}x</div>
      </div>
    `;
    
    // Per-column breakdown
    if (data.column_details && data.column_details.length > 0) {
      html += `
        <div class="quality-item full-width">
          <div style="font-weight:700; margin-bottom:12px; font-size:0.95rem;">📊 Skor Per Kolom</div>
          <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr)); gap:8px;">
      `;
      data.column_details.forEach(col => {
        const barColor = col.score >= 80 ? 'var(--emerald-400)' : col.score >= 60 ? '#f59e0b' : '#ef4444';
        html += `
          <div style="padding:8px 12px; background:rgba(13,148,136,0.04); border-radius:8px; border:1px solid rgba(13,148,136,0.08);">
            <div style="display:flex; justify-content:space-between; font-size:0.82rem; margin-bottom:4px;">
              <span style="color:var(--text-secondary);">${escapeHtml(col.column)}</span>
              <span style="font-weight:700; color:${barColor};">${col.score.toFixed(1)}%</span>
            </div>
            <div style="height:4px; background:rgba(148,163,184,0.1); border-radius:2px; overflow:hidden;">
              <div style="height:100%; width:${col.score}%; background:${barColor}; border-radius:2px;"></div>
            </div>
            <div style="font-size:0.7rem; color:var(--text-muted); margin-top:2px;">${col.metric}</div>
          </div>
        `;
      });
      html += `</div></div>`;
    }
    
    grid.innerHTML = html;
    
  } catch (e) {
    console.error('Quality evaluation error:', e);
    // Fallback to local estimation
    grid.innerHTML = `
      <div class="quality-item" style="grid-column: 1/-1;">
        <div class="quality-score ok">⚠️</div>
        <div class="quality-label">Gagal menghubungi evaluasi SDMetrics. Menggunakan estimasi lokal.</div>
      </div>
    `;
    buildQualityReportFallback();
  }
}

function buildQualityReportFallback() {
  // Fallback: use local mean/std comparison if backend evaluation fails
  const grid = document.getElementById('qualityGrid');
  colStats = analyzeColumns();
  const numericHeaders = originalHeaders.filter((_, i) => colStats[i].isNumeric);
  let totalSim = 0, count = 0;
  numericHeaders.forEach(header => {
    const idx = originalHeaders.indexOf(header);
    const stats = colStats[idx];
    const sv = syntheticData.map(r => parseFloat(r[idx])).filter(v => !isNaN(v));
    const sm = sv.reduce((a,b) => a+b, 0) / sv.length;
    const ss = Math.sqrt(sv.reduce((a,b) => a + (b-sm)**2, 0) / sv.length) || 0.01;
    const md = Math.abs(stats.mean - sm) / (Math.abs(stats.mean) || 1);
    const sd = Math.abs(stats.std - ss) / (Math.abs(stats.std) || 0.1);
    totalSim += 100 * (1 - Math.min(1, md*0.6 + sd*0.4));
    count++;
  });
  const avg = count > 0 ? totalSim / count : 0;
  grid.innerHTML = `
    <div class="quality-item">
      <div class="quality-score ${avg >= 80 ? 'good' : 'ok'}">${avg.toFixed(1)}%</div>
      <div class="quality-label">Estimasi Lokal (Mean/Std)</div>
    </div>
    <div class="quality-item">
      <div class="quality-score good">${syntheticData.length.toLocaleString('id-ID')}</div>
      <div class="quality-label">Total Baris × ${multiplier}x</div>
    </div>
  `;
}

function buildComparison() {
  const grid = document.getElementById('comparisonGrid');
  colStats = analyzeColumns();
  let html = '';

  originalHeaders.forEach((header, colIdx) => {
    if (!selectedColumns.includes(header)) return;
    const stats = colStats[colIdx];

    if (stats.isNumeric) {
      const synthValues = syntheticData.map(row => parseFloat(row[colIdx])).filter(v => !isNaN(v));
      const synthMean = (synthValues.reduce((a, b) => a + b, 0) / synthValues.length).toFixed(2);
      const synthStd = Math.sqrt(synthValues.reduce((a,b) => a + (b - parseFloat(synthMean))**2, 0) / synthValues.length).toFixed(2);
      const synthMin = Math.min(...synthValues).toFixed(2);
      const synthMax = Math.max(...synthValues).toFixed(2);

      html += `
        <div class="comp-card">
          <div class="comp-col-name">📊 ${escapeHtml(header)}</div>
          <div class="comp-row"><span>Mean (asli → AI)</span><span>${stats.mean.toFixed(2)} → ${synthMean}</span></div>
          <div class="comp-row"><span>Std (asli → AI)</span><span>${stats.std.toFixed(2)} → ${synthStd}</span></div>
          <div class="comp-row"><span>Min (asli → AI)</span><span>${stats.min.toFixed(2)} → ${synthMin}</span></div>
          <div class="comp-row"><span>Max (asli → AI)</span><span>${stats.max.toFixed(2)} → ${synthMax}</span></div>
        </div>
      `;
    }
  });
  grid.innerHTML = html;
}


function analyzeColumns() {
  return originalHeaders.map((_, colIdx) => {
    const values = originalData.map(row => row[colIdx]);
    const numericValues = values.map(v => parseFloat(v)).filter(v => !isNaN(v));

    if (numericValues.length > values.length * 0.7) {
      const mean = numericValues.reduce((a, b) => a + b, 0) / numericValues.length;
      const variance = numericValues.reduce((a, b) => a + (b - mean) ** 2, 0) / numericValues.length;
      return {
        isNumeric: true, mean, std: Math.sqrt(variance) || 0.01,
        min: Math.min(...numericValues), max: Math.max(...numericValues)
      };
    } else {
      return { isNumeric: false };
    }
  });
}

function isNumericColumn(colIdx) {
  const values = originalData.map(row => parseFloat(row[colIdx]));
  return values.filter(v => !isNaN(v)).length > originalData.length * 0.7;
}

// ===== UTILS =====
function goToStep(stepNum) {
  document.querySelectorAll('.tool-step').forEach(s => s.classList.add('hidden'));
  document.getElementById(`step${stepNum}`).classList.remove('hidden');
  document.querySelectorAll('.stepper .step').forEach((s, i) => {
    s.classList.remove('active', 'done');
    if (i + 1 < stepNum) s.classList.add('done');
    if (i + 1 === stepNum) s.classList.add('active');
  });
  document.querySelectorAll('.step-line').forEach((l, i) => l.classList.toggle('done', i + 1 < stepNum));
  if (stepNum === 2) buildColumnChips();
}

function resetGenerationUI() {
  document.querySelectorAll('.gen-step').forEach(s => s.classList.remove('active', 'done'));
  document.querySelectorAll('.gen-fill').forEach(f => f.style.width = '0%');
  document.querySelectorAll('.gen-status').forEach(s => s.textContent = '⏳');
  document.getElementById('genOverallFill').style.width = '0%';
  document.getElementById('genOverallText').textContent = '0% selesai';
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function initTabs() {
  const tabs = document.querySelectorAll('.result-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      const targetId = 'tab-' + tab.dataset.tab;
      const target = document.getElementById(targetId);
      if (target) target.classList.add('active');
    });
  });
}

function downloadCSV() {
  if (syntheticData.length === 0) return;
  let csv = originalHeaders.join(',') + '\n';
  syntheticData.forEach(row => {
    csv += row.map(val => {
      const s = String(val);
      return s.includes(',') ? `"${s}"` : s;
    }).join(',') + '\n';
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `synthmed_synthetic_${new Date().toISOString().slice(0,10)}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}
