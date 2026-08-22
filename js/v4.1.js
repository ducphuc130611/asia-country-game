/* V4.1 HOTFIX — MODE LAUNCH ROUTER */
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

  function launchMode(mode) {
    const select = window.v4Select;
    const start = window.v4Start;

    if (typeof select === 'function') {
      try {
        return select(mode);
      } catch (err) {
        console.error('[V4.1] v4Select failed:', err);
      }
    }

    if (typeof start === 'function') {
      if (mode === 'classic') {
        if (typeof window.goModes === 'function') return window.goModes();
        return;
      }
      return start(mode, mode === 'hardcore' ? 'nightmare' : 'normal');
    }

    const msg = document.getElementById('toast');
    if (msg) {
      msg.textContent = '⚠️ Game engine is still loading. Please try again.';
      msg.classList.add('show');
      clearTimeout(msg._v41Timer);
      msg._v41Timer = setTimeout(() => msg.classList.remove('show'), 2500);
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
    return !!grid && ['classic','survival','timeAttack','suddenDeath','endless','boss','daily','streak','hardcore','ranked']
      .every(id => grid.querySelector(`[data-v41-mode="${id}"]`));
  }

  function boot() {
    if (!modesReady()) renderModesHotfix();
    const grid = document.getElementById('modeGrid');
    if (!grid) return;
    if (!grid.dataset.v41Observer) {
      grid.dataset.v41Observer = '1';
      const observer = new MutationObserver(() => {
        if (!modesReady()) renderModesHotfix();
      });
      observer.observe(grid, { childList: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
  window.addEventListener('load', boot, { once: true });
})();