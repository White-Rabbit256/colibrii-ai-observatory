# Colibrii Visual Identity — Design Language

**Source of truth:** `app/globals.css` ("Iridescent Command Center") + `components/ui.jsx`. This document maps brand intent onto the deployed system. Where they differ, **the deployed system wins** (DISCOVERY.md C1).

## Themes
Light (default) + Dark via `[data-theme="dark"]`. Every component must render correctly in BOTH. Full-bleed heroes may be dark-styled in both themes (ILIA precedent) — that is the sanctioned "dark-mode-first" expression.

## Core tokens (use the vars, not hex)
- Surfaces: `--bg --surface --surface2 --card --border --border2`
- Text: `--text --text2 --text3`
- Brand accents: `--cyan --violet --pink --amber --red --green --orange`, plus `--navy`, `--gold`
- Radii: `--radius`(14) `--radius-sm`(10) `--radius-xs`(6) · Shadows: `--shadow[-md|-lg|-glow]`
- Spacing: `--space-xs/sm/md/lg/xl` = 8/12/20/32/48
- Gradients: `--grad1 --grad2 --hero-bg`

## Section accent palettes
Each section declares accent constants in its data module (precedent: `TABS[].c`). **Energía palette:**
- Navy `#0A1F3F` (hero base) · Turquoise `#00B5A8` (electricity/clean energy) · Gold `#F2B135` (legislative emphasis) · supporting: `#22d3ee` (grid glow), `#ef4444` (thermal/risk)
- Accents color: act eyebrows, chart series, card top-borders, glows. Never body text.
- Contrast duty: turquoise/gold on navy pass AA for large text & UI elements; body text stays on `--text*` vars.

## Typography
- Display: Playfair Display via `var(--font-display)` (brand serif — the repo's Merriweather-equivalent; do not load new fonts)
- Body: Inter (`--font-inter`) · Numbers/labels: IBM Plex Mono
- Eyebrow idiom: 11px mono, `letterSpacing: 2`, uppercase, accent color (see `SH` component)

## Component idiom
`Card` (motion, hover-lift, accent top-border) · `SH` (eyebrow+headline+desc) · `Stat`/`MiniStat`/`AN` (animated numbers) · `Tag` chips · `Bx` nested boxes · `KeyInsight` callouts · `Lnk` external links · `Flag` country flags · `ShareBtn` PNG export. Hero = canvas background + content overlay (see `components/energia/GridHero.jsx`, `ILIADeep.jsx HeroBackground`).

## Motion
framer-motion variants from `ui.jsx` (`fadeUp, fadeIn, scaleIn, stagger`) + `ScrollReveal` for IO-triggered reveals + CSS keyframes for ambient loops. Everything honors `prefers-reduced-motion`.

## The hummingbird rule
Iridescence is ambient, not loud: gradient glows, subtle mesh blobs, scanlines at ≤4% opacity. One hero moment per section; the data is the spectacle.
