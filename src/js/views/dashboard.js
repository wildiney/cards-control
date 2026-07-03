import { getStats, getCountryProgress } from '../storage.js';
import { ALL_SECTIONS, COUNTRIES } from '../data.js';

function getFlagDisplay(country) {
  const fallbackCodes = ['SCO', 'ENG'];
  if (fallbackCodes.includes(country.code)) {
    return `<span class="dc-flag-fallback" aria-hidden="true">${country.code}</span>`;
  }
  return `<span class="dc-flag" aria-hidden="true">${country.flag}</span>`;
}

export function renderDashboard(container) {
  const stats = getStats();
  const pct = stats.total > 0 ? Math.round((stats.owned / stats.total) * 100) : 0;

  // Build country progress list, sorted by completion desc
  const countryProgress = COUNTRIES.map(c => {
    const prog = getCountryProgress(c.code);
    return { ...c, ownedCount: prog.owned, total: prog.total, pct: prog.total > 0 ? prog.owned / prog.total : 0 };
  }).sort((a, b) => b.pct - a.pct || a.name.localeCompare(b.name));

  const el = document.createElement('div');
  el.innerHTML = `
    <header class="dashboard-header">
      <div class="dashboard-title">Copa do Mundo FIFA 2026</div>
      <div class="dashboard-app-name">Minhas Figurinhas</div>
    </header>

    <div class="dashboard">
      <!-- Progress ring -->
      <div class="progress-section">
        <div class="progress-ring-wrap">
          <div class="progress-ring" style="--pct: ${pct}%" role="progressbar"
               aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"
               aria-label="Progresso geral da coleção">
            <div class="progress-ring-center">
              <div class="progress-pct">${pct}%</div>
              <div class="progress-label">completo</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stat cards -->
      <div class="stat-cards">
        <div class="stat-card stat-card--owned">
          <div class="stat-value">${stats.owned}</div>
          <div class="stat-label">Tenho</div>
        </div>
        <div class="stat-card stat-card--missing">
          <div class="stat-value">${stats.missing}</div>
          <div class="stat-label">Faltam</div>
        </div>
        <div class="stat-card stat-card--dupe">
          <div class="stat-value">${stats.dupeCount}</div>
          <div class="stat-label">Repetidas</div>
        </div>
        <div class="stat-card stat-card--total">
          <div class="stat-value">${stats.total}</div>
          <div class="stat-label">Total</div>
        </div>
      </div>

      <!-- Countries -->
      <div class="section-title">
        Países
        <span class="section-title-sub">${countryProgress.filter(c => c.pct === 1).length} completos</span>
      </div>
      <div class="dashboard-countries" id="dc-list"></div>
    </div>
  `;

  const list = el.querySelector('#dc-list');

  countryProgress.forEach(c => {
    const barWidth = Math.round(c.pct * 100);
    const card = document.createElement('button');
    card.className = 'dashboard-country-card';
    card.style.setProperty('--country-primary', c.colors.primary);
    card.setAttribute('aria-label', `${c.name} — ${c.ownedCount} de ${c.total} figurinhas`);
    card.innerHTML = `
      ${getFlagDisplay(c)}
      <div class="dc-info">
        <div class="dc-name">${c.name}</div>
        <div class="dc-bar-row">
          <div class="dc-bar" role="presentation">
            <div class="dc-bar-fill" style="width: ${barWidth}%"></div>
          </div>
          <span class="dc-count">${c.ownedCount}/${c.total}</span>
        </div>
      </div>
    `;
    card.addEventListener('click', () => { window.location.hash = `#/country/${c.code}`; });
    list.appendChild(card);
  });

  container.appendChild(el);
  return () => {};
}
