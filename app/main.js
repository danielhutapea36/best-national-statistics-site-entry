// main.js — NusaStat router and page interactions.
// Hash routes: #/ (home), #/population, #/economy, #/employment,
// #/education, #/health, #/provinces, #/province/<name>, #/compare,
// #/sources. The provinces table filters and sorts in place; the compare
// page re-renders when either picker changes.

import { PROVINCES } from './data.js';
import {
  renderHome, renderPopulation, renderEconomy, renderEmployment,
  renderEducation, renderHealth, renderProvinces, renderProvinceDetail,
  renderProvinceRows, renderCompare, renderSources, renderNotFound,
} from './views.js';

const page = document.getElementById('page');
const navLinks = [...document.querySelectorAll('[data-nav]')];

const ROUTES = {
  '': renderHome,
  population: renderPopulation,
  economy: renderEconomy,
  employment: renderEmployment,
  education: renderEducation,
  health: renderHealth,
  provinces: renderProvinces,
  compare: () => renderCompare(compareState.a, compareState.b),
  sources: renderSources,
};

const compareState = { a: 'West Java', b: 'East Java' };

function route() {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const [name, arg] = hash.split('/');
  let html;
  if (name === 'province' && arg) {
    html = renderProvinceDetail(decodeURIComponent(arg));
  } else if (Object.prototype.hasOwnProperty.call(ROUTES, name)) {
    html = ROUTES[name]();
  } else {
    html = renderNotFound(`#/${hash}`);
  }
  page.innerHTML = html;
  navLinks.forEach((a) => {
    const target = a.getAttribute('href').replace(/^#\/?/, '').split('/')[0];
    a.classList.toggle('active', target === name || (target === '' && name === ''));
    if (a.classList.contains('active')) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
  updateProvinceCount();
}

function updateProvinceCount() {
  const count = document.getElementById('prov-count');
  if (!count) return;
  const rows = [...document.querySelectorAll('#prov-body tr')];
  const visible = rows.filter((r) => r.style.display !== 'none').length;
  count.textContent = `Showing ${visible} of ${rows.length} provinces in this table.`;
}

// Provinces table: live search filter.
document.addEventListener('input', (event) => {
  if (event.target.id !== 'prov-search') return;
  const q = event.target.value.trim().toLowerCase();
  document.querySelectorAll('#prov-body tr').forEach((row) => {
    row.style.display = row.dataset.name.includes(q) ? '' : 'none';
  });
  updateProvinceCount();
});

// Provinces table: sort buttons re-render the rows.
document.addEventListener('click', (event) => {
  const btn = event.target.closest('.sort-btn');
  if (!btn) return;
  const body = document.getElementById('prov-body');
  if (!body) return;
  const key = btn.dataset.sort;
  const rows = [...PROVINCES].sort((a, b) =>
    key === 'name' ? a.name.localeCompare(b.name)
      : key === 'density' ? b.density - a.density
        : b.pop - a.pop);
  const wrap = body.closest('.table-wrap');
  wrap.outerHTML = renderProvinceRows(rows);
  document.querySelectorAll('.sort-btn').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');
  updateProvinceCount();
});

// Compare page: re-render when either picker changes.
document.addEventListener('change', (event) => {
  if (event.target.id === 'cmp-a') compareState.a = event.target.value;
  else if (event.target.id === 'cmp-b') compareState.b = event.target.value;
  else return;
  const result = document.getElementById('cmp-result');
  if (!result) return;
  const fresh = document.createElement('div');
  fresh.innerHTML = renderCompare(compareState.a, compareState.b);
  result.replaceWith(fresh.querySelector('#cmp-result'));
});

window.addEventListener('hashchange', route);
route();
