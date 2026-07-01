/* ══════════════════════════════════════════
   NexusPlay — Landing Page Scripts
   ══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // ─── MOBILE NAV ───
  const mobileNav = document.getElementById('mobile-nav');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNavClose = document.getElementById('mobile-nav-close');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  function openMobileNav() {
    mobileNav.classList.add('mobile-nav--active');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNav() {
    mobileNav.classList.remove('mobile-nav--active');
    document.body.style.overflow = '';
  }
  menuToggle.addEventListener('click', openMobileNav);
  mobileNavClose.addEventListener('click', closeMobileNav);
  mobileNavOverlay.addEventListener('click', closeMobileNav);
  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });
  // ─── CATEGORY TABS ───
  const tabs = document.querySelectorAll('.category-nav__tab');
  const tabContents = document.querySelectorAll('.category-nav__items');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('category-nav__tab--active'));
      tab.classList.add('category-nav__tab--active');
      tabContents.forEach(content => {
        content.classList.remove('category-nav__items--active');
        if (content.dataset.content === target) {
          content.classList.add('category-nav__items--active');
        }
      });
    });
  });
  // ─── STAT COUNTER ANIMATION ───
  const statNumbers = document.querySelectorAll('.hero__stat-number');
  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }
  // ─── PARTICLES ───
  const particlesContainer = document.getElementById('particles');
  function createParticles() {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('hero__particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = (60 + Math.random() * 40) + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (6 + Math.random() * 6) + 's';
      particle.style.width = (2 + Math.random() * 3) + 'px';
      particle.style.height = particle.style.width;
      if (Math.random() > 0.7) {
        particle.style.background = '#D4AF37';
      }
      particlesContainer.appendChild(particle);
    }
  }
  createParticles();
  // ─── SCROLL REVEAL ───
  const revealElements = document.querySelectorAll(
    '.feature-card, .showcase__card, .testimonial-card, .cta-banner__container'
  );
  revealElements.forEach(el => el.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger animation
        setTimeout(() => {
          entry.target.classList.add('reveal--visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });
  revealElements.forEach(el => observer.observe(el));
  // Also trigger counter animation when hero stats are visible
  const heroStats = document.querySelector('.hero__stats');
  let countersStarted = false;
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        statNumbers.forEach(el => animateCounter(el));
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  if (heroStats) {
    statsObserver.observe(heroStats);
  }
  // ─── STICKY HEADER SHADOW ───
  const header = document.getElementById('main-header');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 10) {
      header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
      header.style.borderBottomColor = 'transparent';
    } else {
      header.style.boxShadow = 'none';
      header.style.borderBottomColor = '';
    }
    lastScroll = scrollY;
  }, { passive: true });
  // ─── SEARCH INPUT FOCUS ───
  const searchInput = document.getElementById('search-input');
  const searchContainer = document.getElementById('search-container');
  if (searchInput && searchContainer) {
    searchInput.addEventListener('focus', () => {
      searchContainer.style.transform = 'scale(1.02)';
      searchContainer.style.transition = 'transform 0.3s ease';
    });
    searchInput.addEventListener('blur', () => {
      searchContainer.style.transform = 'scale(1)';
    });
  }
  // ─── SMOOTH SCROLL FOR HASH LINKS ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});