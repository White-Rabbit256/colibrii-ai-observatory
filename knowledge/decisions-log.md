# Decisions Log (append-only)

> Newest at the bottom. Never edit prior entries; supersede with a new entry.

---

**D-001 · 2026-06-10 · Memory layer created**
No Obsidian vault or knowledge directory existed anywhere in the environment (searched `.obsidian/`, `/knowledge`, `/vault`, `/wiki`, `$HOME`, `/mnt`). Created `/knowledge` in-repo as the canonical, Obsidian-compatible memory. Rationale: mission rule — only create if none found; none found.

**D-002 · 2026-06-10 · Design tokens: repo system wins (DISCOVERY C1)**
Prompt requested navy/turquoise/gold + Inter/Merriweather + dark-mode-first. Deployed system is CSS-var themed (light+dark) with Inter/Playfair/IBM Plex Mono. Resolution: keep global system; Energía declares section-local accents (navy `#0A1F3F`, turquoise `#00B5A8`, gold `#F2B135`); hero/dataviz panels dark-styled in both themes (ILIA precedent). Playfair stands in for Merriweather (no new fonts).

**D-003 · 2026-06-10 · Hero: canvas, not R3F (DISCOVERY C2)**
Previous session already deferred R3F ("compatibility resolution needed" stubs). Energía hero = 2D canvas (CR silhouette + glowing generation nodes + transmission arcs), DPR-capped, reduced-motion static fallback, zero new deps. Revisit R3F only with a dedicated compatibility spike.

**D-004 · 2026-06-10 · Energía ships as portal tab, not standalone route (DISCOVERY C3)**
New tab `energia` in ANÁLISIS PROFUNDO group, slugs `#energia`/`#energy`, vertical 8-act scroll inside the tab — flagship idiom (ILIA/Agentic).

**D-005 · 2026-06-10 · Videos: link-out cards, no CSP relaxation (DISCOVERY C6)**
CSP `frame-src` allows only TikTok; platform promises zero cookies/tracking. IEA/TerraPower/TMI videos render as branded external link cards (`rel="noopener noreferrer"`).

**D-006 · 2026-06-10 · Third-party photos: none in v1 (DISCOVERY C7)**
License verification not completable in-session → per the mission's own rule, ship zero unverified imagery; candidates + license-status table live in [[sections/energia]] backlog. Visual load carried by canvas hero + charts + SVG.

**D-007 · 2026-06-10 · Research conflicts resolved newest-wins (DISCOVERY C8)**
armonizacion_2 (post-27-May-2026) + prompt anchors override armonizacion_1 where they disagree: first debate **27-24**; ICE debt **−25% since Dec-2022**; Ley 8660 leverage **27.8%** (Sep-2025); Moody's **Ba1 estable (29-Sep-2025)**; renewables 2024 **89.4%** (per prompt; report_2 also cites 86.8% from report_1 lineage — flagged `reported`, both kept in provenance).

**D-008 · 2026-06-10 · ECAI-CR formula normalization**
Report gives weights 0.30 tariff / 0.25 clean / 0.20 SAIDI / 0.15 headroom / 0.10 MER and country scores CR ~0.71, UY ~0.78, MX ~0.62, PA ~0.65 — but not every component value. Implementation: component scores (0–1) per country reverse-engineered to reproduce the published composites within ±0.01, each component sourced where a primary figure exists (tariff, clean share) and flagged `estimate` where derived (SAIDI norm, headroom, MER). Interactive sliders renormalize weights to Σ=1 and recompute live — methodology disclosed in-UI. Weights "should be peer-reviewed" caveat shown.

**D-009 · 2026-06-10 · Tariff comparator basis**
Comparator uses the mixed-methodology tariff table from armonizacion_1 §3.1 with explicit per-row source + basis labels (some are tariff-class quotes, some system averages). UI states comparability caveat on-chart (data-viz persona requirement). CR shown as a band (T-MTb 100 → industrial-avg 150 US$/MWh) rather than a single flattering point.
