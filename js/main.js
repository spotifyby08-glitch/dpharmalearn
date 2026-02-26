/* ============================================
   D-PHARMA EDUCATIONAL WEBSITE - JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile Nav Toggle ── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const body = document.body;

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        body.style.overflow = '';
      });
    });
  }

  /* ── Active Nav Link ── */
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Accordion ── */
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // Close all (optional – comment out for multi-open)
      document.querySelectorAll('.accordion-item.open').forEach(i => i.classList.remove('open'));

      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── Scroll Reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ── ToC active link on scroll ── */
  const tocLinks = document.querySelectorAll('.toc a');
  if (tocLinks.length) {
    const headings = document.querySelectorAll('.chapter-content h2, .chapter-content h3');
    const observerToc = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tocLinks.forEach(l => l.classList.remove('active'));
          const match = document.querySelector(`.toc a[href="#${entry.target.id}"]`);
          if (match) match.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    headings.forEach(h => observerToc.observe(h));
  }

  /* ── Contact Form ── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
      btn.disabled = true;
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        btn.style.background = '';
        contactForm.reset();
      }, 4000);
    });
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Open first accordion by default ── */
  const firstAccordion = document.querySelector('.accordion-item');
  if (firstAccordion && !firstAccordion.classList.contains('open')) {
    firstAccordion.classList.add('open');
  }

});
                          
