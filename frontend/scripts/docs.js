// ===== DOCS PAGE INTERACTIONS =====

document.addEventListener('DOMContentLoaded', () => {
  initDocsMobileMenu();
  initDocsSmoothScroll();
  initDocsActiveToc();
  initDocsScrollReveal();
  initDocsHashFlash();

  // i18n swaps some innerHTML (data-i18n-html), which can recreate anchors.
  // Re-bind smooth scroll handlers after language changes (idempotent).
  window.addEventListener('synthmed:langchange', () => {
    initDocsSmoothScroll();
  });
});

function initDocsMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

function getNavOffset() {
  const navbar = document.querySelector('.navbar');
  return navbar ? navbar.offsetHeight + 12 : 70;
}

function initDocsSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    if (a.dataset.synthmedSmoothScroll === '1') return;
    a.dataset.synthmedSmoothScroll = '1';

    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.pageYOffset - getNavOffset();
      window.scrollTo({ top, behavior: 'smooth' });

      flashSection(target);

      if (history && typeof history.pushState === 'function') {
        history.pushState(null, '', href);
      }
    });
  });
}

function initDocsActiveToc() {
  const sections = Array.from(document.querySelectorAll('.doc-section[id]'));
  const tocLinks = Array.from(document.querySelectorAll('.toc-link'));
  if (sections.length === 0 || tocLinks.length === 0) return;

  const tocById = new Map();
  tocLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.startsWith('#')) tocById.set(href.slice(1), link);
  });

  const setActive = (id) => {
    tocLinks.forEach(l => l.classList.remove('active'));
    const active = tocById.get(id);
    if (active) active.classList.add('active');
  };

  // IntersectionObserver for stable active section detection
  const observer = new IntersectionObserver((entries) => {
    // pick the most visible section
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visible.length > 0) {
      const id = visible[0].target.getAttribute('id');
      if (id) setActive(id);
    }
  }, {
    threshold: [0.25, 0.5, 0.75],
    rootMargin: '-25% 0px -55% 0px'
  });

  sections.forEach(sec => observer.observe(sec));

  // Initial state for direct hash navigation
  const initialHash = (window.location.hash || '').replace('#', '');
  if (initialHash) setActive(initialHash);
}

function initDocsScrollReveal() {
  const selectors = [
    '.docs-hero-inner',
    '.doc-section',
    '.callout',
    '.features-row .feat-card',
    '.steps-row .step-card',
    '.sample-box',
    '.table-box',
    '.compare-row .compare-card',
    '.code-box',
    '.faq-list .faq',
    '.cite-box',
    '.docs-footer'
  ];

  const elements = new Set();
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => elements.add(el));
  });

  if (elements.size === 0) return;

  elements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

function flashSection(el) {
  if (!el) return;
  el.classList.remove('section-flash');
  void el.offsetWidth; // force reflow
  el.classList.add('section-flash');
  window.setTimeout(() => el.classList.remove('section-flash'), 900);
}

function initDocsHashFlash() {
  const hash = window.location.hash;
  if (!hash) return;
  const target = document.querySelector(hash);
  if (!target) return;
  window.setTimeout(() => flashSection(target), 250);
}
