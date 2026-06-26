/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — Major HV interconnections (honest, illustrative)
   Real high-voltage / HVDC corridors and regional interconnections.
   Terminal points are the REAL geocoded cities/substations of each
   corridor (approximate); no coordinates are fabricated. Capacities
   are public, citable figures (ENTSO-E factsheets, IEA, SIEPAC/EPR,
   operator press) rounded for display. This is an illustrative grid
   layer, not an exhaustive transmission map.
   kind: 'hvdc' (intercontinental/long-haul) · 'siepac' (Central
   America regional, the Costa Rica tie-in) · 'ac' (major AC link).
   ═══════════════════════════════════════════════════════════════ */
export const HV_ARCS = [
  // ── Central America — SIEPAC (the Costa Rica tie-in) ──
  { from: "Costa Rica", to: "Panamá (Las Minas)", kind: "siepac", mw: 300, startLat: 9.93, startLng: -84.08, endLat: 7.97, endLng: -80.52 },
  { from: "Costa Rica", to: "Nicaragua", kind: "siepac", mw: 300, startLat: 9.93, startLng: -84.08, endLat: 12.13, endLng: -86.25 },
  { from: "Nicaragua", to: "Honduras", kind: "siepac", mw: 300, startLat: 12.13, startLng: -86.25, endLat: 14.10, endLng: -87.22 },
  { from: "Honduras", to: "El Salvador", kind: "siepac", mw: 300, startLat: 14.10, startLng: -87.22, endLat: 13.69, endLng: -89.19 },
  { from: "El Salvador", to: "Guatemala", kind: "siepac", mw: 300, startLat: 13.69, startLng: -89.19, endLat: 14.63, endLng: -90.51 },
  { from: "Panamá", to: { es: "Colombia (planificado)", en: "Colombia (planned)" }, kind: "planned", mw: 400, startLat: 8.98, startLng: -79.52, endLat: 8.0, endLng: -77.0 },

  // ── Americas — long-haul HVDC / major links ──
  { from: "Itaipú", to: "São Paulo", kind: "hvdc", mw: 6300, startLat: -25.41, startLng: -54.59, endLat: -23.55, endLng: -46.63 },
  { from: "Rio Madeira", to: "São Paulo", kind: "hvdc", mw: 7100, startLat: -8.76, startLng: -63.90, endLat: -23.55, endLng: -46.63 },
  { from: "Pacific DC Intertie", to: "Los Angeles", kind: "hvdc", mw: 3100, startLat: 45.60, startLng: -121.10, endLat: 34.05, endLng: -118.24 },
  { from: "Québec", to: "New England", kind: "hvdc", mw: 2000, startLat: 45.50, startLng: -73.57, endLat: 42.36, endLng: -71.06 },
  { from: "Nelson River (Bipoles I–III)", to: "Winnipeg", kind: "hvdc", mw: 3895, startLat: 56.00, startLng: -97.00, endLat: 49.90, endLng: -97.14 },

  // ── Europe — interconnectors ──
  { from: "North Sea Link", to: "United Kingdom", kind: "hvdc", mw: 1400, startLat: 59.00, startLng: 6.60, endLat: 55.01, endLng: -1.45 },
  { from: "NorNed", to: "Netherlands", kind: "hvdc", mw: 700, startLat: 58.00, startLng: 6.50, endLat: 53.22, endLng: 6.90 },
  { from: "IFA — Les Mandarins (FR)", to: "Sellindge (UK)", kind: "hvdc", mw: 2000, startLat: 50.94, startLng: 1.77, endLat: 51.08, endLng: 0.92 },
  { from: "España (Tarifa)", to: "Marruecos (Fardioua)", kind: "hvdc", mw: 700, startLat: 36.01, startLng: -5.60, endLat: 35.85, endLng: -5.36 },

  // ── Asia / Africa / Oceania ──
  { from: "Three Gorges / Gezhouba corridor", to: "Shanghai", kind: "hvdc", mw: 7200, startLat: 30.82, startLng: 111.00, endLat: 31.23, endLng: 121.47 },
  { from: "Xiangjiaba", to: "Shanghai", kind: "hvdc", mw: 6400, startLat: 28.65, startLng: 104.40, endLat: 31.23, endLng: 121.47 },
  { from: "Changji", to: "Guquan (UHVDC)", kind: "hvdc", mw: 12000, startLat: 44.02, startLng: 87.30, endLat: 31.30, endLng: 118.10 },
  { from: "Inga", to: "Kolwezi", kind: "hvdc", mw: 1100, startLat: -5.52, startLng: 13.62, endLat: -10.71, endLng: 25.47 },
  { from: "Etiopía (Sodo)", to: "Kenia (Suswa)", kind: "hvdc", mw: 2000, startLat: 6.85, startLng: 37.76, endLat: -1.10, endLng: 36.42 },
  { from: "Basslink", to: "Victoria", kind: "hvdc", mw: 500, startLat: -41.16, startLng: 146.36, endLat: -38.15, endLng: 147.07 },
  { from: "Leyte (Ormoc)", to: "Naga (Cebu)", kind: "hvdc", mw: 440, startLat: 11.24, startLng: 124.89, endLat: 10.19, endLng: 123.75 },
];
