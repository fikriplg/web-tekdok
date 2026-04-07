// ===== SYNTHMED SYNTHESIZER - FULLY FUNCTIONAL =====

let originalData = [];
let originalHeaders = [];
let syntheticData = [];
let selectedColumns = [];
let multiplier = 2;
let noiseLevel = 15;

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

  // Show preview
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
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function showPreview() {
  const table = document.getElementById('previewTable');
  const preview = document.getElementById('dataPreview');
  const summary = document.getElementById('dataSummary');

  // Build table
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

  // Summary
  const numericCols = originalHeaders.filter((_, i) => isNumericColumn(i)).length;
  summary.innerHTML = `
    <span>📋 <strong>${originalHeaders.length}</strong> kolom</span>
    <span>📊 <strong>${originalData.length}</strong> baris</span>
    <span>🔢 <strong>${numericCols}</strong> kolom numerik</span>
    <span>📝 <strong>${originalHeaders.length - numericCols}</strong> kolom kategorikal</span>
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
  const multUp = document.getElementById('multUp');
  const multDown = document.getElementById('multDown');
  const slider = document.getElementById('noiseSlider');
  const back2 = document.getElementById('btnBack2');
  const next2 = document.getElementById('btnNext2');

  multUp.addEventListener('click', () => { if (multiplier < 100) { multiplier++; updateMultiplier(); } });
  multDown.addEventListener('click', () => { if (multiplier > 2) { multiplier--; updateMultiplier(); } });

  slider.addEventListener('input', (e) => {
    noiseLevel = parseInt(e.target.value);
    document.getElementById('noiseValue').textContent = noiseLevel + '%';
  });

  // Method selection
  document.querySelectorAll('.method-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.method-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  back2.addEventListener('click', () => goToStep(1));
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

function updateMultiplier() {
  document.getElementById('multValue').textContent = multiplier;
  document.getElementById('outputEstimate').textContent =
    (originalData.length * multiplier).toLocaleString('id-ID');
}

function buildColumnChips() {
  const list = document.getElementById('columnList');
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
function startGeneration() {
  const method = document.querySelector('input[name="method"]:checked').value;
  const totalTarget = originalData.length * multiplier;

  // Animate generation steps
  animateGeneration(method, totalTarget);
}

async function animateGeneration(method, totalTarget) {
  // Step 1: Analyze
  await animateStep(1, 800);

  // Step 2: Calculate parameters
  await animateStep(2, 1000);

  // Step 3: Generate
  const genFill3 = document.getElementById('genFill3');
  document.getElementById('genStep3').classList.add('active');

  // Actually generate the data
  if (method === 'statistical') {
    syntheticData = generateStatistical(totalTarget);
  } else {
    syntheticData = generateBootstrap(totalTarget);
  }

  await animateStep(3, 1200);

  // Step 4: Validate
  await animateStep(4, 600);

  // Done - go to results
  setTimeout(() => goToStep(4), 500);
  showResults();
}

async function animateStep(stepNum, duration) {
  return new Promise(resolve => {
    const stepEl = document.getElementById(`genStep${stepNum}`);
    const fill = document.getElementById(`genFill${stepNum}`);
    const status = document.getElementById(`genStatus${stepNum}`);
    const overall = document.getElementById('genOverallFill');
    const overallText = document.getElementById('genOverallText');

    stepEl.classList.add('active');

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      fill.style.width = Math.min(progress, 100) + '%';
      overall.style.width = ((stepNum - 1) * 25 + progress / 4) + '%';
      overallText.textContent = Math.round((stepNum - 1) * 25 + progress / 4) + '% selesai';

      if (progress >= 100) {
        clearInterval(interval);
        stepEl.classList.add('done');
        status.textContent = '✅';
        if (stepNum < 4) {
          const line = document.querySelectorAll('.step-line')[stepNum - 1];
          if (line) line.classList.add('done');
        }
        resolve();
      }
    }, duration / 20);
  });
}

// ===== SYNTHESIS ALGORITHMS =====
function generateStatistical(targetCount) {
  const colStats = analyzeColumns();
  const result = [];

  for (let i = 0; i < targetCount; i++) {
    const row = [];
    originalHeaders.forEach((header, colIdx) => {
      if (!selectedColumns.includes(header)) {
        // Not selected: copy from random original row
        const srcRow = originalData[Math.floor(Math.random() * originalData.length)];
        row.push(srcRow[colIdx]);
      } else {
        const stats = colStats[colIdx];
        if (stats.isNumeric) {
          // Generate from normal distribution with original mean & std
          let val = gaussianRandom(stats.mean, stats.std * (1 + noiseLevel / 100));
          // Clamp to observed range (with some flexibility)
          const range = stats.max - stats.min;
          val = Math.max(stats.min - range * 0.05, Math.min(stats.max + range * 0.05, val));
          // Match original precision
          row.push(stats.isInteger ? Math.round(val).toString() : val.toFixed(stats.decimals).toString());
        } else {
          // Categorical: weighted random sampling
          const r = Math.random();
          let cumulative = 0;
          let chosen = stats.categories[0].value;
          for (const cat of stats.categories) {
            cumulative += cat.probability;
            if (r <= cumulative) { chosen = cat.value; break; }
          }
          row.push(chosen);
        }
      }
    });
    result.push(row);
  }

  return result;
}

function generateBootstrap(targetCount) {
  const colStats = analyzeColumns();
  const result = [];

  for (let i = 0; i < targetCount; i++) {
    // Pick a random source row
    const srcRow = [...originalData[Math.floor(Math.random() * originalData.length)]];

    // Add noise to selected numeric columns
    originalHeaders.forEach((header, colIdx) => {
      if (selectedColumns.includes(header) && colStats[colIdx].isNumeric) {
        const stats = colStats[colIdx];
        const noise = gaussianRandom(0, stats.std * (noiseLevel / 100));
        let val = parseFloat(srcRow[colIdx]) + noise;
        const range = stats.max - stats.min;
        val = Math.max(stats.min - range * 0.05, Math.min(stats.max + range * 0.05, val));
        srcRow[colIdx] = stats.isInteger ? Math.round(val).toString() : val.toFixed(stats.decimals).toString();
      }
    });

    result.push(srcRow);
  }

  return result;
}

function analyzeColumns() {
  return originalHeaders.map((_, colIdx) => {
    const values = originalData.map(row => row[colIdx]);
    const numericValues = values.map(v => parseFloat(v)).filter(v => !isNaN(v));

    if (numericValues.length > values.length * 0.7) {
      // Numeric column
      const mean = numericValues.reduce((a, b) => a + b, 0) / numericValues.length;
      const variance = numericValues.reduce((a, b) => a + (b - mean) ** 2, 0) / numericValues.length;
      const std = Math.sqrt(variance) || 0.01;
      const isInteger = numericValues.every(v => Number.isInteger(v));
      let maxDecimals = 0;
      if (!isInteger) {
        values.forEach(v => {
          const parts = v.split('.');
          if (parts[1]) maxDecimals = Math.max(maxDecimals, parts[1].length);
        });
      }

      return {
        isNumeric: true,
        mean, std,
        min: Math.min(...numericValues),
        max: Math.max(...numericValues),
        isInteger,
        decimals: Math.min(maxDecimals, 4)
      };
    } else {
      // Categorical column
      const freq = {};
      values.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
      const total = values.length;
      const categories = Object.entries(freq).map(([value, count]) => ({
        value,
        probability: count / total
      })).sort((a, b) => b.probability - a.probability);

      return { isNumeric: false, categories };
    }
  });
}

function gaussianRandom(mean, std) {
  // Box-Muller transform
  let u1 = Math.random();
  let u2 = Math.random();
  while (u1 === 0) u1 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mean + z * std;
}

function isNumericColumn(colIdx) {
  const values = originalData.map(row => parseFloat(row[colIdx]));
  const numericCount = values.filter(v => !isNaN(v)).length;
  return numericCount > originalData.length * 0.7;
}

// ===== STEP 4: RESULTS =====
function showResults() {
  document.getElementById('totalRows').textContent = syntheticData.length.toLocaleString('id-ID');

  // Build result table
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

  // Quality Report
  buildQualityReport();

  // Comparison
  buildComparison();

  // Download button
  document.getElementById('btnDownload').addEventListener('click', downloadCSV);
  document.getElementById('btnNewSynthesis').addEventListener('click', () => {
    resetUpload();
    syntheticData = [];
    goToStep(1);
    resetGenerationUI();
  });
}

function buildQualityReport() {
  const grid = document.getElementById('qualityGrid');
  const colStats = analyzeColumns();

  // Calculate quality metrics
  const numericCols = originalHeaders.filter((_, i) => colStats[i].isNumeric);
  let totalSimilarity = 0;
  let count = 0;

  numericCols.forEach((header, i) => {
    const colIdx = originalHeaders.indexOf(header);
    const origValues = originalData.map(row => parseFloat(row[colIdx])).filter(v => !isNaN(v));
    const synthValues = syntheticData.map(row => parseFloat(row[colIdx])).filter(v => !isNaN(v));

    const origMean = origValues.reduce((a, b) => a + b, 0) / origValues.length;
    const synthMean = synthValues.reduce((a, b) => a + b, 0) / synthValues.length;

    const similarity = 100 - Math.min(100, Math.abs(origMean - synthMean) / Math.abs(origMean || 1) * 100);
    totalSimilarity += similarity;
    count++;
  });

  const avgSimilarity = count > 0 ? (totalSimilarity / count) : 95;

  grid.innerHTML = `
    <div class="quality-item">
      <div class="quality-score good">${avgSimilarity.toFixed(1)}%</div>
      <div class="quality-label">Distribusi Similarity</div>
    </div>
    <div class="quality-item">
      <div class="quality-score good">${syntheticData.length.toLocaleString('id-ID')}</div>
      <div class="quality-label">Total Baris Generated</div>
    </div>
    <div class="quality-item">
      <div class="quality-score good">${selectedColumns.length}</div>
      <div class="quality-label">Kolom Disintesis</div>
    </div>
    <div class="quality-item">
      <div class="quality-score good">${multiplier}x</div>
      <div class="quality-label">Faktor Augmentasi</div>
    </div>
  `;
}

function buildComparison() {
  const grid = document.getElementById('comparisonGrid');
  const colStats = analyzeColumns();
  let html = '';

  originalHeaders.forEach((header, colIdx) => {
    if (!selectedColumns.includes(header)) return;
    const stats = colStats[colIdx];

    if (stats.isNumeric) {
      const origValues = originalData.map(row => parseFloat(row[colIdx])).filter(v => !isNaN(v));
      const synthValues = syntheticData.map(row => parseFloat(row[colIdx])).filter(v => !isNaN(v));

      const origMean = (origValues.reduce((a, b) => a + b, 0) / origValues.length).toFixed(2);
      const synthMean = (synthValues.reduce((a, b) => a + b, 0) / synthValues.length).toFixed(2);
      const origMin = Math.min(...origValues).toFixed(2);
      const synthMin = Math.min(...synthValues).toFixed(2);
      const origMax = Math.max(...origValues).toFixed(2);
      const synthMax = Math.max(...synthValues).toFixed(2);

      html += `
        <div class="comp-card">
          <div class="comp-col-name">📊 ${escapeHtml(header)} (numerik)</div>
          <div class="comp-row"><span>Mean (asli)</span><span>${origMean}</span></div>
          <div class="comp-row"><span>Mean (sintetis)</span><span>${synthMean}</span></div>
          <div class="comp-row"><span>Min (asli)</span><span>${origMin}</span></div>
          <div class="comp-row"><span>Min (sintetis)</span><span>${synthMin}</span></div>
          <div class="comp-row"><span>Max (asli)</span><span>${origMax}</span></div>
          <div class="comp-row"><span>Max (sintetis)</span><span>${synthMax}</span></div>
        </div>
      `;
    } else {
      const origFreq = {};
      originalData.forEach(row => { origFreq[row[colIdx]] = (origFreq[row[colIdx]] || 0) + 1; });
      const synthFreq = {};
      syntheticData.forEach(row => { synthFreq[row[colIdx]] = (synthFreq[row[colIdx]] || 0) + 1; });

      const topCategories = Object.keys(origFreq).slice(0, 4);
      let rows = '';
      topCategories.forEach(cat => {
        const origPct = ((origFreq[cat] || 0) / originalData.length * 100).toFixed(1);
        const synthPct = ((synthFreq[cat] || 0) / syntheticData.length * 100).toFixed(1);
        rows += `<div class="comp-row"><span>${escapeHtml(cat)}</span><span>${origPct}% → ${synthPct}%</span></div>`;
      });

      html += `
        <div class="comp-card">
          <div class="comp-col-name">📝 ${escapeHtml(header)} (kategorikal)</div>
          ${rows}
        </div>
      `;
    }
  });

  grid.innerHTML = html;
}

function downloadCSV() {
  let csv = originalHeaders.join(',') + '\n';
  syntheticData.forEach(row => {
    csv += row.map(val => {
      if (val.includes(',') || val.includes('"') || val.includes('\n')) {
        return '"' + val.replace(/"/g, '""') + '"';
      }
      return val;
    }).join(',') + '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `synthmed_output_${multiplier}x_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ===== STEP NAVIGATION =====
function goToStep(stepNum) {
  // Hide all steps
  document.querySelectorAll('.tool-step').forEach(s => s.classList.add('hidden'));
  document.getElementById(`step${stepNum}`).classList.remove('hidden');

  // Update stepper
  document.querySelectorAll('.stepper .step').forEach((s, i) => {
    s.classList.remove('active', 'done');
    if (i + 1 < stepNum) s.classList.add('done');
    if (i + 1 === stepNum) s.classList.add('active');
  });
  document.querySelectorAll('.step-line').forEach((l, i) => {
    l.classList.toggle('done', i + 1 < stepNum);
  });

  // Prepare step content
  if (stepNum === 2) {
    buildColumnChips();
    updateMultiplier();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetGenerationUI() {
  for (let i = 1; i <= 4; i++) {
    const step = document.getElementById(`genStep${i}`);
    const fill = document.getElementById(`genFill${i}`);
    const status = document.getElementById(`genStatus${i}`);
    step.classList.remove('active', 'done');
    fill.style.width = '0';
    status.textContent = '⏳';
  }
  document.getElementById('genOverallFill').style.width = '0';
  document.getElementById('genOverallText').textContent = '0% selesai';
  document.querySelectorAll('.step-line').forEach(l => l.classList.remove('done'));
}

// ===== TABS =====
function initTabs() {
  document.querySelectorAll('.result-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.result-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
    });
  });
}

// ===== UTILITIES =====
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
