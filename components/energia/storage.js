/* ══════════════════════════════════════════════════════════════
   ENERGÍA — Utility-scale storage layer (Phase 2)
   Curated subset of Global Energy Monitor — Global Battery Storage
   Tracker (2026 release) + complementary IEA Energy Storage Tracker
   2025 + US EIA Form 860 anchors. Battery & pumped-hydro storage,
   ≥ 50 MW operating or under construction (a few notable announced
   sites included to signal pipeline).

   Source: Global Energy Monitor — Global Integrated Power Tracker
           (battery section). License: CC-BY-4.0.
           https://globalenergymonitor.org/projects/global-battery-storage-tracker/
   Cross-reference: IEA — Energy Storage Tracker 2025 (operator press)
           https://www.iea.org/energy-system/electricity/energy-storage
   US anchors: EIA — Form 860 Operable Generators (Energy Source MWH)
           https://www.eia.gov/electricity/data/eia860/

   All MW (power) and MWh (energy) figures are public reported numbers
   rounded; status reflects most-recent public reporting at 2026-06.
   ══════════════════════════════════════════════════════════════

   Schema:
     id        — kebab-case stable id
     lat,lng   — WGS-84 coordinates
     name      — { es, en } bilingual facility name
     country   — { es, en } bilingual country name
     mw        — power capacity (MW)
     mwh       — energy capacity (MWh); 0 if unreported
     chem      — "li" | "flow" | "phs" | "caes" | "thermal" | "other"
     status    — "op" (operating) | "con" (construction) | "ann" (announced)
     comYear   — commissioned year (or expected for con/ann)
     s         — source key → SRC[s] (gem_gipt / eia860 / irena25)
     lic       — license key → SRC[lic] (cc_by_4 / public)
*/

export const STORAGE_SITES = [
  /* ── United States (EIA Form 860 anchors + GEM) ── */
  { id: "moss-landing",      lat: 36.802,  lng: -121.787, name: { es: "Moss Landing",                 en: "Moss Landing" },                 country: { es: "EE. UU.",   en: "USA"        }, mw: 750,  mwh: 3000,  chem: "li",      status: "op",  comYear: 2022, s: "eia860",   lic: "public"  },
  { id: "edwards-sanborn",   lat: 34.989,  lng: -117.881, name: { es: "Edwards Sanborn",              en: "Edwards Sanborn" },              country: { es: "EE. UU.",   en: "USA"        }, mw: 875,  mwh: 3287,  chem: "li",      status: "op",  comYear: 2024, s: "eia860",   lic: "public"  },
  { id: "crimson",           lat: 33.572,  lng: -114.988, name: { es: "Crimson Storage",              en: "Crimson Storage" },              country: { es: "EE. UU.",   en: "USA"        }, mw: 350,  mwh: 1400,  chem: "li",      status: "op",  comYear: 2022, s: "eia860",   lic: "public"  },
  { id: "gateway",           lat: 33.013,  lng: -116.811, name: { es: "Gateway",                      en: "Gateway" },                      country: { es: "EE. UU.",   en: "USA"        }, mw: 250,  mwh: 250,   chem: "li",      status: "op",  comYear: 2020, s: "eia860",   lic: "public"  },
  { id: "manatee-fpl",       lat: 27.522,  lng: -82.408,  name: { es: "Manatee (FPL)",                en: "Manatee (FPL)" },                country: { es: "EE. UU.",   en: "USA"        }, mw: 409,  mwh: 900,   chem: "li",      status: "op",  comYear: 2021, s: "eia860",   lic: "public"  },
  { id: "vistra-moss-iii",   lat: 36.807,  lng: -121.780, name: { es: "Vistra Moss Landing Fase III", en: "Vistra Moss Landing Phase III" }, country: { es: "EE. UU.",   en: "USA"        }, mw: 350,  mwh: 1400,  chem: "li",      status: "op",  comYear: 2023, s: "gem_gipt", lic: "cc_by_4" },
  { id: "blanco-bess",       lat: 32.766,  lng: -96.797,  name: { es: "Blanco BESS (Dallas)",         en: "Blanco BESS (Dallas)" },         country: { es: "EE. UU.",   en: "USA"        }, mw: 200,  mwh: 200,   chem: "li",      status: "op",  comYear: 2024, s: "gem_gipt", lic: "cc_by_4" },
  { id: "goldendale-phs",    lat: 45.770,  lng: -120.780, name: { es: "Goldendale (PHS, en desarrollo)", en: "Goldendale (PHS, development)" }, country: { es: "EE. UU.", en: "USA"        }, mw: 1200, mwh: 14400, chem: "phs",     status: "ann", comYear: 2028, s: "gem_gipt", lic: "cc_by_4" },

  /* ── Australia (NEM frequency-services premium) ── */
  { id: "waratah-super",     lat: -32.923, lng: 151.670,  name: { es: "Waratah Super Battery",        en: "Waratah Super Battery" },        country: { es: "Australia", en: "Australia"  }, mw: 850,  mwh: 1680,  chem: "li",      status: "op",  comYear: 2025, s: "gem_gipt", lic: "cc_by_4" },
  { id: "victorian-big",     lat: -37.720, lng: 144.450,  name: { es: "Victorian Big Battery",        en: "Victorian Big Battery" },        country: { es: "Australia", en: "Australia"  }, mw: 300,  mwh: 450,   chem: "li",      status: "op",  comYear: 2021, s: "gem_gipt", lic: "cc_by_4" },
  { id: "hornsdale",         lat: -33.083, lng: 138.250,  name: { es: "Hornsdale Power Reserve",      en: "Hornsdale Power Reserve" },      country: { es: "Australia", en: "Australia"  }, mw: 150,  mwh: 194,   chem: "li",      status: "op",  comYear: 2017, s: "gem_gipt", lic: "cc_by_4" },

  /* ── China (NEA storage mandate; flow + PHS) ── */
  { id: "fengning-phs",      lat: 41.209,  lng: 116.648,  name: { es: "Fengning (PHS)",               en: "Fengning (PHS)" },               country: { es: "China",     en: "China"      }, mw: 3600, mwh: 40000, chem: "phs",     status: "op",  comYear: 2024, s: "iea_storage", lic: "iea_terms" },
  { id: "huizhou-phs",       lat: 23.095,  lng: 114.415,  name: { es: "Huizhou (PHS)",                en: "Huizhou (PHS)" },                country: { es: "China",     en: "China"      }, mw: 2448, mwh: 21000, chem: "phs",     status: "op",  comYear: 2011, s: "iea_storage", lic: "iea_terms" },
  { id: "dalian-vrfb",       lat: 38.914,  lng: 121.615,  name: { es: "Dalian (flujo de vanadio)",    en: "Dalian (vanadium flow)" },       country: { es: "China",     en: "China"      }, mw: 200,  mwh: 800,   chem: "flow",    status: "op",  comYear: 2022, s: "iea_storage", lic: "iea_terms" },
  { id: "ningxia-ynk",       lat: 38.487,  lng: 106.231,  name: { es: "Yinchuan-Ningxia",             en: "Yinchuan-Ningxia" },             country: { es: "China",     en: "China"      }, mw: 200,  mwh: 800,   chem: "li",      status: "op",  comYear: 2024, s: "iea_storage", lic: "iea_terms" },

  /* ── United Kingdom (Dynamic Containment) ── */
  { id: "minety",            lat: 51.616,  lng: -1.988,   name: { es: "Minety",                       en: "Minety" },                       country: { es: "Reino Unido", en: "United Kingdom" }, mw: 150,  mwh: 150,  chem: "li",      status: "op",  comYear: 2021, s: "gem_gipt", lic: "cc_by_4" },
  { id: "tilbury-statera",   lat: 51.467,  lng: 0.370,    name: { es: "Tilbury (Statera)",            en: "Tilbury (Statera)" },            country: { es: "Reino Unido", en: "United Kingdom" }, mw: 300,  mwh: 600,  chem: "li",      status: "op",  comYear: 2024, s: "gem_gipt", lic: "cc_by_4" },
  { id: "pillswood",         lat: 53.770,  lng: -0.380,   name: { es: "Pillswood",                    en: "Pillswood" },                    country: { es: "Reino Unido", en: "United Kingdom" }, mw: 196,  mwh: 196,  chem: "li",      status: "op",  comYear: 2022, s: "gem_gipt", lic: "cc_by_4" },
  { id: "dinorwig-phs",      lat: 53.118,  lng: -4.114,   name: { es: "Dinorwig (PHS)",               en: "Dinorwig (PHS)" },               country: { es: "Reino Unido", en: "United Kingdom" }, mw: 1728, mwh: 9100, chem: "phs",     status: "op",  comYear: 1984, s: "iea_storage", lic: "iea_terms" },

  /* ── Europe ── */
  { id: "andasol-csp",       lat: 37.228,  lng: -3.070,   name: { es: "Andasol (sales fundidas CSP)", en: "Andasol (molten-salt CSP)" },    country: { es: "España",    en: "Spain"      }, mw: 150,  mwh: 1100,  chem: "thermal", status: "op",  comYear: 2011, s: "iea_storage", lic: "iea_terms" },
  { id: "kruonis-phs",       lat: 54.771,  lng: 24.458,   name: { es: "Kruonis (PHS)",                en: "Kruonis (PHS)" },                country: { es: "Lituania", en: "Lithuania" }, mw: 900,  mwh: 11500, chem: "phs",     status: "op",  comYear: 1992, s: "iea_storage", lic: "iea_terms" },
  { id: "arzberg-leag",      lat: 50.050,  lng: 12.190,   name: { es: "Arzberg / LEAG BESS",          en: "Arzberg / LEAG BESS" },          country: { es: "Alemania", en: "Germany"   }, mw: 250,  mwh: 250,   chem: "li",      status: "op",  comYear: 2024, s: "iea_storage", lic: "iea_terms" },
  { id: "terna-brindisi",    lat: 40.528,  lng: 17.965,   name: { es: "Brindisi BESS (Terna)",        en: "Brindisi BESS (Terna)" },        country: { es: "Italia",   en: "Italy"     }, mw: 250,  mwh: 1000,  chem: "li",      status: "op",  comYear: 2024, s: "iea_storage", lic: "iea_terms" },
  { id: "vlissingen",        lat: 51.450,  lng: 3.580,    name: { es: "Vlissingen",                   en: "Vlissingen" },                   country: { es: "Países Bajos", en: "Netherlands" }, mw: 201, mwh: 401, chem: "li",     status: "op",  comYear: 2025, s: "gem_gipt", lic: "cc_by_4" },
  { id: "zarnowiec-pge",     lat: 54.785,  lng: 18.040,   name: { es: "Żarnowiec BESS (PGE)",         en: "Żarnowiec BESS (PGE)" },         country: { es: "Polonia",  en: "Poland"    }, mw: 263,  mwh: 900,   chem: "li",      status: "op",  comYear: 2025, s: "iea_storage", lic: "iea_terms" },

  /* ── Latin America ── */
  { id: "andes-solar-bess",  lat: -22.750, lng: -68.230,  name: { es: "Andes Solar BESS",             en: "Andes Solar BESS" },             country: { es: "Chile",     en: "Chile"      }, mw: 112,  mwh: 624,   chem: "li",      status: "op",  comYear: 2023, s: "gem_gipt", lic: "cc_by_4" },
  { id: "coya-bess",         lat: -23.060, lng: -68.450,  name: { es: "Coya / TAP BESS (Engie/AES)",  en: "Coya / TAP BESS (Engie/AES)" },  country: { es: "Chile",     en: "Chile"      }, mw: 220,  mwh: 1100,  chem: "li",      status: "op",  comYear: 2024, s: "iea_storage", lic: "iea_terms" },
  { id: "puerto-penasco",    lat: 31.316,  lng: -113.540, name: { es: "Puerto Peñasco híbrido PV+BESS", en: "Puerto Peñasco hybrid PV+BESS" },country: { es: "México",    en: "Mexico"     }, mw: 156,  mwh: 250,   chem: "li",      status: "op",  comYear: 2024, s: "iea_storage", lic: "iea_terms" },
  { id: "furnas-pilot",      lat: -22.450, lng: -45.120,  name: { es: "Furnas BESS (piloto)",         en: "Furnas BESS (pilot)" },          country: { es: "Brasil",    en: "Brazil"     }, mw: 30,   mwh: 60,    chem: "li",      status: "op",  comYear: 2025, s: "iea_storage", lic: "iea_terms" },

  /* ── South & East Asia ── */
  { id: "greenko-phs-bess",  lat: 15.430,  lng: 77.930,   name: { es: "Greenko Pinnapuram (PHS+BESS)", en: "Greenko Pinnapuram (PHS+BESS)" }, country: { es: "India",    en: "India"      }, mw: 1200, mwh: 10800, chem: "phs",     status: "con", comYear: 2025, s: "iea_storage", lic: "iea_terms" },
  { id: "shin-incheon",      lat: 37.469,  lng: 126.624,  name: { es: "Shin-Incheon BESS",            en: "Shin-Incheon BESS" },            country: { es: "Corea del Sur", en: "South Korea" }, mw: 156, mwh: 318, chem: "li",      status: "op",  comYear: 2018, s: "iea_storage", lic: "iea_terms" },
  { id: "buzen-nas",         lat: 33.610,  lng: 131.090,  name: { es: "Buzen NaS BESS",               en: "Buzen NaS BESS" },               country: { es: "Japón",     en: "Japan"      }, mw: 50,   mwh: 300,   chem: "other",   status: "op",  comYear: 2016, s: "iea_storage", lic: "iea_terms" },
  { id: "magat-snap",        lat: 16.880,  lng: 121.410,  name: { es: "Magat híbrido + SNAp BESS",    en: "Magat hybrid + SNAp BESS" },     country: { es: "Filipinas",en: "Philippines" }, mw: 200,  mwh: 400,   chem: "li",      status: "op",  comYear: 2024, s: "iea_storage", lic: "iea_terms" },

  /* ── Middle East / Africa ── */
  { id: "bisha-pif",         lat: 19.974,  lng: 42.609,   name: { es: "Bisha (PIF)",                  en: "Bisha (PIF)" },                  country: { es: "Arabia Saudita", en: "Saudi Arabia" }, mw: 2000, mwh: 8000, chem: "li",  status: "con", comYear: 2025, s: "iea_storage", lic: "iea_terms" },
  { id: "al-dhafra-bess",    lat: 23.624,  lng: 54.422,   name: { es: "Al Dhafra BESS adyacente",     en: "Al Dhafra adj. BESS" },          country: { es: "EAU",       en: "UAE"        }, mw: 600,  mwh: 2400,  chem: "li",      status: "op",  comYear: 2025, s: "iea_storage", lic: "iea_terms" },
  { id: "kenhardt-scatec",   lat: -29.345, lng: 21.150,   name: { es: "Kenhardt PV+BESS (Scatec)",    en: "Kenhardt PV+BESS (Scatec)" },    country: { es: "Sudáfrica", en: "South Africa" }, mw: 540, mwh: 1140, chem: "li",     status: "op",  comYear: 2024, s: "iea_storage", lic: "iea_terms" },

  /* ── Canada ── */
  { id: "oneida-six-nations",lat: 43.085,  lng: -79.771,  name: { es: "Oneida BESS (Ontario)",        en: "Oneida BESS (Ontario)" },        country: { es: "Canadá",   en: "Canada"     }, mw: 250,  mwh: 1000,  chem: "li",      status: "op",  comYear: 2025, s: "iea_storage", lic: "iea_terms" },
];

/* Top sites by MWh — used by encoding legend "Storage giants" hint and
   by the optional storage-breath beacon. */
export const STORAGE_TOP = STORAGE_SITES
  .slice()
  .sort((a, b) => b.mwh - a.mwh)
  .slice(0, 6);
