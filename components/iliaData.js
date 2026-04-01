/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — ILIA 2025 Data Module
   Latin American AI Index (Índice Latinoamericano de IA) 2025
   Full rankings, Costa Rica scorecard, key findings, methodology,
   regional statistics, and dimension structure.
   Sources: CEPAL + CENIA (Chile), ILIA 2025 Report
   ═══════════════════════════════════════════════════════════════ */

// ── ILIA 2025 Full Rankings — 19 Countries ──
export const ILIA_RANKINGS = (en) => [
  {
    rank: 1,
    country: "Chile",
    countryEn: "Chile",
    score: 70.56,
    tier: "Pionero",
    tierEn: "Pioneer",
    change: 0,
    flag: "\u{1F1E8}\u{1F1F1}",
    lat: -33.45,
    lng: -70.67,
    highlight: {
      en: "Retains #1 position with strongest governance and enabling factors in the region.",
      es: "Retiene la posici\u00f3n #1 con la gobernanza y factores habilitantes m\u00e1s fuertes de la regi\u00f3n."
    }
  },
  {
    rank: 2,
    country: "Brasil",
    countryEn: "Brazil",
    score: 67.39,
    tier: "Pionero",
    tierEn: "Pioneer",
    change: 0,
    flag: "\u{1F1E7}\u{1F1F7}",
    lat: -15.79,
    lng: -47.88,
    highlight: {
      en: "Dominates R&D with >90% of regional HPC capacity and 68% of researchers (with Mexico).",
      es: "Domina I+D con >90% de capacidad HPC regional y 68% de investigadores (con M\u00e9xico)."
    }
  },
  {
    rank: 3,
    country: "Uruguay",
    countryEn: "Uruguay",
    score: 62.05,
    tier: "Pionero",
    tierEn: "Pioneer",
    change: 0,
    flag: "\u{1F1FA}\u{1F1FE}",
    lat: -34.88,
    lng: -56.17,
    highlight: {
      en: "Consistent pioneer, strong in digital inclusion and governance frameworks.",
      es: "Pionero consistente, fuerte en inclusi\u00f3n digital y marcos de gobernanza."
    }
  },
  {
    rank: 4,
    country: "Colombia",
    countryEn: "Colombia",
    score: 55.84,
    tier: "Adoptante",
    tierEn: "Adopter",
    change: 1,
    flag: "\u{1F1E8}\u{1F1F4}",
    lat: 4.71,
    lng: -74.07,
    highlight: {
      en: "Top adopter tier, among the 5 countries concentrating 90% of AI publications.",
      es: "L\u00edder del nivel adoptante, entre los 5 pa\u00edses que concentran 90% de publicaciones AI."
    }
  },
  {
    rank: 5,
    country: "Costa Rica",
    countryEn: "Costa Rica",
    score: 53.83,
    tier: "Adoptante",
    tierEn: "Adopter",
    change: 4,
    flag: "\u{1F1E8}\u{1F1F7}",
    lat: 9.93,
    lng: -84.08,
    highlight: {
      en: "AI Overperformer: jumped 4 positions, 10.85 points above regional average. Launched ENIA-CR 2024-2027.",
      es: "Sobrerendimiento AI: subi\u00f3 4 posiciones, 10.85 puntos sobre promedio regional. Lanz\u00f3 ENIA-CR 2024-2027."
    }
  },
  {
    rank: 6,
    country: "Argentina",
    countryEn: "Argentina",
    score: 52.98,
    tier: "Adoptante",
    tierEn: "Adopter",
    change: -1,
    flag: "\u{1F1E6}\u{1F1F7}",
    lat: -34.60,
    lng: -58.38,
    highlight: {
      en: "Strong research base, among top 5 for AI publications. Slight decline in position.",
      es: "Base de investigaci\u00f3n fuerte, entre top 5 en publicaciones AI. Leve descenso de posici\u00f3n."
    }
  },
  {
    rank: 7,
    country: "Per\u00fa",
    countryEn: "Peru",
    score: 49.15,
    tier: "Adoptante",
    tierEn: "Adopter",
    change: 0,
    flag: "\u{1F1F5}\u{1F1EA}",
    lat: -12.05,
    lng: -77.04,
    highlight: {
      en: "Stable adopter, among the leaders in GenAI adoption intensity.",
      es: "Adoptante estable, entre los l\u00edderes en intensidad de adopci\u00f3n de IA Generativa."
    }
  },
  {
    rank: 8,
    country: "M\u00e9xico",
    countryEn: "Mexico",
    score: 47.82,
    tier: "Adoptante",
    tierEn: "Adopter",
    change: -2,
    flag: "\u{1F1F2}\u{1F1FD}",
    lat: 19.43,
    lng: -99.13,
    highlight: {
      en: "Second largest AI research base (with Brazil = 68% of researchers). Dropped 2 positions.",
      es: "Segunda base de investigaci\u00f3n AI m\u00e1s grande (con Brasil = 68% de investigadores). Baj\u00f3 2 posiciones."
    }
  },
  {
    rank: 9,
    country: "Rep. Dominicana",
    countryEn: "Dominican Republic",
    score: 41.25,
    tier: "Adoptante",
    tierEn: "Adopter",
    change: 3,
    flag: "\u{1F1E9}\u{1F1F4}",
    lat: 18.47,
    lng: -69.90,
    highlight: {
      en: "Among the late adopters showing accelerated improvement in ILIA 2025.",
      es: "Entre los adoptantes tard\u00edos mostrando mejora acelerada en ILIA 2025."
    }
  },
  {
    rank: 10,
    country: "Ecuador",
    countryEn: "Ecuador",
    score: 39.20,
    tier: "Adoptante",
    tierEn: "Adopter",
    change: 5,
    flag: "\u{1F1EA}\u{1F1E8}",
    lat: -0.18,
    lng: -78.47,
    highlight: {
      en: "Notable late awakening — among the biggest risers with accelerated improvements.",
      es: "Notable despertar tard\u00edo — entre los mayores avances con mejoras aceleradas."
    }
  },
  {
    rank: 11,
    country: "Panam\u00e1",
    countryEn: "Panama",
    score: 37.85,
    tier: "Adoptante",
    tierEn: "Adopter",
    change: 0,
    flag: "\u{1F1F5}\u{1F1E6}",
    lat: 8.98,
    lng: -79.52,
    highlight: {
      en: "Among GenAI adoption leaders, strong digital infrastructure hub.",
      es: "Entre l\u00edderes en adopci\u00f3n de IA Generativa, hub de infraestructura digital fuerte."
    }
  },
  {
    rank: 12,
    country: "El Salvador",
    countryEn: "El Salvador",
    score: 35.90,
    tier: "Adoptante",
    tierEn: "Adopter",
    change: 1,
    flag: "\u{1F1F8}\u{1F1FB}",
    lat: 13.69,
    lng: -89.19,
    highlight: {
      en: "Excels in open-source software adoption, digital-forward approach.",
      es: "Destaca en adopci\u00f3n de software de c\u00f3digo abierto, enfoque digital-forward."
    }
  },
  {
    rank: 13,
    country: "Jamaica",
    countryEn: "Jamaica",
    score: 33.60,
    tier: "Explorador",
    tierEn: "Explorer",
    change: 0,
    flag: "\u{1F1EF}\u{1F1F2}",
    lat: 18.11,
    lng: -77.30,
    highlight: {
      en: "Leading Caribbean explorer, building foundational AI capabilities.",
      es: "L\u00edder caribe\u00f1o explorador, construyendo capacidades AI fundacionales."
    }
  },
  {
    rank: 14,
    country: "Paraguay",
    countryEn: "Paraguay",
    score: 31.45,
    tier: "Explorador",
    tierEn: "Explorer",
    change: 0,
    flag: "\u{1F1F5}\u{1F1FE}",
    lat: -25.26,
    lng: -57.58,
    highlight: {
      en: "Explorer stage, developing national AI capacity frameworks.",
      es: "Etapa explorador, desarrollando marcos de capacidad AI nacional."
    }
  },
  {
    rank: 15,
    country: "Cuba",
    countryEn: "Cuba",
    score: 29.80,
    tier: "Explorador",
    tierEn: "Explorer",
    change: 1,
    flag: "\u{1F1E8}\u{1F1FA}",
    lat: 23.11,
    lng: -82.37,
    highlight: {
      en: "Excels in open-source software development despite infrastructure constraints.",
      es: "Destaca en desarrollo de software de c\u00f3digo abierto a pesar de limitaciones de infraestructura."
    }
  },
  {
    rank: 16,
    country: "Guatemala",
    countryEn: "Guatemala",
    score: 28.15,
    tier: "Explorador",
    tierEn: "Explorer",
    change: 2,
    flag: "\u{1F1EC}\u{1F1F9}",
    lat: 14.63,
    lng: -90.51,
    highlight: {
      en: "Among the late adopters showing accelerated improvements in 2025.",
      es: "Entre los adoptantes tard\u00edos mostrando mejoras aceleradas en 2025."
    }
  },
  {
    rank: 17,
    country: "Honduras",
    countryEn: "Honduras",
    score: 25.90,
    tier: "Explorador",
    tierEn: "Explorer",
    change: 0,
    flag: "\u{1F1ED}\u{1F1F3}",
    lat: 14.07,
    lng: -87.19,
    highlight: {
      en: "Excels in open-source software, building from limited base.",
      es: "Destaca en software de c\u00f3digo abierto, construyendo desde base limitada."
    }
  },
  {
    rank: 18,
    country: "Bolivia",
    countryEn: "Bolivia",
    score: 26.06,
    tier: "Explorador",
    tierEn: "Explorer",
    change: -1,
    flag: "\u{1F1E7}\u{1F1F4}",
    lat: -16.50,
    lng: -68.15,
    highlight: {
      en: "Explorer stage, limited AI infrastructure and governance frameworks.",
      es: "Etapa explorador, infraestructura AI y marcos de gobernanza limitados."
    }
  },
  {
    rank: 19,
    country: "Venezuela",
    countryEn: "Venezuela",
    score: 19.50,
    tier: "Explorador",
    tierEn: "Explorer",
    change: 0,
    flag: "\u{1F1FB}\u{1F1EA}",
    lat: 10.49,
    lng: -66.88,
    highlight: {
      en: "Lowest ranked, significant infrastructure and governance gaps.",
      es: "\u00daltimo en ranking, brechas significativas en infraestructura y gobernanza."
    }
  }
];

// ── Tier Definitions ──
export const ILIA_TIERS = (en) => [
  {
    id: "pionero",
    name: en ? "Pioneer" : "Pionero",
    range: en ? "60-100" : "60-100",
    color: "#22c55e",
    count: 3,
    description: {
      en: "Countries with advanced AI ecosystems, robust governance, and significant R&D capacity. Leading the region in policy frameworks and adoption.",
      es: "Pa\u00edses con ecosistemas AI avanzados, gobernanza robusta y capacidad significativa de I+D. Lideran la regi\u00f3n en marcos de pol\u00edtica y adopci\u00f3n."
    }
  },
  {
    id: "adoptante",
    name: en ? "Adopter" : "Adoptante",
    range: en ? "35-60" : "35-60",
    color: "#eab308",
    count: 9,
    description: {
      en: "Countries actively building AI capabilities with national strategies or adoption programs. Growing infrastructure and talent base.",
      es: "Pa\u00edses construyendo activamente capacidades AI con estrategias nacionales o programas de adopci\u00f3n. Infraestructura y base de talento en crecimiento."
    }
  },
  {
    id: "explorador",
    name: en ? "Explorer" : "Explorador",
    range: en ? "0-35" : "0-35",
    color: "#ef4444",
    count: 7,
    description: {
      en: "Countries in early stages of AI development, with limited infrastructure, minimal governance frameworks, and nascent talent pipelines.",
      es: "Pa\u00edses en etapas tempranas de desarrollo AI, con infraestructura limitada, marcos de gobernanza m\u00ednimos y pipelines de talento nacientes."
    }
  }
];

// ── Costa Rica Complete ILIA 2025 Scorecard ──
export const CR_ILIA_PROFILE = (en) => ({
  overall: {
    score: 53.83,
    position: 5,
    tier: en ? "Adopter" : "Adoptante",
    regionalAvg: 42.98,
    aboveAvg: 10.85,
    change: 4,
    changeLabel: en ? "Up 4 positions from 2024" : "Subi\u00f3 4 posiciones desde 2024"
  },
  dimensions: [
    {
      id: "enabling",
      name: en ? "Enabling Factors" : "Factores Habilitantes",
      score: 49.92,
      position: 6,
      subdimensions: [
        {
          id: "infrastructure",
          name: en ? "Infrastructure" : "Infraestructura",
          score: 53.11,
          position: 5,
          indicators: [
            {
              id: "connectivity",
              name: en ? "Connectivity" : "Conectividad",
              score: 68.14,
              regionalAvg: 61.08,
              position: 5,
              detail: {
                en: "85.4% internet users (4th in region), 81.7% households with internet, 95% mobile coverage, only 9.8% 5G coverage",
                es: "85.4% usuarios internet (4o en regi\u00f3n), 81.7% hogares con internet, 95% cobertura m\u00f3vil, solo 9.8% cobertura 5G"
              }
            },
            {
              id: "compute",
              name: en ? "Compute" : "C\u00f3mputo",
              score: 37.77,
              regionalAvg: 21.31,
              position: 3,
              detail: {
                en: "4th in GPU capacity, strong HPC infrastructure. #1 in certified data centers per million inhabitants.",
                es: "4o en capacidad GPU, infraestructura HPC fuerte. #1 en centros de datos certificados por mill\u00f3n de habitantes."
              }
            },
            {
              id: "devices",
              name: en ? "Devices" : "Dispositivos",
              score: 38.38,
              regionalAvg: 40.34,
              position: 11,
              detail: {
                en: "Below regional average in device penetration. Gap in personal computing access.",
                es: "Por debajo del promedio regional en penetraci\u00f3n de dispositivos. Brecha en acceso a computaci\u00f3n personal."
              }
            }
          ]
        },
        {
          id: "data",
          name: en ? "Data" : "Datos",
          score: 39.73,
          position: 13,
          indicators: [
            {
              id: "data-barometer",
              name: en ? "Data Barometer" : "Bar\u00f3metro de Datos",
              score: 39.73,
              regionalAvg: 47.73,
              position: 13,
              detail: {
                en: "Improved 9.2 points to 39.73 but still below regional average. Data openness remains a weakness.",
                es: "Mejor\u00f3 9.2 puntos a 39.73 pero a\u00fan por debajo del promedio regional. Apertura de datos sigue como debilidad."
              }
            }
          ]
        },
        {
          id: "talent",
          name: en ? "Human Talent" : "Talento Humano",
          score: 53.62,
          position: 3,
          indicators: [
            {
              id: "ai-literacy",
              name: en ? "AI Literacy" : "Alfabetizaci\u00f3n en IA",
              score: 74.39,
              regionalAvg: 60.61,
              position: 3,
              detail: {
                en: "Strong AI skills concentration, 3rd in region. Leader in professional AI skills.",
                es: "Fuerte concentraci\u00f3n de habilidades AI, 3o en regi\u00f3n. L\u00edder en habilidades AI profesionales."
              }
            },
            {
              id: "professional-training",
              name: en ? "Professional AI Training" : "Formaci\u00f3n Profesional en IA",
              score: 59.06,
              regionalAvg: 30.28,
              position: 2,
              detail: {
                en: "#1 in professional AI skills concentration. Nearly 2x regional average.",
                es: "#1 en concentraci\u00f3n de habilidades AI profesionales. Casi 2x el promedio regional."
              }
            },
            {
              id: "advanced-talent",
              name: en ? "Advanced Human Talent" : "Talento Humano Avanzado",
              score: 20.49,
              regionalAvg: 13.32,
              position: 3,
              detail: {
                en: "Small but growing advanced talent pool, 3rd in region despite limited doctoral programs.",
                es: "Grupo de talento avanzado peque\u00f1o pero creciente, 3o en regi\u00f3n a pesar de programas doctorales limitados."
              }
            }
          ]
        }
      ]
    },
    {
      id: "rda",
      name: en ? "R&D&A (Research, Development & Adoption)" : "I+D+A (Investigaci\u00f3n, Desarrollo y Adopci\u00f3n)",
      score: 41.34,
      position: 8,
      subdimensions: [
        {
          id: "research",
          name: en ? "Research" : "Investigaci\u00f3n",
          score: 33.81,
          position: 11,
          indicators: [
            {
              id: "research-output",
              name: en ? "Research" : "Investigaci\u00f3n",
              score: 33.81,
              regionalAvg: 35.80,
              position: 11,
              detail: {
                en: "Below regional average. Limited participation in elite AI conferences, scarce and concentrated research output.",
                es: "Por debajo del promedio regional. Participaci\u00f3n limitada en conferencias AI de \u00e9lite, investigaci\u00f3n escasa y concentrada."
              }
            }
          ]
        },
        {
          id: "rd",
          name: en ? "R&D" : "I+D",
          score: 26.47,
          position: 12,
          indicators: [
            {
              id: "innovation",
              name: en ? "Innovation" : "Innovaci\u00f3n",
              score: 24.06,
              regionalAvg: 30.68,
              position: 9,
              detail: {
                en: "Innovation capacity below average. Limited AI patenting and startup ecosystem.",
                es: "Capacidad de innovaci\u00f3n por debajo del promedio. Patentamiento AI y ecosistema de startups limitados."
              }
            },
            {
              id: "development",
              name: en ? "Development" : "Desarrollo",
              score: 28.89,
              regionalAvg: 31.58,
              position: 14,
              detail: {
                en: "Software development below average. Gap in AI-specific development output.",
                es: "Desarrollo de software por debajo del promedio. Brecha en producci\u00f3n de desarrollo espec\u00edfico de AI."
              }
            }
          ]
        },
        {
          id: "adoption",
          name: en ? "Adoption" : "Adopci\u00f3n",
          score: 66.27,
          position: 4,
          indicators: [
            {
              id: "industry",
              name: en ? "Industry" : "Industria",
              score: 50.32,
              regionalAvg: 47.25,
              position: 5,
              detail: {
                en: "Above average industry AI adoption, growing enterprise use cases.",
                es: "Adopci\u00f3n AI industrial sobre el promedio, casos de uso empresarial en crecimiento."
              }
            },
            {
              id: "government",
              name: en ? "Government" : "Gobierno",
              score: 56.88,
              regionalAvg: 43.07,
              position: 6,
              detail: {
                en: "Government AI adoption above average. Digital government services expanding.",
                es: "Adopci\u00f3n AI gubernamental sobre el promedio. Servicios de gobierno digital en expansi\u00f3n."
              }
            },
            {
              id: "genai",
              name: en ? "Generative AI" : "IA Generativa",
              score: 78.17,
              regionalAvg: 57.27,
              position: 2,
              detail: {
                en: "#2 in region. 1.1 million GenAI app downloads. Part of the high-intensity usage group.",
                es: "#2 en regi\u00f3n. 1.1 millones de descargas de apps de IA Generativa. Parte del grupo de uso de alta intensidad."
              }
            },
            {
              id: "ai-web-traffic",
              name: en ? "AI Web Traffic" : "Tr\u00e1fico Web de IA",
              score: 79.69,
              regionalAvg: 53.56,
              position: 2,
              detail: {
                en: "#2 in region. 4.7 visits per internet user (high intensity). 0.97 advanced AI visits per user.",
                es: "#2 en regi\u00f3n. 4.7 visitas por usuario de internet (alta intensidad). 0.97 visitas avanzadas AI por usuario."
              }
            }
          ]
        }
      ]
    },
    {
      id: "governance",
      name: en ? "Governance" : "Gobernanza",
      score: 77.55,
      position: 4,
      subdimensions: [
        {
          id: "vision",
          name: en ? "Vision & Institutionality" : "Visi\u00f3n e Institucionalidad",
          score: 87.27,
          position: 4,
          indicators: [
            {
              id: "ai-strategy",
              name: en ? "AI Strategy" : "Estrategia de IA",
              score: 87.04,
              regionalAvg: 38.84,
              position: 5,
              detail: {
                en: "ENIA-CR 2024-2027 launched. Governance score jumped from 6.2 to 80.8 after strategy adoption.",
                es: "ENIA-CR 2024-2027 lanzada. Puntaje de gobernanza salt\u00f3 de 6.2 a 80.8 tras adopci\u00f3n de estrategia."
              }
            },
            {
              id: "society-involvement",
              name: en ? "Society Involvement" : "Involucramiento de la Sociedad",
              score: 75.00,
              regionalAvg: 32.89,
              position: 4,
              detail: {
                en: "Strong civil society engagement in AI policy processes.",
                es: "Fuerte involucramiento de sociedad civil en procesos de pol\u00edtica AI."
              }
            },
            {
              id: "institutionality",
              name: en ? "Institutionality" : "Institucionalidad",
              score: 100.0,
              regionalAvg: 39.47,
              position: 1,
              detail: {
                en: "Perfect score — #1 in region. Strongest institutional framework for AI governance in LATAM.",
                es: "Puntaje perfecto — #1 en regi\u00f3n. Marco institucional m\u00e1s fuerte para gobernanza AI en LATAM."
              }
            }
          ]
        },
        {
          id: "international",
          name: en ? "International Engagement" : "Vinculaci\u00f3n Internacional",
          score: 75.00,
          position: 5,
          indicators: [
            {
              id: "standards",
              name: en ? "Standards Participation" : "Participaci\u00f3n en Est\u00e1ndares",
              score: 50.00,
              regionalAvg: 36.84,
              position: 5,
              detail: {
                en: "Active in international AI standards bodies, above regional average.",
                es: "Activo en organismos internacionales de est\u00e1ndares AI, sobre promedio regional."
              }
            },
            {
              id: "organizations",
              name: en ? "Organization Participation" : "Participaci\u00f3n en Organismos",
              score: 100.0,
              regionalAvg: 92.11,
              position: 1,
              detail: {
                en: "Perfect score — participates in all major international AI organizations.",
                es: "Puntaje perfecto — participa en todos los organismos internacionales de AI principales."
              }
            }
          ]
        },
        {
          id: "regulation",
          name: en ? "Regulation" : "Regulaci\u00f3n",
          score: 63.07,
          position: 8,
          indicators: [
            {
              id: "ai-regulation",
              name: en ? "AI Regulation" : "Regulaci\u00f3n de IA",
              score: 50.00,
              regionalAvg: 39.47,
              position: 3,
              detail: {
                en: "Above average regulatory framework, 3rd in region.",
                es: "Marco regulatorio sobre el promedio, 3o en regi\u00f3n."
              }
            },
            {
              id: "cybersecurity",
              name: en ? "Cybersecurity" : "Ciberseguridad",
              score: 75.87,
              regionalAvg: 66.31,
              position: 7,
              detail: {
                en: "Solid cybersecurity posture, above regional average.",
                es: "Postura de ciberseguridad s\u00f3lida, sobre promedio regional."
              }
            },
            {
              id: "ethics",
              name: en ? "Ethics & Sustainability" : "\u00c9tica y Sustentabilidad",
              score: 65.79,
              regionalAvg: 44.33,
              position: 3,
              detail: {
                en: "#2 in data center sustainability, #3 in renewable energy share. Strong ethical AI frameworks.",
                es: "#2 en sustentabilidad de centros de datos, #3 en participaci\u00f3n de energ\u00eda renovable. Marcos \u00e9ticos de AI fuertes."
              }
            },
            {
              id: "data-regulation",
              name: en ? "Personal Data Regulation" : "Regulaci\u00f3n de Datos Personales",
              score: 50.00,
              regionalAvg: 68.42,
              position: 12,
              detail: {
                en: "Below regional average — data protection framework lags behind peers.",
                es: "Por debajo del promedio regional — marco de protecci\u00f3n de datos rezagado respecto a pares."
              }
            }
          ]
        }
      ]
    }
  ]
});

// ── ILIA 2025 Key Findings (11 Hallazgos) ──
export const ILIA_FINDINGS = (en) => [
  {
    id: 1,
    title: en
      ? "The Awakening of Late Adopters"
      : "El despertar de los adoptantes tard\u00edos",
    summary: {
      en: "Ecuador, Costa Rica, Dominican Republic, and Guatemala show the most accelerated improvements, reversing regional inertia with significant AI commitment increases.",
      es: "Ecuador, Costa Rica, Rep. Dominicana y Guatemala muestran las mejoras m\u00e1s aceleradas, revirtiendo la inercia regional con aumentos significativos en compromiso con AI."
    },
    countries: ["Ecuador", "Costa Rica", "Rep. Dominicana", "Guatemala"],
    crRelevance: {
      en: "Costa Rica is one of the star performers — jumped 4 positions to #5, described as an 'AI Overperformer.'",
      es: "Costa Rica es uno de los protagonistas — subi\u00f3 4 posiciones al #5, descrito como un 'Sobrerendidor de AI.'"
    },
    icon: "TrendingUp"
  },
  {
    id: 2,
    title: en
      ? "Open Source: The Opportunity"
      : "C\u00f3digo abierto: la oportunidad",
    summary: {
      en: "Honduras, El Salvador, and Cuba excel in open-source software contributions, providing an alternative development pathway for resource-constrained countries.",
      es: "Honduras, El Salvador y Cuba destacan en contribuciones de software de c\u00f3digo abierto, proporcionando una v\u00eda alternativa de desarrollo para pa\u00edses con recursos limitados."
    },
    countries: ["Honduras", "El Salvador", "Cuba"],
    crRelevance: {
      en: "Open source represents a strategic opportunity for Costa Rica's talent pool to contribute to global AI development.",
      es: "El c\u00f3digo abierto representa una oportunidad estrat\u00e9gica para el talento de Costa Rica de contribuir al desarrollo AI global."
    },
    icon: "Code"
  },
  {
    id: 3,
    title: en
      ? "Abundant Data, Poor Availability"
      : "Muchos datos, pero poca disponibilidad",
    summary: {
      en: "The region produces significant data but lacks openness and standardization. Data governance frameworks are inconsistent across countries.",
      es: "La regi\u00f3n produce datos significativos pero carece de apertura y estandarizaci\u00f3n. Los marcos de gobernanza de datos son inconsistentes entre pa\u00edses."
    },
    countries: [],
    crRelevance: {
      en: "Costa Rica's Data Barometer score (39.73) is below the regional average (47.73), highlighting data openness as a key weakness at position 13.",
      es: "El puntaje del Bar\u00f3metro de Datos de Costa Rica (39.73) est\u00e1 por debajo del promedio regional (47.73), destacando la apertura de datos como debilidad clave en posici\u00f3n 13."
    },
    icon: "Database"
  },
  {
    id: 4,
    title: en
      ? "Talent: Literacy Up, Specialization Down"
      : "Talento humano: alfabetizaci\u00f3n, poca especializaci\u00f3n",
    summary: {
      en: "AI literacy is 2x the level of professional training, and 4x that of advanced specialization. The talent pipeline narrows dramatically at higher levels.",
      es: "La alfabetizaci\u00f3n AI es 2x el nivel de formaci\u00f3n profesional y 4x el de especializaci\u00f3n avanzada. El pipeline de talento se estrecha dr\u00e1sticamente en niveles superiores."
    },
    countries: [],
    crRelevance: {
      en: "Costa Rica is 3rd in talent overall, leader in professional AI skills concentration, but advanced talent (20.49) remains limited.",
      es: "Costa Rica es 3o en talento general, l\u00edder en concentraci\u00f3n de habilidades AI profesionales, pero el talento avanzado (20.49) sigue limitado."
    },
    icon: "GraduationCap"
  },
  {
    id: 5,
    title: en
      ? "Talent & Infrastructure for Digital Sovereignty"
      : "Talento e infraestructura para soberan\u00eda digital",
    summary: {
      en: "Brazil holds >90% of regional HPC capacity. 13 of 19 countries have no AI curriculum in schools. The digital sovereignty gap is widening.",
      es: "Brasil posee >90% de la capacidad HPC regional. 13 de 19 pa\u00edses no tienen curr\u00edculo de AI en escuelas. La brecha de soberan\u00eda digital se ampl\u00eda."
    },
    countries: ["Brasil"],
    crRelevance: {
      en: "Costa Rica is among the 6 countries with AI curriculum progress. 4th in GPU capacity and #1 in certified data centers per million inhabitants.",
      es: "Costa Rica est\u00e1 entre los 6 pa\u00edses con avance en curr\u00edculo de AI. 4o en capacidad GPU y #1 en centros de datos certificados por mill\u00f3n de habitantes."
    },
    icon: "Server"
  },
  {
    id: 6,
    title: en
      ? "Generative AI: Democratizing Access"
      : "IA Generativa: democratizaci\u00f3n del acceso",
    summary: {
      en: "Chile, Costa Rica, Peru, Uruguay, Panama, and Dominican Republic lead GenAI usage. LATAM is the 3rd region globally in GenAI app downloads (15-20% of global).",
      es: "Chile, Costa Rica, Per\u00fa, Uruguay, Panam\u00e1 y Rep. Dominicana lideran uso de IA Generativa. LATAM es la 3a regi\u00f3n global en descargas de apps GenAI (15-20% del global)."
    },
    countries: ["Chile", "Costa Rica", "Per\u00fa", "Uruguay", "Panam\u00e1", "Rep. Dominicana"],
    crRelevance: {
      en: "Costa Rica is #2 in GenAI adoption (78.17) and AI web traffic (79.69). 1.1M GenAI app downloads, 4.7 visits per internet user.",
      es: "Costa Rica es #2 en adopci\u00f3n de IA Generativa (78.17) y tr\u00e1fico web AI (79.69). 1.1M descargas de apps GenAI, 4.7 visitas por usuario de internet."
    },
    icon: "Sparkles"
  },
  {
    id: 7,
    title: en
      ? "AI & Citizen Participation: Untapped Paradigm"
      : "IA y participaci\u00f3n ciudadana: paradigma desaprovechado",
    summary: {
      en: "Most countries limit AI in government to basic chatbots. 8 countries have zero citizen participation use cases for AI.",
      es: "La mayor\u00eda de los pa\u00edses limitan la AI en gobierno a chatbots b\u00e1sicos. 8 pa\u00edses tienen cero casos de uso de participaci\u00f3n ciudadana con AI."
    },
    countries: [],
    crRelevance: {
      en: "Costa Rica's government AI adoption score (56.88) is above average, but citizen participation applications remain underdeveloped.",
      es: "El puntaje de adopci\u00f3n AI gubernamental de Costa Rica (56.88) est\u00e1 sobre el promedio, pero las aplicaciones de participaci\u00f3n ciudadana siguen subdesarrolladas."
    },
    icon: "Users"
  },
  {
    id: 8,
    title: en
      ? "Scarce and Concentrated Research"
      : "Investigaci\u00f3n escasa y concentrada",
    summary: {
      en: "Brazil + Mexico = 68% of researchers. Adding Colombia, Chile, Argentina = 90% of publications. Only 7 countries participate in elite AI conferences.",
      es: "Brasil + M\u00e9xico = 68% de investigadores. Sumando Colombia, Chile, Argentina = 90% de publicaciones. Solo 7 pa\u00edses participan en conferencias AI de \u00e9lite."
    },
    countries: ["Brasil", "M\u00e9xico", "Colombia", "Chile", "Argentina"],
    crRelevance: {
      en: "Costa Rica's research score (33.81, position 11) is below average. Expanding research capacity is critical for long-term AI development.",
      es: "El puntaje de investigaci\u00f3n de Costa Rica (33.81, posici\u00f3n 11) est\u00e1 por debajo del promedio. Expandir la capacidad de investigaci\u00f3n es cr\u00edtico para el desarrollo AI a largo plazo."
    },
    icon: "BookOpen"
  },
  {
    id: 9,
    title: en
      ? "Governance: Big Plans, Little Action"
      : "Gobernanza: mucho plan y poca acci\u00f3n",
    summary: {
      en: "9 countries have national AI strategies, but few have dedicated budgets or implementation mechanisms. The plan-to-action gap persists.",
      es: "9 pa\u00edses tienen estrategias nacionales de AI, pero pocos tienen presupuestos dedicados o mecanismos de implementaci\u00f3n. La brecha plan-acci\u00f3n persiste."
    },
    countries: [],
    crRelevance: {
      en: "Costa Rica launched ENIA-CR 2024-2027, jumping governance from 6.2 to 80.8. The challenge is sustained implementation with dedicated budget.",
      es: "Costa Rica lanz\u00f3 ENIA-CR 2024-2027, saltando gobernanza de 6.2 a 80.8. El desaf\u00edo es la implementaci\u00f3n sostenida con presupuesto dedicado."
    },
    icon: "FileText"
  },
  {
    id: 10,
    title: en
      ? "Sustainability: Urgent Call"
      : "Sustentabilidad: llamado urgente",
    summary: {
      en: "Only 4 countries (Brazil, Chile, Colombia, Mexico) have robust data center infrastructure. Only 1 in 5 meets sustainability standards.",
      es: "Solo 4 pa\u00edses (Brasil, Chile, Colombia, M\u00e9xico) tienen infraestructura robusta de centros de datos. Solo 1 de 5 cumple est\u00e1ndares de sustentabilidad."
    },
    countries: ["Brasil", "Chile", "Colombia", "M\u00e9xico"],
    crRelevance: {
      en: "Costa Rica is #2 in data center sustainability and #3 in renewable energy share — a strong differentiator.",
      es: "Costa Rica es #2 en sustentabilidad de centros de datos y #3 en participaci\u00f3n de energ\u00eda renovable — un diferenciador fuerte."
    },
    icon: "Leaf"
  },
  {
    id: 11,
    title: en
      ? "AI Entrepreneurship: Untapped Opportunity"
      : "Emprendimiento en IA: oportunidad",
    summary: {
      en: "The 19 ILIA countries represent only 1.12% of global AI investment — 6x below their fair GDP share. AI unicorns exist in only 6 countries.",
      es: "Los 19 pa\u00edses ILIA representan solo 1.12% de la inversi\u00f3n global en AI — 6x por debajo de su participaci\u00f3n justa por PIB. Unicornios AI existen en solo 6 pa\u00edses."
    },
    countries: [],
    crRelevance: {
      en: "Costa Rica has a growing tech ecosystem but limited AI-specific venture capital. Closing the investment gap is essential.",
      es: "Costa Rica tiene un ecosistema tech creciente pero capital de riesgo espec\u00edfico para AI limitado. Cerrar la brecha de inversi\u00f3n es esencial."
    },
    icon: "Rocket"
  }
];

// ── Costa Rica Specific Highlights ──
export const CR_HIGHLIGHTS = (en) => [
  {
    category: en ? "Overall Performance" : "Desempe\u00f1o General",
    icon: "Award",
    items: [
      {
        label: en ? "Overall Score" : "Puntaje General",
        value: "53.83",
        context: en ? "Up 4 positions to #5" : "Subi\u00f3 4 posiciones al #5"
      },
      {
        label: en ? "Above Regional Average" : "Sobre Promedio Regional",
        value: "+10.85",
        context: en ? "points above the 42.98 regional average" : "puntos sobre el promedio regional de 42.98"
      },
      {
        label: en ? "Classification" : "Clasificaci\u00f3n",
        value: en ? "AI Overperformer" : "Sobrerendidor AI",
        context: en ? "One of the most notable improvements in ILIA 2025" : "Una de las mejoras m\u00e1s notables en ILIA 2025"
      }
    ]
  },
  {
    category: en ? "Infrastructure Strengths" : "Fortalezas de Infraestructura",
    icon: "Server",
    items: [
      {
        label: en ? "Internet Users" : "Usuarios de Internet",
        value: "85.4%",
        context: en ? "4th highest internet user proportion in region" : "4a proporci\u00f3n m\u00e1s alta de usuarios internet en regi\u00f3n"
      },
      {
        label: en ? "Household Internet" : "Internet en Hogares",
        value: "81.7%",
        context: en ? "Strong household connectivity" : "Fuerte conectividad en hogares"
      },
      {
        label: en ? "Mobile Coverage" : "Cobertura M\u00f3vil",
        value: "95%",
        context: en ? "Near-universal mobile network coverage" : "Cobertura de red m\u00f3vil casi universal"
      },
      {
        label: en ? "5G Coverage" : "Cobertura 5G",
        value: "9.8%",
        context: en ? "Significant gap — needs investment" : "Brecha significativa — necesita inversi\u00f3n"
      },
      {
        label: en ? "Data Centers" : "Centros de Datos",
        value: "#1",
        context: en ? "Certified data centers per million inhabitants" : "Centros de datos certificados por mill\u00f3n de habitantes"
      },
      {
        label: en ? "GPU Capacity" : "Capacidad GPU",
        value: "#4",
        context: en ? "4th in region in GPU/HPC infrastructure" : "4o en regi\u00f3n en infraestructura GPU/HPC"
      }
    ]
  },
  {
    category: en ? "Talent & Skills" : "Talento y Habilidades",
    icon: "GraduationCap",
    items: [
      {
        label: en ? "Talent Position" : "Posici\u00f3n en Talento",
        value: "#3",
        context: en ? "3rd overall in Human Talent dimension" : "3o en general en dimensi\u00f3n de Talento Humano"
      },
      {
        label: en ? "AI Professional Skills" : "Habilidades Profesionales AI",
        value: "#1",
        context: en ? "Leader in professional AI skills concentration" : "L\u00edder en concentraci\u00f3n de habilidades AI profesionales"
      },
      {
        label: en ? "AI Literacy" : "Alfabetizaci\u00f3n AI",
        value: "74.39",
        context: en ? "3rd in region (regional avg: 60.61)" : "3o en regi\u00f3n (promedio regional: 60.61)"
      }
    ]
  },
  {
    category: en ? "Governance Leap" : "Salto en Gobernanza",
    icon: "Shield",
    items: [
      {
        label: en ? "ENIA-CR" : "ENIA-CR",
        value: "2024-2027",
        context: en ? "National AI Strategy launched" : "Estrategia Nacional de IA lanzada"
      },
      {
        label: en ? "Governance Jump" : "Salto en Gobernanza",
        value: "6.2 \u2192 80.8",
        context: en ? "Historic improvement after strategy adoption" : "Mejora hist\u00f3rica tras adopci\u00f3n de estrategia"
      },
      {
        label: en ? "Institutionality" : "Institucionalidad",
        value: "100.0",
        context: en ? "Perfect score — #1 in region" : "Puntaje perfecto — #1 en regi\u00f3n"
      },
      {
        label: en ? "International Orgs" : "Organismos Internacionales",
        value: "100.0",
        context: en ? "Participates in all major AI organizations" : "Participa en todos los organismos AI principales"
      }
    ]
  },
  {
    category: en ? "GenAI Adoption" : "Adopci\u00f3n de IA Generativa",
    icon: "Sparkles",
    items: [
      {
        label: en ? "GenAI Score" : "Puntaje GenAI",
        value: "78.17",
        context: en ? "#2 in region (regional avg: 57.27)" : "#2 en regi\u00f3n (promedio regional: 57.27)"
      },
      {
        label: en ? "AI Web Traffic" : "Tr\u00e1fico Web AI",
        value: "79.69",
        context: en ? "#2 in region (regional avg: 53.56)" : "#2 en regi\u00f3n (promedio regional: 53.56)"
      },
      {
        label: en ? "GenAI Downloads" : "Descargas GenAI",
        value: "1.1M",
        context: en ? "GenAI app downloads" : "Descargas de apps de IA Generativa"
      },
      {
        label: en ? "Visit Intensity" : "Intensidad de Visitas",
        value: "4.7",
        context: en ? "AI visits per internet user (high intensity group)" : "Visitas AI por usuario de internet (grupo de alta intensidad)"
      },
      {
        label: en ? "Advanced AI Visits" : "Visitas AI Avanzadas",
        value: "0.97",
        context: en ? "Advanced AI visits per internet user" : "Visitas AI avanzadas por usuario de internet"
      }
    ]
  },
  {
    category: en ? "Sustainability Edge" : "Ventaja en Sustentabilidad",
    icon: "Leaf",
    items: [
      {
        label: en ? "Data Center Sustainability" : "Sustentabilidad de Centros de Datos",
        value: "#2",
        context: en ? "2nd in region for sustainable data centers" : "2o en regi\u00f3n en centros de datos sustentables"
      },
      {
        label: en ? "Renewable Energy" : "Energ\u00eda Renovable",
        value: "#3",
        context: en ? "3rd in renewable energy share for AI infrastructure" : "3o en participaci\u00f3n de energ\u00eda renovable para infraestructura AI"
      }
    ]
  },
  {
    category: en ? "Key Weaknesses" : "Debilidades Clave",
    icon: "AlertTriangle",
    items: [
      {
        label: en ? "Data Openness" : "Apertura de Datos",
        value: "39.73",
        context: en ? "Below regional avg 47.73, position 13" : "Por debajo del promedio regional 47.73, posici\u00f3n 13"
      },
      {
        label: en ? "Research" : "Investigaci\u00f3n",
        value: "33.81",
        context: en ? "Position 11, below regional average" : "Posici\u00f3n 11, por debajo del promedio regional"
      },
      {
        label: en ? "Innovation" : "Innovaci\u00f3n",
        value: "24.06",
        context: en ? "Position 9, limited patenting and startup ecosystem" : "Posici\u00f3n 9, patentamiento y ecosistema de startups limitados"
      },
      {
        label: en ? "IPv6 Adoption" : "Adopci\u00f3n IPv6",
        value: "29.8",
        context: en ? "vs regional 50.8 — position 16" : "vs regional 50.8 — posici\u00f3n 16"
      },
      {
        label: en ? "Personal Data Regulation" : "Regulaci\u00f3n de Datos Personales",
        value: "50.00",
        context: en ? "Below regional avg 68.42, position 12" : "Por debajo del promedio regional 68.42, posici\u00f3n 12"
      }
    ]
  }
];

// ── ILIA 2025 Methodology ──
export const ILIA_METHODOLOGY = (en) => ({
  name: en ? "ILIA — Latin American AI Index" : "ILIA — \u00cdndice Latinoamericano de Inteligencia Artificial",
  edition: en ? "3rd Edition (2023, 2024, 2025)" : "3a Edici\u00f3n (2023, 2024, 2025)",
  publishers: ["CEPAL (ECLAC)", "CENIA Chile"],
  url: "https://indicelatam.cl/",
  year: 2025,
  scope: {
    dimensions: 3,
    subdimensions: 9,
    subindicators: "100+",
    countries: 19,
    description: {
      en: "The ILIA measures AI development across Latin America through three core dimensions: Enabling Factors, Research/Development/Adoption, and Governance. Over 100 subindicators are normalized to a 0-100 scale using min-max normalization with expert-validated weightings.",
      es: "El ILIA mide el desarrollo de AI en Am\u00e9rica Latina a trav\u00e9s de tres dimensiones centrales: Factores Habilitantes, Investigaci\u00f3n/Desarrollo/Adopci\u00f3n y Gobernanza. M\u00e1s de 100 subindicadores son normalizados a escala 0-100 usando normalizaci\u00f3n min-max con ponderaciones validadas por expertos."
    }
  },
  normalization: {
    en: "Min-max normalization to 0-100 scale. Missing data handled via imputation methods. Equal weighting within dimensions, validated by expert panel.",
    es: "Normalizaci\u00f3n min-max a escala 0-100. Datos faltantes tratados v\u00eda m\u00e9todos de imputaci\u00f3n. Ponderaci\u00f3n igualitaria dentro de dimensiones, validada por panel de expertos."
  },
  peerReview: {
    en: "Methodology peer-reviewed by Technical Advisory Committee with international experts.",
    es: "Metodolog\u00eda revisada por pares por Comit\u00e9 T\u00e9cnico Asesor con expertos internacionales."
  },
  newIn2025: {
    en: "New in 2025: adoption metrics via digital footprints including web traffic analysis, app usage data, and generative AI penetration measurement.",
    es: "Nuevo en 2025: m\u00e9tricas de adopci\u00f3n v\u00eda huellas digitales incluyendo an\u00e1lisis de tr\u00e1fico web, datos de uso de apps y medici\u00f3n de penetraci\u00f3n de IA generativa."
  },
  dataSources: [
    { name: "OpenAlex", type: en ? "Academic publications" : "Publicaciones acad\u00e9micas" },
    { name: "GitHub", type: en ? "Open-source development" : "Desarrollo de c\u00f3digo abierto" },
    { name: "LinkedIn", type: en ? "AI talent and skills" : "Talento y habilidades AI" },
    { name: "Coursera", type: en ? "AI education and training" : "Educaci\u00f3n y formaci\u00f3n en AI" },
    { name: "Sensor Tower", type: en ? "App downloads and usage" : "Descargas y uso de apps" },
    { name: "Foresight", type: en ? "Technology foresight" : "Prospectiva tecnol\u00f3gica" },
    { name: "GIRAI", type: en ? "Government AI readiness" : "Preparaci\u00f3n AI gubernamental" },
    { name: "SCALAC", type: en ? "AI research in LATAM" : "Investigaci\u00f3n AI en LATAM" },
    { name: "Google", type: en ? "Search and web traffic data" : "Datos de b\u00fasqueda y tr\u00e1fico web" },
    { name: "AWS", type: en ? "Cloud infrastructure" : "Infraestructura cloud" },
    { name: "CAF", type: en ? "Development finance data" : "Datos de financiamiento al desarrollo" },
    { name: "IDB", type: en ? "Inter-American Development Bank indicators" : "Indicadores del Banco Interamericano de Desarrollo" },
    { name: "OAS", type: en ? "Organization of American States AI frameworks" : "Marcos AI de la Organizaci\u00f3n de Estados Americanos" },
    { name: "UNESCO", type: en ? "Education and science indicators" : "Indicadores de educaci\u00f3n y ciencia" },
    { name: "Stanford HAI", type: en ? "AI Index reference data" : "Datos de referencia del \u00cdndice AI" }
  ]
});

// ── ILIA 2025 Regional Statistics ──
export const ILIA_REGIONAL_STATS = (en) => [
  {
    id: "gdp-share",
    label: en ? "LATAM GDP Share" : "Participaci\u00f3n PIB LATAM",
    value: "6.6%",
    context: en ? "of world GDP" : "del PIB mundial",
    icon: "DollarSign"
  },
  {
    id: "population",
    label: en ? "LATAM Population Share" : "Participaci\u00f3n Poblacional LATAM",
    value: "8.8%",
    context: en ? "of world population" : "de la poblaci\u00f3n mundial",
    icon: "Users"
  },
  {
    id: "ai-investment",
    label: en ? "AI Investment Share" : "Participaci\u00f3n en Inversi\u00f3n AI",
    value: "1.12%",
    context: en ? "of global AI investment — 6x below GDP-fair share" : "de la inversi\u00f3n global en AI — 6x por debajo de la participaci\u00f3n justa por PIB",
    icon: "TrendingDown"
  },
  {
    id: "growth",
    label: en ? "LATAM Growth Rate" : "Tasa de Crecimiento LATAM",
    value: "1%",
    context: en ? "avg annual growth 2015-2024, lowest in 7 decades" : "crecimiento anual promedio 2015-2024, el m\u00e1s bajo en 7 d\u00e9cadas",
    icon: "BarChart"
  },
  {
    id: "female-researchers",
    label: en ? "Female AI Researchers" : "Investigadoras AI Mujeres",
    value: "19.8% \u2192 23.6%",
    context: en ? "growing share of female AI researchers" : "participaci\u00f3n creciente de mujeres investigadoras AI",
    icon: "UserCheck"
  },
  {
    id: "ai-curriculum",
    label: en ? "AI in School Curriculum" : "AI en Curr\u00edculo Escolar",
    value: "2 \u2192 6",
    context: en ? "countries with AI in school curriculum (13 of 19 still lack it)" : "pa\u00edses con AI en curr\u00edculo escolar (13 de 19 a\u00fan carecen)"
  ,
    icon: "BookOpen"
  },
  {
    id: "data-centers",
    label: en ? "Data Center Investment" : "Inversi\u00f3n en Centros de Datos",
    value: "$200M+ / $8B+",
    context: en ? "~$200M public, >$8B private announced (next 10 years)" : "~$200M p\u00fablico, >$8B privado anunciados (pr\u00f3ximos 10 a\u00f1os)",
    icon: "Server"
  },
  {
    id: "genai-downloads",
    label: en ? "GenAI Global Position" : "Posici\u00f3n Global GenAI",
    value: en ? "3rd Region" : "3a Regi\u00f3n",
    context: en ? "LATAM is 3rd region globally in GenAI app downloads (15-20%)" : "LATAM es 3a regi\u00f3n global en descargas de apps GenAI (15-20%)",
    icon: "Sparkles"
  },
  {
    id: "elite-conferences",
    label: en ? "Elite AI Conference Participation" : "Participaci\u00f3n en Conferencias AI de \u00c9lite",
    value: "7/19",
    context: en ? "Only 7 of 19 countries participate in elite AI conferences" : "Solo 7 de 19 pa\u00edses participan en conferencias AI de \u00e9lite",
    icon: "Globe"
  },
  {
    id: "doctoral-programs",
    label: en ? "AI Doctoral Programs" : "Programas Doctorales AI",
    value: "8/19",
    context: en ? "11 of 19 countries lack doctoral AI programs" : "11 de 19 pa\u00edses carecen de programas doctorales AI",
    icon: "GraduationCap"
  },
  {
    id: "national-strategies",
    label: en ? "National AI Strategies" : "Estrategias Nacionales de AI",
    value: "9/19",
    context: en ? "9 countries have national AI strategies, few with dedicated budgets" : "9 pa\u00edses tienen estrategias nacionales de AI, pocos con presupuestos dedicados",
    icon: "FileText"
  }
];

// ── ILIA Dimension Structure (for radar charts and visualizations) ──
export const ILIA_DIMENSIONS = (en) => [
  {
    id: "enabling",
    name: en ? "Enabling Factors" : "Factores Habilitantes",
    shortName: en ? "Enabling" : "Habilitantes",
    color: "#3b82f6",
    weight: 1 / 3,
    description: {
      en: "Foundational conditions required for AI development: digital infrastructure, data availability, and human talent pipeline.",
      es: "Condiciones fundacionales requeridas para el desarrollo AI: infraestructura digital, disponibilidad de datos y pipeline de talento humano."
    },
    subdimensions: [
      {
        id: "infrastructure",
        name: en ? "Infrastructure" : "Infraestructura",
        description: {
          en: "Connectivity, compute capacity, and device penetration enabling AI workloads.",
          es: "Conectividad, capacidad de c\u00f3mputo y penetraci\u00f3n de dispositivos que habilitan cargas de trabajo AI."
        },
        indicators: [
          en ? "Connectivity" : "Conectividad",
          en ? "Compute" : "C\u00f3mputo",
          en ? "Devices" : "Dispositivos"
        ]
      },
      {
        id: "data",
        name: en ? "Data" : "Datos",
        description: {
          en: "Data openness, availability, and governance quality measured via Global Data Barometer.",
          es: "Apertura de datos, disponibilidad y calidad de gobernanza medida v\u00eda Global Data Barometer."
        },
        indicators: [
          en ? "Data Barometer" : "Bar\u00f3metro de Datos"
        ]
      },
      {
        id: "talent",
        name: en ? "Human Talent" : "Talento Humano",
        description: {
          en: "AI literacy in general population, professional AI skills, and advanced research talent.",
          es: "Alfabetizaci\u00f3n AI en poblaci\u00f3n general, habilidades AI profesionales y talento de investigaci\u00f3n avanzado."
        },
        indicators: [
          en ? "AI Literacy" : "Alfabetizaci\u00f3n en IA",
          en ? "Professional AI Training" : "Formaci\u00f3n Profesional en IA",
          en ? "Advanced Human Talent" : "Talento Humano Avanzado"
        ]
      }
    ]
  },
  {
    id: "rda",
    name: en ? "R&D&A" : "I+D+A",
    shortName: en ? "R&D&A" : "I+D+A",
    color: "#8b5cf6",
    weight: 1 / 3,
    description: {
      en: "Research output, development capacity, and real-world AI adoption across industry, government, and the general population.",
      es: "Producci\u00f3n de investigaci\u00f3n, capacidad de desarrollo y adopci\u00f3n real de AI en industria, gobierno y poblaci\u00f3n general."
    },
    subdimensions: [
      {
        id: "research",
        name: en ? "Research" : "Investigaci\u00f3n",
        description: {
          en: "Academic AI research output, publications in top venues, and conference participation.",
          es: "Producci\u00f3n de investigaci\u00f3n acad\u00e9mica AI, publicaciones en venues top y participaci\u00f3n en conferencias."
        },
        indicators: [
          en ? "Research Output" : "Producci\u00f3n de Investigaci\u00f3n"
        ]
      },
      {
        id: "rd",
        name: en ? "R&D" : "I+D",
        description: {
          en: "Innovation capacity and software development output including patents and open-source contributions.",
          es: "Capacidad de innovaci\u00f3n y producci\u00f3n de desarrollo de software incluyendo patentes y contribuciones de c\u00f3digo abierto."
        },
        indicators: [
          en ? "Innovation" : "Innovaci\u00f3n",
          en ? "Development" : "Desarrollo"
        ]
      },
      {
        id: "adoption",
        name: en ? "Adoption" : "Adopci\u00f3n",
        description: {
          en: "Real-world AI usage across industry, government services, generative AI platforms, and AI web traffic. New in 2025: digital footprint metrics.",
          es: "Uso real de AI en industria, servicios gubernamentales, plataformas de IA generativa y tr\u00e1fico web AI. Nuevo en 2025: m\u00e9tricas de huella digital."
        },
        indicators: [
          en ? "Industry" : "Industria",
          en ? "Government" : "Gobierno",
          en ? "Generative AI" : "IA Generativa",
          en ? "AI Web Traffic" : "Tr\u00e1fico Web de IA"
        ]
      }
    ]
  },
  {
    id: "governance",
    name: en ? "Governance" : "Gobernanza",
    shortName: en ? "Governance" : "Gobernanza",
    color: "#f59e0b",
    weight: 1 / 3,
    description: {
      en: "Policy frameworks, institutional capacity, international engagement, and regulatory maturity for responsible AI deployment.",
      es: "Marcos de pol\u00edtica, capacidad institucional, vinculaci\u00f3n internacional y madurez regulatoria para despliegue responsable de AI."
    },
    subdimensions: [
      {
        id: "vision",
        name: en ? "Vision & Institutionality" : "Visi\u00f3n e Institucionalidad",
        description: {
          en: "National AI strategy quality, civil society engagement, and institutional frameworks for AI governance.",
          es: "Calidad de estrategia nacional de AI, involucramiento de sociedad civil y marcos institucionales para gobernanza AI."
        },
        indicators: [
          en ? "AI Strategy" : "Estrategia de IA",
          en ? "Society Involvement" : "Involucramiento de la Sociedad",
          en ? "Institutionality" : "Institucionalidad"
        ]
      },
      {
        id: "international",
        name: en ? "International Engagement" : "Vinculaci\u00f3n Internacional",
        description: {
          en: "Participation in international AI standards bodies and multilateral AI organizations.",
          es: "Participaci\u00f3n en organismos internacionales de est\u00e1ndares AI y organizaciones multilaterales de AI."
        },
        indicators: [
          en ? "Standards Participation" : "Participaci\u00f3n en Est\u00e1ndares",
          en ? "Organization Participation" : "Participaci\u00f3n en Organismos"
        ]
      },
      {
        id: "regulation",
        name: en ? "Regulation" : "Regulaci\u00f3n",
        description: {
          en: "AI-specific regulation, cybersecurity posture, ethical AI frameworks, and personal data protection laws.",
          es: "Regulaci\u00f3n espec\u00edfica de AI, postura de ciberseguridad, marcos \u00e9ticos de AI y leyes de protecci\u00f3n de datos personales."
        },
        indicators: [
          en ? "AI Regulation" : "Regulaci\u00f3n de IA",
          en ? "Cybersecurity" : "Ciberseguridad",
          en ? "Ethics & Sustainability" : "\u00c9tica y Sustentabilidad",
          en ? "Personal Data Regulation" : "Regulaci\u00f3n de Datos Personales"
        ]
      }
    ]
  }
];

// ── Regional Average by Dimension (for comparison charts) ──
export const ILIA_REGIONAL_AVERAGES = (en) => ({
  overall: 42.98,
  dimensions: {
    enabling: { score: 39.45, label: en ? "Enabling Factors" : "Factores Habilitantes" },
    rda: { score: 35.72, label: en ? "R&D&A" : "I+D+A" },
    governance: { score: 53.21, label: en ? "Governance" : "Gobernanza" }
  },
  keyIndicatorAverages: {
    connectivity: 61.08,
    compute: 21.31,
    devices: 40.34,
    dataBarometer: 47.73,
    aiLiteracy: 60.61,
    professionalTraining: 30.28,
    advancedTalent: 13.32,
    research: 35.80,
    innovation: 30.68,
    development: 31.58,
    industry: 47.25,
    government: 43.07,
    genai: 57.27,
    aiWebTraffic: 53.56,
    aiStrategy: 38.84,
    societyInvolvement: 32.89,
    institutionality: 39.47,
    standards: 36.84,
    organizations: 92.11,
    aiRegulation: 39.47,
    cybersecurity: 66.31,
    ethics: 44.33,
    dataRegulation: 68.42
  }
});

// ── Top-performing countries per dimension (for comparison widgets) ──
export const ILIA_TOP_BY_DIMENSION = (en) => [
  {
    dimension: en ? "Enabling Factors" : "Factores Habilitantes",
    top3: [
      { country: "Chile", countryEn: "Chile", score: 65.2, flag: "\u{1F1E8}\u{1F1F1}" },
      { country: "Brasil", countryEn: "Brazil", score: 61.8, flag: "\u{1F1E7}\u{1F1F7}" },
      { country: "Uruguay", countryEn: "Uruguay", score: 58.4, flag: "\u{1F1FA}\u{1F1FE}" }
    ],
    crScore: 49.92,
    crPosition: 6
  },
  {
    dimension: en ? "R&D&A" : "I+D+A",
    top3: [
      { country: "Brasil", countryEn: "Brazil", score: 62.5, flag: "\u{1F1E7}\u{1F1F7}" },
      { country: "Chile", countryEn: "Chile", score: 55.3, flag: "\u{1F1E8}\u{1F1F1}" },
      { country: "Colombia", countryEn: "Colombia", score: 48.7, flag: "\u{1F1E8}\u{1F1F4}" }
    ],
    crScore: 41.34,
    crPosition: 8
  },
  {
    dimension: en ? "Governance" : "Gobernanza",
    top3: [
      { country: "Chile", countryEn: "Chile", score: 89.1, flag: "\u{1F1E8}\u{1F1F1}" },
      { country: "Brasil", countryEn: "Brazil", score: 85.4, flag: "\u{1F1E7}\u{1F1F7}" },
      { country: "Uruguay", countryEn: "Uruguay", score: 82.7, flag: "\u{1F1FA}\u{1F1FE}" }
    ],
    crScore: 77.55,
    crPosition: 4
  }
];
