// charts.js — small SVG chart builders for NusaStat.
// Every chart is drawn from the data passed in, with no library and no
// network request. Colours come from the site palette (see style.css).

const TEAL = '#0f4c5c';
const AMBER = '#e36414';
const SAND = '#f4a261';
const MIST = '#cfe3e2';
const INK = '#1d2b2e';

function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function niceMax(values) {
  const max = Math.max(...values.map((v) => Math.abs(v)));
  if (max <= 0) return 1;
  const step = 10 ** Math.floor(Math.log10(max));
  return Math.ceil(max / step) * step;
}

// Vertical bar chart. series: [{year, value}]. Handles negative values
// (a zero line is drawn and bars below it point down).
export function barChart(series, { height = 220, unit = '%', decimals = 2 } = {}) {
  const width = 560;
  const padL = 44;
  const padB = 28;
  const padT = 18;
  const plotW = width - padL - 12;
  const plotH = height - padT - padB;
  const values = series.map((s) => s.value);
  const lo = Math.min(0, ...values);
  const hi = Math.max(0, ...values);
  const span = hi - lo || 1;
  const y = (v) => padT + ((hi - v) / span) * plotH;
  const zeroY = y(0);
  const slot = plotW / series.length;
  const barW = Math.min(52, slot * 0.58);
  const grid = [0, 0.25, 0.5, 0.75, 1].map((f) => lo + (hi - lo) * f);

  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Bar chart">`;
  for (const g of grid) {
    const gy = y(g);
    svg += `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${width - 12}" y2="${gy.toFixed(1)}" stroke="#e3ddd2" stroke-width="1"/>`;
    svg += `<text x="${padL - 6}" y="${(gy + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#5c6b6a">${g.toFixed(0)}${unit}</text>`;
  }
  svg += `<line x1="${padL}" y1="${zeroY.toFixed(1)}" x2="${width - 12}" y2="${zeroY.toFixed(1)}" stroke="#9aa7a6" stroke-width="1.5"/>`;
  series.forEach((s, i) => {
    const cx = padL + slot * i + slot / 2;
    const top = y(Math.max(0, s.value));
    const bottom = y(Math.min(0, s.value));
    const fill = s.value < 0 ? AMBER : TEAL;
    svg += `<rect x="${(cx - barW / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${barW}" height="${Math.max(1, bottom - top).toFixed(1)}" rx="3" fill="${fill}"/>`;
    svg += `<text x="${cx.toFixed(1)}" y="${(s.value < 0 ? bottom + 15 : top - 6).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">${s.value.toFixed(decimals)}${unit}</text>`;
    svg += `<text x="${cx.toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="#5c6b6a">${esc(s.year)}</text>`;
  });
  return `${svg}</svg>`;
}

// Horizontal bar chart. rows: [{label, value, note}].
export function hbarChart(rows, { unit = '%', decimals = 1, maxValue = null } = {}) {
  const width = 560;
  const rowH = 34;
  const height = rows.length * rowH + 14;
  const padL = 190;
  const max = maxValue ?? niceMax(rows.map((r) => r.value));
  const barMax = width - padL - 64;
  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Horizontal bar chart">`;
  rows.forEach((r, i) => {
    const y = 8 + i * rowH;
    const w = Math.max(2, (r.value / max) * barMax);
    svg += `<text x="0" y="${y + 15}" font-size="12.5" fill="${INK}">${esc(r.label)}</text>`;
    svg += `<rect x="${padL}" y="${y + 3}" width="${w.toFixed(1)}" height="18" rx="3" fill="${i === 0 ? AMBER : TEAL}"/>`;
    svg += `<text x="${(padL + w + 8).toFixed(1)}" y="${y + 17}" font-size="12" font-weight="700" fill="${INK}">${r.value.toFixed(decimals)}${unit}</text>`;
    if (r.note) svg += `<text x="${padL}" y="${y + 30}" font-size="10.5" fill="#5c6b6a">${esc(r.note)}</text>`;
  });
  return `${svg}</svg>`;
}

// Line chart with dots. series: [{year, value}].
export function lineChart(series, { height = 220, unit = '%', decimals = 2 } = {}) {
  const width = 560;
  const padL = 44;
  const padB = 28;
  const padT = 20;
  const plotW = width - padL - 12;
  const plotH = height - padT - padB;
  const values = series.map((s) => s.value);
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const pad = (hi - lo) * 0.15 || 1;
  const top = hi + pad;
  const bottom = lo - pad;
  const span = top - bottom || 1;
  const x = (i) => padL + (i / (series.length - 1)) * plotW;
  const y = (v) => padT + ((top - v) / span) * plotH;
  const grid = [0, 0.5, 1].map((f) => bottom + (top - bottom) * f);

  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Line chart">`;
  for (const g of grid) {
    const gy = y(g);
    svg += `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${width - 12}" y2="${gy.toFixed(1)}" stroke="#e3ddd2" stroke-width="1"/>`;
    svg += `<text x="${padL - 6}" y="${(gy + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#5c6b6a">${g.toFixed(1)}${unit}</text>`;
  }
  const points = series.map((s, i) => `${x(i).toFixed(1)},${y(s.value).toFixed(1)}`).join(' ');
  svg += `<polyline points="${points}" fill="none" stroke="${TEAL}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  series.forEach((s, i) => {
    svg += `<circle cx="${x(i).toFixed(1)}" cy="${y(s.value).toFixed(1)}" r="4.5" fill="#fff" stroke="${AMBER}" stroke-width="2.5"/>`;
    svg += `<text x="${x(i).toFixed(1)}" y="${(y(s.value) - 10).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">${s.value.toFixed(decimals)}${unit}</text>`;
    svg += `<text x="${x(i).toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="#5c6b6a">${esc(s.year)}</text>`;
  });
  return `${svg}</svg>`;
}

// A single big "donut" share, drawn as an SVG ring.
export function ringChart(share, { size = 150, label = '' } = {}) {
  const r = 58;
  const c = 2 * Math.PI * r;
  const filled = (share / 100) * c;
  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="${esc(label)} ${share} percent">
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${MIST}" stroke-width="16"/>
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${TEAL}" stroke-width="16" stroke-dasharray="${filled.toFixed(1)} ${c.toFixed(1)}" stroke-linecap="round" transform="rotate(-90 ${size / 2} ${size / 2})"/>
    <text x="50%" y="47%" text-anchor="middle" font-size="26" font-weight="800" fill="${INK}">${share}%</text>
    <text x="50%" y="60%" text-anchor="middle" font-size="11" fill="#5c6b6a">${esc(label)}</text>
  </svg>`;
}
