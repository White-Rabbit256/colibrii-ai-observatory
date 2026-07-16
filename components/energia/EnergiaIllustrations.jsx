"use client";
import { useEffect, useId, useRef, useState } from "react";
import { EN_ACCENT, FUEL_COLORS, DC_DEMAND, TIMELINE, VOTE_MATH, SRC } from "../energiaData";

/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — EnergiaIllustrations
   Original editorial SVG schematics for the energy & AI section.
   · GridToChipFlow — "Del megavatio al modelo": generation → step-up →
     HV transmission → substation → data centre → AI compute.
   · Ruta23414 — metro-map of Bill 23.414's legislative route.
   Zero deps beyond react. Every figure traces to components/energiaData.js
   (DC_DEMAND, TIMELINE, VOTE_MATH, SRC.epr) — no orphan numbers, no
   fabricated geography (both figures are labeled "esquemático").
   Panels are FIXED-DARK in both themes (ReactorCutaway precedent) so the
   in-SVG white/gold text keeps AA contrast on light theme too.
   Keyframes prefixed `enil-`, ids `enil-*`. Reduced motion: CSS animations
   stop, SMIL groups (.eil-smil) are hidden — static marks always remain.
   One IntersectionObserver per mount pauses animation off-screen.
   Both exports are next/dynamic-friendly (ssr:false, no window at render).
   Compact layout: two sibling SVGs swapped at 639px via CSS — the hidden
   one is display:none, i.e. out of the accessibility tree.
   ═══════════════════════════════════════════════════════════════ */

const MONO = "'IBM Plex Mono',monospace";

/* In-SVG type: fixed-dark panel ⇒ whites are safe in both themes. */
const LBL = { fontFamily: MONO, fontSize: 10.5, letterSpacing: 1.5, textTransform: "uppercase", fill: "rgba(255,255,255,0.85)" };
const SUB = { fontFamily: MONO, fontSize: 10, fill: "rgba(255,255,255,0.66)" };
const GOLD = EN_ACCENT.gold;
const CYAN = EN_ACCENT.glow;

/* Panel chrome — ReactorCutaway recipe (EnergiaArt.jsx). */
const PANEL = {
  background: "linear-gradient(165deg, #0A1F3F 0%, #0d2240 100%)",
  borderRadius: 14,
  border: "1px solid rgba(0,181,168,0.25)",
  padding: 18,
};

/* Shared CSS — injected per instance (same content, duplicate-safe; the
   EnergiaArt per-component <style> precedent). SMIL lives under .eil-smil:
   hidden when the panel is off-screen (IO pause) and under reduced motion. */
const EIL_CSS = `
@keyframes enil-dash{to{stroke-dashoffset:-26}}
@keyframes enil-pulse{0%,100%{opacity:.95}50%{opacity:.35}}
.eil-scope .enil-dash{stroke-dasharray:6.5 6.5;animation:enil-dash 1.5s linear infinite;animation-play-state:paused}
.eil-scope .enil-pulse{animation:enil-pulse 2.6s ease-in-out infinite;animation-play-state:paused}
.eil-scope.eil-live .enil-dash,.eil-scope.eil-live .enil-pulse{animation-play-state:running}
.eil-scope:not(.eil-live) .eil-smil{display:none}
.eil-scope .enil-wide{display:block}
.eil-scope .enil-compact{display:none}
@media (max-width: 639px){
  .eil-scope .enil-wide{display:none}
  .eil-scope .enil-compact{display:block}
}
@media (prefers-reduced-motion: reduce){
  .eil-scope *{animation:none !important}
  .eil-scope .eil-smil{display:none}
}
.eil-sr{position:absolute !important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
`;

/* IO (threshold .15) + prefers-reduced-motion gate → single class toggle. */
function useLive() {
  const ref = useRef(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return undefined;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const apply = () => setLive(inView && !mq.matches);
    if (typeof IntersectionObserver === "undefined") { inView = true; apply(); return undefined; }
    const io = new IntersectionObserver((entries) => {
      inView = entries.some((e) => e.isIntersecting);
      apply();
    }, { threshold: 0.15 });
    io.observe(el);
    const onMq = () => apply();
    if (mq.addEventListener) mq.addEventListener("change", onMq);
    else if (mq.addListener) mq.addListener(onMq);
    return () => {
      io.disconnect();
      if (mq.removeEventListener) mq.removeEventListener("change", onMq);
      else if (mq.removeListener) mq.removeListener(onMq);
    };
  }, []);
  return [ref, live];
}

/* ── Leader-line label (EnergiaArt Tag clone, + optional color) ── */
function Tag({ x, y, tx, ty, t, anchor = "start", color }) {
  const fill = color ? { ...LBL, fill: color } : LBL;
  if (anchor === "middle") {
    const up = ty < y;
    return (
      <g>
        <circle cx={x} cy={y} r="2" fill="rgba(255,255,255,0.55)" />
        <path d={`M${x} ${y} L${tx} ${ty}`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
        <text x={tx} y={up ? ty - 7 : ty + 13} textAnchor="middle" style={fill}>{t}</text>
      </g>
    );
  }
  const dir = anchor === "end" ? -1 : 1;
  return (
    <g>
      <circle cx={x} cy={y} r="2" fill="rgba(255,255,255,0.55)" />
      <path d={`M${x} ${y} L${tx} ${ty} h${dir * 10}`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
      <text x={tx + dir * 14} y={ty + 3.5} textAnchor={anchor} style={fill}>{t}</text>
    </g>
  );
}

/* ── Blueprint corner crosshair (EnergiaArt clone) ── */
function Cross({ x, y }) {
  return (
    <path d={`M${x - 6} ${y} H${x + 6} M${x} ${y - 6} V${y + 6}`} stroke="rgba(34,211,238,0.2)" strokeWidth="1" fill="none" />
  );
}

/* ── Gold badge pill (ReactorCutaway recipe) ── */
function Badge({ children }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 12,
      fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
      textTransform: "uppercase", color: GOLD,
      border: "1px solid rgba(242,177,53,0.35)", borderRadius: 999, padding: "4px 11px",
    }}>
      <span style={{ width: 5, height: 5, borderRadius: 99, background: GOLD, display: "inline-block" }} />
      {children}
    </div>
  );
}

/* ── Figcaption source/credit chips (ShareCard idiom, dark-panel colors) ── */
function Chip({ href, children }) {
  const st = {
    fontFamily: MONO, fontSize: 10, color: "rgba(255,255,255,0.7)", textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.22)", borderRadius: 6, padding: "4px 9px",
    display: "inline-flex", alignItems: "center",
  };
  if (!href) return <span style={st}>{children}</span>;
  return <a href={href} target="_blank" rel="noopener noreferrer" style={st}>{children}</a>;
}

const CAPTION = { marginTop: 12, fontSize: 11.5, lineHeight: 1.5, color: "rgba(255,255,255,0.65)" };
const CHIPROW = { marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" };

/* ═════════════════════════════════════════════════════════════════
   GLYPHS — grid-to-chip stations. Relative coords; origin = the point
   where the glyph touches the energy spine (bottom-center; chip: center).
   ═════════════════════════════════════════════════════════════════ */

/* [1] Generation: dam (hydro) + reservoir wave, rotor (wind), panel (solar). */
function GenGlyph() {
  return (
    <g>
      {/* solar panel, tilted */}
      <path d="M-56 0 L-48 -14 L-30 -14 L-38 0 Z" fill="rgba(251,146,60,0.16)" stroke={FUEL_COLORS.solar} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M-49 -7 L-35 -7" stroke={FUEL_COLORS.solar} strokeWidth="0.8" opacity="0.7" />
      {/* reservoir wave behind the dam */}
      <path d="M-32 -6 q4 -3 8 0 t8 0" fill="none" stroke={FUEL_COLORS.hydro} strokeWidth="1.5" strokeLinecap="round" />
      {/* dam trapezoid */}
      <path d="M-14 0 L-6 -34 H10 L18 0 Z" fill="rgba(13,148,136,0.16)" stroke={FUEL_COLORS.hydro} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M-10 -20 H13 M-12 -10 H16" stroke={FUEL_COLORS.hydro} strokeWidth="0.8" opacity="0.5" />
      {/* wind rotor */}
      <path d="M30 0 V-30" stroke={FUEL_COLORS.wind} strokeWidth="1.5" />
      <circle cx="30" cy="-30" r="2" fill={FUEL_COLORS.wind} />
      <path d="M30 -30 L30 -41 M30 -30 L20.5 -24.5 M30 -30 L39.5 -24.5" stroke={FUEL_COLORS.wind} strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

/* [2] Step-up coil + lattice pylon with 3 sagging catenaries (quadratics). */
function PylonGlyph() {
  return (
    <g>
      {/* step-up transformer coil (two windings; gold secondary) */}
      <path d="M-58 -14 H-53" stroke="#6e87ab" strokeWidth="1.4" />
      <circle cx="-46" cy="-14" r="7" fill="none" stroke="#6e87ab" strokeWidth="1.4" />
      <circle cx="-38" cy="-14" r="7" fill="none" stroke={GOLD} strokeWidth="1.4" opacity="0.75" />
      {/* lattice tower */}
      <g stroke="#6e87ab" strokeWidth="1.5" fill="none">
        <path d="M-16 0 L-7 -60 M16 0 L7 -60" />
        <path d="M-13 -12 L11 -24 M13 -12 L-11 -24 M-11 -24 L9 -38 M11 -24 L-9 -38" strokeWidth="1" />
        <path d="M-7 -60 L0 -72 L7 -60" />
        <path d="M-24 -52 H24 M-17 -38 H17" />
        <path d="M-24 -52 v4 M24 -52 v4 M-17 -38 v4 M17 -38 v4" strokeWidth="1" />
      </g>
      {/* 3 sagging catenaries — quadratic, never straight */}
      <g stroke="#6e87ab" strokeWidth="1.2" fill="none">
        <path d="M-24 -48 Q-40 -34 -54 -38" />
        <path d="M24 -48 Q40 -34 54 -38" />
        <path d="M17 -34 Q34 -22 50 -26" />
      </g>
      {/* gold conductor accents */}
      {[[-24, -48], [24, -48], [17, -34], [-54, -38], [54, -38], [50, -26]].map(([cx, cy]) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="1.7" fill={GOLD} opacity="0.9" />
      ))}
    </g>
  );
}

/* [3] Substation: transformer body, gold coil hatch, 3 bushings. */
function SubstationGlyph() {
  return (
    <g>
      <rect x="-24" y="-40" width="48" height="40" rx="4" fill="#122947" stroke="#3a557e" strokeWidth="1.5" />
      {[-17, -11, -5, 1, 7, 13].map((hx) => (
        <line key={hx} x1={hx} y1="-33" x2={hx} y2="-8" stroke="rgba(242,177,53,0.38)" strokeWidth="1" />
      ))}
      {[-13, 0, 13].map((bx) => (
        <g key={bx}>
          <line x1={bx} y1="-40" x2={bx} y2="-49" stroke="#6e87ab" strokeWidth="1.4" />
          <circle cx={bx} cy="-51" r="2" fill="#0d2240" stroke="#6e87ab" strokeWidth="1.2" />
        </g>
      ))}
    </g>
  );
}

/* [4] Data centre: building, 3 rack columns, cyan LED ticks (3 pulse). */
function DataCentreGlyph() {
  const leds = [];
  [-15.5, 0.5, 16.5].forEach((cx, c) => {
    [-42, -34, -26, -18].forEach((cy, r) => {
      const pulse = (c + r) % 4 === 0; // 3 of 12 pulse, staggered
      leds.push(
        <circle
          key={`${c}-${r}`} cx={cx} cy={cy} r="1.1" fill={CYAN} opacity="0.85"
          className={pulse ? "enil-pulse" : undefined}
          style={pulse ? { animationDelay: `${(c + r) * 0.4}s` } : undefined}
        />
      );
    });
  });
  return (
    <g>
      <rect x="-27" y="-54" width="54" height="54" fill="#0f2138" stroke="#3a557e" strokeWidth="1.5" />
      {[-20, -4, 12].map((rx) => (
        <rect key={rx} x={rx} y="-46" width="9" height="32" fill="none" stroke="rgba(110,135,171,0.85)" strokeWidth="1.2" />
      ))}
      {leds}
    </g>
  );
}

/* [5] AI chip: pins, cyan package, gold core (SMIL glow pulse). Center origin. */
function ChipGlyph() {
  return (
    <g>
      <g stroke="#6e87ab" strokeWidth="1.2">
        {[-12, 0, 12].map((p) => (
          <path key={p} d={`M${p} -22 V-29 M${p} 22 V29 M-22 ${p} H-29 M22 ${p} H29`} fill="none" />
        ))}
      </g>
      <rect x="-22" y="-22" width="44" height="44" rx="5" fill="#0d2240" stroke={CYAN} strokeWidth="1.5" />
      <rect x="-11" y="-11" width="22" height="22" rx="3" fill="none" stroke="rgba(34,211,238,0.5)" strokeWidth="0.8" />
      {/* static gold core — always visible */}
      <rect x="-8" y="-8" width="16" height="16" rx="2" fill={GOLD} opacity="0.8" />
      {/* SMIL glow overlay — hidden off-screen & under reduced motion */}
      <g className="eil-smil">
        <rect x="-8" y="-8" width="16" height="16" rx="2" fill="#fff6d8" opacity="0">
          <animate attributeName="opacity" values="0;0.6;0" dur="2.6s" repeatCount="indefinite" />
        </rect>
      </g>
    </g>
  );
}

/* Station label under the wide spine: dot → leader → 2 lines + optional sub. */
function WStnLabel({ x, y = 178, t, t2, sub, subFill }) {
  return (
    <g>
      <circle cx={x} cy={y} r="2" fill="rgba(255,255,255,0.55)" />
      <path d={`M${x} ${y + 2} V216`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
      <text x={x} y={230} textAnchor="middle" style={LBL}>{t}</text>
      {t2 ? <text x={x} y={244} textAnchor="middle" style={LBL}>{t2}</text> : null}
      {sub ? <text x={x} y={260} textAnchor="middle" style={{ ...SUB, fill: subFill || SUB.fill }}>{sub}</text> : null}
    </g>
  );
}

/* Compact station: glyph on the vertical spine + right-hand label block. */
function CStn({ y, scale = 0.62, glyph, t, t2, sub, subFill }) {
  return (
    <g>
      <g transform={`translate(44 ${y}) scale(${scale})`}>{glyph}</g>
      <path d={`M80 ${y} H88`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
      <text x="94" y={y - 12} style={LBL}>{t}</text>
      {t2 ? <text x="94" y={y + 2} style={LBL}>{t2}</text> : null}
      {sub ? <text x="94" y={y + 18} style={{ ...SUB, fill: subFill || SUB.fill }}>{sub}</text> : null}
    </g>
  );
}

/* ═════════════════════════════════════════════════════════════════
   GridToChipFlow — "Del megavatio al modelo"
   Schematic: generation → step-up + HV line → substation → data
   centre → AI compute. Figures: 415/945 TWh (DC_DEMAND.series),
   "hasta 20% … en riesgo" (DC_DEMAND.note, s=iea2025), 230 kV /
   300 MW (SRC.epr — already used by hvArcs/ACT2_KPIS). Institutional
   rule: line hardware credits EPR; dispatch credits DOCSE (ICE)
   nationally and EOR regionally — never one merged SIEPAC credit.
   ═════════════════════════════════════════════════════════════════ */
export function GridToChipFlow({ en }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const id = (n) => `enil-${n}-${uid}`;
  const [ref, live] = useLive();

  const twh24 = DC_DEMAND.series.find((p) => p.year === 2024)?.twh;
  const twh30 = DC_DEMAND.series.find((p) => p.year === 2030)?.twh;
  const chipStat = `${twh24} → ${twh30} TWh · 2024→2030`; // integers — no decimal-locale risk

  const S = {
    dispatch: en ? "national dispatch: DOCSE (ICE) · regional coordination: EOR" : "despacho nacional: DOCSE (ICE) · coordinación regional: EOR",
    bottleneck: en ? "GRID BOTTLENECK" : "CUELLO DE BOTELLA DE RED",
    bn1: en ? "up to 20% of data-centre projects" : "hasta 20% de los proyectos de centros de datos",
    bn2: en ? "at risk of delay · IEA" : "en riesgo de atraso · AIE",
    bn1c: en ? "up to 20% of data-centre projects" : "hasta 20% de los proyectos de centros",
    bn2c: en ? "at risk of delay · IEA" : "de datos en riesgo de atraso · AIE",
    s1: en ? "GENERATES" : "GENERA", s1b: en ? "POWER PLANT" : "PLANTA",
    s2: en ? "STEPS UP & TRANSMITS" : "ELEVA Y TRANSMITE", s2b: en ? "HIGH VOLTAGE" : "ALTA TENSIÓN",
    s2sub: en ? "230 kV · SIEPAC · line: EPR" : "230 kV · SIEPAC · línea: EPR",
    s3: en ? "STEPS DOWN" : "REDUCE", s3b: en ? "SUBSTATION" : "SUBESTACIÓN",
    s3sub: en ? "to medium voltage" : "a media tensión",
    s4: en ? "FEEDS" : "ALIMENTA", s4b: en ? "DATA CENTRE" : "CENTRO DE DATOS",
    s4sub: "UPS → racks",
    s5: en ? "COMPUTES" : "COMPUTA", s5b: en ? "AI" : "IA",
  };

  const title = en
    ? "Schematic of electricity's journey from generation to AI compute"
    : "Esquema del recorrido de la electricidad, de la generación al cómputo de IA";
  const desc = en
    ? "Schematic diagram: generation, step-up transformer, high-voltage line, substation, data centre, AI compute. It does not depict real geography."
    : "Diagrama esquemático: generación → transformador elevador → línea de alta tensión → subestación → centro de datos → cómputo de IA. No representa geografía real.";

  /* Shared annotation content, laid out per viewBox below. */
  const wideSpine = "M90 170 H738";
  const compactSpine = "M44 70 V485";

  return (
    <div ref={ref} className={`eil-scope${live ? " eil-live" : ""}`} style={PANEL}>
      <style>{EIL_CSS}</style>
      <Badge>{en ? "PLANT TO CHIP · COLIBRII ILLUSTRATION" : "DE LA PLANTA AL CHIP · ILUSTRACIÓN COLIBRII"}</Badge>

      <figure role="figure" style={{ margin: 0 }}>
        {/* ── WIDE (≥640px) ── */}
        <svg
          viewBox="0 0 860 320" width="100%" role="img" className="enil-wide"
          aria-labelledby={`${id("tw")} ${id("dw")}`} style={{ width: "100%", height: "auto" }}
        >
          <title id={id("tw")}>{title}</title>
          <desc id={id("dw")}>{desc}</desc>
          <defs>
            <pattern id={id("grid")} width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M24 0 H0 V24" fill="none" stroke="rgba(34,211,238,0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="860" height="320" fill={`url(#${id("grid")})`} />
          <Cross x={24} y={24} /><Cross x={836} y={24} /><Cross x={24} y={296} /><Cross x={836} y={296} />

          {/* dispatch info line — present-tense truth (no ECOSEN) */}
          <text x="90" y="30" style={SUB}>{S.dispatch}</text>
          <path d="M90 40 H470" stroke="rgba(34,211,238,0.35)" strokeWidth="1" strokeDasharray="3 5" fill="none" />

          {/* energy spine: static base + animated dash overlay + static chevrons */}
          <path d={wideSpine} stroke="rgba(34,211,238,0.25)" strokeWidth="1" fill="none" />
          <path d={wideSpine} className="enil-dash" stroke={CYAN} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          {[180, 340, 500, 660].map((cx) => (
            <path key={cx} d={`M${cx} 165 l7 5 l-7 5`} stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" fill="none" />
          ))}

          {/* stations */}
          <g transform="translate(118 170)"><GenGlyph /></g>
          <g transform="translate(300 170)"><PylonGlyph /></g>
          <g transform="translate(460 170)"><SubstationGlyph /></g>
          <g transform="translate(610 170)"><DataCentreGlyph /></g>
          <g transform="translate(762 170)"><ChipGlyph /></g>

          {/* bottleneck warning — DC_DEMAND.note (s: iea2025) */}
          <path d="M380 162 L388 170 L380 178 L372 170 Z" fill={GOLD} />
          <path d="M380 160 V96" stroke="rgba(242,177,53,0.55)" strokeWidth="1" fill="none" />
          <text x="380" y="60" textAnchor="middle" style={{ ...LBL, fill: GOLD }}>{S.bottleneck}</text>
          <text x="380" y="74" textAnchor="middle" style={SUB}>{S.bn1}</text>
          <text x="380" y="88" textAnchor="middle" style={SUB}>{S.bn2}</text>

          {/* labels */}
          <WStnLabel x={118} t={S.s1} t2={S.s1b} />
          <WStnLabel x={300} t={S.s2} t2={S.s2b} sub={S.s2sub} />
          <WStnLabel x={460} t={S.s3} t2={S.s3b} sub={S.s3sub} />
          <WStnLabel x={610} t={S.s4} t2={S.s4b} sub={S.s4sub} />
          <WStnLabel x={762} y={202} t={S.s5} t2={S.s5b} sub={chipStat} subFill={GOLD} />
        </svg>

        {/* ── COMPACT (<640px) — same stations, vertical spine at x=44 ── */}
        <svg
          viewBox="0 0 360 620" width="100%" role="img" className="enil-compact"
          aria-labelledby={`${id("tc")} ${id("dc")}`} style={{ width: "100%", height: "auto" }}
        >
          <title id={id("tc")}>{title}</title>
          <desc id={id("dc")}>{desc}</desc>
          <defs>
            <pattern id={id("gridc")} width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M24 0 H0 V24" fill="none" stroke="rgba(34,211,238,0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="360" height="620" fill={`url(#${id("gridc")})`} />
          <Cross x={20} y={20} /><Cross x={340} y={20} /><Cross x={20} y={598} /><Cross x={340} y={598} />

          <text x="20" y="28" style={SUB}>{en ? "national dispatch: DOCSE (ICE)" : "despacho nacional: DOCSE (ICE)"}</text>
          <text x="20" y="42" style={SUB}>{en ? "regional coordination: EOR" : "coordinación regional: EOR"}</text>
          <path d="M20 52 H340" stroke="rgba(34,211,238,0.35)" strokeWidth="1" strokeDasharray="3 5" fill="none" />

          <path d={compactSpine} stroke="rgba(34,211,238,0.25)" strokeWidth="1" fill="none" />
          <path d={compactSpine} className="enil-dash" stroke={CYAN} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          {[164, 232, 356, 452].map((cy) => (
            <path key={cy} d={`M39 ${cy} l5 6 l5 -6`} stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" fill="none" />
          ))}

          <CStn y={116} glyph={<GenGlyph />} t={S.s1} t2={S.s1b} />
          <CStn y={212} glyph={<PylonGlyph />} t={S.s2} t2={S.s2b} sub={S.s2sub} />

          {/* bottleneck between stations 2 and 3 */}
          <path d="M44 253 L51 260 L44 267 L37 260 Z" fill={GOLD} />
          <path d="M53 260 H88" stroke="rgba(242,177,53,0.55)" strokeWidth="1" fill="none" />
          <text x="94" y="248" style={{ ...LBL, fill: GOLD }}>{S.bottleneck}</text>
          <text x="94" y="262" style={SUB}>{S.bn1c}</text>
          <text x="94" y="276" style={SUB}>{S.bn2c}</text>

          <CStn y={308} glyph={<SubstationGlyph />} t={S.s3} t2={S.s3b} sub={S.s3sub} />
          <CStn y={404} glyph={<DataCentreGlyph />} t={S.s4} t2={S.s4b} sub={S.s4sub} />
          <CStn y={500} glyph={<ChipGlyph />} t={S.s5} t2={S.s5b} sub={chipStat} subFill={GOLD} />
        </svg>

        <figcaption style={CAPTION}>
          <span className="eil-sr">{en ? "Figure: " : "Figura: "}{title}. </span>
          {en
            ? "Schematic diagram — not to scale. In Costa Rica the regional link is SIEPAC: 230 kV, 300 MW per segment (EPR); regional dispatch coordinated by the EOR."
            : "Diagrama esquemático — no a escala. En Costa Rica el enlace regional es el SIEPAC: 230 kV, 300 MW por segmento (EPR); despacho regional coordinado por el EOR."}
          <span style={CHIPROW}>
            <Chip>{en ? "Schematic · original artwork by Colibrii Labs" : "Esquemático · obra original Colibrii Labs"}</Chip>
            <Chip href={SRC.iea2025.url}>{SRC.iea2025.name}</Chip>
            <Chip href={SRC.iea_terms.url}>IEA Terms</Chip>
            <Chip href={SRC.epr.url}>{SRC.epr.name}</Chip>
            <Chip href={SRC.eor.url}>{SRC.eor.name}</Chip>
            <span style={{ fontFamily: MONO, fontSize: 10, color: "rgba(255,255,255,0.55)" }}>
              {en ? " · redrawn by Colibrii Labs" : " · redibujado por Colibrii Labs"}
            </span>
          </span>
        </figcaption>
      </figure>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════
   Ruta23414 — metro-map of the bill's legislative route.
   All dates/figures verbatim from TIMELINE.rows and VOTE_MATH; the
   future stages are the procedural calendar, not a prediction, and
   the 38-vote threshold is a constitutional requirement (Art. 189.3)
   — neutral phrasing only, no advocacy verbs.
   Station hexes mirror TL_COLORS in EnergiaDeep.jsx (not exported
   there — keep in sync): milestone #22d3ee · vote #00B5A8 · decree
   #ef4444 · next #818cf8 · gate #F2B135. Legal here because the
   panel is theme-locked navy; every station also carries a distinct
   glyph (ring / filled+check / halo / inner dot / dashed) — never
   hue alone.
   ═════════════════════════════════════════════════════════════════ */
const RT = { milestone: "#22d3ee", vote: "#00B5A8", decree: "#ef4444", next: "#818cf8", gate: GOLD };

export function Ruta23414({ en }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const id = (n) => `enil-rt-${n}-${uid}`;
  const [ref, live] = useLive();

  const rows = TIMELINE.rows;
  const rIntro = rows[0]; // 21 oct 2022 · Presentación
  const rVote = rows.find((r) => r.type === "vote");
  const rDecree = rows.find((r) => r.type === "decree");
  const rNext = rows.find((r) => r.type === "next");
  const dVote = rVote.date.split(" · ")[0];     // "26 may 2026"
  const dDecree = rDecree.date.split(" · ")[0]; // "27 may 2026"
  const fd = VOTE_MATH.firstDebate;
  const needed = VOTE_MATH.needed;              // 38
  const total = VOTE_MATH.totalSeats;           // 57
  const short = needed - VOTE_MATH.blocs[0].effective; // 38 − 30 = 8

  const S = {
    s1: en ? "INTRODUCED" : "PRESENTACIÓN", s1sub: rIntro.date,
    s2: en ? `1ST DEBATE ✓ ${fd.favor}-${fd.against}` : `1ER DEBATE ✓ ${fd.favor}-${fd.against}`, s2sub: dVote,
    s3: en ? "WITHDRAWAL" : "DESCONVOCATORIA",
    s3sub: en ? `Decree 45807-MP · ${dDecree}` : `Decreto 45807-MP · ${dDecree}`,
    here: en ? "HERE" : "AQUÍ",
    s4: en ? "ORDINARY SESSIONS" : "SESIONES ORDINARIAS", s4sub: rNext.date,
    gateN: String(needed),
    gate: en ? `THE ${needed}-VOTE WALL` : `MURO DE LOS ${needed} VOTOS`,
    gateSub: en ? `${short} votes short` : `faltan ${short} votos`,
    s5: en ? "2ND DEBATE → LAW" : "2º DEBATE → LEY",
    s5sub: en ? `requires ${needed} of ${total} · Art. 189.3` : `requiere ${needed} de ${total} · Art. 189.3`,
    sala1: en ? "CONSTITUTIONAL COURT REFERRAL" : "CONSULTA SALA IV",
    sala2: en ? "announced by the opposition (26 May)" : "anunciada por la oposición (26 may)",
    win1: en ? "RENEGOTIATION WINDOW" : "VENTANA DE RENEGOCIACIÓN",
    win2: "JUN-OCT 2026",
  };

  const title = en
    ? "Schematic of Bill 23.414's legislative route"
    : "Esquema del proceso legislativo del Expediente 23.414";
  const desc = en
    ? `Metro-map schematic: introduced (${rIntro.date}) → first debate approved ${fd.favor}-${fd.against} (${dVote}) → withdrawal, Decree 45807-MP (${dDecree}) → ordinary sessions (${rNext.date}) → the ${needed}-vote wall (${short} votes short) → second debate → law (requires ${needed} of ${total}, Art. 189.3). Includes the announced Constitutional Court referral and the June-October 2026 renegotiation window.`
    : `Mapa esquemático: presentación (${rIntro.date}) → primer debate aprobado ${fd.favor}-${fd.against} (${dVote}) → desconvocatoria, Decreto 45807-MP (${dDecree}) → sesiones ordinarias (${rNext.date}) → muro de los ${needed} votos (faltan ${short}) → segundo debate → ley (requiere ${needed} de ${total}, Art. 189.3). Incluye la consulta anunciada a la Sala IV y la ventana de renegociación de junio a octubre de 2026.`;

  /* Reusable station node (r7, 3px stroke). kind: ring|check|halo|dot|dashed */
  const Node = ({ cx, cy, color, kind }) => (
    <g>
      {kind === "halo" && (
        <>
          <circle cx={cx} cy={cy} r="12" fill="none" stroke="rgba(239,68,68,0.45)" strokeWidth="1.5" />
          <g className="eil-smil">
            <circle cx={cx} cy={cy} r="8" fill="none" stroke={RT.decree} strokeWidth="1.5">
              <animate attributeName="r" values="8;17" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0" dur="2.4s" repeatCount="indefinite" />
            </circle>
          </g>
        </>
      )}
      <circle
        cx={cx} cy={cy} r="7"
        fill={kind === "check" ? color : "#0A1F3F"}
        stroke={color} strokeWidth="3"
        strokeDasharray={kind === "dashed" ? "3 3" : undefined}
      />
      {kind === "check" && (
        <path d={`M${cx - 3.2} ${cy} l2.4 2.6 l4.2 -5`} stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {kind === "dot" && <circle cx={cx} cy={cy} r="2.5" fill={color} />}
    </g>
  );

  return (
    <div ref={ref} className={`eil-scope${live ? " eil-live" : ""}`} style={PANEL}>
      <style>{EIL_CSS}</style>
      <Badge>{en ? "BILL 23.414 ROUTE · COLIBRII SCHEMATIC" : "RUTA DEL EXPEDIENTE 23.414 · ESQUEMA COLIBRII"}</Badge>

      <figure role="figure" style={{ margin: 0 }}>
        {/* ── WIDE (≥640px) ── */}
        <svg
          viewBox="0 0 860 300" width="100%" role="img" className="enil-wide"
          aria-labelledby={`${id("tw")} ${id("dw")}`} style={{ width: "100%", height: "auto" }}
        >
          <title id={id("tw")}>{title}</title>
          <desc id={id("dw")}>{desc}</desc>
          <defs>
            <linearGradient id={id("past")} gradientUnits="userSpaceOnUse" x1="70" y1="0" x2="390" y2="0">
              <stop offset="0" stopColor={RT.milestone} />
              <stop offset="1" stopColor={RT.vote} />
            </linearGradient>
            <pattern id={id("grid")} width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M24 0 H0 V24" fill="none" stroke="rgba(34,211,238,0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="860" height="300" fill={`url(#${id("grid")})`} />
          <Cross x={24} y={24} /><Cross x={836} y={24} /><Cross x={24} y={276} /><Cross x={836} y={276} />

          {/* line: solid gradient = past (certain) · dashed = procedural calendar */}
          <path d="M70 150 H390" stroke={`url(#${id("past")})`} strokeWidth="2.5" fill="none" />
          <path d="M390 150 H790" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeDasharray="5 6" fill="none" />

          {/* the 38-vote wall — dashed line passes THROUGH the gate */}
          <rect x="639" y="110" width="6" height="80" fill="#1c3354" stroke={RT.gate} strokeWidth="2" />
          <rect x="655" y="110" width="6" height="80" fill="#1c3354" stroke={RT.gate} strokeWidth="2" />
          <text x="650" y="99" textAnchor="middle" style={{ fontFamily: MONO, fontSize: 15, fontWeight: 700, fill: RT.gate }}>{S.gateN}</text>
          <text x="650" y="212" textAnchor="middle" style={{ ...LBL, fill: RT.gate }}>{S.gate}</text>
          <text x="650" y="227" textAnchor="middle" style={{ ...SUB, fill: RT.gate }}>{S.gateSub}</text>

          {/* stations */}
          <Node cx={70} cy={150} color={RT.milestone} kind="ring" />
          <Node cx={230} cy={150} color={RT.vote} kind="check" />
          <Node cx={390} cy={150} color={RT.decree} kind="halo" />
          <Node cx={540} cy={150} color={RT.next} kind="dot" />
          <Node cx={790} cy={150} color="rgba(255,255,255,0.4)" kind="dashed" />

          {/* labels — above: S1 S2 S3 S5 · below: S4 */}
          <text x="70" y="104" textAnchor="middle" style={LBL}>{S.s1}</text>
          <text x="70" y="119" textAnchor="middle" style={SUB}>{S.s1sub}</text>
          <text x="230" y="104" textAnchor="middle" style={LBL}>{S.s2}</text>
          <text x="230" y="119" textAnchor="middle" style={SUB}>{S.s2sub}</text>
          <text x="390" y="104" textAnchor="middle" style={LBL}>{S.s3}</text>
          <text x="390" y="119" textAnchor="middle" style={SUB}>{S.s3sub}</text>
          <text x="540" y="184" textAnchor="middle" style={LBL}>{S.s4}</text>
          <text x="540" y="199" textAnchor="middle" style={SUB}>{S.s4sub}</text>
          <text x="790" y="104" textAnchor="middle" style={LBL}>{S.s5}</text>
          <text x="848" y="119" textAnchor="end" style={SUB}>{S.s5sub}</text>

          {/* gold "here" marker */}
          <Tag x={397} y={157} tx={424} ty={171} t={S.here} color={RT.gate} />

          {/* Sala IV referral loop — announced, not resolved (dashed gold) */}
          <path d="M383 157 C356 190 328 212 300 224" stroke={RT.gate} strokeWidth="1.3" strokeDasharray="4 4" fill="none" />
          <path d="M300 224 l9 -5 l-2 10 Z" fill={RT.gate} opacity="0.8" />
          <text x="240" y="246" textAnchor="middle" style={{ ...LBL, fill: RT.gate }}>{S.sala1}</text>
          <text x="240" y="260" textAnchor="middle" style={SUB}>{S.sala2}</text>

          {/* renegotiation window bracket (TIMELINE row "1 ago 2026") */}
          <path d="M420 245 v-6 M420 245 H650 M650 245 v-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" />
          <text x="535" y="262" textAnchor="middle" style={SUB}>{S.win1} · {S.win2}</text>
        </svg>

        {/* ── COMPACT (<640px) — vertical spine at x=36, gate as horizontal bar ── */}
        <svg
          viewBox="0 0 360 640" width="100%" role="img" className="enil-compact"
          aria-labelledby={`${id("tc")} ${id("dc")}`} style={{ width: "100%", height: "auto" }}
        >
          <title id={id("tc")}>{title}</title>
          <desc id={id("dc")}>{desc}</desc>
          <defs>
            <linearGradient id={id("pastc")} gradientUnits="userSpaceOnUse" x1="0" y1="80" x2="0" y2="260">
              <stop offset="0" stopColor={RT.milestone} />
              <stop offset="1" stopColor={RT.vote} />
            </linearGradient>
            <pattern id={id("gridc")} width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M24 0 H0 V24" fill="none" stroke="rgba(34,211,238,0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="360" height="640" fill={`url(#${id("gridc")})`} />
          <Cross x={20} y={20} /><Cross x={340} y={20} /><Cross x={20} y={612} /><Cross x={340} y={612} />

          <path d="M36 80 V260" stroke={`url(#${id("pastc")})`} strokeWidth="2.5" fill="none" />
          <path d="M36 260 V550" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeDasharray="5 6" fill="none" />

          {/* stations + right-hand labels */}
          <Node cx={36} cy={80} color={RT.milestone} kind="ring" />
          <path d="M45 80 H58" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
          <text x="64" y="78" style={LBL}>{S.s1}</text>
          <text x="64" y="94" style={SUB}>{S.s1sub}</text>

          <Node cx={36} cy={170} color={RT.vote} kind="check" />
          <path d="M45 170 H58" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
          <text x="64" y="168" style={LBL}>{S.s2}</text>
          <text x="64" y="184" style={SUB}>{S.s2sub}</text>

          <Node cx={36} cy={260} color={RT.decree} kind="halo" />
          <Tag x={46} y={253} tx={58} ty={243} t={S.here} color={RT.gate} />
          <text x="64" y="262" style={LBL}>{S.s3}</text>
          <text x="64" y="278" style={SUB}>{S.s3sub}</text>

          {/* Sala IV loop, left of the spine */}
          <path d="M30 268 C16 290 16 314 30 334" stroke={RT.gate} strokeWidth="1.3" strokeDasharray="4 4" fill="none" />
          <path d="M30 334 l-1 -10 l9 4 Z" fill={RT.gate} opacity="0.8" />
          <text x="40" y="308" style={{ ...LBL, fill: RT.gate }}>{S.sala1}</text>
          <text x="40" y="322" style={SUB}>{S.sala2}</text>

          <Node cx={36} cy={390} color={RT.next} kind="dot" />
          <path d="M45 390 H58" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
          <text x="64" y="388" style={LBL}>{S.s4}</text>
          <text x="64" y="404" style={SUB}>{S.s4sub}</text>

          {/* renegotiation window bracket */}
          <path d="M18 350 h6 M18 350 V505 M18 505 h6" stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" />
          <text x="40" y="432" style={SUB}>{S.win1}</text>
          <text x="40" y="446" style={SUB}>{S.win2}</text>

          {/* gate as horizontal bar — dashed spine passes through the gap */}
          <text x="36" y="452" textAnchor="middle" style={{ fontFamily: MONO, fontSize: 15, fontWeight: 700, fill: RT.gate }}>{S.gateN}</text>
          <rect x="14" y="464" width="16" height="6" fill="#1c3354" stroke={RT.gate} strokeWidth="2" />
          <rect x="42" y="464" width="16" height="6" fill="#1c3354" stroke={RT.gate} strokeWidth="2" />
          <text x="64" y="470" style={{ ...LBL, fill: RT.gate }}>{S.gate}</text>
          <text x="64" y="486" style={{ ...SUB, fill: RT.gate }}>{S.gateSub}</text>

          <Node cx={36} cy={550} color="rgba(255,255,255,0.4)" kind="dashed" />
          <path d="M45 550 H58" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
          <text x="64" y="548" style={LBL}>{S.s5}</text>
          <text x="64" y="564" style={SUB}>{S.s5sub}</text>
        </svg>

        <figcaption style={CAPTION}>
          <span className="eil-sr">{en ? "Figure: " : "Figura: "}{title}. </span>
          {en
            ? "Process schematic — future stages are the procedural calendar, not a prediction."
            : "Esquema del proceso — las etapas futuras son calendario procesal, no una predicción."}
          <span style={CHIPROW}>
            <Chip>{en ? "Original artwork by Colibrii Labs" : "Obra original Colibrii Labs"}</Chip>
            <Chip href={SRC.asamblea.url}>{SRC.asamblea.name}</Chip>
            <Chip href={SRC.presidencia.url}>{SRC.presidencia.name}</Chip>
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
