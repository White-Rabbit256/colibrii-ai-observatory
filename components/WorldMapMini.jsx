"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CO, CC } from "./data";

/* =================================================================
   COLIBRII LABS — World Map Mini v14.1
   Dot-based world map showing 20 CAPI-CR countries.
   Dot size = composite score, color = tier (green/amber/red).
   Simplified Natural Earth / Robinson-style continent SVG outlines.
   viewBox 0 0 1000 500. Dot positions in CSS percentages.
   ================================================================= */

// Country positions calibrated for 1000x500 Robinson-style projection (% of container)
const POS = {
  SGP: { x: 78.0, y: 53.5 },  // Singapore — SE Asia, near equator
  KOR: { x: 82.5, y: 30.0 },  // South Korea — East Asia
  JPN: { x: 85.5, y: 31.0 },  // Japan — East Asia, island chain
  EST: { x: 53.5, y: 19.0 },  // Estonia — Northern Europe, Baltic
  FIN: { x: 54.0, y: 15.0 },  // Finland — Northern Europe
  IRL: { x: 44.0, y: 24.5 },  // Ireland — Western Europe, island
  CHL: { x: 25.0, y: 76.0 },  // Chile — West coast South America
  URY: { x: 28.5, y: 72.0 },  // Uruguay — East coast South America
  CRI: { x: 21.0, y: 50.0 },  // Costa Rica — Central America
  PAN: { x: 22.0, y: 51.5 },  // Panama — Central America, south of CR
  BRA: { x: 30.5, y: 60.0 },  // Brazil — East/center South America
  COL: { x: 24.5, y: 53.0 },  // Colombia — North South America
  MEX: { x: 17.0, y: 42.5 },  // Mexico — south of USA
  ARG: { x: 27.0, y: 76.0 },  // Argentina — South South America
  PER: { x: 24.0, y: 60.0 },  // Peru — West coast South America
  DOM: { x: 24.5, y: 44.0 },  // Dominican Republic — Caribbean island
  VNM: { x: 78.5, y: 45.5 },  // Vietnam — Southeast Asia
  PHL: { x: 82.0, y: 46.0 },  // Philippines — SE Asia, islands
  MYS: { x: 78.0, y: 52.0 },  // Malaysia — SE Asia
  IDN: { x: 80.0, y: 56.5 },  // Indonesia — SE Asia, islands
};

/* Simplified but recognizable continent outlines — Robinson-style projection */
const CONTINENTS = [
  // North America
  {
    name: "north-america",
    d: "M130,50 C140,45 180,40 200,55 L220,65 C230,70 240,75 250,80 L260,90 "
     + "C265,100 260,110 255,120 L250,130 C245,140 240,150 235,155 L225,160 "
     + "C215,165 200,170 190,175 L180,180 C170,185 160,185 150,180 L140,175 "
     + "C130,170 120,165 115,155 L110,140 C105,125 100,110 105,95 L110,80 "
     + "C115,65 120,55 130,50 Z",
  },
  // Greenland
  {
    name: "greenland",
    d: "M280,28 C290,24 310,26 318,34 L320,44 C318,52 312,56 304,54 "
     + "L294,50 C286,46 282,38 280,28 Z",
  },
  // Central America / Caribbean bridge
  {
    name: "central-america",
    d: "M175,178 C180,176 188,178 195,182 L205,190 C212,196 218,204 222,212 "
     + "L224,220 C222,224 218,226 214,224 L208,218 C202,212 196,206 190,200 "
     + "L182,192 C178,188 175,184 175,178 Z",
  },
  // South America
  {
    name: "south-america",
    d: "M230,215 C240,210 255,215 260,225 L265,240 C268,260 270,280 268,300 "
     + "L265,320 C260,340 255,360 248,375 L240,385 C232,390 225,388 220,380 "
     + "L215,365 C210,345 208,325 210,305 L215,280 C218,260 222,240 228,220 Z",
  },
  // Europe
  {
    name: "europe",
    d: "M440,60 C450,55 470,50 485,55 L500,65 C510,70 520,80 515,90 "
     + "L510,100 C505,110 495,115 485,118 L470,120 C458,118 445,112 440,100 "
     + "L438,85 C436,72 438,65 440,60 Z",
  },
  // Scandinavia
  {
    name: "scandinavia",
    d: "M470,30 C478,26 488,28 494,35 L498,48 C498,58 494,65 488,68 "
     + "L480,66 C474,62 470,54 468,44 L468,36 C468,32 469,30 470,30 Z",
  },
  // British Isles
  {
    name: "british-isles",
    d: "M432,62 C436,58 442,58 446,62 L448,70 C448,76 445,80 440,82 "
     + "L435,80 C431,76 430,70 432,62 Z",
  },
  // Africa
  {
    name: "africa",
    d: "M460,160 C475,155 495,160 510,170 L520,185 C528,200 530,220 528,245 "
     + "L525,270 C520,295 512,315 500,330 L488,340 C475,345 462,340 455,325 "
     + "L448,305 C442,280 440,255 442,230 L445,200 C448,180 452,168 460,160 Z",
  },
  // Madagascar
  {
    name: "madagascar",
    d: "M540,290 C544,286 548,288 550,294 L551,306 C550,314 547,318 543,316 "
     + "L540,308 C538,300 538,294 540,290 Z",
  },
  // Asia (main landmass)
  {
    name: "asia",
    d: "M520,45 C550,35 600,30 650,35 L700,50 C740,60 780,75 800,95 "
     + "L810,115 C815,130 810,145 800,160 L780,175 C760,185 735,190 710,185 "
     + "L680,175 C660,168 640,165 620,170 L590,180 C570,185 555,178 545,165 "
     + "L530,145 C520,125 515,105 518,85 L520,65 Z",
  },
  // India subcontinent
  {
    name: "india",
    d: "M630,170 C640,165 655,168 665,178 L672,192 C676,206 674,220 668,232 "
     + "L660,240 C652,244 645,240 640,232 L635,218 C630,204 628,188 630,170 Z",
  },
  // Southeast Asia peninsula
  {
    name: "se-asia",
    d: "M720,185 C728,180 738,182 745,190 L752,204 C756,218 754,232 748,244 "
     + "L740,252 C732,256 725,250 722,240 L718,224 C716,210 716,195 720,185 Z",
  },
  // Japan (islands)
  {
    name: "japan",
    d: "M820,95 C825,90 830,88 832,92 L835,100 C836,108 834,115 830,118 "
     + "L825,115 C820,110 818,102 820,95 Z",
  },
  // Philippines
  {
    name: "philippines",
    d: "M800,195 C804,190 808,192 810,198 L811,208 C810,214 807,218 803,216 "
     + "L800,210 C798,204 798,198 800,195 Z",
  },
  // Indonesia / Malay Archipelago
  {
    name: "indonesia",
    d: "M730,260 C742,256 758,258 772,264 L785,270 C795,276 800,282 798,288 "
     + "L790,292 C780,294 768,290 755,286 L740,280 C732,276 728,268 730,260 Z",
  },
  // Australia
  {
    name: "australia",
    d: "M740,310 C755,305 775,308 785,318 L790,330 C792,342 788,355 780,362 "
     + "L768,368 C755,370 742,365 735,355 L730,340 C728,325 732,315 740,310 Z",
  },
  // New Zealand
  {
    name: "new-zealand",
    d: "M815,358 C818,354 822,355 824,360 L825,368 C824,374 821,377 818,375 "
     + "L816,370 C814,366 814,362 815,358 Z",
  },
];

export function WorldMapMini({ idx, en, t, dark }) {
  const [hover, setHover] = useState(null);

  const countries = CC.map((c, i) => {
    const score = idx[c]?.composite ?? 0;
    const tier = score >= 0.65 ? "ready" : score >= 0.40 ? "risk" : "deficit";
    const color = tier === "ready" ? t.gn : tier === "risk" ? t.am : t.rd;
    const size = 6 + score * 14; // 6-20px range
    const pos = POS[c] || { x: 50, y: 50 };
    const rank = i + 1;
    return { code: c, ...CO[c], score, tier, color, size, pos, rank };
  }).sort((a, b) => (b.score) - (a.score));

  return (
    <div className="world-map-container" style={{ background: t.cardBg, border: `1px solid ${t.bd}` }}>
      <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", marginBottom: 4 }}>
        {en ? "GLOBAL COVERAGE" : "COBERTURA GLOBAL"}
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Fraunces',serif", marginBottom: 16, color: t.tx }}>
        {en ? "20 Countries Tracked" : "20 Paises Monitoreados"}
      </div>

      {/* Map area */}
      <div style={{ position: "relative", width: "100%", paddingBottom: "50%", background: dark ? "rgba(30,41,59,0.3)" : "rgba(238,241,248,0.5)", borderRadius: 10, overflow: "hidden" }}>
        {/* Recognizable continent outlines — subtle background */}
        <svg
          viewBox="0 0 1000 500"
          preserveAspectRatio="xMidYMid meet"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          {CONTINENTS.map((c) => (
            <path
              key={c.name}
              d={c.d}
              fill={t.tx3}
              fillOpacity={0.13}
              stroke={t.tx3}
              strokeOpacity={0.08}
              strokeWidth={0.5}
            />
          ))}
        </svg>

        {/* Country dots */}
        {countries.map((c, i) => (
          <motion.div
            key={c.code}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="world-map-dot"
            style={{
              left: `${c.pos.x}%`,
              top: `${c.pos.y}%`,
              width: c.size,
              height: c.size,
              background: c.color,
              transform: "translate(-50%, -50%)",
              borderColor: t.cardBg,
              boxShadow: `0 0 ${c.size / 2}px ${c.color}40`,
            }}
            onMouseEnter={() => setHover(c.code)}
            onMouseLeave={() => setHover(null)}
          >
            {hover === c.code && (
              <div className="world-map-tooltip" style={{ background: t.tx, color: t.cardBg }}>
                {c.f} {en ? c.e : c.n} · {(c.score * 100).toFixed(1)} · #{c.rank}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 12, fontSize: 11, color: t.tx3 }}>
        <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: t.gn, marginRight: 4 }} />{en ? "Ready" : "Preparado"} (&ge;65)</span>
        <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: t.am, marginRight: 4 }} />{en ? "At Risk" : "En Riesgo"} (40-64)</span>
        <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: t.rd, marginRight: 4 }} />{en ? "Deficit" : "Deficit"} (&lt;40)</span>
      </div>
    </div>
  );
}
