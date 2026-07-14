"use client";
/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Energía Charts V2 (visual-upgrade round)
   Three additive graphics: VoteWaffle57 (Act 5), NuclearScaleBar (Act 2),
   ReformStrip (Act 6). Pure chart bodies — the parent ShareCard wraps them.
   Data: ../energiaData ONLY (incl. the V2 append-only restatements).
   Color law: marks wear theme-aware vars — var(--enTurq) pro · var(--enViolet)
   con · var(--enGold) lean/threshold · var(--text3)/var(--border2) neutral.
   Text always wears text tokens, never a series color.
   Palette validated (dataviz validator): CVD ΔE 33.2 dark / 66.0 light PASS;
   neutral-gray advisories covered by mandatory secondary encoding (unfilled or
   dashed rings, 2px surface gaps, direct labels, legend chips with counts).
   Every figure: role="figure" + sr-only figcaption + LINKED source line.
   Motion: once-on-armed only (useInView −120px), full prefers-reduced-motion
   overrides, no loops. Mobile-first: no horizontal overflow at 360px.
   ═══════════════════════════════════════════════════════════════ */
import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList,
} from "recharts";
import {
  VOTE_MATH, VOTE_WAFFLE, NUCLEAR_DEALS, NUCLEAR_VS_CR,
  COMPARATIVE, REFORM_YEARS, TIMELINE, SRC,
} from "../energiaData";

/* ── shared kit · i18n + format ── */
const T = (v, en) => (v && typeof v === "object" && !Array.isArray(v) && ("es" in v) ? (en ? v.en : v.es) : v);
const MONO = "'IBM Plex Mono',monospace";
/* Locale numerals per the section contract. ICU groups es-CR thousands with a
   narrow space ("3 740"); the page's editorial convention is dot grouping
   ("3.499 MW" — HERO, CR_MIX), so spaces are normalized to dots. Comma
   decimals are untouched (none of these charts render decimals). */
const num = (v, en) => {
  const s = Number(v).toLocaleString(en ? "en-US" : "es-CR");
  return en ? s : s.replace(/[\u00A0\u202F ]/g, ".");
};
/* Spanish month abbreviations appear verbatim in data date strings ("27 may 2026");
   EN surfaces capitalize the month. */
const dloc = (s, en) => (en ? String(s).replace(/\bmay\b/g, "May") : String(s));

/* ── shared chart cosmetics (EnergiaCharts.jsx L47-64, verbatim) ── */
const AXIS = {
  tick: { fontSize: 11, fill: "var(--text2)" },
  axisLine: { stroke: "var(--border)" },
  tickLine: { stroke: "var(--border)" },
};
const GRID = { strokeDasharray: "3 3", stroke: "var(--border)", strokeOpacity: 0.7 };
const CURSOR = { fill: "rgba(34,211,238,0.06)" };
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

/* ── prefers-reduced-motion (SSR-safe — Hero3D.jsx pattern) ── */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(!!mq.matches);
    apply();
    mq.addEventListener ? mq.addEventListener("change", apply) : mq.addListener(apply);
    return () => { mq.removeEventListener ? mq.removeEventListener("change", apply) : mq.removeListener(apply); };
  }, []);
  return reduced;
}

/* ── arm-on-scroll: fires once when the block is 120px inside the viewport ── */
function useArmed(margin = "-120px") {
  const ref = useRef(null);
  const armed = useInView(ref, { once: true, margin });
  return [ref, armed];
}

/* ── compact layout flag (mobile-first tuning) ── */
function useCompact(bp = 480) {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(`(max-width: ${bp - 1}px)`);
    const apply = () => setCompact(!!mq.matches);
    apply();
    mq.addEventListener ? mq.addEventListener("change", apply) : mq.addListener(apply);
    return () => { mq.removeEventListener ? mq.removeEventListener("change", apply) : mq.removeListener(apply); };
  }, [bp]);
  return compact;
}

/* ── keyframes + sr-only (single shared block; duplicates across mounts are inert) ── */
const ECV2_CSS = `
.ecv2-sr { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
@keyframes ecv2-pop { from { opacity: 0; transform: scale(.4); } to { opacity: 1; transform: scale(1); } }
@keyframes ecv2-draw { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
@keyframes ecv2-pulse { 0%, 100% { filter: drop-shadow(0 0 0 transparent); } 45% { filter: drop-shadow(0 0 5px var(--enGold)); } }
@keyframes ecv2-fadein { from { opacity: 0; } to { opacity: 1; } }
@keyframes ecv2-rowfade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
.ecv2-cell { transform-origin: center; transform-box: fill-box; animation: ecv2-pop 220ms cubic-bezier(0.34,1.3,0.64,1) both; animation-delay: calc(var(--i) * 8ms); }
.ecv2-thresh { animation: ecv2-draw 300ms ease-out both; animation-delay: 700ms; }
.ecv2-bracket { animation: ecv2-pulse 900ms ease-in-out 1; animation-delay: 1000ms; }
.ecv2-xfade { animation: ecv2-fadein 160ms ease-out both; }
.ecv2-row { animation: ecv2-rowfade 640ms ease-out both; animation-delay: calc(var(--r) * 60ms); }
@media (prefers-reduced-motion: reduce) {
  .ecv2-cell, .ecv2-thresh, .ecv2-bracket, .ecv2-xfade, .ecv2-row { animation: none !important; }
}
`;
function KitStyle() { return <style>{ECV2_CSS}</style>; }

/* ── LINKED provenance line (spec: never the dead-text Src clone) ── */
function SrcLine({ en, ids, extra }) {
  const list = (ids || []).filter((id) => SRC[id]);
  return (
    <div style={{ fontFamily: MONO, fontSize: 10.5, color: "var(--text3)", marginTop: 8, lineHeight: 1.7 }}>
      {en ? "Source: " : "Fuente: "}
      {list.map((id, i) => (
        <React.Fragment key={id}>
          {i > 0 && " · "}
          <a href={SRC[id].url} target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--text3)", textDecoration: "underline", textUnderlineOffset: 2 }}>
            {SRC[id].name}
          </a>
        </React.Fragment>
      ))}
      {extra ? <span> · {extra}</span> : null}
    </div>
  );
}

/* ── figure wrapper: sr title + sr figcaption + linked source line ── */
function Fig({ en, title, summary, srcIds, extraSrc, children }) {
  const uid = useId();
  const tId = `ecv2t-${uid}`;
  const dId = `ecv2d-${uid}`;
  return (
    <figure role="figure" aria-labelledby={tId} aria-describedby={dId} style={{ margin: 0, maxWidth: "100%" }}>
      <span id={tId} className="ecv2-sr">{title}</span>
      {children}
      <figcaption id={dId} className="ecv2-sr">{summary}</figcaption>
      <SrcLine en={en} ids={srcIds} extra={extraSrc} />
    </figure>
  );
}

/* ── tiny legend row (kit style — text tokens, 9px swatches) ── */
function LegendRow({ items }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px", marginTop: 8, fontSize: 11.5, color: "var(--text2)", alignItems: "center" }}>
      {items.map((it, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <span aria-hidden="true" style={{
            width: 9, height: 9, borderRadius: "50%", flexShrink: 0, display: "inline-block", boxSizing: "border-box",
            background: it.ring ? "transparent" : it.color,
            border: it.ring ? `${it.ring === "dashed" ? "1.5px dashed" : "1.5px solid"} ${it.color}` : "none",
          }} />
          <span>{it.label}</span>
        </span>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   1 · VoteWaffle57 — the 38-vote wall, seat by seat (Act 5)
   Hand SVG, 3×19 grid = 57. NOT a hemicycle: real curul positions would be
   fabricated geometry. Two views (bloc stances / first-debate roll call),
   legend chips double as highlight buttons, gold 38-threshold rule.
   All counts computed from VOTE_MATH / VOTE_WAFFLE — never hardcoded.
   ════════════════════════════════════════════════════════════════ */
const WF_COLS = 19, WF_PITCH = 21, WF_SEAT = 18;
const wfX = (i) => (i % WF_COLS) * WF_PITCH;
const wfY = (i) => Math.floor(i / WF_COLS) * WF_PITCH;
const wfRightEdge = (i) => wfX(i) + WF_SEAT;
const seq = (from, n) => Array.from({ length: n }, (_, k) => from + k);

/* seat rendering by group kind — fills for votes, unfilled rings for non-votes
   (shape carries the "not a vote" semantics, never color alone) */
const seatProps = (kind) =>
  kind === "pro" ? { fill: "var(--enTurq)" }
  : kind === "con" ? { fill: "var(--enViolet)" }
  : kind === "lic" ? { fill: "none", stroke: "var(--text3)", strokeWidth: 1.5, strokeDasharray: "3 2" }
  : kind === "lean" ? { fill: "none", stroke: "var(--enGold)", strokeWidth: 2 }
  : { fill: "none", stroke: "var(--text3)", strokeWidth: 1.5 }; // abs

function StanceDot({ kind }) {
  const base = { width: 9, height: 9, borderRadius: "50%", display: "inline-block", flexShrink: 0, boxSizing: "border-box" };
  if (kind === "pro") return <span aria-hidden="true" style={{ ...base, background: "var(--enTurq)" }} />;
  if (kind === "con") return <span aria-hidden="true" style={{ ...base, background: "var(--enViolet)" }} />;
  if (kind === "lean") return <span aria-hidden="true" style={{ ...base, border: "2px solid var(--enGold)" }} />;
  if (kind === "lic") return <span aria-hidden="true" style={{ ...base, border: "1.5px dashed var(--text3)" }} />;
  return <span aria-hidden="true" style={{ ...base, border: "1.5px solid var(--text3)" }} />;
}

function buildWaffle(en) {
  const byParty = Object.fromEntries(VOTE_MATH.blocs.map((b) => [b.party, b]));
  const ppso = byParty.PPSO, pln = byParty.PLN, fa = byParty.FA, pusc = byParty.PUSC, cac = byParty.CAC;
  const eff = ppso.effective;
  const conBlocs = [pln, fa, cac];
  const conTotal = conBlocs.reduce((a, b) => a + b.seats, 0);
  const fd = VOTE_MATH.firstDebate;
  const V = {
    pro: { es: "A favor", en: "In favour" },
    con: { es: "En contra", en: "Against" },
    lean: { es: "Inclinación a favor", en: "Leaning in favour" },
    lic: { es: "Licencia", en: "On leave" },
    abs: { es: "Ausencias", en: "Absences" },
    seat: { es: "escaño", en: "seat" },
    seats: { es: "escaños", en: "seats" },
    votes: { es: "votos", en: "votes" },
  };
  const w = (k) => (en ? V[k].en : V[k].es);
  const ward = en ? "Kristel Ward — maternity leave" : "Kristel Ward — licencia de maternidad";

  /* View A — stances by bloc: 30 pro · 1 licencia · 1 lean-pro · 25 con */
  let cur = eff + 2;
  const conParts = conBlocs.map((b) => {
    const p = { k: b.party, title: `${b.party} · ${b.seats} · ${w("con")}${b.note ? ` — ${T(b.note, en)}` : ""}`, seats: seq(cur, b.seats) };
    cur += b.seats;
    return p;
  });
  const viewA = {
    id: "A",
    counts: conBlocs.map((b) => `${b.party} ${b.seats}`).join(" · "),
    groups: [
      { id: "pro", kind: "pro", chip: `${w("pro")} ${eff}`,
        parts: [{ k: "ppso", title: `PPSO · ${eff} · ${w("pro")} — ${T(ppso.note, en)}`, seats: seq(0, eff) }],
        d1: `PPSO — ${T(ppso.name, en)} · ${eff} ${w("seats")} · ${w("pro")}`, d2: T(ppso.note, en) },
      { id: "lic", kind: "lic", chip: `${w("lic")} 1`,
        parts: [{ k: "ward", title: ward, seats: [eff] }],
        d1: `PPSO · 1 ${w("seat")} · ${w("lic")}`, d2: ward },
      { id: "lean", kind: "lean", chip: `${w("lean")} 1`,
        parts: [{ k: "pusc", title: `PUSC · 1 · ${w("lean")} — ${T(pusc.note, en)}`, seats: [eff + 1] }],
        d1: `PUSC — ${T(pusc.name, en)} · 1 ${w("seat")} · ${w("lean")}`, d2: T(pusc.note, en) },
      { id: "con", kind: "con", chip: `${w("con")} ${conTotal}`, parts: conParts,
        d1: `${w("con")} · ${conTotal} ${w("seats")} — ${conBlocs.map((b) => `${b.party} ${b.seats}`).join(" · ")}`,
        d2: `PLN: ${T(pln.note, en)} · FA: ${T(fa.note, en)} · CAC: ${T(cac.note, en)}` },
    ],
  };

  /* View B — first-debate roll call: 27 favor · 24 against · 6 absent (one undivided group) */
  let cb = fd.favor;
  const againstParts = VOTE_WAFFLE.againstFirstDebate.map((g) => {
    const p = { k: g.party, title: `${g.party} · ${g.n} · ${w("con")}`, seats: seq(cb, g.n) };
    cb += g.n;
    return p;
  });
  const voteRow = TIMELINE.rows.find((r) => r.type === "vote");
  const subline = `${dloc(voteRow ? voteRow.date : fd.date, en)} · ${fd.favor}-${fd.against}-${fd.absent}`;
  const viewB = {
    id: "B",
    counts: VOTE_WAFFLE.againstFirstDebate.map((g) => `${g.party} ${g.n}`).join(" · "),
    subline,
    groups: [
      { id: "favor", kind: "pro", chip: `${w("pro")} ${fd.favor}`,
        parts: [{ k: "favor", title: `${w("pro")} · ${fd.favor} · ${dloc(fd.date, en)}`, seats: seq(0, fd.favor) }],
        d1: `${w("pro")} · ${fd.favor} ${w("votes")} · ${en ? "First debate" : "Primer debate"} — ${dloc(fd.date, en)}`,
        d2: en ? `Pueblo Soberano's ${fd.favor} present votes (first-debate record).` : `Los ${fd.favor} votos presentes de Pueblo Soberano (registro del primer debate).` },
      { id: "against", kind: "con", chip: `${w("con")} ${fd.against}`, parts: againstParts,
        d1: `${w("con")} · ${fd.against} ${w("votes")} — ${VOTE_WAFFLE.againstFirstDebate.map((g) => `${g.party} ${g.n}`).join(" · ")}`,
        d2: `${en ? "Roll call, first debate" : "Votación nominal, primer debate"} · ${subline}` },
      { id: "abs", kind: "abs", chip: `${w("abs")} ${fd.absent}`,
        parts: [{ k: "abs", title: `${w("abs")} · ${fd.absent}`, seats: seq(fd.favor + fd.against, fd.absent) }],
        d1: `${w("abs")} · ${fd.absent}`,
        d2: en
          ? "Includes Ward (maternity leave) and Gordienko (absent); the remaining absences are not attributed to parties here."
          : "Incluye a Ward (licencia de maternidad) y a Gordienko (ausente); las demás ausencias no se atribuyen aquí a partidos." },
    ],
  };
  return { viewA, viewB, eff, gap: VOTE_MATH.needed - eff };
}

export function VoteWaffle57({ en }) {
  const reduced = useReducedMotion();
  const [ref, armed] = useArmed("-120px");
  const [view, setView] = useState("A");
  const [hl, setHl] = useState(null);
  const [popped, setPopped] = useState(false);
  const model = useMemo(() => buildWaffle(en), [en]);
  const cvw = view === "A" ? model.viewA : model.viewB;
  const sel = hl ? cvw.groups.find((g) => g.id === hl) : null;

  /* entrance sequence ends ≤1.9s (pops ≤668ms → threshold draw → one bracket pulse) */
  useEffect(() => {
    if (!armed || reduced || popped) return;
    const t = setTimeout(() => setPopped(true), 2000);
    return () => clearTimeout(t);
  }, [armed, reduced, popped]);

  const popAnim = armed && !reduced && !popped;
  const hidden = !reduced && !armed;
  const bx1 = wfRightEdge(model.eff - 1);            // right edge of seat 30
  const bx2 = wfRightEdge(VOTE_MATH.needed - 1);     // right edge of seat 38
  const thLabel = `${VOTE_MATH.needed} = ${en ? "qualified majority" : "mayoría calificada"} (2/3 ${en ? "of" : "de"} ${VOTE_MATH.totalSeats}) · Art. 189.3`;
  const gapLabel = en ? `${model.gap} short of ${VOTE_MATH.needed}` : `faltan ${model.gap} para ${VOTE_MATH.needed}`;

  const switchView = (v) => { if (v !== view) { setView(v); setHl(null); setPopped(true); } };
  const tbtn = (active) => ({
    minHeight: 44, padding: "8px 16px", borderRadius: 999, cursor: "pointer",
    fontFamily: MONO, fontSize: 11, letterSpacing: 0.4,
    border: "1px solid color-mix(in srgb, var(--act-accent) 33%, transparent)",
    background: active ? "var(--act-tint)" : "transparent",
    color: active ? "var(--act-accent)" : "var(--text3)",
  });
  const chip = (pressed) => ({
    minHeight: 44, padding: "8px 14px", borderRadius: 999, cursor: "pointer",
    display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12,
    color: pressed ? "var(--text)" : "var(--text2)",
    border: `1px solid ${pressed ? "var(--act-accent)" : "color-mix(in srgb, var(--act-accent) 33%, transparent)"}`,
    background: pressed ? "var(--act-tint)" : "transparent",
  });

  return (
    <Fig
      en={en}
      title={en
        ? `The ${VOTE_MATH.needed}-vote wall — grid of ${VOTE_MATH.totalSeats} seats`
        : `El muro de los ${VOTE_MATH.needed} votos — cuadrícula de ${VOTE_MATH.totalSeats} escaños`}
      summary={en
        ? "Grid of 57 seats: 30 effective in favour (PPSO), 1 on leave, 1 leaning in favour (PUSC), 25 against (PLN 17, FA 7, CAC 1); threshold at 38. First debate: 27 in favour, 24 against, 6 absences."
        : "Cuadrícula de 57 escaños: 30 a favor efectivos (PPSO), 1 licencia, 1 inclinación a favor (PUSC), 25 en contra (PLN 17, FA 7, CAC 1); umbral en 38. Primer debate: 27 a favor, 24 en contra, 6 ausencias."}
      srcIds={["asamblea", "presidencia"]}
    >
      <KitStyle />
      <div ref={ref} style={{ maxWidth: "100%" }}>
        {/* view toggle — interactive, kept OUTSIDE the aria-hidden plot */}
        <div role="group" aria-label={en ? "Grid view" : "Vista de la cuadrícula"} style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          <button type="button" aria-pressed={view === "A"} onClick={() => switchView("A")} style={tbtn(view === "A")}>
            {en ? "Stance by bloc" : "Postura por bancada"}
          </button>
          <button type="button" aria-pressed={view === "B"} onClick={() => switchView("B")} style={tbtn(view === "B")}>
            {en ? "First debate · 26 May" : "Primer debate · 26 may"}
          </button>
        </div>

        <div aria-hidden="true">
          <svg viewBox="0 0 396 104" width="100%" style={{ display: "block", height: "auto", maxWidth: "100%" }} focusable="false">
            <g style={{ opacity: hidden ? 0 : 1 }}>
              {/* 38-threshold rule — directly under row 2 = under seat 38; constant across views */}
              <g className={popAnim ? "ecv2-thresh" : undefined}>
                <line x1={0} x2={396} y1={41.5} y2={41.5} stroke="var(--enGold)" strokeWidth={2} strokeDasharray="6 4" />
              </g>
              <text x={396} y={92} textAnchor="end" fontFamily={MONO} fontSize={10} fill="var(--enGold)">{thLabel}</text>

              <g key={view} className={!reduced && popped ? "ecv2-xfade" : undefined}>
                {cvw.groups.map((g) => (
                  <g key={g.id} style={{ opacity: hl && hl !== g.id ? 0.25 : 1, transition: reduced ? "none" : "opacity .25s" }}>
                    {g.parts.map((p) => (
                      <g key={p.k}>
                        <title>{p.title}</title>
                        {p.seats.map((i) => (
                          <rect
                            key={i}
                            x={wfX(i)} y={wfY(i)} width={WF_SEAT} height={WF_SEAT} rx={4}
                            className={popAnim ? "ecv2-cell" : undefined}
                            style={{ "--i": i }}
                            {...seatProps(g.kind)}
                          />
                        ))}
                      </g>
                    ))}
                  </g>
                ))}

                {/* group composition, below row 3 */}
                <text x={0} y={76} fontFamily={MONO} fontSize={10} fill="var(--text2)">{cvw.counts}</text>

                {/* distance bracket — view A only: the 8-seat span between seat 30 and seat 38,
                    drawn on the threshold rule itself (a measurement, not a seat identification) */}
                {view === "A" && (
                  <g className={popAnim ? "ecv2-bracket" : undefined}>
                    <line x1={bx1} x2={bx2} y1={41.5} y2={41.5} stroke="var(--enGold)" strokeWidth={2} />
                    <line x1={bx1} x2={bx1} y1={38.5} y2={44.5} stroke="var(--enGold)" strokeWidth={2} />
                    <line x1={bx2} x2={bx2} y1={38.5} y2={44.5} stroke="var(--enGold)" strokeWidth={2} />
                    <text x={bx2} y={76} textAnchor="end" fontFamily={MONO} fontSize={10.5} fill="var(--enGold)">{gapLabel}</text>
                  </g>
                )}
              </g>
            </g>
          </svg>
        </div>

        {/* legend chips = highlight buttons (radio; second press clears) */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
          {cvw.groups.map((g) => (
            <button key={g.id} type="button" aria-pressed={hl === g.id}
              onClick={() => setHl(hl === g.id ? null : g.id)} style={chip(hl === g.id)}>
              <StanceDot kind={g.kind} />
              <span>{g.chip}</span>
            </button>
          ))}
        </div>

        <div aria-live="polite" style={{ minHeight: 40, marginTop: 10, fontSize: 12, color: "var(--text2)", lineHeight: 1.55 }}>
          {sel ? (
            <>
              <span style={{ color: "var(--text)", fontWeight: 700 }}>{sel.d1}</span>
              <br />
              {sel.d2}
            </>
          ) : (
            <span style={{ color: "var(--text3)" }}>
              {en ? "Select a group to see its detail." : "Seleccione un grupo para ver su detalle."}
            </span>
          )}
        </div>

        {/* honesty copy — in-frame so PNG exports carry it */}
        <div style={{ fontFamily: MONO, fontSize: 10, color: "var(--text3)", marginTop: 10, lineHeight: 1.7 }}>
          <div>
            {view === "A"
              ? (en ? "Bloc stances as of Jun 2026 — not the roll-call record." : "Posturas por bloque a jun 2026 — no es el registro de votación.")
              : model.viewB.subline}
          </div>
          <div>{(en ? "Data as of " : "Datos al ") + dloc(VOTE_WAFFLE.asOf, en) + " · Asamblea Legislativa"}</div>
        </div>
      </div>
    </Fig>
  );
}

/* ════════════════════════════════════════════════════════════════
   2 · NuclearScaleBar — five AI nuclear deals vs Costa Rica's grid (Act 2)
   Magnitude comparison → horizontal bars, ONE MW axis, zero baseline.
   Row 1: 5 stacked deal segments (mono-hue violet, 2px surface gaps).
   Row 2: CR installed capacity (gold). Mixed-basis caveat is mandatory.
   ════════════════════════════════════════════════════════════════ */
const shortBuyer = (b) => (b.includes("TerraPower") ? "TerraPower" : String(b).split(" ")[0]);

function SegLabel(props) {
  const { x, y, width, height, value, name } = props;
  if (value == null || width == null || width < name.length * 6.8 + 8) return null;
  return (
    <text x={x + width / 2} y={y + height / 2} textAnchor="middle" dominantBaseline="central"
      fontSize={11} fontWeight={700} fill="var(--enOnAccent)">
      {name}
    </text>
  );
}

function EndLabel(props) {
  const { x, y, width, height, value, text, compact } = props;
  if (value == null) return null;
  return (
    <text x={x + width + 6} y={y + height / 2} dominantBaseline="central"
      fontFamily={MONO} fontSize={compact ? 10 : 11} fontWeight={700} fill="var(--text)">
      {text}
    </text>
  );
}

function NuclearTip({ active, payload, en, deals, crMw }) {
  if (!active || !payload || !payload.length) return null;
  if (payload.length > 1) {
    /* shared-hover fallback: list every segment of the hovered row */
    return (
      <div style={TT_BOX}>
        <div style={TT_HEAD}>{String(payload[0].payload.name).replace("\n", " ")}</div>
        {payload.map((p) => (
          <div key={p.dataKey} style={TT_SUB}>
            {p.dataKey === "cr" ? "Costa Rica" : shortBuyer(p.dataKey)} — {num(p.value, en)} MW
          </div>
        ))}
      </div>
    );
  }
  const p = payload[0];
  if (p.dataKey === "cr") {
    return (
      <div style={TT_BOX}>
        <div style={TT_HEAD}>Costa Rica</div>
        <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 13, color: "var(--text)" }}>≈{num(crMw, en)} MW</div>
        <div style={TT_SUB}>{en ? "Total installed capacity · Dec 2023" : "Capacidad instalada total · dic 2023"}</div>
        <div style={TT_SUB}>{SRC.peg.name}</div>
      </div>
    );
  }
  const d = deals[p.dataKey];
  if (!d) return null;
  return (
    <div style={TT_BOX}>
      <div style={TT_HEAD}>{d.buyer}</div>
      <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 13, color: "var(--text)" }}>{num(d.mw, en)} MW</div>
      <div style={TT_SUB}>{T(d.plant, en)}</div>
      <div style={TT_SUB}>{T(d.deal, en)}</div>
      <div style={TT_SUB}>{SRC[d.s] ? SRC[d.s].name : ""}</div>
    </div>
  );
}

function YTick({ x, y, payload }) {
  const lines = String(payload.value).split("\n");
  return (
    <text x={x} y={y} textAnchor="end" fill="var(--text2)" fontSize={11}>
      {lines.map((ln, i) => (
        <tspan key={i} x={x} dy={i === 0 ? (lines.length > 1 ? -3 : 4) : 13}>{ln}</tspan>
      ))}
    </text>
  );
}

export function NuclearScaleBar({ en }) {
  const reduced = useReducedMotion();
  const compact = useCompact(480);
  const [ref, armed] = useArmed("-120px");

  const rows = useMemo(() => [...NUCLEAR_DEALS.rows].sort((a, b) => b.mw - a.mw), []);
  const deals = useMemo(() => Object.fromEntries(rows.map((r) => [r.buyer, r])), [rows]);
  const dealTotal = rows.reduce((a, r) => a + r.mw, 0);
  const crMw = NUCLEAR_VS_CR.crInstalledMw;

  const dealsName = compact
    ? (en ? "AI deals\n2024-26" : "Compras IA\n2024-26")
    : (en ? "AI nuclear purchases\n2024-26" : "Compras nucleares\nde IA 2024-26");
  const crName = compact
    ? "Costa Rica\n2023"
    : (en ? "Costa Rica\ninstalled cap. 2023" : "Costa Rica\ncap. instalada 2023");
  const data = useMemo(() => ([
    { name: dealsName, ...Object.fromEntries(rows.map((r) => [r.buyer, r.mw])) },
    { name: crName, cr: crMw },
  ]), [rows, dealsName, crName, crMw]);

  const dealEnd = `≈${num(dealTotal, en)} MW`;
  const crEnd = `≈${num(crMw, en)} MW`;
  const segNote = rows.map((r) => `${shortBuyer(r.buyer)} ${num(r.mw, en)}`).join(" · ") + " MW";

  return (
    <Fig
      en={en}
      title={en ? "Five nuclear deals vs. Costa Rica's entire grid" : "Cinco contratos nucleares vs. toda la red de Costa Rica"}
      summary={en
        ? "Horizontal bars in MW: five nuclear deals by AI buyers add up to ≈3,740 MW — more than the ≈3,499 MW of Costa Rica's entire installed capacity (Dec 2023). Different bases: committed or offered deals vs. installed capacity."
        : "Barras horizontales en MW: cinco contratos nucleares de compradores de IA suman ≈3.740 MW — más que los ≈3.499 MW de toda la capacidad instalada de Costa Rica (dic 2023). Bases distintas: contratos comprometidos u ofertados vs. capacidad instalada."}
      srcIds={["constellation", "talen", "google", "terrapower", "peg"]}
    >
      <KitStyle />
      <div ref={ref} style={{ maxWidth: "100%" }}>
        <div aria-hidden="true">
          {armed ? (
            <ResponsiveContainer width="100%" height={176}>
              <BarChart data={data} layout="vertical" margin={{ top: 2, right: compact ? 64 : 78, bottom: 0, left: 0 }}>
                <CartesianGrid {...GRID} horizontal={false} />
                <XAxis type="number" domain={[0, 4000]} ticks={[0, 1000, 2000, 3000, 4000]}
                  tickFormatter={(v) => num(v, en)} {...AXIS} />
                <YAxis type="category" dataKey="name" width={compact ? 80 : 138} interval={0}
                  tick={<YTick />} tickLine={false} axisLine={AXIS.axisLine} />
                <Tooltip shared={false} cursor={CURSOR} content={<NuclearTip en={en} deals={deals} crMw={crMw} />} />
                {rows.map((r, i) => (
                  <Bar key={r.buyer} dataKey={r.buyer} stackId="mw" barSize={30}
                    fill="var(--enViolet)" stroke="var(--card)" strokeWidth={2}
                    radius={i === rows.length - 1 ? [0, 4, 4, 0] : [0, 0, 0, 0]}
                    isAnimationActive={!reduced} animationDuration={640} animationEasing="ease-out">
                    {i < 3 && <LabelList dataKey={r.buyer} content={<SegLabel name={shortBuyer(r.buyer)} />} />}
                    {i === rows.length - 1 && <LabelList dataKey={r.buyer} content={<EndLabel text={dealEnd} compact={compact} />} />}
                  </Bar>
                ))}
                <Bar dataKey="cr" stackId="mw" barSize={30} fill="var(--enGold)" radius={[0, 4, 4, 0]}
                  isAnimationActive={!reduced} animationDuration={640} animationEasing="ease-out">
                  <LabelList dataKey="cr" content={<EndLabel text={crEnd} compact={compact} />} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: 176 }} />
          )}
        </div>

        <LegendRow items={[
          { color: "var(--enViolet)", label: en ? `AI nuclear purchases (${rows.length} deals)` : `Compras nucleares de IA (${rows.length} contratos)` },
          { color: "var(--enGold)", label: en ? "Costa Rica — installed capacity" : "Costa Rica — capacidad instalada" },
        ]} />
        <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 6, lineHeight: 1.55 }}>
          {en ? "Segments: " : "Segmentos: "}{segNote}
        </div>
        <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 8, lineHeight: 1.55 }}>
          {T(NUCLEAR_VS_CR.basisNote, en)}
        </div>
      </div>
    </Fig>
  );
}

/* ════════════════════════════════════════════════════════════════
   3 · ReformStrip — four decades of reform vintages (Act 6)
   Categorical dot-plot timeline, hand SVG, ONE time axis 1980→2030.
   Encodes YEARS ONLY (COMPARATIVE has no per-country numeric metric —
   any performance number would be fabrication). Tone colors rhyme with
   ComparativeRail: teal = useful template, gold = cautionary.
   ════════════════════════════════════════════════════════════════ */
export function ReformStrip({ en }) {
  const reduced = useReducedMotion();
  const compact = useCompact(480);
  const [ref, armed] = useArmed("-120px");

  const rows = useMemo(
    () => REFORM_YEARS.rows
      .map((r) => ({ ...r, c: COMPARATIVE.rows.find((c) => c.code === r.code) }))
      .filter((r) => r.c),
    []
  );
  const good = rows.filter((r) => r.c.tone === "good").length;
  const warn = rows.filter((r) => r.c.tone === "warn").length;
  /* CR status year derived from TIMELINE (decree row, s: presidencia/asamblea) */
  const decree = TIMELINE.rows.find((r) => r.type === "decree");
  const yMatch = decree && String(decree.date).match(/\d{4}/);
  const crYear = yMatch ? parseInt(yMatch[0], 10) : 2026;

  const W = compact ? 360 : 720;
  const LEFT = compact ? 40 : 150;
  const RIGHT = W - 30;
  const xx = (yr) => LEFT + ((yr - 1980) / (2030 - 1980)) * (RIGHT - LEFT);
  const rowY = (i) => 16 + i * 26;
  const rowAnim = armed && !reduced;
  const hidden = !reduced && !armed;
  const toneWord = (tone) => (tone === "good" ? (en ? "useful template" : "plantilla útil") : (en ? "cautionary" : "advertencia"));
  const pend = en ? "pending" : "pendiente";

  return (
    <Fig
      en={en}
      title={en ? "Four decades of reform, two warnings" : "Cuatro décadas de reformas, dos advertencias"}
      summary={en
        ? "Timeline of six electricity reforms, 1982-2016: Chile 1982 and 2016, Colombia 1994, Nord Pool 1996, Texas 1999-2002, Brazil 2004, Uruguay 2005-2017; Uruguay, Colombia, Brazil and Nord Pool marked as useful templates, Chile-1982 and Texas as cautionary. Costa Rica: Bill 23.414 pending in 2026."
        : "Línea de tiempo de seis reformas eléctricas, 1982-2016: Chile 1982 y 2016, Colombia 1994, Nord Pool 1996, Texas 1999-2002, Brasil 2004, Uruguay 2005-2017; Uruguay, Colombia, Brasil y Nord Pool marcadas como plantillas útiles, Chile-1982 y Texas como advertencias. Costa Rica: Expediente 23.414 pendiente en 2026."}
      srcIds={["cne", "asamblea"]}
    >
      <KitStyle />
      <div ref={ref} style={{ maxWidth: "100%" }}>
        <div aria-hidden="true">
          <svg viewBox={`0 0 ${W} 236`} width="100%" style={{ display: "block", height: "auto", maxWidth: "100%" }} focusable="false">
            {/* recessive time axis */}
            <line x1={LEFT} x2={RIGHT} y1={196} y2={196} stroke="var(--border)" strokeWidth={1} />
            {[1980, 1990, 2000, 2010, 2020].map((yr) => (
              <g key={yr}>
                <line x1={xx(yr)} x2={xx(yr)} y1={196} y2={201} stroke="var(--border)" strokeWidth={1} />
                <text x={xx(yr)} y={214} textAnchor="middle" fontFamily={MONO} fontSize={10} fill="var(--text3)">{yr}</text>
              </g>
            ))}
            {/* divider before the CR status row */}
            <line x1={0} x2={W} y1={159} y2={159} stroke="var(--border)" strokeWidth={1} strokeDasharray="4 4" />

            {rows.map((r, i) => {
              const cy = rowY(i);
              const tc = r.c.tone === "good" ? "var(--enTurq)" : "var(--enGold)";
              const pts = [...new Set(r.spans.flat())].sort((a, b) => a - b);
              const label = compact ? r.code : (r.code === "NP" ? "Nord Pool" : T(r.c.country, en));
              return (
                <g key={r.code} className={rowAnim ? "ecv2-row" : undefined} style={{ "--r": i, opacity: hidden ? 0 : 1 }}>
                  <title>{`${T(r.c.country, en)} · ${r.c.year} · ${toneWord(r.c.tone)}`}</title>
                  <text x={4} y={cy} dominantBaseline="central" fontSize={11.5} fill="var(--text)">{label}</text>
                  {pts.length > 1 && (
                    <line x1={xx(pts[0])} x2={xx(pts[pts.length - 1])} y1={cy} y2={cy} stroke={tc} strokeWidth={2} opacity={0.45} />
                  )}
                  {pts.map((yr) => (
                    <circle key={yr} cx={xx(yr)} cy={cy} r={8} fill={tc} stroke="var(--card)" strokeWidth={2} />
                  ))}
                  {!compact && (
                    <text x={xx(pts[pts.length - 1]) + 13} y={cy} dominantBaseline="central" fontFamily={MONO} fontSize={10} fill="var(--text3)">{r.c.year}</text>
                  )}
                </g>
              );
            })}

            {/* CR — pending, dashed ring (matches the section's dashed-estimate semantics) */}
            <g className={rowAnim ? "ecv2-row" : undefined} style={{ "--r": rows.length, opacity: hidden ? 0 : 1 }}>
              <title>{`Costa Rica · Exp. 23.414 — ${pend} (${crYear})`}</title>
              <text x={4} y={rowY(rows.length)} dominantBaseline="central" fontSize={11.5} fill="var(--text)">{compact ? "CR" : "Costa Rica"}</text>
              <circle cx={xx(crYear)} cy={rowY(rows.length)} r={8} fill="none" stroke="var(--enGold)" strokeWidth={2} strokeDasharray="4 3" />
              <text x={xx(crYear) - 14} y={rowY(rows.length)} textAnchor="end" dominantBaseline="central"
                fontFamily={MONO} fontSize={10.5} fill="var(--enGold)">
                {compact ? `23.414 — ${pend}` : `Exp. 23.414 — ${pend}`}
              </text>
            </g>
          </svg>
        </div>

        <LegendRow items={[
          { color: "var(--enTurq)", label: `${en ? "Useful template" : "Plantilla útil"} (${good})` },
          { color: "var(--enGold)", label: `${en ? "Cautionary" : "Advertencia"} (${warn})` },
          { color: "var(--enGold)", ring: "dashed", label: en ? "CR: pending" : "CR: pendiente" },
        ]} />
        <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 8, lineHeight: 1.55 }}>
          {en
            ? "Reform year by country; a qualitative Colibrii classification, not a ranking."
            : "Año de reforma por país; clasificación cualitativa de Colibrii, no un ranking."}
        </div>
      </div>
    </Fig>
  );
}
