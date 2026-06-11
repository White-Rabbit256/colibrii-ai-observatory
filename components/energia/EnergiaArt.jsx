"use client";
import { useId } from "react";

/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — EnergiaArt
   Original editorial SVG art for the energy & AI section.
   · ReactorCutaway — labeled cross-section of a sodium-cooled SMR
     with molten-salt storage (Natrium-style archetype, illustrative).
   · EnergyBeam — animated act divider.
   Pure SVG/CSS, zero deps. Keyframes prefixed `enart`, ids `enart-`.
   Reduced motion: CSS animations stop, SMIL flow dots are hidden
   (static dots remain), beam falls back to a static gradient line.
   ═══════════════════════════════════════════════════════════════ */

const MONO = "'IBM Plex Mono',monospace";

const LBL = {
  fontFamily: MONO,
  fontSize: 10.5,
  letterSpacing: 1.5,
  textTransform: "uppercase",
  fill: "rgba(255,255,255,0.85)",
};

/* ── Leader-line label: dot at target, 1px leader, mono caption ── */
function Tag({ x, y, tx, ty, t, anchor = "start" }) {
  if (anchor === "middle") {
    const up = ty < y;
    return (
      <g>
        <circle cx={x} cy={y} r="2" fill="rgba(255,255,255,0.55)" />
        <path d={`M${x} ${y} L${tx} ${ty}`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
        <text x={tx} y={up ? ty - 7 : ty + 13} textAnchor="middle" style={LBL}>{t}</text>
      </g>
    );
  }
  const dir = anchor === "end" ? -1 : 1;
  return (
    <g>
      <circle cx={x} cy={y} r="2" fill="rgba(255,255,255,0.55)" />
      <path d={`M${x} ${y} L${tx} ${ty} h${dir * 10}`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
      <text x={tx + dir * 14} y={ty + 3.5} textAnchor={anchor} style={LBL}>{t}</text>
    </g>
  );
}

/* ── Blueprint corner crosshair ── */
function Cross({ x, y }) {
  return (
    <path
      d={`M${x - 6} ${y} H${x + 6} M${x} ${y - 6} V${y + 6}`}
      stroke="rgba(34,211,238,0.2)" strokeWidth="1" fill="none"
    />
  );
}

/* ── Geometry (24px blueprint grid, ground at y=480) ── */
const OUTER = "M48 480 V192 A120 100 0 0 1 288 192 V480 Z"; // containment shell
const INNER = "M62 480 V192 A106 86 0 0 1 274 192 V480 Z";  // containment interior
const VESSEL = "M122 252 V424 Q122 448 146 448 H190 Q214 448 214 424 V252 Z";
const POOL = "M126 274 V424 Q126 444 148 444 H188 Q210 444 210 424 V274 Z";
const TANK = "M440 480 V316 Q440 296 460 296 H564 Q584 296 584 316 V480 Z";
const WAVE =
  "M440 348 Q446 343 452 348 T464 348 T476 348 T488 348 T500 348 T512 348 " +
  "T524 348 T536 348 T548 348 T560 348 T572 348 T584 348";
const SODIUM_HOT = "M214 284 H332";
const SODIUM_COLD = "M332 400 H214";

export function ReactorCutaway({ en }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const id = (n) => `enart-${n}-${uid}`;
  const u = (n) => `url(#${id(n)})`;

  return (
    <div
      className="enart-scope"
      style={{
        background: "linear-gradient(165deg, #0A1F3F 0%, #0d2240 100%)",
        borderRadius: 14,
        border: "1px solid rgba(0,181,168,0.25)",
        padding: 18,
      }}
    >
      <style>{`
@keyframes enartPulse{0%,100%{opacity:1}50%{opacity:.68}}
@keyframes enartDash{to{stroke-dashoffset:-26}}
.enart-rod{animation:enartPulse 2.6s ease-in-out infinite}
.enart-soft{animation:enartPulse 4.4s ease-in-out infinite}
.enart-dash{stroke-dasharray:6.5 6.5;animation:enartDash 1.5s linear infinite}
@media (prefers-reduced-motion: reduce){
  .enart-scope *{animation:none !important}
  .enart-scope .enart-smil{display:none}
}`}</style>

      <div
        style={{
          display: "inline-flex", alignItems: "center", gap: 7, marginBottom: 12,
          fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
          textTransform: "uppercase", color: "#F2B135",
          border: "1px solid rgba(242,177,53,0.35)", borderRadius: 999, padding: "4px 11px",
        }}
      >
        <span style={{ width: 5, height: 5, borderRadius: 99, background: "#F2B135", display: "inline-block" }} />
        {en ? "SMR ARCHITECTURE · COLIBRII ILLUSTRATION" : "ARQUITECTURA SMR · ILUSTRACIÓN COLIBRII"}
      </div>

      <svg
        viewBox="0 0 860 560" width="100%" role="img"
        aria-labelledby={`${id("t")} ${id("d")}`}
        style={{ display: "block", width: "100%", height: "auto" }}
      >
        <title id={id("t")}>
          {en
            ? "Schematic cutaway of a sodium-cooled small modular reactor (SMR) with molten-salt storage"
            : "Corte esquemático de un reactor modular pequeño (SMR) refrigerado por sodio con almacenamiento en sal fundida"}
        </title>
        <desc id={id("d")}>
          {en
            ? "Editorial illustration: inside the containment, the core heats liquid sodium; a heat exchanger transfers the heat to a molten-salt storage tank that feeds a turbine and a generator connected to the power grid."
            : "Ilustración editorial: dentro de la contención, el núcleo calienta sodio líquido; un intercambiador transfiere el calor a un tanque de sal fundida que alimenta una turbina y un generador conectados a la red eléctrica."}
        </desc>

        <defs>
          <pattern id={id("grid")} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0 H0 V24" fill="none" stroke="rgba(34,211,238,0.05)" strokeWidth="1" />
          </pattern>
          <pattern id={id("hatch")} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="7" stroke="rgba(150,180,220,0.16)" strokeWidth="1" />
          </pattern>
          <linearGradient id={id("steel")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1c3354" /><stop offset="1" stopColor="#0f2138" />
          </linearGradient>
          <linearGradient id={id("inwall")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0e2444" /><stop offset="1" stopColor="#0b1c36" />
          </linearGradient>
          <linearGradient id={id("vessel")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#152c4e" /><stop offset="1" stopColor="#102342" />
          </linearGradient>
          <linearGradient id={id("sodium")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(242,177,53,0.26)" /><stop offset="1" stopColor="rgba(242,177,53,0.04)" />
          </linearGradient>
          <linearGradient id={id("rod")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff6d8" /><stop offset="0.45" stopColor="#ffd479" /><stop offset="1" stopColor="#e8930f" />
          </linearGradient>
          <radialGradient id={id("glow")}>
            <stop offset="0" stopColor="#F2B135" stopOpacity="0.5" /><stop offset="1" stopColor="#F2B135" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={id("hx")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#193455" /><stop offset="1" stopColor="#0f2138" />
          </linearGradient>
          <linearGradient id={id("tank")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#eba32c" /><stop offset="0.55" stopColor="#c07c16" /><stop offset="1" stopColor="#7c4d0d" />
          </linearGradient>
          <linearGradient id={id("turb")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#16304f" /><stop offset="1" stopColor="#0d2138" />
          </linearGradient>
          <linearGradient id={id("gen")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1a3458" /><stop offset="1" stopColor="#102543" />
          </linearGradient>
          <clipPath id={id("clipIn")}><path d={INNER} /></clipPath>
          <clipPath id={id("clipTank")}><path d={TANK} /></clipPath>
        </defs>

        {/* ── Blueprint backdrop ── */}
        <rect width="860" height="560" fill={u("grid")} />
        <Cross x={28} y={28} /><Cross x={832} y={28} /><Cross x={28} y={532} /><Cross x={832} y={532} />

        {/* ── Ground line + foundation ticks ── */}
        <line x1="40" y1="480" x2="848" y2="480" stroke="rgba(150,180,220,0.28)" strokeWidth="1.5" />
        {[...Array(17)].map((_, i) => (
          <path key={i} d={`M${48 + i * 48} 483 l-7 9`} stroke="rgba(140,170,210,0.12)" strokeWidth="1" fill="none" />
        ))}

        {/* ── Containment building (cross-section: shell, hatched wall band, interior) ── */}
        <path d={OUTER} fill={u("steel")} />
        <path d={OUTER} fill={u("hatch")} />
        <path d={INNER} fill={u("inwall")} />
        <rect x="62" y="466" width="212" height="14" fill="#142a4a" />
        <rect x="62" y="466" width="212" height="14" fill={u("hatch")} />
        <line x1="62" y1="466" x2="274" y2="466" stroke="#2a4368" strokeWidth="1" />
        <path d={INNER} fill="none" stroke="#2a4368" strokeWidth="1" />
        <path d={OUTER} fill="none" stroke="#3a557e" strokeWidth="2" />

        {/* ── Reactor vessel + internals (clipped to containment interior) ── */}
        <g clipPath={`url(#${id("clipIn")})`}>
          <path d={VESSEL} fill={u("vessel")} />
          <path d={POOL} fill="#152a4c" />
          <path d={POOL} fill={u("sodium")} />
          <line x1="126" y1="274" x2="210" y2="274" stroke="rgba(242,177,53,0.7)" strokeWidth="1.5" />
          {/* core glow + fuel rods (staggered pulse) */}
          <ellipse cx="168" cy="380" rx="52" ry="44" fill={u("glow")} className="enart-soft" />
          <rect x="120" y="342" width="96" height="5" rx="1" fill="#24405f" />
          <rect x="120" y="410" width="96" height="6" rx="1" fill="#24405f" />
          {[126, 141, 156, 171, 186, 201].map((rx, i) => (
            <rect
              key={rx} x={rx} y="350" width="9" height="58" rx="2"
              fill={u("rod")} className="enart-rod" style={{ animationDelay: `${i * 0.35}s` }}
            />
          ))}
          <path d={VESSEL} fill="none" stroke="#46648f" strokeWidth="2" />
          <rect x="116" y="238" width="104" height="14" rx="3" fill="#1d3458" stroke="#46648f" strokeWidth="1.5" />
          {/* control rods: drives above head, absorbers partially inserted */}
          {[153, 168, 183].map((cx) => (
            <g key={cx}>
              <line x1={cx} y1="222" x2={cx} y2="258" stroke="#54688c" strokeWidth="1.5" />
              <rect x={cx - 5} y="212" width="10" height="10" rx="1.5" fill="#24405f" stroke="#3a557e" strokeWidth="1" />
              <rect x={cx - 2.5} y="258" width="5" height="108" rx="2" fill="#33415f" stroke="#4a5d80" strokeWidth="0.75" />
            </g>
          ))}
          {/* vessel support skirt */}
          <path d="M136 448 L128 466 M200 448 L208 466 M128 466 H208" stroke="#2a4368" strokeWidth="2" fill="none" />
        </g>

        {/* ── Primary sodium loop: vessel → heat exchanger ── */}
        <path d={SODIUM_HOT} stroke="#F2B135" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.95" />
        <path d={SODIUM_COLD} stroke="#F2B135" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.8" />
        <rect x="268" y="276" width="24" height="16" rx="3" fill="#1c3354" stroke="#3a557e" strokeWidth="1" />
        <rect x="268" y="392" width="24" height="16" rx="3" fill="#1c3354" stroke="#3a557e" strokeWidth="1" />
        {/* static flow markers (visible under reduced motion) */}
        {[[244, 284], [300, 284], [250, 400], [296, 400]].map(([dx, dy]) => (
          <circle key={`${dx}-${dy}`} cx={dx} cy={dy} r="2.3" fill="#ffdf91" opacity="0.5" />
        ))}
        {/* animated flow dots (SMIL; hidden under reduced motion) */}
        <g className="enart-smil">
          <circle r="3" fill="#ffe7ab"><animateMotion dur="3s" repeatCount="indefinite" path={SODIUM_HOT} /></circle>
          <circle r="3" fill="#ffe7ab"><animateMotion dur="3s" begin="-1.5s" repeatCount="indefinite" path={SODIUM_HOT} /></circle>
          <circle r="3" fill="#ffd97a"><animateMotion dur="3s" begin="-0.8s" repeatCount="indefinite" path={SODIUM_COLD} /></circle>
          <circle r="3" fill="#ffd97a"><animateMotion dur="3s" begin="-2.3s" repeatCount="indefinite" path={SODIUM_COLD} /></circle>
        </g>

        {/* ── Heat exchanger tower ── */}
        <rect x="332" y="248" width="72" height="232" rx="6" fill={u("hx")} stroke="#3a557e" strokeWidth="2" />
        <line x1="332" y1="288" x2="404" y2="288" stroke="#2a4368" strokeWidth="1" />
        <line x1="332" y1="392" x2="404" y2="392" stroke="#2a4368" strokeWidth="1" />
        <path
          d="M344 300 L392 312 L344 324 L392 336 L344 348 L392 360 L344 372 L392 384"
          stroke="rgba(242,177,53,0.5)" strokeWidth="1.5" strokeLinejoin="round" fill="none"
        />

        {/* ── Salt loop: heat exchanger → storage tank ── */}
        <path d="M404 268 H460 V296" stroke="#cd8a1e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M440 428 H404" stroke="#cd8a1e" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.75" />

        {/* ── Molten-salt storage tank (gold → deep amber, wavy fill line) ── */}
        <path d={TANK} fill={u("tank")} opacity="0.92" />
        <g clipPath={`url(#${id("clipTank")})`}>
          <rect x="440" y="296" width="144" height="52" fill="rgba(10,28,56,0.55)" />
          <path d={WAVE} fill="none" stroke="#ffe2a0" strokeWidth="1.5" />
          {[376, 412, 448].map((ry) => (
            <line key={ry} x1="440" y1={ry} x2="584" y2={ry} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
          ))}
          <rect x="450" y="300" width="7" height="176" fill="rgba(255,255,255,0.08)" />
        </g>
        <path d={TANK} fill="none" stroke="#b98c2e" strokeWidth="2" />

        {/* ── Steam loop → turbine + generator ── */}
        <path d="M584 332 H636" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.9" />
        <rect x="602" y="326" width="10" height="12" rx="2" fill="#0f2138" stroke="#22d3ee" strokeWidth="1" />
        {/* turbine: widening casing + blade stages */}
        <path d="M636 304 L704 290 V354 L636 340 Z" fill={u("turb")} stroke="#46648f" strokeWidth="2" strokeLinejoin="round" />
        <line x1="654" y1="303" x2="654" y2="341" stroke="rgba(34,211,238,0.5)" strokeWidth="1.5" />
        <line x1="670" y1="300" x2="670" y2="344" stroke="rgba(34,211,238,0.5)" strokeWidth="1.5" />
        <line x1="686" y1="297" x2="686" y2="347" stroke="rgba(34,211,238,0.5)" strokeWidth="1.5" />
        <line x1="704" y1="322" x2="714" y2="322" stroke="#54688c" strokeWidth="5" />
        {/* generator: cylinder with copper coil hatching */}
        <rect x="714" y="298" width="68" height="48" rx="12" fill={u("gen")} stroke="#46648f" strokeWidth="2" />
        {[...Array(9)].map((_, i) => (
          <line key={i} x1={722 + i * 6.5} y1="306" x2={722 + i * 6.5} y2="338" stroke="rgba(242,177,53,0.38)" strokeWidth="1" />
        ))}
        <rect x="738" y="290" width="16" height="8" rx="1.5" fill="#24405f" stroke="#3a557e" strokeWidth="1" />
        {/* machine supports */}
        <path d="M646 341 V412 M724 346 V480 M772 346 V480" stroke="#2e4a72" strokeWidth="2.5" fill="none" />

        {/* ── Cooling: condenser + droplets / vapor hints ── */}
        <path d="M668 348 V412" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
        <rect x="640" y="412" width="60" height="44" rx="4" fill="#122947" stroke="#3a557e" strokeWidth="1.5" />
        {[424, 434, 444].map((ty) => (
          <path key={ty} d={`M646 ${ty} q5 -4 10 0 t10 0 t10 0 t10 0 t10 0`} stroke="rgba(34,211,238,0.45)" strokeWidth="1" fill="none" />
        ))}
        <path d="M650 456 V478 M690 456 V478" stroke="#2e4a72" strokeWidth="2.5" fill="none" />
        <path d="M640 444 H584" stroke="rgba(34,211,238,0.45)" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M0 0 C3 4.5 4 7 0 10 C-4 7 -3 4.5 0 0 Z" transform="translate(712,424)" fill="rgba(34,211,238,0.55)" />
        <path d="M0 0 C3 4.5 4 7 0 10 C-4 7 -3 4.5 0 0 Z" transform="translate(722,438) scale(0.72)" fill="rgba(34,211,238,0.4)" />
        <path d="M632 410 c-3 -6 3 -9 0 -16 M640 408 c-2 -5 2 -7 0 -12" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* ── Transmission pylon + line to the grid (animated dashes) ── */}
        <g stroke="#6e87ab" strokeWidth="1.5" fill="none">
          <path d="M800 480 L808 312 M824 480 L816 312 M808 312 L812 296 L816 312" />
          <path d="M786 320 H838 M794 344 H830" />
          <path d="M786 320 v6 M838 320 v6 M794 344 v5 M830 344 v5" />
        </g>
        <path
          d="M801 462 L822 440 L803 418 L820 396 L806 374 L818 352"
          stroke="rgba(110,135,171,0.8)" strokeWidth="1" fill="none"
        />
        <path d="M750 290 Q772 320 786 327 M838 327 Q850 320 860 322" stroke="rgba(34,211,238,0.25)" strokeWidth="1" fill="none" />
        <path
          d="M750 290 Q772 320 786 327 M838 327 Q850 320 860 322"
          className="enart-dash" stroke="#22d3ee" strokeWidth="1.8" fill="none" strokeLinecap="round"
        />

        {/* ── Labels (leader lines + mono captions) ── */}
        <Tag x={98} y={116} tx={12} ty={66} t={en ? "CONTAINMENT" : "CONTENCIÓN"} />
        <Tag x={183} y={212} tx={236} ty={96} t={en ? "CONTROL RODS" : "BARRAS DE CONTROL"} />
        <Tag x={306} y={284} tx={336} ty={160} t={en ? "LIQUID SODIUM 500°C" : "SODIO LÍQUIDO 500°C"} />
        <Tag x={512} y={300} tx={512} ty={228} anchor="middle" t={en ? "MOLTEN SALT (STORAGE)" : "SAL FUNDIDA (ALMACENAMIENTO)"} />
        <Tag x={668} y={296} tx={668} ty={250} anchor="middle" t={en ? "TURBINE" : "TURBINA"} />
        <Tag x={748} y={290} tx={748} ty={250} anchor="middle" t={en ? "GENERATOR" : "GENERADOR"} />
        <Tag x={848} y={322} tx={846} ty={206} anchor="end" t={en ? "TO THE GRID" : "A LA RED"} />
        <Tag x={160} y={396} tx={160} ty={500} anchor="middle" t={en ? "CORE" : "NÚCLEO"} />
        <Tag x={368} y={440} tx={368} ty={500} anchor="middle" t={en ? "HEAT EXCHANGER" : "INTERCAMBIADOR"} />
      </svg>

      <div style={{ marginTop: 12, fontSize: 11.5, lineHeight: 1.5, color: "rgba(255,255,255,0.6)" }}>
        {en
          ? "Illustrative Natrium-style schematic (sodium-cooled fast reactor + thermal storage). Not to scale."
          : "Esquema ilustrativo tipo Natrium (reactor rápido refrigerado por sodio + almacenamiento térmico). No a escala."}
      </div>
    </div>
  );
}

/* ═══ EnergyBeam — act divider: gradient line with traveling glow ═══ */
export function EnergyBeam() {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const id = (n) => `enart-${n}-${uid}`;
  return (
    <div aria-hidden="true" style={{ width: "100%", height: 64, overflow: "hidden" }}>
      <style>{`
@keyframes enartBeam{0%{transform:translateX(-280px)}100%{transform:translateX(1480px)}}
.enart-beam-seg{animation:enartBeam 4.6s linear infinite}
@media (prefers-reduced-motion: reduce){.enart-beam-seg{display:none}}`}</style>
      <svg width="100%" height="64" viewBox="0 0 1200 64" preserveAspectRatio="none" style={{ display: "block" }}>
        <defs>
          <linearGradient id={id("beamline")} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#00B5A8" stopOpacity="0" />
            <stop offset="0.18" stopColor="#00B5A8" stopOpacity="0.55" />
            <stop offset="0.5" stopColor="#22d3ee" stopOpacity="0.75" />
            <stop offset="0.82" stopColor="#F2B135" stopOpacity="0.55" />
            <stop offset="1" stopColor="#F2B135" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={id("beamglow")} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="0.45" stopColor="#22d3ee" stopOpacity="0.85" />
            <stop offset="0.55" stopColor="#F2B135" stopOpacity="0.85" />
            <stop offset="1" stopColor="#F2B135" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1="32" x2="1200" y2="32" stroke={`url(#${id("beamline")})`} strokeWidth="1" />
        <circle cx="300" cy="32" r="1.6" fill="rgba(34,211,238,0.45)" />
        <circle cx="900" cy="32" r="1.6" fill="rgba(242,177,53,0.45)" />
        <rect x="597.5" y="29.5" width="5" height="5" transform="rotate(45 600 32)" fill="rgba(255,255,255,0.4)" />
        <g className="enart-beam-seg">
          <rect x="0" y="30.4" width="240" height="3.2" rx="1.6" fill={`url(#${id("beamglow")})`} />
          <rect x="70" y="31.3" width="100" height="1.4" rx="0.7" fill="rgba(255,255,255,0.55)" />
        </g>
      </svg>
    </div>
  );
}
