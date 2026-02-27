/* ============================================================
   D-Pharma Learn — main.js
   Features:
   1. Hamburger mobile menu
   2. Accordion chapters
   3. Scroll reveal animations
   4. Dark / Light mode toggle
   5. Search bar (chapters & subjects)
   6. Progress tracker (mark chapters done)
   7. Bookmark chapters
   8. Back to top button
   9. Print chapter notes
   ============================================================ */


/* ────────────────────────────────────────────────────────────
   1. HAMBURGER MENU
   ──────────────────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is tapped
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });
}


/* ────────────────────────────────────────────────────────────
   2. ACCORDION
   ──────────────────────────────────────────────────────────── */
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.accordion-item');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.accordion-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.accordion-trigger').setAttribute('aria-expanded', false);
    });

    // Open clicked one if it was closed
    if (!isOpen) {
      item.classList.add('open');
      trigger.setAttribute('aria-expanded', true);
    }
  });
});


/* ────────────────────────────────────────────────────────────
   3. SCROLL REVEAL ANIMATIONS
   ──────────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ────────────────────────────────────────────────────────────
   4. DARK / LIGHT MODE TOGGLE
   ──────────────────────────────────────────────────────────── */

// Inject the toggle button into the nav
function injectDarkModeButton() {
  const navCta = document.querySelector('.nav-cta');
  if (!navCta) return;

  const btn = document.createElement('button');
  btn.id = 'darkModeToggle';
  btn.className = 'btn btn-outline btn-sm';
  btn.setAttribute('aria-label', 'Toggle dark/light mode');
  btn.style.cssText = 'padding:.4rem .7rem; font-size:1rem; border-radius:8px;';
  btn.innerHTML = '<i class="fa-solid fa-moon"></i>';

  // Insert before hamburger
  const hamburgerBtn = navCta.querySelector('.hamburger');
  navCta.insertBefore(btn, hamburgerBtn);

  // Load saved preference
  const saved = localStorage.getItem('dpharma-theme') || 'dark';
  applyTheme(saved);

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('dpharma-theme', next);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('darkModeToggle');
  if (!btn) return;
  if (theme === 'light') {
    btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    btn.title = 'Switch to dark mode';
  } else {
    btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    btn.title = 'Switch to light mode';
  }
}

// Add light mode CSS variables
const lightModeStyle = document.createElement('style');
lightModeStyle.textContent = `
  [data-theme="light"] {
    --bg: #f8f9fa;
    --bg-alt: #ffffff;
    --text: #1a1a2e;
    --text-muted: #555577;
    --border: #e0e0f0;
    --card-bg: #ffffff;
  }
  [data-theme="light"] .site-header { background: #ffffff; border-bottom: 1px solid #e0e0f0; }
  [data-theme="light"] .nav-links a { color: #1a1a2e; }
  [data-theme="light"] .page-hero { background: linear-gradient(135deg, #1a1a2e, #16213e); }
  [data-theme="light"] .card { background: #ffffff; border-color: #e0e0f0; }
  [data-theme="light"] .accordion-item { background: #ffffff; border-color: #e0e0f0; }
  [data-theme="light"] body { background: #f8f9fa; color: #1a1a2e; }
  [data-theme="light"] .site-footer { background: #1a1a2e; }
`;
document.head.appendChild(lightModeStyle);

injectDarkModeButton();


/* ────────────────────────────────────────────────────────────
   5. SEARCH BAR
   Search through chapters and subjects on any page
   ──────────────────────────────────────────────────────────── */

// All chapters & subjects data
const searchData = [
  // Pharmaceutics I
  { title: "Chapter 1 – History of Pharmacy", subject: "Pharmaceutics I", year: 1, url: "chapter.html?ch=1&subject=pharmaceutics-1" },
  { title: "Chapter 2 – Dosage Forms", subject: "Pharmaceutics I", year: 1, url: "chapter.html?ch=2&subject=pharmaceutics-1" },
  { title: "Chapter 3 – Pharmaceutical Solutions", subject: "Pharmaceutics I", year: 1, url: "chapter.html?ch=3&subject=pharmaceutics-1" },
  { title: "Chapter 4 – Suspensions", subject: "Pharmaceutics I", year: 1, url: "chapter.html?ch=4&subject=pharmaceutics-1" },
  { title: "Chapter 5 – Emulsions", subject: "Pharmaceutics I", year: 1, url: "chapter.html?ch=5&subject=pharmaceutics-1" },
  { title: "Chapter 6 – Semisolids", subject: "Pharmaceutics I", year: 1, url: "chapter.html?ch=6&subject=pharmaceutics-1" },
  { title: "Chapter 7 – Powders", subject: "Pharmaceutics I", year: 1, url: "chapter.html?ch=7&subject=pharmaceutics-1" },
  { title: "Chapter 8 – Tablets", subject: "Pharmaceutics I", year: 1, url: "chapter.html?ch=8&subject=pharmaceutics-1" },
  { title: "Chapter 9 – Capsules", subject: "Pharmaceutics I", year: 1, url: "chapter.html?ch=9&subject=pharmaceutics-1" },
  { title: "Chapter 10 – Packaging", subject: "Pharmaceutics I", year: 1, url: "chapter.html?ch=10&subject=pharmaceutics-1" },
  // Subjects
  { title: "Pharmaceutics I", subject: "1st Year", year: 1, url: "subject.html?subject=pharmaceutics-1&year=1" },
  { title: "Pharmaceutical Chemistry I", subject: "1st Year", year: 1, url: "subject.html?subject=pharma-chem-1&year=1" },
  { title: "Pharmacognosy", subject: "1st Year", year: 1, url: "subject.html?subject=pharmacognosy&year=1" },
  { title: "Anatomy & Physiology", subject: "1st Year", year: 1, url: "subject.html?subject=anatomy-physiology&year=1" },
  { title: "Social Pharmacy", subject: "1st Year", year: 1, url: "subject.html?subject=social-pharmacy&year=1" },
  { title: "Pharmaceutics II", subject: "2nd Year", year: 2, url: "subject.html?subject=pharmaceutics-2&year=2" },
  { title: "Pharmaceutical Chemistry II", subject: "2nd Year", year: 2, url: "subject.html?subject=pharma-chem-2&year=2" },
  { title: "Pharmacology", subject: "2nd Year", year: 2, url: "subject.html?subject=pharmacology&year=2" },
  { title: "Community Pharmacy", subject: "2nd Year", year: 2, url: "subject.html?subject=community-pharmacy&year=2" },
  { title: "Hospital & Clinical Pharmacy", subject: "2nd Year", year: 2, url: "subject.html?subject=hospital-pharmacy&year=2" },
];

function injectSearchBar() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  // Create search overlay
  const overlay = document.createElement('div');
  overlay.id = 'searchOverlay';
  overlay.style.cssText = `
    display:none; position:fixed; top:0; left:0; width:100%; height:100%;
    background:rgba(0,0,0,0.85); z-index:9999; padding:2rem 1rem;
    backdrop-filter:blur(4px);
  `;
  overlay.innerHTML = `
    <div style="max-width:600px; margin:0 auto;">
      <div style="display:flex; gap:.75rem; margin-bottom:1.5rem;">
        <input id="searchInput" type="text" placeholder="Search chapters, subjects..." 
          style="flex:1; padding:.85rem 1.25rem; border-radius:12px; border:2px solid var(--primary-light,#7c6aff);
          background:#1a1a2e; color:#fff; font-size:1rem; outline:none;">
        <button id="searchClose" style="padding:.85rem 1.25rem; border-radius:12px; 
          background:rgba(255,255,255,.1); color:#fff; border:none; cursor:pointer; font-size:1rem;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div id="searchResults" style="display:flex; flex-direction:column; gap:.75rem; max-height:70vh; overflow-y:auto;"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Add search button to nav
  const navCta = document.querySelector('.nav-cta');
  if (navCta) {
    const searchBtn = document.createElement('button');
    searchBtn.id = 'searchBtn';
    searchBtn.className = 'btn btn-outline btn-sm';
    searchBtn.setAttribute('aria-label', 'Search');
    searchBtn.style.cssText = 'padding:.4rem .7rem; font-size:1rem; border-radius:8px;';
    searchBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
    const hamburgerBtn = navCta.querySelector('.hamburger');
    navCta.insertBefore(searchBtn, hamburgerBtn);

    searchBtn.addEventListener('click', () => {
      overlay.style.display = 'block';
      document.getElementById('searchInput').focus();
    });
  }

  // Close search
  document.getElementById('searchClose').addEventListener('click', closeSearch);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSearch(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearch(); });

  function closeSearch() {
    overlay.style.display = 'none';
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
  }

  // Search logic
  document.getElementById('searchInput').addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    const resultsEl = document.getElementById('searchResults');

    if (query.length < 2) {
      resultsEl.innerHTML = '<p style="color:rgba(255,255,255,.5); text-align:center;">Type at least 2 characters...</p>';
      return;
    }

    const results = searchData.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.subject.toLowerCase().includes(query)
    );

    if (results.length === 0) {
      resultsEl.innerHTML = '<p style="color:rgba(255,255,255,.5); text-align:center;">No results found.</p>';
      return;
    }

    resultsEl.innerHTML = results.map(r => `
      <a href="${r.url}" style="display:flex; align-items:center; gap:1rem; padding:1rem 1.25rem;
        background:rgba(255,255,255,.07); border-radius:10px; text-decoration:none; color:#fff;
        border:1px solid rgba(255,255,255,.1); transition:.2s;">
        <i class="fa-solid fa-book-open" style="color:#7c6aff; font-size:1.2rem;"></i>
        <div>
          <div style="font-weight:600; font-size:.95rem;">${r.title}</div>
          <div style="font-size:.8rem; color:rgba(255,255,255,.5);">${r.subject} • Year ${r.year}</div>
        </div>
        <i class="fa-solid fa-arrow-right" style="margin-left:auto; opacity:.4;"></i>
      </a>
    `).join('');
  });
}

injectSearchBar();


/* ────────────────────────────────────────────────────────────
   6. PROGRESS TRACKER
   Mark chapters as done — saved in localStorage
   ──────────────────────────────────────────────────────────── */
function initProgressTracker() {
  // Works on chapter.html pages
  const chapterContent = document.querySelector('.chapter-content');
  if (!chapterContent) return;

  // Get chapter ID from URL
  const params = new URLSearchParams(window.location.search);
  const chId = params.get('ch');
  const subject = params.get('subject');
  if (!chId || !subject) return;

  const key = `done-${subject}-ch${chId}`;
  const isDone = localStorage.getItem(key) === 'true';

  // Create button
  const btn = document.createElement('button');
  btn.id = 'markDoneBtn';
  btn.style.cssText = `
    display:flex; align-items:center; gap:.6rem; padding:.75rem 1.5rem;
    border-radius:10px; border:2px solid #22c55e; background: ${isDone ? '#22c55e' : 'transparent'};
    color: ${isDone ? '#fff' : '#22c55e'}; font-weight:700; cursor:pointer;
    font-size:.9rem; margin:1.5rem 0; transition:.3s;
  `;
  btn.innerHTML = isDone
    ? '<i class="fa-solid fa-circle-check"></i> Chapter Completed!'
    : '<i class="fa-regular fa-circle"></i> Mark as Complete';

  // Insert after first heading
  const firstH2 = chapterContent.querySelector('h2');
  if (firstH2) firstH2.insertAdjacentElement('afterend', btn);

  btn.addEventListener('click', () => {
    const nowDone = localStorage.getItem(key) !== 'true';
    localStorage.setItem(key, nowDone);
    btn.style.background = nowDone ? '#22c55e' : 'transparent';
    btn.style.color = nowDone ? '#fff' : '#22c55e';
    btn.innerHTML = nowDone
      ? '<i class="fa-solid fa-circle-check"></i> Chapter Completed!'
      : '<i class="fa-regular fa-circle"></i> Mark as Complete';
  });
}

// Show progress in sidebar chapter list
function showProgressInSidebar() {
  document.querySelectorAll('a[href*="chapter.html"]').forEach(link => {
    const url = new URL(link.href, window.location.origin);
    const ch = url.searchParams.get('ch');
    const subject = url.searchParams.get('subject');
    if (!ch || !subject) return;

    const key = `done-${subject}-ch${ch}`;
    if (localStorage.getItem(key) === 'true') {
      const tick = document.createElement('span');
      tick.innerHTML = ' <i class="fa-solid fa-circle-check" style="color:#22c55e; font-size:.75rem;"></i>';
      link.appendChild(tick);
    }
  });
}

initProgressTracker();
showProgressInSidebar();


/* ────────────────────────────────────────────────────────────
   7. BOOKMARK CHAPTERS
   Save favourite chapters — stored in localStorage
   ──────────────────────────────────────────────────────────── */
function initBookmark() {
  const chapterContent = document.querySelector('.chapter-content');
  if (!chapterContent) return;

  const params = new URLSearchParams(window.location.search);
  const chId = params.get('ch');
  const subject = params.get('subject');
  if (!chId || !subject) return;

  const key = `bookmark-${subject}-ch${chId}`;
  const pageTitle = document.querySelector('h1') ? document.querySelector('h1').textContent : 'Chapter';
  const isBookmarked = localStorage.getItem(key) === 'true';

  // Create button
  const btn = document.createElement('button');
  btn.id = 'bookmarkBtn';
  btn.style.cssText = `
    display:flex; align-items:center; gap:.6rem; padding:.75rem 1.5rem;
    border-radius:10px; border:2px solid #f59e0b; background: ${isBookmarked ? '#f59e0b' : 'transparent'};
    color: ${isBookmarked ? '#fff' : '#f59e0b'}; font-weight:700; cursor:pointer;
    font-size:.9rem; margin:.5rem 0 1.5rem; transition:.3s;
  `;
  btn.innerHTML = isBookmarked
    ? '<i class="fa-solid fa-bookmark"></i> Bookmarked!'
    : '<i class="fa-regular fa-bookmark"></i> Bookmark Chapter';

  const markDoneBtn = document.getElementById('markDoneBtn');
  if (markDoneBtn) {
    markDoneBtn.insertAdjacentElement('afterend', btn);
  } else {
    const firstH2 = chapterContent.querySelector('h2');
    if (firstH2) firstH2.insertAdjacentElement('afterend', btn);
  }

  btn.addEventListener('click', () => {
    const nowBookmarked = localStorage.getItem(key) !== 'true';
    localStorage.setItem(key, nowBookmarked);

    // Save bookmark data for listing
    const bookmarks = JSON.parse(localStorage.getItem('dpharma-bookmarks') || '[]');
    if (nowBookmarked) {
      if (!bookmarks.find(b => b.key === key)) {
        bookmarks.push({ key, title: pageTitle, url: window.location.href });
        localStorage.setItem('dpharma-bookmarks', JSON.stringify(bookmarks));
      }
    } else {
      const filtered = bookmarks.filter(b => b.key !== key);
      localStorage.setItem('dpharma-bookmarks', JSON.stringify(filtered));
    }

    btn.style.background = nowBookmarked ? '#f59e0b' : 'transparent';
    btn.style.color = nowBookmarked ? '#fff' : '#f59e0b';
    btn.innerHTML = nowBookmarked
      ? '<i class="fa-solid fa-bookmark"></i> Bookmarked!'
      : '<i class="fa-regular fa-bookmark"></i> Bookmark Chapter';
  });
}

initBookmark();


/* ────────────────────────────────────────────────────────────
   8. BACK TO TOP BUTTON
   ──────────────────────────────────────────────────────────── */
const backToTop = document.createElement('button');
backToTop.id = 'backToTop';
backToTop.setAttribute('aria-label', 'Back to top');
backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
backToTop.style.cssText = `
  position:fixed; bottom:1.5rem; right:1.5rem; width:46px; height:46px;
  border-radius:50%; background:var(--primary,#7c6aff); color:#fff;
  border:none; cursor:pointer; font-size:1rem; display:none;
  align-items:center; justify-content:center; z-index:999;
  box-shadow:0 4px 15px rgba(124,106,255,.4); transition:.3s;
`;
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.style.display = 'flex';
  } else {
    backToTop.style.display = 'none';
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ────────────────────────────────────────────────────────────
   9. PRINT CHAPTER NOTES
   ──────────────────────────────────────────────────────────── */
function initPrintButton() {
  // Only on chapter pages
  const chapterContent = document.querySelector('.chapter-content');
  if (!chapterContent) return;

  // Find the actions bar
  const actionsBar = document.querySelector('.container [style*="display:flex"]');

  const printBtn = document.createElement('button');
  printBtn.className = 'btn btn-outline btn-sm';
  printBtn.innerHTML = '<i class="fa-solid fa-print"></i> Print Notes';
  printBtn.style.cssText = 'display:flex; align-items:center; gap:.4rem;';

  printBtn.addEventListener('click', () => {
    // Hide everything except chapter content for printing
    const style = document.createElement('style');
    style.id = 'printStyle';
    style.textContent = `
      @media print {
        header, footer, .sidebar-sticky, .breadcrumb,
        .page-hero, #backToTop, #markDoneBtn, #bookmarkBtn,
        .content-nav, [style*="actions"], nav { display: none !important; }
        .two-col-layout { display: block !important; }
        .chapter-content { max-width: 100% !important; }
        body { background: white !important; color: black !important; }
      }
    `;
    document.head.appendChild(style);
    window.print();
    // Remove print style after printing
    setTimeout(() => {
      const ps = document.getElementById('printStyle');
      if (ps) ps.remove();
    }, 1000);
  });

  // Add to chapter actions bar
  const actionBtns = document.querySelector('[style*="display:flex"][style*="gap:.5rem"]');
  if (actionBtns) {
    actionBtns.appendChild(printBtn);
  }
}

initPrintButton();


/* ────────────────────────────────────────────────────────────
   FADE-UP ANIMATIONS on page load
   ──────────────────────────────────────────────────────────── */
document.querySelectorAll('.fade-up').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity .6s ease ${i * 0.1}s, transform .6s ease ${i * 0.1}s`;
  setTimeout(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 100);
});
     
