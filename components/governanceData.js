/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Governance & Policy Intelligence
   Governance indices, LATAM AI policy landscape, OAS framework,
   key publications and tools for AI governance assessment.
   Sources: V-Dem, Freedom House, WGI, WJP, TI, RSF, OECD, OAS,
   UNESCO, CSET, various national AI strategies
   ═══════════════════════════════════════════════════════════════ */

// ── Governance Indices (10+ indices with CR scores) ──
export const GOV_INDICES = (en) => [
  {
    id: "vdem",
    name: "V-Dem — Varieties of Democracy",
    org: "V-Dem Institute, University of Gothenburg",
    url: "https://www.v-dem.net/",
    frequency: en ? "Annual" : "Anual",
    countries: 202,
    crScore: 0.87,
    crRank: 14,
    maxScore: 1.0,
    year: 2024,
    description: {
      en: "Most comprehensive democracy index: 470+ indicators covering electoral, liberal, participatory, deliberative, and egalitarian dimensions.",
      es: "Índice de democracia más comprensivo: 470+ indicadores cubriendo dimensiones electoral, liberal, participativa, deliberativa e igualitaria."
    },
    crContext: {
      en: "CR ranks as one of the most democratic countries globally — strong foundation for transparent AI governance.",
      es: "CR se posiciona como uno de los países más democráticos globalmente — base sólida para gobernanza AI transparente."
    },
    dimensions: [
      { name: en ? "Electoral Democracy" : "Democracia Electoral", score: 0.91 },
      { name: en ? "Liberal Democracy" : "Democracia Liberal", score: 0.88 },
      { name: en ? "Participatory Democracy" : "Democracia Participativa", score: 0.73 },
      { name: en ? "Deliberative Democracy" : "Democracia Deliberativa", score: 0.85 },
      { name: en ? "Egalitarian Democracy" : "Democracia Igualitaria", score: 0.82 }
    ]
  },
  {
    id: "fh",
    name: "Freedom House — Freedom in the World",
    org: "Freedom House",
    url: "https://freedomhouse.org/report/freedom-world",
    frequency: en ? "Annual" : "Anual",
    countries: 210,
    crScore: 91,
    crRank: 18,
    maxScore: 100,
    year: 2024,
    description: {
      en: "Political rights and civil liberties assessment: 25 indicators scored 0-4, aggregated to 100-point scale. Status: Free/Partly Free/Not Free.",
      es: "Evaluación de derechos políticos y libertades civiles: 25 indicadores puntuados 0-4, agregados a escala de 100 puntos. Estado: Libre/Parcialmente Libre/No Libre."
    },
    crContext: {
      en: "CR rated 'Free' with 91/100 — highest in Central America. Strong civil liberties support responsible AI development.",
      es: "CR calificada 'Libre' con 91/100 — la más alta en Centroamérica. Fuertes libertades civiles apoyan desarrollo AI responsable."
    },
    dimensions: [
      { name: en ? "Political Rights" : "Derechos Políticos", score: 37, max: 40 },
      { name: en ? "Civil Liberties" : "Libertades Civiles", score: 54, max: 60 }
    ]
  },
  {
    id: "wgi",
    name: "WGI — Worldwide Governance Indicators",
    org: en ? "World Bank" : "Banco Mundial",
    url: "https://info.worldbank.org/governance/wgi/",
    frequency: en ? "Annual" : "Anual",
    countries: 215,
    crScore: 68.5,
    crRank: null,
    maxScore: 100,
    year: 2023,
    description: {
      en: "Six governance dimensions: Voice & Accountability, Political Stability, Government Effectiveness, Regulatory Quality, Rule of Law, Control of Corruption. Percentile rankings.",
      es: "Seis dimensiones de gobernanza: Voz y Rendición de Cuentas, Estabilidad Política, Efectividad Gubernamental, Calidad Regulatoria, Estado de Derecho, Control de Corrupción. Rankings percentiles."
    },
    crContext: {
      en: "CR above 60th percentile in all dimensions — standout in Voice & Accountability (82nd) and Political Stability (71st).",
      es: "CR por encima del percentil 60 en todas las dimensiones — destaca en Voz y Rendición de Cuentas (82o) y Estabilidad Política (71o)."
    },
    dimensions: [
      { name: en ? "Voice & Accountability" : "Voz y Rendición de Cuentas", score: 82 },
      { name: en ? "Political Stability" : "Estabilidad Política", score: 71 },
      { name: en ? "Government Effectiveness" : "Efectividad Gubernamental", score: 63 },
      { name: en ? "Regulatory Quality" : "Calidad Regulatoria", score: 65 },
      { name: en ? "Rule of Law" : "Estado de Derecho", score: 67 },
      { name: en ? "Control of Corruption" : "Control de Corrupción", score: 63 }
    ]
  },
  {
    id: "wjp",
    name: "WJP — World Justice Project Rule of Law Index",
    org: "World Justice Project",
    url: "https://worldjusticeproject.org/rule-of-law-index/",
    frequency: en ? "Annual" : "Anual",
    countries: 142,
    crScore: 0.61,
    crRank: 41,
    maxScore: 1.0,
    year: 2024,
    description: {
      en: "Rule of law performance across 8 factors: constraints on government powers, absence of corruption, fundamental rights, regulatory enforcement, civil justice, criminal justice.",
      es: "Desempeño del estado de derecho en 8 factores: límites a poderes del gobierno, ausencia de corrupción, derechos fundamentales, aplicación regulatoria, justicia civil, justicia penal."
    },
    crContext: {
      en: "CR ranks 1st in Central America, 3rd in LATAM for rule of law — critical for AI intellectual property protection.",
      es: "CR se posiciona 1o en Centroamérica, 3o en LATAM en estado de derecho — crítico para protección de propiedad intelectual AI."
    },
    dimensions: [
      { name: en ? "Constraints on Govt. Powers" : "Límites a Poderes del Gobierno", score: 0.68 },
      { name: en ? "Absence of Corruption" : "Ausencia de Corrupción", score: 0.57 },
      { name: en ? "Fundamental Rights" : "Derechos Fundamentales", score: 0.67 },
      { name: en ? "Regulatory Enforcement" : "Aplicación Regulatoria", score: 0.55 },
      { name: en ? "Civil Justice" : "Justicia Civil", score: 0.56 },
      { name: en ? "Criminal Justice" : "Justicia Penal", score: 0.43 }
    ]
  },
  {
    id: "ti-cpi",
    name: "TI CPI — Transparency International Corruption Perceptions Index",
    org: "Transparency International",
    url: "https://www.transparency.org/cpi",
    frequency: en ? "Annual" : "Anual",
    countries: 180,
    crScore: 55,
    crRank: 53,
    maxScore: 100,
    year: 2024,
    description: {
      en: "Perceived public sector corruption: scored 0-100 based on 13 expert surveys. Higher = cleaner.",
      es: "Percepción de corrupción del sector público: puntuado 0-100 basado en 13 encuestas de expertos. Mayor = más limpio."
    },
    crContext: {
      en: "CR scores 55/100 — above LATAM average (33) but below OECD average (66). Anti-corruption is key for transparent AI procurement.",
      es: "CR puntúa 55/100 — por encima del promedio LATAM (33) pero debajo del promedio OCDE (66). Anticorrupción es clave para contratación AI transparente."
    },
    dimensions: []
  },
  {
    id: "rsf",
    name: "RSF — Reporters Without Borders Press Freedom Index",
    org: "Reporters Sans Frontières",
    url: "https://rsf.org/en/index",
    frequency: en ? "Annual" : "Anual",
    countries: 180,
    crScore: 77.68,
    crRank: 18,
    maxScore: 100,
    year: 2024,
    description: {
      en: "Press freedom assessment: political, economic, legislative, social, and security contexts plus safety indicators.",
      es: "Evaluación de libertad de prensa: contextos político, económico, legislativo, social y de seguridad más indicadores de seguridad."
    },
    crContext: {
      en: "CR ranks 18th globally, 1st in LATAM — free press is essential for AI accountability and investigative reporting on AI harms.",
      es: "CR se posiciona 18o globalmente, 1o en LATAM — prensa libre es esencial para rendición de cuentas AI y reportajes investigativos sobre daños AI."
    },
    dimensions: []
  },
  {
    id: "oecd-dge",
    name: "OECD Digital Government Index",
    org: "OECD",
    url: "https://www.oecd.org/governance/digital-government/",
    frequency: en ? "Biennial" : "Bienal",
    countries: 38,
    crScore: 0.48,
    crRank: 32,
    maxScore: 1.0,
    year: 2023,
    description: {
      en: "Digital government maturity across OECD members: digital by design, data-driven, government as platform, open by default, user-driven, proactive.",
      es: "Madurez de gobierno digital en miembros OCDE: digital por diseño, basado en datos, gobierno como plataforma, abierto por defecto, orientado al usuario, proactivo."
    },
    crContext: {
      en: "CR below OECD average — significant room for AI-augmented government services.",
      es: "CR por debajo del promedio OCDE — espacio significativo para servicios gubernamentales aumentados por AI."
    },
    dimensions: [
      { name: en ? "Digital by Design" : "Digital por Diseño", score: 0.51 },
      { name: en ? "Data-Driven" : "Basado en Datos", score: 0.42 },
      { name: en ? "Government as Platform" : "Gobierno como Plataforma", score: 0.39 },
      { name: en ? "Open by Default" : "Abierto por Defecto", score: 0.55 },
      { name: en ? "User-Driven" : "Orientado al Usuario", score: 0.48 },
      { name: en ? "Proactive" : "Proactivo", score: 0.53 }
    ]
  },
  {
    id: "oecd-ai-policy",
    name: "OECD AI Policy Observatory — Country Scores",
    org: "OECD",
    url: "https://oecd.ai/en/dashboards/countries",
    frequency: en ? "Continuous" : "Continuo",
    countries: 70,
    crScore: null,
    crRank: null,
    maxScore: null,
    year: 2025,
    description: {
      en: "Live tracker of AI policies by country: 800+ policy initiatives catalogued. Covers strategies, regulations, funding programs, ethics frameworks.",
      es: "Rastreador en vivo de políticas AI por país: 800+ iniciativas de política catalogadas. Cubre estrategias, regulaciones, programas de financiamiento, marcos de ética."
    },
    crContext: {
      en: "CR has ANIA national strategy registered but fewer concrete AI policy instruments than LATAM leaders Chile and Brazil.",
      es: "CR tiene la estrategia nacional ANIA registrada pero menos instrumentos de política AI concretos que líderes LATAM Chile y Brasil."
    },
    dimensions: []
  },
  {
    id: "gsod",
    name: "IDEA — Global State of Democracy Indices",
    org: "International IDEA",
    url: "https://www.idea.int/gsod-indices/",
    frequency: en ? "Annual" : "Anual",
    countries: 173,
    crScore: 0.78,
    crRank: 21,
    maxScore: 1.0,
    year: 2023,
    description: {
      en: "Democracy quality indicators: representative government, fundamental rights, checks on government, impartial administration, participatory engagement.",
      es: "Indicadores de calidad democrática: gobierno representativo, derechos fundamentales, controles al gobierno, administración imparcial, participación ciudadana."
    },
    crContext: {
      en: "CR consistently ranks among top 25 democracies globally — institutional strength supports ethical AI governance.",
      es: "CR consistentemente se posiciona entre las 25 democracias principales globalmente — fortaleza institucional apoya gobernanza AI ética."
    },
    dimensions: []
  },
  {
    id: "gdi",
    name: "GDI — Global Data Barometer",
    org: "Global Data Barometer",
    url: "https://globaldatabarometer.org/",
    frequency: en ? "Periodic" : "Periódico",
    countries: 109,
    crScore: 46,
    crRank: 42,
    maxScore: 100,
    year: 2022,
    description: {
      en: "Data governance quality: data availability, capability, governance, use across health, land, political finance, procurement, climate.",
      es: "Calidad de gobernanza de datos: disponibilidad, capacidad, gobernanza, uso en salud, tierra, finanzas políticas, contratación, clima."
    },
    crContext: {
      en: "CR scores moderately — data governance maturity is critical prerequisite for trustworthy AI.",
      es: "CR puntúa moderadamente — madurez de gobernanza de datos es prerrequisito crítico para AI confiable."
    },
    dimensions: []
  }
];

// ── LATAM AI Policy Landscape ──
export const LATAM_AI_POLICY = (en) => [
  {
    country: "Chile",
    flag: "🇨🇱",
    status: en ? "Advanced" : "Avanzado",
    color: "#10b981",
    strategy: en ? "National AI Policy (2021, updated 2024)" : "Política Nacional de AI (2021, actualizada 2024)",
    legislation: en ? "No specific AI law yet; data protection law modernized 2024" : "Sin ley AI específica aún; ley de protección de datos modernizada 2024",
    institution: "CENIA (Centro Nacional de Inteligencia Artificial)",
    keyFacts: [
      en ? "ILIA Index creator — leading LATAM AI measurement" : "Creador del Índice ILIA — liderando medición AI en LATAM",
      en ? "CENIA receives $17M public funding for AI research" : "CENIA recibe $17M de financiamiento público para investigación AI",
      en ? "First LATAM country with dedicated AI research center" : "Primer país LATAM con centro de investigación AI dedicado",
      en ? "Ranked #1 in ILIA 2025 with 73.07 score" : "Posicionado #1 en ILIA 2025 con puntaje 73.07"
    ]
  },
  {
    country: "Brasil",
    flag: "🇧🇷",
    status: en ? "Advanced" : "Avanzado",
    color: "#10b981",
    strategy: en ? "EBIA — Brazilian AI Strategy (2021)" : "EBIA — Estrategia Brasileña de AI (2021)",
    legislation: en ? "PL 2,338/2023 — AI Regulatory Framework (approved Senate 2024, pending Chamber)" : "PL 2,338/2023 — Marco Regulatorio de AI (aprobado Senado 2024, pendiente Cámara)",
    institution: "MCTI + SENAI AI hubs",
    keyFacts: [
      en ? "Most comprehensive AI bill in LATAM — risk-based approach inspired by EU AI Act" : "Proyecto de ley AI más comprensivo en LATAM — enfoque basado en riesgo inspirado en Ley AI de la UE",
      en ? "8 SENAI AI innovation hubs across the country" : "8 centros de innovación AI SENAI en todo el país",
      en ? "Largest AI market in LATAM by investment volume" : "Mayor mercado AI en LATAM por volumen de inversión",
      en ? "Ranked #2 in ILIA 2025 with 69.30 score" : "Posicionado #2 en ILIA 2025 con puntaje 69.30"
    ]
  },
  {
    country: "Uruguay",
    flag: "🇺🇾",
    status: en ? "Moderate-Advanced" : "Moderado-Avanzado",
    color: "#3b82f6",
    strategy: en ? "AI Strategy for Digital Government (2019)" : "Estrategia AI para Gobierno Digital (2019)",
    legislation: en ? "No specific AI law; strong data protection (Ley 18.331)" : "Sin ley AI específica; fuerte protección de datos (Ley 18.331)",
    institution: "AGESIC + Plan Ceibal",
    keyFacts: [
      en ? "Model for AI in government services — AGESIC leads digital transformation" : "Modelo para AI en servicios gubernamentales — AGESIC lidera transformación digital",
      en ? "Plan Ceibal: pioneered 1:1 laptop program, now integrating AI literacy" : "Plan Ceibal: pionero en programa 1:1 de laptops, ahora integrando alfabetización AI",
      en ? "Small country advantage: rapid policy implementation" : "Ventaja de país pequeño: implementación rápida de políticas",
      en ? "Ranked #3 in ILIA 2025 with 64.98 score" : "Posicionado #3 en ILIA 2025 con puntaje 64.98"
    ]
  },
  {
    country: "Argentina",
    flag: "🇦🇷",
    status: en ? "Moderate" : "Moderado",
    color: "#3b82f6",
    strategy: en ? "National AI Plan (2019, updated 2024)" : "Plan Nacional de AI (2019, actualizado 2024)",
    legislation: en ? "Multiple AI bills introduced; personal data protection law under reform" : "Múltiples proyectos de ley AI introducidos; ley de protección de datos personales en reforma",
    institution: "Subsecretaría de Tecnologías de la Información",
    keyFacts: [
      en ? "Strong AI talent pool — Buenos Aires is LATAM's startup capital" : "Fuerte pool de talento AI — Buenos Aires es capital de startups de LATAM",
      en ? "Laboratorio de IA (UNLP) producing significant AI research" : "Laboratorio de IA (UNLP) produciendo investigación AI significativa",
      en ? "Macroeconomic instability complicates long-term AI investment" : "Inestabilidad macroeconómica complica inversión AI a largo plazo",
      en ? "Ranked #4 in ILIA 2025 with 55.77 score" : "Posicionado #4 en ILIA 2025 con puntaje 55.77"
    ]
  },
  {
    country: "Colombia",
    flag: "🇨🇴",
    status: en ? "Moderate" : "Moderado",
    color: "#3b82f6",
    strategy: en ? "CONPES 3975 — AI Policy (2019)" : "CONPES 3975 — Política de AI (2019)",
    legislation: en ? "AI ethics framework adopted; CONPES-based regulatory approach" : "Marco de ética AI adoptado; enfoque regulatorio basado en CONPES",
    institution: "MinTIC + C4IR Colombia",
    keyFacts: [
      en ? "C4IR Colombia (WEF Center for 4IR) co-creates AI governance" : "C4IR Colombia (Centro WEF para 4RI) co-crea gobernanza AI",
      en ? "Strong AI startup ecosystem in Medellín and Bogotá" : "Fuerte ecosistema de startups AI en Medellín y Bogotá",
      en ? "CONPES framework provides structured but non-binding AI policy" : "Marco CONPES proporciona política AI estructurada pero no vinculante",
      en ? "Ranked #5 in ILIA 2025 with 52.64 score" : "Posicionado #5 en ILIA 2025 con puntaje 52.64"
    ]
  },
  {
    country: "México",
    flag: "🇲🇽",
    status: en ? "Moderate" : "Moderado",
    color: "#f59e0b",
    strategy: en ? "AI MX Strategy (2018, stalled)" : "Estrategia AI MX (2018, estancada)",
    legislation: en ? "Multiple AI bills introduced; Fintech Law (2018) covers some AI aspects" : "Múltiples proyectos de ley AI introducidos; Ley Fintech (2018) cubre algunos aspectos AI",
    institution: "CONACYT (now CONAHCYT)",
    keyFacts: [
      en ? "Largest nearshoring market in LATAM — AI drives manufacturing transformation" : "Mayor mercado de nearshoring en LATAM — AI impulsa transformación manufacturera",
      en ? "AI strategy stalled since government change in 2018" : "Estrategia AI estancada desde cambio de gobierno en 2018",
      en ? "Fintech Law is most advanced in LATAM but doesn't cover general AI" : "Ley Fintech es la más avanzada en LATAM pero no cubre AI general",
      en ? "Ranked #6 in ILIA 2025 with 51.40 score" : "Posicionado #6 en ILIA 2025 con puntaje 51.40"
    ]
  },
  {
    country: "Perú",
    flag: "🇵🇪",
    status: en ? "Emerging" : "Emergente",
    color: "#f59e0b",
    strategy: en ? "National AI Strategy (2021)" : "Estrategia Nacional de AI (2021)",
    legislation: en ? "Ley 31,814 (2023) — first AI-specific law in LATAM" : "Ley 31,814 (2023) — primera ley específica de AI en LATAM",
    institution: "CONCYTEC + Secretaría de Gobierno Digital",
    keyFacts: [
      en ? "Ley 31,814: first dedicated AI law in Latin America (July 2023)" : "Ley 31,814: primera ley dedicada de AI en América Latina (julio 2023)",
      en ? "Focuses on promoting ethical AI use in public and private sectors" : "Se enfoca en promover uso ético de AI en sectores público y privado",
      en ? "Law emphasizes human rights, transparency, and non-discrimination" : "La ley enfatiza derechos humanos, transparencia y no discriminación",
      en ? "Implementation regulations still being developed" : "Regulaciones de implementación aún en desarrollo"
    ]
  },
  {
    country: "Costa Rica",
    flag: "🇨🇷",
    status: en ? "Developing" : "En Desarrollo",
    color: "#f59e0b",
    strategy: en ? "ANIA — National AI Action Agenda (draft)" : "ANIA — Agenda Nacional de Acción en AI (borrador)",
    legislation: en ? "No AI-specific law; Ley 8968 data protection; Expediente 23.506 AI bill introduced" : "Sin ley específica AI; Ley 8968 protección de datos; Expediente 23.506 proyecto de ley AI introducido",
    institution: "MICITT + PRODHAB",
    keyFacts: [
      en ? "ANIA drafted but not yet formally adopted as binding policy" : "ANIA redactada pero aún no adoptada formalmente como política vinculante",
      en ? "Expediente 23.506: AI bill introduced in Legislative Assembly" : "Expediente 23.506: proyecto de ley AI introducido en Asamblea Legislativa",
      en ? "PRODHAB (data protection agency) is main AI governance body by default" : "PRODHAB (agencia de protección de datos) es principal órgano de gobernanza AI por defecto",
      en ? "World Bank 'AI Overperformer' — performing above expected level for income" : "Banco Mundial 'AI Overperformer' — rindiendo por encima del nivel esperado para su ingreso",
      en ? "Strong institutional foundations but weak AI-specific regulation" : "Fundaciones institucionales fuertes pero regulación específica AI débil"
    ]
  },
  {
    country: en ? "Dominican Rep." : "Rep. Dominicana",
    flag: "🇩🇴",
    status: en ? "Early" : "Temprano",
    color: "#ef4444",
    strategy: en ? "Digital Agenda 2030 (includes AI mentions)" : "Agenda Digital 2030 (incluye menciones de AI)",
    legislation: en ? "No AI-specific legislation" : "Sin legislación específica de AI",
    institution: "OGTIC",
    keyFacts: [
      en ? "Digital Agenda 2030 mentions AI but no dedicated strategy" : "Agenda Digital 2030 menciona AI pero sin estrategia dedicada",
      en ? "OGTIC leading digital transformation efforts" : "OGTIC liderando esfuerzos de transformación digital",
      en ? "Growing tech sector but AI governance is nascent" : "Sector tech creciente pero gobernanza AI es incipiente"
    ]
  },
  {
    country: "Panamá",
    flag: "🇵🇦",
    status: en ? "Early" : "Temprano",
    color: "#ef4444",
    strategy: en ? "National AI Strategy (2024 draft)" : "Estrategia Nacional de AI (borrador 2024)",
    legislation: en ? "No AI-specific legislation; Ley 81 data protection (2019)" : "Sin legislación específica AI; Ley 81 protección de datos (2019)",
    institution: "AIG + SENACYT",
    keyFacts: [
      en ? "Logistics hub exploring AI for canal operations and financial center" : "Hub logístico explorando AI para operaciones del canal y centro financiero",
      en ? "Data protection law (Ley 81) provides baseline for AI data governance" : "Ley de protección de datos (Ley 81) proporciona línea base para gobernanza de datos AI",
      en ? "AI strategy draft in development with IDB support" : "Borrador de estrategia AI en desarrollo con apoyo del BID"
    ]
  }
];

// ── OAS Hemispheric AI Governance Framework ──
export const OAS_FRAMEWORK = (en) => ({
  title: en ? "OAS Hemispheric AI Governance Framework" : "Marco Hemisférico de Gobernanza AI de la OEA",
  adoptedDate: en ? "November 2023" : "Noviembre 2023",
  scope: en ? "35 OAS Member States" : "35 Estados Miembros de la OEA",
  url: "https://www.oas.org/en/sla/dil/artificial-intelligence.asp",
  overview: {
    en: "The OAS Inter-American Principles on Artificial Intelligence establish a hemispheric framework for responsible AI development, deployment, and governance across the Americas.",
    es: "Los Principios Interamericanos sobre Inteligencia Artificial de la OEA establecen un marco hemisférico para desarrollo, despliegue y gobernanza AI responsable en las Américas."
  },
  principles: [
    {
      name: en ? "Human Rights & Democratic Values" : "Derechos Humanos y Valores Democráticos",
      description: en ? "AI systems must respect human rights, democratic values, and the rule of law" : "Sistemas AI deben respetar derechos humanos, valores democráticos y el estado de derecho",
      crImplication: en ? "Aligns with CR's strong democratic foundations and human rights record" : "Se alinea con las fuertes fundaciones democráticas y récord de derechos humanos de CR"
    },
    {
      name: en ? "Transparency & Explainability" : "Transparencia y Explicabilidad",
      description: en ? "Meaningful information about AI systems should be available to affected individuals and oversight bodies" : "Información significativa sobre sistemas AI debe estar disponible para individuos afectados y órganos de supervisión",
      crImplication: en ? "CR needs to develop AI transparency standards — currently absent" : "CR necesita desarrollar estándares de transparencia AI — actualmente ausentes"
    },
    {
      name: en ? "Fairness & Non-Discrimination" : "Equidad y No Discriminación",
      description: en ? "AI systems should not perpetuate discrimination based on race, gender, ethnicity, or socioeconomic status" : "Sistemas AI no deben perpetuar discriminación basada en raza, género, etnicidad o estatus socioeconómico",
      crImplication: en ? "Critical for CR's diverse population and social equity commitments" : "Crítico para la población diversa de CR y compromisos de equidad social"
    },
    {
      name: en ? "Safety, Security & Robustness" : "Seguridad, Protección y Robustez",
      description: en ? "AI systems must be safe, secure, and resilient throughout their lifecycle" : "Sistemas AI deben ser seguros, protegidos y resilientes durante todo su ciclo de vida",
      crImplication: en ? "Post-HIVE attack, CR must prioritize AI system security especially in health and financial sectors" : "Post-ataque HIVE, CR debe priorizar seguridad de sistemas AI especialmente en sectores salud y financiero"
    },
    {
      name: en ? "Accountability" : "Rendición de Cuentas",
      description: en ? "Organizations deploying AI should be accountable for AI outcomes" : "Organizaciones que despliegan AI deben rendir cuentas por resultados AI",
      crImplication: en ? "CR lacks AI liability framework — need for clear accountability mechanisms" : "CR carece de marco de responsabilidad AI — necesidad de mecanismos claros de rendición de cuentas"
    },
    {
      name: en ? "Privacy & Data Governance" : "Privacidad y Gobernanza de Datos",
      description: en ? "AI systems must comply with applicable data protection frameworks" : "Sistemas AI deben cumplir con marcos de protección de datos aplicables",
      crImplication: en ? "PRODHAB and Ley 8968 provide baseline — but AI-specific data governance gaps remain" : "PRODHAB y Ley 8968 proveen línea base — pero persisten vacíos de gobernanza de datos específicos para AI"
    },
    {
      name: en ? "Inclusive Development" : "Desarrollo Inclusivo",
      description: en ? "Benefits of AI should be broadly shared, reducing inequalities" : "Beneficios de AI deben compartirse ampliamente, reduciendo desigualdades",
      crImplication: en ? "CR's digital divide (rural vs urban) must be addressed for inclusive AI benefits" : "La brecha digital de CR (rural vs urbano) debe abordarse para beneficios AI inclusivos"
    }
  ],
  crStatus: {
    en: "Costa Rica has endorsed the OAS AI principles but has not yet translated them into binding domestic legislation. The ANIA strategy references these principles but implementation mechanisms are pending.",
    es: "Costa Rica ha respaldado los principios AI de la OEA pero aún no los ha traducido en legislación doméstica vinculante. La estrategia ANIA hace referencia a estos principios pero los mecanismos de implementación están pendientes."
  }
});

// ── Governance Resources & Key Publications ──
export const GOV_RESOURCES = (en) => [
  {
    id: "cset-agora",
    name: "CSET AGORA",
    org: "Georgetown University CSET",
    url: "https://agora.ceip.org/",
    type: en ? "Database" : "Base de Datos",
    description: {
      en: "AI Governance Repository & Assessment: curated collection of 200+ AI governance documents from 70+ countries. Enables cross-country legislative comparison.",
      es: "Repositorio y Evaluación de Gobernanza AI: colección curada de 200+ documentos de gobernanza AI de 70+ países. Permite comparación legislativa entre países."
    },
    useCase: {
      en: "Compare CR's AI governance gaps with peer country frameworks. Identify best practices for ANIA implementation.",
      es: "Comparar vacíos de gobernanza AI de CR con marcos de países pares. Identificar mejores prácticas para implementación de ANIA."
    }
  },
  {
    id: "oecd-navigator",
    name: "OECD.AI Policy Navigator",
    org: "OECD",
    url: "https://oecd.ai/en/dashboards/policy-initiatives",
    type: en ? "Interactive Tool" : "Herramienta Interactiva",
    description: {
      en: "Interactive database of 800+ national AI policy initiatives across 70+ countries. Filter by policy type, sector, and OECD AI Principle.",
      es: "Base de datos interactiva de 800+ iniciativas nacionales de política AI en 70+ países. Filtrar por tipo de política, sector y Principio AI de la OCDE."
    },
    useCase: {
      en: "Track how peer countries implement OECD AI Principles — benchmark CR's ANIA against comparable initiatives.",
      es: "Rastrear cómo países pares implementan Principios AI de la OCDE — comparar ANIA de CR contra iniciativas comparables."
    }
  },
  {
    id: "unesco-ram",
    name: "UNESCO Readiness Assessment Methodology (RAM)",
    org: "UNESCO",
    url: "https://www.unesco.org/en/artificial-intelligence/recommendation-ethics",
    type: en ? "Assessment Framework" : "Marco de Evaluación",
    description: {
      en: "UNESCO's Readiness Assessment Methodology for implementing the Recommendation on the Ethics of AI. Self-assessment tool for governments.",
      es: "Metodología de Evaluación de Preparación de UNESCO para implementar la Recomendación sobre Ética de AI. Herramienta de autoevaluación para gobiernos."
    },
    useCase: {
      en: "CR can use UNESCO RAM to systematically assess readiness for ethical AI deployment across all government sectors.",
      es: "CR puede usar RAM de UNESCO para evaluar sistemáticamente la preparación para despliegue AI ético en todos los sectores gubernamentales."
    }
  },
  {
    id: "eu-ai-act",
    name: "EU AI Act — Reference Framework",
    org: en ? "European Union" : "Unión Europea",
    url: "https://artificialintelligenceact.eu/",
    type: en ? "Legislation Reference" : "Referencia Legislativa",
    description: {
      en: "World's first comprehensive AI law: risk-based classification (unacceptable, high, limited, minimal risk), conformity assessments, governance structure.",
      es: "Primera ley AI comprensiva del mundo: clasificación basada en riesgo (inaceptable, alto, limitado, riesgo mínimo), evaluaciones de conformidad, estructura de gobernanza."
    },
    useCase: {
      en: "Reference model for CR's AI legislation — especially the risk-based approach which is being adopted by Brazil's PL 2,338.",
      es: "Modelo de referencia para legislación AI de CR — especialmente el enfoque basado en riesgo que está siendo adoptado por el PL 2,338 de Brasil."
    }
  },
  {
    id: "nist-rmf",
    name: "NIST AI Risk Management Framework",
    org: "NIST (US)",
    url: "https://airc.nist.gov/AI_RMF_Interactivity",
    type: en ? "Risk Framework" : "Marco de Riesgo",
    description: {
      en: "Voluntary AI risk management framework: Govern, Map, Measure, Manage functions. Includes AI RMF Playbook with actionable guidance.",
      es: "Marco voluntario de gestión de riesgos AI: funciones Gobernar, Mapear, Medir, Gestionar. Incluye Playbook del RMF AI con orientación accionable."
    },
    useCase: {
      en: "Practical risk management framework that CR institutions can adopt without waiting for legislation.",
      es: "Marco práctico de gestión de riesgos que instituciones de CR pueden adoptar sin esperar legislación."
    }
  },
  {
    id: "singapore-model",
    name: "Singapore Model AI Governance Framework",
    org: "IMDA Singapore",
    url: "https://www.pdpc.gov.sg/help-and-resources/2020/01/model-ai-governance-framework",
    type: en ? "Governance Model" : "Modelo de Gobernanza",
    description: {
      en: "Practical, sector-agnostic AI governance framework: internal governance, human oversight, stakeholder communication, operations management.",
      es: "Marco práctico de gobernanza AI, agnóstico de sector: gobernanza interna, supervisión humana, comunicación con partes interesadas, gestión operativa."
    },
    useCase: {
      en: "Singapore's framework is the most cited practical model for AI governance — suitable for CR's pragmatic approach.",
      es: "El marco de Singapur es el modelo práctico de gobernanza AI más citado — adecuado para el enfoque pragmático de CR."
    }
  },
  {
    id: "idb-fair-lac",
    name: "IDB fAIr LAC — Responsible AI in LATAM",
    org: en ? "Inter-American Development Bank" : "Banco Interamericano de Desarrollo",
    url: "https://fairlac.iadb.org/",
    type: en ? "Initiative" : "Iniciativa",
    description: {
      en: "IDB initiative promoting responsible AI in Latin America: toolkits, case studies, ethical AI deployment guidelines, bias auditing resources.",
      es: "Iniciativa del BID promoviendo AI responsable en América Latina: toolkits, estudios de caso, guías de despliegue AI ético, recursos de auditoría de sesgo."
    },
    useCase: {
      en: "LATAM-specific responsible AI resources that CR can directly apply — includes Spanish-language toolkits.",
      es: "Recursos de AI responsable específicos para LATAM que CR puede aplicar directamente — incluye toolkits en español."
    }
  }
];
