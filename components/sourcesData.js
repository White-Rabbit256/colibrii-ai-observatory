/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Master Data Sources Registry
   200+ data sources organized by domain, with API types,
   access info, integration phase, and bilingual descriptions.
   Powers the Data Sources Explorer UI and integration roadmap.
   ═══════════════════════════════════════════════════════════════ */

export const DATA_SOURCES = (en) => [

  // ─────────────────────────────────────────────────────────────
  // COSTA RICA GOVERNMENT (22 sources)
  // ─────────────────────────────────────────────────────────────
  {
    id: "cr-bccr",
    name: "BCCR — Banco Central de Costa Rica",
    domain: en ? "Costa Rica Government" : "Gobierno de Costa Rica",
    url: "https://gee.bccr.fi.cr/indicadoreseconomicos/",
    apiType: "REST",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "critical",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "Central bank economic indicators: GDP, inflation, exchange rates, monetary policy, balance of payments. REST API with JSON responses.",
      es: "Indicadores económicos del banco central: PIB, inflación, tipo de cambio, política monetaria, balanza de pagos. API REST con respuestas JSON."
    },
    crRelevance: {
      en: "Primary source for all macroeconomic data. Essential for AI economic impact modeling.",
      es: "Fuente primaria de todos los datos macroeconómicos. Esencial para modelado de impacto económico de AI."
    }
  },
  {
    id: "cr-inec",
    name: "INEC — Instituto Nacional de Estadística y Censos",
    domain: en ? "Costa Rica Government" : "Gobierno de Costa Rica",
    url: "https://www.inec.cr/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "critical",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "National statistics: census, employment surveys (ECE), poverty (ENAHO), demographic projections, CPI, business directory.",
      es: "Estadísticas nacionales: censos, encuestas de empleo (ECE), pobreza (ENAHO), proyecciones demográficas, IPC, directorio de empresas."
    },
    crRelevance: {
      en: "Definitive source for labor market data, digital divide metrics, and demographic baselines for AI readiness.",
      es: "Fuente definitiva para datos del mercado laboral, métricas de brecha digital y líneas base demográficas para preparación AI."
    }
  },
  {
    id: "cr-poder-judicial",
    name: "Poder Judicial — Estadísticas Judiciales",
    domain: en ? "Costa Rica Government" : "Gobierno de Costa Rica",
    url: "https://www.poder-judicial.go.cr/planificacion/index.php/estadisticas",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Judicial statistics: caseloads, resolution times, cybercrime reports (OIJ), domestic violence stats. PDF and Excel downloads.",
      es: "Estadísticas judiciales: cargas de trabajo, tiempos de resolución, denuncias de ciberdelitos (OIJ), estadísticas de violencia doméstica."
    },
    crRelevance: {
      en: "Critical for cybercrime trend analysis and AI-assisted justice system modernization tracking.",
      es: "Crítico para análisis de tendencias de ciberdelito y seguimiento de modernización del sistema judicial asistido por AI."
    }
  },
  {
    id: "cr-cgr",
    name: "CGR — Contraloría General de la República",
    domain: en ? "Costa Rica Government" : "Gobierno de Costa Rica",
    url: "https://www.cgr.go.cr/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "National audit office: public expenditure reports, budget execution, institutional audits, procurement data.",
      es: "Contraloría nacional: informes de gasto público, ejecución presupuestaria, auditorías institucionales, datos de contratación."
    },
    crRelevance: {
      en: "Tracks government technology spending and digital transformation budget execution.",
      es: "Rastrea gasto gubernamental en tecnología y ejecución presupuestaria de transformación digital."
    }
  },
  {
    id: "cr-procomer",
    name: "PROCOMER — Promotora del Comercio Exterior",
    domain: en ? "Costa Rica Government" : "Gobierno de Costa Rica",
    url: "https://www.procomer.com/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "critical",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "Export and FDI data: trade statistics, free zone performance, services exports, investment attraction metrics.",
      es: "Datos de exportación e IED: estadísticas comerciales, desempeño de zonas francas, exportaciones de servicios, métricas de atracción de inversión."
    },
    crRelevance: {
      en: "Essential for tracking tech services exports and nearshoring competitiveness metrics.",
      es: "Esencial para rastrear exportaciones de servicios tech y métricas de competitividad nearshoring."
    }
  },
  {
    id: "cr-sutel",
    name: "SUTEL — Superintendencia de Telecomunicaciones",
    domain: en ? "Costa Rica Government" : "Gobierno de Costa Rica",
    url: "https://www.sutel.go.cr/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "critical",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "Telecom regulator: broadband penetration, mobile subscriptions, internet speed data, spectrum allocation, digital divide metrics.",
      es: "Regulador de telecomunicaciones: penetración de banda ancha, suscripciones móviles, velocidad de internet, asignación de espectro, métricas de brecha digital."
    },
    crRelevance: {
      en: "Definitive source for Costa Rica's digital infrastructure readiness — foundational for AI deployment capacity.",
      es: "Fuente definitiva para preparación de infraestructura digital de CR — fundamental para capacidad de despliegue AI."
    }
  },
  {
    id: "cr-micitt",
    name: "MICITT — Ministerio de Ciencia, Tecnología y Telecomunicaciones",
    domain: en ? "Costa Rica Government" : "Gobierno de Costa Rica",
    url: "https://www.micitt.go.cr/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "critical",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "Science & technology ministry: national AI strategy (ANIA), R&D indicators, CSIRT-CR cybersecurity reports, innovation policy.",
      es: "Ministerio de ciencia y tecnología: estrategia nacional AI (ANIA), indicadores de I+D, reportes de ciberseguridad CSIRT-CR, política de innovación."
    },
    crRelevance: {
      en: "Official source for Costa Rica's AI strategy, cybersecurity governance, and innovation ecosystem metrics.",
      es: "Fuente oficial para la estrategia AI de Costa Rica, gobernanza de ciberseguridad y métricas del ecosistema de innovación."
    }
  },
  {
    id: "cr-sugef",
    name: "SUGEF — Superintendencia General de Entidades Financieras",
    domain: en ? "Costa Rica Government" : "Gobierno de Costa Rica",
    url: "https://www.sugef.fi.cr/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "critical",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "Financial regulator: bank performance data, credit statistics, financial inclusion metrics, AML compliance reports.",
      es: "Regulador financiero: datos de desempeño bancario, estadísticas de crédito, métricas de inclusión financiera, reportes de cumplimiento AML."
    },
    crRelevance: {
      en: "Essential for banking AI risk analysis and fintech regulatory landscape assessment.",
      es: "Esencial para análisis de riesgo AI bancario y evaluación del panorama regulatorio fintech."
    }
  },
  {
    id: "cr-prodhab",
    name: "PRODHAB — Agencia de Protección de Datos de los Habitantes",
    domain: en ? "Costa Rica Government" : "Gobierno de Costa Rica",
    url: "https://www.prodhab.go.cr/",
    apiType: "Web scrape",
    free: true,
    authRequired: false,
    complexity: "high",
    relevance: "critical",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Data protection authority: registered databases, enforcement actions, data protection guidelines, complaint statistics.",
      es: "Autoridad de protección de datos: bases de datos registradas, acciones de cumplimiento, guías de protección de datos, estadísticas de denuncias."
    },
    crRelevance: {
      en: "Key institution for AI data governance — tracks personal data handling compliance under Ley 8968.",
      es: "Institución clave para gobernanza de datos AI — rastrea cumplimiento de manejo de datos personales bajo Ley 8968."
    }
  },
  {
    id: "cr-conare",
    name: "CONARE — Consejo Nacional de Rectores",
    domain: en ? "Costa Rica Government" : "Gobierno de Costa Rica",
    url: "https://www.conare.ac.cr/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "University council: STEM graduate statistics, research output, university enrollment data, higher education indicators (PEN).",
      es: "Consejo de rectores: estadísticas de graduados STEM, producción investigativa, datos de matrícula universitaria, indicadores de educación superior (PEN)."
    },
    crRelevance: {
      en: "Tracks AI talent pipeline — STEM graduates, computer science enrollment, and research capacity.",
      es: "Rastrea el pipeline de talento AI — graduados STEM, matrícula en ciencias de la computación y capacidad investigativa."
    }
  },
  {
    id: "cr-mep",
    name: "MEP — Ministerio de Educación Pública",
    domain: en ? "Costa Rica Government" : "Gobierno de Costa Rica",
    url: "https://www.mep.go.cr/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Education ministry: K-12 statistics, digital literacy programs, school connectivity data, STEAM curriculum adoption.",
      es: "Ministerio de educación: estadísticas K-12, programas de alfabetización digital, datos de conectividad escolar, adopción de currículo STEAM."
    },
    crRelevance: {
      en: "Essential for tracking AI literacy integration in education and future workforce preparation.",
      es: "Esencial para rastrear integración de alfabetización AI en educación y preparación de fuerza laboral futura."
    }
  },
  {
    id: "cr-fonatel",
    name: "FONATEL — Fondo Nacional de Telecomunicaciones",
    domain: en ? "Costa Rica Government" : "Gobierno de Costa Rica",
    url: "https://www.sutel.go.cr/fonatel",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 3,
    description: {
      en: "Telecom universal access fund: CEN-CINAI connectivity, rural broadband projects, digital inclusion investments.",
      es: "Fondo de acceso universal de telecomunicaciones: conectividad CEN-CINAI, proyectos de banda ancha rural, inversiones en inclusión digital."
    },
    crRelevance: {
      en: "Tracks efforts to close digital divide — prerequisite for equitable AI access.",
      es: "Rastrea esfuerzos para cerrar la brecha digital — prerrequisito para acceso equitativo a AI."
    }
  },
  {
    id: "cr-cinde",
    name: "CINDE — Coalición Costarricense de Iniciativas de Desarrollo",
    domain: en ? "Costa Rica Government" : "Gobierno de Costa Rica",
    url: "https://www.cinde.org/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Investment promotion agency: FDI attraction data, tech sector reports, multinational expansion tracking, talent assessments.",
      es: "Agencia de promoción de inversiones: datos de atracción de IED, informes del sector tech, seguimiento de expansión multinacional, evaluaciones de talento."
    },
    crRelevance: {
      en: "Tracks AI-related FDI and tech company presence — key for understanding CR's position in global AI value chains.",
      es: "Rastrea IED relacionada con AI y presencia de empresas tech — clave para entender posición de CR en cadenas de valor AI globales."
    }
  },
  {
    id: "cr-sinabi",
    name: "SINABI — Sistema Nacional de Bibliotecas",
    domain: en ? "Costa Rica Government" : "Gobierno de Costa Rica",
    url: "https://www.sinabi.go.cr/",
    apiType: "Web scrape",
    free: true,
    authRequired: false,
    complexity: "high",
    relevance: "medium",
    currentlyIntegrated: false,
    phase: 4,
    description: {
      en: "National library system: digital literacy programs, public access computing availability, community technology access.",
      es: "Sistema nacional de bibliotecas: programas de alfabetización digital, disponibilidad de computación de acceso público, acceso comunitario a tecnología."
    },
    crRelevance: {
      en: "Indicator of public AI/digital literacy infrastructure at the community level.",
      es: "Indicador de infraestructura pública de alfabetización AI/digital a nivel comunitario."
    }
  },
  {
    id: "cr-conapdis",
    name: "CONAPDIS — Consejo Nacional de Personas con Discapacidad",
    domain: en ? "Costa Rica Government" : "Gobierno de Costa Rica",
    url: "https://www.conapdis.go.cr/",
    apiType: "Web scrape",
    free: true,
    authRequired: false,
    complexity: "high",
    relevance: "medium",
    currentlyIntegrated: false,
    phase: 3,
    description: {
      en: "Disability council: accessibility data, assistive technology adoption, inclusive design compliance statistics.",
      es: "Consejo de discapacidad: datos de accesibilidad, adopción de tecnología asistiva, estadísticas de cumplimiento de diseño inclusivo."
    },
    crRelevance: {
      en: "AI accessibility and inclusive design metrics — ensures AI benefits reach persons with disabilities.",
      es: "Métricas de accesibilidad AI y diseño inclusivo — asegura que beneficios AI lleguen a personas con discapacidad."
    }
  },
  {
    id: "cr-sinac",
    name: "SINAC — Sistema Nacional de Áreas de Conservación",
    domain: en ? "Costa Rica Government" : "Gobierno de Costa Rica",
    url: "https://www.sinac.go.cr/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 3,
    description: {
      en: "Conservation system: biodiversity data, protected area management, deforestation monitoring, carbon sequestration data.",
      es: "Sistema de conservación: datos de biodiversidad, gestión de áreas protegidas, monitoreo de deforestación, datos de captura de carbono."
    },
    crRelevance: {
      en: "AI for environmental monitoring — leverages CR's biodiversity leadership and green brand.",
      es: "AI para monitoreo ambiental — aprovecha liderazgo en biodiversidad y marca verde de CR."
    }
  },
  {
    id: "cr-ice",
    name: "ICE — Instituto Costarricense de Electricidad",
    domain: en ? "Costa Rica Government" : "Gobierno de Costa Rica",
    url: "https://www.grupoice.com/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "State electric utility: energy generation mix, renewable capacity, grid reliability, data center energy pricing.",
      es: "Empresa eléctrica estatal: mezcla de generación energética, capacidad renovable, confiabilidad de la red, precios de energía para centros de datos."
    },
    crRelevance: {
      en: "CR's 98.6% renewable energy is a major competitive advantage for sustainable AI data centers.",
      es: "98.6% de energía renovable de CR es ventaja competitiva mayor para centros de datos AI sostenibles."
    }
  },
  {
    id: "cr-ccss",
    name: "CCSS — Caja Costarricense de Seguro Social",
    domain: en ? "Costa Rica Government" : "Gobierno de Costa Rica",
    url: "https://www.ccss.sa.cr/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "high",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Social security: EDUS health records, hospital performance, epidemiological data, healthcare infrastructure capacity.",
      es: "Seguro social: registros de salud EDUS, desempeño hospitalario, datos epidemiológicos, capacidad de infraestructura de salud."
    },
    crRelevance: {
      en: "Largest health data repository in CR — critical for health AI deployment and post-HIVE cybersecurity assessment.",
      es: "Mayor repositorio de datos de salud en CR — crítico para despliegue de AI en salud y evaluación de ciberseguridad post-HIVE."
    }
  },
  {
    id: "cr-comex",
    name: "COMEX — Ministerio de Comercio Exterior",
    domain: en ? "Costa Rica Government" : "Gobierno de Costa Rica",
    url: "https://www.comex.go.cr/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Foreign trade ministry: trade agreements, digital trade provisions, cross-border data flow policies.",
      es: "Ministerio de comercio exterior: acuerdos comerciales, provisiones de comercio digital, políticas de flujo de datos transfronterizos."
    },
    crRelevance: {
      en: "Digital trade provisions in FTAs directly impact AI data governance and cross-border AI services.",
      es: "Provisiones de comercio digital en TLCs impactan directamente gobernanza de datos AI y servicios AI transfronterizos."
    }
  },
  {
    id: "cr-aresep",
    name: "ARESEP — Autoridad Reguladora de los Servicios Públicos",
    domain: en ? "Costa Rica Government" : "Gobierno de Costa Rica",
    url: "https://aresep.go.cr/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "medium",
    currentlyIntegrated: false,
    phase: 3,
    description: {
      en: "Public services regulator: electricity tariffs, water rates, transportation data. Relevant for AI infrastructure costs.",
      es: "Regulador de servicios públicos: tarifas eléctricas, tarifas de agua, datos de transporte. Relevante para costos de infraestructura AI."
    },
    crRelevance: {
      en: "Energy pricing directly affects AI compute cost competitiveness for data center operations.",
      es: "Precios de energía afectan directamente competitividad de costos de computación AI para operaciones de centros de datos."
    }
  },
  {
    id: "cr-dgme",
    name: "DGME — Dirección General de Migración y Extranjería",
    domain: en ? "Costa Rica Government" : "Gobierno de Costa Rica",
    url: "https://www.migracion.go.cr/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "high",
    relevance: "medium",
    currentlyIntegrated: false,
    phase: 3,
    description: {
      en: "Immigration authority: work permit data, tech talent visa programs, foreign professional registration.",
      es: "Autoridad migratoria: datos de permisos de trabajo, programas de visa para talento tech, registro de profesionales extranjeros."
    },
    crRelevance: {
      en: "Tracks AI talent immigration flows — key for assessing tech workforce augmentation capacity.",
      es: "Rastrea flujos migratorios de talento AI — clave para evaluar capacidad de aumento de fuerza laboral tech."
    }
  },
  {
    id: "cr-sugeval",
    name: "SUGEVAL — Superintendencia General de Valores",
    domain: en ? "Costa Rica Government" : "Gobierno de Costa Rica",
    url: "https://www.sugeval.fi.cr/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "medium",
    currentlyIntegrated: false,
    phase: 3,
    description: {
      en: "Securities regulator: capital markets data, fintech regulations, crowdfunding rules, digital assets policy.",
      es: "Regulador de valores: datos de mercados de capital, regulaciones fintech, reglas de crowdfunding, política de activos digitales."
    },
    crRelevance: {
      en: "Regulatory framework for AI-driven trading, robo-advisors, and fintech innovation in CR.",
      es: "Marco regulatorio para trading impulsado por AI, robo-advisors e innovación fintech en CR."
    }
  },

  // ─────────────────────────────────────────────────────────────
  // INTERNATIONAL ORGANIZATIONS (28 sources)
  // ─────────────────────────────────────────────────────────────
  {
    id: "intl-cepalstat",
    name: "CEPALSTAT — ECLAC Statistical Database",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://statistics.cepal.org/portal/cepalstat/",
    apiType: "REST",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "critical",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "UN ECLAC statistical portal: 2,500+ indicators for Latin America covering economy, social development, environment, gender, and technology.",
      es: "Portal estadístico de CEPAL ONU: 2,500+ indicadores para América Latina cubriendo economía, desarrollo social, ambiente, género y tecnología."
    },
    crRelevance: {
      en: "Best source for LATAM-comparable development indicators. Includes digital economy and innovation metrics.",
      es: "Mejor fuente para indicadores de desarrollo comparables en LATAM. Incluye métricas de economía digital e innovación."
    }
  },
  {
    id: "intl-idb",
    name: "IDB — Inter-American Development Bank Data",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://data.iadb.org/",
    apiType: "REST",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "critical",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "IDB data portal: development indicators, project data, fAIr LAC initiative resources, digital transformation assessments.",
      es: "Portal de datos del BID: indicadores de desarrollo, datos de proyectos, recursos de la iniciativa fAIr LAC, evaluaciones de transformación digital."
    },
    crRelevance: {
      en: "fAIr LAC initiative directly addresses responsible AI in LATAM. Major funder of CR digital transformation projects.",
      es: "La iniciativa fAIr LAC aborda directamente AI responsable en LATAM. Principal financiador de proyectos de transformación digital en CR."
    }
  },
  {
    id: "intl-ilostat",
    name: "ILOSTAT — International Labour Organization",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://ilostat.ilo.org/",
    apiType: "REST",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "ILO labor statistics: employment by sector, wages, working conditions, skills surveys, automation risk indicators.",
      es: "Estadísticas laborales OIT: empleo por sector, salarios, condiciones de trabajo, encuestas de habilidades, indicadores de riesgo de automatización."
    },
    crRelevance: {
      en: "Critical for modeling AI automation impact on CR's labor market across sectors.",
      es: "Crítico para modelar el impacto de automatización AI en el mercado laboral de CR por sector."
    }
  },
  {
    id: "intl-unesco-uis",
    name: "UNESCO UIS — Institute for Statistics",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://uis.unesco.org/",
    apiType: "REST",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "UNESCO statistics: education indicators, R&D expenditure, researchers per million, science & technology data, AI competency frameworks.",
      es: "Estadísticas UNESCO: indicadores educativos, gasto en I+D, investigadores por millón, datos de ciencia y tecnología, marcos de competencias AI."
    },
    crRelevance: {
      en: "Source for R&D investment benchmarks and AI education competency framework (12 student + 15 teacher competencies).",
      es: "Fuente para benchmarks de inversión en I+D y marco de competencias AI para educación (12 estudiantes + 15 docentes)."
    }
  },
  {
    id: "intl-itu",
    name: "ITU — International Telecommunication Union",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://datahub.itu.int/",
    apiType: "REST",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "critical",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "ICT Development Index, broadband statistics, spectrum data, AI for Good platform, digital infrastructure benchmarks.",
      es: "Índice de Desarrollo TIC, estadísticas de banda ancha, datos de espectro, plataforma AI for Good, benchmarks de infraestructura digital."
    },
    crRelevance: {
      en: "ICT Development Index is a core input to AI readiness. CR ranked well in LATAM context.",
      es: "El Índice de Desarrollo TIC es un insumo central para preparación AI. CR posicionada bien en contexto LATAM."
    }
  },
  {
    id: "intl-oecd",
    name: "OECD.Stat — Organisation for Economic Co-operation and Development",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://stats.oecd.org/",
    apiType: "SDMX",
    free: true,
    authRequired: false,
    complexity: "high",
    relevance: "critical",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "Comprehensive OECD statistics: PISA scores, R&D spending, digital economy indicators, tax data, AI policy observatory.",
      es: "Estadísticas OCDE completas: puntajes PISA, gasto en I+D, indicadores de economía digital, datos fiscales, observatorio de política AI."
    },
    crRelevance: {
      en: "CR is an OECD member — this is the benchmark dataset for policy comparison across all dimensions.",
      es: "CR es miembro de OCDE — este es el dataset benchmark para comparación de políticas en todas las dimensiones."
    }
  },
  {
    id: "intl-oecd-ai",
    name: "OECD.AI Policy Observatory",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://oecd.ai/",
    apiType: "REST",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "critical",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "AI-specific policy tracker: 800+ AI policies across 70+ countries, AI incidents, AI governance frameworks, OECD AI Principles implementation.",
      es: "Rastreador de políticas AI: 800+ políticas AI en 70+ países, incidentes AI, marcos de gobernanza AI, implementación de Principios AI de la OCDE."
    },
    crRelevance: {
      en: "Definitive global tracker of AI governance. CR's ANIA strategy and OECD AI Principles adherence tracked here.",
      es: "Rastreador definitivo global de gobernanza AI. La estrategia ANIA de CR y adherencia a Principios AI de la OCDE se rastrean aquí."
    }
  },
  {
    id: "intl-imf-weo",
    name: "IMF — World Economic Outlook Database",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://www.imf.org/en/Publications/WEO",
    apiType: "REST",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "IMF economic projections: GDP forecasts, fiscal indicators, external sector data, Article IV consultation reports.",
      es: "Proyecciones económicas del FMI: pronósticos de PIB, indicadores fiscales, datos del sector externo, informes de consulta Artículo IV."
    },
    crRelevance: {
      en: "Macroeconomic context for AI investment climate assessment.",
      es: "Contexto macroeconómico para evaluación del clima de inversión AI."
    }
  },
  {
    id: "intl-wb-wdi",
    name: "World Bank — World Development Indicators",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://databank.worldbank.org/source/world-development-indicators",
    apiType: "REST",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "critical",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "1,400+ development indicators across 217 countries: GDP, infrastructure, education, health, technology adoption, governance.",
      es: "1,400+ indicadores de desarrollo en 217 países: PIB, infraestructura, educación, salud, adopción de tecnología, gobernanza."
    },
    crRelevance: {
      en: "World Bank classified CR as an 'AI Overperformer' — this dataset provides the underlying evidence.",
      es: "Banco Mundial clasificó a CR como 'AI Overperformer' — este dataset proporciona la evidencia subyacente."
    }
  },
  {
    id: "intl-wb-aipi",
    name: "World Bank — AI Preparedness Index (AIPI)",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://www.worldbank.org/en/publication/ai-preparedness-index",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "critical",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "AI Preparedness Index scoring 195 countries across 10 pillars. Classifies countries as AI Leaders, Performers, Overperformers, Underperformers.",
      es: "Índice de Preparación AI puntuando 195 países en 10 pilares. Clasifica países como Líderes AI, Performers, Overperformers, Underperformers."
    },
    crRelevance: {
      en: "CR classified as 'Overperformer' — performing above expected level given income. Strategic validation of CR's AI approach.",
      es: "CR clasificada como 'Overperformer' — rindiendo por encima del nivel esperado dado su ingreso. Validación estratégica del enfoque AI de CR."
    }
  },
  {
    id: "intl-undp-hdi",
    name: "UNDP — Human Development Index",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://hdr.undp.org/data-center",
    apiType: "REST",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Human Development Index and sub-indicators: life expectancy, education, income. Gender Development and Inequality indices.",
      es: "Índice de Desarrollo Humano y sub-indicadores: esperanza de vida, educación, ingreso. Índices de Desarrollo y Desigualdad de Género."
    },
    crRelevance: {
      en: "HDI contextualizes AI readiness within broader human development — CR ranks high in LATAM.",
      es: "IDH contextualiza preparación AI dentro del desarrollo humano más amplio — CR se posiciona alto en LATAM."
    }
  },
  {
    id: "intl-wipo",
    name: "WIPO — Global Innovation Index",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://www.wipo.int/global_innovation_index/en/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Global Innovation Index ranking 132 countries: innovation inputs, outputs, patents, creative outputs, knowledge creation.",
      es: "Índice Global de Innovación clasificando 132 países: insumos de innovación, resultados, patentes, resultados creativos, creación de conocimiento."
    },
    crRelevance: {
      en: "Tracks CR's innovation capacity relative to peers — key context for AI ecosystem development.",
      es: "Rastrea capacidad de innovación de CR relativa a pares — contexto clave para desarrollo del ecosistema AI."
    }
  },
  {
    id: "intl-wef-gcr",
    name: "WEF — Global Competitiveness Report",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://www.weforum.org/reports/global-competitiveness-report/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "WEF competitiveness metrics: institutions, infrastructure, ICT adoption, skills, innovation, market dynamics.",
      es: "Métricas de competitividad del WEF: instituciones, infraestructura, adopción TIC, habilidades, innovación, dinámica de mercado."
    },
    crRelevance: {
      en: "ICT adoption and skills pillars directly correlate with AI deployment readiness.",
      es: "Los pilares de adopción TIC y habilidades correlacionan directamente con la preparación para despliegue AI."
    }
  },
  {
    id: "intl-gsma",
    name: "GSMA Intelligence — Mobile Connectivity Index",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://www.mobileconnectivityindex.com/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Mobile internet connectivity: infrastructure, affordability, consumer readiness, content availability by country.",
      es: "Conectividad de internet móvil: infraestructura, asequibilidad, preparación del consumidor, disponibilidad de contenido por país."
    },
    crRelevance: {
      en: "Mobile-first AI applications depend on connectivity quality — CR's mobile penetration is a strength.",
      es: "Aplicaciones AI mobile-first dependen de calidad de conectividad — la penetración móvil de CR es una fortaleza."
    }
  },
  {
    id: "intl-un-egdi",
    name: "UN E-Government Development Index",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://publicadministration.un.org/egovkb/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "E-government rankings: online services, telecom infrastructure, human capital sub-indices for 193 UN member states.",
      es: "Rankings de gobierno electrónico: servicios en línea, infraestructura de telecomunicaciones, sub-índices de capital humano para 193 estados miembros ONU."
    },
    crRelevance: {
      en: "Measures government digital maturity — prerequisite for AI-augmented public services.",
      es: "Mide madurez digital del gobierno — prerrequisito para servicios públicos aumentados por AI."
    }
  },
  {
    id: "intl-portulans-nri",
    name: "Portulans Institute — Network Readiness Index",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://networkreadinessindex.org/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "critical",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "Network Readiness Index: technology, people, governance, impact — 131 countries. Includes AI-specific sub-indicators.",
      es: "Índice de Preparación de Red: tecnología, personas, gobernanza, impacto — 131 países. Incluye sub-indicadores específicos de AI."
    },
    crRelevance: {
      en: "NRI includes AI readiness sub-indicators — CR typically ranks 1st-3rd in LATAM.",
      es: "NRI incluye sub-indicadores de preparación AI — CR típicamente se posiciona 1o-3o en LATAM."
    }
  },
  {
    id: "intl-oxford-govai",
    name: "Oxford Insights — Government AI Readiness Index",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://oxfordinsights.com/ai-readiness/ai-readiness-index/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "critical",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "Government AI Readiness Index: 195 countries scored on government, technology sector, data & infrastructure pillars.",
      es: "Índice de Preparación AI Gubernamental: 195 países puntuados en pilares de gobierno, sector tecnológico, datos e infraestructura."
    },
    crRelevance: {
      en: "Benchmark for CR's government AI readiness against 195 countries. CR has been steadily improving.",
      es: "Benchmark para preparación AI gubernamental de CR contra 195 países. CR ha mejorado consistentemente."
    }
  },
  {
    id: "intl-oas",
    name: "OAS — Organization of American States AI Resources",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://www.oas.org/en/sla/dil/artificial-intelligence.asp",
    apiType: "Web scrape",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "OAS hemispheric AI governance: Inter-American Principles on AI, OAS AI initiatives, regional cooperation frameworks.",
      es: "Gobernanza AI hemisférica de la OEA: Principios Interamericanos sobre AI, iniciativas AI de la OEA, marcos de cooperación regional."
    },
    crRelevance: {
      en: "CR as OAS member is bound by hemispheric AI principles — tracks regional governance convergence.",
      es: "CR como miembro de OEA está vinculada por principios AI hemisféricos — rastrea convergencia de gobernanza regional."
    }
  },
  {
    id: "intl-eclac-diga",
    name: "ECLAC — Digital Agenda for Latin America (eLAC)",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://www.cepal.org/en/elac2024",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "ECLAC digital agenda: eLAC2024 action plan for digital transformation, AI policy recommendations, digital governance standards.",
      es: "Agenda digital de CEPAL: plan de acción eLAC2024 para transformación digital, recomendaciones de política AI, estándares de gobernanza digital."
    },
    crRelevance: {
      en: "eLAC framework shapes CR's digital transformation policy alongside OECD recommendations.",
      es: "El marco eLAC configura la política de transformación digital de CR junto con recomendaciones de la OCDE."
    }
  },
  {
    id: "intl-ricyt",
    name: "RICYT — Red de Indicadores de Ciencia y Tecnología",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://www.ricyt.org/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Ibero-American S&T indicator network: R&D expenditure, patent applications, researchers, scientific publications for LATAM.",
      es: "Red Iberoamericana de indicadores de C&T: gasto en I+D, solicitudes de patentes, investigadores, publicaciones científicas para LATAM."
    },
    crRelevance: {
      en: "Best LATAM-specific source for R&D and innovation metrics — critical for AI research capacity assessment.",
      es: "Mejor fuente específica de LATAM para métricas de I+D e innovación — crítica para evaluación de capacidad investigativa AI."
    }
  },
  {
    id: "intl-gafilat",
    name: "GAFILAT — Financial Action Task Force of Latin America",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://www.gafilat.org/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "LATAM FATF regional body: mutual evaluations, AML/CFT compliance, typologies for AI-assisted financial crime.",
      es: "Organismo regional GAFI de LATAM: evaluaciones mutuas, cumplimiento ALA/CFT, tipologías de delitos financieros asistidos por AI."
    },
    crRelevance: {
      en: "CR's AML regime is evaluated by GAFILAT — directly relevant to AI-powered fraud detection and compliance.",
      es: "El régimen ALA de CR es evaluado por GAFILAT — directamente relevante para detección de fraude con AI y cumplimiento."
    }
  },
  {
    id: "intl-iese-cimi",
    name: "IESE — Cities in Motion Index",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://citiesinmotion.iese.edu/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "medium",
    currentlyIntegrated: false,
    phase: 3,
    description: {
      en: "IESE smart city rankings: technology, human capital, governance, economy, mobility for 183 cities globally.",
      es: "Rankings de ciudades inteligentes IESE: tecnología, capital humano, gobernanza, economía, movilidad para 183 ciudades globalmente."
    },
    crRelevance: {
      en: "San José rankings in smart city indices inform AI infrastructure priorities for urban development.",
      es: "Rankings de San José en índices de ciudades inteligentes informan prioridades de infraestructura AI para desarrollo urbano."
    }
  },
  {
    id: "intl-wb-findex",
    name: "World Bank — Global Findex Database",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://www.worldbank.org/en/publication/globalfindex",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Financial inclusion survey: account ownership, digital payments, savings, borrowing for 148 countries.",
      es: "Encuesta de inclusión financiera: tenencia de cuentas, pagos digitales, ahorro, crédito para 148 países."
    },
    crRelevance: {
      en: "Financial inclusion baseline for AI-powered fintech — SINPE Móvil adoption context.",
      es: "Línea base de inclusión financiera para fintech con AI — contexto de adopción de SINPE Móvil."
    }
  },
  {
    id: "intl-imf-fsi",
    name: "IMF — Financial Soundness Indicators",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://data.imf.org/FSI",
    apiType: "SDMX",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Financial system health indicators: capital adequacy, asset quality, liquidity ratios for banking systems globally.",
      es: "Indicadores de salud del sistema financiero: adecuación de capital, calidad de activos, ratios de liquidez para sistemas bancarios globalmente."
    },
    crRelevance: {
      en: "Banking system health context for AI-driven financial risk management.",
      es: "Contexto de salud del sistema bancario para gestión de riesgo financiero impulsada por AI."
    }
  },
  {
    id: "intl-atlantic-cbdc",
    name: "Atlantic Council — CBDC Tracker",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://www.atlanticcouncil.org/cbdctracker/",
    apiType: "Web scrape",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "medium",
    currentlyIntegrated: false,
    phase: 3,
    description: {
      en: "Central Bank Digital Currency tracker: 130+ countries' CBDC status, from research to pilot to launch.",
      es: "Rastreador de Moneda Digital de Banco Central: estado de CBDC de 130+ países, desde investigación hasta piloto hasta lanzamiento."
    },
    crRelevance: {
      en: "BCCR is researching CBDC — AI infrastructure for digital currency requires specific readiness assessment.",
      es: "BCCR está investigando CBDC — infraestructura AI para moneda digital requiere evaluación de preparación específica."
    }
  },
  {
    id: "intl-lavca",
    name: "LAVCA — Latin American Venture Capital Association",
    domain: en ? "International Organizations" : "Organizaciones Internacionales",
    url: "https://lavca.org/",
    apiType: "Download",
    free: false,
    authRequired: true,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 3,
    description: {
      en: "LATAM VC data: venture capital flows, tech startup funding, fintech investment, AI startup landscape.",
      es: "Datos de VC de LATAM: flujos de capital de riesgo, financiamiento de startups tech, inversión fintech, panorama de startups AI."
    },
    crRelevance: {
      en: "Tracks AI startup ecosystem funding in CR and LATAM competitors.",
      es: "Rastrea financiamiento del ecosistema de startups AI en CR y competidores LATAM."
    }
  },

  // ─────────────────────────────────────────────────────────────
  // CENTRAL BANKS LATAM (3 sources)
  // ─────────────────────────────────────────────────────────────
  {
    id: "cb-bcb",
    name: "BCB — Banco Central do Brasil",
    domain: en ? "Central Banks LATAM" : "Bancos Centrales LATAM",
    url: "https://www.bcb.gov.br/en/statistics",
    apiType: "REST",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Brazil's central bank: Pix instant payment data, open banking APIs, fintech sandbox results, financial innovation metrics.",
      es: "Banco central de Brasil: datos de pagos instantáneos Pix, APIs de open banking, resultados de sandbox fintech, métricas de innovación financiera."
    },
    crRelevance: {
      en: "Pix is the gold standard for instant payments in LATAM — benchmark for SINPE Móvil AI integration.",
      es: "Pix es el estándar de oro para pagos instantáneos en LATAM — benchmark para integración AI de SINPE Móvil."
    }
  },
  {
    id: "cb-banxico",
    name: "Banxico — Banco de México",
    domain: en ? "Central Banks LATAM" : "Bancos Centrales LATAM",
    url: "https://www.banxico.org.mx/SieInternet/",
    apiType: "REST",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Mexico's central bank: CoDi/SPEI payment data, fintech regulation, financial inclusion, remittance flows.",
      es: "Banco central de México: datos de pagos CoDi/SPEI, regulación fintech, inclusión financiera, flujos de remesas."
    },
    crRelevance: {
      en: "Mexico's fintech regulation is most advanced in LATAM — comparative benchmark for CR's regulatory approach.",
      es: "La regulación fintech de México es la más avanzada en LATAM — benchmark comparativo para enfoque regulatorio de CR."
    }
  },
  {
    id: "cb-bcch",
    name: "BCCh — Banco Central de Chile",
    domain: en ? "Central Banks LATAM" : "Bancos Centrales LATAM",
    url: "https://si3.bcentral.cl/siete",
    apiType: "REST",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Chile's central bank: financial system data, open finance APIs, AI adoption in banking surveys.",
      es: "Banco central de Chile: datos del sistema financiero, APIs de finanzas abiertas, encuestas de adopción AI en banca."
    },
    crRelevance: {
      en: "Chile leads LATAM in AI readiness (ILIA #1) — their central bank data shows the path forward.",
      es: "Chile lidera LATAM en preparación AI (ILIA #1) — datos de su banco central muestran el camino a seguir."
    }
  },

  // ─────────────────────────────────────────────────────────────
  // AI GOVERNANCE (5 sources)
  // ─────────────────────────────────────────────────────────────
  {
    id: "aigov-aiid",
    name: "AIID — AI Incident Database",
    domain: en ? "AI Governance" : "Gobernanza AI",
    url: "https://incidentdatabase.ai/",
    apiType: "GraphQL",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "critical",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "Crowd-sourced database of 3,000+ AI incidents: harms, failures, near-misses. GraphQL API. Partnership on AI initiative.",
      es: "Base de datos colaborativa de 3,000+ incidentes AI: daños, fallas, cuasi-incidentes. API GraphQL. Iniciativa de Partnership on AI."
    },
    crRelevance: {
      en: "Source for AI risk case studies relevant to CR sectors. Powers the Risk Heatmap component.",
      es: "Fuente de casos de estudio de riesgos AI relevantes para sectores de CR. Alimenta el componente de Mapa de Calor de Riesgos."
    }
  },
  {
    id: "aigov-oecd-ai-obs",
    name: "OECD AI Observatory — Policy Tracker",
    domain: en ? "AI Governance" : "Gobernanza AI",
    url: "https://oecd.ai/en/dashboards",
    apiType: "REST",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "critical",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "OECD.AI dashboards: AI policies by country, AI research trends, AI compute benchmarks, talent flows, investment data.",
      es: "Dashboards OECD.AI: políticas AI por país, tendencias de investigación AI, benchmarks de computación AI, flujos de talento, datos de inversión."
    },
    crRelevance: {
      en: "Primary source for AI policy benchmarking. CR's position relative to OECD peers tracked here.",
      es: "Fuente primaria para benchmarking de políticas AI. Posición de CR relativa a pares OCDE se rastrea aquí."
    }
  },
  {
    id: "aigov-cset-agora",
    name: "CSET AGORA — AI Governance Repository & Assessment",
    domain: en ? "AI Governance" : "Gobernanza AI",
    url: "https://agora.ceip.org/",
    apiType: "Web scrape",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Georgetown CSET curated repository of AI governance documents: strategies, laws, regulations, standards from 70+ countries.",
      es: "Repositorio curado de Georgetown CSET de documentos de gobernanza AI: estrategias, leyes, regulaciones, estándares de 70+ países."
    },
    crRelevance: {
      en: "Comprehensive source for comparative AI legislation analysis — contextualizes CR's regulatory gaps.",
      es: "Fuente comprensiva para análisis comparativo de legislación AI — contextualiza vacíos regulatorios de CR."
    }
  },
  {
    id: "aigov-stanford-hai",
    name: "Stanford HAI — AI Index Report",
    domain: en ? "AI Governance" : "Gobernanza AI",
    url: "https://aiindex.stanford.edu/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "critical",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "Annual AI Index: R&D metrics, AI performance benchmarks, investment trends, policy landscape, public opinion on AI.",
      es: "Índice AI Anual: métricas de I+D, benchmarks de rendimiento AI, tendencias de inversión, panorama de políticas, opinión pública sobre AI."
    },
    crRelevance: {
      en: "Gold standard for global AI trend data. Annual benchmarks contextualize CR within worldwide AI development.",
      es: "Estándar de oro para datos de tendencias AI globales. Benchmarks anuales contextualizan a CR dentro del desarrollo AI mundial."
    }
  },
  {
    id: "aigov-ilia",
    name: "ILIA — Índice Latinoamericano de Inteligencia Artificial",
    domain: en ? "AI Governance" : "Gobernanza AI",
    url: "https://indicelatam.cl/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "critical",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "Latin American AI Index: 19 countries scored across 6 dimensions — factors of AI adoption, enablers, and impact. CENIA Chile initiative.",
      es: "Índice Latinoamericano de Inteligencia Artificial: 19 países puntuados en 6 dimensiones — factores de adopción AI, habilitadores e impacto. Iniciativa CENIA Chile."
    },
    crRelevance: {
      en: "The only LATAM-specific AI index. CR's position against regional peers is most accurately captured here.",
      es: "El único índice AI específico de LATAM. La posición de CR frente a pares regionales se captura con mayor precisión aquí."
    }
  },

  // ─────────────────────────────────────────────────────────────
  // CYBERSECURITY (5 sources)
  // ─────────────────────────────────────────────────────────────
  {
    id: "cyber-nvd",
    name: "NVD — National Vulnerability Database",
    domain: en ? "Cybersecurity" : "Ciberseguridad",
    url: "https://nvd.nist.gov/",
    apiType: "REST",
    free: true,
    authRequired: true,
    complexity: "medium",
    relevance: "critical",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "NIST vulnerability database: CVE entries, CVSS scores, affected software, remediation guidance. REST API with API key.",
      es: "Base de datos de vulnerabilidades NIST: entradas CVE, puntajes CVSS, software afectado, guías de remediación. API REST con clave API."
    },
    crRelevance: {
      en: "Source for vulnerability intelligence affecting AI systems and CR infrastructure.",
      es: "Fuente de inteligencia de vulnerabilidades que afectan sistemas AI e infraestructura de CR."
    }
  },
  {
    id: "cyber-mitre-attack",
    name: "MITRE ATT&CK — Adversarial Tactics & Techniques",
    domain: en ? "Cybersecurity" : "Ciberseguridad",
    url: "https://attack.mitre.org/",
    apiType: "REST",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "critical",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "MITRE ATT&CK framework: adversary tactics, techniques, and procedures (TTPs). STIX/TAXII API for threat intelligence.",
      es: "Marco MITRE ATT&CK: tácticas, técnicas y procedimientos (TTPs) de adversarios. API STIX/TAXII para inteligencia de amenazas."
    },
    crRelevance: {
      en: "Foundational framework for CR's CSIRT-CR and institutional cybersecurity posture assessments.",
      es: "Marco fundamental para CSIRT-CR y evaluaciones de postura de ciberseguridad institucional de CR."
    }
  },
  {
    id: "cyber-mitre-atlas",
    name: "MITRE ATLAS — Adversarial Threat Landscape for AI Systems",
    domain: en ? "Cybersecurity" : "Ciberseguridad",
    url: "https://atlas.mitre.org/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "critical",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "AI-specific attack framework: adversarial ML techniques, case studies of AI system attacks, mitigation strategies.",
      es: "Marco de ataque específico para AI: técnicas de ML adversarial, casos de estudio de ataques a sistemas AI, estrategias de mitigación."
    },
    crRelevance: {
      en: "The AI-specific extension of ATT&CK — essential for assessing attacks against AI systems deployed in CR.",
      es: "La extensión específica para AI de ATT&CK — esencial para evaluar ataques contra sistemas AI desplegados en CR."
    }
  },
  {
    id: "cyber-otx",
    name: "AlienVault OTX — Open Threat Exchange",
    domain: en ? "Cybersecurity" : "Ciberseguridad",
    url: "https://otx.alienvault.com/",
    apiType: "REST",
    free: true,
    authRequired: true,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Community-driven threat intelligence: IOCs, malware signatures, threat pulses, IP reputation, domain analysis.",
      es: "Inteligencia de amenazas impulsada por comunidad: IOCs, firmas de malware, pulsos de amenazas, reputación IP, análisis de dominios."
    },
    crRelevance: {
      en: "Real-time threat intelligence relevant to CR-targeting cyber campaigns.",
      es: "Inteligencia de amenazas en tiempo real relevante para campañas cibernéticas dirigidas a CR."
    }
  },
  {
    id: "cyber-owasp-llm",
    name: "OWASP — Top 10 for LLM Applications",
    domain: en ? "Cybersecurity" : "Ciberseguridad",
    url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
    apiType: "Web scrape",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "critical",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "OWASP Top 10 LLM risks: prompt injection, data leakage, insecure output handling, training data poisoning, supply chain vulnerabilities.",
      es: "OWASP Top 10 riesgos LLM: inyección de prompts, fuga de datos, manejo inseguro de salidas, envenenamiento de datos de entrenamiento, vulnerabilidades de cadena de suministro."
    },
    crRelevance: {
      en: "Essential reference for any CR institution deploying LLM-based AI services — used in Banking AI security module.",
      es: "Referencia esencial para cualquier institución de CR desplegando servicios AI basados en LLM — usado en módulo de seguridad AI bancaria."
    }
  },

  // ─────────────────────────────────────────────────────────────
  // FINANCIAL (5 sources)
  // ─────────────────────────────────────────────────────────────
  {
    id: "fin-fatf",
    name: "FATF — Financial Action Task Force",
    domain: en ? "Financial" : "Financiero",
    url: "https://www.fatf-gafi.org/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Global AML/CFT standards: mutual evaluations, updated recommendations on virtual assets, AI in AML guidance.",
      es: "Estándares globales ALA/CFT: evaluaciones mutuas, recomendaciones actualizadas sobre activos virtuales, guías de AI en ALA."
    },
    crRelevance: {
      en: "FATF standards shape CR's AML regime — AI-powered transaction monitoring must comply.",
      es: "Estándares GAFI configuran régimen ALA de CR — monitoreo de transacciones con AI debe cumplir."
    }
  },
  {
    id: "fin-bis",
    name: "BIS — Bank for International Settlements",
    domain: en ? "Financial" : "Financiero",
    url: "https://www.bis.org/statistics/",
    apiType: "REST",
    free: true,
    authRequired: false,
    complexity: "high",
    relevance: "medium",
    currentlyIntegrated: false,
    phase: 3,
    description: {
      en: "Central bank of central banks: cross-border payment data, fintech surveys, CBDC research, Basel framework compliance.",
      es: "Banco central de bancos centrales: datos de pagos transfronterizos, encuestas fintech, investigación CBDC, cumplimiento del marco de Basilea."
    },
    crRelevance: {
      en: "BIS research on AI in central banking informs BCCR's technology strategy.",
      es: "Investigación BIS sobre AI en banca central informa la estrategia tecnológica del BCCR."
    }
  },
  {
    id: "fin-fred",
    name: "FRED — Federal Reserve Economic Data",
    domain: en ? "Financial" : "Financiero",
    url: "https://fred.stlouisfed.org/",
    apiType: "REST",
    free: true,
    authRequired: true,
    complexity: "low",
    relevance: "medium",
    currentlyIntegrated: false,
    phase: 3,
    description: {
      en: "800,000+ economic time series from US Federal Reserve. Interest rates, exchange rates, global economic indicators.",
      es: "800,000+ series de tiempo económicas de la Reserva Federal de EE.UU. Tasas de interés, tipos de cambio, indicadores económicos globales."
    },
    crRelevance: {
      en: "US monetary policy impacts CR through trade and investment channels — macro context for AI economy.",
      es: "Política monetaria de EE.UU. impacta a CR a través de canales de comercio e inversión — contexto macro para economía AI."
    }
  },
  {
    id: "fin-penn",
    name: "Penn World Table — Groningen Growth & Development Centre",
    domain: en ? "Financial" : "Financiero",
    url: "https://www.rug.nl/ggdc/productivity/pwt/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "medium",
    currentlyIntegrated: false,
    phase: 3,
    description: {
      en: "Penn World Table v10.1: purchasing power parity, real GDP comparisons, productivity data for 183 countries (1950-2019).",
      es: "Penn World Table v10.1: paridad de poder adquisitivo, comparaciones de PIB real, datos de productividad para 183 países (1950-2019)."
    },
    crRelevance: {
      en: "Long-term productivity trends contextualize AI's potential impact on CR's economic growth trajectory.",
      es: "Tendencias de productividad a largo plazo contextualizan el potencial impacto de AI en la trayectoria de crecimiento económico de CR."
    }
  },
  {
    id: "fin-lexisnexis",
    name: "LexisNexis Risk Solutions — True Cost of Fraud",
    domain: en ? "Financial" : "Financiero",
    url: "https://risk.lexisnexis.com/insights-resources/research/true-cost-of-fraud-study",
    apiType: "Download",
    free: false,
    authRequired: true,
    complexity: "low",
    relevance: "high",
    currentlyIntegrated: true,
    phase: 1,
    description: {
      en: "Annual fraud cost study: cost multiplier per dollar of fraud, digital channel fraud trends, LATAM-specific findings.",
      es: "Estudio anual de costo de fraude: multiplicador de costo por dólar de fraude, tendencias de fraude en canales digitales, hallazgos específicos de LATAM."
    },
    crRelevance: {
      en: "Provides the $4.41 LATAM fraud cost multiplier used in our banking module projections.",
      es: "Proporciona el multiplicador de costo de fraude LATAM de $4.41 usado en las proyecciones de nuestro módulo bancario."
    }
  },

  // ─────────────────────────────────────────────────────────────
  // ENVIRONMENTAL (7 sources)
  // ─────────────────────────────────────────────────────────────
  {
    id: "env-climate-trace",
    name: "Climate TRACE — Global Emissions Tracking",
    domain: en ? "Environmental" : "Ambiental",
    url: "https://climatetrace.org/",
    apiType: "REST",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "critical",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "AI-powered global emissions monitoring: 352M+ assets tracked, sector-level CO₂ data, satellite + AI verification.",
      es: "Monitoreo global de emisiones con AI: 352M+ activos rastreados, datos de CO₂ a nivel sectorial, verificación por satélite + AI."
    },
    crRelevance: {
      en: "Demonstrates AI for climate monitoring — directly relevant to CR's carbon neutrality goals.",
      es: "Demuestra AI para monitoreo climático — directamente relevante para metas de carbono neutralidad de CR."
    }
  },
  {
    id: "env-nasa-power",
    name: "NASA POWER — Prediction Of Worldwide Energy Resources",
    domain: en ? "Environmental" : "Ambiental",
    url: "https://power.larc.nasa.gov/",
    apiType: "REST",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "NASA solar and wind energy data: solar irradiance, wind speed, temperature for any location. Free API.",
      es: "Datos de energía solar y eólica de NASA: irradiancia solar, velocidad del viento, temperatura para cualquier ubicación. API gratuita."
    },
    crRelevance: {
      en: "Renewable energy potential mapping for AI data center site selection in CR.",
      es: "Mapeo de potencial de energía renovable para selección de sitios de centros de datos AI en CR."
    }
  },
  {
    id: "env-gfw",
    name: "Global Forest Watch",
    domain: en ? "Environmental" : "Ambiental",
    url: "https://www.globalforestwatch.org/",
    apiType: "REST",
    free: true,
    authRequired: true,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Real-time forest monitoring: deforestation alerts, tree cover change, fire data, land use. Uses AI + satellite imagery.",
      es: "Monitoreo forestal en tiempo real: alertas de deforestación, cambio de cobertura arbórea, datos de incendios, uso de suelo. Usa AI + imágenes satelitales."
    },
    crRelevance: {
      en: "AI-powered forest monitoring directly supports CR's conservation leadership and reforestation tracking.",
      es: "Monitoreo forestal con AI apoya directamente el liderazgo de conservación y seguimiento de reforestación de CR."
    }
  },
  {
    id: "env-electricity-maps",
    name: "Electricity Maps — Real-time Carbon Intensity",
    domain: en ? "Environmental" : "Ambiental",
    url: "https://app.electricitymaps.com/",
    apiType: "REST",
    free: false,
    authRequired: true,
    complexity: "low",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Real-time electricity carbon intensity by country/region. Free tier for personal use. Shows CR as one of greenest grids globally.",
      es: "Intensidad de carbono de electricidad en tiempo real por país/región. Nivel gratuito para uso personal. Muestra a CR como una de las redes más verdes globalmente."
    },
    crRelevance: {
      en: "Demonstrates CR's near-zero carbon electricity — key selling point for sustainable AI compute.",
      es: "Demuestra electricidad de carbono casi cero de CR — punto de venta clave para computación AI sostenible."
    }
  },
  {
    id: "env-codecarbon",
    name: "CodeCarbon — AI Compute Emissions Tracker",
    domain: en ? "Environmental" : "Ambiental",
    url: "https://codecarbon.io/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 3,
    description: {
      en: "Python library to track carbon emissions from computing: estimates CO₂ from GPU/CPU usage, cloud provider emissions factors.",
      es: "Librería Python para rastrear emisiones de carbono de computación: estima CO₂ de uso GPU/CPU, factores de emisión de proveedores cloud."
    },
    crRelevance: {
      en: "Tool for measuring AI carbon footprint — CR's green energy makes AI compute 95%+ cleaner than global average.",
      es: "Herramienta para medir huella de carbono AI — la energía verde de CR hace la computación AI 95%+ más limpia que el promedio global."
    }
  },
  {
    id: "env-owid",
    name: "Our World in Data — Energy & Environment",
    domain: en ? "Environmental" : "Ambiental",
    url: "https://ourworldindata.org/energy",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Open-access curated datasets: energy mix, CO₂ emissions, renewable capacity, environmental indicators for all countries.",
      es: "Datasets curados de acceso abierto: mezcla energética, emisiones CO₂, capacidad renovable, indicadores ambientales para todos los países."
    },
    crRelevance: {
      en: "Excellent visualization-ready data showing CR's renewable energy leadership in global context.",
      es: "Datos excelentes listos para visualización mostrando el liderazgo de energía renovable de CR en contexto global."
    }
  },
  {
    id: "env-copernicus",
    name: "Copernicus Climate Data Store",
    domain: en ? "Environmental" : "Ambiental",
    url: "https://cds.climate.copernicus.eu/",
    apiType: "REST",
    free: true,
    authRequired: true,
    complexity: "high",
    relevance: "medium",
    currentlyIntegrated: false,
    phase: 3,
    description: {
      en: "EU Earth observation: climate reanalysis, seasonal forecasts, satellite data, land/ocean monitoring. Massive free datasets.",
      es: "Observación terrestre de la UE: reanálisis climático, pronósticos estacionales, datos satelitales, monitoreo terrestre/oceánico. Datasets masivos gratuitos."
    },
    crRelevance: {
      en: "Satellite data for AI-powered climate risk modeling specific to CR geography.",
      es: "Datos satelitales para modelado de riesgo climático con AI específico para la geografía de CR."
    }
  },

  // ─────────────────────────────────────────────────────────────
  // HEALTH (4 sources)
  // ─────────────────────────────────────────────────────────────
  {
    id: "health-who-gho",
    name: "WHO GHO — Global Health Observatory",
    domain: en ? "Health" : "Salud",
    url: "https://www.who.int/data/gho",
    apiType: "REST",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "WHO global health data: disease burden, health workforce, health expenditure, universal health coverage indicators.",
      es: "Datos de salud global OMS: carga de enfermedad, fuerza laboral de salud, gasto en salud, indicadores de cobertura universal de salud."
    },
    crRelevance: {
      en: "Benchmarks CR's health system against global standards — context for health AI deployment priorities.",
      es: "Compara sistema de salud de CR contra estándares globales — contexto para prioridades de despliegue de AI en salud."
    }
  },
  {
    id: "health-paho",
    name: "PAHO — Pan American Health Organization Data",
    domain: en ? "Health" : "Salud",
    url: "https://www.paho.org/en/health-data",
    apiType: "REST",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "PAHO health data portal: regional health indicators, PLISA platform, eHealth strategy data for the Americas.",
      es: "Portal de datos de salud OPS: indicadores regionales de salud, plataforma PLISA, datos de estrategia eSalud para las Américas."
    },
    crRelevance: {
      en: "Americas-specific health indicators — contextualizes CR's universal healthcare system performance for AI applications.",
      es: "Indicadores de salud específicos de las Américas — contextualiza desempeño del sistema de salud universal de CR para aplicaciones AI."
    }
  },
  {
    id: "health-ihme-gbd",
    name: "IHME — Global Burden of Disease",
    domain: en ? "Health" : "Salud",
    url: "https://www.healthdata.org/research-analysis/gbd",
    apiType: "REST",
    free: true,
    authRequired: true,
    complexity: "high",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 3,
    description: {
      en: "IHME Global Burden of Disease study: comprehensive health metrics for 204 countries, 369 diseases, 87 risk factors.",
      es: "Estudio de Carga Global de Enfermedad IHME: métricas de salud comprensivas para 204 países, 369 enfermedades, 87 factores de riesgo."
    },
    crRelevance: {
      en: "Granular disease burden data for prioritizing AI diagnostic tools in CR's health system.",
      es: "Datos granulares de carga de enfermedad para priorizar herramientas de diagnóstico AI en el sistema de salud de CR."
    }
  },
  {
    id: "health-clinicaltrials",
    name: "ClinicalTrials.gov",
    domain: en ? "Health" : "Salud",
    url: "https://clinicaltrials.gov/",
    apiType: "REST",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "medium",
    currentlyIntegrated: false,
    phase: 3,
    description: {
      en: "Registry of 400,000+ clinical studies: AI-related trials, digital health interventions, LATAM trial participation data.",
      es: "Registro de 400,000+ estudios clínicos: ensayos relacionados con AI, intervenciones de salud digital, datos de participación en ensayos de LATAM."
    },
    crRelevance: {
      en: "Tracks AI clinical trials in LATAM — CR has emerging clinical research capacity.",
      es: "Rastrea ensayos clínicos AI en LATAM — CR tiene capacidad emergente de investigación clínica."
    }
  },

  // ─────────────────────────────────────────────────────────────
  // RESEARCH & INFRASTRUCTURE (5 sources)
  // ─────────────────────────────────────────────────────────────
  {
    id: "res-openalex",
    name: "OpenAlex — Open Academic Graph",
    domain: en ? "Research" : "Investigación",
    url: "https://openalex.org/",
    apiType: "REST",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Open catalog of 250M+ scholarly works: papers, authors, institutions, citations. Replaces Microsoft Academic Graph.",
      es: "Catálogo abierto de 250M+ trabajos académicos: artículos, autores, instituciones, citas. Reemplaza Microsoft Academic Graph."
    },
    crRelevance: {
      en: "Tracks CR's AI research output, institutional collaboration, and citation impact.",
      es: "Rastrea producción de investigación AI de CR, colaboración institucional e impacto de citaciones."
    }
  },
  {
    id: "res-github",
    name: "GitHub API — Developer Activity",
    domain: en ? "Research" : "Investigación",
    url: "https://api.github.com/",
    apiType: "REST",
    free: true,
    authRequired: true,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "GitHub developer data: open source contributions by country, AI/ML repository activity, developer ecosystem metrics.",
      es: "Datos de desarrolladores de GitHub: contribuciones open source por país, actividad de repositorios AI/ML, métricas del ecosistema de desarrolladores."
    },
    crRelevance: {
      en: "CR's developer community size and AI/ML open source activity — proxy for AI talent density.",
      es: "Tamaño de la comunidad de desarrolladores de CR y actividad open source AI/ML — proxy para densidad de talento AI."
    }
  },
  {
    id: "res-ookla",
    name: "Ookla Speedtest Intelligence",
    domain: en ? "Research" : "Investigación",
    url: "https://www.speedtest.net/insights",
    apiType: "Download",
    free: false,
    authRequired: true,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Global internet speed data: fixed and mobile broadband speeds, latency, by country and city. Open dataset available.",
      es: "Datos globales de velocidad de internet: velocidades de banda ancha fija y móvil, latencia, por país y ciudad. Dataset abierto disponible."
    },
    crRelevance: {
      en: "CR's internet speeds directly affect AI service quality and competitiveness as nearshoring destination.",
      es: "Las velocidades de internet de CR afectan directamente la calidad de servicios AI y competitividad como destino de nearshoring."
    }
  },
  {
    id: "res-ricyt",
    name: "RICYT — Ibero-American S&T Indicators Network",
    domain: en ? "Research" : "Investigación",
    url: "https://www.ricyt.org/en/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "R&D expenditure, patent applications, researchers per million, scientific publications for Ibero-American countries.",
      es: "Gasto en I+D, solicitudes de patentes, investigadores por millón, publicaciones científicas para países iberoamericanos."
    },
    crRelevance: {
      en: "LATAM R&D benchmarking — CR's R&D expenditure (~0.4% GDP) vs regional leaders.",
      es: "Benchmarking de I+D en LATAM — gasto en I+D de CR (~0.4% PIB) vs líderes regionales."
    }
  },
  {
    id: "res-pwt",
    name: "Penn World Table — Productivity Data",
    domain: en ? "Research" : "Investigación",
    url: "https://www.rug.nl/ggdc/productivity/pwt/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "medium",
    currentlyIntegrated: false,
    phase: 3,
    description: {
      en: "Long-run productivity data for 183 countries: PPP GDP, total factor productivity, capital stocks, labor shares.",
      es: "Datos de productividad a largo plazo para 183 países: PIB PPA, productividad total de factores, stocks de capital, participación laboral."
    },
    crRelevance: {
      en: "Historical productivity context for modeling AI's potential impact on CR economic growth.",
      es: "Contexto histórico de productividad para modelar el impacto potencial de AI en el crecimiento económico de CR."
    }
  },

  // ─────────────────────────────────────────────────────────────
  // EDUCATION TOOLS (10 sources)
  // ─────────────────────────────────────────────────────────────
  {
    id: "edu-teachable-machine",
    name: "Google Teachable Machine",
    domain: en ? "Education Tools" : "Herramientas Educativas",
    url: "https://teachablemachine.withgoogle.com/",
    apiType: "Web scrape",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Browser-based ML training: create image, sound, and pose classification models without code. Exportable to TensorFlow.js.",
      es: "Entrenamiento ML basado en navegador: crear modelos de clasificación de imágenes, sonido y poses sin código. Exportable a TensorFlow.js."
    },
    crRelevance: {
      en: "Ideal entry point for K-12 AI education in CR — no infrastructure requirements.",
      es: "Punto de entrada ideal para educación AI K-12 en CR — sin requerimientos de infraestructura."
    }
  },
  {
    id: "edu-ml-for-kids",
    name: "ML for Kids — Machine Learning for Kids",
    domain: en ? "Education Tools" : "Herramientas Educativas",
    url: "https://machinelearningforkids.co.uk/",
    apiType: "Web scrape",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Educational ML platform: Scratch-based interface for training text, image, and number classifiers. Ages 7-14.",
      es: "Plataforma educativa de ML: interfaz basada en Scratch para entrenar clasificadores de texto, imagen y números. Edades 7-14."
    },
    crRelevance: {
      en: "Scratch integration aligns with existing CS education in CR. Spanish-supported.",
      es: "Integración con Scratch alinea con educación CS existente en CR. Con soporte en español."
    }
  },
  {
    id: "edu-tf-playground",
    name: "TensorFlow Playground",
    domain: en ? "Education Tools" : "Herramientas Educativas",
    url: "https://playground.tensorflow.org/",
    apiType: "Web scrape",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Interactive neural network visualization: adjust layers, neurons, learning rate, see real-time training. Open source.",
      es: "Visualización interactiva de redes neuronales: ajustar capas, neuronas, tasa de aprendizaje, ver entrenamiento en tiempo real. Código abierto."
    },
    crRelevance: {
      en: "Excellent for university-level AI/ML education — visual intuition for neural networks.",
      es: "Excelente para educación AI/ML a nivel universitario — intuición visual para redes neuronales."
    }
  },
  {
    id: "edu-quick-draw",
    name: "Google Quick, Draw!",
    domain: en ? "Education Tools" : "Herramientas Educativas",
    url: "https://quickdraw.withgoogle.com/",
    apiType: "Web scrape",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "medium",
    currentlyIntegrated: false,
    phase: 3,
    description: {
      en: "Drawing game where AI recognizes sketches. 50M+ drawings dataset available. Fun introduction to image recognition.",
      es: "Juego de dibujo donde AI reconoce bocetos. Dataset de 50M+ dibujos disponible. Introducción divertida al reconocimiento de imágenes."
    },
    crRelevance: {
      en: "Gamified AI introduction suitable for younger students and public awareness events.",
      es: "Introducción gamificada a AI adecuada para estudiantes jóvenes y eventos de concientización pública."
    }
  },
  {
    id: "edu-moral-machine",
    name: "MIT Moral Machine",
    domain: en ? "Education Tools" : "Herramientas Educativas",
    url: "https://www.moralmachine.net/",
    apiType: "Web scrape",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Interactive AI ethics experiment: trolley-problem scenarios for autonomous vehicles. 40M+ responses analyzed. Available in Spanish.",
      es: "Experimento interactivo de ética AI: escenarios tipo dilema del tranvía para vehículos autónomos. 40M+ respuestas analizadas. Disponible en español."
    },
    crRelevance: {
      en: "Powerful tool for AI ethics education — CR-specific cultural values can be explored.",
      es: "Herramienta poderosa para educación de ética AI — se pueden explorar valores culturales específicos de CR."
    }
  },
  {
    id: "edu-survival-best-fit",
    name: "Survival of the Best Fit",
    domain: en ? "Education Tools" : "Herramientas Educativas",
    url: "https://www.survivalofthebestfit.com/",
    apiType: "Web scrape",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Interactive game about AI hiring bias: players build a hiring algorithm and discover how bias emerges. Visual storytelling.",
      es: "Juego interactivo sobre sesgo AI en contratación: jugadores construyen un algoritmo de contratación y descubren cómo emerge el sesgo."
    },
    crRelevance: {
      en: "Directly illustrates algorithmic bias risks for CR's growing BPO and shared services sector.",
      es: "Ilustra directamente riesgos de sesgo algorítmico para el creciente sector de BPO y servicios compartidos de CR."
    }
  },
  {
    id: "edu-gapminder",
    name: "Gapminder — Data Visualization Tools",
    domain: en ? "Education Tools" : "Herramientas Educativas",
    url: "https://www.gapminder.org/tools/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Interactive data visualization: animated bubble charts showing development data. Dollar Street photo database. Free teaching resources.",
      es: "Visualización de datos interactiva: gráficos de burbujas animados mostrando datos de desarrollo. Base de fotos Dollar Street. Recursos de enseñanza gratuitos."
    },
    crRelevance: {
      en: "Data literacy foundation — understanding data is prerequisite for understanding AI.",
      es: "Fundamento de alfabetización de datos — entender datos es prerrequisito para entender AI."
    }
  },
  {
    id: "edu-databasic",
    name: "DataBasic.io",
    domain: en ? "Education Tools" : "Herramientas Educativas",
    url: "https://databasic.io/",
    apiType: "Web scrape",
    free: true,
    authRequired: false,
    complexity: "low",
    relevance: "medium",
    currentlyIntegrated: false,
    phase: 3,
    description: {
      en: "Simple data literacy tools: WordCounter, WTFcsv, SameDiff, ConnectTheDots. MIT Civic Media Lab. Spanish interface.",
      es: "Herramientas simples de alfabetización de datos: WordCounter, WTFcsv, SameDiff, ConnectTheDots. MIT Civic Media Lab. Interfaz en español."
    },
    crRelevance: {
      en: "Beginner data literacy tools with Spanish support — ideal for MEP teacher training.",
      es: "Herramientas de alfabetización de datos para principiantes con soporte en español — ideal para capacitación de docentes MEP."
    }
  },
  {
    id: "edu-ml5js",
    name: "ml5.js — Friendly ML for the Web",
    domain: en ? "Education Tools" : "Herramientas Educativas",
    url: "https://ml5js.org/",
    apiType: "Download",
    free: true,
    authRequired: false,
    complexity: "medium",
    relevance: "medium",
    currentlyIntegrated: false,
    phase: 3,
    description: {
      en: "Friendly ML library for JavaScript: pre-trained models for image classification, pose estimation, text generation. Built on TensorFlow.js.",
      es: "Librería ML amigable para JavaScript: modelos pre-entrenados para clasificación de imágenes, estimación de poses, generación de texto. Basada en TensorFlow.js."
    },
    crRelevance: {
      en: "JavaScript-based ML accessible to web developers — aligns with CR's strong web development talent pool.",
      es: "ML basado en JavaScript accesible a desarrolladores web — alinea con el fuerte pool de talento de desarrollo web de CR."
    }
  },
  {
    id: "edu-elements-ai",
    name: "Elements of AI — University of Helsinki",
    domain: en ? "Education Tools" : "Herramientas Educativas",
    url: "https://www.elementsofai.com/",
    apiType: "Web scrape",
    free: true,
    authRequired: true,
    complexity: "low",
    relevance: "high",
    currentlyIntegrated: false,
    phase: 2,
    description: {
      en: "Free online AI course: designed for non-technical audiences. Taken by 1% of Finland's population. Available in 25+ languages.",
      es: "Curso de AI en línea gratuito: diseñado para audiencias no técnicas. Tomado por 1% de la población de Finlandia. Disponible en 25+ idiomas."
    },
    crRelevance: {
      en: "Finland's model of mass AI literacy — CR could replicate targeting 1% population (52,000 people).",
      es: "Modelo de Finlandia de alfabetización AI masiva — CR podría replicar apuntando al 1% de la población (52,000 personas)."
    }
  }
];

// ── Domain summary statistics ──
export const SOURCES_SUMMARY = (en) => ({
  totalSources: 96,
  domains: [
    { name: en ? "Costa Rica Government" : "Gobierno de Costa Rica", count: 22, integrated: 7 },
    { name: en ? "International Organizations" : "Organizaciones Internacionales", count: 28, integrated: 9 },
    { name: en ? "Central Banks LATAM" : "Bancos Centrales LATAM", count: 3, integrated: 0 },
    { name: en ? "AI Governance" : "Gobernanza AI", count: 5, integrated: 4 },
    { name: en ? "Cybersecurity" : "Ciberseguridad", count: 5, integrated: 3 },
    { name: en ? "Financial" : "Financiero", count: 5, integrated: 1 },
    { name: en ? "Environmental" : "Ambiental", count: 7, integrated: 0 },
    { name: en ? "Health" : "Salud", count: 4, integrated: 0 },
    { name: en ? "Research" : "Investigación", count: 5, integrated: 0 },
    { name: en ? "Education Tools" : "Herramientas Educativas", count: 10, integrated: 0 }
  ],
  apiBreakdown: { REST: 42, Download: 28, "Web scrape": 14, SDMX: 2, GraphQL: 1 },
  freePercentage: 94,
  phases: [
    { phase: 1, label: en ? "Currently Integrated" : "Actualmente Integrado", count: 24 },
    { phase: 2, label: en ? "Priority Integration" : "Integración Prioritaria", count: 46 },
    { phase: 3, label: en ? "Future Integration" : "Integración Futura", count: 20 },
    { phase: 4, label: en ? "Long-term / Exploratory" : "Largo Plazo / Exploratorio", count: 6 }
  ]
});
