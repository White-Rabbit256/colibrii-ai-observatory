/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — Major HV interconnections (honest, illustrative)
   Real high-voltage / HVDC corridors and regional interconnections.
   Terminal points are the REAL geocoded substations/converter stations
   of each corridor (approximate); no coordinates are fabricated.
   Capacities are public, citable figures (ENTSO-E statistical
   factsheets, IEA World Energy Outlook 2024 Annex A, SIEPAC/EPR
   operator press releases, and operator regulatory filings) rounded
   for display. This is an illustrative grid layer, not an exhaustive
   transmission map.

   kind:
     'siepac'  — Central America regional 230 kV AC (the CR tie-in);
                 EOR/CRIE, operator: Empresa Propietaria de la Red (EPR)
                 Source: https://www.enteoperador.org/siepac/
     'hvdc'    — Long-haul HVDC or major inter-regional links
                 Sources: ENTSO-E, IEA WEO 2024, operator press
     'ac'      — Major AC interconnectors
     'planned' — Announced / under development; illustrative

   Each arc has:
     id        — stable identifier (used by globeEncoding + CR Info Panel)
     from/to   — human-readable station labels (bilingual where needed)
     label     — bilingual tooltip string { es, en }
     kind      — arc type (encoding → globeEncoding.ARC_KIND)
     mw        — nominal capacity (MW); displayed as "~{mw} MW · coords approx."
     startLat/startLng/endLat/endLng — WGS-84, source-cited below

   Total arcs: 22 (5 SIEPAC + 1 planned + 16 HVDC/AC).
   25-arc cap reserved for future budget (Phase 2).
   ═══════════════════════════════════════════════════════════════ */

export const HV_ARCS = [
  // ── Central America — SIEPAC (the Costa Rica tie-in) ──────────────────
  // Source: EOR/CRIE, https://www.enteoperador.org/siepac/
  // Cañas (Costa Rica): ICE–MER coupling point, 10.27°N 85.07°W
  // Las Minas (Panamá): SIEPAC terminus substation, 7.97°N 80.38°W
  {
    id: "siepac-cr-pa",
    from: "Costa Rica (Cañas)",
    to: "Panamá (Las Minas)",
    kind: "siepac",
    mw: 300,
    label: { es: "CR → PA · 300 MW · 230 kV", en: "CR → PA · 300 MW · 230 kV" },
    // R3 fix: ICE Subestación Cañas (10.43, -85.09), aligned with crGeo.js
    startLat: 10.43, startLng: -85.09,
    endLat:    7.97, endLng:  -80.38,
  },
  // Cañas (Costa Rica) → Managua (Nicaragua): SIEPAC segment
  // Managua, Nicaragua: 12.13°N 86.25°W
  {
    id: "siepac-cr-ni",
    from: "Costa Rica (Cañas)",
    to: "Nicaragua (Managua)",
    kind: "siepac",
    mw: 300,
    label: { es: "CR → NI · 300 MW · 230 kV", en: "CR → NI · 300 MW · 230 kV" },
    // R3 fix: ICE Subestación Cañas (10.43, -85.09), aligned with crGeo.js
    startLat: 10.43, startLng: -85.09,
    endLat:   12.13, endLng:  -86.25,
  },
  // Managua (Nicaragua) → Tegucigalpa (Honduras): SIEPAC segment
  // Tegucigalpa, Honduras: 14.10°N 87.22°W
  {
    id: "siepac-ni-hn",
    from: "Nicaragua (Managua)",
    to: "Honduras (Tegucigalpa)",
    kind: "siepac",
    mw: 300,
    label: { es: "NI → HN · 300 MW · 230 kV", en: "NI → HN · 300 MW · 230 kV" },
    startLat: 12.13, startLng: -86.25,
    endLat:   14.10, endLng:  -87.22,
  },
  // Tegucigalpa (Honduras) → San Salvador (El Salvador): SIEPAC segment
  // San Salvador: 13.69°N 89.19°W
  {
    id: "siepac-hn-sv",
    from: "Honduras (Tegucigalpa)",
    to: "El Salvador (San Salvador)",
    kind: "siepac",
    mw: 300,
    label: { es: "HN → SV · 300 MW · 230 kV", en: "HN → SV · 300 MW · 230 kV" },
    startLat: 14.10, startLng: -87.22,
    endLat:   13.69, endLng:  -89.19,
  },
  // San Salvador (El Salvador) → Escuintla (Guatemala): SIEPAC terminus
  // Escuintla substation, Guatemala: 14.26°N 90.78°W
  // (correction from prior 14.63°N 90.51°W which pointed to Guatemala City centre)
  {
    id: "siepac-sv-gt",
    from: "El Salvador (San Salvador)",
    to: "Guatemala (Escuintla)",
    kind: "siepac",
    mw: 300,
    label: { es: "SV → GT · 300 MW · 230 kV", en: "SV → GT · 300 MW · 230 kV" },
    startLat: 13.69, startLng: -89.19,
    endLat:   14.26, endLng:  -90.78,
  },

  // ── Planned — Panamá–Colombia HVDC (illustrative) ─────────────────────
  // Source: IEA WEO 2024 Annex A; capacity and route are illustrative
  // Panamá City: 8.98°N 79.52°W; Cerromatoso converter, Colombia: 7.97°N 75.47°W
  {
    id: "planned-pa-co",
    from: "Panamá",
    to: { es: "Colombia (planificado · Cerromatoso)", en: "Colombia (planned · Cerromatoso)" },
    kind: "planned",
    mw: 400,
    label: { es: "PA → CO · 400 MW · HVDC planificado", en: "PA → CO · 400 MW · HVDC planned" },
    startLat:  8.98, startLng: -79.52,
    endLat:    7.97, endLng:  -75.47,
  },

  // ── Americas — long-haul HVDC / major links ────────────────────────────
  // Itaipú ±600 kV HVDC: Foz do Iguaçu → Ibiúna converter substation (SP)
  // Source: Eletrobras/CTEEP; Ibiúna: 23.66°S 47.22°W
  // (correction from prior endLat -23.55 endLng -46.63 = São Paulo city centre)
  {
    id: "hvdc-itaipu",
    from: "Itaipú",
    to: "Ibiúna (SP)",
    kind: "hvdc",
    mw: 6300,
    label: { es: "Itaipú → Ibiúna · 6.300 MW · ±600 kV HVDC", en: "Itaipú → Ibiúna · 6,300 MW · ±600 kV HVDC" },
    startLat: -25.41, startLng: -54.59,
    endLat:   -23.66, endLng:  -47.22,
  },
  // Rio Madeira ±600 kV HVDC: Porto Velho → Araraquara converter substation (SP)
  // Source: ABB/Eletrobras; Araraquara SE: 21.79°S 48.17°W
  // (correction from prior endLat -23.55 endLng -46.63 = São Paulo city centre)
  {
    id: "hvdc-madeira",
    from: "Rio Madeira",
    to: "Araraquara (SP)",
    kind: "hvdc",
    mw: 6300,
    label: { es: "Madeira → Araraquara · 6.300 MW · ±600 kV HVDC", en: "Madeira → Araraquara · 6,300 MW · ±600 kV HVDC" },
    startLat:  -8.76, startLng: -63.90,
    endLat:   -21.79, endLng:  -48.17,
  },
  // Pacific DC Intertie: Celilo converter (OR) → Sylmar LADWP converter (CA)
  // Source: BPA/LADWP. Celilo 45.60°N 121.10°W → Sylmar 34.32°N 118.49°W
  // (Phase 2 correction: prior endpoint named Los Angeles city centre instead
  //  of Sylmar converter; same pattern as the Itaipú/Madeira fix in c7c02e7.)
  {
    id: "hvdc-pacific-intertie",
    from: "Pacific DC Intertie (Celilo)",
    to: "Sylmar (LADWP)",
    kind: "hvdc",
    mw: 3100,
    label: { es: "Pacific Intertie · 3.100 MW · ±500 kV HVDC", en: "Pacific Intertie · 3,100 MW · ±500 kV HVDC" },
    startLat: 45.60, startLng: -121.10,
    endLat:   34.32, endLng:  -118.49,
  },
  // Québec–New England HVDC: Nicolet/Bécancour converter (QC) → Sandy Pond (MA)
  // Source: Hydro-Québec. Nicolet 46.22°N 72.62°W → Sandy Pond 42.55°N 71.59°W
  // (Phase 2 correction: prior endpoints were Montréal and Boston city centres,
  //  30-90 km off the actual converter substations the comment contracts.)
  {
    id: "hvdc-quebec-ne",
    from: "Nicolet (QC)",
    to: "Sandy Pond (MA)",
    kind: "hvdc",
    mw: 2000,
    label: { es: "Québec → Nueva Inglaterra · 2.000 MW · HVDC", en: "Québec → New England · 2,000 MW · HVDC" },
    startLat: 46.22, startLng: -72.62,
    endLat:   42.55, endLng:  -71.59,
  },
  // Nelson River Bipoles I–III: Radisson converter (MB) → Dorsey converter (MB)
  // Source: Manitoba Hydro; Dorsey: 49.90°N 97.33°W
  // (correction from prior endLng -97.14; Dorsey is at 97.33°W)
  {
    id: "hvdc-nelson-river",
    from: "Nelson River (Bipoles I–III)",
    to: "Winnipeg (Dorsey)",
    kind: "hvdc",
    mw: 3895,
    label: { es: "Nelson River → Dorsey · 3.895 MW · HVDC", en: "Nelson River → Dorsey · 3,895 MW · HVDC" },
    startLat: 56.37, startLng:  -94.70,
    endLat:   49.90, endLng:   -97.33,
  },

  // ── Europe — interconnectors ───────────────────────────────────────────
  // North Sea Link: Kvilldal (NO) → Blyth (UK) — 1,400 MW ±515 kV HVDC
  // Source: Statnett/National Grid; 59.00°N 6.60°E → 55.01°N 1.45°W
  {
    id: "hvdc-north-sea-link",
    from: "North Sea Link",
    to: "United Kingdom",
    kind: "hvdc",
    mw: 1400,
    label: { es: "North Sea Link · 1.400 MW · ±515 kV HVDC", en: "North Sea Link · 1,400 MW · ±515 kV HVDC" },
    startLat: 59.00, startLng:   6.60,
    endLat:   55.01, endLng:    -1.45,
  },
  // NorNed: Feda (NO) → Eemshaven (NL) — 700 MW ±450 kV HVDC
  // Source: Statnett/TenneT; 58.00°N 6.50°E → 53.22°N 6.90°E
  {
    id: "hvdc-norned",
    from: "NorNed",
    to: "Netherlands",
    kind: "hvdc",
    mw: 700,
    label: { es: "NorNed · 700 MW · ±450 kV HVDC", en: "NorNed · 700 MW · ±450 kV HVDC" },
    startLat: 58.00, startLng:  6.50,
    endLat:   53.22, endLng:    6.90,
  },
  // IFA (Interconnexion France–Angleterre): Les Mandarins (FR) → Sellindge (UK)
  // Source: RTE/National Grid; 50.94°N 1.77°E → 51.08°N 0.92°E
  {
    id: "hvdc-ifa",
    from: "IFA — Les Mandarins (FR)",
    to: "Sellindge (UK)",
    kind: "hvdc",
    mw: 2000,
    label: { es: "IFA · 2.000 MW · HVDC · Francia–Reino Unido", en: "IFA · 2,000 MW · HVDC · France–UK" },
    startLat: 50.94, startLng:  1.77,
    endLat:   51.08, endLng:    0.92,
  },
  // Spain–Morocco AC link: Tarifa (ES) → Boukhalef (MA)
  // Source: Red Eléctrica / ONEE; 36.01°N 5.60°W → 35.58°N 5.37°W
  {
    id: "ac-spain-morocco",
    from: "España (Tarifa)",
    to: "Marruecos (Boukhalef)",
    kind: "ac",
    mw: 900,
    label: { es: "España–Marruecos · 900 MW · 400 kV CA", en: "Spain–Morocco · 900 MW · 400 kV AC" },
    startLat: 36.01, startLng: -5.60,
    endLat:   35.58, endLng:   -5.37,
  },

  // ── Asia / Africa / Oceania ────────────────────────────────────────────
  // Three Gorges / Gezhouba HVDC corridor: Yichang (HB) → Shanghai
  // Source: SGCC; 30.82°N 111.00°E → 31.23°N 121.47°E
  {
    id: "hvdc-three-gorges",
    from: "Three Gorges / Gezhouba corridor",
    to: "Shanghai",
    kind: "hvdc",
    mw: 7200,
    label: { es: "Three Gorges → Shanghái · 7.200 MW · HVDC", en: "Three Gorges → Shanghai · 7,200 MW · HVDC" },
    startLat: 30.82, startLng: 111.00,
    endLat:   31.23, endLng:  121.47,
  },
  // Xiangjiaba–Shanghai ±800 kV UHVDC: Xiangjiaba dam → Huaxin converter (Shanghai)
  // Source: SGCC/Siemens; 28.65°N 104.40°E → 31.23°N 121.47°E
  {
    id: "hvdc-xiangjiaba",
    from: "Xiangjiaba",
    to: "Shanghai",
    kind: "hvdc",
    mw: 6400,
    label: { es: "Xiangjiaba → Shanghái · 6.400 MW · ±800 kV UHVDC", en: "Xiangjiaba → Shanghai · 6,400 MW · ±800 kV UHVDC" },
    startLat: 28.65, startLng: 104.40,
    endLat:   31.23, endLng:  121.47,
  },
  // Changji–Guquan ±1100 kV UHVDC: Changji (XJ) → Guquan converter (AH)
  // Source: SGCC/IEA; world's highest voltage DC line at commissioning (2019)
  // 44.02°N 87.30°E → 31.30°N 118.10°E
  {
    id: "hvdc-changji-guquan",
    from: "Changji",
    to: "Guquan (UHVDC)",
    kind: "hvdc",
    mw: 12000,
    label: { es: "Changji → Guquan · 12.000 MW · ±1.100 kV UHVDC", en: "Changji → Guquan · 12,000 MW · ±1,100 kV UHVDC" },
    startLat: 44.02, startLng:  87.30,
    endLat:   31.30, endLng:  118.10,
  },
  // Inga–Kolwezi HVDC (DRC): Inga dam → Kolwezi substation
  // Source: SNEL/IEA; 5.52°S 13.62°E → 10.71°S 25.47°E
  {
    id: "hvdc-inga-kolwezi",
    from: "Inga",
    to: "Kolwezi",
    kind: "hvdc",
    mw: 560,
    label: { es: "Inga → Kolwezi · 560 MW · HVDC", en: "Inga → Kolwezi · 560 MW · HVDC" },
    startLat:  -5.52, startLng:  13.62,
    endLat:   -10.71, endLng:   25.47,
  },
  // Ethiopia–Kenya 400 kV AC interconnector: Sodo (ET) → Suswa (KE)
  // Source: EEHC/KETRACO/IEA WEO; 6.85°N 37.76°E → 1.10°S 36.42°E
  {
    id: "ac-ethiopia-kenya",
    from: "Etiopía (Sodo)",
    to: "Kenia (Suswa)",
    kind: "ac",
    mw: 2000,
    label: { es: "Etiopía–Kenia · 2.000 MW · 400 kV CA", en: "Ethiopia–Kenya · 2,000 MW · 400 kV AC" },
    startLat:  6.85, startLng:  37.76,
    endLat:   -1.10, endLng:   36.42,
  },
  // Basslink HVDC: Loy Yang converter (VIC) → Heybridge converter (TAS)
  // Source: Basslink/AEMO; Loy Yang: 38.21°S 146.59°E; Heybridge: 41.32°S 146.11°E
  // (corrections from prior startLat -41.16 startLng 146.36 / endLat -38.15 endLng 147.07
  //  which had Tasmania/Victoria reversed; Loy Yang is in Victoria, Heybridge in Tasmania)
  {
    id: "hvdc-basslink",
    from: "Basslink (Loy Yang, VIC)",
    to: "George Town / Bell Bay (TAS)",
    kind: "hvdc",
    mw: 500,
    label: { es: "Basslink · 500 MW · ±400 kV HVDC · Victoria–Tasmania", en: "Basslink · 500 MW · ±400 kV HVDC · Victoria–Tasmania" },
    // R4 fix: Heybridge label was geocoded to inland bushland near Forest, ~25 km
    // inland from the actual sea-cable terminus. The real converter sits at
    // George Town / Bell Bay on the Tamar estuary (-41.11, 146.85) per Basslink
    // Pty Ltd / AEMO. Same defect class as the R1 Sylmar/Itaipú/Madeira fixes.
    startLat: -38.21, startLng: 146.59,
    endLat:   -41.11, endLng:  146.85,
  },
  // Leyte–Naga HVDC (Philippines): Ormoc converter (Leyte) → Naga (Cebu)
  // Source: NGCP; Ormoc: 11.24°N 124.62°E (correction from prior 124.89°E)
  // 124.62°E is the correct longitude for Ormoc city, Leyte island
  {
    id: "hvdc-leyte-naga",
    from: "Leyte (Ormoc)",
    to: "Naga (Cebu)",
    kind: "hvdc",
    mw: 440,
    label: { es: "Leyte–Cebú · 440 MW · HVDC", en: "Leyte–Cebu · 440 MW · HVDC" },
    startLat: 11.24, startLng: 124.62,
    endLat:   10.19, endLng:  123.75,
  },
];
