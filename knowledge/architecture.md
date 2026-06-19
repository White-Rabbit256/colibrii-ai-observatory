# Architecture — How the Section Factory Works

> Read me first at session start. Companion: [[decisions-log]] · per-section notes in `sections/`.

## What this is
The Colibrii Observatory grows by **sections** (flagship analysis tabs). The factory is the repeatable pipeline that turns `{topic, sources, priority}` into a shipped section. Definitions live in `/agents/` (pipeline + specialists + persona board) and `/skills/colibrii-section-factory/` (playbook + references). This file records how it works **in practice**.

## The platform in 60 seconds
Next.js 14 App Router · React 18 · zero backend · data-as-code. One SPA portal (`/app`) with tab registry (`TABS` in `components/data.js`), hash routing, per-tab lazy chunks. Bilingual via `{es,en}` objects + `T()` resolver + `en` boolean. Themes via CSS vars (light default + `[data-theme=dark]`). Charts: Recharts. Motion: framer-motion + IO reveals. Share: `ShareBtn` → branded PNG. Deploy: Vercel.

## Pipeline (proven in Run #1 — Energía, 2026-06)
1. **Phase 0 every time:** inventory env (skills/MCP may differ per session!), read this vault.
2. research → blueprint → **data module (frozen API)** — sequential.
3. Parallel band: hero canvas ‖ charts ‖ interactives — subagents writing ONLY new files in `components/<topic>/`.
4. Assembly + 4 registry edits — single writer.
5. Build gate → 12-persona board (parallel, read-only) → fix loop (≤3) → QA → deploy.

## Orchestration memory rules
- Vault = canonical. Session start: read. Session end: write back. decisions-log append-only.
- The data module is the contract; freeze before parallelizing.
- Subagents never touch shared registries (`data.js`, `PortalShell.jsx`, `ui.jsx`).

## Environment facts (verified 2026-06-10)
- `/mnt/skills/user` did not exist; `colibrii-ops-center` absent (see DISCOVERY.md §1.1, SKILL.md precedence note).
- MCP available: github (repo-scoped), Vercel (deploy/logs), GoDaddy, Gmail/GCal.
- R3F/three.js: NOT installed; previously attempted and deferred (`components/ilia/*` stubs). Canvas-hero pattern is the sanctioned approach.

## Index
- [[decisions-log]] — every major decision + rationale (append-only)
- [[sections/energia]] — Energía section: sources, provenance, decisions, backlog
- `DISCOVERY.md` (repo root) — Phase 0 inventory & conflict reconciliation for Run #1
