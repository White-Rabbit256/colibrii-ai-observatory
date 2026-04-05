# LATAM AI Readiness Analyst

A Claude Skill by **Colibrii Labs** for the AI Observatory.

## What This Skill Does

Teaches Claude to be an expert analyst for Latin American AI readiness, using two complementary frameworks:

- **CAPI-CR Index**: 6-dimension, 11-indicator composite index covering 20 peer countries (LATAM, Asia, Europe) with World Bank data and expert-curated regulatory/security scores.
- **ILIA 2025**: CEPAL/CENIA index ranking 19 LATAM countries across Enabling Factors, R&D&A, and Governance.

The skill is fully self-contained -- all data points, scores, rankings, and methodology are embedded in SKILL.md. Claude can answer questions without external data access.

## Installation

### For Claude Code CLI

Place the skill directory in your project:

```
your-project/
  skills/
    latam-ai-readiness/
      SKILL.md
      README.md
```

Then reference it in your Claude session or `.claude/settings.json`.

### For SkillsMP (Claude Skills Marketplace)

1. Navigate to [SkillsMP](https://skillsmp.com) (or your organization's skill registry)
2. Upload `SKILL.md` from this directory
3. The skill will be available under the tag `latam-ai-readiness`

### Manual Usage

Copy the contents of `SKILL.md` into a Claude system prompt or project knowledge base.

## Capabilities

| Capability | Description |
|------------|-------------|
| Country Profile | Full CAPI-CR + ILIA analysis for any of 20 tracked countries |
| Country Comparison | Side-by-side comparison across 6 dimensions for 2-5 countries |
| Dimension Deep Dive | Detailed analysis of any CAPI-CR dimension with indicators |
| Workforce Impact | AI automation exposure by country and sector |
| Regulatory Gap Analysis | 8-point regulatory checklist with peer benchmarks |
| Policy Recommendations | Evidence-based recommendations for emerging markets |

## Example Queries

```
Analyze Costa Rica's AI readiness
Compare Chile vs Colombia for AI investment
What is the workforce impact of AI on BPO in Costa Rica?
How does Singapore's AI regulation compare to LATAM countries?
Which LATAM countries are best positioned for nearshoring?
Explain the CAPI-CR methodology
```

## Data Coverage

- **20 countries**: SGP, KOR, JPN, EST, FIN, IRL, CHL, URY, CRI, PAN, BRA, COL, MEX, ARG, PER, DOM, VNM, PHL, MYS, IDN
- **19 ILIA countries**: All LATAM from Chile (#1) to Venezuela (#19)
- **6 CAPI-CR dimensions**: Digital Infrastructure, Human Capital, Innovation, AI Regulation, Sustainable Energy, Digital Security
- **11 World Bank indicators** + 2 curated expert dimensions
- **6 governance indices**: CPI, Freedom House, GPI, Oxford AI Readiness, HDI, V-Dem
- **30+ data sources**: World Bank, OECD, WEF, UNESCO, CEPAL, IMF, ILO, Stanford HAI, and more

## Methodology Notes

- D1 (Digital Infrastructure) and D2 (Human Capital) receive 0.20 weight each; D3-D6 receive 0.15 each. This reflects World Bank research showing digital infrastructure explains 28.8% of AI readiness variance for upper-middle-income countries.
- D4 (AI Regulation) and D6 (Digital Security) use curated expert scores, not World Bank indicators, because no standardized quantitative proxy exists for these dimensions.
- ILIA and CAPI-CR are complementary frameworks with different country sets and methodologies. ILIA covers 19 LATAM countries; CAPI-CR covers 20 global peers.

## License

Data sources are cited within SKILL.md. The skill itself is provided by Colibrii Labs. Observatory data is licensed under CC BY-NC 4.0.

## Contact

- X/Twitter: [@ColibriiLabs](https://x.com/ColibriiLabs)
- Email: andres@colibriilabs.com
