/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Environment & Sustainability Data
   Climate data sources, CR energy profile, AI-climate nexus,
   and key environmental statistics.
   Sources: Climate TRACE, NASA POWER, IEA, ICE, MINAE, OWID,
   CodeCarbon, Electricity Maps, SINAC
   ═══════════════════════════════════════════════════════════════ */

// ── Climate & Environment Data Sources ──
export const CLIMATE_SOURCES = (en) => [
  {
    id: "climate-trace",
    name: "Climate TRACE",
    url: "https://climatetrace.org/",
    org: en ? "Climate TRACE Coalition" : "Coalición Climate TRACE",
    apiType: "REST",
    free: true,
    description: {
      en: "AI-powered global emissions monitoring covering 352M+ emission sources across all countries. Uses satellite imagery + ML to independently verify reported emissions. Sector-level CO₂ data updated quarterly.",
      es: "Monitoreo global de emisiones con AI cubriendo 352M+ fuentes de emisión en todos los países. Usa imágenes satelitales + ML para verificar independientemente emisiones reportadas. Datos CO₂ a nivel sectorial actualizados trimestralmente."
    },
    datasets: [
      en ? "Country-level emissions by sector" : "Emisiones a nivel de país por sector",
      en ? "Facility-level emissions (power plants, factories)" : "Emisiones a nivel de instalación (plantas eléctricas, fábricas)",
      en ? "Historical emissions trends (2015-present)" : "Tendencias históricas de emisiones (2015-presente)",
      en ? "Forest carbon flux monitoring" : "Monitoreo de flujo de carbono forestal"
    ],
    crApplication: {
      en: "Verify CR's self-reported emissions against satellite-based independent measurements. Track progress toward carbon neutrality goals.",
      es: "Verificar emisiones auto-reportadas de CR contra mediciones independientes basadas en satélites. Rastrear progreso hacia metas de carbono neutralidad."
    }
  },
  {
    id: "nasa-power",
    name: "NASA POWER",
    url: "https://power.larc.nasa.gov/",
    org: "NASA Langley Research Center",
    apiType: "REST",
    free: true,
    description: {
      en: "Prediction of Worldwide Energy Resources: solar irradiance, wind speed, temperature, humidity for any location globally. 40+ year historical data. Free API with hourly/daily/monthly resolution.",
      es: "Predicción de Recursos Energéticos Mundiales: irradiancia solar, velocidad del viento, temperatura, humedad para cualquier ubicación global. Datos históricos de 40+ años. API gratuita con resolución horaria/diaria/mensual."
    },
    datasets: [
      en ? "Solar irradiance (GHI, DNI, DHI)" : "Irradiancia solar (GHI, DNI, DHI)",
      en ? "Wind speed at 10m and 50m heights" : "Velocidad del viento a 10m y 50m de altura",
      en ? "Temperature and precipitation" : "Temperatura y precipitación",
      en ? "Degree days for energy demand modeling" : "Grados-día para modelado de demanda energética"
    ],
    crApplication: {
      en: "Map optimal renewable energy sites for AI data centers in CR. Solar + wind potential assessment by region.",
      es: "Mapear sitios óptimos de energía renovable para centros de datos AI en CR. Evaluación de potencial solar + eólico por región."
    }
  },
  {
    id: "gfw",
    name: "Global Forest Watch",
    url: "https://www.globalforestwatch.org/",
    org: "World Resources Institute",
    apiType: "REST",
    free: true,
    description: {
      en: "Real-time forest monitoring platform using satellite imagery and AI: deforestation alerts, tree cover change, fire detection, land use classification.",
      es: "Plataforma de monitoreo forestal en tiempo real usando imágenes satelitales y AI: alertas de deforestación, cambio de cobertura arbórea, detección de incendios, clasificación de uso de suelo."
    },
    datasets: [
      en ? "GLAD deforestation alerts (weekly)" : "Alertas de deforestación GLAD (semanales)",
      en ? "Tree cover loss/gain annual data" : "Datos anuales de pérdida/ganancia de cobertura arbórea",
      en ? "Fire alerts (VIIRS)" : "Alertas de incendio (VIIRS)",
      en ? "Intact Forest Landscapes" : "Paisajes Forestales Intactos"
    ],
    crApplication: {
      en: "Monitor CR's reforestation progress and protected area integrity. CR reversed deforestation — AI ensures transparency.",
      es: "Monitorear progreso de reforestación de CR e integridad de áreas protegidas. CR revirtió deforestación — AI asegura transparencia."
    }
  },
  {
    id: "electricity-maps",
    name: "Electricity Maps",
    url: "https://app.electricitymaps.com/",
    org: "Electricity Maps (formerly Tomorrow)",
    apiType: "REST",
    free: false,
    description: {
      en: "Real-time electricity carbon intensity by country and region. Shows energy mix, imports/exports, carbon intensity per kWh. Free tier for personal use.",
      es: "Intensidad de carbono de electricidad en tiempo real por país y región. Muestra mezcla energética, importaciones/exportaciones, intensidad de carbono por kWh. Nivel gratuito para uso personal."
    },
    datasets: [
      en ? "Real-time carbon intensity (gCO₂eq/kWh)" : "Intensidad de carbono en tiempo real (gCO₂eq/kWh)",
      en ? "Energy mix breakdown" : "Desglose de mezcla energética",
      en ? "Historical carbon intensity trends" : "Tendencias históricas de intensidad de carbono",
      en ? "Cross-border electricity flows" : "Flujos de electricidad transfronterizos"
    ],
    crApplication: {
      en: "Demonstrates CR's near-zero carbon electricity in real-time — powerful marketing tool for sustainable AI data centers.",
      es: "Demuestra electricidad de carbono casi cero de CR en tiempo real — herramienta poderosa de marketing para centros de datos AI sostenibles."
    }
  },
  {
    id: "codecarbon",
    name: "CodeCarbon",
    url: "https://codecarbon.io/",
    org: en ? "Open Source (Mila, BCG GAMMA, Haverford, Comet.ml)" : "Código Abierto (Mila, BCG GAMMA, Haverford, Comet.ml)",
    apiType: "Download",
    free: true,
    description: {
      en: "Python library to track CO₂ emissions from computing. Estimates carbon footprint based on hardware, runtime, and electricity carbon intensity of the region.",
      es: "Librería Python para rastrear emisiones CO₂ de computación. Estima huella de carbono basada en hardware, tiempo de ejecución e intensidad de carbono de la electricidad de la región."
    },
    datasets: [
      en ? "Per-run carbon emissions estimates" : "Estimaciones de emisiones de carbono por ejecución",
      en ? "Region-specific emission factors" : "Factores de emisión específicos por región",
      en ? "Cloud provider carbon intensities" : "Intensidades de carbono de proveedores cloud",
      en ? "Hardware energy profiles" : "Perfiles energéticos de hardware"
    ],
    crApplication: {
      en: "Quantify the carbon advantage of running AI workloads in CR vs other locations (95%+ cleaner due to renewable grid).",
      es: "Cuantificar la ventaja de carbono de ejecutar cargas de trabajo AI en CR vs otras ubicaciones (95%+ más limpio por red renovable)."
    }
  },
  {
    id: "owid-climate",
    name: "Our World in Data — Climate & Energy",
    url: "https://ourworldindata.org/energy",
    org: "Our World in Data (Oxford)",
    apiType: "Download",
    free: true,
    description: {
      en: "Open-access curated datasets: energy mix by country, CO₂ emissions, renewable capacity, energy access, air pollution. GitHub-hosted, visualization-ready.",
      es: "Datasets curados de acceso abierto: mezcla energética por país, emisiones CO₂, capacidad renovable, acceso energético, contaminación del aire. Alojados en GitHub, listos para visualización."
    },
    datasets: [
      en ? "Energy production by source (1900-present)" : "Producción energética por fuente (1900-presente)",
      en ? "CO₂ emissions per capita" : "Emisiones CO₂ per cápita",
      en ? "Renewable energy share" : "Participación de energía renovable",
      en ? "Electricity access and reliability" : "Acceso y confiabilidad eléctrica"
    ],
    crApplication: {
      en: "Ready-made visualizations showing CR's renewable energy leadership in global context. Excellent for public communications.",
      es: "Visualizaciones listas mostrando el liderazgo de energía renovable de CR en contexto global. Excelentes para comunicaciones públicas."
    }
  },
  {
    id: "copernicus",
    name: "Copernicus Climate Data Store",
    url: "https://cds.climate.copernicus.eu/",
    org: en ? "European Centre for Medium-Range Weather Forecasts (ECMWF)" : "Centro Europeo de Previsiones Meteorológicas a Plazo Medio (ECMWF)",
    apiType: "REST",
    free: true,
    description: {
      en: "EU Earth observation program: ERA5 climate reanalysis, seasonal forecasts, satellite land/ocean monitoring. Petabytes of free data.",
      es: "Programa de observación terrestre de la UE: reanálisis climático ERA5, pronósticos estacionales, monitoreo satelital de tierra/océano. Petabytes de datos gratuitos."
    },
    datasets: [
      en ? "ERA5 hourly reanalysis (1940-present)" : "Reanálisis horario ERA5 (1940-presente)",
      en ? "Seasonal climate forecasts" : "Pronósticos climáticos estacionales",
      en ? "Land cover change" : "Cambio de cobertura terrestre",
      en ? "Sea surface temperature" : "Temperatura superficial del mar"
    ],
    crApplication: {
      en: "High-resolution climate data for AI-powered climate risk modeling specific to CR geography and agricultural zones.",
      es: "Datos climáticos de alta resolución para modelado de riesgo climático con AI específico para la geografía y zonas agrícolas de CR."
    }
  }
];

// ── Costa Rica Energy Profile ──
export const CR_ENERGY = (en) => ({
  title: en ? "Costa Rica Energy Profile — AI Infrastructure Context" : "Perfil Energético de Costa Rica — Contexto de Infraestructura AI",
  lastUpdated: "2024",
  sources: ["ICE", "ARESEP", "CENCE", "IEA", "IRENA"],

  headline: {
    en: "Costa Rica generates 98.6% of its electricity from renewable sources — one of the greenest grids on Earth. This is a transformative competitive advantage for sustainable AI data centers.",
    es: "Costa Rica genera 98.6% de su electricidad de fuentes renovables — una de las redes más verdes del planeta. Esta es una ventaja competitiva transformadora para centros de datos AI sostenibles."
  },

  energyMix: [
    { source: en ? "Hydroelectric" : "Hidroeléctrica", percentage: 67.5, color: "#3b82f6", capacity: "2,347 MW" },
    { source: en ? "Wind" : "Eólica", percentage: 15.8, color: "#10b981", capacity: "614 MW" },
    { source: en ? "Geothermal" : "Geotérmica", percentage: 13.5, color: "#f59e0b", capacity: "262 MW" },
    { source: en ? "Solar" : "Solar", percentage: 1.1, color: "#fbbf24", capacity: "46 MW" },
    { source: en ? "Biomass" : "Biomasa", percentage: 0.7, color: "#84cc16", capacity: "42 MW" },
    { source: en ? "Thermal (backup)" : "Térmica (respaldo)", percentage: 1.4, color: "#ef4444", capacity: "378 MW" }
  ],

  keyStats: [
    {
      metric: en ? "Renewable generation share" : "Participación de generación renovable",
      value: "98.6%",
      context: en ? "Consistently above 98% since 2015. 100% on many days." : "Consistentemente por encima de 98% desde 2015. 100% en muchos días."
    },
    {
      metric: en ? "Installed capacity" : "Capacidad instalada",
      value: "3,689 MW",
      context: en ? "Sufficient for current demand with reserve margin." : "Suficiente para demanda actual con margen de reserva."
    },
    {
      metric: en ? "Grid carbon intensity" : "Intensidad de carbono de la red",
      value: "~20 gCO₂/kWh",
      context: en ? "Global average: 436 gCO₂/kWh. CR is 95%+ cleaner." : "Promedio global: 436 gCO₂/kWh. CR es 95%+ más limpia."
    },
    {
      metric: en ? "Electricity cost (industrial)" : "Costo de electricidad (industrial)",
      value: "$0.12-0.15/kWh",
      context: en ? "Competitive for LATAM but above US ($0.07) and Nordic ($0.05) data center hubs." : "Competitivo para LATAM pero por encima de EE.UU. ($0.07) y nórdicos ($0.05) centros de datos."
    },
    {
      metric: en ? "Grid reliability (SAIDI)" : "Confiabilidad de red (SAIDI)",
      value: "~4.5 hrs/year",
      context: en ? "Good by LATAM standards but below Tier IV data center requirements." : "Bueno por estándares LATAM pero debajo de requerimientos de centros de datos Tier IV."
    },
    {
      metric: en ? "Electrification rate" : "Tasa de electrificación",
      value: "99.4%",
      context: en ? "Near-universal electricity access — strong foundation for distributed AI deployment." : "Acceso eléctrico casi universal — base sólida para despliegue AI distribuido."
    }
  ],

  dataCenterPotential: {
    strengths: [
      {
        point: en ? "98.6% renewable = near-zero Scope 2 emissions" : "98.6% renovable = emisiones Scope 2 casi cero",
        detail: en ? "AI companies face ESG pressure to reduce compute emissions. CR offers this by default." : "Empresas AI enfrentan presión ESG para reducir emisiones de computación. CR ofrece esto por defecto."
      },
      {
        point: en ? "Political stability + rule of law" : "Estabilidad política + estado de derecho",
        detail: en ? "Data sovereignty and operational continuity assured by strong democratic institutions." : "Soberanía de datos y continuidad operativa asegurada por fuertes instituciones democráticas."
      },
      {
        point: en ? "Strategic LATAM location" : "Ubicación estratégica en LATAM",
        detail: en ? "Central America location with submarine cable connectivity. Low latency to US East Coast and LATAM markets." : "Ubicación en Centroamérica con conectividad por cable submarino. Baja latencia a Costa Este de EE.UU. y mercados LATAM."
      },
      {
        point: en ? "Free zone incentives" : "Incentivos de zona franca",
        detail: en ? "0% income tax for 8+ years, duty-free equipment imports under free zone regime." : "0% impuesto sobre la renta por 8+ años, importación de equipo libre de impuestos bajo régimen de zona franca."
      }
    ],
    challenges: [
      {
        point: en ? "Electricity cost premium" : "Prima de costo eléctrico",
        detail: en ? "Industrial rates $0.12-0.15/kWh vs $0.05-0.07 in competing locations." : "Tarifas industriales $0.12-0.15/kWh vs $0.05-0.07 en ubicaciones competidoras."
      },
      {
        point: en ? "Grid capacity constraints" : "Restricciones de capacidad de red",
        detail: en ? "Large-scale AI data centers (50+ MW) may strain local grid. New capacity needed." : "Centros de datos AI a gran escala (50+ MW) pueden forzar la red local. Se necesita nueva capacidad."
      },
      {
        point: en ? "Limited Tier III/IV facilities" : "Instalaciones Tier III/IV limitadas",
        detail: en ? "Few certified data center facilities. Most are Tier II or below." : "Pocas instalaciones certificadas de centros de datos. La mayoría son Tier II o inferior."
      },
      {
        point: en ? "Bandwidth constraints" : "Restricciones de ancho de banda",
        detail: en ? "International bandwidth improving but still below major data center markets." : "Ancho de banda internacional mejorando pero aún por debajo de mercados principales de centros de datos."
      }
    ]
  }
});

// ── AI-Climate Nexus ──
export const CLIMATE_AI_NEXUS = (en) => ({
  title: en ? "AI & Climate — Dual Relationship" : "AI y Clima — Relación Dual",

  sections: [
    {
      id: "footprint",
      title: en ? "AI's Carbon Footprint" : "Huella de Carbono de AI",
      icon: "🌡️",
      color: "#ef4444",
      stats: [
        {
          metric: en ? "Training GPT-4-class model" : "Entrenamiento de modelo clase GPT-4",
          value: "~5,000-10,000 tCO₂",
          source: "Epoch AI / Stanford HAI 2024",
          detail: {
            en: "A single frontier model training run emits as much CO₂ as 1,000 average cars in a year.",
            es: "Una sola ejecución de entrenamiento de modelo frontier emite tanto CO₂ como 1,000 autos promedio en un año."
          }
        },
        {
          metric: en ? "Global AI electricity demand (2024)" : "Demanda eléctrica AI global (2024)",
          value: "~100 TWh",
          source: "IEA 2024",
          detail: {
            en: "AI data centers consumed ~100 TWh in 2024, projected to reach 300-500 TWh by 2030.",
            es: "Centros de datos AI consumieron ~100 TWh en 2024, proyectado a alcanzar 300-500 TWh para 2030."
          }
        },
        {
          metric: en ? "Google's AI energy growth" : "Crecimiento energético AI de Google",
          value: "+48% (2019-2023)",
          source: "Google Environmental Report 2024",
          detail: {
            en: "Google's total energy consumption grew 48% due to AI workloads, complicating net-zero targets.",
            es: "El consumo total de energía de Google creció 48% debido a cargas de trabajo AI, complicando metas de cero neto."
          }
        },
        {
          metric: en ? "Water consumption per ChatGPT conversation" : "Consumo de agua por conversación ChatGPT",
          value: "~500 mL",
          source: "University of California Riverside 2023",
          detail: {
            en: "AI inference requires water for cooling. A 20-50 prompt session uses ~500 mL of water.",
            es: "La inferencia AI requiere agua para enfriamiento. Una sesión de 20-50 prompts usa ~500 mL de agua."
          }
        }
      ]
    },
    {
      id: "monitoring",
      title: en ? "AI for Climate Monitoring" : "AI para Monitoreo Climático",
      icon: "🛰️",
      color: "#10b981",
      applications: [
        {
          name: en ? "Satellite-based emissions verification" : "Verificación de emisiones basada en satélites",
          tool: "Climate TRACE",
          detail: {
            en: "AI analyzes satellite imagery to independently verify country-reported emissions — covers 352M+ sources globally.",
            es: "AI analiza imágenes satelitales para verificar independientemente emisiones reportadas por países — cubre 352M+ fuentes globalmente."
          }
        },
        {
          name: en ? "Deforestation early warning" : "Alerta temprana de deforestación",
          tool: "Global Forest Watch / GLAD",
          detail: {
            en: "ML models detect tree cover loss from weekly satellite updates. Alerts within days of deforestation events.",
            es: "Modelos ML detectan pérdida de cobertura arbórea de actualizaciones satelitales semanales. Alertas en días de eventos de deforestación."
          }
        },
        {
          name: en ? "Weather and climate prediction" : "Predicción meteorológica y climática",
          tool: "Google DeepMind GraphCast / Pangu-Weather",
          detail: {
            en: "AI weather models now outperform traditional numerical weather prediction at fraction of compute cost.",
            es: "Modelos meteorológicos AI ahora superan predicción numérica tradicional a fracción del costo de computación."
          }
        },
        {
          name: en ? "Biodiversity monitoring" : "Monitoreo de biodiversidad",
          tool: "iNaturalist / BirdNET",
          detail: {
            en: "AI-powered species identification from images and audio. CR's biodiversity makes this especially valuable.",
            es: "Identificación de especies con AI desde imágenes y audio. La biodiversidad de CR hace esto especialmente valioso."
          }
        },
        {
          name: en ? "Smart grid optimization" : "Optimización de red inteligente",
          tool: "DeepMind / Google (40% cooling reduction)",
          detail: {
            en: "AI optimizes energy distribution and data center cooling — Google achieved 40% cooling energy reduction.",
            es: "AI optimiza distribución de energía y enfriamiento de centros de datos — Google logró 40% de reducción de energía de enfriamiento."
          }
        }
      ]
    },
    {
      id: "tracking",
      title: en ? "Carbon Tracking for AI" : "Rastreo de Carbono para AI",
      icon: "📊",
      color: "#3b82f6",
      tools: [
        {
          name: "CodeCarbon",
          url: "https://codecarbon.io/",
          type: en ? "Python library" : "Librería Python",
          detail: {
            en: "Tracks CO₂ emissions from code execution. Region-aware emission factors. Easy pip install.",
            es: "Rastrea emisiones CO₂ de ejecución de código. Factores de emisión conscientes de la región. Fácil instalación pip."
          }
        },
        {
          name: "ML CO2 Impact",
          url: "https://mlco2.github.io/impact/",
          type: en ? "Online calculator" : "Calculadora en línea",
          detail: {
            en: "Estimate carbon impact of ML model training based on hardware, runtime, and cloud region.",
            es: "Estimar impacto de carbono de entrenamiento de modelo ML basado en hardware, tiempo de ejecución y región cloud."
          }
        },
        {
          name: "Hugging Face Carbon Tracker",
          url: "https://huggingface.co/docs/hub/model-cards-co2",
          type: en ? "Model metadata" : "Metadatos de modelo",
          detail: {
            en: "Hugging Face model cards include CO₂ emission estimates — promotes transparency in AI carbon reporting.",
            es: "Las tarjetas de modelo de Hugging Face incluyen estimaciones de emisiones CO₂ — promueven transparencia en reporte de carbono AI."
          }
        }
      ]
    }
  ],

  crOpportunity: {
    en: "Costa Rica is uniquely positioned at the intersection of AI and climate: with 98.6% renewable electricity, AI workloads run in CR produce ~95% fewer emissions than the global average. This creates a compelling 'Green AI' value proposition for companies seeking to reduce Scope 2 emissions from AI compute. Combined with free zone tax incentives and political stability, CR can position itself as the sustainable AI hub of the Americas.",
    es: "Costa Rica está singularmente posicionada en la intersección de AI y clima: con 98.6% de electricidad renovable, las cargas de trabajo AI ejecutadas en CR producen ~95% menos emisiones que el promedio global. Esto crea una propuesta de valor convincente de 'AI Verde' para empresas buscando reducir emisiones Scope 2 de computación AI. Combinado con incentivos fiscales de zona franca y estabilidad política, CR puede posicionarse como el hub de AI sostenible de las Américas."
  }
});

// ── Climate Statistics ──
export const CLIMATE_STATS = (en) => [
  {
    category: en ? "Emissions" : "Emisiones",
    stats: [
      {
        metric: en ? "CR total GHG emissions" : "Emisiones GEI totales de CR",
        value: "11.5 MtCO₂eq",
        year: 2022,
        source: "MINAE / Climate TRACE",
        context: en ? "0.02% of global emissions. Per capita: 2.2 tCO₂ (world avg: 4.7)" : "0.02% de emisiones globales. Per cápita: 2.2 tCO₂ (promedio mundial: 4.7)"
      },
      {
        metric: en ? "CR National Decarbonization Plan target" : "Meta del Plan Nacional de Descarbonización de CR",
        value: en ? "Net-zero by 2050" : "Cero neto para 2050",
        year: 2019,
        source: "MINAE",
        context: en ? "One of first developing countries to commit to net-zero. Transport is biggest challenge (54% of emissions)." : "Uno de los primeros países en desarrollo en comprometerse a cero neto. Transporte es el mayor desafío (54% de emisiones)."
      }
    ]
  },
  {
    category: en ? "Forest & Biodiversity" : "Bosque y Biodiversidad",
    stats: [
      {
        metric: en ? "Forest cover" : "Cobertura forestal",
        value: "59.1%",
        year: 2023,
        source: "SINAC / Global Forest Watch",
        context: en ? "Recovered from ~21% in 1987. One of the great reforestation success stories globally." : "Recuperada desde ~21% en 1987. Una de las grandes historias de éxito de reforestación globalmente."
      },
      {
        metric: en ? "Protected areas" : "Áreas protegidas",
        value: "26.3%",
        year: 2023,
        source: "SINAC",
        context: en ? "26.3% of territory in national parks and reserves — among highest rates globally." : "26.3% del territorio en parques nacionales y reservas — entre las tasas más altas globalmente."
      },
      {
        metric: en ? "Biodiversity (species per 10,000 km²)" : "Biodiversidad (especies por 10,000 km²)",
        value: "~615",
        year: 2023,
        source: "SINAC / IUCN",
        context: en ? "CR contains ~6% of world's biodiversity on 0.03% of land area." : "CR contiene ~6% de la biodiversidad mundial en 0.03% del área terrestre."
      }
    ]
  },
  {
    category: en ? "AI Compute Emissions" : "Emisiones de Computación AI",
    stats: [
      {
        metric: en ? "Training GPT-3" : "Entrenamiento GPT-3",
        value: "552 tCO₂",
        year: 2020,
        source: "Patterson et al. 2021",
        context: en ? "In CR (20 gCO₂/kWh) this would be ~25 tCO₂ — 95% less than US average grid." : "En CR (20 gCO₂/kWh) esto sería ~25 tCO₂ — 95% menos que la red promedio de EE.UU."
      },
      {
        metric: en ? "ChatGPT daily inference" : "Inferencia diaria de ChatGPT",
        value: "~564 MWh/day",
        year: 2024,
        source: "IEA / Semi Analysis estimates",
        context: en ? "200M+ daily active users drive massive inference compute. In CR's grid: 11 tCO₂/day vs 225 tCO₂/day on US grid." : "200M+ usuarios diarios activos impulsan computación de inferencia masiva. En la red de CR: 11 tCO₂/día vs 225 tCO₂/día en red de EE.UU."
      },
      {
        metric: en ? "Global data center electricity" : "Electricidad global de centros de datos",
        value: "460 TWh",
        year: 2024,
        source: "IEA",
        context: en ? "~2% of global electricity. AI driving rapid growth — projected 1,000 TWh by 2030." : "~2% de electricidad global. AI impulsando crecimiento rápido — proyectado 1,000 TWh para 2030."
      }
    ]
  },
  {
    category: en ? "Green AI Advantage" : "Ventaja AI Verde",
    stats: [
      {
        metric: en ? "CR grid carbon intensity" : "Intensidad de carbono de la red de CR",
        value: "20 gCO₂/kWh",
        year: 2024,
        source: "Electricity Maps / ICE",
        context: en ? "US average: 400. EU average: 230. India: 630. Only Iceland, Norway, Sweden are comparable." : "Promedio EE.UU.: 400. Promedio UE: 230. India: 630. Solo Islandia, Noruega, Suecia son comparables."
      },
      {
        metric: en ? "Renewable days (300+ days/year)" : "Días renovables (300+ días/año)",
        value: "300+",
        year: 2024,
        source: "CENCE / ICE",
        context: en ? "CR runs on 100% renewables for 300+ days most years — rare globally." : "CR funciona con 100% renovables por 300+ días la mayoría de los años — raro globalmente."
      }
    ]
  }
];
