import { getCountryProgress } from '../storage.js';
import { COUNTRIES } from '../data.js';

const FALLBACK_FLAG_CODES = ['SCO', 'ENG'];

function flagHtml(country, size = 32) {
  if (FALLBACK_FLAG_CODES.includes(country.code)) {
    return `<span class="flag-fallback" aria-hidden="true" style="font-size:${Math.round(size * 0.35)}px">${country.code}</span>`;
  }
  return `<span class="flag" aria-hidden="true" style="font-size:${size}px">${country.flag}</span>`;
}

export function renderCountryList(container) {
  let sortMode = 'group'; // 'group' | 'completion'

  function build() {
    const progress = COUNTRIES.map(c => {
      const p = getCountryProgress(c.code);
      return { ...c, ownedCount: p.owned, total: p.total, pct: p.total > 0 ? p.owned / p.total : 0 };
    });

    const sorted = sortMode === 'group'
      ? [...progress].sort((a, b) => a.group.localeCompare(b.group) || a.name.localeCompare(b.name))
      : [...progress].sort((a, b) => b.pct - a.pct || a.name.localeCompare(b.name));

    el.innerHTML = `
      <div class="country-list-page">
        <div class="country-list-header">
          <h1>Países</h1>
          <div class="sort-toggle" role="group" aria-label="Ordenar por">
            <button class="sort-btn ${sortMode === 'group' ? 'active' : ''}" data-sort="group" aria-pressed="${sortMode === 'group'}">Grupo</button>
            <button class="sort-btn ${sortMode === 'completion' ? 'active' : ''}" data-sort="completion" aria-pressed="${sortMode === 'completion'}">Completo</button>
          </div>
        </div>
        <div class="country-grid" id="country-grid" role="list"></div>
      </div>
    `;

    const grid = el.querySelector('#country-grid');

    // Group headers when sorting by group
    let lastGroup = null;

    sorted.forEach(c => {
      if (sortMode === 'group' && c.group !== lastGroup) {
        lastGroup = c.group;
        const header = document.createElement('div');
        header.style.cssText = 'grid-column:1/-1;font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;padding:8px 0 4px';
        header.textContent = `Grupo ${c.group}`;
        header.setAttribute('aria-hidden', 'true');
        grid.appendChild(header);
      }

      const barWidth = Math.round(c.pct * 100);
      const card = document.createElement('button');
      card.className = 'country-card' + (c.pct === 1 ? ' complete' : '');
      card.style.setProperty('--country-primary', c.colors.primary);
      card.setAttribute('role', 'listitem');
      card.setAttribute('aria-label', `${c.name} — ${c.ownedCount} de ${c.total} figurinhas`);
      card.innerHTML = `
        ${flagHtml(c)}
        <span class="name">${c.name}</span>
        <span class="group-tag">Grupo ${c.group}</span>
        <div class="mini-bar" role="presentation">
          <div class="mini-bar-fill" style="width:${barWidth}%"></div>
        </div>
        <span class="fraction">${c.ownedCount}/${c.total}</span>
      `;
      card.addEventListener('click', () => { window.location.hash = `#/country/${c.code}`; });
      grid.appendChild(card);
    });

    // Sort buttons
    el.querySelectorAll('.sort-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sortMode = btn.dataset.sort;
        build();
      });
    });
  }

  const el = document.createElement('div');
  el.style.flex = '1';
  build();
  container.appendChild(el);
  return () => {};
}
