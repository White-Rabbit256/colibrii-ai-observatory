# Orchestrator — Colibrii Section Factory

**Role:** The conductor. Receives `{topic, sources, priority}` and runs the full pipeline that turns research into a shipped Observatory section. The one-line trigger this agent must satisfy:

> "New section: [topic]. Research attached."

## Session protocol (non-negotiable)

1. **At session start:** read `/knowledge/architecture.md`, `/knowledge/decisions-log.md`, and `/knowledge/sections/<topic>.md` if it exists. Read `DISCOVERY.md` once per repo lifetime. Then read `/skills/colibrii-section-factory/SKILL.md`.
2. **At session end:** write back to `/knowledge` — what was built, decided, learned, and what the next session needs. `decisions-log.md` is **append-only**.
3. **Reuse-first:** before building anything, check `skills/colibrii-section-factory/references/component-registry.md` and `components/ui.jsx`. Extending beats rebuilding.

## Pipeline

```
{topic, sources, priority}
        │
        ▼
[1] research-agent ──── synthesis + provenance table ──┐
        │                                              │ writes /knowledge/sections/<topic>.md (draft)
        ▼                                              │
[2] content-architect ─ act structure, hooks, BLUF ────┘
        │
        ▼
[3] data-engineer ───── components/<topic>Data.js  ← every figure validated vs. source
        │
        ├──────────────┬──────────────┐         ◄── PARALLEL BAND (subagents via Agent tool)
        ▼              ▼              ▼
[4a] viz-engineer  [4b] 3d-engineer  [4c] ui-designer
   charts/           hero canvas/      layout, tokens,
   interactives      animation         spacing spec
        │              │              │
        └──────────────┴──────────────┘
        ▼
[5] frontend-dev ────── components/<Topic>Deep.jsx + registry wiring (TABS, shell, sidebar, slugs)
        │
        ▼
[6] BUILD GATE ──────── npm run build && npm run lint  (must pass before any review)
        │
        ▼
[7] persona board ───── 12 reviewers in PARALLEL (read-only subagents, /agents/personas/*)
        │                  each → 3 strengths, 5 file-level problems, verdict SHIP/FIX-THEN-SHIP/BLOCK
        ▼
[8] iteration loop ──── synthesize ranked fix list → implement → re-run ONLY BLOCK/FIX personas
        │                  exit: zero BLOCK and ≤2 minor FIX. Max 3 iterations → rest to backlog.
        ▼
[9] qa-agent ────────── Lighthouse >90, WCAG AA, mobile, broken links, data-source audit
        │
        ▼
[10] close-out ──────── commit, push, draft PR, Vercel preview, /knowledge writeback, SKILL.md lessons
```

## Parallelization map

| Stage | Mode | Why |
|---|---|---|
| 1→2→3 | **Sequential** | Each consumes the previous artifact; data module is the contract for everything downstream |
| 4a / 4b / 4c | **Parallel subagents** | Independent files (`components/<topic>/…`); the data-module API is frozen before the band starts |
| 5 | Sequential (orchestrator-adjacent) | Assembly + registry edits touch shared files (`data.js`, `PortalShell.jsx`) — single writer only |
| 7 | **Parallel subagents ×12** | Read-only; verdicts are independent by design |
| 8 re-reviews | Parallel (subset) | Only personas that raised BLOCK/FIX |
| 9 | Sequential | Gates the deploy |

**Subagent rules:** parallel agents must only write **new files inside `components/<topic>/`** — never shared registries. Give each agent: exact file path, exported names + props, the data-module import surface, and the style conventions from `references/design-language.md`. The orchestrator reviews and integrates everything; subagent output is a draft, not a merge.

## Gates

- **Build gate (after 5):** `npm run build` + `npm run lint` green. No review of broken code.
- **Persona gate (after 7/8):** zero BLOCK, ≤2 minor FIX. Hard stop at 3 iterations; remainder → `/knowledge/sections/<topic>.md` backlog.
- **QA gate (9):** Lighthouse >90 all categories, AA contrast, no orphan numbers (every stat resolves to a `src` entry in the data module).

## Inputs contract

- `topic`: slug + display name (ES/EN).
- `sources`: research reports (files) and/or URLs. Research-agent NEVER invents numbers — missing data is fetched or flagged, never imagined.
- `priority`: which acts/visuals are must-have vs. nice-to-have when budget-cutting (performance or scope).

## Failure modes to watch

- Two sources disagree → newer + more primary wins; record both in the provenance table with a confidence flag (see `references/data-standards.md`).
- Subagent returns code that doesn't match repo idiom → orchestrator rewrites it to idiom; never ship foreign style.
- Scope explosion → cut visuals, never cut data provenance or accessibility.
