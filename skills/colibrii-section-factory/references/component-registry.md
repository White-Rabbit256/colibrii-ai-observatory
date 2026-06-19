# Component Registry — Reusable Section Components

Check here BEFORE building. Extend here AFTER building. (Reuse-first rule.)

## Platform primitives — `components/ui.jsx`
| Component | Use |
|---|---|
| `Card` | motion card, hover lift, optional accent top-border |
| `SH` | section header: eyebrow + Playfair headline + desc |
| `Stat`, `MiniStat`, `AN` | animated stat displays / counters |
| `ScrollReveal` | IO-triggered reveal wrapper |
| `Tag`, `Bx`, `KeyInsight` | chips, nested boxes, callouts |
| `Lnk` | external link w/ icon, noopener |
| `Flag` | country flag (ISO-2) |
| `ShareBtn` | html-to-image branded PNG export (the growth loop) |
| `ErrorBoundary` | module crash isolation (shell wraps tabs) |
| `LoadCard`, `Grid`, `TabContent` | shell loading/layout helpers |
| motion variants | `fadeUp fadeIn scaleIn stagger slideIn tabVariants` |

## System
- `components/system/Icon.jsx` — 37 custom SVG icons (24×24). Add icons here, keep stroke style.

## Flagship-section patterns
| Pattern | Reference implementation |
|---|---|
| Canvas hero background (particles/mesh/scanlines) | `ILIADeep.jsx` → `HeroBackground`; **generalized:** `components/energia/GridHero.jsx` |
| Bilingual data module + `T()` resolver | `iliaData.js` + `ILIADeep.jsx` |
| Animated leaderboard bars (IO-triggered) | `ILIADeep.jsx` → `ScoreBar` |
| Expandable detail cards (scrollIntoView on open) | `ILIADeep.jsx` → `DimensionCard` |
| Stakeholder/timeline visuals, vote arithmetic | `components/energia/` (Energía run #1) |
| Interactive weight sliders (composite index) | `components/energia/EnergiaInteractive.jsx` → `EcaiExplorer` |
| Country cost comparator (input → computed table) | `components/energia/EnergiaInteractive.jsx` → `TariffComparator` |
| Scenario toggle explorer (projection lines) | `components/energia/EnergiaInteractive.jsx` → `ScenarioExplorer` |
| Scroll-progress bar (section-local) | `EnergiaDeep.jsx` → `ScrollProgress` |

## Registration recipe
TABS entry → PortalShell dynamic import + case + slugs (ES/EN) → PortalSidebar group. `data/facts.js` auto-counts.

## Promotion rule
A component used by 2+ sections moves to `ui.jsx` (or `components/system/`) and gets a row in the platform-primitives table above.
