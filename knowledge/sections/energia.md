# Sección: Energía — Electricidad, Competitividad Energética & IA

> Canonical memory for the Energía section. Research base: `armonizacion_1.md` (global/ECAI) + `armonizacion_2.md` (Expediente 23.414 post-desconvocatoria, **newer — wins conflicts**). See [[../decisions-log]] D-007/D-008/D-009.

## Status
- **Run #1 (2026-06-10):** built by the section factory (first production run). Tab `energia`, slugs `#energia`/`#energy`, group ANÁLISIS PROFUNDO.
- Files: `components/energiaData.js` · `components/EnergiaDeep.jsx` · `components/energia/{GridHero,EnergiaCharts,EnergiaInteractive}.jsx`

## Act structure (as shipped)
1. **Cold open** — canvas hero (CR grid map), stat 415→945 TWh, BLUF ×3 sentencias
2. **La apuesta global** — IA-electricidad: demanda data centers, capex hyperscalers, nuclear-IA deals
3. **La región** — tarifas industriales LatAm (bar) + renovables (comparativo)
4. **Costa Rica hoy** — mix donut animado, dashboard financiero ICE, tarifas ARESEP 2026
5. **Expediente 23.414** — timeline interactivo, mapa de actores, aritmética de 38 votos
6. **Lecciones comparadas** — rail horizontal: Chile 20.936, Uruguay, Colombia, Brasil, Nord Pool, ERCOT
7. **Los números que importan** — ECAI-CR sliders, explorador de escenarios 2050, comparador tarifario, curva de aprendizaje solar
8. **Recomendaciones** — 12 enmiendas técnicas expandibles, framing no partidista

## Provenance table (the contract — every on-screen figure traces here)

| Claim | Value | Source | URL | Accessed | Conf |
|---|---|---|---|---|---|
| Data-centre electricity 2024 | 415 TWh | IEA, *Energy and AI* (Apr 2025) | iea.org/reports/energy-and-ai | 2026-06 | verified |
| Data-centre electricity 2030 | ~945 TWh (~3% global) | IEA, *Energy and AI* | iea.org/reports/energy-and-ai | 2026-06 | verified |
| Data-centre electricity 2035 | ~1,200 TWh | IEA, *Energy and AI* | iea.org/reports/energy-and-ai | 2026-06 | verified |
| Hyperscaler capex 2026 | $630–725B | Tom's Hardware / Data Center Frontier (Jan 2026) | datacenterfrontier.com | 2026-06 | reported |
| DC capex growth 2025 | +57% YoY; Big Four +76% | Dell'Oro Group FY2025 (17 Mar 2026, B. Fung) | delloro.com | 2026-06 | verified |
| Global DC buildout to 2030 | $6.7T ($5.2T AI) | McKinsey, *The cost of compute* (Apr 2025) | mckinsey.com | 2026-06 | verified |
| TMI restart / Crane CEC | 835 MW, 20-yr PPA Microsoft, $1B DOE loan | Constellation press / DOE (Mar 2025) | constellationenergy.com | 2026-06 | verified |
| Amazon–Talen Susquehanna | ~960 MW, $650M campus | Talen Energy (2024) | talenenergy.com | 2026-06 | verified |
| Meta–Clinton (Constellation) | 1,100 MW, 20-yr PPA, from Jun 2027 | Constellation (2025) | constellationenergy.com | 2026-06 | verified |
| Google–Kairos SMRs | 500 MW multi-site PPA (Oct 2024) | Google/Kairos Power | blog.google | 2026-06 | verified |
| TerraPower Natrium | 345 MW SFR + storage; groundbreaking 10-Jun-2024 Kemmerer WY | TerraPower / GatesNotes | terrapower.com | 2026-06 | verified |
| China net new capacity 2024 | 429 GW (+21%) | Ember China Review 2025 / NEA | ember-climate.org | 2026-06 | verified |
| China solar installed | 887 GW (+45.2%) | Ember / NEA | ember-climate.org | 2026-06 | verified |
| China clean-energy investment 2024 | $625B = 31% of global $2,033B | Climate Energy Finance / BNEF | — | 2026-06 | reported |
| CR renewable share 2025 | 98.6% (demanda interna 97.3%) | Grupo ICE / DOCSE, verif. LSQA (Feb-Mar 2026) | grupoice.com | 2026-06 | verified |
| CR renewable share 2024 | 89.4% (El Niño) | Grupo ICE (per prompt anchor; report_1 cita 86.8%) | grupoice.com | 2026-06 | reported |
| CR installed capacity | ~3,500 MW (3,499 Dic-2023: hidro 68/geo 7/eólica 12/bio 2/solar 0.2/térmica 11) | ICE / PEG | grupoice.com | 2026-06 | verified |
| PEG 2024-2040 target | 5,995 MW al 2040 (+71%; +2,495 MW) | ICE PEG 2024-2040 (may-2025), vía divulgaciones públicas y CICR; cifra 2.495 NO cotejada página-por-página con el PDF del Informe Ejecutivo (backlog) | grupoice.com | 2026-06 | reported |
| Renovables nuevas a 2030 | +600 MW (geotérmica Borinquen I — Liberia, solar San Antonio — La Uruca, repotenciación Tejona; inversión mixta ICE-privados) | Grupo ICE, divulgación pública del plan de expansión (armonizacion_2 §6, feb-mar 2026) | grupoice.com | 2026-06 | reported |
| Inversión pre-2030 requerida | >US$4,000M | CICR (S. Capón) citando datos ICE | delfino.cr | 2026-06 | reported |
| ICE deuda | −25% desde dic-2022 (−₡655,757M a sep-2025) | ICE EEFF sep-2025 (pub. 18-11-2025) | grupoice.com | 2026-06 | verified |
| Ley 8660 apalancamiento | 27.8% sep-2025 (tope 45%) | ICE EEFF sep-2025 | grupoice.com | 2026-06 | verified |
| ICE excedente 9M-2025 | ₡133,057M (margen neto 12.2%, EBITDA 41.1%) | ICE EEFF sep-2025 | grupoice.com | 2026-06 | verified |
| Moody's ICE | **Ba1 estable, 29-sep-2025** (3er upgrade; a 1 notch de IG) | Moody's Ratings | moodys.com | 2026-06 | verified |
| Fitch ICE | BB internacional, perspectiva Positiva (27-feb-2025); AA+(cri) | Fitch Ratings | fitchratings.com | 2026-06 | verified |
| ICE plan inversión 2025-2029 | >US$3.5B | Grupo ICE / Revista Summa | grupoice.com | 2026-06 | verified |
| ARESEP tarifas 2026 | −4.93% a −16.44% (ICE −14.92, CNFL −14.55); AT mínima en 15 años; CVG −7.77% | ARESEP Boletín 74-2025 (12-dic-2025) | aresep.go.cr | 2026-06 | verified |
| 23.414 primer debate | **27-24**, 26-may-2026 21:43 (6 ausencias; algunas fuentes 27-25) | Servicios Técnicos / La Nación / Observador | nacion.com | 2026-06 | verified |
| Desconvocatoria | Decreto 45807-MP, 27-may-2026 ~14:35, oficio MP-DM-OF-0024-2026 | La Nación (S. Sánchez) / Semanario U | nacion.com | 2026-06 | verified |
| Umbral 2º debate | 38 votos (Art. 189.3 CP — ECOSEN institución autónoma) | Servicios Técnicos AL (31-ene-2024) | asamblea.go.cr | 2026-06 | verified |
| Aritmética votos | PPSO 31 (30 efectivas, Ward licencia); PLN 17 + FA 7 + Dobles 1 en contra; faltan 8 | Semanario U / Delfino / registro AL | — | 2026-06 | verified |
| Tarifas industriales LatAm | PY 36–39 · US 81.3 · CL 94–167 · AR 96–110 · CR 100 (T-MTb) –108.8 (T-MT) –150 (industrial amplio) · BR 108–115 · UY 134–141 · PA 151 · CO 200–270 US$/MWh — metodologías mixtas | SEG Ingeniería / EIA / ARESEP / ICE / CICR / Enerdata | — | 2026-06 | reported |
| ECAI-CR composites | CR ~0.71 · UY ~0.78 · MX ~0.62 · PA ~0.65 (pesos .30/.25/.20/.15/.10) | Colibrii Labs (propuesta propia; pesos por revisar) | colibriilabs.ai | 2026-06 | estimate |
| Escenarios demanda 2050 | Base ~2.5%→+70% · e-mov ~4%→+130% · IA ~5.5%→+220% vs 2024 | Colibrii sobre baseline ICE PEG | — | 2026-06 | estimate (method: CAGR compuesto) |
| Curva solar (Swanson) | ~$76/W (1977) → $0.36 (2014) → ~$0.11 (2024) → $0.05–0.08 proy. 2030 (~20%/duplicación) | Swanson's Law / BNEF lineage | ourworldindata.org | 2026-06 | reported |
| China eléctrica CEPAL 2002 | tarifas más altas en países que privatizaron; CR 7.38 ¢/kWh la más baja | CEPAL pub. 25719 (2002 — dato histórico) | cepal.org | 2026-06 | verified (vintage) |
| Chile Ley 20.936 | jul-2016: Coordinador Independiente reemplaza CDEC; operó 1-ene-2017 | CNE Chile | cne.cl | 2026-06 | verified |
| Citas verbatim (Fernández, Acuña, Villalta, Ramírez, Dobles, Montenegro, Capón, Rojas/CEDET, Miranda, Esquivel) | ver energiaData.js QUOTES | Semanario U · Diario Extra · Delfino · La Nación · El Mundo · CRHoy · Observador (22–27 may 2026) | — | 2026-06 | verified (verbatim c/ fecha+medio) |

## Key editorial decisions
- "Insumo técnico independiente" framing in hero + recommendations; explicit non-partisan disclaimer in Act 5 & 8.
- Political insults from the 27-May press conference are reported (attributed, dated) but never amplified in headlines.
- Multi-stakeholder "analytical review" items rendered as typological lenses, clearly distinct from verbatim quotes.

## Backlog (post-Run-#1, includes persona-board deferrals)
- [ ] **Images (license verification pending — D-006):** TMI/Crane CEC (Constellation press kit) · Natrium groundbreaking (TerraPower press) · Reventazón/Miravalles (ICE press / Wikimedia Commons CC) · China solar farms (NASA Earth Observatory, PD) · Intel CR campus (Intel newsroom). Verify license → add with credit line.
- [ ] **Document-level source URLs (persona 10):** replace portal-level links (Moody's, Fitch, ARESEP, CICR, SEG, outlets) with permalinks to the specific rating action / boletín / article; never fabricate deep links — verify each manually. Closing note discloses portal-level linking meanwhile.
- [ ] **PEG 2024-2040 PDF verification (personas 08/10):** cotejar página-por-página 5,995 MW / +600 MW / 2,495 MW contra el Informe Ejecutivo del PEG.
- [ ] Act 2 interactive hook (persona 06): IEA base-vs-conservative toggle on DC demand chart.
- [ ] Hero "copy citation" affordance (persona 06).
- [ ] Suspense boundaries between acts + AMENDMENTS lazy extraction if data module grows (persona 04).
- [ ] CSP `img-src blob:` tightening — platform-wide, pre-existing; requires validating ShareBtn/html-to-image blob usage first (persona 04).
- [ ] Light-theme chart series saturation fine-tune + donut thermal/bio palette separation (persona 05, minor).
- [ ] Canvas re-derive on data-theme change mid-animation (persona 03, cosmetic — hero is theme-fixed navy by design).
- [ ] EN translation review by native editor (machine-mirrored EN shipped).
- [ ] Lighthouse run on Vercel preview (in-session run unavailable) + record scores here.
- [ ] Extend repo MCP server (`mcp-server/`) with `get_ecai_score` tool.
- [ ] Sankey (generación→transmisión→distribución) deferred — needs d3-sankey dep decision.
- [ ] Peer review of ECAI-CR weights (external energy economist).
- [ ] Watch: publication of Decreto 45807-MP in La Gaceta; reconvocatoria signals ago-2026; Sala IV consulta if reconvened.

**Nota de assets propios:** `public/colibrii-icon-sm.png` y `colibrii-logo.png` son marca propia de Colibrii Labs (sin restricción de uso interno).

## Persona board results (Run #1)

**Iteration 1 (12 parallel reviewers):** 11× FIX-THEN-SHIP · 1× BLOCK (Persona 08, economist: 600 MW figure missing from canonical provenance table). Notable catches: `SOLAR_CURVE` referenced without import (runtime crash in lazy `ssr:false` tab — build passes, tab crashes; caught by 4 personas), light-theme accent contrast failures (turquoise/gold small text ~2.6:1 on light surfaces), 360px grid overflow, mixed-methodology labeling, BLUF imprecision ("double" vs 1.8×).

**Iteration 2 (targeted re-runs):** Persona 08 → **SHIP** (provenance chain complete, no regressions; ECAI composites re-verified). Persona 12 → **SHIP** (all computed contrast ratios ≥4.96:1, most AAA; 9 overflow-safe grids; focus styles intact). **Gate satisfied: zero BLOCK; residual minor items moved to backlog above.**

False positives ruled by orchestrator (documented for future boards): "ScrollProgress SSR-unsafe" (window access is inside useEffect — never runs server-side; tab is ssr:false), "hero turquoise 3.2:1 on navy" (computed 6.38:1 — hero passes as designed).

## Session log
- **2026-06-10:** Section built end-to-end by factory Run #1 (this session). Build green (254 kB first-load, tab lazy-chunked). Board: 2 iterations to zero-BLOCK. **Push-channel note:** git proxy 403 + GitHub API writes 401 during close-out — all work committed locally on `claude/zen-lovelace-5l2e7g`; staging deployed to Vercel directly from the workspace (see D-010). Re-push + draft PR pending channel recovery.

## 20-Persona Board — Run #1.5 results (2026-06-11)
Verdicts: 1 BLOCK (P08 economist: map label "FUENTES REALES" vs "aproximadas" contradiction — FIXED; "$6,7 B" notation — FIXED to $6.7T) · rest SHIP/PASS/FIX-THEN-SHIP. All P-round fixes applied same day: 44px touch targets (map nodes), reactor caption hardened (no-CR-project + reuse credit), ECAI pull-stat added to Act 3 (P06 virality), MicroCTA after Act 7 (P15/P20), Act 6→7 bridge + consequence ending (P17), scroll-cue auto-hide (P02), ICE one-line read (P02), amendment previews (P19), stage escalation labels (P17), rim light + hiDPI dashes + onUpdate fix in Hero3D (P18/P03), utm on share links + citation portals (P16/P20/P10), dead deps removed (P03).
Backlog (non-blocking): Vercel custom event instrumentation (needs Pro plan or alt analytics), CRGridMap EN_ACCENT import consistency (P07), GridHero mobile packets <640px (P19), parallax amplitude gate (P13), ohter P01 token nits.
