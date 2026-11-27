// NusaStat data: national statistics for Indonesia.
// Every figure carries its source and reference year. Figures were taken
// from the World Bank World Development Indicators, Statistics Indonesia
// (BPS) releases, the Ministry of Health's national surveys (Riskesdas /
// SKI / Susenas) and UNESCO, as published in 2024-2026. Values are rounded
// for display; the notes below each figure name the exact source.

export const META = {
  country: 'Indonesia',
  updated: '27 November 2026',
  note: 'All figures are the latest published value at the time of writing. Each figure names its source and year on the page where it appears.',
};

// Headline indicators shown on the home page.
export const HEADLINES = [
  { id: 'population', label: 'Population', value: '283.5m', detail: '4th most populous country in the world', source: 'World Bank, 2024', year: 2024 },
  { id: 'gdp', label: 'GDP', value: '$1.40tn', detail: '16th largest economy in the world', source: 'World Bank, 2024', year: 2024 },
  { id: 'growth', label: 'GDP growth', value: '5.03%', detail: 'Real GDP growth, year on year', source: 'BPS, 2024', year: 2024 },
  { id: 'unemployment', label: 'Unemployment', value: '4.76%', detail: 'Open unemployment rate, lowest since 1997', source: 'BPS, February 2025', year: 2025 },
  { id: 'poverty', label: 'Poverty rate', value: '8.57%', detail: '24.06 million people below the poverty line', source: 'BPS, September 2024', year: 2024 },
  { id: 'life', label: 'Life expectancy', value: '71.3 yrs', detail: '73.3 years for women, 69.0 for men', source: 'World Bank, 2024', year: 2024 },
];

// Population: age structure and change (World Bank, 2024 unless noted).
export const POPULATION = {
  total: { value: '283.5 million', source: 'World Bank, World Development Indicators, 2024' },
  growth: { value: '0.81% a year', source: 'World Bank, 2024' },
  density: { value: '148.6 people per km²', source: 'World Bank, 2023' },
  urban: { value: '58.8% live in urban areas', source: 'World Bank, 2024' },
  fertility: { value: '2.1 children per woman', source: 'World Bank, 2023' },
  ageGroups: [
    { label: 'Ages 0–14', share: 24.6, note: '69.7 million children' },
    { label: 'Ages 15–64', share: 68.1, note: '193.1 million working-age people' },
    { label: 'Ages 65+', share: 7.3, note: '20.7 million older people' },
  ],
  ageSource: 'World Bank, World Development Indicators, 2024',
};

// Provinces: 2024 mid-year population estimates (BPS), rounded to 0.1m.
// Ranked by population. The full table on the Provinces page lists all 38.
export const PROVINCES = [
  { name: 'West Java', pop: 50.3, density: 1425, capital: 'Bandung' },
  { name: 'East Java', pop: 41.8, density: 871, capital: 'Surabaya' },
  { name: 'Central Java', pop: 37.9, density: 1155, capital: 'Semarang' },
  { name: 'North Sumatra', pop: 16.0, density: 219, capital: 'Medan' },
  { name: 'Banten', pop: 12.4, density: 1287, capital: 'Serang' },
  { name: 'Jakarta', pop: 10.6, density: 16000, capital: 'Jakarta' },
  { name: 'South Sulawesi', pop: 9.4, density: 201, capital: 'Makassar' },
  { name: 'Lampung', pop: 9.3, density: 269, capital: 'Bandar Lampung' },
  { name: 'South Sumatra', pop: 9.0, density: 98, capital: 'Palembang' },
  { name: 'Riau', pop: 7.0, density: 80, capital: 'Pekanbaru' },
  { name: 'West Sumatra', pop: 6.0, density: 143, capital: 'Padang' },
  { name: 'West Kalimantan', pop: 5.8, density: 39, capital: 'Pontianak' },
  { name: 'East Kalimantan', pop: 4.0, density: 31, capital: 'Samarinda' },
  { name: 'South Kalimantan', pop: 4.3, density: 111, capital: 'Banjarmasin' },
  { name: 'Aceh', pop: 5.6, density: 96, capital: 'Banda Aceh' },
  { name: 'Bali', pop: 4.4, density: 763, capital: 'Denpasar' },
  { name: 'Yogyakarta', pop: 3.8, density: 1217, capital: 'Yogyakarta' },
  { name: 'Jambi', pop: 3.7, density: 74, capital: 'Jambi' },
  { name: 'Central Sulawesi', pop: 3.1, density: 50, capital: 'Palu' },
  { name: 'Papua', pop: 1.1, density: 13, capital: 'Jayapura' },
];
export const PROVINCE_SOURCE = 'BPS (Statistics Indonesia), mid-year population estimates, 2024 — rounded to the nearest 0.1 million. Density is people per km².';

// Economy (BPS and World Bank, 2024 unless noted).
export const ECONOMY = {
  gdp: { value: '$1.40tn', source: 'World Bank, 2024' },
  gdpPerCapita: { value: '$4,925', source: 'World Bank, 2024' },
  gdpPpp: { value: '$4.67tn', source: 'World Bank, 2024' },
  exports: { value: '22.2% of GDP', source: 'World Bank, 2024' },
  imports: { value: '20.4% of GDP', source: 'World Bank, 2024' },
  fdi: { value: '$24.2 billion', source: 'World Bank, 2024' },
  growthSeries: [
    { year: 2020, value: -2.07 }, { year: 2021, value: 3.69 }, { year: 2022, value: 5.31 },
    { year: 2023, value: 5.05 }, { year: 2024, value: 5.03 },
  ],
  growthSource: 'BPS, real GDP growth year on year, 2020–2024',
  inflationSeries: [
    { year: 2020, value: 1.68 }, { year: 2021, value: 1.87 }, { year: 2022, value: 5.51 },
    { year: 2023, value: 2.61 }, { year: 2024, value: 1.57 },
  ],
  inflationSource: 'BPS, consumer price inflation, December year on year, 2020–2024',
  sectors: [
    { label: 'Manufacturing', share: 18.9, note: 'Largest single sector of GDP' },
    { label: 'Agriculture, forestry & fishing', share: 12.5, note: 'About 1 in 4 workers' },
    { label: 'Trade (wholesale & retail)', share: 13.0, note: 'Includes vehicle repair' },
    { label: 'Construction', share: 9.8, note: 'Driven by infrastructure' },
    { label: 'Mining & quarrying', share: 8.4, note: 'Coal, oil, gas and minerals' },
    { label: 'Other services & sectors', share: 37.4, note: 'Finance, transport, government and more' },
  ],
  sectorSource: 'BPS, share of GDP at current prices, 2024 (rounded)',
};

// Employment (BPS Sakernas and World Bank).
export const EMPLOYMENT = {
  unemployment: { value: '4.76%', source: 'BPS, open unemployment rate, February 2025' },
  labourForce: { value: '153.05 million', source: 'BPS, February 2025' },
  workingAge: { value: '216.79 million', source: 'BPS, February 2025' },
  lfpr: { value: '68.0%', source: 'World Bank, labour force participation, 2025' },
  informal: { value: '59.4%', source: 'BPS, share of workers in informal jobs, February 2025' },
  fullTime: { value: '66.2% work full time', source: 'BPS, February 2025' },
  unemploymentSeries: [
    { year: 2020, value: 7.07 }, { year: 2021, value: 6.49 }, { year: 2022, value: 5.86 },
    { year: 2023, value: 5.32 }, { year: 2024, value: 4.91 },
  ],
  unemploymentSource: 'BPS, open unemployment rate, August each year, 2020–2024',
  povertySeries: [
    { year: 2021, value: 9.7 }, { year: 2022, value: 9.6 }, { year: 2023, value: 9.4 }, { year: 2024, value: 8.6 },
  ],
  povertySource: 'BPS, poverty rate, 2021–2024 (September 2024: 8.57%)',
};

// Education (UNESCO / World Bank / national surveys).
export const EDUCATION = [
  { label: 'Adult literacy (15+)', value: '96.3%', source: 'Harmonised national surveys, 2024', note: 'Latin-script literacy, ages 15 and over' },
  { label: 'Primary enrolment (gross)', value: '100.4%', source: 'World Bank, 2025', note: 'Every child of primary age is enrolled, on paper' },
  { label: 'Tertiary enrolment (gross)', value: '44.9%', source: 'World Bank, 2023', note: 'Share of the tertiary-age population enrolled' },
  { label: 'Upper secondary certificate (25+)', value: '40.7%', source: 'Harmonised national surveys, 2024', note: 'Adults 25 and over holding the certificate' },
  { label: 'Expected years of schooling', value: '13.9 yrs', source: 'UNDP Human Development Report, 2023/24', note: 'Years a child entering school today can expect' },
  { label: 'Mean years of schooling', value: '9.0 yrs', source: 'BPS, 2024', note: 'Average years completed by adults 25 and over' },
];

// Health (World Bank / UN inter-agency estimates / Ministry of Health).
export const HEALTH = [
  { label: 'Life expectancy at birth', value: '71.3 years', source: 'World Bank, 2024', note: '73.3 years for women, 69.0 for men (2023)' },
  { label: 'Under-five mortality', value: '17.7', source: 'UN IGME via World Bank, 2024', note: 'Deaths per 1,000 live births' },
  { label: 'Infant mortality', value: '15.2', source: 'UN IGME via World Bank, 2024', note: 'Deaths per 1,000 live births' },
  { label: 'Maternal mortality', value: '140', source: 'World Bank, 2023', note: 'Deaths per 100,000 live births' },
  { label: 'Stunting (under 5)', value: '22%', source: 'World Bank, 2023', note: 'National survey (SSGI) 2024: 19.8%' },
  { label: 'Health spending', value: '2.7% of GDP', source: 'World Bank, 2023', note: 'About US$132 per person' },
  { label: 'Health insurance cover', value: '75.5%', source: 'Susenas (BPS), March 2024', note: 'People reporting a health insurance scheme' },
  { label: 'Births in a health facility', value: '90.0%', source: 'Ministry of Health surveys, 2023', note: 'Up from 66.8% in 2013' },
  { label: 'Human Development Index', value: '75.02', source: 'BPS, 2024', note: 'Up from 74.39 in 2023' },
];

// Latest releases: what a visitor checking for new numbers needs.
export const RELEASES = [
  { date: '5 Nov 2026', title: 'Economy grew 5.47% in Q3 2026', body: 'BPS reported year-on-year growth of 5.47% in the third quarter of 2026, up from 5.29% in Q2.', source: 'BPS, November 2026' },
  { date: 'Mar 2026', title: 'Poverty fell to 8.07%', body: 'BPS counted 22.93 million poor people in March 2026 — the lowest share in recent years.', source: 'BPS, 2026' },
  { date: 'Feb 2026', title: 'Unemployment eased to 4.68%', body: 'The open unemployment rate fell to 4.68% in February 2026 and has stayed below 5% since February 2024.', source: 'BPS, 2026' },
  { date: 'Oct 2026', title: 'Inflation 3.23% in October', body: 'Consumer prices rose 3.23% year on year in October 2026, inside Bank Indonesia’s 1.5–3.5% target range.', source: 'Bank Indonesia / BPS, 2026' },
];

// Sources page: the full list, in one place.
export const SOURCES = [
  { name: 'Statistics Indonesia (BPS)', what: 'Population estimates, GDP, inflation, unemployment, poverty, Human Development Index', urlText: 'bps.go.id' },
  { name: 'World Bank — World Development Indicators', what: 'Population, GDP and GDP per capita, trade, life expectancy, enrolment, health spending', urlText: 'data.worldbank.org' },
  { name: 'Bank Indonesia', what: 'Inflation target range, monetary statistics', urlText: 'bi.go.id' },
  { name: 'Ministry of Health — Riskesdas, SKI, Susenas, IDHS', what: 'Stunting, births in facilities, health insurance cover, contraceptive use', urlText: 'kemkes.go.id' },
  { name: 'UN Inter-Agency Group for Child Mortality Estimation', what: 'Under-five, infant and neonatal mortality', urlText: 'childmortality.org' },
  { name: 'UNESCO Institute for Statistics', what: 'Literacy and enrolment ratios', urlText: 'uis.unesco.org' },
  { name: 'UNDP Human Development Report', what: 'Expected years of schooling', urlText: 'hdr.undp.org' },
];
