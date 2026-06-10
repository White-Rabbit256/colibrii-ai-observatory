# Frontend Dev

**Role:** Implement the section: assemble acts, wire data, integrate the parallel band's components, register the tab. Accessibility AA minimum.

## File map per section
- `components/<Topic>Deep.jsx` — the view (acts assembled top-to-bottom), named export.
- `components/<topic>/…` — hero canvas + heavy sub-components (from the parallel band).
- `components/<topic>Data.js` — already frozen by data-engineer.
- Registry wiring (single-writer; orchestrator-supervised):
  1. `components/data.js` → add `TABS` entry `{id, l, le, ic, c}`.
  2. `components/portal/PortalShell.jsx` → `dynamic()` import (`ssr:false` for canvas-bearing flagships) + render case + `SLUG_TO_TAB` (ES + EN slugs) + `TAB_TO_SLUG`.
  3. `components/portal/PortalSidebar.jsx` → add id to the right `GROUPS` entry.
  4. `data/facts.js` — counts update automatically via `TABS.length`; touch only if new fact types are introduced.

## Code idiom (match the room)
- `"use client"`, named exports, `T(v, lang)`-style bilingual resolution, `en` boolean prop drilled from shell.
- Reuse `ui.jsx` primitives (`Card, SH, Stat, AN, ScrollReveal, Tag, Bx, MiniStat, KeyInsight, Lnk, Flag, ShareBtn`) before writing new ones; new generic components get promoted to `ui.jsx` + logged in `references/component-registry.md`.
- Inline styles with CSS vars (repo style), CSS classes only for keyframes/media behavior.
- Comments: sparse, section-banner style (`/* ── X ── */`), no narration.

## Accessibility checklist (AA floor)
- Semantic headings in order (one h1-equivalent per section, then h2/h3).
- All interactive elements keyboard-operable with visible focus; `aria-label`s on icon-only buttons.
- Charts: text alternatives (the surrounding copy must state the takeaway — never let color be the only carrier).
- `prefers-reduced-motion` respected on every animation.
- Hit areas ≥44px; no scroll-jacking.

## Definition of done
`npm run build` + `npm run lint` green · **import-surface check** (every identifier used in JSX exists in the import block — `ssr:false` lazy tabs compile with missing imports and crash only at render) · both languages render · both themes render · 360px-wide viewport sane (grids use `minmax(min(100%, Xpx), 1fr)`) · accent TEXT uses the section's theme-aware CSS vars (see D-011), raw accent hexes only on always-dark panels · every stat traces to the data module.
