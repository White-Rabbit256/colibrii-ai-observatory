---
name: Colibrii Section Factory
description: End-to-end playbook for building a Colibrii Observatory flagship section from research to staged deploy — orchestrated multi-agent pipeline (research → architecture → data → parallel viz/hero/UI → assembly → persona board → QA → deploy) with compounding memory in /knowledge.
author: Colibrii Labs
version: 1.0.0
tags: [section-factory, orchestration, multi-agent, colibrii, observatory, data-journalism, nextjs]
---

# Colibrii Section Factory

How to build a Colibrii Observatory section end-to-end. The trigger this skill is designed for:

> **"New section: [topic]. Research attached."**

## Relationship to other skills (precedence)

- **`colibrii-ops-center`** is named by mission doctrine as the MASTER skill. It is **not present in this environment** (verified 2026-06-10, see `DISCOVERY.md` §1.1). This factory acts in its place for section-building; **if colibrii-ops-center appears in a future session, read it first — it supersedes** any generic convention here.
- **`skills/latam-ai-readiness`** (this repo) is the data/analysis companion: country DB, CAPI-CR methodology, response guidelines ("never fabricate data points"). Reuse its country facts and citation discipline; don't duplicate its tables.
- Repo docs (`docs/02_Technical_Summary.md`, `docs/03_Full_Documentation.md`) describe the deployed platform — they are reality; this skill defers to them.

## Memory discipline (binding)

1. **Session start:** read `/knowledge/architecture.md` + `/knowledge/decisions-log.md` + `/knowledge/sections/<topic>.md` (if exists) BEFORE proposing anything.
2. **Session end:** write back what was built/decided/learned + what the next session needs. `decisions-log.md` is append-only.
3. The vault is canonical. Update it; never fork a parallel memory.

## The pipeline (full definition: `/agents/orchestrator.md`)

| Stage | Agent | Artifact |
|---|---|---|
| 1 | research-agent | synthesis brief + provenance table → `/knowledge/sections/<topic>.md` |
| 2 | content-architect | 8-act blueprint (hooks, BLUF, CR-anchors) |
| 3 | data-engineer | `components/<topic>Data.js` — frozen API, every figure sourced |
| 4a‖4b‖4c | viz-engineer ‖ 3d-engineer ‖ ui-designer | charts/interactives ‖ hero canvas ‖ layout spec — **parallel subagents**, new files in `components/<topic>/` only |
| 5 | frontend-dev | `components/<Topic>Deep.jsx` + registry wiring (TABS, PortalShell, slugs, sidebar) |
| 6 | — | **BUILD GATE:** `npm run build` + lint green |
| 7 | personas ×12 | parallel read-only reviews → verdicts |
| 8 | orchestrator | ranked fixes → re-run BLOCK/FIX personas (≤3 iterations) |
| 9 | qa-agent | Lighthouse/AA/mobile/data audit |
| 10 | orchestrator | commit, push, draft PR, Vercel preview, `/knowledge` writeback |

## Repo integration recipe (the 4 registry edits)

1. `components/data.js` → `TABS.push({ id, l, le, ic, c })`
2. `components/portal/PortalShell.jsx` → `dynamic()` import (`ssr:false` if canvas) + render case + `SLUG_TO_TAB` (ES+EN) + `TAB_TO_SLUG`
3. `components/portal/PortalSidebar.jsx` → add id to a `GROUPS` entry
4. `data/facts.js` → counts auto-derive from `TABS`; no edit unless new fact types

## Hard rules (inherited by every section)

- **Data:** exact, sourced, conservative — `references/data-standards.md`. No orphan numbers. Ever.
- **Voice:** natural direct Spanish + EN mirror — `references/narrative-voice.md`. "Insumo técnico independiente"; never claim or imply Colibrii serves government.
- **Design:** deployed token system wins — `references/design-language.md`.
- **Hooks:** `references/engagement-hooks.md` — cold-open stat, scroll reveals, ShareBtn on every viz, CR-anchor every 2–3 scrolls.
- **Reuse:** check `references/component-registry.md` + `components/ui.jsx` before writing any component; promote new generic components back to the registry.
- **Budget:** mobile-first, Lighthouse >90 all categories, WCAG AA, zero new deps without size math + orchestrator sign-off.

## Lessons learned (update after every run)

### Run #1 — Energía (2026-06)
- `/mnt/skills/user` may not exist in a given environment — always re-inventory at Phase 0; never assume the master skill is mounted.
- R3F remains deferred (pre-existing decision); the 2D-canvas hero pattern (`HeroBackground` idiom) delivers the "one excellent 3D moment" at 0 KB — reuse `components/energia/GridHero.jsx` as the template.
- Bilingual data modules grow fast: keep prose in the view where possible, keep the data module numeric + provenance.
- Freeze the data-module API (export names + shapes) BEFORE spawning the parallel band; integration cost comes from API drift, not from code quality.
- Persona board: run all 12 in ONE parallel batch with explicit file lists; vague file scopes produce vague reviews. The board pays for itself: it caught a runtime crash the build can't see (see next).
- **Lazy-tab import trap:** `ssr:false` dynamic tabs compile even with missing imports — a referenced-but-unimported identifier crashes at render, not at build. Frontend-dev DoD now includes an import-surface check (grep every identifier used in JSX against the import block) before the build gate.
- **Light-theme accent contrast:** brand accents that pass on navy fail on light surfaces (~2.6:1). Use the section-scoped CSS-var pattern (`.energia-scope`, D-011): darkened accents in light theme, bright in dark; `var(--enX)` for text, raw hexes only on always-dark panels. Budget this from the start, not at review.
- Grids: always `repeat(auto-fit, minmax(min(100%, Xpx), 1fr))` — plain `minmax(Xpx, 1fr)` overflows 360px viewports.
- Push channels can die mid-session (git proxy 403 / MCP 401). Commit locally early and often; Vercel MCP deploys straight from the workspace, so staging is deliverable even with git down (D-010).
- Video embeds: CSP `frame-src` is TikTok-only and the platform promises zero tracking → use branded link-out video cards, don't relax CSP for YouTube.
- Third-party photos: if a license can't be verified in-session, ship without and log candidates in the section backlog (prompt rule, works well).
- Subagent reviews of in-flight code: freeze edits to any file a running reviewer is reading; batch your fixes for after the wave completes (one tiny exception per run, max).
