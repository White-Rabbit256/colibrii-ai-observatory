/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Single Source of Truth
   All counts computed dynamically from actual data arrays.
   Import FACTS anywhere to avoid hardcoded discrepancies.
   ═══════════════════════════════════════════════════════════════ */
import { CO, ALGOS, GLOSSARY, PARTNERS, TABS, LAWS, WEF_2026_RISKS, EOS_RISKS, API_SOURCES, ANNUAL_SOURCES } from "../components/data";

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
  /* ── Brand Constants ── */
  tagline: "Agile Intelligence",
  founder: "Andrés Alpízar",
  email: "andres@colibriilabs.com",
  org: "Colibrii Labs",
};
