# DISCOVERY.md — Phase 0: Inventory, Reconciliation & Build Plan
**Mission:** "Energía" section + reusable section-factory architecture
**Date:** 2026-06-10 · **Branch:** `claude/zen-lovelace-5l2e7g`

---

## 1. Full Inventory

### 1.1 Skills

| Location | Skill | Relevance to mission |
|---|---|---|
| `/mnt/skills/public/` | docx, pdf, pdf-reading, pptx, xlsx, file-reading | Document I/O utilities — not needed for this build |
| `/mnt/skills/public/frontend-design` | frontend-design | General frontend guidance — superseded by repo's own deployed design system |
| `/mnt/skills/public/product-self-knowledge` | product-self-knowledge | N/A |
| `/mnt/skills/user/` | **DOES NOT EXIST** | — |
| **`colibrii-ops-center`** | **NOT FOUND anywhere** (searched `/mnt/skills/*`, `$HOME`, repo) | The mission names it as the MASTER skill. It is absent from this environment. See §4 Conflict C5. |
| `skills/latam-ai-readiness/` (in repo) | LATAM AI Readiness Analyst v1.0.0 | **REUSE.** CAPI-CR methodology (6 dims, incl. D5 Sustainable Energy), 20-country DB, ILIA 2025, response guidelines ("never fabricate data", "always cite scores+sources"). The section-factory skill cross-references it. |
| Session skills (harness) | deep-research, verify, code-review, simplify, run, security-review, etc. | Available as QA/research tooling during factory runs |

### 1.2 MCP servers

| Server | Capability | Use in this mission |
|---|---|---|
| `github` | PRs, issues, file ops, CI — scoped to `white-rabbit256/colibrii-ai-observatory` | Phase 4: draft PR creation |
| `Vercel` | `deploy_to_vercel`, deployments, build logs, projects | Phase 4: staging deploy + preview URL |
| `GoDaddy` | Domain availability | Not needed |
| `Gmail`, `Google Calendar` | Mail/calendar | Not needed |
| `mcp-server/` (in repo) | Colibrii Observatory MCP: `get_country_profile`, `get_capi_cr_score`, `compare_countries`, `get_ilia_rankings`, `get_governance_scores`, workforce, regulatory, sources registry | **REUSE as pattern.** It is the repo's existing "data as tools" layer. It contains **no energy-sector data yet** — extending it with ECAI-CR is logged as backlog (not required for the web section). |

### 1.3 Repo orchestration configs from previous sessions

- **CLAUDE.md:** none. **`.claude/`:** none. **`/agents`:** none. **Hooks:** none.
- Git history shows a phase-based build discipline (Phases 2–8 in commit messages) — the factory formalizes what previous sessions did ad hoc.

### 1.4 Existing platform architecture (the canonical reality)

- **Stack:** Next.js 14 (App Router) · React 18 · Recharts 2.15 · framer-motion 12 · html-to-image · react-simple-maps · Vercel. **No backend, no DB** — data-as-code modules.
- **Portal pattern:** `components/portal/PortalShell.jsx` — tab registry `TABS` in `components/data.js`, sidebar groups in `PortalSidebar.jsx` (`GROUPS`), hash routing via `SLUG_TO_TAB`/`TAB_TO_SLUG`, every tab lazy-loaded via `next/dynamic` (flagship deep-dives use `ssr:false`).
- **Section pattern (flagships ILIADeep, AgenticAI):** one view component + one bilingual data module (`iliaData.js`, `agenticData.js`), canvas `HeroBackground` (constellation + mesh blobs + scanlines), `T(v, lang)` resolver for `{es,en}` objects, `ErrorBoundary` wrap in shell.
- **Design tokens:** CSS custom properties in `app/globals.css` ("Iridescent Command Center" v13). Light theme default + `[data-theme="dark"]`. Existing brand vars include `--navy`, `--gold`. Fonts via `next/font`: **Inter (body) · Playfair Display (display) · IBM Plex Mono (mono)**.
- **Shared UI (`components/ui.jsx`):** `Card, SH, Stat, AN` (animated number), `ScrollReveal`, `Tag, Bx, MiniStat, KeyInsight, FreshnessBadge, Lnk, Flag`, `ShareBtn` (html-to-image PNG export, pixelRatio 2 — the growth-loop primitive **already exists**), `ErrorBoundary`.
- **Data discipline:** `sourcesData.js` + SourcesExplorer tab; `data/facts.js` computes all counts dynamically (TABS.length auto-updates).
- **Security/CSP:** strict CSP; `img-src` allows `https:`; **`frame-src` allows only self + TikTok** (relevant to video embeds — see C6).
- **3D precedent:** `components/ilia/ParticleHero.jsx` + `GlobeScene.jsx` are **stubs**: *"deferred to Phase 2 (R3F compatibility resolution needed)"*. A previous session already tried React-Three-Fiber and backed out; the shipped ILIA hero is a 2D-canvas constellation that looks premium and costs 0 KB of deps.

### 1.5 Memory layer / Obsidian vault

Searched: `.obsidian/`, `/knowledge`, `/vault`, `/wiki` in repo, `$HOME`, `/mnt`, filesystem-wide. **No vault or knowledge layer exists anywhere.**
→ Per mission rule 2: **I created `/knowledge` in this repo because none was found.** It is Obsidian-compatible markdown with wikilinks and is from now on the canonical memory.

### 1.6 Research inputs (canonical)

- `armonizacion_1.md` — global energy/AI landscape + ECAI-CR + comparative models (uploaded, ingested).
- `armonizacion_2.md` — Expediente 23.414 post-desconvocatoria deep analysis (uploaded, ingested).
- Both are preserved (provenance + key figures) in `/knowledge/sections/energia.md`. Where the two reports disagree, **armonizacion_2 (newer, post-27-May) wins**; prompt anchors win over both where explicitly stated (e.g. first-debate vote count 27-24, ICE debt −25%, leverage 27.8%, Moody's Ba1).

---

## 2. Reuse Map (mission need → existing asset)

| Mission need | Existing asset | Action |
|---|---|---|
| Section shell, routing, lazy-load | PortalShell TABS/GROUPS/slugs | EXTEND (add `energia` tab) |
| Design tokens, dark/light | globals.css CSS vars | USE; add section-local accents only |
| Bilingual ES/EN | `en` state + `{es,en}` + `T()` resolver | USE (i18n pattern exists → ES primary + EN toggle) |
| Animated counters / stat reveal | `AN`, `Stat`, `ScrollReveal` | USE |
| Charts | Recharts 2.15 (donut, bar, radar, line, area) | USE — no new chart lib |
| "Share this chart" PNG w/ watermark | `ShareBtn` (html-to-image) | USE on every major viz |
| Hero w/ animated 3D feel | ILIA canvas `HeroBackground` pattern | EXTEND (CR grid-map canvas hero) |
| Source provenance UX | `Lnk`, `FreshnessBadge`, sourcesData pattern | USE + formalize in data-standards.md |
| Country flags / comparisons | `Flag`, latam-ai-readiness country DB | USE |
| Data-module convention | `iliaData.js` / `agenticData.js` shape | FOLLOW for `energiaData.js` |
| Deploy | Vercel MCP | USE (Phase 4) |
| Research synthesis agents | Agent tool (subagents), deep-research skill | USE (factory pipeline + persona board) |

**Custom tools/scripts check (Reuse-First Rule §3):** No custom script is being written in this mission. Every capability maps to an existing repo component, an existing dependency, or the Agent/Vercel/GitHub tooling above. The only genuinely new builds are listed in §5.

---

## 3. Vault summary

N/A — none existed (§1.5). `/knowledge` created in this mission with `architecture.md`, `decisions-log.md`, `sections/energia.md`.

---

## 4. Conflicts found & resolutions

Precedence applied: **(1) repo reality/deployed design system → (2) user skills → (3) this prompt's defaults.**

| # | Conflict | Resolution |
|---|---|---|
| **C1** | Prompt design tokens: navy `#0A1F3F`, turquoise `#00B5A8`, gold `#F2B135`, **Inter/Merriweather**, **dark-mode-first** vs. deployed system: CSS-var themes (light default + dark), Inter/**Playfair Display**/IBM Plex Mono | **Repo wins (precedence 1).** Keep global token system and Playfair Display. Turquoise `#00B5A8` + gold `#F2B135` + navy become **section-local accent constants** in `energiaData.js` (precedent: every tab declares its own accent `c`). The hero + key dataviz panels are styled dark-on-navy in both themes (same approach the ILIA hero ships today) → honors "dark-first" intent without forking the theme system. **Override of prompt default — flagged.** |
| **C2** | Prompt: Three.js/React-Three-Fiber hero | **Repo wins.** R3F was previously attempted and explicitly deferred ("compatibility resolution needed" — stubs in `components/ilia/`). Adding three+R3F (~150 KB gz lazy) re-opens a known failure for marginal gain. Hero = **2D-canvas stylized CR map with glowing grid + generation nodes** (extends the proven constellation-canvas pattern), lazy-mounted, degrades to static gradient when `prefers-reduced-motion` or small viewports. Satisfies "one excellent 3D moment, performance-budgeted, mobile-degrades-to-static" with 0 KB new deps. **Override of prompt default — flagged.** |
| **C3** | Prompt: "vertical scroll, blog-style" standalone section | Repo is a tab-based portal SPA. Energía ships as a **new tab in the ANÁLISIS PROFUNDO group** (slugs `#energia` / `#energy`), itself a vertical-scroll 8-act narrative inside the tab — exactly how ILIA/Agentic flagships work. No conflict in substance. |
| **C4** | Prompt: Spanish primary + EN toggle "if i18n exists" | i18n exists (`en` state). Section ships fully bilingual. No conflict. |
| **C5** | Mission: factory skill must extend **colibrii-ops-center** | That skill **does not exist in this environment** (§1.1). The factory skill is written as the operating master for section-building, explicitly cross-referencing `skills/latam-ai-readiness` and repo docs; it declares that if `colibrii-ops-center` appears in a future session, it **supersedes** the factory's generic conventions. |
| **C6** | Prompt: embedded videos (IEA, TerraPower, TMI) | Current CSP `frame-src` allows only TikTok; the platform's stated identity is zero-cookies/zero-tracking. Auto-loading YouTube iframes would violate both. Resolution: **branded link-out video cards** (thumbnail-styled, `rel="noopener"`), no CSP relaxation, no third-party JS. Logged in decisions-log. |
| **C7** | Prompt: "IMAGES FROM INTERNET" with verified licensing | License verification requires live web checks; hotlinking third-party press-kit images is also a reliability + licensing risk inside a CC-BY-NC repo. Per the prompt's own rule — *"If license unclear → don't use; note it for manual sourcing"* — v1 ships with **zero unverified third-party imagery** (visual load carried by canvas hero, charts, SVG figures). A candidate-image table (TMI/Constellation press kit, TerraPower, Reventazón/Miravalles via ICE press/Wikimedia, NASA China solar, Intel CR) with license-status TODO lives in `/knowledge/sections/energia.md` backlog. |
| **C8** | Two research reports disagree on facts (vote 27-25 vs 27-24; debt −21% vs −25%; leverage 30% vs 27.8%; Moody's Ba2 Nov-2024 vs Ba1 Sep-2025; renewables 2024 86.8% vs 89.4%) | **armonizacion_2 (newer) + prompt anchors win:** 27-24 · −25% since Dec-2022 · 27.8% (cap 45%) · Moody's **Ba1 stable (Sep 2025)** · 2024 = 89.4%. Each figure carries its source + confidence flag in `energiaData.js`. |

---

## 5. Genuine gaps → new builds

1. `/agents/` — orchestrator + 8 specialist agent definitions + 12 personas (nothing existed).
2. `/skills/colibrii-section-factory/` — SKILL.md + 5 reference docs (no section-build skill existed).
3. `/knowledge/` — memory layer (none existed; §1.5).
4. `components/energiaData.js` — energy dataset w/ full provenance (no energy data anywhere in repo).
5. `components/EnergiaDeep.jsx` + `components/energia/*` — the section (hero canvas, charts, ECAI-CR interactive, tariff comparator, scenario explorer, timeline, stakeholder map, 38-vote visual, comparative cards, 12 amendments).
6. Registry edits: `TABS`, PortalShell import/case/slugs, PortalSidebar group.

## 6. Build plan

1. **Phase 1 (architecture):** write `/agents/*`, `/agents/personas/*`, `/skills/colibrii-section-factory/*`, seed `/knowledge/*`. Commit.
2. **Phase 2 (section, run BY the factory):** data-engineer pass → `energiaData.js` (every figure vs. reports). Then parallel subagents: 3d-engineer (GridHero canvas), viz-engineer (charts), viz-engineer-2 (interactive tools); orchestrator/frontend-dev assembles `EnergiaDeep.jsx` + registry. Build + lint gate. Commit.
3. **Phase 3 (persona board):** 12 parallel read-only review subagents → synthesized ranked fix list → fix → re-run BLOCK/FIX personas (≤3 iterations). Commit.
4. **Phase 4 (close-out):** push, draft PR, Vercel preview deploy, update `/knowledge`, update SKILL.md with lessons, final report.
