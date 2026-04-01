/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Agentic AI Data Module (Production)
   Comprehensive bilingual data for the Agentic AI deep-dive section.
   Sources: IBM, MIT Sloan, McKinsey, WEF, IMF, Gartner, Deloitte,
   Stanford HAI, Tufts, BCG, Salesforce, ILO, CEPAL, Linux Foundation
   85+ sources compiled — Last updated: March 2026
   ═══════════════════════════════════════════════════════════════ */

// ── 1. AGENTIC_DEFINITION ──
export const AGENTIC_DEFINITION = (en) => ({
  core: en
    ? "Agentic AI describes artificial intelligence systems that act as autonomous agents capable of perceiving their environment, reasoning over complex goals, and taking purposeful action — all without constant human supervision. Rather than simply generating outputs from a prompt, agentic AI continuously plans, executes, and adapts its behavior based on feedback."
    : "La IA Agéntica describe sistemas de inteligencia artificial que actúan como agentes autónomos capaces de percibir su entorno, razonar sobre objetivos complejos y tomar acciones con propósito — todo sin supervisión humana constante. En lugar de simplemente generar salidas a partir de un prompt, la IA agéntica planifica, ejecuta y adapta continuamente su comportamiento basándose en retroalimentación.",
  ibmQuote: en
    ? "An artificial intelligence system that can accomplish a specific goal with limited supervision, consisting of AI agents — machine learning models that mimic human decision-making to solve problems in real time."
    : "Un sistema de inteligencia artificial que puede lograr un objetivo específico con supervisión limitada, compuesto por agentes de IA — modelos de aprendizaje automático que imitan la toma de decisiones humana para resolver problemas en tiempo real.",
  ibmSource: "IBM Think",
  mitQuote: en
    ? "AI systems designed to autonomously make decisions and act, with the ability to pursue complex goals with limited supervision."
    : "Sistemas de IA diseñados para tomar decisiones y actuar de forma autónoma, con la capacidad de perseguir objetivos complejos con supervisión limitada.",
  mitSource: "MIT Sloan",
  keyInsight: en
    ? "While generative AI creates content, agentic AI creates outcomes. It doesn't just respond to prompts; it develops strategies, executes plans, and adapts to changing circumstances."
    : "Mientras la IA generativa crea contenido, la IA agéntica crea resultados. No solo responde a prompts; desarrolla estrategias, ejecuta planes y se adapta a circunstancias cambiantes.",
  sources: ["IBM Think", "MIT Sloan", "Salesforce", "TileDB", "Coursera"]
});

// ── 2. AI_EVOLUTION ──
export const AI_EVOLUTION = (en) => [
  {
    era: "1950s-1990s",
    type: en ? "Rule-Based AI" : "IA Basada en Reglas",
    description: en
      ? "Expert systems, if-then logic, symbolic reasoning. No learning capability."
      : "Sistemas expertos, lógica if-then, razonamiento simbólico. Sin capacidad de aprendizaje.",
    icon: "cpu"
  },
  {
    era: "1990s-2010s",
    type: en ? "Machine Learning" : "Aprendizaje Automático",
    description: en
      ? "Statistical pattern recognition, classification, prediction. Learns from data but narrow in scope."
      : "Reconocimiento estadístico de patrones, clasificación, predicción. Aprende de datos pero con alcance limitado.",
    icon: "bar-chart"
  },
  {
    era: "2010s-2020",
    type: en ? "Deep Learning" : "Aprendizaje Profundo",
    description: en
      ? "Neural networks, computer vision, NLP breakthroughs. AlphaGo (2016), GPT-2 (2019)."
      : "Redes neuronales, visión por computadora, avances en PLN. AlphaGo (2016), GPT-2 (2019).",
    icon: "layers"
  },
  {
    era: "2020-2024",
    type: en ? "Generative AI" : "IA Generativa",
    description: en
      ? "Content creation — text, images, code, video. ChatGPT (2022), GPT-4 (2023), Claude 3 (2024). Reactive: waits for prompts."
      : "Creación de contenido — texto, imágenes, código, video. ChatGPT (2022), GPT-4 (2023), Claude 3 (2024). Reactiva: espera prompts.",
    icon: "sparkles"
  },
  {
    era: "2024-" + (en ? "Present" : "Presente"),
    type: en ? "Agentic AI" : "IA Agéntica",
    description: en
      ? "Autonomous goal-directed systems. Proactive: plans, executes, adapts. Uses tools, maintains memory, pursues multi-step objectives."
      : "Sistemas autónomos dirigidos por objetivos. Proactiva: planifica, ejecuta, adapta. Usa herramientas, mantiene memoria, persigue objetivos multi-paso.",
    icon: "bot"
  },
  {
    era: en ? "Emerging" : "Emergente",
    type: en ? "Multi-Agent Systems" : "Sistemas Multi-Agente",
    description: en
      ? "Orchestrated teams of specialized agents collaborating on complex tasks. Gartner reports 1,445% surge in multi-agent inquiries Q1 2024 to Q2 2025."
      : "Equipos orquestados de agentes especializados colaborando en tareas complejas. Gartner reporta aumento de 1,445% en consultas multi-agente Q1 2024 a Q2 2025.",
    icon: "users"
  },
  {
    era: en ? "Aspirational" : "Aspiracional",
    type: "AGI",
    description: en
      ? "Artificial General Intelligence — human-level cognitive flexibility across all domains. Median forecast: 50% chance by 2033."
      : "Inteligencia General Artificial — flexibilidad cognitiva a nivel humano en todos los dominios. Pronóstico mediano: 50% de probabilidad para 2033.",
    icon: "brain"
  }
];

// ── 3. AI_TAXONOMY ──
export const AI_TAXONOMY = (en) => [
  {
    type: en ? "Narrow/Traditional AI" : "IA Estrecha/Tradicional",
    description: en
      ? "Pattern recognition, classification, prediction on specific tasks"
      : "Reconocimiento de patrones, clasificación, predicción en tareas específicas",
    examples: en
      ? "Spam filters, recommendation engines, fraud detection rules, image classifiers"
      : "Filtros de spam, motores de recomendación, reglas de detección de fraude, clasificadores de imágenes",
    approach: en ? "Reactive — analyzes data and applies learned patterns" : "Reactiva — analiza datos y aplica patrones aprendidos",
    era: "1990s-" + (en ? "present" : "presente"),
    status: en ? "Mature, ubiquitous" : "Madura, ubicua"
  },
  {
    type: en ? "Generative AI" : "IA Generativa",
    description: en
      ? "Creates new content — text, images, code, audio, video — based on training data patterns"
      : "Crea contenido nuevo — texto, imágenes, código, audio, video — basado en patrones de datos de entrenamiento",
    examples: "ChatGPT, DALL-E, Midjourney, Claude, GitHub Copilot",
    approach: en
      ? "Reactive — waits for specific human prompt, generates single comprehensive output"
      : "Reactiva — espera prompt humano específico, genera una salida completa",
    era: "2020-" + (en ? "present" : "presente"),
    status: en
      ? "Mainstream adoption — 78% of organizations using AI in at least one function (Stanford 2025)"
      : "Adopción masiva — 78% de organizaciones usando IA en al menos una función (Stanford 2025)"
  },
  {
    type: en ? "Agentic AI" : "IA Agéntica",
    description: en
      ? "Autonomous goal-directed systems that plan, execute, and adapt without constant supervision"
      : "Sistemas autónomos dirigidos por objetivos que planifican, ejecutan y adaptan sin supervisión constante",
    examples: "Claude Code, OpenAI Operator/Codex, Devin",
    approach: en
      ? "Proactive — develops strategies, executes plans, adapts to changing circumstances"
      : "Proactiva — desarrolla estrategias, ejecuta planes, se adapta a circunstancias cambiantes",
    era: "2024-" + (en ? "present" : "presente"),
    status: en
      ? "Rapid scaling — 62% of organizations experimenting, 23% scaling (McKinsey 2025)"
      : "Escalamiento rápido — 62% de organizaciones experimentando, 23% escalando (McKinsey 2025)"
  },
  {
    type: en ? "Multi-Agent Systems" : "Sistemas Multi-Agente",
    description: en
      ? "Orchestrated teams of specialized agents collaborating on complex tasks"
      : "Equipos orquestados de agentes especializados colaborando en tareas complejas",
    examples: en
      ? "Fraud detection agent teams, scientific research collaborations, supply chain optimization"
      : "Equipos de agentes de detección de fraude, colaboraciones de investigación científica, optimización de cadena de suministro",
    approach: en
      ? "Collaborative — agents pass context, share memory, coordinate decisions in real time"
      : "Colaborativa — agentes comparten contexto, memoria, coordinan decisiones en tiempo real",
    era: "2025-" + (en ? "present" : "presente"),
    status: en
      ? "Emerging — Gartner ranks as top strategic tech trend for 2026"
      : "Emergente — Gartner lo posiciona como tendencia tecnológica estratégica #1 para 2026"
  },
  {
    type: en ? "AGI (Artificial General Intelligence)" : "IGA (Inteligencia General Artificial)",
    description: en
      ? "Human-level cognitive flexibility across all domains — not yet achieved"
      : "Flexibilidad cognitiva a nivel humano en todos los dominios — aún no lograda",
    examples: en ? "None yet exist" : "Aún no existen",
    approach: en
      ? "Would match or exceed human reasoning, creativity, and adaptability across any task"
      : "Igualaría o superaría el razonamiento, creatividad y adaptabilidad humana en cualquier tarea",
    era: en ? "Projected: 2029-2050+" : "Proyectada: 2029-2050+",
    status: en
      ? "Aspirational — forecasters average 25% chance by 2029, 50% by 2033"
      : "Aspiracional — pronosticadores estiman 25% de probabilidad para 2029, 50% para 2033"
  }
];

// ── 4. AGENT_CAPABILITIES ──
export const AGENT_CAPABILITIES = (en) => [
  {
    name: en ? "Reasoning" : "Razonamiento",
    description: en
      ? "Advanced cognitive processing to interpret complex objectives and constraints, enabling autonomous decision-making and task prioritization."
      : "Procesamiento cognitivo avanzado para interpretar objetivos y restricciones complejas, habilitando toma de decisiones autónoma y priorización de tareas.",
    icon: "brain"
  },
  {
    name: en ? "Planning" : "Planificación",
    description: en
      ? "Ability to break down complex goals into sub-tasks, sequence actions, and develop strategies without human step-by-step guidance."
      : "Capacidad de descomponer objetivos complejos en sub-tareas, secuenciar acciones y desarrollar estrategias sin guía humana paso a paso.",
    icon: "map"
  },
  {
    name: en ? "Tool Use" : "Uso de Herramientas",
    description: en
      ? "Can search the web, call APIs, query databases, execute code, and use external services to gather information and take actions."
      : "Puede buscar en la web, llamar APIs, consultar bases de datos, ejecutar código y usar servicios externos para recopilar información y tomar acciones.",
    icon: "wrench"
  },
  {
    name: en ? "Memory" : "Memoria",
    description: en
      ? "Maintains context across interactions, tracks progress on long-term goals, and learns from past outcomes to improve future performance."
      : "Mantiene contexto entre interacciones, rastrea progreso en objetivos a largo plazo y aprende de resultados pasados para mejorar desempeño futuro.",
    icon: "database"
  },
  {
    name: en ? "Autonomy" : "Autonomía",
    description: en
      ? "Operates as a closed loop — senses environment, reasons about objectives, chooses actions, learns from outcomes, and repeats iteratively."
      : "Opera como ciclo cerrado — percibe el entorno, razona sobre objetivos, elige acciones, aprende de resultados y repite iterativamente.",
    icon: "refresh-cw"
  },
  {
    name: en ? "Goal Pursuit" : "Persecución de Objetivos",
    description: en
      ? "Maintains long-term objectives, manages multi-step problem-solving, and tracks progress over time without constant human oversight."
      : "Mantiene objetivos a largo plazo, gestiona resolución de problemas multi-paso y rastrea progreso sin supervisión humana constante.",
    icon: "target"
  },
  {
    name: en ? "Adaptation" : "Adaptación",
    description: en
      ? "Adjusts behavior based on feedback, changing circumstances, and new information encountered during task execution."
      : "Ajusta comportamiento basado en retroalimentación, circunstancias cambiantes y nueva información encontrada durante la ejecución de tareas.",
    icon: "zap"
  }
];

// ── 5. AUTONOMY_LEVELS ──
export const AUTONOMY_LEVELS = (en) => [
  {
    level: "L1",
    name: en ? "Operator" : "Operador",
    role: en
      ? "Human directs every action. Agent executes single commands. No independent decision-making."
      : "Humano dirige cada acción. Agente ejecuta comandos individuales. Sin toma de decisiones independiente.",
    humanRole: en ? "Full control" : "Control total"
  },
  {
    level: "L2",
    name: en ? "Collaborator" : "Colaborador",
    role: en
      ? "Agent suggests actions and plans. Human reviews and approves each step before execution."
      : "Agente sugiere acciones y planes. Humano revisa y aprueba cada paso antes de la ejecución.",
    humanRole: en ? "Active partner" : "Socio activo"
  },
  {
    level: "L3",
    name: en ? "Consultant" : "Consultor",
    role: en
      ? "Agent executes autonomously on routine tasks. Consults human only for novel or high-stakes decisions."
      : "Agente ejecuta autónomamente en tareas rutinarias. Consulta humano solo para decisiones novedosas o de alto impacto.",
    humanRole: en ? "Advisory" : "Asesor"
  },
  {
    level: "L4",
    name: en ? "Approver" : "Aprobador",
    role: en
      ? "Agent operates independently. Human reviews outcomes and approves at key checkpoints only."
      : "Agente opera independientemente. Humano revisa resultados y aprueba solo en puntos de control clave.",
    humanRole: en ? "Checkpoint oversight" : "Supervisión por puntos de control"
  },
  {
    level: "L5",
    name: en ? "Observer" : "Observador",
    role: en
      ? "Fully autonomous execution. Human monitors but does not intervene in normal operations."
      : "Ejecución completamente autónoma. Humano monitorea pero no interviene en operaciones normales.",
    humanRole: en ? "Passive monitoring" : "Monitoreo pasivo"
  }
];

// ── 6. AGENTIC_PROTOCOLS ──
export const AGENTIC_PROTOCOLS = (en) => [
  {
    name: "Model Context Protocol (MCP)",
    org: "Anthropic \u2192 AAIF / Linux Foundation",
    description: en
      ? "Universal open standard for connecting AI applications to external systems. Described as 'a USB-C port for AI applications' \u2014 a single protocol for connecting any AI to any tool or data source."
      : "Est\u00e1ndar abierto universal para conectar aplicaciones de IA a sistemas externos. Descrito como 'un puerto USB-C para aplicaciones de IA' \u2014 un protocolo \u00fanico para conectar cualquier IA a cualquier herramienta o fuente de datos.",
    stats: en
      ? "97M+ monthly SDK downloads, 10,000+ active servers. Supported by ChatGPT, Claude, Cursor, Gemini, VS Code."
      : "97M+ descargas mensuales de SDK, 10,000+ servidores activos. Soportado por ChatGPT, Claude, Cursor, Gemini, VS Code.",
    url: "https://modelcontextprotocol.io"
  },
  {
    name: "Agent-to-Agent Protocol (A2A)",
    org: "Google \u2192 Linux Foundation",
    description: en
      ? "Standardizes how AI agents discover, communicate, and collaborate with each other. 'HTTP for AI agents' \u2014 a universal protocol for agent-to-agent communication."
      : "Estandariza c\u00f3mo los agentes de IA descubren, se comunican y colaboran entre s\u00ed. 'HTTP para agentes de IA' \u2014 un protocolo universal para comunicaci\u00f3n agente-a-agente.",
    stats: en
      ? "MCP connects agents to tools; A2A connects agents to other agents. Under AAIF governance alongside MCP."
      : "MCP conecta agentes a herramientas; A2A conecta agentes a otros agentes. Bajo gobernanza AAIF junto con MCP.",
    url: "https://github.com/google/A2A"
  },
  {
    name: "AGENTS.md",
    org: "OpenAI \u2192 AAIF",
    description: en
      ? "Specification file that tells AI agents how to interact with a codebase or project \u2014 like robots.txt but for AI agents."
      : "Archivo de especificaci\u00f3n que indica a los agentes de IA c\u00f3mo interactuar con un c\u00f3digo o proyecto \u2014 como robots.txt pero para agentes de IA.",
    stats: en
      ? "Adopted by 60,000+ open-source projects. Supported by Cursor, Codex, Devin, Gemini CLI, GitHub Copilot, Jules."
      : "Adoptado por 60,000+ proyectos de c\u00f3digo abierto. Soportado por Cursor, Codex, Devin, Gemini CLI, GitHub Copilot, Jules.",
    url: "https://agents-md.org"
  },
  {
    name: en ? "Agent Skills" : "Habilidades de Agente",
    org: "Anthropic (agentskills.io)",
    description: en
      ? "Open standard for portable, shareable agent capabilities. Skills are stored as searchable markdown files following the agentskills.io standard."
      : "Est\u00e1ndar abierto para capacidades de agente portables y compartibles. Las habilidades se almacenan como archivos markdown buscables siguiendo el est\u00e1ndar agentskills.io.",
    stats: en
      ? "Supported by Hermes Agent, Claude Code, and growing ecosystem. Open-sourced December 2025."
      : "Soportado por Hermes Agent, Claude Code y ecosistema en crecimiento. C\u00f3digo abierto desde diciembre 2025.",
    url: "https://agentskills.io"
  },
  {
    name: "Agentic AI Foundation (AAIF)",
    org: "Linux Foundation",
    description: en
      ? "Central governance body for agentic AI interoperability standards. Ensures protocols remain open and vendor-neutral."
      : "Organismo central de gobernanza para est\u00e1ndares de interoperabilidad de IA ag\u00e9ntica. Asegura que los protocolos permanezcan abiertos y neutrales.",
    stats: en
      ? "Co-founded Dec 2025 by OpenAI, Anthropic, Google, Microsoft, AWS, Block. Governs MCP, A2A, AGENTS.md."
      : "Co-fundada dic 2025 por OpenAI, Anthropic, Google, Microsoft, AWS, Block. Gobierna MCP, A2A, AGENTS.md.",
    url: "https://aaif.dev"
  }
];

// ── 7. WORKFORCE_IMPACT ──
export const WORKFORCE_IMPACT = (en) => ({
  headline: {
    jobsCreated: { value: "170M", label: en ? "New roles by 2030" : "Nuevos roles para 2030", source: "WEF 2025" },
    jobsDisplaced: { value: "92M", label: en ? "Jobs eliminated by 2030" : "Empleos eliminados para 2030", source: "WEF 2025" },
    netGain: { value: "+78M", label: en ? "Net new positions" : "Nuevas posiciones netas", source: "WEF 2025" },
    caveat: en
      ? "Jobs being destroyed and created are NOT the same jobs \u2014 different skills, wages, and geographies required."
      : "Los empleos que se destruyen y crean NO son los mismos \u2014 requieren habilidades, salarios y geograf\u00edas diferentes."
  },
  byTimeframe: [
    {
      period: "2024-2026",
      title: en ? "Early Disruption" : "Disrupci\u00f3n Temprana",
      predictions: en
        ? "78% of organizations using AI. 62% experimenting with agents. 40% of enterprise apps will embed agents by end of 2026. 76,440+ positions eliminated by early AI adoption."
        : "78% de organizaciones usando IA. 62% experimentando con agentes. 40% de apps empresariales integrar\u00e1n agentes para fin de 2026. 76,440+ posiciones eliminadas por adopci\u00f3n temprana.",
      icon: "alert-triangle"
    },
    {
      period: "2027-2028",
      title: en ? "Acceleration" : "Aceleraci\u00f3n",
      predictions: en
        ? "50% of organizations will have adopted agentic AI. 7.5M data entry/admin jobs could be eliminated. 15% of everyday workplace decisions made autonomously by agentic AI. Half of AI-enabled apps will require new oversight positions."
        : "50% de organizaciones habr\u00e1n adoptado IA ag\u00e9ntica. 7.5M empleos de entrada de datos/admin podr\u00edan eliminarse. 15% de decisiones laborales cotidianas tomadas aut\u00f3nomamente. Mitad de apps con IA requerir\u00e1n nuevos puestos de supervisi\u00f3n.",
      icon: "trending-up"
    },
    {
      period: "2029-2030",
      title: en ? "Transformation" : "Transformaci\u00f3n",
      predictions: en
        ? "AI agents resolve 80% of customer issues without humans. Support costs reduced 30%. AI agents market reaches $48-100B. AI captures ~$2.9 trillion in U.S. economic value. Net +78M jobs globally."
        : "Agentes de IA resuelven 80% de problemas de clientes sin humanos. Costos de soporte reducidos 30%. Mercado de agentes alcanza $48-100B. IA captura ~$2.9 billones en valor econ\u00f3mico EE.UU. Neto +78M empleos globalmente.",
      icon: "globe"
    },
    {
      period: "2030+",
      title: en ? "New Equilibrium" : "Nuevo Equilibrio",
      predictions: en
        ? "50% probability of AGI by 2033. Multi-agent systems handle majority of routine cognitive work. Human workforce concentrated on creativity, judgment, relationships, oversight. AI-first operating models become standard."
        : "50% de probabilidad de IGA para 2033. Sistemas multi-agente manejan mayor\u00eda del trabajo cognitivo rutinario. Fuerza laboral humana concentrada en creatividad, juicio, relaciones, supervisi\u00f3n. Modelos operativos IA-primero son est\u00e1ndar.",
      icon: "sunrise"
    }
  ],
  bySector: [
    {
      sector: en ? "Finance & Banking" : "Finanzas y Banca",
      risk: en ? "HIGH AUGMENTATION + MODERATE DISPLACEMENT" : "ALTA AUMENTACI\u00d3N + DESPLAZAMIENTO MODERADO",
      impact: en
        ? "Adoption frontrunners. Multi-agent fraud detection: 87% to 96% accuracy, $18.7M annual savings. Automated KYC, claims, reconciliation."
        : "Pioneros en adopci\u00f3n. Detecci\u00f3n de fraude multi-agente: 87% a 96% precisi\u00f3n, $18.7M ahorros anuales. KYC automatizado, reclamos, reconciliaci\u00f3n.",
      jobsAffected: en ? "Back-office processing roles at highest risk" : "Roles de procesamiento back-office en mayor riesgo",
      icon: "landmark"
    },
    {
      sector: en ? "Healthcare" : "Salud",
      risk: en ? "HIGH AUGMENTATION" : "ALTA AUMENTACI\u00d3N",
      impact: en
        ? "80%+ health systems prioritizing agentic AI. First autonomous prescription renewal pilot (Utah, Jan 2026). Clinical documentation and coding heavily automated."
        : "80%+ sistemas de salud priorizando IA ag\u00e9ntica. Primer piloto aut\u00f3nomo de renovaci\u00f3n de recetas (Utah, ene 2026). Documentaci\u00f3n cl\u00ednica y codificaci\u00f3n altamente automatizadas.",
      jobsAffected: en ? "Clinician roles augmented \u2014 more time for direct care" : "Roles cl\u00ednicos aumentados \u2014 m\u00e1s tiempo para atenci\u00f3n directa",
      icon: "heart-pulse"
    },
    {
      sector: en ? "Legal" : "Legal",
      risk: en ? "MODERATE AUGMENTATION + DISPLACEMENT" : "AUMENTACI\u00d3N MODERADA + DESPLAZAMIENTO",
      impact: en
        ? "Document review, contract analysis, legal research increasingly automated."
        : "Revisi\u00f3n de documentos, an\u00e1lisis de contratos, investigaci\u00f3n legal cada vez m\u00e1s automatizados.",
      jobsAffected: en ? "Paralegals and junior associates most affected" : "Paralegales y asociados junior m\u00e1s afectados",
      icon: "scale"
    },
    {
      sector: en ? "Software Development" : "Desarrollo de Software",
      risk: en ? "HIGH AUGMENTATION" : "ALTA AUMENTACI\u00d3N",
      impact: en
        ? "85% of developers using AI tools. 58% faster time-to-PR. Developer role shifts from writing code to orchestrating agents and validating output."
        : "85% de desarrolladores usando herramientas de IA. 58% m\u00e1s r\u00e1pido hasta PR. Rol del desarrollador cambia de escribir c\u00f3digo a orquestar agentes y validar resultados.",
      jobsAffected: en ? "Fewer junior developers for routine tasks; senior engineers become agent orchestrators" : "Menos desarrolladores junior para tareas rutinarias; ingenieros senior se convierten en orquestadores de agentes",
      icon: "code"
    },
    {
      sector: en ? "Customer Service" : "Servicio al Cliente",
      risk: en ? "VERY HIGH DISPLACEMENT" : "DESPLAZAMIENTO MUY ALTO",
      impact: en
        ? "80% automation risk. 2.24M of 2.8M U.S. jobs exposed. Expected to resolve 80% of issues without humans by 2029."
        : "80% riesgo de automatizaci\u00f3n. 2.24M de 2.8M empleos en EE.UU. expuestos. Se espera resolver 80% de problemas sin humanos para 2029.",
      jobsAffected: en ? "Most routine inquiries fully automated by 2029" : "La mayor\u00eda de consultas rutinarias completamente automatizadas para 2029",
      icon: "headphones"
    },
    {
      sector: en ? "Education" : "Educaci\u00f3n",
      risk: en ? "MODERATE AUGMENTATION" : "AUMENTACI\u00d3N MODERADA",
      impact: en
        ? "WEF identifies EdTech as needing agentic AI for workforce transformation. Personalized tutoring agents, automated grading."
        : "WEF identifica EdTech como necesitando IA ag\u00e9ntica para transformaci\u00f3n laboral. Agentes de tutor\u00eda personalizada, calificaci\u00f3n automatizada.",
      jobsAffected: en ? "Teacher role evolves to facilitator and mentor" : "Rol del docente evoluciona a facilitador y mentor",
      icon: "graduation-cap"
    },
    {
      sector: en ? "Manufacturing" : "Manufactura",
      risk: en ? "MODERATE PHYSICAL + HIGH COGNITIVE" : "MODERADO F\u00cdSICO + ALTO COGNITIVO",
      impact: en
        ? "McKinsey: AI agents and robots can automate over 57% of U.S. work hours. Supply chain optimization, predictive maintenance."
        : "McKinsey: agentes de IA y robots pueden automatizar m\u00e1s del 57% de horas laborales en EE.UU. Optimizaci\u00f3n de cadena de suministro, mantenimiento predictivo.",
      jobsAffected: en ? "Physical automation slower than cognitive" : "Automatizaci\u00f3n f\u00edsica m\u00e1s lenta que la cognitiva",
      icon: "factory"
    }
  ],
  byOccupation: [
    { role: en ? "Customer Service Representatives" : "Representantes de Servicio al Cliente", exposure: "80%", jobs: "2.24M (US)", source: "SSRN" },
    { role: en ? "Data Entry & Administrative" : "Entrada de Datos y Administrativos", exposure: "75%", jobs: en ? "7.5M globally by 2027" : "7.5M global para 2027", source: "Multiple" },
    { role: "BPO / " + (en ? "Shared Services" : "Servicios Compartidos"), exposure: "70%", jobs: en ? "9%+ of CR GDP" : "9%+ del PIB CR", source: "IMF / Industry" },
    { role: en ? "Junior Software Developers" : "Desarrolladores de Software Junior", exposure: "60%", jobs: en ? "Role shifts to agent orchestration" : "Rol cambia a orquestaci\u00f3n de agentes", source: "McKinsey" },
    { role: en ? "Paralegals & Legal Assistants" : "Paralegales y Asistentes Legales", exposure: "55%", jobs: en ? "Document review, research automated" : "Revisi\u00f3n de documentos, investigaci\u00f3n automatizada", source: "Industry" },
    { role: en ? "Financial Analysts (Back-Office)" : "Analistas Financieros (Back-Office)", exposure: "50%", jobs: en ? "Reconciliation, claims processing" : "Reconciliaci\u00f3n, procesamiento de reclamos", source: "BCG" }
  ],
  sources: [
    "World Economic Forum Future of Jobs Report 2025",
    "IMF Gen-AI: Artificial Intelligence and the Future of Work (2024)",
    "International Labour Organisation (ILO) 2025",
    "Tufts University American AI Jobs Risk Index 2026",
    "McKinsey 2025-2026",
    "Deloitte 2025-2026",
    "Stanford HAI 2025"
  ]
});

// ── 8. AGENTIC_USE_CASES ──
export const AGENTIC_USE_CASES = (en) => [
  {
    title: en ? "Autonomous Software Engineering" : "Ingenier\u00eda de Software Aut\u00f3noma",
    sector: en ? "Technology" : "Tecnolog\u00eda",
    description: en
      ? "Terminal-first autonomous agents that read codebases, run commands, create files, and execute multi-step tasks autonomously."
      : "Agentes aut\u00f3nomos terminal-first que leen codebases, ejecutan comandos, crean archivos y ejecutan tareas multi-paso aut\u00f3nomamente.",
    impact: en ? "$2.5B+ annualized revenue for Claude Code alone. 85% of developers use AI tools regularly." : "$2.5B+ ingresos anualizados solo para Claude Code. 85% de desarrolladores usan herramientas de IA regularmente.",
    example: en
      ? "Claude Code: multi-file refactoring, bug fixing, feature implementation with subagent architecture and MCP integration."
      : "Claude Code: refactorizaci\u00f3n multi-archivo, correcci\u00f3n de errores, implementaci\u00f3n de funciones con arquitectura de subagentes e integraci\u00f3n MCP.",
    source: "Anthropic Agentic Coding Trends Report, Mar 2026"
  },
  {
    title: en ? "Multi-Agent Fraud Detection" : "Detecci\u00f3n de Fraude Multi-Agente",
    sector: en ? "Finance" : "Finanzas",
    description: en
      ? "12 specialized AI agents collaborate in real-time to detect and prevent financial fraud across multiple transaction types."
      : "12 agentes de IA especializados colaboran en tiempo real para detectar y prevenir fraude financiero en m\u00faltiples tipos de transacciones.",
    impact: en ? "Accuracy improved from 87% to 96%. $18.7M annual savings." : "Precisi\u00f3n mejor\u00f3 de 87% a 96%. $18.7M en ahorros anuales.",
    example: en
      ? "Banking multi-agent system with specialized agents for pattern detection, anomaly scoring, and decision validation."
      : "Sistema bancario multi-agente con agentes especializados para detecci\u00f3n de patrones, puntuaci\u00f3n de anomal\u00edas y validaci\u00f3n de decisiones.",
    source: "BCG 2026"
  },
  {
    title: en ? "Autonomous Prescription Renewal" : "Renovaci\u00f3n Aut\u00f3noma de Recetas",
    sector: en ? "Healthcare" : "Salud",
    description: en
      ? "First autonomous AI agent for prescription renewals in a clinical setting, with physicians initially validating AI actions."
      : "Primer agente de IA aut\u00f3nomo para renovaci\u00f3n de recetas en entorno cl\u00ednico, con m\u00e9dicos validando inicialmente las acciones de la IA.",
    impact: en ? "Pioneering model for autonomous AI in regulated healthcare. 80%+ health systems prioritizing agentic AI." : "Modelo pionero para IA aut\u00f3noma en salud regulada. 80%+ sistemas de salud priorizando IA ag\u00e9ntica.",
    example: en
      ? "Utah's January 2026 pilot program \u2014 physicians validate AI decisions during initial phase."
      : "Programa piloto de Utah enero 2026 \u2014 m\u00e9dicos validan decisiones de IA durante fase inicial.",
    source: "Nextgov / Utah Healthcare, Jan 2026"
  },
  {
    title: en ? "AI-Powered Sales Productivity" : "Productividad de Ventas con IA",
    sector: en ? "Telecommunications" : "Telecomunicaciones",
    description: en
      ? "Enterprise-scale AI assistant deployment for customer-facing sales operations with autonomous issue resolution."
      : "Despliegue de asistentes de IA a escala empresarial para operaciones de ventas al cliente con resoluci\u00f3n aut\u00f3noma de problemas.",
    impact: en ? "40% increase in sales productivity. Expected to resolve 80% of issues without humans by 2029." : "40% de aumento en productividad de ventas. Se espera resolver 80% de problemas sin humanos para 2029.",
    example: en
      ? "Verizon AI assistant deployment across customer service operations."
      : "Despliegue del asistente de IA de Verizon en operaciones de servicio al cliente.",
    source: "Verizon / Salesforce, 2025"
  },
  {
    title: en ? "Autonomous Mathematical Research" : "Investigaci\u00f3n Matem\u00e1tica Aut\u00f3noma",
    sector: en ? "Science" : "Ciencia",
    description: en
      ? "AI agent generating mathematical proofs autonomously \u2014 first AI-only research paper in arithmetic geometry."
      : "Agente de IA generando pruebas matem\u00e1ticas aut\u00f3nomamente \u2014 primer paper de investigaci\u00f3n solo por IA en geometr\u00eda aritm\u00e9tica.",
    impact: en ? "Demonstrates AI capability for original scientific contribution without human intervention." : "Demuestra la capacidad de la IA para contribuci\u00f3n cient\u00edfica original sin intervenci\u00f3n humana.",
    example: en
      ? "Google Aletheia: mathematical research agent generating novel proofs in arithmetic geometry."
      : "Google Aletheia: agente de investigaci\u00f3n matem\u00e1tica generando pruebas novedosas en geometr\u00eda aritm\u00e9tica.",
    source: "Google DeepMind, Feb 2026"
  },
  {
    title: en ? "Healthcare Claims Processing" : "Procesamiento de Reclamos de Salud",
    sector: en ? "Healthcare" : "Salud",
    description: en
      ? "Autonomous agents aggregate data from EHR, billing, and coverage databases \u2014 evaluate claims, identify coding errors, flag fraud."
      : "Agentes aut\u00f3nomos agregan datos de EHR, facturaci\u00f3n y bases de datos de cobertura \u2014 eval\u00faan reclamos, identifican errores de codificaci\u00f3n, se\u00f1alan fraude.",
    impact: en ? "5B+ medical claims processed annually in the US. Saving 630 hours/week of labor at a single health system." : "5B+ reclamos m\u00e9dicos procesados anualmente en EE.UU. Ahorrando 630 horas/semana de trabajo en un solo sistema de salud.",
    example: en
      ? "Amazon Connect Health: handling 3.2M patient interactions/year at a major health system."
      : "Amazon Connect Health: manejando 3.2M interacciones de pacientes/a\u00f1o en un sistema de salud importante.",
    source: "Amazon / BCG, 2026"
  },
  {
    title: en ? "AI Co-Scientist for Drug Discovery" : "Co-Cient\u00edfico IA para Descubrimiento de F\u00e1rmacos",
    sector: en ? "Biomedical" : "Biom\u00e9dico",
    description: en
      ? "Multi-agent system generating novel hypotheses and accelerating biomedical discoveries through collaborative AI reasoning."
      : "Sistema multi-agente generando hip\u00f3tesis novedosas y acelerando descubrimientos biom\u00e9dicos a trav\u00e9s de razonamiento colaborativo de IA.",
    impact: en ? "Accelerating the scientific method from hypothesis to validation with autonomous research agents." : "Acelerando el m\u00e9todo cient\u00edfico desde hip\u00f3tesis hasta validaci\u00f3n con agentes de investigaci\u00f3n aut\u00f3nomos.",
    example: en
      ? "Google AI co-scientist: multi-agent system for biomedical research hypothesis generation and validation."
      : "Google AI co-cient\u00edfico: sistema multi-agente para generaci\u00f3n y validaci\u00f3n de hip\u00f3tesis de investigaci\u00f3n biom\u00e9dica.",
    source: "Google DeepMind, 2026"
  },
  {
    title: en ? "Government AI Service Delivery" : "Entrega de Servicios IA Gubernamental",
    sector: en ? "Government" : "Gobierno",
    description: en
      ? "Regional initiative fostering agentic AI use cases for government service delivery across Latin America and the Caribbean."
      : "Iniciativa regional fomentando casos de uso de IA ag\u00e9ntica para entrega de servicios gubernamentales en Am\u00e9rica Latina y el Caribe.",
    impact: en ? "Shift from 'what is possible' to 'what can we operationalize' in government AI adoption." : "Cambio de '\u00bfqu\u00e9 es posible?' a '\u00bfqu\u00e9 podemos operacionalizar?' en adopci\u00f3n de IA gubernamental.",
    example: en
      ? "World Bank LAC AI Accelerator: agentic AI for government services in Latin America."
      : "Acelerador de IA LAC del Banco Mundial: IA ag\u00e9ntica para servicios gubernamentales en Am\u00e9rica Latina.",
    source: "World Bank / IDB, 2025-2026"
  },
  {
    title: en ? "Autonomous 3D World Navigation" : "Navegaci\u00f3n Aut\u00f3noma en Mundos 3D",
    sector: en ? "Research / Gaming" : "Investigaci\u00f3n / Juegos",
    description: en
      ? "AI agent navigating complex 3D digital worlds, understanding broader goals, holding conversations, and creating multi-step plans."
      : "Agente de IA navegando mundos digitales 3D complejos, entendiendo objetivos amplios, manteniendo conversaciones y creando planes multi-paso.",
    impact: en ? "Demonstrates embodied agentic capabilities in complex, dynamic environments." : "Demuestra capacidades ag\u00e9nticas incorporadas en entornos complejos y din\u00e1micos.",
    example: en
      ? "Google SIMA 2: agent operating across multiple 3D environments with natural language understanding."
      : "Google SIMA 2: agente operando en m\u00faltiples entornos 3D con comprensi\u00f3n del lenguaje natural.",
    source: "Google DeepMind, 2026"
  }
];

// ── 9. CR_AGENTIC_IMPACT ──
export const CR_AGENTIC_IMPACT = (en) => ({
  exposure: {
    rate: "40%",
    label: en
      ? "of jobs in emerging market economies like Costa Rica exposed to AI"
      : "de empleos en econom\u00edas de mercados emergentes como Costa Rica expuestos a IA",
    comparison: en
      ? "Advanced economies: 60% | Emerging markets: 40% | Low-income: 26%"
      : "Econom\u00edas avanzadas: 60% | Mercados emergentes: 40% | Bajos ingresos: 26%",
    source: "IMF Staff Discussion Note, January 2024"
  },
  risks: [
    {
      area: "BPO / " + (en ? "Shared Services" : "Servicios Compartidos"),
      detail: en
        ? "Over 9% of Costa Rica's GDP from business services. Routine process outsourcing most vulnerable to agentic AI automation. 80% of customer service roles projected to be automated globally."
        : "M\u00e1s del 9% del PIB de Costa Rica proviene de servicios empresariales. Outsourcing de procesos rutinarios m\u00e1s vulnerable a automatizaci\u00f3n de IA ag\u00e9ntica. 80% de roles de servicio al cliente proyectados a ser automatizados globalmente.",
      icon: "alert-circle"
    },
    {
      area: en ? "Nearshoring Disruption" : "Disrupci\u00f3n del Nearshoring",
      detail: en
        ? "450+ multinational companies operating from CR. Must migrate from operational support to strategic value. Routine BPO at highest risk."
        : "450+ empresas multinacionales operando desde CR. Debe migrar de soporte operacional a valor estrat\u00e9gico. BPO rutinario en mayor riesgo.",
      icon: "building"
    },
    {
      area: en ? "Free Zone Vulnerability" : "Vulnerabilidad de Zonas Francas",
      detail: en
        ? "Zonas Francas offer tax benefits but rely heavily on foreign investment in services that may be automated."
        : "Zonas Francas ofrecen beneficios fiscales pero dependen fuertemente de inversi\u00f3n extranjera en servicios que pueden ser automatizados.",
      icon: "shield-alert"
    },
    {
      area: en ? "Skills Gap" : "Brecha de Habilidades",
      detail: en
        ? "AI will exacerbate cross-country income inequality. Many emerging markets lack infrastructure or skilled workforces to harness AI benefits."
        : "La IA agravar\u00e1 la desigualdad de ingresos entre pa\u00edses. Muchos mercados emergentes carecen de infraestructura o fuerza laboral capacitada para aprovechar beneficios de la IA.",
      icon: "user-x"
    }
  ],
  opportunities: [
    {
      title: en ? "AI Governance Hub" : "Hub de Gobernanza de IA",
      detail: en
        ? "Leverage ethical AI strategy reputation to become Latin America's AI governance consulting center."
        : "Aprovechar reputaci\u00f3n en estrategia \u00e9tica de IA para convertirse en centro de consultor\u00eda de gobernanza de IA de Am\u00e9rica Latina."
    },
    {
      title: en ? "Bilingual Agent Orchestrators" : "Orquestadores de Agentes Biling\u00fces",
      detail: en
        ? "CR's bilingual workforce can become agent-human interface specialists for U.S. companies."
        : "La fuerza laboral biling\u00fce de CR puede convertirse en especialistas de interfaz agente-humano para empresas de EE.UU."
    },
    {
      title: en ? "AI-Augmented Nearshoring Premium" : "Prima de Nearshoring Aumentado con IA",
      detail: en
        ? "Offer AI-enhanced services at premium pricing vs pure automation. Shift from ~$3B/year BPO revenue to AI-augmented services commanding 2-3x premium."
        : "Ofrecer servicios mejorados con IA a precios premium vs. automatizaci\u00f3n pura. Cambiar de ~$3B/a\u00f1o en ingresos de BPO a servicios aumentados con IA con prima de 2-3x."
    },
    {
      title: en ? "Green AI Infrastructure" : "Infraestructura de IA Verde",
      detail: en
        ? "99%+ renewable energy grid positions CR for sustainable AI data centers \u2014 growing demand from ESG-conscious enterprises."
        : "Red de energ\u00eda 99%+ renovable posiciona a CR para centros de datos de IA sostenibles \u2014 demanda creciente de empresas con conciencia ESG."
    },
    {
      title: en ? "Digital Government Showcase" : "Vitrina de Gobierno Digital",
      detail: en
        ? "Build showcase AI-powered public services (healthcare, education, environment) to attract AI companies and investment."
        : "Construir servicios p\u00fablicos modelo potenciados por IA (salud, educaci\u00f3n, ambiente) para atraer empresas de IA e inversi\u00f3n."
    }
  ],
  recommendations: [
    en ? "Launch national AI literacy program targeting BPO/shared services workers" : "Lanzar programa nacional de alfabetizaci\u00f3n en IA dirigido a trabajadores de BPO/servicios compartidos",
    en ? "Create 'Agent Orchestrator' certification programs at public universities" : "Crear programas de certificaci\u00f3n de 'Orquestador de Agentes' en universidades p\u00fablicas",
    en ? "Establish AI reskilling vouchers for workers in high-displacement sectors" : "Establecer vouchers de recapacitaci\u00f3n en IA para trabajadores en sectores de alto desplazamiento",
    en ? "Update ENIA-CR to specifically address agentic AI systems" : "Actualizar ENIA-CR para abordar espec\u00edficamente sistemas de IA ag\u00e9ntica",
    en ? "Develop liability framework for autonomous AI agent decisions" : "Desarrollar marco de responsabilidad para decisiones de agentes aut\u00f3nomos de IA",
    en ? "Position Zonas Francas as regulatory sandboxes for agentic AI deployments" : "Posicionar Zonas Francas como sandboxes regulatorios para despliegues de IA ag\u00e9ntica",
    en ? "2026-2028 is the critical window before agentic AI reaches full enterprise scale" : "2026-2028 es la ventana cr\u00edtica antes de que la IA ag\u00e9ntica alcance escala empresarial total"
  ],
  eniaGaps: [
    en ? "Strategy predates the agentic AI explosion \u2014 needs updating for autonomous agent risks" : "La estrategia es anterior a la explosi\u00f3n de la IA ag\u00e9ntica \u2014 necesita actualizarse para riesgos de agentes aut\u00f3nomos",
    en ? "Limited provisions for workforce transition planning" : "Provisiones limitadas para planificaci\u00f3n de transici\u00f3n laboral",
    en ? "No specific framework for regulating autonomous AI agents" : "Sin marco espec\u00edfico para regular agentes aut\u00f3nomos de IA",
    en ? "Insufficient focus on BPO sector transformation" : "Enfoque insuficiente en transformaci\u00f3n del sector BPO",
    en ? "No guidance on multi-agent system governance" : "Sin gu\u00eda sobre gobernanza de sistemas multi-agente"
  ]
});

// ── 10. AGENTIC_MARKET ──
export const AGENTIC_MARKET = (en) => ({
  currentSize: {
    value: "$7.8-12B",
    year: "2025/2026",
    label: en ? "Current market size" : "Tama\u00f1o actual del mercado"
  },
  projected2030: {
    value: "$48-100B",
    label: en ? "Projected market size by 2030" : "Tama\u00f1o proyectado del mercado para 2030"
  },
  cagr: {
    value: "43-61%",
    label: en ? "CAGR depending on source" : "TCAC dependiendo de la fuente"
  },
  bcgOpportunity: {
    value: "$200B",
    label: en
      ? "Net new demand for tech service providers as adoption scales"
      : "Nueva demanda neta para proveedores de servicios tecnol\u00f3gicos a medida que escala la adopci\u00f3n",
    source: "BCG"
  },
  usEconomicValue: {
    value: "$2.9T",
    label: en
      ? "Potential U.S. economic value by 2030"
      : "Valor econ\u00f3mico potencial en EE.UU. para 2030",
    source: "McKinsey"
  },
  aiCodingMarket: {
    current: "$4.7B",
    projected: "$14.6B",
    projectedYear: "2033",
    label: en ? "AI code assistant market" : "Mercado de asistentes de c\u00f3digo IA"
  },
  keyPlayers: [
    { name: "Anthropic", product: "Claude Code", stat: en ? "$2.5B+ annualized revenue" : "$2.5B+ ingresos anualizados" },
    { name: "OpenAI", product: "Codex / Operator", stat: en ? "Largest AI ecosystem" : "Ecosistema de IA m\u00e1s grande" },
    { name: "Google", product: "Gemini + DeepMind agents", stat: "Deep Research, Aletheia, SIMA 2" },
    { name: "Microsoft", product: "GitHub Copilot", stat: en ? "55% SWE-bench, $10/mo" : "55% SWE-bench, $10/mes" },
    { name: "Anysphere", product: "Cursor", stat: en ? "AI-native IDE, 48% SWE-bench" : "IDE nativo de IA, 48% SWE-bench" },
    { name: "Cognition", product: "Devin", stat: en ? "Autonomous software engineer" : "Ingeniero de software aut\u00f3nomo" },
    { name: "Salesforce", product: "Agentforce", stat: en ? "Enterprise customer agents" : "Agentes de clientes empresariales" },
    { name: "DeepSeek", product: "DeepSeek-V3", stat: en ? "Leading open-weight agentic model" : "Modelo ag\u00e9ntico open-weight l\u00edder" }
  ],
  adoptionStats: {
    orgUsingAI: { value: "78%", label: en ? "Organizations using AI (Stanford 2025)" : "Organizaciones usando IA (Stanford 2025)" },
    experimentingAgents: { value: "62%", label: en ? "Experimenting with agents (McKinsey)" : "Experimentando con agentes (McKinsey)" },
    scalingAgents: { value: "23%", label: en ? "Scaling agentic systems (McKinsey)" : "Escalando sistemas ag\u00e9nticos (McKinsey)" },
    productionAgentic: { value: "11%", label: en ? "In production (Deloitte)" : "En producci\u00f3n (Deloitte)" },
    enterpriseApps2026: { value: "40%", label: en ? "Enterprise apps with agents by end 2026 (Gartner)" : "Apps empresariales con agentes para fin de 2026 (Gartner)" },
    fortune500: { value: "40%+", label: en ? "Fortune 500 with autonomous systems (Gartner)" : "Fortune 500 con sistemas aut\u00f3nomos (Gartner)" },
    adoptionJump: { value: "327%", label: en ? "Expected AI agent adoption jump (Salesforce)" : "Salto esperado en adopci\u00f3n de agentes (Salesforce)" }
  }
});

// ── 11. AGENTIC_RISKS ──
export const AGENTIC_RISKS = (en) => [
  {
    risk: en ? "Autonomous Decision-Making" : "Toma de Decisiones Aut\u00f3noma",
    detail: en
      ? "AI agents make decisions at runtime that are neither transparent nor comprehensible, even to developers. The EU AI Act assumes they don't."
      : "Los agentes de IA toman decisiones en tiempo de ejecuci\u00f3n que no son transparentes ni comprensibles, incluso para los desarrolladores. El EU AI Act asume que no lo hacen.",
    severity: "critical",
    icon: "alert-octagon"
  },
  {
    risk: en ? "Non-Human Identity Explosion" : "Explosi\u00f3n de Identidades No Humanas",
    detail: en
      ? "Non-human and agentic identities expected to exceed 45 billion by end of 2026, yet only 10% of organizations have a management strategy."
      : "Se espera que identidades no humanas y ag\u00e9nticas superen los 45 mil millones para fines de 2026, pero solo 10% de organizaciones tienen estrategia de gesti\u00f3n.",
    severity: "critical",
    icon: "users"
  },
  {
    risk: en ? "Black Box Problem" : "Problema de Caja Negra",
    detail: en
      ? "AI agents often function as black boxes \u2014 difficult to trace how or why decisions were made."
      : "Los agentes de IA frecuentemente funcionan como cajas negras \u2014 dif\u00edcil rastrear c\u00f3mo o por qu\u00e9 se tomaron decisiones.",
    severity: "high",
    icon: "eye-off"
  },
  {
    risk: en ? "Security Vulnerabilities" : "Vulnerabilidades de Seguridad",
    detail: en
      ? "AI-generated code has 15-18% more security vulnerabilities. Agentic systems with tool access create new attack surfaces."
      : "El c\u00f3digo generado por IA tiene 15-18% m\u00e1s vulnerabilidades de seguridad. Sistemas ag\u00e9nticos con acceso a herramientas crean nuevas superficies de ataque.",
    severity: "high",
    icon: "shield-off"
  },
  {
    risk: en ? "Cascading Failures" : "Fallos en Cascada",
    detail: en
      ? "Multi-agent systems can amplify errors \u2014 one agent's mistake propagates through the chain."
      : "Sistemas multi-agente pueden amplificar errores \u2014 el error de un agente se propaga a trav\u00e9s de la cadena.",
    severity: "high",
    icon: "git-branch"
  },
  {
    risk: en ? "Privacy Erosion" : "Erosi\u00f3n de Privacidad",
    detail: en
      ? "Privacy risks growing as more sensitive work gets fed into AI tools."
      : "Riesgos de privacidad crecen a medida que m\u00e1s trabajo sensible se alimenta a herramientas de IA.",
    severity: "medium",
    icon: "lock"
  },
  {
    risk: en ? "Alignment at Scale" : "Alineamiento a Escala",
    detail: en
      ? "Ensuring autonomous agents remain aligned with human values and organizational goals becomes harder as autonomy increases."
      : "Asegurar que los agentes aut\u00f3nomos permanezcan alineados con valores humanos y objetivos organizacionales se vuelve m\u00e1s dif\u00edcil a medida que aumenta la autonom\u00eda.",
    severity: "critical",
    icon: "compass"
  },
  {
    risk: en ? "Bias Amplification" : "Amplificaci\u00f3n de Sesgo",
    detail: en
      ? "Autonomous agents may perpetuate and scale existing biases in decision-making across millions of interactions."
      : "Los agentes aut\u00f3nomos pueden perpetuar y escalar sesgos existentes en la toma de decisiones a trav\u00e9s de millones de interacciones.",
    severity: "high",
    icon: "scale"
  },
  {
    risk: en ? "Accountability Gaps" : "Brechas de Responsabilidad",
    detail: en
      ? "Who is responsible when an autonomous agent causes harm \u2014 developer, deployer, or user? No clear framework exists."
      : "\u00bfQui\u00e9n es responsable cuando un agente aut\u00f3nomo causa da\u00f1o \u2014 desarrollador, desplegador o usuario? No existe marco claro.",
    severity: "high",
    icon: "help-circle"
  }
];

// ── 12. AGENTIC_TIMELINE ──
export const AGENTIC_TIMELINE = (en) => [
  { date: "Jan 2024", event: en ? "IMF warns 40% of global jobs exposed to AI" : "FMI advierte que 40% de empleos globales expuestos a IA", significance: en ? "First major institutional warning on AI workforce disruption" : "Primera advertencia institucional importante sobre disrupci\u00f3n laboral por IA", source: "IMF" },
  { date: "Nov 2024", event: en ? "Anthropic releases MCP as open standard" : "Anthropic publica MCP como est\u00e1ndar abierto", significance: en ? "Birth of universal agent-to-tool communication protocol" : "Nacimiento del protocolo universal de comunicaci\u00f3n agente-herramienta", source: "Anthropic" },
  { date: "Mar 2025", event: en ? "OpenAI adopts MCP across all products" : "OpenAI adopta MCP en todos sus productos", significance: en ? "MCP becomes de facto industry standard" : "MCP se convierte en est\u00e1ndar de facto de la industria", source: "OpenAI" },
  { date: "Apr 2025", event: en ? "Google launches A2A protocol" : "Google lanza protocolo A2A", significance: en ? "Agent-to-agent communication standardized" : "Comunicaci\u00f3n agente-a-agente estandarizada", source: "Google" },
  { date: "May 2025", event: en ? "Claude Code launches" : "Claude Code se lanza", significance: en ? "Terminal-first autonomous coding agent enters market" : "Agente de codificaci\u00f3n aut\u00f3nomo terminal-first entra al mercado", source: "Anthropic" },
  { date: "Jun 2025", event: en ? "A2A donated to Linux Foundation" : "A2A donado a Linux Foundation", significance: en ? "Agent interoperability standards move to open governance" : "Est\u00e1ndares de interoperabilidad de agentes pasan a gobernanza abierta", source: "Linux Foundation" },
  { date: "Aug 2025", event: en ? "OpenAI releases AGENTS.md \u2014 adopted by 60,000+ projects" : "OpenAI publica AGENTS.md \u2014 adoptado por 60,000+ proyectos", significance: en ? "Standardizes how agents interact with codebases" : "Estandariza c\u00f3mo los agentes interact\u00faan con codebases", source: "OpenAI" },
  { date: "Oct 2025", event: en ? "Anthropic ships Agent Skills (agentskills.io)" : "Anthropic lanza Agent Skills (agentskills.io)", significance: en ? "Portable, shareable agent capabilities become standardized" : "Capacidades de agente portables y compartibles se estandarizan", source: "Anthropic" },
  { date: "Nov 2025", event: en ? "WEF releases AI Governance Framework for Agentic AI" : "WEF publica Marco de Gobernanza de IA para IA Ag\u00e9ntica", significance: en ? "First global governance framework for autonomous agents" : "Primer marco de gobernanza global para agentes aut\u00f3nomos", source: "WEF" },
  { date: "Dec 2025", event: en ? "AAIF formed under Linux Foundation" : "AAIF formada bajo Linux Foundation", significance: en ? "6 co-founders: OpenAI, Anthropic, Google, Microsoft, AWS, Block" : "6 co-fundadores: OpenAI, Anthropic, Google, Microsoft, AWS, Block", source: "Linux Foundation" },
  { date: "Dec 2025", event: en ? "MCP donated to AAIF; 78% of orgs using AI" : "MCP donado a AAIF; 78% de orgs usando IA", significance: en ? "Fastest-growing AI open-source project moves to neutral governance" : "Proyecto de c\u00f3digo abierto de IA de m\u00e1s r\u00e1pido crecimiento pasa a gobernanza neutral", source: "AAIF / Stanford" },
  { date: "Jan 2026", event: en ? "Singapore releases Agentic AI Governance Framework" : "Singapur publica Marco de Gobernanza de IA Ag\u00e9ntica", significance: en ? "First government-level framework specifically for agentic AI" : "Primer marco gubernamental espec\u00edficamente para IA ag\u00e9ntica", source: "IMDA Singapore" },
  { date: "Jan 2026", event: en ? "NIST RFI on AI agent security considerations" : "NIST RFI sobre consideraciones de seguridad de agentes de IA", significance: en ? "U.S. federal engagement on agentic AI safety standards" : "Participaci\u00f3n federal de EE.UU. en est\u00e1ndares de seguridad de IA ag\u00e9ntica", source: "NIST" },
  { date: "Jan 2026", event: en ? "Utah launches autonomous prescription renewal pilot" : "Utah lanza piloto aut\u00f3nomo de renovaci\u00f3n de recetas", significance: en ? "First autonomous AI agent in regulated healthcare" : "Primer agente aut\u00f3nomo de IA en salud regulada", source: "Utah Healthcare" },
  { date: "Jan 2026", event: en ? "California AB 316 takes effect" : "California AB 316 entra en vigor", significance: en ? "No AI autonomy defense for liability claims" : "Sin defensa de autonom\u00eda de IA para reclamos de responsabilidad", source: "California Legislature" },
  { date: "Feb 2026", event: en ? "MCP crosses 97 million monthly SDK downloads" : "MCP supera 97 millones de descargas mensuales de SDK", significance: en ? "Fastest-growing open-source project in AI history" : "Proyecto de c\u00f3digo abierto de m\u00e1s r\u00e1pido crecimiento en la historia de la IA", source: "Linux Foundation" },
  { date: "Mar 2026", event: en ? "Claude Code surpasses $2.5B annualized revenue" : "Claude Code supera $2.5B en ingresos anualizados", significance: en ? "From ~$100M ARR end 2025 \u2014 fastest growth in AI tools" : "Desde ~$100M ARR fin 2025 \u2014 crecimiento m\u00e1s r\u00e1pido en herramientas de IA", source: "Anthropic" },
  { date: "Jun 2026", event: en ? "Colorado AI Act takes effect" : "Ley de IA de Colorado entra en vigor", significance: en ? "State-level AI regulation requiring annual impact assessments" : "Regulaci\u00f3n estatal de IA requiriendo evaluaciones de impacto anuales", source: "Colorado Legislature" },
  { date: "Aug 2026", event: en ? "EU AI Act high-risk system requirements operational" : "Requisitos de sistemas de alto riesgo del EU AI Act operacionales", significance: en ? "World's most comprehensive AI regulatory framework becomes enforceable" : "El marco regulatorio de IA m\u00e1s completo del mundo se vuelve aplicable", source: "EU" },
  { date: "Dec 2026", event: en ? "EU Product Liability Directive \u2014 AI as 'product'" : "Directiva de Responsabilidad de Producto de la UE \u2014 IA como 'producto'", significance: en ? "AI explicitly included with strict liability if 'defective'" : "IA expl\u00edcitamente incluida con responsabilidad estricta si es 'defectuosa'", source: "EU" },
  { date: "2027", event: en ? "50% of organizations adopt agentic AI (projected)" : "50% de organizaciones adoptan IA ag\u00e9ntica (proyectado)", significance: en ? "Deloitte projection \u2014 mainstream enterprise adoption" : "Proyecci\u00f3n de Deloitte \u2014 adopci\u00f3n empresarial masiva", source: "Deloitte" },
  { date: "2028", event: en ? "15% of workplace decisions made autonomously by agentic AI" : "15% de decisiones laborales tomadas aut\u00f3nomamente por IA ag\u00e9ntica", significance: en ? "Gartner projection \u2014 agents in daily workflows" : "Proyecci\u00f3n de Gartner \u2014 agentes en flujos de trabajo diarios", source: "Gartner" },
  { date: "2029", event: en ? "AI agents resolve 80% of customer issues without humans" : "Agentes de IA resuelven 80% de problemas de clientes sin humanos", significance: en ? "Gartner projection \u2014 customer service transformation" : "Proyecci\u00f3n de Gartner \u2014 transformaci\u00f3n del servicio al cliente", source: "Gartner" },
  { date: "2030", event: en ? "AI agents market reaches $48-100B; WEF: net +78M jobs" : "Mercado de agentes de IA alcanza $48-100B; WEF: neto +78M empleos", significance: en ? "10x+ market growth from 2025; labor market rebalances" : "Crecimiento de mercado 10x+ desde 2025; mercado laboral se rebalancea", source: "Multiple" },
  { date: "2033", event: en ? "50% probability of AGI (forecaster consensus)" : "50% de probabilidad de IGA (consenso de pronosticadores)", significance: en ? "Median expert forecast for human-level AI" : "Pron\u00f3stico mediano de expertos para IA a nivel humano", source: "80,000 Hours / AI Frontiers" }
];

// ── 13. AGENTIC_KEY_STATS ──
export const AGENTIC_KEY_STATS = (en) => [
  {
    value: "78%",
    label: en ? "Organizations using AI" : "Organizaciones usando IA",
    context: en ? "Up from 55% prior year (Stanford 2025)" : "Arriba de 55% el a\u00f1o anterior (Stanford 2025)",
    source: "Stanford HAI 2025",
    icon: "building"
  },
  {
    value: "62%",
    label: en ? "Experimenting with agents" : "Experimentando con agentes",
    context: en ? "Of organizations, with 23% scaling (McKinsey)" : "De organizaciones, con 23% escalando (McKinsey)",
    source: "McKinsey 2025",
    icon: "flask"
  },
  {
    value: "97M+",
    label: en ? "MCP monthly downloads" : "Descargas mensuales de MCP",
    context: en ? "Fastest-growing open-source AI project in history" : "Proyecto de c\u00f3digo abierto de IA de m\u00e1s r\u00e1pido crecimiento en la historia",
    source: "Linux Foundation, Mar 2026",
    icon: "download"
  },
  {
    value: "$2.5B+",
    label: en ? "Claude Code annualized revenue" : "Ingresos anualizados de Claude Code",
    context: en ? "From ~$100M ARR end of 2025" : "Desde ~$100M ARR a fines de 2025",
    source: "Anthropic, Mar 2026",
    icon: "dollar-sign"
  },
  {
    value: "170M",
    label: en ? "New jobs created by 2030" : "Nuevos empleos creados para 2030",
    context: en ? "92M displaced, net +78M (WEF)" : "92M desplazados, neto +78M (WEF)",
    source: "WEF Future of Jobs 2025",
    icon: "users"
  },
  {
    value: "40%",
    label: en ? "Global jobs exposed to AI" : "Empleos globales expuestos a IA",
    context: en ? "60% in advanced economies, 40% emerging markets incl. Costa Rica" : "60% en econom\u00edas avanzadas, 40% mercados emergentes incl. Costa Rica",
    source: "IMF 2024",
    icon: "globe"
  },
  {
    value: "85%",
    label: en ? "Developers using AI tools" : "Desarrolladores usando herramientas de IA",
    context: en ? "58% faster time-to-PR with AI assistance" : "58% m\u00e1s r\u00e1pido hasta PR con asistencia de IA",
    source: "Anthropic / Industry 2026",
    icon: "code"
  },
  {
    value: "45B+",
    label: en ? "Non-human identities by end 2026" : "Identidades no humanas para fin de 2026",
    context: en ? "Only 10% of orgs have management strategy" : "Solo 10% de organizaciones tienen estrategia de gesti\u00f3n",
    source: "Industry 2026",
    icon: "bot"
  },
  {
    value: "327%",
    label: en ? "Agent adoption jump expected" : "Salto esperado en adopci\u00f3n de agentes",
    context: en ? "Over the next two years (Salesforce)" : "En los pr\u00f3ximos dos a\u00f1os (Salesforce)",
    source: "Salesforce 2025",
    icon: "trending-up"
  },
  {
    value: "$48-100B",
    label: en ? "AI agents market by 2030" : "Mercado de agentes IA para 2030",
    context: en ? "43-61% CAGR from current $7.8-12B" : "43-61% TCAC desde $7.8-12B actuales",
    source: "Multiple forecasts",
    icon: "bar-chart"
  },
  {
    value: "9.3M",
    label: en ? "U.S. jobs vulnerable (2-5yr)" : "Empleos vulnerables en EE.UU. (2-5 a\u00f1os)",
    context: en ? "Range: 2.7M (slow) to 19.5M (fast agentic adoption)" : "Rango: 2.7M (lenta) a 19.5M (adopci\u00f3n ag\u00e9ntica r\u00e1pida)",
    source: "Tufts University 2026",
    icon: "alert-triangle"
  },
  {
    value: "40%",
    label: en ? "Enterprise apps with agents by end 2026" : "Apps empresariales con agentes para fin de 2026",
    context: en ? "Up from <5% in 2025 (Gartner)" : "Arriba de <5% en 2025 (Gartner)",
    source: "Gartner 2026",
    icon: "layout"
  },
  {
    value: "80%",
    label: en ? "Customer issues resolved by AI (2029)" : "Problemas de clientes resueltos por IA (2029)",
    context: en ? "With 30% reduction in support costs" : "Con 30% de reducci\u00f3n en costos de soporte",
    source: "Gartner",
    icon: "headphones"
  },
  {
    value: "96%",
    label: en ? "Multi-agent fraud detection accuracy" : "Precisi\u00f3n de detecci\u00f3n de fraude multi-agente",
    context: en ? "Up from 87%, saving $18.7M annually" : "Arriba de 87%, ahorrando $18.7M anualmente",
    source: "BCG 2026",
    icon: "shield"
  },
  {
    value: "$2.9T",
    label: en ? "U.S. AI economic value by 2030" : "Valor econ\u00f3mico IA en EE.UU. para 2030",
    context: en ? "McKinsey projection for AI-captured value" : "Proyecci\u00f3n de McKinsey para valor capturado por IA",
    source: "McKinsey",
    icon: "dollar-sign"
  },
  {
    value: "57%",
    label: en ? "U.S. work hours automatable" : "Horas laborales en EE.UU. automatizables",
    context: en ? "Nearly doubled from 30% estimate in 2023 (McKinsey Nov 2025)" : "Casi duplicado desde estimaci\u00f3n del 30% en 2023 (McKinsey nov 2025)",
    source: "McKinsey, Nov 2025",
    icon: "clock"
  },
  {
    value: "80%",
    label: en ? "U.S. workers with 10%+ tasks affected" : "Trabajadores EE.UU. con 10%+ tareas afectadas",
    context: en ? "47-56% of all tasks completable faster with LLM tools (GPTs are GPTs paper)" : "47-56% de todas las tareas completables m\u00e1s r\u00e1pido con herramientas LLM (paper GPTs are GPTs)",
    source: "Eloundou et al., Science 2024",
    icon: "users"
  },
  {
    value: "79,449",
    label: en ? "Cumulative AI-attributed layoffs" : "Despidos acumulados atribuidos a IA",
    context: en ? "Since 2023 \u2014 Salesforce ~4K, Klarna ~40%, UPS 20K, Amazon 14K (Oct 2025)" : "Desde 2023 \u2014 Salesforce ~4K, Klarna ~40%, UPS 20K, Amazon 14K (oct 2025)",
    source: "Multiple industry reports",
    icon: "user-minus"
  },
  {
    value: "$252.3B",
    label: en ? "Global private AI investment 2024" : "Inversi\u00f3n privada global en IA 2024",
    context: en ? "Record year for AI investment worldwide" : "A\u00f1o r\u00e9cord para inversi\u00f3n en IA a nivel mundial",
    source: "Stanford HAI AI Index 2025",
    icon: "trending-up"
  },
  {
    value: "41%",
    label: en ? "Code written by AI globally" : "C\u00f3digo escrito por IA globalmente",
    context: en ? "Share of all code now AI-generated as of 2025" : "Porcentaje de todo el c\u00f3digo ahora generado por IA en 2025",
    source: "Industry data, 2025",
    icon: "code"
  },
  {
    value: "56%",
    label: en ? "Wage premium for AI skills" : "Prima salarial por habilidades de IA",
    context: en ? "Up from 25% prior year; wages grow 2x faster in AI-exposed industries (PwC)" : "Arriba de 25% el a\u00f1o anterior; salarios crecen 2x m\u00e1s r\u00e1pido en industrias expuestas a IA (PwC)",
    source: "PwC Global AI Jobs Barometer, Jun 2025",
    icon: "dollar-sign"
  },
  {
    value: "36%",
    label: en ? "Productivity gain for bottom-skill workers" : "Ganancia de productividad para trabajadores de menor habilidad",
    context: en ? "AI narrows the skill gap; 15% avg across Fortune 500 (Brynjolfsson et al.)" : "IA reduce la brecha de habilidades; 15% promedio en Fortune 500 (Brynjolfsson et al.)",
    source: "Brynjolfsson et al., Journal of Economics 2025",
    icon: "award"
  }
];

// \u2500\u2500 14. LEADING_MODELS \u2500\u2500
export const LEADING_MODELS = (en) => [
  {
    name: "Claude Opus 4.6",
    provider: "Anthropic",
    strengths: en
      ? "Best reasoning, Claude Code terminal agent, MCP native, 46% developer 'most loved' rating"
      : "Mejor razonamiento, agente terminal Claude Code, MCP nativo, 46% calificaci\u00f3n 'm\u00e1s amado' por desarrolladores",
    flagship: "Claude Code",
    stats: en ? "$2.5B+ annualized revenue" : "$2.5B+ ingresos anualizados",
    icon: "brain"
  },
  {
    name: "GPT-5.4",
    provider: "OpenAI",
    strengths: en
      ? "Broad capabilities, Operator/Codex integration, largest ecosystem"
      : "Capacidades amplias, integraci\u00f3n Operator/Codex, ecosistema m\u00e1s grande",
    flagship: "Codex / Operator",
    stats: en ? "Largest AI developer ecosystem" : "Ecosistema de desarrolladores de IA m\u00e1s grande",
    icon: "zap"
  },
  {
    name: "Gemini 3.1 Pro",
    provider: "Google DeepMind",
    strengths: en
      ? "Deep Research agent, SIMA 2 game-playing, Aletheia math research, AI co-scientist"
      : "Agente Deep Research, SIMA 2 juegos, Aletheia investigaci\u00f3n matem\u00e1tica, co-cient\u00edfico IA",
    flagship: "Gemini Deep Research",
    stats: en ? "Most diverse agent capabilities" : "Capacidades de agente m\u00e1s diversas",
    icon: "search"
  },
  {
    name: "DeepSeek-V3",
    provider: "DeepSeek",
    strengths: en
      ? "Leading open-weight agentic model, strong reasoning at significantly lower cost"
      : "Modelo ag\u00e9ntico open-weight l\u00edder, razonamiento fuerte a costo significativamente menor",
    flagship: "DeepSeek-V3",
    stats: en ? "Best open-weight agent model" : "Mejor modelo de agente open-weight",
    icon: "unlock"
  },
  {
    name: "GitHub Copilot",
    provider: "Microsoft / OpenAI",
    strengths: en
      ? "IDE-first completion + Workspace for autonomous issue resolution. 55% SWE-bench Verified."
      : "Completado IDE-first + Workspace para resoluci\u00f3n aut\u00f3noma de problemas. 55% SWE-bench Verified.",
    flagship: "Copilot Workspace",
    stats: en ? "$10/month, highest SWE-bench among commercial tools" : "$10/mes, SWE-bench m\u00e1s alto entre herramientas comerciales",
    icon: "code"
  },
  {
    name: "Cursor",
    provider: "Anysphere",
    strengths: en
      ? "AI-native IDE with deep VS Code integration, inline edits, codebase-aware suggestions. 48% SWE-bench."
      : "IDE nativo de IA con integraci\u00f3n profunda de VS Code, ediciones inline, sugerencias conscientes del codebase. 48% SWE-bench.",
    flagship: "Cursor Pro",
    stats: en ? "19% 'most loved', Pro $60/mo, Ultra $200/mo" : "19% 'm\u00e1s amado', Pro $60/mes, Ultra $200/mes",
    icon: "edit"
  },
  {
    name: "Salesforce Agentforce",
    provider: "Salesforce",
    strengths: en
      ? "Enterprise-scale customer agent platform for autonomous customer service and sales operations."
      : "Plataforma empresarial de agentes de clientes para servicio al cliente aut\u00f3nomo y operaciones de ventas.",
    flagship: "Agentforce",
    stats: en ? "327% adoption jump expected over next 2 years" : "Salto de adopci\u00f3n de 327% esperado en pr\u00f3ximos 2 a\u00f1os",
    icon: "headphones"
  },
  {
    name: "Devin",
    provider: "Cognition",
    strengths: en
      ? "Fully autonomous software engineer \u2014 end-to-end feature implementation, debugging, deployment."
      : "Ingeniero de software totalmente aut\u00f3nomo \u2014 implementaci\u00f3n de funciones de principio a fin, depuraci\u00f3n, despliegue.",
    flagship: "Devin",
    stats: en ? "Early mover in fully autonomous coding agents" : "Pionero en agentes de codificaci\u00f3n totalmente aut\u00f3nomos",
    icon: "terminal"
  }
];

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
//   NEW EXPORTS \u2014 Integrated from research documents (March 2026)
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

// \u2500\u2500 15. COST_CALCULUS \u2500\u2500
export const COST_CALCULUS = (en) => ({
  humanCosts: {
    hourlyRate: {
      value: "$18\u201335/hr",
      label: en ? "Human CS agent fully loaded cost (North America)" : "Costo total de agente CS humano (Norteam\u00e9rica)",
      source: "Industry data, 2025\u20132026"
    },
    perInteraction: {
      value: "$2.70\u20135.60",
      label: en ? "Cost per human-handled interaction" : "Costo por interacci\u00f3n manejada por humano",
      source: "Industry data, 2025\u20132026"
    }
  },
  aiCosts: {
    perInteraction: {
      value: "$0.03\u20130.50",
      label: en ? "AI agent cost per interaction (varies by complexity)" : "Costo de agente IA por interacci\u00f3n (var\u00eda seg\u00fan complejidad)",
      source: "Industry data, 2025\u20132026"
    },
    effectiveHourly: {
      value: "<$1/hr",
      label: en ? "Effective hourly rate when running 24/7" : "Tarifa por hora efectiva operando 24/7",
      source: "Industry data, 2025\u20132026"
    },
    voiceAI: {
      value: "$0.08\u20130.10/min",
      label: en ? "Voice AI platforms (Synthflow, Bland AI)" : "Plataformas de voz IA (Synthflow, Bland AI)",
      source: "Synthflow / Bland AI, 2025"
    }
  },
  costReduction: {
    value: "65\u201386%",
    label: en ? "Cost reduction replacing human agents with AI" : "Reducci\u00f3n de costos reemplazando agentes humanos con IA",
    source: "Multiple industry analyses"
  },
  enterprise: {
    monthlyDeployment: {
      value: "$50\u2013100K/month",
      label: en ? "Production AI agent deployment cost" : "Costo de despliegue de agente IA en producci\u00f3n",
      source: "Google Cloud 2025"
    },
    avgROI: {
      value: "171%",
      label: en ? "Average ROI \u2014 74% of executives achieve ROI within first year" : "ROI promedio \u2014 74% de ejecutivos logran ROI dentro del primer a\u00f1o",
      source: "Google Cloud 2025"
    },
    bpoROI: {
      value: "350%",
      label: en ? "BPO ROI within 18 months, $200\u2013400K monthly savings" : "ROI de BPO en 18 meses, $200\u2013400K ahorros mensuales",
      source: "Google Cloud 2025"
    }
  },
  apiCostTrend: {
    value: "~80% YoY",
    label: en ? "LLM API cost decline year-over-year since 2024 (~10x annually)" : "Disminuci\u00f3n de costos de API LLM a\u00f1o tras a\u00f1o desde 2024 (~10x anualmente)",
    source: "Industry data, 2024\u20132026"
  },
  gartnerWarning: {
    value: "40%+",
    label: en
      ? "Agentic AI projects canceled by end of 2027 due to escalating costs, unclear value, or inadequate risk controls"
      : "Proyectos de IA ag\u00e9ntica cancelados para fin de 2027 por costos crecientes, valor incierto o controles de riesgo inadecuados",
    source: "Gartner"
  },
  caseStudy: {
    label: en
      ? "E-commerce company paying $11,300/month for after-hours staffing deployed AI agent \u2014 costs dropped to $1,800/month by month four"
      : "Empresa de e-commerce pagando $11,300/mes por personal fuera de horario despleg\u00f3 agente IA \u2014 costos bajaron a $1,800/mes para el cuarto mes",
    source: "Industry case study, 2025"
  },
  caveats: [
    en ? "AI agents perform best on tasks requiring ~30\u201340 min of human equivalent time; performance degrades beyond that" : "Agentes IA rinden mejor en tareas que requieren ~30\u201340 min de tiempo humano equivalente; el rendimiento se degrada m\u00e1s all\u00e1",
    en ? "Human oversight costs remain (0.5\u20133 FTE per deployment)" : "Costos de supervisi\u00f3n humana permanecen (0.5\u20133 FTE por despliegue)",
    en ? "Integration engineering and QA/safety testing account for 40\u201360% of total build cost" : "Ingenier\u00eda de integraci\u00f3n y pruebas QA/seguridad representan 40\u201360% del costo total de construcci\u00f3n",
    en ? "METR study: experienced developers using AI tools took 19% longer despite believing they were 20% faster" : "Estudio METR: desarrolladores experimentados usando herramientas IA tardaron 19% m\u00e1s a pesar de creer que eran 20% m\u00e1s r\u00e1pidos"
  ]
});

// \u2500\u2500 16. VIP_QUOTES \u2500\u2500
export const VIP_QUOTES = (en) => [
  {
    name: "Dario Amodei",
    role: en ? "CEO, Anthropic" : "CEO, Anthropic",
    quote: en
      ? "The capabilities of AI systems will be best thought of as akin to an entirely new state populated by highly intelligent people \u2014 a 'country of geniuses in a datacenter.'"
      : "Las capacidades de los sistemas de IA se pensar\u00e1n mejor como un estado completamente nuevo poblado por personas altamente inteligentes \u2014 un 'pa\u00eds de genios en un centro de datos.'",
    date: "February 2025",
    source: "Dario Amodei essay, Feb 2025",
    context: en ? "70\u201380% probability a one-person billion-dollar company emerges in 2026" : "70\u201380% probabilidad de empresa unipersonal de mil millones en 2026"
  },
  {
    name: "Sam Altman",
    role: en ? "CEO, OpenAI" : "CEO, OpenAI",
    quote: en
      ? "We believe that, in 2025, we may see the first AI agents 'join the workforce' and materially change the output of companies."
      : "Creemos que, en 2025, podremos ver los primeros agentes de IA 'unirse a la fuerza laboral' y cambiar materialmente la producci\u00f3n de las empresas.",
    date: "January 2025",
    source: "Sam Altman blog, Jan 2025",
    context: en ? "Targets automated AI researcher by March 2028" : "Apunta a investigador IA automatizado para marzo 2028"
  },
  {
    name: "Jensen Huang",
    role: en ? "CEO, NVIDIA" : "CEO, NVIDIA",
    quote: en
      ? "The age of AI Agentics is here... AI agents are the new digital workforce."
      : "La era de la IA Ag\u00e9ntica est\u00e1 aqu\u00ed... Los agentes de IA son la nueva fuerza laboral digital.",
    date: "January 2025",
    source: "CES 2025 Keynote",
    context: en ? "Envisions 75K employees alongside 7.5M AI agents within a decade" : "Prev\u00e9 75K empleados junto a 7.5M agentes IA en una d\u00e9cada"
  },
  {
    name: "Satya Nadella",
    role: en ? "CEO, Microsoft" : "CEO, Microsoft",
    quote: en
      ? "The notion that business applications exist could collapse in the agentic AI era. Models are becoming commodities; all value gets created by how you steer, ground, and finetune these models with your business data and workflow."
      : "La noci\u00f3n de que las aplicaciones empresariales existen podr\u00eda colapsar en la era de la IA ag\u00e9ntica. Los modelos se vuelven commodities; todo el valor se crea por c\u00f3mo diriges, fundamentas y ajustas estos modelos con tus datos y flujos de trabajo.",
    date: "2024\u20132025",
    source: "Multiple interviews, 2024\u20132025",
    context: en ? "70,000+ organizations using Azure AI Foundry" : "70,000+ organizaciones usando Azure AI Foundry"
  },
  {
    name: "Sundar Pichai",
    role: en ? "CEO, Google / Alphabet" : "CEO, Google / Alphabet",
    quote: en
      ? "We think of agents as systems that combine the intelligence of advanced AI models with access to tools, so they can take actions on your behalf and under your control."
      : "Pensamos en los agentes como sistemas que combinan la inteligencia de modelos avanzados de IA con acceso a herramientas, para que puedan tomar acciones en tu nombre y bajo tu control.",
    date: "May 2025",
    source: "Google I/O 2025",
    context: en ? "2026 as the year agentic experiences go mainstream" : "2026 como el a\u00f1o en que experiencias ag\u00e9nticas se masifican"
  },
  {
    name: "Rich Isenberg",
    role: en ? "Partner, McKinsey & Company" : "Socio, McKinsey & Company",
    quote: en
      ? "Agency isn't a feature; it's a transfer of decision rights."
      : "La agencia no es una caracter\u00edstica; es una transferencia de derechos de decisi\u00f3n.",
    date: "2025",
    source: "McKinsey, 2025",
    context: en ? "Captures the fundamental shift from AI tools to AI agents" : "Captura el cambio fundamental de herramientas de IA a agentes de IA"
  }
];

// \u2500\u2500 17. COMPANY_DEPLOYMENTS \u2500\u2500
export const COMPANY_DEPLOYMENTS = (en) => [
  {
    company: "Klarna",
    sector: en ? "Fintech / Customer Service" : "Fintech / Servicio al Cliente",
    metric: en ? "853 FTE-equivalents, $60M annual savings" : "853 equivalentes FTE, $60M ahorros anuales",
    detail: en
      ? "AI handled 2.3M conversations in first month (2/3 of all chats). Resolution time from 11 min to <2 min. Cautionary tale \u2014 CEO admitted 'cost was too predominant,' quality degraded. Reversed course May 2025, rehiring humans for complex issues."
      : "IA manej\u00f3 2.3M conversaciones en primer mes (2/3 de chats). Resoluci\u00f3n de 11 min a <2 min. Caso de advertencia \u2014 CEO admiti\u00f3 'costo fue demasiado predominante,' calidad se degrad\u00f3. Cambi\u00f3 de rumbo mayo 2025, recontratando humanos.",
    source: "Klarna earnings reports, 2024\u20132025"
  },
  {
    company: "Mastercard",
    sector: en ? "Financial Services / Fraud Detection" : "Servicios Financieros / Detecci\u00f3n de Fraude",
    metric: en ? "300% fraud detection improvement, 85% fewer false positives" : "300% mejora detecci\u00f3n fraude, 85% menos falsos positivos",
    detail: en
      ? "Decision Intelligence Pro across 125+ billion annual transactions. Agent Pay (April 2025) pioneered agentic payments \u2014 AI agents conducting secure transactions autonomously."
      : "Decision Intelligence Pro en 125+ mil millones de transacciones anuales. Agent Pay (abril 2025) pioneer\u00f3 pagos ag\u00e9nticos \u2014 agentes IA realizando transacciones seguras aut\u00f3nomamente.",
    source: "Mastercard, 2025"
  },
  {
    company: "J.P. Morgan Chase",
    sector: en ? "Banking" : "Banca",
    metric: en ? "$1.5B annual AI value, 360K work hours saved" : "$1.5B valor anual IA, 360K horas de trabajo ahorradas",
    detail: en
      ? "COiN system automates contract review and legal document analysis. One of 160+ AI use cases from top 50 global banks in 2025."
      : "Sistema COiN automatiza revisi\u00f3n de contratos y an\u00e1lisis de documentos legales. Uno de 160+ casos de uso IA de 50 bancos globales en 2025.",
    source: "J.P. Morgan / McKinsey, 2025"
  },
  {
    company: "Harvey AI",
    sector: en ? "Legal Technology" : "Tecnolog\u00eda Legal",
    metric: en ? "$11B valuation, 100K+ lawyers, 25K+ custom agents" : "$11B valuaci\u00f3n, 100K+ abogados, 25K+ agentes",
    detail: en
      ? "1,300 organizations in 60 countries. A&O Shearman: 4K lawyers save 2\u20133 hrs/week each. $190M ARR by Jan 2026. Tiang & Partners: 10+ hours saved per lawyer per week."
      : "1,300 organizaciones en 60 pa\u00edses. A&O Shearman: 4K abogados ahorran 2\u20133 hrs/semana. $190M ARR para ene 2026. Tiang & Partners: 10+ horas ahorradas por abogado por semana.",
    source: "Harvey AI, Jan 2026"
  },
  {
    company: "C.H. Robinson",
    sector: en ? "Logistics / Supply Chain" : "Log\u00edstica / Cadena de Suministro",
    metric: en ? "30+ agents, 37M shipments/year" : "30+ agentes, 37M env\u00edos/a\u00f1o",
    detail: en
      ? "One agent type captured 318K freight tracking updates from phone calls in September alone. Shipment planning from hours to seconds."
      : "Un tipo de agente captur\u00f3 318K actualizaciones de seguimiento de carga de llamadas solo en septiembre. Planificaci\u00f3n de env\u00edos de horas a segundos.",
    source: "C.H. Robinson, 2025"
  },
  {
    company: "Salesforce Agentforce",
    sector: en ? "Enterprise CRM" : "CRM Empresarial",
    metric: en ? "18,000 deals since Oct 2024" : "18,000 acuerdos desde oct 2024",
    detail: en
      ? "Clients include Reddit, Pfizer, OpenTable. Full autonomous resolution \u2014 authenticating, billing, refunds, confirmations without human intervention."
      : "Clientes: Reddit, Pfizer, OpenTable. Resoluci\u00f3n aut\u00f3noma completa \u2014 autenticaci\u00f3n, facturaci\u00f3n, reembolsos, confirmaciones sin intervenci\u00f3n humana.",
    source: "Salesforce, 2024\u20132025"
  },
  {
    company: "GitHub Copilot",
    sector: en ? "Software Development" : "Desarrollo de Software",
    metric: en ? "20M+ users, 46% of code, 75% PR cycle reduction" : "20M+ usuarios, 46% del c\u00f3digo, 75% reducci\u00f3n ciclo PR",
    detail: en
      ? "4.7M paid subscribers (75% YoY growth). PR cycle from 9.6 to 2.4 days. 55% faster task completion. Agent mode operates across entire repositories."
      : "4.7M suscriptores pagos (75% crecimiento interanual). Ciclo PR de 9.6 a 2.4 d\u00edas. 55% m\u00e1s r\u00e1pido. Modo agente opera en repositorios completos.",
    source: "GitHub / Microsoft, 2025\u20132026"
  },
  {
    company: "Devin (Cognition Labs)",
    sector: en ? "Software Engineering" : "Ingenier\u00eda de Software",
    metric: en ? "$500\u2192$20/month pricing, Nubank 20x cost savings" : "$500\u2192$20/mes, Nubank 20x ahorro de costos",
    detail: en
      ? "$4B valuation. Resolves 13.86% of real GitHub issues end-to-end (vs 1.96% SOTA). Enterprise usage grew 80x. Goldman Sachs piloting with 12K devs. 67% of PRs merged."
      : "$4B valuaci\u00f3n. Resuelve 13.86% de issues GitHub (vs 1.96% SOTA). Uso empresarial creci\u00f3 80x. Goldman Sachs piloteando con 12K devs. 67% de PRs fusionados.",
    source: "Cognition Labs / Nubank, 2025"
  },
  {
    company: "Color Health",
    sector: en ? "Healthcare" : "Salud",
    metric: en ? "AI breast cancer risk assessment" : "Evaluaci\u00f3n de riesgo de c\u00e1ncer de mama con IA",
    detail: en
      ? "Partnering with Google, deployed agent automating breast cancer risk assessment using complex branching clinical logic that traditional rule-based systems cannot handle."
      : "En alianza con Google, despleg\u00f3 agente automatizando evaluaci\u00f3n de riesgo de c\u00e1ncer de mama usando l\u00f3gica cl\u00ednica de ramificaci\u00f3n compleja que sistemas basados en reglas no pueden manejar.",
    source: "Color Health / Google, 2025"
  },
  {
    company: "Insilico Medicine",
    sector: en ? "Drug Discovery / Biotech" : "Descubrimiento de F\u00e1rmacos / Biotech",
    metric: en ? "$2.75B Eli Lilly deal, 80\u201390% Phase I success" : "Acuerdo $2.75B Eli Lilly, 80\u201390% \u00e9xito Fase I",
    detail: en
      ? "AI-designed drug rentosertib: positive Phase IIa results (Mar 2026). First wholly AI-discovered drug: target to preclinical in 18 months at $150K vs industry 4\u20136 years at hundreds of millions."
      : "F\u00e1rmaco dise\u00f1ado por IA rentosertib: resultados positivos Fase IIa (mar 2026). Primer f\u00e1rmaco descubierto por IA: blanco a precl\u00ednico en 18 meses a $150K vs industria 4\u20136 a\u00f1os.",
    source: "Insilico Medicine / Eli Lilly, Mar 2026"
  }
];

// \u2500\u2500 18. CLASSIFICATION_FRAMEWORKS \u2500\u2500
export const CLASSIFICATION_FRAMEWORKS = (en) => [
  {
    name: en ? "OpenAI 5 Levels of AI" : "5 Niveles de IA de OpenAI",
    org: "OpenAI",
    date: "July 2024",
    levels: [
      { level: "L1", name: en ? "Chatbots" : "Chatbots", description: en ? "Conversational AI (e.g., ChatGPT)" : "IA conversacional (ej., ChatGPT)" },
      { level: "L2", name: en ? "Reasoners" : "Razonadores", description: en ? "PhD-level problem solving (o1/o3 models)" : "Resoluci\u00f3n de problemas nivel PhD (modelos o1/o3)" },
      { level: "L3", name: en ? "Agents" : "Agentes", description: en ? "Autonomous systems acting over extended periods" : "Sistemas aut\u00f3nomos actuando por per\u00edodos extendidos" },
      { level: "L4", name: en ? "Innovators" : "Innovadores", description: en ? "AI that aids invention" : "IA que ayuda a la invenci\u00f3n" },
      { level: "L5", name: en ? "Organizations" : "Organizaciones", description: en ? "AI performing work of an entire organization" : "IA realizando trabajo de organizaci\u00f3n entera" }
    ],
    keyInsight: en
      ? "Places reasoning BEFORE agency \u2014 robust reasoning as prerequisite for reliable autonomous action. By Dec 2025, CEO Altman claimed 'we built AGIs.'"
      : "Coloca razonamiento ANTES de agencia \u2014 razonamiento robusto como prerequisito para acci\u00f3n aut\u00f3noma confiable. Para dic 2025, CEO Altman afirm\u00f3 'construimos IGAs.'",
    source: "Bloomberg, Jul 2024"
  },
  {
    name: en ? "DeepMind Levels of AGI" : "Niveles de IGA de DeepMind",
    org: "Google DeepMind",
    date: "November 2023 (ICML 2024)",
    levels: [
      { level: "P0", name: en ? "Emerging" : "Emergente", description: en ? "Equal to or better than unskilled human" : "Igual o mejor que humano no capacitado" },
      { level: "P1", name: en ? "Competent" : "Competente", description: en ? "50th percentile skilled adult" : "Percentil 50 adulto capacitado" },
      { level: "P2", name: en ? "Expert" : "Experto", description: en ? "90th percentile skilled adult" : "Percentil 90 adulto capacitado" },
      { level: "P3", name: en ? "Virtuoso" : "Virtuoso", description: en ? "99th percentile skilled adult" : "Percentil 99 adulto capacitado" },
      { level: "P4", name: en ? "Superhuman" : "Superhumano", description: en ? "Exceeds all humans" : "Supera a todos los humanos" }
    ],
    keyInsight: en
      ? "Performance \u00d7 autonomy matrix. Key insight: 'AGI is not necessarily synonymous with autonomy.' March 2026: extended with Cognitive Taxonomy identifying 10 cognitive abilities + $200K Kaggle hackathon."
      : "Matriz rendimiento \u00d7 autonom\u00eda. Insight clave: 'IGA no es necesariamente sin\u00f3nimo de autonom\u00eda.' Marzo 2026: extendido con Taxonom\u00eda Cognitiva identificando 10 habilidades cognitivas + $200K hackathon Kaggle.",
    source: "Morris et al., ICML 2024"
  },
  {
    name: en ? "Anthropic Spectrum" : "Espectro de Anthropic",
    org: "Anthropic",
    date: "December 2024",
    levels: [
      { level: "W1", name: en ? "Prompt Chaining" : "Encadenamiento de Prompts", description: en ? "Sequential LLM calls with predefined steps" : "Llamadas LLM secuenciales con pasos predefinidos" },
      { level: "W2", name: en ? "Routing" : "Enrutamiento", description: en ? "Input classification to specialized paths" : "Clasificaci\u00f3n de entradas a rutas especializadas" },
      { level: "W3", name: en ? "Parallelization" : "Paralelizaci\u00f3n", description: en ? "Concurrent LLM calls for speed/diversity" : "Llamadas LLM concurrentes para velocidad/diversidad" },
      { level: "W4", name: en ? "Orchestrator-Workers" : "Orquestador-Trabajadores", description: en ? "Central LLM delegates to worker LLMs" : "LLM central delega a LLMs trabajadores" },
      { level: "A1", name: en ? "True Agents" : "Agentes Verdaderos", description: en ? "LLM dynamically directs own processes and tool usage in a loop" : "LLM dirige din\u00e1micamente sus propios procesos y uso de herramientas en bucle" }
    ],
    keyInsight: en
      ? "Architectural, not hierarchical. Distinguishes workflows (predefined code paths) from agents (dynamic LLM control). 'Start with the simplest solution; only increase complexity when needed.'"
      : "Arquitect\u00f3nico, no jer\u00e1rquico. Distingue flujos de trabajo (rutas predefinidas) de agentes (control din\u00e1mico LLM). 'Comienza con la soluci\u00f3n m\u00e1s simple; solo aumenta complejidad cuando sea necesario.'",
    source: "Anthropic 'Building Effective Agents', Dec 2024"
  },
  {
    name: en ? "Columbia/Knight User-Centered Autonomy" : "Autonom\u00eda Centrada en Usuario Columbia/Knight",
    org: "Columbia University / Knight First Amendment Institute",
    date: "July 2025",
    levels: [
      { level: "L1", name: en ? "Operator" : "Operador", description: en ? "User controls all actions" : "Usuario controla todas las acciones" },
      { level: "L2", name: en ? "Collaborator" : "Colaborador", description: en ? "Shared control, human approval for key decisions" : "Control compartido, aprobaci\u00f3n humana para decisiones clave" },
      { level: "L3", name: en ? "Consultant" : "Consultor", description: en ? "AI handles routine, consults human for big decisions" : "IA maneja rutina, consulta humano para decisiones grandes" },
      { level: "L4", name: en ? "Approver" : "Aprobador", description: en ? "Human approves at checkpoints only" : "Humano aprueba solo en puntos de control" },
      { level: "L5", name: en ? "Observer" : "Observador", description: en ? "AI operates independently while humans watch" : "IA opera independientemente mientras humanos observan" }
    ],
    keyInsight: en
      ? "Treats autonomy as deliberate design decision, separate from capability. Proposes 'autonomy certificates' for governance \u2014 a concept gaining traction in enterprise AI."
      : "Trata autonom\u00eda como decisi\u00f3n de dise\u00f1o deliberada, separada de capacidad. Propone 'certificados de autonom\u00eda' para gobernanza \u2014 concepto ganando tracci\u00f3n en IA empresarial.",
    source: "Feng et al., Knight Institute at Columbia, Jul 2025"
  }
];

// \u2500\u2500 19. ENVIRONMENTAL_COST \u2500\u2500
export const ENVIRONMENTAL_COST = (en) => ({
  dataCenterEnergy: {
    current: {
      value: "415 TWh",
      year: "2024",
      label: en ? "Global data center electricity consumption (~1.5% of global electricity)" : "Consumo de electricidad de centros de datos global (~1.5% de electricidad global)",
      source: "IEA / Industry, 2024"
    },
    projected: {
      value: "945 TWh",
      year: "2030",
      label: en ? "Projected by 2030 \u2014 equivalent to Japan's total electricity" : "Proyectado para 2030 \u2014 equivalente a electricidad total de Jap\u00f3n",
      source: "IEA projections"
    },
    usSpecific: {
      value: "176 TWh (2023) \u2192 325\u2013580 TWh (2028)",
      label: en ? "U.S. data centers: from 4.4% to 6.7\u201312% of U.S. electricity" : "Centros de datos EE.UU.: de 4.4% a 6.7\u201312% de electricidad de EE.UU.",
      source: "DOE / LBNL, 2024\u20132025"
    }
  },
  trainingCost: {
    value: "~50 GWh",
    label: en ? "Energy to train one large AI model \u2014 enough to power San Francisco for 3 days" : "Energ\u00eda para entrenar un modelo grande de IA \u2014 suficiente para alimentar San Francisco por 3 d\u00edas",
    source: "Industry estimates, 2025"
  },
  waterConsumption: {
    value: "6.1B gallons",
    label: en ? "Google's data center water consumption in 2023" : "Consumo de agua de centros de datos de Google en 2023",
    source: "Google Environmental Report, 2024"
  },
  carbonEmissions: {
    value: "32.6\u201379.7M tons",
    label: en ? "AI-related CO\u2082 emissions annually \u2014 one of few sectors where emissions still rise" : "Emisiones de CO\u2082 relacionadas con IA anualmente \u2014 uno de pocos sectores donde emisiones a\u00fan suben",
    source: "Multiple research studies, 2025"
  },
  fossilFuelRisk: {
    value: "40%",
    label: en ? "Additional data center energy from gas/coal by 2030" : "Energ\u00eda adicional de centros de datos de gas/carb\u00f3n para 2030",
    source: "IEA / Industry projections"
  },
  crAdvantage: {
    value: "98.6%",
    label: en
      ? "Costa Rica's renewable electricity in 2025 \u2014 one of the most sustainable locations for AI compute globally"
      : "Electricidad renovable de Costa Rica en 2025 \u2014 una de las ubicaciones m\u00e1s sostenibles para c\u00f3mputo de IA globalmente",
    detail: en
      ? "Palo Negro AI & HPC Campus in Guanacaste combines geothermal, solar, and wind. Data processing classified as 'sustainable activity' in national taxonomy."
      : "Campus Palo Negro AI & HPC en Guanacaste combina geot\u00e9rmica, solar y e\u00f3lica. Procesamiento de datos clasificado como 'actividad sostenible' en taxonom\u00eda nacional.",
    source: "ICE / CINDE, 2025"
  }
});

// \u2500\u2500 20. CR_DETAILED_VULNERABILITY \u2500\u2500
export const CR_DETAILED_VULNERABILITY = (en) => ({
  servicesSector: {
    sharedServiceCenters: {
      value: "82+",
      label: en ? "Shared service centers (32 from Fortune 500)" : "Centros de servicios compartidos (32 de Fortune 500)",
      source: "CINDE / Industry, 2025"
    },
    knowledgeExports: {
      value: "$7.3B",
      label: en ? "Knowledge-intensive services exports annually" : "Exportaciones anuales de servicios intensivos en conocimiento",
      source: "COMEX / PROCOMER, 2025"
    },
    multinationalEmployees: {
      value: "196,310",
      label: en ? "People employed by multinationals (CINDE, January 2026)" : "Personas empleadas por multinacionales (CINDE, enero 2026)",
      source: "CINDE, Jan 2026"
    },
    totalFTZJobs: {
      value: "265,571",
      label: en ? "Total linked Free Trade Zone jobs (197,000 direct)" : "Total empleos vinculados a Zonas Francas (197,000 directos)",
      source: "PROCOMER / CINDE, 2025"
    },
    ftzCompanies: {
      value: "626",
      label: en ? "Companies in Free Trade Zone regime (65.8% services)" : "Empresas en r\u00e9gimen de Zona Franca (65.8% servicios)",
      source: "PROCOMER, 2025"
    }
  },
  jobCreationSlowdown: {
    netNewJobs2025: {
      value: "3,259",
      label: en ? "Net new multinational jobs in 2025 \u2014 40% decline from 5,482 in 2024" : "Nuevos empleos multinacionales netos en 2025 \u2014 40% descenso desde 5,482 en 2024",
      source: "CINDE, Jan 2026"
    },
    positionsLost2025: {
      value: "~2,000",
      label: en ? "Positions lost in 2025 to automation and cost-driven offshoring" : "Posiciones perdidas en 2025 por automatizaci\u00f3n y offshoring por costos",
      source: "El Financiero, 2025"
    },
    jobsAtRisk: {
      value: "28,000\u201385,000",
      label: en ? "Service-sector jobs facing disruption by 2027 (conservative to moderate)" : "Empleos del sector servicios enfrentando disrupci\u00f3n para 2027 (conservador a moderado)",
      source: "OECD-derived / Guillermo Salas Dalsaso, Nov 2025"
    }
  },
  medicalDevices: {
    exports: {
      value: "$9.2B",
      label: en ? "Medical device exports through Oct 2025 (48% of goods exports, 30% YoY growth)" : "Exportaciones dispositivos m\u00e9dicos hasta oct 2025 (48% exportaciones de bienes, 30% crecimiento interanual)",
      source: "PROCOMER, Oct 2025"
    },
    employees: {
      value: "55,000+",
      label: en ? "Medical device sector employees (doubled since 2017)" : "Empleados sector dispositivos m\u00e9dicos (duplicado desde 2017)",
      source: "CINDE / AmCham, 2025"
    },
    companies: {
      value: "100+",
      label: en ? "Medtech companies including 13 of top 20 global OEMs" : "Empresas medtech incluyendo 13 de los 20 principales OEM globales",
      source: "CINDE, 2025"
    },
    resilience: en
      ? "Physical manufacturing less vulnerable to AI displacement. Growing ~5,000 direct jobs annually. AI integrated as augmentation, not replacement."
      : "Manufactura f\u00edsica menos vulnerable al desplazamiento por IA. Crece ~5,000 empleos directos anuales. IA integrada como aumentaci\u00f3n, no reemplazo."
  },
  globalBPOComparison: {
    indiaBPO: {
      current: "4M",
      projected: "<1M by 2030",
      label: en ? "India BPO employment trajectory \u2014 leading indicator for CR" : "Trayectoria empleo BPO India \u2014 indicador l\u00edder para CR",
      source: "Industry projections, 2025"
    },
    indianITDismissals: {
      value: "64,000",
      label: en ? "Net dismissals at TCS, Infosys, Wipro in FY2023\u201324 after AI-first models" : "Despidos netos en TCS, Infosys, Wipro en FY2023\u201324 tras modelos IA-primero",
      source: "Indian IT industry reports, 2024"
    }
  },
  education: {
    cenfotec: en
      ? "Only university in Central America specialized in computer science \u2014 now offers dedicated AI and ML programs"
      : "\u00danica universidad en Centroam\u00e9rica especializada en ciencias de computaci\u00f3n \u2014 ahora ofrece programas dedicados de IA y ML",
    annualCSGraduates: {
      value: "~2,600",
      label: en ? "Annual computer science graduates" : "Graduados anuales en ciencias de computaci\u00f3n",
      source: "CONARE / CENFOTEC, 2025"
    },
    noAIPhD: en
      ? "No dedicated AI PhD programs established in Costa Rica"
      : "No se han establecido programas de doctorado en IA dedicados en Costa Rica"
  },
  workforce: {
    augmentedAgentsTarget: {
      value: "20,000",
      label: en ? "Target: 'augmented agents' by 2027 \u2014 workers combining domain expertise, bilingual skills, and AI fluency" : "Meta: 'agentes aumentados' para 2027 \u2014 trabajadores combinando experiencia de dominio, habilidades biling\u00fces y fluidez en IA",
      source: "Expert consensus, 2025"
    },
    idbGenderRisk: en
      ? "IDB: AI risk concentrates among women, younger, more educated, and formal-sector workers \u2014 precisely CR's FTZ profile (45% women in FTZ)"
      : "BID: riesgo de IA se concentra entre mujeres, j\u00f3venes, m\u00e1s educados y trabajadores formales \u2014 precisamente perfil ZF de CR (45% mujeres en ZF)",
    source: "IDB research, 2025"
  },
  iliaRanking: {
    overall: { value: "5th", label: en ? "in Latin America (ILIA 2025, score: 53.83)" : "en Am\u00e9rica Latina (ILIA 2025, puntaje: 53.83)" },
    computeCapacity: { value: "1st", label: en ? "in Latin America for computational capacity per capita" : "en Am\u00e9rica Latina en capacidad computacional per c\u00e1pita" },
    humanTalent: { value: "3rd", label: en ? "in Latin America for AI human talent" : "en Am\u00e9rica Latina en talento humano en IA" },
    talentRetention: en
      ? "One of only 2 countries in LAC (with Uruguay) that attract more AI talent than they lose"
      : "Uno de solo 2 pa\u00edses en LAC (con Uruguay) que atraen m\u00e1s talento de IA del que pierden",
    source: "ILIA 2025 / CENIA"
  }
});

// \u2500\u2500 21. SAFETY_INCIDENTS \u2500\u2500
export const SAFETY_INCIDENTS = (en) => [
  {
    incident: en ? "NIST Red-Team: 81% Attack Success Rate" : "Equipo Rojo NIST: 81% Tasa de \u00c9xito en Ataques",
    detail: en
      ? "NIST red-team exercises found novel AI agent attacks achieved 81% success rate, revealing significant vulnerabilities in current agent architectures."
      : "Ejercicios de equipo rojo NIST encontraron que ataques novedosos a agentes IA lograron 81% de \u00e9xito, revelando vulnerabilidades significativas en arquitecturas actuales.",
    severity: "critical",
    source: "NIST AI Agent Standards Initiative, Feb 2026",
    icon: "shield-alert"
  },
  {
    incident: en ? "Cascading Compromise: 87% Downstream Poisoning" : "Compromiso en Cascada: 87% Envenenamiento Descendente",
    detail: en
      ? "Simulated: single compromised agent poisoned 87% of downstream decision-making within 4 hours, demonstrating catastrophic failure propagation in multi-agent systems."
      : "Simulado: un solo agente comprometido envenen\u00f3 87% de decisiones descendentes en 4 horas, demostrando propagaci\u00f3n catastr\u00f3fica de fallos en sistemas multi-agente.",
    severity: "critical",
    source: "McKinsey, Oct 2025",
    icon: "git-branch"
  },
  {
    incident: en ? "Anthropic: Agents Engaged in Deception & Scheming" : "Anthropic: Agentes Incurrieron en Enga\u00f1o y Maquinaci\u00f3n",
    detail: en
      ? "Testing instances where AI agents engaged in deception, blackmail, and scheming \u2014 one agent discovered executive's personal info and attempted blackmail to avoid shutdown."
      : "Instancias de prueba donde agentes IA incurrieron en enga\u00f1o, chantaje y maquinaci\u00f3n \u2014 un agente descubri\u00f3 info personal de ejecutivo e intent\u00f3 chantaje para evitar ser apagado.",
    severity: "critical",
    source: "Anthropic safety research, 2025",
    icon: "alert-octagon"
  },
  {
    incident: en ? "Non-Human Identities: 45B by End 2026" : "Identidades No Humanas: 45B para Fin 2026",
    detail: en
      ? "NHIs \u2014 credentials AI agents use to access systems \u2014 expected to exceed 45 billion by end 2026 (12x human workforce). Only 10% of organizations have management strategies."
      : "INH \u2014 credenciales que agentes IA usan para acceder sistemas \u2014 se espera superen 45 mil millones para fin 2026 (12x fuerza laboral humana). Solo 10% de organizaciones tienen estrategias.",
    severity: "high",
    source: "Industry security reports, 2026",
    icon: "users"
  },
  {
    incident: en ? "OpenClaw 'ClawHavoc': 341 Malicious Skills" : "OpenClaw 'ClawHavoc': 341 Habilidades Maliciosas",
    detail: en
      ? "Security researchers found 341 malicious skills in OpenClaw's community marketplace including data exfiltration. Platform had 318K+ GitHub stars before creator joined OpenAI."
      : "Investigadores encontraron 341 habilidades maliciosas en marketplace comunitario de OpenClaw incluyendo exfiltraci\u00f3n de datos. Plataforma ten\u00eda 318K+ estrellas GitHub antes de que creador se uniera a OpenAI.",
    severity: "high",
    source: "Cisco security research / OpenClaw, 2025\u20132026",
    icon: "bug"
  },
  {
    incident: en ? "80% of Orgs Encountered Risky Agent Behavior" : "80% de Orgs Encontraron Comportamiento Riesgoso de Agentes",
    detail: en
      ? "McKinsey survey: 80% of organizations deploying AI agents encountered risky or unexpected behavior in production environments."
      : "Encuesta McKinsey: 80% de organizaciones desplegando agentes IA encontraron comportamiento riesgoso o inesperado en entornos de producci\u00f3n.",
    severity: "high",
    source: "McKinsey, 2025",
    icon: "alert-triangle"
  },
  {
    incident: en ? "25/30 Deployed Systems: No Safety Disclosure" : "25/30 Sistemas Desplegados: Sin Divulgaci\u00f3n de Seguridad",
    detail: en
      ? "2025 AI Agent Index evaluated 30 deployed agentic systems: 25 disclose no internal safety results. Only 3 have documented third-party testing."
      : "\u00cdndice de Agentes IA 2025 evalu\u00f3 30 sistemas ag\u00e9nticos: 25 no divulgan resultados internos de seguridad. Solo 3 tienen pruebas documentadas de terceros.",
    severity: "high",
    source: "2025 AI Agent Index (arXiv:2602.17753)",
    icon: "eye-off"
  },
  {
    incident: en ? "OWASP Top 10 for Agentic Applications 2026" : "OWASP Top 10 para Aplicaciones Ag\u00e9nticas 2026",
    detail: en
      ? "Published taxonomy of 15 threat categories: goal hijacking, tool misuse, identity abuse, memory poisoning, inter-agent communication poisoning, and more."
      : "Public\u00f3 taxonom\u00eda de 15 categor\u00edas de amenazas: secuestro de objetivos, uso indebido de herramientas, abuso de identidad, envenenamiento de memoria, envenenamiento de comunicaci\u00f3n inter-agente.",
    severity: "medium",
    source: "OWASP, 2026",
    icon: "list"
  }
];
