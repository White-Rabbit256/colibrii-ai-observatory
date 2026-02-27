# Colibrii Labs AI Observatory — Technical Summary

**Version:** 20.0.0 | **Package:** `colibrii-encrucijada` | **License:** CC BY-NC 4.0
**Last Updated:** February 2026

---

## 1. Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | Next.js | 14.2.x | App Router, SSG, API routes, dynamic imports |
| UI Library | React | 18.3.x | Component rendering, hooks, client-side state |
| Animation | Framer Motion | 12.34.x | Page transitions, scroll reveals, accordion animations |
| Charts | Recharts | 2.15.x | RadarChart, BarChart, AreaChart, LineChart, Treemap |
| Maps | react-simple-maps | 3.0.x | Interactive world map with TopoJSON |
| Analytics | @vercel/analytics | 1.6.x | Page view tracking |
| Performance | @vercel/speed-insights | 1.3.x | Core Web Vitals monitoring |
| Hosting | Vercel | — | Edge Network CDN, serverless functions |
| Linting | ESLint + eslint-config-next | 8.57.x | Code quality |

**No backend. No database. No authentication. No server-side state.**

---

## 2. Project Structure

```
ColibriiLabs_Portal_v12/
├── app/
│   ├── layout.js                          # Root layout (fonts, metadata, JSON-LD, analytics)
│   ├── globals.css                        # Global styles (~1,900 lines)
│   ├── error.js                           # Root error boundary
│   ├── (marketing)/
│   │   ├── layout.js                      # Marketing layout wrapper
│   │   └── page.js                        # Landing page → <LandingPage />
│   ├── (portal)/
│   │   └── app/
│   │       ├── layout.js                  # Portal layout (.portal-root)
│   │       ├── page.js                    # Portal → <PortalShell />
│   │       ├── loading.jsx                # Skeleton loading state
│   │       └── error.js                   # Portal error boundary
│   └── api/
│       └── rss/
│           └── route.js                   # RSS 2.0 feed (GET handler)
├── components/
│   ├── portal/
│   │   ├── PortalShell.jsx                # Main shell (state, API calls, tab routing)
│   │   ├── PortalSidebar.jsx              # Sidebar navigation (6 groups)
│   │   ├── BottomNav.jsx                  # Mobile bottom tab bar
│   │   └── IndicatorDrawer.jsx            # Slide-in KPI detail panel
│   ├── marketing/
│   │   ├── LandingPage.jsx                # Full marketing landing page
│   │   ├── MarketingHeader.jsx            # Sticky header with CTA
│   │   └── MarketingFooter.jsx            # Footer with legal
│   ├── system/
│   │   └── Icon.jsx                       # 37 custom SVG icons
│   ├── ui.jsx                             # UI component library (22+ components)
│   ├── data.js                            # Master data module (276KB, 50+ exports)
│   ├── HomeView.jsx                       # Home dashboard
│   ├── AlgoSecurityLeg.jsx                # Algorithms, Security, Legislation (3 exports)
│   ├── EduGlossaryAbout.jsx               # Education, Glossary, About (3 exports)
│   ├── FreeZonesPhysicalAI.jsx            # Free Zones, Physical AI (2 exports)
│   ├── PymesAI.jsx                        # SME AI impact
│   ├── MediaIntelligence.jsx              # News + Video hub
│   ├── IndexCompareViews.jsx              # Index leaderboard, Compare radar (2 exports)
│   ├── CountryProfiles.jsx                # 20-country profiles
│   ├── PolicySimulator.jsx                # What-if policy simulator
│   ├── SDGAIForGood.jsx                   # UN SDGs + AI for Good
│   ├── ITUReadiness.jsx                   # ITU 13-dimension readiness
│   ├── GlobalGovernance.jsx               # Global AI regulation landscape
│   ├── ImpactShowcase.jsx                 # Impact metrics + award benchmarking
│   ├── FoodSecurity.jsx                   # AI for food security
│   ├── HealthAI.jsx                       # AI in healthcare
│   ├── InfraSmartCities.jsx               # Smart cities + infrastructure
│   ├── EnvironmentalAI.jsx                # Climate + biodiversity AI
│   ├── Portal.jsx                         # Legacy monolithic portal (preserved)
│   ├── WorldMapMini.jsx                   # Interactive world map
│   ├── NewsSection.jsx                    # GDELT news feed
│   ├── TikTokEmbed.jsx                    # TikTok video embeds
│   └── RiskHeatmap.jsx                    # WEF risk heatmap grid
├── data/
│   └── facts.js                           # Single source of truth (dynamic counts)
├── public/
│   ├── favicon.svg                        # 64px hummingbird SVG
│   ├── og-image.svg                       # 1200x630 Open Graph image
│   ├── colibrii-logo.png                  # Brand logo (512px)
│   ├── costa-rica-hero.jpg                # Hero image
│   ├── manifest.json                      # PWA manifest
│   ├── robots.txt                         # Crawler rules
│   └── sitemap.xml                        # XML sitemap with hreflang
├── next.config.mjs                        # Next.js config (CSP, caching, optimizations)
└── package.json                           # Dependencies and scripts
```

---

## 3. Routing Architecture

| URL | Route Group | Component | Purpose |
|-----|------------|-----------|---------|
| `/` | `(marketing)` | `<LandingPage />` | Conversion-focused marketing page |
| `/app` | `(portal)/app` | `<PortalShell />` | Full 23-tab observatory portal |
| `/api/rss` | `api` | GET handler | RSS 2.0 XML feed |

**Route groups** `(marketing)` and `(portal)` share the root layout (fonts, metadata, analytics) but have independent layouts, loading states, and error boundaries.

---

## 4. Data Architecture

### 4.1 Centralized Data Module (`components/data.js` — 276KB)

All data lives in a single JavaScript module with 50+ named exports. No external database. Data-as-code strategy enables:
- Zero-latency data access (bundled with the app)
- Type-safe data structures
- Git-versioned data changes
- No API dependency for static/curated data

### 4.2 Key Data Structures

| Export | Type | Records | Description |
|--------|------|---------|-------------|
| `CO` | Object | 20 | Country metadata (name, flag, region, GDP, population) |
| `CC` | Array | 20 | Country codes derived from `Object.keys(CO)` |
| `IND_MAP` | Object | 11 | World Bank indicator definitions (code, label, dimension, inversion) |
| `DM` | Object | 6 | CAPI-CR dimensions (name, weight, color, indicators) |
| `CUR` | Object | 20 | Curated D4/D6 scores per country |
| `GOV` | Object | 20 | Governance scores (CPI, Freedom House, GPI, Oxford, HDI, V-Dem) |
| `TABS` | Array | 23 | Tab definitions (id, label ES/EN, icon, color) |
| `ALGOS` | Function(en) | 10 | Proprietary algorithm documentation |
| `GLOSSARY` | Function(en) | 55 | Bilingual glossary with CR context |
| `LAWS` | Function(en) | 7 | Global AI legislation analysis |
| `WEF_2026_RISKS` | Object | 3 horizons | WEF risk data (immediate, short-term, long-term) |
| `EOS_RISKS` | Object | 16 | WEF Executive Opinion Survey (top 5 risks per country) |
| `COUNTRY_PROFILES` | Function(en) | 20 | Deep per-country AI strategy profiles |
| `PARTNERS` | Array | 25 | Data partner names |
| `SDG_ALIGNMENT` | Function(en) | 8 | SDG alignment matrix |
| `ITU_DIMENSIONS` | Function(en) | 13 | ITU AI Readiness dimension data |
| `GLOBAL_AI_GOVERNANCE` | Function(en) | 20+ | Global governance landscape data |
| `TIMELINE` | Function(en) | N | Historical AI legislation timeline |

### 4.3 Single Source of Truth (`data/facts.js`)

All counts are computed dynamically from actual data arrays:

```javascript
FACTS = {
  countries: Object.keys(CO).length,         // 20
  algorithms: ALGOS(false).length,           // 10
  glossaryTerms: GLOSSARY(false).length,     // 55
  partners: PARTNERS.length,                // 25
  tabs: TABS.length,                        // 23
  // ... all other counts derived similarly
}
```

This prevents hardcoded count discrepancies when data is added or removed.

### 4.4 Utility Functions

| Function | Purpose |
|----------|---------|
| `mm(v)` | Min-max normalization (handles null, equal-value edge case returns 0.5) |
| `av(a)` | Average of non-null values |
| `sco(s)` | Score-to-color mapping (green >= 0.65, amber >= 0.40, red below) |
| `sla(s, en)` | Score-to-label ("READY/PREPARADO", "AT RISK/EN RIESGO", "DEFICIT") |
| `cacheGet(k)` | sessionStorage read with 30-min TTL, key prefix `clb_` |
| `cacheSet(k, v)` | sessionStorage write with timestamp |

---

## 5. Live API Integrations

### 5.1 World Bank API

```
GET https://api.worldbank.org/v2/country/{codes}/indicator/{ind}?format=json&per_page=500&date=2018:2024&source=2
```

- Fetches 11 indicators for 20 countries via `Promise.allSettled`
- Latest available year used per indicator per country
- Cached in `sessionStorage` for 30 minutes (key: `clb_wb_data`)
- Graceful degradation: individual indicator failures don't block others

### 5.2 GDELT Project API

```
GET https://api.gdeltproject.org/api/v2/doc/doc?query="artificial+intelligence"+"costa+rica"&mode=artlist&maxrecords=24&format=json&sort=datedesc&timespan=7d
```

- Fetches up to 24 AI + Costa Rica news articles from last 7 days
- Real-time global news monitoring
- Category auto-detection via keyword matching (security, policy, economy, education, tech)

### 5.3 Exchange Rate API

```
GET https://open.er-api.com/v6/latest/USD
```

- Extracts `rates.CRC` for USD/CRC display
- Displayed with +/-3 buy/sell spread in portal header
- IBM Plex Mono formatting

### 5.4 REST Countries (via world-atlas TopoJSON)

```
GET https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json
```

- TopoJSON world map data for the interactive WorldMapMini component
- Client-side fetch, rendered with react-simple-maps

---

## 6. CAPI-CR Scoring Pipeline

```
World Bank API (11 indicators × 20 countries)
    ↓
Extract latest year value per indicator per country
    ↓
Min-max normalize across 20-country peer set (mm() function)
    ↓
Invert inverted indicators (e.g., unemployment — lower is better)
    ↓
Aggregate into 6 dimensions (D1-D6) by averaging member indicators
    ↓
Inject curated scores for D4 (AI Regulation) and D6 (Digital Security)
    ↓
Compute weighted composite: Σ(dimension_score × dimension_weight)
    ↓
Sort countries by composite → assign ranks (1-20)
    ↓
Cache result in sessionStorage (30-min TTL)
```

**Dimension weights:** D1=20%, D2=20%, D3=15%, D4=15%, D5=15%, D6=15%

**D4 and D6 are expert-curated** because no reliable, standardized World Bank indicators exist for AI regulation quality or cybersecurity posture. These scores are periodically updated based on legislative analysis and OWASP/ITU frameworks.

---

## 7. Component Architecture

### 7.1 Tab Components (17 files, 23 exports)

All tab components follow this pattern:
- `"use client"` directive (React client component)
- Props: `{ en, t, idx, crS, crR, board, news, loading, xr, govData, dark, setTab, ... }`
- Loaded via `next/dynamic` with `<LoadCard />` loading skeleton
- Full bilingual support via `en` boolean

| File | Exports | Tabs |
|------|---------|------|
| `HomeView.jsx` | `Home` | home |
| `AlgoSecurityLeg.jsx` | `Algo`, `SecTab`, `Leg` | algo, sec, leg |
| `EduGlossaryAbout.jsx` | `Edu`, `Glos`, `Abt` | edu, glos, about |
| `FreeZonesPhysicalAI.jsx` | `ZF`, `PAI` | zf, pai |
| `PymesAI.jsx` | `Pymes` | pymes |
| `MediaIntelligence.jsx` | `MediaIntelligence` | media |
| `IndexCompareViews.jsx` | `Idx`, `Compare` | idx, cmp |
| `CountryProfiles.jsx` | `Countries` | countries |
| `PolicySimulator.jsx` | `Simulator` | sim |
| `SDGAIForGood.jsx` | `SDG` | sdg |
| `ITUReadiness.jsx` | `Readiness` | readiness |
| `GlobalGovernance.jsx` | `Governance` | governance |
| `ImpactShowcase.jsx` | `Showcase` | showcase |
| `FoodSecurity.jsx` | `FoodSecurity` | food |
| `HealthAI.jsx` | `HealthAI` | health |
| `InfraSmartCities.jsx` | `InfraSmartCities` | infra |
| `EnvironmentalAI.jsx` | `EnvironmentalAI` | climate |

### 7.2 UI Component Library (`ui.jsx` — 22+ components)

| Component | Purpose |
|-----------|---------|
| `AN` | Animated Number — cubic ease-out counter, 1200ms, handles null |
| `ScrollReveal` | IntersectionObserver-triggered CSS reveal animation |
| `Card` | Framer Motion card with hover lift, optional accent border |
| `Bx` | Lightweight nested box container |
| `SH` | Section Header — mono label + Playfair Display title + description |
| `Stat` | Large mono number via AN + label + subtitle (used for numeric values) |
| `Tag` | Colored pill/badge |
| `Ci` | Citation line ("SOURCE: ...") |
| `Lnk` | External link with new tab + arrow icon |
| `Sk` | Skeleton shimmer placeholder |
| `LoadCard` | Full card skeleton (3 lines) |
| `Grid` | CSS Grid helper with auto `mobile-grid-1` class |
| `Traffic` | Traffic light dot (green/amber/red) with glow |
| `ProgressBar` | Animated horizontal bar (1.2s transition) |
| `PartnerBar` | Partner pills with Clearbit logos |
| `MiniStat` | Compact 9px label + 14px value |
| `TabContent` | Tab transition wrapper (Framer Motion) |
| `DimBadge` | CAPI-CR dimension icon + name + weight badge |
| `CountryLabel` | Flag + country name |
| `EmptyState` | Centered empty state |
| `Tooltip` | CSS hover tooltip |
| `ScorePill` | Colored READY/AT RISK/DEFICIT pill |
| `Flag` | Twemoji SVG flag with emoji fallback |
| `ExportBtn` | Download/export button |

### 7.3 Icon System (`system/Icon.jsx` — 37 icons)

All icons are custom SVG paths at 24x24 viewBox, `strokeWidth={1.8}`, `strokeLinecap="round"`, `strokeLinejoin="round"`.

Icons: `home`, `chart`, `compare`, `globe`, `target`, `factory`, `store`, `robot`, `algo`, `shield`, `legal`, `edu`, `book`, `info`, `diamond`, `lightning`, `coins`, `menu`, `x`, `sun`, `moon`, `lang`, `copy`, `arrowRight`, `twitter`, `instagram`, `linkedin`, `mail`, `chevronDown`, `externalLink`, `video`, `star`, `radar`, `leaf`, `heart`, `city`, `wheat`

---

## 8. Theming System

### 8.1 CSS Custom Properties

Two complete theme sets via `data-theme` attribute on `<html>`:

**Light theme (`:root`):**
- Backgrounds: `#f8f9fc` → `#eef1f8` → `#e2e7f0`
- Text: `#0f172a` → `#475569` → `#94a3b8`
- Cards: `#ffffff`
- 7 accent colors: cyan (`#2563eb`), violet (`#6366f1`), pink (`#ec4899`), amber (`#f59e0b`), red (`#ef4444`), green (`#10b981`), orange (`#f97316`)

**Dark theme (`[data-theme="dark"]`):**
- Backgrounds: `#0a0f1e` → `#111827` → `#1e293b`
- Text: `#f1f5f9` → lighter variants
- All accent colors shifted to brighter variants

### 8.2 Theme Toggle

- Persisted to `localStorage("clb_theme")`
- Sets `data-theme="dark"` on `document.documentElement`
- Available in sidebar (desktop) and bottom nav (mobile)

### 8.3 Responsive Breakpoints

| Breakpoint | Effect |
|-----------|--------|
| 900px | Portal content padding reduced |
| 768px | Portal switches to single column; sidebar hidden; mobile header/bottom nav shown; `.mobile-grid-1` forces `grid-template-columns: 1fr` |
| 480px | Font sizes adjusted; `.hide-xs` active |

### 8.4 Animations (20+ keyframes)

`meshGradient`, `shimmer`, `borderShimmer`, `reveal`, `revealScale`, `fadeIn`, `float`, `pulse`, `slideIn`, `countUp`, `orbFloat1/2`, `gradientText`, `skeleton`, `slideUp`, `scaleIn`, `typewriter`, `blink`, `glow`, `livePulse`, `rotateGradient`, `iridescent`, `mkt-float`, `scrollHintPulse`

---

## 9. Performance Optimizations

| Optimization | Implementation |
|-------------|---------------|
| Tree-shaking | `optimizePackageImports: ['recharts', 'framer-motion', 'react-simple-maps']` |
| Code splitting | All 17 tab components loaded via `next/dynamic` |
| Loading states | `<LoadCard />` skeleton shown during dynamic import |
| API caching | sessionStorage with 30-min TTL (key prefix `clb_`) |
| CDN caching | Static assets: `Cache-Control: public, max-age=31536000, immutable` |
| API caching | RSS route: `s-maxage=3600, stale-while-revalidate=600` |
| Parallel fetching | `Promise.allSettled` for World Bank + GDELT + Exchange Rate |
| Image optimization | Lazy loading flags (`loading="lazy"`), Clearbit/Twemoji CDN |
| SSG | All pages statically generated at build time |
| Font optimization | `next/font` for Inter, Playfair Display, IBM Plex Mono |

**Build output:** ~240KB First Load JS shared, 6 static pages.

---

## 10. Security

### 10.1 HTTP Security Headers (via `next.config.mjs`)

| Header | Value |
|--------|-------|
| `Content-Security-Policy` | Restrictive CSP allowing only required origins (TikTok, Google Fonts, World Bank, GDELT, Exchange Rate, jsDelivr, Clearbit) |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `origin-when-cross-origin` |
| `X-XSS-Protection` | `1; mode=block` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |

### 10.2 Privacy

- Zero cookies set at any point
- Zero user tracking or behavior analytics
- Zero user data collection (no forms, no accounts, no localStorage user data)
- Only `localStorage` keys: `clb_lang` (language preference), `clb_theme` (dark/light preference)
- Only `sessionStorage` keys: `clb_wb_data` (World Bank API cache)

---

## 11. SEO and Discoverability

| Feature | Implementation |
|---------|---------------|
| JSON-LD | 4-node `@graph`: WebApplication, ResearchOrganization, Dataset, FAQPage |
| Open Graph | `es_CR` locale, alternate `en_US`, 1200x630 SVG image |
| Twitter Card | `summary_large_image` |
| Sitemap | `/sitemap.xml` — 2 URLs with ES/EN/x-default hreflang alternates |
| robots.txt | Allow all, crawl-delay 1 |
| RSS Feed | `/api/rss` — RSS 2.0 with PAI + WEF + GDELT items |
| Canonical | `https://colibriilabs.ai` |
| Meta keywords | 52 targeted keywords |

---

## 12. PWA Support

```json
{
  "name": "Colibrii Labs — AI Observatory Costa Rica",
  "short_name": "Colibrii Labs",
  "display": "standalone",
  "background_color": "#fafbfc",
  "theme_color": "#0ea5e9",
  "orientation": "portrait-primary",
  "lang": "es",
  "categories": ["business", "education", "government"]
}
```

---

## 13. Error Handling

| Boundary | Scope | Features |
|----------|-------|----------|
| `app/error.js` | Global | Lightning icon, "Try Again" + "Return to Home" |
| `app/(portal)/app/error.js` | Portal | Microscope icon, shows `error.message`, theme-aware, "Reload Observatory" |
| `app/(portal)/app/loading.jsx` | Portal | Sidebar + 6-card grid skeleton with shimmer animation |
| API failures | Per-API | `Promise.allSettled` — individual API failures show warning banner, portal continues with partial data |

---

## 14. Deployment

- **Platform:** Vercel
- **Domain:** colibriilabs.ai (www.colibriilabs.ai)
- **Build command:** `next build`
- **Framework detection:** Automatic (Next.js)
- **No `vercel.json`** — uses Next.js defaults
- **Region:** Portland, USA (West) — pdx1

---

## 15. Dependencies (Full List)

### Production
| Package | Version | Purpose |
|---------|---------|---------|
| `next` | ^14.2.21 | Framework |
| `react` | ^18.3.1 | UI library |
| `react-dom` | ^18.3.1 | DOM rendering |
| `framer-motion` | ^12.34.2 | Animations |
| `recharts` | ^2.15.0 | Data visualization charts |
| `react-simple-maps` | ^3.0.0 | World map |
| `@vercel/analytics` | ^1.6.1 | Page analytics |
| `@vercel/speed-insights` | ^1.3.1 | Performance monitoring |

### Development
| Package | Version | Purpose |
|---------|---------|---------|
| `eslint` | ^8.57.0 | Linting |
| `eslint-config-next` | ^14.2.21 | Next.js lint rules |

**Total: 10 dependencies (8 production + 2 dev)**

---

*Colibrii Labs AI Observatory — Technical Summary v20.0.0*
