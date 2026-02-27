# Colibrii Labs AI Observatory — Full Documentation

**Version:** 20.0.0 | **Data Module:** v13 Definitive Merge | **License:** CC BY-NC 4.0
**Last Updated:** February 2026 | **Live:** [colibriilabs.ai](https://colibriilabs.ai)

---

## Table of Contents

1. [Platform Overview](#1-platform-overview)
2. [Marketing Landing Page](#2-marketing-landing-page)
3. [Portal Shell & Navigation](#3-portal-shell--navigation)
4. [Tab-by-Tab Feature Reference](#4-tab-by-tab-feature-reference)
5. [Data Architecture](#5-data-architecture)
6. [UI Component Library](#6-ui-component-library)
7. [Icon System](#7-icon-system)
8. [CSS Architecture & Theming](#8-css-architecture--theming)
9. [API Integrations](#9-api-integrations)
10. [CAPI-CR Scoring Methodology](#10-capi-cr-scoring-methodology)
11. [Supporting Components](#11-supporting-components)
12. [Public Assets & SEO](#12-public-assets--seo)
13. [Configuration & Security](#13-configuration--security)
14. [Error Handling](#14-error-handling)
15. [Recent Additions: AI for Good Integration](#15-recent-additions-ai-for-good-integration)

---

## 1. Platform Overview

Colibrii Labs is Latin America's first real-time AI observatory — a bilingual (Spanish/English) web application that provides strategic intelligence on artificial intelligence readiness, risk, and policy across 20 peer countries with primary focus on Costa Rica.

**Key metrics:**
- 23 analysis tabs across 6 navigation groups
- 20 peer countries tracked with live World Bank data
- 10 proprietary algorithms (CAPI-CR, IVAS, TIPAI, MBR, IPDM, CRES, FDIA, QVRI, SIRI, GERI)
- 55 bilingual glossary terms with CR context
- 4 live API integrations (World Bank, GDELT, Exchange Rate, REST Countries)
- 25+ institutional data sources
- Zero cookies, zero tracking, zero user data collection
- Dark/light theme modes
- Full keyboard accessibility and reduced-motion support

**Team:**
- Andr&eacute;s Alpizar — Founder
- M.Sc. Mariam Rodriguez Rojas — CEO & Co-founder
- Contact: andres@colibriilabs.com

---

## 2. Marketing Landing Page

**File:** `components/marketing/LandingPage.jsx`
**URL:** `/` (root)

### 2.1 Structure (9 sections)

**Header** (`MarketingHeader.jsx`):
- Sticky positioning via CSS
- Colibrii logo (56px) with `.logo-iridescent` shimmer animation
- Language toggle button (CR/GB flags)
- "Enter Portal" / "Entrar al Portal" CTA button linking to `/app`

**Hero Section:**
- Colibrii logo (160px) + Costa Rica hero image (80x56)
- Subtitle: "Latin America's First Real-Time AI Observatory"
- CR flag badge
- h1: "Colibrii Labs"
- Tagline: "Built for Decision-Makers"
- Descriptive paragraph mentioning 20 countries, 25+ sources, 4 live APIs, zero AI laws, WEF #5, 40% IMF job disruption
- CTA button to `/app`

**Credibility Bar (4 stat cards):**
- Countries tracked (from FACTS)
- Proprietary algorithms (from FACTS)
- Glossary terms (from FACTS)
- Data sources (from FACTS)

**SDG/ITU Alignment Badges:**
- Green badge: "Aligned with 8 UN SDGs"
- Blue badge: "ITU AI Readiness Framework"

**"What is an AI Observatory?" Section:**
- 4-column grid: 25+ Data Sources, 4 Live APIs, 10 Algorithms, 14 Analysis Views
- Referenced Institutions bar: World Bank, WEF, IMF, OECD, Oxford Insights, Stanford HAI, OWASP, ILO, United Nations, UNDP, ITU

**"The Paradox" Section:**
- 6 cards highlighting CR's contradictions: 100/100 Vision vs 0.38 Readiness, 0 laws, #30 to #5 risk surge, 40% jobs at risk, 0 AI in business agenda

**Three Pillars of Intelligence:**
- CAPI-CR Index — 6-dimension composite, 20 countries
- Risk Intelligence — WEF 2026, 3 time horizons, EOS per-country
- Policy Simulator — what-if regulatory analysis

**"Built For" Audience Section:**
- Policymakers, Executives, Researchers, Journalists

**WEF Blind Spot Highlight:**
- AI risk #5 perception gap analysis

**Final CTA:**
- "Access the Observatory" with dynamic counts from FACTS

**FAQ Section (5 items):**
- What is CAPI-CR?
- How many data sources?
- Costa Rica's AI readiness status?
- Is data real-time?
- How does it align with UN AI for Good?

**Footer** (`MarketingFooter.jsx`):
- 3-column layout: Brand + Links + Connect
- Founder/Co-founder with LinkedIn links
- Social icons (X, TikTok, LinkedIn, Email)
- Copyright: CC BY-NC 4.0, underlying data retains original licenses

**Ambient Background:**
- 18 CSS-only floating dots with deterministic pseudo-random positioning
- Colors cycle: `#2563eb`, `#8b5cf6`, `#06b6d4`, `#ec4899`, `#10b981`
- Sizes 3-9px, animation durations 14-34s

---

## 3. Portal Shell & Navigation

### 3.1 PortalShell (`components/portal/PortalShell.jsx`)

**URL:** `/app`

**State management (13 state variables):**

| State | Type | Default | Persistence | Purpose |
|-------|------|---------|-------------|---------|
| `en` | boolean | false | `localStorage("clb_lang")` | Language toggle (ES/EN) |
| `dark` | boolean | false | `localStorage("clb_theme")` | Dark/light theme |
| `tab` | string | "home" | — | Active tab ID |
| `idx` | object | {} | `sessionStorage("clb_wb_data")` | World Bank index scores |
| `crS` | number | null | — | Costa Rica composite score |
| `crR` | number | null | — | Costa Rica rank (1-20) |
| `board` | array | [] | — | Sorted country leaderboard |
| `news` | array | [] | — | GDELT news articles |
| `loading` | boolean | true | — | Initial API load state |
| `xr` | number | null | — | USD/CRC exchange rate |
| `govData` | object | GOV | — | Governance dataset |
| `mobileNav` | boolean | false | — | Mobile sidebar open/closed |
| `showScrollTop` | boolean | false | — | Scroll-to-top button visibility |

Additional state: `drawerOpen`, `drawerIndicator` (indicator detail drawer), `selectedCountry` (country profile), `dataWarning` (failed API names).

**Tab props (`tp` memo):** All tab components receive: `en, t, idx, crS, crR, board, news, loading, xr, govData, dark, setTab, selectedCountry, setSelectedCountry, onIndicatorClick`

**Layout structure:**
1. Skip-to-content link (accessibility)
2. `<PortalSidebar>` — desktop fixed 220px + mobile Framer Motion slide-over
3. `.portal-main`:
   - Mobile header (sticky, hamburger + logo + exchange rate)
   - Desktop topbar (exchange rate + "Zero cookies" note)
   - Data warning banner (dismissible, shown if API fails)
   - `<main>` with `<AnimatePresence>` + `<TabContent>`
   - Footer (copyright, CC BY-NC 4.0)
4. `<BottomNav>` (mobile only, 56px)
5. `<IndicatorDrawer>` (slide-in from right)
6. Scroll-to-top button (after 300px scroll)

### 3.2 PortalSidebar (`components/portal/PortalSidebar.jsx`)

**6 Navigation Groups:**

| Group (ES) | Group (EN) | Tabs |
|-----------|-----------|------|
| INTELIGENCIA | INTELLIGENCE | home, zf, pai, pymes, media |
| POLITICAS | POLICY | leg, sec |
| FORMACION | TRAINING | edu, glos |
| IMPACTO | IMPACT | sdg, readiness, governance, showcase, food, health, infra, climate |
| HERRAMIENTAS | TOOLS | idx, countries, cmp, algo, sim |
| ACERCA | ABOUT | about |

**Bottom controls:** Dark mode toggle (sun/moon) + Language toggle (CR/GB flag)

**Mobile behavior:** Framer Motion slide-in from left (`x: "-100%" to 0`), backdrop overlay, spring animation

### 3.3 BottomNav (`components/portal/BottomNav.jsx`)

Mobile-only (< 768px), 56px sticky bottom bar:
- home (house icon)
- zf (factory icon)
- leg (legal icon)
- pymes (store icon)
- Dark mode toggle
- Language toggle
- More menu (opens sidebar)

### 3.4 IndicatorDrawer (`components/portal/IndicatorDrawer.jsx`)

Slide-in from right (400px wide, max 90vw):
- Current value display (large IBM Plex Mono)
- Definition (EN/ES)
- Interpretation (EN/ES)
- Data source + last updated
- "Cite this indicator" button (copies APA citation to clipboard)

### 3.5 Dynamic Imports (23 tab components)

All loaded via `next/dynamic` with `<LoadCard />` loading skeleton:

| Import | Source File | Export |
|--------|-----------|--------|
| `Home` | `HomeView.jsx` | `Home` |
| `Algo` | `AlgoSecurityLeg.jsx` | `Algo` |
| `SecTab` | `AlgoSecurityLeg.jsx` | `SecTab` |
| `Leg` | `AlgoSecurityLeg.jsx` | `Leg` |
| `Edu` | `EduGlossaryAbout.jsx` | `Edu` |
| `Glos` | `EduGlossaryAbout.jsx` | `Glos` |
| `Abt` | `EduGlossaryAbout.jsx` | `Abt` |
| `Pymes` | `PymesAI.jsx` | `Pymes` |
| `MediaView` | `MediaIntelligence.jsx` | `MediaIntelligence` |
| `IdxCompare` | `IndexCompareViews.jsx` | `Idx` |
| `CompareView` | `IndexCompareViews.jsx` | `Compare` |
| `Countries` | `CountryProfiles.jsx` | `Countries` |
| `Simulator` | `PolicySimulator.jsx` | `Simulator` |
| `ZF` | `FreeZonesPhysicalAI.jsx` | `ZF` |
| `PAI` | `FreeZonesPhysicalAI.jsx` | `PAI` |
| `SDGView` | `SDGAIForGood.jsx` | `SDG` |
| `ReadinessView` | `ITUReadiness.jsx` | `Readiness` |
| `GovernanceView` | `GlobalGovernance.jsx` | `Governance` |
| `ShowcaseView` | `ImpactShowcase.jsx` | `Showcase` |
| `FoodView` | `FoodSecurity.jsx` | `FoodSecurity` |
| `HealthView` | `HealthAI.jsx` | `HealthAI` |
| `InfraView` | `InfraSmartCities.jsx` | `InfraSmartCities` |
| `ClimateView` | `EnvironmentalAI.jsx` | `EnvironmentalAI` |

---

## 4. Tab-by-Tab Feature Reference

### 4.1 Home (`HomeView.jsx`)

**Features:**
- Hero with animated gradient orbs, "LIVE DATA" pulse indicator
- Two CTA buttons: "Explore Index" / "Policy Simulator"
- 6 clickable KPI stat cards (CAPI-CR score, rank, AI exposure 40%, WEF risk #5, 626 FZ companies, $4.3B FDI) — each triggers IndicatorDrawer

**WEF 2026 Risk Dashboard (`WefDashboard`):**
- 3 tabbed horizon views via `AnimatePresence`:
  - 2026 Immediate (10 risks with percentages)
  - 2028 Short-term (10 risks ranked with delta arrows)
  - 2036 Long-term (10 risks ranked)
- Key Insights row (5 mini-stat cards)
- Expert Outlook stacked bar chart (Calm/Stable/Unsettled/Turbulent/Stormy)

**Additional sections:**
- CR EOS Executive Blind Spot: CR business leaders' top 5 vs global expert top 5 risks — AI conspicuously absent from CR
- WEF & Costa Rica narrative: strengths (World Bank Overperformer, 100/100 Oxford, 99% renewable) vs gaps (zero AI law, no authority, INA zero AI, R&D 0.4%)
- "Why These Three Countries?" rationale (CR/CHL/SGP) with flags
- RadarChart (Recharts): 6 CAPI-CR dimensions, 3 country series
- Country peer groups methodology (4 groups with color borders)
- 3 key findings cards: AI Overperformer (green), Zero AI Law (red), 2025-2027 Window (amber)
- Mini leaderboard: top 10 countries, CR highlighted
- Interactive AI Global Timeline: clickable nodes expand to show description, CR implication, source link
- Partner bar (25 partners with Clearbit logos)

**Data visualizations:** RadarChart (CR/CHL/SGP), progress bars, stacked segment bars

---

### 4.2 Free Trade Zones (`FreeZonesPhysicalAI.jsx` → `ZF`)

**Features:**
- Hero stat grid: 626 companies, 265K jobs, $4.3B FDI, 28K BPO at risk, $2.90 ROI, 99% renewable
- Recharts Treemap: sector breakdown by employment
- Recharts AreaChart: FDI projections over time
- Competitiveness comparison table (CR vs competitors, horizontally scrollable)
- Labor Profile 2024 vs 2030 comparison
- 3 sector risk cards (Medical Devices LOW, Digital Services TRANSITION, Semiconductors STRATEGIC)
- Expandable AI Impact items
- Investment signals (CINDE, IBM, 3M, HPE, Microsoft, Establishment Labs)
- Government action recommendations

**CR-Specific:** PROCOMER 2024, CINDE stats, WEF displacement 41%, 28K BPO precariat

---

### 4.3 Physical AI (`FreeZonesPhysicalAI.jsx` → `PAI`)

**Features:**
- Humanoid cost curve AreaChart: Tesla Optimus $150K to $8K (2024-2030) vs CR annual wage $27K-$30K, crossover point ~2028
- Global robot shipments LineChart: IFR data 373K-640K units (2019-2025E)
- Real humanoid deployments table: Optimus/Tesla, Figure 02, Atlas/Boston Dynamics, Digit/Agility, 1X NEO, Phoenix/Sanctuary
- Labor transition scenarios with IVAS vulnerability scores: call centers 85, digital services 78, back office 72, electronics 62, medical devices 45
- PAI_NEWS expandable news cards
- Regional context: LATAM < 2% robot share, CR FZ wage $27K, 2028 crossover

---

### 4.4 SMEs / PYMES (`PymesAI.jsx`)

**Features:**
- CR SME landscape: 97% of businesses are SMEs
- Risk cards by severity (colored tags)
- Opportunities grid with impact tags
- Support Programs: MEIC, PROCOMER, INA, CAMTIC, IDB — each with visit links
- ENIA 2024-2027: 4 sub-cards (Reskilling, Digital Infrastructure, AI Center, 8,710 Businesses Digitized)
- AI Use Cases table: chatbots 62%, product creation 59%, employee training 50%, accounting ~40%, marketing ~35%
- Policy recommendations
- AI Readiness Snapshot: 50% use AI, 69% plan investment, +40% PYME growth YoY

---

### 4.5 Media Intelligence (`MediaIntelligence.jsx`)

**Features:**
- TikTok Video Intelligence section: 11 curated videos from WEF, CNN, CNBC, Bloomberg, FT
  - Desktop: iframe embeds (580px height)
  - Mobile: styled link cards with TikTok CTAs (iOS Safari compatibility)
  - Follow @colibrii.labs CTA

- News Feed:
  - Live GDELT API feed (last 72 hours) + curated landmark articles
  - 3 filter tabs: All / Costa Rica / International
  - Auto-category detection (security/policy/economy/education/tech) via keyword matching
  - Source logos: Clearbit CDN with fallback to colored letter-circles
  - CR domain detection: costa, tico, crhoy, nacion, financier, amelia
  - CR fallback: shows curated items when no live CR articles found

- VIP Quotes Reel:
  - Horizontally scrollable reel of global leader quotes
  - Left/right navigation arrows (300px scroll)
  - Photo with error fallback to gradient initials

---

### 4.6 Algorithms (`AlgoSecurityLeg.jsx` → `Algo`)

**Features:**
- All 10 proprietary algorithms from `ALGOS(en)`:
  - CAPI-CR (ACTIVE) — 6-dimension composite index
  - IVAS (DEV) — AI Sector Vulnerability Index with preview chart
  - TIPAI (DEV) — Physical AI Timeline Predictor
  - MBR (PLANNED) — Regulatory Gap Monitor
  - IPDM (PLANNED) — AI Impact & Displacement Monitor
  - CRES (PLANNED) — Costa Rica Energy-Security Nexus
  - FDIA (PLANNED) — Foreign Direct Investment AI Alignment
  - QVRI (PLANNED) — Quantum Vulnerability & Readiness Index
  - SIRI (PLANNED) — Societal Impact & Resilience Index
  - GERI (PLANNED) — Geoeconomic Exposure & Resilience Index
- Each card: name, full name, status tag, description, methodology, inputs, validation, sources
- IVAS has horizontal progress bar preview showing scenario values

---

### 4.7 Security (`AlgoSecurityLeg.jsx` → `SecTab`)

**Features:**
- 4 Security Domain cards: National, Cybersecurity, Food, Social (each with 3 mini-stats)
- Scroll-to sub-navigation (6 sections)
- 6 AI-Specific Threats: Prompt Injection (CRITICAL), Shadow AI (CRITICAL), MCP Exploits (EMERGING), Deepfakes (HIGH), AI Supply Chain (HIGH), AI Bioweapons (EMERGING)
- Priority Actions (6 items)
- Threat Deep Dives: expandable `<details>` with CR Implication + Mitigation
- AI Use Cases by Sector grid
- Food Security AI use cases
- Social Security AI: Opportunities + Risks
- Cybersecurity for SMEs: Challenges + Recommendations
- Priority Actions (Expanded): `<details>` per action with "Why" + International Comparison
- Future Outlook timeline with dots and year labels
- News & Cases: headline, significance, source links

**CR-Specific:** Conti 2022 ($30M/day), SOC-CR ($9.8M), IBM 24/7 (320+ staff), CCSS crisis, 55% food imports, 340 criminal orgs, 17.2 homicides/100K

---

### 4.8 Legislation (`AlgoSecurityLeg.jsx` → `Leg`)

**Features:**
- 7 global AI law cards: flag, name, status tag, description, "What CR Should Adopt"
- Expandable details per law: Key Dates timeline + CR Recommendations
- Key Terms (4): ley vinculante, marco antidesinfo, sandbox regulatorio, autoridad AI — each with What, Who Has Done It, Examples, CR Recommendation
- CR Readiness Checklist: 11 items, clickable expand, color-coded priority (CRITICAL/URGENT/HIGH/GREEN), checkmark status
- ENIA Gap Analysis: Strengths grid + Deficiencies (severity-tagged CRITICAL/HIGH/MEDIUM) + Recommended Improvements
- ENIA Country Comparison table (Country/Status/CR Gap, scrollable)

---

### 4.9 Education (`EduGlossaryAbout.jsx` → `Edu`)

**Features:**
- "First in Central America" highlight: MEP-Intel AI specialization, MICITT 4,000 enrolled month 1
- 8 CR AI Education Programs:
  - Intel AI For Youth (MEP+Intel, 14+ CTPs)
  - MICITT AI Courses (Cisco+U.Latina)
  - Elements of AI (U.Helsinki)
  - AWS Academy (U.Latina)
  - Samsung Innovation Campus (FUNDESTEAM)
  - Google AI Essentials (Spanish)
  - INA (flagged "NEEDS AI" — 13K IT grads/year, zero AI certification)
  - CENFOTEC AI Scholarships (PRONAE-funded)
- 4 International Benchmarks: Singapore IMDA, Estonia "Kratt" K-12, South Korea $2.4B, UK 2,500 scholarships
- WEF Top Skills 2025-2030 (6 skills ranked)

---

### 4.10 Glossary (`EduGlossaryAbout.jsx` → `Glos`)

**Features:**
- 55 AI terms from `GLOSSARY(en)`
- Live search by term text and definition
- Category filter pills (auto-generated): Colibrii, Security, Legislation, Economy, Trend, Ethics, Institution, Standards
- Live count display: "X terms"
- Accordion expand/collapse per term:
  - Definition
  - "COSTA RICA CONTEXT" block (cyan highlight)
  - Optional "Technical Detail" expandable (violet styling, 400-800 word deep dives)
- Color-coded left border by category

---

### 4.11 About (`EduGlossaryAbout.jsx` → `Abt`)

**Features:**
- "What is an AI Observatory?": 4-step data flow (25+ Sources -> 4 APIs -> 10 Algorithms -> 13 Views)
- Founder card: photo area, mission, contact (email, X, LinkedIn)
- Mission & Vision two-column card
- API Data Sources table (N sources with links, description, status color)
- Annual Data Sources grid
- Algorithm summary grid (N algorithms with color badges)
- Key Reports & Downloads (categorized WEF, Stanford, Oxford, OWASP links)
- Data Attribution & Licensing (9 sources with license types)
- Methodology & Transparency (zero cookies, zero tracking)

---

### 4.12 Index (`IndexCompareViews.jsx` → `Idx`)

**Features:**
- Region filter: all/latam/asia/eu
- 6 animated dimension cards: icon, name, weight %, CR score, expandable "What does this measure?" with indicator list + interpretation
- Methodology card
- WorldMapMini interactive map (click navigates to countries tab)
- RiskHeatmap component (12 countries x 6 dimensions, color-coded)
- Stacked horizontal BarChart (top 15 countries, D1-D6 stacked)
- Full leaderboard table: rank, flag, D1-D6 color-coded scores, composite, ScorePill status, CRI row highlighted

---

### 4.13 Compare (`IndexCompareViews.jsx` → `Compare`)

**Features:**
- Default selection: CRI, CHL, SGP
- 3 independent country selector grids (flag buttons for all 20 countries per slot)
- RadarChart overlay (3 radar series with different opacity/dash patterns)
- Dimension comparison table (rows=dimensions, columns=selected countries, color-coded)
- CAPI-CR composite row in bold
- Scroll hint for mobile

---

### 4.14 Countries (`CountryProfiles.jsx`)

**Features:**
- 20-country grid selector (grouped by region, flag + name buttons)
- Animated profile transition via `AnimatePresence`
- Country header: large flag, name, region, rank tag, ScorePill, MiniStat grid (Pop, GDP, CAPI, Region, HDI, Oxford AI)
- AI Overperformer block (CRI only): explanation, key factors, peer overperformers
- Dimension RadarChart: selected country vs Costa Rica (CR not shown when CR selected)
- 6 dimension score cards (animated numbers, green/amber/red)
- Governance Indicators: CPI, Freedom House, GPI, Oxford AI, HDI, V-Dem
- WEF 2026 EOS: top 5 risks with category tags, AI highlighted if present, blind-spot callout if absent
- AI Strategy card: strategy text, key institutions, "What CR Can Learn"
- Strengths & Weaknesses two-column
- Cross-tab navigation via `setSelectedCountry`

---

### 4.15 Policy Simulator (`PolicySimulator.jsx`)

**Features:**
- 6 range sliders (one per CAPI-CR dimension)
- Each slider styled with dimension accent color
- Shows actual score (gray) vs simulated score (colored)
- State initialized from `idx.CRI` actual scores
- Preset buttons from `SIM_PRESETS(en)`: apply absolute or relative changes
- Reset button restores actual CR scores
- Real-time weighted composite recalculation
- Simulated rank projection
- Score summary card: large 40px composite, delta indicator (triangle up/down), Actual vs Sim rank
- Radar overlay: actual (dashed gray) vs simulated (solid cyan)
- Dynamic interpretation text with score, rank, and policy lever analysis

---

### 4.16 UN Goals / SDGs (`SDGAIForGood.jsx`)

**Features:**
- Impact stats bar: 6 cards (SDGs, UN Agencies, Countries, Data Sources, APIs, Views)
- AI for Good categories: People/Planet/Prosperity (Prosperity tagged "Our Category")
- 8 SDG alignment cards (SDGs 4, 8, 9, 10, 11, 13, 16, 17): click to expand contribution + metric
- ITU Five Pathways: 5 numbered pathway steps, click to expand description, CR status, global context
- CR paradox card: 4 ProgressBars (Vision 100 green, Readiness 0.38 red, Laws 0 red, Renewable 99% green)
- UN Agencies table: 6 agencies (World Bank, UNESCO, UNDP, ILO, FAO, ITU) with Clearbit logos

---

### 4.17 ITU AI Readiness (`ITUReadiness.jsx`)

**Features:**
- Overview stats: 5 cards (CR Average, Global Average, 13 Dimensions, 6 Factors, 13 Findings)
- RadarChart: CR (cyan) vs Global Average (amber, toggleable via `showBenchmark` state)
- Dimension detail table: factor tag (8 colors), dimension name, CR%, Global%, Gap (green/red)
- Strengths vs Weaknesses auto-filtered
- CAPI-CR to ITU mapping table: shows coverage — "CAPI-CR covers 12 of 13 ITU dimensions"
- 13 Key Findings: expandable numbered list, click opens CR Implication block
- Digital Divide: ProgressBars (5G high income 84%, 5G low income 4%, Internet 55.6%, CR 83%, 2.6B offline)
- 5-stage Data Readiness Pipeline: Quality -> Representativeness -> Processing -> Fairness -> Trustworthy Deployment

---

### 4.18 Global Governance (`GlobalGovernance.jsx`)

**Features:**
- Context intro: EU AI Act first binding 2024, Peru first LATAM 2023, El Salvador 2025, CR zero
- Overview stats: 4 cards (Countries, Laws Enacted, In Development, LATAM Countries)
- Region filter: All/Europe/Asia-Pacific/Americas
- Governance table: flag, country, status, category tag (comprehensive/enacted/framework/sandbox/developing/none), year, investment
- LATAM Focus: vertical timeline chronological by year, CR highlighted red
- AI Investment Comparison: horizontal ProgressBars, CR at bottom with "~$0 dedicated"
- AI Trajectory Timeline: 4 phases (Present/Near-term/Medium-term/Future)
- Policy Recommendations

**CR highlighted in red throughout with zero-investment callout**

---

### 4.19 Impact Showcase (`ImpactShowcase.jsx`)

**Features:**
- Observatory Impact Dashboard: 12-stat mini-grid (Countries 20, Views, Algorithms, Sources, APIs, Glossary, SDGs, UN Agencies, Languages, Risk Dims, WEF Horizons, Uptime 99.9%)
- AI for Good Impact Awards: 5 criteria cards (Innovation, Impact, Sustainability, Ethics, Relevance) with observatory credentials
- 2025 Award Winners Benchmarking: expandable cards (What/Metric/Partners), Colibrii self-comparison
- Case Study: CR 100/100 vs 0.38 paradox, "Who Uses" + "What It Reveals"
- Methodology Credibility: 4 cards (CAPI-CR, Real-Time Data, ITU Alignment, Transparency)
- Collaboration CTA: 4 partnership types (Institutions, Media, Academia, Private Sector) + email

---

### 4.20 Food Security (`FoodSecurity.jsx`)

**Features:**
- 5 KPI cards: 2.3B food insecure, $400B wasted/yr, 40% crops lost, 84% smallholder, 10B by 2050
- Precision Agriculture: 4 cards (Crop Monitoring, Pest Detection, Smart Irrigation, Yield Prediction)
- Livestock & Aquaculture: 3 stat boxes (14.5% GHG, $1.4T sector, 1B+ livelihoods)
- 4 Case Studies (expandable): FAO LEAP Navigator, Farmer.Chat/Digital Green (250K+ farmers), FAO Hand-in-Hand (65+ countries), SmartCatch/WorldFish
- CR Connection: 4 cards (MAG & Coffee AI [93K ha], Banana & Pineapple [$200M+ potential], Edge AI rural, SENASA food safety)
- Key Considerations: Co-design with Farmers, Data Interoperability, Fair Access, Climate Resilience

**Sources:** ITU AI for Good 2025, FAO, World Bank, PROCOMER

---

### 4.21 Health & AI (`HealthAI.jsx`)

**Features:**
- 5 KPI cards: $504B market 2032, 94% orgs using AI, 97% breast cancer detection, 90% drug candidates fail, 3x stroke recovery
- Diagnostics: 4 cards (Cancer Screening, Medical Imaging, Multimodal, Remote Monitoring)
- Drug Discovery: 3 stat boxes (90% failure, 50% faster C2itech, $2.6B avg drug cost)
- 4 Case Studies (expandable): NHS Stroke AI UK (107 centres, 16% to 48% recovery), MamaMate (offline solar, rural Africa), C2itech Organoid (50% faster, 90% accuracy), Cedars-Sinai Connect (42K patients, 77% optimal)
- CR Connection: 4 cards (CCSS+EDUS [8+ years, largest Central American health dataset], Federated Learning [privacy solution], Post-Hive Cybersecurity [2022 ransomware], CCSS Fiscal Reality [$4.4B debt])
- Key Considerations: Clinical Validation, Data Privacy, Algorithmic Bias, Human-in-the-Loop

**Sources:** ITU AI for Good 2025, WHO, NHS England, Cedars-Sinai, CCSS

---

### 4.22 Infrastructure & Smart Cities (`InfraSmartCities.jsx`)

**Features:**
- 5 KPI cards: 56% cities using AI, 48% widespread in 3yr, $460B disaster losses by 2050, 20%+ digital twin savings, 70% urban by 2050
- Digital Twins: 3 stat boxes (36 tCO2/city, 20%+ fuel savings, $70B AI hazard savings)
- Traffic & Mobility: 4 cards (Computer Vision Traffic, Autonomous Mobility, Predictive Maintenance, Public Transit AI)
- 4 Case Studies (expandable): Deloitte India Waste Twin (20%+ fuel, 36 tCO2), Raleigh NC Vision Zero NVIDIA (100+ cameras), GIRI CDRI (4 countries probabilistic risk), Beijing Yizhuang Autonomous
- CR Connection: 4 cards (GAM Traffic [$500M+/yr], 99% Renewable Grid [ICE optimization], SINPE as DPI [smart government], Disaster Vulnerability [CNE + AI early warning])
- Key Considerations: Data Quality, Ethical Surveillance, Urban Digital Divide, Community Engagement

**Sources:** ITU, CDRI, Deloitte India, NVIDIA, UN Habitat, Raleigh NC

---

### 4.23 Environmental Sustainability (`EnvironmentalAI.jsx`)

**Features:**
- 6 KPI cards: $4T needed annually, 1.8 GtCO2 reducible, 5.4 GtCO2 by 2035, $70B hazard savings, 1M species at risk, 1% energy patents+AI
- Biodiversity Monitoring: 4 cards (Camera Traps+AI, Acoustic Monitoring, Satellite+eDNA, Anti-Poaching AI)
- Energy & Grid Optimization: 3 stat boxes (20% load factor, $110B savings, 175 GW unlockable)
- Early Warning Systems: UN "Early Warnings for All" 2027, $70B/yr savings, 30+ partners
- 4 Case Studies (expandable): DeepINDRA India (40M ha, $28.1B/yr), Dominican Republic Climate Simulator (CDRI), Danish EPA AI Permitting, Overstory (satellite wildfire)
- CR Connection: 4 cards (99% Renewable Energy [hydroelectric AI, 8% transmission losses], Biodiversity Hotspot [5% of species on 0.03% of land], Climate Vulnerability [CNE + early warning], Carbon Neutrality 2050 [AI monitoring])
- Key Considerations: AI Energy Footprint (626K lbs CO2), Digital Divide, Data Accessibility, Inclusive Governance

**Sources:** ITU AI for Good 2025, CDRI, UNEP, IEA, IUCN, Overstory, SINAC CR

---

## 5. Data Architecture

### 5.1 Theme Tokens

**Light theme (`TH`):**
| Token | Value | Usage |
|-------|-------|-------|
| `bg` | `#f8f9fc` | Page background |
| `sf` | `#eef1f8` | Surface/card area |
| `sf2` | `#e2e7f0` | Secondary surface |
| `bd` | `#d1d5e0` | Border |
| `bd2` | `#b8bfcc` | Secondary border |
| `tx` | `#0f172a` | Primary text |
| `tx2` | `#475569` | Secondary text |
| `tx3` | `#94a3b8` | Tertiary text |
| `cy` | `#2563eb` | Cyan/Blue accent |
| `vi` | `#6366f1` | Violet accent |
| `pk` | `#ec4899` | Pink accent |
| `am` | `#f59e0b` | Amber accent |
| `rd` | `#ef4444` | Red accent |
| `gn` | `#10b981` | Green accent |
| `or` | `#f97316` | Orange accent |
| `navy` | `#1a365d` | Navy |
| `gd` | `#c9a84c` | Gold |
| `cardBg` | `#ffffff` | Card background |

**Dark theme (`TH_DARK`):** All shifted to deep navy background (`#0a0f1e`), slate surfaces, brighter accents.

### 5.2 Country Data (`CO` — 20 Countries)

| Code | Name | Region | Notable Fact |
|------|------|--------|--------------|
| SGP | Singapore | asia | #1 AI readiness global |
| KOR | South Korea | asia | AI Framework Act 2026 |
| JPN | Japan | asia | AI overperformer, robotics leader |
| EST | Estonia | eu | #1 digital government |
| FIN | Finland | eu | 1% population AI-educated |
| IRL | Ireland | eu | European tech hub, FDI model |
| CHL | Chile | latam | LATAM AI leader |
| URY | Uruguay | latam | Plan Ceibal, high digitalization |
| CRI | Costa Rica | latam | AI Overperformer (World Bank) |
| PAN | Panama | latam | Logistics hub, dollarized |
| BRA | Brazil | latam | Largest LATAM economy, PL 2338 |
| COL | Colombia | latam | Direct nearshoring competitor |
| MEX | Mexico | latam | Nearshoring leader, 130M market |
| ARG | Argentina | latam | Tech talent, AI startups |
| PER | Peru | latam | Emerging economy |
| DOM | Dominican Republic | latam | Direct FDI competitor |
| VNM | Vietnam | asia | Manufacturing, 30-50% lower costs |
| PHL | Philippines | asia | $38B IT-BPM, 1.82M BPO |
| MYS | Malaysia | asia | AI overperformer, semiconductors |
| IDN | Indonesia | asia | AI overperformer, 270M market |

Each country has: `n` (ES name), `e` (EN name), `f` (flag emoji), `r` (region), `w` (fact), `pop`, `gdp`, `cont`

### 5.3 World Bank Indicators (`IND_MAP` — 11 Indicators)

| Code | Label | Dimension | Inverted? |
|------|-------|-----------|-----------|
| IT.NET.USER.ZS | Internet users (%) | D1 | No |
| IT.NET.BBND.P2 | Fixed broadband/100 | D1 | No |
| SE.TER.ENRR | Tertiary enrollment (%) | D2 | No |
| SE.XPD.TOTL.GD.ZS | Education spending (%GDP) | D2 | No |
| SL.UEM.TOTL.ZS | Unemployment (%) | D2 | Yes |
| GB.XPD.RSDV.GD.ZS | R&D spending (%GDP) | D3 | No |
| TX.VAL.TECH.MF.ZS | Hi-tech exports (%manuf) | D3 | No |
| BX.KLT.DINV.WD.GD.ZS | FDI (%GDP) | D3 | No |
| EG.ELC.ACCS.ZS | Electricity access (%) | D5 | No |
| EG.ELC.RNWX.ZS | Renewable electricity (%) | D5 | No |
| EG.USE.ELEC.KH.PC | Electric consumption kWh/cap | D5 | No |

### 5.4 CAPI-CR Dimensions (`DM` — 6 Dimensions)

| Key | Name | Weight | Color | Indicators |
|-----|------|--------|-------|------------|
| D1 | Digital Infrastructure | 20% | #2563eb | IT.NET.USER.ZS, IT.NET.BBND.P2 |
| D2 | Human Capital | 20% | #6366f1 | SE.TER.ENRR, SE.XPD.TOTL.GD.ZS, SL.UEM.TOTL.ZS |
| D3 | Innovation | 15% | #f59e0b | GB.XPD.RSDV.GD.ZS, TX.VAL.TECH.MF.ZS, BX.KLT.DINV.WD.GD.ZS |
| D4 | AI Regulation | 15% | #ef4444 | Curated scores (CUR) |
| D5 | Sustainable Energy | 15% | #10b981 | EG.ELC.ACCS.ZS, EG.ELC.RNWX.ZS, EG.USE.ELEC.KH.PC |
| D6 | Digital Security | 15% | #ec4899 | Curated scores (CUR) |

### 5.5 Governance Data (`GOV` — 6 Indicators)

| Key | Source | Description |
|-----|--------|-------------|
| `cpi` | Transparency International | Corruption Perception Index |
| `fh` | Freedom House | Democracy score |
| `gpi` | Institute for Economics & Peace | Global Peace Index |
| `oxai` | Oxford Insights | AI Readiness score |
| `hdi` | UNDP | Human Development Index |
| `vdem` | V-Dem Institute | Democracy quality score |

### 5.6 WEF 2026 Risk Data

- `immediate` — 2026 (10 risks with percentages)
- `shortTerm2028` — Ranked 1-10 with delta arrows
- `longTerm2036` — Ranked 1-10
- `keyFindings` — 30+ data points including: AI market $280B to $3,500B, 86% companies transform by 2030, 170M jobs created, 92M displaced, 78M net positive, AI uses 4,600x more energy, 53% quantum experts expect RSA-2048 broken within a decade

### 5.7 EOS Risks — 16 Countries

Top-5 business leader risks per country (WEF Executive Opinion Survey). CR's top risk: "Crime and illicit economic activity." Vietnam's #1: "Adverse outcomes of AI technologies."

### 5.8 10 Proprietary Algorithms

| Name | Full Name | Status |
|------|-----------|--------|
| CAPI-CR | Colibrii AI Preparedness Index | ACTIVE |
| IVAS | AI Sector Vulnerability Index | DEV |
| TIPAI | Physical AI Timeline Predictor | DEV |
| MBR | Regulatory Gap Monitor | PLANNED |
| IPDM | AI Impact & Displacement Monitor | PLANNED |
| CRES | Costa Rica Energy-Security Nexus | PLANNED |
| FDIA | Foreign Direct Investment AI Alignment | PLANNED |
| QVRI | Quantum Vulnerability & Readiness Index | PLANNED |
| SIRI | Societal Impact & Resilience Index | PLANNED |
| GERI | Geoeconomic Exposure & Resilience Index | PLANNED |

Each has: methodology, inputs, validation, sources. Formulas/weights deliberately not exposed (trade secret protection).

### 5.9 TABS Array (23 entries)

| ID | Label ES | Label EN | Icon | Color |
|----|----------|----------|------|-------|
| home | Inicio | Home | home | #2563eb |
| media | Medios | Media | video | #ec4899 |
| idx | Indice | Index | chart | #6366f1 |
| cmp | Comparar | Compare | compare | #ec4899 |
| countries | Paises | Countries | globe | #10b981 |
| sim | Simulador | Simulator | target | #f59e0b |
| zf | Zonas Francas | Free Trade Zones | factory | #f59e0b |
| pai | Physical AI | Physical AI | robot | #ec4899 |
| algo | Algoritmos | Algorithms | algo | #6366f1 |
| sec | Seguridad | Security | shield | #ef4444 |
| leg | Legislacion | Legislation | legal | #f97316 |
| edu | Educacion | Education | edu | #10b981 |
| glos | Glosario | Glossary | book | #2563eb |
| about | Info | About | info | #6366f1 |
| pymes | PYMES | SMEs | store | #f97316 |
| sdg | Objetivos ONU | UN Goals (SDGs) | globe | #10b981 |
| readiness | Preparacion AI | AI Readiness | chart | #2563eb |
| governance | Gobernanza Global | Global Regulation | legal | #f97316 |
| showcase | Vitrina Impacto | Impact Showcase | star | gold |
| food | Seguridad Alimentaria | Food Security | wheat | #10b981 |
| health | Salud & AI | Health & AI | heart | #ec4899 |
| infra | Infraestructura | Infrastructure | city | #2563eb |
| climate | Medio Ambiente | Environment | leaf | #10b981 |

### 5.10 Glossary (55 Terms)

Categories: Trend, Technical, Security, Legislation, Economy, Ethics, Institution, Policy, Standards, Colibrii

All terms bilingual with CR context. Many include `deep` field with 400-800 word technical deep dives. Examples: Physical AI, Vibe Coding, LLM, Prompt Injection, Shadow AI, RAG, AI Agent, Deepfake, EU AI Act, Zero-Day, Nearshoring, MCP, Digital Twin, Hallucination, OWASP Top 10 LLM, Foundation Model, Algorithmic Bias, Zona Franca, CCSS, PROCOMER, Regulatory Sandbox, NIST AI RMF, Conti, EDUS, XAI, ENIA, CAPI-CR, IVAS, Token, AI Governance, Fine-tuning, AI Safety, Small AI, AI Precariat, Transformer, Agentic AI, K-shaped Economy, Polycrisis, Geoeconomic Confrontation, Misinformation, Post-Quantum Cryptography, Federated Learning, Edge AI, Multimodal AI, AI Alignment, Responsible AI, AI Blind Spot, UNESCO RAM, ITU AI Readiness, SDG, SIRI, QVRI, GERI, TIPAI

### 5.11 Other Major Data Exports

| Export | Description |
|--------|-------------|
| `PARTNERS` | 25 data partner names |
| `COUNTRY_RATIONALE(en)` | Why these 20 countries (5 groups) |
| `RADAR_RATIONALE(en)` | Why CRI+CHL+SGP comparison |
| `WEF_RESOURCES(en)` | Reports with URLs |
| `TIMELINE(en)` | Historical AI legislation timeline |
| `COUNTRY_PROFILES(en)` | Deep per-country profiles |
| `CHECKLIST(en)` | 11-item AI readiness checklist |
| `SIM_PRESETS(en)` | Policy simulator presets |
| `LAWS(en)` | AI legislation entries |
| `API_SOURCES(en)` | Live API sources |
| `ANNUAL_SOURCES` | Annual report sources |
| `SOCIAL` | Social media links |
| `VIP_QUOTES(en)` | Expert quotes |
| `NEWS_CATEGORIES` | News category definitions |
| `CURATED_NEWS` | Curated news items |
| `CR_FALLBACK_NEWS` | Fallback CR news |
| `FZ_DEEP(en)` | Deep free zones content |
| `PYMES_DEEP(en)` | Deep SME AI content |
| `SEC_DEEP(en)` | Deep security content |
| `LEG_JARGON(en)` | Legislation jargon glossary |
| `ENIA_ANALYSIS(en)` | ENIA 5-pillar gap analysis |
| `PAI_NEWS(en)` | Physical AI news items |
| `A3_TO_A2` | ISO country code mapping |
| `TIKTOK_VIDEOS` | TikTok video IDs |
| `PARTNER_LOGOS` | Clearbit logo CDN mapping |
| `SDG_ALIGNMENT(en)` | 8 SDG alignments |
| `FIVE_PATHWAYS(en)` | 5 AI-SDG pathways |
| `ITU_DIMENSIONS(en)` | 13 ITU readiness dimensions |
| `ITU_FINDINGS(en)` | ITU findings for CR |
| `GLOBAL_AI_GOVERNANCE(en)` | Global governance data |
| `AWARD_WINNERS_2025(en)` | AI for Good award winners |
| `OBSERVATORY_IMPACT` | Observatory impact metrics |
| `AI_TRAJECTORY(en)` | AI development trajectory |
| `CAPI_ITU_MAPPING(en)` | CAPI-CR to ITU mapping |
| `AI_OVERPERFORMER_CONTEXT(en)` | WB Overperformer classification |

---

## 6. UI Component Library

**File:** `components/ui.jsx`

### 6.1 Animation Variants (exported)

| Export | Effect |
|--------|--------|
| `fadeUp` | opacity 0 to 1, y 30 to 0, 0.5s |
| `fadeIn` | opacity 0 to 1, 0.4s |
| `scaleIn` | opacity + scale 0.95 to 1, 0.4s |
| `stagger` | staggerChildren: 0.06 |
| `slideIn` | opacity + x -20 to 0, 0.4s |
| `tabVariants` | Tab transitions (y 12 to 0 to -8) |

### 6.2 All Components

| Component | Props | Description |
|-----------|-------|-------------|
| `AN` | `v, p=0, s="", d=0` | Animated Number. Cubic ease-out counter, 1200ms. Shows "---" for null. `v`=target value, `p`=decimal places, `s`=suffix, `d`=delay ms |
| `ScrollReveal` | `children, delay=0, threshold=0.1` | IntersectionObserver-triggered CSS `scroll-reveal` class, fires once |
| `Card` | `children, d=0, accent, style, onClick, className` | Framer Motion card. `whileInView="visible"`, `whileHover={y:-2}`, optional accent top border (4px colored bar). Clickable if `onClick` provided. `d`=delay |
| `Bx` | `children, style` | Lightweight box. `var(--surface)` bg, 10px radius, 12px padding |
| `SH` | `color, label, title, desc` | Section Header. Mono uppercase label + Playfair Display h2 + body text |
| `Stat` | `value, label, sub, color, prefix, precision=2, icon, onClick` | Large mono number via AN + label + subtitle. Clickable shows "more info" hint |
| `Tag` | `children, color` | Pill badge. IBM Plex Mono, 20px radius, color with 12% bg + 30% border |
| `Ci` | `s` | Citation line: "SOURCE: {s}" in 10px mono |
| `Lnk` | `href, children` | External link, new tab, arrow icon |
| `Sk` | `w="100%", h=16, r=8` | Skeleton shimmer placeholder |
| `LoadCard` | (none) | Card skeleton (title + 2 body lines) |
| `Grid` | `children, cols="1fr 1fr", gap=12, style, className` | CSS Grid helper. Auto-applies `.mobile-grid-1` class for responsive stacking |
| `Traffic` | `score` | Traffic light dot. Green >= 0.65, amber >= 0.40, red below. Has glow effect |
| `ProgressBar` | `value, max=1, color, height=6` | Animated bar, 1.2s cubic ease transition |
| `PartnerBar` | `items, en, showLogos=true` | Partner pills with optional Clearbit logos |
| `MiniStat` | `label, value, color, mono` | Compact: 9px label + 14px value |
| `TabContent` | `id, children` | Tab wrapper with Framer Motion tabVariants |
| `DimBadge` | `dim, en` | CAPI-CR dimension icon + name + weight badge |
| `CountryLabel` | `co, en, size="sm", alpha2` | Flag + country name |
| `EmptyState` | `icon, title, desc` | Centered empty state |
| `Tooltip` | `children, text` | CSS hover tooltip (positioned above) |
| `ScorePill` | `score, en` | Tag with READY/AT RISK/DEFICIT label, color by score |
| `Flag` | `code, size=20, style` | Twemoji CDN SVG flag with emoji fallback, lazy loading |
| `ExportBtn` | `onClick, en, label` | Export/download button with arrow |

---

## 7. Icon System

**File:** `components/system/Icon.jsx`

All icons: custom SVG, 24x24 viewBox, strokeWidth 1.8, strokeLinecap round, strokeLinejoin round.

**Usage:** `<Icon name="home" size={16} color="#2563eb" />`

### Complete Icon List (37 icons)

| Name | Visual | Primary Usage |
|------|--------|--------------|
| `home` | House with roof and door | Home tab |
| `chart` | Bar chart with axes | Index, data views |
| `compare` | Double arrows (left/right) | Compare view |
| `globe` | Earth with meridians | Countries, SDGs |
| `target` | Bullseye (3 circles) | Simulator |
| `factory` | Industrial building | Free zones |
| `store` | Storefront | PYMES/SMEs |
| `robot` | Rectangle head with eyes | Physical AI |
| `algo` | 2x2 grid of squares | Algorithms |
| `shield` | Shield with checkmark | Security |
| `legal` | Balance scale | Legislation |
| `edu` | Graduation mortarboard | Education |
| `book` | Open book | Glossary |
| `info` | Circle with i | About |
| `diamond` | Rotated square | Stat badge |
| `lightning` | Lightning bolt | Stat badge |
| `coins` | Overlapping circles | Economy |
| `menu` | Hamburger (3 lines) | Mobile nav |
| `x` | X cross | Close buttons |
| `sun` | Sun with rays | Light mode |
| `moon` | Crescent moon | Dark mode |
| `lang` | Letter-A style | Language |
| `copy` | Two overlapping rectangles | Copy/cite |
| `arrowRight` | Right arrow with chevron | Navigation |
| `twitter` | X (Twitter) logo | Social |
| `instagram` | Instagram square + circle | Social |
| `linkedin` | LinkedIn logo | Social |
| `mail` | Envelope | Contact |
| `chevronDown` | Chevron down | Accordion |
| `externalLink` | Box with arrow | External URLs |
| `video` | Camera with film strip | Media tab |
| `star` | 5-point star | Impact showcase |
| `radar` | Radar crosshair circles | Radar chart |
| `leaf` | Leaf with stem | Environment |
| `heart` | Heart shape | Health AI |
| `city` | Two buildings | Infrastructure |
| `wheat` | Wheat stalks | Food security |

---

## 8. CSS Architecture & Theming

**File:** `app/globals.css` (~1,900 lines)

### 8.1 CSS Custom Properties (Light Theme)

**Colors:** `--bg`, `--surface`, `--surface2`, `--card`, `--border`, `--border2`, `--text`, `--text2`, `--text3`, `--cyan`, `--violet`, `--pink`, `--amber`, `--red`, `--green`, `--orange`, `--navy`, `--gold`

**Radii:** `--radius: 14px`, `--radius-sm: 10px`, `--radius-xs: 6px`

**Shadows:** `--shadow`, `--shadow-md`, `--shadow-lg`, `--shadow-glow` (blue glow)

**Gradients:** `--grad1` (cyan-violet-pink), `--grad2` (violet-pink-amber), `--hero-bg` (4-stop iridescent), `--orb-cyan/violet/pink` (radial glows)

**Spacing:** `--space-xs: 8px`, `--space-sm: 12px`, `--space-md: 20px`, `--space-lg: 32px`, `--space-xl: 48px`

### 8.2 Dark Theme Override

`[data-theme="dark"]` overrides all variables: deep navy backgrounds, slate surfaces, brighter accents, higher contrast shadows. Includes Recharts-specific overrides for grid lines and tooltip backgrounds.

### 8.3 Keyframe Animations (20+)

| Animation | Effect | Duration |
|-----------|--------|----------|
| `meshGradient` | 4-position background mesh | 20s |
| `shimmer` | Left-to-right shimmer | 200% width |
| `borderShimmer` | Border gradient oscillation | — |
| `reveal` | Fade up (y+30, opacity) | — |
| `revealScale` | Scale 0.95 to 1 + fade | — |
| `fadeIn` | Pure opacity | — |
| `float` | translateY 0 to -6px loop | 50% |
| `pulse` | Opacity 1 to 0.4 to 1 | — |
| `slideIn` | x -12 to 0 + fade | — |
| `countUp` | scale 0.85 to 1 + fade | — |
| `orbFloat1` | Complex translate + scale | 15s |
| `orbFloat2` | Offset translate + scale | 18s |
| `gradientText` | Background-position animate | — |
| `skeleton` | Shimmer at 200% width | 1.5s |
| `slideUp` | y +40 to 0 + fade | — |
| `scaleIn` | Scale 0.9 to 1 + fade | — |
| `typewriter` | Width 0 to 100% | — |
| `blink` | Cursor blink | — |
| `glow` | Box-shadow blue pulse | — |
| `livePulse` | Scale 1 to 1.8 + fade (live dot) | — |
| `rotateGradient` | 0 to 360 deg rotation | — |
| `iridescent` | Hue-rotate + brightness (logo) | — |
| `mkt-float` | Ambient marketing dot float | — |
| `scrollHintPulse` | Opacity + x translate pulse | — |

### 8.4 CSS Class System

**Cards:** `.card` (14px radius, 24px padding, hover lift + shimmer border), `.card-accent`, `.glass-header` (backdrop-filter blur 20px), `.gradient-text`

**Portal layout:** `.portal-layout` (grid 220px 1fr), `.portal-sidebar-desktop` (fixed 220px), `.portal-sidebar-mobile` (fixed 260px, z-200), `.portal-main`, `.portal-topbar`, `.portal-content` (max-width 1100px), `.portal-footer`, `.portal-mobile-header`

**Navigation:** `.portal-sidebar-group`, `.portal-sidebar-item`, `.nav-pill`, `.bottom-nav` (56px), `.bottom-nav-item`

**Indicator drawer:** `.indicator-drawer` (fixed right, 400px, z-1000), `.indicator-drawer-backdrop` (blur)

**Marketing:** Full `.mkt-*` namespace (root, header, hero, credibility, pillars, audience, highlight, final-cta, footer)

**Tables:** `.data-table`, `.table-scroll-wrapper`, `.scroll-hint` (mobile pulse animation)

**Utility classes:** `.font-mono`, `.font-display`, `.text-center`, `.flex`, `.flex-col`, `.gap-2/3/4`, `.w-full`, `.truncate`

### 8.5 Responsive Breakpoints

| Breakpoint | Changes |
|-----------|---------|
| 900px | Portal content padding reduced to 20px 16px |
| 768px | Single column portal, sidebar hidden, mobile header/bottom nav shown, `.mobile-grid-1` forces 1fr, `.mobile-grid-2` forces 2 columns |
| 480px | `.hide-xs` active, font-size 16px |

### 8.6 Special Media Queries

| Query | Effect |
|-------|--------|
| `@media print` | Hides nav, animations, shadows |
| `@media (prefers-reduced-motion: reduce)` | Disables all animations, restores scroll-reveal |

---

## 9. API Integrations

### 9.1 World Bank API

**Endpoint:** `https://api.worldbank.org/v2/country/{codes}/indicator/{ind}?format=json&per_page=500&date=2018:2024&source=2`

**Behavior:**
- Fetches 11 indicators for 20 countries in parallel via `Promise.allSettled`
- Takes latest year's value per indicator per country
- Cached in `sessionStorage` for 30 minutes (key: `clb_wb_data`)
- Individual indicator failures don't block others

### 9.2 GDELT Project API

**Endpoint:** `https://api.gdeltproject.org/api/v2/doc/doc?query="artificial+intelligence"+"costa+rica"&mode=artlist&maxrecords=24&format=json&sort=datedesc&timespan=7d`

**Behavior:** Up to 24 AI+CR news articles from last 7 days, auto-category detection

### 9.3 Exchange Rate API

**Endpoint:** `https://open.er-api.com/v6/latest/USD`
**Behavior:** Extracts `rates.CRC`, displayed with +/-3 buy/sell spread

### 9.4 World Atlas TopoJSON (for WorldMapMini)

**Endpoint:** `https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json`
**Behavior:** Client-side fetch, rendered with react-simple-maps

---

## 10. CAPI-CR Scoring Methodology

### Pipeline

1. **Fetch** — World Bank API: 11 indicators x 20 countries via Promise.allSettled
2. **Extract** — Latest year value per indicator per country
3. **Normalize** — Min-max normalization across 20-country peer set (`mm()` function)
4. **Invert** — Inverted indicators (unemployment: lower = better)
5. **Aggregate** — Average member indicators into 6 dimensions (D1-D6)
6. **Inject** — Replace D4 and D6 with expert-curated scores from `CUR`
7. **Composite** — Weighted sum: D1(20%) + D2(20%) + D3(15%) + D4(15%) + D5(15%) + D6(15%)
8. **Rank** — Sort 20 countries by composite, assign ranks 1-20
9. **Cache** — Store in sessionStorage (30-min TTL)

### Score Interpretation

| Score Range | Label (EN) | Label (ES) | Color |
|------------|-----------|-----------|-------|
| >= 0.65 | READY | PREPARADO | Green |
| 0.40 - 0.64 | AT RISK | EN RIESGO | Amber |
| < 0.40 | DEFICIT | DEFICIT | Red |

### Why D4 and D6 Are Curated

No reliable, standardized World Bank indicators exist for:
- D4 (AI Regulation quality): requires legislative analysis
- D6 (Digital Security posture): requires OWASP/ITU framework assessment

These are periodically updated based on expert analysis.

---

## 11. Supporting Components

### 11.1 WorldMapMini (`components/WorldMapMini.jsx`)

- **Library:** react-simple-maps (ComposableMap, Geographies, Geography, Marker)
- **Projection:** Natural Earth 1, scale 160, center [10, 5]
- **Features:** 20 tracked countries colored by CAPI-CR tier; non-tracked countries gray; pulsing dot markers at country centroids (CR larger); tooltip with flag, name, score, rank, tier; click navigates to country profile
- **Legend:** 3 dots (green >= 65, amber 40-64, red < 40)

### 11.2 RiskHeatmap (`components/RiskHeatmap.jsx`)

- Pure CSS Grid (zero chart libraries)
- 8 columns: rank, country, D1-D6 dimension scores
- 12 countries from leaderboard
- Color scale: blue >= 0.75, green >= 0.65, amber >= 0.50, orange >= 0.35, red < 0.35
- Hover highlights row
- CR row in bold cyan
- 3 what-if scenario cards embedded

### 11.3 NewsSection (`components/NewsSection.jsx`)

- News/Video mode toggle
- GDELT feed with 3 tabs (All/CR/International)
- Category detection via keyword matching
- Source logos: Clearbit CDN with letter-circle fallback
- CR domain matching: costa, tico, crhoy, nacion, financier, amelia

### 11.4 TikTokEmbed (`components/TikTokEmbed.jsx`)

- 11 curated videos (WEF x5, CNN, CNBC, Bloomberg x2, FT)
- Hybrid rendering: iframe on desktop, styled link cards on mobile (iOS Safari fix)
- Brand colors per source
- Follow @colibrii.labs CTA

---

## 12. Public Assets & SEO

### 12.1 Public Assets

| File | Type | Purpose |
|------|------|---------|
| `favicon.svg` | SVG (64px) | Hummingbird with data dots, iridescent gradients |
| `og-image.svg` | SVG (1200x630) | Social preview with 4 stat badges, brand colors |
| `colibrii-logo.png` | PNG (512px) | Brand logo, PWA icon |
| `costa-rica-hero.jpg` | JPEG | Hero image for landing page |
| `manifest.json` | JSON | PWA manifest (standalone, es, theme #0ea5e9) |
| `robots.txt` | Text | Allow all, crawl-delay 1 |
| `sitemap.xml` | XML | 2 URLs with ES/EN/x-default hreflang |

### 12.2 SEO Implementation

| Feature | Details |
|---------|---------|
| JSON-LD Schema | 4-node @graph: WebApplication, ResearchOrganization, Dataset (CAPI-CR, CC BY-NC 4.0, 2018-2026), FAQPage (5 Q&As) |
| Open Graph | es_CR locale, en_US alternate, 1200x630 SVG image |
| Twitter Card | summary_large_image |
| Canonical | https://colibriilabs.ai |
| Hreflang | ES + EN + x-default alternates |
| Meta Keywords | 52 targeted keywords |
| RSS Feed | /api/rss — RSS 2.0, PAI + WEF + GDELT, 1h CDN cache |
| Fonts | Inter, Playfair Display, IBM Plex Mono (via next/font) |

### 12.3 RSS Feed (`app/api/rss/route.js`)

- **Endpoint:** GET /api/rss
- **Content:** PAI news (5) + WEF items (2) + GDELT live (5, 5s timeout)
- **Cache:** s-maxage=3600, stale-while-revalidate=600
- **XML safety:** Entity escaping + CDATA wrapping

---

## 13. Configuration & Security

### 13.1 Next.js Config (`next.config.mjs`)

**Optimizations:**
```
optimizePackageImports: ['recharts', 'framer-motion', 'react-simple-maps']
```

**Caching headers:**
- Static assets: `public, max-age=31536000, immutable`

**Security headers (all routes):**
- Content-Security-Policy (restrictive, allows only required origins)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin
- X-XSS-Protection: 1; mode=block
- Permissions-Policy: camera=(), microphone=(), geolocation=()

### 13.2 CSP Allowed Origins

TikTok scripts/frames, Google Fonts, World Bank API, GDELT, Exchange Rate API, REST Countries, WHO GHO API, OECD SDMX, FAO SDMX, ITU datahub, UNESCO databrowser, GitHub API, jsDelivr CDN, Clearbit logos

### 13.3 Dependencies

**Production (8):** next, react, react-dom, framer-motion, recharts, react-simple-maps, @vercel/analytics, @vercel/speed-insights

**Development (2):** eslint, eslint-config-next

### 13.4 Privacy

- Zero cookies at any point
- Zero user tracking
- Zero data collection
- localStorage: only `clb_lang`, `clb_theme` (user preferences)
- sessionStorage: only `clb_wb_data` (API cache, 30-min TTL)

---

## 14. Error Handling

### 14.1 Global Error Boundary (`app/error.js`)

- Lightning icon, "Something went wrong"
- "Try Again" (calls reset()) + "Return to Home"
- White card on light background

### 14.2 Portal Error Boundary (`app/(portal)/app/error.js`)

- Microscope icon, "Observatory Temporarily Unavailable"
- Shows `error.message` in red mono box
- Theme-aware (uses CSS variables)
- "Reload Observatory" button

### 14.3 Loading Skeleton (`app/(portal)/app/loading.jsx`)

- Matches portal layout (sidebar + main)
- Sidebar skeleton: circle + text lines + 4 nav groups
- Main content: 6-card responsive grid with shimmer animation

### 14.4 API Error Handling

- `Promise.allSettled` — individual API failures don't block others
- `dataWarning` state shows dismissible banner listing failed APIs
- GDELT failure: portal continues without live news
- Exchange Rate failure: rate display hidden

---

## 15. Recent Additions: AI for Good Integration

### 15.1 What Was Added (February 2026)

**4 new sectoral IMPACT tabs:**
- Food Security (`FoodSecurity.jsx`)
- Health & AI (`HealthAI.jsx`)
- Infrastructure & Smart Cities (`InfraSmartCities.jsx`)
- Environmental Sustainability (`EnvironmentalAI.jsx`)

**30 new glossary terms** — bilingual with CR context:
- 9 foundational + 21 advanced terms
- Examples: Agentic AI, Federated Learning, Edge AI, Multimodal AI, AI Alignment, Responsible AI, AI Blind Spot, UNESCO RAM, Post-Quantum Cryptography, K-shaped Economy, Polycrisis

**4 new SVG icons:** leaf, heart, city, wheat

**16 real-world case studies** across the 4 tabs (from ITU AI for Good awards and global deployments)

**16 Costa Rica connection analyses** mapping global AI solutions to CR institutions (CCSS, MAG, ICE, CNE, SINAC, SENASA, SINPE)

### 15.2 Wiring Changes

- `PortalSidebar.jsx`: IMPACT group expanded from 4 to 8 tab IDs
- `PortalShell.jsx`: 4 new dynamic imports + 4 new renderTab cases
- `data.js`: 4 TABS entries + 30 GLOSSARY terms added
- `Icon.jsx`: 4 new icon SVG paths

### 15.3 NaN Bug Fix

**Problem:** The `Stat` component uses `AN` (AnimatedNumber) which does arithmetic: `from + (v - from) * ease(t)`. When value is a string like "$504B" or "97%", JavaScript coerces it to NaN.

**Solution:** Replaced all `<Stat>` calls in the 4 new tabs with static `<Card>` displays that render the string value directly in 22px IBM Plex Mono font without animation.

### 15.4 Mobile Layout Fix

**Problem:** `Grid cols="1fr 1fr 1fr"` produces cramped 3 columns on mobile. Inline CSS grids don't get the `mobile-grid-1` media query override.

**Solution:**
- Changed `Grid cols="1fr 1fr 1fr"` to `Grid cols="repeat(auto-fit,minmax(100px,1fr))"`
- Changed `minmax(240px,1fr)` to `minmax(200px,1fr)` for CR Connection grids
- These allow responsive column counts AND get the `mobile-grid-1` override at 768px

---

*Colibrii Labs AI Observatory — Full Documentation v20.0.0*
*Generated February 2026*
*colibriilabs.ai*
