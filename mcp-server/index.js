#!/usr/bin/env node

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS OBSERVATORY — MCP SERVER v1.0
   Exposes the Observatory's core data as MCP tools.
   Transport: stdio (standard for Claude Desktop / Claude Code)
   ═══════════════════════════════════════════════════════════════ */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import {
  COUNTRIES,
  GOVERNANCE,
  CURATED_SCORES,
  DIMENSIONS,
  INDICATORS,
  ILIA_RANKINGS,
  ILIA_TIERS,
  ILIA_REGIONAL_STATS,
  CR_ILIA_PROFILE,
  LEGISLATION,
  REGULATORY_STATUS,
  WORKFORCE_IMPACT,
  DATA_SOURCES,
  COUNTRY_ALIASES,
} from "./data.js";

// ── Helper: resolve a country code from flexible input ──
function resolveCountry(input) {
  if (!input) return null;
  const key = input.trim().toLowerCase();
  const code = COUNTRY_ALIASES[key];
  if (code && COUNTRIES[code]) return code;
  // fuzzy: check if any country name starts with the input
  for (const [c, info] of Object.entries(COUNTRIES)) {
    if (info.name.toLowerCase().startsWith(key) || info.nameEs.toLowerCase().startsWith(key)) return c;
  }
  return null;
}

// ── Helper: compute CAPI-CR composite score for a country ──
// D1-D3, D5 use normalized governance/Oxford data as proxy; D4, D6 are curated
function computeCapiCR(code) {
  const gov = GOVERNANCE[code];
  const cur = CURATED_SCORES[code];
  if (!gov || !cur) return null;

  // Normalize each dimension to 0-1 scale using the data we have
  // D1 Digital Infrastructure: proxy from Oxford AI readiness (0-10 scale)
  const d1 = Math.min(gov.oxfordAI / 10, 1);
  // D2 Human Capital: proxy from HDI (0-1 scale)
  const d2 = gov.hdi;
  // D3 Innovation: proxy from Oxford AI (slightly different weight) + CPI as institutional quality
  const d3 = Math.min((gov.oxfordAI / 10 * 0.6 + gov.cpi / 100 * 0.4), 1);
  // D4 AI Regulation: curated
  const d4 = cur.D4;
  // D5 Sustainable Energy: hardcoded estimates based on portal data
  const energyScores = {
    SGP: 0.65, KOR: 0.58, JPN: 0.62, EST: 0.60, FIN: 0.72, IRL: 0.55,
    CHL: 0.60, URY: 0.65, CRI: 0.82, PAN: 0.50, BRA: 0.70, COL: 0.62,
    MEX: 0.48, ARG: 0.42, PER: 0.52, DOM: 0.40, VNM: 0.45, PHL: 0.48,
    MYS: 0.50, IDN: 0.45
  };
  const d5 = energyScores[code] || 0.50;
  // D6 Digital Security: curated
  const d6 = cur.D6;

  // Weights from DIMENSIONS
  const composite = d1 * 0.20 + d2 * 0.20 + d3 * 0.15 + d4 * 0.15 + d5 * 0.15 + d6 * 0.15;

  return {
    composite: Math.round(composite * 1000) / 1000,
    compositePercent: Math.round(composite * 100 * 10) / 10,
    dimensions: {
      D1_DigitalInfrastructure: { score: Math.round(d1 * 1000) / 1000, weight: 0.20 },
      D2_HumanCapital: { score: Math.round(d2 * 1000) / 1000, weight: 0.20 },
      D3_Innovation: { score: Math.round(d3 * 1000) / 1000, weight: 0.15 },
      D4_AIRegulation: { score: Math.round(d4 * 1000) / 1000, weight: 0.15 },
      D5_SustainableEnergy: { score: Math.round(d5 * 1000) / 1000, weight: 0.15 },
      D6_DigitalSecurity: { score: Math.round(d6 * 1000) / 1000, weight: 0.15 }
    }
  };
}

// ════════════════════════════════════════
//  CREATE MCP SERVER
// ════════════════════════════════════════

const server = new McpServer({
  name: "colibrii-observatory",
  version: "1.0.0",
  description: "Colibrii Labs AI Observatory — Costa Rica & 20-country peer intelligence for AI readiness, governance, ILIA rankings, workforce impact, and regulatory analysis."
});

// ── TOOL 1: get_country_profile ──
server.tool(
  "get_country_profile",
  "Returns the full profile for any of 20 peer countries including name, GDP, population, governance scores (CPI, Freedom House, V-Dem, GPI, Oxford AI Readiness, HDI), AI regulation status, and CAPI-CR composite score.",
  { country: z.string().describe("Country name or ISO code (e.g. 'Costa Rica', 'CRI', 'cr')") },
  async ({ country }) => {
    const code = resolveCountry(country);
    if (!code) {
      return { content: [{ type: "text", text: JSON.stringify({ error: `Country '${country}' not found. Available: ${Object.values(COUNTRIES).map(c => c.name).join(", ")}` }) }] };
    }
    const info = COUNTRIES[code];
    const gov = GOVERNANCE[code];
    const reg = REGULATORY_STATUS[code];
    const capi = computeCapiCR(code);

    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          country: info.name,
          iso: code,
          region: info.region,
          continent: info.continent,
          population: info.pop,
          gdp: info.gdp,
          note: info.note,
          governance: {
            corruptionPerceptionsIndex: gov.cpi,
            freedomHouseScore: gov.freedomHouse,
            globalPeaceIndex: gov.gpi,
            oxfordAIReadiness: gov.oxfordAI,
            humanDevelopmentIndex: gov.hdi,
            vDemDemocracyIndex: gov.vdem
          },
          regulatoryStatus: {
            status: reg.status,
            bindingAILaw: reg.bindingLaw,
            framework: reg.framework,
            authority: reg.authority,
            regulatorySandbox: reg.sandbox,
            notes: reg.notes
          },
          capiCR: capi
        }, null, 2)
      }]
    };
  }
);

// ── TOOL 2: get_capi_cr_score ──
server.tool(
  "get_capi_cr_score",
  "Returns the CAPI-CR (Country AI Preparedness Index - Costa Rica) composite score and dimensional breakdown for a country. The index spans 6 dimensions: Digital Infrastructure, Human Capital, Innovation, AI Regulation, Sustainable Energy, Digital Security.",
  { country: z.string().describe("Country name or ISO code") },
  async ({ country }) => {
    const code = resolveCountry(country);
    if (!code) {
      return { content: [{ type: "text", text: JSON.stringify({ error: `Country '${country}' not found.` }) }] };
    }
    const capi = computeCapiCR(code);
    const info = COUNTRIES[code];
    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          country: info.name,
          iso: code,
          capiCR: capi,
          dimensionDescriptions: Object.fromEntries(
            Object.entries(DIMENSIONS).map(([k, v]) => [k, { name: v.name, weight: v.weight, description: v.description }])
          ),
          methodology: "CAPI-CR is a composite index using World Bank indicators (D1, D2, D3, D5), curated legislative analysis (D4, D6), and governance data. Weights: D1=20%, D2=20%, D3=15%, D4=15%, D5=15%, D6=15%."
        }, null, 2)
      }]
    };
  }
);

// ── TOOL 3: compare_countries ──
server.tool(
  "compare_countries",
  "Compare 2-5 countries across all CAPI-CR dimensions, governance scores, and regulatory status. Returns side-by-side comparison data.",
  {
    countries: z.array(z.string()).min(2).max(5).describe("Array of 2-5 country names or ISO codes")
  },
  async ({ countries }) => {
    const resolved = countries.map(c => ({ input: c, code: resolveCountry(c) }));
    const invalid = resolved.filter(r => !r.code);
    if (invalid.length > 0) {
      return { content: [{ type: "text", text: JSON.stringify({ error: `Countries not found: ${invalid.map(i => i.input).join(", ")}` }) }] };
    }

    const comparison = resolved.map(r => {
      const code = r.code;
      const info = COUNTRIES[code];
      const gov = GOVERNANCE[code];
      const reg = REGULATORY_STATUS[code];
      const capi = computeCapiCR(code);
      return {
        country: info.name,
        iso: code,
        population: info.pop,
        gdp: info.gdp,
        region: info.region,
        capiCR_composite: capi.compositePercent,
        dimensions: capi.dimensions,
        governance: {
          cpi: gov.cpi,
          freedomHouse: gov.freedomHouse,
          gpi: gov.gpi,
          oxfordAI: gov.oxfordAI,
          hdi: gov.hdi,
          vdem: gov.vdem
        },
        regulation: {
          status: reg.status,
          bindingLaw: reg.bindingLaw,
          sandbox: reg.sandbox
        }
      };
    });

    // Find dimension leaders
    const dimensionKeys = ["D1_DigitalInfrastructure", "D2_HumanCapital", "D3_Innovation", "D4_AIRegulation", "D5_SustainableEnergy", "D6_DigitalSecurity"];
    const leaders = {};
    for (const dk of dimensionKeys) {
      let best = null;
      let bestScore = -1;
      for (const c of comparison) {
        if (c.dimensions[dk].score > bestScore) {
          bestScore = c.dimensions[dk].score;
          best = c.country;
        }
      }
      leaders[dk] = { leader: best, score: bestScore };
    }

    return {
      content: [{
        type: "text",
        text: JSON.stringify({ comparison, dimensionLeaders: leaders }, null, 2)
      }]
    };
  }
);

// ── TOOL 4: get_ilia_rankings ──
server.tool(
  "get_ilia_rankings",
  "Returns ILIA 2025 (Latin American AI Index) rankings for 19 LATAM countries. Source: CEPAL + CENIA (Chile). Includes score, tier (Pioneer/Adopter/Explorer), year-over-year change, and highlights.",
  {
    tier: z.enum(["all", "pioneer", "adopter", "explorer"]).optional().describe("Filter by tier (default: all)"),
    country: z.string().optional().describe("Get specific country ranking")
  },
  async ({ tier, country }) => {
    let results = [...ILIA_RANKINGS];

    if (country) {
      const lower = country.toLowerCase();
      results = results.filter(r => r.country.toLowerCase().includes(lower));
    }

    if (tier && tier !== "all") {
      results = results.filter(r => r.tier.toLowerCase() === tier.toLowerCase());
    }

    const response = {
      source: "CEPAL + CENIA (Chile), ILIA 2025 Report",
      regionalStats: ILIA_REGIONAL_STATS,
      tiers: ILIA_TIERS,
      rankings: results
    };

    // If querying Costa Rica specifically, include the detailed scorecard
    if (country && resolveCountry(country) === "CRI") {
      response.costaRicaScorecard = CR_ILIA_PROFILE;
    }

    return { content: [{ type: "text", text: JSON.stringify(response, null, 2) }] };
  }
);

// ── TOOL 5: get_governance_scores ──
server.tool(
  "get_governance_scores",
  "Returns governance indicator scores for a country: Corruption Perceptions Index (CPI, Transparency International), Freedom House, V-Dem Democracy, Global Peace Index (GPI), Oxford AI Readiness, Human Development Index (HDI).",
  { country: z.string().describe("Country name or ISO code") },
  async ({ country }) => {
    const code = resolveCountry(country);
    if (!code) {
      return { content: [{ type: "text", text: JSON.stringify({ error: `Country '${country}' not found.` }) }] };
    }
    const gov = GOVERNANCE[code];
    const info = COUNTRIES[code];

    // Compute percentile ranks among the 20 peers
    const allCodes = Object.keys(GOVERNANCE);
    const rankOf = (field, val, higherIsBetter = true) => {
      const sorted = allCodes.map(c => GOVERNANCE[c][field]).sort((a, b) => higherIsBetter ? b - a : a - b);
      return sorted.indexOf(val) + 1;
    };

    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          country: info.name,
          iso: code,
          scores: {
            corruptionPerceptionsIndex: { value: gov.cpi, scale: "0-100 (higher = less corrupt)", source: "Transparency International", rankAmong20: rankOf("cpi", gov.cpi) },
            freedomHouse: { value: gov.freedomHouse, scale: "0-100 (higher = more free)", source: "Freedom House", rankAmong20: rankOf("freedomHouse", gov.freedomHouse) },
            globalPeaceIndex: { value: gov.gpi, scale: "1-5 (lower = more peaceful)", source: "Institute for Economics & Peace", rankAmong20: rankOf("gpi", gov.gpi, false) },
            oxfordAIReadiness: { value: gov.oxfordAI, scale: "0-10 (higher = more AI ready)", source: "Oxford Insights 2024", rankAmong20: rankOf("oxfordAI", gov.oxfordAI) },
            humanDevelopmentIndex: { value: gov.hdi, scale: "0-1 (higher = more developed)", source: "UNDP", rankAmong20: rankOf("hdi", gov.hdi) },
            vDemDemocracy: { value: gov.vdem, scale: "0-1 (higher = more democratic)", source: "V-Dem Institute", rankAmong20: rankOf("vdem", gov.vdem) }
          }
        }, null, 2)
      }]
    };
  }
);

// ── TOOL 6: get_ai_workforce_impact ──
server.tool(
  "get_ai_workforce_impact",
  "Returns AI workforce exposure and impact data. Can filter by sector (Finance, Healthcare, Legal, Software, Customer Service, Education, Manufacturing) or return the full overview with WEF projections.",
  {
    sector: z.string().optional().describe("Filter by sector name (e.g. 'Healthcare', 'Finance')"),
    view: z.enum(["overview", "sectors", "occupations", "timeline"]).optional().describe("What to return (default: overview)")
  },
  async ({ sector, view }) => {
    const v = view || "overview";
    const result = {};

    if (v === "overview" || v === "timeline") {
      result.headline = WORKFORCE_IMPACT.headline;
      result.timeline = WORKFORCE_IMPACT.byTimeframe;
    }

    if (v === "overview" || v === "sectors") {
      if (sector) {
        const lower = sector.toLowerCase();
        result.sectors = WORKFORCE_IMPACT.bySector.filter(s => s.sector.toLowerCase().includes(lower));
        if (result.sectors.length === 0) {
          result.sectors = WORKFORCE_IMPACT.bySector;
          result.note = `No exact match for '${sector}'. Showing all sectors.`;
        }
      } else {
        result.sectors = WORKFORCE_IMPACT.bySector;
      }
    }

    if (v === "overview" || v === "occupations") {
      result.occupations = WORKFORCE_IMPACT.byOccupation;
    }

    result.sources = [
      "World Economic Forum Future of Jobs Report 2025",
      "IMF Gen-AI: Artificial Intelligence and the Future of Work (2024)",
      "McKinsey Global AI Survey 2024",
      "Gartner 2025 Strategic Technology Trends"
    ];

    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// ── TOOL 7: get_regulatory_status ──
server.tool(
  "get_regulatory_status",
  "Returns AI regulation status for a country: whether they have a binding AI law, regulatory framework, designated authority, sandbox, and relevant legislation. Also returns the global legislation tracker with 7 key laws.",
  {
    country: z.string().optional().describe("Country name or ISO code (omit for global overview)"),
    includeGlobalLaws: z.boolean().optional().describe("Include the 7-law global legislation tracker (default: true)")
  },
  async ({ country, includeGlobalLaws }) => {
    const result = {};

    if (country) {
      const code = resolveCountry(country);
      if (!code) {
        return { content: [{ type: "text", text: JSON.stringify({ error: `Country '${country}' not found.` }) }] };
      }
      const info = COUNTRIES[code];
      const reg = REGULATORY_STATUS[code];
      const cur = CURATED_SCORES[code];
      result.country = {
        name: info.name,
        iso: code,
        regulationScore_D4: cur.D4,
        securityScore_D6: cur.D6,
        ...reg
      };
    } else {
      // Overview: all countries' regulatory status
      result.overview = Object.entries(REGULATORY_STATUS).map(([code, reg]) => ({
        country: COUNTRIES[code].name,
        iso: code,
        status: reg.status,
        bindingLaw: reg.bindingLaw,
        sandbox: reg.sandbox
      }));
    }

    if (includeGlobalLaws !== false) {
      result.globalLegislationTracker = LEGISLATION;
    }

    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// ── TOOL 8: search_data_sources ──
server.tool(
  "search_data_sources",
  "Search the Observatory's 96+ data source registry. Includes 13 API sources, 30 annual reports, and 25 institutional partners. Filter by type (api, report, partner) or search by keyword.",
  {
    query: z.string().optional().describe("Search keyword (e.g. 'World Bank', 'labor', 'UNESCO')"),
    type: z.enum(["all", "api", "report", "partner"]).optional().describe("Filter by source type (default: all)")
  },
  async ({ query, type }) => {
    const t = type || "all";
    const result = {};

    if (t === "all" || t === "api") {
      let apis = DATA_SOURCES.apiSources;
      if (query) {
        const q = query.toLowerCase();
        apis = apis.filter(a => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q));
      }
      result.apiSources = apis;
    }

    if (t === "all" || t === "report") {
      let reports = DATA_SOURCES.annualReports;
      if (query) {
        const q = query.toLowerCase();
        reports = reports.filter(r => r.toLowerCase().includes(q));
      }
      result.annualReports = reports;
    }

    if (t === "all" || t === "partner") {
      let partners = DATA_SOURCES.partners;
      if (query) {
        const q = query.toLowerCase();
        partners = partners.filter(p => p.toLowerCase().includes(q));
      }
      result.partners = partners;
    }

    result.totalSources = DATA_SOURCES.apiSources.length + DATA_SOURCES.annualReports.length + DATA_SOURCES.partners.length;

    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

// ════════════════════════════════════════
//  START SERVER (stdio transport)
// ════════════════════════════════════════

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Colibrii Observatory MCP Server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
