// ===== INTERNATIONALIZATION (i18n) =====
const translations = {
  id: {
    // Navbar
    nav_features: 'Fitur',
    nav_how: 'Cara Kerja',
    nav_datasets: 'Dataset',
    nav_researchers: 'Untuk Peneliti',
    nav_demo: 'Live Demo',
    nav_cta: 'Mulai Riset',
    // Hero
    hero_badge: 'Open Platform — Gratis untuk Semua Peneliti',
    hero_title_1: 'Perbanyak',
    hero_title_2: 'Dataset Riset',
    hero_title_3: 'Kesehatan dengan AI',
    hero_desc: 'Platform terbuka dan gratis bagi seluruh peneliti untuk mengaugmentasi dan mensintesiskan dataset kesehatan. Ubah ratusan data menjadi ribuan — tanpa mengorbankan kualitas dan distribusi statistik.',
    hero_cta_primary: 'Mulai Sintesis Data',
    hero_cta_secondary: 'Coba Live Demo',
    stat_records: 'Record Disintesis',
    stat_researchers: 'Peneliti Terdaftar',
    stat_free: 'Gratis & Terbuka',
    // Hero Viz
    viz_title: 'Distribusi Data Sintetis vs Asli',
    chart_label: 'Distribusi Variabel',
    chart_original: 'Asli',
    chart_synthetic: 'Sintetis',
    viz_input: 'Data Asli',
    viz_output: 'Data Sintetis',
    viz_quality: 'Kualitas Terjaga',
    badge_free: '100% Gratis',
    badge_open: 'Open Access',
    badge_researchers: '850+ Peneliti',
    badge_universities: 'Dari 45 universitas',
    // Features
    features_label: 'Fitur Platform',
    features_title_1: 'Alat Riset yang',
    features_title_2: 'Powerful',
    features_title_3: '& Gratis',
    features_subtitle: 'Dirancang khusus untuk membantu peneliti mengaugmentasi dataset kesehatan mereka. Semua fitur tersedia tanpa biaya.',
    // Demo
    demo_label: 'Demo Interaktif',
    demo_title_1: 'Lihat',
    demo_title_2: 'Augmentasi Data',
    demo_title_3: 'Secara Langsung',
    demo_subtitle: 'Geser slider untuk melihat bagaimana SynthMed mengubah data kecil menjadi dataset besar — dengan distribusi statistik yang terjaga.',
    demo_input_label: 'Data Asli Anda',
    demo_records: 'record',
    demo_multiplier: 'Pilih Pengali Augmentasi:',
    demo_q_dist: 'Distribusi',
    demo_q_corr: 'Korelasi',
    demo_q_priv: 'Privasi',
    demo_output_label: 'Data Sintetis Dihasilkan',
    demo_validated: 'Tervalidasi',
    demo_records_generated: 'record sintetis',
    demo_ratio_label: 'Rasio augmentasi:',
    demo_try_full: 'Coba dengan Data Anda Sendiri',
    // Value Prop
    value_label: 'Untuk Peneliti',
    value_title_1: 'Kenapa Peneliti',
    value_title_2: 'Memilih',
    value_title_3: 'SynthMed?',
    value_subtitle: 'Akses penuh ke semua fitur — tanpa biaya, tanpa batasan, tanpa syarat komersial.',
    vp1_title: 'Sepenuhnya Gratis',
    vp1_desc: 'Tidak ada biaya tersembunyi. Tidak perlu kartu kredit. Akses penuh selamanya untuk semua peneliti.',
    vp2_title: 'Rigor Ilmiah',
    vp2_desc: 'Metodologi tervalidasi secara akademik. Data sintetis dapat disitasi dalam publikasi ilmiah internasional.',
    vp3_title: 'Komunitas Kolaboratif',
    vp3_desc: 'Bergabung dengan 850+ peneliti. Forum diskusi, webinar bulanan, dan template dataset siap pakai.',
    vfeat_1: 'Unlimited augmentasi data',
    vfeat_2: 'Distribusi statistik tervalidasi',
    vfeat_3: 'Ekspor CSV, JSON, Excel, FHIR',
    vfeat_4: 'Uji KS-test & Chi-square',
    vfeat_5: 'Metodologi dapat disitasi',
    vfeat_6: 'Forum & diskusi peneliti',
    vfeat_7: 'Webinar & workshop bulanan',
    vfeat_8: 'Differential privacy terjamin',
    value_cta_1: 'Daftar Gratis Sekarang',
    value_cta_2: 'Mulai Riset',
    // Activity Dashboard
    activity_live: 'LIVE',
    activity_title_1: 'Platform',
    activity_title_2: ' Sedang Aktif',
    activity_title_3: ' Sekarang',
    activity_subtitle: 'Bergabung dengan ribuan peneliti yang sedang menjalankan sintesis data saat ini.',
    act_running: 'Sintesis Berjalan',
    act_online: 'Peneliti Online',
    act_generated: 'Record Dibuat Hari Ini',
    act_universities: 'Universitas',
    viz_wave_label: 'Real-time Synthesis Stream',
    feed_just_now: 'Baru saja',
    activity_cta: 'Mulai Sintesis Sekarang — Gratis',
    act_no_register: 'Tidak perlu mendaftar. Langsung gunakan.',
  },
  en: {
    // Navbar
    nav_features: 'Features',
    nav_how: 'How It Works',
    nav_datasets: 'Datasets',
    nav_researchers: 'For Researchers',
    nav_demo: 'Live Demo',
    nav_cta: 'Start Research',
    // Hero
    hero_badge: 'Open Platform — Free for All Researchers',
    hero_title_1: 'Expand Your',
    hero_title_2: 'Research Dataset',
    hero_title_3: 'with AI',
    hero_desc: 'A free and open platform for researchers to augment and synthesize health datasets. Turn hundreds of records into thousands — without sacrificing data quality or statistical distribution.',
    hero_cta_primary: 'Start Data Synthesis',
    hero_cta_secondary: 'Try Live Demo',
    stat_records: 'Records Synthesized',
    stat_researchers: 'Registered Researchers',
    stat_free: 'Free & Open',
    // Hero Viz
    viz_title: 'Synthetic vs Original Distribution',
    chart_label: 'Variable Distribution',
    chart_original: 'Original',
    chart_synthetic: 'Synthetic',
    viz_input: 'Original Data',
    viz_output: 'Synthetic Data',
    viz_quality: 'Quality Preserved',
    badge_free: '100% Free',
    badge_open: 'Open Access',
    badge_researchers: '850+ Researchers',
    badge_universities: 'From 45 universities',
    // Features
    features_label: 'Platform Features',
    features_title_1: 'Research Tools That Are',
    features_title_2: 'Powerful',
    features_title_3: '& Free',
    features_subtitle: 'Specifically designed to help researchers augment their health datasets. All features are available at no cost.',
    // Demo
    demo_label: 'Interactive Demo',
    demo_title_1: 'See',
    demo_title_2: 'Data Augmentation',
    demo_title_3: 'in Action',
    demo_subtitle: 'Drag the slider to see how SynthMed transforms small datasets into large ones — with statistical distribution preserved.',
    demo_input_label: 'Your Original Data',
    demo_records: 'records',
    demo_multiplier: 'Choose Augmentation Multiplier:',
    demo_q_dist: 'Distribution',
    demo_q_corr: 'Correlation',
    demo_q_priv: 'Privacy',
    demo_output_label: 'Synthetic Data Generated',
    demo_validated: 'Validated',
    demo_records_generated: 'synthetic records',
    demo_ratio_label: 'Augmentation ratio:',
    demo_try_full: 'Try with Your Own Data',
    // Value Prop
    value_label: 'For Researchers',
    value_title_1: 'Why Researchers',
    value_title_2: 'Choose',
    value_title_3: 'SynthMed?',
    value_subtitle: 'Full access to all features — no cost, no limits, no commercial terms.',
    vp1_title: 'Completely Free',
    vp1_desc: 'No hidden fees. No credit card required. Full access forever for all researchers.',
    vp2_title: 'Scientific Rigor',
    vp2_desc: 'Academically validated methodology. Synthetic data can be cited in international scientific publications.',
    vp3_title: 'Collaborative Community',
    vp3_desc: 'Join 850+ researchers. Discussion forums, monthly webinars, and ready-to-use dataset templates.',
    vfeat_1: 'Unlimited data augmentation',
    vfeat_2: 'Validated statistical distribution',
    vfeat_3: 'Export CSV, JSON, Excel, FHIR',
    vfeat_4: 'KS-test & Chi-square testing',
    vfeat_5: 'Citable methodology',
    vfeat_6: 'Community forums & discussions',
    vfeat_7: 'Monthly webinars & workshops',
    vfeat_8: 'Differential privacy guaranteed',
    value_cta_1: 'Register for Free',
    value_cta_2: 'Start Research',
    // Activity Dashboard
    activity_live: 'LIVE',
    activity_title_1: 'Platform',
    activity_title_2: ' Currently Active',
    activity_title_3: ' Right Now',
    activity_subtitle: 'Join thousands of researchers currently running data synthesis.',
    act_running: 'Active Synthesis',
    act_online: 'Researchers Online',
    act_generated: 'Records Generated Today',
    act_universities: 'Universities',
    viz_wave_label: 'Real-time Synthesis Stream',
    feed_just_now: 'Just now',
    activity_cta: 'Start Synthesis Now — Free',
    act_no_register: 'No registration required. Use it directly.',
  }
};

let currentLang = localStorage.getItem('synthmed_lang') || 'id';

function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });

  // Update html lang attribute
  const htmlRoot = document.getElementById('htmlRoot');
  if (htmlRoot) htmlRoot.setAttribute('lang', lang);

  // Update toggle button
  const langText = document.getElementById('langText');
  const langToggle = document.getElementById('langToggle');
  if (langText) {
    langText.textContent = lang.toUpperCase();
  }
  if (langToggle) {
    const flag = langToggle.querySelector('.lang-flag');
    if (flag) flag.textContent = lang === 'id' ? '🇮🇩' : '🇬🇧';
  }

  currentLang = lang;
  localStorage.setItem('synthmed_lang', lang);
}

function initLanguageToggle() {
  const btn = document.getElementById('langToggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const newLang = currentLang === 'id' ? 'en' : 'id';

    // Animate button
    btn.classList.add('lang-switching');
    setTimeout(() => btn.classList.remove('lang-switching'), 400);

    applyTranslations(newLang);
  });

  // Apply saved language on load
  applyTranslations(currentLang);
}

document.addEventListener('DOMContentLoaded', () => {
  initLanguageToggle();
  initHeroChart();
  initLiveDemo();
});

// ===== HERO DATA CHART =====
function initHeroChart() {
  const chartBars = document.getElementById('chartBars');
  if (!chartBars) return;

  const variables = [
    { label: 'Usia', orig: 72, synth: 74 },
    { label: 'TD Sistolik', orig: 65, synth: 68 },
    { label: 'Glukosa', orig: 58, synth: 60 },
    { label: 'BMI', orig: 80, synth: 78 },
    { label: 'Hemoglobin', orig: 45, synth: 47 },
  ];

  chartBars.innerHTML = '';
  variables.forEach((v, i) => {
    const group = document.createElement('div');
    group.className = 'chart-bar-group';
    group.style.animationDelay = `${i * 0.15 + 0.5}s`;
    group.innerHTML = `
      <div class="chart-bar-label">${v.label}</div>
      <div class="chart-bar-pair">
        <div class="chart-bar-track">
          <div class="chart-bar-fill original" style="width:0%" data-target="${v.orig}%"></div>
        </div>
        <div class="chart-bar-track">
          <div class="chart-bar-fill synthetic" style="width:0%" data-target="${v.synth}%"></div>
        </div>
      </div>
    `;
    chartBars.appendChild(group);
  });

  // Animate bars on intersection
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = chartBars.querySelectorAll('.chart-bar-fill');
        fills.forEach((fill, i) => {
          setTimeout(() => {
            fill.style.width = fill.dataset.target;
          }, i * 80 + 300);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(chartBars);

  // Animate chart periodically to show data changing
  setInterval(() => {
    const fills = chartBars.querySelectorAll('.chart-bar-fill.synthetic');
    fills.forEach(fill => {
      const base = parseInt(fill.dataset.target);
      const jitter = (Math.random() - 0.5) * 6;
      fill.style.width = Math.max(20, Math.min(98, base + jitter)) + '%';
      setTimeout(() => { fill.style.width = fill.dataset.target; }, 1500);
    });
  }, 4000);
}

// ===== LIVE DEMO SLIDER =====
function initLiveDemo() {
  const slider = document.getElementById('demoSlider');
  const sliderVal = document.getElementById('sliderVal');
  const demoOutput = document.getElementById('demoOutput');
  const demoRatio = document.getElementById('demoRatio');
  const demoMiniChart = document.getElementById('demoMiniChart');

  if (!slider) return;

  let currentMult = 10;

  // Multiplier buttons
  document.querySelectorAll('.mult-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mult-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMult = parseInt(btn.dataset.mult);
      updateDemo();
    });
  });

  slider.addEventListener('input', updateDemo);

  function updateDemo() {
    const inputVal = parseInt(slider.value);
    const outputVal = inputVal * currentMult;

    sliderVal.textContent = inputVal.toLocaleString();
    demoOutput.textContent = outputVal.toLocaleString();
    demoRatio.textContent = currentMult + '×';

    // Animate the output number
    demoOutput.classList.remove('demo-number-pop');
    void demoOutput.offsetWidth; // Force reflow
    demoOutput.classList.add('demo-number-pop');

    // Update quality scores (slightly decrease for very high multipliers)
    const quality = currentMult <= 10 ? 96 : currentMult <= 50 ? 93 : 89;
    const corrQuality = currentMult <= 10 ? 94 : currentMult <= 50 ? 91 : 87;

    const qualityDist = document.getElementById('qualityDist');
    const qualityCorr = document.getElementById('qualityCorr');
    const qualityDistPct = document.getElementById('qualityDistPct');
    const qualityCorrPct = document.getElementById('qualityCorrPct');

    if (qualityDist) qualityDist.style.width = quality + '%';
    if (qualityCorr) qualityCorr.style.width = corrQuality + '%';
    if (qualityDistPct) qualityDistPct.textContent = quality + '%';
    if (qualityCorrPct) qualityCorrPct.textContent = corrQuality + '%';

    // Update mini chart (bar chart showing distribution comparison)
    updateMiniChart(demoMiniChart, inputVal, outputVal);
  }

  function updateMiniChart(container, input, output) {
    if (!container) return;

    const bars = 8;
    const originalHeights = [40, 65, 80, 72, 55, 88, 61, 45];

    container.innerHTML = `<div class="mini-chart-inner">` +
      Array.from({ length: bars }, (_, i) => {
        const origH = originalHeights[i];
        // Synthetic bars are very close to original
        const synthH = Math.max(20, Math.min(95, origH + (Math.random() - 0.5) * 6));
        return `
          <div class="mini-bar-group">
            <div class="mini-bar original" style="height:${origH}%"></div>
            <div class="mini-bar synthetic" style="height:${synthH}%"></div>
          </div>`;
      }).join('') +
      `</div>
      <div class="mini-chart-footer">
        <span class="legend-dot original"></span><span>${input.toLocaleString()}</span>
        <span class="legend-dot synthetic"></span><span>${output.toLocaleString()}</span>
      </div>`;
  }

  // Initialize
  updateDemo();
}
