// views.js — one render function per page of NusaStat.
// Each returns HTML for the #page element. All figures come from data.js;
// all charts from charts.js. Nothing here fetches anything.

import {
  META, HEADLINES, POPULATION, PROVINCES, PROVINCE_SOURCE, ECONOMY,
  EMPLOYMENT, EDUCATION, HEALTH, RELEASES, SOURCES,
} from './data.js';
import { barChart, hbarChart, lineChart, ringChart } from './charts.js';

function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function sourceLine(text) {
  return `<p class="source">Source: ${esc(text)}</p>`;
}

function statCard(item) {
  return `<article class="card stat">
    <p class="stat-label">${esc(item.label)}</p>
    <p class="stat-value">${esc(item.value)}</p>
    <p class="stat-detail">${esc(item.detail)}</p>
    <p class="stat-source">${esc(item.source)}</p>
  </article>`;
}

function topicCard(href, title, body, tag) {
  return `<a class="card topic" href="${href}">
    <p class="topic-tag">${esc(tag)}</p>
    <h3>${esc(title)}</h3>
    <p>${esc(body)}</p>
    <p class="topic-link">Explore →</p>
  </a>`;
}

export function renderHome() {
  const top5 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 5);
  return `
  <section class="hero">
    <p class="kicker">Indonesia in numbers</p>
    <h1>One country, <span>283.5 million</span> stories — told in statistics.</h1>
    <p class="lede">NusaStat gathers Indonesia's official numbers — population, economy, jobs,
    schooling and health — in one place, each figure with its source and year,
    so you can find an answer and trust it.</p>
    <p class="hero-meta">Figures checked ${esc(META.updated)} · Sources: BPS, World Bank, Ministry of Health</p>
    <div class="hero-actions">
      <a class="btn primary" href="#/population">Explore the population</a>
      <a class="btn" href="#/compare">Compare provinces</a>
    </div>
  </section>

  <section aria-label="Headline indicators">
    <div class="grid stats">${HEADLINES.map(statCard).join('')}</div>
  </section>

  <section class="split">
    <article class="card">
      <h2>Growth has held above 5% for three years</h2>
      <p>Real GDP grew 5.03% in 2024, after 5.05% in 2023 and 5.31% in 2022 — a steady
      run following the 2020 pandemic contraction of 2.07%.</p>
      ${barChart(ECONOMY.growthSeries)}
      ${sourceLine(ECONOMY.growthSource)}
    </article>
    <article class="card">
      <h2>Unemployment is at its lowest since 1997</h2>
      <p>The open unemployment rate fell to 4.76% in February 2025, down from 7.07%
      in August 2020. The labour force now counts 153.05 million people.</p>
      ${lineChart(EMPLOYMENT.unemploymentSeries)}
      ${sourceLine(EMPLOYMENT.unemploymentSource)}
    </article>
  </section>

  <section class="split">
    <article class="card">
      <h2>Where Indonesians live</h2>
      <p>More than half the population lives on Java. West Java alone holds
      50.3 million people — more than Spain.</p>
      ${hbarChart(top5.map((p) => ({ label: p.name, value: p.pop, note: '' })), { unit: 'm', decimals: 1, maxValue: 55 })}
      ${sourceLine(PROVINCE_SOURCE)}
      <p><a class="inline-link" href="#/provinces">See all 20 provinces in the table →</a></p>
    </article>
    <article class="card">
      <h2>A young country, ageing slowly</h2>
      <p>Almost a quarter of Indonesians are children under 15, and 68.1% are of
      working age — a demographic dividend that peaks in the 2030s.</p>
      ${ringChart(68.1, { label: 'working age' })}
      <ul class="fact-list">
        <li><strong>24.6%</strong> are aged 0–14</li>
        <li><strong>68.1%</strong> are aged 15–64</li>
        <li><strong>7.3%</strong> are aged 65 and over</li>
      </ul>
      ${sourceLine(POPULATION.ageSource)}
    </article>
  </section>

  <section>
    <h2>Latest releases</h2>
    <div class="grid releases">${RELEASES.map((r) => `
      <article class="card release">
        <p class="release-date">${esc(r.date)}</p>
        <h3>${esc(r.title)}</h3>
        <p>${esc(r.body)}</p>
        <p class="stat-source">${esc(r.source)}</p>
      </article>`).join('')}
    </div>
  </section>

  <section>
    <h2>Browse by topic</h2>
    <div class="grid topics">
      ${topicCard('#/population', 'Population', 'How many people, where they live, and how the age mix is changing.', 'People')}
      ${topicCard('#/economy', 'Economy', 'GDP, growth, inflation, trade and the sectors that drive output.', 'Money')}
      ${topicCard('#/employment', 'Jobs & poverty', 'Who works, who is looking, and how poverty is falling.', 'Work')}
      ${topicCard('#/education', 'Education', 'Literacy, enrolment and how far Indonesians get in school.', 'Learning')}
      ${topicCard('#/health', 'Health', 'How long people live, and how healthy childhood is.', 'Wellbeing')}
      ${topicCard('#/sources', 'Sources & method', 'Where every number comes from, and how to read it.', 'About')}
    </div>
  </section>`;
}

export function renderPopulation() {
  return `
  <section class="page-head">
    <p class="kicker">People</p>
    <h1>Population</h1>
    <p class="lede">Indonesia is the world's fourth most populous country. Its population is
    still growing, still young, and increasingly urban.</p>
  </section>
  <section class="grid stats">
    <article class="card stat"><p class="stat-label">Total population</p><p class="stat-value">${esc(POPULATION.total.value)}</p><p class="stat-detail">4th in the world, after India, China and the United States</p><p class="stat-source">${esc(POPULATION.total.source)}</p></article>
    <article class="card stat"><p class="stat-label">Annual growth</p><p class="stat-value">${esc(POPULATION.growth.value)}</p><p class="stat-detail">About 2.3 million more people each year</p><p class="stat-source">${esc(POPULATION.growth.source)}</p></article>
    <article class="card stat"><p class="stat-label">Density</p><p class="stat-value">${esc(POPULATION.density.value)}</p><p class="stat-detail">Java averages over 1,000 people per km²; Papua about 13</p><p class="stat-source">${esc(POPULATION.density.source)}</p></article>
    <article class="card stat"><p class="stat-label">Urban share</p><p class="stat-value">${esc(POPULATION.urban.value)}</p><p class="stat-detail">Jakarta, Surabaya and Bandung are the largest cities</p><p class="stat-source">${esc(POPULATION.urban.source)}</p></article>
  </section>
  <section class="split">
    <article class="card">
      <h2>Age structure, 2024</h2>
      <p>For every 100 people of working age there are about 47 dependants —
      36 children and 11 older people. That ratio is what economists call the
      demographic dividend.</p>
      ${hbarChart(POPULATION.ageGroups.map((g) => ({ label: g.label, value: g.share, note: g.note })), { unit: '%', decimals: 1, maxValue: 75 })}
      ${sourceLine(POPULATION.ageSource)}
    </article>
    <article class="card">
      <h2>Fertility has reached replacement</h2>
      <p>At ${esc(POPULATION.fertility.value)}, the average woman now has just
      enough children to replace the population — so growth is slowing, and the
      share of older people will rise in the decades ahead.</p>
      <ul class="fact-list">
        <li><strong>2.3 million</strong> births a year, roughly</li>
        <li><strong>0.81%</strong> annual population growth (2024)</li>
        <li><strong>2030s</strong> when the working-age share is expected to peak</li>
      </ul>
      ${sourceLine('World Bank, World Development Indicators, 2023–2024')}
    </article>
  </section>
  <section class="card">
    <h2>Most populous provinces</h2>
    <p>Java holds about 56% of all Indonesians on less than 7% of the land.
    The table below is searchable — try your own province.</p>
    ${renderProvinceRows([...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10), true)}
    <p><a class="inline-link" href="#/provinces">Open the full provinces table →</a></p>
  </section>`;
}

export function renderEconomy() {
  return `
  <section class="page-head">
    <p class="kicker">Money</p>
    <h1>Economy</h1>
    <p class="lede">Southeast Asia's largest economy: $1.40 trillion of output in 2024,
    growing a little over 5% a year, with inflation back inside target.</p>
  </section>
  <section class="grid stats">
    <article class="card stat"><p class="stat-label">GDP</p><p class="stat-value">${esc(ECONOMY.gdp.value)}</p><p class="stat-detail">16th largest economy in the world</p><p class="stat-source">${esc(ECONOMY.gdp.source)}</p></article>
    <article class="card stat"><p class="stat-label">GDP per person</p><p class="stat-value">${esc(ECONOMY.gdpPerCapita.value)}</p><p class="stat-detail">Upper-middle-income country since 2023</p><p class="stat-source">${esc(ECONOMY.gdpPerCapita.source)}</p></article>
    <article class="card stat"><p class="stat-label">GDP (PPP)</p><p class="stat-value">${esc(ECONOMY.gdpPpp.value)}</p><p class="stat-detail">Adjusted for what money buys at home</p><p class="stat-source">${esc(ECONOMY.gdpPpp.source)}</p></article>
    <article class="card stat"><p class="stat-label">Foreign investment</p><p class="stat-value">${esc(ECONOMY.fdi.value)}</p><p class="stat-detail">Net FDI inflows in 2024</p><p class="stat-source">${esc(ECONOMY.fdi.source)}</p></article>
  </section>
  <section class="split">
    <article class="card">
      <h2>GDP growth, 2020–2024</h2>
      <p>After the pandemic contraction, growth returned to its long-run pace of
      about 5% — driven by household spending, investment and exports.</p>
      ${barChart(ECONOMY.growthSeries)}
      ${sourceLine(ECONOMY.growthSource)}
    </article>
    <article class="card">
      <h2>Inflation, 2020–2024</h2>
      <p>Inflation spiked to 5.51% in 2022 as global food and energy prices rose,
      then fell back to 1.57% by December 2024 — inside Bank Indonesia's
      1.5–3.5% target range.</p>
      ${barChart(ECONOMY.inflationSeries)}
      ${sourceLine(ECONOMY.inflationSource)}
    </article>
  </section>
  <section class="split">
    <article class="card">
      <h2>What the economy makes</h2>
      <p>Manufacturing is the largest sector; agriculture still employs about a
      quarter of workers while producing an eighth of output.</p>
      ${hbarChart(ECONOMY.sectors.map((s) => ({ label: s.label, value: s.share, note: s.note })), { unit: '%', decimals: 1, maxValue: 40 })}
      ${sourceLine(ECONOMY.sectorSource)}
    </article>
    <article class="card">
      <h2>Trade</h2>
      <p>Indonesia sells more abroad than it buys: exports were ${esc(ECONOMY.exports.value)}
      of GDP in 2024 against imports of ${esc(ECONOMY.imports.value)}. Coal, palm oil,
      nickel and electronics lead exports; machinery and fuel lead imports.</p>
      <ul class="fact-list">
        <li><strong>22.2%</strong> of GDP — exports of goods and services (2024)</li>
        <li><strong>20.4%</strong> of GDP — imports of goods and services (2024)</li>
        <li><strong>$24.2bn</strong> — net foreign direct investment (2024)</li>
      </ul>
      ${sourceLine('World Bank, World Development Indicators, 2024')}
    </article>
  </section>`;
}

export function renderEmployment() {
  return `
  <section class="page-head">
    <p class="kicker">Work</p>
    <h1>Jobs &amp; poverty</h1>
    <p class="lede">153 million Indonesians are in the labour force. Unemployment is at a
    28-year low — but nearly six in ten workers are still in informal jobs.</p>
  </section>
  <section class="grid stats">
    <article class="card stat"><p class="stat-label">Unemployment rate</p><p class="stat-value">${esc(EMPLOYMENT.unemployment.value)}</p><p class="stat-detail">Lowest since 1997; 7.28 million people looking for work</p><p class="stat-source">${esc(EMPLOYMENT.unemployment.source)}</p></article>
    <article class="card stat"><p class="stat-label">Labour force</p><p class="stat-value">${esc(EMPLOYMENT.labourForce.value)}</p><p class="stat-detail">Out of a working-age population of ${esc(EMPLOYMENT.workingAge.value)}</p><p class="stat-source">${esc(EMPLOYMENT.workingAge.source)}</p></article>
    <article class="card stat"><p class="stat-label">Participation</p><p class="stat-value">${esc(EMPLOYMENT.lfpr.value)}</p><p class="stat-detail">Share of working-age people in work or looking</p><p class="stat-source">${esc(EMPLOYMENT.lfpr.source)}</p></article>
    <article class="card stat"><p class="stat-label">Informal work</p><p class="stat-value">${esc(EMPLOYMENT.informal.value)}</p><p class="stat-detail">Mostly self-employed, casual or family workers</p><p class="stat-source">${esc(EMPLOYMENT.informal.source)}</p></article>
  </section>
  <section class="split">
    <article class="card">
      <h2>Unemployment is falling steadily</h2>
      <p>From 7.07% in August 2020 the rate has fallen every year since, to
      4.91% in August 2024 — and 4.76% by February 2025.</p>
      ${lineChart(EMPLOYMENT.unemploymentSeries)}
      ${sourceLine(EMPLOYMENT.unemploymentSource)}
    </article>
    <article class="card">
      <h2>Poverty is falling too</h2>
      <p>The poverty rate dropped from 9.7% in 2021 to 8.6% in 2024. In September
      2024, 24.06 million people lived below the poverty line — and by March
      2026 the rate had fallen further, to 8.07%.</p>
      ${barChart(EMPLOYMENT.povertySeries, { decimals: 1 })}
      ${sourceLine(EMPLOYMENT.povertySource)}
      <p class="source">Extreme poverty fell to 0.78% in September 2025, from 1.26% in March 2024 (BPS).</p>
    </article>
  </section>
  <section class="card">
    <h2>What work looks like</h2>
    <ul class="fact-list">
      <li><strong>${esc(EMPLOYMENT.fullTime.value)}</strong> — part-time work is 25.81% and underemployment 8.00% (BPS, February 2025)</li>
      <li><strong>59.40%</strong> of workers are informal, up slightly from 59.17% a year earlier</li>
      <li><strong>4.98%</strong> unemployment for men vs <strong>4.41%</strong> for women (February 2025)</li>
    </ul>
    ${sourceLine('BPS, National Labour Force Survey (Sakernas), February 2025')}
  </section>`;
}

export function renderEducation() {
  return `
  <section class="page-head">
    <p class="kicker">Learning</p>
    <h1>Education</h1>
    <p class="lede">Nearly every Indonesian child now goes to primary school, and almost half
    of young adults reach tertiary education. The gap is in finishing: only
    four in ten adults hold an upper-secondary certificate.</p>
  </section>
  <section class="grid stats">
    ${EDUCATION.map((e) => `
    <article class="card stat">
      <p class="stat-label">${esc(e.label)}</p>
      <p class="stat-value">${esc(e.value)}</p>
      <p class="stat-detail">${esc(e.note)}</p>
      <p class="stat-source">${esc(e.source)}</p>
    </article>`).join('')}
  </section>
  <section class="split">
    <article class="card">
      <h2>Schooling keeps lengthening</h2>
      <p>Expected years of schooling rose by 0.44% a year between 2020 and 2024,
      and mean years of schooling by 1.07% a year. Each cohort stays in school
      longer than the one before it.</p>
      <ul class="fact-list">
        <li><strong>96.3%</strong> of adults 15+ can read and write (2024)</li>
        <li><strong>100.4%</strong> gross primary enrolment (2025)</li>
        <li><strong>44.9%</strong> gross tertiary enrolment (2023)</li>
      </ul>
      ${sourceLine('BPS; World Bank; harmonised national surveys, 2023–2025')}
    </article>
    <article class="card">
      <h2>Where the gap is</h2>
      <p>Enrolment is near-universal at the bottom and rising at the top — but
      completion lags. Only 40.7% of adults 25 and over hold an upper
      secondary certificate, so the binding constraint is keeping teenagers
      in school, not getting children into it.</p>
      <p>Human capital is the long-run story: the World Bank estimates that
      differences in human capital explain up to two-thirds of the variation
      in GDP per person between countries.</p>
      ${sourceLine('Harmonised national surveys, 2024; World Bank')}
    </article>
  </section>`;
}

export function renderHealth() {
  return `
  <section class="page-head">
    <p class="kicker">Wellbeing</p>
    <h1>Health</h1>
    <p class="lede">Indonesians live 71.3 years on average — up from about 67 in 2000.
    Child survival has improved sharply; stunting and maternal deaths are the
    stubborn problems.</p>
  </section>
  <section class="grid stats">
    ${HEALTH.map((h) => `
    <article class="card stat">
      <p class="stat-label">${esc(h.label)}</p>
      <p class="stat-value">${esc(h.value)}</p>
      <p class="stat-detail">${esc(h.note)}</p>
      <p class="stat-source">${esc(h.source)}</p>
    </article>`).join('')}
  </section>
  <section class="split">
    <article class="card">
      <h2>Children are surviving — and less stunted</h2>
      <p>Under-five mortality is 17.7 per 1,000 live births (2024), and 1.8% of
      children die before age 15. Stunting fell from 37.2% in 2013 to 22% in
      2023, and the national survey put it at 19.8% in 2024 — still one child
      in five.</p>
      <ul class="fact-list">
        <li><strong>90.0%</strong> of births now take place in a health facility (2023), up from 66.8% in 2013</li>
        <li><strong>75.5%</strong> of people report health insurance cover (March 2024), up from 50.6% in 2015</li>
        <li><strong>31%</strong> of adults use tobacco (2024) and <strong>40%</strong> are overweight or obese</li>
      </ul>
      ${sourceLine('World Bank; Ministry of Health surveys; Susenas, 2023–2024')}
    </article>
    <article class="card">
      <h2>Health spending is low — and rising slowly</h2>
      <p>Indonesia spends 2.7% of GDP on health, about US$132 per person (2023)
      — well below the regional average. The human development index reached
      75.02 in 2024, up 0.63 points on 2023, but the gap between the best and
      worst provinces is wide: Yogyakarta scores 0.705 on the human capital
      index, Highland Papua 0.366.</p>
      ${sourceLine('World Bank, 2023; BPS, 2024; Bappenas / World Bank, 2025')}
    </article>
  </section>`;
}

export function renderProvinceRows(rows, compact = false) {
  return `<div class="table-wrap"><table class="data-table">
    <thead><tr><th>Province</th><th>Capital</th><th class="num">Population (m)</th><th class="num">Density /km²</th>${compact ? '' : '<th></th>'}</tr></thead>
    <tbody id="prov-body">
      ${rows.map((p) => `<tr data-name="${esc(p.name.toLowerCase())}">
        <td><strong>${esc(p.name)}</strong></td><td>${esc(p.capital)}</td>
        <td class="num">${p.pop.toFixed(1)}</td><td class="num">${p.density.toLocaleString('en-US')}</td>
        ${compact ? '' : `<td><a class="inline-link" href="#/province/${encodeURIComponent(p.name)}">Details →</a></td>`}
      </tr>`).join('')}
    </tbody>
  </table></div>`;
}

export function renderProvinces() {
  return `
  <section class="page-head">
    <p class="kicker">Places</p>
    <h1>Provinces</h1>
    <p class="lede">Indonesia has 38 provinces across more than 17,000 islands. Search the
    table, sort it, or open a province for its detail page.</p>
  </section>
  <section class="card">
    <div class="controls">
      <label class="search-label" for="prov-search">Search provinces
        <input id="prov-search" type="search" placeholder="Type a province name…" autocomplete="off">
      </label>
      <div class="sort-group" role="group" aria-label="Sort provinces">
        <button class="btn small sort-btn" data-sort="pop" type="button">Largest first</button>
        <button class="btn small sort-btn" data-sort="name" type="button">A–Z</button>
        <button class="btn small sort-btn" data-sort="density" type="button">Densest first</button>
      </div>
    </div>
    <p id="prov-count" class="muted" aria-live="polite"></p>
    ${renderProvinceRows([...PROVINCES].sort((a, b) => b.pop - a.pop))}
    ${sourceLine(PROVINCE_SOURCE)}
    <p class="muted">Showing 20 of 38 provinces in this table; the figures are rounded mid-year estimates.</p>
  </section>`;
}

export function renderProvinceDetail(name) {
  const p = PROVINCES.find((x) => x.name === name);
  if (!p) return `<section class="page-head"><h1>Province not found</h1><p class="lede">No province named “${esc(name)}” is in the table. <a class="inline-link" href="#/provinces">Back to all provinces →</a></p></section>`;
  const rank = [...PROVINCES].sort((a, b) => b.pop - a.pop).findIndex((x) => x.name === name) + 1;
  const share = ((p.pop / 283.5) * 100).toFixed(1);
  const biggest = PROVINCES.reduce((a, b) => (b.pop > a.pop ? b : a));
  return `
  <section class="page-head">
    <p class="kicker">Province · Rank #${rank} of 20 listed</p>
    <h1>${esc(p.name)}</h1>
    <p class="lede">Capital: ${esc(p.capital)}. Home to about ${p.pop.toFixed(1)} million people — ${share}% of Indonesia.</p>
  </section>
  <section class="grid stats">
    <article class="card stat"><p class="stat-label">Population</p><p class="stat-value">${p.pop.toFixed(1)}m</p><p class="stat-detail">${share}% of Indonesia's 283.5 million</p><p class="stat-source">BPS, 2024</p></article>
    <article class="card stat"><p class="stat-label">Density</p><p class="stat-value">${p.density.toLocaleString('en-US')} /km²</p><p class="stat-detail">National average: 148.6 /km²</p><p class="stat-source">BPS, 2024</p></article>
    <article class="card stat"><p class="stat-label">Capital</p><p class="stat-value">${esc(p.capital)}</p><p class="stat-detail">Provincial seat of government</p><p class="stat-source">BPS, 2024</p></article>
  </section>
  <section class="card">
    <h2>Compared with the largest province</h2>
    <p>${esc(p.name)} has ${p.pop.toFixed(1)} million people; ${esc(biggest.name)} — the largest — has ${biggest.pop.toFixed(1)} million.</p>
    ${hbarChart(
      [{ label: p.name, value: p.pop, note: '' }, { label: biggest.name, value: biggest.pop, note: '' }],
      { unit: 'm', decimals: 1, maxValue: 55 },
    )}
    ${sourceLine(PROVINCE_SOURCE)}
    <p><a class="inline-link" href="#/compare">Compare ${esc(p.name)} with another province →</a></p>
    <p><a class="inline-link" href="#/provinces">← Back to all provinces</a></p>
  </section>`;
}

export function renderCompare(aName, bName) {
  const a = PROVINCES.find((x) => x.name === aName) ?? PROVINCES[0];
  const b = PROVINCES.find((x) => x.name === bName) ?? PROVINCES[1];
  const options = (selected) => PROVINCES.map((p) =>
    `<option value="${esc(p.name)}"${p.name === selected ? ' selected' : ''}>${esc(p.name)}</option>`).join('');
  const vsRows = (field, unit, decimals) => [
    { label: a.name, value: a[field], note: '' },
    { label: b.name, value: b[field], note: '' },
  ];
  return `
  <section class="page-head">
    <p class="kicker">Compare</p>
    <h1>Compare provinces</h1>
    <p class="lede">Pick any two provinces and see them side by side. Populations are
    2024 mid-year estimates from BPS.</p>
  </section>
  <section class="card">
    <div class="controls">
      <label class="search-label" for="cmp-a">First province
        <select id="cmp-a">${options(a.name)}</select>
      </label>
      <label class="search-label" for="cmp-b">Second province
        <select id="cmp-b">${options(b.name)}</select>
      </label>
    </div>
    <div id="cmp-result">
      <div class="grid stats">
        <article class="card stat"><p class="stat-label">${esc(a.name)} — population</p><p class="stat-value">${a.pop.toFixed(1)}m</p><p class="stat-detail">Density ${a.density.toLocaleString('en-US')} /km² · capital ${esc(a.capital)}</p><p class="stat-source">BPS, 2024</p></article>
        <article class="card stat"><p class="stat-label">${esc(b.name)} — population</p><p class="stat-value">${b.pop.toFixed(1)}m</p><p class="stat-detail">Density ${b.density.toLocaleString('en-US')} /km² · capital ${esc(b.capital)}</p><p class="stat-source">BPS, 2024</p></article>
      </div>
      <h2>Population</h2>
      ${hbarChart(vsRows('pop', 'm', 1), { unit: 'm', decimals: 1, maxValue: 55 })}
      <h2>Density (people per km²)</h2>
      ${hbarChart(vsRows('density', '', 0), { unit: '', decimals: 0, maxValue: 16000 })}
      <p class="verdict">${a.pop > b.pop
        ? `${esc(a.name)} is ${(a.pop / b.pop).toFixed(1)}× as populous as ${esc(b.name)}.`
        : a.pop < b.pop
          ? `${esc(b.name)} is ${(b.pop / a.pop).toFixed(1)}× as populous as ${esc(a.name)}.`
          : `${esc(a.name)} and ${esc(b.name)} have about the same population.`}
      ${a.density > b.density
        ? `${esc(a.name)} is also denser — ${a.density.toLocaleString('en-US')} people per km² against ${b.density.toLocaleString('en-US')}.`
        : `${esc(b.name)} is denser — ${b.density.toLocaleString('en-US')} people per km² against ${a.density.toLocaleString('en-US')}.`}</p>
    </div>
    ${sourceLine(PROVINCE_SOURCE)}
  </section>`;
}

export function renderSources() {
  return `
  <section class="page-head">
    <p class="kicker">About</p>
    <h1>Sources &amp; method</h1>
    <p class="lede">Every figure on NusaStat names its source and year where it appears.
    This page lists the producers behind the numbers, and how to read them.</p>
  </section>
  <section class="card">
    <h2>Where the numbers come from</h2>
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th>Producer</th><th>What it supplies</th><th>Reference</th></tr></thead>
      <tbody>
        ${SOURCES.map((s) => `<tr><td><strong>${esc(s.name)}</strong></td><td>${esc(s.what)}</td><td>${esc(s.urlText)}</td></tr>`).join('')}
      </tbody>
    </table></div>
  </section>
  <section class="split">
    <article class="card">
      <h2>How to read the figures</h2>
      <ul class="fact-list">
        <li><strong>Years matter.</strong> A figure dated 2023 and one dated 2024 are not the same vintage; the site shows the latest published value for each indicator.</li>
        <li><strong>Rounded, not exact.</strong> Province populations are rounded to the nearest 0.1 million; shares are rounded to one decimal place.</li>
        <li><strong>Two unemployment counts.</strong> BPS's open unemployment rate (4.76%, February 2025) and the World Bank's modelled rate (3.2%, 2025) measure different things; the site uses the BPS figure.</li>
        <li><strong>Surveys, not censuses.</strong> Stunting, literacy and insurance cover come from national surveys (Riskesdas, SKI, Susenas), so they carry sampling uncertainty.</li>
      </ul>
    </article>
    <article class="card">
      <h2>About NusaStat</h2>
      <p>NusaStat is an independent, original presentation of Indonesia's public
      statistics. It is not affiliated with BPS, the World Bank or any
      government body. Figures are reproduced from their published releases;
      the design, text and charts are original.</p>
      <p>Figures checked ${esc(META.updated)}. If a release has superseded a
      number shown here, the newer release is the one to cite.</p>
      <p><a class="inline-link" href="#/">← Back to the home page</a></p>
    </article>
  </section>`;
}

export function renderNotFound(route) {
  return `<section class="page-head">
    <p class="kicker">Not found</p>
    <h1>That page does not exist</h1>
    <p class="lede">There is no page at “${esc(route)}”. Try one of the sections below.</p>
    <p><a class="btn primary" href="#/">Back to the home page</a></p>
  </section>`;
}
