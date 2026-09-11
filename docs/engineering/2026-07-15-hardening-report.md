# Engineering Report — Full-Repo Hardening Pass (2026-07-15)

**Scope:** entire `colibrii-ai-observatory` codebase (shell, views, live-data layer, Energía 3D, `mcp-server/`, API routes, config, assets, SEO/PWA surface).
**Method:** 10 parallel specialist review lenses (security, MCP server, portal core, live data, WebGL lifecycle, a11y, performance, data integrity, dependencies, SEO/meta/PWA); every raw finding was then attacked by an independent adversarial verifier that read the actual code and refuted anything that didn't hold. 76 raw findings → **72 confirmed, 4 refuted**. Fixes verified with `npm run build` (green, First Load `/app` 256 kB) + `next lint` (0 errors) + live stdio smoke test of the MCP server.

**Outcome: 60 of 72 confirmed findings fixed in this pass.** The rest are queued product decisions or scoped-out items — see Status column. Product decisions (zero-tracking wording vs Vercel Analytics, Next 15 upgrade, react-simple-maps replacement, landing-bundle refactor) belong to the owner and are in HUMAN-INPUT-QUEUE.

## Highest-impact fixes

1. **CAPI-CR score integrity:** a World Bank outage previously produced silently fabricated composites (D4/D6-only) for all 20 countries and cached them for 30 min; the "sources unavailable" banner was structurally unreachable. The pipeline now refuses to fabricate, never caches partial pulls, and the banner works.
2. **`/api/rss` XML injection** from third-party GDELT titles/URLs (CDATA breakout + attribute breakout) sealed with full XML escaping; feed also un-frozen (was baked at build with zero items forever) via hourly ISR.
3. **Keyboard operability:** clickable `Card`s (Home KPIs, case drawers) were keyboard-dead (WCAG 2.1.1 — critical); drawers lacked dialog semantics/focus traps/Escape; tab switches were silent to AT. All fixed.
4. **Crash-proof storage:** `localStorage` access crashed the entire portal in cookie-blocking browsers/private modes. Now guarded everywhere.
5. **Navigation:** browser back/forward now actually walks tab history (`pushState` + `hashchange` loop); `#indice` deep links resolve; `#__proto__` hash can no longer corrupt state.
6. **MCP server truthfulness:** ISO-code queries returned empty rankings; methodology text overclaimed live World Bank inputs; source-count claimed 96+ vs 68 shipped; errors returned as successes; audit had 6 vulns. All corrected (audit now 0).
7. **Asset sanity:** 1.46 MB 1024px PNG was the favicon/manifest icon/site-wide logo; a 16.6 MP JPEG rendered an 80px thumbnail. Proper 192/512 icons + 33 KB/7 KB assets generated and wired; PWA manifest now valid.
8. **SEO:** root canonical was collapsing `/app` into the homepage (index-drop risk) — per-page canonicals now; sitemap lastmod was 5 months stale; branded bilingual 404 added.

## Verification evidence

- `npm run build`: green; routes `/` 253 kB, `/app` 256 kB First Load (**+2 kB** for modal focus management, MotionConfig, error states — within budget).
- `npx next lint`: 0 errors (note: **the lint gate had never run before this session** — no ESLint config existed; `next/core-web-vitals` now wired and enforced by the build).
- `mcp-server`: `node --check` both files + live stdio JSON-RPC smoke test (rankings by ISO code, `isError`, computed source counts).
- Sandbox caveat: WHO/NVD/GDELT/Vercel-preview hosts are proxy-blocked in this environment; their fetch paths were code-reviewed and fixed, but live behavior needs one on-device pass on the preview URL (queued as human input).

## Confirmed findings register

| # | Sev | Lens | Location | Finding | Status |
|---|-----|------|----------|---------|--------|
| 1 | CRITICAL | a11y | `components/ui.jsx:94` | Clickable Card has role=button + tabIndex=0 but no keyboard handler — Home KPI drawers and expandable case cards are keyboard-inoperable (WCAG 2.1.1) | FIXED |
| 2 | HIGH | security-headers | `app/api/rss/route.js:16` | XML/attribute injection in /api/rss from unescaped external GDELT fields (esc() omits quote escaping; titles in raw CDATA) | FIXED |
| 3 | HIGH | mcp-server | `mcp-server/index.js:256` | get_ilia_rankings silently returns empty rankings for ISO-code input (CRI, CHL, URY) | FIXED |
| 4 | HIGH | portal-core | `components/portal/PortalShell.jsx:164` | Unguarded localStorage access crashes the entire portal (and landing page) for cookie-blocking browsers | FIXED |
| 5 | HIGH | portal-core | `components/portal/PortalShell.jsx:266` | Data-warning banner is unreachable dead code; a World Bank outage silently produces fabricated CAPI-CR scores that get cached for 30 minutes | FIXED |
| 6 | HIGH | live-data | `components/portal/PortalShell.jsx:223` | World Bank outage silently produces wrong CAPI-CR scores for all 20 countries and poisons the sessionStorage cache for 30 minutes | FIXED |
| 7 | HIGH | live-data | `components/portal/PortalShell.jsx:267` | The 'data sources unavailable' warning banner is structurally unreachable — all three failure conditions can never be true | FIXED |
| 8 | HIGH | energia-3d | `components/energia/GlobeScene.jsx:452` | Canvas interactions never call invalidate(), so any Energía canvas held at frameloop="demand" is frozen and unresponsive — globe drag is permanently dead for prefers-reduced-motion users | FIXED |
| 9 | HIGH | a11y | `app/globals.css:29` | Light-theme --text3 (#94a3b8) fails WCAG 1.4.3 at 2.27-2.56:1 and is used for real 9-13px text throughout the shell | FIXED |
| 10 | HIGH | a11y | `components/HomeView.jsx:291` | Hero CTA buttons and bottom-nav Explore FAB: white text on gradient/green fails contrast (2.15-2.54:1) — text-on-gradient WCAG 1.4.3 + 1.4.11 | FIXED |
| 11 | HIGH | a11y | `components/portal/PortalSidebar.jsx:105` | Mobile nav drawer and IndicatorDrawer are modals without dialog semantics, focus management, or Escape — forward-Tab lands behind the backdrop | FIXED |
| 12 | HIGH | a11y | `app/layout.js:164` | <html lang="es"> never updates when the user switches the UI to English (WCAG 3.1.1) | FIXED |
| 13 | HIGH | performance | `app/layout.js:171` | 1.46 MB 1024x1024 PNG served as favicon, apple-touch-icon, manifest icon, and site-wide header logo rendered at 28-160px | FIXED |
| 14 | HIGH | performance | `components/portal/PortalShell.jsx:287` | Every one of the 30+ portal tabs is blocked behind third-party API fetches with no timeout, including fully static data-as-code tabs | FIXED (partial) — timeouts added AND static tabs unblocked; per-tab progressive data loading queued |
| 15 | HIGH | performance | `data/facts.js:6` | Static marketing landing page ships the entire 300.6 KB (105 KB gzip) data.js chunk just to compute FACTS counts and logo domains | QUEUED — needs a build-time facts snapshot to decouple landing from data.js |
| 16 | HIGH | data-integrity | `app/layout.js:179` | Site ships Vercel Analytics + Speed Insights while UI and license promise 'Zero cookies · Zero tracking · Zero user data' | DECISION QUEUED — keep cookieless analytics and reword the promise, or drop analytics; owner call |
| 17 | HIGH | data-integrity | `components/sourcesData.js:1985` | SOURCES_SUMMARY hardcodes 8+ wrong counts that contradict the DATA_SOURCES array rendered on the same page | FIXED |
| 18 | HIGH | deps-supply-chain | `package.json:23` | next@14.2.35 is on an end-of-life major with 14 open advisories and no fix available on the 14.x line | QUEUED — major upgrade to Next 15 needs a dedicated tested pass |
| 19 | HIGH | seo-meta-pwa | `app/layout.js:77` | Root-layout canonical + hreflang collapse /app into the homepage, contradicting the sitemap — the portal page is signaled as a duplicate and will be dropped from search indexes | FIXED |
| 20 | HIGH | seo-meta-pwa | `app/layout.js:171` | 1.46 MB 1024x1024 PNG served as the favicon, apple-touch-icon, and the landing page's LCP hero logo while optimized assets sit unused in public/ | FIXED |
| 21 | MEDIUM | mcp-server | `mcp-server/data.js:162` | CR_ILIA_PROFILE is stale: development and governance dimensions return null where the portal publishes real ILIA 2025 scores | FIXED |
| 22 | MEDIUM | mcp-server | `mcp-server/index.js:38` | resolveCountry fuzzy prefix match has no minimum length: whitespace resolves to Singapore, single letters to arbitrary countries | FIXED |
| 23 | MEDIUM | mcp-server | `mcp-server/index.js:168` | get_capi_cr_score returns a false methodology claim and scores that diverge from the portal's live CAPI-CR index | FIXED |
| 24 | MEDIUM | portal-core | `components/portal/PortalShell.jsx:102` | Hash round-trip broken for the CAPI-CR Index tab: TAB_TO_SLUG maps idx→"indice" but SLUG_TO_TAB has no "indice" key | FIXED |
| 25 | MEDIUM | portal-core | `components/portal/PortalShell.jsx:179` | Browser back/forward can never navigate between tabs: every tab change uses history.replaceState, making the hashchange listener's stated purpose impossible | FIXED |
| 26 | MEDIUM | portal-core | `components/portal/PortalShell.jsx:169` | Dark theme is applied only after hydration — dark-mode users get a full light-theme flash (and light skeleton screens) on every page load | FIXED |
| 27 | MEDIUM | portal-core | `app/layout.js:179` | Footer promises "Zero cookies · Zero tracking" while every page ships Vercel Analytics + Speed Insights beacons | DECISION QUEUED — same zero-tracking decision |
| 28 | MEDIUM | live-data | `app/api/rss/route.js:12` | RSS feed is injectable/corruptible by third-party GDELT article titles and URLs (unescaped CDATA and attribute quoting) | FIXED |
| 29 | MEDIUM | live-data | `components/energia/PowerGlobe.jsx:187` | Language toggle restarts the entire ~10 MB WRI download/parse: the fetch effect depends on `en`, kills the parse worker, and never aborts the in-flight fetch | FIXED |
| 30 | MEDIUM | live-data | `components/WorldMapMini.jsx:55` | World map shows 'Loading map...' forever when the jsDelivr TopoJSON fetch fails — error swallowed, no res.ok check, no fallback or retry | FIXED |
| 31 | MEDIUM | live-data | `components/ui.jsx:365` | ShareBtn clipboard path is dead in production: fetch(dataUrl) violates the site's CSP (connect-src has no data:), so 'Copy image' always degrades to file download | FIXED |
| 32 | MEDIUM | energia-3d | `components/energia/PowerGlobe.jsx:187` | WRI dataset (10 MB CSV, ~35k rows) is re-fetched and fully re-parsed on every ES/EN language toggle and on every Energía tab re-entry | FIXED |
| 33 | MEDIUM | energia-3d | `components/energia/useFrameloopGate.js:61` | Frameloop arbiter reads only the first batched IntersectionObserver record, so a stale ratio can pin an off-screen canvas at "always" (bloom composer running) — the exact GPU-pressure state the gate exists to prevent | FIXED |
| 34 | MEDIUM | a11y | `PERF_A11Y_CHECKLIST.md:59` | Checklist certifies mobile-FPS/perf items with rationale the shipped code contradicts (bloom IS enabled on compact; DPR is 1.75/2, not 1.5; react-globe.gl internals cited no longer exist) | FIXED |
| 35 | MEDIUM | a11y | `components/ui.jsx:226` | prefers-reduced-motion ignored by every framer-motion/JS animation in the shell — CSS reduce block cannot reach them | FIXED |
| 36 | MEDIUM | a11y | `app/layout.js:179` | "Zero cookies · Zero tracking" promise contradicted: Vercel Analytics + SpeedInsights mounted globally and PartnerBar hotlinks logo.clearbit.com per visitor | DECISION QUEUED — same zero-tracking decision (Clearbit referrer leak mitigated with no-referrer) |
| 37 | MEDIUM | a11y | `components/portal/PortalShell.jsx:102` | Shareable link for the Index tab is broken: TAB_TO_SLUG writes #indice but SLUG_TO_TAB cannot resolve it — reload lands on Home | FIXED |
| 38 | MEDIUM | a11y | `components/portal/PortalShell.jsx:421` | Tab switches are silent and unfocused for AT users: content swap with no focus move and no announcement (WCAG 4.1.3 / 2.4.3) | FIXED |
| 39 | MEDIUM | performance | `components/marketing/LandingPage.jsx:109` | 5000x3333 (16.6 MP) 456 KB JPEG decoded for an 80x56 px thumbnail in the landing hero | FIXED |
| 40 | MEDIUM | performance | `components/ILIADeep.jsx:126` | Hero canvas runs an unconditional 60 fps rAF loop with O(N^2) pair checks and per-frame gradient allocation, never paused when scrolled off-screen (duplicated in AgenticAI) | FIXED |
| 41 | MEDIUM | data-integrity | `components/data.js:1884` | Glossary size hardcoded as 55 in five surfaces while actual GLOSSARY has 85 terms (85 is displayed on the same landing page) | FIXED |
| 42 | MEDIUM | data-integrity | `components/NewsSection.jsx:179` | GDELT seendate rendered with .slice(0,10) prints malformed dates like '20260714T1' on every news card | FIXED |
| 43 | MEDIUM | data-integrity | `components/EduGlossaryAbout.jsx:254` | Analysis-view counts contradict each other and the TABS module: About says 13, Landing says 14, Showcase says 19 — actual is 32 | FIXED |
| 44 | MEDIUM | data-integrity | `components/portal/PortalShell.jsx:102` | Index tab hash '#indice' is written to the URL but SLUG_TO_TAB cannot resolve it — shared/reloaded links silently land on Home | FIXED |
| 45 | MEDIUM | data-integrity | `components/data.js:1011` | 'REST Countries' is listed as '● Active' and counted in the '4 live APIs' claim, but nothing in the codebase ever fetches it — actual live APIs are 3 | FIXED |
| 46 | MEDIUM | data-integrity | `components/iliaData.js:287` | ILIA 2025 ranking is internally inconsistent: Bolivia ranked #18 with score 26.06 sits below Honduras ranked #17 with score 25.90 | DOCUMENTED — matches the published source discrepancy; press-reported correction noted in code comment, primary source 403-blocked in sandbox |
| 47 | MEDIUM | deps-supply-chain | `package.json:28` | react-simple-maps@3.0.0 is unmaintained and hard-pins a vulnerable, duplicated d3 v2 stack that makes 4 of the 8 audit highs permanently unfixable | QUEUED — replacement is a project; d3-v2 audit highs unfixable until then |
| 48 | MEDIUM | deps-supply-chain | `components/WorldMapMini.jsx:13` | world-atlas TopoJSON is fetched from jsDelivr with a floating major version and no integrity check | FIXED |
| 49 | MEDIUM | seo-meta-pwa | `app/api/rss/route.js:55` | RSS feed is frozen at build time forever: it never revalidates, ships zero GDELT items, and stamps every item's pubDate with the build timestamp | FIXED |
| 50 | MEDIUM | seo-meta-pwa | `public/manifest.json:12` | PWA/manifest icon set is invalid: declared 512x512 vs actual 1024x1024, single 'any maskable' icon that is 93% transparent — install prompt breaks and iOS/Android home-screen tiles render as black/cropped squares | FIXED |
| 51 | MEDIUM | seo-meta-pwa | `components/portal/PortalShell.jsx:169` | Switching the UI to English never updates <html lang="es">, so all English content is announced with Spanish pronunciation by screen readers and mislabeled for search/translate tools | FIXED |
| 52 | MEDIUM | seo-meta-pwa | `next.config.js:14` | Cache-Control 'max-age=31536000, immutable' is applied to all mutable public/ assets (og-image.png, colibrii-logo.png, sitemap-adjacent images), so in-place updates never reach returning users or CDNs for a year | FIXED |
| 53 | LOW | security-headers | `components/NewsSection.jsx:61` | Third-party requests to logo.clearbit.com leak visitor IP/Referer, contradicting the displayed 'Zero tracking' promise | MITIGATED — referrerPolicy=no-referrer added; removal/self-hosting is part of the zero-tracking decision |
| 54 | LOW | mcp-server | `mcp-server/index.js:448` | search_data_sources claims a '96+ data source registry' but ships and reports only 68 sources | FIXED |
| 55 | LOW | mcp-server | `mcp-server/index.js:105` | Not-found errors are returned as successful tool results without isError: true | FIXED |
| 56 | LOW | mcp-server | `mcp-server/data.js:134` | ILIA rankings contain a rank/score inversion: rank 18 Bolivia (26.06) outscores rank 17 Honduras (25.90) | DOCUMENTED — same as above (mcp-server/data.js) |
| 57 | LOW | portal-core | `components/portal/PortalShell.jsx:147` | SLUG_TO_TAB lookup walks the prototype chain: /app#constructor or /app#__proto__ sets tab to a function/object and corrupts the URL | FIXED |
| 58 | LOW | portal-core | `components/portal/PortalShell.jsx:163` | Language toggle never updates <html lang>, so English mode is announced/processed as Spanish | FIXED |
| 59 | LOW | live-data | `app/api/nvd/route.js:18` | /api/nvd always returns an empty CVE list: keywordExactMatch turns the 3-word keywordSearch into an exact-phrase query that matches nothing (and no component consumes the endpoint) | FIXED |
| 60 | LOW | live-data | `components/NewsSection.jsx:61` | Every rendered news card fires a request to logo.clearbit.com, contradicting the site's 'Zero cookies · Zero tracking' guarantee | MITIGATED — referrerPolicy=no-referrer added; removal pending zero-tracking decision |
| 61 | LOW | energia-3d | `components/energia/CRGridMap.jsx:285` | Every hover/focus of a plant node pushes a new anime.js instance into anims.current and never removes it — unbounded array growth while the map is mounted | FIXED |
| 62 | LOW | energia-3d | `components/energia/Hero3D.jsx:724` | Canvas eventSource={document.body} without eventPrefix="client" makes state.pointer derive from offsetX/offsetY of whatever element the cursor is over, so the hero parallax aim jumps erratically | SKIPPED — Hero3D.jsx is being rewritten in open PR #3; fix there |
| 63 | LOW | a11y | `components/portal/PortalShell.jsx:416` | Data-warning banner: dismiss button has no accessible name and the warning itself is never announced | FIXED |
| 64 | LOW | a11y | `components/portal/PortalShell.jsx:369` | Accessible names hardcoded in English regardless of UI language ("Open menu", "Close menu", "Close") | FIXED |
| 65 | LOW | performance | `components/marketing/LandingPage.jsx:3` | framer-motion (144.8 KB raw / 47 KB gzip) sits in the static landing page's critical path for simple fade-in entrance animations | QUEUED — same landing-bundle workstream |
| 66 | LOW | performance | `components/ui.jsx:63` | AN animated-number cleanup cancels only the start timeout, leaving orphan rAF loops running after unmount and overlapping loops on value change | FIXED |
| 67 | LOW | data-integrity | `components/NewsSection.jsx:124` | News feed labeled 'Updated every 72h / 72-hour monitoring window' but the live GDELT query uses a 7-day window | FIXED |
| 68 | LOW | data-integrity | `components/EducationDeep.jsx:373` | Education Deep freshness badge shows a green 'live' dot with 'Updated: 2025-03' — 16 months stale and format-inconsistent with sibling views | FIXED |
| 69 | LOW | deps-supply-chain | `package-lock.json:4446` | lodash@4.17.23 (via recharts) locked at a version with two open advisories; fix is a zero-risk lockfile bump | FIXED |
| 70 | LOW | deps-supply-chain | `mcp-server/package.json:24` | mcp-server lockfile carries 6 fixable advisories (2 high) in @modelcontextprotocol/sdk's HTTP transitive deps | FIXED |
| 71 | LOW | seo-meta-pwa | `app/not-found.js` | No not-found.js route: any bad URL serves Next's bare default 404 — unbranded, English-only, no navigation back — on a site that carefully styled its error boundary | FIXED |
| 72 | LOW | seo-meta-pwa | `public/sitemap.xml:9` | Sitemap lastmod is 5 months stale (2026-02-19) while declaring changefreq daily — Google learns the lastmod signal is unreliable and deprioritizes recrawl of a site that ships updates weekly | FIXED |
## Refuted findings (rejected by adversarial verification — the review loop working as intended)

1. GDELT URL as `javascript:` XSS sink — refuted (scheme handling checked).
2. CSP `img-src https:` as open exfil channel — refuted in context (no injection primitive).
3. GDELT empty-list 30-min cache pinning — refuted (acceptable, distinct from failure, now also failure-aware).
4. World Bank `!row.value` dropping legitimate zeros — refuted (no legitimate zero-valued indicators in this set).

## Residual risk (honest statement)

Build green + lint clean + code-reviewed ≠ bug-free. Specifically: back/forward navigation and the modal focus traps changed user-facing behavior and need a manual pass on the Vercel preview (desktop + phone); the WB-outage path was reasoned through but not fault-injected in a browser; contrast token changes (`--text3`, CTA gradients) need a visual once-over in both themes. Playwright verification of these flows was not run in-session.
