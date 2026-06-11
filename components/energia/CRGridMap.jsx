"use client";
import { useState } from "react";
import { CR_OUTLINE_GEO, CR_BBOX, PLANTS_GEO } from "./crGeo";

/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — CRGridMap (Act 4)
   Accurate, interactive SVG map of Costa Rica (Natural Earth
   outline, public domain). Equirectangular projection, animated
   transmission flow into the GAM load centre, pulsing plant nodes,
   and a fully keyboard-accessible HTML button overlay with info
   cards. Colors match Hero3D's KIND map.
   ═══════════════════════════════════════════════════════════════ */

const KIND = {
  hydro: "#22d3ee",
  geo: "#F2B135",
  wind: "#00B5A8",
  solar: "#fbbf24",
  thermal: "#ef4444",
  load: "#ffffff",
};
const KIND_LABEL = {
  hydro: ["Hidro", "Hydro"],
  geo: ["Geotérmica", "Geothermal"],
  wind: ["Eólica", "Wind"],
  solar: ["Solar", "Solar"],
  thermal: ["Térmica", "Thermal"],
  load: ["Carga", "Load"],
};
const LEGEND_ORDER = ["hydro", "geo", "wind", "solar", "thermal", "load"];
const DETAIL_EN = {
  reventazon: "305 MW · hydro",
  arenal: "ARDESA complex",
  miravalles: "geothermal",
  borinquen: "under development · 2030",
  tejona: "wind · repowering",
  guanacaste: "wind",
  sanantonio: "10.3 MW · 2026",
  moin: "thermal · backup",
  gam: "load centre",
};
const MONO = "'IBM Plex Mono',monospace";

/* ── Equirectangular projection (same idiom as Hero3D, y inverted for SVG):
      x = (lng − lngMin) · cos(meanLat) ;  y = (latMax − lat) ── */
const { lngMin, latMin, lngMax, latMax } = CR_BBOX;
const KLAT = Math.cos((((latMin + latMax) / 2) * Math.PI) / 180);
const gx = (lng) => (lng - lngMin) * KLAT;
const gy = (lat) => latMax - lat;
const LAND_W = gx(lngMax);
const LAND_H = gy(latMin);

/* 6% padding (plus extra headroom under the title chip), then the frame is
   widened to the panel's 16:10 aspect and centred — so the SVG (with
   preserveAspectRatio="none") and the HTML %-positioned overlay share the
   exact same coordinate space. */
const PAD = 0.06 * LAND_H;
const VB_Y = -(PAD + 0.07 * LAND_H);
const VB_H = LAND_H + PAD - VB_Y;
const VB_W = VB_H * 1.6;
const VB_X = (LAND_W - VB_W) / 2;
const VIEWBOX = `${VB_X.toFixed(3)} ${VB_Y.toFixed(3)} ${VB_W.toFixed(3)} ${VB_H.toFixed(3)}`;
const pctX = (x) => ((x - VB_X) / VB_W) * 100;
const pctY = (y) => ((y - VB_Y) / VB_H) * 100;

const LAND_D =
  CR_OUTLINE_GEO.map(
    ([lng, lat], i) => `${i === 0 ? "M" : "L"}${gx(lng).toFixed(3)} ${gy(lat).toFixed(3)}`
  ).join(" ") + " Z";

const NODES = PLANTS_GEO.map((p, i) => {
  const x = gx(p.lng);
  const y = gy(p.lat);
  return { ...p, i, x, y, px: pctX(x), py: pctY(y) };
});
const LOAD = NODES.find((n) => n.kind === "load");
const GRID_LATS = [9, 10, 11];
const GRID_LNGS = [-85, -84, -83];

export default function CRGridMap({ en }) {
  const [active, setActive] = useState(null);

  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "16 / 10",
        background: "linear-gradient(150deg,#0A1F3F,#10294f)",
        borderRadius: 14,
        border: "1px solid rgba(0,181,168,0.25)",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes crmapFlow { to { stroke-dashoffset: -0.48px; } }
        @keyframes crmapPulse {
          0%, 100% { transform: scale(1); opacity: .4; }
          50% { transform: scale(1.9); opacity: .08; }
        }
        @keyframes crmapRing {
          0% { transform: scale(.35); opacity: .8; }
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }
        .crmap-flow { animation: crmapFlow 2.6s linear infinite; }
        .crmap-halo, .crmap-ring { transform-box: fill-box; transform-origin: center; }
        .crmap-halo { animation: crmapPulse 2.6s ease-in-out infinite; }
        .crmap-ring { animation: crmapRing 3s cubic-bezier(.2,.7,.4,1) infinite; }
        .crmap-node:focus { outline: 2px solid rgba(34,211,238,0.85); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          .crmap-flow, .crmap-halo, .crmap-ring { animation: none; }
        }
      `}</style>

      {/* ── SVG map layer ── */}
      <svg
        viewBox={VIEWBOX}
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          <linearGradient id="crGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#123a6b" />
            <stop offset="100%" stopColor="#0d2747" />
          </linearGradient>
          <filter id="crmapGlow" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.045" result="crb" />
            <feMerge>
              <feMergeNode in="crb" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* graticule hint */}
        {GRID_LATS.map((lat) => (
          <line key={`la${lat}`} x1={VB_X} x2={VB_X + VB_W} y1={gy(lat)} y2={gy(lat)} stroke="rgba(34,211,238,0.08)" strokeWidth={0.008} />
        ))}
        {GRID_LNGS.map((lng) => (
          <line key={`lo${lng}`} x1={gx(lng)} x2={gx(lng)} y1={VB_Y} y2={VB_Y + VB_H} stroke="rgba(34,211,238,0.08)" strokeWidth={0.008} />
        ))}

        {/* land */}
        <path d={LAND_D} fill="url(#crGrad)" stroke="#00B5A8" strokeWidth={0.012} strokeLinejoin="round" filter="url(#crmapGlow)" />

        {/* transmission lines: every plant feeds the GAM */}
        {NODES.filter((n) => n.kind !== "load").map((n) => (
          <line
            key={`tx-${n.id}`}
            className="crmap-flow"
            x1={n.x} y1={n.y} x2={LOAD.x} y2={LOAD.y}
            stroke="rgba(0,181,168,0.3)" strokeWidth={0.009}
            strokeDasharray="0.05 0.07" strokeLinecap="round"
            style={{ animationDuration: `${2.2 + (n.i % 3) * 0.5}s` }}
          />
        ))}

        {/* plant nodes */}
        {NODES.map((n) => {
          const c = KIND[n.kind] || "#fff";
          const isLoad = n.kind === "load";
          return (
            <g key={n.id}>
              {isLoad ? (
                <circle className="crmap-ring" cx={n.x} cy={n.y} r={0.085} fill="none" stroke="#fff" strokeWidth={0.01} opacity={0.35} />
              ) : (
                <circle className="crmap-halo" cx={n.x} cy={n.y} r={0.06} fill={c} opacity={0.3} style={{ animationDelay: `${n.i * 0.35}s` }} />
              )}
              <circle cx={n.x} cy={n.y} r={isLoad ? 0.048 : 0.034} fill={c} opacity={0.95} />
              <circle cx={n.x} cy={n.y} r={isLoad ? 0.02 : 0.013} fill="#fff" />
              {active === n.id && (
                <circle cx={n.x} cy={n.y} r={isLoad ? 0.072 : 0.055} fill="none" stroke={c} strokeWidth={0.01} opacity={0.9} />
              )}
            </g>
          );
        })}
      </svg>

      {/* vignette for depth */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(120% 100% at 32% 18%, transparent 45%, rgba(4,12,28,0.5) 100%)" }} />

      {/* ── Interactive overlay: one real <button> per plant ── */}
      <div role="group" aria-label={en ? "Power plants and load centre" : "Plantas de generación y centro de carga"} style={{ position: "absolute", inset: 0 }}>
        {NODES.map((n) => (
          <button
            key={`btn-${n.id}`}
            type="button"
            className="crmap-node"
            aria-label={`${n.name} — ${en ? DETAIL_EN[n.id] : n.detail} (${KIND_LABEL[n.kind][en ? 1 : 0]})`}
            onMouseEnter={() => setActive(n.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(n.id)}
            onBlur={() => setActive(null)}
            onClick={() => setActive((a) => (a === n.id ? null : n.id))}
            style={{
              position: "absolute",
              left: `${n.px}%`,
              top: `${n.py}%`,
              width: 28,
              height: 28,
              transform: "translate(-50%,-50%)",
              borderRadius: "50%",
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
              zIndex: 2,
            }}
          />
        ))}

        {/* info cards (always mounted so opacity can transition; clamped to edges) */}
        {NODES.map((n) => {
          const horiz = n.px < 26 ? "translateX(-12%)" : n.px > 74 ? "translateX(-88%)" : "translateX(-50%)";
          const vert = n.py < 30 ? { top: `calc(${n.py}% + 18px)` } : { bottom: `calc(${100 - n.py}% + 18px)` };
          return (
            <div
              key={`card-${n.id}`}
              aria-hidden={active !== n.id}
              style={{
                position: "absolute",
                left: `${Math.min(Math.max(n.px, 6), 94)}%`,
                ...vert,
                transform: horiz,
                minWidth: 148,
                maxWidth: 220,
                background: "rgba(7,20,42,0.92)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(0,181,168,0.35)",
                borderRadius: 10,
                padding: "10px 12px",
                pointerEvents: "none",
                opacity: active === n.id ? 1 : 0,
                transition: "opacity .2s ease",
                zIndex: 3,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 13, color: "#fff", lineHeight: 1.25 }}>{n.name}</div>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>
                {en ? DETAIL_EN[n.id] : n.detail}
              </div>
              <span
                style={{
                  display: "inline-block",
                  marginTop: 6,
                  padding: "2px 7px",
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: KIND[n.kind],
                  border: `1px solid ${KIND[n.kind]}`,
                  borderRadius: 999,
                }}
              >
                {KIND_LABEL[n.kind][en ? 1 : 0]}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Title chip ── */}
      <div style={{ position: "absolute", top: 12, left: 14, zIndex: 1, pointerEvents: "none" }}>
        <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: 2, color: "#22d3ee" }}>
          {en ? "POWER GRID · REAL GEOGRAPHY" : "RED ELÉCTRICA · FUENTES REALES"}
        </div>
        <div style={{ marginTop: 4, fontSize: 11, color: "rgba(255,255,255,0.55)", maxWidth: 420 }}>
          {en
            ? "Geography: Natural Earth (public domain) · approximate locations"
            : "Geografía: Natural Earth (dominio público) · ubicaciones aproximadas"}
        </div>
      </div>

      {/* ── Legend ── */}
      <div
        style={{
          position: "absolute",
          left: 14,
          bottom: 12,
          display: "flex",
          flexWrap: "wrap",
          gap: "6px 14px",
          alignItems: "center",
          fontFamily: MONO,
          fontSize: 10.5,
          color: "rgba(255,255,255,0.7)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        {LEGEND_ORDER.map((k) => (
          <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: KIND[k], boxShadow: `0 0 6px ${KIND[k]}` }} />
            {KIND_LABEL[k][en ? 1 : 0]}
          </span>
        ))}
      </div>
    </div>
  );
}
