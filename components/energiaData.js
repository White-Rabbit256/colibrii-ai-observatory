/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Energía Data Module
   Electricidad, Competitividad Energética & IA · Expediente 23.414
   Built by the Section Factory (Run #1) — data-engineer stage.
   Provenance contract: /knowledge/sections/energia.md
   Rules: /skills/colibrii-section-factory/references/data-standards.md
   No orphan numbers. Every figure carries s → SRC[id]. conf: verified|reported|estimate
   ═══════════════════════════════════════════════════════════════ */

/* ── Section accent palette (DISCOVERY C1 — section-local, not global tokens) ── */
export const EN_ACCENT = {
  navy: "#0A1F3F",
  navy2: "#10294f",
  navyDeep: "#06152e",   // deepest panel base (was a one-off #050f24)
  turquoise: "#00B5A8",
  gold: "#F2B135",
  glow: "#22d3ee",
  sky: "#38bdf8",        // brighter atmosphere blue — promoted to token (panel R2 #12)
  solar: "#fb923c",      // defined solar accent — warm orange, distinct from gold
  risk: "#ef4444",
  green: "#10b981",
  violet: "#818cf8",
};

/* ── SOURCE REGISTRY ── */
export const SRC = {
  iea2025: { name: "IEA — Energy and AI (abr 2025)", url: "https://www.iea.org/reports/energy-and-ai", date: "2026-06" },
  delloro: { name: "Dell'Oro Group — Data Center Capex FY2025 (17 mar 2026)", url: "https://www.delloro.com/news/", date: "2026-06" },
  mckinsey: { name: "McKinsey — The cost of compute (abr 2025)", url: "https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-cost-of-compute-a-7-trillion-dollar-race-to-scale-data-centers", date: "2026-06" },
  dcfrontier: { name: "Data Center Frontier / Tom's Hardware (ene 2026)", url: "https://www.datacenterfrontier.com/", date: "2026-06" },
  constellation: { name: "Constellation Energy — press releases", url: "https://www.constellationenergy.com/newsroom.html", date: "2026-06" },
  talen: { name: "Talen Energy (2024)", url: "https://www.talenenergy.com/", date: "2026-06" },
  google: { name: "Google / Kairos Power (oct 2024)", url: "https://blog.google/outreach-initiatives/sustainability/google-kairos-power-nuclear-energy-agreement/", date: "2026-06" },
  terrapower: { name: "TerraPower — Natrium (jun 2024)", url: "https://www.terrapower.com/", date: "2026-06" },
  ember: { name: "Ember — China Energy Transition Review 2025 / NEA", url: "https://ember-climate.org/", date: "2026-06" },
  cef: { name: "Climate Energy Finance / BNEF (2024)", url: "https://www.climateenergyfinance.org/", date: "2026-06" },
  ice: { name: "Grupo ICE — EEFF set-2025 (pub. 18 nov 2025) / DOCSE", url: "https://www.grupoice.com/", date: "2026-06" },
  peg: { name: "ICE — Plan de Expansión de la Generación 2024-2040 (may 2025)", url: "https://www.grupoice.com/wps/portal/ICE/electricidad", date: "2026-06" },
  aresep: { name: "ARESEP — Boletín 74-2025 (12 dic 2025)", url: "https://aresep.go.cr/", date: "2026-06" },
  moodys: { name: "Moody's Ratings — ICE Ba1 estable (29 set 2025)", url: "https://www.moodys.com/", date: "2026-06" },
  fitch: { name: "Fitch Ratings — ICE BB Positiva (27 feb 2025)", url: "https://www.fitchratings.com/", date: "2026-06" },
  cicr: { name: "CICR — Cámara de Industrias de Costa Rica (nov 2025)", url: "https://cicr.com/", date: "2026-06" },
  asamblea: { name: "Asamblea Legislativa — Servicios Técnicos, Exp. 23.414", url: "http://www.asamblea.go.cr/", date: "2026-06" },
  nacion: { name: "La Nación (27 may 2026)", url: "https://www.nacion.com/", date: "2026-06" },
  semanario: { name: "Semanario Universidad (27 may 2026)", url: "https://semanariouniversidad.com/", date: "2026-06" },
  delfino: { name: "Delfino.cr (may 2026)", url: "https://delfino.cr/", date: "2026-06" },
  extra: { name: "Diario Extra (27 may 2026)", url: "https://www.diarioextra.com/", date: "2026-06" },
  crhoy: { name: "CRHoy (25 may 2026)", url: "https://www.crhoy.com/", date: "2026-06" },
  elmundo: { name: "El Mundo CR (23-25 may 2026)", url: "https://elmundo.cr/", date: "2026-06" },
  observador: { name: "El Observador CR (27 may 2026)", url: "https://observador.cr/", date: "2026-06" },
  seg: { name: "SEG Ingeniería — comparativo tarifario regional (2025)", url: "https://segingenieria.com/", date: "2026-06" },
  eia: { name: "US EIA — Form 861, Table 4 (2024)", url: "https://www.eia.gov/electricity/", date: "2026-06" },
  wri: { name: "WRI — Global Power Plant Database (CC-BY-4.0)", url: "https://datasets.wri.org/dataset/globalpowerplantdatabase", date: "2026-06" },
  osm: { name: "OpenStreetMap contributors (ODbL) / Global Energy Monitor", url: "https://www.openstreetmap.org/copyright", date: "2026-06" },
  cc_by_4: { name: "Creative Commons Attribution 4.0 International", url: "https://creativecommons.org/licenses/by/4.0/", date: "2026-06" },
  entsoe: { name: "ENTSO-E — Statistical Factsheet (interconexiones)", url: "https://www.entsoe.eu/publications/statistics-and-data/", date: "2026-06" },
  iea_wgo: { name: "IEA — World Energy Outlook (Annex A, grid)", url: "https://www.iea.org/reports/world-energy-outlook-2024", date: "2026-06" },
  epr: { name: "EOR/CRIE — Ente Operador Regional del SIEPAC", url: "https://www.enteoperador.org/siepac/", date: "2026-06" },
  three_globe: { name: "vasturiano/three-globe — basemap (NASA night lights)", url: "https://github.com/vasturiano/three-globe", date: "2026-06" },
  enerdata: { name: "Enerdata (2024)", url: "https://www.enerdata.net/", date: "2026-06" },
  intratec: { name: "Intratec — Chile (ago 2025)", url: "https://www.intratec.us/", date: "2026-06" },
  bnef: { name: "BloombergNEF — Climatescope 2025", url: "https://www.global-climatescope.org/", date: "2026-06" },
  miem: { name: "MIEM Uruguay (2024)", url: "https://www.gub.uy/ministerio-industria-energia-mineria/", date: "2026-06" },
  cne: { name: "Comisión Nacional de Energía de Chile — Ley 20.936", url: "https://www.cne.cl/", date: "2026-06" },
  cepal2002: { name: "CEPAL — Evaluación de diez años de reforma eléctrica en el Istmo (pub. 25719, 2002)", url: "https://www.cepal.org/", date: "2026-06" },
  owid: { name: "Our World in Data / Swanson's Law (serie histórica solar)", url: "https://ourworldindata.org/grapher/solar-pv-prices", date: "2026-06" },
  colibrii: { name: "Colibrii Labs — metodología propia (ECAI-CR / escenarios)", url: "https://colibriilabs.ai", date: "2026-06" },
  presidencia: { name: "Presidencia de la República / Decreto 45807-MP (27 may 2026)", url: "https://www.presidencia.go.cr/", date: "2026-06" },
};

/* Shared fuel/technology colors — single source of truth so PowerGlobe (3D globe),
   CRGridMap (CR map) and EnergiaCharts can't drift apart on a future palette change. */
export const FUEL_COLORS = {
  hydro: "#0d9488",        // teal-green — moved out of cyan family entirely so Hydro fuel chip
                           // is unambiguously different from HVDC arc glow #22d3ee (R14 panel finding)
  solar: "#fb923c",
  wind: "#7dd3fc",         // light-sky — distinct from atmosphere #38bdf8 + Hydro #22d3ee
  geothermal: "#F2B135", nuclear: "#818cf8",
  gas: "#d97706", oil: "#fb7185", coal: "#9ca3af",
  biomass: "#84cc16", waste: "#a3e635",
  storage: "#60a5fa",      // blue-400 — distinct from atmosphere sky
  cogeneration: "#d97706", // gas family
  csp: "#dc2626", thermal: "#ef4444", load: "#ffffff",
};

/* ═══════════════ ACTO 1 — COLD OPEN ═══════════════ */
export const HERO = {
  eyebrow: { es: "ENERGÍA · INSUMO TÉCNICO INDEPENDIENTE", en: "ENERGY · INDEPENDENT TECHNICAL INPUT" },
  title: { es: "La electricidad decide dónde se construye la inteligencia artificial", en: "Electricity decides where artificial intelligence gets built" },
  stat: { v: 945, from: 415, unit: "TWh", s: "iea2025", conf: "verified",
    label: { es: "Demanda eléctrica de centros de datos: 415 TWh (2024) → ~945 TWh (2030), según la AIE — cerca del 3% de toda la electricidad del mundo.", en: "Data-centre electricity demand: 415 TWh (2024) → ~945 TWh (2030), per the IEA — about 3% of the world's entire electricity." } },
  bluf: [
    { es: "La electricidad es hoy el insumo que define la competitividad en IA: la demanda de los centros de datos se duplicará con creces hacia 2030 y los hiperescaladores invertirán hasta $725.000 millones solo en 2026.", en: "Electricity now defines AI competitiveness: data-centre demand will more than double by 2030 and hyperscalers will invest up to $725 billion in 2026 alone." },
    { es: "Costa Rica entra a esa carrera con una matriz 98,6% renovable y un ICE más sólido (Moody's Ba1, deuda −25%), pero con poco margen de capacidad y tarifas industriales de hasta ~1,8 veces el promedio de EE. UU.", en: "Costa Rica enters that race with a 98.6% renewable grid and a stronger ICE (Moody's Ba1, debt −25%), but with little spare capacity and industrial tariffs up to ~1.8× the US average." },
    { es: "El Expediente 23.414 se decide por aritmética: aprobado en primer debate 27-24 y desconvocado la tarde siguiente, le faltan 8 votos para los 38 que exige la Constitución. Este análisis presenta los datos y 12 enmiendas técnicas, sin posición partidista.", en: "Bill 23.414 comes down to arithmetic: passed in first debate 27-24 and withdrawn the following afternoon, it is 8 votes short of the 38 the Constitution requires. This analysis presents the data and 12 technical amendments, with no partisan position." },
  ],
  disclaimer: { es: "Colibrii Labs es un observatorio independiente. No asesora al gobierno ni a partido alguno: los datos hablan.", en: "Colibrii Labs is an independent observatory. It advises neither government nor any party: the data speaks." },
};

/* ═══════════════ ACTO 2 — LA APUESTA GLOBAL ═══════════════ */
export const DC_DEMAND = {
  s: "iea2025", conf: "verified", unit: "TWh",
  series: [
    { year: 2020, twh: 270, pct: { es: "~1% del total mundial", en: "~1% of global total" } },
    { year: 2024, twh: 415, pct: { es: "~1,5%", en: "~1.5%" } },
    { year: 2025, twh: 485, est: true, pct: { es: "~1,7%", en: "~1.7%" } },
    { year: 2030, twh: 945, est: true, pct: { es: "~3%", en: "~3%" } },
    { year: 2035, twh: 1200, est: true, pct: { es: "~3,5%", en: "~3.5%" } },
  ],
  note: { es: "Caso base AIE. EE. UU. y China concentran ~80% del crecimiento; hasta 20% de los proyectos de centros de datos están en riesgo de atraso por cuellos de botella de red.", en: "IEA Base Case. The US and China account for ~80% of growth; up to 20% of data-centre projects are at risk of delay due to grid bottlenecks." },
};

export const CAPEX = [
  { v: "630–725", unit: { es: "miles de millones US$, capex 2026 de Amazon+Google+Meta+Microsoft (~75% ligado a IA)", en: "US$ billions, 2026 capex of Amazon+Google+Meta+Microsoft (~75% AI-linked)" }, s: "dcfrontier", conf: "reported" },
  { v: "+57%", unit: { es: "capex mundial de centros de datos 2025 vs 2024; los Big Four crecieron +76%", en: "worldwide data-centre capex 2025 vs 2024; Big Four grew +76%" }, s: "delloro", conf: "verified" },
  { v: "6,7", unit: { es: "billones (10¹²) US$ de construcción global de centros de datos al 2030 ($5,2T específico de IA)", en: "trillion US$ of global data-centre buildout by 2030 ($5.2T AI-specific)" }, s: "mckinsey", conf: "verified" },
];

export const NUCLEAR_DEALS = {
  conf: "verified",
  rows: [
    { buyer: "Microsoft", plant: { es: "Three Mile Island U1 → Crane Clean Energy Center (Constellation)", en: "Three Mile Island U1 → Crane Clean Energy Center (Constellation)" }, mw: 835, deal: { es: "PPA 20 años · préstamo DOE $1.000M (mar 2025) · reinicio 2027-28", en: "20-yr PPA · $1B DOE loan (Mar 2025) · restart 2027-28" }, s: "constellation" },
    { buyer: "Amazon (AWS)", plant: { es: "Campus Susquehanna (Talen Energy)", en: "Susquehanna campus (Talen Energy)" }, mw: 960, deal: { es: "hasta 960 MW · adquisición $650M (2024)", en: "up to 960 MW · $650M acquisition (2024)" }, s: "talen" },
    { buyer: "Meta", plant: { es: "Planta Clinton (Constellation, Illinois)", en: "Clinton plant (Constellation, Illinois)" }, mw: 1100, deal: { es: "PPA 20 años · inicia jun 2027", en: "20-yr PPA · begins Jun 2027" }, s: "constellation" },
    { buyer: "Google", plant: { es: "SMRs Kairos Power (multi-sitio)", en: "Kairos Power SMRs (multi-site)" }, mw: 500, deal: { es: "PPA multi-reactor (oct 2024)", en: "multi-SMR PPA (Oct 2024)" }, s: "google" },
    { buyer: "Bill Gates / TerraPower", plant: { es: "Natrium — Kemmerer, Wyoming", en: "Natrium — Kemmerer, Wyoming" }, mw: 345, deal: { es: "1er reactor comercial no refrigerado por agua en EE. UU. en ~40 años · inicio de obra 10 jun 2024", en: "1st non-water-cooled commercial reactor in the US in ~40 yrs · groundbreaking Jun 10, 2024" }, s: "terrapower" },
  ],
  insight: { es: "El patrón: los compradores de IA pagan PPAs largos y caros por energía limpia 24/7. Exactamente el cliente que la matriz renovable costarricense podría atraer — si tuviera megavatios de sobra.", en: "The pattern: AI buyers pay premium long-tenor PPAs for 24/7 clean power. Exactly the customer Costa Rica's renewable matrix could attract — if it had spare megawatts." },
};

export const CHINA = {
  s: "ember", conf: "verified",
  stats: [
    { v: 429, unit: "GW", label: { es: "capacidad neta nueva instalada en 2024 (+21% interanual)", en: "net new capacity installed in 2024 (+21% YoY)" } },
    { v: 887, unit: "GW", label: { es: "solar instalada (+45,2%); eólica 521 GW; juntas superaron la meta 2030 con 6 años de antelación", en: "installed solar (+45.2%); wind 521 GW; combined they beat the 2030 target six years early" } },
    { v: 625, unit: { es: "miles de millones US$", en: "US$ billion" }, label: { es: "inversión en energía limpia 2024 — 31% del total mundial ($2.033MM)", en: "clean-energy investment 2024 — 31% of the global total ($2,033bn)" }, s: "cef", conf: "reported" },
  ],
};

/* ═══════════════ ACTO 3 — LA REGIÓN ═══════════════ */
/* Metodologías mixtas — cada fila declara su base. Ver D-009. */
export const TARIFFS = {
  unit: "US$/MWh", conf: "reported",
  caveat: { es: "Comparación con metodologías mixtas: algunas filas son tarifas de clase específica, otras promedios de sistema. Cada barra declara su base y fuente.", en: "Mixed-methodology comparison: some rows are specific tariff classes, others system averages. Each bar states its basis and source." },
  rows: [
    { code: "PY", country: { es: "Paraguay", en: "Paraguay" }, lo: 36, hi: 39, basis: { es: "industrial MT", en: "industrial MT" }, s: "seg" },
    { code: "US", country: { es: "EE. UU. (promedio)", en: "United States (avg.)" }, lo: 81.3, hi: 81.3, basis: { es: "industrial promedio", en: "industrial average" }, s: "eia", benchmark: true },
    { code: "CL", country: { es: "Chile", en: "Chile" }, lo: 94, hi: 167, basis: { es: "rango: Intratec ago-2025 → SEG MT mar-2025", en: "range: Intratec Aug-2025 → SEG MT Mar-2025" }, s: "intratec" },
    { code: "AR", country: { es: "Argentina", en: "Argentina" }, lo: 96, hi: 110, basis: { es: "industrial MT", en: "industrial MT" }, s: "seg" },
    { code: "CR", country: { es: "Costa Rica", en: "Costa Rica" }, lo: 100, hi: 150, basis: { es: "banda: T-MTb electrointensiva (ARESEP) → sector industrial amplio (CICR)", en: "band: T-MTb electro-intensive (ARESEP) → broader industrial sector (CICR)" }, s: "cicr", highlight: true },
    { code: "BR", country: { es: "Brasil", en: "Brazil" }, lo: 108, hi: 115, basis: { es: "industrial MT", en: "industrial MT" }, s: "seg" },
    { code: "UY", country: { es: "Uruguay", en: "Uruguay" }, lo: 134, hi: 141, basis: { es: "industrial MT", en: "industrial MT" }, s: "seg" },
    { code: "PA", country: { es: "Panamá", en: "Panama" }, lo: 151, hi: 151, basis: { es: "industrial", en: "industrial" }, s: "enerdata" },
  ],
  crNote: { es: "El promedio de sistema de CR (todas las clases, 2024) ronda US$205/MWh según BloombergNEF — no comparable con las tarifas industriales de arriba, pero ilustra el costo país.", en: "CR's all-classes system average (2024) is ~US$205/MWh per BloombergNEF — not comparable with the industrial tariffs above, but it illustrates the country-level cost." },
};

export const RENEW_SHARE = {
  unit: "%", conf: "reported", s: "miem",
  rows: [
    { code: "CR", country: { es: "Costa Rica", en: "Costa Rica" }, pct: 98.6, year: 2025, s: "ice", conf: "verified", highlight: true },
    { code: "UY", country: { es: "Uruguay", en: "Uruguay" }, pct: 99, year: 2024, s: "miem" },
    { code: "PY", country: { es: "Paraguay", en: "Paraguay" }, pct: 99, year: 2024, s: "seg" },
    { code: "BR", country: { es: "Brasil", en: "Brazil" }, pct: 89, year: 2024, s: "ember" },
    { code: "CO", country: { es: "Colombia", en: "Colombia" }, pct: 70, year: 2024, s: "ember" },
    { code: "PA", country: { es: "Panamá", en: "Panama" }, pct: 70, year: 2024, s: "ember" },
    { code: "CL", country: { es: "Chile", en: "Chile" }, pct: 62, year: 2024, s: "ember" },
  ],
  insight: { es: "Costa Rica está entre los más limpios en términos absolutos — pero el MWh marginal es cada vez más térmico o importado.", en: "Costa Rica is among the cleanest in absolute terms — but the marginal MWh is increasingly thermal or imported." },
};

/* ═══════════════ ACTO 4 — COSTA RICA HOY ═══════════════ */
export const CR_MIX = {
  s: "peg", conf: "verified",
  asOf: { es: "Capacidad instalada, dic 2023 (~3.499 MW)", en: "Installed capacity, Dec 2023 (~3,499 MW)" },
  rows: [
    { id: "hydro",   name: { es: "Hidroeléctrica",     en: "Hydro" },             pct: 68,  color: FUEL_COLORS.hydro },
    { id: "wind",    name: { es: "Eólica",             en: "Wind" },              pct: 12,  color: FUEL_COLORS.wind },
    { id: "thermal", name: { es: "Térmica (respaldo)", en: "Thermal (backup)" },  pct: 11,  color: FUEL_COLORS.thermal },
    { id: "geo",     name: { es: "Geotérmica",         en: "Geothermal" },        pct: 7,   color: FUEL_COLORS.geothermal },
    { id: "bio",     name: { es: "Biomasa",            en: "Biomass" },           pct: 2,   color: FUEL_COLORS.biomass },
    { id: "solar",   name: { es: "Solar",              en: "Solar" },             pct: 0.2, color: FUEL_COLORS.solar },
  ],
};

export const CR_RENEW_POINTS = {
  s: "ice", conf: "verified", unit: "%",
  rows: [
    { year: 2024, pct: 89.4, note: { es: "El Niño obligó a más generación térmica", en: "El Niño forced more thermal generation" } },
    { year: 2025, pct: 98.6, note: { es: "verificado por LSQA; 97,3% de la demanda interna atendida con renovables", en: "LSQA-verified; 97.3% of domestic demand met with renewables" } },
  ],
  ownership: { s: "peg", year: 2023, rows: [
    { name: { es: "ICE", en: "ICE" }, pct: 70 },
    { name: { es: "Otras distribuidoras", en: "Other distributors" }, pct: 12 },
    { name: { es: "Privados Ley 7200 Cap. I", en: "Private, Law 7200 Ch. I" }, pct: 10 },
    { name: { es: "BOT (Cap. II)", en: "BOT (Ch. II)" }, pct: 8 },
  ] },
};

export const ICE_FIN = {
  s: "ice", conf: "verified",
  stats: [
    { id: "debt", v: -25, unit: "%", label: { es: "deuda financiera desde dic 2022 (−₡655.757M a set 2025)", en: "financial debt since Dec 2022 (−₡655,757M to Sep 2025)" } },
    { id: "lev", v: 27.8, cap: 45, unit: "%", label: { es: "apalancamiento Ley 8660 (tope legal: 45%) — 17,2 pts de margen", en: "Law 8660 leverage (legal cap: 45%) — 17.2 pts of headroom" } },
    { id: "exc", v: 133057, unit: { es: "₡ millones", en: "₡ million" }, label: { es: "excedente neto a set 2025 (9M); margen EBITDA 41,1%, neto 12,2%", en: "net surplus to Sep 2025 (9M); EBITDA margin 41.1%, net 12.2%" } },
    { id: "usd", v: 46.2, from: 68.1, unit: "%", label: { es: "deuda en dólares: 46,2% (2025) vs 68,1% (2020) — menor riesgo cambiario", en: "USD-denominated debt: 46.2% (2025) vs 68.1% (2020) — lower FX risk" } },
    { id: "inv", v: 3.5, unit: { es: "miles de millones US$", en: "US$ billion" }, label: { es: "plan de inversión 2025-2029 en electricidad y telecom (>$3.500M)", en: "2025-2029 investment plan in electricity and telecom (>$3.5bn)" } },
  ],
  ratings: [
    { agency: "Moody's", rating: "Ba1", outlook: { es: "Estable", en: "Stable" }, date: "29 set 2025", note: { es: "tercer upgrade consecutivo; a un escalón del grado de inversión; por encima del soberano (Ba2)", en: "third consecutive upgrade; one notch from investment grade; above the sovereign (Ba2)" }, s: "moodys" },
    { agency: "Fitch", rating: "BB", outlook: { es: "Positiva", en: "Positive" }, date: "27 feb 2025", note: { es: "internacional BB / nacional AA+(cri)", en: "international BB / national AA+(cri)" }, s: "fitch" },
  ],
  insight: { es: "No es la foto de una institución insolvente — pero tampoco alcanza, por sí sola, para financiar los ~2.495 MW adicionales que el país necesitará al 2040.", en: "Not the picture of an insolvent institution — but not enough, by itself, to fund the ~2,495 additional MW the country will need by 2040." },
};

export const ARESEP_2026 = {
  s: "aresep", conf: "verified",
  range: { lo: -16.44, hi: -4.93 },
  rows: [
    { name: "ICE", v: -14.92 },
    { name: "CNFL", v: -14.55 },
  ],
  cvg: -7.77,
  headline: { es: "Rebaja generalizada 2026: entre −4,93% y −16,44% según distribuidora. La tarifa de alta tensión, en su nivel más bajo en 15 años — un estímulo explícito a las industrias electrointensivas.", en: "Across-the-board 2026 cut: between −4.93% and −16.44% by utility. The high-tension tariff is at its lowest in 15 years — an explicit stimulus for electro-intensive industry." },
};

export const PEG_TARGETS = {
  s: "peg", conf: "reported",
  rows: [
    { v: 5995, unit: "MW", label: { es: "capacidad meta al 2040 (PEG 2024-2040) — +71% sobre ~3.500 MW actuales", en: "2040 target capacity (PEG 2024-2040) — +71% over today's ~3,500 MW" } },
    { v: 600, unit: "MW", label: { es: "renovables nuevas proyectadas a 2030 (Borinquen I, solar San Antonio, repotenciación Tejona)", en: "new renewables projected by 2030 (Borinquen I, San Antonio solar, Tejona repowering)" } },
    { v: 4000, unit: { es: "millones US$", en: "US$ million" }, label: { es: "inversión requerida antes de 2030 según la CICR, citando datos del ICE", en: "investment required before 2030 per CICR, citing ICE data" }, s: "cicr" },
  ],
};

/* ═══════════════ ACTO 5 — EXPEDIENTE 23.414 ═══════════════ */
export const TIMELINE = {
  s: "asamblea", conf: "verified",
  rows: [
    { date: "21 oct 2022", type: "milestone", title: { es: "Presentación", en: "Introduced" }, desc: { es: "El Ejecutivo (administración Chaves Robles) presenta el proyecto de Ley de Armonización del Sistema Eléctrico Nacional.", en: "The Executive (Chaves Robles administration) introduces the National Electricity System Harmonization bill." } },
    { date: "31 ene 2024", type: "warning", title: { es: "Servicios Técnicos: 38 votos", en: "Technical Services: 38 votes" }, desc: { es: "Segundo criterio: crear ECOSEN como institución autónoma exige mayoría calificada (Art. 189.3 de la Constitución).", en: "Second opinion: creating ECOSEN as an autonomous institution requires a two-thirds majority (Art. 189.3 of the Constitution)." } },
    { date: "oct 2024 · oct 2025", type: "milestone", title: { es: "Textos actualizados", en: "Updated texts" }, desc: { es: "Sucesivos textos sustitutivos negocian solidaridad, transitorios y gobernanza de ECOSEN.", en: "Successive substitute texts negotiate solidarity, transition clauses and ECOSEN governance." } },
    { date: "25 may 2026", type: "warning", title: { es: "PLN anuncia voto en contra", en: "PLN announces No vote" }, desc: { es: "La fracción del PLN (17) propone una 'Ley Marco Reguladora del Sector Energético' como alternativa.", en: "The PLN caucus (17) proposes an alternative 'Energy Sector Framework Law'." } },
    { date: "26 may 2026 · 21:43", type: "vote", title: { es: "Primer debate: 27-24", en: "First debate: 27-24" }, desc: { es: "Aprobado con los 27 votos presentes de Pueblo Soberano; 24 en contra (PLN 16, FA 7, Dobles 1); 6 ausencias. La oposición anuncia consulta a la Sala IV.", en: "Approved with Pueblo Soberano's 27 present votes; 24 against (PLN 16, FA 7, Dobles 1); 6 absences. The opposition announces a Constitutional Court referral." } },
    { date: "27 may 2026 · 14:35", type: "decree", title: { es: "Desconvocatoria — Decreto 45807-MP", en: "Withdrawal — Decree 45807-MP" }, desc: { es: "La presidenta Fernández retira el expediente de sesiones extraordinarias (oficio MP-DM-OF-0024-2026): el oficialismo reconoce que no tiene los 38 votos.", en: "President Fernández withdraws the bill from extraordinary sessions (memo MP-DM-OF-0024-2026): the government concedes it lacks 38 votes." }, s: "presidencia" },
    { date: "1 ago 2026", type: "next", title: { es: "Sesiones ordinarias", en: "Ordinary sessions" }, desc: { es: "El Plenario recupera el control de la agenda. Ventana de renegociación: junio-octubre 2026.", en: "The floor regains agenda control. Renegotiation window: June–October 2026." } },
  ],
};

export const VOTE_MATH = {
  s: "asamblea", conf: "verified",
  totalSeats: 57, needed: 38,
  firstDebate: { favor: 27, against: 24, absent: 6, date: "26 may 2026" },
  blocs: [
    { party: "PPSO", name: { es: "Pueblo Soberano (oficialismo)", en: "Pueblo Soberano (government)" }, seats: 31, effective: 30, stance: "pro", note: { es: "30 votos efectivos: Kristel Ward en licencia de maternidad", en: "30 effective votes: Kristel Ward on maternity leave" } },
    { party: "PLN", name: { es: "Liberación Nacional", en: "National Liberation" }, seats: 17, stance: "con", note: { es: "en contra en bloque; propone ley alternativa", en: "against as a bloc; proposes alternative law" } },
    { party: "FA", name: { es: "Frente Amplio", en: "Frente Amplio" }, seats: 7, stance: "con", note: { es: "en contra; impulsa consulta a Sala IV", en: "against; pushing Constitutional Court referral" } },
    { party: "PUSC", name: { es: "Unidad Social Cristiana", en: "PUSC" }, seats: 1, stance: "lean-pro", note: { es: "Abril Gordienko: observaciones favorables, ausente en la votación", en: "Abril Gordienko: favourable observations, absent at the vote" } },
    { party: "CAC", name: { es: "Coalición Agenda Ciudadana", en: "Citizen Agenda Coalition" }, seats: 1, stance: "con", note: { es: "Claudia Dobles: en contra", en: "Claudia Dobles: against" } },
  ],
  arithmetic: { es: "38 requeridos − 30 efectivos del oficialismo = 8 votos opositores que hoy no existen. Con FA (7) y Dobles confirmados en contra, la única ruta aritmética pasa por el PLN — y el PLN exige renegociar el texto.", en: "38 required − 30 effective government votes = 8 opposition votes that don't exist today. With FA (7) and Dobles confirmed against, the only arithmetic route runs through the PLN — and the PLN demands a renegotiated text." },
};

export const BILL_CORE = {
  s: "asamblea", conf: "verified",
  rows: [
    { t: { es: "Crea ECOSEN", en: "Creates ECOSEN" }, d: { es: "Ente Coordinador del Sistema Eléctrico Nacional, institución autónoma: opera el SEN, despacho económico, administra el mercado mayorista (MEN) y representa al país ante el MER. Absorbe la DOCSE (ex-CENCE) del ICE.", en: "National System Coordinator, an autonomous institution: operates the grid, economic dispatch, runs the wholesale market (MEN) and represents CR before the regional market. Absorbs ICE's DOCSE (ex-CENCE)." } },
    { t: { es: "Abre la generación", en: "Opens generation" }, d: { es: "Elimina el modelo de comprador único y los topes de la Ley 7200 (15%+15%, plantas ≤20/50 MW). Subastas: distribuidoras deben contratar ≥90% de su demanda. Grandes consumidores compran directo.", en: "Ends the single-buyer model and Law 7200 caps (15%+15%, plants ≤20/50 MW). Auctions: distributors must contract ≥90% of demand. Large consumers buy directly." } },
    { t: { es: "Junta cuestionada", en: "Contested board" }, d: { es: "Junta de ECOSEN con representantes de los propios agentes del mercado (ICE, MINAE, cooperativas, CNFL, UCCAEP) — lo contrario del operador independiente chileno (Ley 20.936).", en: "ECOSEN's board seats the market's own agents (ICE, MINAE, co-ops, CNFL, UCCAEP) — the opposite of Chile's independent operator (Law 20.936)." } },
    { t: { es: "Transitorios sensibles", en: "Sensitive transition clauses" }, d: { es: "T-VIII: traslado de activos y personal de la DOCSE sin tasación previa reglada. T-XIII: 10 años de despacho prioritario para plantas del ICE y cooperativas. Facultad de interrumpir contratos firmes de exportación.", en: "T-VIII: DOCSE assets/staff transfer without a regulated prior valuation. T-XIII: 10 years of priority dispatch for ICE/co-op plants. Power to interrupt firm export contracts." } },
  ],
};

/* Verbatim quotes — name, role, outlet, date. Never blurred with analysis. */
export const STAKEHOLDERS = {
  conf: "verified",
  rows: [
    { name: "Laura Fernández Delgado", role: { es: "Presidenta de la República", en: "President of the Republic" }, stance: "pro", quote: { es: "“Hay que desconvocarlo para que Liberación Nacional y el Frente Amplio recapaciten de lo que le están haciendo al país con este tema.”", en: "“It must be withdrawn so that PLN and Frente Amplio reconsider what they are doing to the country on this issue.”" }, outlet: "Semanario Universidad", date: "27 may 2026", s: "semanario" },
    { name: "Álvaro Ramírez", role: { es: "Jefe de fracción, PLN", en: "PLN caucus leader" }, stance: "con", quote: { es: "“Esa es una decisión sensata, porque reconoce primero que el proyecto es inviable.”", en: "“That is a sensible decision, because it first acknowledges the bill is unviable.”" }, outlet: "La Nación", date: "27 may 2026", s: "nacion" },
    { name: "José María Villalta", role: { es: "Jefe de fracción, Frente Amplio", en: "Frente Amplio caucus leader" }, stance: "con", quote: { es: "La reforma “desmantela el modelo de generación y transmisión eléctrica del ICE, crea una nueva burocracia y podría trasladar costos a las tarifas”.", en: "The reform “dismantles ICE's generation and transmission model, creates a new bureaucracy and could push costs into tariffs.”" }, outlet: "Delfino.cr", date: "22 may 2026", s: "delfino" },
    { name: "Claudia Dobles", role: { es: "Diputada, Coalición Agenda Ciudadana", en: "Deputy, Citizen Agenda Coalition" }, stance: "con", quote: { es: "“Este proyecto no garantiza el modelo solidario y universal que actualmente tenemos (…) deja al ICE sin herramientas pero con todas las responsabilidades.”", en: "“This bill does not guarantee the solidary, universal model we have today (…) it leaves ICE without tools but with all the responsibilities.”" }, outlet: "CRHoy", date: "25 may 2026", s: "crhoy" },
    { name: "Marco Acuña", role: { es: "Presidente Ejecutivo, ICE", en: "Executive President, ICE" }, stance: "matiz", quote: { es: "“No vamos a poner en riesgo financiero a una institución.” En foros técnicos ha apoyado el despacho vinculante externo, condicionado a remunerar reserva, respaldo y servicios auxiliares.", en: "“We will not put an institution at financial risk.” In technical forums he has backed external binding dispatch, conditional on remunerating reserve, backup and ancillary services." }, outlet: "Diario Extra / Semanario U", date: "27 may 2026", s: "extra" },
    { name: "Carlos Montenegro", role: { es: "Director Ejecutivo, Cámara de Industrias (CICR)", en: "Executive Director, Chamber of Industries (CICR)" }, stance: "pro", quote: { es: "“Llevamos más de 20 años intentando mejorar el sistema eléctrico nacional (…) una oportunidad histórica para modernizar el sistema y dar un paso hacia tarifas más bajas.”", en: "“We have spent over 20 years trying to improve the national electricity system (…) a historic opportunity to modernize and move toward lower tariffs.”" }, outlet: "La Nación / El Mundo", date: "25 may 2026", s: "elmundo" },
    { name: "Erick Rojas", role: { es: "Presidente, CEDET (distribuidoras y cooperativas)", en: "President, CEDET (distributors & co-ops)" }, stance: "pro", quote: { es: "“Logramos un texto que preserva la solidaridad del modelo eléctrico costarricense (…) y protege el papel de las distribuidoras.” Pide reforzar la desaplicación de la Ley 9986.", en: "“We achieved a text that preserves the solidarity of the Costa Rican model (…) and protects the distributors' role.” Asks to strengthen the carve-out from Law 9986." }, outlet: "El Mundo CR", date: "23 may 2026", s: "elmundo" },
    { name: "María Fernanda Esquivel", role: { es: "Presidenta, ACOPE (generadores privados)", en: "President, ACOPE (private generators)" }, stance: "pro", quote: { es: "“Es innegable la necesidad de incorporar más megavatios a nuestra matriz energética.”", en: "“The need to add more megawatts to our energy matrix is undeniable.”" }, outlet: "El Observador CR", date: "27 may 2026", s: "observador" },
    { name: { es: "FIT-ICE / ASDEICE (sindicatos del ICE)", en: "FIT-ICE / ASDEICE (ICE unions)" }, role: { es: "Sindicatos", en: "Unions" }, stance: "con", synth: true, quote: { es: "Sostienen que el proyecto “no armoniza sino que beneficia a grandes consumidores y generadores privados” y que el Transitorio VIII “vacía institucionalmente” al ICE.", en: "They hold the bill “does not harmonize but benefits large consumers and private generators,” and that Transitory VIII “institutionally empties” ICE." }, outlet: { es: "Conferencias FIT-ICE", en: "FIT-ICE press events" }, date: "2025 (síntesis)", s: "semanario" },
    { name: { es: "FECON, Ríos Vivos, Bloque Verde", en: "FECON, Ríos Vivos, Bloque Verde" }, role: { es: "Organizaciones ecologistas", en: "Environmental organizations" }, stance: "con", synth: true, quote: { es: "Advierten una nueva ola de proyectos hidroeléctricos sobre territorios indígenas y ríos sensibles si se aprueba la apertura.", en: "They warn of a new wave of hydro projects on indigenous territories and sensitive rivers if the opening passes." }, outlet: "Canal 15 UCR", date: "22 may 2026", s: "semanario" },
  ],
  note: { es: "Citas textuales con medio y fecha. Las tarjetas marcadas “síntesis” resumen declaraciones públicas de las organizaciones, no son citas literales.", en: "Verbatim quotes with outlet and date. Cards marked “summary” condense the organizations' public statements; they are not literal quotes." },
};

/* ═══════════════ ACTO 6 — LECCIONES COMPARADAS ═══════════════ */
export const COMPARATIVE = {
  conf: "verified", s: "cne",
  rows: [
    { code: "CL", country: { es: "Chile", en: "Chile" }, year: "1982 · 2016", model: { es: "Desagregación total + privatización (1982); Ley 20.936 (2016) crea el Coordinador Eléctrico independiente — consejeros por concurso público, sin vínculos con los agentes.", en: "Full unbundling + privatization (1982); Law 20.936 (2016) creates the independent Coordinator — councillors via public competition, no ties to market agents." }, lesson: { es: "El poder de mercado y los precios de escasez deben diseñarse desde el día uno. La junta de ECOSEN va en dirección contraria al estándar chileno.", en: "Market power and scarcity pricing must be designed in from day one. ECOSEN's board runs opposite to the Chilean standard." }, tone: "warn" },
    { code: "UY", country: { es: "Uruguay", en: "Uruguay" }, year: "2005-2017", model: { es: "UTE estatal como columna vertebral + renovables privadas vía subastas y PPAs largos (~US$7.800M invertidos 2010-2016).", en: "State-owned UTE as backbone + private renewables via auctions and long PPAs (~US$7.8bn invested 2010-2016)." }, lesson: { es: "La plantilla más relevante para CR: operador estatal fuerte, generación privada por subasta, 99% renovable y exportador neto — sin privatizar la distribución.", en: "The most relevant template for CR: strong state operator, auctioned private generation, 99% renewable and a net exporter — without privatizing distribution." }, tone: "good" },
    { code: "CO", country: { es: "Colombia", en: "Colombia" }, year: "1994", model: { es: "Leyes 142/143: transmisión estatal (ISA), generación competitiva, operador XM independiente y respetado.", en: "Laws 142/143: state transmission (ISA), competitive generation, independent and respected XM operator." }, lesson: { es: "Un operador de sistema independiente funciona — y sobrevivió sequías de El Niño con el modelo mixto.", en: "An independent system operator works — and survived El Niño droughts under the mixed model." }, tone: "good" },
    { code: "BR", country: { es: "Brasil", en: "Brazil" }, year: "2004", model: { es: "Contratación regulada + libre; subastas inversas para capacidad nueva.", en: "Regulated + free contracting; reverse auctions for new capacity." }, lesson: { es: "Las subastas inversas entregan precios bajos: solar y eólica bajo US$30/MWh en 2017-2024.", en: "Reverse auctions deliver low prices: solar and wind below US$30/MWh in 2017-2024." }, tone: "good" },
    { code: "NP", country: { es: "Nord Pool (Noruega/Suecia)", en: "Nord Pool (Norway/Sweden)" }, year: "1996", model: { es: "Mercado spot day-ahead + bilaterales con integración transfronteriza profunda.", en: "Day-ahead spot + bilaterals with deep cross-border integration." }, lesson: { es: "El estándar de oro en transparencia. Para CR: la integración regional (MER/SIEPAC) es un multiplicador — por eso preocupa la facultad de ECOSEN de interrumpir exportaciones firmes.", en: "The gold standard for transparency. For CR: regional integration (MER/SIEPAC) is a multiplier — which is why ECOSEN's power to interrupt firm exports worries experts." }, tone: "good" },
    { code: "TX", country: { es: "Texas / ERCOT", en: "Texas / ERCOT" }, year: "1999-2002", model: { es: "Mercado solo-energía, sin mercado de capacidad.", en: "Energy-only market, no capacity market." }, lesson: { es: "Barato cuando funciona; catastrófico en la tormenta de feb 2021 (>200 muertes). Lección para CR: precios de escasez sin remuneración de capacidad son peligrosos.", en: "Cheap when it works; catastrophic in the Feb 2021 storm (>200 deaths). Lesson for CR: scarcity pricing without capacity remuneration is dangerous." }, tone: "warn" },
  ],
  netAssessment: { es: "Los referentes más cercanos para Costa Rica son Uruguay (columna estatal + subastas privadas) y Colombia (modelo mixto con operador independiente). Ambos superaron en resultados a los diseños más radicales de Chile-1982 y Texas.", en: "Costa Rica's closest references are Uruguay (state backbone + private auctions) and Colombia (mixed model with independent operator). Both out-performed the more radical Chile-1982 and Texas designs." },
  asOf: { es: "Análisis estructural de Colibrii Labs — jun 2026", en: "Colibrii Labs structural analysis — Jun 2026" },
  cepalNote: { es: "Antecedente histórico: CEPAL (2002) constató que los precios más altos del Istmo estaban en los cuatro países que privatizaron — y Costa Rica, sin privatizar, tenía la tarifa más baja (7,38 ¢/kWh). El dato es de 2002 y no refleja tarifas actuales; dos décadas después, el argumento sigue vivo en el debate sindical.", en: "Historical antecedent: ECLAC (2002) found the Isthmus's highest prices in the four countries that privatized — while Costa Rica, unprivatized, had the lowest tariff (7.38 ¢/kWh). The figure is from 2002 and does not reflect current tariffs; two decades on, that argument is still alive in the union debate.", s: "cepal2002" },
};

/* ═══════════════ ACTO 7 — LOS NÚMEROS QUE IMPORTAN ═══════════════ */
/* ECAI-CR: composite per D-008. Component scores 0-1 (higher = better).
   Published composites reproduced within ±0.01: CR 0.71 · UY 0.78 · MX 0.62 · PA 0.65.
   Components flagged estimate where derived (saidi/headroom/mer). */
export const ECAI = {
  s: "colibrii", conf: "estimate",
  weights: [
    { id: "tariff", w: 0.30, label: { es: "Tarifa industrial (invertida)", en: "Industrial tariff (inverted)" }, hint: { es: "normalizada entre US$30 y US$200/MWh", en: "normalized between US$30 and US$200/MWh" } },
    { id: "clean", w: 0.25, label: { es: "Participación renovable", en: "Clean share" }, hint: { es: "% de generación renovable", en: "% renewable generation" } },
    { id: "saidi", w: 0.20, label: { es: "Confiabilidad (SAIDI, invertido)", en: "Reliability (SAIDI, inverted)" }, hint: { es: "duración de interrupciones, normalizada", en: "outage duration, normalized" } },
    { id: "headroom", w: 0.15, label: { es: "Margen de red disponible", en: "Grid headroom" }, hint: { es: "capacidad libre para nueva demanda", en: "spare capacity for new demand" } },
    { id: "mer", w: 0.10, label: { es: "Integración regional (MER)", en: "Regional integration (MER)" }, hint: { es: "capacidad de importar/exportar", en: "import/export capability" } },
  ],
  countries: [
    { code: "CR", name: { es: "Costa Rica", en: "Costa Rica" }, comp: { tariff: 0.44, clean: 0.99, saidi: 0.85, headroom: 0.45, mer: 0.94 }, published: 0.71, highlight: true },
    { code: "UY", name: { es: "Uruguay", en: "Uruguay" }, comp: { tariff: 0.37, clean: 0.99, saidi: 0.90, headroom: 0.95, mer: 0.95 }, published: 0.78 },
    { code: "PA", name: { es: "Panamá", en: "Panama" }, comp: { tariff: 0.29, clean: 0.75, saidi: 0.75, headroom: 0.85, mer: 0.95 }, published: 0.65 },
    { code: "MX", name: { es: "México", en: "Mexico" }, comp: { tariff: 0.74, clean: 0.26, saidi: 0.75, headroom: 0.80, mer: 0.60 }, published: 0.62 },
  ],
  method: { es: "ECAI = 0,30·tarifa⁻¹ + 0,25·limpia + 0,20·SAIDI⁻¹ + 0,15·margen + 0,10·MER. Propuesta de Colibrii Labs con pesos provisionales, pendientes de revisión de pares. Componentes derivados marcados como estimación; al mover los pesos, se renormalizan a Σ=1.", en: "ECAI = 0.30·tariff⁻¹ + 0.25·clean + 0.20·SAIDI⁻¹ + 0.15·headroom + 0.10·MER. A Colibrii Labs proposal with provisional weights, pending peer review. Derived components are flagged as estimates; moving the sliders renormalizes to Σ=1." },
  reading: { es: "Costa Rica puntúa altísimo en limpieza y bajo en tarifa y margen de red: la ventaja renovable existe, pero se evapora sin capacidad nueva.", en: "Costa Rica scores very high on cleanliness and low on tariff and grid headroom: the renewable advantage is real, but evaporates without new capacity." },
};

/* Scenario table: published endpoints only (no invented inter-year data). */
export const SCENARIOS = {
  s: "colibrii", conf: "estimate",
  method: { es: "Escenarios de Colibrii Labs construidos sobre la línea base del PEG 2024-2040 del ICE. Índice 100 = demanda 2024; los puntos 2035 y 2050 son los publicados en el informe Colibrii (may 2026) y las tasas anuales son etiquetas nominales de cada escenario, no CAGR exactos. Ejercicio exploratorio — no es una predicción.", en: "Colibrii Labs scenarios built on ICE's PEG 2024-2040 baseline. Index 100 = 2024 demand; the 2035 and 2050 points are those published in the Colibrii report (May 2026), and the annual rates are nominal scenario labels, not exact CAGRs. An exploratory exercise — not a prediction." },
  rows: [
    { id: "base", label: { es: "Línea base (PEG)", en: "Baseline (PEG)" }, growth: "~2,5%/a", color: "#22d3ee", points: [ { year: 2024, idx: 100 }, { year: 2035, idx: 130 }, { year: 2050, idx: 170 } ] },
    { id: "emov", label: { es: "Electromovilidad", en: "E-mobility" }, growth: "~4,0%/a", color: "#F2B135", points: [ { year: 2024, idx: 100 }, { year: 2035, idx: 150 }, { year: 2050, idx: 230 } ] },
    { id: "ai", label: { es: "IA / nearshoring", en: "AI / nearshoring" }, growth: "~5,5%/a", color: "#00B5A8", points: [ { year: 2024, idx: 100 }, { year: 2035, idx: 175 }, { year: 2050, idx: 320 } ] },
  ],
  implication: { es: "En el escenario IA, al 2050 Costa Rica necesitaría aproximadamente triplicar su capacidad instalada — muy por encima de los 5.995 MW planificados al 2040.", en: "Under the AI scenario, by 2050 Costa Rica would need to roughly triple installed capacity — far beyond the 5,995 MW planned for 2040." },
};

export const SOLAR_CURVE = {
  s: "owid", conf: "reported",
  unit: "US$/W",
  rows: [
    { year: 1977, usd: 76 },
    { year: 2014, usd: 0.36 },
    { year: 2024, usd: 0.11 },
    { year: 2025, usd: 0.085, est: true, note: { es: "rango 0,07–0,10", en: "range 0.07–0.10" } },
    { year: 2030, usd: 0.065, est: true, note: { es: "proyección a tasa de aprendizaje constante: 0,05–0,08", en: "projection at constant learning rate: 0.05–0.08" } },
  ],
  law: { es: "Ley de Swanson: ~20% de reducción de costo por cada duplicación de la producción acumulada. En el trópico, implica LCOE bajo US$20/MWh hacia 2030.", en: "Swanson's Law: ~20% cost reduction per doubling of cumulative production. In the tropics, that implies sub-US$20/MWh LCOE by 2030." },
};

/* ═══════════════ ACTO 8 — RECOMENDACIONES (12 enmiendas técnicas) ═══════════════ */
export const AMENDMENTS = {
  s: "colibrii", conf: "estimate",
  framing: { es: "Doce enmiendas técnicas, escalonadas al escenario post-desconvocatoria. Son opciones con costos y beneficios — insumo para el debate, no instrucciones; Colibrii no aboga por ninguna enmienda en particular. Sintetizan mejores prácticas (Uruguay, Colombia, Chile 20.936, Nord Pool) y las advertencias de la División Jurídica del ICE (ene 2024).", en: "Twelve technical amendments, staged for the post-withdrawal scenario. They are options with costs and benefits — input for the debate, not instructions; Colibrii does not advocate for any single amendment. They synthesize best practice (Uruguay, Colombia, Chile 20.936, Nord Pool) and ICE Legal Division's warnings (Jan 2024)." },
  stages: [
    { id: 1, label: { es: "Etapa 1 — Durante la pausa (jun-ago 2026) · supervivencia aritmética", en: "Stage 1 — During the pause (Jun-Aug 2026) · arithmetic survival" } },
    { id: 2, label: { es: "Etapa 2 — Renegociación del texto (ago-oct 2026) · palancas de negociación", en: "Stage 2 — Renegotiating the text (Aug-Oct 2026) · negotiation levers" } },
    { id: 3, label: { es: "Etapa 3 — Si hay reconvocatoria (post-Q3 2026) · seguros políticos", en: "Stage 3 — If reconvened (post-Q3 2026) · political insurance" } },
  ],
  rows: [
    { n: 1, stage: 1, title: { es: "ECOSEN como desconcentración máxima del MINAE", en: "ECOSEN as maximum deconcentration under MINAE" }, what: { es: "Reestructurar ECOSEN como órgano de desconcentración máxima, no institución autónoma.", en: "Restructure ECOSEN as a maximum-deconcentration body, not an autonomous institution." }, why: { es: "El umbral baja de 38 a 29 votos (mayoría absoluta) y desactiva el problema del Art. 189 CP. Por sí sola, vuelve el proyecto matemáticamente viable.", en: "The threshold drops from 38 to 29 votes (absolute majority), defusing the Art. 189 problem. By itself, it makes the bill arithmetically viable." } },
    { n: 2, stage: 1, title: { es: "Junta directiva despolitizada", en: "Depoliticized board" }, what: { es: "Sustituir la junta de agentes del mercado por consejeros profesionales independientes, por concurso público y períodos escalonados.", en: "Replace the market-agent board with independent professional councillors, via public competition and staggered terms." }, why: { es: "Modelo Coordinador Eléctrico de Chile (Ley 20.936): un árbitro no puede ser jugador.", en: "Chile's Coordinator model (Law 20.936): a referee cannot also play." } },
    { n: 3, stage: 1, title: { es: "Transitorio VIII reglado: tasación antes del traslado", en: "Regulated T-VIII: valuation before transfer" }, what: { es: "Tasación internacional de la DOCSE (Banco Mundial, BID o auditores) previa a cualquier traslado de activos, con compensación tarifaria al ICE.", en: "International valuation of DOCSE (World Bank, IDB or auditors) before any asset transfer, with tariff compensation to ICE." }, why: { es: "Evita el 'vaciamiento institucional' advertido por la División Jurídica del ICE y los sindicatos.", en: "Prevents the 'institutional emptying' warned of by ICE's Legal Division and the unions." } },
    { n: 4, stage: 1, title: { es: "Piso de solidaridad tarifaria", en: "Tariff solidarity floor" }, what: { es: "Cláusula que impida que la brecha entre la tarifa de gran consumidor en el MEN y la residencial supere un múltiplo regulado por ARESEP.", en: "A clause preventing the gap between large-consumer MEN tariffs and residential tariffs from exceeding an ARESEP-regulated multiple." }, why: { es: "Neutraliza el riesgo de descreme del mercado — el argumento central de Dobles y los sindicatos.", en: "Neutralizes cream-skimming risk — the central argument of Dobles and the unions." } },
    { n: 5, stage: 1, title: { es: "Carve-out de territorios indígenas", en: "Indigenous-territory carve-out" }, what: { es: "Prohibición de subastas que requieran concesión en territorios indígenas sin Consulta Previa, Libre e Informada (Convenio 169 OIT).", en: "Ban on auctions requiring concessions in indigenous territories without Free, Prior and Informed Consultation (ILO Convention 169)." }, why: { es: "Absorbe la oposición ambiental (FECON, Ríos Vivos, Bloque Verde) y blinda el texto ante la Sala IV.", en: "Absorbs the environmental opposition (FECON, Ríos Vivos, Bloque Verde) and shields the text before the Constitutional Court." } },
    { n: 6, stage: 2, title: { es: "Transitorio XIII → cargo por capacidad", en: "T-XIII → capacity payment" }, what: { es: "Sustituir los 10 años de despacho prioritario por un cargo que remunere disponibilidad (no despacho) de las plantas existentes del ICE y cooperativas.", en: "Replace 10 years of priority dispatch with a charge remunerating availability (not dispatch) of existing ICE/co-op plants." }, why: { es: "Compatible con el despacho económico y técnicamente más limpio que un privilegio blanket.", en: "Compatible with economic dispatch and technically cleaner than a blanket privilege." } },
    { n: 7, stage: 2, title: { es: "Exportaciones firmes intocables", en: "Untouchable firm exports" }, what: { es: "Eliminar la facultad de ECOSEN de interrumpir contratos firmes de exportación; sustituirla por reservas operativas y subastas de capacidad firme.", en: "Remove ECOSEN's power to interrupt firm export contracts; replace with operating reserves and firm-capacity auctions." }, why: { es: "Preserva la credibilidad de Costa Rica en el SIEPAC ('pacta sunt servanda' del Tratado Marco del MER) y abarata el financiamiento.", en: "Preserves CR's credibility in SIEPAC ('pacta sunt servanda' of the MER Framework Treaty) and lowers financing costs." } },
    { n: 8, stage: 2, title: { es: "Reserva de potencia para IA / data centers", en: "AI / data-centre power reserve" }, what: { es: "5-10% de la nueva capacidad subastada en contratos largos a precio fijo con anclaje renovable, condicionados a empleo verificable.", en: "5-10% of newly auctioned capacity in long fixed-price contracts with renewable anchoring, conditional on verifiable jobs." }, why: { es: "Convierte la objeción del PLN ('no garantiza estabilidad') en un activo de negociación — y conecta la reforma con la ola de inversión global.", en: "Turns the PLN's objection ('no stability guarantee') into a bargaining asset — and ties the reform to the global investment wave." } },
    { n: 9, stage: 2, title: { es: "Cláusula sunset de 5 años", en: "5-year sunset clause" }, what: { es: "Revisión obligatoria por la Asamblea sobre resultados de tarifa, inversión y solidaridad.", en: "Mandatory Assembly review of tariff, investment and solidarity outcomes." }, why: { es: "Da garantía política a los críticos sin congelar la reforma.", en: "Gives critics a political guarantee without freezing the reform." } },
    { n: 10, stage: 2, title: { es: "Margen de recapitalización del ICE", en: "ICE recapitalization headroom" }, what: { es: "Permitir explícitamente deuda corporativa o capital parcial (sin perder mayoría estatal) en subsidiarias, para sostener la inversión renovable en la transición.", en: "Explicitly allow corporate debt or partial equity (state majority retained) in subsidiaries, to sustain renewable investment through the transition." }, why: { es: "Con apalancamiento en 27,8% (tope 45%), el ICE tiene ~US$1.000-1.500M de espacio — pero necesita habilitación clara.", en: "At 27.8% leverage (45% cap), ICE has ~US$1.0-1.5bn of headroom — but needs clear enabling language." } },
    { n: 11, stage: 3, title: { es: "Acuerdo técnico previo a la reconvocatoria", en: "Technical accord before reconvening" }, what: { es: "Memorándum tripartito Ejecutivo-PLN-PUSC sobre los cambios al texto, con cronograma de mociones, antes de reconvocar.", en: "Tripartite Executive-PLN-PUSC memorandum on text changes, with a motion schedule, before reconvening." }, why: { es: "Reconvocar sin los votos garantizados repetiría el 27 de mayo.", en: "Reconvening without secured votes would repeat May 27." } },
    { n: 12, stage: 3, title: { es: "Consulta preventiva a la Sala IV", en: "Preventive Constitutional Court referral" }, what: { es: "Aceptar la consulta de constitucionalidad como filtro antes del segundo debate, no después.", en: "Accept the constitutionality referral as a filter before second debate, not after." }, why: { es: "Blinda el texto contra impugnaciones futuras y desactiva la principal arma procesal de la oposición.", en: "Shields the text from future challenges and defuses the opposition's main procedural weapon." } },
  ],
};

/* ═══════════════ VIDEOS (link-out cards — D-005: no iframes, CSP/privacy) ═══════════════ */
export const VIDEOS = [
  { title: { es: "AIE — Energía e IA: el lanzamiento", en: "IEA — Energy and AI: the launch" }, outlet: "IEA · Fatih Birol", url: "https://www.iea.org/news/ai-is-set-to-drive-surging-electricity-demand-from-data-centres-while-offering-the-potential-to-transform-how-the-energy-sector-works" },
  { title: { es: "Three Mile Island reabre para Microsoft", en: "Three Mile Island restarts for Microsoft" }, outlet: "NPR", url: "https://www.npr.org/2024/09/20/nx-s1-5120581/three-mile-island-nuclear-power-plant-microsoft-ai" },
  { title: { es: "Bill Gates — inicio de obra de Natrium", en: "Bill Gates — Natrium groundbreaking" }, outlet: "GatesNotes", url: "https://www.gatesnotes.com/Wyoming-TerraPower" },
  { title: { es: "China y la velocidad de sus renovables", en: "China's renewable buildout speed" }, outlet: "World Economic Forum", url: "https://www.weforum.org/stories/2025/12/china-adding-more-renewables-to-grid/" },
];

/* ═══════════════ CR GRID MAP DATA (hero canvas) ═══════════════ */
/* Stylized generation nodes for the hero — locations approximate, for art direction only. */
export const GRID_NODES = [
  { id: "reventazon", x: 0.66, y: 0.52, kind: "hydro", label: "Reventazón (305 MW)" },
  { id: "arenal", x: 0.38, y: 0.36, kind: "hydro", label: "Arenal" },
  { id: "miravalles", x: 0.30, y: 0.28, kind: "geo", label: "Miravalles" },
  { id: "borinquen", x: 0.24, y: 0.24, kind: "geo", label: "Borinquen I (en desarrollo)" },
  { id: "tejona", x: 0.36, y: 0.33, kind: "wind", label: "Tejona" },
  { id: "guanacaste_w", x: 0.27, y: 0.31, kind: "wind", label: "Eólicas Guanacaste" },
  { id: "sanantonio", x: 0.52, y: 0.55, kind: "solar", label: "Solar San Antonio (2026)" },
  { id: "sanjose", x: 0.54, y: 0.57, kind: "load", label: "GAM (centro de carga)" },
  { id: "moin", x: 0.70, y: 0.42, kind: "thermal", label: "Moín (respaldo)" },
];
