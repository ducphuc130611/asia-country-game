/* V4.1 HOTFIX — MODE LAUNCH ROUTER + ENGINE BOOT */
(() => {
  const MODES = [
    ['classic','🎮','Classic','Original mode + 5 difficulties'],
    ['survival','❤️','Survival','5 lives'],
    ['timeAttack','⏱️','Time Attack','Fast timed run'],
    ['suddenDeath','💀','Sudden Death','One mistake ends the run'],
    ['endless','♾️','Endless','No fixed limit'],
    ['boss','👹','Boss','Fight a random boss'],
    ['daily','🎯','Daily Challenge','Once per day'],
    ['streak','🔥','Streak Mode','Wrong answer = instant loss'],
    ['hardcore','☠️','Hardcore Classic','1 life • no hints • mixed knowledge'],
    ['ranked','🏆','Ranked','10 questions • Elo climb']
  ];

  let enginePromise = null;

  function toast(message) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(el._v41Timer);
    el._v41Timer = setTimeout(() => el.classList.remove('show'), 2500);
  }

  async function ensureEngine() {
    if (typeof window.v4Select === 'function' && typeof window.v4Start === 'function') return true;

    if (!enginePromise) {
      enginePromise = import('./v4.js').catch(err => {
        console.error('[V4.1] Failed to load game engine:', err);
        enginePromise = null;
        throw err;
      });
    }

    await enginePromise;
    return typeof window.v4Select === 'function' && typeof window.v4Start === 'function';
  }

  async function launchMode(mode) {
    try {
      toast('⏳ Loading game engine…');
      const ready = await ensureEngine();
      if (!ready) throw new Error('V4 engine loaded but did not expose its public API.');

      if (typeof window.v4Select === 'function') {
        window.v4Select(mode);
        return;
      }

      throw new Error('v4Select is unavailable.');
    } catch (err) {
      console.error('[V4.1] Mode launch failed:', mode, err);
      toast('❌ Failed to start this mode. Check the console for details.');
    }
  }

  function renderModesHotfix() {
    const grid = document.getElementById('modeGrid');
    if (!grid) return;

    grid.innerHTML = MODES.map(([id, icon, name, desc]) =>
      `<button class="mode-card" data-v41-mode="${id}">
        <h3>${icon} ${name}</h3>
        <p>${desc}</p>
      </button>`
    ).join('');

    grid.querySelectorAll('[data-v41-mode]').forEach(btn => {
      btn.onclick = () => launchMode(btn.dataset.v41Mode);
    });
  }

  function modesReady() {
    const grid = document.getElementById('modeGrid');
    return !!grid && MODES.every(([id]) => grid.querySelector(`[data-v41-mode="${id}"]`));
  }

  function boot() {
    if (!modesReady()) renderModesHotfix();
    const grid = document.getElementById('modeGrid');
    if (!grid || grid.dataset.v41Observer) return;

    grid.dataset.v41Observer = '1';
    const observer = new MutationObserver(() => {
      if (!modesReady()) renderModesHotfix();
    });
    observer.observe(grid, { childList: true });
  }

  window.v41EnsureEngine = ensureEngine;
  window.v41LaunchMode = launchMode;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  window.addEventListener('load', boot, { once: true });
})();
