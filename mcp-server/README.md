# Colibrii Labs Observatory MCP Server

Exposes the Observatory's core intelligence as MCP tools that any AI agent can plug into. Covers 20 peer countries, 6 CAPI-CR dimensions, ILIA 2025 rankings, governance indices, workforce impact projections, and regulatory analysis.

## Setup

```bash
cd mcp-server
npm install
```

### Claude Desktop Integration

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "colibrii-observatory": {
      "command": "node",
      "args": ["C:/Users/andre/OneDrive/Desktop/ColibriiLabs_Portal_v12/mcp-server/index.js"]
    }
  }
}
```

### Claude Code Integration

Add to your `.claude/settings.json`:

```json
{
  "mcpServers": {
    "colibrii-observatory": {
      "command": "node",
      "args": ["C:/Users/andre/OneDrive/Desktop/ColibriiLabs_Portal_v12/mcp-server/index.js"]
    }
  }
}
```

### Test Manually

```bash
node index.js
```

The server communicates via stdin/stdout (stdio transport).

## Available Tools

### 1. `get_country_profile`

Full profile for any of 20 peer countries.

**Input:** `{ "country": "Costa Rica" }`

Returns: name, GDP, population, governance scores, regulatory status, CAPI-CR composite score.

### 2. `get_capi_cr_score`

CAPI-CR composite score and 6-dimension breakdown.

**Input:** `{ "country": "CRI" }`

Dimensions: Digital Infrastructure (20%), Human Capital (20%), Innovation (15%), AI Regulation (15%), Sustainable Energy (15%), Digital Security (15%).

### 3. `compare_countries`

Side-by-side comparison of 2-5 countries.

**Input:** `{ "countries": ["Costa Rica", "Chile", "Singapore"] }`

Returns: all dimensions, governance scores, regulatory status, and dimension leaders.

### 4. `get_ilia_rankings`

ILIA 2025 (Latin American AI Index) rankings for 19 countries.

**Input:** `{ "tier": "pioneer" }` or `{ "country": "Costa Rica" }`

Source: CEPAL + CENIA (Chile). Tiers: Pioneer (60-100), Adopter (35-60), Explorer (0-35).

### 5. `get_governance_scores`

Governance indicators with peer rankings.

**Input:** `{ "country": "Costa Rica" }`

Returns: CPI, Freedom House, V-Dem, GPI, Oxford AI Readiness, HDI -- each with rank among 20 peers.

### 6. `get_ai_workforce_impact`

AI workforce exposure and displacement data.

**Input:** `{ "sector": "Healthcare" }` or `{ "view": "timeline" }`

Views: overview, sectors, occupations, timeline. Sources: WEF, IMF, McKinsey.

### 7. `get_regulatory_status`

AI regulation status for a country or global overview.

**Input:** `{ "country": "Costa Rica" }` or `{}` for all 20 countries.

Includes the 7-law global legislation tracker (EU AI Act, South Korea, Colorado, Chile, CR ENIA, CR Bills).

### 8. `search_data_sources`

Search the 96+ data source registry.

**Input:** `{ "query": "World Bank", "type": "api" }`

Types: api (13 sources), report (30 annual reports), partner (25 institutions).

## Data Coverage

- **Countries:** 20 peer countries across Asia, Europe, and LATAM
- **Dimensions:** 6 CAPI-CR dimensions with 11 World Bank indicators
- **Governance:** 6 indices (CPI, Freedom House, V-Dem, GPI, Oxford AI, HDI)
- **ILIA:** 19 LATAM countries ranked with tiers and Costa Rica detailed scorecard
- **Legislation:** 7 key AI laws tracked globally
- **Workforce:** 7 sectors, 6 occupation categories, 4 timeframe projections
- **Sources:** 13 APIs + 30 annual reports + 25 institutional partners

## License

CC BY-NC 4.0 -- Colibrii Labs
