/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — AI / data-centre hubs (honest, illustrative)
   Major metros where AI-compute and data-centre capacity concentrate.
   Locations are the REAL metro coordinates (approximate); these are
   illustrative hub markers, not individual facilities. demandMw is a
   rounded order-of-magnitude estimate of installed colocation /
   hyperscale capacity in the metro (public reporting: Synergy
   Research, Dell'Oro, JLL "Data Centers" research, DC Byte). All
   figures are approximate and labeled as such in the UI.

   Sources:
     - Synergy Research Group — Data Center Quarterly (est.) · 2025-2026
     - Dell'Oro Group — Data Center Capex FY2025 (17 mar 2026)
     - JLL — "Data Centers" H1 2025 research
     - DC Byte (2025 estimates)
   License: analyst research; all MW figures labeled "(est.)" in UI.

   tier 1: top global AI + hyperscale markets by installed/pipeline MW
   tier 2: significant regional hubs

   Total hubs: 26 (14 Tier 1, 12 Tier 2). NO CHANGE from Phase 1 spec.
   ═══════════════════════════════════════════════════════════════ */
export const DATACENTERS = [
  { name: { es: "Norte de Virginia",       en: "Northern Virginia" },        country: { es: "EE. UU.",       en: "USA" },          tier: 1, lat: 39.04,  lng: -77.49,  demandMw: 4500 },
  { name: { es: "Santa Clara / Silicon Valley", en: "Santa Clara / Silicon Valley" }, country: { es: "EE. UU.", en: "USA" },     tier: 1, lat: 37.35,  lng: -121.95, demandMw: 1100 },
  { name: { es: "Dallas",                  en: "Dallas" },                   country: { es: "EE. UU.",       en: "USA" },          tier: 1, lat: 32.78,  lng: -96.80,  demandMw: 900 },
  { name: { es: "Phoenix",                 en: "Phoenix" },                  country: { es: "EE. UU.",       en: "USA" },          tier: 1, lat: 33.45,  lng: -112.07, demandMw: 1200 },
  { name: { es: "Chicago",                 en: "Chicago" },                  country: { es: "EE. UU.",       en: "USA" },          tier: 2, lat: 41.85,  lng: -87.65,  demandMw: 600 },
  { name: { es: "Atlanta",                 en: "Atlanta" },                  country: { es: "EE. UU.",       en: "USA" },          tier: 2, lat: 33.75,  lng: -84.39,  demandMw: 450 },
  { name: { es: "Columbus / Ohio",         en: "Columbus / Ohio" },          country: { es: "EE. UU.",       en: "USA" },          tier: 2, lat: 39.96,  lng: -83.00,  demandMw: 350 },
  { name: { es: "Dublín",                  en: "Dublin" },                   country: { es: "Irlanda",       en: "Ireland" },      tier: 1, lat: 53.35,  lng: -6.26,   demandMw: 700 },
  { name: { es: "Ámsterdam",               en: "Amsterdam" },                country: { es: "Países Bajos",  en: "Netherlands" },  tier: 1, lat: 52.37,  lng: 4.90,    demandMw: 550 },
  { name: { es: "Fráncfort",               en: "Frankfurt" },                country: { es: "Alemania",      en: "Germany" },      tier: 1, lat: 50.11,  lng: 8.68,    demandMw: 800 },
  { name: { es: "Londres",                 en: "London" },                   country: { es: "Reino Unido",   en: "United Kingdom" }, tier: 1, lat: 51.50, lng: -0.13, demandMw: 1000 },
  { name: { es: "París",                   en: "Paris" },                    country: { es: "Francia",       en: "France" },       tier: 2, lat: 48.86,  lng: 2.35,    demandMw: 350 },
  { name: { es: "Madrid",                  en: "Madrid" },                   country: { es: "España",        en: "Spain" },        tier: 2, lat: 40.42,  lng: -3.70,   demandMw: 250 },
  { name: { es: "Singapur",                en: "Singapore" },                country: { es: "Singapur",      en: "Singapore" },    tier: 1, lat: 1.35,   lng: 103.82,  demandMw: 1100 },
  { name: { es: "Tokio",                   en: "Tokyo" },                    country: { es: "Japón",         en: "Japan" },        tier: 1, lat: 35.68,  lng: 139.76,  demandMw: 850 },
  { name: { es: "Bombay",                  en: "Mumbai" },                   country: { es: "India",         en: "India" },        tier: 1, lat: 19.08,  lng: 72.88,   demandMw: 750 },
  { name: { es: "Yakarta",                 en: "Jakarta" },                  country: { es: "Indonesia",     en: "Indonesia" },    tier: 2, lat: -6.21,  lng: 106.85,  demandMw: 300 },
  { name: { es: "Hong Kong",               en: "Hong Kong" },                country: { es: "China",         en: "China" },        tier: 2, lat: 22.32,  lng: 114.17,  demandMw: 400 },
  { name: { es: "Pekín",                   en: "Beijing" },                  country: { es: "China",         en: "China" },        tier: 1, lat: 39.90,  lng: 116.41,  demandMw: 1000 },
  { name: { es: "São Paulo",               en: "São Paulo" },                country: { es: "Brasil",        en: "Brazil" },       tier: 1, lat: -23.55, lng: -46.63,  demandMw: 500 },
  { name: { es: "Querétaro",               en: "Querétaro" },                country: { es: "México",        en: "Mexico" },       tier: 2, lat: 20.59,  lng: -100.39, demandMw: 250 },
  { name: { es: "Bogotá",                  en: "Bogotá" },                   country: { es: "Colombia",      en: "Colombia" },     tier: 2, lat: 4.71,   lng: -74.07,  demandMw: 130 },
  { name: { es: "Panamá",                  en: "Panama City" },              country: { es: "Panamá",        en: "Panama" },       tier: 2, lat: 9.00,   lng: -79.50,  demandMw: 90  },
  { name: { es: "Santiago",                en: "Santiago" },                 country: { es: "Chile",         en: "Chile" },        tier: 2, lat: -33.45, lng: -70.67,  demandMw: 200 },
  { name: { es: "Sídney",                  en: "Sydney" },                   country: { es: "Australia",     en: "Australia" },    tier: 1, lat: -33.87, lng: 151.21,  demandMw: 600 },
  { name: { es: "Johannesburgo",           en: "Johannesburg" },             country: { es: "Sudáfrica",     en: "South Africa" }, tier: 2, lat: -26.20, lng: 28.05,   demandMw: 200 },
];
