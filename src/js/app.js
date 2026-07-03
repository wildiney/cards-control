import '../css/app.css';
import { registerSW } from 'virtual:pwa-register';
import { renderDashboard } from './views/dashboard.js';
import { renderCountryList } from './views/country-list.js';
import { renderCountryDetail } from './views/country-detail.js';
import { renderMissing } from './views/missing.js';
import { renderDuplicates } from './views/duplicates.js';

// ── PWA update ───────────────────────────────────────────────
const updateSW = registerSW({
  onNeedRefresh() {
    const banner = document.getElementById('update-banner');
    const btn = document.getElementById('update-btn');
    if (banner) {
      banner.hidden = false;
      btn?.addEventListener('click', () => updateSW(true), { once: true });
    }
  },
  onOfflineReady() {
    showToast('App pronto para uso offline ✓');
  },
});

// ── Toast ────────────────────────────────────────────────────
let toastTimer;
export function showToast(msg, ms = 2200) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), ms);
}

// ── Bottom nav ───────────────────────────────────────────────
const NAV_ITEMS = [
  { hash: '#/',           icon: '🏠', label: 'Início'    },
  { hash: '#/countries', icon: '🌍', label: 'Países'    },
  { hash: '#/missing',   icon: '❌', label: 'Faltando'  },
  { hash: '#/duplicates',icon: '🔁', label: 'Repetidas' },
];

function buildNav(activePath) {
  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';
  nav.setAttribute('aria-label', 'Navegação principal');

  NAV_ITEMS.forEach(({ hash, icon, label }) => {
    const btn = document.createElement('button');
    btn.className = 'nav-item' + (activePath === hash ? ' active' : '');
    btn.setAttribute('aria-label', label);
    btn.setAttribute('aria-current', activePath === hash ? 'page' : 'false');
    btn.innerHTML = `<span class="nav-icon" aria-hidden="true">${icon}</span><span>${label}</span>`;
    btn.addEventListener('click', () => { window.location.hash = hash; });
    nav.appendChild(btn);
  });

  return nav;
}

// ── Router ───────────────────────────────────────────────────
function parseRoute(hash) {
  const h = hash || '#/';
  if (h === '#/' || h === '' || h === '#') return { path: 'dashboard', params: {} };
  if (h === '#/countries')  return { path: 'countries', params: {} };
  if (h === '#/missing')    return { path: 'missing',   params: {} };
  if (h === '#/duplicates') return { path: 'duplicates', params: {} };

  const countryMatch = h.match(/^#\/country\/([A-Z]{2,4})$/);
  if (countryMatch) return { path: 'country', params: { code: countryMatch[1] } };

  return { path: 'dashboard', params: {} };
}

function activeNavHash(path) {
  if (path === 'dashboard') return '#/';
  if (path === 'countries') return '#/countries';
  if (path === 'missing')   return '#/missing';
  if (path === 'duplicates') return '#/duplicates';
  return null; // country detail: no nav item active
}

let currentUnmount = null;

function navigate() {
  const { path, params } = parseRoute(window.location.hash);
  const app = document.getElementById('app');
  if (!app) return;

  if (currentUnmount) {
    currentUnmount();
    currentUnmount = null;
  }

  // Remove previous country theme
  clearCountryTheme();

  app.innerHTML = '';
  app.className = 'view-enter';

  const navHash = activeNavHash(path);
  const nav = buildNav(navHash);

  switch (path) {
    case 'dashboard':
      currentUnmount = renderDashboard(app);
      break;
    case 'countries':
      currentUnmount = renderCountryList(app);
      break;
    case 'country':
      currentUnmount = renderCountryDetail(app, params.code);
      break;
    case 'missing':
      currentUnmount = renderMissing(app);
      break;
    case 'duplicates':
      currentUnmount = renderDuplicates(app);
      break;
    default:
      currentUnmount = renderDashboard(app);
  }

  // Country detail has its own header with back button, no bottom nav for distraction-free use
  // But we keep nav visible for discoverability
  app.appendChild(nav);
}

export function clearCountryTheme() {
  const r = document.documentElement;
  r.style.removeProperty('--country-primary');
  r.style.removeProperty('--country-secondary');
  r.style.removeProperty('--country-accent');
  r.style.removeProperty('--country-header-text');
}

export function applyCountryTheme(country) {
  const r = document.documentElement;
  r.style.setProperty('--country-primary', country.colors.primary);
  r.style.setProperty('--country-secondary', country.colors.secondary);
  r.style.setProperty('--country-accent', country.colors.accent);
  r.style.setProperty('--country-header-text', getHeaderTextColor(country.colors.primary));
}

function getHeaderTextColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  // Relative luminance (W3C)
  const lum = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const L = 0.2126 * lum(r) + 0.7152 * lum(g) + 0.0722 * lum(b);
  // White on dark backgrounds, dark on light backgrounds
  return L > 0.35 ? '#1c1c1c' : '#ffffff';
}

// ── Init ─────────────────────────────────────────────────────
window.addEventListener('hashchange', navigate);
window.addEventListener('load', navigate);

// Handle hash-less entry
if (!window.location.hash) {
  window.location.hash = '#/';
}
