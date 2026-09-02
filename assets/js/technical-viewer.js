document.querySelectorAll('[data-technical-viewer]').forEach(viewer => {
  const details = {
    belt: {
      icon: '↔',
      title: 'Esteira transportadora',
      copy: 'Conduz os materiais pela linha de triagem com fluxo contínuo e organizado.'
    },
    sensors: {
      icon: '⌁',
      title: 'Sensores de identificação',
      copy: 'Monitoram a passagem dos materiais para apoiar a identificação e a separação de cada item.'
    },
    panel: {
      icon: '▣',
      title: 'Painel de controle',
      copy: 'Centraliza o comando e o acompanhamento da operação da esteira de separação.'
    },
    ramps: {
      icon: '↘',
      title: 'Rampas de separação',
      copy: 'Direcionam os materiais classificados para os pontos de coleta correspondentes.'
    }
  };
  const tabs = [...viewer.querySelectorAll('[data-view]')];
  const panels = [...viewer.querySelectorAll('[data-view-panel]')];
  const info = viewer.querySelector('.technical-info');
  const icon = viewer.querySelector('[data-info-icon]');
  const title = viewer.querySelector('[data-info-title]');
  const copy = viewer.querySelector('[data-info-copy]');
  let hideTimer;

  const setInfo = part => {
    const detail = details[part];
    if (!detail) return;
    const activePanel = viewer.querySelector('.viewer-view.is-active');
    activePanel.querySelectorAll('.hotspot').forEach(point => point.classList.toggle('is-selected', point.dataset.part === part));
    info.classList.remove('is-updating');
    void info.offsetWidth;
    info.classList.add('is-updating');
    icon.textContent = detail.icon;
    title.textContent = detail.title;
    copy.textContent = detail.copy;
  };

  const showView = view => {
    const next = viewer.querySelector(`[data-view-panel="${view}"]`);
    const current = viewer.querySelector('.viewer-view.is-active');
    if (!next || next === current) return;
    clearTimeout(hideTimer);
    current.classList.remove('is-active');
    next.hidden = false;
    void next.offsetWidth;
    next.classList.add('is-active');
    tabs.forEach(tab => {
      const selected = tab.dataset.view === view;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-pressed', String(selected));
    });
    hideTimer = window.setTimeout(() => panels.forEach(panel => {
      if (!panel.classList.contains('is-active')) panel.hidden = true;
    }), 460);
    setInfo('belt');
  };

  tabs.forEach(tab => tab.addEventListener('click', () => showView(tab.dataset.view)));
  viewer.addEventListener('click', event => {
    const point = event.target.closest('.hotspot');
    if (point) setInfo(point.dataset.part);
  });
  setInfo('belt');
});
