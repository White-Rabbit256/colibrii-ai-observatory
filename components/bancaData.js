/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Banca & AI Data Constants
   Banking fraud + AI agents analysis for Costa Rica
   Sources: OIJ, SUGEF, BCCR, LexisNexis, Deloitte, WEF, OWASP
   ═══════════════════════════════════════════════════════════════ */

// ── Fraud Loss Counter Configuration ──
// Annual loss: ₡6,000,000,000 (2025 projection from OIJ + SUGEF data)
// Rate: ₡6B / 31,557,600 sec/year = ₡190.26/sec = ₡11,415.53/min
// Start epoch: Jan 1 2025 00:00:00 UTC-6 (Costa Rica time)
export const BANCA_COUNTER_CONFIG = {
  annualLoss: 6_000_000_000,
  startEpoch: new Date("2025-01-01T06:00:00Z").getTime(), // Jan 1 2025 00:00 CST = 06:00 UTC
  perSecond: 6_000_000_000 / 31_557_600, // ≈ 190.26
  perMinute: 6_000_000_000 / 525_960, // ≈ 11,415.53
  source: "OIJ / SUGEF / Colibrii Labs projection (47.3% CAGR)",
};

// ── Fraud Time Series (OIJ / PDF-authoritative, 47.3% CAGR) ──
export const BANCA_FRAUD_TS = (en) => [
  { year: 2020, cases: 1303, losses: 607, type: en ? "Historical" : "Histórico" },
  { year: 2021, cases: 2103, losses: 1200, type: en ? "Historical" : "Histórico" },
  { year: 2022, cases: 3136, losses: 1800, type: en ? "Historical" : "Histórico" },
  { year: 2023, cases: 4613, losses: 2800, type: en ? "Historical" : "Histórico" },
  { year: 2024, cases: 6783, losses: 4200, type: en ? "Historical" : "Histórico" },
  { year: 2025, cases: 10027, losses: 6000, type: en ? "Historical" : "Histórico" },
  { year: 2026, cases: 14790, losses: 8850, type: en ? "Projection" : "Proyección" },
  { year: 2027, cases: 21786, losses: 13037, type: en ? "Projection" : "Proyección" },
  { year: 2028, cases: 32100, losses: 19200, type: en ? "Projection" : "Proyección" },
  { year: 2029, cases: 47300, losses: 28300, type: en ? "Projection" : "Proyección" },
  { year: 2030, cases: 69700, losses: 41700, type: en ? "Projection" : "Proyección" },
];

// ── 8 AI Threat Vectors ──
export const BANCA_THREATS = (en) => [
  {
    id: 1,
    name: en ? "AI Agent Account Takeover" : "Toma de Cuentas por Agentes AI",
    severity: 95,
    growth: "+340%",
    color: "#ef4444",
    desc: en
      ? "AI agents autonomously exploit MCP tool-poisoning vulnerabilities to hijack banking sessions. CVE-2025-6514 (CVSS 9.6) enables remote code execution through malicious tool descriptions in agent workflows."
      : "Agentes AI explotan autónomamente vulnerabilidades de envenenamiento de herramientas MCP para secuestrar sesiones bancarias. CVE-2025-6514 (CVSS 9.6) permite ejecución remota de código a través de descripciones maliciosas.",
    defense: en ? "Behavioral biometrics + session anomaly detection" : "Biometría conductual + detección de anomalías de sesión"
  },
  {
    id: 2,
    name: en ? "Deepfake Voice Authorization" : "Autorización por Voz Deepfake",
    severity: 92,
    growth: "+1,265%",
    color: "#ef4444",
    desc: en
      ? "3-second voice samples generate real-time deepfakes that bypass voice-based authentication. Cost: $10 per clone. Arup lost $25.6M to a deepfake video call impersonating their CFO."
      : "Muestras de voz de 3 segundos generan deepfakes en tiempo real que eluden autenticación por voz. Costo: $10 por clon. Arup perdió $25.6M por videollamada deepfake suplantando a su CFO.",
    defense: en ? "Multi-factor + liveness detection" : "Multifactor + detección de presencia"
  },
  {
    id: 3,
    name: en ? "Autonomous Phishing Campaigns" : "Campañas de Phishing Autónomo",
    severity: 90,
    growth: "+4,151%",
    color: "#f59e0b",
    desc: en
      ? "AI agents generate, deploy, and adapt thousands of hyper-personalized phishing emails per hour. They learn from response patterns and adjust in real-time, achieving 60-70% open rates."
      : "Agentes AI generan, despliegan y adaptan miles de correos de phishing hiperpersonalizados por hora. Aprenden de patrones de respuesta y se ajustan en tiempo real, logrando 60-70% de apertura.",
    defense: en ? "AI-powered email filtering + user awareness" : "Filtrado de email con AI + concientización"
  },
  {
    id: 4,
    name: en ? "AI-Powered SINPE Manipulation" : "Manipulación de SINPE con AI",
    severity: 88,
    growth: "+285%",
    color: "#f59e0b",
    desc: en
      ? "Exploitation of SINPE Móvil's real-time transfer infrastructure through social engineering enhanced by AI-generated context. Costa Rica's interconnected banking network amplifies propagation."
      : "Explotación de la infraestructura de transferencias en tiempo real de SINPE Móvil mediante ingeniería social potenciada por AI. La red bancaria interconectada de CR amplifica la propagación.",
    defense: en ? "Transaction anomaly detection + velocity limits" : "Detección de anomalías + límites de velocidad"
  },
  {
    id: 5,
    name: en ? "Synthetic Identity Creation" : "Creación de Identidades Sintéticas",
    severity: 85,
    growth: "+700%",
    color: "#f59e0b",
    desc: en
      ? "AI generates complete synthetic identities combining real and fabricated data. Bob Finance P2P demonstrated AI-created identities at scale to defraud lending platforms."
      : "AI genera identidades sintéticas completas combinando datos reales y fabricados. Bob Finance P2P demostró identidades creadas por AI a escala para defraudar plataformas de préstamos.",
    defense: en ? "Cross-database identity verification" : "Verificación cruzada de identidad"
  },
  {
    id: 6,
    name: en ? "Multi-Agent Coordinated Attacks" : "Ataques Coordinados Multi-Agente",
    severity: 82,
    growth: "NEW",
    color: "#8b5cf6",
    desc: en
      ? "Multiple AI agents collaborating through A2A (Agent-to-Agent) protocols to execute coordinated fraud campaigns. CVE-2025-43563 exposed authentication bypass in A2A handshakes."
      : "Múltiples agentes AI colaborando a través de protocolos A2A para ejecutar campañas de fraude coordinadas. CVE-2025-43563 expuso bypass de autenticación en handshakes A2A.",
    defense: en ? "Agent behavior monitoring + A2A protocol hardening" : "Monitoreo de agentes + endurecimiento de protocolo A2A"
  },
  {
    id: 7,
    name: en ? "AI Regulatory Arbitrage" : "Arbitraje Regulatorio AI",
    severity: 80,
    growth: "+180%",
    color: "#8b5cf6",
    desc: en
      ? "Exploitation of gaps between CR's zero AI-specific banking regulation and advanced frameworks (EU AI Act, UK DRCF). Multi-Agent Governance score: 0/100."
      : "Explotación de brechas entre la regulación cero de CR para AI bancaria y marcos avanzados (EU AI Act, UK DRCF). Gobernanza Multi-Agente: 0/100.",
    defense: en ? "Proactive regulatory alignment" : "Alineación regulatoria proactiva"
  },
  {
    id: 8,
    name: en ? "Automated Money Laundering" : "Lavado de Dinero Automatizado",
    severity: 78,
    growth: "+320%",
    color: "#8b5cf6",
    desc: en
      ? "AI agents autonomously structure transactions below reporting thresholds, create shell companies, and layer funds across jurisdictions. GAFILAT has flagged CR for increased monitoring."
      : "Agentes AI estructuran transacciones por debajo de umbrales de reporte, crean empresas fachada y estratifican fondos. GAFILAT ha señalado a CR para monitoreo aumentado.",
    defense: en ? "AI-powered AML pattern detection" : "Detección de patrones AML con AI"
  }
];

// ── Regulatory Gap Comparison (8 dimensions × 4 countries, 0-100) ──
export const BANCA_REG_GAP = (en) => {
  const dims = en
    ? ["Algorithm Accountability", "Consumer Protection", "Institutional Oversight", "Cross-Border Cooperation", "AI Banking Regulation", "Incident Response", "Multi-Agent Governance", "Data Protection in AI"]
    : ["Responsabilidad Algorítmica", "Protección al Consumidor", "Supervisión Institucional", "Cooperación Transfronteriza", "Regulación AI Bancaria", "Respuesta a Incidentes", "Gobernanza Multi-Agente", "Protección de Datos en AI"];
  return dims.map((dim, i) => ({
    dimension: dim,
    CR: [15, 25, 30, 20, 10, 35, 0, 20][i],
    UK: [75, 80, 70, 65, 60, 75, 25, 70][i],
    EU: [85, 75, 80, 70, 65, 70, 30, 90][i],
    SG: [70, 65, 75, 80, 70, 80, 35, 75][i],
  }));
};

// ── Cost Projections (3 scenarios × 6 years, ₡MM) ──
export const BANCA_COSTS = (en) => [
  { year: 2025, conservative: 6000, base: 27000, aggressive: 54000 },
  { year: 2026, conservative: 8850, base: 39825, aggressive: 79650 },
  { year: 2027, conservative: 13037, base: 58666, aggressive: 117333 },
  { year: 2028, conservative: 19200, base: 86400, aggressive: 172800 },
  { year: 2029, conservative: 28300, base: 127350, aggressive: 254700 },
  { year: 2030, conservative: 41700, base: 187650, aggressive: 375300 },
];

// ── IFRABA Score Breakdown (78/100) ──
export const BANCA_IFRABA = {
  total: 78,
  components: [
    { id: "vol", max: 25, score: 22 },
    { id: "soph", max: 25, score: 20 },
    { id: "gap", max: 25, score: 20 },
    { id: "cap", max: 25, score: 16 },
  ],
  labels: (en) => ({
    vol: en ? "Fraud Volume" : "Volumen de Fraude",
    soph: en ? "Threat Sophistication" : "Sofisticación de Amenazas",
    gap: en ? "Regulatory Gap" : "Brecha Regulatoria",
    cap: en ? "Institutional Capacity" : "Capacidad Institucional",
  }),
  descs: (en) => ({
    vol: en
      ? "Measures reported fraud caseload intensity — 22/25 means CR is near saturation (10,027 cases/year, 47.3% annual growth)."
      : "Mide la intensidad de casos de fraude reportados — 22/25 significa que CR está cerca de la saturación (10,027 casos/año, crecimiento anual de 47.3%).",
    soph: en
      ? "Evaluates technical complexity of attack vectors — 20/25 reflects AI-powered threats (deepfakes, agent takeover) already active in CR."
      : "Evalúa la complejidad técnica de vectores de ataque — 20/25 refleja amenazas potenciadas por AI (deepfakes, toma de agentes) ya activas en CR.",
    gap: en
      ? "Measures distance between CR regulation and international best practices — 20/25 reflects zero AI-specific banking regulation vs EU/UK/Singapore frameworks."
      : "Mide la distancia entre la regulación de CR y mejores prácticas internacionales — 20/25 refleja cero regulación bancaria específica para AI vs marcos de EU/UK/Singapur.",
    cap: en
      ? "Assesses investigative and response infrastructure — 16/25 reflects OIJ operating at only 14% capacity (285 vs 2,028 needed investigators)."
      : "Evalúa la infraestructura de investigación y respuesta — 16/25 refleja al OIJ operando a solo 14% de capacidad (285 vs 2,028 investigadores necesarios).",
  }),
};

// ── OIJ Investigative Capacity ──
export const BANCA_OIJ = (en) => ({
  current: 285,
  needed: 2028,
  ratio: 14,
  collapse: en ? "2026-2028" : "2026-2028",
  desc: en
    ? "Using Erlang-C queuing models, the OIJ requires 2,028 specialized investigators to handle the projected fraud caseload. With only 285 currently assigned (14% capacity), mathematical collapse of the investigative pipeline is projected between 2026-2028."
    : "Usando modelos de colas Erlang-C, el OIJ requiere 2,028 investigadores especializados para manejar la carga proyectada de fraude. Con solo 285 asignados actualmente (14% de capacidad), el colapso matemático del pipeline investigativo se proyecta entre 2026-2028.",
  sensitivityNote: en
    ? "Even doubling productivity (μ=6, vs benchmark μ=3), the system only delays collapse to 2028. The result is robust under any realistic productivity assumption."
    : "Incluso duplicando la productividad (μ=6, vs benchmark μ=3), el sistema solo retrasa el colapso a 2028. El resultado es robusto bajo cualquier supuesto realista de productividad.",
});

// ── 5 International Case Studies ──
export const BANCA_CASES = (en) => [
  {
    title: "Lobstar SL",
    org: en ? "Spain — MCP Tool Poisoning" : "España — Envenenamiento de Herramienta MCP",
    stat: "$442K",
    color: "#ef4444",
    desc: en
      ? "A Spanish fintech lost $442,000 when attackers exploited MCP tool-poisoning vulnerabilities in their AI agent workflow. Malicious tool descriptions injected commands that redirected automated transfers to attacker-controlled accounts."
      : "Una fintech española perdió $442,000 cuando atacantes explotaron vulnerabilidades de envenenamiento de herramientas MCP en su flujo de agentes AI. Descripciones maliciosas de herramientas inyectaron comandos que redirigieron transferencias automatizadas."
  },
  {
    title: "Arup",
    org: en ? "UK — Deepfake CFO Video Call" : "UK — Videollamada Deepfake de CFO",
    stat: "$25.6M",
    color: "#ef4444",
    desc: en
      ? "Engineering firm Arup lost $25.6M when an employee was deceived by a deepfake video call impersonating their CFO and other executives. The AI-generated video was indistinguishable from real participants, authorizing fraudulent wire transfers."
      : "La firma de ingeniería Arup perdió $25.6M cuando un empleado fue engañado por una videollamada deepfake suplantando a su CFO y otros ejecutivos. El video generado por AI era indistinguible de participantes reales, autorizando transferencias fraudulentas."
  },
  {
    title: "MCP RCE",
    org: "CVE-2025-6514 · CVSS 9.6",
    stat: en ? "Critical" : "Crítico",
    color: "#dc2626",
    desc: en
      ? "Critical remote code execution vulnerability in the Model Context Protocol (MCP) specification. Malicious tool descriptions in agent workflows enable arbitrary code execution on host systems, compromising any AI agent using MCP-connected banking tools."
      : "Vulnerabilidad crítica de ejecución remota de código en la especificación MCP (Model Context Protocol). Descripciones maliciosas de herramientas en flujos de agentes permiten ejecución arbitraria de código, comprometiendo cualquier agente AI usando herramientas bancarias MCP."
  },
  {
    title: "A2A Auth Bypass",
    org: "CVE-2025-43563",
    stat: en ? "High" : "Alto",
    color: "#f59e0b",
    desc: en
      ? "Authentication bypass vulnerability in Google's Agent-to-Agent (A2A) protocol. Allows malicious agents to impersonate trusted agents in multi-agent financial workflows, enabling unauthorized transaction approvals and data exfiltration."
      : "Vulnerabilidad de bypass de autenticación en el protocolo Agent-to-Agent (A2A) de Google. Permite a agentes maliciosos suplantar agentes confiables en flujos financieros multi-agente, habilitando aprobaciones no autorizadas y exfiltración de datos."
  },
  {
    title: "Bob Finance P2P",
    org: en ? "Multi-Country — Synthetic Identities" : "Multi-País — Identidades Sintéticas",
    stat: en ? "At Scale" : "A Escala",
    color: "#8b5cf6",
    desc: en
      ? "Bob Finance's P2P lending platform was defrauded by AI-generated synthetic identities at industrial scale. The attackers created thousands of convincing fake profiles combining real and fabricated data to obtain loans that were never repaid."
      : "La plataforma P2P de Bob Finance fue defraudada por identidades sintéticas generadas por AI a escala industrial. Los atacantes crearon miles de perfiles falsos convincentes combinando datos reales y fabricados para obtener préstamos que nunca se pagaron."
  }
];

// ── CR Connection Cards ──
export const BANCA_CR = (en) => [
  {
    title: en ? "SINPE Network Risk" : "Riesgo Red SINPE",
    desc: en
      ? "Costa Rica's SINPE infrastructure interconnects all banks in real-time. A single compromised entry point propagates across the entire financial system — systemic risk amplified by AI-speed attacks."
      : "La infraestructura SINPE de Costa Rica interconecta todos los bancos en tiempo real. Un solo punto de entrada comprometido se propaga por todo el sistema financiero — riesgo sistémico amplificado por ataques a velocidad AI.",
    color: "#2563eb"
  },
  {
    title: en ? "Banking Liability Shift" : "Cambio de Responsabilidad Bancaria",
    desc: en
      ? "Expediente 23.908 establishes strict joint liability (responsabilidad objetiva solidaria). Banks must reimburse fraud victims unless they prove the client acted with gross negligence — reversing the burden of proof."
      : "Expediente 23.908 establece responsabilidad objetiva solidaria. Los bancos deben reembolsar a víctimas de fraude a menos que demuestren negligencia grave del cliente — invirtiendo la carga de la prueba.",
    color: "#ef4444"
  },
  {
    title: en ? "SUGEF Regulatory Gaps" : "Brechas Regulatorias SUGEF",
    desc: en
      ? "SUGEF (Costa Rica's banking superintendent) has zero AI-specific regulations. Multi-Agent Governance scores 0/100 vs UK (25), EU (30), Singapore (35). No framework exists for AI agent oversight in financial services."
      : "SUGEF (superintendencia bancaria de CR) tiene cero regulaciones específicas para AI. Gobernanza Multi-Agente: 0/100 vs UK (25), EU (30), Singapur (35). No existe marco para supervisión de agentes AI en servicios financieros.",
    color: "#f59e0b"
  },
  {
    title: en ? "Digital Inclusion Drag" : "Freno a Inclusión Digital",
    desc: en
      ? "Each fraud case reduces digital banking adoption by 15-25% (IDB estimate for LATAM). With Costa Rica's 2-3% GDP digitization dividend at risk, unchecked fraud threatens the country's digital economy growth trajectory."
      : "Cada caso de fraude reduce la adopción de banca digital un 15-25% (estimación BID para LATAM). Con el dividendo de digitalización de 2-3% del PIB en riesgo, el fraude descontrolado amenaza la trayectoria de crecimiento de la economía digital.",
    color: "#10b981"
  }
];

// ── Policy Recommendations ──
export const BANCA_RECS = (en) => [
  {
    audience: en ? "Banks" : "Bancos",
    timeline: "Q2 2026",
    color: "#ef4444",
    items: en ? [
      "Deploy behavioral biometrics and AI-powered anomaly detection on all digital channels",
      "Establish AI agent security protocols (MCP/A2A hardening, tool verification)",
      "Create dedicated AI fraud response teams with real-time monitoring capabilities",
      "Implement deepfake detection for voice and video authentication channels",
    ] : [
      "Desplegar biometría conductual y detección de anomalías con AI en todos los canales digitales",
      "Establecer protocolos de seguridad para agentes AI (endurecimiento MCP/A2A, verificación de herramientas)",
      "Crear equipos dedicados de respuesta a fraude AI con capacidades de monitoreo en tiempo real",
      "Implementar detección de deepfakes para canales de autenticación por voz y video",
    ]
  },
  {
    audience: en ? "Regulators" : "Reguladores",
    timeline: "Q2-Q3 2026",
    color: "#f59e0b",
    items: en ? [
      "SUGEF: Issue emergency guidance on AI agent use in banking (transaction limits, oversight requirements)",
      "Mandate AI incident reporting with 24-hour disclosure for systemic threats",
      "Establish AI banking security standards aligned with EU AI Act / UK DRCF frameworks",
      "Create inter-agency AI fraud task force (SUGEF + OIJ + BCCR + MICITT)",
    ] : [
      "SUGEF: Emitir guía de emergencia sobre uso de agentes AI en banca (límites, requisitos de supervisión)",
      "Mandatar reporte de incidentes AI con divulgación de 24 horas para amenazas sistémicas",
      "Establecer estándares de seguridad AI bancaria alineados con EU AI Act / UK DRCF",
      "Crear fuerza de tarea interinstitucional de fraude AI (SUGEF + OIJ + BCCR + MICITT)",
    ]
  },
  {
    audience: en ? "Legislators" : "Legisladores",
    timeline: en ? "Pre-Second Debate" : "Pre-Segundo Debate",
    color: "#8b5cf6",
    items: en ? [
      "Pass Expediente 23.908 with AI-specific provisions for agentic fraud liability",
      "Allocate emergency funding for OIJ digital fraud investigation unit (285 → 500+ investigators)",
      "Establish legal framework for AI agent accountability in financial services",
      "Create AI banking fraud insurance mandate for financial institutions",
    ] : [
      "Aprobar Expediente 23.908 con provisiones específicas para responsabilidad de fraude por agentes AI",
      "Asignar fondos de emergencia para unidad de investigación de fraude digital del OIJ (285 → 500+ investigadores)",
      "Establecer marco legal para responsabilidad de agentes AI en servicios financieros",
      "Crear mandato de seguro contra fraude bancario AI para instituciones financieras",
    ]
  }
];

// ── Key Statistics (for stat grid) ──
export const BANCA_STATS = (en) => [
  { value: "10,027", label: en ? "Families affected 2025" : "Familias afectadas 2025", color: "#ef4444" },
  { value: "₡6,000MM", label: en ? "Direct losses 2025 (₡ millions)" : "Pérdidas directas 2025 (₡ millones)", color: "#f59e0b" },
  { value: "668%", label: en ? "Growth 2020-2024" : "Crecimiento 2020-2024", color: "#ef4444" },
  { value: "47.3%", label: en ? "Annual CAGR" : "CAGR anual", color: "#f59e0b" },
  { value: "78/100", label: "IFRABA", color: "#dc2626" },
  { value: "Exp. 23.908", label: en ? "Reversed burden of proof" : "Inversión carga de la prueba", color: "#8b5cf6" },
];

// ── PYME Stress Test ──
export const BANCA_PYME = (en) => ({
  scenario: en ? "1% PYME portfolio compromise" : "1% de compromiso de cartera PYME",
  directCost: "₡13,500MM",
  cascadeDesc: en
    ? "A 1% compromise of the national PYME loan portfolio triggers ₡13,500MM in real costs through cascading defaults, increased provisioning requirements, credit line freezes, and reduced lending capacity. This represents a systemic shock to CR's small business ecosystem."
    : "Un compromiso del 1% de la cartera nacional de préstamos PYME desencadena ₡13,500MM en costos reales a través de impagos en cascada, mayores requisitos de provisión, congelamiento de líneas de crédito y reducción de capacidad de préstamo. Representa un choque sistémico al ecosistema de pequeñas empresas de CR.",
  oijShock: en
    ? "~1,400 simultaneous fraud complaints = ~2 months of normal OIJ caseload in a single day."
    : "~1,400 denuncias de fraude simultáneas = ~2 meses de carga normal del OIJ en un solo día.",
});

// ── Legal Defense Analysis (Exp. 23.908 + AI Agents) ──
export const BANCA_LEGAL_DEFENSE = (en) => [
  { defense: en ? "Self-scam (auto-estafa)?" : "¿Auto-estafa?",
    applies: en ? "PROB. NO" : "PROB. NO",
    reason: en ? "Victim of external attacker, not self-harm" : "Víctima de atacante externo, no autolesión",
    color: "#ef4444" },
  { defense: en ? "Client intent (dolo)?" : "¿Dolo del cliente?",
    applies: en ? "PROB. NO" : "PROB. NO",
    reason: en ? "No malicious intent by account holder" : "Sin intención maliciosa del titular",
    color: "#ef4444" },
  { defense: en ? "Family transfer?" : "¿Transferencia familiar?",
    applies: en ? "N/A" : "N/A",
    reason: en ? "Transfer to unknown third party" : "Transferencia a tercero desconocido",
    color: "#ef4444" },
  { defense: en ? "Gross negligence (culpa grave)?" : "¿Culpa grave?",
    applies: en ? "EXCLUDED" : "EXCLUIDA",
    reason: en ? "Not listed as exception in the bill" : "No incluida como excepción en el proyecto",
    color: "#ef4444" },
];

// ── CISO Immediate Controls Checklist ──
export const BANCA_CISO = (en) => [
  en ? "Inventory all API/MCP connections from AI agents to banking systems."
     : "Inventariar todas las conexiones API/MCP de agentes AI a sistemas bancarios.",
  en ? "Implement transaction limits and restrictive scopes for authorized AI agents."
     : "Implementar límites de transacción y scopes restrictivos para agentes AI autorizados.",
  en ? "Activate mandatory MFA for financial operations initiated by AI agents."
     : "Activar MFA obligatorio para operaciones financieras iniciadas por agentes AI.",
  en ? "Log AI-originated transactions in separate audit trails."
     : "Registrar transacciones originadas por AI en logs separados de auditoría.",
  en ? "Establish kill switch: revoke compromised agents in <30 minutes."
     : "Establecer kill switch: revocar agentes comprometidos en <30 minutos.",
  en ? "Audit CVE-2025-6514 (CVSS 9.6) and known MCP/A2A vulnerabilities."
     : "Auditar CVE-2025-6514 (CVSS 9.6) y vulnerabilidades MCP/A2A conocidas.",
  en ? "Report AI incidents to SUGEF within 24h (anticipatory best practice)."
     : "Reportar incidentes AI a SUGEF dentro de 24h (buena práctica anticipatoria).",
];

// ── Board Decision Cards ──
export const BANCA_DECISIONS = (en) => [
  { num: 1,
    title: en ? "Fraud Operations Budget 2026-2027" : "Presupuesto Fraud Operations 2026-2027",
    desc: en
      ? "Approve budget for 35-70 fraud analysts (mixed scenario), including digital forensics capacity for AI cases. Additional OPEX: $5.2-$10.4M."
      : "Aprobar presupuesto para 35-70 analistas de fraude (escenario mixto), incluyendo capacidad forense digital para casos AI. OPEX adicional: $5.2-$10.4M.",
    deadline: "Q2 2026", owner: "CFO/CRO", color: "#ef4444" },
  { num: 2,
    title: en ? "Know-Your-Agent (KYA) Protocol" : "Protocolo Know-Your-Agent (KYA)",
    desc: en
      ? "Mandate development of AI agent registration, authorization, limits, and revocation protocol. Includes MFA, logs, scopes, alerts, and kill switch."
      : "Mandatar desarrollo de protocolo de registro, autorización, límites y revocación de agentes AI. Incluye MFA, logs, scopes, alertas y kill switch.",
    deadline: "Q2 2026", owner: "CISO/CTO", color: "#f59e0b" },
  { num: 3,
    title: en ? "Operational Stress Test" : "Stress Test Operacional",
    desc: en
      ? "Execute simulation of 15,000+ simultaneous claims (coordinated PYME scenario). Validate response times, forensic capacity, and escalation protocols."
      : "Ejecutar simulación de 15,000+ reclamos simultáneos (escenario PYME coordinado). Validar tiempos de respuesta, capacidad forense y protocolos de escalamiento.",
    deadline: "Q2-Q3 2026", owner: en ? "Dir. Operations" : "Dir. Operaciones", color: "#2563eb" },
];

// ── Cost Per Case Breakdown ──
export const BANCA_COST_UNIT = (en) => [
  { type: en ? "Simple case (standard process)" : "Caso simple (proceso estándar)",
    cost: "~$350", pct: "80-85%", source: "ACFE LATAM", color: "#10b981" },
  { type: en ? "Complex case (AI/forensics)" : "Caso complejo (AI/forense)",
    cost: "$2,500-5,000", pct: "15-20%", source: en ? "Colibrii estimate" : "Estimación Colibrii", color: "#f59e0b" },
  { type: en ? "Formal litigation" : "Litigio formal",
    cost: "$8,000-15,000", pct: "5-10%", source: en ? "Regional benchmark" : "Benchmark regional", color: "#ef4444" },
];

// ── Bank Fraud Ops Headcount (mirror Erlang-C) ──
export const BANCA_FRAUD_OPS = (en) => ({
  note: en
    ? "Target: ρ ≤ 0.85 (industry standard for viable SLA). Formula: c = λ/(μ × 0.85)."
    : "Target: ρ ≤ 0.85 (estándar de la industria para SLA viable). Fórmula: c = λ/(μ × 0.85).",
  scenarios: [
    { type: en ? "Simple cases" : "Casos simples", mu: 20, a2026: "~73", a2027: "~107", color: "#10b981" },
    { type: en ? "Mixed (base)" : "Mixto (base)", mu: 10, a2026: "~145", a2027: "~213", color: "#f59e0b" },
    { type: en ? "Complex AI/forensics" : "Complejo AI/forense", mu: 5, a2026: "~289", a2027: "~426", color: "#ef4444" },
  ],
});

// ── Fraud Typology Breakdown ──
export const BANCA_TYPOLOGY = (en) => [
  { type: en ? "Account Takeover (ATO)" : "Toma de Cuenta (ATO)", share: 35, cases2025: 3509, growth: "+52%", color: "#ef4444", desc: en ? "Unauthorized access to existing bank accounts via credential stuffing, SIM swap, or social engineering." : "Acceso no autorizado a cuentas existentes vía relleno de credenciales, SIM swap o ingeniería social." },
  { type: en ? "Authorized Push Payment (APP)" : "Pago Push Autorizado (APP)", share: 25, cases2025: 2507, growth: "+78%", color: "#f59e0b", desc: en ? "Victims tricked into authorizing transfers. SINPE Móvil makes this frictionless in CR." : "Víctimas engañadas para autorizar transferencias. SINPE Móvil hace esto sin fricción en CR." },
  { type: en ? "Synthetic Identity" : "Identidad Sintética", share: 15, cases2025: 1504, growth: "+120%", color: "#8b5cf6", desc: en ? "AI-generated fake identities combining real/fake data to open accounts and obtain credit." : "Identidades falsas generadas por AI combinando datos reales/falsos para abrir cuentas y obtener crédito." },
  { type: en ? "Card Fraud (CNP)" : "Fraude de Tarjeta (CNP)", share: 12, cases2025: 1203, growth: "+15%", color: "#3b82f6", desc: en ? "Card-not-present fraud in e-commerce. Declining share as biometrics improve, but volume still rises." : "Fraude sin tarjeta presente en e-commerce. Participación baja pero volumen aún crece." },
  { type: en ? "Deepfake Authentication" : "Autenticación Deepfake", share: 8, cases2025: 802, growth: "+1,265%", color: "#ef4444", desc: en ? "Voice/video deepfakes bypass biometric authentication. Cost: $10 per clone. Fastest-growing vector." : "Deepfakes de voz/video eluden autenticación biométrica. Costo: $10 por clon. Vector de mayor crecimiento." },
  { type: en ? "Other (Phishing, Malware)" : "Otro (Phishing, Malware)", share: 5, cases2025: 502, growth: "+25%", color: "#64748b", desc: en ? "Traditional phishing, banking trojans, and social engineering. Being displaced by AI-powered methods." : "Phishing tradicional, troyanos bancarios e ingeniería social. Siendo desplazados por métodos con AI." },
];

// ── API/Open Banking Security Risks ──
export const BANCA_API_RISKS = (en) => [
  { risk: en ? "Broken Object Level Authorization" : "Autorización de Nivel de Objeto Rota", owasp: "API1:2023", severity: en ? "Critical" : "Crítico", desc: en ? "Attacker manipulates account IDs in API calls to access other users' accounts." : "Atacante manipula IDs de cuenta en llamadas API para acceder a cuentas ajenas.", color: "#ef4444" },
  { risk: en ? "Broken Authentication" : "Autenticación Rota", owasp: "API2:2023", severity: en ? "Critical" : "Crítico", desc: en ? "Weak token validation, credential stuffing, JWT bypass." : "Validación débil de tokens, relleno de credenciales, bypass JWT.", color: "#ef4444" },
  { risk: en ? "Unrestricted Resource Consumption" : "Consumo de Recursos Sin Restricción", owasp: "API4:2023", severity: en ? "High" : "Alto", desc: en ? "API rate limiting absent — enables brute force and DDoS." : "Sin limitación de tasa API — habilita fuerza bruta y DDoS.", color: "#f59e0b" },
  { risk: en ? "Server-Side Request Forgery" : "Falsificación de Solicitud del Lado del Servidor", owasp: "API7:2023", severity: en ? "High" : "Alto", desc: en ? "Manipulate API to make requests to internal bank systems." : "Manipular API para hacer solicitudes a sistemas bancarios internos.", color: "#f59e0b" },
  { risk: en ? "Model Inversion Attack" : "Ataque de Inversión de Modelo", owasp: en ? "AI-specific" : "Específico AI", severity: en ? "High" : "Alto", desc: en ? "Extract training data (customer info) from fraud detection model by querying it systematically." : "Extraer datos de entrenamiento (info de clientes) del modelo de detección de fraude consultándolo sistemáticamente.", color: "#f59e0b" },
  { risk: en ? "Training Data Poisoning" : "Envenenamiento de Datos de Entrenamiento", owasp: en ? "AI-specific" : "Específico AI", severity: en ? "Critical" : "Crítico", desc: en ? "Inject malicious transactions to corrupt fraud detection model — legitimate fraud passes undetected." : "Inyectar transacciones maliciosas para corromper modelo de detección — fraude legítimo pasa sin detectar.", color: "#ef4444" },
];

// ── Regional Banking AI Comparison ──
export const BANCA_REGIONAL = (en) => [
  { dim: en ? "AI Banking Regulation" : "Regulación AI Bancaria", cr: en ? "None specific" : "Ninguna específica", pa: en ? "Basic" : "Básica", cl: en ? "Fintech Law 2023" : "Ley Fintech 2023", mx: en ? "Fintech Law 2018" : "Ley Fintech 2018", crScore: 5, paScore: 20, clScore: 55, mxScore: 60 },
  { dim: en ? "Open Banking" : "Open Banking", cr: en ? "Planning" : "Planificación", pa: en ? "Limited" : "Limitado", cl: en ? "Mandatory 2025" : "Obligatorio 2025", mx: en ? "Mandatory 2021" : "Obligatorio 2021", crScore: 10, paScore: 15, clScore: 65, mxScore: 70 },
  { dim: en ? "Digital Fraud Rate" : "Tasa Fraude Digital", cr: "668%↑", pa: "~200%↑", cl: "~150%↑", mx: "~300%↑", crScore: 10, paScore: 40, clScore: 55, mxScore: 30 },
  { dim: en ? "Biometric Auth Adoption" : "Adopción Auth Biométrica", cr: en ? "Low (<15%)" : "Baja (<15%)", pa: en ? "Medium" : "Media", cl: en ? "High (>50%)" : "Alta (>50%)", mx: en ? "Medium-High" : "Media-Alta", crScore: 15, paScore: 40, clScore: 65, mxScore: 55 },
  { dim: en ? "Breach Reporting" : "Reporte de Brechas", cr: en ? "Voluntary" : "Voluntario", pa: en ? "Voluntary" : "Voluntario", cl: en ? "Mandatory" : "Obligatorio", mx: en ? "Mandatory (CNBV)" : "Obligatorio (CNBV)", crScore: 10, paScore: 10, clScore: 60, mxScore: 55 },
];

// ── Cost-Benefit of AI Defense ──
export const BANCA_DEFENSE_COSTS = (en) => [
  { defense: en ? "Behavioral Biometrics" : "Biometría Conductual", cost: en ? "$50-150K/year" : "$50-150K/año", fraudPrevented: "25-35%", roi: "3-5x", timeframe: en ? "3-6 months" : "3-6 meses", color: "#10b981" },
  { defense: en ? "Liveness Detection" : "Detección de Presencia", cost: en ? "$30-80K/year" : "$30-80K/año", fraudPrevented: "15-25%", roi: "4-8x", timeframe: en ? "1-3 months" : "1-3 meses", color: "#10b981" },
  { defense: en ? "AI-Powered AML" : "AML con AI", cost: en ? "$200-500K/year" : "$200-500K/año", fraudPrevented: "40-60%", roi: "5-10x", timeframe: en ? "6-12 months" : "6-12 meses", color: "#3b82f6" },
  { defense: en ? "Real-time Transaction Monitoring" : "Monitoreo de Transacciones en Tiempo Real", cost: en ? "$100-300K/year" : "$100-300K/año", fraudPrevented: "30-50%", roi: "4-7x", timeframe: en ? "3-6 months" : "3-6 meses", color: "#3b82f6" },
  { defense: en ? "Network Graph Analysis" : "Análisis de Grafos de Red", cost: en ? "$150-400K/year" : "$150-400K/año", fraudPrevented: "20-35%", roi: "3-6x", timeframe: en ? "6-9 months" : "6-9 meses", color: "#f59e0b" },
];

// ── Sources ──
export const BANCA_SOURCES = "OIJ (Organismo de Investigación Judicial) 2020-2025, SUGEF, BCCR, LexisNexis True Cost of Fraud 2024, Deloitte AI in Financial Services 2025, WEF Global Risks Report 2025, OWASP AI Security 2025, Sumsub Identity Fraud Report 2025, GAFILAT Mutual Evaluation CR, IDB Digital Economy LATAM 2025, Anthropic MCP Specification, Google A2A Protocol Specification, ACFE Report to the Nations LATAM 2024";
