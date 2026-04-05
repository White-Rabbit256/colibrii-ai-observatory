/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS MCP SERVER — DATA MODULE
   Plain JavaScript objects (no React, no JSX)
   Extracted from the Observatory portal's data.js + iliaData.js + agenticData.js
   ═══════════════════════════════════════════════════════════════ */

// ── 20 PEER COUNTRIES ──
export const COUNTRIES = {
  SGP: { name: "Singapore", nameEs: "Singapur", iso: "SGP", flag: "SG", region: "Asia", note: "#1 AI readiness global", pop: "5.9M", gdp: "$397B", continent: "Asia" },
  KOR: { name: "South Korea", nameEs: "Corea del Sur", iso: "KOR", flag: "KR", region: "Asia", note: "AI Framework Act 2026", pop: "51.7M", gdp: "$1.67T", continent: "Asia" },
  JPN: { name: "Japan", nameEs: "Japon", iso: "JPN", flag: "JP", region: "Asia", note: "AI overperformer, robotics leader", pop: "125M", gdp: "$4.23T", continent: "Asia" },
  EST: { name: "Estonia", nameEs: "Estonia", iso: "EST", flag: "EE", region: "Europe", note: "Digital government #1 world", pop: "1.3M", gdp: "$38B", continent: "Europe" },
  FIN: { name: "Finland", nameEs: "Finlandia", iso: "FIN", flag: "FI", region: "Europe", note: "1% population educated in AI", pop: "5.5M", gdp: "$282B", continent: "Europe" },
  IRL: { name: "Ireland", nameEs: "Irlanda", iso: "IRL", flag: "IE", region: "Europe", note: "European tech hub, FDI model", pop: "5.1M", gdp: "$529B", continent: "Europe" },
  CHL: { name: "Chile", nameEs: "Chile", iso: "CHL", flag: "CL", region: "LATAM", note: "LATAM AI leader, AI bill in senate", pop: "19.5M", gdp: "$301B", continent: "LATAM" },
  URY: { name: "Uruguay", nameEs: "Uruguay", iso: "URY", flag: "UY", region: "LATAM", note: "Plan Ceibal, high digitalization", pop: "3.4M", gdp: "$71B", continent: "LATAM" },
  CRI: { name: "Costa Rica", nameEs: "Costa Rica", iso: "CRI", flag: "CR", region: "LATAM", note: "AI Overperformer - World Bank AIPI classification", pop: "5.2M", gdp: "$69B", continent: "LATAM" },
  PAN: { name: "Panama", nameEs: "Panama", iso: "PAN", flag: "PA", region: "LATAM", note: "Logistics hub, dollarized", pop: "4.4M", gdp: "$77B", continent: "LATAM" },
  BRA: { name: "Brazil", nameEs: "Brasil", iso: "BRA", flag: "BR", region: "LATAM", note: "Largest LATAM economy, PL 2338", pop: "216M", gdp: "$1.92T", continent: "LATAM" },
  COL: { name: "Colombia", nameEs: "Colombia", iso: "COL", flag: "CO", region: "LATAM", note: "Direct nearshoring competitor", pop: "52M", gdp: "$343B", continent: "LATAM" },
  MEX: { name: "Mexico", nameEs: "Mexico", iso: "MEX", flag: "MX", region: "LATAM", note: "Nearshoring leader, 130M market", pop: "130M", gdp: "$1.32T", continent: "LATAM" },
  ARG: { name: "Argentina", nameEs: "Argentina", iso: "ARG", flag: "AR", region: "LATAM", note: "Tech talent, AI startups", pop: "46M", gdp: "$641B", continent: "LATAM" },
  PER: { name: "Peru", nameEs: "Peru", iso: "PER", flag: "PE", region: "LATAM", note: "Emerging economy", pop: "34M", gdp: "$242B", continent: "LATAM" },
  DOM: { name: "Dominican Republic", nameEs: "Rep. Dominicana", iso: "DOM", flag: "DO", region: "LATAM", note: "Direct FDI competitor", pop: "11M", gdp: "$114B", continent: "LATAM" },
  VNM: { name: "Vietnam", nameEs: "Vietnam", iso: "VNM", flag: "VN", region: "Asia", note: "Manufacturing, costs 30-50% lower", pop: "100M", gdp: "$409B", continent: "Asia" },
  PHL: { name: "Philippines", nameEs: "Filipinas", iso: "PHL", flag: "PH", region: "Asia", note: "$38B IT-BPM, 1.82M BPO", pop: "115M", gdp: "$404B", continent: "Asia" },
  MYS: { name: "Malaysia", nameEs: "Malasia", iso: "MYS", flag: "MY", region: "Asia", note: "AI overperformer, semiconductors", pop: "33M", gdp: "$399B", continent: "Asia" },
  IDN: { name: "Indonesia", nameEs: "Indonesia", iso: "IDN", flag: "ID", region: "Asia", note: "AI overperformer, 270M market", pop: "277M", gdp: "$1.32T", continent: "Asia" }
};

// ── GOVERNANCE DATA (CPI, Freedom House, GPI, Oxford AI Readiness, HDI, V-Dem) ──
export const GOVERNANCE = {
  SGP: { cpi: 83, freedomHouse: 47, gpi: 1.33, oxfordAI: 8.11, hdi: 0.949, vdem: 0.35 },
  KOR: { cpi: 63, freedomHouse: 83, gpi: 1.76, oxfordAI: 7.66, hdi: 0.929, vdem: 0.82 },
  JPN: { cpi: 73, freedomHouse: 96, gpi: 1.34, oxfordAI: 7.91, hdi: 0.920, vdem: 0.85 },
  EST: { cpi: 76, freedomHouse: 94, gpi: 1.60, oxfordAI: 7.55, hdi: 0.899, vdem: 0.87 },
  FIN: { cpi: 87, freedomHouse: 100, gpi: 1.27, oxfordAI: 7.42, hdi: 0.942, vdem: 0.93 },
  IRL: { cpi: 77, freedomHouse: 97, gpi: 1.31, oxfordAI: 7.13, hdi: 0.950, vdem: 0.90 },
  CHL: { cpi: 67, freedomHouse: 93, gpi: 1.83, oxfordAI: 6.38, hdi: 0.860, vdem: 0.80 },
  URY: { cpi: 73, freedomHouse: 97, gpi: 1.68, oxfordAI: 5.64, hdi: 0.830, vdem: 0.89 },
  CRI: { cpi: 55, freedomHouse: 91, gpi: 1.44, oxfordAI: 5.88, hdi: 0.806, vdem: 0.88 },
  PAN: { cpi: 36, freedomHouse: 84, gpi: 1.86, oxfordAI: 4.79, hdi: 0.820, vdem: 0.72 },
  BRA: { cpi: 36, freedomHouse: 72, gpi: 2.38, oxfordAI: 5.76, hdi: 0.760, vdem: 0.66 },
  COL: { cpi: 40, freedomHouse: 55, gpi: 2.73, oxfordAI: 5.22, hdi: 0.752, vdem: 0.56 },
  MEX: { cpi: 31, freedomHouse: 50, gpi: 2.60, oxfordAI: 5.46, hdi: 0.781, vdem: 0.42 },
  ARG: { cpi: 38, freedomHouse: 85, gpi: 1.74, oxfordAI: 5.12, hdi: 0.842, vdem: 0.73 },
  PER: { cpi: 33, freedomHouse: 71, gpi: 2.12, oxfordAI: 4.68, hdi: 0.762, vdem: 0.58 },
  DOM: { cpi: 30, freedomHouse: 66, gpi: 2.07, oxfordAI: 4.33, hdi: 0.767, vdem: 0.52 },
  VNM: { cpi: 42, freedomHouse: 19, gpi: 1.83, oxfordAI: 5.01, hdi: 0.726, vdem: 0.22 },
  PHL: { cpi: 34, freedomHouse: 56, gpi: 2.38, oxfordAI: 4.56, hdi: 0.710, vdem: 0.48 },
  MYS: { cpi: 50, freedomHouse: 51, gpi: 1.63, oxfordAI: 5.95, hdi: 0.807, vdem: 0.38 },
  IDN: { cpi: 34, freedomHouse: 57, gpi: 1.85, oxfordAI: 5.34, hdi: 0.713, vdem: 0.45 }
};

// ── CURATED DIMENSION SCORES (D4: AI Regulation, D6: Digital Security) ──
export const CURATED_SCORES = {
  SGP: { D4: 0.85, D6: 0.88 }, KOR: { D4: 0.75, D6: 0.80 }, JPN: { D4: 0.68, D6: 0.82 },
  EST: { D4: 0.72, D6: 0.78 }, FIN: { D4: 0.70, D6: 0.82 }, IRL: { D4: 0.68, D6: 0.72 },
  CHL: { D4: 0.58, D6: 0.52 }, URY: { D4: 0.45, D6: 0.44 }, CRI: { D4: 0.38, D6: 0.40 },
  PAN: { D4: 0.30, D6: 0.35 }, BRA: { D4: 0.48, D6: 0.45 }, COL: { D4: 0.35, D6: 0.38 },
  MEX: { D4: 0.42, D6: 0.42 }, ARG: { D4: 0.33, D6: 0.36 }, PER: { D4: 0.28, D6: 0.32 },
  DOM: { D4: 0.25, D6: 0.30 }, VNM: { D4: 0.40, D6: 0.45 }, PHL: { D4: 0.32, D6: 0.35 },
  MYS: { D4: 0.55, D6: 0.58 }, IDN: { D4: 0.42, D6: 0.40 }
};

// ── 6 CAPI-CR DIMENSIONS ──
export const DIMENSIONS = {
  D1: {
    id: "D1", name: "Digital Infrastructure", nameEs: "Infraestructura Digital", weight: 0.20,
    indicators: ["IT.NET.USER.ZS", "IT.NET.BBND.P2"],
    description: "Measures connectivity and digital penetration: internet users (%) and fixed broadband subscriptions per 100 inhabitants. Explains 28.8% of AI readiness variance for upper-middle-income countries."
  },
  D2: {
    id: "D2", name: "Human Capital", nameEs: "Capital Humano", weight: 0.20,
    indicators: ["SE.TER.ENRR", "SE.XPD.TOTL.GD.ZS", "SL.UEM.TOTL.ZS"],
    description: "Evaluates national talent capacity for AI: tertiary enrollment (%), education spending (% GDP), unemployment rate (inverted)."
  },
  D3: {
    id: "D3", name: "Innovation", nameEs: "Innovacion", weight: 0.15,
    indicators: ["GB.XPD.RSDV.GD.ZS", "TX.VAL.TECH.MF.ZS", "BX.KLT.DINV.WD.GD.ZS"],
    description: "Measures innovation capacity: R&D spending (% GDP), high-tech exports (% manufacturing), FDI (% GDP)."
  },
  D4: {
    id: "D4", name: "AI Regulation", nameEs: "Regulacion AI", weight: 0.15,
    indicators: ["curated"],
    description: "Curated score based on AI legal framework: binding law, regulatory authority, mandatory algorithmic impact assessments, anti-discrimination protections, AI deployment transparency, regulatory sandbox."
  },
  D5: {
    id: "D5", name: "Sustainable Energy", nameEs: "Energia Sostenible", weight: 0.15,
    indicators: ["EG.ELC.ACCS.ZS", "EG.ELC.RNWX.ZS", "EG.USE.ELEC.KH.PC"],
    description: "Measures energy advantage for AI: electricity access (%), renewable electricity share (%), electric consumption per capita. AI models consume 4,600x more energy than traditional software."
  },
  D6: {
    id: "D6", name: "Digital Security", nameEs: "Seguridad Digital", weight: 0.15,
    indicators: ["curated"],
    description: "Curated cybersecurity capacity score: SOC maturity, standards compliance, incident history, post-incident investment, response capacity, quantum readiness."
  }
};

// ── 11 WORLD BANK INDICATORS ──
export const INDICATORS = {
  "IT.NET.USER.ZS": { dimension: "D1", name: "Internet users (%)", inverted: false },
  "IT.NET.BBND.P2": { dimension: "D1", name: "Fixed broadband/100", inverted: false },
  "SE.TER.ENRR": { dimension: "D2", name: "Tertiary enrollment (%)", inverted: false },
  "SE.XPD.TOTL.GD.ZS": { dimension: "D2", name: "Education spending (%GDP)", inverted: false },
  "SL.UEM.TOTL.ZS": { dimension: "D2", name: "Unemployment (%)", inverted: true },
  "GB.XPD.RSDV.GD.ZS": { dimension: "D3", name: "R&D spending (%GDP)", inverted: false },
  "TX.VAL.TECH.MF.ZS": { dimension: "D3", name: "Hi-tech exports (%manuf)", inverted: false },
  "BX.KLT.DINV.WD.GD.ZS": { dimension: "D3", name: "FDI (%GDP)", inverted: false },
  "EG.ELC.ACCS.ZS": { dimension: "D5", name: "Electricity access (%)", inverted: false },
  "EG.ELC.RNWX.ZS": { dimension: "D5", name: "Renewable electricity (%)", inverted: false },
  "EG.USE.ELEC.KH.PC": { dimension: "D5", name: "Electric consumption kWh/cap", inverted: false }
};

// ── ILIA 2025 RANKINGS — 19 LATAM Countries ──
export const ILIA_RANKINGS = [
  { rank: 1, country: "Chile", score: 70.56, tier: "Pioneer", change: 0, highlight: "Retains #1 position with strongest governance and enabling factors in the region." },
  { rank: 2, country: "Brazil", score: 67.39, tier: "Pioneer", change: 0, highlight: "Dominates R&D with >90% of regional HPC capacity and 68% of researchers (with Mexico)." },
  { rank: 3, country: "Uruguay", score: 62.05, tier: "Pioneer", change: 0, highlight: "Consistent pioneer, strong in digital inclusion and governance frameworks." },
  { rank: 4, country: "Colombia", score: 55.84, tier: "Adopter", change: 1, highlight: "Top adopter tier, among the 5 countries concentrating 90% of AI publications." },
  { rank: 5, country: "Costa Rica", score: 53.83, tier: "Adopter", change: 4, highlight: "AI Overperformer: jumped 4 positions, 10.85 points above regional average. Launched ENIA-CR 2024-2027." },
  { rank: 6, country: "Argentina", score: 52.98, tier: "Adopter", change: -1, highlight: "Strong research base, among top 5 for AI publications. Slight decline in position." },
  { rank: 7, country: "Peru", score: 49.15, tier: "Adopter", change: 0, highlight: "Stable adopter, among the leaders in GenAI adoption intensity." },
  { rank: 8, country: "Mexico", score: 47.82, tier: "Adopter", change: -2, highlight: "Second largest AI research base (with Brazil = 68% of researchers). Dropped 2 positions." },
  { rank: 9, country: "Dominican Republic", score: 41.25, tier: "Adopter", change: 3, highlight: "Among the late adopters showing accelerated improvement in ILIA 2025." },
  { rank: 10, country: "Ecuador", score: 39.20, tier: "Adopter", change: 5, highlight: "Notable late awakening -- among the biggest risers with accelerated improvements." },
  { rank: 11, country: "Panama", score: 37.85, tier: "Adopter", change: 0, highlight: "Among GenAI adoption leaders, strong digital infrastructure hub." },
  { rank: 12, country: "El Salvador", score: 35.90, tier: "Adopter", change: 1, highlight: "Excels in open-source software adoption, digital-forward approach." },
  { rank: 13, country: "Jamaica", score: 33.60, tier: "Explorer", change: 0, highlight: "Leading Caribbean explorer, building foundational AI capabilities." },
  { rank: 14, country: "Paraguay", score: 31.45, tier: "Explorer", change: 0, highlight: "Explorer stage, developing national AI capacity frameworks." },
  { rank: 15, country: "Cuba", score: 29.80, tier: "Explorer", change: 1, highlight: "Excels in open-source software development despite infrastructure constraints." },
  { rank: 16, country: "Guatemala", score: 28.15, tier: "Explorer", change: 2, highlight: "Among the late adopters showing accelerated improvements in 2025." },
  { rank: 17, country: "Honduras", score: 25.90, tier: "Explorer", change: 0, highlight: "Excels in open-source software, building from limited base." },
  { rank: 18, country: "Bolivia", score: 26.06, tier: "Explorer", change: -1, highlight: "Explorer stage, limited AI infrastructure and governance frameworks." },
  { rank: 19, country: "Venezuela", score: 19.50, tier: "Explorer", change: 0, highlight: "Lowest ranked, significant infrastructure and governance gaps." }
];

export const ILIA_TIERS = [
  { id: "pioneer", name: "Pioneer", range: "60-100", count: 3, description: "Countries with advanced AI ecosystems, robust governance, and significant R&D capacity." },
  { id: "adopter", name: "Adopter", range: "35-60", count: 9, description: "Countries actively building AI capabilities with national strategies or adoption programs." },
  { id: "explorer", name: "Explorer", range: "0-35", count: 7, description: "Countries in early stages of AI development, with limited infrastructure and nascent talent pipelines." }
];

export const ILIA_REGIONAL_STATS = {
  regionalAverage: 42.98,
  totalCountries: 19,
  pioneers: 3,
  adopters: 9,
  explorers: 7,
  source: "CEPAL + CENIA (Chile), ILIA 2025 Report"
};

// ── COSTA RICA ILIA 2025 SCORECARD ──
export const CR_ILIA_PROFILE = {
  overall: { score: 53.83, position: 5, tier: "Adopter", regionalAvg: 42.98, aboveAvg: 10.85, change: 4 },
  dimensions: [
    { id: "enabling", name: "Enabling Factors", score: 49.92, position: 6, subdimensions: [
      { id: "infrastructure", name: "Infrastructure", score: 53.11, position: 5 },
      { id: "data", name: "Data", score: 39.73, position: 13 },
      { id: "talent", name: "Human Talent", score: 53.62, position: 3 }
    ]},
    { id: "development", name: "AI Development", score: null, subdimensions: [
      { id: "research", name: "Research", score: null },
      { id: "adoption", name: "Adoption", score: null }
    ]},
    { id: "governance", name: "Governance", score: null, subdimensions: [
      { id: "policy", name: "Policy & Regulation", score: null },
      { id: "ethics", name: "Ethics & Transparency", score: null }
    ]}
  ]
};

// ── LEGISLATION DATA ──
export const LEGISLATION = [
  { name: "EU AI Act", country: "EU", status: "IN FORCE", description: "World's first comprehensive AI law. 4 risk tiers: unacceptable, high-risk, limited, minimal. Penalties: EUR 35M or 7% global turnover.", link: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj" },
  { name: "South Korea AI Framework", country: "South Korea", status: "IN FORCE (Jan 2026)", description: "Best model for CR: regulation + innovation in ONE law. Consolidated 19 bills. National AI Committee, AI Safety Institute. Foreign companies need domestic representative.", link: "https://cset.georgetown.edu/publication/south-korea-ai-law-2025/" },
  { name: "Colorado SB 24-205", country: "USA (Colorado)", status: "JUN 2026", description: "First US state anti-AI-discrimination law. 'Reasonable care' for AI in employment, education, finance, health. Annual impact assessments. Consumer opt-out rights.", link: "https://leg.colorado.gov/bills/sb24-205" },
  { name: "Chile AI Bill", country: "Chile", status: "IN SENATE", description: "Approved Chamber Aug 2025. Modeled on EU AI Act 4 tiers. First country to complete UNESCO RAM. AI Advisory Council.", link: "https://www.camara.cl/legislacion/ProyectosDeLey/tramitacion.aspx?prmID=16554" },
  { name: "CR ENIA", country: "Costa Rica", status: "STRATEGY ONLY", description: "First Central American country with national AI strategy (MICITT, Oct 2024). 7 pillars. BUT: NO binding law, NO authority, NO mandatory transparency. Score: 0.38/1.0.", link: "https://www.micit.go.cr/sites/default/files/estrategia-nacional-ia-cr.pdf" },
  { name: "CR Bill 23771", country: "Costa Rica", status: "IN COMMITTEE", description: "'Law for the Regulation of AI in Costa Rica' filed May 2023. Covers transparency, privacy, data security. First AI-specific bill in Central America. Drafted with ChatGPT-4.", link: "https://www.asamblea.go.cr/glcp/SitePages/ConsultaProyectos.aspx" },
  { name: "CR Bill 23097", country: "Costa Rica", status: "IN REVIEW", description: "Data Protection reform aligning with EU GDPR. Strengthens PRODHAB. Essential for AI governance infrastructure. GDPR adequacy enables EU data flows for free zone companies.", link: "https://www.asamblea.go.cr/glcp/SitePages/ConsultaProyectos.aspx" }
];

// ── REGULATORY STATUS BY COUNTRY ──
export const REGULATORY_STATUS = {
  SGP: { status: "Advanced", bindingLaw: true, framework: "AICA (AI governance framework)", authority: "IMDA / PDPC", sandbox: true, notes: "Model AI Governance Framework, AICA binding for high-risk AI" },
  KOR: { status: "Advanced", bindingLaw: true, framework: "AI Framework Act (Jan 2026)", authority: "National AI Committee", sandbox: true, notes: "Consolidated 19 bills, AI Safety Institute, foreign rep required" },
  JPN: { status: "Moderate", bindingLaw: false, framework: "Social Principles of Human-Centric AI", authority: "METI / MIC", sandbox: true, notes: "Principles-based, pro-innovation approach" },
  EST: { status: "Advanced (EU)", bindingLaw: true, framework: "EU AI Act", authority: "National designation pending", sandbox: true, notes: "Digital governance leader, e-residency model" },
  FIN: { status: "Advanced (EU)", bindingLaw: true, framework: "EU AI Act", authority: "National designation pending", sandbox: true, notes: "Elements of AI course trained 1% population" },
  IRL: { status: "Advanced (EU)", bindingLaw: true, framework: "EU AI Act", authority: "National designation pending", sandbox: true, notes: "Tech hub, strong data protection via GDPR" },
  CHL: { status: "In Progress", bindingLaw: false, framework: "AI Bill in Senate (EU-modeled)", authority: "Proposed AI Advisory Council", sandbox: false, notes: "First LATAM country to complete UNESCO RAM" },
  URY: { status: "Emerging", bindingLaw: false, framework: "National AI Strategy", authority: "AGESIC", sandbox: false, notes: "Strong digital inclusion, Plan Ceibal" },
  CRI: { status: "Strategy Only", bindingLaw: false, framework: "ENIA (strategy, not law)", authority: "None designated", sandbox: false, notes: "100/100 Oxford Vision score BUT 0 binding laws. Bill 23771 stalled in committee. CAPI-CR D4 score: 0.38" },
  PAN: { status: "Minimal", bindingLaw: false, framework: "No AI-specific strategy", authority: "None", sandbox: false, notes: "Digital infrastructure hub but no AI governance" },
  BRA: { status: "In Progress", bindingLaw: false, framework: "PL 2338/2023 (AI regulation bill)", authority: "ANPD (data protection)", sandbox: false, notes: "Largest LATAM economy, active legislative debate" },
  COL: { status: "Emerging", bindingLaw: false, framework: "AI Ethics Framework", authority: "MinTIC", sandbox: false, notes: "Growing AI adoption but limited regulation" },
  MEX: { status: "Minimal", bindingLaw: false, framework: "No comprehensive AI policy", authority: "None designated", sandbox: false, notes: "Nearshoring leader but regulatory gap" },
  ARG: { status: "Emerging", bindingLaw: false, framework: "National AI Plan", authority: "Subsecretaria TIC", sandbox: false, notes: "Strong AI talent, limited governance" },
  PER: { status: "Emerging", bindingLaw: true, framework: "AI Promotion Law (Jul 2023)", authority: "PCM", sandbox: false, notes: "First LATAM binding AI law, promotion-focused" },
  DOM: { status: "Minimal", bindingLaw: false, framework: "Digital Agenda", authority: "OGTIC", sandbox: false, notes: "Growing digital economy, no AI-specific regulation" },
  VNM: { status: "Emerging", bindingLaw: false, framework: "National AI Strategy 2030", authority: "MOST", sandbox: false, notes: "AI overperformer, manufacturing focus" },
  PHL: { status: "Minimal", bindingLaw: false, framework: "National AI Strategy Roadmap", authority: "DOST / DICT", sandbox: false, notes: "BPO leader, limited AI governance" },
  MYS: { status: "Emerging", bindingLaw: false, framework: "National AI Roadmap", authority: "MDEC", sandbox: true, notes: "AI overperformer, semiconductor hub" },
  IDN: { status: "Emerging", bindingLaw: false, framework: "National AI Strategy 2045", authority: "BRIN", sandbox: false, notes: "AI overperformer, 270M market" }
};

// ── AI WORKFORCE IMPACT DATA ──
export const WORKFORCE_IMPACT = {
  headline: {
    jobsCreated: "170M new roles by 2030 (WEF 2025)",
    jobsDisplaced: "92M jobs eliminated by 2030 (WEF 2025)",
    netGain: "+78M net new positions (WEF 2025)",
    caveat: "Jobs being destroyed and created are NOT the same jobs -- different skills, wages, and geographies required."
  },
  byTimeframe: [
    { period: "2024-2026", title: "Early Disruption", predictions: "78% of organizations using AI. 62% experimenting with agents. 40% of enterprise apps will embed agents by end of 2026. 76,440+ positions eliminated by early AI adoption." },
    { period: "2027-2028", title: "Acceleration", predictions: "50% of organizations will have adopted agentic AI. 7.5M data entry/admin jobs could be eliminated. 15% of everyday workplace decisions made autonomously by agentic AI." },
    { period: "2029-2030", title: "Transformation", predictions: "AI agents resolve 80% of customer issues without humans. Support costs reduced 30%. AI agents market reaches $48-100B." },
    { period: "2030+", title: "New Equilibrium", predictions: "50% probability of AGI by 2033. Multi-agent systems handle majority of routine cognitive work." }
  ],
  bySector: [
    { sector: "Finance & Banking", risk: "HIGH AUGMENTATION + MODERATE DISPLACEMENT", impact: "Multi-agent fraud detection: 87% to 96% accuracy, $18.7M annual savings. Automated KYC, claims, reconciliation.", jobsAffected: "Back-office processing roles at highest risk" },
    { sector: "Healthcare", risk: "HIGH AUGMENTATION", impact: "80%+ health systems prioritizing agentic AI. First autonomous prescription renewal pilot (Utah, Jan 2026).", jobsAffected: "Clinician roles augmented -- more time for direct care" },
    { sector: "Legal", risk: "MODERATE AUGMENTATION + DISPLACEMENT", impact: "Document review, contract analysis, legal research increasingly automated.", jobsAffected: "Paralegals and junior associates most affected" },
    { sector: "Software Development", risk: "HIGH AUGMENTATION", impact: "85% of developers using AI tools. 58% faster time-to-PR. Developer role shifts to orchestrating agents.", jobsAffected: "Fewer junior developers for routine tasks; seniors become agent orchestrators" },
    { sector: "Customer Service", risk: "VERY HIGH DISPLACEMENT", impact: "80% automation risk. 2.24M of 2.8M U.S. jobs exposed. Expected to resolve 80% of issues without humans by 2029.", jobsAffected: "Most routine inquiries fully automated by 2029" },
    { sector: "Education", risk: "MODERATE AUGMENTATION", impact: "Personalized tutoring agents, automated grading. WEF identifies EdTech as needing agentic AI.", jobsAffected: "Teacher role evolves to facilitator and mentor" },
    { sector: "Manufacturing", risk: "MODERATE PHYSICAL + HIGH COGNITIVE", impact: "AI agents and robots can automate over 57% of U.S. work hours (McKinsey). Supply chain optimization.", jobsAffected: "Physical automation slower than cognitive" }
  ],
  byOccupation: [
    { role: "Customer Service Representatives", exposure: "80%", jobs: "2.24M (US)", source: "SSRN" },
    { role: "Data Entry & Administrative", exposure: "75%", jobs: "7.5M globally by 2027", source: "Multiple" },
    { role: "BPO / Shared Services", exposure: "70%", jobs: "9%+ of CR GDP", source: "IMF / Industry" },
    { role: "Junior Software Developers", exposure: "60%", jobs: "Role shifts to agent orchestration", source: "McKinsey" },
    { role: "Paralegals & Legal Assistants", exposure: "55%", jobs: "Document review, research automated", source: "Industry" },
    { role: "Financial Analysts (Back-Office)", exposure: "50%", jobs: "Reconciliation, claims processing", source: "BCG" }
  ]
};

// ── DATA SOURCE REGISTRY (96+ sources) ──
export const DATA_SOURCES = {
  apiSources: [
    { name: "World Bank Open Data", description: "11 indicators x 20 countries", status: "Active", url: "https://api.worldbank.org/v2/" },
    { name: "GDELT Project", description: "AI news feed, 72h window", status: "Active", url: "https://api.gdeltproject.org" },
    { name: "Exchange Rates API", description: "Live CRC/USD rates", status: "Active", url: "https://open.er-api.com" },
    { name: "REST Countries", description: "Population, GDP, flags", status: "Active", url: "https://restcountries.com" },
    { name: "WHO GHO", description: "Health indicators, UHC", status: "Planned", url: "https://ghoapi.azureedge.net" },
    { name: "GitHub Search", description: "AI repos by country", status: "Planned", url: "https://api.github.com" },
    { name: "OECD SDMX", description: "Labor, R&D data", status: "Available", url: "https://sdmx.oecd.org" },
    { name: "UNDP Human Development API", description: "HDI components for peers", status: "Planned", url: "http://ec2-52-1-168-42.compute-1.amazonaws.com/version/1/" },
    { name: "UNESCO UIS Data Browser", description: "4,636+ education indicators", status: "Planned", url: "https://databrowser.uis.unesco.org/" },
    { name: "FAO FAOSTAT SDMX", description: "Agricultural, food security", status: "Available", url: "https://sdmx.fao.org/public/rest/data/" },
    { name: "OECD.AI Policy Observatory", description: "CR-specific AI policy data", status: "Available", url: "https://oecd.ai/en/" },
    { name: "ITU ICT Eye / DataHub", description: "Telecom, broadband indicators", status: "Available", url: "https://datahub.itu.int/" },
    { name: "ILO ILOSTAT", description: "Labor market, employment", status: "Available", url: "https://ilostat.ilo.org/data/" }
  ],
  annualReports: [
    "Transparency Int'l CPI", "Freedom House", "CATO Human Freedom Index", "Global Peace Index",
    "Stanford HAI AI Index", "Oxford AI Readiness", "V-Dem Democracy", "IMF AIPI",
    "WEF Global Risks 2025", "WEF Global Risks 2026", "WEF Future of Jobs", "ILO Working Papers",
    "ILO Buffer or Bottleneck", "PROCOMER Reports", "CINDE Statistics", "BCCR Data",
    "IFR World Robotics", "Goldman Sachs Research", "OWASP AI Top 10", "UN E-Government Survey",
    "WB Beyond the AI Divide", "WB Digital Progress 2025", "OECD CR Economic Survey",
    "IDB AI Jobs LATAM 2025", "PwC AI Jobs Barometer", "WEF Global Cybersecurity Outlook 2026",
    "Bank of America AI Research", "Deloitte AI Institute Reports", "McKinsey Global AI Survey",
    "UNCTAD Technology & Innovation"
  ],
  partners: [
    "World Bank", "OECD", "WEF", "UNESCO", "GDELT", "PROCOMER", "CINDE", "IMF", "ILO",
    "Oxford Insights", "Stanford HAI", "Transparency Int'l", "Freedom House", "IEP", "OWASP",
    "Goldman Sachs", "IFR", "UNDP", "FAO", "WHO", "UNCTAD", "IDB", "Deloitte", "McKinsey",
    "Bank of America"
  ]
};

// ── COUNTRY CODE ALIASES (for flexible lookups) ──
export const COUNTRY_ALIASES = {};
for (const [code, c] of Object.entries(COUNTRIES)) {
  COUNTRY_ALIASES[code] = code;
  COUNTRY_ALIASES[code.toLowerCase()] = code;
  COUNTRY_ALIASES[c.name.toLowerCase()] = code;
  COUNTRY_ALIASES[c.nameEs.toLowerCase()] = code;
}
// Extra common aliases
Object.assign(COUNTRY_ALIASES, {
  "cr": "CRI", "costarica": "CRI", "costa rica": "CRI",
  "sg": "SGP", "singapore": "SGP",
  "kr": "KOR", "korea": "KOR", "south korea": "KOR",
  "jp": "JPN", "japan": "JPN",
  "ee": "EST", "estonia": "EST",
  "fi": "FIN", "finland": "FIN",
  "ie": "IRL", "ireland": "IRL",
  "cl": "CHL", "chile": "CHL",
  "uy": "URY", "uruguay": "URY",
  "pa": "PAN", "panama": "PAN",
  "br": "BRA", "brazil": "BRA", "brasil": "BRA",
  "co": "COL", "colombia": "COL",
  "mx": "MEX", "mexico": "MEX",
  "ar": "ARG", "argentina": "ARG",
  "pe": "PER", "peru": "PER",
  "do": "DOM", "dominican republic": "DOM", "dominican rep.": "DOM", "rep. dominicana": "DOM",
  "vn": "VNM", "vietnam": "VNM",
  "ph": "PHL", "philippines": "PHL", "filipinas": "PHL",
  "my": "MYS", "malaysia": "MYS", "malasia": "MYS",
  "id": "IDN", "indonesia": "IDN"
});
