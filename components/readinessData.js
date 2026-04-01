/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — AI Readiness & Index Methodology
   Major AI readiness indices, ILIA rankings, index construction
   methodology, and Costa Rica's readiness profile.
   Sources: ILIA/CENIA, Oxford Insights, Portulans NRI, IESE CIMI,
   World Bank AIPI, COINr, SALib, PyMC
   ═══════════════════════════════════════════════════════════════ */

// ── AI Readiness Indices ──
export const READINESS_INDICES = (en) => [
  {
    id: "ilia",
    name: en ? "ILIA — Latin American AI Index" : "ILIA — Índice Latinoamericano de Inteligencia Artificial",
    org: "CENIA Chile",
    url: "https://indicelatam.cl/",
    year: 2025,
    edition: "3rd",
    countries: 19,
    scope: en ? "LATAM only" : "Solo LATAM",
    crRank: 7,
    crScore: 45.12,
    topCountry: { name: "Chile", score: 73.07 },
    methodology: {
      en: "Six dimension pillars aggregated via geometric mean. Data from 40+ indicators normalized 0-100. Peer-reviewed methodology.",
      es: "Seis pilares de dimensiones agregados por media geométrica. Datos de 40+ indicadores normalizados 0-100. Metodología revisada por pares."
    },
    dimensions: [
      {
        name: en ? "Enabling Factors" : "Factores Habilitantes",
        description: en ? "Infrastructure, connectivity, R&D investment, institutional capacity" : "Infraestructura, conectividad, inversión en I+D, capacidad institucional",
        crScore: 52.3,
        topScore: 78.4,
        topCountry: "Chile"
      },
      {
        name: en ? "Research & Development" : "Investigación y Desarrollo",
        description: en ? "AI publications, patents, researchers, academic programs" : "Publicaciones AI, patentes, investigadores, programas académicos",
        crScore: 28.7,
        topScore: 81.2,
        topCountry: "Brasil"
      },
      {
        name: en ? "Governance" : "Gobernanza",
        description: en ? "AI strategy, regulations, data protection, ethical frameworks" : "Estrategia AI, regulaciones, protección de datos, marcos éticos",
        crScore: 41.5,
        topScore: 72.8,
        topCountry: "Chile"
      },
      {
        name: en ? "Human Capital" : "Capital Humano",
        description: en ? "STEM graduates, digital skills, AI talent, education quality" : "Graduados STEM, habilidades digitales, talento AI, calidad educativa",
        crScore: 48.9,
        topScore: 69.5,
        topCountry: "Chile"
      },
      {
        name: en ? "Technology Development" : "Desarrollo Tecnológico",
        description: en ? "AI adoption in industry, startups, venture capital, tech infrastructure" : "Adopción AI en industria, startups, capital de riesgo, infraestructura tecnológica",
        crScore: 35.2,
        topScore: 68.3,
        topCountry: "Brasil"
      },
      {
        name: en ? "Social Impact" : "Impacto Social",
        description: en ? "Digital inclusion, AI benefits distribution, inequality reduction" : "Inclusión digital, distribución de beneficios AI, reducción de desigualdad",
        crScore: 54.8,
        topScore: 71.6,
        topCountry: "Uruguay"
      }
    ],
    crInsight: {
      en: "Costa Rica ranks 7th among 19 LATAM countries — strong in social impact and enabling factors but weak in R&D and technology development. The gap with Chile (1st) is 28 points, but CR outperforms several larger economies.",
      es: "Costa Rica se posiciona 7o entre 19 países LATAM — fuerte en impacto social y factores habilitantes pero débil en I+D y desarrollo tecnológico. La brecha con Chile (1o) es 28 puntos, pero CR supera a varias economías más grandes."
    }
  },
  {
    id: "oxford",
    name: en ? "Oxford Insights — Government AI Readiness Index" : "Oxford Insights — Índice de Preparación AI Gubernamental",
    org: "Oxford Insights + IDRC",
    url: "https://oxfordinsights.com/ai-readiness/ai-readiness-index/",
    year: 2024,
    edition: "6th",
    countries: 195,
    scope: en ? "Global" : "Global",
    crRank: 56,
    crScore: 58.14,
    topCountry: { name: en ? "United States" : "Estados Unidos", score: 85.67 },
    methodology: {
      en: "Three pillars (Government, Technology Sector, Data & Infrastructure) with 10 dimensions and 39 indicators. 0-100 scale.",
      es: "Tres pilares (Gobierno, Sector Tecnológico, Datos e Infraestructura) con 10 dimensiones y 39 indicadores. Escala 0-100."
    },
    dimensions: [
      {
        name: en ? "Government Pillar" : "Pilar Gobierno",
        description: en ? "Vision, governance & ethics, digital capacity, adaptability" : "Visión, gobernanza y ética, capacidad digital, adaptabilidad",
        crScore: 54.8,
        topScore: 89.2,
        topCountry: en ? "Singapore" : "Singapur"
      },
      {
        name: en ? "Technology Sector" : "Sector Tecnológico",
        description: en ? "Maturity, innovation capacity, human capital" : "Madurez, capacidad de innovación, capital humano",
        crScore: 48.3,
        topScore: 91.5,
        topCountry: en ? "United States" : "Estados Unidos"
      },
      {
        name: en ? "Data & Infrastructure" : "Datos e Infraestructura",
        description: en ? "Data availability, data representativeness, infrastructure" : "Disponibilidad de datos, representatividad de datos, infraestructura",
        crScore: 61.2,
        topScore: 87.8,
        topCountry: en ? "South Korea" : "Corea del Sur"
      }
    ],
    crInsight: {
      en: "CR ranks 56th globally, 5th in LATAM (behind Chile, Brazil, Uruguay, Colombia). Strongest in data & infrastructure, weakest in technology sector maturity.",
      es: "CR se posiciona 56o globalmente, 5o en LATAM (detrás de Chile, Brasil, Uruguay, Colombia). Más fuerte en datos e infraestructura, más débil en madurez del sector tecnológico."
    }
  },
  {
    id: "nri",
    name: en ? "Network Readiness Index (NRI)" : "Índice de Preparación de Red (NRI)",
    org: "Portulans Institute",
    url: "https://networkreadinessindex.org/",
    year: 2024,
    edition: "13th",
    countries: 131,
    scope: en ? "Global" : "Global",
    crRank: 53,
    crScore: 56.8,
    topCountry: { name: en ? "Singapore" : "Singapur", score: 83.2 },
    methodology: {
      en: "Four pillars (Technology, People, Governance, Impact) with 12 sub-pillars and 58 indicators. 0-100 scale.",
      es: "Cuatro pilares (Tecnología, Personas, Gobernanza, Impacto) con 12 sub-pilares y 58 indicadores. Escala 0-100."
    },
    dimensions: [
      {
        name: en ? "Technology" : "Tecnología",
        description: en ? "Access, content, future technologies" : "Acceso, contenido, tecnologías futuras",
        crScore: 51.3,
        topScore: 85.1,
        topCountry: en ? "Singapore" : "Singapur"
      },
      {
        name: en ? "People" : "Personas",
        description: en ? "Individuals, businesses, governments" : "Individuos, empresas, gobiernos",
        crScore: 53.7,
        topScore: 82.4,
        topCountry: en ? "Denmark" : "Dinamarca"
      },
      {
        name: en ? "Governance" : "Gobernanza",
        description: en ? "Trust, regulation, inclusion" : "Confianza, regulación, inclusión",
        crScore: 65.2,
        topScore: 88.7,
        topCountry: en ? "Finland" : "Finlandia"
      },
      {
        name: en ? "Impact" : "Impacto",
        description: en ? "Economy, quality of life, SDG contribution" : "Economía, calidad de vida, contribución ODS",
        crScore: 57.1,
        topScore: 79.6,
        topCountry: en ? "Switzerland" : "Suiza"
      }
    ],
    crInsight: {
      en: "CR ranks 53rd globally, typically 2nd-3rd in LATAM. Strongest in governance (trust, regulation) — weakest in technology access and future tech adoption.",
      es: "CR se posiciona 53o globalmente, típicamente 2o-3o en LATAM. Más fuerte en gobernanza (confianza, regulación) — más débil en acceso tecnológico y adopción de tecnología futura."
    }
  },
  {
    id: "cimi",
    name: en ? "IESE — Cities in Motion Index" : "IESE — Índice de Ciudades en Movimiento",
    org: "IESE Business School",
    url: "https://citiesinmotion.iese.edu/",
    year: 2024,
    edition: "10th",
    countries: 92,
    scope: en ? "City-level (183 cities)" : "Nivel ciudad (183 ciudades)",
    crRank: null,
    crScore: null,
    topCountry: { name: "London", score: 100 },
    methodology: {
      en: "Nine dimensions: economy, human capital, technology, environment, international projection, social cohesion, mobility, governance, urban planning.",
      es: "Nueve dimensiones: economía, capital humano, tecnología, ambiente, proyección internacional, cohesión social, movilidad, gobernanza, planificación urbana."
    },
    dimensions: [
      {
        name: en ? "Technology" : "Tecnología",
        description: en ? "Broadband, innovation, tech companies, patents" : "Banda ancha, innovación, empresas tech, patentes",
        crScore: null,
        topScore: 100,
        topCountry: "San Francisco"
      },
      {
        name: en ? "Human Capital" : "Capital Humano",
        description: en ? "Talent attraction, universities, business schools" : "Atracción de talento, universidades, escuelas de negocios",
        crScore: null,
        topScore: 100,
        topCountry: "Boston"
      }
    ],
    crInsight: {
      en: "San José included in select editions — ranks mid-tier for LATAM cities. Strong in governance, weak in technology infrastructure.",
      es: "San José incluida en ediciones selectas — se posiciona en nivel medio para ciudades LATAM. Fuerte en gobernanza, débil en infraestructura tecnológica."
    }
  },
  {
    id: "aipi",
    name: en ? "World Bank — AI Preparedness Index" : "Banco Mundial — Índice de Preparación AI",
    org: en ? "World Bank" : "Banco Mundial",
    url: "https://www.worldbank.org/en/publication/ai-preparedness-index",
    year: 2024,
    edition: "1st",
    countries: 195,
    scope: en ? "Global" : "Global",
    crRank: null,
    crScore: null,
    topCountry: { name: en ? "Singapore" : "Singapur", score: null },
    methodology: {
      en: "10 pillars measuring AI preparedness: innovation, economic fundamentals, digital infrastructure, human capital, labor market, governance, ethics, public engagement, financing, partnerships.",
      es: "10 pilares midiendo preparación AI: innovación, fundamentos económicos, infraestructura digital, capital humano, mercado laboral, gobernanza, ética, participación pública, financiamiento, alianzas."
    },
    dimensions: [],
    classification: {
      en: "Countries classified as: AI Leaders (top performers), AI Performers (good readiness), AI Overperformers (exceeding income-based expectations), AI Underperformers (below expectations).",
      es: "Países clasificados como: Líderes AI (mejores performers), AI Performers (buena preparación), AI Overperformers (excediendo expectativas basadas en ingreso), AI Underperformers (debajo de expectativas)."
    },
    crClassification: en ? "Overperformer" : "Sobreperformer",
    crInsight: {
      en: "Costa Rica classified as 'AI Overperformer' — performing better on AI readiness than expected for its income level. This is strategic validation: CR punches above its weight.",
      es: "Costa Rica clasificada como 'AI Overperformer' — rindiendo mejor en preparación AI de lo esperado para su nivel de ingreso. Esto es validación estratégica: CR rinde por encima de su peso."
    }
  }
];

// ── ILIA 2025 Full Rankings ──
export const ILIA_RANKINGS = (en) => ({
  title: en ? "ILIA 2025 — Latin American AI Index Rankings" : "ILIA 2025 — Rankings del Índice Latinoamericano de Inteligencia Artificial",
  source: "CENIA Chile — indicelatam.cl",
  year: 2025,
  edition: "3rd",
  methodology: {
    en: "19 LATAM countries scored across 6 dimensions with 40+ indicators. Geometric mean aggregation. Scale 0-100.",
    es: "19 países LATAM puntuados en 6 dimensiones con 40+ indicadores. Agregación por media geométrica. Escala 0-100."
  },

  rankings: [
    { rank: 1, country: "Chile", flag: "🇨🇱", score: 73.07, tier: en ? "Leader" : "Líder", color: "#10b981" },
    { rank: 2, country: "Brasil", flag: "🇧🇷", score: 69.30, tier: en ? "Leader" : "Líder", color: "#10b981" },
    { rank: 3, country: "Uruguay", flag: "🇺🇾", score: 64.98, tier: en ? "Advanced" : "Avanzado", color: "#3b82f6" },
    { rank: 4, country: "Argentina", flag: "🇦🇷", score: 55.77, tier: en ? "Advanced" : "Avanzado", color: "#3b82f6" },
    { rank: 5, country: "Colombia", flag: "🇨🇴", score: 52.64, tier: en ? "Developing" : "En Desarrollo", color: "#f59e0b" },
    { rank: 6, country: "México", flag: "🇲🇽", score: 51.40, tier: en ? "Developing" : "En Desarrollo", color: "#f59e0b" },
    { rank: 7, country: "Costa Rica", flag: "🇨🇷", score: 45.12, tier: en ? "Developing" : "En Desarrollo", color: "#f59e0b" },
    { rank: 8, country: "Panamá", flag: "🇵🇦", score: 42.85, tier: en ? "Developing" : "En Desarrollo", color: "#f59e0b" },
    { rank: 9, country: "Perú", flag: "🇵🇪", score: 41.33, tier: en ? "Developing" : "En Desarrollo", color: "#f59e0b" },
    { rank: 10, country: en ? "Rep. Dominicana" : "Rep. Dominicana", flag: "🇩🇴", score: 38.91, tier: en ? "Emerging" : "Emergente", color: "#f97316" },
    { rank: 11, country: "Ecuador", flag: "🇪🇨", score: 36.74, tier: en ? "Emerging" : "Emergente", color: "#f97316" },
    { rank: 12, country: "Paraguay", flag: "🇵🇾", score: 33.28, tier: en ? "Emerging" : "Emergente", color: "#f97316" },
    { rank: 13, country: "Bolivia", flag: "🇧🇴", score: 30.15, tier: en ? "Emerging" : "Emergente", color: "#f97316" },
    { rank: 14, country: "Trinidad y Tobago", flag: "🇹🇹", score: 29.42, tier: en ? "Emerging" : "Emergente", color: "#f97316" },
    { rank: 15, country: "Guatemala", flag: "🇬🇹", score: 27.88, tier: en ? "Early" : "Temprano", color: "#ef4444" },
    { rank: 16, country: "El Salvador", flag: "🇸🇻", score: 26.51, tier: en ? "Early" : "Temprano", color: "#ef4444" },
    { rank: 17, country: "Honduras", flag: "🇭🇳", score: 24.93, tier: en ? "Early" : "Temprano", color: "#ef4444" },
    { rank: 18, country: "Venezuela", flag: "🇻🇪", score: 22.17, tier: en ? "Early" : "Temprano", color: "#ef4444" },
    { rank: 19, country: "Nicaragua", flag: "🇳🇮", score: 19.84, tier: en ? "Early" : "Temprano", color: "#ef4444" }
  ],

  crHighlights: [
    {
      dimension: en ? "Social Impact" : "Impacto Social",
      rank: 4,
      insight: en ? "CR's universal healthcare, education, and democratic institutions drive strong social impact scores" : "La salud universal, educación e instituciones democráticas de CR impulsan fuertes puntajes de impacto social"
    },
    {
      dimension: en ? "Enabling Factors" : "Factores Habilitantes",
      rank: 5,
      insight: en ? "Good connectivity, institutional stability, and free zone ecosystem provide solid foundation" : "Buena conectividad, estabilidad institucional y ecosistema de zona franca proporcionan base sólida"
    },
    {
      dimension: en ? "Governance" : "Gobernanza",
      rank: 6,
      insight: en ? "ANIA strategy exists but lacks binding legislation and institutional enforcement mechanisms" : "Estrategia ANIA existe pero carece de legislación vinculante y mecanismos de aplicación institucional"
    },
    {
      dimension: en ? "Human Capital" : "Capital Humano",
      rank: 7,
      insight: en ? "Decent STEM base but insufficient AI-specific talent pipeline and training programs" : "Base STEM decente pero pipeline y programas de capacitación de talento AI específico insuficientes"
    },
    {
      dimension: en ? "R&D" : "I+D",
      rank: 10,
      insight: en ? "Weak AI research output — 0.39% GDP R&D investment limits academic AI capacity" : "Producción débil de investigación AI — 0.39% PIB inversión en I+D limita capacidad académica AI"
    },
    {
      dimension: en ? "Technology Development" : "Desarrollo Tecnológico",
      rank: 9,
      insight: en ? "Limited AI startup ecosystem and VC funding compared to LATAM leaders" : "Ecosistema de startups AI y financiamiento VC limitado comparado con líderes LATAM"
    }
  ]
});

// ── Index Methodology ──
export const INDEX_METHODOLOGY = (en) => ({
  title: en ? "Composite Index Construction Methodology" : "Metodología de Construcción de Índice Compuesto",
  description: {
    en: "The Colibrii Labs AI Observatory uses best-practice composite index methodology following OECD/JRC guidelines. This section documents the statistical approaches for constructing, validating, and presenting multi-dimensional AI readiness assessments.",
    es: "El Observatorio AI de Colibrii Labs usa metodología de índice compuesto de mejores prácticas siguiendo guías OCDE/JRC. Esta sección documenta los enfoques estadísticos para construir, validar y presentar evaluaciones multidimensionales de preparación AI."
  },

  tools: [
    {
      name: "COINr",
      fullName: "Composite Indicator Development in R",
      url: "https://bluefoxr.github.io/COINr/",
      language: "R",
      description: {
        en: "R package for composite indicator construction: data treatment (missing data, outliers), normalization (min-max, z-score, rank), weighting (equal, PCA, budget allocation), aggregation (arithmetic, geometric, multi-criteria), sensitivity analysis.",
        es: "Paquete R para construcción de indicadores compuestos: tratamiento de datos (datos faltantes, valores atípicos), normalización (min-max, z-score, ranking), ponderación (igual, PCA, asignación presupuestaria), agregación (aritmética, geométrica, multi-criterio), análisis de sensibilidad."
      },
      capabilities: [
        en ? "Data imputation (EM algorithm, k-NN)" : "Imputación de datos (algoritmo EM, k-NN)",
        en ? "Outlier detection and treatment" : "Detección y tratamiento de valores atípicos",
        en ? "Multiple normalization methods" : "Múltiples métodos de normalización",
        en ? "Weighting via PCA, expert survey, DEA" : "Ponderación vía PCA, encuesta de expertos, DEA",
        en ? "Aggregation with compensability control" : "Agregación con control de compensabilidad",
        en ? "Robustness and sensitivity analysis" : "Análisis de robustez y sensibilidad"
      ]
    },
    {
      name: "SALib",
      fullName: "Sensitivity Analysis Library (Python)",
      url: "https://salib.readthedocs.io/",
      language: "Python",
      description: {
        en: "Python library for sensitivity analysis: Sobol indices, Morris screening, FAST, Delta-MIM, RBD-FAST. Determines which inputs most influence composite index outputs.",
        es: "Librería Python para análisis de sensibilidad: índices Sobol, screening Morris, FAST, Delta-MIM, RBD-FAST. Determina cuáles insumos más influyen en las salidas del índice compuesto."
      },
      capabilities: [
        en ? "Sobol variance-based global sensitivity" : "Sensibilidad global basada en varianza Sobol",
        en ? "Morris elementary effects screening" : "Screening de efectos elementales Morris",
        en ? "FAST (Fourier Amplitude Sensitivity Test)" : "FAST (Prueba de Sensibilidad de Amplitud de Fourier)",
        en ? "Identifies which indicators drive rankings most" : "Identifica cuáles indicadores más impulsan los rankings"
      ]
    },
    {
      name: "PyMC",
      fullName: "Bayesian Modeling in Python",
      url: "https://www.pymc.io/",
      language: "Python",
      description: {
        en: "Probabilistic programming for Bayesian uncertainty quantification in composite indices. Enables credible intervals instead of point estimates for country rankings.",
        es: "Programación probabilística para cuantificación de incertidumbre bayesiana en índices compuestos. Habilita intervalos creíbles en lugar de estimaciones puntuales para rankings de países."
      },
      capabilities: [
        en ? "Bayesian parameter estimation" : "Estimación bayesiana de parámetros",
        en ? "Uncertainty quantification on rankings" : "Cuantificación de incertidumbre en rankings",
        en ? "Missing data imputation with uncertainty" : "Imputación de datos faltantes con incertidumbre",
        en ? "Hierarchical models for regional grouping" : "Modelos jerárquicos para agrupación regional"
      ]
    }
  ],

  methodologySteps: [
    {
      step: 1,
      name: en ? "Theoretical Framework" : "Marco Teórico",
      description: en ? "Define AI readiness dimensions based on established frameworks (OECD, ILIA, Oxford Insights)" : "Definir dimensiones de preparación AI basadas en marcos establecidos (OCDE, ILIA, Oxford Insights)"
    },
    {
      step: 2,
      name: en ? "Data Selection" : "Selección de Datos",
      description: en ? "Select indicators with 80%+ country coverage, annual updates, and clear causal link to AI readiness" : "Seleccionar indicadores con 80%+ cobertura de países, actualizaciones anuales y vínculo causal claro con preparación AI"
    },
    {
      step: 3,
      name: en ? "Data Treatment" : "Tratamiento de Datos",
      description: en ? "Handle missing values (EM imputation), detect outliers (Grubbs test), check multicollinearity" : "Manejar valores faltantes (imputación EM), detectar valores atípicos (prueba de Grubbs), verificar multicolinealidad"
    },
    {
      step: 4,
      name: en ? "Normalization" : "Normalización",
      description: en ? "Apply min-max scaling (0-100) to make indicators comparable. Test robustness with z-score and rank alternatives" : "Aplicar escalamiento min-max (0-100) para hacer indicadores comparables. Probar robustez con alternativas z-score y ranking"
    },
    {
      step: 5,
      name: en ? "Weighting" : "Ponderación",
      description: en ? "Default: equal weighting within dimensions. Validate with PCA-derived weights and expert panel allocation" : "Predeterminado: ponderación igual dentro de dimensiones. Validar con ponderaciones derivadas de PCA y asignación de panel de expertos"
    },
    {
      step: 6,
      name: en ? "Aggregation" : "Agregación",
      description: en ? "Geometric mean aggregation (prevents full compensability). Compare with arithmetic mean as robustness check" : "Agregación por media geométrica (previene compensabilidad total). Comparar con media aritmética como verificación de robustez"
    },
    {
      step: 7,
      name: en ? "Sensitivity Analysis" : "Análisis de Sensibilidad",
      description: en ? "Run SALib Sobol analysis to determine which indicators/weights most affect country rankings. Report confidence intervals" : "Ejecutar análisis Sobol con SALib para determinar cuáles indicadores/ponderaciones más afectan rankings de países. Reportar intervalos de confianza"
    },
    {
      step: 8,
      name: en ? "Uncertainty Quantification" : "Cuantificación de Incertidumbre",
      description: en ? "Apply PyMC Bayesian model to generate credible intervals for rankings — prevents over-interpreting small score differences" : "Aplicar modelo bayesiano PyMC para generar intervalos creíbles para rankings — previene sobreinterpretar diferencias pequeñas de puntaje"
    }
  ]
});

// ── Costa Rica Readiness Profile ──
export const CR_READINESS_PROFILE = (en) => ({
  title: en ? "Costa Rica — AI Readiness Profile" : "Costa Rica — Perfil de Preparación AI",
  lastUpdated: "2025-Q1",

  overallAssessment: {
    en: "Costa Rica is an 'AI Overperformer' — achieving higher AI readiness scores than expected for its income level. Strong democratic institutions, high human development, near-universal renewable energy, and strategic geographic position create a unique value proposition. However, critical gaps in AI-specific legislation, R&D investment, and talent pipeline must be addressed to maintain momentum.",
    es: "Costa Rica es un 'AI Overperformer' — logrando puntajes de preparación AI más altos de lo esperado para su nivel de ingreso. Fuertes instituciones democráticas, alto desarrollo humano, energía renovable casi universal y posición geográfica estratégica crean una propuesta de valor única. Sin embargo, brechas críticas en legislación específica AI, inversión en I+D y pipeline de talento deben abordarse para mantener impulso."
  },

  indexPositions: [
    { index: "ILIA 2025", rank: en ? "7th / 19 LATAM" : "7o / 19 LATAM", score: "45.12/100", trend: "stable" },
    { index: "Oxford Insights 2024", rank: en ? "56th / 195 global" : "56o / 195 global", score: "58.14/100", trend: "up" },
    { index: "Network Readiness 2024", rank: en ? "53rd / 131 global" : "53o / 131 global", score: "56.8/100", trend: "up" },
    { index: "World Bank AIPI", rank: en ? "Overperformer" : "Sobreperformer", score: "N/A", trend: "up" },
    { index: "UN E-Gov Index 2024", rank: en ? "65th / 193 global" : "65o / 193 global", score: "0.74/1.0", trend: "stable" },
    { index: "Freedom House 2024", rank: en ? "18th / 210 global" : "18o / 210 global", score: "91/100", trend: "stable" }
  ],

  strengths: [
    {
      area: en ? "Democratic Governance" : "Gobernanza Democrática",
      score: 9,
      maxScore: 10,
      detail: {
        en: "Ranked 14th globally in V-Dem democracy index, 18th in Freedom House. No army since 1948. Longest unbroken democracy in LATAM.",
        es: "Posicionado 14o globalmente en índice de democracia V-Dem, 18o en Freedom House. Sin ejército desde 1948. Democracia ininterrumpida más larga en LATAM."
      }
    },
    {
      area: en ? "Renewable Energy" : "Energía Renovable",
      score: 10,
      maxScore: 10,
      detail: {
        en: "98.6% renewable electricity. Grid carbon intensity ~20 gCO₂/kWh (global avg: 436). Unique 'Green AI' competitive advantage.",
        es: "98.6% electricidad renovable. Intensidad de carbono de la red ~20 gCO₂/kWh (promedio global: 436). Ventaja competitiva única de 'AI Verde'."
      }
    },
    {
      area: en ? "Human Development" : "Desarrollo Humano",
      score: 8,
      maxScore: 10,
      detail: {
        en: "HDI 0.806 (Very High). Universal healthcare (CCSS). 97.9% literacy. Life expectancy 80.3 years.",
        es: "IDH 0.806 (Muy Alto). Salud universal (CCSS). 97.9% alfabetización. Esperanza de vida 80.3 años."
      }
    },
    {
      area: en ? "Data Protection Foundation" : "Fundamento de Protección de Datos",
      score: 7,
      maxScore: 10,
      detail: {
        en: "Ley 8968 (2011) + PRODHAB provide baseline personal data protection. Habeas data constitutional right.",
        es: "Ley 8968 (2011) + PRODHAB proveen protección de datos personales de línea base. Habeas data como derecho constitucional."
      }
    },
    {
      area: en ? "FDI Ecosystem" : "Ecosistema IED",
      score: 8,
      maxScore: 10,
      detail: {
        en: "350+ multinational companies. Free zone regime: 0% tax for 8+ years. Intel, Amazon, HP, Accenture, IBM presence.",
        es: "350+ empresas multinacionales. Régimen de zona franca: 0% impuestos por 8+ años. Presencia de Intel, Amazon, HP, Accenture, IBM."
      }
    },
    {
      area: en ? "Biodiversity & Environment Brand" : "Marca de Biodiversidad y Ambiente",
      score: 9,
      maxScore: 10,
      detail: {
        en: "6% of world's biodiversity on 0.03% of land. Reversed deforestation. Carbon neutrality commitment. Strong green brand globally.",
        es: "6% de biodiversidad mundial en 0.03% del territorio. Revirtió deforestación. Compromiso de carbono neutralidad. Fuerte marca verde globalmente."
      }
    }
  ],

  weaknesses: [
    {
      area: en ? "AI Legislation" : "Legislación AI",
      score: 2,
      maxScore: 10,
      gap: en ? "Critical" : "Crítica",
      detail: {
        en: "No AI-specific law. ANIA strategy drafted but not binding. Expediente 23.506 introduced but not advanced. Peru (Ley 31,814) and Brazil (PL 2,338) are ahead.",
        es: "Sin ley específica AI. Estrategia ANIA redactada pero no vinculante. Expediente 23.506 introducido pero sin avance. Perú (Ley 31,814) y Brasil (PL 2,338) están adelante."
      }
    },
    {
      area: en ? "R&D Investment" : "Inversión en I+D",
      score: 2,
      maxScore: 10,
      gap: en ? "Critical" : "Crítica",
      detail: {
        en: "R&D at 0.39% GDP — OECD average is 2.7%. Chile invests 0.36% but has dedicated CENIA ($17M). CR has no dedicated AI research funding.",
        es: "I+D en 0.39% PIB — promedio OCDE es 2.7%. Chile invierte 0.36% pero tiene CENIA dedicado ($17M). CR no tiene financiamiento dedicado para investigación AI."
      }
    },
    {
      area: en ? "AI Talent Pipeline" : "Pipeline de Talento AI",
      score: 3,
      maxScore: 10,
      gap: en ? "Critical" : "Crítica",
      detail: {
        en: "No dedicated AI/ML degree programs at public universities. ~2,800 IT graduates/year but few with AI specialization. Brain drain to US/EU tech companies.",
        es: "Sin programas de grado dedicados AI/ML en universidades públicas. ~2,800 graduados TI/año pero pocos con especialización AI. Fuga de cerebros a empresas tech de EE.UU./UE."
      }
    },
    {
      area: en ? "Cybersecurity Maturity" : "Madurez de Ciberseguridad",
      score: 3,
      maxScore: 10,
      gap: en ? "High" : "Alta",
      detail: {
        en: "HIVE ransomware attack on CCSS (2022) exposed critical vulnerabilities. CSIRT-CR understaffed. No mandatory breach reporting.",
        es: "Ataque ransomware HIVE a CCSS (2022) expuso vulnerabilidades críticas. CSIRT-CR con personal insuficiente. Sin reporte obligatorio de brechas."
      }
    },
    {
      area: en ? "AI Startup Ecosystem" : "Ecosistema de Startups AI",
      score: 3,
      maxScore: 10,
      gap: en ? "High" : "Alta",
      detail: {
        en: "Limited VC funding for AI startups. No major AI-focused accelerators. Ecosystem oriented toward services rather than product innovation.",
        es: "Financiamiento VC limitado para startups AI. Sin aceleradoras enfocadas en AI importantes. Ecosistema orientado a servicios más que innovación de producto."
      }
    },
    {
      area: en ? "Digital Divide" : "Brecha Digital",
      score: 4,
      maxScore: 10,
      gap: en ? "Moderate" : "Moderada",
      detail: {
        en: "22% of schools without internet. Rural broadband quality significantly lower. Coastal/indigenous regions underserved.",
        es: "22% de escuelas sin internet. Calidad de banda ancha rural significativamente menor. Regiones costeras/indígenas desatendidas."
      }
    }
  ],

  strategicPriorities: [
    {
      priority: 1,
      action: en ? "Pass AI Framework Legislation" : "Aprobar Legislación Marco de AI",
      timeline: en ? "2025-2026" : "2025-2026",
      detail: {
        en: "Advance Expediente 23.506 or develop new risk-based AI framework inspired by EU AI Act and Brazil's PL 2,338. Establish AI regulatory authority.",
        es: "Avanzar Expediente 23.506 o desarrollar nuevo marco AI basado en riesgo inspirado en Ley AI de la UE y PL 2,338 de Brasil. Establecer autoridad regulatoria de AI."
      }
    },
    {
      priority: 2,
      action: en ? "Create National AI Research Center" : "Crear Centro Nacional de Investigación AI",
      timeline: en ? "2025-2027" : "2025-2027",
      detail: {
        en: "Follow Chile's CENIA model. Partner with UCR, TEC, UNA. Seek IDB/World Bank co-financing. Target $5-10M initial investment.",
        es: "Seguir modelo CENIA de Chile. Asociarse con UCR, TEC, UNA. Buscar co-financiamiento BID/Banco Mundial. Meta de $5-10M de inversión inicial."
      }
    },
    {
      priority: 3,
      action: en ? "Launch 'Green AI Hub' Data Center Strategy" : "Lanzar Estrategia de 'Hub AI Verde' de Centros de Datos",
      timeline: en ? "2025-2028" : "2025-2028",
      detail: {
        en: "Market CR's 98.6% renewable grid as premium AI compute location. Create competitive industrial electricity rates. Attract 2-3 hyperscale facilities.",
        es: "Comercializar red 98.6% renovable de CR como ubicación premium de computación AI. Crear tarifas eléctricas industriales competitivas. Atraer 2-3 instalaciones hyperscale."
      }
    },
    {
      priority: 4,
      action: en ? "Implement UNESCO AI Competency Frameworks" : "Implementar Marcos de Competencias AI de UNESCO",
      timeline: en ? "2025-2027" : "2025-2027",
      detail: {
        en: "Integrate 12 student + 15 teacher AI competencies into MEP curriculum. Train 10,000+ teachers. Target 1% population AI literacy (52,000).",
        es: "Integrar 12 competencias AI estudiantiles + 15 docentes en currículo MEP. Capacitar 10,000+ docentes. Meta de 1% de población con alfabetización AI (52,000)."
      }
    },
    {
      priority: 5,
      action: en ? "Strengthen Cybersecurity Infrastructure" : "Fortalecer Infraestructura de Ciberseguridad",
      timeline: en ? "2025-2026" : "2025-2026",
      detail: {
        en: "Quadruple CSIRT-CR staffing. Mandate breach reporting. Implement NIST CSF across critical infrastructure. Post-HIVE lessons learned.",
        es: "Cuadruplicar personal de CSIRT-CR. Mandatar reporte de brechas. Implementar NIST CSF en infraestructura crítica. Lecciones aprendidas post-HIVE."
      }
    }
  ]
});
