// components/energia/globeEncoding.js
// Single source of truth for all globe encoding constants.
// PowerGlobe.jsx, CRGridMap.jsx, and future Energía components import from here.
// FUEL_COLORS and EN_ACCENT remain in energiaData.js (brand-token layer).
import { FUEL_COLORS, EN_ACCENT } from "../energiaData.js";

// ── 1. FUEL HEX (WRI primary_fuel string → hex) ──
export const FUEL_HEX = {
  Hydro:          FUEL_COLORS.hydro,        // #0d9488
  Solar:          FUEL_COLORS.solar,        // #fb923c
  Wind:           FUEL_COLORS.wind,         // #7dd3fc
  Geothermal:     FUEL_COLORS.geothermal,   // #f59e0b
  Nuclear:        FUEL_COLORS.nuclear,      // #a78bfa
  Gas:            FUEL_COLORS.gas,          // #d97706
  Oil:            FUEL_COLORS.oil,          // #fb7185
  Coal:           FUEL_COLORS.coal,         // #9ca3af
  Biomass:        FUEL_COLORS.biomass,      // #84cc16
  Waste:          FUEL_COLORS.waste,        // #a3e635
  Storage:        FUEL_COLORS.storage,      // #60a5fa
  Cogeneration:   FUEL_COLORS.cogeneration,
  Petcoke:        FUEL_COLORS.coal,
  CSP:            FUEL_COLORS.csp,
  "Wave and Tidal": "#06b6d4",
  Other:          "#94a3b8",
};

// ── 2. ARC KIND ENCODING (RGBA endpoints for subtle bloom-like fade) ──
export const ARC_KIND = {
  siepac: {
    label:    { es: "SIEPAC", en: "SIEPAC" },
    color:    ["rgba(242,177,53,0.9)", "rgba(251,191,36,0.7)"],
    stroke:   1.1,
    dashLen:  0.45,
    dashGap:  0.12,
    altFloor: 0.09,
    animMs:   (_mw) => 2200,
    legendSwatch: { width: 22, height: 4, style: "solid", color: EN_ACCENT.gold },
  },
  hvdc: {
    label:    { es: "HVDC", en: "HVDC" },
    color:    ["rgba(34,211,238,0.9)", "rgba(0,181,168,0.7)"],
    stroke:   0.60,
    dashLen:  0.45,
    dashGap:  0.12,
    altFloor: 0.05,
    animMs:   (mw) => mw > 8000 ? 2000 : mw > 3000 ? 2800 : mw > 1000 ? 4200 : 6000,
    legendSwatch: { width: 22, height: 3, style: "solid", color: EN_ACCENT.glow },
  },
  ac: {
    label:    { es: "Enlace CA", en: "AC link" },
    color:    ["rgba(16,185,129,0.85)", "rgba(52,211,153,0.65)"],
    stroke:   0.48,
    dashLen:  0.45,
    dashGap:  0.12,
    altFloor: 0.07,
    animMs:   (mw) => mw > 3000 ? 2800 : mw > 1000 ? 4200 : 6000,
    legendSwatch: { width: 22, height: 2, style: "solid", color: EN_ACCENT.green },
  },
  planned: {
    label:    { es: "PLANIFICADO", en: "PLANNED" },
    color:    ["rgba(129,140,248,0.7)", "rgba(165,180,252,0.5)"],
    stroke:   0.30,
    dashLen:  0.16,
    dashGap:  0.50,
    altFloor: 0.12,
    animMs:   (_mw) => 5200,
    legendSwatch: { width: 22, height: 1.5, style: "dashed", color: EN_ACCENT.violet },
  },
};

export const ARC_COLOR_FN    = (a) => ARC_KIND[a.kind]?.color   ?? ARC_KIND.hvdc.color;
export const ARC_STROKE_FN   = (a) => ARC_KIND[a.kind]?.stroke  ?? 0.50;
export const ARC_DASH_LEN_FN = (a) => ARC_KIND[a.kind]?.dashLen ?? 0.45;
export const ARC_DASH_GAP_FN = (a) => ARC_KIND[a.kind]?.dashGap ?? 0.12;
export const ARC_ALT_FN = (a) => {
  const base  = 0.05 + Math.min(0.15, (a.mw || 500) / 80000);
  const floor = ARC_KIND[a.kind]?.altFloor ?? 0.05;
  return Math.max(floor, base); // cap always < atmosphereAltitude 0.22
};
export const ARC_DASH_ANIM_FN = (a, reduced) => {
  if (reduced) return 0;
  const fn = ARC_KIND[a.kind]?.animMs;
  return fn ? fn(a.mw || 500) : 4000;
};

// ── 3. ALTITUDE (locked) ──
export const ALT_FLOOR       = 0.004;
export const ALT_CAP         = 0.14;
export const ALT_COEFFICIENT = 900;
export const altOf = (mw) =>
  Math.max(ALT_FLOOR, Math.min(ALT_CAP, ALT_FLOOR + Math.sqrt(mw || 8) / ALT_COEFFICIENT));
export const ALT_LEGEND_MW = [500, 5000, 15000];

// ── 4. RING ──
export const RING = {
  colorFn: () => (t) => `rgba(34,211,238,${1 - t})`,
  focus: {
    cr:     { maxRadius: 4,   propagationSpeed: 2.2, repeatPeriod: 800,  count: 5 },
    global: { maxRadius: 3,   propagationSpeed: 1.0, repeatPeriod: 2200, count: 3 },
  },
};

// ── 5. DC GLYPH ──
export const DC_GLYPH = {
  1: {
    size:       14,
    background: "rgba(255,255,255,0.95)",
    border:     `1px solid ${EN_ACCENT.glow}`,
    boxShadow:  `0 0 12px ${EN_ACCENT.glow}`,
    rotation:   "rotate(45deg)",
    label:      { es: "Hub IA T1", en: "AI hub T1" },
  },
  2: {
    size:       9,
    background: "rgba(255,255,255,0.90)",
    border:     `1px solid ${EN_ACCENT.glow}`,
    boxShadow:  `0 0 7px ${EN_ACCENT.glow}`,
    rotation:   "rotate(45deg)",
    label:      { es: "Hub IA T2", en: "AI hub T2" },
  },
};
export const DC_ALTITUDE = 0.04;

/* Phase 2 — Cañas SIEPAC anchor. The only marker on the globe with TWO core
   colors: gold outer + cyan inner, plus a permanent mono caption underneath.
   The SIEPAC anchor and Expediente 23.414 are now readable without needing
   focus=cr. Backward-compat aliases (size, background) kept for any older
   code path that reads them. */
export const CR_HUB_GLYPH = {
  outerSize:      22,
  innerSize:      6,
  outerBg:        EN_ACCENT.gold,   // #F2B135
  innerBg:        EN_ACCENT.glow,   // #22d3ee
  border:         "2px solid #ffffff",
  boxShadow:      `0 0 24px ${EN_ACCENT.gold}aa, 0 0 8px ${EN_ACCENT.gold}`,
  boxShadowHover: `0 0 36px ${EN_ACCENT.gold}, 0 0 14px ${EN_ACCENT.gold}`,
  rotation:       "rotate(45deg)",
  caption:    { es: "CAÑAS · NODO SIEPAC", en: "CAÑAS · SIEPAC ANCHOR" },
  captionSub: { es: "Exp. 23.414",         en: "Bill 23.414" },
  // Phase 1 compatibility aliases
  size:           22,
  background:     EN_ACCENT.gold,
};

/* Phase 2 — Continuous MW-scaled DC glyph (replaces binary tier rendering).
   Used by PowerGlobe makeDc to size diamonds + halos proportional to demand.
   AI-scale threshold (>=700 MW) gets a gold ring + slow pulse. */
export const DC_SCALE = {
  size:    (mw) => Math.max(8,  Math.min(24, Math.sqrt(mw || 100) / 4)),
  halo:    (mw) => Math.max(14, Math.min(40, Math.sqrt(mw || 100) / 2.2)),
  haloA:   (mw) => 0.18 + Math.min(0.32, (mw || 0) / 12000),
  aiScale: (mw) => (mw || 0) >= 700,
  topNames: new Set([
    "Northern Virginia", "Phoenix", "Singapore", "Frankfurt", "London",
  ]),
  topNameShort: { "Northern Virginia": "NoVA", "Santa Clara / Silicon Valley": "SV" },
};

// ── 7. SCENE CONSTANTS ──
export const SCENE = {
  globeImageUrl:      "https://cdn.jsdelivr.net/gh/vasturiano/three-globe@v2.45.2/example/img/earth-night.jpg",
  atmosphereColor:    EN_ACCENT.sky,    // #38bdf8
  atmosphereAltitude: 0.22,             // > ALT_CAP (0.14), > arc alt cap ~0.20
  pointRadius:        { compact: 0.16, full: 0.13 },
  pointResolution:    3,
  pointsMerge:        true,
  dprCap:             { compact: 1.5, full: 2.0 },
  autoRotateSpeed:    0.45,
};

// ── 8. TIMING ──
export const TIMING = {
  introCameraMs:      1400,
  introArcsDelayMs:   700,
  introRingsDelayMs:  1200,
  introPointsDelayMs: 350,
  focusTweenMs:       1200,
  rotResumeDelayMs:   1250,
  buttonTransitionMs: 150,
  cameraStartAlt:     4.5,
};

// ── 9. LEGEND ──
export const FUEL_LEGEND = [
  "Hydro","Solar","Wind","Geothermal","Nuclear","Gas","Coal","Oil","Biomass","Storage",
];
export const FUEL_ES = {
  Hydro: "Hidro", Solar: "Solar", Wind: "Eólica", Geothermal: "Geotérmica",
  Nuclear: "Nuclear", Gas: "Gas", Coal: "Carbón", Oil: "Petróleo",
  Biomass: "Biomasa", Storage: "Almacenamiento", CSP: "Solar térmica",
  "Wave and Tidal": "Mareal y undimotriz", Cogeneration: "Cogeneración",
  Waste: "Residuos", Petcoke: "Coque de petróleo", Other: "Otra",
};
export const ARC_LEGEND_ORDER = ["siepac", "hvdc", "ac", "planned"];

// ── 10. KIND LABEL (for tooltip / aria-live) ──
export const KIND_LABEL = {
  siepac:  { es: "SIEPAC",      en: "SIEPAC" },
  hvdc:    { es: "HVDC",        en: "HVDC" },
  ac:      { es: "Enlace CA",   en: "AC link" },
  planned: { es: "PLANIFICADO", en: "PLANNED" },
};
