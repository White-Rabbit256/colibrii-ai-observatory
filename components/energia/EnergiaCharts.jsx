"use client";
/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Energía Charts
   Electricidad, Competitividad Energética & IA · Expediente 23.414
   Built by the Section Factory — data-viz stage (dramatic pass).
   Pure chart bodies (no Card/SH here — the parent section wraps them).
   Data: ../energiaData (frozen shapes). Provenance: SRC line under every chart.
   Chart honesty (non-negotiable): bars start at 0 · axis units labeled ·
   no red/green-only encodings (color is paired with dash/opacity/labels) ·
   estimates rendered visually distinct AND marked in tooltips · source cited.
   Drama: gradient fills, glow filters, animated draw-on, annotations — all
   layered on top of an honest skeleton, never replacing it.
   Gradient/filter ids are namespaced via useId() so multiple mounted
   instances never collide (prefix `enchart-`).
   ═══════════════════════════════════════════════════════════════ */
import React, { useMemo, useId } from "react";
import {
  ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ReferenceArea, PieChart, Pie, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area,
} from "recharts";
import {
  DC_DEMAND, TARIFFS, CR_MIX, CR_RENEW_POINTS, ECAI, SOLAR_CURVE,
  EN_ACCENT, SRC,
} from "../energiaData";

/* ── i18n + format helpers ── */
const T = (v, en) => (v && typeof v === "object" && !Array.isArray(v) && ("es" in v) ? (en ? v.en : v.es) : v);
const fmt = (v, en) => (en ? String(v) : String(v).replace(".", ","));
const MONO = "'IBM Plex Mono',monospace";

/* ── EN_ACCENT-derived graphic palette (stable across light/dark; the CSS
      --en* vars are theme-aware TEXT colors — graphics keep the constants) ── */
const C = {
  turq: EN_ACCENT.turquoise,   // #00B5A8
  glow: EN_ACCENT.glow,        // #22d3ee
  gold: EN_ACCENT.gold,        // #F2B135
  violet: EN_ACCENT.violet,    // #818cf8
  risk: EN_ACCENT.risk,        // #ef4444
  green: EN_ACCENT.green,      // #10b981
  navy: EN_ACCENT.navy,        // #0A1F3F
};
/* per-country graphic colors for the radar (multi-hue, not red/green coded) */
const CTRY = { CR: C.turq, UY: C.violet, PA: C.gold, MX: EN_ACCENT.green };

/* ── shared chart cosmetics (dark-panel friendly, CSS-var aware) ── */
const AXIS = {
  tick: { fontSize: 11, fill: "var(--text3)" },
  axisLine: { stroke: "var(--border)" },
  tickLine: { stroke: "var(--border)" },
};
const GRID = { strokeDasharray: "3 3", stroke: "var(--border)", strokeOpacity: 0.7 };
const CURSOR = { fill: "rgba(34,211,238,0.06)" };
/* glassy tooltip shell — same recipe everywhere for visual consistency */
const TT_BOX = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  boxShadow: "0 8px 30px rgba(0,0,0,.25)",
  fontSize: 12, padding: "9px 13px", lineHeight: 1.55, maxWidth: 268,
  backdropFilter: "blur(6px)",
};
const TT_HEAD = { color: "var(--text)", fontWeight: 700, marginBottom: 2 };
const TT_SUB = { color: "var(--text3)" };

/* ── provenance line (under every chart) — KEEP exact contract ── */
function Src({ ids, en }) {
  const names = ids.map(id => SRC[id]?.name).filter(Boolean).join(" · ");
  return (
    <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 8 }}>
      {en ? "Source: " : "Fuente: "}{names}
    </div>
  );
}

/* ── tiny legend primitives ── */
function Dot({ color, ring }) {
  return (
    <span style={{
      width: 9, height: 9, borderRadius: "50%", background: color, display: "inline-block",
      flexShrink: 0, boxShadow: ring ? `0 0 0 2px ${color}33` : "none",
    }} />
  );
}
function Dash({ color }) {
  /* dashed swatch — signals "estimate / projection" without relying on color alone */
  return (
    <span aria-hidden="true" style={{
      width: 16, height: 0, flexShrink: 0,
      borderTop: `2px dashed ${color}`, display: "inline-block",
    }} />
  );
}
function LegendRow({ items, center }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px", marginTop: 8, fontSize: 11.5, color: "var(--text2)", alignItems: "center", justifyContent: center ? "center" : "flex-start" }}>
      {items.map((it, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          {it.dashed ? <Dash color={it.color} /> : <Dot color={it.color} ring={it.ring} />}
          <span>{it.label}</span>
          {it.value != null && <span style={{ fontFamily: MONO, color: "var(--text3)" }}>{it.value}</span>}
        </span>
      ))}
    </div>
  );
}
/* small bilingual caption under a chart */
function Note({ children }) {
  return <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 8, lineHeight: 1.5 }}>{children}</div>;
}

/* ════════════════════════════════════════════════════════════════
   1 · DCDemandChart — IEA global data-centre electricity demand
   AreaChart: lush turquoise→transparent fill, glowing stroke, draw-on,
   solid actuals + dashed/strong-fill projection, "≈ Japan" annotation.
   ════════════════════════════════════════════════════════════════ */
function DCTip({ active, payload, en }) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <div style={TT_BOX}>
      <div style={TT_HEAD}>
        {d.year}{d.est ? (en ? " · IEA projection" : " · proyección AIE") : ""}
      </div>
      <div style={{ color: C.turq, fontFamily: MONO, fontWeight: 700, fontSize: 13 }}>
        {d.twh.toLocaleString(en ? "en-US" : "es-CR")} TWh
      </div>
      {d.pct && <div style={TT_SUB}>{T(d.pct, en)}{en ? " of global electricity" : " de la electricidad mundial"}</div>}
    </div>
  );
}

export function DCDemandChart({ en }) {
  const uid = useId().replace(/:/g, "");
  const gActual = `enchart-${uid}-dc-actual`;
  const gProj = `enchart-${uid}-dc-proj`;
  const fGlow = `enchart-${uid}-dc-glow`;

  /* one series; split value into solid (actual) vs dashed (projection) channels.
     The last actual year is duplicated into the projection channel so the two
     areas meet with no visual gap. Honest: every projection point is est:true. */
  const data = useMemo(() => {
    const rows = DC_DEMAND.series;
    const lastActualIdx = rows.reduce((acc, r, i) => (r.est ? acc : i), 0);
    return rows.map((d, i) => ({
      ...d,
      est: !!d.est,
      vActual: d.est ? null : d.twh,
      vProj: d.est || i === lastActualIdx ? d.twh : null,
    }));
  }, []);
  const maxTwh = useMemo(() => Math.max(...DC_DEMAND.series.map(d => d.twh)), []);
  const yTop = Math.ceil(maxTwh / 200) * 200; // headroom, rounded
  const japan = DC_DEMAND.series.find(d => d.twh === 945)?.twh ?? 945;

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 18, right: 16, bottom: 0, left: 6 }}>
          <defs>
            <linearGradient id={gActual} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={C.turq} stopOpacity={0.55} />
              <stop offset="55%" stopColor={C.glow} stopOpacity={0.18} />
              <stop offset="100%" stopColor={C.turq} stopOpacity={0} />
            </linearGradient>
            <linearGradient id={gProj} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={C.glow} stopOpacity={0.30} />
              <stop offset="100%" stopColor={C.glow} stopOpacity={0} />
            </linearGradient>
            <filter id={fGlow} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.2" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <CartesianGrid {...GRID} vertical={false} />
          <XAxis dataKey="year" {...AXIS} padding={{ left: 6, right: 6 }} />
          <YAxis domain={[0, yTop]} {...AXIS} width={44}
            tickFormatter={v => v.toLocaleString(en ? "en-US" : "es-CR")}
            label={{ value: "TWh", angle: -90, position: "insideLeft", fill: "var(--text3)", fontSize: 11, dy: 18 }} />
          <Tooltip content={<DCTip en={en} />} cursor={CURSOR} />

          {/* "≈ Japan" annotation marked near 2030 / 945 TWh */}
          <ReferenceLine y={japan} stroke={C.gold} strokeDasharray="5 5" strokeOpacity={0.85} strokeWidth={1.2}
            label={{
              value: en ? "≈ Japan's entire consumption" : "≈ todo el consumo de Japón",
              position: "insideTopRight", fill: C.gold, fontSize: 10, dy: -4,
            }} />

          {/* solid actual area + glowing stroke, draw-on */}
          <Area type="monotone" dataKey="vActual" stroke={C.turq} strokeWidth={3}
            fill={`url(#${gActual})`} fillOpacity={1} connectNulls={false}
            isAnimationActive animationDuration={1400} animationEasing="ease-out"
            filter={`url(#${fGlow})`}
            dot={{ r: 4.5, fill: C.turq, stroke: "var(--card)", strokeWidth: 2 }}
            activeDot={{ r: 6.5, fill: C.glow, stroke: "var(--card)", strokeWidth: 2 }} />
          {/* dashed projection area, distinct fill — clearly "not measured yet" */}
          <Area type="monotone" dataKey="vProj" stroke={C.glow} strokeWidth={2.4}
            strokeDasharray="7 5" fill={`url(#${gProj})`} fillOpacity={1} connectNulls
            isAnimationActive animationDuration={1400} animationBegin={350} animationEasing="ease-out"
            dot={{ r: 4, fill: "var(--card)", stroke: C.glow, strokeWidth: 2 }}
            activeDot={{ r: 6, fill: C.glow, stroke: "var(--card)", strokeWidth: 2 }} />
        </AreaChart>
      </ResponsiveContainer>
      <LegendRow items={[
        { color: C.turq, label: en ? "Measured (IEA)" : "Medido (AIE)", ring: true },
        { color: C.glow, label: en ? "IEA projection (Base Case)" : "Proyección AIE (caso base)", dashed: true },
        { color: C.gold, label: en ? "Japan reference (~945 TWh)" : "Referencia Japón (~945 TWh)", dashed: true },
      ]} />
      <Src ids={[DC_DEMAND.s]} en={en} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   2 · TariffChart — LatAm industrial tariff bands (floating bars)
   Rounded per-bar gradient bands · CR highlighted (glow) · US ReferenceLine
   in gold with label · animated grow-in · rich basis tooltip.
   ════════════════════════════════════════════════════════════════ */
function TariffTip({ active, payload, en }) {
  if (!active || !payload || !payload.length) return null;
  const r = (payload.find(p => p.payload && p.payload.country) || payload[0]).payload;
  const range = r.lo === r.hi ? `${fmt(r.lo, en)}` : `${fmt(r.lo, en)}–${fmt(r.hi, en)}`;
  const color = r.highlight ? C.turq : r.benchmark ? C.gold : "var(--text2)";
  return (
    <div style={TT_BOX}>
      <div style={TT_HEAD}>{T(r.country, en)}</div>
      <div style={{ color, fontFamily: MONO, fontWeight: 700, fontSize: 13 }}>{range} US$/MWh</div>
      <div style={TT_SUB}>{en ? "Basis: " : "Base: "}{T(r.basis, en)}</div>
      <div style={{ color: "var(--text3)", marginTop: 3, fontStyle: "italic" }}>{SRC[r.s]?.name}</div>
    </div>
  );
}

export function TariffChart({ en }) {
  const uid = useId().replace(/:/g, "");
  const fGlow = `enchart-${uid}-tar-glow`;
  /* rows arrive pre-sorted ascending by lo; base (transparent) + span = floating band.
     min visible span so single-point benchmarks stay legible (honesty: tooltip
     still reports the true lo/hi, and US is also drawn as a precise ReferenceLine). */
  const rows = useMemo(() => TARIFFS.rows.map(r => ({
    ...r, label: T(r.country, en), base: r.lo, span: Math.max(r.hi - r.lo, 4),
  })), [en]);
  const srcIds = useMemo(() => [...new Set(TARIFFS.rows.map(r => r.s))], []);
  const usX = TARIFFS.rows.find(r => r.benchmark)?.lo ?? 81.3;

  /* per-bar vertical gradient ids (unique per row + instance) */
  const gradId = (code) => `enchart-${uid}-tar-${code}`;
  const gradStops = (r) => {
    if (r.highlight) return [[C.turq, 1], [C.glow, 0.92]];
    if (r.benchmark) return [[C.gold, 1], [C.gold, 0.7]];
    return [[C.glow, 0.7], [C.turq, 0.5]];
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={352}>
        <BarChart data={rows} layout="vertical" margin={{ top: 8, right: 18, bottom: 16, left: 4 }}>
          <defs>
            <filter id={fGlow} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.6" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            {rows.map(r => {
              const [a, b] = gradStops(r);
              return (
                <linearGradient key={r.code} id={gradId(r.code)} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={a[0]} stopOpacity={a[1]} />
                  <stop offset="100%" stopColor={b[0]} stopOpacity={b[1]} />
                </linearGradient>
              );
            })}
          </defs>
          <CartesianGrid {...GRID} horizontal={false} />
          <XAxis type="number" domain={[0, 200]} ticks={[0, 50, 100, 150, 200]} {...AXIS}
            label={{ value: "US$/MWh", position: "insideBottom", offset: -10, fill: "var(--text3)", fontSize: 11 }} />
          <YAxis type="category" dataKey="label" width={120} {...AXIS}
            tick={{ fontSize: 11, fill: "var(--text2)" }} />
          <Tooltip content={<TariffTip en={en} />} cursor={CURSOR} />

          {/* US benchmark — precise gold line + label */}
          <ReferenceLine x={usX} stroke={C.gold} strokeDasharray="5 4" strokeWidth={1.4}
            label={{
              value: en ? `US avg ${fmt(usX, en)}` : `Prom. EE. UU. ${fmt(usX, en)}`,
              position: "top", fill: C.gold, fontSize: 10, fontWeight: 700,
            }} />

          {/* invisible base shifts each band to its lo value */}
          <Bar dataKey="base" stackId="band" fill="transparent" isAnimationActive={false} />
          {/* the floating band itself — rounded, per-bar gradient, CR glows */}
          <Bar dataKey="span" stackId="band" radius={[5, 5, 5, 5]} maxBarSize={18}
            isAnimationActive animationDuration={1100} animationEasing="ease-out">
            {rows.map(r => (
              <Cell key={r.code}
                fill={`url(#${gradId(r.code)})`}
                stroke={r.highlight ? C.glow : "transparent"}
                strokeWidth={r.highlight ? 1.2 : 0}
                filter={r.highlight ? `url(#${fGlow})` : undefined} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <LegendRow items={[
        { color: C.turq, label: en ? "Costa Rica (band)" : "Costa Rica (banda)", ring: true },
        { color: C.gold, label: en ? "US benchmark" : "Referencia EE. UU.", dashed: true },
        { color: C.glow, label: en ? "Region (lo–hi range)" : "Región (rango lo–hi)" },
      ]} />
      <Note>
        {en
          ? "Mixed methodology — bars mix specific tariff classes and system averages; each bar states its basis in the tooltip. X-axis fixed 0–200 US$/MWh."
          : "Metodología mixta — las barras combinan clases tarifarias específicas y promedios de sistema; cada barra declara su base en el tooltip. Eje X fijo 0–200 US$/MWh."}
      </Note>
      <Src ids={srcIds} en={en} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   3 · MixDonut — CR installed-capacity mix, renewable share at center
   Rounded segments · paddingAngle · per-segment colors · soft glow ·
   animated sweep · bold center overlay (98.6% renewable generation).
   ════════════════════════════════════════════════════════════════ */
function MixTip({ active, payload, en }) {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0];
  return (
    <div style={TT_BOX}>
      <span style={{ color: "var(--text)", fontWeight: 700 }}>{p.name}</span>{" "}
      <span style={{ fontFamily: MONO, color: "var(--text2)" }}>{fmt(p.value, en)}%</span>
    </div>
  );
}

export function MixDonut({ en }) {
  const uid = useId().replace(/:/g, "");
  const fGlow = `enchart-${uid}-mix-glow`;
  const data = useMemo(() => CR_MIX.rows.map(r => ({ ...r, label: T(r.name, en) })), [en]);
  const renew = CR_RENEW_POINTS.rows[1]; /* 2025 · 98.6% — LSQA-verified generation share */

  return (
    <div>
      <div style={{ position: "relative" }}>
        <ResponsiveContainer width="100%" height={306}>
          <PieChart>
            <defs>
              <filter id={fGlow} x="-25%" y="-25%" width="150%" height="150%">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <Pie data={data} dataKey="pct" nameKey="label" cx="50%" cy="50%"
              innerRadius="60%" outerRadius="86%" paddingAngle={2} cornerRadius={6}
              startAngle={90} endAngle={-270} stroke="var(--card)" strokeWidth={1.5}
              isAnimationActive animationDuration={1100} animationEasing="ease-out"
              filter={`url(#${fGlow})`}>
              {data.map(r => <Cell key={r.id} fill={r.color} />)}
            </Pie>
            <Tooltip content={<MixTip en={en} />} />
          </PieChart>
        </ResponsiveContainer>
        {/* bold center overlay — display % + mono caption */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none", textAlign: "center" }}>
          <div style={{ fontSize: 34, fontWeight: 800, fontFamily: MONO, color: C.turq, lineHeight: 1.1, textShadow: `0 0 22px ${C.glow}55` }}>
            {fmt(renew.pct, en)}%
          </div>
          <div style={{ fontSize: 10.5, fontFamily: MONO, color: "var(--text3)", letterSpacing: 1, maxWidth: 128, marginTop: 2, textTransform: "uppercase" }}>
            {en ? `renewable generation ${renew.year}` : `generación renovable ${renew.year}`}
          </div>
        </div>
      </div>
      <LegendRow center items={data.map(r => ({ color: r.color, label: r.label, value: `${fmt(r.pct, en)}%` }))} />
      <Note>
        {en
          ? `Ring: installed capacity by source (${T(CR_MIX.asOf, en)}). Center: % of 2025 generation that was renewable — two different denominators.`
          : `Anillo: capacidad instalada por fuente (${T(CR_MIX.asOf, en)}). Centro: % de la generación 2025 que fue renovable — dos denominadores distintos.`}
      </Note>
      <Src ids={[CR_MIX.s, CR_RENEW_POINTS.s]} en={en} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   4 · EcaiRadar — ECAI-CR component scores, 4-country overlay
   CR polygon: glowing gradient fill on top · others thin/low-opacity ·
   faint PolarGrid · shortened readable axis labels · values 0–100.
   ════════════════════════════════════════════════════════════════ */
const shortAxis = (label) => {
  const s = String(label).replace(/\s*\([^)]*\)/g, "").trim();
  return s.length > 13 ? s.split(" ")[0] : s;
};

function RadarTip({ active, payload, en }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={TT_BOX}>
      <div style={TT_HEAD}>{payload[0].payload.full}</div>
      {payload.slice().sort((a, b) => b.value - a.value).map(p => (
        <div key={p.dataKey} style={{ color: p.color, display: "flex", justifyContent: "space-between", gap: 14 }}>
          <span>{p.name}</span>
          <span style={{ fontFamily: MONO, fontWeight: 700 }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export function EcaiRadar({ en }) {
  const uid = useId().replace(/:/g, "");
  const gCR = `enchart-${uid}-radar-cr`;
  const fGlow = `enchart-${uid}-radar-glow`;

  /* one row per weight axis; each country's component scaled 0-100 */
  const data = useMemo(() => ECAI.weights.map(w => {
    const full = T(w.label, en);
    const row = { axis: shortAxis(full), full };
    ECAI.countries.forEach(c => { row[c.code] = Math.round((c.comp[w.id] || 0) * 100); });
    return row;
  }), [en]);
  /* paint highlighted country (CR) LAST so its luminous fill sits on top */
  const layers = useMemo(() =>
    [...ECAI.countries].sort((a, b) => (a.highlight ? 1 : 0) - (b.highlight ? 1 : 0)), []);

  return (
    <div>
      <ResponsiveContainer width="100%" height={324}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="72%">
          <defs>
            <radialGradient id={gCR} cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor={C.glow} stopOpacity={0.55} />
              <stop offset="100%" stopColor={C.turq} stopOpacity={0.28} />
            </radialGradient>
            <filter id={fGlow} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <PolarGrid stroke="var(--border)" strokeOpacity={0.55} />
          <PolarAngleAxis dataKey="axis" tick={{ fontSize: 10.5, fill: "var(--text2)" }} />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          {layers.map(c => (
            <Radar key={c.code} name={T(c.name, en)} dataKey={c.code}
              stroke={CTRY[c.code]}
              fill={c.highlight ? `url(#${gCR})` : CTRY[c.code]}
              fillOpacity={c.highlight ? 1 : 0.07}
              strokeWidth={c.highlight ? 2.8 : 1.4}
              strokeOpacity={c.highlight ? 1 : 0.7}
              filter={c.highlight ? `url(#${fGlow})` : undefined}
              dot={c.highlight ? { r: 3, fill: C.turq, stroke: "var(--card)", strokeWidth: 1 } : false}
              isAnimationActive animationDuration={900} />
          ))}
          <Tooltip content={<RadarTip en={en} />} />
        </RadarChart>
      </ResponsiveContainer>
      <LegendRow center items={ECAI.countries.map(c => ({
        color: CTRY[c.code], label: T(c.name, en), ring: !!c.highlight,
      }))} />
      <Note>
        {en
          ? "Component scores 0–100 (higher = better), shown UNWEIGHTED — the composite applies 30/25/20/15/10. Colibrii proposal; provisional weights, open to peer review."
          : "Componentes 0–100 (más alto = mejor), mostrados SIN ponderar — el compuesto aplica 30/25/20/15/10. Propuesta Colibrii; pesos provisionales, abiertos a revisión de pares."}
      </Note>
      <Src ids={[ECAI.s]} en={en} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   5 · SolarCurveChart — Swanson's Law, US$/W on log scale
   Gradient area under a glowing gold line · solid history + dashed
   projection · shaded 2025–2030 projection band · "~$0.11/W" callout.
   ════════════════════════════════════════════════════════════════ */
function SolarTip({ active, payload, en }) {
  if (!active || !payload || !payload.length) return null;
  const d = (payload.find(p => p.payload && p.payload.val != null) || payload[0]).payload;
  return (
    <div style={TT_BOX}>
      <div style={TT_HEAD}>
        {d.year}{d.est ? (en ? " · projection" : " · proyección") : ""}
      </div>
      <div style={{ color: C.gold, fontFamily: MONO, fontWeight: 700, fontSize: 13 }}>
        ${fmt(d.val, en)}/W
      </div>
      {d.note && <div style={TT_SUB}>{T(d.note, en)}</div>}
    </div>
  );
}

export function SolarCurveChart({ en }) {
  const uid = useId().replace(/:/g, "");
  const gArea = `enchart-${uid}-solar-area`;
  const fGlow = `enchart-${uid}-solar-glow`;

  /* split into actual + projection channels; the last actual point (2024) lives in
     both so solid and dashed join without a gap. log Y → no zero baseline possible,
     so honesty here = labeled log axis + explicit "projection" band/marking. */
  const data = useMemo(() => {
    const actuals = SOLAR_CURVE.rows.filter(r => !r.est);
    const lastActualYear = actuals.length ? actuals[actuals.length - 1].year : null;
    return SOLAR_CURVE.rows.map(r => ({
      year: r.year,
      val: r.usd,
      usd: r.est ? null : r.usd,
      usdEst: r.est || r.year === lastActualYear ? r.usd : null,
      est: !!r.est,
      note: r.note || null,
    }));
  }, []);
  const projStart = useMemo(() => {
    const a = SOLAR_CURVE.rows.filter(r => !r.est);
    return a.length ? a[a.length - 1].year : 2024;
  }, []);
  const projEnd = useMemo(() => SOLAR_CURVE.rows[SOLAR_CURVE.rows.length - 1]?.year ?? 2030, []);
  const callout = useMemo(() => SOLAR_CURVE.rows.find(r => r.year === 2024), []);

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 16, right: 18, bottom: 0, left: 8 }}>
          <defs>
            <linearGradient id={gArea} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={C.gold} stopOpacity={0.42} />
              <stop offset="60%" stopColor={C.gold} stopOpacity={0.12} />
              <stop offset="100%" stopColor={C.gold} stopOpacity={0} />
            </linearGradient>
            <filter id={fGlow} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <CartesianGrid {...GRID} />
          <XAxis dataKey="year" type="number" domain={[1975, 2032]}
            ticks={[1977, 2014, 2024, 2030]} tickFormatter={v => String(v)} {...AXIS}
            allowDuplicatedCategory={false} padding={{ left: 4, right: 4 }} />
          <YAxis scale="log" domain={[0.05, 100]} ticks={[0.1, 1, 10, 76]}
            tickFormatter={v => `$${fmt(v, en)}`} {...AXIS} width={50}
            label={{ value: "US$/W (log)", angle: -90, position: "insideLeft", fill: "var(--text3)", fontSize: 11, dy: 30 }} />
          <Tooltip content={<SolarTip en={en} />} cursor={{ stroke: C.gold, strokeOpacity: 0.3, strokeDasharray: "3 3" }} />

          {/* shaded projection band 2025–2030 */}
          <ReferenceArea x1={projStart} x2={projEnd} fill={C.gold} fillOpacity={0.07}
            stroke={C.gold} strokeOpacity={0.25} strokeDasharray="4 4"
            label={{ value: en ? "projection" : "proyección", position: "insideTop", fill: C.gold, fontSize: 10, fontWeight: 700 }} />

          {/* "~$0.11/W" callout at the 2024 inflection */}
          {callout && (
            <ReferenceLine x={callout.year} stroke="transparent"
              label={{ value: `~$${fmt(callout.usd, en)}/W`, position: "top", fill: C.gold, fontSize: 11, fontFamily: MONO, fontWeight: 700, dy: -2 }} />
          )}

          {/* gradient area under the historical line (gives the descent body) */}
          <Area type="monotone" dataKey="usd" stroke="none" fill={`url(#${gArea})`} fillOpacity={1}
            connectNulls={false} isAnimationActive animationDuration={1200} />
          {/* glowing gold historical line */}
          <Area type="monotone" dataKey="usd" stroke={C.gold} strokeWidth={3} fill="transparent"
            connectNulls={false} filter={`url(#${fGlow})`}
            isAnimationActive animationDuration={1200} animationEasing="ease-out"
            dot={{ r: 4.5, fill: C.gold, stroke: "var(--card)", strokeWidth: 2 }}
            activeDot={{ r: 6, fill: C.gold, stroke: "var(--card)", strokeWidth: 2 }} />
          {/* dashed projection line — clearly distinct from measured history */}
          <Area type="monotone" dataKey="usdEst" stroke={C.gold} strokeWidth={2.2}
            strokeDasharray="7 5" fill="transparent" connectNulls
            isAnimationActive animationDuration={1200} animationBegin={300}
            dot={{ r: 4, fill: "var(--card)", stroke: C.gold, strokeWidth: 2 }}
            activeDot={{ r: 6, fill: C.gold, stroke: "var(--card)", strokeWidth: 2 }} />
        </AreaChart>
      </ResponsiveContainer>
      <LegendRow items={[
        { color: C.gold, label: en ? "Historical (measured)" : "Histórico (medido)", ring: true },
        { color: C.gold, label: en ? "Projection (constant learning rate)" : "Proyección (tasa de aprendizaje constante)", dashed: true },
      ]} />
      <Note>
        {en
          ? "Log scale (no zero baseline on a log axis); the 2025–2030 band is a projection, marked and dashed, not measured data."
          : "Escala logarítmica (un eje log no tiene línea base en cero); la banda 2025–2030 es una proyección, marcada y discontinua, no datos medidos."}
      </Note>
      <Src ids={[SOLAR_CURVE.s]} en={en} />
    </div>
  );
}
