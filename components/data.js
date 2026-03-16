/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — DATA MODULE v13 DEFINITIVE MERGE
   All countries, indicators, governance, glossary (55), algorithms (10),
   legislation (7), checklist (11), sources (24+), APIs (10+)
   Merged from v9.5 + v12 — ZERO CONTENT LOSS
   ═══════════════════════════════════════════════════════════════ */

// ── THEME TOKENS (Institutional Blue — Goldman/LSEG inspired) ──
export const TH = {
  bg: "#f8f9fc", sf: "#eef1f8", sf2: "#e2e7f0", bd: "#d1d5e0", bd2: "#b8bfcc",
  tx: "#0f172a", tx2: "#475569", tx3: "#94a3b8",
  cy: "#2563eb", vi: "#6366f1", pk: "#ec4899", am: "#f59e0b",
  rd: "#ef4444", gn: "#10b981", or: "#f97316",
  navy: "#1a365d", gd: "#c9a84c",
  cardBg: "#ffffff",
  cardShadow: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
  cardShadowHover: "0 4px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
  headerBg: "rgba(248,249,252,0.88)",
  grad1: "linear-gradient(135deg, #2563eb, #6366f1, #ec4899)",
  grad2: "linear-gradient(135deg, #6366f1, #ec4899, #f59e0b)"
};

// ── DARK THEME TOKENS (Deep Navy) ──
export const TH_DARK = {
  bg: "#0a0f1e", sf: "#111827", sf2: "#1e293b", bd: "#1e293b", bd2: "#334155",
  tx: "#f1f5f9", tx2: "#94a3b8", tx3: "#64748b",
  cy: "#3b82f6", vi: "#818cf8", pk: "#f472b6", am: "#fbbf24",
  rd: "#f87171", gn: "#34d399", or: "#fb923c",
  cardBg: "#111827",
  cardShadow: "0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)",
  cardShadowHover: "0 4px 24px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)",
  headerBg: "rgba(10,15,30,0.92)",
  grad1: "linear-gradient(135deg, #3b82f6, #818cf8, #f472b6)",
  grad2: "linear-gradient(135deg, #818cf8, #f472b6, #fbbf24)"
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
  CRI: { n: "Costa Rica", e: "Costa Rica", f: "🇨🇷", r: "latam", w: "AI Overperformer — World Bank AIPI classification", pop: "5.2M", gdp: "$69B", cont: "LATAM" },
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

export const COUNTRY_RATIONALE = (en) => ({
  title: en ? "Why These 20 Countries?" : "¿Por Qué Estos 20 Países?",
  desc: en
    ? "The 20-country peer set was carefully selected to give Costa Rica maximum strategic context across five analytical dimensions:"
    : "El grupo de 20 países pares fue cuidadosamente seleccionado para dar a Costa Rica máximo contexto estratégico en cinco dimensiones analíticas:",
  groups: [
    {
      label: en ? "Direct FDI Competitors" : "Competidores IED Directos",
      color: "#ef4444",
      countries: ["COL", "DOM", "VNM", "PHL"],
      why: en ? "Countries actively competing with CR for the same nearshoring, BPO, and shared services investment flows. If a multinational considers Costa Rica, these are the alternatives on the shortlist."
             : "Países compitiendo activamente con CR por los mismos flujos de inversión nearshoring, BPO y servicios compartidos. Si una multinacional considera Costa Rica, estos son las alternativas en la lista corta."
    },
    {
      label: en ? "AI Readiness Leaders" : "Líderes Preparación AI",
      color: "#2563eb",
      countries: ["SGP", "KOR", "JPN"],
      why: en ? "Global gold standard benchmarks — what 'best in class' looks like in AI governance, investment, and talent development. Singapore's AI framework is the model most cited by OECD."
             : "Benchmarks estándar de oro global — cómo luce lo 'mejor en su clase' en gobernanza AI, inversión y desarrollo de talento. El marco AI de Singapur es el modelo más citado por la OCDE."
    },
    {
      label: en ? "Regional LATAM Peers" : "Pares Regionales LATAM",
      color: "#10b981",
      countries: ["CHL", "URY", "BRA", "MEX", "ARG", "PER", "PAN"],
      why: en ? "Economic, regulatory, and cultural comparators in Latin America. Chile leads LATAM in AI strategy, Brazil in scale, Mexico in manufacturing proximity to the US."
             : "Comparadores económicos, regulatorios y culturales en América Latina. Chile lidera LATAM en estrategia AI, Brasil en escala, México en cercanía manufacturera a EE.UU."
    },
    {
      label: en ? "Small Economy Digital Leaders" : "Economías Pequeñas Líderes Digitales",
      color: "#6366f1",
      countries: ["EST", "FIN", "IRL"],
      why: en ? "Similar population size (<6M) with world-leading digital governance — proof that small countries can compete at the highest level. Estonia's e-residency and Ireland's tech FDI are direct playbooks for CR."
             : "Tamaño de población similar (<6M) con gobernanza digital líder mundial — prueba de que países pequeños pueden competir al más alto nivel. La e-residencia de Estonia y la IED tech de Irlanda son hojas de ruta directas para CR."
    },
    {
      label: en ? "Manufacturing Competitors" : "Competidores Manufactura",
      color: "#f59e0b",
      countries: ["MYS", "IDN"],
      why: en ? "Similar sector profiles in electronics, medical devices, and light manufacturing. Competing for the same FDI in an era where AI-driven automation reshapes manufacturing location decisions."
             : "Perfiles sectoriales similares en electrónica, dispositivos médicos y manufactura ligera. Compitiendo por la misma IED en una era donde la automatización impulsada por AI redefine las decisiones de ubicación manufacturera."
    }
  ]
});

export const RADAR_RATIONALE = (en) => ({
  title: en ? "Why These Three Countries?" : "¿Por Qué Estos Tres Países?",
  countries: [
    { code: "CRI", why: en ? "Subject country — Costa Rica is the focus of this observatory. Its CAPI-CR composite score reveals specific strengths (digital infrastructure, energy) and gaps (regulation, security) that inform policy recommendations." : "País sujeto — Costa Rica es el foco de este observatorio. Su puntaje compuesto CAPI-CR revela fortalezas específicas (infraestructura digital, energía) y brechas (regulación, seguridad) que informan recomendaciones de política." },
    { code: "CHL", why: en ? "Best-in-class LATAM peer — Chile ranks #1 in Latin America for AI readiness (Oxford Insights 2024), has completed its UNESCO RAM assessment, and enacted South America's first comprehensive data protection reform. It represents the achievable benchmark for Costa Rica." : "Mejor par LATAM — Chile es #1 en América Latina en preparación AI (Oxford Insights 2024), completó su evaluación RAM UNESCO, y promulgó la primera reforma integral de protección de datos de Sudamérica. Representa el benchmark alcanzable para Costa Rica." },
    { code: "SGP", why: en ? "Global gold standard — Singapore ranks #1 globally in AI readiness, with binding AI governance frameworks (AICA), world-class talent pipeline, and $1B+ AI investment. It represents the aspirational target and provides proven policy models that small economies can adapt." : "Estándar de oro global — Singapur es #1 global en preparación AI, con marcos de gobernanza AI vinculantes (AICA), pipeline de talento de clase mundial, e inversión AI de $1B+. Representa el objetivo aspiracional y provee modelos de política probados que economías pequeñas pueden adaptar." }
  ]
});

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

// ── 6 DIMENSIONS (with full descriptions for context) ──
export const DM = {
  D1: {
    l: "Infraestructura Digital", e: "Digital Infrastructure", w: .20, co: TH.cy, ic: "◈",
    indicators: ["IT.NET.USER.ZS", "IT.NET.BBND.P2"],
    desc: "Mide la conectividad y penetración digital: porcentaje de usuarios de internet y suscripciones de banda ancha fija por cada 100 habitantes. Según el Banco Mundial, la infraestructura digital explica el 28.8% de la varianza en preparación AI para países de ingreso medio-alto (PIMA). Es la dimensión con mayor peso predictivo.",
    descEn: "Measures connectivity and digital penetration: internet users (%) and fixed broadband subscriptions per 100 inhabitants. According to the World Bank, digital infrastructure explains 28.8% of variance in AI readiness for upper-middle-income countries (UMICs). It is the dimension with the highest predictive weight.",
    interp: "Score ≥0.65 = infraestructura lista para despliegue AI. Score 0.40-0.64 = en riesgo, brechas en conectividad rural. Score <0.40 = déficit crítico. CR: ~87% internet, banda ancha moderada — puntaje típico 0.55-0.60.",
    interpEn: "Score ≥0.65 = infrastructure ready for AI deployment. Score 0.40-0.64 = at risk, rural connectivity gaps. Score <0.40 = critical deficit. CR: ~87% internet, moderate broadband — typical score 0.55-0.60."
  },
  D2: {
    l: "Capital Humano", e: "Human Capital", w: .20, co: TH.vi, ic: "◎",
    indicators: ["SE.TER.ENRR", "SE.XPD.TOTL.GD.ZS", "SL.UEM.TOTL.ZS"],
    desc: "Evalúa la capacidad del talento nacional para roles AI: matrícula universitaria (%), inversión educativa como porcentaje del PIB, y tasa de desempleo (invertida — mayor desempleo = peor score). Captura tanto la oferta de talento como la absorción del mercado laboral.",
    descEn: "Evaluates national talent capacity for AI roles: tertiary enrollment (%), education spending as % of GDP, and unemployment rate (inverted — higher unemployment = lower score). Captures both talent supply and labor market absorption.",
    interp: "CR: fortaleza en matrícula terciaria (~58%), inversión educativa ~6.7% PIB (alta para LATAM). Debilidad: desempleo ~11% presiona el score. INA no tiene certificación AI (brecha crítica de pipeline).",
    interpEn: "CR: strength in tertiary enrollment (~58%), education spending ~6.7% GDP (high for LATAM). Weakness: ~11% unemployment drags score. INA has zero AI certification tracks (critical pipeline gap)."
  },
  D3: {
    l: "Innovación", e: "Innovation", w: .15, co: TH.am, ic: "◇",
    indicators: ["GB.XPD.RSDV.GD.ZS", "TX.VAL.TECH.MF.ZS", "BX.KLT.DINV.WD.GD.ZS"],
    desc: "Mide la capacidad de innovación: gasto en I+D como porcentaje del PIB, exportaciones de alta tecnología como porcentaje de manufactura, e inversión extranjera directa como porcentaje del PIB. Refleja el ecosistema de innovación y atracción de inversión tecnológica.",
    descEn: "Measures innovation capacity: R&D spending as % of GDP, high-tech exports as % of manufacturing, and FDI as % of GDP. Reflects the innovation ecosystem and ability to attract technology investment.",
    interp: "CR: I+D solo 0.4% PIB (vs 4.8% Corea del Sur), pero IED/PIB alta (~6.2%) gracias a zonas francas. Exportaciones hi-tech moderadas. Puntaje se beneficia de IED pero limitado por baja inversión en I+D.",
    interpEn: "CR: R&D only 0.4% GDP (vs 4.8% South Korea), but FDI/GDP high (~6.2%) thanks to free zones. Moderate hi-tech exports. Score benefits from FDI but limited by low R&D investment."
  },
  D4: {
    l: "Regulación AI", e: "AI Regulation", w: .15, co: TH.rd, ic: "⬡",
    indicators: ["curated"],
    desc: "Puntaje curado basado en análisis del marco legal AI: existencia de ley vinculante, autoridad reguladora designada, evaluaciones de impacto algorítmico obligatorias, protecciones anti-discriminación, transparencia en despliegue AI, sandbox regulatorio. No proviene de indicadores del Banco Mundial sino de análisis legislativo comparado.",
    descEn: "Curated score based on AI legal framework analysis: existence of binding law, designated regulatory authority, mandatory algorithmic impact assessments, anti-discrimination protections, AI deployment transparency, regulatory sandbox. Does not come from World Bank indicators but from comparative legislative analysis.",
    interp: "CR score: 0.38 (déficit). Sin ley AI vinculante, sin autoridad designada, sin evaluaciones obligatorias. ENIA es solo estrategia (100/100 visión, pero 0/100 aplicación). Comparación: Singapur 0.85, Corea del Sur 0.75, Chile 0.58.",
    interpEn: "CR score: 0.38 (deficit). No binding AI law, no designated authority, no mandatory assessments. ENIA is strategy only (100/100 vision, but 0/100 enforcement). Comparison: Singapore 0.85, South Korea 0.75, Chile 0.58."
  },
  D5: {
    l: "Energía Sostenible", e: "Sustainable Energy", w: .15, co: TH.gn, ic: "⚡",
    indicators: ["EG.ELC.ACCS.ZS", "EG.ELC.RNWX.ZS", "EG.USE.ELEC.KH.PC"],
    desc: "Mide la ventaja energética para AI: acceso a electricidad (%), porcentaje de electricidad renovable, y consumo eléctrico per cápita (proxy para capacidad de data centers). La energía es crucial para AI — los modelos AI consumen 4,600x más energía que software tradicional (WEF 2026).",
    descEn: "Measures energy advantage for AI: electricity access (%), renewable electricity share (%), and electric consumption per capita (proxy for data center capacity). Energy is crucial for AI — AI models consume 4,600x more energy than traditional software (WEF 2026).",
    interp: "CR: 99.5% acceso electricidad, ~99% renovable (fortaleza competitiva única). Pero consumo per cápita bajo indica capacidad limitada de data centers. Ventaja verde para ESG-conscious investors.",
    interpEn: "CR: 99.5% electricity access, ~99% renewable (unique competitive strength). But low per capita consumption indicates limited data center capacity. Green advantage for ESG-conscious investors."
  },
  D6: {
    l: "Seguridad Digital", e: "Digital Security", w: .15, co: TH.pk, ic: "⬢",
    indicators: ["curated"],
    desc: "Puntaje curado de capacidad de ciberseguridad: madurez del centro de operaciones de seguridad (SOC), cumplimiento con estándares internacionales, historial de incidentes, inversión en ciberseguridad post-incidentes, capacidad de respuesta, preparación cuántica. Integra datos de WEF Global Cybersecurity Outlook, OWASP, y evaluación nacional.",
    descEn: "Curated cybersecurity capacity score: security operations center (SOC) maturity, compliance with international standards, incident history, post-incident cybersecurity investment, response capacity, quantum readiness. Integrates data from WEF Global Cybersecurity Outlook, OWASP, and national assessment.",
    interp: "CR score: 0.40 (en riesgo). Ataque Conti 2022 expuso 30 instituciones (672GB datos). Post-Conti: inversión $35M+, SOC-CR con IBM 24/7. Mejorando pero aún vulnerable. Solo 5% organizaciones tienen cifrado cuántico-seguro (WEF).",
    interpEn: "CR score: 0.40 (at risk). Conti attack 2022 exposed 30 institutions (672GB data). Post-Conti: $35M+ investment, SOC-CR with IBM 24/7. Improving but still vulnerable. Only 5% of organizations have quantum-safe encryption (WEF)."
  }
};

// ── TABS WITH SVG ICONS (13 tabs — emoji replaced with icon string names) ──
export const TABS = [
  { id: "home", l: "Inicio", le: "Home", ic: "home", c: TH.cy },
  { id: "media", l: "Medios", le: "Media", ic: "video", c: TH.pk },
  { id: "idx", l: "Índice", le: "Index", ic: "chart", c: TH.vi },
  { id: "cmp", l: "Comparar", le: "Compare", ic: "compare", c: TH.pk },
  { id: "countries", l: "Países", le: "Countries", ic: "globe", c: TH.gn },
  { id: "sim", l: "Simulador", le: "Simulator", ic: "target", c: TH.am },
  { id: "zf", l: "Zonas Francas", le: "Free Trade Zones", ic: "factory", c: TH.am },
  { id: "pai", l: "Physical AI", le: "Physical AI", ic: "robot", c: TH.pk },
  { id: "algo", l: "Algoritmos", le: "Algorithms", ic: "algo", c: TH.vi },
  { id: "sec", l: "Seguridad", le: "Security", ic: "shield", c: TH.rd },
  { id: "leg", l: "Legislación", le: "Legislation", ic: "legal", c: TH.or },
  { id: "edu", l: "Educación", le: "Education", ic: "edu", c: TH.gn },
  { id: "glos", l: "Glosario", le: "Glossary", ic: "book", c: TH.cy },
  { id: "about", l: "Info", le: "About", ic: "info", c: TH.vi },
  { id: "pymes", l: "PYMES", le: "SMEs", ic: "store", c: TH.or },
  { id: "banca", l: "Banca & AI", le: "Banking & AI", ic: "bank", c: TH.am },
  /* ── IMPACT SECTORAL (AI for Good Report) ── */
  { id: "health", l: "Salud & AI", le: "Health & AI", ic: "heart", c: TH.pk },
  { id: "food", l: "Seguridad Alimentaria", le: "Food Security", ic: "wheat", c: TH.gn },
  /* ── IMPACT GROUP (UN/ITU/SDG) ── */
  { id: "governance", l: "Gobernanza Global", le: "Global Regulation", ic: "legal", c: TH.or },
  { id: "climate", l: "Medio Ambiente", le: "Environment", ic: "leaf", c: TH.gn },
  { id: "infra", l: "Infraestructura", le: "Infrastructure", ic: "city", c: TH.cy },
  { id: "readiness", l: "Preparación AI", le: "AI Readiness", ic: "chart", c: TH.cy },
  { id: "showcase", l: "Vitrina Impacto", le: "Impact Showcase", ic: "star", c: TH.gd },
  { id: "sdg", l: "Objetivos ONU", le: "UN Goals (SDGs)", ic: "globe", c: TH.gn },
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
// TRADE SECRET PROTECTION: Formulas (f) and weights (w) removed from public display.
// Safe methodology disclosures provided instead: method, inputs, validation.
export const ALGOS = (en) => [
  { nm: "CAPI-CR", full: en ? "Colibrii AI Preparedness Index" : "Índice de Preparación AI Colibrii", c: TH.cy, st: en ? "● ACTIVE" : "● ACTIVO", desc: en ? "Extends IMF AIPI from 4→6 dimensions (adding Energy + Security). 20 countries, 11 World Bank live indicators + 2 curated. Most critical UMIC pillar: digital infrastructure (28.8% of variance, World Bank)." : "Extiende AIPI del FMI de 4→6 dimensiones (+Energía +Seguridad). 20 países, 11 indicadores BM en vivo + 2 curados. Pilar más crítico PIMA: infraestructura digital (28.8% varianza, BM).", method: en ? "Weighted composite across 6 dimensions using min-max normalized World Bank indicators. Extends IMF AIPI methodology with Energy and Security pillars." : "Compuesto ponderado de 6 dimensiones usando indicadores Banco Mundial normalizados min-max. Extiende metodología AIPI del FMI con pilares Energía y Seguridad.", inputs: en ? "11 WB indicators + 2 curated dimensions (AI Regulation, Digital Security)" : "11 indicadores BM + 2 dimensiones curadas (Regulación AI, Seguridad Digital)", validation: en ? "Benchmarked against IMF AIPI, Oxford Insights GAIR, WB Beyond the AI Divide" : "Comparado con IMF AIPI, Oxford Insights GAIR, BM Beyond the AI Divide", sr: "World Bank API, IMF AIPI, Oxford Insights, OWASP, ITU" },
  { nm: "IVAS", full: en ? "AI Sector Vulnerability Index" : "Índice de Vulnerabilidad AI por Sector", c: TH.rd, st: en ? "◐ DEV" : "◐ DESARROLLO", desc: en ? "Maps CR free zone sectors against automation risk. Task decomposition (WEF) × AI adoption speed × regulatory readiness × labor cost ratio. 0-100 score per sector. No existing index at this country-sector intersection." : "Mapea sectores ZF contra riesgo de automatización. Descomposición tareas (WEF) × velocidad adopción AI × preparación regulatoria × ratio costo laboral. Score 0-100 por sector.", method: en ? "Multi-factor scoring combining task automation potential, adoption speed curves, regulatory readiness gap, and labor cost ratios per sector." : "Scoring multi-factor combinando potencial de automatización de tareas, curvas de velocidad de adopción, brecha de preparación regulatoria y ratios de costo laboral por sector.", inputs: en ? "WEF task decomposition data, sector wages (BCCR), PROCOMER FZ statistics" : "Datos descomposición tareas WEF, salarios sector (BCCR), estadísticas ZF PROCOMER", validation: en ? "Cross-validated with WEF Future of Jobs 2025 automation estimates" : "Validación cruzada con estimaciones automatización WEF Future of Jobs 2025", sr: "PROCOMER, WEF Future of Jobs 2025, IMF, IFR, BCCR", pv: [{ s: en ? "Call centers" : "Call centers", v: 85, c: TH.rd }, { s: en ? "Digital services" : "Servicios digitales", v: 78, c: TH.rd }, { s: en ? "Electronics" : "Electrónica", v: 62, c: TH.or }, { s: en ? "Medical devices" : "Dispositivos médicos", v: 45, c: TH.am }, { s: en ? "Engineering" : "Ingeniería", v: 35, c: TH.gn }] },
  { nm: "TIPAI", full: en ? "Physical AI Timeline Predictor" : "Predictor Timeline Physical AI", c: TH.pk, st: en ? "◐ DEV" : "◐ DESARROLLO", desc: en ? "Models WHEN each FZ sector faces Physical AI disruption. Inputs: humanoid cost trajectory, sector wages, task complexity, adoption precedents. Accounts for robot multi-shift advantage (2-3x)." : "Modela CUÁNDO cada sector ZF enfrenta disrupción Physical AI. Inputs: trayectoria costo humanoides, salarios sector, complejidad tareas, precedentes adopción. Robot trabaja 2-3x turnos.", method: en ? "Cost-crossover modeling using humanoid cost trajectory curves against sector wage levels, adjusted for task complexity and historical adoption precedents." : "Modelado de cruce de costos usando curvas de trayectoria de costo de humanoides contra niveles salariales por sector, ajustado por complejidad de tareas y precedentes históricos de adopción.", inputs: en ? "Humanoid unit cost projections (Goldman Sachs, IFR), CR sector wages (BCCR), task complexity scores" : "Proyecciones costo unitario humanoides (Goldman Sachs, IFR), salarios sector CR (BCCR), scores complejidad tareas", validation: en ? "Cross-referenced with Goldman Sachs and Bank of America humanoid deployment timelines" : "Referenciado cruzado con líneas temporales de despliegue humanoides de Goldman Sachs y Bank of America", sr: "Goldman Sachs, Bank of America, IFR, BCCR, Deloitte" },
  { nm: "MBR", full: en ? "Regulatory Gap Monitor" : "Monitor Brecha Regulatoria", c: TH.or, st: en ? "○ PLANNED" : "○ PLANIFICADO", desc: en ? "Measures how fast the gap grows between what AI can do and what CR regulates. Tech velocity vs. legislative response vs. enterprise adoption. Like a speedometer showing tech accelerating while governance idles." : "Mide qué tan rápido crece la brecha entre lo que la AI puede hacer y lo que CR regula. Velocidad tech vs. respuesta legislativa vs. adopción empresarial.", method: en ? "Ratio analysis of technology capability velocity against legislative response speed, weighted by enterprise adoption rates." : "Análisis de ratio de velocidad de capacidad tecnológica contra velocidad de respuesta legislativa, ponderado por tasas de adopción empresarial.", inputs: en ? "AI capability milestones, CR legislative timeline, enterprise adoption surveys" : "Hitos capacidad AI, línea temporal legislativa CR, encuestas adopción empresarial", validation: en ? "Calibrated against OECD AI Policy Observatory timeline data" : "Calibrado contra datos de línea temporal del Observatorio Política AI de la OCDE", sr: "OECD.AI, IAPP, MICITT, Asamblea Legislativa" },
  { nm: "IPDM", full: en ? "AI Impact & Displacement Monitor" : "Monitor Impacto y Desplazamiento AI", c: TH.vi, st: en ? "○ PLANNED" : "○ PLANIFICADO", desc: en ? "Real-time signals of AI workforce changes: job postings requiring AI (LinkedIn), FZ threshold changes (PROCOMER), university enrollment, INA certifications. Early-warning of displacement pressure vs. readiness." : "Señales en tiempo real de cambios laborales: ofertas requiriendo AI (LinkedIn), cambios umbrales ZF (PROCOMER), matrícula universitaria, certificaciones INA.", method: en ? "Multi-signal aggregation weighting displacement indicators against readiness capacity measures for early-warning detection." : "Agregación multi-señal ponderando indicadores de desplazamiento contra medidas de capacidad de preparación para detección temprana.", inputs: en ? "Job postings (LinkedIn), FZ employment data (PROCOMER), university enrollment (CONARE), INA certifications" : "Ofertas empleo (LinkedIn), datos empleo ZF (PROCOMER), matrícula universitaria (CONARE), certificaciones INA", validation: en ? "Tested against ILO workforce transition models and WEF displacement projections" : "Probado contra modelos de transición laboral OIT y proyecciones de desplazamiento WEF", sr: "LinkedIn, CompuTrabajo, PROCOMER, INA, CONARE" },
  { nm: "CRES", full: en ? "Costa Rica Energy-Security Nexus" : "Nexo Energía-Seguridad Costa Rica", c: TH.gn, st: en ? "○ PLANNED" : "○ PLANIFICADO", desc: en ? "Measures how CR's 99% renewable energy advantage translates to AI competitiveness. Combines renewable share, grid reliability, data center readiness, and energy cost per kWh into a composite score showing CR's green AI positioning." : "Mide cómo la ventaja de 99% energía renovable de CR se traduce en competitividad AI. Combina participación renovable, confiabilidad de red, preparación para data centers y costo energético por kWh.", method: en ? "Composite scoring of renewable energy advantage factors normalized against peer countries, producing a green AI competitiveness score." : "Scoring compuesto de factores de ventaja energética renovable normalizados contra países pares, produciendo un score de competitividad AI verde.", inputs: en ? "Renewable energy share (ICE), grid reliability metrics (ARESEP), data center capacity, energy costs per kWh" : "Participación energía renovable (ICE), métricas confiabilidad red (ARESEP), capacidad data centers, costos energéticos por kWh", validation: en ? "Benchmarked against IEA energy competitiveness indices" : "Comparado con índices de competitividad energética de la IEA", sr: "ICE, ARESEP, IEA, BCCR" },
  { nm: "FDIA", full: en ? "Foreign Direct Investment AI Alignment" : "Alineación IED con AI", c: TH.am, st: en ? "○ PLANNED" : "○ PLANIFICADO", desc: en ? "Tracks whether incoming FDI is AI-aligned vs AI-vulnerable. Scores each sector by AI alignment: medical devices (high), digital services (medium — shifting), manufacturing (low), semiconductors (very high). Reveals whether CR's FDI portfolio is future-proof." : "Rastrea si la IED entrante está alineada con AI vs vulnerable a AI. Puntúa cada sector por alineación AI: dispositivos médicos (alto), servicios digitales (medio — cambiando), manufactura (bajo), semiconductores (muy alto).", method: en ? "Sector-weighted scoring of FDI flows against AI alignment classifications, revealing portfolio future-proofing." : "Scoring ponderado por sector de flujos IED contra clasificaciones de alineación AI, revelando resiliencia futura del portafolio.", inputs: en ? "FDI sector flows (CINDE, PROCOMER), AI alignment classifications per industry" : "Flujos IED por sector (CINDE, PROCOMER), clasificaciones alineación AI por industria", validation: en ? "Validated against UNCTAD FDI digital intensity rankings" : "Validado contra rankings de intensidad digital IED de la UNCTAD", sr: "CINDE, PROCOMER, BCCR" },
  { nm: "QVRI", full: en ? "Quantum Vulnerability & Readiness Index" : "Índice Vulnerabilidad y Preparación Cuántica", c: "#2563eb", st: en ? "○ PLANNED" : "○ PLANIFICADO", desc: en ? "Measures CR's exposure to quantum cryptographic threats vs. preparedness. WEF 2026: 53% of quantum experts give 50%+ chance of breaking RSA-2048 within a decade. Only 5% of organizations have quantum-safe encryption. CR's CCSS health data, banking sector, and free zone IP are all at risk from 'harvest now, decrypt later' campaigns." : "Mide exposición de CR a amenazas criptográficas cuánticas vs. preparación. WEF 2026: 53% de expertos cuánticos dan 50%+ probabilidad de romper RSA-2048 en una década. Solo 5% de organizaciones tienen cifrado cuántico-seguro. Datos CCSS, sector bancario, e IP de zonas francas de CR están en riesgo por campañas 'cosechar ahora, descifrar después'.", method: en ? "Exposure-readiness ratio comparing cryptographic threat surface against post-quantum cryptography adoption progress." : "Ratio exposición-preparación comparando superficie de amenaza criptográfica contra progreso de adopción de criptografía post-cuántica.", inputs: en ? "Institutional crypto audit data, PQC adoption surveys, data sensitivity classifications" : "Datos auditoría cripto institucional, encuestas adopción PQC, clasificaciones sensibilidad datos", validation: en ? "Referenced against IBM Quantum Safe Readiness Index and NIST PQC standards" : "Referenciado contra Índice IBM Quantum Safe Readiness y estándares NIST PQC", sr: "WEF 2026, IBM Quantum Safe Index, NIST PQC, MICITT" },
  { nm: "SIRI", full: en ? "Societal Impact & Resilience Index" : "Índice de Impacto Social y Resiliencia", c: "#ec4899", st: en ? "○ PLANNED" : "○ PLANIFICADO", desc: en ? "Tracks the societal strain from AI-driven disruption. WEF 2026: AI could create K-shaped economies where productivity rises alongside unemployment. 86% of companies expect AI transformation by 2030. Monitors labor displacement velocity, reskilling capacity, social safety net strength, youth unemployment, and societal polarization. Designed to detect early signals of 'white-collar rust belt' formation." : "Rastrea la tensión social de la disrupción AI. WEF 2026: AI podría crear economías en forma de K donde productividad sube junto con desempleo. 86% de empresas esperan transformación AI para 2030. Monitorea velocidad de desplazamiento laboral, capacidad de recapacitación, fortaleza de red de seguridad social, desempleo juvenil y polarización social.", method: en ? "Strain-resilience ratio tracking displacement velocity against reskilling capacity and social safety net strength to detect K-shaped divergence." : "Ratio tensión-resiliencia rastreando velocidad de desplazamiento contra capacidad de recapacitación y fortaleza de red de seguridad social para detectar divergencia en K.", inputs: en ? "Labor market signals (ILO, INEC), reskilling capacity (INA, MEP), social safety net data (IMAS)" : "Señales mercado laboral (OIT, INEC), capacidad recapacitación (INA, MEP), datos red seguridad social (IMAS)", validation: en ? "Calibrated against WEF 2026 K-shaped economy projections and ILO displacement models" : "Calibrado contra proyecciones economía K del WEF 2026 y modelos de desplazamiento OIT", sr: "WEF 2026, ILO, INEC, INA, MEP, IMAS" },
  { nm: "GERI", full: en ? "Geoeconomic Exposure & Resilience Index" : "Índice Exposición y Resiliencia Geoeconómica", c: "#f97316", st: en ? "○ PLANNED" : "○ PLANIFICADO", desc: en ? "Quantifies CR's vulnerability to geoeconomic fragmentation — WEF 2026's #1 immediate risk. Measures trade dependency concentration, FDI source diversification, supply chain vulnerability to sanctions/tariffs, and nearshoring resilience. US-China chip wars directly affect CR semiconductor FZ operations." : "Cuantifica la vulnerabilidad de CR a la fragmentación geoeconómica — riesgo inmediato #1 del WEF 2026. Mide concentración de dependencia comercial, diversificación de fuentes IED, vulnerabilidad de cadena de suministro a sanciones/aranceles y resiliencia nearshoring. Guerras de chips EEUU-China afectan directamente operaciones semiconductores ZF de CR.", method: en ? "Multi-factor concentration-diversification analysis of trade and investment flows, stress-tested against sanction and tariff scenarios." : "Análisis multi-factor de concentración-diversificación de flujos comerciales e inversión, probados contra escenarios de sanciones y aranceles.", inputs: en ? "Trade flows (PROCOMER, COMEX), FDI sources (CINDE), supply chain dependency data (WTO)" : "Flujos comerciales (PROCOMER, COMEX), fuentes IED (CINDE), datos dependencia cadena suministro (OMC)", validation: en ? "Stress-tested against WEF 2026 geoeconomic fragmentation scenarios" : "Probado contra escenarios de fragmentación geoeconómica del WEF 2026", sr: "WEF 2026, PROCOMER, COMEX, CINDE, WTO" }
];

// ── INDICATOR METADATA (for IndicatorDrawer stat cards) ──
export const INDICATOR_META = {
  colibrii_index: {
    name: "Colibrii AI Preparedness Index", nameEs: "Índice de Preparación AI Colibrii",
    definition: "Composite index measuring AI readiness across 6 dimensions for 20 peer countries. Extends IMF AIPI methodology by adding Energy and Security pillars.",
    definitionEs: "Índice compuesto que mide la preparación AI en 6 dimensiones para 20 países pares. Extiende la metodología AIPI del FMI agregando pilares de Energía y Seguridad.",
    source: "Colibrii Labs / World Bank API (11 indicators)",
    interpretation: "Score 0-1 where 1 is full readiness. Costa Rica typically scores 0.41-0.43, placing it in the 'At Risk' tier but above LATAM average.",
    interpretationEs: "Puntaje 0-1 donde 1 es preparación total. Costa Rica típicamente puntúa 0.41-0.43, ubicándose en el nivel 'En Riesgo' pero sobre el promedio LATAM.",
    lastUpdated: "2024 (World Bank latest available)"
  },
  global_rank: {
    name: "Global Rank", nameEs: "Ranking Global",
    definition: "Costa Rica's position in the CAPI-CR 20-country leaderboard, ranked by composite score.",
    definitionEs: "Posición de Costa Rica en la tabla de 20 países del CAPI-CR, clasificada por puntaje compuesto.",
    source: "Colibrii Labs CAPI-CR Index",
    interpretation: "Lower is better. CR typically ranks 11-13 out of 20, outperforming most LATAM peers but trailing Asian overperformers.",
    interpretationEs: "Menor es mejor. CR típicamente se ubica 11-13 de 20, superando a la mayoría de pares LATAM pero detrás de sobreperformantes asiáticos.",
    lastUpdated: "2024"
  },
  ai_exposure: {
    name: "AI Job Exposure", nameEs: "Exposición Laboral AI",
    definition: "Percentage of the workforce with high exposure to AI automation, per IMF analysis.",
    definitionEs: "Porcentaje de la fuerza laboral con alta exposición a la automatización AI, según análisis del FMI.",
    source: "IMF Gen-AI: Artificial Intelligence and the Future of Work (2024)",
    interpretation: "40% of global jobs are exposed to AI. In advanced economies it's 60%. CR's free zone BPO sector faces highest disruption risk.",
    interpretationEs: "40% de los empleos globales están expuestos a AI. En economías avanzadas es 60%. El sector BPO de zonas francas de CR enfrenta mayor riesgo de disrupción.",
    lastUpdated: "January 2024"
  },
  ai_risk: {
    name: "AI Risk Ranking (WEF)", nameEs: "Riesgo AI (WEF)",
    definition: "Position of 'AI adverse outcomes' in the WEF Global Risks Report 2026 long-term severity ranking.",
    definitionEs: "Posición de 'resultados adversos de AI' en el ranking de severidad a largo plazo del Reporte de Riesgos Globales WEF 2026.",
    source: "WEF Global Risks Report 2026 (GRPS, 1,300 experts)",
    interpretation: "AI adverse outcomes jumped from #30 to #5 in just one year — the largest jump of any risk. Severity score: 5.28/7.0.",
    interpretationEs: "Resultados adversos de AI saltaron del #30 al #5 en solo un año — el mayor salto de cualquier riesgo. Severidad: 5.28/7.0.",
    lastUpdated: "January 2026"
  },
  fz_companies: {
    name: "Free Zone Companies", nameEs: "Empresas Zonas Francas",
    definition: "Total number of active companies operating under Costa Rica's free zone (Zona Franca) regime.",
    definitionEs: "Número total de empresas activas operando bajo el régimen de Zonas Francas de Costa Rica.",
    source: "PROCOMER / CINDE 2024",
    interpretation: "626 companies representing $8.9B in exports. Key sectors: medical devices, digital services, electronics. 49% of total exports.",
    interpretationEs: "626 empresas representando $8.9B en exportaciones. Sectores clave: dispositivos médicos, servicios digitales, electrónica. 49% de exportaciones totales.",
    lastUpdated: "2024"
  },
  fdi: {
    name: "Foreign Direct Investment", nameEs: "Inversión Extranjera Directa",
    definition: "Annual FDI inflows to Costa Rica in billions of US dollars.",
    definitionEs: "Flujos anuales de IED hacia Costa Rica en miles de millones de dólares.",
    source: "CINDE / Central Bank (BCCR) 2024",
    interpretation: "CR attracts ~$4.3B annually, one of the highest FDI/GDP ratios in LATAM. US is #1 source. Semiconductor and medical device investment growing.",
    interpretationEs: "CR atrae ~$4.3B anualmente, uno de los mayores ratios IED/PIB en LATAM. EEUU es fuente #1. Inversión en semiconductores y dispositivos médicos en crecimiento.",
    lastUpdated: "2024"
  }
};

// ── 55 GLOSSARY TERMS (28 v12 + 12 v13 + 7 WEF-deep + 6 v9.5 + 2 EOS/GRPS) ──
export const GLOSSARY = (en) => [
  { t: "Physical AI", c: en ? "Trend" : "Tendencia", def: en ? "AI operating in the physical world — robots that perceive, learn, and adapt in real-time." : "AI que opera en el mundo físico — robots que perciben, aprenden y se adaptan en tiempo real.", ctx: en ? "Humanoid costs dropping to $15K by 2028. CR labor crossover projected 2028-2030." : "Costos humanoides bajando a $15K para 2028. Cruce económico con CR proyectado 2028-2030.", deep: en ? "Humanoid timeline: Tesla Optimus external sales 2026, Figure BotQ factory 12K-100K units/yr. Goldman Sachs projects $38B humanoid market by 2035, unit cost falling from $150K (2024) to $30-50K (2028) to $15K (2030+). Multi-shift advantage: robots work 20-22 hrs/day vs 8 hrs human = 2.5-3x effective labor. CR implications: manufacturing FZ (electronics, medical devices) face 2028-2030 crossover; agriculture 2030-2033; logistics 2027-2029. Key vendors: Tesla, Figure, Agility Robotics (Digit), Boston Dynamics (Atlas), Unitree. CR should establish Physical AI monitoring unit under MICITT." : "Línea temporal humanoides: Tesla Optimus ventas externas 2026, fábrica Figure BotQ 12K-100K unidades/año. Goldman Sachs proyecta mercado humanoides $38B para 2035, costo unitario bajando de $150K (2024) a $30-50K (2028) a $15K (2030+). Ventaja multi-turno: robots trabajan 20-22 hrs/día vs 8 hrs humano = 2.5-3x labor efectiva. Implicaciones CR: ZF manufactura (electrónica, dispositivos médicos) enfrentan cruce 2028-2030; agricultura 2030-2033; logística 2027-2029. Proveedores clave: Tesla, Figure, Agility Robotics (Digit), Boston Dynamics (Atlas), Unitree. CR debería establecer unidad de monitoreo Physical AI bajo MICITT." },
  { t: "Vibe Coding", c: en ? "Trend" : "Tendencia", def: en ? "Describing what you want in natural language and AI generates the code. Collins Word of Year 2025." : "Describir lo que quieres en lenguaje natural y AI genera código. Palabra del Año Collins 2025.", ctx: en ? "92% of developers use AI coding tools. 41% of code is AI-generated. Democratizes software creation." : "92% de desarrolladores usan herramientas AI de código. 41% del código es generado por AI." },
  { t: "LLM", c: en ? "Technical" : "Técnico", def: en ? "Large Language Model. Foundation AI like GPT-4, Claude, Gemini. Cost: $10M-$500M+ to train." : "Modelo de Lenguaje Grande. AI fundacional como GPT-4, Claude, Gemini. Costo: $10M-$500M+.", ctx: en ? "CR should NOT build LLMs — should use them and regulate deployment. 87% of models come from high-income countries." : "CR NO debe construir LLMs — debe usarlos y regular su despliegue. 87% de modelos vienen de países de ingreso alto." },
  { t: "Prompt Injection", c: en ? "Security" : "Seguridad", def: en ? "Attack manipulating AI instructions via malicious user input. OWASP LLM Top 10 #1." : "Ataque que manipula instrucciones AI via input malicioso. OWASP LLM Top 10 #1.", ctx: en ? "Government chatbots without protection could expose citizen data. Mandatory security testing needed." : "Chatbots gubernamentales sin protección podrían exponer datos ciudadanos.", deep: en ? "OWASP classifies two types: (1) Direct injection — user crafts malicious prompts to override system instructions ('ignore previous instructions and...'); (2) Indirect injection — malicious content embedded in external data sources (websites, documents, emails) that the LLM processes. Defense strategies: input sanitization, system prompt hardening, output filtering, privilege separation (least-privilege tool access), canary tokens, LLM-as-judge guardrails, and adversarial red-teaming. OWASP LLM Top 10 2025 ranks it #1. Separate OWASP Top 10 for Agentic AI (2026) introduces new vectors: tool poisoning, rug pulls, and cascading hallucinations. CR government AI deployments MUST implement defense-in-depth: no single mitigation is sufficient." : "OWASP clasifica dos tipos: (1) Inyección directa — usuario crea prompts maliciosos para sobrepasar instrucciones del sistema ('ignora instrucciones anteriores y...'); (2) Inyección indirecta — contenido malicioso embebido en fuentes de datos externas (sitios web, documentos, correos) que el LLM procesa. Estrategias de defensa: sanitización de entrada, endurecimiento de system prompt, filtrado de salida, separación de privilegios, tokens canario, guardarraíles LLM-as-judge, y red-teaming adversario. OWASP LLM Top 10 2025 lo ranquea #1. OWASP Top 10 separado para AI Agéntica (2026) introduce nuevos vectores: envenenamiento de herramientas, rug pulls y alucinaciones en cascada. Despliegues AI de gobierno CR DEBEN implementar defensa en profundidad: ninguna mitigación individual es suficiente." },
  { t: "Shadow AI", c: en ? "Security" : "Seguridad", def: en ? "Unauthorized use of AI tools by employees without policies, creating data leakage risks." : "Uso no autorizado de herramientas AI por empleados sin políticas, creando riesgos de fuga de datos.", ctx: en ? "Officials uploading citizen data to ChatGPT = data leak. Every ministry needs a Shadow AI policy." : "Funcionarios subiendo datos a ChatGPT = fuga de datos. Cada ministerio necesita política Shadow AI.", deep: en ? "Detection methods: (1) Network monitoring — track API calls to known AI endpoints (api.openai.com, claude.ai, gemini.google.com); (2) DLP (Data Loss Prevention) integration — flag sensitive data patterns in outbound AI requests; (3) Browser extension audits — inventory AI extensions across corporate devices; (4) SSO/OAuth logs — detect unauthorized AI tool sign-ups with corporate credentials; (5) Endpoint monitoring — track AI desktop app installations. Corporate risk: data leakage (training data retention), compliance violations (GDPR, HIPAA), intellectual property exposure, inconsistent outputs without governance. Gartner estimates 75% of enterprises will face Shadow AI incidents by 2027. CR government action needed: mandatory AI usage policy for all ministries, approved AI tool whitelist, quarterly Shadow AI audits, anonymous reporting mechanism." : "Métodos de detección: (1) Monitoreo de red — rastrear llamadas API a endpoints AI conocidos (api.openai.com, claude.ai, gemini.google.com); (2) Integración DLP (Prevención Pérdida de Datos) — marcar patrones datos sensibles en solicitudes AI salientes; (3) Auditorías extensiones navegador — inventariar extensiones AI en dispositivos corporativos; (4) Logs SSO/OAuth — detectar registros no autorizados en herramientas AI con credenciales corporativas; (5) Monitoreo endpoints — rastrear instalaciones de apps AI de escritorio. Riesgo corporativo: fuga de datos (retención datos entrenamiento), violaciones cumplimiento (GDPR, HIPAA), exposición propiedad intelectual, resultados inconsistentes sin gobernanza. Gartner estima 75% empresas enfrentarán incidentes Shadow AI para 2027. Acción gobierno CR necesaria: política uso AI obligatoria para todos ministerios, lista blanca herramientas AI aprobadas, auditorías trimestrales Shadow AI, mecanismo reporte anónimo." },
  { t: "RAG", c: en ? "Technical" : "Técnico", def: en ? "Retrieval-Augmented Generation. Connects LLM to databases for accurate, current information." : "Generación Aumentada por Recuperación. Conecta LLM a bases de datos para información precisa y actual.", ctx: en ? "Enables AI that queries CR legislation, BCCR rates, CCSS records accurately. Critical for government AI." : "Permite AI que consulta legislación CR, tasas BCCR, registros CCSS con precisión." },
  { t: "AI Agent", c: en ? "Technical" : "Técnico", def: en ? "AI system that acts autonomously: browses web, executes code, makes decisions without human intervention." : "Sistema AI que actúa autónomamente: navega web, ejecuta código, toma decisiones sin intervención humana.", ctx: en ? "An AI agent costs $0.50-5/hr vs CR employee at $5-25/hr. IMF estimates 40% jobs exposed." : "Un agente AI cuesta $0.50-5/hr vs empleado CR a $5-25/hr. FMI estima 40% empleos expuestos." },
  { t: "Deepfake", c: en ? "Security" : "Seguridad", def: en ? "AI-generated synthetic video/audio/images imitating real people. Production cost: <$10." : "Video/audio/imágenes sintéticas generadas por AI que imitan personas reales. Costo: <$10.", ctx: en ? "WEF: misinformation is #1 global risk. CR elections 2026 face deepfake risk. No legal framework exists." : "WEF: desinformación es riesgo #1. Elecciones CR 2026 con riesgo deepfake. Sin marco legal." },
  { t: "EU AI Act", c: en ? "Legislation" : "Legislación", def: en ? "World's first comprehensive AI law (2024). 4 risk tiers. Penalties up to €35M or 7% global turnover." : "Primera ley AI integral del mundo (2024). 4 niveles de riesgo. Multas hasta €35M o 7% facturación global.", ctx: en ? "CR companies exporting AI services to Europe MUST comply. Reference framework for developing countries." : "Empresas CR exportando servicios AI a Europa DEBEN cumplir. Marco de referencia para países en desarrollo.", deep: en ? "The 4 risk tiers: (1) UNACCEPTABLE — 8 banned practices including social scoring, subliminal manipulation, real-time remote biometric identification, emotion recognition in workplace/education, untargeted facial scraping, predictive policing based solely on profiling; penalties: up to EUR 35M or 7% global turnover. (2) HIGH-RISK — AI in healthcare, employment, education, law enforcement, migration, critical infrastructure; requires conformity assessments, human oversight, transparency, data governance, robustness testing; must register in EU database. (3) LIMITED RISK — transparency obligations: chatbots must disclose AI nature, deepfakes must be labeled, emotion recognition must inform subjects. (4) MINIMAL RISK — no obligations (spam filters, AI in video games). What CR needs to know: FZ companies exporting AI services to EU clients fall under extraterritorial scope. PRODHAB should map to EU supervisory authority role. Timeline: prohibited practices ban Feb 2025, GPAI obligations Aug 2025, full enforcement Aug 2026." : "Los 4 niveles de riesgo: (1) INACEPTABLE — 8 prácticas prohibidas incluyendo scoring social, manipulación subliminal, identificación biométrica remota en tiempo real, reconocimiento emociones en trabajo/educación, scraping facial no dirigido, policía predictiva basada solo en perfilado; multas: hasta EUR 35M o 7% facturación global. (2) ALTO RIESGO — AI en salud, empleo, educación, aplicación de ley, migración, infraestructura crítica; requiere evaluaciones conformidad, supervisión humana, transparencia, gobernanza datos, pruebas robustez; debe registrarse en base datos EU. (3) RIESGO LIMITADO — obligaciones transparencia: chatbots deben revelar naturaleza AI, deepfakes deben etiquetarse, reconocimiento emociones debe informar sujetos. (4) RIESGO MÍNIMO — sin obligaciones (filtros spam, AI en videojuegos). Lo que CR necesita saber: empresas ZF exportando servicios AI a clientes EU caen bajo alcance extraterritorial. PRODHAB debería mapearse al rol de autoridad supervisora EU. Línea temporal: prohibición prácticas inaceptables Feb 2025, obligaciones GPAI Ago 2025, aplicación completa Ago 2026." },
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
  { t: "ENIA", c: en ? "Policy" : "Política", def: en ? "Estrategia Nacional de Inteligencia Artificial. Costa Rica's national AI strategy (MICITT, Oct 2024). First Central American country with national AI strategy. 7 pillars: ethics, territorial development, talent, infrastructure, innovation, smart government, international leadership. Aligned with UNESCO AI Ethics Recommendation. BUT: NO binding law, NO authority, NO mandatory transparency. Score: 0.38/1.0." : "Estrategia Nacional de Inteligencia Artificial de Costa Rica (MICITT, Oct 2024). Primer país centroamericano con estrategia nacional AI. 7 pilares: ética, desarrollo territorial, talento, infraestructura, innovación, gobierno inteligente, liderazgo internacional. Alineada con Recomendación UNESCO de Ética AI. PERO: SIN ley vinculante, SIN autoridad, SIN transparencia obligatoria. Score: 0.38/1.0.", ctx: en ? "Oxford Insights scored CR 100/100 on AI Vision. But ENIA is non-binding — the critical gap is moving to enforceable law." : "Oxford Insights dio a CR 100/100 en Visión AI. Pero ENIA no es vinculante — la brecha crítica es pasar a ley aplicable.", deep: en ? "The 5 core pillars and implementation gaps: (1) ETHICS & HUMAN RIGHTS — aligned with UNESCO AI Ethics Recommendation, but NO enforcement mechanism, no algorithmic impact assessments required, no anti-discrimination provisions; (2) TALENT & EDUCATION — calls for AI literacy but INA has zero AI certification tracks, university AI programs limited to UCR and TEC, no K-12 AI curriculum; (3) DIGITAL INFRASTRUCTURE — acknowledges 99% renewable energy advantage and broadband expansion needs, but no data center strategy, no sovereign cloud policy, no GPU access plan; (4) INNOVATION & ENTREPRENEURSHIP — references free zone ecosystem but no AI-specific incentives, no startup funding mechanism, no regulatory sandbox; (5) SMART GOVERNMENT — envisions AI in public services but no procurement standards, no transparency requirements, no citizen recourse mechanisms. Key gap: ENIA scored 100/100 on Oxford Insights AI Vision but only 0.38/1.0 on CAPI-CR composite — illustrating the strategy-execution divide. Needs binding legislation within 12 months to convert vision to action." : "Los 5 pilares centrales y brechas de implementación: (1) ÉTICA Y DERECHOS HUMANOS — alineado con Recomendación UNESCO Ética AI, pero SIN mecanismo de aplicación, sin evaluaciones impacto algorítmico requeridas, sin provisiones anti-discriminación; (2) TALENTO Y EDUCACIÓN — pide alfabetización AI pero INA tiene cero tracks de certificación AI, programas AI universitarios limitados a UCR y TEC, sin currículo AI K-12; (3) INFRAESTRUCTURA DIGITAL — reconoce ventaja 99% energía renovable y necesidades expansión banda ancha, pero sin estrategia data centers, sin política nube soberana, sin plan acceso GPU; (4) INNOVACIÓN Y EMPRENDIMIENTO — referencia ecosistema zonas francas pero sin incentivos AI específicos, sin mecanismo financiamiento startups, sin sandbox regulatorio; (5) GOBIERNO INTELIGENTE — envision AI en servicios públicos pero sin estándares adquisiciones, sin requisitos transparencia, sin mecanismos recurso ciudadano. Brecha clave: ENIA obtuvo 100/100 en Oxford Insights AI Vision pero solo 0.38/1.0 en compuesto CAPI-CR — ilustrando la brecha estrategia-ejecución. Necesita legislación vinculante en 12 meses para convertir visión en acción." },
  { t: "CAPI-CR", c: "Colibrii", def: en ? "Colibrii AI Preparedness Index. Proprietary 6-dimension index extending the IMF AIPI for Costa Rica." : "Índice de Preparación AI Colibrii. Índice propietario de 6 dimensiones que extiende el AIPI del FMI para CR.", ctx: en ? "Uses 11 real-time World Bank indicators + 2 curated dimensions. Evaluates 20 peer countries. Active on this portal." : "Usa 11 indicadores Banco Mundial en tiempo real + 2 dimensiones curadas. Evalúa 20 países pares. Activo en este portal." },
  { t: "IVAS", c: "Colibrii", def: en ? "AI Sector Vulnerability Index. Maps CR free zone sectors against automation risk by task decomposition." : "Índice de Vulnerabilidad AI por Sector. Mapea sectores ZF de CR contra riesgo de automatización por descomposición de tareas.", ctx: en ? "In development. Preview: call centers 85/100 (critical), digital services 78 (high), medical devices 45 (medium)." : "En desarrollo. Preview: call centers 85/100 (crítico), servicios digitales 78 (alto), dispositivos médicos 45 (medio)." },
  // 6 NEW glossary terms from v9.5 spec (terms 29-34)
  { t: "Token", c: en ? "Technical" : "Técnico", def: en ? "Fundamental unit of text in LLMs. A word is 1-3 tokens. GPT-4o: $2.50/$10 per 1M. Claude Sonnet: $3/$15 per 1M." : "Unidad fundamental de texto en LLMs. Una palabra es 1-3 tokens. GPT-4o: $2.50/$10 por 1M. Claude Sonnet: $3/$15 por 1M.", ctx: en ? "Token economics drive CR's AI cost equation. Support agent ~$15/hr; AI agent ~$0.50-5/hr. 10-30x difference = why 28K BPO jobs at risk." : "La economía de tokens define la ecuación de costos AI de CR. Agente soporte ~$15/hr; agente AI ~$0.50-5/hr. Diferencia 10-30x = por qué 28K empleos BPO en riesgo.", deep: en ? "Tokenization is how LLMs process text. Most modern models use BPE (Byte Pair Encoding) or SentencePiece: text is split into subword units based on frequency in training data. Common words become single tokens; rare words split into multiple pieces. 'Costa Rica' = 2-3 tokens; 'inteligencia artificial' = 3-4 tokens. Context windows define how many tokens a model can process at once: GPT-4o = 128K tokens (~300 pages), Claude 3.5 = 200K tokens (~500 pages), Gemini 1.5 Pro = 2M tokens. Pricing is per-million tokens (input/output): GPT-4o $2.50/$10, Claude Sonnet $3/$15, DeepSeek R1 $0.55/$2.19. For CR BPO cost analysis: a typical customer service interaction = 1,000-3,000 tokens = $0.003-$0.045 per interaction vs human agent at $2-5/interaction. This 50-1000x cost advantage is why 28K BPO jobs face existential pressure." : "La tokenización es cómo los LLMs procesan texto. La mayoría de modelos modernos usan BPE (Byte Pair Encoding) o SentencePiece: el texto se divide en unidades subpalabra basadas en frecuencia en datos de entrenamiento. Palabras comunes se vuelven tokens únicos; palabras raras se dividen en múltiples piezas. 'Costa Rica' = 2-3 tokens; 'inteligencia artificial' = 3-4 tokens. Ventanas de contexto definen cuántos tokens un modelo puede procesar a la vez: GPT-4o = 128K tokens (~300 páginas), Claude 3.5 = 200K tokens (~500 páginas), Gemini 1.5 Pro = 2M tokens. Precios por millón de tokens (entrada/salida): GPT-4o $2.50/$10, Claude Sonnet $3/$15, DeepSeek R1 $0.55/$2.19. Para análisis de costos BPO de CR: una interacción típica de servicio al cliente = 1,000-3,000 tokens = $0.003-$0.045 por interacción vs agente humano a $2-5/interacción. Esta ventaja de costo 50-1000x es por qué 28K empleos BPO enfrentan presión existencial." },
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
  { t: "GRPS", c: "WEF", def: en ? "Global Risks Perception Survey. WEF's 1,300-expert survey feeding the Global Risks Report. Respondents: 38% business, 24% academia, 13% civil society, 10% government, 10% international organizations." : "Encuesta de Percepción de Riesgos Globales. Encuesta de 1,300 expertos del WEF que alimenta el Reporte de Riesgos Globales. Respondentes: 38% empresa, 24% academia, 13% sociedad civil, 10% gobierno, 10% organizaciones internacionales.", ctx: en ? "Understanding GRPS vs EOS matters: GRPS experts rank AI #5 long-term, but CR's EOS business leaders don't list AI at all. The expert-practitioner perception gap is a key observatory finding." : "Entender GRPS vs EOS importa: expertos GRPS ranquean AI #5 largo plazo, pero líderes empresariales EOS de CR ni lo listan. La brecha de percepción experto-practicante es hallazgo clave del observatorio." },
  // ── 30 NEW glossary terms from AI for Good Impact Report integration (terms 56-85) ──
  // FOUNDATIONAL (9 terms)
  { t: en ? "Algorithm" : "Algoritmo", c: en ? "Technical" : "Técnico", def: en ? "A step-by-step set of instructions for solving a problem or performing a computation. The foundation of all AI systems." : "Conjunto de instrucciones paso a paso para resolver un problema o realizar un cálculo. La base de todos los sistemas AI.", ctx: en ? "Every AI system CR deploys — from CCSS patient triage to customs risk scoring — executes algorithms. Understanding this is step one for AI literacy." : "Todo sistema AI que CR despliega — desde triaje CCSS hasta scoring de riesgo aduanero — ejecuta algoritmos. Entender esto es paso uno para la alfabetización AI." },
  { t: "Machine Learning (ML)", c: en ? "Technical" : "Técnico", def: en ? "A subset of AI where systems learn patterns from data without being explicitly programmed for each task. The most practical AI approach today." : "Subconjunto de AI donde sistemas aprenden patrones de datos sin ser programados explícitamente. El enfoque AI más práctico hoy.", ctx: en ? "ML is the most deployable AI approach for CR government and SMEs: predictive maintenance (ICE), crop yield forecasting (MAG), fraud detection (Hacienda)." : "ML es el enfoque AI más desplegable para gobierno y PYMES de CR: mantenimiento predictivo (ICE), pronóstico cosechas (MAG), detección fraude (Hacienda)." },
  { t: "Deep Learning", c: en ? "Technical" : "Técnico", def: en ? "A subset of machine learning using multi-layered neural networks to learn complex patterns. Powers image recognition, speech processing, and language models." : "Subconjunto de machine learning que usa redes neuronales multicapa para aprender patrones complejos. Impulsa reconocimiento de imágenes, voz y modelos de lenguaje.", ctx: en ? "Deep learning powers medical imaging (CCSS radiology), agricultural pest detection (MAG), and speech recognition for bilingual government chatbots." : "Deep learning impulsa imagenología médica (radiología CCSS), detección plagas agrícolas (MAG) y reconocimiento de voz para chatbots gubernamentales bilingües." },
  { t: en ? "Neural Network" : "Red Neuronal", c: en ? "Technical" : "Técnico", def: en ? "Computing architecture inspired by the human brain, using interconnected nodes (neurons) organized in layers to process information." : "Arquitectura de computación inspirada en el cerebro humano, usando nodos interconectados (neuronas) organizados en capas para procesar información.", ctx: en ? "Neural networks are the basis of AI systems transforming CR free zones — from quality control in medical device manufacturing to automated customer service." : "Las redes neuronales son la base de sistemas AI que transforman zonas francas CR — desde control de calidad en manufactura de dispositivos médicos hasta servicio al cliente automatizado." },
  { t: en ? "Natural Language Processing (NLP)" : "Procesamiento de Lenguaje Natural (PLN)", c: en ? "Technical" : "Técnico", def: en ? "AI field enabling computers to understand, interpret, and generate human language. Powers chatbots, translation, sentiment analysis, and document processing." : "Campo AI que permite a computadoras entender, interpretar y generar lenguaje humano. Impulsa chatbots, traducción, análisis de sentimiento y procesamiento de documentos.", ctx: en ? "NLP enables bilingual (ES/EN) government chatbots, automatic legislative analysis, and citizen sentiment monitoring — all critical for CR's smart government vision." : "PLN permite chatbots gubernamentales bilingües (ES/EN), análisis legislativo automático y monitoreo de sentimiento ciudadano — críticos para la visión de gobierno inteligente de CR." },
  { t: en ? "Generative AI (GenAI)" : "AI Generativa (GenAI)", c: en ? "Technical" : "Técnico", def: en ? "AI systems that create new content — text, images, code, audio, video — rather than just analyzing existing data. Includes GPT, Claude, DALL-E, Midjourney." : "Sistemas AI que crean nuevo contenido — texto, imágenes, código, audio, video — en lugar de solo analizar datos existentes. Incluye GPT, Claude, DALL-E, Midjourney.", ctx: en ? "41% of code is now AI-generated. GenAI directly impacts CR's developer workforce in free zones and could either amplify or displace 28K BPO workers." : "41% del código ahora es generado por AI. GenAI impacta directamente la fuerza laboral desarrolladora de CR en zonas francas y podría amplificar o desplazar 28K trabajadores BPO." },
  { t: "GPU", c: en ? "Technical" : "Técnico", def: en ? "Graphics Processing Unit. Specialized chip essential for AI training and inference. NVIDIA dominates with 80%+ market share. A single H100 costs ~$30K." : "Unidad de Procesamiento Gráfico. Chip especializado esencial para entrenamiento e inferencia AI. NVIDIA domina con 80%+ de cuota de mercado. Un H100 cuesta ~$30K.", ctx: en ? "CR has zero domestic GPU infrastructure — 100% dependent on US cloud providers (AWS, Azure, GCP). This is a sovereignty vulnerability highlighted by the AI for Good report." : "CR tiene cero infraestructura GPU doméstica — 100% dependiente de proveedores cloud de EEUU (AWS, Azure, GCP). Vulnerabilidad de soberanía destacada por el reporte AI for Good." },
  { t: en ? "Model" : "Modelo", c: en ? "Technical" : "Técnico", def: en ? "A trained AI system that has learned patterns from data and can make predictions or generate outputs. Models range from simple classifiers to large language models." : "Sistema AI entrenado que ha aprendido patrones de datos y puede hacer predicciones o generar resultados. Los modelos van desde clasificadores simples hasta grandes modelos de lenguaje.", ctx: en ? "87% of AI models come from high-income countries. CR should focus on deploying and fine-tuning existing models, not building foundation models from scratch." : "87% de modelos AI vienen de países de ingreso alto. CR debería enfocarse en desplegar y ajustar modelos existentes, no construir modelos fundacionales desde cero." },
  { t: en ? "Training Data" : "Datos de Entrenamiento", c: en ? "Technical" : "Técnico", def: en ? "The datasets used to teach AI models patterns, relationships, and behaviors. Data quality directly determines AI quality — garbage in, garbage out." : "Los datasets usados para enseñar a modelos AI patrones, relaciones y comportamientos. La calidad de datos determina directamente la calidad AI.", ctx: en ? "CR's EDUS health records (8+ years, entire population) + CCSS operational data = the largest structured dataset in Central America. A strategic AI asset if properly governed." : "Los registros EDUS de CR (8+ años, toda la población) + datos operativos CCSS = el mayor dataset estructurado de Centroamérica. Activo estratégico AI si se gobierna adecuadamente." },
  // ADVANCED / POLICY-RELEVANT (21 terms)
  { t: en ? "AI Literacy" : "Alfabetización AI", c: en ? "Ethics" : "Ética", def: en ? "The knowledge and skills needed to understand, evaluate, and critically engage with AI systems. Essential for citizens, policymakers, and workers." : "Conocimientos y habilidades necesarios para entender, evaluar e interactuar críticamente con sistemas AI. Esencial para ciudadanos, formuladores de políticas y trabajadores.", ctx: en ? "INA (National Learning Institute) has zero AI certification tracks. Only UCR and TEC offer AI programs. 250M children globally are out of school — AI literacy is an equity issue." : "INA no tiene tracks de certificación AI. Solo UCR y TEC ofrecen programas AI. 250M niños globalmente fuera de la escuela — alfabetización AI es tema de equidad." },
  { t: en ? "AI Life Cycle" : "Ciclo de Vida AI", c: en ? "Standards" : "Estándares", def: en ? "The complete process from AI system conception through design, development, deployment, monitoring, and eventual retirement. ISO/IEC 22989 defines the standard." : "Proceso completo desde la concepción del sistema AI a través de diseño, desarrollo, despliegue, monitoreo y eventual retiro. ISO/IEC 22989 define el estándar.", ctx: en ? "ENIA lacks a lifecycle governance framework. Without mandatory lifecycle management, CR government AI deployments risk becoming unmaintained liabilities." : "ENIA carece de marco de gobernanza del ciclo de vida. Sin gestión obligatoria del ciclo de vida, despliegues AI de gobierno CR arriesgan volverse pasivos sin mantenimiento." },
  { t: en ? "Artificial General Intelligence (AGI)" : "Inteligencia Artificial General (AGI)", c: en ? "Technical" : "Técnico", def: en ? "Theoretical AI with human-level cognitive abilities across all domains — reasoning, learning, creativity, social intelligence. Does not yet exist." : "AI teórica con capacidades cognitivas a nivel humano en todos los dominios — razonamiento, aprendizaje, creatividad, inteligencia social. Aún no existe.", ctx: en ? "AGI is not imminent, but CR policy must prepare for rapid capability jumps. Each new model generation (GPT-3→4→5) shows unpredictable emergent abilities." : "AGI no es inminente, pero la política CR debe prepararse para saltos rápidos de capacidad. Cada nueva generación de modelos muestra habilidades emergentes impredecibles." },
  { t: en ? "Bias in AI" : "Sesgo en AI", c: en ? "Ethics" : "Ética", def: en ? "Systematic errors in AI outputs that unfairly advantage or disadvantage specific groups. Arises from biased training data, flawed design, or unrepresentative samples." : "Errores sistemáticos en resultados AI que favorecen o perjudican injustamente a grupos específicos. Surge de datos sesgados, diseño defectuoso o muestras no representativas.", ctx: en ? "CR census and health data gaps (indigenous communities, rural areas) risk producing biased government AI. The AI for Good report emphasizes co-design with affected communities." : "Brechas en datos censales y de salud de CR (comunidades indígenas, áreas rurales) arriesgan producir AI gubernamental sesgada. El reporte enfatiza co-diseño con comunidades afectadas." },
  { t: "Compute", c: en ? "Technical" : "Técnico", def: en ? "The computing power (processing capacity, memory, energy) required to train and run AI systems. Measured in FLOPs. AI compute doubles every 6-10 months." : "Poder de cómputo (capacidad procesamiento, memoria, energía) requerido para entrenar y ejecutar sistemas AI. Medido en FLOPs. Compute AI se duplica cada 6-10 meses.", ctx: en ? "CR has zero domestic AI compute infrastructure. 100% cloud-dependent on US hyperscalers. The AI for Good report identifies compute access as a critical divide between nations." : "CR tiene cero infraestructura compute AI doméstica. 100% dependiente de hyperscalers EEUU. El reporte identifica acceso a compute como una brecha crítica entre naciones." },
  { t: en ? "Conformity Assessment" : "Evaluación de Conformidad", c: en ? "Standards" : "Estándares", def: en ? "The process of verifying that an AI system meets regulatory and technical standards before deployment. Required under the EU AI Act for high-risk AI." : "Proceso de verificar que un sistema AI cumple estándares regulatorios y técnicos antes del despliegue. Requerido bajo EU AI Act para AI de alto riesgo.", ctx: en ? "CR companies exporting AI services to Europe must prepare for conformity assessments. ECA (Ente Costarricense de Acreditación) could develop AI assessment capacity." : "Empresas CR exportando servicios AI a Europa deben prepararse para evaluaciones de conformidad. ECA podría desarrollar capacidad de evaluación AI." },
  { t: "Constitutional AI", c: en ? "Technical" : "Técnico", def: en ? "An AI training approach (Anthropic, 2022) where the model is guided by a written set of principles rather than relying solely on human feedback. An alternative to RLHF." : "Enfoque de entrenamiento AI (Anthropic, 2022) donde el modelo es guiado por un conjunto escrito de principios en lugar de depender solo de retroalimentación humana. Alternativa a RLHF.", ctx: en ? "Constitutional AI demonstrates that safety can be built into AI training. Relevant for CR policymakers evaluating which AI systems to procure for government use." : "Constitutional AI demuestra que la seguridad puede integrarse en el entrenamiento AI. Relevante para formuladores CR evaluando qué sistemas AI adquirir para uso gubernamental." },
  { t: en ? "Content Authenticity" : "Autenticidad de Contenido", c: en ? "Security" : "Seguridad", def: en ? "Technologies (watermarks, metadata, cryptographic signatures) that prove content origin and detect AI-generated media. C2PA is the leading standard." : "Tecnologías (marcas de agua, metadatos, firmas criptográficas) que prueban origen de contenido y detectan medios generados por AI. C2PA es el estándar líder.", ctx: en ? "Critical for CR's 2026 elections — deepfake detection capability is urgent. TSE (Supreme Electoral Tribunal) needs content authenticity verification tools." : "Crítico para elecciones CR 2026 — capacidad de detección deepfake es urgente. TSE necesita herramientas de verificación de autenticidad de contenido." },
  { t: en ? "Data Privacy" : "Privacidad de Datos", c: en ? "Ethics" : "Ética", def: en ? "The right to control how personal information is collected, used, and shared. AI systems process massive personal data, creating new privacy challenges." : "Derecho a controlar cómo se recopila, usa y comparte información personal. Sistemas AI procesan datos personales masivos, creando nuevos desafíos de privacidad.", ctx: en ? "PRODHAB (CR Data Protection Agency) has a data protection mandate but no AI-specific regulatory capacity. As AI scales, the privacy-utility tension intensifies." : "PRODHAB tiene mandato de protección de datos pero no capacidad regulatoria AI específica. A medida que AI escala, la tensión privacidad-utilidad se intensifica." },
  { t: en ? "Differential Privacy" : "Privacidad Diferencial", c: en ? "Technical" : "Técnico", def: en ? "A mathematical technique that adds calibrated noise to data analysis results, protecting individual identity while preserving aggregate statistical accuracy." : "Técnica matemática que añade ruido calibrado a resultados de análisis de datos, protegiendo identidad individual mientras preserva precisión estadística agregada.", ctx: en ? "Enables CCSS/EDUS AI research without exposing individual patient data. Apple, Google, and the US Census use differential privacy — CR should adopt it for health AI." : "Permite investigación AI CCSS/EDUS sin exponer datos individuales de pacientes. Apple, Google y el Censo de EEUU usan privacidad diferencial — CR debería adoptarla para AI en salud." },
  { t: en ? "Digital Public Infrastructure (DPI)" : "Infraestructura Pública Digital (DPI)", c: en ? "Policy" : "Política", def: en ? "Shared digital systems and platforms that serve as public goods — digital identity, payments, data exchange. India's Aadhaar and UPI are leading examples." : "Sistemas y plataformas digitales compartidas que sirven como bienes públicos — identidad digital, pagos, intercambio de datos. Aadhaar y UPI de India son ejemplos líderes.", ctx: en ? "CR's SINPE payment system is a successful DPI (interbank transfers, SINPE Móvil). The next step is an AI-enabled DPI layer for smart government services." : "El sistema SINPE de CR es una DPI exitosa (transferencias interbancarias, SINPE Móvil). El siguiente paso es una capa DPI habilitada por AI para servicios de gobierno inteligente." },
  { t: en ? "Emergent Capabilities" : "Capacidades Emergentes", c: en ? "Technical" : "Técnico", def: en ? "Unexpected abilities that appear in AI models at certain scales of training — not explicitly programmed. GPT-4 passed the bar exam without being trained for it." : "Habilidades inesperadas que aparecen en modelos AI a ciertas escalas de entrenamiento — no programadas explícitamente. GPT-4 aprobó el examen legal sin ser entrenado para ello.", ctx: en ? "Emergent capabilities make AI governance challenging — regulators cannot predict what the next model will be able to do. CR legal professionals should assess implications." : "Las capacidades emergentes hacen desafiante la gobernanza AI — reguladores no pueden predecir qué podrá hacer el próximo modelo. Profesionales legales CR deben evaluar implicaciones." },
  { t: en ? "Ethical AI" : "AI Ética", c: en ? "Ethics" : "Ética", def: en ? "AI development and deployment that respects human rights, fairness, transparency, accountability, and environmental sustainability. UNESCO adopted recommendations in 2021." : "Desarrollo y despliegue de AI que respeta derechos humanos, equidad, transparencia, rendición de cuentas y sostenibilidad ambiental. UNESCO adoptó recomendaciones en 2021.", ctx: en ? "ENIA pillar 1 covers ethics aligned with UNESCO, but has no enforcement mechanism. Without binding obligations, ethical AI in CR remains aspirational." : "El pilar 1 de ENIA cubre ética alineada con UNESCO, pero no tiene mecanismo de cumplimiento. Sin obligaciones vinculantes, AI ética en CR permanece aspiracional." },
  { t: "Guardrails", c: en ? "Security" : "Seguridad", def: en ? "Safety mechanisms that constrain AI system behavior within acceptable boundaries — input validation, output filtering, content policies, and behavioral limits." : "Mecanismos de seguridad que restringen el comportamiento de sistemas AI dentro de límites aceptables — validación de entrada, filtrado de salida, políticas de contenido y límites conductuales.", ctx: en ? "Every CR government AI deployment needs input/output guardrails. Without them, chatbots can be manipulated to reveal sensitive data or generate harmful content." : "Todo despliegue AI de gobierno CR necesita guardarraíles de entrada/salida. Sin ellos, chatbots pueden ser manipulados para revelar datos sensibles o generar contenido dañino." },
  { t: "Human-in-the-Loop", c: en ? "Ethics" : "Ética", def: en ? "A design pattern ensuring humans oversee, validate, or approve AI decisions before they take effect. Critical for high-stakes applications." : "Patrón de diseño que asegura que humanos supervisen, validen o aprueben decisiones AI antes de que surtan efecto. Crítico para aplicaciones de alto impacto.", ctx: en ? "Mandatory for CR healthcare (CCSS diagnostics), judicial assistance, and social benefit allocation. The EU AI Act requires it for all high-risk AI systems." : "Obligatorio para salud CR (diagnósticos CCSS), asistencia judicial y asignación de beneficios sociales. EU AI Act lo requiere para todos los sistemas AI de alto riesgo." },
  { t: en ? "Interoperability" : "Interoperabilidad", c: en ? "Standards" : "Estándares", def: en ? "The ability of different AI systems, databases, and platforms to exchange and use information seamlessly. Requires common standards and APIs." : "Capacidad de diferentes sistemas AI, bases de datos y plataformas para intercambiar y usar información sin problemas. Requiere estándares y APIs comunes.", ctx: en ? "CR government data silos (CCSS, AyA, ICE, MEP) need interoperable standards. Without them, AI cannot deliver cross-institutional insights for smart governance." : "Silos de datos del gobierno CR (CCSS, AyA, ICE, MEP) necesitan estándares interoperables. Sin ellos, AI no puede entregar insights inter-institucionales para gobernanza inteligente." },
  { t: en ? "Open-weight Models" : "Modelos de Pesos Abiertos", c: en ? "Technical" : "Técnico", def: en ? "AI models whose trained parameters (weights) are publicly released, allowing anyone to use, fine-tune, and deploy them. Examples: Llama, Mistral, Falcon." : "Modelos AI cuyos parámetros entrenados (pesos) se publican, permitiendo a cualquiera usarlos, ajustarlos y desplegarlos. Ejemplos: Llama, Mistral, Falcon.", ctx: en ? "Open-weight models allow CR to fine-tune without licensing fees — critical for a country that cannot afford proprietary model contracts at government scale." : "Los modelos de pesos abiertos permiten a CR ajustar sin costos de licencia — crítico para un país que no puede pagar contratos de modelos propietarios a escala gubernamental." },
  { t: "Quantum AI", c: en ? "Technical" : "Técnico", def: en ? "The intersection of quantum computing and AI. Quantum computers could exponentially accelerate certain AI computations but also break current encryption." : "La intersección de computación cuántica y AI. Computadoras cuánticas podrían acelerar exponencialmente ciertos cálculos AI pero también romper cifrado actual.", ctx: en ? "Long-term opportunity, but the immediate threat is real: 'Harvest Now, Decrypt Later' attacks mean adversaries may already be collecting CR government encrypted data." : "Oportunidad a largo plazo, pero la amenaza inmediata es real: ataques 'Cosechar Ahora, Descifrar Después' significan que adversarios podrían ya estar recolectando datos cifrados del gobierno CR." },
  { t: "Red Teaming", c: en ? "Security" : "Seguridad", def: en ? "Systematically testing AI systems for vulnerabilities, dangerous behaviors, and failure modes through adversarial simulation. OWASP recommends for all production AI." : "Prueba sistemática de sistemas AI para vulnerabilidades, comportamientos peligrosos y modos de fallo mediante simulación adversaria. OWASP recomienda para toda AI en producción.", ctx: en ? "CR has no AI red team capacity. OWASP recommends red teaming for all government AI deployments. UCR/TEC cybersecurity programs should add AI red teaming tracks." : "CR no tiene capacidad de red teaming AI. OWASP recomienda red teaming para todos los despliegues AI de gobierno. Programas de ciberseguridad UCR/TEC deberían añadir tracks de red teaming AI." },
  { t: en ? "Sovereign AI" : "AI Soberana", c: en ? "Policy" : "Política", def: en ? "A nation's ability to develop, deploy, and govern AI systems using domestically controlled infrastructure, data, and talent — without foreign dependency." : "Capacidad de una nación de desarrollar, desplegar y gobernar sistemas AI usando infraestructura, datos y talento controlados domésticamente — sin dependencia extranjera.", ctx: en ? "CR is 100% dependent on US hyperscalers (AWS, Azure, GCP) for AI compute. No domestic GPU clusters, no sovereign cloud, no local foundation models. A strategic vulnerability." : "CR es 100% dependiente de hyperscalers EEUU (AWS, Azure, GCP) para compute AI. Sin clusters GPU domésticos, sin nube soberana, sin modelos fundacionales locales. Vulnerabilidad estratégica." },
  { t: en ? "Watermarking" : "Marca de Agua", c: en ? "Security" : "Seguridad", def: en ? "Invisible signals embedded in AI-generated content (text, images, audio, video) enabling detection and attribution. C2PA is the leading technical standard." : "Señales invisibles incrustadas en contenido generado por AI (texto, imágenes, audio, video) que permiten detección y atribución. C2PA es el estándar técnico líder.", ctx: en ? "Essential for combating election deepfakes in CR 2026. The EU AI Act mandates watermarking for AI-generated content. TSE should require it for campaign media." : "Esencial para combatir deepfakes electorales en CR 2026. EU AI Act exige marca de agua para contenido generado por AI. TSE debería requerirla para medios de campaña." }
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
  { date: "Jan 2025", t: "WEF Risks 2025", d: en ? "AI risk jumps #31→#6. Misinfo #1 again." : "Riesgo AI salta #31→#6. Desinfo #1 otra vez.", cr: en ? "CR 2026 elections faced deepfake risks" : "Elecciones CR 2026 enfrentaron riesgos deepfake", c: TH.rd },
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
    strengths: [
      en ? "#1 AI readiness globally (Oxford Insights)" : "#1 preparación AI global (Oxford Insights)",
      en ? "$1B+ government AI investment committed" : "$1B+ inversión gubernamental AI comprometida",
      en ? "AI Governance Framework — world's first voluntary framework" : "Marco Gobernanza AI — primer marco voluntario del mundo",
      en ? "Strong talent pipeline from NUS, NTU, SUTD" : "Fuerte pipeline de talento desde NUS, NTU, SUTD"
    ],
    weaknesses: [
      en ? "Small domestic market requires export orientation" : "Mercado doméstico pequeño requiere orientación exportadora",
      en ? "High cost of living limits talent retention" : "Alto costo de vida limita retención de talento",
      en ? "Limited freedom of press (FH: 47/100) affects AI ethics discourse" : "Libertad de prensa limitada (FH: 47/100) afecta discurso ética AI"
    ],
    learn: [
      en ? "Governance-first approach: framework before law, building trust" : "Enfoque gobernanza primero: marco antes de ley, construyendo confianza",
      en ? "Public-private AI training programs at scale" : "Programas de capacitación AI público-privados a escala",
      en ? "Small country can punch above its weight with strategic focus" : "País pequeño puede superar su peso con enfoque estratégico"
    ]
  },
  KOR: {
    strategy: en ? "AI Framework Act (Jan 2026). Consolidated 19 bills. National AI Committee chaired by president." : "Ley Marco AI (Ene 2026). Consolidó 19 proyectos. Comité Nacional AI presidido por presidente.",
    institutions: en ? "National AI Committee, AI Safety Institute, MSIT" : "Comité Nacional AI, Instituto Seguridad AI, MSIT",
    strengths: [
      en ? "AI Framework Act: best 'regulate + promote' model globally" : "Ley Marco AI: mejor modelo 'regular + promover' globalmente",
      en ? "4.8% GDP spent on R&D (highest in world)" : "4.8% PIB gastado en I+D (más alto del mundo)",
      en ? "Samsung, LG, Hyundai driving corporate AI adoption" : "Samsung, LG, Hyundai impulsando adopción AI corporativa",
      en ? "AI Safety Institute with dedicated budget and staff" : "Instituto Seguridad AI con presupuesto y personal dedicado"
    ],
    weaknesses: [
      en ? "Aging population (birth rate 0.72) threatens talent pipeline" : "Población envejeciente (tasa natalidad 0.72) amenaza pipeline de talento",
      en ? "Geopolitical tensions with North Korea and China" : "Tensiones geopolíticas con Corea del Norte y China",
      en ? "AI in top 5 EOS business risks (awareness = anxiety)" : "AI en top 5 riesgos empresariales EOS (conciencia = ansiedad)"
    ],
    learn: [
      en ? "Combined regulate + promote in ONE law — ideal for CR" : "Combinó regular + promover en UNA ley — ideal para CR",
      en ? "AI Safety Institute achievable at small scale" : "Instituto Seguridad AI factible a escala pequeña",
      en ? "Foreign companies need local representative — good model" : "Empresas extranjeras necesitan representante local — buen modelo"
    ]
  },
  CHL: {
    strategy: en ? "AI Bill approved Chamber Aug 2025, in Senate. Modeled on EU AI Act. First country to complete UNESCO RAM." : "Proyecto AI aprobado Cámara Ago 2025, en Senado. Modelado en EU AI Act. Primer país en completar RAM UNESCO.",
    institutions: en ? "MinCiencia, AI Advisory Council, CORFO" : "MinCiencia, Consejo Consultivo AI, CORFO",
    strengths: [
      en ? "Most advanced AI legislation in LATAM (in Senate)" : "Legislación AI más avanzada en LATAM (en Senado)",
      en ? "First country to complete UNESCO RAM — strong evidence base" : "Primer país en completar RAM UNESCO — fuerte base de evidencia",
      en ? "Startup Chile program attracts international AI talent" : "Programa Startup Chile atrae talento AI internacional"
    ],
    weaknesses: [
      en ? "Political instability (constitutional process) slows legislation" : "Inestabilidad política (proceso constitucional) ralentiza legislación",
      en ? "Smaller FDI inflows compared to CR ($6.5B vs $4.3B similar GDP)" : "Menores flujos IED comparado con CR ($6.5B vs $4.3B PIB similar)",
      en ? "Digital divide between Santiago and regions" : "Brecha digital entre Santiago y regiones"
    ],
    learn: [
      en ? "Complete UNESCO RAM for credibility and evidence base" : "Completar RAM UNESCO para credibilidad y base de evidencia",
      en ? "Regional coordination through multilateral bodies" : "Coordinación regional a través de organismos multilaterales",
      en ? "CR's closest LATAM comparator — watch closely" : "Comparador LATAM más cercano de CR — observar de cerca"
    ]
  },
  EST: {
    strategy: en ? "AI strategy since 2019. Kratt AI for government services. e-Residency. X-Road data exchange." : "Estrategia AI desde 2019. Kratt AI para servicios gobierno. e-Residency. X-Road intercambio datos.",
    institutions: en ? "Ministry of Economic Affairs, e-Governance Academy, KEMIT" : "Ministerio Economía, e-Governance Academy, KEMIT",
    strengths: [
      en ? "#1 digital government worldwide — 99% of services online" : "#1 gobierno digital mundial — 99% de servicios en línea",
      en ? "X-Road interoperability: every institution connected" : "Interoperabilidad X-Road: toda institución conectada",
      en ? "e-Residency attracts global digital entrepreneurs" : "e-Residency atrae emprendedores digitales globales"
    ],
    weaknesses: [
      en ? "Small economy limits domestic AI market" : "Economía pequeña limita mercado AI doméstico",
      en ? "Geopolitical risk (proximity to Russia, NATO border)" : "Riesgo geopolítico (proximidad a Rusia, frontera OTAN)",
      en ? "Brain drain to Nordic countries for higher salaries" : "Fuga de cerebros a países nórdicos por mayores salarios"
    ],
    learn: [
      en ? "Digital government infrastructure enables AI deployment" : "Infraestructura gobierno digital habilita despliegue AI",
      en ? "Small country (1.3M) shows scale is not a barrier" : "País pequeño (1.3M) demuestra que escala no es barrera",
      en ? "X-Road interoperability model for CR institutions" : "Modelo interoperabilidad X-Road para instituciones CR"
    ]
  },
  FIN: {
    strategy: en ? "Elements of AI: 1% of population educated in AI. AuroraAI for government. Strong ethics focus." : "Elements of AI: 1% de población educada en AI. AuroraAI para gobierno. Fuerte enfoque ético.",
    institutions: en ? "Ministry of Economic Affairs, FCAI (Finnish Center for AI), Business Finland" : "Ministerio Economía, FCAI (Centro Finlandés AI), Business Finland",
    strengths: [
      en ? "1% of population completed AI training (Elements of AI)" : "1% de población completó capacitación AI (Elements of AI)",
      en ? "AuroraAI: government service personalization through AI" : "AuroraAI: personalización de servicios gubernamentales a través de AI",
      en ? "Nokia legacy: strong tech infrastructure and culture" : "Legado Nokia: fuerte infraestructura y cultura tech"
    ],
    weaknesses: [
      en ? "Small market limits commercial AI scale" : "Mercado pequeño limita escala AI comercial",
      en ? "Long, dark winters limit some agricultural AI applications" : "Inviernos largos y oscuros limitan algunas aplicaciones AI agrícolas",
      en ? "Economic slowdown and debt pressures" : "Desaceleración económica y presiones de deuda"
    ],
    learn: [
      en ? "Mass AI literacy is achievable — Elements of AI is FREE and in Spanish" : "Alfabetización AI masiva es factible — Elements of AI es GRATIS y en español",
      en ? "Ethics-first approach aligns with CR values" : "Enfoque ética primero se alinea con valores CR",
      en ? "AuroraAI model for government service personalization" : "Modelo AuroraAI para personalización servicios gobierno"
    ]
  },
  CRI: {
    strategy: en ? "National AI Strategy (ENIA) published Oct 2024 by MICITT. 7 pillars: ethics, territorial development, talent, infrastructure, innovation, smart government, international leadership. Oxford Insights: 100/100 AI Vision score. BUT: non-binding strategy only, no law, no AI authority, 0.38/1.0 regulation score. World Bank: AI Overperformer (1 of 7 UMICs globally)." : "Estrategia Nacional AI (ENIA) publicada Oct 2024 por MICITT. 7 pilares: ética, desarrollo territorial, talento, infraestructura, innovación, gobierno inteligente, liderazgo internacional. Oxford Insights: 100/100 Visión AI. PERO: solo estrategia no vinculante, sin ley, sin autoridad AI, 0.38/1.0 regulación. Banco Mundial: AI Overperformer (1 de 7 PIMA globalmente).",
    institutions: en ? "MICITT (Ministry of Science), PRODHAB (Data Protection), CCSS (Social Security), PROCOMER (Trade), CINDE (Investment), MEP (Education), INA (Technical Training), SUTEL (Telecom), BCCR (Central Bank), CONARE (Universities)" : "MICITT (Ministerio de Ciencia), PRODHAB (Protección de Datos), CCSS (Seguro Social), PROCOMER (Comercio), CINDE (Inversión), MEP (Educación), INA (Formación Técnica), SUTEL (Telecomunicaciones), BCCR (Banco Central), CONARE (Universidades)",
    strengths: [
      en ? "World Bank AI Overperformer — 1 of only 7 upper-middle-income countries globally" : "AI Overperformer del Banco Mundial — 1 de solo 7 países de ingreso medio-alto globalmente",
      en ? "99% renewable electricity — unique competitive advantage for green AI and data centers" : "99% electricidad renovable — ventaja competitiva única para AI verde y data centers",
      en ? "Record $4.3B FDI (2024), #3 Greenfield FDI Performance Index globally" : "Récord $4.3B IED (2024), #3 Índice de Desempeño IED Greenfield globalmente",
      en ? "OECD member since 2021 — regulatory credibility and institutional quality" : "Miembro OCDE desde 2021 — credibilidad regulatoria y calidad institucional",
      en ? "First AI curriculum in Central America (Intel AI For Youth in CTPs)" : "Primer currículo AI en Centroamérica (Intel AI For Youth en CTPs)",
      en ? "75+ years uninterrupted democracy, no army since 1948 — political stability" : "75+ años democracia ininterrumpida, sin ejército desde 1948 — estabilidad política",
      en ? "Bilingual talent pool (#1 English proficiency in Central America)" : "Pool talento bilingüe (#1 dominio inglés en Centroamérica)",
      en ? "CAFTA-DR trade access + US timezone alignment" : "Acceso comercial CAFTA-DR + alineación huso horario EEUU"
    ],
    weaknesses: [
      en ? "No binding AI law — 0.38/1.0 regulation score (largest strategy-execution gap in peer set)" : "Sin ley AI vinculante — 0.38/1.0 regulación (mayor brecha estrategia-ejecución en grupo de pares)",
      en ? "37-38% workforce exposed to AI automation (IMF) — highest in Latin America" : "37-38% fuerza laboral expuesta a automatización AI (FMI) — más alta en América Latina",
      en ? "Business leaders blind to AI risk — zero AI/tech in WEF EOS top 5 concerns" : "Líderes empresariales ciegos al riesgo AI — cero AI/tech en top 5 preocupaciones EOS WEF",
      en ? "INA: 13,000 IT graduates/year with zero AI certification tracks" : "INA: 13,000 graduados IT/año con cero tracks de certificación AI",
      en ? "Post-Conti cybersecurity rebuilding still in progress (30 institutions attacked 2022)" : "Reconstrucción ciberseguridad post-Conti aún en progreso (30 instituciones atacadas 2022)",
      en ? "R&D spending only 0.4% GDP (vs 4.8% South Korea, 2.2% OECD average)" : "Gasto I+D solo 0.4% PIB (vs 4.8% Corea del Sur, 2.2% promedio OCDE)",
      en ? "Brain drain: top AI talent emigrates for US/EU salaries" : "Fuga de cerebros: mejor talento AI emigra por salarios EEUU/UE"
    ],
    learn: [
      en ? "Key opportunity: first Central American country with binding AI law = competitive FDI advantage" : "Oportunidad clave: primer país centroamericano con ley AI vinculante = ventaja competitiva IED",
      en ? "Critical window: 12-18 months to convert ENIA vision (100/100) into enforceable legislation" : "Ventana crítica: 12-18 meses para convertir visión ENIA (100/100) en legislación aplicable",
      en ? "Model: South Korea's regulate+promote AI Framework Act adapted for small-country context" : "Modelo: Ley Marco AI regular+promover de Corea del Sur adaptada para contexto de país pequeño"
    ]
  },
  JPN: {
    strategy: en ? "AI Strategy 2025. Society 5.0 vision. $15B+ AI investment. Focus: aging population, productivity." : "Estrategia AI 2025. Visión Sociedad 5.0. $15B+ inversión AI. Enfoque: envejecimiento población, productividad.",
    institutions: en ? "METI, NEDO, RIKEN, AI Safety Institute (2024)" : "METI, NEDO, RIKEN, Instituto Seguridad AI (2024)",
    learn: [
      en ? "Robotics leader — Physical AI applications most advanced" : "Líder en robótica — aplicaciones Physical AI más avanzadas",
      en ? "AI addressing aging population challenges relevant to CR's demographic shift" : "AI abordando desafíos de envejecimiento poblacional relevante para cambio demográfico CR"
    ]
  },
  IRL: {
    strategy: en ? "AI Strategy 2021. €20B+ FDI host for Big Tech HQs (Google, Meta, Apple). Enterprise Ireland AI programs." : "Estrategia AI 2021. €20B+ anfitrión IED para sedes Big Tech (Google, Meta, Apple). Programas AI Enterprise Ireland.",
    institutions: en ? "Enterprise Ireland, IDA Ireland, SFI (Science Foundation)" : "Enterprise Ireland, IDA Ireland, SFI (Fundación Ciencia)",
    learn: [
      en ? "FDI attraction model for tech — similar small-country playbook to CR" : "Modelo atracción IED para tech — playbook de país pequeño similar a CR",
      en ? "Tax incentive structures that evolved from labor-intensive to knowledge-based" : "Estructuras incentivos fiscales que evolucionaron de intensivas en mano de obra a basadas en conocimiento"
    ]
  },
  URY: {
    strategy: en ? "National AI Strategy (2019). Plan Ceibal: laptop-per-child. High digital literacy. AI Ethics Commission." : "Estrategia Nacional AI (2019). Plan Ceibal: laptop por niño. Alta alfabetización digital. Comisión Ética AI.",
    institutions: en ? "AGESIC, Plan Ceibal, Agencia de Gobierno Electrónico" : "AGESIC, Plan Ceibal, Agencia de Gobierno Electrónico",
    learn: [
      en ? "Plan Ceibal universal digital access model for AI literacy" : "Modelo acceso digital universal Plan Ceibal para alfabetización AI",
      en ? "Small, stable democracy with high institutional quality — similar to CR profile" : "Democracia pequeña y estable con alta calidad institucional — perfil similar a CR"
    ]
  },
  PAN: {
    strategy: en ? "National Digital Agenda 2025. No specific AI strategy. Hub Panamá digital program. Focus on logistics and finance AI." : "Agenda Digital Nacional 2025. Sin estrategia AI específica. Programa Hub Panamá digital. Enfoque en logística y finanzas AI.",
    institutions: en ? "AIG (Innovation Authority), Panama Canal Authority, Secretaría de Innovación" : "AIG (Autoridad Innovación), Autoridad Canal de Panamá, Secretaría de Innovación",
    learn: [
      en ? "Canal logistics AI: direct model for CR port operations" : "AI logística Canal: modelo directo para operaciones portuarias CR",
      en ? "CR's main Central American competitor for FDI — comparison important" : "Principal competidor centroamericano de CR para IED — comparación importante"
    ]
  },
  BRA: {
    strategy: en ? "AI Bill (PL 2338/2023) in Senate. Regulatory sandboxes. $1B+ annual AI investment. Largest LATAM market." : "Proyecto AI (PL 2338/2023) en Senado. Sandboxes regulatorios. $1B+ inversión AI anual. Mayor mercado LATAM.",
    institutions: en ? "CNPD, ANPD (Data Protection), MCTI, BNDES" : "CNPD, ANPD (Protección Datos), MCTI, BNDES",
    learn: [
      en ? "Regulatory sandbox model in AI bill — applicable to CR" : "Modelo sandbox regulatorio en proyecto AI — aplicable a CR",
      en ? "TSE anti-deepfake electoral rules since 2024 — model for CR" : "Reglas TSE anti-deepfake electorales desde 2024 — modelo para CR"
    ]
  },
  COL: {
    strategy: en ? "National AI Policy (CONPES 3975). AI Ethics Framework. Focus: agriculture, justice, health AI." : "Política Nacional AI (CONPES 3975). Marco Ética AI. Enfoque: agricultura, justicia, salud AI.",
    institutions: en ? "MinTIC, Consejería Presidencial para Transformación Digital, C4IR Colombia" : "MinTIC, Consejería Presidencial para Transformación Digital, C4IR Colombia",
    learn: [
      en ? "Direct nearshoring competitor — CR must differentiate on quality and regulation" : "Competidor nearshoring directo — CR debe diferenciarse en calidad y regulación",
      en ? "AI in justice system (Pretoria AI tool) — innovative government application" : "AI en sistema de justicia (herramienta AI Pretoria) — aplicación gubernamental innovadora"
    ]
  },
  MEX: {
    strategy: en ? "No comprehensive AI strategy. AI Mexico Coalition (private sector). Focus: nearshoring boom, manufacturing AI." : "Sin estrategia AI integral. Coalición AI México (sector privado). Enfoque: boom nearshoring, AI manufactura.",
    institutions: en ? "CONACYT, Secretaría de Economía, AI Mexico (private coalition)" : "CONACYT, Secretaría de Economía, AI México (coalición privada)",
    learn: [
      en ? "Nearshoring leader by volume — CR competes on quality and specialization" : "Líder nearshoring por volumen — CR compite en calidad y especialización",
      en ? "Absence of AI regulation creates both risk and opportunity for differentiation" : "Ausencia de regulación AI crea tanto riesgo como oportunidad de diferenciación"
    ]
  },
  ARG: {
    strategy: en ? "National AI Plan (2019). Strong university AI research. Focus: agriculture, fintech, healthcare AI." : "Plan Nacional AI (2019). Fuerte investigación AI universitaria. Enfoque: agricultura, fintech, salud AI.",
    institutions: en ? "Secretaría de Innovación, CONICET, Universidad de Buenos Aires" : "Secretaría de Innovación, CONICET, Universidad de Buenos Aires",
    learn: [
      en ? "Talent-rich but economically unstable — CR has opposite profile (stable but smaller talent)" : "Rico en talento pero económicamente inestable — CR tiene perfil opuesto (estable pero menor talento)",
      en ? "Mercado Libre AI (largest LATAM e-commerce) — innovation despite macro challenges" : "AI Mercado Libre (mayor e-commerce LATAM) — innovación a pesar de desafíos macro"
    ]
  },
  PER: {
    strategy: en ? "National AI Strategy (2021). Early stage implementation. Focus: mining, agriculture, government services." : "Estrategia Nacional AI (2021). Implementación en etapa temprana. Enfoque: minería, agricultura, servicios gubernamentales.",
    institutions: en ? "Secretaría de Gobierno y Transformación Digital, CONCYTEC" : "Secretaría de Gobierno y Transformación Digital, CONCYTEC",
    learn: [
      en ? "Mining sector AI applications relevant to CR resource management" : "Aplicaciones AI sector minero relevantes para gestión de recursos CR",
      en ? "Similar income level — tracks AI readiness evolution at comparable development stage" : "Nivel de ingreso similar — rastrea evolución preparación AI en etapa de desarrollo comparable"
    ]
  },
  DOM: {
    strategy: en ? "Digital Republic 2030 strategy. No specific AI policy. Focus: tourism tech, FZ digital services." : "Estrategia República Digital 2030. Sin política AI específica. Enfoque: tech turismo, servicios digitales ZF.",
    institutions: en ? "OGTIC, CEI-RD (Investment Council), INDOTEL" : "OGTIC, CEI-RD (Consejo Inversión), INDOTEL",
    learn: [
      en ? "Direct FDI competitor in Caribbean — CR ahead on AI governance" : "Competidor IED directo en Caribe — CR adelante en gobernanza AI",
      en ? "Tourism AI applications (demand forecasting, personalization) applicable to CR" : "Aplicaciones AI turismo (pronóstico demanda, personalización) aplicables a CR"
    ]
  },
  VNM: {
    strategy: en ? "National AI Strategy 2030. $950M investment. Focus: manufacturing, smart city, agriculture. AI in EOS Top 5 (#1)." : "Estrategia Nacional AI 2030. $950M inversión. Enfoque: manufactura, ciudad inteligente, agricultura. AI en EOS Top 5 (#1).",
    institutions: en ? "MIC (Ministry of Information), VNPT, FPT Corporation" : "MIC (Ministerio Información), VNPT, FPT Corporation",
    learn: [
      en ? "Business leaders rank AI #1 risk (EOS) — opposite of CR's blind spot" : "Líderes empresariales clasifican AI riesgo #1 (EOS) — opuesto al punto ciego de CR",
      en ? "Manufacturing competitor: 30-50% lower costs but lower governance quality" : "Competidor manufactura: 30-50% menores costos pero menor calidad gobernanza"
    ]
  },
  PHL: {
    strategy: en ? "National AI Strategy (NAIS) 2025. $38B IT-BPM sector. 1.82M BPO employees. Focus: BPO resilience." : "Estrategia Nacional AI (NAIS) 2025. $38B sector IT-BPM. 1.82M empleados BPO. Enfoque: resiliencia BPO.",
    institutions: en ? "DICT, DOST, IBPAP (IT-BPO Association)" : "DICT, DOST, IBPAP (Asociación IT-BPO)",
    learn: [
      en ? "BPO scale (1.82M workers) vs CR (28K) — different magnitude but same AI threat" : "Escala BPO (1.82M trabajadores) vs CR (28K) — diferente magnitud pero misma amenaza AI",
      en ? "AI in EOS Top 5 — business leaders aware, unlike CR" : "AI en EOS Top 5 — líderes empresariales conscientes, a diferencia de CR"
    ]
  },
  MYS: {
    strategy: en ? "National AI Roadmap 2025-2030. $2.7B investment including NVIDIA partnership. AI Overperformer (World Bank)." : "Hoja de Ruta Nacional AI 2025-2030. $2.7B inversión incluyendo asociación con NVIDIA. AI Overperformer (Banco Mundial).",
    institutions: en ? "MDEC, MOSTI, MaGIC" : "MDEC, MOSTI, MaGIC",
    learn: [
      en ? "Fellow AI Overperformer — comparison of strategies at similar development level" : "AI Overperformer par — comparación de estrategias a nivel de desarrollo similar",
      en ? "NVIDIA partnership for national AI infrastructure — model for CR energy advantage" : "Asociación con NVIDIA para infraestructura AI nacional — modelo para ventaja energética CR"
    ]
  },
  IDN: {
    strategy: en ? "National AI Strategy 2025. Focus: 270M market digitalization, agriculture, healthcare, smart city." : "Estrategia Nacional AI 2025. Enfoque: digitalización mercado 270M, agricultura, salud, ciudad inteligente.",
    institutions: en ? "BRIN (Research Agency), Kominfo, BAPPENAS" : "BRIN (Agencia Investigación), Kominfo, BAPPENAS",
    learn: [
      en ? "AI Overperformer with 270M market — different scale but similar governance challenges" : "AI Overperformer con mercado 270M — diferente escala pero desafíos de gobernanza similares",
      en ? "Agricultural AI for tropical crops directly applicable to CR" : "AI agrícola para cultivos tropicales directamente aplicable a CR"
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
// changes: absolute values (set dimension to this value)
// deltas: relative values (add this to current dimension value)
export const SIM_PRESETS = (en) => [
  { nm: en ? "Pass AI Law" : "Aprobar Ley AI", desc: en ? "Enact binding AI legislation like South Korea's framework" : "Promulgar legislación AI vinculante como el marco de Corea del Sur", changes: { D4: 0.65 } },
  { nm: en ? "Complete SOC-CR" : "Completar SOC-CR", desc: en ? "Fully operational national cybersecurity operations center" : "Centro de operaciones ciberseguridad nacional plenamente operativo", changes: { D6: 0.60 } },
  { nm: en ? "INA AI Track" : "Track AI INA", desc: en ? "Launch AI technician certification at INA" : "Lanzar certificación técnico AI en INA", deltas: { D2: 0.05 } },
  { nm: en ? "Double R&D" : "Duplicar I+D", desc: en ? "Increase R&D spending from 0.4% to 0.8% GDP" : "Aumentar gasto I+D de 0.4% a 0.8% PIB", deltas: { D3: 0.10 } }
];

// ── LEGISLATION DATA (7 laws — 5 from v12 + 2 NEW from v9.5 spec) ──
export const LAWS = (en) => [
  { n: "EU AI Act", f: "🇪🇺", st: en ? "IN FORCE" : "EN VIGOR", sc: TH.gn, desc: en ? "World's first comprehensive AI law. 4 risk tiers: unacceptable (8 bans incl. social scoring, subliminal manipulation, real-time biometrics), high-risk (healthcare, employment — strict obligations), limited (transparency), minimal. Penalties: €35M or 7% global turnover." : "Primera ley AI integral. 4 niveles riesgo: inaceptable (8 prohibiciones), alto (salud, empleo — obligaciones estrictas), limitado (transparencia), mínimo. Multas: €35M o 7% facturación.", cr: en ? "Adopt 4-tier framework + 8 prohibited practices. Challenge: designate PRODHAB as AI authority." : "Adoptar marco 4 niveles + 8 prácticas prohibidas. Desafío: designar PRODHAB como autoridad AI.", lk: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj", timeline: [{ date: "2024-08", event: en ? "Entry into force" : "Entrada en vigor" }, { date: "2025-02", event: en ? "Prohibited AI systems ban" : "Prohibición sistemas AI inaceptables" }, { date: "2025-08", event: en ? "GPAI model obligations" : "Obligaciones modelos GPAI" }, { date: "2026-08", event: en ? "Full enforcement all risk tiers" : "Aplicación completa todos los niveles" }], crActions: [en ? "Map CR AI deployments to EU risk tiers (especially FZ exports)" : "Mapear despliegues AI de CR a niveles de riesgo EU (especialmente exportaciones ZF)", en ? "Adopt transparency requirements for government AI systems" : "Adoptar requisitos de transparencia para sistemas AI gubernamentales", en ? "Create AI regulatory sandbox for FZ companies exporting to EU" : "Crear sandbox regulatorio AI para empresas ZF que exportan a EU", en ? "Train MICITT on EU AI Act compliance frameworks" : "Capacitar MICITT en marcos de cumplimiento del EU AI Act"] },
  { n: "South Korea AI Framework", f: "🇰🇷", st: "ENE 2026", sc: TH.cy, desc: en ? "BEST MODEL for CR: regulation + innovation in ONE law. Consolidated 19 bills. National AI Committee (president chairs), AI Safety Institute. Foreign companies need domestic representative." : "MEJOR MODELO para CR: regulación + innovación en UNA ley. Consolidó 19 proyectos. Comité Nacional AI (presidente preside), Instituto Seguridad AI. Empresas extranjeras necesitan representante local.", cr: en ? "Primary model. 'Regulate + promote' ideal for growing AI capacity with guardrails. Small AI Safety Institute achievable." : "Modelo primario. 'Regular + promover' ideal para crecer en AI con guardarraíles. Instituto Seguridad AI pequeño es factible.", lk: "https://cset.georgetown.edu/publication/south-korea-ai-law-2025/", timeline: [{ date: "2025-01", event: en ? "AI Framework Act enacted" : "Ley Marco AI promulgada" }, { date: "2025-09", event: en ? "AI Safety Institute launch" : "Lanzamiento Instituto Seguridad AI" }, { date: "2026-01", event: en ? "High-risk AI obligations" : "Obligaciones AI alto riesgo" }], crActions: [en ? "Study Korea's dual promote+regulate model for CR's AI bill" : "Estudiar modelo dual promover+regular de Corea para proyecto de ley AI de CR", en ? "Establish AI Safety Institute equivalent under MICITT" : "Establecer equivalente de Instituto de Seguridad AI bajo MICITT", en ? "Create mandatory AI impact assessments for public sector" : "Crear evaluaciones de impacto AI obligatorias para sector público"] },
  { n: "Colorado SB 24-205", f: "🇺🇸", st: "JUN 2026", sc: TH.vi, desc: en ? "First US state anti-AI-discrimination law. 'Reasonable care' for AI in employment, education, finance, health. Annual impact assessments. Consumer opt-out rights. Affirmative defense for NIST AI RMF / ISO 42001 compliance." : "Primera ley estatal anti-discriminación AI de EEUU. 'Cuidado razonable' para AI en empleo, educación, finanzas, salud. Evaluaciones anuales. Derechos de opt-out. Defensa afirmativa por cumplir NIST AI RMF / ISO 42001.", cr: en ? "'Reasonable care' standard pragmatic for small country. Annual assessments manageable." : "Estándar 'cuidado razonable' pragmático para país pequeño. Evaluaciones anuales manejables.", lk: "https://leg.colorado.gov/bills/sb24-205", timeline: [{ date: "2024-05", event: en ? "Signed into law by Governor Polis" : "Firmada por Gobernador Polis" }, { date: "2025-02", event: en ? "Compliance guidance published" : "Guía de cumplimiento publicada" }, { date: "2026-02", event: en ? "Enforcement begins" : "Inicia aplicación" }], crActions: [en ? "Adopt 'reasonable care' standard as CR's AI duty of care baseline" : "Adoptar estándar 'cuidado razonable' como línea base de deber de cuidado AI de CR", en ? "Implement annual algorithmic impact assessments for government AI" : "Implementar evaluaciones anuales de impacto algorítmico para AI gubernamental", en ? "Offer NIST AI RMF safe harbor to incentivize voluntary compliance" : "Ofrecer protección NIST AI RMF para incentivar cumplimiento voluntario"] },
  { n: en ? "Chile AI Bill" : "Proyecto AI Chile", f: "🇨🇱", st: en ? "IN SENATE" : "EN SENADO", sc: TH.am, desc: en ? "Approved Chamber Aug 2025. Modeled on EU AI Act 4 tiers. First country to complete UNESCO RAM. AI Advisory Council. CR's closest LATAM comparator." : "Aprobado Cámara Ago 2025. Modelado en EU AI Act 4 niveles. Primer país en completar RAM UNESCO. Consejo Consultivo AI. Comparador LATAM más cercano de CR.", cr: en ? "Complete UNESCO RAM (evidence base + credibility). Regional coordination via SICA." : "Completar RAM UNESCO (base evidencia + credibilidad). Coordinación regional via SICA.", lk: "https://www.camara.cl/legislacion/ProyectosDeLey/tramitacion.aspx?prmID=16554", timeline: [{ date: "2024-03", event: en ? "UNESCO RAM completed (first country)" : "RAM UNESCO completada (primer país)" }, { date: "2025-08", event: en ? "Approved by Chamber of Deputies" : "Aprobado por Cámara de Diputados" }, { date: "2025-H2", event: en ? "Senate deliberation" : "Deliberación en Senado" }, { date: "2026-H1", event: en ? "Expected enactment" : "Promulgación esperada" }], crActions: [en ? "Complete UNESCO RAM to match Chile's evidence base" : "Completar RAM UNESCO para igualar base de evidencia de Chile", en ? "Coordinate LATAM AI harmonization via SICA and Pacific Alliance" : "Coordinar armonización AI LATAM vía SICA y Alianza del Pacífico", en ? "Establish AI Advisory Council modeled on Chile's approach" : "Establecer Consejo Consultivo AI modelado en enfoque de Chile"] },
  { n: "CR ENIA", f: "🇨🇷", st: en ? "STRATEGY ONLY" : "SOLO ESTRATEGIA", sc: TH.or, desc: en ? "First Central American country with national AI strategy (MICITT, Oct 2024). 7 pillars: ethics, territorial development, talent, infrastructure, innovation, smart government, international leadership. Aligned with UNESCO AI Ethics Recommendation. BUT: NO binding law, NO authority, NO mandatory transparency. Score: 0.38/1.0." : "Primer país centroamericano con estrategia nacional AI (MICITT, Oct 2024). 7 pilares: ética, desarrollo territorial, talento, infraestructura, innovación, gobierno inteligente, liderazgo internacional. Alineada con Recomendación UNESCO. PERO: SIN ley vinculante, SIN autoridad, SIN transparencia obligatoria. Score: 0.38/1.0.", cr: en ? "Must legislate within 12 months: (1) AI disclosure, (2) anti-discrimination, (3) PRODHAB as authority. First Central American AI law = FDI advantage." : "Debe legislar en 12 meses: (1) divulgación AI, (2) anti-discriminación, (3) PRODHAB como autoridad. Primera ley AI centroamericana = ventaja IED.", lk: "https://www.micit.go.cr/sites/default/files/estrategia-nacional-ia-cr.pdf", timeline: [{ date: "2024-10", event: en ? "ENIA published by MICITT" : "ENIA publicada por MICITT" }, { date: "2025-Q1", event: en ? "Oxford Insights: 100/100 Vision score" : "Oxford Insights: 100/100 puntaje Visión" }, { date: "2025-H2", event: en ? "Implementation gaps identified" : "Brechas de implementación identificadas" }, { date: "2026", event: en ? "Legislative conversion target" : "Meta de conversión legislativa" }], crActions: [en ? "Convert ENIA from strategy to binding legislation within 12 months" : "Convertir ENIA de estrategia a legislación vinculante en 12 meses", en ? "Assign PRODHAB as national AI authority with expanded mandate" : "Asignar PRODHAB como autoridad nacional AI con mandato ampliado", en ? "Establish measurable KPIs for each of the 7 ENIA pillars" : "Establecer KPIs medibles para cada uno de los 7 pilares ENIA", en ? "Create inter-institutional AI coordination mechanism" : "Crear mecanismo de coordinación AI interinstitucional"] },
  // NEW Law 6: CR Bill 23771
  { n: en ? "CR Bill 23771" : "Proyecto CR 23771", f: "🇨🇷", st: en ? "IN COMMITTEE" : "EN COMISIÓN", sc: TH.am, desc: en ? "'Law for the Regulation of AI in Costa Rica' filed May 2023 by Rep. Vanessa Castro. Notable: drafted WITH ChatGPT-4. Covers transparency, privacy, data security. References CR Constitution 1949. First AI-specific bill in Central America." : "'Ley para la Regulación de AI en Costa Rica' presentado May 2023 por Dip. Vanessa Castro. Notable: redactado CON ChatGPT-4. Cubre transparencia, privacidad, seguridad datos. Referencia Constitución CR 1949. Primer proyecto específico AI en Centroamérica.", cr: en ? "Critical first step. Needs modernization with EU AI Act risk tiers and South Korea's promote+regulate approach." : "Primer paso crítico. Necesita modernización con niveles riesgo EU AI Act y enfoque promover+regular de Corea del Sur.", lk: "https://www.asamblea.go.cr/glcp/SitePages/ConsultaProyectos.aspx", timeline: [{ date: "2023-05", event: en ? "Filed by Rep. Vanessa Castro" : "Presentado por Dip. Vanessa Castro" }, { date: "2023-H2", event: en ? "Referred to Science & Tech committee" : "Referido a comisión Ciencia y Tecnología" }, { date: "2025", event: en ? "Still in committee — stalled" : "Aún en comisión — estancado" }], crActions: [en ? "Modernize bill with EU AI Act risk-tier framework" : "Modernizar proyecto con marco de niveles de riesgo del EU AI Act", en ? "Add South Korea-style promote+regulate dual mandate" : "Agregar mandato dual promover+regular estilo Corea del Sur", en ? "Include free zone AI compliance provisions" : "Incluir provisiones de cumplimiento AI para zonas francas", en ? "Fast-track committee review post-2026 elections" : "Acelerar revisión en comisión post-elecciones 2026"] },
  // NEW Law 7: CR Bill 23097
  { n: en ? "CR Bill 23097" : "Proyecto CR 23097", f: "🇨🇷", st: en ? "IN REVIEW" : "EN REVISIÓN", sc: TH.vi, desc: en ? "Data Protection reform aligning with EU GDPR. Strengthens PRODHAB. Essential for AI governance infrastructure. GDPR adequacy enables EU data flows for free zone companies. Key enabler for responsible AI deployment." : "Reforma Protección Datos alineándose con GDPR UE. Fortalece PRODHAB. Esencial para infraestructura de gobernanza AI. Adecuación GDPR habilita flujos datos UE para empresas zonas francas. Habilitador clave para despliegue AI responsable.", cr: en ? "Must pass BEFORE AI law. GDPR adequacy = competitive advantage for FZ companies serving EU clients." : "Debe aprobarse ANTES de ley AI. Adecuación GDPR = ventaja competitiva para empresas ZF sirviendo clientes UE.", lk: "https://www.asamblea.go.cr/glcp/SitePages/ConsultaProyectos.aspx", timeline: [{ date: "2022", event: en ? "Data Protection reform bill introduced" : "Proyecto reforma Protección Datos introducido" }, { date: "2024", event: en ? "Committee review and amendments" : "Revisión en comisión y enmiendas" }, { date: "2025-H2", event: en ? "Expected plenary vote" : "Votación plenaria esperada" }], crActions: [en ? "Prioritize passage BEFORE AI-specific legislation" : "Priorizar aprobación ANTES de legislación AI específica", en ? "Align PRODHAB mandate with GDPR supervisory authority model" : "Alinear mandato PRODHAB con modelo autoridad supervisora GDPR", en ? "Ensure GDPR adequacy determination to enable EU data flows for FZ" : "Asegurar determinación de adecuación GDPR para habilitar flujos datos UE para ZF"] }
];

// ── CR CHECKLIST (11 items — 8 from v12 + 3 NEW from v9.5 spec) ──
export const CHECKLIST = (en) => [
  { i: en ? "Binding AI law" : "Ley AI vinculante", d: false, p: en ? "CRITICAL" : "CRÍTICA",
    desc: en ? "Costa Rica needs a comprehensive, binding AI law that establishes mandatory algorithmic impact assessments for public-sector AI, creates transparency requirements, defines liability frameworks, and designates a regulatory authority. The EU AI Act (2024) and South Korea's AI Framework Act (2025) provide models. Bill 23771 is in committee but lacks enforcement teeth." : "Costa Rica necesita una ley AI integral y vinculante que establezca evaluaciones obligatorias de impacto algorítmico para AI del sector público, cree requisitos de transparencia, defina marcos de responsabilidad y designe una autoridad regulatoria. El EU AI Act (2024) y la Ley Marco AI de Corea del Sur (2025) proveen modelos. El Proyecto 23771 está en comisión pero carece de dientes de aplicación." },
  { i: en ? "Data Protection Law reform" : "Reforma Ley Protección Datos", d: false, p: en ? "CRITICAL" : "CRÍTICA",
    desc: en ? "Costa Rica's data protection framework (Law 8968, 2011) predates modern AI. It needs reform to address: algorithmic profiling, automated decision-making rights, AI training data governance, cross-border data flows for AI processing, and GDPR adequacy determination (critical for EU AI Act compliance by free zone companies)." : "El marco de protección de datos de CR (Ley 8968, 2011) es anterior a la AI moderna. Necesita reforma para abordar: perfilamiento algorítmico, derechos de decisión automatizada, gobernanza de datos de entrenamiento AI, flujos transfronterizos de datos para procesamiento AI, y determinación de adecuación GDPR (crítico para cumplimiento EU AI Act por empresas de zona franca)." },
  { i: en ? "AI authority (PRODHAB)" : "Autoridad AI (PRODHAB)", d: false, p: en ? "CRITICAL" : "CRÍTICA",
    desc: en ? "PRODHAB (data protection agency) currently lacks the mandate, budget, and technical expertise to regulate AI. Options: expand PRODHAB's mandate with dedicated AI unit (lowest cost), create a new AI authority under MICITT (most independent), or establish a multi-stakeholder AI council with binding powers (Singapore AICA model)." : "PRODHAB (agencia de protección de datos) actualmente carece del mandato, presupuesto y expertise técnico para regular AI. Opciones: expandir mandato de PRODHAB con unidad AI dedicada (menor costo), crear nueva autoridad AI bajo MICITT (más independiente), o establecer consejo AI multiactores con poderes vinculantes (modelo AICA de Singapur)." },
  { i: en ? "Algorithmic impact assessments" : "Evaluaciones impacto algorítmico", d: false, p: en ? "HIGH" : "ALTA",
    desc: en ? "Mandatory pre-deployment assessments for AI systems used in high-risk contexts: criminal justice, healthcare, education, employment, immigration, and financial services. Canada's Algorithmic Impact Assessment Tool and the EU's conformity assessments provide frameworks. Costa Rica should start with public sector and extend to private sector for high-risk uses." : "Evaluaciones obligatorias pre-despliegue para sistemas AI usados en contextos de alto riesgo: justicia penal, salud, educación, empleo, inmigración y servicios financieros. La Herramienta de Evaluación de Impacto Algorítmico de Canadá y las evaluaciones de conformidad de la UE proveen marcos. CR debería comenzar con sector público y extender al sector privado para usos de alto riesgo." },
  { i: en ? "Anti-disinformation framework (post-2026 elections)" : "Marco anti-desinformación (post-elecciones 2026)", d: false, p: en ? "URGENT" : "URGENTE",
    desc: en ? "AI-generated deepfakes and synthetic media pose immediate risks to Costa Rica's 2026 elections. Needed: mandatory labeling of AI-generated content in political advertising, platform accountability requirements, rapid-response fact-checking infrastructure, and digital literacy campaigns. Brazil and the EU have enacted emergency measures." : "Deepfakes generados por AI y medios sintéticos representan riesgos inmediatos para las elecciones de CR 2026. Se necesita: etiquetado obligatorio de contenido generado por AI en publicidad política, requisitos de responsabilidad de plataformas, infraestructura de verificación de hechos de respuesta rápida, y campañas de alfabetización digital. Brasil y la UE han promulgado medidas de emergencia." },
  { i: en ? "National AI Strategy (ENIA)" : "Estrategia Nacional AI (ENIA)", d: true, p: "✅",
    desc: en ? "Costa Rica launched its National AI Strategy (ENIA) achieving a perfect 100/100 on Oxford Insights' AI Vision score. However, the strategy lacks binding enforcement mechanisms, budget allocations, and specific timelines. The gap between vision and execution is Costa Rica's primary vulnerability — Singapore and Estonia both coupled strategy with immediate legislative action." : "CR lanzó su Estrategia Nacional AI (ENIA) logrando un perfecto 100/100 en el puntaje de Visión AI de Oxford Insights. Sin embargo, la estrategia carece de mecanismos de aplicación vinculantes, asignaciones presupuestarias y cronogramas específicos. La brecha entre visión y ejecución es la vulnerabilidad primaria de CR — Singapur y Estonia acoplaron estrategia con acción legislativa inmediata." },
  { i: en ? "UNESCO RAM completion" : "Completar RAM UNESCO", d: false, p: en ? "MEDIUM" : "MEDIA",
    desc: en ? "The UNESCO Readiness Assessment Methodology (RAM) provides a structured framework for countries to evaluate their AI preparedness across ethical, legal, technical, and social dimensions. Chile completed its RAM in 2023, gaining credibility and international benchmarking data. CR should complete its assessment to build evidence for legislative action." : "La Metodología de Evaluación de Preparación (RAM) de UNESCO provee un marco estructurado para que los países evalúen su preparación AI en dimensiones éticas, legales, técnicas y sociales. Chile completó su RAM en 2023, ganando credibilidad y datos de benchmarking internacional. CR debería completar su evaluación para construir evidencia para acción legislativa." },
  { i: en ? "Regulatory sandbox" : "Sandbox regulatorio", d: false, p: en ? "MEDIUM" : "MEDIA",
    desc: en ? "A regulatory sandbox allows AI companies to test innovations in a controlled environment with relaxed regulations. Singapore's AI Governance Testing Framework and the UK's FCA sandbox are models. For CR, this would let free zone companies test AI deployments under government oversight without full compliance burden, accelerating innovation while maintaining safety." : "Un sandbox regulatorio permite a empresas AI probar innovaciones en un ambiente controlado con regulaciones relajadas. El Marco de Pruebas de Gobernanza AI de Singapur y el sandbox FCA del Reino Unido son modelos. Para CR, esto permitiría a empresas de zona franca probar despliegues AI bajo supervisión gubernamental sin carga de cumplimiento completa, acelerando innovación manteniendo seguridad." },
  // 3 NEW checklist items from v9.5 spec
  { i: en ? "Bill 23771 (AI Regulation)" : "Proyecto 23771 (Regulación AI)", d: false, p: en ? "IN COMMITTEE" : "EN COMISIÓN",
    desc: en ? "Legislative bill 23771 on AI regulation is currently in the Science, Technology, and Education Committee of the Legislative Assembly. The bill proposes basic AI transparency requirements and a regulatory framework, but critics note it lacks enforcement mechanisms, doesn't address algorithmic bias, and has no provisions for high-risk AI systems classification." : "El proyecto de ley 23771 sobre regulación AI está actualmente en la Comisión de Ciencia, Tecnología y Educación de la Asamblea Legislativa. El proyecto propone requisitos básicos de transparencia AI y un marco regulatorio, pero críticos señalan que carece de mecanismos de aplicación, no aborda sesgo algorítmico, y no tiene provisiones para clasificación de sistemas AI de alto riesgo." },
  { i: en ? "OECD AI Policy indexed" : "Política AI OCDE indexada", d: true, p: "✅",
    desc: en ? "Costa Rica's AI policies are indexed in the OECD AI Policy Observatory, which tracks AI initiatives across member countries. This provides international visibility and benchmarking. CR is one of only 2 Central American countries indexed (along with Panama), giving it a credibility advantage in attracting AI-related FDI." : "Las políticas AI de CR están indexadas en el Observatorio de Políticas AI de la OCDE, que rastrea iniciativas AI en países miembros. Esto provee visibilidad internacional y benchmarking. CR es uno de solo 2 países centroamericanos indexados (junto con Panamá), dándole una ventaja de credibilidad en atraer IED relacionada con AI." },
  { i: en ? "AI Center of Excellence" : "Centro Excelencia AI", d: false, p: en ? "PLANNED" : "PLANIFICADO",
    desc: en ? "A proposed center to coordinate AI research, policy, and industry collaboration. Would serve as: technical advisory body for government AI deployments, certification authority for AI professionals, sandbox operator, and international liaison. South Korea's KAIST AI Graduate School and Estonia's AI Center provide models. Requires ~$5M initial investment." : "Un centro propuesto para coordinar investigación AI, política y colaboración con la industria. Serviría como: cuerpo asesor técnico para despliegues AI gubernamentales, autoridad certificadora para profesionales AI, operador de sandbox, y enlace internacional. La Escuela de Posgrado AI KAIST de Corea del Sur y el Centro AI de Estonia proveen modelos. Requiere ~$5M de inversión inicial." }
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

// ── SOCIAL MEDIA ──
export const SOCIAL = {
  x: { url: "https://x.com/ColibriiLabs", handle: "@ColibriiLabs", active: true },
  email: "andres@colibriilabs.com"
};

// ── VIP QUOTES REEL ──
export const VIP_QUOTES = (en) => [
  { name: "Geoffrey Hinton", title: en ? "Nobel Laureate, 'Godfather of AI'" : "Nobel, 'Padrino de la AI'", initials: "GH", gradient: "linear-gradient(135deg, #2563eb, #6366f1)", photo: "https://unavatar.io/x/geoffreyhinton", quote: en ? "There is a 10 to 20 percent probability of AI leading to the extinction of humanity in the next 30 years." : "Hay una probabilidad de 10 a 20 por ciento de que la AI lleve a la extinción de la humanidad en los próximos 30 años.", src: "https://www.bbc.com/news/technology-68495207" },
  { name: "Rodrigo Chaves", title: en ? "President of Costa Rica" : "Presidente de Costa Rica", initials: "RC", gradient: "linear-gradient(135deg, #10b981, #2563eb)", photo: "https://unavatar.io/x/rodrigochavesr", quote: en ? "Costa Rica has a unique window to position itself as a leader in responsible AI in Latin America." : "Costa Rica tiene una ventana única para posicionarse como líder en AI responsable en América Latina.", src: "https://www.presidencia.go.cr/" },
  { name: "Sundar Pichai", title: "CEO, Google / Alphabet", initials: "SP", gradient: "linear-gradient(135deg, #f59e0b, #ef4444)", photo: "https://unavatar.io/x/sundarpichai", quote: en ? "AI is probably the most important thing humanity has ever worked on. I think of it as something more profound than electricity or fire." : "AI es probablemente lo más importante en lo que la humanidad ha trabajado. La veo como algo más profundo que la electricidad o el fuego.", src: "https://abc.xyz" },
  { name: "Sam Altman", title: "CEO, OpenAI", initials: "SA", gradient: "linear-gradient(135deg, #6366f1, #ec4899)", photo: "https://unavatar.io/x/sama", quote: en ? "AI will probably most change the world of any technology we've yet built." : "AI probablemente cambiará el mundo más que cualquier tecnología que hayamos construido.", src: "https://openai.com" },
  { name: "Bill Gates", title: en ? "Co-founder, Microsoft" : "Co-fundador, Microsoft", initials: "BG", gradient: "linear-gradient(135deg, #2563eb, #10b981)", photo: "https://unavatar.io/x/BillGates", quote: en ? "AI is as revolutionary as mobile phones and the Internet." : "AI es tan revolucionaria como los teléfonos móviles e Internet.", src: "https://www.gatesnotes.com/" },
  { name: "Daron Acemoglu", title: en ? "Nobel Laureate, MIT Economist" : "Nobel, Economista MIT", initials: "DA", gradient: "linear-gradient(135deg, #ef4444, #f59e0b)", photo: "https://unavatar.io/x/DAcemogluMIT", quote: en ? "The real risk is not that AI becomes super-intelligent, but that we deploy it in ways that concentrate power and increase inequality." : "El riesgo real no es que la AI se vuelva super-inteligente, sino que la despleguemos de formas que concentren poder y aumenten desigualdad.", src: "https://economics.mit.edu/people/faculty/daron-acemoglu" },
  // NEW quotes v15
  { name: "Fei-Fei Li", title: en ? "Stanford HAI Co-Director, 'Godmother of AI'" : "Co-Directora Stanford HAI, 'Madrina de la AI'", initials: "FL", gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)", photo: "https://unavatar.io/x/drfeifei", quote: en ? "There's nothing artificial about AI. It's inspired by people, it's created by people, and most importantly, it impacts people." : "No hay nada artificial sobre la AI. Está inspirada en personas, creada por personas, y lo más importante, impacta a personas.", src: "https://hai.stanford.edu/" },
  { name: "Jensen Huang", title: "CEO, NVIDIA", initials: "JH", gradient: "linear-gradient(135deg, #76b900, #1a1a2e)", photo: "https://unavatar.io/x/nvidia", quote: en ? "Every country needs to own the production of their own intelligence. It is the single most important infrastructure of every country." : "Cada país necesita ser dueño de la producción de su propia inteligencia. Es la infraestructura más importante de cada país.", src: "https://www.nvidia.com/" },
  { name: "Satya Nadella", title: "CEO, Microsoft", initials: "SN", gradient: "linear-gradient(135deg, #00a4ef, #7fba00)", photo: "https://unavatar.io/x/satyanadella", quote: en ? "AI is going to be the defining technology of our times. The question is, what are we going to do with it?" : "AI va a ser la tecnología definitoria de nuestros tiempos. La pregunta es, ¿qué vamos a hacer con ella?", src: "https://www.microsoft.com/" },
  { name: "Mustafa Suleyman", title: en ? "CEO, Microsoft AI" : "CEO, Microsoft AI", initials: "MS", gradient: "linear-gradient(135deg, #2563eb, #f59e0b)", photo: "https://unavatar.io/x/mustafasuleyman", quote: en ? "AI is the most consequential technology since fire. We need new institutions, not just new technology." : "AI es la tecnología más consecuente desde el fuego. Necesitamos nuevas instituciones, no solo nueva tecnología.", src: "https://www.microsoft.com/en-us/ai" },
  { name: "Alicia Bárcena", title: en ? "ECLAC Executive Secretary (2008-2022)" : "Secretaria Ejecutiva CEPAL (2008-2022)", initials: "AB", gradient: "linear-gradient(135deg, #2563eb, #8b5cf6)", photo: "https://unavatar.io/x/A_Barcena", quote: en ? "Latin America cannot afford to be a passive consumer of AI. The region must develop sovereign capabilities or risk permanent digital dependency." : "América Latina no puede permitirse ser consumidora pasiva de AI. La región debe desarrollar capacidades soberanas o arriesgar dependencia digital permanente.", src: "https://www.cepal.org/" },
  { name: "Kai-Fu Lee", title: en ? "CEO Sinovation, AI Author" : "CEO Sinovation, Autor AI", initials: "KL", gradient: "linear-gradient(135deg, #ef4444, #f97316)", photo: "https://unavatar.io/x/kaifulee", quote: en ? "AI will displace 40% of jobs in the next 15 years. Countries that prepare their workforce now will thrive; those that don't will suffer." : "AI desplazará el 40% de los empleos en los próximos 15 años. Los países que preparen su fuerza laboral ahora prosperarán; los que no, sufrirán.", src: "https://www.sinovationventures.com/" }
];

// ── NEWS CATEGORIES (for thumbnail colors) ──
export const NEWS_CATEGORIES = {
  tech: { label: { en: "Technology", es: "Tecnología" }, color: "#2563eb", icon: "⚡" },
  policy: { label: { en: "Policy", es: "Política" }, color: "#6366f1", icon: "⬡" },
  security: { label: { en: "Security", es: "Seguridad" }, color: "#ef4444", icon: "🛡" },
  economy: { label: { en: "Economy", es: "Economía" }, color: "#f59e0b", icon: "📊" },
  education: { label: { en: "Education", es: "Educación" }, color: "#10b981", icon: "🎓" },
  general: { label: { en: "General", es: "General" }, color: "#94a3b8", icon: "◈" }
};

// ── CURATED LANDMARK NEWS (persistent — never expires) ──
export const CURATED_NEWS = [
  { title: "EU AI Act enters into force — world's first comprehensive AI regulation", url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai", domain: "ec.europa.eu", date: "2025-08-01", category: "policy" },
  { title: "WEF Global Risks 2026: AI adverse outcomes rise to #5 long-term risk", url: "https://www.weforum.org/publications/global-risks-report-2026/", domain: "weforum.org", date: "2026-01-15", category: "policy" },
  { title: "IMF: AI will affect 40% of global jobs — emerging markets most vulnerable", url: "https://www.imf.org/en/Blogs/Articles/2024/01/14/ai-will-transform-the-global-economy-lets-make-sure-it-benefits-humanity", domain: "imf.org", date: "2024-01-14", category: "economy" },
  { title: "Stanford HAI AI Index 2025: global AI investment surpasses $100B", url: "https://aiindex.stanford.edu/report/", domain: "stanford.edu", date: "2025-04-15", category: "tech" },
  { title: "Oxford Insights: Costa Rica scores 100/100 AI Vision but 0.38 readiness", url: "https://oxfordinsights.com/ai-readiness/ai-readiness-index/", domain: "oxfordinsights.com", date: "2024-12-01", category: "policy" },
  { title: "OECD AI Policy Observatory: 70+ countries now have national AI strategies", url: "https://oecd.ai/en/", domain: "oecd.org", date: "2025-06-01", category: "policy" },
];

// ── COSTA RICA AI FALLBACK NEWS (shown when GDELT CR filter is empty) ──
export const CR_FALLBACK_NEWS = [
  { title: "Costa Rica lanza Estrategia Nacional de Inteligencia Artificial", url: "https://www.micitt.go.cr/", domain: "micitt.go.cr", date: "2026-01-15", category: "policy" },
  { title: "CINDE: Costa Rica atrae inversión récord en servicios digitales y AI", url: "https://www.cinde.org/", domain: "cinde.org", date: "2026-02-01", category: "economy" },
  { title: "INA anuncia nuevos programas de capacitación en inteligencia artificial", url: "https://www.ina.ac.cr/", domain: "ina.ac.cr", date: "2026-01-20", category: "education" },
  { title: "Proyecto de Ley: Marco regulatorio para inteligencia artificial en CR", url: "https://www.asamblea.go.cr/", domain: "asamblea.go.cr", date: "2026-02-10", category: "policy" },
];

// ── FREE ZONES DEEP ANALYSIS ──
export const FZ_DEEP = (en) => ({
  projections: {
    title: en ? "FDI Trajectory 2025-2030" : "Trayectoria IED 2025-2030",
    data: [
      { year: 2024, fdi: 4.3, source: "CINDE" },
      { year: 2025, fdi: 4.6, source: en ? "Estimate (CINDE growth rate)" : "Estimado (tasa crecimiento CINDE)" },
      { year: 2026, fdi: 5.0, source: en ? "Projected" : "Proyectado" },
      { year: 2027, fdi: 5.4, source: en ? "Projected" : "Proyectado" },
      { year: 2028, fdi: 5.8, source: en ? "Projected" : "Proyectado" },
      { year: 2029, fdi: 6.2, source: en ? "Projected" : "Proyectado" },
      { year: 2030, fdi: 6.8, source: en ? "Projected (AI compliance premium)" : "Proyectado (prima cumplimiento AI)" }
    ],
    narrative: en ? "Costa Rica's FDI has grown 12% CAGR since 2019. AI compliance readiness (binding law + GDPR adequacy) could accelerate to 15% CAGR by 2028." : "IED de Costa Rica ha crecido 12% CAGR desde 2019. Preparación cumplimiento AI (ley vinculante + adecuación GDPR) podría acelerar a 15% CAGR para 2028."
  },
  aiImpact: [
    { title: en ? "Legal Framework Evolution" : "Evolución del Marco Legal", desc: en ? "EU AI Act enforcement (Aug 2026) means FZ companies exporting to EU must comply with 4-tier risk classification. Currently zero FZ companies have AI compliance officers." : "Aplicación EU AI Act (Ago 2026) significa que empresas ZF exportando a UE deben cumplir clasificación 4 niveles riesgo. Actualmente cero empresas ZF tienen oficiales cumplimiento AI." },
    { title: en ? "Skill Requirements Shift" : "Cambio en Requisitos de Habilidades", desc: en ? "AI-augmented roles replacing traditional BPO: customer service AI supervisors, AI quality assurance, prompt engineers, AI ethics compliance. INA has zero tracks for these." : "Roles aumentados con AI reemplazando BPO tradicional: supervisores AI servicio al cliente, aseguramiento calidad AI, ingenieros de prompts, cumplimiento ética AI. INA tiene cero tracks para estos." },
    { title: en ? "Competitive Advantage Window" : "Ventana de Ventaja Competitiva", desc: en ? "First LATAM FZ regime with AI governance framework = premium positioning for EU/US companies needing compliant nearshore operations." : "Primer régimen ZF LATAM con marco gobernanza AI = posicionamiento premium para empresas UE/EEUU necesitando operaciones nearshore compatibles." }
  ],
  laborProfile: {
    current: [
      en ? "BPO customer service agents: ~28,000" : "Agentes BPO servicio al cliente: ~28,000",
      en ? "Software developers: ~15,000" : "Desarrolladores software: ~15,000",
      en ? "Manufacturing technicians: ~22,000" : "Técnicos manufactura: ~22,000",
      en ? "Shared services (finance/HR): ~18,000" : "Servicios compartidos (finanzas/RRHH): ~18,000",
      en ? "Medical devices QA: ~12,000" : "Control calidad dispositivos médicos: ~12,000"
    ],
    expected2030: [
      en ? "AI operations supervisors: +5,000 (NEW)" : "Supervisores operaciones AI: +5,000 (NUEVO)",
      en ? "Data engineers/ML ops: +8,000 (NEW)" : "Ingenieros datos/ML ops: +8,000 (NUEVO)",
      en ? "AI compliance officers: +2,000 (NEW)" : "Oficiales cumplimiento AI: +2,000 (NUEVO)",
      en ? "Robotics technicians: +3,000 (NEW)" : "Técnicos robótica: +3,000 (NUEVO)",
      en ? "Traditional BPO: -12,000 to -18,000 (AT RISK)" : "BPO tradicional: -12,000 a -18,000 (EN RIESGO)"
    ]
  },
  competitiveness: [
    { flag: "CR", country: "Costa Rica", cost: en ? "Medium" : "Medio", talent: en ? "High (bilingual)" : "Alto (bilingüe)", infra: en ? "Good" : "Buena", stability: en ? "Excellent" : "Excelente", energy: "99%", aiReady: en ? "Low" : "Bajo" },
    { flag: "VN", country: "Vietnam", cost: en ? "Low" : "Bajo", talent: en ? "High (STEM)" : "Alto (STEM)", infra: en ? "Moderate" : "Moderada", stability: en ? "Good" : "Buena", energy: "40%", aiReady: en ? "Medium" : "Medio" },
    { flag: "CO", country: "Colombia", cost: en ? "Low-Med" : "Bajo-Med", talent: en ? "High (bilingual)" : "Alto (bilingüe)", infra: en ? "Moderate" : "Moderada", stability: en ? "Moderate" : "Moderada", energy: "70%", aiReady: en ? "Low" : "Bajo" },
    { flag: "PH", country: en ? "Philippines" : "Filipinas", cost: en ? "Low" : "Bajo", talent: en ? "Very High (English)" : "Muy Alto (inglés)", infra: en ? "Moderate" : "Moderada", stability: en ? "Moderate" : "Moderada", energy: "35%", aiReady: en ? "Low" : "Bajo" },
    { flag: "DO", country: en ? "Dom. Rep." : "Rep. Dom.", cost: en ? "Low" : "Bajo", talent: en ? "Moderate" : "Moderado", infra: en ? "Basic" : "Básica", stability: en ? "Good" : "Buena", energy: "15%", aiReady: en ? "Low" : "Bajo" }
  ],
  risksAndOpps: {
    risks: [
      en ? "EU AI Act compliance gap: FZ companies unprepared for Aug 2026 enforcement" : "Brecha cumplimiento EU AI Act: empresas ZF no preparadas para aplicación Ago 2026",
      en ? "BPO displacement: 12-18K jobs at risk from AI automation by 2028" : "Desplazamiento BPO: 12-18K empleos en riesgo por automatización AI para 2028",
      en ? "Competitor countries investing heavily (Vietnam AI strategy, Colombia IT incentives)" : "Países competidores invirtiendo fuertemente (estrategia AI Vietnam, incentivos IT Colombia)",
      en ? "No AI regulatory sandbox — companies can't test compliance before enforcement" : "Sin sandbox regulatorio AI — empresas no pueden probar cumplimiento antes de aplicación"
    ],
    opportunities: [
      en ? "First Central American binding AI law = FDI magnet for compliance-conscious firms" : "Primera ley AI vinculante centroamericana = imán IED para firmas conscientes del cumplimiento",
      en ? "GDPR adequacy determination = EU data flows for FZ → premium positioning" : "Determinación adecuación GDPR = flujos datos UE para ZF → posicionamiento premium",
      en ? "Green AI advantage: 99% renewable makes CR ideal for carbon-conscious AI operations" : "Ventaja AI verde: 99% renovable hace CR ideal para operaciones AI conscientes del carbono",
      en ? "Nearshore AI hub: same timezone + cultural affinity with US market" : "Hub AI nearshore: mismo huso horario + afinidad cultural con mercado EEUU"
    ]
  },
  whyInvest: [
    { reason: "CAFTA-DR", desc: en ? "Preferential trade access to US, Central America, Dominican Republic" : "Acceso comercial preferencial a EEUU, Centroamérica, República Dominicana" },
    { reason: en ? "OECD Member" : "Miembro OCDE", desc: en ? "Regulatory credibility, institutional quality, anti-corruption standards" : "Credibilidad regulatoria, calidad institucional, estándares anti-corrupción" },
    { reason: en ? "99% Renewable" : "99% Renovable", desc: en ? "Unique selling point for ESG-conscious investors and green AI deployments" : "Punto de venta único para inversionistas conscientes ESG y despliegues AI verde" },
    { reason: en ? "US Timezone" : "Huso Horario EEUU", desc: en ? "Real-time collaboration with North American clients (no overnight shifts)" : "Colaboración en tiempo real con clientes norteamericanos (sin turnos nocturnos)" },
    { reason: en ? "Bilingual Talent" : "Talento Bilingüe", desc: en ? "#1 English proficiency in Central America, 3rd in LATAM (EF EPI)" : "#1 dominio inglés en Centroamérica, 3ro en LATAM (EF EPI)" },
    { reason: en ? "Political Stability" : "Estabilidad Política", desc: en ? "75+ years uninterrupted democracy, no army since 1948, Freedom House 91/100" : "75+ años democracia ininterrumpida, sin ejército desde 1948, Freedom House 91/100" },
    { reason: en ? "Record FDI" : "IED Récord", desc: en ? "$4.3B in 2024 — #3 globally in Greenfield FDI Performance Index (fDi Markets)" : "$4.3B en 2024 — #3 globalmente en Índice Desempeño IED Greenfield (fDi Markets)" },
    { reason: en ? "AI Overperformer" : "AI Overperformer", desc: en ? "World Bank: one of 7 upper-middle-income countries outperforming on AI readiness indicators" : "Banco Mundial: uno de 7 países de ingreso medio-alto superando en indicadores preparación AI" }
  ],
  challenges: [
    { current: en ? "Zero AI compliance framework for FZ operations" : "Cero marco cumplimiento AI para operaciones ZF", future: en ? "EU AI Act full enforcement Aug 2026 — unprepared firms lose EU market access" : "Aplicación total EU AI Act Ago 2026 — firmas no preparadas pierden acceso mercado UE" },
    { current: en ? "INA graduates 13K IT workers/yr with zero AI skills" : "INA gradúa 13K trabajadores IT/año con cero habilidades AI", future: en ? "AI operations roles require skills that don't exist in current training pipeline" : "Roles operaciones AI requieren habilidades que no existen en pipeline de formación actual" },
    { current: en ? "BPO sector (~28K jobs) running on pre-AI service models" : "Sector BPO (~28K empleos) operando en modelos servicio pre-AI", future: en ? "40-60% of routine BPO tasks automatable by 2028 (McKinsey)" : "40-60% de tareas BPO rutinarias automatizables para 2028 (McKinsey)" }
  ],
  govPreparation: [
    en ? "Establish AI regulatory sandbox under MICITT for FZ companies (priority: medical devices, digital services)" : "Establecer sandbox regulatorio AI bajo MICITT para empresas ZF (prioridad: dispositivos médicos, servicios digitales)",
    en ? "Create INA AI Technician Track: 8-week certification co-designed with Intel, Amazon, HP" : "Crear Track Técnico AI INA: certificación 8 semanas co-diseñada con Intel, Amazon, HP",
    en ? "Negotiate GDPR adequacy with EU Commission to unlock data flows for FZ" : "Negociar adecuación GDPR con Comisión UE para desbloquear flujos datos para ZF",
    en ? "Launch FZ AI Compliance Readiness Program (60-day EU AI Act preparation)" : "Lanzar Programa Preparación Cumplimiento AI ZF (preparación 60 días EU AI Act)",
    en ? "Create transition support for displaced BPO workers (reskilling stipend + placement)" : "Crear soporte transición para trabajadores BPO desplazados (estipendio recapacitación + colocación)"
  ],
  sources: [
    { name: "CINDE Costa Rica", url: "https://www.cinde.org/" },
    { name: "PROCOMER", url: "https://www.procomer.com/" },
    { name: "EU AI Act", url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj" },
    { name: "World Bank Digital Progress", url: "https://www.worldbank.org/" },
    { name: "fDi Markets Greenfield FDI Performance Index", url: "https://www.fdimarkets.com/" },
    { name: "McKinsey Global Institute", url: "https://www.mckinsey.com/mgi/" }
  ]
});

// ── PYMES / SME INTELLIGENCE ──
export const PYMES_DEEP = (en) => ({
  landscape: {
    title: en ? "Costa Rica's SME Landscape" : "Panorama PYMES Costa Rica",
    stats: [
      { value: "97%", label: en ? "Businesses are SMEs" : "Negocios son PYMES", source: "MEIC 2025" },
      { value: "~140K", label: en ? "Registered PYMES" : "PYMES Registradas", source: "INEC / MEIC" },
      { value: "70%+", label: en ? "Employment Share" : "Empleo Generado", source: "MEIC 2025" },
      { value: "50%", label: en ? "Use Some AI" : "Usan Algún AI", source: "Microsoft 2025" },
      { value: "40%", label: en ? "PYME Growth YoY" : "Crecimiento Anual", source: "MEIC 2025" },
      { value: "69%", label: en ? "Plan AI Investment" : "Planean Invertir AI", source: "Microsoft 2025" }
    ]
  },
  risks: [
    {
      title: en ? "Job Displacement in SME Sectors" : "Desplazamiento Laboral en Sectores PYME",
      severity: en ? "HIGH" : "ALTO",
      color: "#ef4444",
      desc: en ? "SMEs in retail, food service, and professional services face 30-50% task automation by 2028. Unlike Free Zone companies with dedicated reskilling budgets, most PYMES lack resources for workforce transition programs. The ILO estimates 34% of CR's informal workers are in highly automatable roles."
           : "PYMES en comercio, alimentación y servicios profesionales enfrentan automatización de 30-50% de tareas para 2028. A diferencia de empresas de Zonas Francas con presupuestos dedicados de recapacitación, la mayoría de PYMES carecen de recursos para programas de transición laboral. La OIT estima que 34% de los trabajadores informales de CR están en roles altamente automatizables."
    },
    {
      title: en ? "Technology Adoption Cost Barrier" : "Barrera de Costo de Adopción Tecnológica",
      severity: en ? "HIGH" : "ALTO",
      color: "#f59e0b",
      desc: en ? "AI SaaS tools cost $50-500/month per seat. For a 5-person SME earning $15K/month, this represents 2-10% of revenue. Most CR PYMES operate on margins below 10%, making AI adoption a financial stretch without subsidies or tax incentives."
           : "Herramientas AI SaaS cuestan $50-500/mes por usuario. Para una PYME de 5 personas que gana $15K/mes, esto representa 2-10% de ingresos. La mayoría de PYMES CR operan con márgenes debajo del 10%, haciendo la adopción de AI un estiramiento financiero sin subsidios o incentivos fiscales."
    },
    {
      title: en ? "Cybersecurity Vulnerability" : "Vulnerabilidad de Ciberseguridad",
      severity: en ? "CRITICAL" : "CRÍTICO",
      color: "#ef4444",
      desc: en ? "An estimated 98% of CR SMEs have zero formal cybersecurity measures. AI-powered phishing increasingly targets Spanish-speaking businesses with highly convincing emails. Post-Conti (2022) awareness is high but investment remains critically low — most PYMES spend $0 on cybersecurity annually."
           : "Se estima que el 98% de PYMES CR tienen cero medidas formales de ciberseguridad. Phishing potenciado por AI cada vez más apunta a negocios hispanohablantes con correos altamente convincentes. La conciencia post-Conti (2022) es alta pero la inversión sigue críticamente baja — la mayoría de PYMES gastan $0 en ciberseguridad anualmente."
    },
    {
      title: en ? "Digital Divide Widening" : "Brecha Digital Ampliándose",
      severity: en ? "MEDIUM" : "MEDIO",
      color: "#f97316",
      desc: en ? "Free Zone companies invest $10K-50K/employee in AI tools and training. SMEs invest less than $500/employee. Without policy intervention, the productivity gap between formal/FZ and informal/SME sectors will accelerate into a K-shaped economy where AI amplifies existing inequalities."
           : "Empresas de Zonas Francas invierten $10K-50K/empleado en herramientas AI y capacitación. PYMES invierten menos de $500/empleado. Sin intervención de política, la brecha de productividad entre sectores formal/ZF e informal/PYME se acelerará hacia una economía en K donde la AI amplifica desigualdades existentes."
    },
    {
      title: en ? "Regulatory Compliance Burden" : "Carga de Cumplimiento Regulatorio",
      severity: en ? "MEDIUM" : "MEDIO",
      color: "#f59e0b",
      desc: en ? "Upcoming AI regulations (EU AI Act extraterritorial reach, potential CR law) will create compliance costs that large firms absorb easily but may crush SMEs. Costa Rica needs proportional regulation — exemptions or simplified frameworks for businesses under 50 employees."
           : "Próximas regulaciones AI (alcance extraterritorial EU AI Act, potencial ley CR) crearán costos de cumplimiento que firmas grandes absorben fácilmente pero podrían aplastar a PYMES. Costa Rica necesita regulación proporcional — exenciones o marcos simplificados para negocios con menos de 50 empleados."
    }
  ],
  opportunities: [
    {
      title: en ? "Operational Efficiency via AI Tools" : "Eficiencia Operativa vía Herramientas AI",
      impact: en ? "HIGH" : "ALTO",
      color: "#10b981",
      desc: en ? "AI accounting (QuickBooks AI, Xero), inventory management, and customer service chatbots can reduce SME overhead by 20-40%. Free/low-cost tools already available: ChatGPT for drafting, Canva AI for design, Notion AI for documentation, Google Workspace AI for email/docs."
           : "Contabilidad AI (QuickBooks AI, Xero), gestión de inventarios y chatbots de servicio al cliente pueden reducir gastos operativos PYME en 20-40%. Herramientas gratuitas/bajo costo ya disponibles: ChatGPT para redacción, Canva AI para diseño, Notion AI para documentación, Google Workspace AI para correo/docs."
    },
    {
      title: en ? "Market Access & E-Commerce" : "Acceso a Mercados y E-Commerce",
      impact: en ? "HIGH" : "ALTO",
      color: "#2563eb",
      desc: en ? "AI-powered platforms enable PYMES to sell internationally: automated translation, dynamic pricing, personalized marketing, AI-generated product photography. PROCOMER's programs support export-ready PYMES — AI tools can dramatically lower the barrier to entry for international trade."
           : "Plataformas potenciadas por AI permiten a PYMES vender internacionalmente: traducción automatizada, precios dinámicos, marketing personalizado, fotografía de producto generada por AI. Los programas de PROCOMER apoyan PYMES listas para exportar — herramientas AI pueden reducir dramáticamente la barrera de entrada al comercio internacional."
    },
    {
      title: en ? "AI-Augmented Professional Services" : "Servicios Profesionales Aumentados por AI",
      impact: en ? "HIGH" : "ALTO",
      color: "#6366f1",
      desc: en ? "SME accountants, lawyers, consultants, and architects can use AI to serve 3-5x more clients at the same quality level. AI drafts contracts, generates financial reports, analyzes regulatory compliance, and creates technical documentation. Professional services PYMES have the highest ROI from AI adoption."
           : "Contadores, abogados, consultores y arquitectos PYME pueden usar AI para servir 3-5x más clientes al mismo nivel de calidad. AI redacta contratos, genera reportes financieros, analiza cumplimiento regulatorio y crea documentación técnica. PYMES de servicios profesionales tienen el mayor ROI de adopción de AI."
    },
    {
      title: en ? "Precision Agriculture for Small Farms" : "Agricultura de Precisión para Fincas Pequeñas",
      impact: en ? "MEDIUM" : "MEDIO",
      color: "#10b981",
      desc: en ? "87% of CR farms are small/medium scale. AI drones for crop monitoring ($200/season), mobile disease detection apps (free), yield prediction models. Coffee rust detection AI achieves 95%+ accuracy — critical for CR's $300M+ coffee export industry. Banana and pineapple sectors also benefit."
           : "87% de fincas CR son de pequeña/mediana escala. Drones AI para monitoreo de cultivos ($200/temporada), apps móviles de detección de enfermedades (gratis), modelos de predicción de rendimiento. AI de detección de roya del café alcanza 95%+ precisión — crítico para la industria exportadora de café de CR de $300M+. Sectores de banano y piña también se benefician."
    },
    {
      title: en ? "Tourism AI for CR's #1 Industry" : "AI Turismo para Industria #1 de CR",
      impact: en ? "HIGH" : "ALTO",
      color: "#ec4899",
      desc: en ? "AI chatbots for multilingual bookings, dynamic pricing optimization, personalized itinerary generation, automated review management and response. Tourism PYMES (hotels, eco-lodges, tour operators, restaurants) can compete with international chains using AI at a fraction of the cost."
           : "Chatbots AI para reservas multilingüe, optimización de precios dinámicos, generación de itinerarios personalizados, gestión automatizada de reseñas y respuestas. PYMES de turismo (hoteles, eco-lodges, operadores turísticos, restaurantes) pueden competir con cadenas internacionales usando AI a una fracción del costo."
    }
  ],
  programs: {
    title: en ? "Support Programs & Resources" : "Programas de Apoyo y Recursos",
    items: [
      { name: "PROCOMER", desc: en ? "Export readiness programs + market intelligence for PYMES looking to internationalize" : "Programas de preparación exportadora + inteligencia de mercados para PYMES buscando internacionalizarse", url: "https://www.procomer.com/" },
      { name: "MEIC / DIGEPYME", desc: en ? "Official SME registry, business development training, financing access programs" : "Registro oficial PYMES, capacitación desarrollo empresarial, programas acceso a financiamiento", url: "https://www.meic.go.cr/" },
      { name: "SBD", desc: en ? "Sistema de Banca para el Desarrollo — subsidized credit lines for technology adoption" : "Sistema de Banca para el Desarrollo — líneas de crédito subsidiadas para adopción tecnológica", url: "https://www.sbdcr.com/" },
      { name: "INA", desc: en ? "Free technical training institute (currently lacks dedicated AI curriculum — key gap)" : "Instituto técnico de capacitación gratuita (actualmente carece de currículo AI dedicado — brecha clave)", url: "https://www.ina.ac.cr/" },
      { name: "MICITT", desc: en ? "Ministry of Science & Technology — digital literacy programs, technology policy coordination" : "Ministerio de Ciencia y Tecnología — programas de alfabetización digital, coordinación de política tecnológica", url: "https://www.micitt.go.cr/" }
    ]
  },
  recommendations: [
    en ? "Create 'AI Starter Kit' program for PYMES: curated free/low-cost tools catalog + 2-day practical training workshops (MEIC + INA partnership)"
       : "Crear programa 'AI Starter Kit' para PYMES: catálogo curado de herramientas gratuitas/bajo costo + talleres de capacitación práctica de 2 días (alianza MEIC + INA)",
    en ? "Establish proportional AI regulation: simplified self-assessment for businesses under 50 employees, exemptions from full compliance burden"
       : "Establecer regulación AI proporcional: auto-evaluación simplificada para negocios con menos de 50 empleados, exenciones de carga de cumplimiento total",
    en ? "SBD credit lines specifically for AI tool adoption ($5K-$20K per PYME, subsidized interest, 3-year terms)"
       : "Líneas de crédito SBD específicamente para adopción de herramientas AI ($5K-$20K por PYME, interés subsidiado, plazos de 3 años)",
    en ? "PROCOMER AI export readiness program: train PYMES to use AI for international market research, automated translation, and digital marketing"
       : "Programa de preparación exportadora AI de PROCOMER: capacitar PYMES para usar AI en investigación de mercados internacionales, traducción automatizada y marketing digital",
    en ? "MICITT cybersecurity voucher program: subsidized basic security assessment + AI-powered threat monitoring for SMEs ($500-$2K vouchers)"
       : "Programa de vouchers de ciberseguridad MICITT: evaluación de seguridad básica subsidiada + monitoreo de amenazas potenciado por AI para PYMES (vouchers de $500-$2K)"
  ],
  sources: [
    { name: "MEIC — Estado PYMES CR", url: "https://www.meic.go.cr/" },
    { name: "PROCOMER — Exportaciones PYMES", url: "https://www.procomer.com/" },
    { name: "Microsoft/Ipsos — PYMES AI Survey 2025", url: "https://news.microsoft.com/es-xl/50-de-las-pymes-en-costa-rica-utilizan-algun-tipo-de-ia/" },
    { name: "MICITT — ENIA 2024-2027", url: "https://www.micitt.go.cr/" },
    { name: "CEPAL — ILIA 2025", url: "https://www.cepal.org/" },
    { name: "ILO — AI and SMEs", url: "https://www.ilo.org/" },
    { name: "OECD — SMEs in the AI Economy", url: "https://www.oecd.org/" },
    { name: "WEF Future of Jobs 2025", url: "https://www.weforum.org/" }
  ]
});

// ── SECURITY DEEP ANALYSIS ──
export const SEC_DEEP = (en) => ({
  threats: [
    { name: en ? "Prompt Injection" : "Inyección de Prompts", icon: "💉", severity: en ? "CRITICAL" : "CRÍTICO",
      desc: en ? "An attack where malicious instructions are embedded in user inputs or external data to manipulate AI model behavior. The attacker crafts text that causes the AI to ignore its original instructions and follow the attacker's commands instead. Types include: Direct injection (user provides malicious prompt), Indirect injection (malicious content embedded in retrieved documents/websites), and Universal jailbreaks (prompts that work across multiple AI models)." : "Un ataque donde instrucciones maliciosas se embeben en entradas del usuario o datos externos para manipular el comportamiento del modelo AI. El atacante diseña texto que causa que la AI ignore sus instrucciones originales y siga los comandos del atacante. Tipos incluyen: Inyección directa (usuario provee prompt malicioso), Inyección indirecta (contenido malicioso embebido en documentos/sitios web recuperados), y Jailbreaks universales (prompts que funcionan en múltiples modelos AI).",
      crImplication: en ? "Government AI deployments (chatbots, document processing) are vulnerable. No testing standards exist." : "Despliegues AI gubernamentales (chatbots, procesamiento documentos) son vulnerables. No existen estándares de pruebas.",
      mitigation: en ? "OWASP LLM Top 10 compliance, input sanitization, output filtering, red team testing" : "Cumplimiento OWASP LLM Top 10, sanitización entradas, filtrado salidas, pruebas red team" },
    { name: "Shadow AI", icon: "👻", severity: en ? "HIGH" : "ALTO",
      desc: en ? "Unauthorized use of AI tools by employees without IT department knowledge or approval. Employees use ChatGPT, Copilot, or other AI tools to process sensitive company/government data, creating uncontrolled data exposure. Studies show 55-70% of knowledge workers use AI tools their employer hasn't approved." : "Uso no autorizado de herramientas AI por empleados sin conocimiento o aprobación del departamento IT. Empleados usan ChatGPT, Copilot u otras herramientas AI para procesar datos sensibles de empresa/gobierno, creando exposición de datos no controlada. Estudios muestran que 55-70% de trabajadores del conocimiento usan herramientas AI que su empleador no ha aprobado.",
      crImplication: en ? "Government institutions lack AI usage policies. CCSS patient data, BCCR financial data potentially exposed." : "Instituciones gubernamentales carecen de políticas de uso AI. Datos pacientes CCSS, datos financieros BCCR potencialmente expuestos.",
      mitigation: en ? "AI usage policies, approved tool lists, data classification, employee training" : "Políticas uso AI, listas herramientas aprobadas, clasificación datos, capacitación empleados" },
    { name: en ? "MCP Protocol Risks" : "Riesgos Protocolo MCP", icon: "🔗", severity: en ? "HIGH" : "ALTO",
      desc: en ? "Model Context Protocol (MCP) allows AI models to connect to external tools and data sources. While powerful, it creates new attack surfaces: tool poisoning (malicious tool descriptions), excessive permissions, data exfiltration via tool calls, and supply chain attacks through compromised MCP servers." : "Model Context Protocol (MCP) permite a modelos AI conectarse con herramientas y fuentes de datos externas. Aunque poderoso, crea nuevas superficies de ataque: envenenamiento de herramientas (descripciones maliciosas), permisos excesivos, exfiltración datos vía llamadas herramientas, y ataques cadena suministro a través de servidores MCP comprometidos.",
      crImplication: en ? "FZ companies adopting AI agent architectures need security guidelines. No standards exist in CR." : "Empresas ZF adoptando arquitecturas agentes AI necesitan guías seguridad. No existen estándares en CR.",
      mitigation: en ? "Least-privilege tool permissions, server authentication, input/output validation" : "Permisos herramientas mínimo privilegio, autenticación servidores, validación entrada/salida" },
    { name: "Deepfakes", icon: "🎭", severity: en ? "HIGH" : "ALTO",
      desc: en ? "AI-generated synthetic media (video, audio, images) that convincingly impersonate real people. Used for: electoral manipulation (fake candidate statements), financial fraud (CEO voice cloning for wire transfers), reputation attacks, and social engineering. Costa Rica's Feb 2026 elections were the first to face significant deepfake threats in Central America." : "Medios sintéticos generados por AI (video, audio, imágenes) que suplantan convincentemente a personas reales. Usados para: manipulación electoral (declaraciones falsas de candidatos), fraude financiero (clonación voz CEO para transferencias), ataques reputación e ingeniería social. Elecciones Feb 2026 de Costa Rica fueron las primeras en enfrentar amenazas significativas de deepfakes en Centroamérica.",
      crImplication: en ? "TSE lacks deepfake detection capability. Post-election analysis shows several viral deepfakes circulated." : "TSE carece de capacidad detección deepfakes. Análisis post-electoral muestra varios deepfakes virales circularon.",
      mitigation: en ? "TSE deepfake detection unit, mandatory AI content labeling, media literacy programs" : "Unidad detección deepfakes TSE, etiquetado obligatorio contenido AI, programas alfabetización mediática" },
    { name: en ? "AI Supply Chain" : "Cadena Suministro AI", icon: "📦", severity: en ? "MEDIUM" : "MEDIO",
      desc: en ? "Vulnerabilities in the AI development and deployment supply chain: poisoned training data, backdoored pre-trained models, compromised ML libraries, and malicious model weights. Most organizations use models from a few providers (OpenAI, Google, Meta, Anthropic), creating concentration risk." : "Vulnerabilidades en la cadena de suministro de desarrollo y despliegue AI: datos de entrenamiento envenenados, modelos pre-entrenados con backdoors, bibliotecas ML comprometidas y pesos de modelo maliciosos. La mayoría de organizaciones usan modelos de pocos proveedores (OpenAI, Google, Meta, Anthropic), creando riesgo de concentración.",
      crImplication: en ? "CR has zero capability to audit AI models used by government or FZ companies." : "CR tiene cero capacidad para auditar modelos AI usados por gobierno o empresas ZF.",
      mitigation: en ? "Model auditing requirements, approved model registries, AI bill of materials (AI-BOM)" : "Requisitos auditoría modelos, registros modelos aprobados, lista materiales AI (AI-BOM)" },
    { name: en ? "AI-Enhanced Bioweapons" : "Bioarmas Potenciadas AI", icon: "🧬", severity: en ? "EMERGING" : "EMERGENTE",
      desc: en ? "AI models can generate novel protein sequences, drug compounds, and biological agents. WEF 2026 rates this as emerging risk: AI lowers the barrier for designing dangerous pathogens. Dual-use concern: same tools that accelerate drug discovery can theoretically design bioweapons." : "Modelos AI pueden generar secuencias proteínicas novedosas, compuestos farmacéuticos y agentes biológicos. WEF 2026 califica esto como riesgo emergente: AI reduce la barrera para diseñar patógenos peligrosos. Preocupación dual-use: mismas herramientas que aceleran descubrimiento fármacos pueden teóricamente diseñar bioarmas.",
      crImplication: en ? "CR's pharmaceutical and medical device FZ sector must implement biosecurity AI governance." : "Sector ZF farmacéutico y dispositivos médicos de CR debe implementar gobernanza AI de bioseguridad.",
      mitigation: en ? "Biosecurity protocols in AI regulation, dual-use research oversight, international cooperation" : "Protocolos bioseguridad en regulación AI, supervisión investigación dual-use, cooperación internacional" }
  ],
  foodSecurity: {
    title: en ? "AI & Food Security" : "AI y Seguridad Alimentaria",
    useCases: [
      { name: en ? "Precision Agriculture" : "Agricultura de Precisión", desc: en ? "AI-powered drone monitoring, soil analysis, crop health detection. Potential: 15-25% yield increase in CR coffee and banana sectors." : "Monitoreo drones potenciado AI, análisis suelo, detección salud cultivos. Potencial: 15-25% aumento rendimiento en sectores café y banano CR." },
      { name: en ? "Water Management" : "Gestión del Agua", desc: en ? "AI optimization of irrigation in Guanacaste dry corridor. Predictive models for drought and flood events." : "Optimización AI del riego en corredor seco Guanacaste. Modelos predictivos para eventos sequía e inundación." },
      { name: en ? "Disease Detection" : "Detección de Enfermedades", desc: en ? "Computer vision to identify coffee rust, banana TR4, and other crop diseases early. MAG could deploy mobile phone-based detection." : "Visión computacional para identificar roya café, TR4 banano y otras enfermedades cultivos tempranamente. MAG podría desplegar detección basada en teléfono móvil." }
    ]
  },
  socialSecurity: {
    title: en ? "AI & Social Security (CCSS)" : "AI y Seguridad Social (CCSS)",
    opportunities: [
      en ? "Predictive medicine: AI triage reducing EBAIS wait times by 30-40%" : "Medicina predictiva: triaje AI reduciendo tiempos espera EBAIS 30-40%",
      en ? "EDUS electronic health records: AI analysis for population health patterns" : "Expediente electrónico EDUS: análisis AI para patrones salud poblacional",
      en ? "Cost reduction: AI scheduling optimization saving CCSS estimated ₡15-20B/year" : "Reducción costos: optimización programación AI ahorrando CCSS estimados ₡15-20B/año",
      en ? "Drug interaction detection: AI screening for dangerous medication combinations" : "Detección interacciones medicamentos: screening AI para combinaciones peligrosas"
    ],
    risks: [
      en ? "Patient data privacy: CCSS holds health data for 5.2M citizens" : "Privacidad datos pacientes: CCSS tiene datos salud de 5.2M ciudadanos",
      en ? "Algorithmic bias in diagnosis could disproportionately affect rural/indigenous populations" : "Sesgo algorítmico en diagnóstico podría afectar desproporcionadamente poblaciones rurales/indígenas"
    ]
  },
  cyberSME: {
    title: en ? "Cybersecurity for SMEs" : "Ciberseguridad para PYMES",
    challenges: [
      en ? "98% of CR businesses are SMEs — most have zero cybersecurity measures" : "98% de negocios CR son PYMES — mayoría tiene cero medidas ciberseguridad",
      en ? "Post-Conti: awareness high but investment low (budget constraints)" : "Post-Conti: conciencia alta pero inversión baja (restricciones presupuesto)",
      en ? "AI-powered phishing attacks increasingly target Spanish-speaking SMEs" : "Ataques phishing potenciados AI cada vez más apuntan a PYMES hispanohablantes"
    ],
    recommendations: [
      en ? "MICITT free cybersecurity assessment tool for SMEs" : "Herramienta evaluación ciberseguridad gratuita MICITT para PYMES",
      en ? "AI-powered threat detection as affordable SaaS for small businesses" : "Detección amenazas potenciada AI como SaaS asequible para pequeños negocios",
      en ? "Mandatory basic cybersecurity certification for businesses processing personal data" : "Certificación básica ciberseguridad obligatoria para negocios procesando datos personales"
    ]
  },
  useCases: [
    { sector: en ? "Streets / Public Safety" : "Calles / Seguridad Pública", examples: [en ? "AI traffic management (San José congestion)" : "Gestión tráfico AI (congestión San José)", en ? "Smart surveillance with privacy safeguards" : "Vigilancia inteligente con salvaguardas privacidad", en ? "Emergency response optimization (Bomberos, Cruz Roja)" : "Optimización respuesta emergencias (Bomberos, Cruz Roja)"] },
    { sector: en ? "National Security" : "Seguridad Nacional", examples: [en ? "Port security (AI container scanning at Limón/Caldera)" : "Seguridad portuaria (escaneo contenedores AI en Limón/Caldera)", en ? "Maritime surveillance (Pacific EEZ monitoring)" : "Vigilancia marítima (monitoreo ZEE Pacífico)", en ? "Anti-narcotics intelligence (pattern detection)" : "Inteligencia antinarcóticos (detección patrones)"] },
    { sector: en ? "Medicine" : "Medicina", examples: [en ? "CCSS predictive diagnostics" : "Diagnósticos predictivos CCSS", en ? "Radiology AI (image analysis for Hospital México, CENARE)" : "AI radiología (análisis imágenes Hospital México, CENARE)", en ? "Mental health screening in EBAIS primary care" : "Screening salud mental en atención primaria EBAIS"] },
    { sector: en ? "Cultural / Education" : "Cultural / Educación", examples: [en ? "UCR: NLP research for Costa Rican Spanish" : "UCR: investigación PLN para español costarricense", en ? "TEC: computer vision for biodiversity monitoring" : "TEC: visión computacional para monitoreo biodiversidad", en ? "MEP: adaptive learning platforms for K-12" : "MEP: plataformas aprendizaje adaptativo para K-12"] }
  ],
  priorityActions: [
    { action: en ? "Establish AI Safety Testing Lab" : "Establecer Laboratorio Pruebas Seguridad AI", why: en ? "No entity in CR can currently test AI systems for vulnerabilities, bias, or compliance. Singapore's IMDA tests 200+ AI systems/year." : "Ninguna entidad en CR puede actualmente probar sistemas AI para vulnerabilidades, sesgo o cumplimiento. IMDA de Singapur prueba 200+ sistemas AI/año.", comparison: en ? "Singapore: IMDA AI testing since 2022. South Korea: AI Safety Institute (2025)." : "Singapur: pruebas AI IMDA desde 2022. Corea del Sur: Instituto Seguridad AI (2025)." },
    { action: en ? "Mandate AI Incident Reporting" : "Mandatar Reporte de Incidentes AI", why: en ? "Currently no obligation to report AI failures, biases, or security breaches. Without data, no evidence-based policy possible." : "Actualmente sin obligación de reportar fallos AI, sesgos o brechas seguridad. Sin datos, no es posible política basada en evidencia.", comparison: en ? "EU AI Act: mandatory reporting for high-risk AI. US: voluntary NIST framework." : "EU AI Act: reporte obligatorio para AI alto riesgo. EEUU: marco voluntario NIST." },
    { action: en ? "Create CSIRT-AI (AI-specific incident response)" : "Crear CSIRT-AI (respuesta incidentes AI específica)", why: en ? "The existing CSIRT-CR handles traditional cyber incidents but lacks AI-specific expertise (adversarial attacks, model theft, deepfakes)." : "El CSIRT-CR existente maneja incidentes cyber tradicionales pero carece de expertise AI específico (ataques adversariales, robo modelos, deepfakes).", comparison: en ? "UK: AI Safety Institute with £100M budget. Japan: AI Safety Center (AISC) launched 2024." : "UK: Instituto Seguridad AI con presupuesto £100M. Japón: Centro Seguridad AI (AISC) lanzado 2024." }
  ],
  futureOutlook: [
    { year: "2026", event: en ? "EU AI Act full enforcement — FZ compliance deadline" : "Aplicación total EU AI Act — fecha límite cumplimiento ZF" },
    { year: "2027", event: en ? "AI agents become standard in enterprise — new security paradigm needed" : "Agentes AI se vuelven estándar en empresa — nuevo paradigma seguridad necesario" },
    { year: "2028", event: en ? "Quantum computing threatens current encryption — AI systems must adapt" : "Computación cuántica amenaza encriptación actual — sistemas AI deben adaptarse" },
    { year: "2029", event: en ? "Autonomous AI systems in critical infrastructure (power, water, transport)" : "Sistemas AI autónomos en infraestructura crítica (energía, agua, transporte)" },
    { year: "2030", event: en ? "Physical AI + humanoid robots create new security domains" : "AI Física + robots humanoides crean nuevos dominios de seguridad" }
  ],
  news: [
    { headline: en ? "ICE Costa Rica Breached by UNC2814 (2025): Chinese State Actor Targets $40M 5G Tender" : "ICE Costa Rica Vulnerado por UNC2814 (2025): Actor Estatal Chino Ataca Licitación 5G de $40M", source: "Mandiant / CRHoy / La Nación", url: "https://www.crhoy.com/nacionales/hackeo-al-ice-habria-sido-perpetrado-por-grupo-chino/", significance: en ? "Chinese state-affiliated threat actor UNC2814 breached ICE during its $40M 5G infrastructure tender process. Mandiant forensics identified the group. 9GB of email data exfiltrated including tender documents, internal communications, and strategic infrastructure plans. ICE manages electricity for 5M+ citizens, internet backbone, and mobile networks. Espionage motive: influence 5G vendor selection (Huawei vs Western competitors). Third major institutional breach after Hacienda/Conti (2022) and CCSS (2022)." : "Actor estatal chino UNC2814 vulneró al ICE durante su proceso de licitación de infraestructura 5G de $40M. Mandiant identificó al grupo mediante análisis forense. 9GB de datos de correo exfiltrados incluyendo documentos de licitación, comunicaciones internas y planes de infraestructura estratégica. ICE gestiona electricidad para 5M+ ciudadanos, backbone de internet y redes móviles. Motivo de espionaje: influir en selección de proveedor 5G (Huawei vs competidores occidentales). Tercer gran hackeo institucional tras Hacienda/Conti (2022) y CCSS (2022)." },
    { headline: en ? "AI Agent Hacks McKinsey's Lilli Platform in 2 Hours (2025): 46.5M Messages Exposed" : "Agente AI Hackea Plataforma Lilli de McKinsey en 2 Horas (2025): 46.5M Mensajes Expuestos", source: "CodeWall / TechCrunch / Wired", url: "https://www.wired.com/story/codewall-ai-agent-mckinsey-lilli-hack/", significance: en ? "CodeWall's autonomous AI security agent breached McKinsey's internal Lilli AI platform (built on GPT-4) in under 2 hours with zero human intervention. Exposed 46.5M internal messages, client engagement data, and proprietary methodologies. The AI agent chained multiple vulnerabilities: API authentication bypass → privilege escalation → data exfiltration. Demonstrates that AI-powered attacks can compromise even the most sophisticated organizations. Implications for CR: if McKinsey's defenses fall to an AI agent, Costa Rican institutions are exponentially more vulnerable." : "El agente autónomo de seguridad AI de CodeWall vulneró la plataforma interna Lilli de McKinsey (construida sobre GPT-4) en menos de 2 horas sin intervención humana. Expuso 46.5M mensajes internos, datos de compromisos con clientes y metodologías propietarias. El agente AI encadenó múltiples vulnerabilidades: bypass de autenticación API → escalación de privilegios → exfiltración de datos. Demuestra que ataques potenciados por AI pueden comprometer incluso las organizaciones más sofisticadas. Implicaciones para CR: si las defensas de McKinsey caen ante un agente AI, instituciones costarricenses son exponencialmente más vulnerables." },
    { headline: en ? "RECOPE Ransomware Attack (Nov 2024): $5M Ransom Demanded" : "Ataque Ransomware a RECOPE (Nov 2024): $5M de Rescate Exigido", source: "La Nación / Semanario Universidad", url: "https://www.nacion.com/", significance: en ? "RansomHub group attacked Costa Rica's state oil refinery (RECOPE), encrypting critical systems and demanding $5M in cryptocurrency. Forced manual fuel distribution operations for weeks. RECOPE processes 100% of CR's petroleum products — attack threatened fuel supply for 5M citizens. Fourth major attack on CR critical infrastructure in 3 years (after Hacienda, CCSS, ICE)." : "Grupo RansomHub atacó la refinería estatal de petróleo (RECOPE), cifrando sistemas críticos y exigiendo $5M en criptomonedas. Forzó operaciones manuales de distribución de combustible por semanas. RECOPE procesa 100% de productos petroleros de CR — ataque amenazó suministro de combustible para 5M ciudadanos. Cuarto ataque mayor a infraestructura crítica CR en 3 años (tras Hacienda, CCSS, ICE)." },
    { headline: en ? "DGME Migration System Breached (Nov 2024): Passport & Visa Data Compromised" : "Sistema Migratorio DGME Vulnerado (Nov 2024): Datos de Pasaportes y Visas Comprometidos", source: "Amelía Rueda / CRHoy", url: "https://www.ameliarueda.com/", significance: en ? "Costa Rica's immigration authority (DGME) suffered data breach exposing passport records, visa applications, and biometric data. Sensitive personal information of thousands of citizens and foreign residents compromised. Highlights pattern: CR government systems remain systematically vulnerable despite Conti lessons from 2022." : "Autoridad migratoria de Costa Rica (DGME) sufrió brecha de datos exponiendo registros de pasaportes, solicitudes de visa y datos biométricos. Información personal sensible de miles de ciudadanos y residentes extranjeros comprometida. Evidencia patrón: sistemas gubernamentales CR siguen siendo sistemáticamente vulnerables pese a lecciones de Conti en 2022." },
    { headline: en ? "CONTI Ransomware Legacy: 30 CR Institutions Hit (2022)" : "Legado Ransomware CONTI: 30 Instituciones CR Atacadas (2022)", source: "BBC / MICITT", url: "https://www.bbc.com/news/technology-61323402", significance: en ? "Largest government cyberattack in LATAM history. Recovery still ongoing in 2026." : "Mayor ciberataque gubernamental en historia LATAM. Recuperación aún en curso en 2026." },
    { headline: en ? "WEF 2026: AI Misinfo is #1 Risk for 3rd Consecutive Year" : "WEF 2026: Desinfo AI es Riesgo #1 por 3er Año Consecutivo", source: "WEF Global Risks 2026", url: "https://www.weforum.org/publications/global-risks-report-2026/", significance: en ? "Misinformation/disinformation remains top-ranked global risk across all time horizons." : "Desinformación/misinformación sigue como riesgo global #1 en todos los horizontes temporales." },
    { headline: en ? "OWASP LLM Top 10 v2.0 Released (2025)" : "OWASP LLM Top 10 v2.0 Publicado (2025)", source: "OWASP", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/", significance: en ? "Updated security standard for LLM applications. CR has no equivalent guideline." : "Estándar seguridad actualizado para aplicaciones LLM. CR no tiene guía equivalente." },
    { headline: en ? "AI-Generated Voice Scam Hits LATAM Banks ($2.3M losses)" : "Estafa Voz Generada AI Golpea Bancos LATAM ($2.3M pérdidas)", source: "Reuters", url: "https://www.reuters.com/", significance: en ? "CEO voice cloning used to authorize fraudulent wire transfers. Multiple LATAM banks affected." : "Clonación voz CEO usada para autorizar transferencias fraudulentas. Múltiples bancos LATAM afectados." }
  ],

  // ── NEW: Personal Cybersecurity Guide ──
  personalSecurity: {
    title: en ? "Personal Cybersecurity Checklist — Protect Yourself in the AI Era" : "Checklist de Ciberseguridad Personal — Protéjase en la Era AI",
    intro: en
      ? "AI has supercharged cyberattacks: phishing emails are now grammatically perfect, voices can be cloned in 3 seconds, and deepfakes are indistinguishable from reality. Every Costa Rican citizen is a potential target. Follow these steps to protect yourself and your family."
      : "AI ha potenciado los ciberataques: correos phishing ahora son gramaticalmente perfectos, voces pueden clonarse en 3 segundos, y deepfakes son indistinguibles de la realidad. Cada ciudadano costarricense es un objetivo potencial. Siga estos pasos para protegerse a usted y su familia.",
    categories: [
      {
        name: en ? "Passwords & Authentication" : "Contraseñas y Autenticación",
        icon: "🔑",
        color: "#ef4444",
        items: [
          en ? "Use a unique password for EVERY account — never reuse passwords across sites" : "Use una contraseña única para CADA cuenta — nunca reutilice contraseñas entre sitios",
          en ? "Enable Two-Factor Authentication (2FA) on all accounts, especially email, banking, and social media" : "Active Autenticación de Dos Factores (2FA) en todas las cuentas, especialmente correo, banca y redes sociales",
          en ? "Use a password manager (Bitwarden, 1Password) instead of writing passwords down or memorizing them" : "Use un administrador de contraseñas (Bitwarden, 1Password) en lugar de escribirlas o memorizarlas",
          en ? "Change your email password NOW if you haven't in the last 6 months — email is the master key to all your accounts" : "Cambie su contraseña de correo AHORA si no lo ha hecho en los últimos 6 meses — el correo es la llave maestra de todas sus cuentas",
          en ? "Minimum 12 characters, mix letters/numbers/symbols. Avoid names, dates, cédula numbers" : "Mínimo 12 caracteres, mezcle letras/números/símbolos. Evite nombres, fechas, números de cédula"
        ]
      },
      {
        name: en ? "AI & Chatbot Safety" : "Seguridad con AI y Chatbots",
        icon: "🤖",
        color: "#6366f1",
        items: [
          en ? "NEVER share personal information (cédula, address, phone) with any AI chatbot — not even ChatGPT, Claude, or Gemini" : "NUNCA comparta información personal (cédula, dirección, teléfono) con ningún chatbot AI — ni siquiera ChatGPT, Claude o Gemini",
          en ? "NEVER enter passwords, banking details, or credit card numbers into any AI system" : "NUNCA introduzca contraseñas, datos bancarios o números de tarjeta en ningún sistema AI",
          en ? "Be extremely cautious with AI on unknown websites — they may harvest your data or inject malware" : "Sea extremadamente cauteloso con AI en sitios web desconocidos — pueden recopilar sus datos o inyectar malware",
          en ? "AI-generated phishing emails are now grammatically perfect in Spanish — don't trust an email just because it's well-written" : "Correos phishing generados por AI ahora son gramaticalmente perfectos en español — no confíe en un correo solo porque está bien escrito",
          en ? "Verify any AI-recommended links before clicking — AI can be manipulated to serve malicious URLs" : "Verifique cualquier enlace recomendado por AI antes de hacer clic — AI puede ser manipulada para servir URLs maliciosas"
        ]
      },
      {
        name: en ? "Device & App Updates" : "Actualizaciones de Dispositivos y Apps",
        icon: "📱",
        color: "#0ea5e9",
        items: [
          en ? "Enable automatic updates on ALL devices (phone, computer, tablet, smart TV)" : "Active actualizaciones automáticas en TODOS los dispositivos (teléfono, computadora, tablet, smart TV)",
          en ? "Update apps immediately when prompted — delays create vulnerability windows" : "Actualice apps inmediatamente cuando se le solicite — retrasos crean ventanas de vulnerabilidad",
          en ? "Update your router firmware (most people never do this — it's your home network's front door)" : "Actualice el firmware de su router (la mayoría nunca lo hace — es la puerta principal de su red doméstica)",
          en ? "Remove apps you no longer use — old apps with unpatched vulnerabilities are attack vectors" : "Elimine apps que ya no usa — apps viejas con vulnerabilidades sin parchear son vectores de ataque",
          en ? "Only install apps from official stores (App Store, Google Play) — avoid APK sideloading" : "Solo instale apps de tiendas oficiales (App Store, Google Play) — evite instalar APKs de terceros"
        ]
      },
      {
        name: en ? "Banking & Financial Protection" : "Protección Bancaria y Financiera",
        icon: "💳",
        color: "#10b981",
        items: [
          en ? "Enable transaction alerts (SMS/email) for ALL bank accounts and credit cards" : "Active alertas de transacciones (SMS/correo) para TODAS las cuentas bancarias y tarjetas de crédito",
          en ? "Never access banking from public WiFi — use mobile data or a VPN instead" : "Nunca acceda a banca desde WiFi público — use datos móviles o un VPN",
          en ? "Verify the URL before entering banking credentials (look for the padlock + correct domain)" : "Verifique la URL antes de ingresar credenciales bancarias (busque el candado + dominio correcto)",
          en ? "Set daily transfer limits on your accounts to minimize damage from unauthorized access" : "Establezca límites diarios de transferencia en sus cuentas para minimizar daño por acceso no autorizado",
          en ? "AI voice cloning can now impersonate your bank — if you receive a suspicious call, hang up and call the bank directly" : "La clonación de voz AI ahora puede suplantar a su banco — si recibe una llamada sospechosa, cuelgue y llame al banco directamente"
        ]
      },
      {
        name: en ? "Social Engineering & Deepfakes" : "Ingeniería Social y Deepfakes",
        icon: "🎭",
        color: "#f59e0b",
        items: [
          en ? "AI can clone anyone's voice with just 3 seconds of audio — verify identity through a secondary channel before acting on requests" : "AI puede clonar la voz de cualquiera con solo 3 segundos de audio — verifique identidad por un canal secundario antes de actuar",
          en ? "Deepfake video calls are now possible in real-time — don't trust video alone for identity verification" : "Videollamadas deepfake ahora son posibles en tiempo real — no confíe solo en video para verificar identidad",
          en ? "Be skeptical of urgent requests for money transfers, even from 'known' contacts — verify offline" : "Sea escéptico de solicitudes urgentes de transferencias, incluso de contactos 'conocidos' — verifique offline",
          en ? "AI-powered romance/investment scams are targeting Costa Ricans specifically — be cautious on dating apps and social media" : "Estafas de romance/inversión potenciadas por AI están apuntando a costarricenses específicamente — sea cauteloso en apps de citas y redes sociales",
          en ? "If something seems too good to be true (investment returns, prizes, lottery), it's a scam — AI makes them more convincing" : "Si algo parece demasiado bueno para ser verdad (retornos de inversión, premios, lotería), es una estafa — AI las hace más convincentes"
        ]
      },
      {
        name: en ? "Network & WiFi Security" : "Seguridad de Red y WiFi",
        icon: "📶",
        color: "#ec4899",
        items: [
          en ? "Change your home WiFi password from the default — use WPA3 if your router supports it" : "Cambie la contraseña WiFi de su hogar del valor por defecto — use WPA3 si su router lo soporta",
          en ? "Avoid public WiFi for anything sensitive (banking, email, shopping). Use mobile data or VPN" : "Evite WiFi público para cualquier cosa sensible (banca, correo, compras). Use datos móviles o VPN",
          en ? "Disable auto-connect to open WiFi networks on your phone" : "Desactive la conexión automática a redes WiFi abiertas en su teléfono",
          en ? "Use a VPN when traveling or using shared networks (hotels, airports, coffee shops)" : "Use un VPN al viajar o usar redes compartidas (hoteles, aeropuertos, cafeterías)"
        ]
      }
    ]
  },

  // ── NEW: CR Institutional Vulnerability Map ──
  crInstitutionalRisk: {
    title: en ? "Critical Infrastructure Vulnerability Map — Costa Rica" : "Mapa de Vulnerabilidades de Infraestructura Crítica — Costa Rica",
    intro: en
      ? "Costa Rica has suffered 3 major cyberattacks in 4 years (Conti 2022, CCSS Hive 2022, ICE 2025). Each attack exposed systemic vulnerabilities in institutions that serve millions. Here's the risk landscape."
      : "Costa Rica ha sufrido 3 ciberataques mayores en 4 años (Conti 2022, CCSS Hive 2022, ICE 2025). Cada ataque expuso vulnerabilidades sistémicas en instituciones que sirven a millones. Este es el panorama de riesgo.",
    institutions: [
      {
        name: "ICE",
        fullName: en ? "Costa Rican Electricity Institute" : "Instituto Costarricense de Electricidad",
        services: en ? "Electricity (99% national), internet backbone, mobile (Kölbi), landline" : "Electricidad (99% nacional), backbone internet, móvil (Kölbi), telefonía fija",
        affected: "5.2M+",
        attack: en ? "Cyberattack 2025 — compromised internal systems" : "Ciberataque 2025 — sistemas internos comprometidos",
        risk: en ? "CRITICAL — controls electricity for entire country + telecommunications infrastructure" : "CRÍTICO — controla electricidad de todo el país + infraestructura de telecomunicaciones",
        cascade: en ? "Power grid disruption → hospitals, water treatment, airports, banking systems all fail. Telecom disruption → emergency services (911), mobile banking, government operations paralyzed." : "Interrupción red eléctrica → hospitales, tratamiento agua, aeropuertos, sistemas bancarios fallan. Interrupción telecomunicaciones → servicios emergencia (911), banca móvil, operaciones gubernamentales paralizadas.",
        color: "#ef4444"
      },
      {
        name: "CCSS",
        fullName: en ? "Costa Rican Social Security Fund" : "Caja Costarricense de Seguro Social",
        services: en ? "Universal healthcare (29 hospitals, 1,000+ clinics), pensions, disability" : "Salud universal (29 hospitales, 1,000+ clínicas), pensiones, discapacidad",
        affected: "5.2M",
        attack: en ? "Hive ransomware May 2022 — EDUS, SICERE, payroll systems" : "Ransomware Hive mayo 2022 — sistemas EDUS, SICERE, planilla",
        risk: en ? "CRITICAL — holds health records for entire population + pension fund data" : "CRÍTICO — tiene expedientes médicos de toda la población + datos de fondo de pensiones",
        cascade: en ? "Health records unavailable → misdiagnosis, delayed treatment, medication errors. Pension system down → 300K+ retirees without income." : "Expedientes médicos no disponibles → diagnósticos erróneos, tratamiento tardío, errores de medicación. Sistema pensiones caído → 300K+ jubilados sin ingreso.",
        color: "#ef4444"
      },
      {
        name: en ? "Ministerio de Hacienda" : "Ministerio de Hacienda",
        fullName: en ? "Ministry of Finance" : "Ministerio de Hacienda",
        services: en ? "Tax collection, customs, government payroll, public debt" : "Recaudación tributaria, aduanas, planilla gobierno, deuda pública",
        affected: en ? "All taxpayers" : "Todos los contribuyentes",
        attack: en ? "Conti ransomware April 2022 — ATV and TICA systems" : "Ransomware Conti abril 2022 — sistemas ATV y TICA",
        risk: en ? "CRITICAL — tax revenue collection paralysis + trade disruption at ports" : "CRÍTICO — parálisis recaudación tributaria + interrupción comercio en puertos",
        cascade: en ? "Customs paralysis → import/export delays, food supply chain disruption. Tax system down → government revenue interruption, public service funding gaps." : "Parálisis aduanas → retrasos importación/exportación, interrupción cadena suministro alimentos. Sistema tributario caído → interrupción ingresos gobierno, brechas financiamiento servicios públicos.",
        color: "#f59e0b"
      },
      {
        name: "SUGEF/BCCR",
        fullName: en ? "Financial Superintendency / Central Bank" : "Superintendencia Financiera / Banco Central",
        services: en ? "Financial regulation, SINPE payment system, monetary policy" : "Regulación financiera, sistema de pagos SINPE, política monetaria",
        affected: en ? "Entire financial system" : "Sistema financiero entero",
        attack: en ? "No major attack yet — highest-value target" : "Sin ataque mayor aún — objetivo de mayor valor",
        risk: en ? "EXTREME — SINPE processes $100B+/year in digital transactions for 5M users" : "EXTREMO — SINPE procesa $100B+/año en transacciones digitales para 5M usuarios",
        cascade: en ? "SINPE disruption → no digital payments, no salary deposits, no inter-bank transfers. Economic paralysis within 24 hours." : "Interrupción SINPE → sin pagos digitales, sin depósitos de salario, sin transferencias interbancarias. Parálisis económica en 24 horas.",
        color: "#dc2626"
      }
    ]
  },

  // ── NEW: AI-Powered Attack vs Defense ──
  aiAttackDefense: {
    title: en ? "AI as Weapon vs. AI as Shield" : "AI como Arma vs. AI como Escudo",
    intro: en
      ? "AI is a dual-use technology. The same capabilities that enable defense can be weaponized for attack. Understanding this duality is critical for Costa Rica's security posture."
      : "AI es una tecnología de uso dual. Las mismas capacidades que permiten la defensa pueden ser armadas para el ataque. Entender esta dualidad es crítico para la postura de seguridad de Costa Rica.",
    comparisons: [
      {
        domain: en ? "Vulnerability Discovery" : "Descubrimiento de Vulnerabilidades",
        attack: en ? "AI finds zero-day vulnerabilities 10-100x faster than human hackers. Automated exploit generation." : "AI encuentra vulnerabilidades zero-day 10-100x más rápido que hackers humanos. Generación automatizada de exploits.",
        defense: en ? "AI penetration testing (McKinsey model) proactively finds and patches vulnerabilities before attackers." : "Pruebas de penetración AI (modelo McKinsey) encuentra y parchea vulnerabilidades proactivamente antes que atacantes.",
        crContext: en ? "CR institutions are being scanned by AI-powered attackers 24/7 but defending with manual processes." : "Instituciones CR están siendo escaneadas por atacantes potenciados con AI 24/7 pero se defienden con procesos manuales."
      },
      {
        domain: en ? "Phishing & Social Engineering" : "Phishing e Ingeniería Social",
        attack: en ? "AI generates perfect Spanish-language phishing emails, clones voices for vishing, creates deepfake video calls." : "AI genera correos phishing perfectos en español, clona voces para vishing, crea videollamadas deepfake.",
        defense: en ? "AI email filters detect phishing with 99.5% accuracy. AI voice analysis detects synthetic speech." : "Filtros de correo AI detectan phishing con 99.5% de precisión. Análisis de voz AI detecta habla sintética.",
        crContext: en ? "Costa Rican banks report 300%+ increase in AI-enhanced phishing targeting SINPE Móvil users." : "Bancos costarricenses reportan aumento de 300%+ en phishing potenciado por AI apuntando a usuarios SINPE Móvil."
      },
      {
        domain: en ? "Threat Detection" : "Detección de Amenazas",
        attack: en ? "AI-powered malware adapts in real-time to evade detection. Polymorphic code changes with each execution." : "Malware potenciado por AI se adapta en tiempo real para evadir detección. Código polimórfico cambia con cada ejecución.",
        defense: en ? "AI SOC analyzes millions of events/second, detecting anomalies human analysts would miss. 1000x faster." : "SOC con AI analiza millones de eventos/segundo, detectando anomalías que analistas humanos perderían. 1000x más rápido.",
        crContext: en ? "SOC-CR ($9.8M investment) is being established — must be AI-native from day one." : "SOC-CR (inversión $9.8M) está siendo establecido — debe ser AI-nativo desde el día uno."
      }
    ]
  }
});

// ── LEGISLATION JARGON EXPLANATIONS ──
export const LEG_JARGON = (en) => ({
  ley_vinculante: {
    term: en ? "Binding AI Law" : "Ley AI Vinculante",
    what: en ? "A law with legal force that REQUIRES compliance — unlike a strategy document (like ENIA) which is voluntary. A binding law establishes: mandatory obligations for AI developers and deployers, penalties for non-compliance (fines, sanctions), designated enforcement authority, and citizen rights and recourse mechanisms. Without binding legislation, AI governance remains aspirational." : "Una ley con fuerza legal que REQUIERE cumplimiento — a diferencia de un documento estratégico (como ENIA) que es voluntario. Una ley vinculante establece: obligaciones mandatorias para desarrolladores y desplegadores de AI, penalidades por incumplimiento (multas, sanciones), autoridad de aplicación designada, y derechos ciudadanos y mecanismos de recurso. Sin legislación vinculante, la gobernanza AI permanece aspiracional.",
    whoHasDone: [
      { country: en ? "European Union" : "Unión Europea", law: "EU AI Act", year: 2024, detail: en ? "First comprehensive AI law. 4 risk tiers. Penalties up to €35M or 7% global turnover." : "Primera ley AI integral. 4 niveles de riesgo. Penalidades hasta €35M o 7% facturación global." },
      { country: en ? "South Korea" : "Corea del Sur", law: "AI Framework Act", year: 2026, detail: en ? "Consolidated 19 bills into single law. National AI Committee chaired by president. Best model for CR." : "Consolidó 19 proyectos en una sola ley. Comité Nacional AI presidido por presidente. Mejor modelo para CR." },
      { country: "Colorado (EEUU)", law: "SB 24-205", year: 2026, detail: en ? "First US state anti-AI-discrimination law. 'Reasonable care' standard. NIST AI RMF safe harbor." : "Primera ley estatal anti-discriminación AI de EEUU. Estándar 'cuidado razonable'. Protección NIST AI RMF." },
      { country: "China", law: en ? "Interim Measures for AI" : "Medidas Interinas para AI", year: 2023, detail: en ? "Regulations on generative AI, algorithmic recommendations, and deep synthesis (deepfakes)." : "Regulaciones sobre AI generativa, recomendaciones algorítmicas y síntesis profunda (deepfakes)." }
    ],
    crRecommendation: en ? "CR should adopt South Korea's 'regulate + promote' model: a single law that both encourages AI innovation AND establishes enforceable guardrails. Target: first binding AI law in Central America within 12 months." : "CR debería adoptar el modelo 'regular + promover' de Corea del Sur: una sola ley que tanto fomente innovación AI COMO establezca guardarraíles aplicables. Meta: primera ley AI vinculante en Centroamérica en 12 meses."
  },
  marco_antidesinfo: {
    term: en ? "Anti-Disinformation Framework" : "Marco Anti-Desinformación",
    what: en ? "A comprehensive regulatory and institutional framework to combat AI-generated disinformation, deepfakes, and synthetic media. Includes: mandatory labeling of AI-generated content, platform responsibility for AI-generated disinformation, rapid-response fact-checking mechanisms, digital media literacy programs, and electoral protection measures against deepfakes." : "Un marco regulatorio e institucional integral para combatir desinformación generada por AI, deepfakes y medios sintéticos. Incluye: etiquetado obligatorio de contenido generado por AI, responsabilidad de plataformas por desinformación generada por AI, mecanismos de verificación de hechos de respuesta rápida, programas de alfabetización mediática digital y medidas de protección electoral contra deepfakes.",
    examples: [
      { country: "Taiwan", approach: en ? "G0v civic tech community + Cofacts fact-checking chatbot. Real-time crowdsourced disinformation detection during elections." : "Comunidad tech cívica G0v + chatbot verificador Cofacts. Detección de desinformación crowdsourced en tiempo real durante elecciones." },
      { country: en ? "EU Digital Services Act" : "Ley de Servicios Digitales UE", approach: en ? "Platforms must remove illegal content, label AI-generated content, and provide transparency on algorithmic recommendations." : "Plataformas deben remover contenido ilegal, etiquetar contenido generado por AI y proveer transparencia sobre recomendaciones algorítmicas." },
      { country: "Brasil", approach: en ? "TSE electoral tribunal actively detects and removes deepfakes during campaigns. AI-specific electoral rules since 2024." : "TSE tribunal electoral detecta y remueve deepfakes activamente durante campañas. Reglas electorales específicas de AI desde 2024." }
    ],
    crRecommendation: en ? "CR should establish: (1) TSE technical capacity for deepfake detection, (2) mandatory AI content labeling for media outlets, (3) rapid-response fact-checking partnership with universities, (4) digital literacy program in schools." : "CR debería establecer: (1) capacidad técnica TSE para detección deepfakes, (2) etiquetado obligatorio de contenido AI para medios, (3) asociación de verificación de hechos de respuesta rápida con universidades, (4) programa de alfabetización digital en escuelas."
  },
  sandbox_regulatorio: {
    term: en ? "Regulatory Sandbox" : "Sandbox Regulatorio",
    what: en ? "A controlled environment where companies can test AI innovations under regulatory supervision without full compliance burden. Like a 'laboratory' for regulations — companies get to experiment, regulators get to learn, and citizens are protected by supervision." : "Un entorno controlado donde empresas pueden probar innovaciones AI bajo supervisión regulatoria sin la carga total de cumplimiento. Como un 'laboratorio' para regulaciones — empresas experimentan, reguladores aprenden, y ciudadanos están protegidos por supervisión.",
    whoHasDone: [
      en ? "Singapore (IMDA): AI governance sandbox since 2022" : "Singapur (IMDA): sandbox de gobernanza AI desde 2022",
      en ? "UK (FCA): financial AI sandbox, 10+ cohorts since 2016" : "UK (FCA): sandbox AI financiero, 10+ cohortes desde 2016",
      en ? "Brazil: AI bill includes sandbox provisions" : "Brasil: proyecto de ley AI incluye provisiones de sandbox",
      en ? "Spain: first EU AI Act regulatory sandbox" : "España: primer sandbox regulatorio del EU AI Act"
    ],
    crRecommendation: en ? "Establish sandbox under MICITT for FZ companies needing to test AI compliance before EU AI Act enforcement (Aug 2026). Priority sectors: medical devices (high-risk AI), digital services (employment AI)." : "Establecer sandbox bajo MICITT para empresas ZF que necesitan probar cumplimiento AI antes de aplicación EU AI Act (Ago 2026). Sectores prioritarios: dispositivos médicos (AI alto riesgo), servicios digitales (AI empleo)."
  },
  autoridad_ai: {
    term: en ? "AI Authority" : "Autoridad AI",
    what: en ? "A designated government body with the mandate, budget, and technical capacity to regulate AI. Responsibilities include: interpreting AI laws, issuing compliance guidelines, conducting audits, receiving complaints, imposing sanctions, coordinating international cooperation, and advising on policy. CR's candidate: PRODHAB (Data Protection Agency), which currently lacks AI mandate, budget, and technical staff." : "Un organismo gubernamental designado con mandato, presupuesto y capacidad técnica para regular AI. Responsabilidades incluyen: interpretar leyes AI, emitir guías de cumplimiento, realizar auditorías, recibir denuncias, imponer sanciones, coordinar cooperación internacional y asesorar en política. Candidato de CR: PRODHAB (Agencia de Protección de Datos), que actualmente carece de mandato AI, presupuesto y personal técnico.",
    crRecommendation: en ? "Expand PRODHAB mandate to include AI oversight. Required: (1) legal mandate via legislation, (2) 15-20 additional technical staff, (3) annual budget of ~$2-3M, (4) AI safety testing laboratory, (5) international cooperation agreements with EU AI Office and Singapore IMDA." : "Expandir mandato de PRODHAB para incluir supervisión AI. Se requiere: (1) mandato legal vía legislación, (2) 15-20 personal técnico adicional, (3) presupuesto anual de ~$2-3M, (4) laboratorio de pruebas de seguridad AI, (5) acuerdos de cooperación internacional con Oficina AI UE e IMDA Singapur."
  }
});

// ── ENIA GAP ANALYSIS ──
export const ENIA_ANALYSIS = (en) => ({
  strengths: [
    { pillar: en ? "Vision & Ambition" : "Visión y Ambición", detail: en ? "Oxford Insights scored CR 100/100 on AI Vision. The 7-pillar framework is comprehensive and well-structured. Aligned with UNESCO AI Ethics Recommendation. First Central American country with national AI strategy." : "Oxford Insights dio a CR 100/100 en Visión AI. El marco de 7 pilares es integral y bien estructurado. Alineado con Recomendación UNESCO Ética AI. Primer país centroamericano con estrategia nacional AI." },
    { pillar: en ? "Ethics Framework" : "Marco de Ética", detail: en ? "ENIA's ethics pillar references human rights, fairness, transparency, and accountability. Aligned with OECD AI Principles. Good foundation for binding legislation." : "El pilar de ética de ENIA referencia derechos humanos, equidad, transparencia y rendición de cuentas. Alineado con Principios AI OCDE. Buena base para legislación vinculante." },
    { pillar: en ? "International Leadership Goal" : "Meta de Liderazgo Internacional", detail: en ? "ENIA positions CR as LATAM AI leader — realistic given OECD membership, democratic stability, and overperformer status. Ambitious but achievable." : "ENIA posiciona a CR como líder AI LATAM — realista dado membresía OCDE, estabilidad democrática y estatus de sobreperformante. Ambicioso pero alcanzable." },
    { pillar: en ? "Multi-Stakeholder Approach" : "Enfoque Multi-Stakeholder", detail: en ? "ENIA was developed with input from government, academia, private sector, and civil society. This inclusive process builds legitimacy." : "ENIA fue desarrollada con aportes de gobierno, academia, sector privado y sociedad civil. Este proceso inclusivo construye legitimidad." }
  ],
  deficiencies: [
    { pillar: en ? "No Binding Force" : "Sin Fuerza Vinculante", detail: en ? "ENIA is a strategy document, NOT a law. No enforcement mechanism, no penalties, no mandatory compliance. Score: 100/100 Vision vs 0.38/1.0 readiness — the widest strategy-execution gap in the 20-country peer set." : "ENIA es un documento estratégico, NO una ley. Sin mecanismo de aplicación, sin penalidades, sin cumplimiento obligatorio. Score: 100/100 Visión vs 0.38/1.0 preparación — la brecha más amplia entre estrategia y ejecución en el grupo de 20 países pares.", severity: "CRITICAL" },
    { pillar: en ? "No AI Authority" : "Sin Autoridad AI", detail: en ? "ENIA does not designate a regulatory body. PRODHAB (data protection) lacks mandate, budget, and staff for AI oversight. No entity can enforce AI governance." : "ENIA no designa un organismo regulador. PRODHAB (protección de datos) carece de mandato, presupuesto y personal para supervisión AI. Ninguna entidad puede aplicar gobernanza AI.", severity: "CRITICAL" },
    { pillar: en ? "Talent Pillar Gaps" : "Brechas Pilar de Talento", detail: en ? "Calls for AI literacy but: INA has zero AI certification tracks, university AI programs limited to UCR and TEC, no K-12 AI curriculum nationwide, no reskilling plan for 28K at-risk BPO workers." : "Pide alfabetización AI pero: INA tiene cero tracks de certificación AI, programas universitarios AI limitados a UCR y TEC, sin currículo AI K-12 nacional, sin plan de recapacitación para 28K trabajadores BPO en riesgo.", severity: en ? "HIGH" : "ALTO" },
    { pillar: en ? "Infrastructure Without Strategy" : "Infraestructura Sin Estrategia", detail: en ? "Acknowledges 99% renewable advantage and broadband needs, but: no data center development strategy, no sovereign cloud policy, no GPU access plan, no edge computing deployment roadmap." : "Reconoce ventaja 99% renovable y necesidades de banda ancha, pero: sin estrategia de desarrollo de data centers, sin política de nube soberana, sin plan de acceso GPU, sin hoja de ruta de despliegue de computación de borde.", severity: en ? "HIGH" : "ALTO" },
    { pillar: en ? "Innovation Without Mechanisms" : "Innovación Sin Mecanismos", detail: en ? "References free zone ecosystem but: no AI-specific investment incentives, no startup funding mechanism, no regulatory sandbox, no AI procurement standards for government." : "Referencia ecosistema de zonas francas pero: sin incentivos de inversión específicos AI, sin mecanismo de financiamiento de startups, sin sandbox regulatorio, sin estándares de adquisición AI para gobierno.", severity: en ? "MEDIUM" : "MEDIO" },
    { pillar: en ? "No Measurable KPIs" : "Sin KPIs Medibles", detail: en ? "ENIA lacks specific, measurable targets with timelines. No annual progress tracking mechanism. No accountability framework for implementation." : "ENIA carece de metas específicas y medibles con plazos. Sin mecanismo de seguimiento anual de progreso. Sin marco de rendición de cuentas para implementación.", severity: en ? "HIGH" : "ALTO" }
  ],
  improvements: [
    en ? "Convert ENIA pillars into binding legislation within 12 months (South Korea model)" : "Convertir pilares ENIA en legislación vinculante en 12 meses (modelo Corea del Sur)",
    en ? "Establish PRODHAB as AI authority with expanded mandate, budget ($2-3M/yr), and 15-20 technical staff" : "Establecer PRODHAB como autoridad AI con mandato ampliado, presupuesto ($2-3M/año) y 15-20 personal técnico",
    en ? "Create measurable KPIs for each pillar with quarterly reporting (e.g., 'INA AI certifications: 2,000 by 2027')" : "Crear KPIs medibles para cada pilar con reportes trimestrales (ej. 'certificaciones AI INA: 2,000 para 2027')",
    en ? "Launch INA AI Technician Track: 8-week certification, co-designed with Intel/Amazon/HP" : "Lanzar Track Técnico AI INA: certificación de 8 semanas, co-diseñado con Intel/Amazon/HP",
    en ? "Establish AI regulatory sandbox for FZ companies (priority: medical devices, digital services)" : "Establecer sandbox regulatorio AI para empresas ZF (prioridad: dispositivos médicos, servicios digitales)",
    en ? "Complete UNESCO RAM (Readiness Assessment Methodology) like Chile did — builds evidence base" : "Completar RAM (Metodología de Evaluación de Preparación) UNESCO como lo hizo Chile — construye base de evidencia",
    en ? "Create inter-institutional AI coordination committee with presidential mandate" : "Crear comité de coordinación AI interinstitucional con mandato presidencial"
  ],
  comparison: [
    { country: en ? "Singapore" : "Singapur", status: en ? "Strategy + Governance Framework + $1B investment + AI Safety Institute" : "Estrategia + Marco de Gobernanza + $1B inversión + Instituto Seguridad AI", gap: en ? "CR lacks governance framework, investment commitment, and institutional capacity" : "CR carece de marco de gobernanza, compromiso de inversión y capacidad institucional" },
    { country: en ? "South Korea" : "Corea del Sur", status: en ? "Binding AI Framework Act + National AI Committee + AI Safety Institute" : "Ley Marco AI Vinculante + Comité Nacional AI + Instituto Seguridad AI", gap: en ? "CR has strategy but no law, no committee, no safety institute" : "CR tiene estrategia pero sin ley, sin comité, sin instituto de seguridad" },
    { country: "Chile", status: en ? "AI Bill in Senate + UNESCO RAM completed + Advisory Council" : "Proyecto AI en Senado + RAM UNESCO completada + Consejo Consultivo", gap: en ? "Chile is ahead in legislative process and evidence base. CR closest LATAM comparator." : "Chile va adelante en proceso legislativo y base de evidencia. Comparador LATAM más cercano de CR." },
    { country: "Estonia", status: en ? "Kratt AI for government + e-Governance Academy + X-Road interoperability" : "Kratt AI para gobierno + Academia e-Governance + Interoperabilidad X-Road", gap: en ? "Estonia shows small country (1.3M) can lead in AI governance. CR (5.2M) has more resources but less digital government infrastructure." : "Estonia muestra que país pequeño (1.3M) puede liderar en gobernanza AI. CR (5.2M) tiene más recursos pero menos infraestructura de gobierno digital." }
  ]
});

// ── PHYSICAL AI NEWS ──
export const PAI_NEWS = (en) => [
  { headline: en ? "Boston Dynamics Atlas Operates Autonomously in Hyundai Factory" : "Atlas de Boston Dynamics Opera Autónomamente en Fábrica Hyundai", date: "Jan 2026", source: "CBS 60 Minutes", url: "https://www.cbsnews.com/60minutes/", significance: en ? "First commercial autonomous deployment of humanoid robot in manufacturing. Performs tasks humans cannot do safely." : "Primer despliegue autónomo comercial de robot humanoide en manufactura. Realiza tareas que humanos no pueden hacer de forma segura.", icon: "🤖" },
  { headline: en ? "Figure AI Opens BotQ Factory: 12,000-100,000 Humanoids/Year" : "Figure AI Abre Fábrica BotQ: 12,000-100,000 Humanoides/Año", date: "2026", source: "Figure AI", url: "https://www.figure.ai/", significance: en ? "Mass production of humanoid robots begins in Austin, Texas. Unit cost trajectory: $150K (2024) → $30-50K (2028) → $15K (2030+)." : "Producción masiva de robots humanoides comienza en Austin, Texas. Trayectoria costo unitario: $150K (2024) → $30-50K (2028) → $15K (2030+).", icon: "🏭" },
  { headline: en ? "Tesla Optimus Begins External Sales" : "Tesla Optimus Comienza Ventas Externas", date: "2026", source: "Tesla", url: "https://www.tesla.com/optimus", significance: en ? "Tesla's humanoid robot available for purchase. Targets manufacturing, logistics, and household applications. Elon Musk projects $20,000-$25,000 price point." : "Robot humanoide de Tesla disponible para compra. Apunta a manufactura, logística y aplicaciones domésticas. Elon Musk proyecta precio de $20,000-$25,000.", icon: "⚡" },
  { headline: en ? "Amazon Deploys 750,000+ Robots Across Fulfillment Centers" : "Amazon Despliega 750,000+ Robots en Centros de Distribución", date: "2025", source: "Amazon", url: "https://www.aboutamazon.com/", significance: en ? "Largest industrial robot deployment in history. Reduced warehouse jobs by 100,000 while creating 20,000 robotics technician roles. Net negative for entry-level workers." : "Mayor despliegue de robots industriales en la historia. Redujo empleos de almacén en 100,000 mientras creó 20,000 roles de técnico en robótica. Neto negativo para trabajadores de nivel inicial.", icon: "📦" },
  { headline: en ? "Unitree G1: $16,000 Humanoid Robot" : "Unitree G1: Robot Humanoide de $16,000", date: "2025", source: "Unitree", url: "https://www.unitree.com/", significance: en ? "Chinese manufacturer breaks $20K humanoid price barrier. Already below average annual salary in several countries. CR manufacturing FZ cost crossover approaches." : "Fabricante chino rompe barrera de precio de $20K para humanoides. Ya por debajo del salario promedio anual en varios países. Se acerca el cruce de costos para ZF de manufactura CR.", icon: "🇨🇳" },
  { headline: en ? "Goldman Sachs: $38B Humanoid Market by 2035" : "Goldman Sachs: Mercado Humanoides $38B para 2035", date: "2025", source: "Goldman Sachs Research", url: "https://www.goldmansachs.com/", significance: en ? "Investment bank projects massive humanoid adoption curve. Manufacturing and logistics first, then healthcare and domestic. Multi-shift advantage (20-22 hrs/day) makes economic case compelling." : "Banco de inversión proyecta curva masiva de adopción humanoides. Manufactura y logística primero, luego salud y doméstico. Ventaja multi-turno (20-22 hrs/día) hace caso económico convincente.", icon: "📊" },
  { headline: en ? "NVIDIA Isaac Sim: Digital Twins for Robot Training" : "NVIDIA Isaac Sim: Gemelos Digitales para Entrenamiento de Robots", date: "2025", source: "NVIDIA", url: "https://developer.nvidia.com/isaac-sim", significance: en ? "NVIDIA's simulation platform enables training robots in virtual environments before physical deployment. 4,000+ digital twins used by Boston Dynamics. Accelerates development cycle 100x." : "Plataforma de simulación de NVIDIA permite entrenar robots en entornos virtuales antes de despliegue físico. 4,000+ gemelos digitales usados por Boston Dynamics. Acelera ciclo de desarrollo 100x.", icon: "🎮" },
  { headline: en ? "IFR Report: 4.28M Industrial Robots Operating Globally" : "Reporte IFR: 4.28M Robots Industriales Operando Globalmente", date: "2025", source: "International Federation of Robotics", url: "https://ifr.org/", significance: en ? "Record number of industrial robots deployed. Growth rate: 7% annually. Asia leads with 70%+ of installations. LATAM represents <2% — opportunity and risk for CR." : "Número récord de robots industriales desplegados. Tasa crecimiento: 7% anual. Asia lidera con 70%+ de instalaciones. LATAM representa <2% — oportunidad y riesgo para CR.", icon: "🌏" }
];


// ── ISO COUNTRY CODE MAPPING (Alpha-3 to Alpha-2 for flag rendering) ──
export const A3_TO_A2 = {
  SGP: "SG", KOR: "KR", JPN: "JP", EST: "EE", FIN: "FI", IRL: "IE",
  CHL: "CL", URY: "UY", CRI: "CR", PAN: "PA", BRA: "BR", COL: "CO",
  MEX: "MX", ARG: "AR", PER: "PE", DOM: "DO", VNM: "VN", PHL: "PH",
  MYS: "MY", IDN: "ID"
};

// ── TIKTOK VIDEO EMBEDS ──
export const TIKTOK_VIDEOS = [
  { id: "7593331161951259936", user: "worldeconomicforum", label: { en: "WEF: AI & Jobs", es: "WEF: AI y Empleos" } },
  { id: "7606175085619105037", user: "cnn", label: { en: "CNN: AI Revolution", es: "CNN: Revolución AI" } },
  { id: "7600087754709519649", user: "worldeconomicforum", label: { en: "WEF: Future of Work", es: "WEF: Futuro del Trabajo" } },
  { id: "7463218989410372896", user: "worldeconomicforum", label: { en: "WEF: AI Governance", es: "WEF: Gobernanza AI" } },
  { id: "7581910079994072342", user: "cnbci", label: { en: "CNBC: AI Investment", es: "CNBC: Inversión en AI" } },
];
export const COLIBRII_TIKTOK = "@colibrii.labs";

// ── PARTNER LOGOS (Clearbit domain mapping) ──
export const PARTNER_LOGOS = {
  "World Bank": "worldbank.org",
  "WEF": "weforum.org",
  "IMF": "imf.org",
  "OECD": "oecd.org",
  "Oxford Insights": "oxfordinsights.com",
  "Stanford HAI": "stanford.edu",
  "OWASP": "owasp.org",
  "ILO": "ilo.org",
  "UNDP": "undp.org",
  "UNESCO": "unesco.org",
  "PROCOMER": "procomer.com",
  "CINDE": "cinde.org",
  "Goldman Sachs": "goldmansachs.com",
  "Transparency Int'l": "transparency.org",
  "Freedom House": "freedomhouse.org",
  "IEP": "visionofhumanity.org",
  "UNCTAD": "unctad.org",
  "IDB": "iadb.org",
  "Deloitte": "deloitte.com",
  "McKinsey": "mckinsey.com",
  "Bank of America": "bankofamerica.com",
  "FAO": "fao.org",
  "WHO": "who.int",
  "IFR": "ifr.org",
  "GDELT": "gdeltproject.org",
};

// ── NEWS SOURCES CONFIG ──
export const NEWS_SOURCES = {
  cr: [
    { name: "CRHoy", domain: "crhoy.com", color: "#ef4444" },
    { name: "La Nación", domain: "nacion.com", color: "#2563eb" },
    { name: "El Financiero", domain: "elfinancierocr.com", color: "#10b981" },
    { name: "Amelia Rueda", domain: "ameliarueda.com", color: "#8b5cf6" },
  ],
  intl: [
    { name: "MIT Tech Review", domain: "technologyreview.com", color: "#ef4444" },
    { name: "TechCrunch", domain: "techcrunch.com", color: "#10b981" },
    { name: "Wired", domain: "wired.com", color: "#000000" },
    { name: "The Verge", domain: "theverge.com", color: "#ec4899" },
    { name: "VentureBeat", domain: "venturebeat.com", color: "#6366f1" },
  ],
};

// ── AI OVERPERFORMER CONTEXT (bilingual) ──
export const AI_OVERPERFORMER_CONTEXT = (en) => ({
  title: en ? "Why AI Overperformer?" : "¿Por qué AI Overperformer?",
  source: "World Bank — Artificial Intelligence and the Economy (2024)",
  explanation: en
    ? "The World Bank classifies countries as AI Overperformers when their AI readiness scores exceed predictions based on GDP per capita. Costa Rica is 1 of only 7 upper-middle-income countries (UMICs) globally that outperform expectations — achieving more AI-related outcomes (digital infrastructure, talent pipeline, policy vision) than its economic development level would predict."
    : "El Banco Mundial clasifica países como AI Overperformer cuando sus puntajes de preparación AI superan las predicciones basadas en PIB per cápita. Costa Rica es 1 de solo 7 países de ingreso medio-alto (PIMA) globalmente que superan expectativas — logrando más resultados relacionados con AI (infraestructura digital, pipeline de talento, visión política) de lo que su nivel de desarrollo económico predeciría.",
  peers: en
    ? ["Costa Rica", "Malaysia", "Indonesia", "Vietnam"]
    : ["Costa Rica", "Malasia", "Indonesia", "Vietnam"],
  keyFactors: en
    ? [
        "99% renewable electricity — one of the greenest grids on Earth",
        "OECD member since 2021 — institutional credibility",
        "Oxford Insights: 100/100 Government AI Vision score",
        "Record $4.3B FDI in 2024 — tech sector leading",
        "75+ years of uninterrupted democracy",
        "Universal healthcare & education — strong human capital base",
      ]
    : [
        "99% electricidad renovable — una de las redes más verdes del planeta",
        "Miembro OCDE desde 2021 — credibilidad institucional",
        "Oxford Insights: 100/100 en Visión de AI gubernamental",
        "Récord de $4.3B IED en 2024 — sector tech liderando",
        "75+ años de democracia ininterrumpida",
        "Salud y educación universal — base sólida de capital humano",
      ],
});

/* ═══════════════════════════════════════════════════════════════
   UN / ITU / SDG DATA — AI for Good Impact Awards 2026
   Sources: ITU Reports (Jan 2026), CC BY-NC-SA 3.0 IGO
   ═══════════════════════════════════════════════════════════════ */

// ── SDG ALIGNMENT ──
export const SDG_ALIGNMENT = (en) => [
  { id: 4, name: en ? "Quality Education" : "Educación de Calidad", color: "#C5192D",
    icon: "edu",
    contribution: en ? "AI literacy metrics across 20 countries, education dimension in CAPI-CR, glossary of 55+ AI terms for public understanding" : "Métricas de alfabetización AI en 20 países, dimensión educación en CAPI-CR, glosario de 55+ términos AI para comprensión pública",
    metric: en ? "20 countries' education indicators tracked" : "Indicadores educativos de 20 países rastreados" },
  { id: 8, name: en ? "Decent Work & Economic Growth" : "Trabajo Decente y Crecimiento", color: "#A21942",
    icon: "store",
    contribution: en ? "Labor transition scenarios, job displacement analysis, SME AI readiness assessment, Free Trade Zone workforce intelligence" : "Escenarios transición laboral, análisis desplazamiento empleo, evaluación preparación AI PYMES, inteligencia fuerza laboral Zonas Francas",
    metric: en ? "170M new AI jobs projected (WEF)" : "170M empleos AI nuevos proyectados (WEF)" },
  { id: 9, name: en ? "Industry, Innovation & Infrastructure" : "Industria, Innovación e Infraestructura", color: "#FD6925",
    icon: "factory",
    contribution: en ? "CAPI-CR innovation dimension, Free Trade Zone competitiveness analysis, digital infrastructure scoring, 4 live APIs" : "Dimensión innovación CAPI-CR, análisis competitividad Zonas Francas, puntuación infraestructura digital, 4 APIs en vivo",
    metric: en ? "10 proprietary algorithms deployed" : "10 algoritmos propietarios desplegados" },
  { id: 10, name: en ? "Reduced Inequalities" : "Reducción de Desigualdades", color: "#DD1367",
    icon: "chart",
    contribution: en ? "Digital divide tracking, 5G coverage disparities (84% high-income vs 4% low-income), 2.6B offline population monitoring" : "Seguimiento brecha digital, disparidades cobertura 5G (84% altos ingresos vs 4% bajos), monitoreo 2.6B población sin conexión",
    metric: en ? "2.6B people still offline globally" : "2.6B personas aún sin conexión global" },
  { id: 11, name: en ? "Sustainable Cities" : "Ciudades Sostenibles", color: "#FD9D24",
    icon: "home",
    contribution: en ? "Smart city AI applications tracking, digital twins for urban planning intelligence, infrastructure resilience analysis" : "Seguimiento aplicaciones AI ciudades inteligentes, gemelos digitales para planificación urbana, análisis resiliencia infraestructura",
    metric: en ? "AI-driven urban optimization insights" : "Análisis optimización urbana impulsada por AI" },
  { id: 13, name: en ? "Climate Action" : "Acción por el Clima", color: "#3F7E44",
    icon: "shield",
    contribution: en ? "Energy sustainability dimension in CAPI-CR, CR's 99% renewable grid tracking, AI energy consumption monitoring, data centre impact analysis" : "Dimensión sostenibilidad energética en CAPI-CR, seguimiento red 99% renovable CR, monitoreo consumo energético AI, análisis impacto centros de datos",
    metric: en ? "37.4B tons global emissions tracked" : "37.4B toneladas emisiones globales rastreadas" },
  { id: 16, name: en ? "Peace, Justice & Strong Institutions" : "Paz, Justicia e Instituciones Sólidas", color: "#00689D",
    icon: "legal",
    contribution: en ? "AI legislation tracking across 20+ countries, regulatory gap analysis, governance framework comparisons, digital security scoring" : "Seguimiento legislación AI en 20+ países, análisis brechas regulatorias, comparación marcos gobernanza, puntuación seguridad digital",
    metric: en ? "0 binding AI laws in Costa Rica" : "0 leyes AI vinculantes en Costa Rica" },
  { id: 17, name: en ? "Partnerships for the Goals" : "Alianzas para los Objetivos", color: "#19486A",
    icon: "globe",
    contribution: en ? "Integration of 25+ international data sources, 6+ UN agency data, open methodology, CC BY-NC 4.0 license enabling reuse" : "Integración de 25+ fuentes internacionales, datos de 6+ agencias ONU, metodología abierta, licencia CC BY-NC 4.0 permitiendo reuso",
    metric: en ? "25+ international data sources" : "25+ fuentes de datos internacionales" },
];

// ── FIVE PATHWAYS (ITU Report 1) ──
export const FIVE_PATHWAYS = (en) => [
  { id: "data", name: en ? "Data Quality & Access" : "Calidad y Acceso a Datos",
    icon: "chart", color: "#2563eb",
    desc: en ? "Accessibility, quality, and governance of datasets for AI applications" : "Accesibilidad, calidad y gobernanza de conjuntos de datos para aplicaciones AI",
    crStatus: en ? "Moderate — limited open data infrastructure, no national data strategy" : "Moderado — infraestructura datos abiertos limitada, sin estrategia nacional de datos",
    global: en ? "55.56% global internet usage; nearly half of countries below 50% penetration" : "55.56% uso internet global; casi la mitad de países bajo 50% penetración" },
  { id: "infra", name: en ? "Digital Infrastructure" : "Infraestructura Digital",
    icon: "factory", color: "#6366f1",
    desc: en ? "Network coverage, computing capacity, edge devices, energy supply" : "Cobertura de red, capacidad computacional, dispositivos edge, suministro energético",
    crStatus: en ? "Strong mobile broadband, weak 5G deployment, 99% renewable energy grid" : "Banda ancha móvil fuerte, despliegue 5G débil, red energética 99% renovable",
    global: en ? "5G: 84% high-income vs 4% low-income coverage" : "5G: 84% cobertura altos ingresos vs 4% bajos ingresos" },
  { id: "talent", name: en ? "AI Literacy & Talent" : "Alfabetización AI y Talento",
    icon: "edu", color: "#10b981",
    desc: en ? "Education, digital literacy, skill development, talent retention" : "Educación, alfabetización digital, desarrollo habilidades, retención talento",
    crStatus: en ? "Strong university system, growing tech workforce, brain drain risk" : "Sistema universitario fuerte, fuerza laboral tech creciente, riesgo fuga de cerebros",
    global: en ? "250M children out of school; 170M new AI jobs projected" : "250M niños sin escuela; 170M empleos AI nuevos proyectados" },
  { id: "policy", name: en ? "Responsible AI Policy" : "Política AI Responsable",
    icon: "legal", color: "#f97316",
    desc: en ? "Governance frameworks, standards implementation, regulatory approaches" : "Marcos de gobernanza, implementación estándares, enfoques regulatorios",
    crStatus: en ? "Zero binding AI laws — significant gap vs regional peers (Peru, El Salvador)" : "Cero leyes AI vinculantes — brecha significativa vs pares regionales (Perú, El Salvador)",
    global: en ? "EU AI Act effective Aug 2024; Peru first LATAM AI law Jul 2023" : "Ley AI UE vigente ago 2024; Perú primera ley AI LATAM jul 2023" },
  { id: "ecosystem", name: en ? "Digital Ecosystem" : "Ecosistema Digital",
    icon: "algo", color: "#ec4899",
    desc: en ? "Innovation capacity, open-source engagement, R&D investment, partnerships" : "Capacidad innovación, participación open-source, inversión I+D, alianzas",
    crStatus: en ? "Growing FTZ tech ecosystem, limited open-source contribution, strong FDI ($4.3B)" : "Ecosistema tech ZF creciente, contribución open-source limitada, IED fuerte ($4.3B)",
    global: en ? "Open-source engagement correlates strongly with overall AI readiness" : "Participación open-source correlaciona fuertemente con preparación AI general" },
];

// ── ITU 13 READINESS DIMENSIONS (Report 3) ──
export const ITU_DIMENSIONS = (en) => [
  { id: 1, factor: en ? "Data" : "Datos", dimension: en ? "Data Accessibility & Quality" : "Accesibilidad y Calidad de Datos", crScore: 0.48, globalAvg: 0.55, short: en ? "Access" : "Acceso" },
  { id: 2, factor: en ? "Data" : "Datos", dimension: en ? "Data Service Capability & Labeling" : "Capacidad de Servicio y Etiquetado", crScore: 0.35, globalAvg: 0.45, short: en ? "Service" : "Servicio" },
  { id: 3, factor: en ? "Data" : "Datos", dimension: en ? "Data Governance, Bias & Fairness" : "Gobernanza, Sesgo y Equidad", crScore: 0.30, globalAvg: 0.42, short: en ? "Govern." : "Gob." },
  { id: 4, factor: en ? "Infrastructure" : "Infraestructura", dimension: en ? "Digital Infrastructure" : "Infraestructura Digital", crScore: 0.62, globalAvg: 0.58, short: en ? "Infra" : "Infra" },
  { id: 5, factor: en ? "Skills" : "Habilidades", dimension: en ? "Skills & Education" : "Habilidades y Educación", crScore: 0.58, globalAvg: 0.50, short: en ? "Skills" : "Hab." },
  { id: 6, factor: en ? "Innovation" : "Innovación", dimension: en ? "R&D Capacity & Innovation" : "Capacidad I+D e Innovación", crScore: 0.40, globalAvg: 0.48, short: en ? "R&D" : "I+D" },
  { id: 7, factor: en ? "Innovation" : "Innovación", dimension: en ? "Investment Patterns" : "Patrones de Inversión", crScore: 0.32, globalAvg: 0.50, short: en ? "Invest." : "Inv." },
  { id: 8, factor: en ? "Policy" : "Política", dimension: en ? "Policy & Governance" : "Política y Gobernanza", crScore: 0.25, globalAvg: 0.45, short: en ? "Policy" : "Política" },
  { id: 9, factor: en ? "Ecosystem" : "Ecosistema", dimension: en ? "Ecosystem Maturity" : "Madurez del Ecosistema", crScore: 0.55, globalAvg: 0.52, short: en ? "Ecosys." : "Ecos." },
  { id: 10, factor: en ? "Ecosystem" : "Ecosistema", dimension: en ? "Integration Capabilities" : "Capacidades de Integración", crScore: 0.45, globalAvg: 0.48, short: en ? "Integ." : "Integ." },
  { id: 11, factor: en ? "Ecosystem" : "Ecosistema", dimension: en ? "Cross-domain Correlation" : "Correlación Inter-dominio", crScore: 0.38, globalAvg: 0.42, short: en ? "Cross" : "Inter" },
  { id: 12, factor: en ? "Sustainability" : "Sostenibilidad", dimension: en ? "Energy Efficiency & Sustainability" : "Eficiencia Energética y Sostenibilidad", crScore: 0.82, globalAvg: 0.45, short: en ? "Energy" : "Energía" },
  { id: 13, factor: en ? "Inclusion" : "Inclusión", dimension: en ? "Inclusion & Accessibility" : "Inclusión y Accesibilidad", crScore: 0.60, globalAvg: 0.48, short: en ? "Incl." : "Incl." },
];

// ── ITU 13 KEY FINDINGS (Report 3) ──
export const ITU_FINDINGS = (en) => [
  { id: 1, finding: en ? "ICT education, open-source ecosystems, and international engagement are critical for AI readiness" : "Educación TIC, ecosistemas open-source y participación internacional son críticos para preparación AI",
    crNote: en ? "CR has strong university system but limited open-source contribution globally" : "CR tiene sistema universitario fuerte pero contribución open-source global limitada" },
  { id: 2, finding: en ? "Strong positive correlation between national income levels and digital readiness" : "Fuerte correlación positiva entre nivel de ingresos nacional y preparación digital",
    crNote: en ? "CR is upper-middle income — positioned to leapfrog if policy gaps are addressed" : "CR es ingreso medio-alto — posicionado para avanzar si se abordan brechas de política" },
  { id: 3, finding: en ? "Data readiness is a critical determinant of effective, trustworthy AI" : "La preparación de datos es determinante crítico de AI efectiva y confiable",
    crNote: en ? "CR lacks a national data strategy — key area for policy intervention" : "CR carece de estrategia nacional de datos — área clave para intervención de política" },
  { id: 4, finding: en ? "Insufficient data quality and biased datasets risk reinforcing discrimination" : "Calidad insuficiente de datos y conjuntos sesgados arriesgan reforzar discriminación",
    crNote: en ? "No bias audit requirements exist in CR — regulatory vacuum" : "No existen requisitos de auditoría de sesgo en CR — vacío regulatorio" },
  { id: 5, finding: en ? "AI readiness globally is constrained by limited data scale and uneven internet penetration" : "Preparación AI global limitada por escala de datos reducida y penetración internet desigual",
    crNote: en ? "CR has ~83% internet penetration — above LATAM average, below OECD peers" : "CR tiene ~83% penetración internet — sobre promedio LATAM, bajo pares OCDE" },
  { id: 6, finding: en ? "Data readiness gaps are driven by service capability and governance, not access alone" : "Brechas de preparación de datos impulsadas por capacidad de servicio y gobernanza, no solo acceso",
    crNote: en ? "Access is not CR's main issue — governance and capability are the bottlenecks" : "El acceso no es el problema principal de CR — gobernanza y capacidad son los cuellos de botella" },
  { id: 7, finding: en ? "Basic network coverage supports entry-level AI; advanced network readiness remains uneven" : "Cobertura de red básica soporta AI inicial; preparación de red avanzada sigue desigual",
    crNote: en ? "CR has strong 4G but limited 5G deployment — constrains advanced AI applications" : "CR tiene fuerte 4G pero despliegue 5G limitado — restringe aplicaciones AI avanzadas" },
  { id: 8, finding: en ? "Shortfalls in computing infrastructure, energy supply, and edge devices constrain AI" : "Déficits en infraestructura computacional, suministro energético y dispositivos edge limitan AI",
    crNote: en ? "CR's 99% renewable grid is a unique strength; computing capacity is the gap" : "Red 99% renovable de CR es fortaleza única; capacidad computacional es la brecha" },
  { id: 9, finding: en ? "Open-source technologies lower entry barriers for AI adoption worldwide" : "Tecnologías open-source reducen barreras de entrada para adopción AI mundial",
    crNote: en ? "Opportunity: CR can leverage open-source to offset investment limitations" : "Oportunidad: CR puede aprovechar open-source para compensar limitaciones de inversión" },
  { id: 10, finding: en ? "Open-source engagement correlates strongly with overall readiness dimensions" : "Participación open-source correlaciona fuertemente con todas las dimensiones de preparación",
    crNote: en ? "Increasing open-source contribution could improve multiple readiness scores" : "Aumentar contribución open-source podría mejorar múltiples puntajes de preparación" },
  { id: 11, finding: en ? "Public investment in AI influences readiness levels significantly" : "Inversión pública en AI influye significativamente en niveles de preparación",
    crNote: en ? "CR has minimal dedicated public AI investment — contrast with India €1.25B, UK £500M" : "CR tiene inversión pública AI mínima — contraste con India €1.25B, UK £500M" },
  { id: 12, finding: en ? "Regional evaluation of AI readiness links to strong performance across all dimensions" : "Evaluación regional de preparación AI vinculada a buen desempeño en todas las dimensiones",
    crNote: en ? "ILIA index positions CR below Brazil, Chile, Uruguay in regional readiness" : "Índice ILIA posiciona CR debajo de Brasil, Chile, Uruguay en preparación regional" },
  { id: 13, finding: en ? "AI readiness encompasses technology capacity, governance, sustainability, and inclusion" : "Preparación AI abarca capacidad tecnológica, gobernanza, sostenibilidad e inclusión",
    crNote: en ? "This observatory tracks all four pillars — positioning CR for holistic readiness" : "Este observatorio rastrea los cuatro pilares — posicionando CR para preparación holística" },
];

// ── GLOBAL AI GOVERNANCE (Report 2) ──
export const GLOBAL_AI_GOVERNANCE = (en) => [
  { region: en ? "Europe" : "Europa", country: en ? "European Union" : "Unión Europea", code: "EU", status: en ? "AI Act effective August 2024 — most comprehensive global framework" : "Ley AI vigente agosto 2024 — marco global más completo", category: "comprehensive", year: 2024, investment: "€200B" },
  { region: en ? "Europe" : "Europa", country: en ? "United Kingdom" : "Reino Unido", code: "GB", status: en ? "AI Safety Institute + AI Unit with £500M funding" : "Instituto Seguridad AI + Unidad AI con £500M", category: "framework", year: 2024, investment: "£500M" },
  { region: en ? "Europe" : "Europa", country: en ? "Germany" : "Alemania", code: "DE", status: en ? "€5B national AI investment by 2025" : "€5B inversión nacional AI para 2025", category: "investment", year: 2025, investment: "€5B" },
  { region: en ? "Europe" : "Europa", country: en ? "France" : "Francia", code: "FR", status: en ? "CNIL updated AI recommendations; Franco-Chilean AI Center" : "CNIL actualizó recomendaciones AI; Centro AI Franco-Chileno", category: "framework", year: 2025, investment: "—" },
  { region: en ? "Europe" : "Europa", country: en ? "Spain" : "España", code: "ES", status: en ? "AI regulatory sandbox for testing (SME focus)" : "Sandbox regulatorio AI para pruebas (enfoque PYMES)", category: "sandbox", year: 2024, investment: "—" },
  { region: "Asia-Pacific", country: en ? "South Korea" : "Corea del Sur", code: "KR", status: en ? "AI Basic Act incorporating cybersecurity & privacy" : "Ley Básica AI incorporando ciberseguridad y privacidad", category: "enacted", year: 2025, investment: "—" },
  { region: "Asia-Pacific", country: "India", code: "IN", status: en ? "IndiaAI Mission — sovereign AI push" : "Misión IndiaAI — impulso AI soberana", category: "mission", year: 2024, investment: "€1.25B" },
  { region: "Asia-Pacific", country: "China", code: "CN", status: en ? "Comprehensive AI governance + massive state investment" : "Gobernanza AI integral + inversión estatal masiva", category: "comprehensive", year: 2023, investment: ">$15B" },
  { region: en ? "Americas" : "Américas", country: en ? "Peru" : "Perú", code: "PE", status: en ? "First LATAM AI law — Ley N.° 31814 (July 2023)" : "Primera ley AI LATAM — Ley N.° 31814 (julio 2023)", category: "enacted", year: 2023, investment: "—" },
  { region: en ? "Americas" : "Américas", country: en ? "El Salvador" : "El Salvador", code: "SV", status: en ? "National AI law passed February 2025" : "Ley nacional AI aprobada febrero 2025", category: "enacted", year: 2025, investment: "—" },
  { region: en ? "Americas" : "Américas", country: en ? "Mexico" : "México", code: "MX", status: en ? "Developing broad AI governance framework" : "Desarrollando marco amplio de gobernanza AI", category: "developing", year: 2025, investment: "—" },
  { region: en ? "Americas" : "Américas", country: "Chile", code: "CL", status: en ? "Updating national AI strategy; $1B+ data centre in Patagonia" : "Actualizando estrategia AI nacional; centro datos $1B+ en Patagonia", category: "updating", year: 2025, investment: "$1B+" },
  { region: en ? "Americas" : "Américas", country: "Brasil/Brazil", code: "BR", status: en ? "Highest-ranking in LATAM; identified AI hubs" : "Mayor clasificación LATAM; hubs AI identificados", category: "advancing", year: 2025, investment: "—" },
  { region: en ? "Americas" : "Américas", country: "Argentina", code: "AR", status: en ? "9 pending AI regulation initiatives in Congress" : "9 iniciativas regulación AI pendientes en Congreso", category: "pending", year: 2025, investment: "—" },
  { region: en ? "Americas" : "Américas", country: "Colombia", code: "CO", status: en ? "Working toward AI law development" : "Trabajando hacia desarrollo ley AI", category: "developing", year: 2025, investment: "—" },
  { region: en ? "Americas" : "Américas", country: "Uruguay", code: "UY", status: en ? "AI governance guidance published; regional dialogue contributor" : "Guía gobernanza AI publicada; contribuyente diálogo regional", category: "guidance", year: 2025, investment: "—" },
  { region: en ? "Americas" : "Américas", country: "Costa Rica", code: "CR", status: en ? "No binding AI legislation — Vision 100/100 but Readiness 0.38" : "Sin legislación AI vinculante — Visión 100/100 pero Preparación 0.38", category: "none", year: 2025, investment: "Minimal" },
];

// ── AI FOR GOOD IMPACT AWARD WINNERS 2025 ──
export const AWARD_WINNERS_2025 = (en) => [
  { name: "CareNX — Fetosense", category: en ? "AI for People" : "AI para Personas", color: "#2563eb",
    metric: en ? "500K+ pregnancies monitored across 6 countries, 30% reduction in NICU admissions" : "500K+ embarazos monitoreados en 6 países, 30% reducción admisiones UCIN",
    what: en ? "AI-powered portable fetal monitoring for rural/low-resource areas" : "Monitoreo fetal portátil con AI para áreas rurales/bajos recursos",
    partners: "UNICEF, MIT Solve" },
  { name: "Farmer.Chat — Digital Green", category: en ? "AI for Prosperity" : "AI para Prosperidad", color: "#10b981",
    metric: en ? "250K+ farmers in 4 countries, 24% profit increase, cost $35→$0.35 per farmer" : "250K+ agricultores en 4 países, 24% aumento ganancias, costo $35→$0.35 por agricultor",
    what: en ? "AI chatbot delivering climate-smart agricultural advice via WhatsApp" : "Chatbot AI entregando asesoría agrícola inteligente vía WhatsApp",
    partners: "Bill & Melinda Gates Foundation" },
  { name: "SmartCatch — WorldFish", category: en ? "AI for Planet" : "AI para el Planeta", color: "#f59e0b",
    metric: en ? "Deployed since 2017 across Asia & Africa, works offline on basic phones" : "Desplegado desde 2017 en Asia y África, funciona offline en teléfonos básicos",
    what: en ? "AI image recognition for fish species/size/weight from phone photos" : "Reconocimiento de imagen AI para especie/tamaño/peso de peces desde fotos",
    partners: "CGIAR, FAO" },
];

// ── OBSERVATORY IMPACT METRICS ──
export const OBSERVATORY_IMPACT = {
  countries: 20, algorithms: 10, dataSources: 25, glossaryTerms: 55,
  liveApis: 4, languages: 2, uptime: "24/7",
  sdgsAligned: 8, unAgencies: 6, riskDimensions: 3,
  analysisViews: 19, wefRiskHorizons: 3,
};

// ── AI TRAJECTORY (Report 2) ──
export const AI_TRAJECTORY = (en) => [
  { phase: en ? "Generative AI" : "AI Generativa", status: en ? "Current" : "Actual", year: "2022-now", color: "#2563eb",
    desc: en ? "Text, image, code generation. ChatGPT, Claude, Midjourney. Transforming content creation and knowledge work." : "Generación de texto, imagen, código. ChatGPT, Claude, Midjourney. Transformando creación de contenido y trabajo del conocimiento." },
  { phase: en ? "Agentic AI" : "AI Agéntica", status: en ? "Emerging" : "Emergente", year: "2025-27", color: "#6366f1",
    desc: en ? "Autonomous AI agents that plan, execute, and adapt. Multi-step reasoning, tool use, self-correction." : "Agentes AI autónomos que planifican, ejecutan y adaptan. Razonamiento multi-paso, uso de herramientas, auto-corrección." },
  { phase: en ? "Sovereign AI" : "AI Soberana", status: en ? "Growing" : "Creciente", year: "2024-30", color: "#f97316",
    desc: en ? "Nations building domestic AI infrastructure and capabilities. Data sovereignty, local compute, national strategies." : "Naciones construyendo infraestructura y capacidades AI domésticas. Soberanía de datos, cómputo local, estrategias nacionales." },
  { phase: "Quantum AI", status: en ? "Frontier" : "Frontera", year: "2027+", color: "#ec4899",
    desc: en ? "Quantum computing accelerating AI training and inference. Could solve currently intractable optimization problems." : "Computación cuántica acelerando entrenamiento e inferencia AI. Podría resolver problemas de optimización actualmente intratables." },
  { phase: en ? "Artificial General Intelligence" : "Inteligencia General Artificial", status: en ? "Theoretical" : "Teórico", year: "2030+?", color: "#ef4444",
    desc: en ? "AI matching human-level reasoning across all domains. Timeline debated; governance frameworks needed before arrival." : "AI igualando razonamiento humano en todos los dominios. Cronología debatida; marcos de gobernanza necesarios antes de su llegada." },
];

// ── CAPI-CR TO ITU MAPPING ──
export const CAPI_ITU_MAPPING = (en) => [
  { capiDim: en ? "Digital Infrastructure" : "Infraestructura Digital", ituDims: [4], coverage: en ? "Direct match" : "Coincidencia directa" },
  { capiDim: en ? "Human Capital" : "Capital Humano", ituDims: [5], coverage: en ? "Direct match" : "Coincidencia directa" },
  { capiDim: en ? "Innovation" : "Innovación", ituDims: [6, 7, 9], coverage: en ? "Maps to R&D, Investment, Ecosystem" : "Mapea a I+D, Inversión, Ecosistema" },
  { capiDim: en ? "AI Regulation" : "Regulación AI", ituDims: [3, 8], coverage: en ? "Maps to Data Governance + Policy" : "Mapea a Gobernanza Datos + Política" },
  { capiDim: en ? "Sustainable Energy" : "Energía Sostenible", ituDims: [12], coverage: en ? "Direct match" : "Coincidencia directa" },
  { capiDim: en ? "Digital Security" : "Seguridad Digital", ituDims: [10, 11], coverage: en ? "Maps to Integration + Cross-domain" : "Mapea a Integración + Inter-dominio" },
];

// ── MODULE FRESHNESS (for FreshnessBadge) ──
export const MODULE_FRESHNESS = {
  home: "2026-03",
  banca: "2026-03",
  health: "2026-03",
  zf: "2026-02",
  pymes: "2026-02",
  sec: "2026-02",
  leg: "2026-02",
  edu: "2026-01",
  idx: "2026-01",
  countries: "2026-01",
};

// ── CROSS-MODULE LINKS ──
export const CROSS_LINKS = (en) => ({
  banca: [
    { tab: "health", label: en ? "Health Data Breaches" : "Brechas Datos Salud", desc: en ? "Banking fraud techniques increasingly target health records" : "Técnicas de fraude bancario crecientemente apuntan a expedientes de salud" },
    { tab: "pymes", label: en ? "PYME Fraud Exposure" : "Exposición Fraude PYMES", desc: en ? "98% of SMEs have zero cybersecurity — prime fraud targets" : "98% de PYMES tienen cero ciberseguridad — objetivos principales de fraude" },
    { tab: "leg", label: en ? "Exp. 23.908 Liability" : "Exp. 23.908 Responsabilidad", desc: en ? "Objective liability bill for banks on AI fraud losses" : "Proyecto responsabilidad objetiva bancos por pérdidas fraude AI" },
  ],
  health: [
    { tab: "banca", label: en ? "Financial Fraud & Health" : "Fraude Financiero y Salud", desc: en ? "IFRABA risk index shows crossover between banking and health data theft" : "Índice IFRABA muestra cruce entre robo datos bancarios y de salud" },
    { tab: "sec", label: en ? "AI Security Threats" : "Amenazas Seguridad AI", desc: en ? "Shadow AI and prompt injection risks in health systems" : "Riesgos de Shadow AI e inyección de prompts en sistemas de salud" },
    { tab: "leg", label: en ? "GDPR & Health Data" : "GDPR y Datos de Salud", desc: en ? "EU AI Act health data requirements affect CR exports" : "Requisitos datos salud del EU AI Act afectan exportaciones CR" },
  ],
  zf: [
    { tab: "pymes", label: en ? "BPO Job Displacement" : "Desplazamiento Empleos BPO", desc: en ? "28,000 BPO jobs at risk — SME workforce transition needed" : "28,000 empleos BPO en riesgo — necesaria transición laboral PYME" },
    { tab: "leg", label: en ? "EU AI Act Compliance" : "Cumplimiento EU AI Act", desc: en ? "Aug 2026 enforcement affects all FZ companies exporting to EU" : "Aplicación Ago 2026 afecta todas empresas ZF exportando a UE" },
    { tab: "edu", label: en ? "AI Skills Pipeline" : "Pipeline Habilidades AI", desc: en ? "INA needs AI tracks for FZ workforce demands" : "INA necesita tracks AI para demandas fuerza laboral ZF" },
  ],
  pymes: [
    { tab: "banca", label: en ? "PYME Fraud Risk" : "Riesgo Fraude PYMES", desc: en ? "1% portfolio compromise = ₡13,500MM cascade" : "1% compromiso cartera = ₡13,500MM cascada" },
    { tab: "zf", label: en ? "FZ Supply Chain" : "Cadena Suministro ZF", desc: en ? "SMEs as FZ suppliers face AI compliance requirements" : "PYMES como proveedores ZF enfrentan requisitos cumplimiento AI" },
    { tab: "sec", label: en ? "Cybersecurity for SMEs" : "Ciberseguridad para PYMES", desc: en ? "AI-powered phishing targeting Spanish-speaking businesses" : "Phishing potenciado por AI apuntando a negocios hispanohablantes" },
  ],
  sec: [
    { tab: "banca", label: en ? "Banking Fraud Intel" : "Inteligencia Fraude Bancario", desc: en ? "668% fraud growth and adversarial AI attacks on detection" : "668% crecimiento fraude y ataques adversarios AI a detección" },
    { tab: "health", label: en ? "Health Data Security" : "Seguridad Datos Salud", desc: en ? "CCSS HIVE ransomware — 30K appointments cancelled" : "CCSS HIVE ransomware — 30K citas canceladas" },
    { tab: "leg", label: en ? "Regulatory Framework" : "Marco Regulatorio", desc: en ? "CR scores 0-35 vs UK/EU 60-90 on security governance" : "CR puntúa 0-35 vs UK/UE 60-90 en gobernanza seguridad" },
  ],
  leg: [
    { tab: "banca", label: en ? "Banking AI Regulation" : "Regulación AI Bancaria", desc: en ? "Expediente 23.908 — AI fraud liability for banks" : "Expediente 23.908 — responsabilidad fraude AI bancos" },
    { tab: "zf", label: en ? "FZ Compliance Risk" : "Riesgo Cumplimiento ZF", desc: en ? "EU AI Act extraterritorial impact on Free Zones" : "Impacto extraterritorial EU AI Act en Zonas Francas" },
    { tab: "health", label: en ? "Health AI Governance" : "Gobernanza AI Salud", desc: en ? "Zero health AI regulation in CR vs HIPAA/GDPR globally" : "Cero regulación AI salud en CR vs HIPAA/GDPR globalmente" },
  ],
  home: [
    { tab: "banca", label: en ? "Fraud Intelligence" : "Inteligencia de Fraude", desc: en ? "Real-time fraud loss counter — ₡190/sec" : "Contador pérdidas fraude tiempo real — ₡190/seg" },
    { tab: "health", label: en ? "Health Risk Dashboard" : "Dashboard Riesgo Salud", desc: en ? "12 AI failure modes in health systems" : "12 modos fallo AI en sistemas de salud" },
    { tab: "zf", label: en ? "Free Zone Intelligence" : "Inteligencia Zonas Francas", desc: en ? "$4.3B FDI, 626 companies, EU AI Act impact" : "$4.3B IED, 626 empresas, impacto EU AI Act" },
  ],
});

// ── CURATED COSTA RICA DATA (PROCOMER, CINDE, BCCR, SUGEF, INEC) ──
export const CR_DATA = (en) => ({
  procomer: {
    source: "PROCOMER",
    updated: "2025",
    url: "https://www.procomer.com/",
    exports: {
      total: 8.9, // $B
      fz: 4.3, // $B from Free Zones
      fzPct: 48, // % of total
      topSectors: [
        { name: en ? "Medical Devices" : "Dispositivos Médicos", value: 2.1, pct: 24 },
        { name: en ? "Digital Services" : "Servicios Digitales", value: 1.4, pct: 16 },
        { name: en ? "Food & Agriculture" : "Alimentación y Agricultura", value: 1.2, pct: 13 },
        { name: en ? "Electronics" : "Electrónica", value: 0.9, pct: 10 },
        { name: en ? "Chemicals & Pharma" : "Químicos y Farmacéuticos", value: 0.7, pct: 8 },
      ],
      topDestinations: [
        { name: en ? "United States" : "Estados Unidos", pct: 41 },
        { name: en ? "European Union" : "Unión Europea", pct: 19 },
        { name: en ? "Central America" : "Centroamérica", pct: 15 },
        { name: en ? "Asia" : "Asia", pct: 8 },
      ],
    },
  },
  cinde: {
    source: "CINDE",
    updated: "2025",
    url: "https://www.cinde.org/",
    fdi: {
      total: 4.3, // $B 2024
      companies: 626,
      employees: 265000,
      gdpPct: 15,
      cagr5yr: 12, // %
      bySector: [
        { name: en ? "Advanced Manufacturing" : "Manufactura Avanzada", pct: 32 },
        { name: en ? "Digital Services" : "Servicios Digitales", pct: 28 },
        { name: en ? "Life Sciences" : "Ciencias de la Vida", pct: 22 },
        { name: en ? "Shared Services" : "Servicios Compartidos", pct: 18 },
      ],
      topInvestors: ["Intel", "Amazon", "HP", "Pfizer", "Abbott", "Edwards Lifesciences", "Microsoft"],
    },
  },
  bccr: {
    source: "BCCR",
    updated: "2025",
    url: "https://www.bccr.fi.cr/",
    macro: {
      gdp: 70.5, // $B nominal
      gdpGrowth: 4.2, // % 2024
      inflation: 2.1, // % 2024
      unemployment: 8.5, // % Q4 2024
      publicDebt: 62.5, // % GDP
      creditPrivate: 48, // % GDP credit to private sector
      exchangeRate: 510, // CRC/USD avg 2024
    },
  },
  sugef: {
    source: "SUGEF",
    updated: "2025",
    url: "https://www.sugef.fi.cr/",
    banking: {
      assets: 52.3, // $B total banking assets
      nplRatio: 2.8, // % non-performing loans
      capitalAdequacy: 16.2, // % tier 1 capital
      digitalBanking: 72, // % transactions digital
      fintechs: 45, // registered fintechs
      cybIncidents: 1200, // reported 2024
      fraudGrowthCagr: 47.3, // % 2020-2024
    },
  },
  inec: {
    source: "INEC",
    updated: "2024",
    url: "https://www.inec.cr/",
    digital: {
      internetHouseholds: 87, // % with internet access
      mobilePhones: 170, // per 100 inhabitants (penetration rate)
      urbanInternet: 93, // %
      ruralInternet: 72, // %
      digitalDivideGap: 21, // percentage points urban-rural
      computerHouseholds: 58, // %
      ecommerceUsers: 42, // % of internet users buy online
    },
    demographics: {
      population: 5.2, // M
      medianAge: 34,
      urbanPct: 80,
      literacyRate: 97.9,
      tertiaryEnrollment: 58, // %
      giniCoefficient: 0.49,
    },
  },
});
