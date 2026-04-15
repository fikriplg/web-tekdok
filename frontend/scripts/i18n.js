// ===== INTERNATIONALIZATION (i18n) =====
const translations = {
  id: {
    // Common
    common_back: 'Kembali',
    common_close: 'Tutup',
    common_retry: 'Coba lagi',
    unit_rows: 'baris',
    unit_columns: 'kolom',
    aria_toggle_language: 'Ganti bahasa',
    aria_toggle_menu: 'Toggle menu',

    // Navbar
    nav_home: 'Beranda',
    nav_docs: 'Dokumentasi',
    nav_synth: 'Synthesizer',
    nav_features: 'Fitur',
    nav_how: 'Cara Kerja',
    features_card1_title: 'Augmentasi Cerdas',
    features_card1_desc: 'Upload dataset kecil Anda, dan AI kami akan mempelajari pola distribusinya lalu menghasilkan data sintetis baru yang konsisten secara statistik.',
    features_card2_title: 'Privasi Data Terjaga',
    features_card2_desc: 'Data asli Anda tidak pernah disimpan di server. Proses sintesis menjamin privasi pasien melalui mekanisme differential privacy.',
    features_card3_title: 'Validasi Statistik',
    features_card3_desc: 'Pengujian otomatis kualitas data meliputi distribusi, korelasi, dan consistency check terhadap standar medis internasional.',
    features_card4_title: 'Generasi Real-time',
    features_card4_desc: 'Infrastruktur GPU-accelerated yang mampu menghasilkan jutaan record data sintetis dalam hitungan menit.',
    features_card5_title: 'Ekspor Multi-Format',
    features_card5_desc: 'Unduh hasil sintesis dalam format CSV, JSON, Excel, atau FHIR. Siap digunakan langsung untuk analisis di Python, R, atau SPSS.',
    features_card6_title: 'Standar HL7 & FHIR',
    features_card6_desc: 'Dataset dihasilkan sesuai standar interoperabilitas kesehatan HL7 FHIR, siap digunakan untuk sistem EHR.',
    docs_toc_quick: 'Quick Start',
    docs_toc_sample: 'Data Sample',
    synth_training_complete_tpl: 'Training selesai dalam {t} detik!',
    docs_toc_methods: 'Metode',
    docs_toc_quality: 'Kualitas',
    docs_toc_faq: 'FAQ',
    docs_toc_citation: 'Sitasi',

    page_title_docs: 'SynthMed — Dokumentasi',
    docs_sec_getting_started: 'Memulai',
    docs_sec_tech_ref: 'Referensi Teknis',
    docs_sec_help: 'Bantuan',
    docs_sec_academic: 'Akademik',

    docs_intro_h2: 'Apa itu SynthMed?',
    docs_intro_callout_html: '<strong>SynthMed</strong> adalah platform riset terbuka dan <strong>100% gratis</strong> yang membantu peneliti kesehatan untuk mengaugmentasi (memperbanyak) dataset mereka menggunakan metode AI Generative (GAN &amp; TVAE). Data Anda diproses secara transien di server kami untuk proses training AI dan otomatis dihapus secara berkala untuk menjamin privasi.',
    docs_intro_why_h3: 'Mengapa Data Sintesis?',
    docs_intro_why_p: 'Dalam penelitian kesehatan, akses ke data pasien seringkali terbatas karena regulasi privasi (HIPAA, GDPR). Data sintesis memungkinkan peneliti untuk:',
    docs_intro_why_li1: 'Memperbanyak dataset kecil menjadi dataset besar (2x - 100x lipat)',
    docs_intro_why_li2: 'Mempertahankan distribusi statistik yang sama dengan data asli',
    docs_intro_why_li3: 'Menghindari pelanggaran privasi pasien',
    docs_intro_why_li4: 'Meningkatkan akurasi model prediktif dengan lebih banyak data training',
    docs_intro_features_h3: 'Fitur Utama',
    docs_intro_feat1_title: 'Upload & Analisis',
    docs_intro_feat1_desc: 'Upload CSV, sistem otomatis deteksi tipe kolom dan distribusi data.',
    docs_intro_feat2_title: '2 Arsitektur Neural',
    docs_intro_feat2_desc: 'Pilih antara CTGAN untuk dataset besar atau TVAE untuk dataset kecil/sensitif.',
    docs_intro_feat3_title: 'Laporan Kualitas',
    docs_intro_feat3_desc: 'Perbandingan distribusi data asli vs sintetis otomatis.',
    docs_intro_feat4_title: 'Download Instan',
    docs_intro_feat4_desc: 'Unduh dataset sintetis dalam format CSV langsung dari browser.',

    docs_qs_h2: 'Quick Start',
    docs_qs_p: 'Ikuti 4 langkah sederhana untuk membuat dataset sintetis pertama Anda:',
    docs_qs_step1_title: 'Upload Dataset CSV',
    docs_qs_step1_desc_html: 'Buka <a href="synthesize.html">Synthesizer</a>, upload file CSV atau klik <strong>"Gunakan Data Sample"</strong> untuk mencoba langsung.',
    docs_qs_step2_title: 'Atur Konfigurasi',
    docs_qs_step2_desc: 'Pilih multiplier (2x-100x), kolom target, metode sintesis, dan intensitas training (epochs).',
    docs_qs_step3_title: 'Generate Data',
    docs_qs_step3_desc: 'Klik "Mulai Sintesis" dan tunggu proses selesai. AI akan menganalisis pola dan menghasilkan data baru.',
    docs_qs_step4_title: 'Review & Download',
    docs_qs_step4_desc: 'Periksa laporan kualitas, bandingkan distribusi, lalu unduh file CSV hasil sintesis.',
    docs_qs_tip_html: '<strong>Tips:</strong> Gunakan <a href="#sample-data">data sample</a> terlebih dahulu untuk memahami cara kerja platform.',

    docs_sample_h2: 'Data Sample',
    docs_sample_p_html: 'Kami menyediakan dataset sample berisi <strong>30 record pasien</strong> dengan <strong>10 kolom</strong> untuk mencoba platform:',
    docs_sample_box_title: '🏥 Data Pasien Kesehatan',
    docs_sample_box_desc: 'Berisi data demografi, vital signs, lab results, dan diagnosis. Cocok untuk latihan augmentasi data klinik.',
    docs_sample_tag_rows: '30 baris',
    docs_sample_tag_cols: '10 kolom',
    docs_sample_tag_numeric: '7 numerik',
    docs_sample_tag_categorical: '3 kategorikal',
    docs_sample_download: '📥 Download CSV',
    docs_sample_details_h3: 'Detail Kolom',
    docs_sample_th_col: 'Kolom',
    docs_sample_th_type: 'Tipe',
    docs_sample_th_desc: 'Deskripsi',
    docs_sample_th_example: 'Contoh',
    docs_type_categorical: 'Kategorikal',
    docs_type_numeric: 'Numerik',
    docs_sample_col_patient_id_desc: 'ID unik pasien',
    docs_sample_col_age_desc: 'Usia pasien (tahun)',
    docs_sample_col_gender_desc: 'Jenis kelamin',
    docs_sample_col_bp_sys_desc: 'Tekanan darah sistolik (mmHg)',
    docs_sample_col_bp_dia_desc: 'Tekanan darah diastolik (mmHg)',
    docs_sample_col_hr_desc: 'Detak jantung (bpm)',
    docs_sample_col_chol_desc: 'Total kolesterol (mg/dL)',
    docs_sample_col_sugar_desc: 'Gula darah (mg/dL)',
    docs_sample_col_bmi_desc: 'Body Mass Index',
    docs_sample_col_dx_desc: 'Diagnosis utama',

    docs_methods_h2: 'Arsitektur Neural AI',
    docs_methods_p: 'SynthMed menggunakan teknologi Deep Learning terbaru (Generative Adversarial Networks & Variational Autoencoders) untuk mensintesis data medis. Pilih model yang sesuai dengan karakteristik dataset Anda:',
    docs_methods_ctgan_title: 'CTGAN Model',
    docs_methods_ctgan_desc: 'Model Generative Adversarial Network yang dioptimalkan untuk data tabular. Menggunakan generator dan discriminator untuk menciptakan data baru yang identik secara statistik.',
    docs_methods_how_h5: '🔧 Cara Kerja:',
    docs_methods_ctgan_how1: 'Identifikasi korelasi antar kolom (multivariate analysis)',
    docs_methods_ctgan_how2: 'Training Neural Network untuk menebak distribusi asli',
    docs_methods_ctgan_how3: 'Generasi data sintetis dengan high-diversity',
    docs_methods_pros_h5: '✅ Kelebihan:',
    docs_methods_ctgan_pro1: 'Mampu menangani dataset besar (>1000 baris)',
    docs_methods_ctgan_pro2: 'Sangat variatif dan inovatif dalam menghasilkan data baru',
    docs_methods_ctgan_best: 'Terbaik untuk: Dataset besar & kompleks',
    docs_methods_tvae_title: 'TVAE Model',
    docs_methods_tvae_desc: 'Tabular Variational Autoencoder yang menggunakan sistem encoder-decoder untuk memetakan data ke ruang laten.',
    docs_methods_tvae_how1: 'Encoder mengompresi data asli ke bentuk matematis sederhana',
    docs_methods_tvae_how2: 'Decoder membangun ulang data dari representasi laten tersebut',
    docs_methods_tvae_how3: 'Regulasi statistik untuk menjaga akurasi distribusi',
    docs_methods_tvae_pro1: 'Sangat akurat (Similarity Score tinggi)',
    docs_methods_tvae_pro2: 'Sangat stabil untuk dataset kecil (30-500 baris)',
    docs_methods_tvae_best: 'Terbaik untuk: Dataset kecil & sensitif (EHR)',
    docs_methods_params_h3: 'Parameter Konfigurasi',
    docs_methods_th_param: 'Parameter',
    docs_methods_th_range: 'Rentang',
    docs_methods_th_reco: 'Rekomendasi',
    docs_methods_th_desc: 'Deskripsi',
    docs_methods_param_multiplier_desc: 'Berapa kali lipat data output dari data asli',
    docs_methods_param_epochs_desc: 'Jumlah iterasi training (semakin tinggi, semakin akurat)',
    docs_methods_param_model_desc: 'Arsitektur neural yang digunakan sesuai ukuran data',
    docs_methods_warning_html: '<strong>Perhatian:</strong> Epochs yang lebih tinggi menghasilkan model yang lebih akurat tetapi membutuhkan waktu training lebih lama. Untuk dataset medis, gunakan 300-500 epochs.',

    docs_quality_h2: 'Metrik Kualitas',
    docs_quality_p: 'Setiap hasil sintesis dilengkapi laporan kualitas otomatis. Berikut metrik yang digunakan:',
    docs_quality_dist_p: 'Mengukur seberapa mirip distribusi data sintetis dengan data asli berdasarkan perbandingan mean:',
    docs_quality_formula_title: 'Formula',
    docs_quality_th_score: 'Skor',
    docs_quality_th_rating: 'Rating',
    docs_quality_th_interp: 'Interpretasi',
    docs_quality_rating1: '🟢 Sangat Baik',
    docs_quality_interp1: 'Distribusi hampir identik dengan data asli',
    docs_quality_rating2: '🟡 Baik',
    docs_quality_interp2: 'Perbedaan minor, masih layak untuk riset',
    docs_quality_rating3: '🟠 Cukup',
    docs_quality_interp3: 'Perlu evaluasi lebih lanjut',
    docs_quality_rating4: '🔴 Kurang',
    docs_quality_interp4: 'Coba naikkan epochs, pilih TVAE, atau kurangi multiplier',
    docs_quality_more_h3: 'Informasi Tambahan',
    docs_quality_more_li1_html: '<strong>Total Baris Generated</strong> — Jumlah baris data sintetis yang berhasil dibuat',
    docs_quality_more_li2_html: '<strong>Kolom Disintesis</strong> — Jumlah kolom yang dipilih untuk diaugmentasi',
    docs_quality_more_li3_html: '<strong>Faktor Augmentasi</strong> — Multiplier yang digunakan (misal: 5x)',
    docs_quality_more_li4_html: '<strong>Tab Perbandingan</strong> — Mean, min, max data asli vs sintetis per kolom',

    docs_faq_h2: 'FAQ (Pertanyaan Umum)',
    docs_faq_q1: 'Apakah SynthMed benar-benar gratis?',
    docs_faq_a1: 'Ya, 100% gratis tanpa batasan. Tidak ada paket berbayar, tidak perlu kartu kredit, dan akses penuh ke semua fitur.',
    docs_faq_q2: 'Apakah data saya aman?',
    docs_faq_a2: 'Ya. Meskipun data dikirim ke server untuk diproses oleh arsitektur AI (karena membutuhkan resource komputasi tinggi), data tersebut diproses secara <strong>stateless &amp; transien</strong>. Data tidak disimpan permanen dan session otomatis dihapus setelah 1 jam.',
    docs_faq_q3: 'Berapa ukuran file maksimal yang bisa di-upload?',
    docs_faq_a3: 'Maksimal 10MB. Untuk file yang lebih besar, kami sarankan untuk membagi dataset menjadi beberapa bagian.',
    docs_faq_q4: 'Format file apa saja yang didukung?',
    docs_faq_a4: 'Saat ini hanya <strong>CSV</strong> (Comma-Separated Values) dengan header di baris pertama dan pemisah koma. Dukungan Excel (.xlsx) akan ditambahkan.',
    docs_faq_q5: 'Model mana yang sebaiknya saya gunakan?',
    docs_faq_a5: 'Gunakan <strong>CTGAN</strong> jika data Anda kompleks dan memiliki banyak baris (&gt;1000). Gunakan <strong>TVAE</strong> jika dataset Anda lebih kecil (&lt;500 baris) karena arsitektur VAE lebih stabil dalam memetakan ruang laten dataset kecil.',
    docs_faq_q6: 'Apakah hasil sintesis bisa untuk publikasi ilmiah?',
    docs_faq_a6: 'Ya, tentu. Pastikan untuk menjelaskan metode augmentasi yang digunakan dalam bagian metodologi paper Anda. Lihat bagian <a href="#citation">Cara Sitasi</a> di bawah.',
    docs_faq_q7: 'Berapa epochs yang disarankan?',
    docs_faq_a7: 'Untuk riset medis: <strong>300-500 epochs</strong> biasanya sudah cukup. Gunakan lebih tinggi (600-1000) jika hasil kualitas belum memuaskan, tapi perhatikan waktu training yang semakin lama.',

    docs_cite_h2: 'Cara Sitasi',
    docs_cite_p: 'Jika Anda menggunakan SynthMed dalam penelitian, silakan sitasi:',
    docs_cite_apa: 'APA Format',
    docs_cite_thanks_html: '<strong>Terima kasih!</strong> Dengan menyitasi SynthMed, Anda membantu kami mengembangkan platform ini untuk lebih banyak peneliti.',

    // Synthesizer
    page_title_synth: 'SynthMed — Sintesis Dataset',
    synth_label: 'Dataset Synthesizer',
    synth_title_1: 'Sintesis',
    synth_title_2: 'Dataset',
    synth_title_3: 'Anda',
    synth_subtitle: 'Upload dataset CSV Anda, atur parameter, dan generate data sintetis baru yang mempertahankan distribusi statistik asli.',
    synth_step_dataset: 'Dataset',
    synth_step_synthesis: 'Sintesis',
    synth_step_results: 'Hasil',

    synth_step1_title: 'Upload Dataset',
    synth_step1_desc: 'Upload file CSV Anda. Ukuran maksimal 10MB.',
    synth_upload_drag_title: 'Drag & Drop file CSV di sini',
    synth_upload_drag_sub: 'atau klik untuk memilih file',
    synth_upload_choose: 'Pilih File',
    synth_or_sample: 'atau coba dengan data sample',
    synth_use_sample: 'Gunakan Data Sample (30 pasien)',
    synth_preview_title: 'Preview Data (5 baris pertama)',
    synth_pick_columns: 'Pilih Kolom Target',
    synth_pick_columns_help: 'Pilih kolom-kolom yang ingin Anda sertakan dalam proses sintesis AI.',
    synth_next_to_config: 'Lanjut ke Konfigurasi →',

    synth_step2_title: 'Konfigurasi Pengayaan Data',
    synth_step2_desc: 'Atur parameter model AI untuk menghasilkan dataset sintetis terbaik.',
    synth_notice_title: 'Terjadi kendala',
    synth_multiplier_label: 'Faktor Augmentasi',
    synth_multiplier_help: 'Berapa kali lipat data yang ingin dihasilkan',
    synth_multiplier_suffix: 'kali lipat',
    synth_output_estimate: 'Estimasi: 60 baris output',
    synth_model_label: 'Arsitektur AI Neural',
    synth_model_help: 'Pilih algoritma deep learning yang digunakan',
    synth_model_ctgan_suffix: '(Standard)',
    synth_model_tvae_suffix: '(High Precision)',
    synth_model_hint: 'TVAE sering kali lebih akurat untuk dataset kecil (< 100 baris).',
    synth_epochs_label: 'Intensitas Training (Epochs)',
    synth_epochs_help: 'Semakin tinggi, semakin akurat namun lebih lambat',
    synth_speed: 'Cepat',
    synth_accurate: 'Akurat',
    synth_start: 'Mulai Sintesis ⚡',
    synth_progress_title: 'Proses Sintesis AI',
    synth_progress_desc: 'Model sedang menganalisis pola dan menghasilkan data sintetis...',
    synth_run_dataset: 'Dataset',
    synth_run_columns: 'Kolom',
    synth_run_model: 'Model',
    synth_run_epochs: 'Epochs',
    synth_run_target: 'Target Output',
    synth_run_session: 'Session',
    synth_run_hint: 'Tips: selama proses berjalan, jangan refresh/menutup tab agar progress tidak terputus.',
    synth_gen_1: 'Menganalisis distribusi kolom...',
    synth_gen_2: 'Menghitung parameter statistik...',
    synth_gen_3: 'Men-generate data sintetis...',
    synth_gen_4: 'Validasi kualitas & konsistensi...',
    synth_overall_initial: '0% selesai',

    synth_done_title: 'Sintesis Selesai!',
    synth_done_desc: 'Dataset sintetis berhasil dihasilkan. Berikut hasil dan statistik kualitasnya.',
    synth_quality_title: 'Laporan Kualitas',
    synth_tab_synthetic: 'Data Sintetis',
    synth_tab_comparison: 'Perbandingan',
    synth_table_note_prefix: 'Menampilkan 10 baris pertama dari',
    synth_new: 'Sintesis Baru',
    synth_download: 'Download CSV',

    // Synthesizer (runtime messages)
    synth_file_too_large: 'File terlalu besar! Maksimal 10MB.',
    synth_csv_min_rows: 'File CSV harus memiliki minimal 2 baris (header + data).',
    synth_no_valid_data: 'Tidak ada data valid yang ditemukan.',
    synth_summary_numeric_suffix: 'kolom numerik',
    synth_summary_categorical_suffix: 'kolom kategorikal',
    synth_output_estimate_tpl: 'Estimasi: {n} baris output',
    synth_config_incomplete_title: 'Konfigurasi belum lengkap',
    synth_config_incomplete_msg: 'Pilih minimal 1 kolom target untuk disintesis.',
    synth_backend_error_generic: 'Terjadi error dari backend.',
    synth_training_failed_title: 'Training gagal',
    synth_training_incomplete_title: 'Training tidak selesai',
    synth_training_incomplete_msg: 'Training selesai tanpa konfirmasi dari server. Silakan coba lagi. (Detail: lihat Console/F12)',
    synth_backend_unreachable_title: 'Gagal menghubungi backend',
    synth_backend_unreachable_msg_tpl: 'Error: {error}. Pastikan server Python berjalan di {base}.',
    synth_err_training_timeout: 'Training timeout — tidak ada update dari server selama 10 menit.',
    synth_err_session_missing: 'Session belum terbentuk. Jalankan training ulang.',
    synth_status_read_csv: 'Membaca file CSV...',
    synth_status_data_loaded_tpl: 'Data dimuat: {r} baris, {c} kolom',
    synth_status_preprocessing: 'Preprocessing data (pembersihan, deduplikasi)...',
    synth_status_metadata_analyze: 'Menganalisis metadata & distribusi kolom...',
    synth_status_metadata_ok_tpl: 'Metadata OK: {c} kolom terdeteksi',
    synth_status_init_model_tpl: 'Inisialisasi {m} ({d})...',
    synth_status_init_model_simple_tpl: 'Inisialisasi {m}...',
    synth_status_training_start_tpl: 'Training {m} ({e} epochs, {r} baris)...',
    synth_fetching_synthetic: 'Mengambil data sintetis dari model...',
    synth_model_ready_fetching: 'Model siap, mengambil data...',
    synth_percent_complete_tpl: '{p}% selesai',
    synth_percent_complete_time_tpl: '{p}% selesai · {t}',
    synth_training_progress_tpl: 'Training Neural: {p}%',
    synth_training_progress_time_tpl: 'Training Neural: {p}% · {t}',
    synth_synthetic_generated: 'Data sintetis berhasil dihasilkan!',
    synth_complete_celebration: '100% Selesai! 🎉',
    synth_synthesis_failed_title: 'Sintesis gagal',
    synth_synthesis_failed_msg_prefix: 'Gagal men-generate data sintetis dari model.',
    synth_quality_loading_title: '⏳ Mengevaluasi kualitas...',
    synth_quality_loading_desc: 'Menghitung KSComplement, TVComplement, CorrelationSimilarity via SDMetrics',
    synth_quality_overall_label: 'Skor Keseluruhan (SDMetrics)',
    synth_quality_shapes_label: 'Column Shapes (KS + TV)',
    synth_quality_pairs_label: 'Pair Trends (Korelasi)',
    synth_quality_total_rows_label_tpl: 'Total Baris × {m}x',
    synth_quality_per_column_title: '📊 Skor Per Kolom',
    synth_quality_backend_failed: 'Gagal menghubungi evaluasi SDMetrics. Menggunakan estimasi lokal.',
    synth_quality_local_estimate_label: 'Estimasi Lokal (Mean/Std)',
    synth_comparison_mean_label: 'Mean (asli → AI)',
    synth_comparison_std_label: 'Std (asli → AI)',
    synth_comparison_min_label: 'Min (asli → AI)',
    synth_comparison_max_label: 'Max (asli → AI)',
    // Hero
    page_title_index: 'SynthMed — Platform Riset Terbuka untuk Sintesis Dataset Kesehatan',
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
    chart_var_age: 'Usia',
    chart_var_bp_sys: 'TD Sistolik',
    chart_var_glucose: 'Glukosa',
    chart_var_bmi: 'BMI',
    chart_var_hemoglobin: 'Hemoglobin',
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
    demo_ai_synthesis: 'AI Sintesis',

    // How It Works
    how_label: 'Cara Kerja',
    how_title_1: 'Empat Langkah',
    how_title_2: 'Mudah',
    how_subtitle: 'Dari konfigurasi hingga dataset siap pakai, proses pembuatan data sintetis yang simpel dan intuitif.',
    how_step1_title: 'Upload Dataset Anda',
    how_step1_desc: 'Unggah dataset riset Anda dalam format CSV atau Excel. Sistem akan menganalisis struktur, tipe data, dan distribusi kolom secara otomatis.',
    how_step2_title: 'Atur Jumlah Data',
    how_step2_desc: 'Tentukan berapa banyak data sintetis yang ingin dihasilkan — dari 2x hingga 100x lipat dari dataset asli Anda.',
    how_step3_title: 'AI Sintesis & Validasi',
    how_step3_desc: 'AI mempelajari pola dan menghasilkan data baru. Sistem otomatis memvalidasi distribusi statistik agar konsisten dengan data asli.',
    how_step4_title: 'Download & Gunakan',
    how_step4_desc: 'Unduh dataset yang sudah diperbanyak dalam format pilihan Anda. Langsung siap untuk analisis lanjutan dan publikasi.',

    // Dataset Types
    types_label: 'Tipe Dataset',
    types_title_1: 'Beragam',
    types_title_2: 'Jenis Data',
    types_title_3: 'Kesehatan',
    types_subtitle: 'Kami mendukung pembuatan berbagai tipe dataset medis untuk kebutuhan riset, pengembangan, dan pendidikan.',
    types_ehr_title: 'Rekam Medis Elektronik (EHR)',
    types_ehr_desc: 'Data pasien sintetis lengkap meliputi demografi, diagnosis, prosedur, resep obat, hasil lab, dan riwayat kunjungan.',
    types_lab_title: 'Data Laboratorium & Patologi',
    types_lab_desc: 'Hasil pemeriksaan laboratorium sintetis dengan nilai yang realistis untuk hematologi, kimia darah, urinalisis, dan lainnya.',
    types_pharma_title: 'Data Farmasi & Obat',
    types_pharma_desc: 'Dataset peresepan obat, interaksi obat, efek samping, dan data farmakokinetik untuk riset farmakologi.',
    types_genomics_title: 'Data Genomik & Biomarker',
    types_genomics_desc: 'Sekuens genomik sintetis, data SNP, ekspresi gen, dan biomarker untuk penelitian presisi medicine.',

    // Stats
    stats_label_records: 'Record Data Disintesis',
    stats_label_researchers: 'Peneliti Aktif',
    stats_label_institutions: 'Universitas & Institusi',
    stats_label_publications: 'Publikasi Ilmiah',

    // Testimonials
    testimonials_label: 'Testimoni Peneliti',
    testimonials_title_1: 'Digunakan Oleh',
    testimonials_title_2: 'Peneliti',
    testimonials_title_3: 'di Seluruh Indonesia',
    testimonials_subtitle: 'Pengalaman para peneliti yang telah menggunakan SynthMed untuk memperkaya dataset riset mereka.',
    testi_1_text: '"Dataset saya yang awalnya hanya 200 sampel bisa diaugmentasi menjadi 5.000 dengan distribusi yang sangat konsisten. Ini sangat membantu untuk riset skripsi saya."',
    testi_1_role: 'Mahasiswa Riset, FK Universitas Airlangga',
    testi_2_text: '"Platform yang luar biasa dan yang terpenting gratis! Kami menggunakan ini untuk memperbanyak dataset survei kesehatan masyarakat sehingga model prediktif kami lebih robust."',
    testi_2_role: 'Peneliti Senior, Fakultas Kesehatan Masyarakat UI',
    testi_3_text: '"Sebagai peneliti dengan keterbatasan akses data pasien, SynthMed menjadi solusi augmentasi data yang etis. Hasil sintesis mempertahankan korelasi antar variabel dengan sangat baik."',
    testi_3_role: 'Dosen Riset, FK Universitas Gadjah Mada',

    // Footer
    footer_desc: 'Platform riset terbuka dan gratis untuk augmentasi dataset kesehatan. Dibuat oleh peneliti, untuk peneliti.',
    footer_col_platform: 'Platform',
    footer_col_researchers: 'Untuk Peneliti',
    footer_col_community: 'Komunitas',
    footer_link_start: 'Mulai Sintesis',
    footer_link_sample: 'Data Sample',
    footer_link_quality: 'Validasi Kualitas',
    footer_link_methods: 'Metode Sintesis',
    footer_link_docs: 'Dokumentasi',
    footer_link_tutorial: 'Tutorial & Panduan',
    footer_link_cite: 'Cara Sitasi',
    footer_link_faq: 'FAQ',
    footer_link_about: 'Tentang SynthMed',
    footer_link_pubs: 'Publikasi',
    footer_rights: '© 2026 SynthMed. Hak cipta dilindungi.',
    footer_tagline: '© 2026 SynthMed — Platform Riset Terbuka untuk Sintesis Dataset Kesehatan',
  },
  en: {
    // Common
    common_back: 'Back',
    common_close: 'Close',
    common_retry: 'Try again',
    unit_rows: 'rows',
    unit_columns: 'columns',
    aria_toggle_language: 'Switch language',
    aria_toggle_menu: 'Toggle menu',

    // Navbar
    nav_home: 'Home',
    nav_docs: 'Documentation',
    nav_synth: 'Synthesizer',
    nav_features: 'Features',
    nav_how: 'How It Works',
    nav_datasets: 'Datasets',
    nav_demo: 'Live Demo',
    nav_cta: 'Start Research',
    nav_back: 'Back',

    // Docs
    docs_badge: 'Documentation',
    docs_title: 'Complete Guide',
    docs_subtitle: 'Learn how to use the healthcare dataset synthesis platform from beginner to advanced.',
    docs_quick_start: 'Quick Start',
    docs_faq: 'FAQ',
    docs_toc_intro: 'Introduction',
    docs_toc_quick: 'Quick Start',
    docs_toc_sample: 'Sample Data',
    docs_toc_methods: 'Methods',
    docs_toc_quality: 'Quality',
    docs_toc_faq: 'FAQ',
    docs_toc_citation: 'Citation',

    page_title_docs: 'SynthMed — Documentation',
    docs_sec_getting_started: 'Getting Started',
    docs_sec_tech_ref: 'Technical Reference',
    docs_sec_help: 'Help',
    docs_sec_academic: 'Academic',

    docs_intro_h2: 'What is SynthMed?',
    docs_intro_callout_html: '<strong>SynthMed</strong> is an open research platform and <strong>100% free</strong>, built to help healthcare researchers augment (expand) their datasets using generative AI methods (GAN &amp; TVAE). Your data is processed transiently on our server for model training and periodically deleted to support privacy.',
    docs_intro_why_h3: 'Why Synthetic Data?',
    docs_intro_why_p: 'In healthcare research, access to patient data is often limited due to privacy regulations (HIPAA, GDPR). Synthetic data allows researchers to:',
    docs_intro_why_li1: 'Scale small datasets into larger ones (2×–100×)',
    docs_intro_why_li2: 'Preserve statistical distributions similar to the original data',
    docs_intro_why_li3: 'Reduce the risk of patient privacy violations',
    docs_intro_why_li4: 'Improve predictive model performance with more training data',
    docs_intro_features_h3: 'Key Features',
    docs_intro_feat1_title: 'Upload & Analyze',
    docs_intro_feat1_desc: 'Upload a CSV; the system automatically detects column types and distributions.',
    docs_intro_feat2_title: 'Two Neural Architectures',
    docs_intro_feat2_desc: 'Choose CTGAN for larger datasets or TVAE for smaller/sensitive datasets.',
    docs_intro_feat3_title: 'Quality Report',
    docs_intro_feat3_desc: 'Automatic comparison of original vs synthetic distributions.',
    docs_intro_feat4_title: 'Instant Download',
    docs_intro_feat4_desc: 'Download the synthetic dataset as CSV directly from your browser.',

    docs_qs_h2: 'Quick Start',
    docs_qs_p: 'Follow these four simple steps to create your first synthetic dataset:',
    docs_qs_step1_title: 'Upload a CSV Dataset',
    docs_qs_step1_desc_html: 'Open the <a href="synthesize.html">Synthesizer</a>, upload a CSV, or click <strong>"Use Sample Data"</strong> to try it right away.',
    docs_qs_step2_title: 'Set Configuration',
    docs_qs_step2_desc: 'Choose the multiplier (2×–100×), target columns, synthesis method, and training intensity (epochs).',
    docs_qs_step3_title: 'Generate Data',
    docs_qs_step3_desc: 'Click "Start Synthesis" and wait for the process to finish. The model will analyze patterns and generate new data.',
    docs_qs_step4_title: 'Review & Download',
    docs_qs_step4_desc: 'Review the quality report, compare distributions, then download the synthesized CSV.',
    docs_qs_tip_html: '<strong>Tip:</strong> Try the <a href="#sample-data">sample data</a> first to understand how the platform works.',

    docs_sample_h2: 'Sample Data',
    docs_sample_p_html: 'We provide a sample dataset with <strong>30 patient records</strong> and <strong>10 columns</strong> to try the platform:',
    docs_sample_box_title: '🏥 Patient Health Data',
    docs_sample_box_desc: 'Contains demographics, vital signs, lab results, and diagnoses. Great for practicing clinical data augmentation.',
    docs_sample_tag_rows: '30 rows',
    docs_sample_tag_cols: '10 columns',
    docs_sample_tag_numeric: '7 numeric',
    docs_sample_tag_categorical: '3 categorical',
    docs_sample_download: '📥 Download CSV',
    docs_sample_details_h3: 'Column Details',
    docs_sample_th_col: 'Column',
    docs_sample_th_type: 'Type',
    docs_sample_th_desc: 'Description',
    docs_sample_th_example: 'Example',
    docs_type_categorical: 'Categorical',
    docs_type_numeric: 'Numeric',
    docs_sample_col_patient_id_desc: 'Unique patient ID',
    docs_sample_col_age_desc: 'Patient age (years)',
    docs_sample_col_gender_desc: 'Gender',
    docs_sample_col_bp_sys_desc: 'Systolic blood pressure (mmHg)',
    docs_sample_col_bp_dia_desc: 'Diastolic blood pressure (mmHg)',
    docs_sample_col_hr_desc: 'Heart rate (bpm)',
    docs_sample_col_chol_desc: 'Total cholesterol (mg/dL)',
    docs_sample_col_sugar_desc: 'Blood sugar (mg/dL)',
    docs_sample_col_bmi_desc: 'Body Mass Index',
    docs_sample_col_dx_desc: 'Primary diagnosis',

    docs_methods_h2: 'AI Neural Architectures',
    docs_methods_p: 'SynthMed uses modern deep learning techniques (Generative Adversarial Networks & Variational Autoencoders) to synthesize medical data. Choose the model that matches your dataset characteristics:',
    docs_methods_ctgan_title: 'CTGAN Model',
    docs_methods_ctgan_desc: 'A Generative Adversarial Network optimized for tabular data. It uses a generator and discriminator to create new data that is statistically consistent.',
    docs_methods_how_h5: '🔧 How it Works:',
    docs_methods_ctgan_how1: 'Identify correlations across columns (multivariate analysis)',
    docs_methods_ctgan_how2: 'Train a neural network to learn the original distribution',
    docs_methods_ctgan_how3: 'Generate synthetic data with high diversity',
    docs_methods_pros_h5: '✅ Pros:',
    docs_methods_ctgan_pro1: 'Handles large datasets (>1,000 rows)',
    docs_methods_ctgan_pro2: 'Produces diverse, high-variation synthetic records',
    docs_methods_ctgan_best: 'Best for: Large & complex datasets',
    docs_methods_tvae_title: 'TVAE Model',
    docs_methods_tvae_desc: 'A Tabular Variational Autoencoder that uses an encoder-decoder architecture to map data into a latent space.',
    docs_methods_tvae_how1: 'The encoder compresses the original data into a compact mathematical representation',
    docs_methods_tvae_how2: 'The decoder reconstructs data from the latent representation',
    docs_methods_tvae_how3: 'Statistical regularization helps preserve distribution accuracy',
    docs_methods_tvae_pro1: 'High accuracy (higher similarity scores)',
    docs_methods_tvae_pro2: 'Very stable for small datasets (30–500 rows)',
    docs_methods_tvae_best: 'Best for: Small & sensitive datasets (EHR)',
    docs_methods_params_h3: 'Configuration Parameters',
    docs_methods_th_param: 'Parameter',
    docs_methods_th_range: 'Range',
    docs_methods_th_reco: 'Recommendation',
    docs_methods_th_desc: 'Description',
    docs_methods_param_multiplier_desc: 'How many times larger the output is compared to the original data',
    docs_methods_param_epochs_desc: 'Number of training iterations (higher is more accurate)',
    docs_methods_param_model_desc: 'Neural architecture to use based on dataset size',
    docs_methods_warning_html: '<strong>Note:</strong> More epochs yield a more accurate model but take longer to train. For medical datasets, start with 300–500 epochs.',

    docs_quality_h2: 'Quality Metrics',
    docs_quality_p: 'Each synthesis result includes an automatic quality report. Here are the metrics used:',
    docs_quality_dist_p: 'Measures how close the synthetic data distribution is to the original based on mean comparison:',
    docs_quality_formula_title: 'Formula',
    docs_quality_th_score: 'Score',
    docs_quality_th_rating: 'Rating',
    docs_quality_th_interp: 'Interpretation',
    docs_quality_rating1: '🟢 Excellent',
    docs_quality_interp1: 'Distribution is nearly identical to the original data',
    docs_quality_rating2: '🟡 Good',
    docs_quality_interp2: 'Minor differences; still suitable for research',
    docs_quality_rating3: '🟠 Fair',
    docs_quality_interp3: 'Needs further evaluation',
    docs_quality_rating4: '🔴 Poor',
    docs_quality_interp4: 'Try increasing epochs, switching to TVAE, or reducing the multiplier',
    docs_quality_more_h3: 'Additional Information',
    docs_quality_more_li1_html: '<strong>Total Rows Generated</strong> — Number of synthetic rows produced',
    docs_quality_more_li2_html: '<strong>Synthesized Columns</strong> — Number of selected columns to augment',
    docs_quality_more_li3_html: '<strong>Augmentation Factor</strong> — The multiplier used (e.g., 5×)',
    docs_quality_more_li4_html: '<strong>Comparison Tab</strong> — Mean, min, max of original vs synthetic per column',

    docs_faq_h2: 'FAQ (Common Questions)',
    docs_faq_q1: 'Is SynthMed really free?',
    docs_faq_a1: 'Yes—100% free with no limitations. No paid plans, no credit card required, and full access to all features.',
    docs_faq_q2: 'Is my data safe?',
    docs_faq_a2: 'Yes. While data is sent to the server for AI processing (due to compute requirements), it is handled <strong>stateless &amp; transient</strong>. Data is not stored permanently and sessions are automatically deleted after 1 hour.',
    docs_faq_q3: 'What is the maximum upload size?',
    docs_faq_a3: 'Maximum 10MB. For larger files, we recommend splitting the dataset into smaller parts.',
    docs_faq_q4: 'Which file formats are supported?',
    docs_faq_a4: 'Currently only <strong>CSV</strong> (Comma-Separated Values) with a header in the first row and comma delimiters. Excel (.xlsx) support will be added.',
    docs_faq_q5: 'Which model should I use?',
    docs_faq_a5: 'Use <strong>CTGAN</strong> if your data is complex and has many rows (&gt;1,000). Use <strong>TVAE</strong> if your dataset is smaller (&lt;500 rows), as the VAE architecture is more stable for mapping small datasets into latent space.',
    docs_faq_q6: 'Can the synthetic output be used in scientific publications?',
    docs_faq_a6: 'Yes. Be sure to describe the augmentation method in your paper’s methodology section. See <a href="#citation">How to Cite</a> below.',
    docs_faq_q7: 'How many epochs are recommended?',
    docs_faq_a7: 'For medical research: <strong>300–500 epochs</strong> is usually enough. Use higher (600–1,000) if quality is not satisfactory, but expect longer training times.',

    docs_cite_h2: 'How to Cite',
    docs_cite_p: 'If you use SynthMed in your research, please cite:',
    docs_cite_apa: 'APA Format',
    docs_cite_thanks_html: '<strong>Thank you!</strong> By citing SynthMed, you help us improve the platform for more researchers.',

    // Synthesizer
    page_title_synth: 'SynthMed — Dataset Synthesis',
    synth_label: 'Dataset Synthesizer',
    synth_title_1: 'Synthesize',
    synth_title_2: 'Dataset',
    synth_title_3: 'Your',
    synth_subtitle: 'Upload your CSV dataset, set parameters, and generate new synthetic data that preserves the original statistical distribution.',
    synth_step_dataset: 'Dataset',
    synth_step_synthesis: 'Synthesis',
    synth_step_results: 'Results',

    synth_step1_title: 'Upload Dataset',
    synth_step1_desc: 'Upload your CSV file. Maximum size is 10MB.',
    synth_upload_drag_title: 'Drag & drop your CSV here',
    synth_upload_drag_sub: 'or click to choose a file',
    synth_upload_choose: 'Choose File',
    synth_or_sample: 'or try with sample data',
    synth_use_sample: 'Use Sample Data (30 patients)',
    synth_preview_title: 'Data Preview (first 5 rows)',
    synth_pick_columns: 'Select Target Columns',
    synth_pick_columns_help: 'Choose which columns you want to include in the AI synthesis process.',
    synth_next_to_config: 'Continue to Configuration →',

    synth_step2_title: 'Data Enrichment Configuration',
    synth_step2_desc: 'Set AI model parameters to generate the best synthetic dataset.',
    synth_notice_title: 'Something went wrong',
    synth_multiplier_label: 'Augmentation Factor',
    synth_multiplier_help: 'How many times larger the output should be',
    synth_multiplier_suffix: '×',
    synth_output_estimate: 'Estimate: 60 output rows',
    synth_model_label: 'AI Model Architecture',
    synth_model_help: 'Choose the deep learning algorithm to use',
    synth_model_ctgan_suffix: '(Standard)',
    synth_model_tvae_suffix: '(High Precision)',
    synth_model_hint: 'TVAE is often more accurate for small datasets (< 100 rows).',
    synth_epochs_label: 'Training Intensity (Epochs)',
    synth_epochs_help: 'Higher is more accurate, but slower',
    synth_speed: 'Fast',
    synth_accurate: 'Accurate',
    synth_start: 'Start Synthesis ⚡',
    synth_progress_title: 'AI Synthesis Process',
    synth_progress_desc: 'The model is analyzing patterns and generating synthetic data...',
    synth_run_dataset: 'Dataset',
    synth_run_columns: 'Columns',
    synth_run_model: 'Model',
    synth_run_epochs: 'Epochs',
    synth_run_target: 'Target Output',
    synth_run_session: 'Session',
    synth_run_hint: 'Tip: while the process runs, avoid refreshing/closing the tab so progress is not interrupted.',
    synth_gen_1: 'Analyzing column distributions...',
    synth_gen_2: 'Computing statistical parameters...',
    synth_gen_3: 'Generating synthetic data...',
    synth_gen_4: 'Validating quality & consistency...',
    synth_overall_initial: '0% complete',

    synth_done_title: 'Synthesis Complete!',
    synth_done_desc: 'Your synthetic dataset is ready. Here are the results and quality statistics.',
    synth_quality_title: 'Quality Report',
    synth_tab_synthetic: 'Synthetic Data',
    synth_tab_comparison: 'Comparison',
    synth_table_note_prefix: 'Showing the first 10 rows of',
    synth_new: 'New Synthesis',
    synth_download: 'Download CSV',

    // Synthesizer (runtime messages)
    synth_file_too_large: 'File too large! Maximum size is 10MB.',
    synth_csv_min_rows: 'The CSV must have at least 2 lines (header + data).',
    synth_no_valid_data: 'No valid data found.',
    synth_summary_numeric_suffix: 'numeric columns',
    synth_summary_categorical_suffix: 'categorical columns',
    synth_output_estimate_tpl: 'Estimate: {n} output rows',
    synth_config_incomplete_title: 'Configuration incomplete',
    synth_config_incomplete_msg: 'Select at least 1 target column to synthesize.',
    synth_backend_error_generic: 'An error occurred on the backend.',
    synth_training_failed_title: 'Training failed',
    synth_training_incomplete_title: 'Training did not complete',
    synth_training_incomplete_msg: 'Training ended without a completion confirmation from the server. Please try again. (Details: check Console/F12)',
    synth_backend_unreachable_title: 'Unable to reach backend',
    synth_backend_unreachable_msg_tpl: 'Error: {error}. Make sure the Python server is running at {base}.',
    synth_err_training_timeout: 'Training timed out — no server update for 10 minutes.',
    synth_err_session_missing: 'Session is not ready yet. Please run training again.',
    synth_status_read_csv: 'Reading CSV file...',
    synth_status_data_loaded_tpl: 'Loaded: {r} rows, {c} columns',
    synth_status_preprocessing: 'Preprocessing data (cleaning, deduplicate)...',
    synth_status_metadata_analyze: 'Analyzing metadata & column distributions...',
    synth_status_metadata_ok_tpl: 'Metadata OK: {c} columns detected',
    synth_status_init_model_tpl: 'Initializing {m} ({d})...',
    synth_status_init_model_simple_tpl: 'Initializing {m}...',
    synth_status_training_start_tpl: 'Training {m} ({e} epochs, {r} rows)...',
    synth_fetching_synthetic: 'Fetching synthetic data from the model...',
    synth_model_ready_fetching: 'Model ready, fetching data...',
    synth_percent_complete_tpl: '{p}% complete',
    synth_percent_complete_time_tpl: '{p}% complete · {t}',
    synth_training_progress_tpl: 'Neural Training: {p}%',
    synth_training_progress_time_tpl: 'Neural Training: {p}% · {t}',
    synth_training_complete_tpl: 'Training completed in {t} seconds!',
    synth_synthetic_generated: 'Synthetic data generated successfully!',
    synth_complete_celebration: '100% Complete! 🎉',
    synth_synthesis_failed_title: 'Synthesis failed',
    synth_synthesis_failed_msg_prefix: 'Failed to generate synthetic data from the model.',
    synth_quality_loading_title: '⏳ Evaluating quality...',
    synth_quality_loading_desc: 'Computing KSComplement, TVComplement, CorrelationSimilarity via SDMetrics',
    synth_quality_overall_label: 'Overall Score (SDMetrics)',
    synth_quality_shapes_label: 'Column Shapes (KS + TV)',
    synth_quality_pairs_label: 'Pair Trends (Correlation)',
    synth_quality_total_rows_label_tpl: 'Total Rows × {m}x',
    synth_quality_per_column_title: '📊 Per-column Score',
    synth_quality_backend_failed: 'Failed to reach SDMetrics evaluation. Using local estimate.',
    synth_quality_local_estimate_label: 'Local Estimate (Mean/Std)',
    synth_comparison_mean_label: 'Mean (original → AI)',
    synth_comparison_std_label: 'Std (original → AI)',
    synth_comparison_min_label: 'Min (original → AI)',
    synth_comparison_max_label: 'Max (original → AI)',
    // Hero
    page_title_index: 'SynthMed — Open Research Platform for Healthcare Dataset Synthesis',
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
    chart_var_age: 'Age',
    chart_var_bp_sys: 'Systolic BP',
    chart_var_glucose: 'Glucose',
    chart_var_bmi: 'BMI',
    chart_var_hemoglobin: 'Hemoglobin',
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
    features_card1_title: 'Smart Augmentation',
    features_card1_desc: 'Upload your small dataset and our AI learns its distribution patterns, then generates new synthetic data that remains statistically consistent.',
    features_card2_title: 'Privacy Preserved',
    features_card2_desc: 'Your original data is never stored on the server. The synthesis process protects patient privacy through differential privacy mechanisms.',
    features_card3_title: 'Statistical Validation',
    features_card3_desc: 'Automated quality checks cover distributions, correlations, and consistency checks against international medical standards.',
    features_card4_title: 'Real-time Generation',
    features_card4_desc: 'GPU-accelerated infrastructure that can generate millions of synthetic records in minutes.',
    features_card5_title: 'Multi-format Export',
    features_card5_desc: 'Download results in CSV, JSON, Excel, or FHIR—ready for analysis in Python, R, or SPSS.',
    features_card6_title: 'HL7 & FHIR Standards',
    features_card6_desc: 'Datasets are produced to match HL7 FHIR interoperability standards, ready for EHR systems.',
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
    demo_ai_synthesis: 'AI Synthesis',

    // How It Works
    how_label: 'How It Works',
    how_title_1: 'Four',
    how_title_2: 'Steps',
    how_subtitle: 'From setup to a ready-to-use dataset, the synthetic data generation flow is simple and intuitive.',
    how_step1_title: 'Upload Your Dataset',
    how_step1_desc: 'Upload your research dataset in CSV or Excel. The system automatically analyzes structure, data types, and column distributions.',
    how_step2_title: 'Set Output Size',
    how_step2_desc: 'Choose how many synthetic records to generate — from 2× up to 100× your original dataset.',
    how_step3_title: 'AI Synthesis & Validation',
    how_step3_desc: 'The model learns patterns and generates new data. Automatic checks validate statistical consistency with the original.',
    how_step4_title: 'Download & Use',
    how_step4_desc: 'Download the augmented dataset in your preferred format. Ready for analysis and publication.',

    // Dataset Types
    types_label: 'Dataset Types',
    types_title_1: 'Multiple',
    types_title_2: 'Healthcare',
    types_title_3: 'Data Types',
    types_subtitle: 'We support multiple medical dataset types for research, development, and education.',
    types_ehr_title: 'Electronic Health Records (EHR)',
    types_ehr_desc: 'Complete synthetic patient data covering demographics, diagnoses, procedures, prescriptions, lab results, and visit history.',
    types_lab_title: 'Laboratory & Pathology Data',
    types_lab_desc: 'Synthetic lab results with realistic values for hematology, blood chemistry, urinalysis, and more.',
    types_pharma_title: 'Pharmacy & Medication Data',
    types_pharma_desc: 'Datasets for prescribing, drug interactions, adverse events, and pharmacokinetics for pharmacology research.',
    types_genomics_title: 'Genomics & Biomarkers',
    types_genomics_desc: 'Synthetic genomic sequences, SNP data, gene expression, and biomarkers for precision medicine research.',

    // Stats
    stats_label_records: 'Synthetic Records',
    stats_label_researchers: 'Active Researchers',
    stats_label_institutions: 'Universities & Institutions',
    stats_label_publications: 'Scientific Publications',

    // Testimonials
    testimonials_label: 'Researcher Testimonials',
    testimonials_title_1: 'Trusted By',
    testimonials_title_2: 'Researchers',
    testimonials_title_3: 'Across Indonesia',
    testimonials_subtitle: 'Stories from researchers using SynthMed to expand their research datasets.',
    testi_1_text: '"My dataset started with only 200 samples, and it can be augmented to 5,000 with very consistent distributions. This really helps my thesis research."',
    testi_1_role: 'Research Student, Faculty of Medicine, Universitas Airlangga',
    testi_2_text: '"An amazing platform—and most importantly, it is free! We use it to expand public health survey data so our predictive models become more robust."',
    testi_2_role: 'Senior Researcher, Faculty of Public Health, Universitas Indonesia',
    testi_3_text: '"With limited access to patient data, SynthMed is an ethical augmentation solution. The synthesis preserves inter-variable correlations remarkably well."',
    testi_3_role: 'Research Lecturer, Faculty of Medicine, Universitas Gadjah Mada',

    // Footer
    footer_desc: 'A free and open research platform for healthcare dataset augmentation. Built by researchers, for researchers.',
    footer_col_platform: 'Platform',
    footer_col_researchers: 'For Researchers',
    footer_col_community: 'Community',
    footer_link_start: 'Start Synthesis',
    footer_link_sample: 'Sample Data',
    footer_link_quality: 'Quality Validation',
    footer_link_methods: 'Synthesis Methods',
    footer_link_docs: 'Documentation',
    footer_link_tutorial: 'Tutorials & Guides',
    footer_link_cite: 'How to Cite',
    footer_link_faq: 'FAQ',
    footer_link_about: 'About SynthMed',
    footer_link_pubs: 'Publications',
    footer_rights: '© 2026 SynthMed. All rights reserved.',
    footer_tagline: '© 2026 SynthMed — Open Research Platform for Healthcare Dataset Synthesis',
  }
};

let currentLang = localStorage.getItem('synthmed_lang') || 'id';

function getLocaleForLang(lang) {
  return lang === 'en' ? 'en-US' : 'id-ID';
}

function t(key, fallback) {
  const table = translations[currentLang];
  if (!table) return fallback !== undefined ? fallback : key;
  const val = table[key];
  if (val === undefined) return fallback !== undefined ? fallback : key;
  return val;
}

function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) {
      el.setAttribute('placeholder', t[key]);
    }
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (t[key] !== undefined) {
      el.setAttribute('title', t[key]);
    }
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria-label');
    if (t[key] !== undefined) {
      el.setAttribute('aria-label', t[key]);
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

  try {
    window.dispatchEvent(new CustomEvent('synthmed:langchange', {
      detail: { lang, locale: getLocaleForLang(lang) }
    }));
  } catch {
    // Ignore if CustomEvent is not available
  }
}

// Small global helper so other scripts can translate dynamic strings.
window.SynthMedI18n = {
  t: (key, fallback) => {
    const table = translations[currentLang];
    if (!table) return fallback !== undefined ? fallback : key;
    const val = table[key];
    if (val === undefined) return fallback !== undefined ? fallback : key;
    return val;
  },
  getLang: () => currentLang,
  getLocale: () => getLocaleForLang(currentLang),
  setLang: (lang) => applyTranslations(lang)
};

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
    { key: 'chart_var_age', fallback: 'Usia', orig: 72, synth: 74 },
    { key: 'chart_var_bp_sys', fallback: 'TD Sistolik', orig: 65, synth: 68 },
    { key: 'chart_var_glucose', fallback: 'Glukosa', orig: 58, synth: 60 },
    { key: 'chart_var_bmi', fallback: 'BMI', orig: 80, synth: 78 },
    { key: 'chart_var_hemoglobin', fallback: 'Hemoglobin', orig: 45, synth: 47 },
  ];

  chartBars.innerHTML = '';
  variables.forEach((v, i) => {
    const labelText = t(v.key, v.fallback);
    const group = document.createElement('div');
    group.className = 'chart-bar-group';
    group.style.animationDelay = `${i * 0.15 + 0.5}s`;
    group.innerHTML = `
      <div class="chart-bar-label" data-i18n="${v.key}">${labelText}</div>
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
    const locale = getLocaleForLang(currentLang);
    const inputVal = parseInt(slider.value);
    const outputVal = inputVal * currentMult;

    sliderVal.textContent = inputVal.toLocaleString(locale);
    demoOutput.textContent = outputVal.toLocaleString(locale);
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

    const locale = getLocaleForLang(currentLang);

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
        <span class="legend-dot original"></span><span>${input.toLocaleString(locale)}</span>
        <span class="legend-dot synthetic"></span><span>${output.toLocaleString(locale)}</span>
      </div>`;
  }

  // Reformat numbers when language changes
  window.addEventListener('synthmed:langchange', () => {
    updateDemo();
  });

  // Initialize
  updateDemo();
}
