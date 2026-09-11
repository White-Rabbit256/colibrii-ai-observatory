# CHANGES

## 2026-07-15 — Full-repo hardening pass (orchestrator run)

72 adversarially-verified findings; **60 fixed this pass** (12 queued as product decisions / scoped work). Full register with evidence and statuses: `docs/engineering/2026-07-15-hardening-report.md`.

**Gates:** `npm run build` green (`/app` First Load 256 kB) · `npx next lint` 0 errors (ESLint config was missing — the lint gate had literally never run; now wired as `next/core-web-vitals` and enforced by the build) · mcp-server smoke-tested over stdio · `npm audit` (mcp-server) 6 → 0 vulnerabilities.

**Correctness / security**
- World Bank outage no longer fabricates CAPI-CR composites nor caches partial pulls; the data-warning banner is reachable for real failures (WB/GDELT/XR).
- `/api/rss`: XML/attribute injection from GDELT fields sealed; hourly ISR (was frozen at build forever); real article dates.
- `/api/nvd`: impossible exact-match query removed (always returned an empty CVE list).
- `localStorage` guarded — cookie-blocking browsers no longer crash the portal.
- Hash routing: back/forward walks tabs, `#indice` resolves, prototype-chain lookup sealed.
- `mcp-server`: ISO-code rankings, honest methodology text (+`dataAsOf`), ILIA dims synced to portal, `isError` on error responses, computed source counts.

**Accessibility**
- Clickable `Card`s keyboard-operable (was WCAG 2.1.1 critical); drawers are real modals (dialog semantics, focus trap, Escape, focus restore); SR tab-change announcer; `<html lang>` follows the toggle; theme applied pre-paint; `MotionConfig reducedMotion="user"`; light-theme `--text3` and CTA gradients now pass contrast; bilingual accessible names.

**Performance**
- Fetch timeouts (WB 12s / GDELT 10s / XR 8s); data-as-code tabs render without waiting on APIs; hero canvas rAF loops pause off-screen and honor reduced-motion; Energía WRI dataset cached at module scope + abortable (language toggle no longer re-downloads ~10 MB); demand-frameloop interactions `invalidate()` (reduced-motion globe was frozen); 1.46 MB logo → 33 KB; 16.6 MP thumb → 7 KB; proper 192/512 icons; `public/` cache 1d+SWR (was 1y immutable on mutable files).

**Data integrity**
- `SOURCES_SUMMARY` computed from the registry (8+ hardcoded counts were wrong); glossary 85 (was "55"), analysis views 32 (was 13/14/19 in three places), live APIs 3 (was "4", incl. one never fetched); GDELT window copy matches the 7-day query; malformed GDELT dates fixed; freshness badges are age-aware; `PERF_A11Y_CHECKLIST.md` marked stale where code contradicts it.

**SEO / PWA**
- Per-page canonicals (root canonical was collapsing `/app` into `/` — index-drop risk); valid manifest (192/512, `purpose: any`); branded bilingual 404; sitemap lastmod refreshed; world-atlas CDN pinned to exact version.

**Queued (owner decisions / scoped work)** — see `Launch-Dossiers/HUMAN-INPUT-QUEUE.md`: zero-tracking promise vs Vercel Analytics + Clearbit logos (referrer leak mitigated meanwhile); Next 14 EOL → 15 upgrade; react-simple-maps replacement (pins vulnerable d3 v2 stack); landing-page bundle decoupling from `data.js`; Hero3D fix lands in PR #3.
