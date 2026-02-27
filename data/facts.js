/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Single Source of Truth
   All counts computed dynamically from actual data arrays.
   Import FACTS anywhere to avoid hardcoded discrepancies.
   ═══════════════════════════════════════════════════════════════ */
import { CO, ALGOS, GLOSSARY, PARTNERS, TABS, LAWS, WEF_2026_RISKS, EOS_RISKS, API_SOURCES, ANNUAL_SOURCES, SDG_ALIGNMENT, ITU_DIMENSIONS, GLOBAL_AI_GOVERNANCE } from "../components/data";

export const FACTS = {
  countries: Object.keys(CO).length,
  algorithms: ALGOS(false).length,
  glossaryTerms: GLOSSARY(false).length,
  partners: PARTNERS.length,
  tabs: TABS.length,
  laws: LAWS(false).length,
  wefRisks: WEF_2026_RISKS.immediate?.length || 10,
  eosCountries: Object.keys(EOS_RISKS).length,
  apiSources: API_SOURCES(false).length,
  annualSources: ANNUAL_SOURCES.length,
  sdgsAligned: SDG_ALIGNMENT(false).length,
  ituDimensions: ITU_DIMENSIONS(false).length,
  governanceCountries: GLOBAL_AI_GOVERNANCE(false).length,
  unAgencies: 6,
  /* ── Brand Constants ── */
  tagline: "Agile Intelligence",
  founder: "Andrés Alpízar",
  founderRole: "Founder",
  founderLinkedin: "https://www.linkedin.com/in/andresalpizar/",
  founderX: "https://x.com/ColibriiLabs",
  cofounder: "M.Sc. Mariam Rodríguez Rojas",
  cofounderRole: "CEO & Co-founder",
  cofounderLinkedin: "https://www.linkedin.com/in/mariam-rodr%C3%ADguez-rojas-15353b140/",
  email: "andres@colibriilabs.com",
  org: "Colibrii Labs",
};
