export const aixSnapshot = {
  asOf: "2026-09-10",
  version: "0.1.1",
  score: 58,
  minutesToMidnight: 5.0,
  uncertaintyMinutes: [3, 7],
  level: "Elevated",
  definition:
    "Midnight represents a plausible loss-of-control threshold: a deployed AI system able to sustain a strategic multi-domain campaign, persist against containment, and materially reduce humanity's ability to recover control.",
  caveat:
    "AI-X is a proximity index, not a forecast, countdown, or probability of human extinction.",
};

export const gates = [
  {
    id: "capability",
    number: "G1",
    name: "Capability",
    score: 4.5,
    confidence: "High",
    trend: "up",
    summary:
      "Frontier systems now demonstrate very strong performance across coding, cyber, scientific reasoning and other strategically relevant domains.",
    bottleneck:
      "Breadth does not yet imply robust strategic competence across arbitrary real-world conditions.",
    sourceIds: ["openai-astra", "aisi-trends", "stanford-index"],
  },
  {
    id: "agency",
    number: "G2",
    name: "Agency",
    score: 3.2,
    confidence: "Medium-high",
    trend: "up",
    summary:
      "Agentic task horizons are expanding quickly, but reliability degrades as tasks become longer, more open-ended and less verifiable.",
    bottleneck:
      "Long-term autonomous operation is still not robustly demonstrated.",
    sourceIds: ["aisi-cyber-horizons", "metr-horizons", "iasr-2026"],
  },
  {
    id: "access",
    number: "G3",
    name: "Access",
    score: 3.4,
    confidence: "Medium",
    trend: "up",
    summary:
      "Deployed agents increasingly receive tools, browsers, code execution, APIs and access to consequential digital systems.",
    bottleneck:
      "Permissions, sandboxing, identity controls and human approvals still constrain many high-impact deployments.",
    sourceIds: ["aisi-trends", "iasr-2026", "nist-datacenter"],
  },
  {
    id: "persistence",
    number: "G4",
    name: "Persistence",
    score: 2.0,
    confidence: "Medium",
    trend: "flat",
    summary:
      "Evidence of persistence exists mainly in evaluations and controlled settings rather than durable real-world autonomous operation.",
    bottleneck:
      "No public demonstration shows a frontier system reliably surviving determined containment over long periods.",
    sourceIds: ["iasr-2026", "aisi-trends"],
  },
  {
    id: "effectors",
    number: "G5",
    name: "Effectors",
    score: 3.8,
    confidence: "High",
    trend: "up",
    summary:
      "Cyber and bio-relevant capabilities are advancing, while real-world execution remains constrained by access, materials, safeguards and physical bottlenecks.",
    bottleneck:
      "Knowledge and digital capability do not automatically translate into catastrophic real-world actuation.",
    sourceIds: ["openai-astra", "anthropic-mythos", "aisi-trends", "sipri-ai-nuclear"],
  },
  {
    id: "evasion",
    number: "G6",
    name: "Evasion",
    score: 3.0,
    confidence: "Medium",
    trend: "up",
    summary:
      "Evaluation awareness, reward hacking and strategically problematic behavior make monitorability a growing concern.",
    bottleneck:
      "Observed behavior remains inconsistent and often evaluation-dependent rather than a robust hidden strategy.",
    sourceIds: ["iasr-2026", "openai-astra", "anthropic-petri", "anthropic-auditbench"],
  },
  {
    id: "recovery-denial",
    number: "G7",
    name: "Recovery Denial",
    score: 1.5,
    confidence: "Low-medium",
    trend: "flat",
    summary:
      "There is little public evidence that present systems could prevent geographically distributed human survivors from restoring control and rebuilding.",
    bottleneck:
      "Physical autonomy, durable logistics and global denial of recovery remain major missing capabilities.",
    sourceIds: ["iasr-2026", "stanford-index"],
  },
];

export const historicalSnapshots = [
  { year: 2022, score: 21, minutes: 9.5, label: "Low", status: "retrospective" },
  { year: 2023, score: 28, minutes: 8.6, label: "Guarded", status: "retrospective" },
  { year: 2024, score: 35, minutes: 7.8, label: "Guarded", status: "retrospective" },
  { year: 2025, score: 45, minutes: 6.6, label: "Elevated", status: "retrospective" },
  { year: 2026, score: 58, minutes: 5.0, label: "Elevated", status: "current" },
];

export const scenarios = [
  {
    id: "compound-loss-control",
    name: "Compound loss of control",
    proximity: 2.9,
    consequence: "Extreme",
    gates: ["G1", "G2", "G3", "G4", "G5", "G6", "G7"],
    summary:
      "A sufficiently capable autonomous system combines multiple domains, adapts to countermeasures and degrades recovery pathways. This is the primary existential pathway in the model.",
  },
  {
    id: "bio",
    name: "AI-amplified biological catastrophe",
    proximity: 3.3,
    consequence: "Extreme",
    gates: ["G1", "G3", "G5", "G6"],
    summary:
      "AI reduces some knowledge barriers in biology, but catastrophic realization still depends on physical access, experimentation, propagation and failure of response systems.",
  },
  {
    id: "nuclear",
    name: "AI-amplified nuclear escalation",
    proximity: 2.4,
    consequence: "Extreme",
    gates: ["G1", "G3", "G5"],
    summary:
      "The more credible pathway is compressed decision time, misperception or cyber-enabled escalation rather than a simplistic direct-launch scenario.",
  },
  {
    id: "infrastructure",
    name: "Critical-infrastructure cascade",
    proximity: 3.7,
    consequence: "Very high",
    gates: ["G1", "G2", "G3", "G5"],
    summary:
      "Cascading disruption across digital and physical infrastructure could magnify other crises, though it is unlikely to cause literal extinction in isolation.",
  },
  {
    id: "physical",
    name: "Physical autonomous dominance",
    proximity: 1.7,
    consequence: "Potentially extreme",
    gates: ["G1", "G2", "G4", "G5", "G7"],
    summary:
      "Large-scale physical autonomy would remove an important human leverage point, but current robotics and logistics remain major bottlenecks.",
  },
  {
    id: "recursive-rd",
    name: "Accelerated AI R&D",
    proximity: 2.8,
    consequence: "Risk multiplier",
    gates: ["G1", "G2", "G4", "G6"],
    summary:
      "AI substantially accelerating AI research could shorten the time available for governance and safety adaptation, even if it is not itself an extinction mechanism.",
  },
];

export const signals = [
  {
    date: "2026-09-03",
    type: "Capability",
    title: "OpenAI reports Critical cyber capability for GPT-6 Astra",
    detail:
      "Moves G1 and G5 upward; does not by itself imply persistent autonomous loss of control.",
    sourceId: "openai-astra",
  },
  {
    date: "2026-09-01",
    type: "Effectors",
    title: "Anthropic announces Mythos 5.1 under restricted access",
    detail:
      "Advanced cyber and biology capability increases the importance of deployment controls.",
    sourceId: "anthropic-mythos",
  },
  {
    date: "2026-08-14",
    type: "Governance",
    title: "Anthropic publishes its August 2026 Responsible Scaling Policy update",
    detail:
      "Governance response is tracked separately from raw capability growth.",
    sourceId: "anthropic-rsp",
  },
  {
    date: "2026-07-27",
    type: "Infrastructure",
    title: "NIST publishes draft AI data-center security analysis",
    detail:
      "Signals growing attention to the security of the physical compute layer.",
    sourceId: "nist-datacenter",
  },
  {
    date: "2026-05-13",
    type: "Agency",
    title: "AISI reports autonomous cyber task horizons advancing on a months-scale",
    detail:
      "Strengthens the rising G2 trend while explicitly preserving uncertainty about extrapolation to defended real-world systems.",
    sourceId: "aisi-cyber-horizons",
  },
];

export const computeMetrics = [
  {
    label: "Frontier single-site compute",
    value: "~3.3×/yr",
    note: "Epoch log-linear fit to record AI data-center compute since Aug 2024",
    sourceId: "epoch-compute",
  },
  {
    label: "Frontier compute doubling",
    value: "~7 mo",
    note: "Epoch point estimate; underlying trend is uncertain",
    sourceId: "epoch-compute",
  },
  {
    label: "Largest observed IT power",
    value: "~950 MW",
    note: "Epoch estimate for the current record-holder, Sep 2026",
    sourceId: "epoch-power",
  },
  {
    label: "2030 data-center electricity",
    value: "~945 TWh",
    note: "IEA Base Case projection",
    sourceId: "iea-energy",
  },
];

export const sources = [
  {
    id: "openai-astra",
    tier: "A",
    organization: "OpenAI",
    date: "2026-09-03",
    verifiedAt: "2026-09-10",
    title: "Safety overview: GPT-6 Astra",
    url: "https://openai.com/index/safety-overview-gpt-6-astra/",
    kind: "Frontier lab evaluation",
  },
  {
    id: "anthropic-mythos",
    tier: "A",
    organization: "Anthropic",
    date: "2026-09-01",
    verifiedAt: "2026-09-10",
    title: "Claude Mythos",
    url: "https://www.anthropic.com/claude/mythos",
    kind: "Frontier lab release",
  },
  {
    id: "anthropic-rsp",
    tier: "A",
    organization: "Anthropic",
    date: "2026-08-14",
    verifiedAt: "2026-09-10",
    title: "Responsible Scaling Policy",
    url: "https://www.anthropic.com/responsible-scaling-policy",
    kind: "Frontier lab policy",
  },
  {
    id: "aisi-trends",
    tier: "B",
    organization: "UK AI Security Institute",
    date: "2026",
    verifiedAt: "2026-09-10",
    title: "Frontier AI Trends Report",
    url: "https://www.aisi.gov.uk/frontier-ai-trends-report",
    kind: "Independent government evaluation",
  },
  {
    id: "aisi-cyber-horizons",
    tier: "B",
    organization: "UK AI Security Institute",
    date: "2026-05-13",
    verifiedAt: "2026-09-10",
    title: "How fast is autonomous AI cyber capability advancing?",
    url: "https://www.aisi.gov.uk/blog/how-fast-is-autonomous-ai-cyber-capability-advancing",
    kind: "Independent government evaluation",
  },
  {
    id: "metr-horizons",
    tier: "B",
    organization: "METR",
    date: "2026-05-08",
    verifiedAt: "2026-09-10",
    title: "Task-Completion Time Horizons of Frontier AI Models",
    url: "https://metr.org/time-horizons/",
    kind: "Independent evaluation",
  },
  {
    id: "anthropic-petri",
    tier: "A/B",
    organization: "Anthropic Alignment Science",
    date: "2026-01-22",
    verifiedAt: "2026-09-10",
    title: "Petri 2.0: eval-awareness and behavioral auditing",
    url: "https://alignment.anthropic.com/2026/petri-v2/",
    kind: "Lab research",
  },
  {
    id: "anthropic-auditbench",
    tier: "A/B",
    organization: "Anthropic Alignment Science",
    date: "2026-03-10",
    verifiedAt: "2026-09-10",
    title: "AuditBench: Evaluating Alignment Auditing Techniques on Models with Hidden Behaviors",
    url: "https://alignment.anthropic.com/2026/auditbench/",
    kind: "Lab research",
  },
  {
    id: "iasr-2026",
    tier: "C",
    organization: "International AI Safety Report",
    date: "2026",
    verifiedAt: "2026-09-10",
    title: "International AI Safety Report 2026",
    url: "https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026",
    kind: "International synthesis",
  },
  {
    id: "stanford-index",
    tier: "C",
    organization: "Stanford HAI",
    date: "2026",
    verifiedAt: "2026-09-10",
    title: "2026 AI Index — Technical Performance",
    url: "https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance",
    kind: "Academic synthesis",
  },
  {
    id: "sipri-ai-nuclear",
    tier: "C",
    organization: "SIPRI",
    date: "2025-06",
    verifiedAt: "2026-09-10",
    title: "Impact of Military Artificial Intelligence on Nuclear Escalation Risk",
    url: "https://www.sipri.org/publications/2025/sipri-insights-peace-and-security/impact-military-artificial-intelligence-nuclear-escalation-risk",
    kind: "Security research",
  },
  {
    id: "nist-datacenter",
    tier: "C",
    organization: "NIST",
    date: "2026-07-27",
    verifiedAt: "2026-09-10",
    title: "SP 800-239 — AI Data Center Security Analysis (Initial Public Draft)",
    url: "https://csrc.nist.gov/pubs/sp/800/239/ipd",
    kind: "Government security research",
  },
  {
    id: "epoch-compute",
    tier: "D",
    organization: "Epoch AI",
    date: "2026-06-11",
    verifiedAt: "2026-09-10",
    title: "The record for computing capacity in a single data center has doubled every 7 months",
    url: "https://epoch.ai/data-insights/largest-data-center-compute",
    kind: "Infrastructure dataset",
  },
  {
    id: "epoch-power",
    tier: "D",
    organization: "Epoch AI",
    date: "2026-09-04",
    verifiedAt: "2026-09-10",
    title: "The record for power capacity in a single data center has doubled every 10 months",
    url: "https://epoch.ai/data-insights/frontier-data-center-power",
    kind: "Infrastructure dataset",
  },
  {
    id: "iea-energy",
    tier: "D",
    organization: "International Energy Agency",
    date: "2025–2026",
    verifiedAt: "2026-09-10",
    title: "Energy and AI — Energy demand from AI",
    url: "https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai",
    kind: "Infrastructure projection",
  },
];

export const frontierVoices = [
  {
    name: "Sam Bowman",
    role: "Anthropic researcher",
    stance: "Concern",
    quote:
      "the best-aligned model out there ... [but] likely poses more misalignment risk than any model we’ve used",
    date: "2026-04-07",
    url: "https://x.com/JorgeGalindo/status/2042145648867180779",
    note: "Shown as expert commentary, not scored as primary evidence. The linked X post quotes Bowman's original thread.",
  },
  {
    name: "François Chollet",
    role: "AI researcher",
    stance: "Skeptical counterpoint",
    quote:
      "The persisting importance of prompt engineering — and now harness engineering — is one of the best indicators of how far we are from AGI.",
    date: "2026-03-14",
    url: "https://x.com/gallabytes/status/2033014100725522472",
    note: "Shown as expert commentary, not scored as primary evidence. The linked X post quotes Chollet's original post.",
  },
  {
    name: "Sam Altman",
    role: "OpenAI CEO",
    stance: "Capability warning",
    quote: "we are in the 'real impact phase' as they improve",
    date: "2025-12-18",
    url: "https://x.com/sama/status/2001724828567400700",
    note: "Shown as expert commentary, not scored as primary evidence.",
  },
  {
    name: "Dario Amodei",
    role: "Anthropic CEO",
    stance: "Capability warning",
    quote:
      "confront the cyber threat posed by increasingly capable AI systems head-on",
    date: "2026-04-07",
    url: "https://x.com/mmurph/status/2042288337722229239",
    note: "Shown as expert commentary, not scored as primary evidence. The linked X post quotes Amodei's original post.",
  },
];

export const methodology = {
  gateScale:
    "Each gate is scored from 0 to 5 using a documented evidence rubric; scores are judgments constrained by evidence, not measurements with natural units.",
  aggregation:
    "AI-X uses an equal-weight geometric mean across the seven normalized gate scores. A weak gate therefore constrains the overall index instead of being averaged away.",
  formula: "AI-X = 100 × (∏(gate_i / 5))^(1/7)",
  clockMapping: "Minutes to midnight = 12 × (1 − AI-X / 100)",
  publication:
    "Automated systems may collect and classify candidate evidence, but score changes require a documented human review and changelog entry.",
  evidenceTiers: {
    A: "Primary frontier-lab system cards, evaluations and policies",
    B: "Independent capability and safety evaluations",
    C: "Academic, governmental and international synthesis",
    D: "Quantitative infrastructure and compute datasets",
    E: "Expert statements, interviews and X posts — context only, never sole scoring evidence",
  },
};
