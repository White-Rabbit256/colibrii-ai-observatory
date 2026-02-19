/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — DATA MODULE v13 DEFINITIVE MERGE
   All countries, indicators, governance, glossary (34), algorithms (7),
   legislation (7), checklist (11), sources (24+), APIs (10+)
   Merged from v9.5 + v12 — ZERO CONTENT LOSS
   ═══════════════════════════════════════════════════════════════ */

// ── THEME TOKENS (Light Iridescent — default) ──
export const TH = {
  bg: "#fafbfc", sf: "#f0f2f5", sf2: "#e8eaef", bd: "#e2e4ea", bd2: "#c8cad2",
  tx: "#1a1a2e", tx2: "#4a4a6a", tx3: "#8a8aaa",
  cy: "#0ea5e9", vi: "#8b5cf6", pk: "#ec4899", am: "#f59e0b",
  rd: "#ef4444", gn: "#10b981", or: "#f97316",
  cardBg: "#ffffff",
  cardShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
  cardShadowHover: "0 10px 30px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)",
  headerBg: "rgba(255,255,255,0.85)",
  grad1: "linear-gradient(135deg, #0ea5e9, #8b5cf6, #ec4899)",
  grad2: "linear-gradient(135deg, #8b5cf6, #ec4899, #f59e0b)"
};

// ── DARK THEME TOKENS ──
export const TH_DARK = {
  bg: "#050508", sf: "#0a0a0f", sf2: "#0f0f16", bd: "#151520", bd2: "#1e1e2d",
  tx: "#e8e4db", tx2: "#9a9aad", tx3: "#5a5a6e",
  cy: "#0ea5e9", vi: "#8b5cf6", pk: "#ec4899", am: "#f59e0b",
  rd: "#ef4444", gn: "#10b981", or: "#f97316",
  cardBg: "#0a0a0f",
  cardShadow: "0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)",
  cardShadowHover: "0 10px 30px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.2)",
  headerBg: "rgba(5,5,8,0.92)",
  grad1: "linear-gradient(135deg, #0ea5e9, #8b5cf6, #ec4899)",
  grad2: "linear-gradient(135deg, #8b5cf6, #ec4899, #f59e0b)"
};

// ── 20 PEER COUNTRIES ──
export const CO = {
  SGP: { n: "Singapur", e: "Singapore", f: "🇸🇬", r: "asia", w: "#1 AI readiness global", pop: "5.9M", gdp: "$397B", cont: "Asia" },
  KOR: { n: "Corea del Sur", e: "South Korea", f: "🇰🇷", r: "asia", w: "AI Framework Act 2026", pop: "51.7M", gdp: "$1.67T", cont: "Asia" },
  JPN: { n: "Japón", e: "Japan", f: "🇯🇵", r: "asia", w: "AI overperformer, robótica líder", pop: "125M", gdp: "$4.23T", cont: "Asia" },
  EST: { n: "Estonia", e: "Estonia", f: "🇪🇪", r: "eu", w: "Gobierno digital #1 mundo", pop: "1.3M", gdp: "$38B", cont: "Europe" },
  FIN: { n: "Finlandia", e: "Finland", f: "🇫🇮", r: "eu", w: "1% población educada en AI", pop: "5.5M", gdp: "$282B", cont: "Europe" },
  IRL: { n: "Irlanda", e: "Ireland", f: "🇮🇪", r: "eu", w: "Hub tech europeo, modelo FDI", pop: "5.1M", gdp: "$529B", cont: "Europe" },
  CHL: { n: "Chile", e: "Chile", f: "🇨🇱", r: "latam", w: "Líder AI Latam, ley en trámite", pop: "19.5M", gdp: "$301B", cont: "LATAM" },
  URY: { n: "Uruguay", e: "Uruguay", f: "🇺🇾", r: "latam", w: "Plan Ceibal, alta digitalización", pop: "3.4M", gdp: "$71B", cont: "LATAM" },
  CRI: { n: "Costa Rica", e: "Costa Rica", f: "🇨🇷", r: "latam", w: "AI Overperformer (Banco Mundial)", pop: "5.2M", gdp: "$69B", cont: "LATAM" },
  PAN: { n: "Panamá", e: "Panama", f: "🇵🇦", r: "latam", w: "Hub logístico, dolarizado", pop: "4.4M", gdp: "$77B", cont: "LATAM" },
  BRA: { n: "Brasil", e: "Brazil", f: "🇧🇷", r: "latam", w: "Mayor economía Latam, PL 2338", pop: "216M", gdp: "$1.92T", cont: "LATAM" },
  COL: { n: "Colombia", e: "Colombia", f: "🇨🇴", r: "latam", w: "Competidor nearshoring directo", pop: "52M", gdp: "$343B", cont: "LATAM" },
  MEX: { n: "México", e: "Mexico", f: "🇲🇽", r: "latam", w: "Líder nearshoring, 130M mercado", pop: "130M", gdp: "$1.32T", cont: "LATAM" },
  ARG: { n: "Argentina", e: "Argentina", f: "🇦🇷", r: "latam", w: "Talento tech, startups AI", pop: "46M", gdp: "$641B", cont: "LATAM" },
  PER: { n: "Perú", e: "Peru", f: "🇵🇪", r: "latam", w: "Economía emergente", pop: "34M", gdp: "$242B", cont: "LATAM" },
  DOM: { n: "Rep. Dominicana", e: "Dominican Rep.", f: "🇩🇴", r: "latam", w: "Competidor FDI directo", pop: "11M", gdp: "$114B", cont: "LATAM" },
  VNM: { n: "Vietnam", e: "Vietnam", f: "🇻🇳", r: "asia", w: "Manufactura, costos 30-50% menor", pop: "100M", gdp: "$409B", cont: "Asia" },
  PHL: { n: "Filipinas", e: "Philippines", f: "🇵🇭", r: "asia", w: "$38B IT-BPM, 1.82M BPO", pop: "115M", gdp: "$404B", cont: "Asia" },
  MYS: { n: "Malasia", e: "Malaysia", f: "🇲🇾", r: "asia", w: "AI overperformer, semiconductores", pop: "33M", gdp: "$399B", cont: "Asia" },
  IDN: { n: "Indonesia", e: "Indonesia", f: "🇮🇩", r: "asia", w: "AI overperformer, 270M mercado", pop: "277M", gdp: "$1.32T", cont: "Asia" }
};
export const CC = Object.keys(CO);

// ── 11 WORLD BANK INDICATORS ──
export const IND_MAP = {
  "IT.NET.USER.ZS": { d: "D1", l: "Usuarios Internet (%)", e: "Internet users (%)", inv: false },
  "IT.NET.BBND.P2": { d: "D1", l: "Banda ancha fija/100", e: "Fixed broadband/100", inv: false },
  "SE.TER.ENRR": { d: "D2", l: "Matrícula terciaria (%)", e: "Tertiary enrollment (%)", inv: false },
  "SE.XPD.TOTL.GD.ZS": { d: "D2", l: "Gasto educación (%PIB)", e: "Education spending (%GDP)", inv: false },
  "SL.UEM.TOTL.ZS": { d: "D2", l: "Desempleo (%)", e: "Unemployment (%)", inv: true },
  "GB.XPD.RSDV.GD.ZS": { d: "D3", l: "Gasto I+D (%PIB)", e: "R&D spending (%GDP)", inv: false },
  "TX.VAL.TECH.MF.ZS": { d: "D3", l: "Export hi-tech (%manuf)", e: "Hi-tech exports (%manuf)", inv: false },
  "BX.KLT.DINV.WD.GD.ZS": { d: "D3", l: "IED (%PIB)", e: "FDI (%GDP)", inv: false },
  "EG.ELC.ACCS.ZS": { d: "D5", l: "Acceso electricidad (%)", e: "Electricity access (%)", inv: false },
  "EG.ELC.RNWX.ZS": { d: "D5", l: "Electricidad renovable (%)", e: "Renewable electricity (%)", inv: false },
  "EG.USE.ELEC.KH.PC": { d: "D5", l: "Consumo eléctrico kWh/cap", e: "Electric consumption kWh/cap", inv: false }
};

// ── CURATED DIMENSION SCORES (D4: Regulation, D6: Security) ──
export const CUR = {
  SGP: { D4: .85, D6: .88 }, KOR: { D4: .75, D6: .80 }, JPN: { D4: .68, D6: .82 },
  EST: { D4: .72, D6: .78 }, FIN: { D4: .70, D6: .82 }, IRL: { D4: .68, D6: .72 },
  CHL: { D4: .58, D6: .52 }, URY: { D4: .45, D6: .44 }, CRI: { D4: .38, D6: .40 },
  PAN: { D4: .30, D6: .35 }, BRA: { D4: .48, D6: .45 }, COL: { D4: .35, D6: .38 },
  MEX: { D4: .42, D6: .42 }, ARG: { D4: .33, D6: .36 }, PER: { D4: .28, D6: .32 },
  DOM: { D4: .25, D6: .30 }, VNM: { D4: .40, D6: .45 }, PHL: { D4: .32, D6: .35 },
  MYS: { D4: .55, D6: .58 }, IDN: { D4: .42, D6: .40 }
};

// ── GOVERNANCE DATA (CPI, Freedom House, GPI, Oxford AI, HDI, V-Dem) ──
export const GOV = {
  SGP: { cpi: 83, fh: 47, gpi: 1.33, oxai: 8.11, hdi: 0.949, vdem: 0.35 },
  KOR: { cpi: 63, fh: 83, gpi: 1.76, oxai: 7.66, hdi: 0.929, vdem: 0.82 },
  JPN: { cpi: 73, fh: 96, gpi: 1.34, oxai: 7.91, hdi: 0.920, vdem: 0.85 },
  EST: { cpi: 76, fh: 94, gpi: 1.60, oxai: 7.55, hdi: 0.899, vdem: 0.87 },
  FIN: { cpi: 87, fh: 100, gpi: 1.27, oxai: 7.42, hdi: 0.942, vdem: 0.93 },
  IRL: { cpi: 77, fh: 97, gpi: 1.31, oxai: 7.13, hdi: 0.950, vdem: 0.90 },
  CHL: { cpi: 67, fh: 93, gpi: 1.83, oxai: 6.38, hdi: 0.860, vdem: 0.80 },
  URY: { cpi: 73, fh: 97, gpi: 1.68, oxai: 5.64, hdi: 0.830, vdem: 0.89 },
  CRI: { cpi: 55, fh: 91, gpi: 1.44, oxai: 5.88, hdi: 0.806, vdem: 0.88 },
  PAN: { cpi: 36, fh: 84, gpi: 1.86, oxai: 4.79, hdi: 0.820, vdem: 0.72 },
  BRA: { cpi: 36, fh: 72, gpi: 2.38, oxai: 5.76, hdi: 0.760, vdem: 0.66 },
  COL: { cpi: 40, fh: 55, gpi: 2.73, oxai: 5.22, hdi: 0.752, vdem: 0.56 },
  MEX: { cpi: 31, fh: 50, gpi: 2.60, oxai: 5.46, hdi: 0.781, vdem: 0.42 },
  ARG: { cpi: 38, fh: 85, gpi: 1.74, oxai: 5.12, hdi: 0.842, vdem: 0.73 },
  PER: { cpi: 33, fh: 71, gpi: 2.12, oxai: 4.68, hdi: 0.762, vdem: 0.58 },
  DOM: { cpi: 30, fh: 66, gpi: 2.07, oxai: 4.33, hdi: 0.767, vdem: 0.52 },
  VNM: { cpi: 42, fh: 19, gpi: 1.83, oxai: 5.01, hdi: 0.726, vdem: 0.22 },
  PHL: { cpi: 34, fh: 56, gpi: 2.38, oxai: 4.56, hdi: 0.710, vdem: 0.48 },
  MYS: { cpi: 50, fh: 51, gpi: 1.63, oxai: 5.95, hdi: 0.807, vdem: 0.38 },
  IDN: { cpi: 34, fh: 57, gpi: 1.85, oxai: 5.34, hdi: 0.713, vdem: 0.45 }
};

// ── 6 DIMENSIONS ──
export const DM = {
  D1: { l: "Infraestructura Digital", e: "Digital Infrastructure", w: .20, co: TH.cy, ic: "◈" },
  D2: { l: "Capital Humano", e: "Human Capital", w: .20, co: TH.vi, ic: "◎" },
  D3: { l: "Innovación", e: "Innovation", w: .15, co: TH.am, ic: "◇" },
  D4: { l: "Regulación AI", e: "AI Regulation", w: .15, co: TH.rd, ic: "⬡" },
  D5: { l: "Energía Sostenible", e: "Sustainable Energy", w: .15, co: TH.gn, ic: "⚡" },
  D6: { l: "Seguridad Digital", e: "Digital Security", w: .15, co: TH.pk, ic: "⬢" }
};

// ── TABS WITH ICONS (14 tabs total) ──
export const TABS = [
  { id: "home", l: "Inicio", le: "Home", ic: "🏠", c: TH.cy },
  { id: "idx", l: "Índice", le: "Index", ic: "📊", c: TH.vi },
  { id: "cmp", l: "Comparar", le: "Compare", ic: "⚖️", c: TH.pk },
  { id: "countries", l: "Países", le: "Countries", ic: "🌍", c: TH.gn },
  { id: "sim", l: "Simulador", le: "Simulator", ic: "🎯", c: TH.am },
  { id: "zf", l: "Zonas Francas", le: "Free Zones", ic: "🏭", c: TH.am },
  { id: "pai", l: "Physical AI", le: "Physical AI", ic: "🤖", c: TH.pk },
  { id: "algo", l: "Algoritmos", le: "Algorithms", ic: "🧮", c: TH.vi },
  { id: "sec", l: "Seguridad", le: "Security", ic: "🛡", c: TH.rd },
  { id: "leg", l: "Legislación", le: "Legislation", ic: "⚖️", c: TH.or },
  { id: "edu", l: "Educación", le: "Education", ic: "🎓", c: TH.gn },
  { id: "glos", l: "Glosario", le: "Glossary", ic: "📖", c: TH.cy },
  { id: "about", l: "Info", le: "About", ic: "ℹ️", c: TH.vi }
];

// ── PARTNERS / DATA SOURCES ──
export const PARTNERS = ["World Bank", "OECD", "WEF", "UNESCO", "GDELT", "PROCOMER", "CINDE", "IMF", "ILO", "Oxford Insights", "Stanford HAI", "Transparency Int'l", "Freedom House", "IEP", "OWASP", "Goldman Sachs", "IFR", "UNDP", "FAO", "WHO", "UNCTAD", "IDB", "Deloitte", "McKinsey", "Bank of America"];

// ── WEF GLOBAL RISKS 2026 ──
export const WEF_2026_RISKS = {
  // 2026 immediate: "most likely to present a material crisis on a global scale in 2026" (GRPS Figure 11)
  immediate: [
    { risk: "Geoeconomic confrontation", pct: 18, cat: "geo", c: "#ef4444" },
    { risk: "Armed conflict", pct: 14, cat: "geo", c: "#ef4444" },
    { risk: "Extreme weather", pct: 8, cat: "env", c: "#10b981" },
    { risk: "Social polarization", pct: 7, cat: "social", c: "#f59e0b" },
    { risk: "Misinformation & disinformation", pct: 7, cat: "tech", c: "#8b5cf6" },
    { risk: "Economic downturn", pct: 5, cat: "econ", c: "#f97316" },
    { risk: "Human rights erosion", pct: 4, cat: "social", c: "#f59e0b" },
    { risk: "AI adverse outcomes", pct: 4, cat: "tech", c: "#8b5cf6" },
    { risk: "Cyber insecurity", pct: 3, cat: "tech", c: "#8b5cf6" },
    { risk: "Inequality", pct: 3, cat: "social", c: "#f59e0b" }
  ],
  // 2028 short-term severity ranking (GRPS Figure 12)
  shortTerm2028: [
    { risk: "Geoeconomic confrontation", rank: 1, cat: "geo", c: "#ef4444", delta: "+8" },
    { risk: "Misinformation & disinformation", rank: 2, cat: "tech", c: "#8b5cf6", delta: "—" },
    { risk: "Societal polarization", rank: 3, cat: "social", c: "#f59e0b", delta: "+1" },
    { risk: "Extreme weather events", rank: 4, cat: "env", c: "#10b981", delta: "-2" },
    { risk: "State-based armed conflict", rank: 5, cat: "geo", c: "#ef4444", delta: "-4" },
    { risk: "Cyber insecurity", rank: 6, cat: "tech", c: "#8b5cf6", delta: "—" },
    { risk: "Inequality", rank: 7, cat: "social", c: "#f59e0b", delta: "—" },
    { risk: "Erosion of human rights", rank: 8, cat: "social", c: "#f59e0b", delta: "+2" },
    { risk: "Pollution", rank: 9, cat: "env", c: "#10b981", delta: "-3" },
    { risk: "Involuntary migration", rank: 10, cat: "social", c: "#f59e0b", delta: "—" }
  ],
  // 2036 long-term severity ranking (GRPS Figure 16)
  longTerm2036: [
    { risk: "Extreme weather events", rank: 1, cat: "env", c: "#10b981" },
    { risk: "Biodiversity loss & ecosystem collapse", rank: 2, cat: "env", c: "#10b981" },
    { risk: "Critical change to Earth systems", rank: 3, cat: "env", c: "#10b981" },
    { risk: "Misinformation & disinformation", rank: 4, cat: "tech", c: "#8b5cf6" },
    { risk: "AI adverse outcomes", rank: 5, cat: "tech", c: "#8b5cf6" },
    { risk: "Natural resource shortages", rank: 6, cat: "env", c: "#10b981" },
    { risk: "Inequality", rank: 7, cat: "social", c: "#f59e0b" },
    { risk: "Cyber insecurity", rank: 8, cat: "tech", c: "#8b5cf6" },
    { risk: "Societal polarization", rank: 9, cat: "social", c: "#f59e0b" },
    { risk: "Pollution", rank: 10, cat: "env", c: "#10b981" }
  ],
  keyFindings: {
    aiJump: "#30→#5",
    outlook: "50%",
    outlook10yr: "57%",
    misinfoAllHorizons: true,
    cyberImmediate: 9,
    cyberShortTerm: 6,
    aiMarket2024: 280,        // $B
    aiMarket2033: 3500,       // $B — Grand View Research via WEF Figure 52
    companiesTransform: 86,   // % companies expect AI to transform by 2030
    jobsCreated: 170,         // millions — WEF FoJ 2025
    jobsDisplaced: 92,        // millions
    jobsNet: 78,              // millions net positive
    entryLevelRisk: 50,       // % entry-level white-collar jobs at risk (US, 5yr)
    aiAdoptionNA: 27,         // % working-age population North America
    aiAdoptionSSA: 9,         // % Sub-Saharan Africa
    aiEnergy: 4600,           // x more energy than traditional software
    quantumBreak: 53,         // % experts believe 50%+ chance RSA-2048 broken in decade
    quantumSafeOrgs: 5,       // % of organizations with quantum-safe encryption
    respondents: 1300,        // GRPS experts
    eosRespondents: 11000,    // EOS business leaders
    economies: 121,           // report cover says 121, EOS specifically covers 116
    eosEconomies: 116,        // EOS-specific count
    // ── OCR-extracted chart data ──
    outlookShortTerm: { calm: 1, stable: 9, unsettled: 40, turbulent: 42, stormy: 8 },
    outlookLongTerm:  { calm: 1, stable: 10, unsettled: 32, turbulent: 38, stormy: 19 },
    politicalOutlook: { multipolar: 68, bipolar: 14, newSuperpower: 12, usLed: 6 },
    severityScores: {
      geoeconomic:  { tenYr: 4.57 },              // rank drops #1→#19 — only risk expected to IMPROVE
      polarization: { twoYr: 4.65, tenYr: 5.12 },
      aiAdverse:    { twoYr: 3.50, tenYr: 5.28 }, // LARGEST severity gap of any risk
      econDownturn: { twoYr: 4.09, tenYr: 4.31 },
      frontierTech: { tenYr: 4.30 }
    },
    misinfo: { newsAvoidance: 40, trustInNews: 40, concernMisinfo: 58, usSocialMediaNews: 34, ukDeepfakeConcern: 87 },
    debt: { globalDebtT: 251, debtToGDP: 235, aiSpending2025T: 1.5, dataCenterBoomT: 5 },
    conflicts: 61, conflictCountries: 36,
    financeAI2030: 97, itAI2030: 99
  }
};

// ── WEF 2026 EXECUTIVE OPINION SURVEY — COUNTRY RISKS (OCR Figure data) ──
// Top 5 risks as identified by 11,000+ business leaders across 116 economies
// Only countries in our 20-country peer set (CO) included
export const EOS_RISKS = {
  CRI: { partner: "INCAE Business School", risks: [
    { risk: "Crime and illicit economic activity", cat: "social" },
    { risk: "Insufficient public services and social protections", cat: "social" },
    { risk: "Societal polarization", cat: "social" },
    { risk: "Lack of economic opportunity or unemployment", cat: "econ" },
    { risk: "Debt (public, corporate, household)", cat: "econ" }
  ]},
  CHL: { partner: null, risks: [
    { risk: "Crime and illicit economic activity", cat: "social" },
    { risk: "Insufficient public services", cat: "social" },
    { risk: "Societal polarization", cat: "social" },
    { risk: "Lack of economic opportunity", cat: "econ" },
    { risk: "Economic downturn", cat: "econ" }
  ]},
  COL: { partner: null, risks: [
    { risk: "Decline in health and well-being", cat: "social" },
    { risk: "Lack of economic opportunity", cat: "econ" },
    { risk: "Crime and illicit economic activity", cat: "social" },
    { risk: "Societal polarization", cat: "social" },
    { risk: "Economic downturn", cat: "econ" }
  ]},
  MEX: { partner: null, risks: [
    { risk: "Crime and illicit economic activity", cat: "social" },
    { risk: "Insufficient public services", cat: "social" },
    { risk: "Economic downturn", cat: "econ" },
    { risk: "Societal polarization", cat: "social" },
    { risk: "Decline in health and well-being", cat: "social" }
  ]},
  PER: { partner: null, risks: [
    { risk: "Crime and illicit economic activity", cat: "social" },
    { risk: "Insufficient public services", cat: "social" },
    { risk: "Societal polarization", cat: "social" },
    { risk: "Intrastate violence", cat: "geo" },
    { risk: "Lack of economic opportunity", cat: "econ" }
  ]},
  PAN: { partner: "INCAE Business School", risks: [
    { risk: "Insufficient public services", cat: "social" },
    { risk: "Lack of economic opportunity", cat: "econ" },
    { risk: "Debt (public, corporate, household)", cat: "econ" },
    { risk: "Inequality", cat: "social" },
    { risk: "Talent/labour shortages", cat: "econ" }
  ]},
  DOM: { partner: "INCAE Business School", risks: [
    { risk: "Insufficient public services", cat: "social" },
    { risk: "Extreme weather events", cat: "env" },
    { risk: "Debt (public, corporate, household)", cat: "econ" },
    { risk: "Economic downturn", cat: "econ" },
    { risk: "Lack of economic opportunity", cat: "econ" }
  ]},
  ARG: { partner: null, risks: [
    { risk: "Insufficient public services", cat: "social" },
    { risk: "Lack of economic opportunity", cat: "econ" },
    { risk: "Economic downturn", cat: "econ" },
    { risk: "Inequality", cat: "social" },
    { risk: "Societal polarization", cat: "social" }
  ]},
  BRA: { partner: null, risks: [
    { risk: "Economic downturn", cat: "econ" },
    { risk: "Insufficient public services", cat: "social" },
    { risk: "Debt (public, corporate, household)", cat: "econ" },
    { risk: "Crime and illicit economic activity", cat: "social" },
    { risk: "Inflation", cat: "econ" }
  ]},
  URY: { partner: null, risks: [
    { risk: "Economic downturn", cat: "econ" },
    { risk: "Lack of economic opportunity", cat: "econ" },
    { risk: "Talent/labour shortages", cat: "econ" },
    { risk: "Insufficient public services", cat: "social" },
    { risk: "Societal polarization", cat: "social" }
  ]},
  VNM: { partner: null, risks: [
    { risk: "Adverse outcomes of AI technologies", cat: "tech" },
    { risk: "Supply chain disruptions", cat: "econ" },
    { risk: "Decline in health and well-being", cat: "social" },
    { risk: "Lack of economic opportunity", cat: "econ" },
    { risk: "Economic downturn", cat: "econ" }
  ]},
  // ── CO PEER SET: ASIA-PACIFIC ──
  SGP: { partner: null, risks: [
    { risk: "Economic downturn", cat: "econ" },
    { risk: "Geoeconomic confrontation", cat: "geo" },
    { risk: "Talent/labour shortages", cat: "econ" },
    { risk: "Supply chain disruptions", cat: "econ" },
    { risk: "Inflation", cat: "econ" }
  ]},
  KOR: { partner: null, risks: [
    { risk: "Economic downturn", cat: "econ" },
    { risk: "Societal polarization", cat: "social" },
    { risk: "Inequality (wealth, income)", cat: "social" },
    { risk: "Extreme weather events", cat: "env" },
    { risk: "Adverse outcomes of AI technologies", cat: "tech" }
  ]},
  JPN: { partner: null, risks: [
    { risk: "Talent/labour shortages", cat: "econ" },
    { risk: "Extreme weather events", cat: "env" },
    { risk: "Non-weather natural disasters", cat: "env" },
    { risk: "Geoeconomic confrontation", cat: "geo" },
    { risk: "Economic downturn", cat: "econ" }
  ]},
  PHL: { partner: null, risks: [
    { risk: "Lack of economic opportunity or unemployment", cat: "econ" },
    { risk: "Insufficient public services", cat: "social" },
    { risk: "Misinformation and disinformation", cat: "tech" },
    { risk: "Adverse outcomes of AI technologies", cat: "tech" },
    { risk: "Inflation", cat: "econ" }
  ]},
  MYS: { partner: null, risks: [
    { risk: "Geoeconomic confrontation", cat: "geo" },
    { risk: "Talent/labour shortages", cat: "econ" },
    { risk: "Supply chain disruptions", cat: "econ" },
    { risk: "Adverse outcomes of AI technologies", cat: "tech" },
    { risk: "Lack of economic opportunity", cat: "econ" }
  ]},
  IDN: { partner: null, risks: [
    { risk: "Lack of economic opportunity or unemployment", cat: "econ" },
    { risk: "Insufficient public services", cat: "social" },
    { risk: "Adverse outcomes of AI technologies", cat: "tech" },
    { risk: "Economic downturn", cat: "econ" },
    { risk: "Inflation", cat: "econ" }
  ]},
  // ── CO PEER SET: EUROPE ──
  EST: { partner: null, risks: [
    { risk: "Economic downturn", cat: "econ" },
    { risk: "State-based armed conflict", cat: "geo" },
    { risk: "Geoeconomic confrontation", cat: "geo" },
    { risk: "Inflation", cat: "econ" },
    { risk: "Talent/labour shortages", cat: "econ" }
  ]},
  FIN: { partner: null, risks: [
    { risk: "Economic downturn", cat: "econ" },
    { risk: "Debt (public, corporate, household)", cat: "econ" },
    { risk: "Geoeconomic confrontation", cat: "geo" },
    { risk: "Lack of economic opportunity or unemployment", cat: "econ" },
    { risk: "Misinformation and disinformation", cat: "tech" }
  ]},
  IRL: { partner: null, risks: [
    { risk: "Economic downturn", cat: "econ" },
    { risk: "Insufficient public services", cat: "social" },
    { risk: "Geoeconomic confrontation", cat: "geo" },
    { risk: "Talent/labour shortages", cat: "econ" },
    { risk: "Inequality (wealth, income)", cat: "social" }
  ]},
  // ── GLOBAL BENCHMARKS (not in CO peer set, used for comparison) ──
  USA: { partner: null, benchmark: true, risks: [
    { risk: "Economic downturn", cat: "econ" },
    { risk: "Decline in health and well-being", cat: "social" },
    { risk: "Misinformation and disinformation", cat: "tech" },
    { risk: "Adverse outcomes of AI technologies", cat: "tech" },
    { risk: "Supply chain disruptions", cat: "econ" }
  ]},
  GBR: { partner: null, benchmark: true, risks: [
    { risk: "Economic downturn", cat: "econ" },
    { risk: "Insufficient public services", cat: "social" },
    { risk: "Misinformation and disinformation", cat: "tech" },
    { risk: "Talent/labour shortages", cat: "econ" },
    { risk: "Lack of economic opportunity", cat: "econ" }
  ]}
};

// ── WEF 2026 KEY REPORTS / DOWNLOADABLE RESOURCES ──
export const WEF_RESOURCES = (en) => [
  { title: "WEF Global Risks Report 2026", org: "World Economic Forum", year: 2026, url: "https://www.weforum.org/publications/global-risks-report-2026/", cat: "risk" },
  { title: "WEF Future of Jobs Report 2025", org: "World Economic Forum", year: 2025, url: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/", cat: "labor" },
  { title: "IMF AI Preparedness Index", org: en ? "International Monetary Fund" : "Fondo Monetario Internacional", year: 2024, url: "https://www.imf.org/en/Blogs/Articles/2024/01/14/ai-will-transform-the-global-economy-lets-make-sure-it-benefits-humanity", cat: "index" },
  { title: "Oxford AI Readiness Index", org: "Oxford Insights", year: 2024, url: "https://oxfordinsights.com/ai-readiness/ai-readiness-index/", cat: "index" },
  { title: "OWASP Top 10 for LLM Applications", org: "OWASP Foundation", year: 2025, url: "https://genai.owasp.org/llm-top-10/", cat: "security" },
  { title: en ? "Beyond the AI Divide" : "Más allá de la Brecha AI", org: en ? "World Bank" : "Banco Mundial", year: 2025, url: "https://www.worldbank.org/en/topic/digitaldevelopment/publication/digital-progress-and-trends-report", cat: "development" },
  { title: "Stanford HAI AI Index 2025", org: "Stanford University", year: 2025, url: "https://aiindex.stanford.edu/report/", cat: "index" },
  { title: "WEF Global Cybersecurity Outlook 2026", org: "World Economic Forum", year: 2026, url: "https://www.weforum.org/publications/global-cybersecurity-outlook-2026/", cat: "security" }
];

// ── 10 PROPRIETARY ALGORITHMS (5 from v12 + 2 v13 + 3 WEF-inspired) ──
export const ALGOS = (en) => [
  { nm: "CAPI-CR", full: en ? "Colibrii AI Preparedness Index" : "Índice de Preparación AI Colibrii", c: TH.cy, st: en ? "● ACTIVE" : "● ACTIVO", desc: en ? "Extends IMF AIPI from 4→6 dimensions (adding Energy + Security). 20 countries, 11 World Bank live indicators + 2 curated. Most critical UMIC pillar: digital infrastructure (28.8% of variance, World Bank)." : "Extiende AIPI del FMI de 4→6 dimensiones (+Energía +Seguridad). 20 países, 11 indicadores BM en vivo + 2 curados. Pilar más crítico PIMA: infraestructura digital (28.8% varianza, BM).", f: "CAPI = Σ(wᵢ × Dᵢ), i=1..6", w: "D1:20% D2:20% D3:15% D4:15% D5:15% D6:15%", sr: "World Bank API, IMF AIPI, Oxford Insights, OWASP, ITU" },
  { nm: "IVAS", full: en ? "AI Sector Vulnerability Index" : "Índice de Vulnerabilidad AI por Sector", c: TH.rd, st: en ? "◐ DEV" : "◐ DESARROLLO", desc: en ? "Maps CR free zone sectors against automation risk. Task decomposition (WEF) × AI adoption speed × regulatory readiness × labor cost ratio. 0-100 score per sector. No existing index at this country-sector intersection." : "Mapea sectores ZF contra riesgo de automatización. Descomposición tareas (WEF) × velocidad adopción AI × preparación regulatoria × ratio costo laboral. Score 0-100 por sector.", f: "IVAS = 0.4×TaskAuto + 0.3×AdoptSpeed + 0.2×(1-RegReady) + 0.1×LaborCostRatio", w: en ? "Auto:40% Speed:30% Reg:20% Cost:10%" : "Auto:40% Vel:30% Reg:20% Costo:10%", sr: "PROCOMER, WEF Future of Jobs 2025, IMF, IFR, BCCR", pv: [{ s: en ? "Call centers" : "Call centers", v: 85, c: TH.rd }, { s: en ? "Digital services" : "Servicios digitales", v: 78, c: TH.rd }, { s: en ? "Electronics" : "Electrónica", v: 62, c: TH.or }, { s: en ? "Medical devices" : "Dispositivos médicos", v: 45, c: TH.am }, { s: en ? "Engineering" : "Ingeniería", v: 35, c: TH.gn }] },
  { nm: "TIPAI", full: en ? "Physical AI Timeline Predictor" : "Predictor Timeline Physical AI", c: TH.pk, st: en ? "◐ DEV" : "◐ DESARROLLO", desc: en ? "Models WHEN each FZ sector faces Physical AI disruption. Inputs: humanoid cost trajectory, sector wages, task complexity, adoption precedents. Accounts for robot multi-shift advantage (2-3x)." : "Modela CUÁNDO cada sector ZF enfrenta disrupción Physical AI. Inputs: trayectoria costo humanoides, salarios sector, complejidad tareas, precedentes adopción. Robot trabaja 2-3x turnos.", f: "T_crossover = f(CostRobot(t), Wage, Complexity, Adoption)", w: en ? "Cost:35% Wage:25% Complex:25% Precedent:15%" : "Costo:35% Salario:25% Complejidad:25% Precedente:15%", sr: "Goldman Sachs, Bank of America, IFR, BCCR, Deloitte" },
  { nm: "MBR", full: en ? "Regulatory Gap Monitor" : "Monitor Brecha Regulatoria", c: TH.or, st: en ? "○ PLANNED" : "○ PLANIFICADO", desc: en ? "Measures how fast the gap grows between what AI can do and what CR regulates. Tech velocity vs. legislative response vs. enterprise adoption. Like a speedometer showing tech accelerating while governance idles." : "Mide qué tan rápido crece la brecha entre lo que la AI puede hacer y lo que CR regula. Velocidad tech vs. respuesta legislativa vs. adopción empresarial.", f: "GapScore = TechVelocity / max(RegVelocity, ε) × AdoptionRate", w: en ? "Tech:40% Reg:35% Adopt:25%" : "Tech:40% Reg:35% Adopción:25%", sr: "OECD.AI, IAPP, MICITT, Asamblea Legislativa" },
  { nm: "IPDM", full: en ? "AI Impact & Displacement Monitor" : "Monitor Impacto y Desplazamiento AI", c: TH.vi, st: en ? "○ PLANNED" : "○ PLANIFICADO", desc: en ? "Real-time signals of AI workforce changes: job postings requiring AI (LinkedIn), FZ threshold changes (PROCOMER), university enrollment, INA certifications. Early-warning of displacement pressure vs. readiness." : "Señales en tiempo real de cambios laborales: ofertas requiriendo AI (LinkedIn), cambios umbrales ZF (PROCOMER), matrícula universitaria, certificaciones INA.", f: "IPDM = Σ(signals × urgency) / readiness_capacity", w: en ? "Displacement:50% Readiness:30% Trend:20%" : "Desplazamiento:50% Preparación:30% Tendencia:20%", sr: "LinkedIn, CompuTrabajo, PROCOMER, INA, CONARE" },
  // NEW Algorithm 6: CRES
  { nm: "CRES", full: en ? "Costa Rica Energy-Security Nexus" : "Nexo Energía-Seguridad Costa Rica", c: TH.gn, st: en ? "○ PLANNED" : "○ PLANIFICADO", desc: en ? "Measures how CR's 99% renewable energy advantage translates to AI competitiveness. Combines renewable share, grid reliability, data center readiness, and energy cost per kWh into a composite score showing CR's green AI positioning." : "Mide cómo la ventaja de 99% energía renovable de CR se traduce en competitividad AI. Combina participación renovable, confiabilidad de red, preparación para data centers y costo energético por kWh.", f: "CRES = (RenewableShare × GridReliability × DataCenterReadiness) / EnergyCost_per_kWh", w: en ? "Renewable:30% Grid:25% DC-Ready:25% Cost:20%" : "Renovable:30% Red:25% DC-Ready:25% Costo:20%", sr: "ICE, ARESEP, IEA, BCCR" },
  // NEW Algorithm 7: FDIA
  { nm: "FDIA", full: en ? "Foreign Direct Investment AI Alignment" : "Alineación IED con AI", c: TH.am, st: en ? "○ PLANNED" : "○ PLANIFICADO", desc: en ? "Tracks whether incoming FDI is AI-aligned vs AI-vulnerable. Scores each sector by AI alignment: medical devices (high), digital services (medium — shifting), manufacturing (low), semiconductors (very high). Reveals whether CR's FDI portfolio is future-proof." : "Rastrea si la IED entrante está alineada con AI vs vulnerable a AI. Puntúa cada sector por alineación AI: dispositivos médicos (alto), servicios digitales (medio — cambiando), manufactura (bajo), semiconductores (muy alto).", f: "FDIA = Σ(FDI_sector × AI_alignment_score) / Total_FDI", w: en ? "Med-Dev:High Semi:VHigh Dig-Svc:Med Manuf:Low" : "Med-Dis:Alto Semi:MuyAlto Svc-Dig:Med Manuf:Bajo", sr: "CINDE, PROCOMER, BCCR" },
  // NEW Algorithm 8: QVRI — Inspired by WEF 2026 Section 2.6 "Quantum Leaps"
  { nm: "QVRI", full: en ? "Quantum Vulnerability & Readiness Index" : "Índice Vulnerabilidad y Preparación Cuántica", c: "#0ea5e9", st: en ? "○ PLANNED" : "○ PLANIFICADO", desc: en ? "Measures CR's exposure to quantum cryptographic threats vs. preparedness. WEF 2026: 53% of quantum experts give 50%+ chance of breaking RSA-2048 within a decade. Only 5% of organizations have quantum-safe encryption. CR's CCSS health data, banking sector, and free zone IP are all at risk from 'harvest now, decrypt later' campaigns." : "Mide exposición de CR a amenazas criptográficas cuánticas vs. preparación. WEF 2026: 53% de expertos cuánticos dan 50%+ probabilidad de romper RSA-2048 en una década. Solo 5% de organizaciones tienen cifrado cuántico-seguro. Datos CCSS, sector bancario, e IP de zonas francas de CR están en riesgo por campañas 'cosechar ahora, descifrar después'.", f: "QVRI = (CryptoExposure × DataSensitivity) / (PQCReadiness + ε)", w: en ? "Exposure:35% Sensitivity:25% PQC-Ready:25% Talent:15%" : "Exposición:35% Sensibilidad:25% PQC-Ready:25% Talento:15%", sr: "WEF 2026, IBM Quantum Safe Index, NIST PQC, MICITT" },
  // NEW Algorithm 9: SIRI — Inspired by WEF 2026 Section 2.7 "AI at Large" (K-shaped economies, purpose in drift)
  { nm: "SIRI", full: en ? "Societal Impact & Resilience Index" : "Índice de Impacto Social y Resiliencia", c: "#ec4899", st: en ? "○ PLANNED" : "○ PLANIFICADO", desc: en ? "Tracks the societal strain from AI-driven disruption. WEF 2026: AI could create K-shaped economies where productivity rises alongside unemployment. 86% of companies expect AI transformation by 2030. Monitors labor displacement velocity, reskilling capacity, social safety net strength, youth unemployment, and societal polarization. Designed to detect early signals of 'white-collar rust belt' formation." : "Rastrea la tensión social de la disrupción AI. WEF 2026: AI podría crear economías en forma de K donde productividad sube junto con desempleo. 86% de empresas esperan transformación AI para 2030. Monitorea velocidad de desplazamiento laboral, capacidad de recapacitación, fortaleza de red de seguridad social, desempleo juvenil y polarización social.", f: "SIRI = (DisplacementRate × PolarizationScore) / (ReskillCapacity × SafetyNetStrength)", w: en ? "Displacement:30% Polarization:20% Reskill:25% Safety:25%" : "Desplazamiento:30% Polarización:20% Recapacitación:25% Red:25%", sr: "WEF 2026, ILO, INEC, INA, MEP, IMAS" },
  // NEW Algorithm 10: GERI — Inspired by WEF 2026 Section 2.2 "Multipolarity without Multilateralism"
  { nm: "GERI", full: en ? "Geoeconomic Exposure & Resilience Index" : "Índice Exposición y Resiliencia Geoeconómica", c: "#f97316", st: en ? "○ PLANNED" : "○ PLANIFICADO", desc: en ? "Quantifies CR's vulnerability to geoeconomic fragmentation — WEF 2026's #1 immediate risk. Measures trade dependency concentration, FDI source diversification, supply chain vulnerability to sanctions/tariffs, and nearshoring resilience. US-China chip wars directly affect CR semiconductor FZ operations." : "Cuantifica la vulnerabilidad de CR a la fragmentación geoeconómica — riesgo inmediato #1 del WEF 2026. Mide concentración de dependencia comercial, diversificación de fuentes IED, vulnerabilidad de cadena de suministro a sanciones/aranceles y resiliencia nearshoring. Guerras de chips EEUU-China afectan directamente operaciones semiconductores ZF de CR.", f: "GERI = (TradeConcentration × SanctionExposure) / (ExportDiversification × NearshoreAdvantage)", w: en ? "Trade:30% Sanction:25% Diversify:25% Nearshore:20%" : "Comercio:30% Sanción:25% Diversif:25% Nearshore:20%", sr: "WEF 2026, PROCOMER, COMEX, CINDE, WTO" }
];

// ── 55 GLOSSARY TERMS (28 v12 + 12 v13 + 7 WEF-deep + 6 v9.5 + 2 EOS/GRPS) ──
export const GLOSSARY = (en) => [
  { t: "Physical AI", c: en ? "Trend" : "Tendencia", def: en ? "AI operating in the physical world — robots that perceive, learn, and adapt in real-time." : "AI que opera en el mundo físico — robots que perciben, aprenden y se adaptan en tiempo real.", ctx: en ? "Humanoid costs dropping to $15K by 2028. CR labor crossover projected 2028-2030." : "Costos humanoides bajando a $15K para 2028. Cruce económico con CR proyectado 2028-2030." },
  { t: "Vibe Coding", c: en ? "Trend" : "Tendencia", def: en ? "Describing what you want in natural language and AI generates the code. Collins Word of Year 2025." : "Describir lo que quieres en lenguaje natural y AI genera código. Palabra del Año Collins 2025.", ctx: en ? "92% of developers use AI coding tools. 41% of code is AI-generated. Democratizes software creation." : "92% de desarrolladores usan herramientas AI de código. 41% del código es generado por AI." },
  { t: "LLM", c: en ? "Technical" : "Técnico", def: en ? "Large Language Model. Foundation AI like GPT-4, Claude, Gemini. Cost: $10M-$500M+ to train." : "Modelo de Lenguaje Grande. AI fundacional como GPT-4, Claude, Gemini. Costo: $10M-$500M+.", ctx: en ? "CR should NOT build LLMs — should use them and regulate deployment. 87% of models come from high-income countries." : "CR NO debe construir LLMs — debe usarlos y regular su despliegue. 87% de modelos vienen de países de ingreso alto." },
  { t: "Prompt Injection", c: en ? "Security" : "Seguridad", def: en ? "Attack manipulating AI instructions via malicious user input. OWASP LLM Top 10 #1." : "Ataque que manipula instrucciones AI via input malicioso. OWASP LLM Top 10 #1.", ctx: en ? "Government chatbots without protection could expose citizen data. Mandatory security testing needed." : "Chatbots gubernamentales sin protección podrían exponer datos ciudadanos." },
  { t: "Shadow AI", c: en ? "Security" : "Seguridad", def: en ? "Unauthorized use of AI tools by employees without policies, creating data leakage risks." : "Uso no autorizado de herramientas AI por empleados sin políticas, creando riesgos de fuga de datos.", ctx: en ? "Officials uploading citizen data to ChatGPT = data leak. Every ministry needs a Shadow AI policy." : "Funcionarios subiendo datos a ChatGPT = fuga de datos. Cada ministerio necesita política Shadow AI." },
  { t: "RAG", c: en ? "Technical" : "Técnico", def: en ? "Retrieval-Augmented Generation. Connects LLM to databases for accurate, current information." : "Generación Aumentada por Recuperación. Conecta LLM a bases de datos para información precisa y actual.", ctx: en ? "Enables AI that queries CR legislation, BCCR rates, CCSS records accurately. Critical for government AI." : "Permite AI que consulta legislación CR, tasas BCCR, registros CCSS con precisión." },
  { t: "AI Agent", c: en ? "Technical" : "Técnico", def: en ? "AI system that acts autonomously: browses web, executes code, makes decisions without human intervention." : "Sistema AI que actúa autónomamente: navega web, ejecuta código, toma decisiones sin intervención humana.", ctx: en ? "An AI agent costs $0.50-5/hr vs CR employee at $5-25/hr. IMF estimates 40% jobs exposed." : "Un agente AI cuesta $0.50-5/hr vs empleado CR a $5-25/hr. FMI estima 40% empleos expuestos." },
  { t: "Deepfake", c: en ? "Security" : "Seguridad", def: en ? "AI-generated synthetic video/audio/images imitating real people. Production cost: <$10." : "Video/audio/imágenes sintéticas generadas por AI que imitan personas reales. Costo: <$10.", ctx: en ? "WEF: misinformation is #1 global risk. CR elections 2026 face deepfake risk. No legal framework exists." : "WEF: desinformación es riesgo #1. Elecciones CR 2026 con riesgo deepfake. Sin marco legal." },
  { t: "EU AI Act", c: en ? "Legislation" : "Legislación", def: en ? "World's first comprehensive AI law (2024). 4 risk tiers. Penalties up to €35M or 7% global turnover." : "Primera ley AI integral del mundo (2024). 4 niveles de riesgo. Multas hasta €35M o 7% facturación global.", ctx: en ? "CR companies exporting AI services to Europe MUST comply. Reference framework for developing countries." : "Empresas CR exportando servicios AI a Europa DEBEN cumplir. Marco de referencia para países en desarrollo." },
  { t: "Zero-Day", c: en ? "Security" : "Seguridad", def: en ? "Software vulnerability unknown to developers, without a patch. Zero days of advance warning." : "Vulnerabilidad desconocida por desarrolladores, sin parche. Cero días de advertencia.", ctx: en ? "Claude 4.6 found 500+ zero-days in open-source code (Feb 2026), surpassing years of traditional fuzzing." : "Claude 4.6 encontró 500+ zero-days en código open-source (Feb 2026), superando años de fuzzing." },
  { t: "Nearshoring", c: en ? "Economy" : "Economía", def: en ? "Relocating operations to geographically close, culturally aligned countries for supply chain resilience." : "Relocalizar operaciones a países cercanos y culturalmente alineados por resiliencia.", ctx: en ? "CR benefits: 5hrs from US, same timezone, CAFTA-DR, 99% renewable, OECD, bilingual. But AI threatens service jobs." : "CR: 5hrs de EEUU, mismo huso horario, CAFTA-DR, 99% renovable, OCDE, bilingüe. Pero AI amenaza empleos de servicios." },
  { t: "MCP", c: en ? "Technical" : "Técnico", def: en ? "Model Context Protocol. Anthropic's open protocol for AI-to-tool connections. Think USB-C for AI." : "Model Context Protocol. Protocolo abierto de Anthropic para conexiones AI-herramientas. Como USB-C para AI.", ctx: en ? "Critical: zero-click vulnerability (CVSS 10/10) discovered Feb 2026 in Claude Desktop via MCP." : "Crítico: vulnerabilidad zero-click (CVSS 10/10) descubierta Feb 2026 en Claude Desktop via MCP." },
  { t: "Digital Twin", c: en ? "Technical" : "Técnico", def: en ? "Virtual replica of physical objects/systems for AI simulation, testing, and optimization." : "Réplica virtual de objetos/sistemas físicos para simulación, pruebas y optimización con AI.", ctx: en ? "Boston Dynamics uses 4,000 digital twins to train Atlas. CR med-tech firms could adopt for product testing." : "Boston Dynamics usa 4,000 digital twins para entrenar Atlas. Empresas med-tech CR podrían adoptar para pruebas." },
  { t: en ? "Hallucination" : "Alucinación", c: en ? "Technical" : "Técnico", def: en ? "When AI generates false information with high confidence. Inherent to how language models work." : "Cuando AI genera información falsa con alta confianza. Inherente a cómo funcionan modelos de lenguaje.", ctx: en ? "Government AI that hallucinates about legal procedures = wrong citizen decisions. RAG + oversight essential." : "AI gubernamental que alucina sobre procedimientos legales = decisiones ciudadanas erróneas." },
  { t: "OWASP Top 10 LLM", c: en ? "Security" : "Seguridad", def: en ? "Industry standard list of 10 most critical AI security risks. Updated 2025. Guides policy." : "Lista estándar de los 10 riesgos de seguridad AI más críticos. Actualizada 2025. Guía política.", ctx: en ? "New 2025: System Prompt Leakage (#7), Vector Weaknesses (#8). Separate Top 10 for Agentic Apps in 2026." : "Nuevas 2025: Filtración System Prompt (#7), Debilidades Vectores (#8). Top 10 separado Apps Agénticas 2026." },
  { t: "Foundation Model", c: en ? "Technical" : "Técnico", def: en ? "Massive AI model trained on broad data serving as base for many apps. GPT-4, Claude, Gemini, Llama." : "Modelo AI masivo entrenado en datos amplios como base para muchas apps. GPT-4, Claude, Gemini, Llama.", ctx: en ? "CR must regulate deployment, not attempt to create them. 87% of models from high-income countries (WB)." : "CR debe regular despliegue, no intentar crearlos. 87% de modelos de países ingreso alto (BM)." },
  { t: en ? "Algorithmic Bias" : "Sesgo Algorítmico", c: en ? "Ethics" : "Ética", def: en ? "Systematic AI errors that unfairly disadvantage certain groups, reflecting biases in training data." : "Errores sistemáticos de AI que perjudican a ciertos grupos, reflejando sesgos en datos de entrenamiento.", ctx: en ? "Colorado SB 205 mandates anti-discrimination audits. WEF: biases in sensitive decisions perpetuate inequities." : "Colorado SB 205 exige auditorías anti-discriminación. WEF: sesgos en decisiones sensibles perpetúan inequidades." },
  { t: "Zona Franca", c: en ? "Economy" : "Economía", def: en ? "Special economic zones offering tax incentives to attract foreign investment. CR model since 1990." : "Zonas económicas especiales con incentivos fiscales para atraer inversión extranjera. Modelo CR desde 1990.", ctx: en ? "626 companies, 15% of GDP, 265K jobs, $4.3B FDI. Each $1 in tax exemptions generates $2.90 in value." : "626 empresas, 15% del PIB, 265K empleos, $4.3B IED. Cada $1 en exenciones genera $2.90 en valor." },
  { t: "CCSS (Caja)", c: en ? "Institution" : "Institución", def: en ? "Costa Rica's universal healthcare and pension system covering the entire population since 1941." : "Sistema universal de salud y pensiones de CR cubriendo toda la población desde 1941.", ctx: en ? "8 years of EDUS digital health records = massive AI opportunity. $4.4B state debt. Hive ransomware attack 2022." : "8 años de registros EDUS = oportunidad AI masiva. $4.4B deuda estatal. Ataque ransomware Hive 2022." },
  { t: "PROCOMER", c: en ? "Institution" : "Institución", def: en ? "Costa Rica's Foreign Trade Promoter. Manages free zone data, export statistics, and trade policy." : "Promotora del Comercio Exterior de CR. Gestiona datos de zonas francas, estadísticas exportación y política comercial.", ctx: en ? "Primary source for free zone employment, investment, and AI impact data used in this observatory." : "Fuente primaria para datos de empleo, inversión e impacto AI en zonas francas usados en este observatorio." },
  { t: en ? "Regulatory Sandbox" : "Sandbox Regulatorio", c: en ? "Legislation" : "Legislación", def: en ? "Controlled environment where companies can test AI innovations under regulatory supervision without full compliance burden." : "Entorno controlado donde empresas pueden probar innovaciones AI bajo supervisión regulatoria sin carga total de cumplimiento.", ctx: en ? "Brazil's AI bill includes sandboxes. UK and Singapore pioneered the model. CR should establish one via MICITT." : "El proyecto AI de Brasil incluye sandboxes. UK y Singapur pioneros del modelo. CR debería establecer uno via MICITT." },
  { t: "NIST AI RMF", c: en ? "Standards" : "Estándares", def: en ? "US National Institute of Standards' AI Risk Management Framework. Voluntary standard for trustworthy AI." : "Marco de Gestión de Riesgos AI del Instituto Nacional de Estándares de EEUU. Estándar voluntario para AI confiable.", ctx: en ? "Colorado SB 205 provides legal safe harbor for companies following NIST AI RMF. CR could adopt similar mechanism." : "Colorado SB 205 provee protección legal para empresas que siguen NIST AI RMF. CR podría adoptar mecanismo similar." },
  { t: "Conti", c: en ? "Security" : "Seguridad", def: en ? "Russian-linked ransomware group that attacked Costa Rica in April 2022, triggering a national emergency." : "Grupo de ransomware vinculado a Rusia que atacó a CR en abril 2022, desencadenando emergencia nacional.", ctx: en ? "30 institutions crippled. 672GB data exfiltrated. $30M/day losses. Led to $35M+ cybersecurity investment." : "30 instituciones paralizadas. 672GB datos exfiltrados. $30M/día pérdidas. Generó $35M+ inversión en ciberseguridad." },
  { t: "EDUS", c: en ? "Institution" : "Institución", def: en ? "Unified Digital Health Record. CR's national health database covering the entire population across 8+ years." : "Expediente Digital Único en Salud. Base de datos nacional de salud cubriendo toda la población por 8+ años.", ctx: en ? "Largest structured health dataset in Central America. AI analysis could transform preventive medicine — but data protection law restricts use." : "Mayor dataset estructurado de salud en Centroamérica. Análisis AI podría transformar medicina preventiva — pero ley de protección datos restringe uso." },
  { t: en ? "Explainability (XAI)" : "Explicabilidad (XAI)", c: en ? "Ethics" : "Ética", def: en ? "Ability to understand and explain how an AI system arrives at its decisions. Required for high-risk AI under EU AI Act." : "Capacidad de entender y explicar cómo un sistema AI llega a sus decisiones. Requerido para AI de alto riesgo bajo EU AI Act.", ctx: en ? "CR should mandate explainability for all government AI: credit scoring, social benefits, judicial assistance." : "CR debería exigir explicabilidad para toda AI gubernamental: scoring crediticio, beneficios sociales, asistencia judicial." },
  { t: "ENIA", c: en ? "Policy" : "Política", def: en ? "Estrategia Nacional de Inteligencia Artificial. Costa Rica's national AI strategy (MICITT, Oct 2024). First Central American country with national AI strategy. 7 pillars: ethics, territorial development, talent, infrastructure, innovation, smart government, international leadership. Aligned with UNESCO AI Ethics Recommendation. BUT: NO binding law, NO authority, NO mandatory transparency. Score: 0.38/1.0." : "Estrategia Nacional de Inteligencia Artificial de Costa Rica (MICITT, Oct 2024). Primer país centroamericano con estrategia nacional AI. 7 pilares: ética, desarrollo territorial, talento, infraestructura, innovación, gobierno inteligente, liderazgo internacional. Alineada con Recomendación UNESCO de Ética AI. PERO: SIN ley vinculante, SIN autoridad, SIN transparencia obligatoria. Score: 0.38/1.0.", ctx: en ? "Oxford Insights scored CR 100/100 on AI Vision. But ENIA is non-binding — the critical gap is moving to enforceable law." : "Oxford Insights dio a CR 100/100 en Visión AI. Pero ENIA no es vinculante — la brecha crítica es pasar a ley aplicable." },
  { t: "CAPI-CR", c: "Colibrii", def: en ? "Colibrii AI Preparedness Index. Proprietary 6-dimension index extending the IMF AIPI for Costa Rica." : "Índice de Preparación AI Colibrii. Índice propietario de 6 dimensiones que extiende el AIPI del FMI para CR.", ctx: en ? "Uses 11 real-time World Bank indicators + 2 curated dimensions. Evaluates 20 peer countries. Active on this portal." : "Usa 11 indicadores Banco Mundial en tiempo real + 2 dimensiones curadas. Evalúa 20 países pares. Activo en este portal." },
  { t: "IVAS", c: "Colibrii", def: en ? "AI Sector Vulnerability Index. Maps CR free zone sectors against automation risk by task decomposition." : "Índice de Vulnerabilidad AI por Sector. Mapea sectores ZF de CR contra riesgo de automatización por descomposición de tareas.", ctx: en ? "In development. Preview: call centers 85/100 (critical), digital services 78 (high), medical devices 45 (medium)." : "En desarrollo. Preview: call centers 85/100 (crítico), servicios digitales 78 (alto), dispositivos médicos 45 (medio)." },
  // 6 NEW glossary terms from v9.5 spec (terms 29-34)
  { t: "Token", c: en ? "Technical" : "Técnico", def: en ? "Fundamental unit of text in LLMs. A word is 1-3 tokens. GPT-4o: $2.50/$10 per 1M. Claude Sonnet: $3/$15 per 1M." : "Unidad fundamental de texto en LLMs. Una palabra es 1-3 tokens. GPT-4o: $2.50/$10 por 1M. Claude Sonnet: $3/$15 por 1M.", ctx: en ? "Token economics drive CR's AI cost equation. Support agent ~$15/hr; AI agent ~$0.50-5/hr. 10-30x difference = why 28K BPO jobs at risk." : "La economía de tokens define la ecuación de costos AI de CR. Agente soporte ~$15/hr; agente AI ~$0.50-5/hr. Diferencia 10-30x = por qué 28K empleos BPO en riesgo." },
  { t: "AI Governance", c: en ? "Policy" : "Política", def: en ? "Framework of policies, regulations, institutions guiding AI development and deployment." : "Marco de políticas, regulaciones, instituciones que guían el desarrollo y despliegue de AI.", ctx: en ? "CR has strategy (ENIA) but no governance. OECD tracks CR. Three AI bills pending. PRODHAB lacks AI mandate." : "CR tiene estrategia (ENIA) pero no gobernanza. OCDE monitorea a CR. Tres proyectos AI pendientes. PRODHAB sin mandato AI." },
  { t: "Fine-tuning", c: en ? "Technical" : "Técnico", def: en ? "Customizing pre-trained AI with domain data. Cost: $500-$50K+. 100x cheaper than training from scratch." : "Personalizar AI pre-entrenada con datos de dominio. Costo: $500-$50K+. 100x más barato que entrenar desde cero.", ctx: en ? "CR gov could fine-tune on legislation, CCSS protocols, agricultural data. 100x cheaper than training. UCR/TEC could lead." : "Gobierno CR podría hacer fine-tuning en legislación, protocolos CCSS, datos agrícolas. 100x más barato. UCR/TEC podrían liderar." },
  { t: "AI Safety", c: en ? "Technical" : "Técnico", def: en ? "Ensuring AI behaves as intended. Includes alignment, robustness, monitoring, and control mechanisms." : "Asegurar que la AI se comporte como se espera. Incluye alineación, robustez, monitoreo y mecanismos de control.", ctx: en ? "Anthropic found 500+ zero-days with Claude 4.6 (Feb 2026). DARPA AIxCC $8.5M. CR needs AI safety capacity." : "Anthropic encontró 500+ zero-days con Claude 4.6 (Feb 2026). DARPA AIxCC $8.5M. CR necesita capacidad de seguridad AI." },
  { t: "Small AI", c: en ? "Technical" : "Técnico", def: en ? "Lightweight models for resource-constrained environments. Highlighted in World Bank Digital Progress 2025." : "Modelos livianos para entornos con recursos limitados. Destacado en World Bank Digital Progress 2025.", ctx: en ? "CR's practical path: specialized models for agriculture, healthcare (EDUS), government without massive infrastructure." : "Camino práctico de CR: modelos especializados para agricultura, salud (EDUS), gobierno sin infraestructura masiva." },
  { t: "AI Precariat", c: en ? "Economy" : "Economía", def: en ? "Workers facing permanent AI displacement without transition paths. Term from WEF 2025 analysis." : "Trabajadores enfrentando desplazamiento AI permanente sin rutas de transición. Término del análisis WEF 2025.", ctx: en ? "41% employers plan to reduce workforce by 2030. CR's 28K BPO workers could form AI precariat. INA has NO AI track." : "41% empleadores planean reducir fuerza laboral para 2030. Los 28K trabajadores BPO de CR podrían formar precariado AI. INA NO tiene track AI." },
  // 12 NEW glossary terms v13.1 expansion (terms 35-46)
  { t: "Transformer", c: en ? "Technical" : "Técnico", def: en ? "Neural network architecture (Google, 2017) using self-attention mechanisms. Foundation of ALL modern LLMs: GPT, Claude, Gemini, Llama." : "Arquitectura de red neuronal (Google, 2017) con mecanismos de auto-atención. Base de TODOS los LLMs modernos: GPT, Claude, Gemini, Llama.", ctx: en ? "Understanding transformer architecture helps CR policymakers grasp why AI capabilities are accelerating exponentially." : "Entender la arquitectura transformer ayuda a formuladores CR a comprender por qué capacidades AI aceleran exponencialmente." },
  { t: en ? "Multimodal AI" : "AI Multimodal", c: en ? "Technical" : "Técnico", def: en ? "AI models that process multiple input types simultaneously: text, images, audio, video, code. GPT-4o, Gemini, Claude are multimodal." : "Modelos AI que procesan múltiples tipos de entrada simultáneamente: texto, imágenes, audio, video, código. GPT-4o, Gemini, Claude son multimodales.", ctx: en ? "Multimodal AI enables CR applications: agricultural image analysis (MAG), medical imaging (CCSS), document processing (government)." : "AI multimodal habilita aplicaciones CR: análisis imágenes agrícolas (MAG), imágenes médicas (CCSS), procesamiento documentos (gobierno)." },
  { t: en ? "Agentic AI" : "AI Agéntica", c: en ? "Technical" : "Técnico", def: en ? "AI systems that autonomously plan, execute multi-step tasks, use tools, and make decisions. OWASP released dedicated Top 10 for Agentic Apps in 2026." : "Sistemas AI que planifican autónomamente, ejecutan tareas multi-paso, usan herramientas y toman decisiones. OWASP publicó Top 10 dedicado para Apps Agénticas en 2026.", ctx: en ? "Agentic AI is the next frontier. CR free zone BPO companies face highest risk — agents can replace entire workflows, not just tasks." : "AI agéntica es la próxima frontera. Empresas BPO de zonas francas CR enfrentan mayor riesgo — agentes reemplazan flujos completos, no solo tareas." },
  { t: "Edge AI", c: en ? "Technical" : "Técnico", def: en ? "AI processing on local devices (phones, sensors, cameras) without cloud dependency. Critical for IoT and real-time applications." : "Procesamiento AI en dispositivos locales (teléfonos, sensores, cámaras) sin dependencia de nube. Crítico para IoT y aplicaciones en tiempo real.", ctx: en ? "Essential for CR agriculture (precision farming), environmental monitoring (volcanoes, forests), and areas with limited connectivity." : "Esencial para agricultura CR (agricultura de precisión), monitoreo ambiental (volcanes, bosques) y áreas con conectividad limitada." },
  { t: en ? "Federated Learning" : "Aprendizaje Federado", c: en ? "Technical" : "Técnico", def: en ? "Training AI across multiple devices/institutions without sharing raw data. Each node trains locally, only model updates are shared." : "Entrenar AI entre múltiples dispositivos/instituciones sin compartir datos crudos. Cada nodo entrena localmente, solo se comparten actualizaciones del modelo.", ctx: en ? "Critical for CCSS/EDUS: train health AI across hospitals without centralizing sensitive patient data. Solves privacy vs. AI utility tension." : "Crítico para CCSS/EDUS: entrenar AI de salud entre hospitales sin centralizar datos sensibles de pacientes. Resuelve tensión privacidad vs. utilidad AI." },
  { t: en ? "Synthetic Data" : "Datos Sintéticos", c: en ? "Technical" : "Técnico", def: en ? "AI-generated data that mimics real datasets for training without privacy risks. Gartner: 60% of AI training data will be synthetic by 2024." : "Datos generados por AI que imitan datasets reales para entrenamiento sin riesgos de privacidad. Gartner: 60% de datos de entrenamiento AI serán sintéticos para 2024.", ctx: en ? "CR can use synthetic data to train AI on CCSS health records, tax data, or agricultural patterns without exposing real citizen data." : "CR puede usar datos sintéticos para entrenar AI en registros CCSS, datos tributarios o patrones agrícolas sin exponer datos reales." },
  { t: en ? "AI Alignment" : "Alineación AI", c: en ? "Ethics" : "Ética", def: en ? "Ensuring AI systems' goals, behaviors, and values match human intentions. Core challenge as AI becomes more capable and autonomous." : "Asegurar que los objetivos, comportamientos y valores de sistemas AI coincidan con intenciones humanas. Desafío central a medida que AI se vuelve más capaz y autónoma.", ctx: en ? "As CR deploys AI in government services, alignment ensures systems serve citizen welfare, not just efficiency metrics." : "A medida que CR despliega AI en servicios gubernamentales, la alineación asegura que sistemas sirvan bienestar ciudadano, no solo métricas de eficiencia." },
  { t: "AI Responsable", c: en ? "Ethics" : "Ética", def: en ? "Framework for ethical AI development: fairness, transparency, accountability, privacy, safety. OECD AI Principles standard." : "Marco para desarrollo ético de AI: equidad, transparencia, rendición de cuentas, privacidad, seguridad. Estándar Principios AI de la OCDE.", ctx: en ? "CR as OECD member should adopt OECD AI Principles as baseline. ENIA references responsible AI but lacks enforcement mechanisms." : "CR como miembro OCDE debería adoptar Principios AI OCDE como línea base. ENIA referencia AI responsable pero carece de mecanismos de cumplimiento." },
  { t: "GAN", c: en ? "Technical" : "Técnico", def: en ? "Generative Adversarial Network. Two neural networks competing: one generates, one discriminates. Powers deepfakes, image generation." : "Red Generativa Adversaria. Dos redes neuronales compitiendo: una genera, otra discrimina. Impulsa deepfakes, generación de imágenes.", ctx: en ? "GANs power the deepfake technology that threatens CR 2026 elections. Understanding the tech is essential for regulation." : "Los GANs impulsan la tecnología deepfake que amenaza elecciones CR 2026. Entender la tecnología es esencial para regulación." },
  { t: en ? "Reinforcement Learning" : "Aprendizaje por Refuerzo", c: en ? "Technical" : "Técnico", def: en ? "AI learning through trial and reward signals rather than labeled data. Used for robotics, game playing, optimization." : "AI que aprende mediante prueba y señales de recompensa en lugar de datos etiquetados. Usado en robótica, juegos, optimización.", ctx: en ? "Reinforcement learning trains the humanoid robots (Tesla Optimus, Figure) that will impact CR manufacturing free zones." : "El aprendizaje por refuerzo entrena los robots humanoides (Tesla Optimus, Figure) que impactarán zonas francas de manufactura CR." },
  { t: "AutoML", c: en ? "Technical" : "Técnico", def: en ? "Automated Machine Learning. Tools that automate model selection, feature engineering, and hyperparameter tuning. Lowers AI barrier." : "Machine Learning Automatizado. Herramientas que automatizan selección de modelos, ingeniería de features y ajuste de hiperparámetros. Baja barrera AI.", ctx: en ? "AutoML democratizes AI: CR SMEs and government agencies can build ML models without deep data science expertise. Google, AWS, Azure offer AutoML." : "AutoML democratiza AI: PYMES CR y agencias gobierno pueden construir modelos ML sin expertise profundo en ciencia de datos." },
  { t: en ? "Geoeconomic Confrontation" : "Confrontación Geoeconómica", c: en ? "Economy" : "Economía", def: en ? "WEF 2026 #1 immediate risk. Use of economic tools (tariffs, sanctions, export controls) as weapons in geopolitical conflicts." : "WEF 2026 riesgo inmediato #1. Uso de herramientas económicas (aranceles, sanciones, controles exportación) como armas en conflictos geopolíticos.", ctx: en ? "Directly impacts CR: US-China chip wars affect semiconductor FZ operations. Trade fragmentation could disrupt nearshoring advantages." : "Impacta directamente a CR: guerras de chips EEUU-China afectan operaciones semiconductores ZF. Fragmentación comercial podría afectar ventajas nearshoring." },
  // 7 NEW glossary terms from WEF 2026 deep analysis (terms 47-53)
  { t: en ? "K-Shaped Economy" : "Economía en Forma de K", c: en ? "Economy" : "Economía", def: en ? "An economy where some sectors/groups recover and thrive while others stagnate or decline. WEF 2026: AI could drive permanently K-shaped economies — productivity rises alongside unemployment." : "Economía donde algunos sectores/grupos se recuperan y prosperan mientras otros se estancan o declinan. WEF 2026: AI podría impulsar economías permanentemente en K — productividad sube junto con desempleo.", ctx: en ? "CR risk: high-skilled tech workers prosper while 28K BPO workers face displacement. INA has no AI reskilling track. Advanced economies may face K-shaped patterns common in developing countries." : "Riesgo CR: trabajadores tech calificados prosperan mientras 28K trabajadores BPO enfrentan desplazamiento. INA no tiene track de recapacitación AI." },
  { t: en ? "Post-Quantum Cryptography (PQC)" : "Criptografía Post-Cuántica (PQC)", c: en ? "Security" : "Seguridad", def: en ? "Encryption algorithms resistant to quantum computer attacks. NIST issued first PQC standards in 2024. Only 5% of organizations have quantum-safe encryption (WEF 2026)." : "Algoritmos de cifrado resistentes a ataques de computadoras cuánticas. NIST emitió primeros estándares PQC en 2024. Solo 5% de organizaciones tienen cifrado cuántico-seguro (WEF 2026).", ctx: en ? "CR's CCSS health records, banking sector (BAC, Promerica), and free zone IP are all vulnerable. 53% of quantum experts give 50%+ chance of breaking RSA-2048 within a decade." : "Registros CCSS, sector bancario (BAC, Promerica) e IP de zonas francas son vulnerables. 53% de expertos cuánticos dan 50%+ probabilidad de romper RSA-2048 en una década." },
  { t: en ? "Harvest Now, Decrypt Later" : "Cosechar Ahora, Descifrar Después", c: en ? "Security" : "Seguridad", def: en ? "Attack strategy where encrypted data is stolen and stored today, to be decrypted once quantum computers become powerful enough. Already underway according to WEF 2026." : "Estrategia de ataque donde datos cifrados se roban y almacenan hoy, para descifrarlos cuando computadoras cuánticas sean suficientemente poderosas. Ya en curso según WEF 2026.", ctx: en ? "State-level adversaries may already be harvesting CR government data, CCSS health records, and free zone trade secrets for future quantum decryption." : "Adversarios a nivel estatal podrían estar cosechando datos gubernamentales CR, registros CCSS y secretos comerciales ZF para descifrado cuántico futuro." },
  { t: "Q-Day", c: en ? "Security" : "Seguridad", def: en ? "The hypothetical future date when quantum computers can break current classical cryptography (RSA-2048). WEF 2026: 53% of quantum experts believe this has 50%+ probability within a decade." : "Fecha hipotética futura cuando computadoras cuánticas puedan romper criptografía clásica actual (RSA-2048). WEF 2026: 53% de expertos cuánticos creen esto tiene 50%+ probabilidad en una década.", ctx: en ? "After Q-day, all data encrypted with current methods becomes readable. CR has no national quantum readiness strategy. IBM Quantum Safe Readiness Index averages only 25/100." : "Después del Q-day, todos los datos cifrados con métodos actuales se vuelven legibles. CR no tiene estrategia nacional de preparación cuántica. Índice IBM promedia solo 25/100." },
  { t: en ? "White-Collar Rust Belt" : "Cinturón de Óxido de Cuello Blanco", c: en ? "Economy" : "Economía", def: en ? "WEF 2026 concept: cities currently thriving as knowledge/service hubs that face AI-driven displacement of professional and managerial workers, analogous to the manufacturing rust belt." : "Concepto WEF 2026: ciudades que actualmente prosperan como centros de conocimiento/servicios que enfrentan desplazamiento AI de trabajadores profesionales y gerenciales, análogo al cinturón de óxido manufacturero.", ctx: en ? "CR's GAM (San José metro) is essentially a services hub — BPO, shared services, digital services. If AI automates these, the GAM faces white-collar rust belt dynamics." : "El GAM de CR (metro San José) es esencialmente un hub de servicios — BPO, servicios compartidos, servicios digitales. Si AI automatiza esto, el GAM enfrenta dinámicas de cinturón de óxido." },
  { t: en ? "Polycrisis" : "Policrisis", c: en ? "Geopolitical" : "Geopolítica", def: en ? "A situation where multiple global crises occur simultaneously, interacting to produce compounding effects greater than the sum of their parts. Coined by WEF Global Risks Report 2023." : "Situación donde múltiples crisis globales ocurren simultáneamente, interactuando para producir efectos compuestos mayores que la suma de sus partes. Acuñado por WEF Global Risks Report 2023.", ctx: en ? "CR faces polycrisis dynamics: geoeconomic tensions + AI displacement + climate events + fiscal constraints + election deepfake risks converge in 2026-2028." : "CR enfrenta dinámicas de policrisis: tensiones geoeconómicas + desplazamiento AI + eventos climáticos + restricciones fiscales + riesgos deepfake electorales convergen en 2026-2028." },
  { t: en ? "Structural Force" : "Fuerza Estructural", c: en ? "Geopolitical" : "Geopolítica", def: en ? "WEF term: long-term shifts in global landscape arrangement — geostrategic shifts, technological acceleration, climate change, demographic bifurcation — that influence the speed, spread and scope of global risks." : "Término WEF: cambios de largo plazo en la disposición del panorama global — cambios geoestratégicos, aceleración tecnológica, cambio climático, bifurcación demográfica — que influyen en velocidad, alcance y ámbito de riesgos globales.", ctx: en ? "CR is shaped by all four structural forces: US-China geostrategic shift (nearshoring), tech acceleration (AI/BPO disruption), climate (extreme weather), demographics (aging workforce)." : "CR es moldeado por las cuatro fuerzas estructurales: cambio geoestratégico EEUU-China (nearshoring), aceleración tech (disrupción AI/BPO), clima (eventos extremos), demografía (envejecimiento)." },
  // 2 NEW glossary terms from WEF 2026 OCR analysis (terms 54-55)
  { t: "EOS", c: "WEF", def: en ? "Executive Opinion Survey. WEF's annual survey of 11,000+ business leaders across 116 economies identifying each country's top 5 perceived risks. Conducted via partner institutes." : "Encuesta de Opinión Ejecutiva. Encuesta anual del WEF a 11,000+ líderes empresariales en 116 economías identificando los 5 principales riesgos percibidos por país. Realizada vía institutos asociados.", ctx: en ? "CR's EOS (via INCAE Business School) shows crime #1, weak public services #2 — zero AI/technology risks in top 5. This perception gap means CR business leaders may be underestimating AI disruption." : "EOS de CR (vía INCAE Business School) muestra crimen #1, servicios públicos débiles #2 — cero riesgos AI/tecnología en top 5. Esta brecha de percepción significa que líderes empresariales CR podrían subestimar disrupción AI." },
  { t: "GRPS", c: "WEF", def: en ? "Global Risks Perception Survey. WEF's 1,300-expert survey feeding the Global Risks Report. Respondents: 38% business, 24% academia, 13% civil society, 10% government, 10% international organizations." : "Encuesta de Percepción de Riesgos Globales. Encuesta de 1,300 expertos del WEF que alimenta el Reporte de Riesgos Globales. Respondentes: 38% empresa, 24% academia, 13% sociedad civil, 10% gobierno, 10% organizaciones internacionales.", ctx: en ? "Understanding GRPS vs EOS matters: GRPS experts rank AI #5 long-term, but CR's EOS business leaders don't list AI at all. The expert-practitioner perception gap is a key observatory finding." : "Entender GRPS vs EOS importa: expertos GRPS ranquean AI #5 largo plazo, pero líderes empresariales EOS de CR ni lo listan. La brecha de percepción experto-practicante es hallazgo clave del observatorio." }
];

// ── AI GLOBAL TIMELINE MILESTONES ──
export const TIMELINE = (en) => [
  { date: "Nov 2022", t: "ChatGPT", d: en ? "OpenAI launches ChatGPT. 100M users in 2 months." : "OpenAI lanza ChatGPT. 100M usuarios en 2 meses.", cr: en ? "Triggers global AI awareness wave" : "Desencadena ola global de conciencia AI", c: TH.cy },
  { date: "Mar 2023", t: "GPT-4", d: en ? "OpenAI releases GPT-4. Multimodal, passes bar exam." : "OpenAI lanza GPT-4. Multimodal, aprueba examen legal.", cr: en ? "Capabilities jump alarms regulators" : "Salto capacidades alarma reguladores", c: TH.vi },
  { date: "May 2023", t: "CR Bill 23771", d: en ? "Costa Rica files first AI regulation bill." : "Costa Rica presenta primer proyecto de regulación AI.", cr: en ? "Drafted WITH ChatGPT-4" : "Redactado CON ChatGPT-4", c: TH.gn },
  { date: "Jul 2023", t: "Llama 2", d: en ? "Meta open-sources Llama 2. Democratizes AI." : "Meta abre Llama 2. Democratiza la AI.", cr: en ? "Open-source models available to CR" : "Modelos open-source disponibles para CR", c: TH.am },
  { date: "Jun 2024", t: "EU AI Act", d: en ? "First comprehensive AI law enters force." : "Primera ley AI integral entra en vigor.", cr: en ? "Reference framework for CR legislation" : "Marco referencia para legislación CR", c: TH.rd },
  { date: "May 2024", t: "GPT-4o", d: en ? "OpenAI releases GPT-4o. Native multimodal." : "OpenAI lanza GPT-4o. Multimodal nativo.", cr: en ? "Cost drops, BPO threat increases" : "Costos bajan, amenaza BPO aumenta", c: TH.cy },
  { date: "Jun 2024", t: "Claude 3.5 Sonnet", d: en ? "Anthropic releases Claude 3.5 Sonnet." : "Anthropic lanza Claude 3.5 Sonnet.", cr: en ? "State-of-the-art coding capability" : "Capacidad de programación de vanguardia", c: TH.vi },
  { date: "Oct 2024", t: "CR ENIA", d: en ? "Costa Rica publishes National AI Strategy." : "Costa Rica publica Estrategia Nacional AI.", cr: en ? "Oxford: 100/100 Vision score" : "Oxford: 100/100 Visión", c: TH.gn },
  { date: "Jan 2025", t: "DeepSeek R1", d: en ? "Chinese lab matches GPT-4 at fraction of cost." : "Laboratorio chino iguala GPT-4 a fracción del costo.", cr: en ? "AI cost barriers collapse" : "Barreras de costo AI colapsan", c: TH.pk },
  { date: "Jan 2025", t: "WEF Risks 2025", d: en ? "AI risk jumps #31→#6. Misinfo #1 again." : "Riesgo AI salta #31→#6. Desinfo #1 otra vez.", cr: en ? "CR elections 2026 at risk" : "Elecciones CR 2026 en riesgo", c: TH.rd },
  { date: "Jan 2026", t: "WEF Risks 2026", d: en ? "AI adverse outcomes: #30→#5 long-term (fastest rise ever). Geoeconomic confrontation #1. Misinfo top 5 all horizons." : "Resultados adversos AI: #30→#5 largo plazo (mayor salto histórico). Confrontación geoeconómica #1. Desinfo top 5 todos los horizontes.", cr: en ? "50% of experts: outlook 'turbulent' or 'stormy'" : "50% de expertos: perspectiva 'turbulenta' o 'tormentosa'", c: TH.rd },
  { date: "Jan 2026", t: "KOR AI Framework", d: en ? "South Korea's AI law takes effect." : "Ley AI de Corea del Sur entra en vigencia.", cr: en ? "Best model for CR regulation" : "Mejor modelo para regulación CR", c: TH.cy },
  { date: "2026", t: "Tesla Optimus", d: en ? "External humanoid robot sales begin." : "Comienzan ventas externas de robot humanoide.", cr: en ? "Physical AI disruption begins" : "Comienza disrupción Physical AI", c: TH.or },
  { date: "2026", t: "Figure BotQ", d: en ? "Austin factory: 12K→100K units/year." : "Fábrica Austin: 12K→100K unidades/año.", cr: en ? "Scale production of humanoids" : "Producción a escala de humanoides", c: TH.pk }
];

// ── COUNTRY AI STRATEGY PROFILES (for Country Deep Dive) ──
export const COUNTRY_PROFILES = (en) => ({
  SGP: {
    strategy: en ? "National AI Strategy 2.0 (Dec 2023). $1B+ investment. AI Governance Framework (2019, updated). Focus: trusted AI ecosystem." : "Estrategia Nacional AI 2.0 (Dic 2023). $1B+ inversión. Marco Gobernanza AI (2019, actualizado). Enfoque: ecosistema AI confiable.",
    institutions: en ? "Smart Nation & Digital Government Office, AI Singapore (AISG), IMDA" : "Smart Nation & Digital Government Office, AI Singapore (AISG), IMDA",
    learn: [
      en ? "Governance-first approach: framework before law, building trust" : "Enfoque gobernanza primero: marco antes de ley, construyendo confianza",
      en ? "Public-private AI training programs at scale" : "Programas de capacitación AI público-privados a escala",
      en ? "Small country can punch above its weight with strategic focus" : "País pequeño puede superar su peso con enfoque estratégico"
    ]
  },
  KOR: {
    strategy: en ? "AI Framework Act (Jan 2026). Consolidated 19 bills. National AI Committee chaired by president." : "Ley Marco AI (Ene 2026). Consolidó 19 proyectos. Comité Nacional AI presidido por presidente.",
    institutions: en ? "National AI Committee, AI Safety Institute, MSIT" : "Comité Nacional AI, Instituto Seguridad AI, MSIT",
    learn: [
      en ? "Combined regulate + promote in ONE law — ideal for CR" : "Combinó regular + promover en UNA ley — ideal para CR",
      en ? "AI Safety Institute achievable at small scale" : "Instituto Seguridad AI factible a escala pequeña",
      en ? "Foreign companies need local representative — good model" : "Empresas extranjeras necesitan representante local — buen modelo"
    ]
  },
  CHL: {
    strategy: en ? "AI Bill approved Chamber Aug 2025, in Senate. Modeled on EU AI Act. First country to complete UNESCO RAM." : "Proyecto AI aprobado Cámara Ago 2025, en Senado. Modelado en EU AI Act. Primer país en completar RAM UNESCO.",
    institutions: en ? "MinCiencia, AI Advisory Council, CORFO" : "MinCiencia, Consejo Consultivo AI, CORFO",
    learn: [
      en ? "Complete UNESCO RAM for credibility and evidence base" : "Completar RAM UNESCO para credibilidad y base de evidencia",
      en ? "Regional coordination through multilateral bodies" : "Coordinación regional a través de organismos multilaterales",
      en ? "CR's closest LATAM comparator — watch closely" : "Comparador LATAM más cercano de CR — observar de cerca"
    ]
  },
  EST: {
    strategy: en ? "AI strategy since 2019. Kratt AI for government services. e-Residency. X-Road data exchange." : "Estrategia AI desde 2019. Kratt AI para servicios gobierno. e-Residency. X-Road intercambio datos.",
    institutions: en ? "Ministry of Economic Affairs, e-Governance Academy, KEMIT" : "Ministerio Economía, e-Governance Academy, KEMIT",
    learn: [
      en ? "Digital government infrastructure enables AI deployment" : "Infraestructura gobierno digital habilita despliegue AI",
      en ? "Small country (1.3M) shows scale is not a barrier" : "País pequeño (1.3M) demuestra que escala no es barrera",
      en ? "X-Road interoperability model for CR institutions" : "Modelo interoperabilidad X-Road para instituciones CR"
    ]
  },
  FIN: {
    strategy: en ? "Elements of AI: 1% of population educated in AI. AuroraAI for government. Strong ethics focus." : "Elements of AI: 1% de población educada en AI. AuroraAI para gobierno. Fuerte enfoque ético.",
    institutions: en ? "Ministry of Economic Affairs, FCAI (Finnish Center for AI), Business Finland" : "Ministerio Economía, FCAI (Centro Finlandés AI), Business Finland",
    learn: [
      en ? "Mass AI literacy is achievable — Elements of AI is FREE and in Spanish" : "Alfabetización AI masiva es factible — Elements of AI es GRATIS y en español",
      en ? "Ethics-first approach aligns with CR values" : "Enfoque ética primero se alinea con valores CR",
      en ? "AuroraAI model for government service personalization" : "Modelo AuroraAI para personalización servicios gobierno"
    ]
  }
});

// ── HELPER FUNCTIONS ──
export const mm = v => { const n = v.filter(x => x != null && !isNaN(x)); if (!n.length) return v.map(() => null); const lo = Math.min(...n), hi = Math.max(...n); return hi === lo ? v.map(x => x == null ? null : .5) : v.map(x => x == null ? null : (x - lo) / (hi - lo)); };
export const av = a => { const v = a.filter(x => x != null); return v.length ? v.reduce((s, x) => s + x, 0) / v.length : null; };
export const sco = s => s >= .65 ? TH.gn : s >= .40 ? TH.am : TH.rd;
export const sla = (s, en) => s >= .65 ? (en ? "READY" : "PREPARADO") : s >= .40 ? (en ? "AT RISK" : "EN RIESGO") : (en ? "DEFICIT" : "DÉFICIT");

// ── CACHE HELPERS (30-minute TTL) ──
export function cacheGet(k) { try { const c = sessionStorage.getItem(`clb_${k}`); if (!c) return null; const d = JSON.parse(c); if (Date.now() - d.ts > 30 * 60 * 1000) return null; return d.data; } catch { return null; } }
export function cacheSet(k, v) { try { sessionStorage.setItem(`clb_${k}`, JSON.stringify({ ts: Date.now(), data: v })); } catch { } }

// ── POLICY SIMULATOR PRESETS ──
export const SIM_PRESETS = (en) => [
  { nm: en ? "Pass AI Law" : "Aprobar Ley AI", desc: en ? "Enact binding AI legislation like South Korea's framework" : "Promulgar legislación AI vinculante como el marco de Corea del Sur", changes: { D4: 0.65 } },
  { nm: en ? "Complete SOC-CR" : "Completar SOC-CR", desc: en ? "Fully operational national cybersecurity operations center" : "Centro de operaciones ciberseguridad nacional plenamente operativo", changes: { D6: 0.60 } },
  { nm: en ? "INA AI Track" : "Track AI INA", desc: en ? "Launch AI technician certification at INA" : "Lanzar certificación técnico AI en INA", changes: { D2: 0.05 } },
  { nm: en ? "Double R&D" : "Duplicar I+D", desc: en ? "Increase R&D spending from 0.4% to 0.8% GDP" : "Aumentar gasto I+D de 0.4% a 0.8% PIB", changes: { D3: 0.10 } }
];

// ── LEGISLATION DATA (7 laws — 5 from v12 + 2 NEW from v9.5 spec) ──
export const LAWS = (en) => [
  { n: "EU AI Act", f: "🇪🇺", st: en ? "IN FORCE" : "EN VIGOR", sc: TH.gn, desc: en ? "World's first comprehensive AI law. 4 risk tiers: unacceptable (8 bans incl. social scoring, subliminal manipulation, real-time biometrics), high-risk (healthcare, employment — strict obligations), limited (transparency), minimal. Penalties: €35M or 7% global turnover." : "Primera ley AI integral. 4 niveles riesgo: inaceptable (8 prohibiciones), alto (salud, empleo — obligaciones estrictas), limitado (transparencia), mínimo. Multas: €35M o 7% facturación.", cr: en ? "Adopt 4-tier framework + 8 prohibited practices. Challenge: designate PRODHAB as AI authority." : "Adoptar marco 4 niveles + 8 prácticas prohibidas. Desafío: designar PRODHAB como autoridad AI.", lk: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj" },
  { n: "South Korea AI Framework", f: "🇰🇷", st: "ENE 2026", sc: TH.cy, desc: en ? "BEST MODEL for CR: regulation + innovation in ONE law. Consolidated 19 bills. National AI Committee (president chairs), AI Safety Institute. Foreign companies need domestic representative." : "MEJOR MODELO para CR: regulación + innovación en UNA ley. Consolidó 19 proyectos. Comité Nacional AI (presidente preside), Instituto Seguridad AI. Empresas extranjeras necesitan representante local.", cr: en ? "Primary model. 'Regulate + promote' ideal for growing AI capacity with guardrails. Small AI Safety Institute achievable." : "Modelo primario. 'Regular + promover' ideal para crecer en AI con guardarraíles. Instituto Seguridad AI pequeño es factible.", lk: "https://cset.georgetown.edu/publication/south-korea-ai-law-2025/" },
  { n: "Colorado SB 24-205", f: "🇺🇸", st: "JUN 2026", sc: TH.vi, desc: en ? "First US state anti-AI-discrimination law. 'Reasonable care' for AI in employment, education, finance, health. Annual impact assessments. Consumer opt-out rights. Affirmative defense for NIST AI RMF / ISO 42001 compliance." : "Primera ley estatal anti-discriminación AI de EEUU. 'Cuidado razonable' para AI en empleo, educación, finanzas, salud. Evaluaciones anuales. Derechos de opt-out. Defensa afirmativa por cumplir NIST AI RMF / ISO 42001.", cr: en ? "'Reasonable care' standard pragmatic for small country. Annual assessments manageable." : "Estándar 'cuidado razonable' pragmático para país pequeño. Evaluaciones anuales manejables.", lk: "https://leg.colorado.gov/bills/sb24-205" },
  { n: en ? "Chile AI Bill" : "Proyecto AI Chile", f: "🇨🇱", st: en ? "IN SENATE" : "EN SENADO", sc: TH.am, desc: en ? "Approved Chamber Aug 2025. Modeled on EU AI Act 4 tiers. First country to complete UNESCO RAM. AI Advisory Council. CR's closest LATAM comparator." : "Aprobado Cámara Ago 2025. Modelado en EU AI Act 4 niveles. Primer país en completar RAM UNESCO. Consejo Consultivo AI. Comparador LATAM más cercano de CR.", cr: en ? "Complete UNESCO RAM (evidence base + credibility). Regional coordination via SICA." : "Completar RAM UNESCO (base evidencia + credibilidad). Coordinación regional via SICA.", lk: "https://www.camara.cl/legislacion/ProyectosDeLey/tramitacion.aspx?prmID=16554" },
  { n: "CR ENIA", f: "🇨🇷", st: en ? "STRATEGY ONLY" : "SOLO ESTRATEGIA", sc: TH.or, desc: en ? "First Central American country with national AI strategy (MICITT, Oct 2024). 7 pillars: ethics, territorial development, talent, infrastructure, innovation, smart government, international leadership. Aligned with UNESCO AI Ethics Recommendation. BUT: NO binding law, NO authority, NO mandatory transparency. Score: 0.38/1.0." : "Primer país centroamericano con estrategia nacional AI (MICITT, Oct 2024). 7 pilares: ética, desarrollo territorial, talento, infraestructura, innovación, gobierno inteligente, liderazgo internacional. Alineada con Recomendación UNESCO. PERO: SIN ley vinculante, SIN autoridad, SIN transparencia obligatoria. Score: 0.38/1.0.", cr: en ? "Must legislate within 12 months: (1) AI disclosure, (2) anti-discrimination, (3) PRODHAB as authority. First Central American AI law = FDI advantage." : "Debe legislar en 12 meses: (1) divulgación AI, (2) anti-discriminación, (3) PRODHAB como autoridad. Primera ley AI centroamericana = ventaja IED.", lk: "https://www.micit.go.cr/sites/default/files/estrategia-nacional-ia-cr.pdf" },
  // NEW Law 6: CR Bill 23771
  { n: en ? "CR Bill 23771" : "Proyecto CR 23771", f: "🇨🇷", st: en ? "IN COMMITTEE" : "EN COMISIÓN", sc: TH.am, desc: en ? "'Law for the Regulation of AI in Costa Rica' filed May 2023 by Rep. Vanessa Castro. Notable: drafted WITH ChatGPT-4. Covers transparency, privacy, data security. References CR Constitution 1949. First AI-specific bill in Central America." : "'Ley para la Regulación de AI en Costa Rica' presentado May 2023 por Dip. Vanessa Castro. Notable: redactado CON ChatGPT-4. Cubre transparencia, privacidad, seguridad datos. Referencia Constitución CR 1949. Primer proyecto específico AI en Centroamérica.", cr: en ? "Critical first step. Needs modernization with EU AI Act risk tiers and South Korea's promote+regulate approach." : "Primer paso crítico. Necesita modernización con niveles riesgo EU AI Act y enfoque promover+regular de Corea del Sur.", lk: "https://www.asamblea.go.cr/glcp/SitePages/ConsultaProyectos.aspx" },
  // NEW Law 7: CR Bill 23097
  { n: en ? "CR Bill 23097" : "Proyecto CR 23097", f: "🇨🇷", st: en ? "IN REVIEW" : "EN REVISIÓN", sc: TH.vi, desc: en ? "Data Protection reform aligning with EU GDPR. Strengthens PRODHAB. Essential for AI governance infrastructure. GDPR adequacy enables EU data flows for free zone companies. Key enabler for responsible AI deployment." : "Reforma Protección Datos alineándose con GDPR UE. Fortalece PRODHAB. Esencial para infraestructura de gobernanza AI. Adecuación GDPR habilita flujos datos UE para empresas zonas francas. Habilitador clave para despliegue AI responsable.", cr: en ? "Must pass BEFORE AI law. GDPR adequacy = competitive advantage for FZ companies serving EU clients." : "Debe aprobarse ANTES de ley AI. Adecuación GDPR = ventaja competitiva para empresas ZF sirviendo clientes UE.", lk: "https://www.asamblea.go.cr/glcp/SitePages/ConsultaProyectos.aspx" }
];

// ── CR CHECKLIST (11 items — 8 from v12 + 3 NEW from v9.5 spec) ──
export const CHECKLIST = (en) => [
  { i: en ? "Binding AI law" : "Ley AI vinculante", d: false, p: en ? "CRITICAL" : "CRÍTICA" },
  { i: en ? "Data Protection Law reform" : "Reforma Ley Protección Datos", d: false, p: en ? "CRITICAL" : "CRÍTICA" },
  { i: en ? "AI authority (PRODHAB)" : "Autoridad AI (PRODHAB)", d: false, p: en ? "CRITICAL" : "CRÍTICA" },
  { i: en ? "Algorithmic impact assessments" : "Evaluaciones impacto algorítmico", d: false, p: en ? "HIGH" : "ALTA" },
  { i: en ? "Anti-misinfo framework (2026 elections)" : "Marco anti-desinfo (elecciones 2026)", d: false, p: en ? "URGENT" : "URGENTE" },
  { i: en ? "National AI Strategy (ENIA)" : "Estrategia Nacional AI (ENIA)", d: true, p: "✅" },
  { i: en ? "UNESCO RAM completion" : "Completar RAM UNESCO", d: false, p: en ? "MEDIUM" : "MEDIA" },
  { i: en ? "Regulatory sandbox" : "Sandbox regulatorio", d: false, p: en ? "MEDIUM" : "MEDIA" },
  // 3 NEW checklist items from v9.5 spec
  { i: en ? "Bill 23771 (AI Regulation)" : "Proyecto 23771 (Regulación AI)", d: false, p: en ? "IN COMMITTEE" : "EN COMISIÓN" },
  { i: en ? "OECD AI Policy indexed" : "Política AI OCDE indexada", d: true, p: "✅" },
  { i: en ? "AI Center of Excellence" : "Centro Excelencia AI", d: false, p: en ? "PLANNED" : "PLANIFICADO" }
];

// ── API SOURCES (10+ — merged from both versions) ──
export const API_SOURCES = (en) => [
  { n: "World Bank Open Data", d: en ? "11 indicators × 20 countries" : "11 indicadores × 20 países", st: en ? "● Active" : "● Activo", c: TH.gn, u: "https://api.worldbank.org/v2/" },
  { n: "GDELT Project", d: en ? "AI news feed, 72h window" : "Noticias AI, ventana 72h", st: en ? "● Active" : "● Activo", c: TH.gn, u: "https://api.gdeltproject.org" },
  { n: "Exchange Rates API", d: en ? "Live CRC/USD rates" : "Tasas CRC/USD en vivo", st: en ? "● Active" : "● Activo", c: TH.gn, u: "https://open.er-api.com" },
  { n: "REST Countries", d: en ? "Population, GDP, flags" : "Población, PIB, banderas", st: en ? "● Active" : "● Activo", c: TH.gn, u: "https://restcountries.com" },
  { n: "WHO GHO", d: en ? "Health indicators, UHC" : "Indicadores salud, CUS", st: en ? "◐ Planned" : "◐ Planificado", c: TH.am, u: "https://ghoapi.azureedge.net" },
  { n: "GitHub Search", d: en ? "AI repos by country" : "Repos AI por país", st: en ? "◐ Planned" : "◐ Planificado", c: TH.am, u: "https://api.github.com" },
  { n: "OECD SDMX", d: en ? "Labor, R&D data" : "Datos laborales, I+D", st: en ? "○ Available" : "○ Disponible", c: TH.tx3, u: "https://sdmx.oecd.org" },
  { n: "UNDP Human Development API", d: en ? "HDI components for peers" : "Componentes IDH para pares", st: en ? "◐ Planned" : "◐ Planificado", c: TH.am, u: "http://ec2-52-1-168-42.compute-1.amazonaws.com/version/1/" },
  { n: "UNESCO UIS Data Browser", d: en ? "4,636+ education indicators" : "4,636+ indicadores educación", st: en ? "◐ Planned" : "◐ Planificado", c: TH.am, u: "https://databrowser.uis.unesco.org/" },
  { n: "FAO FAOSTAT SDMX", d: en ? "Agricultural, food security" : "Agrícola, seguridad alimentaria", st: en ? "○ Available" : "○ Disponible", c: TH.tx3, u: "https://sdmx.fao.org/public/rest/data/" },
  { n: "OECD.AI Policy Observatory", d: en ? "CR-specific AI policy data" : "Datos política AI específicos CR", st: en ? "○ Available" : "○ Disponible", c: TH.tx3, u: "https://oecd.ai/en/" },
  { n: "ITU ICT Eye / DataHub", d: en ? "Telecom, broadband indicators" : "Indicadores telecomunicaciones, banda ancha", st: en ? "○ Available" : "○ Disponible", c: TH.tx3, u: "https://datahub.itu.int/" },
  { n: "ILO ILOSTAT", d: en ? "Labor market, employment" : "Mercado laboral, empleo", st: en ? "○ Available" : "○ Disponible", c: TH.tx3, u: "https://ilostat.ilo.org/data/" }
];

// ── ANNUAL DATA SOURCES (24 total — 16 from v12 + 8 NEW from v9.5 spec) ──
export const ANNUAL_SOURCES = [
  "Transparency Int'l CPI", "Freedom House", "CATO Human Freedom Index", "Global Peace Index",
  "Stanford HAI AI Index", "Oxford AI Readiness", "V-Dem Democracy", "IMF AIPI",
  "WEF Global Risks 2025", "WEF Global Risks 2026", "WEF Future of Jobs", "ILO Working Papers", "ILO Buffer or Bottleneck",
  "PROCOMER Reports", "CINDE Statistics", "BCCR Data", "IFR World Robotics",
  "Goldman Sachs Research", "OWASP AI Top 10", "UN E-Government Survey",
  "WB Beyond the AI Divide", "WB Digital Progress 2025", "OECD CR Economic Survey",
  "IDB AI Jobs LATAM 2025", "PwC AI Jobs Barometer",
  "WEF Global Cybersecurity Outlook 2026", "Bank of America AI Research",
  "Deloitte AI Institute Reports", "McKinsey Global AI Survey", "UNCTAD Technology & Innovation"
];
