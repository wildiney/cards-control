import { ALL_SECTIONS, TOTAL_STICKERS } from './data.js';

const KEYS = {
  owned: 'wc2026_owned',
  dupes: 'wc2026_dupes',
};

function getOwned() {
  try {
    const raw = localStorage.getItem(KEYS.owned);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function saveOwned(set) {
  localStorage.setItem(KEYS.owned, JSON.stringify([...set]));
}

function getDupes() {
  try {
    const raw = localStorage.getItem(KEYS.dupes);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveDupes(obj) {
  localStorage.setItem(KEYS.dupes, JSON.stringify(obj));
}

function toggleOwned(id) {
  const owned = getOwned();
  const dupes = getDupes();
  if (owned.has(id)) {
    owned.delete(id);
    delete dupes[id];
    saveDupes(dupes);
  } else {
    owned.add(id);
  }
  saveOwned(owned);
  return owned.has(id);
}

function addDupe(id) {
  const owned = getOwned();
  if (!owned.has(id)) return 0;
  const dupes = getDupes();
  dupes[id] = (dupes[id] || 0) + 1;
  saveDupes(dupes);
  return dupes[id];
}

function removeDupe(id) {
  const dupes = getDupes();
  if (!dupes[id]) return 0;
  dupes[id] -= 1;
  if (dupes[id] <= 0) delete dupes[id];
  saveDupes(dupes);
  return dupes[id] || 0;
}

function getStats() {
  const owned = getOwned();
  const dupes = getDupes();
  const dupeCount = Object.values(dupes).reduce((s, n) => s + n, 0);
  return {
    owned: owned.size,
    missing: TOTAL_STICKERS - owned.size,
    total: TOTAL_STICKERS,
    dupeCount,
  };
}

function getCountryProgress(code) {
  const owned = getOwned();
  const section = ALL_SECTIONS.find(s => s.code === code);
  if (!section) return { owned: 0, total: 0 };
  const total = section.stickers.length;
  const ownedCount = section.stickers.filter(s => owned.has(s.id)).length;
  return { owned: ownedCount, total };
}

function isOwned(id) {
  return getOwned().has(id);
}

function getDupeCount(id) {
  const dupes = getDupes();
  return dupes[id] || 0;
}

function clearDupes() {
  localStorage.removeItem(KEYS.dupes);
}

function clearAll() {
  localStorage.removeItem(KEYS.owned);
  localStorage.removeItem(KEYS.dupes);
}

export {
  getOwned,
  getDupes,
  toggleOwned,
  addDupe,
  removeDupe,
  getStats,
  getCountryProgress,
  isOwned,
  getDupeCount,
  clearDupes,
  clearAll,
};
