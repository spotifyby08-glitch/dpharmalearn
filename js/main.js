/* ============================================
   D-PHARMA LEARN — main.js  v3.0
   Features: Search · Dark Mode · WhatsApp
             Rating Stars · Print · Back-to-Top
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ═══════════════════════════════════════
     1.  DARK / LIGHT MODE
  ═══════════════════════════════════════ */
  const html        = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = document.getElementById('themeIcon');

  // Apply saved theme immediately
  const saved = localStorage.getItem('dpharma-theme') || 'light';
  html.setAttribute('data-theme', saved);
  setThemeIcon(saved);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('dpharma-theme', next);
      setThemeIcon(next);
      themeToggle.style.transform = 'scale(1.25) rotate(20deg)';
      setTimeout(() => (themeToggle.style.transform = ''), 250);
    });
  }

  function setThemeIcon(theme) {
    if (themeIcon) themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }


  /* ═══════════════════════════════════════
     2.  SEARCH DATA
  ═══════════════════════════════════════ */
  const SEARCH_DATA = [
    // ── Pages
    { title:'Home',                        desc:'D-Pharma Learn homepage – all subjects overview',         url:'index.html',                                        tag:'Page',    icon:'🏠' },
    { title:'D-Pharma 1st Year',           desc:'All five first year subjects',                            url:'year1.html',                                        tag:'Page',    icon:'📚' },
    { title:'D-Pharma 2nd Year',           desc:'All five second year subjects',                           url:'year2.html',                                        tag:'Page',    icon:'📗' },
    { title:'Syllabus',                    desc:'PCI-approved complete D-Pharma syllabus unit-wise',       url:'syllabus.html',                                     tag:'Page',    icon:'📋' },
    { title:'About',                       desc:'About D-Pharma Learn free education platform',            url:'about.html',                                        tag:'Page',    icon:'ℹ️'  },
    { title:'Contact',                     desc:'Contact the D-Pharma Learn team',                         url:'contact.html',                                      tag:'Page',    icon:'✉️'  },
    // ── 1st Year Subjects
    { title:'Pharmaceutics I',             desc:'Dosage forms, solutions, suspensions, emulsions, tablets, capsules, packaging', url:'subject.html',              tag:'1st Year',icon:'⚗️'  },
    { title:'Pharmaceutical Chemistry I',  desc:'Atomic structure, acids, bases, volumetric analysis, inorganic compounds',     url:'subject.html',              tag:'1st Year',icon:'🔬'  },
    { title:'Pharmacognosy',               desc:'Crude drugs, alkaloids, glycosides, tannins, volatile oils, gums',             url:'subject.html',              tag:'1st Year',icon:'🌿'  },
    { title:'Human Anatomy & Physiology',  desc:'Cell biology, skeletal, cardiovascular, respiratory, nervous, digestive system',url:'subject.html',             tag:'1st Year',icon:'🫀'  },
    { title:'Social Pharmacy',             desc:'Public health, national programs, health education, nutrition, first aid',     url:'subject.html',              tag:'1st Year',icon:'👥'  },
    // ── 2nd Year Subjects
    { title:'Pharmaceutics II',            desc:'Sterile products, parenteral, ophthalmic, aerosols, novel drug delivery',      url:'subject.html',              tag:'2nd Year',icon:'💉'  },
    { title:'Pharmaceutical Chemistry II', desc:'Antibiotics, analgesics, vitamins, antifungals, sulfonamides, hormones',       url:'subject.html',              tag:'2nd Year',icon:'💊'  },
    { title:'Pharmacology',                desc:'Drug receptors, pharmacokinetics, ANS, CNS drugs, cardiovascular, chemotherapy',url:'subject.html',             tag:'2nd Year',icon:'🧬'  },
    { title:'Community Pharmacy',          desc:'Retail pharmacy, prescription handling, patient counseling, drug laws',        url:'subject.html',              tag:'2nd Year',icon:'🏪'  },
    { title:'Hospital & Clinical Pharmacy',desc:'Hospital pharmacy, drug distribution, ADR, drug interactions, clinical pharmacy',url:'subject.html',            tag:'2nd Year',icon:'🏥'  },
    // ── Chapters
    { title:'History of Pharmacy',         desc:'Ancient pharmacy, Ayurveda, Greek, Pharmacy Act 1940, PCI, modern pharmacy',  url:'chapter.html',              tag:'Chapter', icon:'📖'  },
    { title:'Dosage Forms',                desc:'Solid, liquid, semisolid forms, routes of administration, advantages',         url:'chapter.html',              tag:'Chapter', icon:'📖'  },
    { title:'Pharmaceutical Solutions',    desc:'Syrups, elixirs, spirits, aromatic waters, solvents, monophasic liquids',     url:'chapter.html',              tag:'Chapter', icon:'📖'  },
    { title:'Suspensions',                 desc:'Flocculated suspensions, sedimentation, suspending agents, evaluation',        url:'chapter.html',              tag:'Chapter', icon:'📖'  },
    { title:'Emulsions',                   desc:'O/W W/O emulsions, HLB system, emulsifying agents, preparation, evaluation',  url:'chapter.html',              tag:'Chapter', icon:'📖'  },
    { title:'Tablets',                     desc:'Tablet types, excipients, binders, disintegrants, manufacturing, QC tests',   url:'chapter.html',              tag:'Chapter', icon:'📖'  },
    { title:'Capsules',                    desc:'Hard and soft gelatin capsules, filling, evaluation, storage',                  url:'chapter.html',              tag:'Chapter', icon:'📖'  },
    { title:'Alkaloids',                   desc:'Definition, classification, morphine, quinine, caffeine, atropine, cocaine',   url:'chapter.html',              tag:'Chapter', icon:'📖'  },
    { title:'Glycosides',                  desc:'Cardiac glycosides, digitalis, strophanthus, saponins, anthraquinone',         url:'chapter.html',              tag:'Chapter', icon:'📖'  },
    { title:'Cardiovascular System',       desc:'Heart anatomy, cardiac cycle, blood pressure, ECG, blood vessels',             url:'chapter.html',              tag:'Chapter', icon:'📖'  },
    { title:'Drug Receptors & Action',     desc:'Pharmacodynamics, receptor types, drug-receptor interaction, dose-response',  url:'chapter.html',              tag:'Chapter', icon:'📖'  },
    { title:'Antibiotics',                 desc:'Penicillin, cephalosporins, tetracyclines, aminoglycosides, mechanism of action',url:'chapter.html',            tag:'Chapter', icon:'📖'  },
    { title:'Sterilization Methods',       desc:'Thermal, radiation, filtration, chemical sterilization, autoclaving',          url:'chapter.html',              tag:'Chapter', icon:'📖'  },
    { title:'Parenteral Products',         desc:'IV injections, IM, SC preparations, pyrogens, evaluation of parenterals',     url:'chapter.html',              tag:'Chapter', icon:'📖'  },
  ];


  /* ═══════════════════════════════════════
     3.  SEARCH OVERLAY (navbar icon)
  ═══════════════════════════════════════ */
  const searchToggle  = document.getElementById('searchToggle');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose   = document.getElementById('searchClose');
  const searchInput   = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput && searchInput.focus(), 80);
  }

  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('open');
    document.body.style.overflow = '';
    if (searchInput)  searchInput.value = '';
    if (searchResults) searchResults.innerHTML = getSearchHint();
  }

  window.closeSearchGlobal = closeSearch; // used by inline onclick

  if (searchToggle)  searchToggle.addEventListener('click', openSearch);
  if (searchClose)   searchClose.addEventListener('click', closeSearch);
  if (searchOverlay) searchOverlay.addEventListener('click', e => { if (e.target === searchOverlay) closeSearch(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSearch();
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
  });

  if (searchInput && searchResults) {
    searchResults.innerHTML = getSearchHint();
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      if (q.length < 2) { searchResults.innerHTML = getSearchHint(); return; }
      const hits = SEARCH_DATA.filter(d => d.title.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q) || d.tag.toLowerCase().includes(q));
      if (!hits.length) { searchResults.innerHTML = `<div class="search-empty"><i class="fa-solid fa-face-frown"></i><p>No results for "<strong>${esc(q)}</strong>"</p></div>`; return; }
      searchResults.innerHTML = `<p class="search-count">${hits.length} result${hits.length>1?'s':''} found</p>` +
        hits.map(d => `<a href="${d.url}" class="search-result-item" onclick="closeSearchGlobal()">
          <span class="sri-icon">${d.icon}</span>
          <span class="sri-info"><strong>${hi(d.title,q)}</strong><span>${hi(d.desc,q)}</span></span>
          <span class="sri-tag">${d.tag}</span></a>`).join('');
    });
  }


  /* ═══════════════════════════════════════
     4.  FULL SEARCH PAGE  (search.html)
  ═══════════════════════════════════════ */
  const pgInput   = document.getElementById('pageSearchInput');
  const pgResults = document.getElementById('pageSearchResults');
  const pgFilters = document.querySelectorAll('.sf-btn');
  let   pgFilter  = 'all';

  if (pgFilters.length) {
    pgFilters.forEach(b => b.addEventListener('click', () => {
      pgFilters.forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      pgFilter = b.dataset.filter;
      doPageSearch(pgInput ? pgInput.value : '');
    }));
  }

  if (pgInput && pgResults) {
    // Auto-fill from URL ?q=
    const urlQ = new URLSearchParams(window.location.search).get('q');
    if (urlQ) { pgInput.value = urlQ; }
    doPageSearch(pgInput.value);
    pgInput.addEventListener('input', () => doPageSearch(pgInput.value));
  }

  function doPageSearch(raw) {
    if (!pgResults) return;
    const q = raw.trim().toLowerCase();
    let data = pgFilter === 'all' ? SEARCH_DATA : SEARCH_DATA.filter(d => d.tag.toLowerCase() === pgFilter);
    const hits = q.length < 1 ? data : data.filter(d => d.title.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q));
    if (!hits.length) { pgResults.innerHTML = `<div class="search-empty"><i class="fa-solid fa-face-frown"></i><p>No results found</p></div>`; return; }
    pgResults.innerHTML = `<p class="search-count">${hits.length} result${hits.length>1?'s':''}</p><div class="spg-grid">${
      hits.map(d=>`<a href="${d.url}" class="spg-card">
        <span class="spg-icon">${d.icon}</span>
        <div><strong>${q?hi(d.title,q):d.title}</strong><p>${q?hi(d.desc,q):d.desc}</p><span class="sri-tag">${d.tag}</span></div></a>`).join('')}</div>`;
  }


  /* ═══════════════════════════════════════
     5.  HELPERS
  ═══════════════════════════════════════ */
  function hi(text, q) { return text.replace(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi'), '<mark>$1</mark>'); }
  function esc(s) { return s.replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function getSearchHint() {
    return `<div class="search-empty"><i class="fa-solid fa-magnifying-glass"></i><p>Type to search subjects or chapters</p><small>Press <kbd>Ctrl K</kbd> anytime to search</small></div>`;
  }


  /* ═══════════════════════════════════════
     6.  MOBILE NAV
  ═══════════════════════════════════════ */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }


  /* ═══════════════════════════════════════
     7.  ACTIVE NAV LINK
  ═══════════════════════════════════════ */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });


  /* ═══════════════════════════════════════
     8.  ACCORDION
  ═══════════════════════════════════════ */
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item   = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
  const first = document.querySelector('.accordion-item');
  if (first) first.classList.add('open');


  /* ═══════════════════════════════════════
     9.  SCROLL REVEAL
  ═══════════════════════════════════════ */
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }


  /* ═══════════════════════════════════════
     10.  TOC SCROLL HIGHLIGHT
  ═══════════════════════════════════════ */
  const tocLinks = document.querySelectorAll('.toc a');
  if (tocLinks.length) {
    const heads = document.querySelectorAll('.chapter-content h2, .chapter-content h3');
    const tobs  = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          tocLinks.forEach(l => l.classList.remove('active'));
          const m = document.querySelector(`.toc a[href="#${e.target.id}"]`);
          if (m) m.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    heads.forEach(h => tobs.observe(h));
  }


  /* ═══════════════════════════════════════
     11.  CONTACT FORM
  ═══════════════════════════════════════ */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Sent!';
      btn.disabled  = true;
      btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
      setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; btn.style.background = ''; form.reset(); }, 4000);
    });
  }


  /* ═══════════════════════════════════════
     12.  SMOOTH SCROLL
  ═══════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior:'smooth', block:'start' }); }
    });
  });


  /* ═══════════════════════════════════════
     13.  BACK TO TOP
  ═══════════════════════════════════════ */
  const btt = document.getElementById('backToTop');
  if (btt) {
    window.addEventListener('scroll', () => btt.classList.toggle('visible', scrollY > 400), { passive:true });
    btt.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
  }


  /* ═══════════════════════════════════════
     14.  WHATSAPP SHARE
  ═══════════════════════════════════════ */
  const waBtn = document.getElementById('whatsappShare');
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const msg = `📚 *${document.title}*\n\nFree D-Pharma study notes 👇\n${location.href}\n\n🆓 D-Pharma Learn — Free notes for all pharmacy students!`;
      window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }


  /* ═══════════════════════════════════════
     15.  PRINT
  ═══════════════════════════════════════ */
  const printBtn = document.getElementById('printChapter');
  if (printBtn) printBtn.addEventListener('click', () => window.print());


  /* ═══════════════════════════════════════
     16.  STAR RATING
  ═══════════════════════════════════════ */
  const stars      = document.querySelectorAll('.star-btn');
  const ratingText = document.getElementById('ratingText');
  const ratingKey  = 'rating_' + location.pathname + location.search;
  const saved2     = parseInt(localStorage.getItem(ratingKey) || '0');

  if (stars.length) {
    paintStars(saved2);
    if (ratingText && saved2) ratingText.textContent = label(saved2);

    stars.forEach(s => {
      s.addEventListener('mouseover', () => paintStars(+s.dataset.v));
      s.addEventListener('mouseout',  () => paintStars(parseInt(localStorage.getItem(ratingKey)||'0')));
      s.addEventListener('click', () => {
        const v = +s.dataset.v;
        localStorage.setItem(ratingKey, v);
        paintStars(v);
        if (ratingText) { ratingText.textContent = label(v) + ' — Thanks! ⭐'; setTimeout(()=>{ ratingText.textContent = label(v); },2500); }
      });
    });
  }

  function paintStars(v) { stars.forEach(s => s.classList.toggle('active', +s.dataset.v <= v)); }
  function label(v) { return ['','Poor','Fair','Good','Very Good','Excellent!'][v] || ''; }

});
     
