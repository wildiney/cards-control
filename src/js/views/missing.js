import { getOwned } from '../storage.js';
import { ALL_SECTIONS } from '../data.js';

export function renderMissing(container) {
  const el = document.createElement('div');
  el.style.flex = '1';

  function build(filterCode = '') {
    const owned = getOwned();
    const sections = filterCode
      ? ALL_SECTIONS.filter(s => s.code === filterCode)
      : ALL_SECTIONS;

    const missing = [];
    sections.forEach(section => {
      section.stickers.forEach(sticker => {
        if (!owned.has(sticker.id)) {
          missing.push({ sticker, section });
        }
      });
    });

    const countEl = el.querySelector('#missing-count');
    const listEl = el.querySelector('#missing-list');
    if (countEl) countEl.textContent = `${missing.length} figurinha${missing.length !== 1 ? 's' : ''} faltando`;
    if (!listEl) return;

    listEl.innerHTML = '';

    if (missing.length === 0) {
      listEl.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🎉</div>
          <div class="empty-state-text">${filterCode ? 'País completo!' : 'Coleção completa!'}</div>
          <div class="empty-state-sub">Você tem todas as figurinhas${filterCode ? ' deste país' : ''}.</div>
        </div>
      `;
      return;
    }

    let lastCode = null;
    missing.forEach(({ sticker, section }) => {
      if (section.code !== lastCode) {
        lastCode = section.code;
        const header = document.createElement('div');
        header.className = 'missing-group-label';
        header.textContent = section.name;
        listEl.appendChild(header);
      }

      const item = document.createElement('button');
      item.className = 'missing-item';
      const label = sticker.type === 'player'
        ? `${sticker.name} (#${sticker.number})`
        : (sticker.label || sticker.id);

      item.setAttribute('aria-label', `Ir para ${section.name} — ${label}`);
      item.innerHTML = `
        <span class="missing-item-flag" aria-hidden="true">${section.flag}</span>
        <span class="missing-item-id">${sticker.id}</span>
        <span class="missing-item-name">${label}</span>
        <span aria-hidden="true">›</span>
      `;
      item.addEventListener('click', () => { window.location.hash = `#/country/${section.code}`; });
      listEl.appendChild(item);
    });
  }

  const allOptions = ALL_SECTIONS.map(s =>
    `<option value="${s.code}">${s.name}</option>`
  ).join('');

  el.innerHTML = `
    <div class="missing-page">
      <div class="missing-header">
        <h1>Faltando</h1>
        <select class="missing-filter" id="missing-filter" aria-label="Filtrar por país">
          <option value="">Todos os países</option>
          ${allOptions}
        </select>
      </div>
      <div class="missing-count-banner" id="missing-count"></div>
      <div class="missing-list" id="missing-list" role="list" aria-label="Figurinhas faltando"></div>
    </div>
  `;

  build('');

  el.querySelector('#missing-filter').addEventListener('change', e => {
    build(e.target.value);
  });

  container.appendChild(el);
  return () => {};
}
