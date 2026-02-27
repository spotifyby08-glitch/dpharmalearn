/* ============================================================
   D-Pharma Learn — Optimized main.js
   Mobile Optimized + Null Safe + Performance Improved
   ============================================================ */

'use strict';

/* ────────────────────────────────────────────────────────────
   DOM READY
──────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  const doc = document;
  const root = document.documentElement;
  const body = document.body;

  /* ============================================================
     1. HAMBURGER MENU (Event Delegation)
  ============================================================ */
  const hamburger = doc.getElementById('hamburger');
  const mobileNav = doc.getElementById('mobileNav');

  if (hamburger && mobileNav) {

    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Event delegation (better than adding many listeners)
    mobileNav.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }


  /* ============================================================
     2. ACCORDION (Safer + Efficient)
  ============================================================ */
  doc.addEventListener('click', (e) => {
    const trigger = e.target.closest('.accordion-trigger');
    if (!trigger) return;

    const item = trigger.closest('.accordion-item');
    if (!item) return;

    const isOpen = item.classList.contains('open');

    doc.querySelectorAll('.accordion-item.open').forEach(i => {
      i.classList.remove('open');
      const t = i.querySelector('.accordion-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });


  /* ============================================================
     3. SCROLL REVEAL (Mobile Friendly)
  ============================================================ */
  const revealEls = doc.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(el => observer.observe(el));
  }


  /* ============================================================
     4. DARK / LIGHT MODE
  ============================================================ */
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('dpharma-theme', theme);
  }

  const savedTheme = localStorage.getItem('dpharma-theme') || 'dark';
  applyTheme(savedTheme);

  const navCta = doc.querySelector('.nav-cta');

  if (navCta) {
    const btn = doc.createElement('button');
    btn.id = 'darkModeToggle';
    btn.className = 'btn btn-outline btn-sm';
    btn.innerHTML = '🌙';
    btn.style.marginRight = '.5rem';

    navCta.prepend(btn);

    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
      btn.textContent = current === 'dark' ? '☀️' : '🌙';
    });
  }


  /* ============================================================
     5. SEARCH (Debounced + Optimized)
  ============================================================ */

  const searchData = window.searchData || [];

  function debounce(fn, delay = 250) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  function initSearch() {
    const header = doc.querySelector('.site-header');
    if (!header) return;

    const overlay = doc.createElement('div');
    overlay.id = 'searchOverlay';
    overlay.style.cssText = `
      display:none; position:fixed; inset:0;
      background:rgba(0,0,0,.85);
      padding:2rem 1rem; z-index:9999;
    `;

    overlay.innerHTML = `
      <div style="max-width:600px;margin:auto;">
        <input id="searchInput" type="text"
          placeholder="Search..."
          style="width:100%;padding:1rem;border-radius:10px;border:none;">
        <div id="searchResults" style="margin-top:1rem;"></div>
      </div>
    `;

    body.appendChild(overlay);

    const btn = doc.createElement('button');
    btn.textContent = '🔍';
    btn.className = 'btn btn-outline btn-sm';
    navCta?.prepend(btn);

    btn.addEventListener('click', () => {
      overlay.style.display = 'block';
      doc.getElementById('searchInput')?.focus();
    });

    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.style.display = 'none';
    });

    const input = doc.getElementById('searchInput');
    const resultsEl = doc.getElementById('searchResults');

    if (!input || !resultsEl) return;

    input.addEventListener('input', debounce((e) => {
      const q = e.target.value.trim().toLowerCase();
      if (q.length < 2) {
        resultsEl.innerHTML = '';
        return;
      }

      const results = searchData.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.subject.toLowerCase().includes(q)
      ).slice(0, 10);

      resultsEl.innerHTML = results.map(r =>
        `<a href="${r.url}" style="display:block;padding:.75rem 0;border-bottom:1px solid #ccc;">
          ${r.title}
        </a>`
      ).join('');

    }, 300));
  }

  initSearch();


  /* ============================================================
     6. PROGRESS TRACKER
  ============================================================ */

  function initProgress() {
    const chapterContent = doc.querySelector('.chapter-content');
    if (!chapterContent) return;

    const params = new URLSearchParams(window.location.search);
    const ch = params.get('ch');
    const subject = params.get('subject');
    if (!ch || !subject) return;

    const key = `done-${subject}-ch${ch}`;
    const isDone = localStorage.getItem(key) === 'true';

    const btn = doc.createElement('button');
    btn.textContent = isDone ? '✔ Completed' : 'Mark Complete';
    btn.className = 'btn btn-outline btn-sm';

    btn.addEventListener('click', () => {
      const nowDone = localStorage.getItem(key) !== 'true';
      localStorage.setItem(key, nowDone ? 'true' : 'false');
      btn.textContent = nowDone ? '✔ Completed' : 'Mark Complete';
    });

    chapterContent.prepend(btn);
  }

  initProgress();


  /* ============================================================
     7. BACK TO TOP (requestAnimationFrame optimized)
  ============================================================ */

  const backBtn = doc.createElement('button');
  backBtn.textContent = '↑';
  backBtn.style.cssText = `
    position:fixed;bottom:1.5rem;right:1.5rem;
    width:40px;height:40px;border-radius:50%;
    display:none;z-index:999;
  `;
  body.appendChild(backBtn);

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        backBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
        ticking = false;
      });
      ticking = true;
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ============================================================
     8. FADE UP ANIMATION (Lightweight)
  ============================================================ */

  const fadeEls = doc.querySelectorAll('.fade-up');
  fadeEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `all .5s ease ${i * 0.1}s`;

    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });

});
