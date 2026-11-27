# NusaStat — Indonesia in Numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/danielhutapea36/best-national-statistics-site-entry/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/danielhutapea36/best-national-statistics-site-entry/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

NusaStat is a national statistics site for Indonesia: population, economy, jobs,
education and health in one place, every figure with its source and year.
Built for the make.fun bounty "Make the best national statistics site".

## What it does

- **Home** — headline indicators (population 283.5m, GDP $1.40tn, growth 5.03%,
  unemployment 4.76%, poverty 8.57%, life expectancy 71.3 years), GDP-growth and
  unemployment charts, the five most populous provinces, age structure, and the
  latest statistical releases.
- **Population** — total, growth, density, urban share, fertility, age structure,
  and the most populous provinces.
- **Economy** — GDP, GDP per person, PPP, FDI, growth and inflation charts
  (2020–2024), sector shares, trade.
- **Jobs & poverty** — unemployment trend, labour force, participation, informal
  work, and the falling poverty rate.
- **Education** — literacy, enrolment, attainment, years of schooling.
- **Health** — life expectancy, child and maternal mortality, stunting, insurance
  cover, health spending, HDI.
- **Provinces** — a searchable, sortable table of 20 provinces with population,
  density and capital; each province opens a detail page.
- **Compare** — pick any two provinces and see population and density side by
  side, with a plain-language verdict.
- **Sources & method** — every producer behind the numbers, and how to read them.

All figures are real published statistics, each labelled with its source and
reference year: World Bank World Development Indicators (2024), Statistics
Indonesia / BPS (2024–2025), the Ministry of Health's national surveys
(Riskesdas, SKI, Susenas), UNESCO and UNDP. Figures were checked
27 November 2026.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080. No build step, no network request: the site is
plain static files under `app/` (ES modules, one stylesheet, hand-drawn SVG
charts), and `main.ts` hands it in by copying `app/` and `screenshots/` to the
output directory and writing `dossier.json`.

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Layout

- `app/index.html` — page shell, header, navigation, footer
- `app/style.css` — the whole look: teal/amber/sand palette, responsive layout
- `app/data.js` — every figure, with source and year
- `app/charts.js` — small SVG chart builders (bar, horizontal bar, line, ring)
- `app/views.js` — one render function per page
- `app/main.js` — hash router, table search/sort, compare pickers
- `main.ts` — entrypoint: copies `app/` + `screenshots/` and writes `dossier.json`
- `screenshots/` — four real renders of the site in headless Chrome

## Decisions

- **One country, done properly.** Rather than thin coverage of many countries,
  the site covers Indonesia in depth, with sourced series (2020–2024) instead of
  single numbers where the trend is the story.
- **No framework, no library.** Hand-written SVG charts and vanilla modules keep
  the first load small and every line of source the site's own.
- **Sources on the page, not in a footnote.** Each figure carries its source and
  year where it appears, and the Sources page lists every producer.
- **Original design and text.** The name, palette, copy and charts are original;
  the site is not affiliated with BPS, the World Bank or any government body.

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
