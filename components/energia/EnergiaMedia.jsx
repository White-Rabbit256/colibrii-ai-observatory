"use client";
import { useState } from "react";
import { EN_ACCENT } from "../energiaData";

/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — Media (verified press / public imagery)
   Real photographs sourced from Wikimedia Commons via the stable
   Special:FilePath redirect (loads by filename). Attribution is
   satisfied by linking each credit chip to the Commons file page
   (CC BY-SA attribution-by-link). Every <img> has an onError
   fallback to elegant CSS art, so a broken URL never shows a broken
   image. Licensing manifest: /knowledge/sections/energia.md.
   The Bill Gates / Natrium groundbreaking photo is NYT/Redux
   (copyright) → represented by the original ReactorCutaway instead.
   ═══════════════════════════════════════════════════════════════ */

const T = (v, en) => (v && typeof v === "object" && !Array.isArray(v) && ("es" in v) ? (en ? v.en : v.es) : v);

/* Stable Commons URLs from a filename */
const fileSrc = (file, w = 1280) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${w}`;
const filePage = (file) =>
  `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, "_"))}`;

/* Kind → glyph + color for the graceful fallback */
const KIND_FALLBACK = {
  nuclear: { c: EN_ACCENT.gold, glyph: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 7a3 3 0 110 6 3 3 0 010-6zM5 11a7 7 0 013-5l1.6 2.6A4 4 0 008 11H5zm9.4-5a7 7 0 013 5h-3a4 4 0 00-1.6-2.4L14.4 6zM8 18a7 7 0 01-3-4h3a4 4 0 001.6 2L8 18zm8 0l-1.6-2A4 4 0 0016 14h3a7 7 0 01-3 4z" },
  data: { c: EN_ACCENT.glow, glyph: "M4 4h16v4H4V4zm0 6h16v4H4v-4zm0 6h16v4H4v-4zM7 5.5v1M7 11.5v1M7 17.5v1" },
  hydro: { c: EN_ACCENT.turquoise, glyph: "M12 2s6 7 6 11a6 6 0 11-12 0c0-4 6-11 6-11z" },
};

export const MEDIA = {
  tmi: {
    file: "3 mile Island from Goldsboro PA.JPG", kind: "nuclear",
    caption: { es: "Three Mile Island (Pensilvania). Microsoft reabre la Unidad 1 — 835 MW, PPA a 20 años — para alimentar sus centros de datos de IA.", en: "Three Mile Island (Pennsylvania). Microsoft is restarting Unit 1 — 835 MW, 20-yr PPA — to power its AI data centres." },
    credit: "Wikimedia Commons", license: "CC BY-SA",
  },
  datacenter: {
    file: "Datacenter Server Racks (22370909788).jpg", kind: "data",
    caption: { es: "La demanda que lo dispara todo: los centros de datos de IA consumirán ~945 TWh hacia 2030, más que todo Japón hoy.", en: "The demand driving everything: AI data centres will consume ~945 TWh by 2030 — more than all of Japan today." },
    credit: "Wikimedia Commons", license: "CC BY-SA",
  },
  cachi: {
    file: "Represa de Cachi ICE Costa Rica CA.jpg", kind: "hydro",
    caption: { es: "Represa de Cachí (ICE). La hidroeléctrica sostiene el 68% de la capacidad instalada de Costa Rica.", en: "Cachí dam (ICE). Hydropower carries 68% of Costa Rica's installed capacity." },
    credit: "Wikimedia Commons", license: "CC BY-SA",
  },
  reventazon: {
    file: "Río Reventazón. Costa Rica.JPG", kind: "hydro",
    caption: { es: "Río Reventazón. Su represa (305 MW, 2016) es la mayor hidroeléctrica de Centroamérica.", en: "Reventazón River. Its dam (305 MW, 2016) is Central America's largest hydro plant." },
    credit: "Wikimedia Commons", license: "CC BY-SA",
  },
};

/* ── A single premium photo figure ── */
export function MediaFigure({ id, en, height = 240, eager = false }) {
  const m = MEDIA[id];
  const [failed, setFailed] = useState(false);
  const fb = KIND_FALLBACK[m.kind] || KIND_FALLBACK.data;

  return (
    <figure style={{ margin: 0, position: "relative", borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid rgba(0,181,168,0.25)", background: `linear-gradient(150deg, ${EN_ACCENT.navy}, ${EN_ACCENT.navy2})`, height, boxShadow: "var(--shadow-md)" }}>
      {!failed ? (
        <img
          src={fileSrc(m.file, 1280)}
          alt={T(m.caption, en)}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className="energia-media-img"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        /* Graceful fallback — never a broken image */
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: `radial-gradient(120% 100% at 30% 20%, ${fb.c}22, transparent 60%), linear-gradient(150deg, ${EN_ACCENT.navy}, ${EN_ACCENT.navy2})` }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={fb.c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.55 }}>
            <path d={fb.glyph} />
          </svg>
        </div>
      )}

      {/* Bottom scrim + caption */}
      <figcaption style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "26px 16px 12px", background: "linear-gradient(to top, rgba(4,12,28,0.92) 0%, rgba(4,12,28,0.55) 55%, transparent 100%)" }}>
        <div style={{ fontSize: 12.5, color: "#f1f5f9", lineHeight: 1.5, fontWeight: 500 }}>{T(m.caption, en)}</div>
      </figcaption>

      {/* Credit / license chip (attribution-by-link) */}
      <a href={filePage(m.file)} target="_blank" rel="noopener noreferrer"
        style={{ position: "absolute", top: 10, right: 10, display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 8px", borderRadius: 999, background: "rgba(4,12,28,0.7)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.15)", fontFamily: "'IBM Plex Mono',monospace", fontSize: 9.5, color: "rgba(255,255,255,0.8)", textDecoration: "none", letterSpacing: 0.3 }}>
        {m.credit} · {m.license} ↗
      </a>

      {/* "FOTO" corner tag */}
      <span aria-hidden="true" style={{ position: "absolute", top: 10, left: 10, fontFamily: "'IBM Plex Mono',monospace", fontSize: 9.5, letterSpacing: 2, color: EN_ACCENT.turquoise, background: "rgba(4,12,28,0.6)", borderRadius: 6, padding: "2px 7px", border: "1px solid rgba(0,181,168,0.3)" }}>
        {en ? "PHOTO" : "FOTO"}
      </span>

      <style>{`.energia-media-img{transition:transform .8s cubic-bezier(.2,.6,.2,1)}figure:hover .energia-media-img{transform:scale(1.05)}@media (prefers-reduced-motion: reduce){.energia-media-img{transition:none}figure:hover .energia-media-img{transform:none}}`}</style>
    </figure>
  );
}

/* ── Two-up media row (responsive) ── */
export function MediaRow({ ids, en, height = 240 }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, 280px), 1fr))`, gap: 14 }}>
      {ids.map((id, i) => <MediaFigure key={id} id={id} en={en} height={height} eager={i === 0} />)}
    </div>
  );
}
