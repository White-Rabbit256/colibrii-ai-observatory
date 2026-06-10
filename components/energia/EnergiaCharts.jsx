"use client";
/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Energía Charts
   Electricidad, Competitividad Energética & IA · Expediente 23.414
   Built by the Section Factory (Run #1) — viz-engineer stage.
   Pure chart bodies (no Card/SH here — the parent section wraps them).
   Data: ../energiaData (frozen shapes). Provenance: SRC line under every chart.
   Chart honesty: bars start at 0 · axis units labeled · no red/green-only
   encodings · estimates visually distinct and marked in tooltips.
   ═══════════════════════════════════════════════════════════════ */
import React, { useMemo } from "react";
import {
  ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, PieChart, Pie, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line,
} from "recharts";
import {
  DC_DEMAND, TARIFFS, CR_MIX, CR_RENEW_POINTS, ECAI, SOLAR_CURVE,
  EN_ACCENT, SRC,
} from "../energiaData";

/* ── i18n + format helpers ── */
const T = (v, en) => (v && typeof v === "object" && !Array.isArray(v) && ("es" in v) ? (en ? v.en : v.es) : v);
const fmt = (v, en) => (en ? String(v) : String(v).replace(".", ","));
const MONO = "'IBM Plex Mono',monospace";

/* ── shared chart cosmetics (dark-panel friendly, CSS-var aware) ── */
const AXIS = {
  tick: { fontSize: 11, fill: "var(--text3)" },
  axisLine: { stroke: "var(--text3)" },
  tickLine: { stroke: "var(--text3)" },
};
const GRID = { strokeDasharray: "3 3", stroke: "var(--border)" };
const TT_BOX = {
  background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10,
  fontSize: 12, padding: "8px 12px", lineHeight: 1.55, maxWidth: 260,
};
const CURSOR = { fill: "rgba(34,211,238,0.06)" };

/* ── provenance line (under every chart) ── */
function Src({ ids, en }) {
  const names = ids.map(id => SRC[id]?.name).filter(Boolean).join(" · ");
  return (
    <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 8 }}>
      {en ? "Source: " : "Fuente: "}{names}
    </div>
  );
}

/* ── tiny legend primitives ── */
function Dot({ color }) {
  return <span style={{ width: 9, height: 9, borderRadius: "50%", background: color, display: "inline-block", flexShrink: 0 }} />;
}

function LegendRow({ items, center }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px", marginTop: 8, fontSize: 11.5, color: "var(--text2)", alignItems: "center", justifyContent: center ? "center" : "flex-start" }}>
      {items.map((it, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <Dot color={it.color} />
          <span>{it.label}</span>
          {it.value != null && <span style={{ fontFamily: MONO, color: "var(--text3)" }}>{it.value}</span>}
        </span>
      ))}
    </div>
  );
}

/* ── 1 · DCDemandChart — IEA global data-centre electricity demand ── */
function DCTip({ active, payload, en }) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <div style={TT_BOX}>
      <div style={{ color: "var(--text)", fontWeight: 700 }}>
        {d.year}{d.est ? (en ? " (proj.)" : " (est.)") : ""}
      </div>
      <div style={{ color: EN_ACCENT.turquoise, fontFamily: MONO, fontWeight: 700 }}>
        {d.twh.toLocaleString(en ? "en-US" : "es-CR")} TWh
      </div>
      {d.pct && <div style={{ color: "var(--text3)" }}>{T(d.pct, en)}</div>}
    </div>
  );
}

export function DCDemandChart({ en }) {
  const data = useMemo(() => DC_DEMAND.series.map(d => ({ ...d, est: !!d.est })), []);
  return (
    <div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 4 }}>
          <CartesianGrid {...GRID} vertical={false} />
          <XAxis dataKey="year" {...AXIS} />
          <YAxis domain={[0, "auto"]} {...AXIS}
            label={{ value: "TWh", angle: -90, position: "insideLeft", fill: "var(--text3)", fontSize: 11 }} />
          <Tooltip content={<DCTip en={en} />} cursor={CURSOR} />
          <Bar dataKey="twh" radius={[4, 4, 0, 0]} maxBarSize={64}>
            {data.map(d => (
              <Cell key={d.year} fill={d.est ? "rgba(0,181,168,0.45)" : EN_ACCENT.turquoise} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <LegendRow items={[
        { color: EN_ACCENT.turquoise, label: en ? "Actual (IEA)" : "Real (AIE)" },
        { color: "rgba(0,181,168,0.45)", label: en ? "IEA projection (Base Case)" : "Proyección AIE (caso base)" },
      ]} />
      <Src ids={[DC_DEMAND.s]} en={en} />
    </div>
  );
}

/* ── 2 · TariffChart — regional industrial tariff bands (floating bars) ── */
function TariffTip({ active, payload, en }) {
  if (!active || !payload || !payload.length) return null;
  const r = payload[0].payload;
  const range = r.lo === r.hi ? fmt(r.lo, en) : `${fmt(r.lo, en)}–${fmt(r.hi, en)}`;
  const color = r.highlight ? EN_ACCENT.turquoise : r.benchmark ? EN_ACCENT.gold : "var(--text2)";
  return (
    <div style={TT_BOX}>
      <div style={{ color: "var(--text)", fontWeight: 700 }}>{T(r.country, en)}</div>
      <div style={{ color, fontFamily: MONO, fontWeight: 700 }}>{range} US$/MWh</div>
      <div style={{ color: "var(--text3)" }}>{T(r.basis, en)}</div>
      <div style={{ color: "var(--text3)", marginTop: 2, fontStyle: "italic" }}>{SRC[r.s]?.name}</div>
    </div>
  );
}

export function TariffChart({ en }) {
  /* rows arrive pre-sorted ascending by lo; base (transparent) + span = floating band */
  const rows = useMemo(() => TARIFFS.rows.map(r => ({
    ...r, label: T(r.country, en), base: r.lo, span: Math.max(r.hi - r.lo, 3),
  })), [en]);
  const srcIds = useMemo(() => [...new Set(TARIFFS.rows.map(r => r.s))], []);
  return (
    <div>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={rows} layout="vertical" margin={{ top: 8, right: 16, bottom: 14, left: 4 }}>
          <CartesianGrid {...GRID} horizontal={false} />
          <XAxis type="number" domain={[0, 200]} ticks={[0, 50, 100, 150, 200]} {...AXIS}
            label={{ value: "US$/MWh", position: "insideBottom", offset: -10, fill: "var(--text3)", fontSize: 11 }} />
          <YAxis type="category" dataKey="label" width={118} {...AXIS} />
          <Tooltip content={<TariffTip en={en} />} cursor={CURSOR} />
          <ReferenceLine x={81.3} stroke={EN_ACCENT.gold} strokeDasharray="4 4" strokeWidth={1.2}
            label={{ value: en ? "US avg" : "Prom. EE. UU.", position: "insideTop", fill: EN_ACCENT.gold, fontSize: 10 }} />
          <Bar dataKey="base" stackId="band" fill="transparent" isAnimationActive={false} />
          <Bar dataKey="span" stackId="band" radius={[3, 3, 3, 3]} maxBarSize={16}>
            {rows.map(r => (
              <Cell key={r.code}
                fill={r.highlight ? EN_ACCENT.turquoise : r.benchmark ? EN_ACCENT.gold : "rgba(34,211,238,0.35)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <LegendRow items={[
        { color: EN_ACCENT.turquoise, label: en ? "Costa Rica (band)" : "Costa Rica (banda)" },
        { color: EN_ACCENT.gold, label: en ? "US benchmark" : "Referencia EE. UU." },
        { color: "rgba(34,211,238,0.35)", label: en ? "Region (lo–hi range)" : "Región (rango lo–hi)" },
      ]} />
      <Src ids={srcIds} en={en} />
    </div>
  );
}

/* ── 3 · MixDonut — CR installed-capacity mix, renewable share at center ── */
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
  const data = useMemo(() => CR_MIX.rows.map(r => ({ ...r, label: T(r.name, en) })), [en]);
  const renew = CR_RENEW_POINTS.rows[1]; /* 2025 · 98.6% — LSQA-verified generation share */
  return (
    <div>
      <div style={{ position: "relative" }}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="pct" nameKey="label" cx="50%" cy="50%"
              innerRadius="62%" outerRadius="85%" paddingAngle={1.5} stroke="none"
              isAnimationActive={true}>
              {data.map(r => <Cell key={r.id} fill={r.color} />)}
            </Pie>
            <Tooltip content={<MixTip en={en} />} />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none", textAlign: "center" }}>
          <div style={{ fontSize: 30, fontWeight: 800, fontFamily: MONO, color: EN_ACCENT.turquoise, lineHeight: 1.15 }}>
            {fmt(renew.pct, en)}%
          </div>
          <div style={{ fontSize: 11, fontFamily: MONO, color: "var(--text3)", letterSpacing: 1 }}>
            {en ? `renewable ${renew.year}` : `renovable ${renew.year}`}
          </div>
        </div>
      </div>
      <LegendRow center items={data.map(r => ({ color: r.color, label: r.label, value: `${fmt(r.pct, en)}%` }))} />
      <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 8 }}>{T(CR_MIX.asOf, en)}</div>
      <Src ids={[CR_MIX.s, CR_RENEW_POINTS.s]} en={en} />
    </div>
  );
}

/* ── 4 · EcaiRadar — ECAI-CR component scores, 4-country overlay ── */
const RADAR_COLORS = { CR: EN_ACCENT.turquoise, UY: EN_ACCENT.violet, PA: EN_ACCENT.gold, MX: "#ec4899" };
const shortAxis = (label) => {
  const s = String(label).replace(/\s*\([^)]*\)/g, "").trim();
  return s.length > 13 ? s.split(" ")[0] : s;
};

function RadarTip({ active, payload, en }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={TT_BOX}>
      <div style={{ color: "var(--text)", fontWeight: 700, marginBottom: 2 }}>{payload[0].payload.full}</div>
      {payload.map(p => (
        <div key={p.dataKey} style={{ color: p.color }}>
          {p.name}: <span style={{ fontFamily: MONO, fontWeight: 700 }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export function EcaiRadar({ en }) {
  /* one row per weight axis; each country's component scaled 0-100 */
  const data = useMemo(() => ECAI.weights.map(w => {
    const full = T(w.label, en);
    const row = { axis: shortAxis(full), full };
    ECAI.countries.forEach(c => { row[c.code] = Math.round((c.comp[w.id] || 0) * 100); });
    return row;
  }), [en]);
  /* paint the highlighted country (CR) last so its fill sits on top */
  const layers = useMemo(() =>
    [...ECAI.countries].sort((a, b) => (a.highlight ? 1 : 0) - (b.highlight ? 1 : 0)), []);
  return (
    <div>
      <ResponsiveContainer width="100%" height={320}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="72%">
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis dataKey="axis" tick={{ fontSize: 10, fill: "var(--text3)" }} />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          {layers.map(c => (
            <Radar key={c.code} name={T(c.name, en)} dataKey={c.code}
              stroke={RADAR_COLORS[c.code]} fill={RADAR_COLORS[c.code]}
              fillOpacity={c.highlight ? 0.25 : 0.06} strokeWidth={c.highlight ? 2.5 : 1.5} />
          ))}
          <Tooltip content={<RadarTip en={en} />} />
        </RadarChart>
      </ResponsiveContainer>
      <LegendRow center items={ECAI.countries.map(c => ({ color: RADAR_COLORS[c.code], label: T(c.name, en) }))} />
      <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 6 }}>
        {en
          ? "Component scores 0–100 (higher = better). Colibrii composite; weights open to peer review."
          : "Componentes 0–100 (más alto = mejor). Compuesto Colibrii; pesos abiertos a revisión de pares."}
      </div>
      <Src ids={[ECAI.s]} en={en} />
    </div>
  );
}

/* ── 5 · SolarCurveChart — Swanson's Law, US$/W on log scale ── */
function SolarTip({ active, payload, en }) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <div style={TT_BOX}>
      <div style={{ color: "var(--text)", fontWeight: 700 }}>
        {d.year}{d.est ? (en ? " (proj.)" : " (est.)") : ""}
      </div>
      <div style={{ color: EN_ACCENT.gold, fontFamily: MONO, fontWeight: 700 }}>
        ${fmt(d.val, en)}/W
      </div>
      {d.note && <div style={{ color: "var(--text3)" }}>{T(d.note, en)}</div>}
    </div>
  );
}

export function SolarCurveChart({ en }) {
  /* split into actual + estimated series; last actual point (2024) lives in
     both so the solid and dashed lines join without a gap */
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
  return (
    <div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 12, right: 16, bottom: 0, left: 8 }}>
          <CartesianGrid {...GRID} />
          <XAxis dataKey="year" type="number" domain={[1975, 2032]}
            ticks={[1977, 2014, 2024, 2030]} tickFormatter={v => String(v)} {...AXIS} />
          <YAxis scale="log" domain={[0.05, 100]} ticks={[0.1, 1, 10, 76]}
            tickFormatter={v => `$${fmt(v, en)}`} {...AXIS}
            label={{ value: "US$/W (log)", angle: -90, position: "insideLeft", fill: "var(--text3)", fontSize: 11 }} />
          <Tooltip content={<SolarTip en={en} />} />
          <Line type="monotone" dataKey="usd" stroke={EN_ACCENT.gold} strokeWidth={2.5}
            dot={{ r: 4, fill: EN_ACCENT.gold, strokeWidth: 0 }} activeDot={{ r: 5 }} />
          <Line type="monotone" dataKey="usdEst" stroke={EN_ACCENT.gold} strokeWidth={2}
            strokeDasharray="6 4" dot={{ r: 3.5, fill: "var(--card)", stroke: EN_ACCENT.gold, strokeWidth: 1.5 }}
            activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
      <LegendRow items={[
        { color: EN_ACCENT.gold, label: en ? "Historical" : "Histórico" },
        { color: "rgba(242,177,53,0.55)", label: en ? "Projection (constant learning rate)" : "Proyección (tasa de aprendizaje constante)" },
      ]} />
      <Src ids={[SOLAR_CURVE.s]} en={en} />
    </div>
  );
}
