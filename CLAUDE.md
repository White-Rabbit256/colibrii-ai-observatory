# Colibrii AI Observatory — session guide

Live product: https://colibriilabs.ai (+ .com). Next.js 14 App Router · React 18 · zero backend (data-as-code) · Vercel. Bilingual ES-first via `{es,en}` objects + `T()` resolver. License CC BY-NC 4.0.

## Read first (canonical memory)
1. `knowledge/architecture.md` — how the platform and section factory work
2. `knowledge/decisions-log.md` — append-only; never edit prior entries
3. `agents/orchestrator.md` — the section-build pipeline; personas in `agents/personas/`
4. `DISCOVERY.md` — Phase 0 inventory (read once per repo lifetime)

## Gates (all must pass before any PR)
- `npm run build` green (First Load JS budget: `/app` ≈ 254 kB; heavy views ride lazy chunks)
- `npm run lint` green — ESLint is `next/core-web-vitals` via `.eslintrc.json`; errors fail the build
- Every on-screen figure resolves to a `SRC` entry in its data module (no orphan numbers)
- WCAG AA in both themes; `prefers-reduced-motion` fallbacks; keyboard operability

## Hard rules
- Truthful status only: only CAPI-CR is an active algorithm; patents drafted, none filed
- Spanish-first for user-facing copy; every string ships in ES + EN
- Zero cookies / zero tracking is a product promise — no third-party scripts, no CSP relaxation
- Scraping/data: public/aggregate sources only, robots.txt + ToS respected, derived data only
- Parallel subagents write only new files under `components/<topic>/`; shared registries (`components/data.js`, `components/portal/PortalShell.jsx`, `components/ui.jsx`) have a single writer

## Session end
Write back to `/knowledge` (what was built, decided, learned). `decisions-log.md` is append-only.
