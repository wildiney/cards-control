import { toggleOwned, addDupe, removeDupe, isOwned, getDupeCount, getCountryProgress } from '../storage.js';
import { ALL_SECTIONS } from '../data.js';
import { applyCountryTheme, showToast } from '../app.js';

const FALLBACK_FLAG_CODES = ['SCO', 'ENG'];

function flagHtml(country) {
  if (FALLBACK_FLAG_CODES.includes(country.code)) {
    return `<span class="country-flag-fallback" aria-hidden="true">${country.code}</span>`;
  }
  return `<span class="country-flag" aria-hidden="true">${country.flag}</span>`;
}

function stickerIcon(sticker) {
  if (sticker.type === 'badge') return '🛡️';
  if (sticker.type === 'team')  return '📸';
  if (sticker.type === 'intro') return '🏆';
  if (sticker.type === 'museum') return '🏅';
  return '⚽';
}

function stickerLabel(sticker) {
  if (sticker.type === 'player') {
    const num = sticker.number != null ? `<div class="sticker-jersey">#${sticker.number}</div>` : '';
    return `<div class="sticker-name">${sticker.name}</div>${num}`;
  }
  return `<div class="sticker-name">${sticker.label || ''}</div>`;
}

export function renderCountryDetail(container, code) {
  const section = ALL_SECTIONS.find(s => s.code === code);
  if (!section) {
    container.innerHTML = `<div class="loading">País não encontrado</div>`;
    return () => {};
  }

  applyCountryTheme(section);

  function buildProgress() {
    const p = getCountryProgress(code);
    const pct = p.total > 0 ? Math.round((p.owned / p.total) * 100) : 0;
    return { owned: p.owned, total: p.total, pct, barWidth: pct };
  }

  function buildCard(sticker) {
    const owned = isOwned(sticker.id);
    const dupes = getDupeCount(sticker.id);
    const classes = [
      'sticker-card',
      owned ? 'owned' : 'missing',
      sticker.foil ? 'foil' : '',
    ].filter(Boolean).join(' ');

    const card = document.createElement('button');
    card.className = classes;
    card.dataset.id = sticker.id;
    card.setAttribute('aria-label',
      `Figurinha ${sticker.id}${sticker.name ? ' — ' + sticker.name : ''} — ${owned ? 'tenho' : 'falta'}`
    );
    card.setAttribute('aria-pressed', String(owned));
    card.innerHTML = `
      <div class="sticker-num">${sticker.id.split('-')[1]}</div>
      <div class="sticker-type-icon" aria-hidden="true">${stickerIcon(sticker)}</div>
      ${stickerLabel(sticker)}
      ${sticker.foil ? '<div class="foil-label">✨ Brilho</div>' : ''}
      ${dupes > 0 ? `<span class="dupe-badge" aria-label="${dupes} repetida${dupes > 1 ? 's' : ''}">+${dupes}</span>` : ''}
    `;
    return card;
  }

  function refreshCard(id) {
    const card = grid.querySelector(`[data-id="${id}"]`);
    if (!card) return;
    const sticker = section.stickers.find(s => s.id === id);
    if (!sticker) return;
    const newCard = buildCard(sticker);
    newCard.addEventListener('pointerdown', onPointerDown);
    newCard.addEventListener('pointerup', onPointerUp);
    newCard.addEventListener('pointermove', onPointerMove);
    newCard.addEventListener('pointercancel', onPointerUp);
    newCard.addEventListener('click', onCardClick);
    card.replaceWith(newCard);
  }

  function refreshProgress() {
    const { owned, total, barWidth } = buildProgress();
    const fill = container.querySelector('.country-progress-fill');
    const text = container.querySelector('.country-progress-text');
    if (fill) fill.style.width = `${barWidth}%`;
    if (text) text.textContent = `${owned}/${total}`;
  }

  // ── Long press detection ────────────────────────────────────
  let pressTimer = null;
  let didLongPress = false;
  let startX = 0;
  let startY = 0;
  const LONG_PRESS_MS = 500;
  const MOVE_THRESHOLD = 12; // px — cancel only if finger moved significantly

  function onPointerDown(e) {
    didLongPress = false;
    startX = e.clientX;
    startY = e.clientY;
    const card = e.currentTarget;
    pressTimer = setTimeout(() => {
      const id = card.dataset.id;
      if (!id || !isOwned(id)) return;
      didLongPress = true;
      if (navigator.vibrate) navigator.vibrate(40);
      const count = addDupe(id);
      showToast(`+1 repetida (${count} no total)`);
      refreshCard(id);
    }, LONG_PRESS_MS);
  }

  function onPointerUp() {
    clearTimeout(pressTimer);
    pressTimer = null;
  }

  function onPointerMove(e) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (dx * dx + dy * dy > MOVE_THRESHOLD * MOVE_THRESHOLD) {
      clearTimeout(pressTimer);
      pressTimer = null;
    }
  }

  function onCardClick(e) {
    if (didLongPress) {
      didLongPress = false;
      return;
    }
    const id = e.currentTarget.dataset.id;
    const nowOwned = toggleOwned(id);
    showToast(nowOwned ? 'Figurinha adicionada ✓' : 'Figurinha removida');
    refreshCard(id);
    refreshProgress();
  }

  // ── Render ────────────────────────────────────────────────
  const { owned, total, barWidth } = buildProgress();

  const el = document.createElement('div');
  el.style.flex = '1';
  el.innerHTML = `
    <div class="country-header">
      <div class="country-header-top">
        <button class="country-header-back" aria-label="Voltar" id="back-btn">‹</button>
        ${flagHtml(section)}
        <div class="country-header-info">
          <div class="country-name">${section.name}</div>
          ${section.group ? `<div class="country-group">Grupo ${section.group}</div>` : ''}
        </div>
      </div>
      <div class="country-progress-row">
        <div class="country-progress-bar" role="progressbar"
             aria-valuenow="${barWidth}" aria-valuemin="0" aria-valuemax="100"
             aria-label="Progresso de ${section.name}">
          <div class="country-progress-fill" style="width:${barWidth}%"></div>
        </div>
        <span class="country-progress-text">${owned}/${total}</span>
      </div>
    </div>
    <div class="sticker-grid" id="sticker-grid" role="list"
         aria-label="Figurinhas de ${section.name}"></div>
  `;

  const grid = el.querySelector('#sticker-grid');

  section.stickers.forEach(sticker => {
    const card = buildCard(sticker);
    card.setAttribute('role', 'listitem');
    card.addEventListener('pointerdown', onPointerDown);
    card.addEventListener('pointerup', onPointerUp);
    card.addEventListener('pointermove', onPointerMove);
    card.addEventListener('pointercancel', onPointerUp);
    card.addEventListener('click', onCardClick);
    grid.appendChild(card);
  });

  el.querySelector('#back-btn').addEventListener('click', () => {
    history.length > 1 ? history.back() : (window.location.hash = '#/countries');
  });

  container.appendChild(el);

  return () => {};
}
