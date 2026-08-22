/* V4.1 HOTFIX — MODE VISIBILITY */
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

  function renderModesHotfix() {
    const grid = document.getElementById('modeGrid');
    if (!grid) return;

    grid.innerHTML = MODES.map(([id, icon, name, desc]) =>
      `<button class="mode-card" data-v41-mode="${id}"><h3>${icon} ${name}</h3><p>${desc}</p></button>`
    ).join('');

    grid.querySelectorAll('[data-v41-mode]').forEach(btn => {
      btn.onclick = () => {
        const mode = btn.dataset.v41Mode;
        if (mode === 'classic') {
          if (typeof window.v4Screen === 'function') return window.v4Screen('difficulty');
          if (typeof window.startClassicMenu === 'function') return window.startClassicMenu();
          return;
        }
        if (typeof window.v4Select === 'function') return window.v4Select(mode);
        if (typeof window.v4Start === 'function') {
          return window.v4Start(mode, mode === 'hardcore' ? 'nightmare' : 'normal');
        }
      };
    });
  }

  function isNewModeGridPresent() {
    const grid = document.getElementById('modeGrid');
    if (!grid) return false;
    return ['streak','hardcore','ranked'].every(id => grid.querySelector(`[data-v41-mode="${id}"]`));
  }

  function ensureModes() {
    if (!isNewModeGridPresent()) renderModesHotfix();
  }

  function showHotfixStatus() {
    const e = document.getElementById('countryDataStatus');
    if (e) e.textContent = 'Live country statistics loaded when available.';
  }

  function boot() {
    ensureModes();
    showHotfixStatus();

    const grid = document.getElementById('modeGrid');
    if (grid && !grid.dataset.v41Observer) {
      grid.dataset.v41Observer = '1';
      const observer = new MutationObserver(() => {
        if (!isNewModeGridPresent()) renderModesHotfix();
      });
      observer.observe(grid, { childList: true, subtree: true });
    }

    [50, 150, 300, 600, 1000, 2000].forEach(ms => setTimeout(ensureModes, ms));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
  window.addEventListener('load', boot, { once: true });
  window.addEventListener('countryDataReady', showHotfixStatus);
})();