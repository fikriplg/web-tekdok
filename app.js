// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initParticles();
  initScrollReveal();
  initCounters();
  initCursorGlow();
  initSmoothScroll();
  initInteractiveElements();
});

// ===== NAVBAR SCROLL EFFECT =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ===== PARTICLES =====
function initParticles() {
  const container = document.getElementById('heroParticles');
  const particleCount = 25;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 8;
    const delay = Math.random() * 10;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    // Random colors
    const colors = [
      'rgba(13, 148, 136, 0.6)',
      'rgba(6, 182, 212, 0.5)',
      'rgba(16, 185, 129, 0.5)',
      'rgba(34, 211, 238, 0.4)',
    ];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(particle);
  }
}

// ===== SCROLL REVEAL ANIMATIONS =====
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation for items in the same section
        const siblings = entry.target.parentElement.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        let delay = 0;

        siblings.forEach((sibling, i) => {
          if (sibling === entry.target) {
            delay = i * 100;
          }
        });

        setTimeout(() => {
          entry.target.classList.add('active');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// ===== COUNTER ANIMATION =====
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const isDecimal = el.dataset.decimal === 'true';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);

    let current = eased * target;

    if (isDecimal) {
      el.textContent = current.toFixed(1) + suffix;
    } else {
      current = Math.floor(current);
      if (current >= 1000000) {
        el.textContent = (current / 1000000).toFixed(1) + 'M' + suffix.replace('M+', '+');
      } else if (current >= 1000) {
        el.textContent = current.toLocaleString('id-ID') + suffix;
      } else {
        el.textContent = current + suffix;
      }
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      // Ensure final value is exact
      if (isDecimal) {
        el.textContent = target.toFixed(1) + suffix;
      } else if (target >= 1000000) {
        el.textContent = (target / 1000000).toFixed(1) + suffix;
      } else {
        el.textContent = target.toLocaleString('id-ID') + suffix;
      }
    }
  }

  requestAnimationFrame(update);
}

// ===== CURSOR GLOW EFFECT =====
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');

  // Only on desktop
  if (window.innerWidth < 768) {
    glow.style.display = 'none';
    return;
  }

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        const navHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== INTERACTIVE ELEMENTS =====
function initInteractiveElements() {
  // Button ripple effect
  document.querySelectorAll('.btn-primary, .btn-secondary, .pricing-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();

      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.3);
        width: 100px;
        height: 100px;
        left: ${e.clientX - rect.left - 50}px;
        top: ${e.clientY - rect.top - 50}px;
        transform: scale(0);
        animation: ripple-effect 0.6s ease forwards;
        pointer-events: none;
      `;

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-effect {
      to { transform: scale(4); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // CTA email interaction
  const ctaBtn = document.getElementById('btnCta');
  const ctaEmail = document.getElementById('ctaEmail');

  if (ctaBtn && ctaEmail) {
    ctaBtn.addEventListener('click', () => {
      const email = ctaEmail.value.trim();
      if (email && email.includes('@')) {
        ctaBtn.textContent = '✓ Terdaftar!';
        ctaBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        ctaEmail.value = '';

        setTimeout(() => {
          ctaBtn.innerHTML = '<span>🚀</span> Daftar Sekarang';
          ctaBtn.style.background = '';
        }, 3000);
      } else {
        ctaEmail.style.borderColor = '#ef4444';
        ctaEmail.setAttribute('placeholder', 'Masukkan email yang valid...');

        setTimeout(() => {
          ctaEmail.style.borderColor = '';
          ctaEmail.setAttribute('placeholder', 'Masukkan email Anda...');
        }, 2000);
      }
    });
  }

  // Typing effect for hero visual code (retrigger)  
  initCodeTypingLoop();
}

// ===== CODE TYPING LOOP =====
function initCodeTypingLoop() {
  const codeLines = document.querySelectorAll('.visual-code .line');
  if (codeLines.length === 0) return;

  // Re-animate code lines every 15 seconds
  setInterval(() => {
    codeLines.forEach((line, i) => {
      line.style.animation = 'none';
      line.offsetHeight; // Force reflow
      line.style.animation = `typeIn 0.5s ease ${i * 0.3}s forwards`;
      line.style.opacity = '0';
    });

    // Re-animate progress bar
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
      progressFill.style.animation = 'none';
      progressFill.offsetHeight;
      progressFill.style.animation = 'fillBar 2s ease 2.5s forwards';
      progressFill.style.width = '0';
    }
  }, 15000);
}

// ===== PARALLAX EFFECT ON HERO =====
window.addEventListener('scroll', () => {
  const hero = document.getElementById('hero');
  const scrolled = window.pageYOffset;
  const heroHeight = hero.offsetHeight;

  if (scrolled < heroHeight) {
    const bgImage = hero.querySelector('.hero-bg-image');
    if (bgImage) {
      bgImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }
});

// ===== PLATFORM ACTIVITY DASHBOARD =====
function initActivityDashboard() {
  const canvas = document.getElementById('waveCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let waveOffset = 0;

  function resizeWave() { canvas.width = canvas.offsetWidth || 800; }
  resizeWave();
  window.addEventListener('resize', resizeWave);

  const waves = [
    { freq: 0.035, amp: 14, speed: 0.55, color: 'rgba(13,148,136,0.75)' },
    { freq: 0.065, amp:  9, speed: 0.85, color: 'rgba(6,182,212,0.55)'  },
    { freq: 0.10,  amp:  5, speed: 1.20, color: 'rgba(16,185,129,0.45)' },
  ];

  function drawActivityWave() {
    const w = canvas.width, h = canvas.height, cy = h / 2;
    ctx.clearRect(0, 0, w, h);
    waves.forEach(wave => {
      ctx.beginPath();
      for (let x = 0; x <= w; x++) {
        const spikePhase = (x * 0.02 + waveOffset * wave.speed * 0.25) * 3;
        const spike = Math.sin(spikePhase) > 0.93
          ? Math.sin(spikePhase * 18) * 18 : 0;
        const y = cy + Math.sin(x * wave.freq + waveOffset * wave.speed) * wave.amp + spike;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = wave.color;
      ctx.lineWidth = 1.8;
      ctx.lineJoin = 'round';
      ctx.stroke();
    });
    waveOffset += 0.45;
    requestAnimationFrame(drawActivityWave);
  }
  drawActivityWave();

  // Live counter fluctuation
  let synthCount = 127, onlineCount = 43, recordsToday = 2510000;
  const elSynth   = document.getElementById('activeSynthVal');
  const elOnline  = document.getElementById('onlineResVal');
  const elRecords = document.getElementById('recordsGenVal');

  setInterval(() => {
    synthCount   = Math.max(100, Math.min(160, synthCount   + Math.round((Math.random() - 0.45) * 5)));
    onlineCount  = Math.max( 30, Math.min( 70, onlineCount  + Math.round((Math.random() - 0.5)  * 3)));
    recordsToday += Math.floor(Math.random() * 900 + 100);
    if (elSynth)   elSynth.textContent   = synthCount;
    if (elOnline)  elOnline.textContent  = onlineCount;
    if (elRecords) elRecords.textContent = (recordsToday / 1_000_000).toFixed(2) + 'M+';
  }, 2800);

  // Activity feed auto-inject
  const feedData = [
    { name: 'Dr. Siti R.',       inst: 'UB',    action: 'Sintesis 2.000 data farmasi',        dot: 'teal'    },
    { name: 'Rizky M, M.Biomed', inst: 'USU',   action: 'Upload 500 record survei gizi',      dot: 'cyan'    },
    { name: 'Prof. Dewi L.',     inst: 'UNDIP', action: 'Hasilkan 15.000 data EHR',           dot: 'emerald' },
    { name: 'Dr. Adit W.',       inst: 'UNPAD', action: 'Augmentasi data genomik 8.500 rec',  dot: 'teal'    },
    { name: 'Maya P, S.Ked',     inst: 'UNHAS', action: 'Export dataset ke format FHIR',      dot: 'cyan'    },
  ];
  let feedIdx = 0;

  setInterval(() => {
    const feed = document.getElementById('activityFeed');
    if (!feed) return;
    const item = feedData[feedIdx % feedData.length];
    feedIdx++;
    const el = document.createElement('div');
    el.className = 'feed-item';
    el.innerHTML = `
      <span class="feed-dot ${item.dot}"></span>
      <span class="feed-text"><strong>${item.name}</strong> — ${item.inst} · ${item.action}</span>`;
    feed.insertBefore(el, feed.firstChild);
    if (feed.children.length > 3) feed.removeChild(feed.lastChild);
  }, 3500);
}

document.addEventListener('DOMContentLoaded', initActivityDashboard);
