/* V4.1 HOTFIX */
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
      `<button class="mode-card" data-mode="${id}"><h3>${icon} ${name}</h3><p>${desc}</p></button>`
    ).join('');
    grid.querySelectorAll('[data-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        if (mode === 'classic') return window.v4Screen ? window.v4Screen('difficulty') : window.startClassicMenu?.();
        if (window.v4Select) return window.v4Select(mode);
        if (window.v4Start) return window.v4Start(mode, mode === 'hardcore' ? 'nightmare' : 'normal');
      });
    });
  }

  function showHotfixStatus() {
    const e = document.getElementById('countryDataStatus');
    if (e) e.textContent = 'Live country statistics loaded when available.';
  }

  window.addEventListener('load', () => {
    renderModesHotfix();
    showHotfixStatus();
    setTimeout(renderModesHotfix, 150);
    setTimeout(renderModesHotfix, 600);
  });

  window.addEventListener('countryDataReady', showHotfixStatus);
})();
