/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Health AI Data Constants
   Risk register, PII matrix, breach data, CCSS HIVE case study,
   mitigation protocols, governance radar, compliance mapping
   Sources: WHO, HHS, IBM, Nature Medicine, CCSS, ITU, OECD
   ═══════════════════════════════════════════════════════════════ */

// ── Health AI Risk Register (12 failure modes) ──
// Each risk: severity (1-10), likelihood (1-10), category
export const HEALTH_RISKS = (en) => [
  { id: 1, name: en ? "Diagnostic False Negatives" : "Falsos Negativos Diagnósticos", severity: 10, likelihood: 7, cat: en ? "Accuracy" : "Precisión", desc: en ? "AI misses cancer/disease → delayed treatment → death. Skin cancer AI 30% less accurate on dark skin (Adamson & Smith, Nature Medicine 2018)" : "AI falla en detectar cáncer/enfermedad → tratamiento tardío → muerte. AI dermatológica 30% menos precisa en piel oscura (Adamson & Smith, 2018)", color: "#ef4444" },
  { id: 2, name: en ? "Patient Data Breach" : "Brecha de Datos de Pacientes", severity: 9, likelihood: 8, cat: en ? "Privacy" : "Privacidad", desc: en ? "Health records exposed. Avg healthcare breach cost: $10.93M (IBM 2024). 700+ breaches/year in US alone. CR had CCSS HIVE attack (2022)" : "Expedientes médicos expuestos. Costo promedio brecha salud: $10.93M (IBM 2024). 700+ brechas/año solo en EE.UU. CR tuvo ataque HIVE a CCSS (2022)", color: "#ef4444" },
  { id: 3, name: en ? "Algorithmic Bias" : "Sesgo Algorítmico", severity: 9, likelihood: 8, cat: en ? "Fairness" : "Equidad", desc: en ? "AI trained on non-representative data produces systematically worse outcomes for minorities. Pulse oximeters overestimate O₂ in dark-skinned patients by 3-4%" : "AI entrenada con datos no representativos produce resultados sistemáticamente peores para minorías. Oxímetros sobreestiman O₂ en piel oscura por 3-4%", color: "#ef4444" },
  { id: 4, name: en ? "Model Drift" : "Deriva de Modelo", severity: 8, likelihood: 9, cat: en ? "Reliability" : "Confiabilidad", desc: en ? "AI accuracy degrades 10-15% annually without retraining (Nestor et al., 2019). COVID-19 made pre-pandemic models obsolete overnight" : "Precisión AI degrada 10-15% anual sin reentrenamiento (Nestor et al., 2019). COVID-19 hizo obsoletos modelos pre-pandemia de un día para otro", color: "#f59e0b" },
  { id: 5, name: en ? "Ransomware on Health Systems" : "Ransomware en Sistemas de Salud", severity: 10, likelihood: 7, cat: en ? "Security" : "Seguridad", desc: en ? "CCSS HIVE attack (2022): 30,000+ appointments cancelled, weeks of manual operations. Universal Health Fund at risk" : "Ataque HIVE a CCSS (2022): 30,000+ citas canceladas, semanas de operaciones manuales. Fondo de Salud Universal en riesgo", color: "#ef4444" },
  { id: 6, name: en ? "Liability Gap" : "Vacío de Responsabilidad", severity: 8, likelihood: 10, cat: en ? "Legal" : "Legal", desc: en ? "When AI misdiagnoses: who is liable? The developer, hospital, or physician? CR has ZERO framework for AI medical liability" : "Cuando AI diagnostica mal: ¿quién responde? ¿El desarrollador, hospital o médico? CR tiene CERO marco de responsabilidad AI médica", color: "#f59e0b" },
  { id: 7, name: en ? "Deepfake Medical Records" : "Deepfake de Expedientes Médicos", severity: 7, likelihood: 5, cat: en ? "Emerging" : "Emergente", desc: en ? "AI-generated fake medical images or records for insurance fraud or identity theft. Emerging threat with no detection framework" : "Imágenes médicas o expedientes falsos generados por AI para fraude de seguros o robo de identidad. Amenaza emergente sin marco de detección", color: "#f59e0b" },
  { id: 8, name: en ? "Adversarial Attacks on Diagnostic AI" : "Ataques Adversarios a AI Diagnóstica", severity: 8, likelihood: 5, cat: en ? "Security" : "Seguridad", desc: en ? "Imperceptible pixel modifications to medical images cause AI to misclassify. Benign lesion classified as malignant, or vice versa" : "Modificaciones imperceptibles de píxeles en imágenes médicas causan clasificación errónea de AI. Lesión benigna clasificada como maligna, o viceversa", color: "#f59e0b" },
  { id: 9, name: en ? "Data Quality in EDUS" : "Calidad de Datos en EDUS", severity: 7, likelihood: 8, cat: en ? "Data" : "Datos", desc: en ? "EDUS has 8+ years of health records but data quality varies: incomplete fields, inconsistent coding, manual entry errors reduce AI training effectiveness" : "EDUS tiene 8+ años de registros pero la calidad varía: campos incompletos, codificación inconsistente, errores de entrada manual reducen efectividad de entrenamiento AI", color: "#f59e0b" },
  { id: 10, name: en ? "Consent & Transparency" : "Consentimiento y Transparencia", severity: 7, likelihood: 9, cat: en ? "Ethics" : "Ética", desc: en ? "Patients rarely informed when AI assists their diagnosis. No consent framework for AI-processed health data in CR" : "Pacientes raramente informados cuando AI asiste su diagnóstico. Sin marco de consentimiento para datos de salud procesados por AI en CR", color: "#f59e0b" },
  { id: 11, name: en ? "Automation Complacency" : "Complacencia por Automatización", severity: 7, likelihood: 7, cat: en ? "Human Factors" : "Factor Humano", desc: en ? "Physicians over-trust AI recommendations, reducing critical evaluation. 'Alert fatigue' when AI flags too many false positives" : "Médicos confían excesivamente en recomendaciones AI, reduciendo evaluación crítica. 'Fatiga de alertas' cuando AI genera muchos falsos positivos", color: "#f59e0b" },
  { id: 12, name: en ? "Vendor Lock-in" : "Dependencia de Proveedor", severity: 6, likelihood: 8, cat: en ? "Strategy" : "Estrategia", desc: en ? "Proprietary AI systems create dependency: data formats, integration APIs, pricing leverage. CCSS could lose negotiating power" : "Sistemas AI propietarios crean dependencia: formatos de datos, APIs de integración, apalancamiento de precios. CCSS podría perder poder de negociación", color: "#3b82f6" },
];

// ── PII Exposure Matrix (data types × systems × protection) ──
export const HEALTH_PII_MATRIX = (en) => [
  { type: en ? "Medical diagnoses" : "Diagnósticos médicos", system: "EDUS/CCSS", sensitivity: en ? "Critical" : "Crítico", currentProtection: en ? "Basic access control" : "Control de acceso básico", gap: en ? "No encryption at rest, no audit trail" : "Sin cifrado en reposo, sin auditoría" },
  { type: en ? "Prescriptions" : "Recetas médicas", system: "EDUS/CCSS + Farmacias", sensitivity: en ? "High" : "Alto", currentProtection: en ? "Shared database" : "Base de datos compartida", gap: en ? "Pharmacies access full patient history" : "Farmacias acceden a historial completo" },
  { type: en ? "Lab results" : "Resultados de laboratorio", system: "Labs + CCSS", sensitivity: en ? "High" : "Alto", currentProtection: en ? "Varies by lab" : "Varía por laboratorio", gap: en ? "Private labs have weaker controls" : "Labs privados con controles más débiles" },
  { type: en ? "Medical images" : "Imágenes médicas", system: "PACS/CCSS", sensitivity: en ? "High" : "Alto", currentProtection: en ? "Hospital PACS" : "PACS hospitalario", gap: en ? "DICOM metadata contains patient PII" : "Metadatos DICOM contienen PII del paciente" },
  { type: en ? "Genomic data" : "Datos genómicos", system: en ? "Research labs" : "Labs de investigación", sensitivity: en ? "Critical" : "Crítico", currentProtection: en ? "Minimal" : "Mínimo", gap: en ? "Uniquely identifying, irreversible exposure" : "Identificable únicamente, exposición irreversible" },
  { type: en ? "Mental health records" : "Registros de salud mental", system: "CCSS/Private", sensitivity: en ? "Critical" : "Crítico", currentProtection: en ? "Same as general records" : "Igual que registros generales", gap: en ? "No special protections (unlike HIPAA)" : "Sin protecciones especiales (a diferencia de HIPAA)" },
];

// ── Healthcare Breach Statistics (HHS data as proxy) ──
export const HEALTH_BREACH_TS = [
  { year: 2018, breaches: 365, records: 13.2, cost: 7.91 },
  { year: 2019, breaches: 510, records: 41.2, cost: 8.60 },
  { year: 2020, breaches: 642, records: 26.4, cost: 9.23 },
  { year: 2021, breaches: 714, records: 45.9, cost: 9.42 },
  { year: 2022, breaches: 720, records: 51.9, cost: 10.10 },
  { year: 2023, breaches: 747, records: 133.1, cost: 10.93 },
  { year: 2024, breaches: 725, records: 168.0, cost: 11.20 },
];
// records: millions of records exposed. cost: avg cost per breach in $M (IBM)

// ── CCSS HIVE Ransomware Case Study (2022) ──
export const CCSS_HIVE_CASE = (en) => ({
  date: en ? "May 31, 2022" : "31 de mayo, 2022",
  attacker: "Hive Ransomware Group",
  impact: [
    { metric: en ? "Appointments cancelled" : "Citas canceladas", value: "30,000+", icon: "📅" },
    { metric: en ? "Days of manual operations" : "Días de operaciones manuales", value: "~60", icon: "📋" },
    { metric: en ? "Estimated cost" : "Costo estimado", value: en ? "$10-15M+" : "₡5,000-7,500MM+", icon: "💰" },
    { metric: en ? "Patient records at risk" : "Expedientes en riesgo", value: "5M+", icon: "🏥" },
  ],
  timeline: (en) => [
    { phase: en ? "May 31: Attack detected" : "31 May: Ataque detectado", desc: en ? "CCSS systems encrypted by Hive group. EDUS, SICERE, payroll systems locked." : "Sistemas CCSS cifrados por grupo Hive. EDUS, SICERE, sistemas de planilla bloqueados." },
    { phase: en ? "June 1-7: Manual operations" : "1-7 Jun: Operaciones manuales", desc: en ? "Hospitals revert to paper records. Prescriptions handwritten. Lab results delayed." : "Hospitales regresan a registros de papel. Recetas escritas a mano. Resultados de laboratorio retrasados." },
    { phase: en ? "June-July: Gradual recovery" : "Jun-Jul: Recuperación gradual", desc: en ? "Systems slowly restored. Some data integrity issues discovered. Full recovery took months." : "Sistemas restaurados gradualmente. Problemas de integridad de datos descubiertos. Recuperación completa tomó meses." },
    { phase: en ? "2023-2024: Aftermath" : "2023-2024: Consecuencias", desc: en ? "Public audit revealed infrastructure vulnerabilities. Budget allocated for cybersecurity improvements. Status of implementation: partially unknown." : "Auditoría pública reveló vulnerabilidades de infraestructura. Presupuesto asignado para mejoras. Estado de implementación: parcialmente desconocido." },
  ],
  lessons: en
    ? "The HIVE attack exposed that CCSS had: no network segmentation, outdated patches, inadequate backup strategy, no incident response plan. Any AI deployment on this infrastructure faces the same vulnerabilities."
    : "El ataque HIVE expuso que CCSS tenía: sin segmentación de red, parches desactualizados, estrategia de respaldo inadecuada, sin plan de respuesta a incidentes. Todo despliegue AI en esta infraestructura enfrenta las mismas vulnerabilidades."
});

// ── Governance Maturity Radar (6 dimensions, 3 comparators) ──
export const HEALTH_GOVERNANCE = (en) => [
  { dim: en ? "Regulation" : "Regulación", cr: 0.10, sg: 0.85, eu: 0.90, fullMark: 1 },
  { dim: en ? "Data Protection" : "Protección de Datos", cr: 0.15, sg: 0.80, eu: 0.95, fullMark: 1 },
  { dim: en ? "Clinical Validation" : "Validación Clínica", cr: 0.20, sg: 0.75, eu: 0.85, fullMark: 1 },
  { dim: en ? "Breach Reporting" : "Reporte de Brechas", cr: 0.05, sg: 0.70, eu: 0.90, fullMark: 1 },
  { dim: en ? "AI Liability" : "Responsabilidad AI", cr: 0.00, sg: 0.65, eu: 0.80, fullMark: 1 },
  { dim: en ? "Consent Framework" : "Marco de Consentimiento", cr: 0.10, sg: 0.75, eu: 0.90, fullMark: 1 },
];

// ── Compliance Comparison Table ──
export const HEALTH_COMPLIANCE = (en) => [
  { dim: en ? "Health Data Law" : "Ley de Datos de Salud", cr: en ? "None specific" : "Ninguna específica", us: "HIPAA (1996)", eu: "GDPR + MDR", sg: "PDPA + HCSA", crScore: 0, usScore: 70, euScore: 90, sgScore: 80 },
  { dim: en ? "AI Medical Device Regulation" : "Regulación Dispositivo Médico AI", cr: en ? "None" : "Ninguna", us: "FDA SaMD (2017)", eu: "EU MDR + AI Act", sg: "HSA AI guidelines", crScore: 0, usScore: 75, euScore: 85, sgScore: 75 },
  { dim: en ? "Mandatory Breach Reporting" : "Reporte Obligatorio de Brechas", cr: en ? "No" : "No", us: en ? "Yes (60 days)" : "Sí (60 días)", eu: en ? "Yes (72 hours)" : "Sí (72 horas)", sg: en ? "Yes (3 days)" : "Sí (3 días)", crScore: 0, usScore: 65, euScore: 90, sgScore: 80 },
  { dim: en ? "AI Liability Framework" : "Marco de Responsabilidad AI", cr: en ? "None" : "Ninguno", us: en ? "Evolving (state level)" : "En evolución (nivel estatal)", eu: "AI Liability Directive", sg: en ? "Model AI Gov. Framework" : "Marco Modelo Gov. AI", crScore: 0, usScore: 40, euScore: 75, sgScore: 65 },
  { dim: en ? "Algorithmic Audit Requirement" : "Requisito de Auditoría Algorítmica", cr: en ? "None" : "Ninguno", us: en ? "Voluntary (NYC local)" : "Voluntario (NYC local)", eu: en ? "Mandatory (high-risk)" : "Obligatorio (alto riesgo)", sg: en ? "Voluntary" : "Voluntario", crScore: 0, usScore: 30, euScore: 80, sgScore: 50 },
];

// ── Mitigation Protocols ──
export const HEALTH_MITIGATIONS = (en) => [
  { title: en ? "Federated Learning" : "Aprendizaje Federado", desc: en ? "Train AI across CCSS hospitals without centralizing sensitive data. Each hospital trains locally, shares only model weight updates. Privacy preserved, AI improves globally." : "Entrenar AI entre hospitales CCSS sin centralizar datos sensibles. Cada hospital entrena localmente, comparte solo actualizaciones de pesos del modelo. Privacidad preservada, AI mejora globalmente.", icon: "🔒", applicability: en ? "High — CCSS has 29 hospitals, 10 clinics" : "Alta — CCSS tiene 29 hospitales, 10 clínicas" },
  { title: en ? "Differential Privacy" : "Privacidad Diferencial", desc: en ? "Add calibrated noise to health analytics so no individual patient can be identified in aggregate reports. Mathematical guarantee of privacy." : "Agregar ruido calibrado a analítica de salud para que ningún paciente individual pueda ser identificado en reportes agregados. Garantía matemática de privacidad.", icon: "📊", applicability: en ? "Medium — requires statistical expertise" : "Media — requiere experiencia estadística" },
  { title: en ? "Encryption at Rest & in Transit" : "Cifrado en Reposo y en Tránsito", desc: en ? "AES-256 for stored records, TLS 1.3 for transmission. EDUS currently has basic access control but lacks encryption at rest for many data stores." : "AES-256 para registros almacenados, TLS 1.3 para transmisión. EDUS actualmente tiene control de acceso básico pero carece de cifrado en reposo para muchos almacenes.", icon: "🔐", applicability: en ? "Critical — baseline requirement" : "Crítico — requisito base" },
  { title: en ? "Role-Based Access Control (RBAC)" : "Control de Acceso por Roles (RBAC)", desc: en ? "Cardiologist sees cardiac data, not psychiatric records. Granular access based on role, department, and clinical need. Audit trail for every access." : "Cardiólogo ve datos cardíacos, no registros psiquiátricos. Acceso granular por rol, departamento y necesidad clínica. Auditoría de cada acceso.", icon: "👤", applicability: en ? "High — EDUS needs role granularity" : "Alta — EDUS necesita granularidad de roles" },
  { title: en ? "AI Model Validation Gates" : "Puertas de Validación de Modelos AI", desc: en ? "Three-stage validation: pre-deployment (accuracy benchmarks), post-deployment (30-day monitoring), continuous (monthly drift detection). No model enters production without passing all gates." : "Validación en tres etapas: pre-despliegue (benchmarks de precisión), post-despliegue (monitoreo 30 días), continua (detección de deriva mensual). Ningún modelo entra a producción sin pasar todas las puertas.", icon: "✅", applicability: en ? "Essential for any health AI" : "Esencial para cualquier AI de salud" },
  { title: en ? "Audit Trail & Explainability" : "Auditoría y Explicabilidad", desc: en ? "Every AI-assisted decision logged: input data, model version, output, confidence score, physician action. Required for liability, quality improvement, and patient safety." : "Cada decisión asistida por AI registrada: datos de entrada, versión del modelo, salida, puntaje de confianza, acción del médico. Requerido para responsabilidad y seguridad.", icon: "📝", applicability: en ? "Critical — regulatory expectation" : "Crítico — expectativa regulatoria" },
];

// ── Health AI Market Stats ──
export const HEALTH_STATS = (en) => [
  { v: "$504B", l: en ? "AI Health Market 2032" : "Mercado AI Salud 2032", s: en ? "From $29B in 2024 (17x)" : "Desde $29B en 2024 (17x)", c: "var(--pink)", ic: "coins" },
  { v: "94%", l: en ? "Orgs Using AI" : "Orgs Usando AI", s: en ? "Healthcare organizations centrally" : "Organizaciones de salud centralmente", c: "var(--cyan)", ic: "chart" },
  { v: "97%", l: en ? "Breast Cancer Detection" : "Detección Cáncer Mama", s: en ? "AI-assisted ultrasound accuracy" : "Precisión ultrasonido asistido AI", c: "var(--green)", ic: "target" },
  { v: "$10.93M", l: en ? "Avg Breach Cost" : "Costo Promedio Brecha", s: en ? "Healthcare sector (IBM 2024)" : "Sector salud (IBM 2024)", c: "var(--red)", ic: "shield" },
  { v: "0", l: en ? "CR Health AI Regulations" : "Regulaciones AI Salud CR", s: en ? "Zero specific health data laws" : "Cero leyes específicas de datos salud", c: "var(--amber)", ic: "law" },
];

// ═══════════════════════════════════════════════════════════════
// NEW: International Frameworks for Health AI Governance
// Sources: OECD, WHO, European Commission, AHA, CSIC
// ═══════════════════════════════════════════════════════════════

export const HEALTH_INTL_FRAMEWORKS = (en) => [
  {
    id: "oecd",
    name: en ? "OECD AI Principles" : "Principios de IA de la OCDE",
    org: "OECD",
    relevance: en ? "Costa Rica is an OECD member — these principles are binding commitments" : "Costa Rica es miembro de la OCDE — estos principios son compromisos vinculantes",
    desc: en
      ? "Five principles: inclusive growth, human-centred values, transparency, robustness & security, accountability. The OECD AI Policy Observatory monitors national implementation. As a member, CR must align health AI policies with these principles."
      : "Cinco principios: crecimiento inclusivo, valores centrados en el ser humano, transparencia, robustez y seguridad, rendición de cuentas. El Observatorio de Políticas AI de la OCDE monitorea la implementación nacional. Como miembro, CR debe alinear políticas de AI en salud con estos principios.",
    status: en ? "Binding for CR" : "Vinculante para CR",
    color: "#2563eb",
    link: "https://oecd.ai/en/ai-principles"
  },
  {
    id: "who",
    name: en ? "WHO Ethics & Governance for AI in Health" : "OMS Ética y Gobernanza de IA en Salud",
    org: en ? "World Health Organization" : "Organización Mundial de la Salud",
    relevance: en ? "Global standard for responsible health AI — covers all WHO member states" : "Estándar global para AI responsable en salud — cubre todos los estados miembros de la OMS",
    desc: en
      ? "Six guiding principles: protect autonomy, promote well-being & safety, ensure transparency & explainability, foster responsibility & accountability, ensure inclusiveness & equity, promote responsive & sustainable AI. WHO published guidance on large multimodal models in health (2024) and regulatory considerations for AI medical devices."
      : "Seis principios guía: proteger la autonomía, promover bienestar y seguridad, asegurar transparencia y explicabilidad, fomentar responsabilidad y rendición de cuentas, garantizar inclusividad y equidad, promover AI responsable y sostenible. La OMS publicó guía sobre modelos multimodales grandes en salud (2024) y consideraciones regulatorias para dispositivos médicos AI.",
    status: en ? "WHO Guidance" : "Guía OMS",
    color: "#0ea5e9",
    link: "https://www.who.int/publications/i/item/9789240029200"
  },
  {
    id: "ehds",
    name: en ? "European Health Data Space (EHDS)" : "Espacio Europeo de Datos de Salud (EHDS)",
    org: en ? "European Commission" : "Comisión Europea",
    relevance: en ? "Model for structured health data interoperability — relevant for CCSS modernization" : "Modelo de interoperabilidad estructurada de datos de salud — relevante para modernización de CCSS",
    desc: en
      ? "Adopted March 2025. Creates a unified framework for health data access across the EU: primary use (clinical care) and secondary use (research & innovation). Establishes mandatory interoperability standards (HL7 FHIR), patient access rights, and secure data sharing for AI training. A model CR could adapt for EDUS/CCSS data governance."
      : "Adoptado marzo 2025. Crea un marco unificado para acceso a datos de salud en la UE: uso primario (atención clínica) y uso secundario (investigación e innovación). Establece estándares de interoperabilidad obligatorios (HL7 FHIR), derechos de acceso del paciente y compartición segura de datos para entrenamiento de AI. Un modelo que CR podría adaptar para la gobernanza de datos EDUS/CCSS.",
    status: en ? "Adopted 2025" : "Adoptado 2025",
    color: "#6366f1",
    link: "https://health.ec.europa.eu/ehealth-digital-health-and-care/european-health-data-space_en"
  },
  {
    id: "aha",
    name: en ? "AHA Scientific Statement: AI in Heart Disease" : "Declaración Científica AHA: IA en Enfermedad Cardíaca",
    org: "American Heart Association",
    relevance: en ? "Clinical evidence framework for cardiology AI — applicable to CCSS cardiology programs" : "Marco de evidencia clínica para AI en cardiología — aplicable a programas de cardiología de CCSS",
    desc: en
      ? "Comprehensive scientific review of AI applications across the cardiovascular care spectrum: risk prediction, imaging interpretation, arrhythmia detection, treatment optimization. Identifies gaps in validation, regulatory oversight, and equitable implementation. Critical reference for any AI cardiology deployment in CR."
      : "Revisión científica integral de aplicaciones AI en el espectro de atención cardiovascular: predicción de riesgo, interpretación de imágenes, detección de arritmias, optimización de tratamiento. Identifica brechas en validación, supervisión regulatoria e implementación equitativa. Referencia crítica para cualquier despliegue de AI en cardiología en CR.",
    status: en ? "Peer-reviewed" : "Revisión por pares",
    color: "#dc2626",
    link: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000001201"
  },
  {
    id: "acaim",
    name: en ? "American College of AI in Medicine" : "Colegio Americano de IA en Medicina",
    org: "ACAIM",
    relevance: en ? "Professional certification body for AI in clinical medicine" : "Cuerpo de certificación profesional para AI en medicina clínica",
    desc: en
      ? "Professional organization advancing AI competency among physicians. Offers certification programs, continuing education, and clinical AI implementation frameworks. Relevant for Costa Rican medical professionals seeking to integrate AI into clinical practice responsibly."
      : "Organización profesional que avanza la competencia en AI entre médicos. Ofrece programas de certificación, educación continua y marcos de implementación de AI clínica. Relevante para profesionales médicos costarricenses que buscan integrar AI en la práctica clínica responsablemente.",
    status: en ? "Active" : "Activo",
    color: "#059669",
    link: "https://americancollegeaim.org/"
  },
];

// ═══════════════════════════════════════════════════════════════
// NEW: AI Health Technology Active in Costa Rica
// Sources: Ministerio de Salud CR, FDA, Mayo Clinic, La Nación
// ═══════════════════════════════════════════════════════════════

export const HEALTH_AI_TECH_CR = (en) => [
  {
    id: "heartrends",
    name: "HeartTrends",
    company: "Lev El Diagnostics (Israel)",
    type: en ? "AI Cardiac Risk Prediction" : "Predicción de Riesgo Cardíaco AI",
    desc: en
      ? "Analyzes heart rate variability (HRV) using AI to detect early signs of coronary artery disease in asymptomatic patients. Non-invasive, uses standard ECG data. Endorsed by Mayo Clinic. Registered with Costa Rica's Ministerio de Salud."
      : "Analiza variabilidad de frecuencia cardíaca (HRV) usando AI para detectar signos tempranos de enfermedad coronaria en pacientes asintomáticos. No invasivo, usa datos de ECG estándar. Avalado por Mayo Clinic. Registrado ante el Ministerio de Salud de Costa Rica.",
    status: en ? "Active in CR" : "Activo en CR",
    approvals: en ? "Ministerio de Salud CR, Mayo Clinic endorsed" : "Ministerio de Salud CR, aval Mayo Clinic",
    color: "#dc2626",
    link: "https://www.heartrends.com/physicians"
  },
  {
    id: "eko",
    name: "Eko CORE 500",
    company: "Eko Health (USA)",
    type: en ? "AI Digital Stethoscope" : "Estetoscopio Digital AI",
    desc: en
      ? "FDA-cleared AI-powered digital stethoscope that detects heart murmurs, atrial fibrillation, and valvular heart disease with clinical-grade accuracy. AI algorithms analyze heart and lung sounds in real-time, flagging anomalies for physician review."
      : "Estetoscopio digital con AI aprobado por FDA que detecta soplos cardíacos, fibrilación auricular y enfermedad valvular con precisión de grado clínico. Algoritmos AI analizan sonidos cardíacos y pulmonares en tiempo real, señalando anomalías para revisión médica.",
    status: en ? "FDA cleared" : "Aprobado por FDA",
    approvals: "FDA 510(k)",
    color: "#0ea5e9",
    link: "https://www.ekohealth.com/products/core-500-digital-stethoscope"
  },
  {
    id: "accuchek",
    name: "Accu-Chek SmartGuide",
    company: "Roche",
    type: en ? "AI Diabetes Monitoring" : "Monitoreo de Diabetes AI",
    desc: en
      ? "AI-powered continuous glucose monitoring that predicts hypoglycemia events before they happen. Uses machine learning to analyze glucose patterns and provide personalized insulin dosing recommendations. Expected in Costa Rica within 2 months (as of March 2026)."
      : "Monitoreo continuo de glucosa con AI que predice eventos de hipoglucemia antes de que ocurran. Usa aprendizaje automático para analizar patrones de glucosa y brindar recomendaciones personalizadas de dosificación de insulina. Esperado en Costa Rica dentro de 2 meses (a partir de marzo 2026).",
    status: en ? "Coming to CR ~May 2026" : "Llega a CR ~Mayo 2026",
    approvals: en ? "CE Mark, pending local registration" : "Marca CE, pendiente registro local",
    color: "#f59e0b",
    link: "https://radarhealthcare.sdli.es/2025/06/12/accu-chek-smartguide-ia-para-la-monitorizacion-avanzada-de-diabetes/"
  },
];

// ── Additional Health AI Resources (from expert feedback) ──
export const HEALTH_AI_RESOURCES = (en) => [
  { title: en ? "11 AI Apps for Personal Health" : "11 Apps con IA para Cuidar la Salud", source: "La Nación CR", desc: en ? "Practical AI health apps available to Costa Rican consumers: symptom checkers, medication reminders, fitness AI, and mental health tools." : "Apps de salud AI prácticas disponibles para consumidores costarricenses: verificadores de síntomas, recordatorios de medicación, fitness AI y herramientas de salud mental.", link: "https://www.nacion.com/mi-bienestar/11-apps-con-ia-que-le-ayudaran-a-cuidar-su-salud-y/YHP2EYXITZH4TF4VF5HEZVDFXQ/story/" },
];
