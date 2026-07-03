import { getDupes, addDupe, removeDupe, clearDupes } from '../storage.js';
import { ALL_SECTIONS, STICKER_MAP } from '../data.js';
import { showToast } from '../app.js';

export function renderDuplicates(container) {
  const el = document.createElement('div');
  el.style.flex = '1';

  function build() {
    const dupes = getDupes();
    const entries = Object.entries(dupes).filter(([, count]) => count > 0);

    // Group by country
    const byCountry = new Map();
    entries.forEach(([id, count]) => {
      const sticker = STICKER_MAP.get(id);
      if (!sticker) return;
      const code = sticker.countryCode;
      if (!byCountry.has(code)) byCountry.set(code, []);
      byCountry.get(code).push({ id, count, sticker });
    });

    const listEl = el.querySelector('#dupes-list');
    if (!listEl) return;
    listEl.innerHTML = '';

    const totalDupes = entries.reduce((s, [, c]) => s + c, 0);
    const countEl = el.querySelector('#dupes-title-count');
    if (countEl) countEl.textContent = totalDupes > 0 ? ` (${totalDupes})` : '';

    if (entries.length === 0) {
      listEl.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🔁</div>
          <div class="empty-state-text">Nenhuma repetida</div>
          <div class="empty-state-sub">Segure uma figurinha para marcar como repetida.</div>
        </div>
      `;
      return;
    }

    byCountry.forEach((items, code) => {
      const section = ALL_SECTIONS.find(s => s.code === code);
      if (!section) return;

      const header = document.createElement('div');
      header.style.cssText = 'font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;padding:12px 0 4px;';
      header.textContent = section.name;
      listEl.appendChild(header);

      items.forEach(({ id, count, sticker }) => {
        const label = sticker.type === 'player'
          ? `${sticker.name} (#${sticker.number})`
          : (sticker.label || id);

        const item = document.createElement('div');
        item.className = 'dupe-item';
        item.style.setProperty('--country-primary', section.colors.primary);
        item.setAttribute('aria-label', `${label} — ${count} repetida${count !== 1 ? 's' : ''}`);
        item.innerHTML = `
          <span class="dupe-item-count" aria-hidden="true">+${count}</span>
          <span class="dupe-item-name">${id} — ${label}</span>
          <div class="dupe-item-controls">
            <button class="btn-dupe-control" data-id="${id}" data-action="remove"
                    aria-label="Remover uma repetida de ${label}">−</button>
            <button class="btn-dupe-control" data-id="${id}" data-action="add"
                    aria-label="Adicionar repetida de ${label}">+</button>
          </div>
        `;
        listEl.appendChild(item);
      });
    });

    // Delegate controls
    listEl.querySelectorAll('.btn-dupe-control').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        if (btn.dataset.action === 'add') {
          addDupe(id);
          showToast('+1 repetida');
        } else {
          removeDupe(id);
          showToast('Repetida removida');
        }
        build();
      });
    });
  }

  el.innerHTML = `
    <div class="dupes-page">
      <div class="dupes-header">
        <h1>Repetidas<span id="dupes-title-count"></span></h1>
        <button class="btn-clear-all" id="clear-all-btn" aria-label="Limpar todas as repetidas">
          Limpar tudo
        </button>
      </div>
      <div class="missing-list" id="dupes-list" role="list" aria-label="Figurinhas repetidas"></div>
    </div>
  `;

  build();

  el.querySelector('#clear-all-btn').addEventListener('click', () => {
    const dupes = getDupes();
    if (Object.keys(dupes).length === 0) return;
    if (confirm('Remover todas as repetidas?')) {
      clearDupes();
      showToast('Repetidas limpas');
      build();
    }
  });

  container.appendChild(el);
  return () => {};
}
