/**
 * WRITINGS
 * To permanently add a post, add an object to this list (or use the "+ Write"
 * button on the site, which publishes locally and copies the snippet for you).
 */
const DEFAULT_WRITINGS = [
  {
    slug: 'on-off-road-and-attention',
    title: 'On Off-Road Rallying and Attention',
    date: 'Oct 2026',
    paragraphs: [
      'One reason I love riding motorcycles off-road is that loose terrain leaves zero bandwidth for distraction. You look where you want the bike to go, weight the pegs, and react to what the front wheel is telling you.',
      'Most modern life happens through layers of abstraction—screens, documents, and notifications. Getting out on a trail is a useful counterweight: immediate physical feedback, calculated risk, and quiet focus.'
    ]
  },
  {
    slug: 'what-debating-teaches-you',
    title: 'What Competitive Debating Actually Teaches You',
    date: 'May 2025',
    paragraphs: [
      'When you first start parliamentary debating, you think the goal is speaking quickly or sounding persuasive. After a few dozen rounds, you realize the real skill is structural listening: finding the single load-bearing assumption in someone else’s argument within fifteen minutes of preparation.',
      'Being forced to defend positions you didn’t choose—and often personally disagree with—is one of the best antidotes to lazy thinking.'
    ]
  }
];

(function () {
  const STORAGE_KEY = 'ncvedi-custom-writings';
  const indexListEl = document.getElementById('index-list');
  const viewHomeEl = document.getElementById('view-home');
  const viewPostEl = document.getElementById('view-post');
  const readerKickerEl = document.getElementById('reader-kicker');
  const readerTitleEl = document.getElementById('reader-title');
  const readerBodyEl = document.getElementById('reader-body');
  const readerBackBtn = document.getElementById('reader-back-btn');
  const deleteCustomBtn = document.getElementById('delete-custom-post-btn');
  const homeBrandBtn = document.getElementById('home-brand-btn');

  const newPostToggle = document.getElementById('new-post-toggle');
  const closeComposerBtn = document.getElementById('close-composer-btn');
  const composerForm = document.getElementById('post-composer');
  const titleInput = document.getElementById('post-title-input');
  const dateInput = document.getElementById('post-date-input');
  const bodyInput = document.getElementById('post-body-input');

  const themeToggle = document.getElementById('theme-toggle');
  const toastEl = document.getElementById('toast');

  let activeId = '00';
  let toastTimer = null;

  function getCustomWritings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveCustomWritings(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function getAllWritings() {
    const custom = getCustomWritings().map((item) => ({ ...item, isCustom: true }));
    return [...custom, ...DEFAULT_WRITINGS];
  }

  function padIndex(n) {
    return String(n).padStart(2, '0');
  }

  function renderIndex() {
    const writings = getAllWritings();
    indexListEl.innerHTML = '';

    // 00. Neil Chaturvedi
    const homeLi = document.createElement('li');
    homeLi.className = 'index-row';
    homeLi.innerHTML = `
      <button type="button" class="index-row-btn ${activeId === '00' ? 'active' : ''}" data-id="00">
        <span class="index-row-left">
          <span class="index-num">00.</span>
          <span class="index-row-title">Neil Chaturvedi</span>
        </span>
        <span class="index-row-right">About</span>
      </button>
    `;
    indexListEl.appendChild(homeLi);

    // 01..NN Writings
    writings.forEach((post, i) => {
      const num = padIndex(i + 1);
      const li = document.createElement('li');
      li.className = 'index-row';
      li.innerHTML = `
        <button type="button" class="index-row-btn ${activeId === post.slug ? 'active' : ''}" data-id="${post.slug}">
          <span class="index-row-left">
            <span class="index-num">${num}.</span>
            <span class="index-row-title">${escapeHtml(post.title)}</span>
          </span>
          <span class="index-row-right">${escapeHtml(post.date || '')}</span>
        </button>
      `;
      indexListEl.appendChild(li);
    });
  }

  function navigateTo(id, updateHash = true) {
    const writings = getAllWritings();
    if (id === '00' || !id) {
      activeId = '00';
      viewHomeEl.classList.add('active');
      viewPostEl.classList.remove('active');
      if (updateHash) history.replaceState(null, '', '#00');
      renderIndex();
      return;
    }

    const postIdx = writings.findIndex((w) => w.slug === id);
    if (postIdx === -1) {
      navigateTo('00', updateHash);
      return;
    }

    const post = writings[postIdx];
    const num = padIndex(postIdx + 1);
    activeId = post.slug;

    readerKickerEl.textContent = `${num}. ${post.date ? post.date.toUpperCase() : 'WRITING'}`;
    readerTitleEl.textContent = post.title;
    readerBodyEl.innerHTML = post.paragraphs
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join('');

    if (post.isCustom) {
      deleteCustomBtn.style.display = 'inline';
      deleteCustomBtn.onclick = () => {
        const remaining = getCustomWritings().filter((w) => w.slug !== post.slug);
        saveCustomWritings(remaining);
        showToast('Draft removed');
        navigateTo('00', true);
      };
    } else {
      deleteCustomBtn.style.display = 'none';
    }

    viewHomeEl.classList.remove('active');
    viewPostEl.classList.add('active');
    if (updateHash) history.replaceState(null, '', `#${post.slug}`);
    renderIndex();
  }

  // Click delegation on Index list
  indexListEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.index-row-btn');
    if (!btn) return;
    navigateTo(btn.getAttribute('data-id'), true);
  });

  if (readerBackBtn) {
    readerBackBtn.addEventListener('click', () => navigateTo('00', true));
  }
  if (homeBrandBtn) {
    homeBrandBtn.addEventListener('click', () => navigateTo('00', true));
  }

  // Inline Post Composer
  if (newPostToggle && composerForm) {
    newPostToggle.addEventListener('click', () => {
      composerForm.classList.toggle('open');
      if (composerForm.classList.contains('open')) {
        if (!dateInput.value) {
          const now = new Date();
          dateInput.value = now.toLocaleString('en-US', { month: 'short', year: 'numeric' });
        }
        titleInput.focus();
      }
    });
  }

  if (closeComposerBtn) {
    closeComposerBtn.addEventListener('click', () => {
      composerForm.classList.remove('open');
    });
  }

  if (composerForm) {
    composerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = titleInput.value.trim();
      const date = dateInput.value.trim() || 'Oct 2026';
      const bodyRaw = bodyInput.value.trim();
      if (!title || !bodyRaw) return;

      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || `post-${Date.now()}`;

      const paragraphs = bodyRaw
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);

      const newPost = { slug, title, date, paragraphs };
      const custom = getCustomWritings();
      saveCustomWritings([newPost, ...custom]);

      // Copy code snippet so user can also paste into DEFAULT_WRITINGS if desired
      try {
        await navigator.clipboard.writeText(JSON.stringify(newPost, null, 2));
        showToast('Published! (JSON also copied for script.js)');
      } catch {
        showToast('Published!');
      }

      titleInput.value = '';
      bodyInput.value = '';
      composerForm.classList.remove('open');
      navigateTo(slug, true);
    });
  }

  // Theme Toggle
  const savedTheme = localStorage.getItem('ncvedi-theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
  syncThemeLabel();

  function syncThemeLabel() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    if (themeToggle) {
      themeToggle.textContent = current === 'dark' ? 'LIGHT' : 'DARK';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('ncvedi-theme', next);
      syncThemeLabel();
    });
  }

  // Copy email buttons
  document.querySelectorAll('.copy-email').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-email');
      if (!email) return;
      try {
        await navigator.clipboard.writeText(email);
        showToast(`Copied ${email}`);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  });

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('visible');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('visible');
    }, 2200);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Initialize
  const initialHash = window.location.hash.replace('#', '');
  renderIndex();
  if (initialHash && initialHash !== '00') {
    navigateTo(initialHash, false);
  }
})();
