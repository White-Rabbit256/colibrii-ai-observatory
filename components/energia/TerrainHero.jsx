"use client";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { PLANTS_GEO, CR_OUTLINE_GEO } from "./crGeo";
import { EN_ACCENT } from "../energiaData";

/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — TerrainHero (satellite + real elevation, spotlit)
   Costa Rica as real satellite imagery over the Mapbox terrain DEM.

   The composition rule, learned from the reference the owner sent:
   the country must read as an OBJECT, not as a screenshot of a
   region. Three things make that happen and all three are load-
   bearing —
     1. satellite-v9, NOT satellite-streets: no country labels, no
        admin borders, no road furniture. Only imagery + our data.
     2. A spotlight mask: a world-sized navy polygon with Costa Rica
        punched out as a hole. Neighbours recede, CR is lit.
     3. Markers sized to be seen over terrain — bright cores with
        white keylines, names always on. Our plant labels replace
        the basemap labels we removed.

   Requires NEXT_PUBLIC_MAPBOX_TOKEN. Without it this renders
   nothing and EnergiaDeep falls back to Hero3D.

   Mapbox ToS: attribution control stays mounted (restyled only).
   Page scroll always wins (scrollZoom off; compact kills drag).
   Honours prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════════ */

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const NAVY = EN_ACCENT.navy;       // #0A1F3F
const NAVY2 = EN_ACCENT.navy2 || "#10294f";
const TURQ = EN_ACCENT.turquoise;  // #00B5A8
const GLOW = EN_ACCENT.glow;       // #22d3ee
const GOLD = EN_ACCENT.gold;       // #F2B135

const GAM = PLANTS_GEO.find((p) => p.kind === "load");
const FEEDERS = PLANTS_GEO.filter((p) => p.kind !== "load");

/* Camera. Padding keeps the country clear of the desktop text column. */
/* Costa Rica's real extent. We fit to THIS instead of guessing a zoom —
   the country then always fills the frame at any container size. Pitch is
   deliberately moderate: past ~40 deg a 300 km-wide country flattens into an
   edge-on slab and the far edge smears. */
const CR_BOUNDS = [[-86.0, 8.0], [-82.4, 11.3]];
const POSE = {
  wide:    { pitch: 36, bearing: 12, padding: { top: 30, bottom: 30, left: 380, right: 40 } },
  compact: { pitch: 32, bearing: 8,  padding: { top: 24, bottom: 24, left: 20, right: 20 } },
};

/* Spotlight: whole world, with Costa Rica as a hole. Everything
   outside the coastline sinks into navy so the country is the subject. */
const spotlightGeoJSON = () => ({
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [
      [[-180, -85], [180, -85], [180, 85], [-180, 85], [-180, -85]],
      CR_OUTLINE_GEO,
    ],
  },
});

const coastGeoJSON = () => ({
  type: "Feature",
  properties: {},
  geometry: { type: "LineString", coordinates: CR_OUTLINE_GEO },
});

/* Transmission lines: every generator feeds the GAM load centre. */
const gridGeoJSON = () => ({
  type: "FeatureCollection",
  features: FEEDERS.map((p) => ({
    type: "Feature",
    properties: { id: p.id },
    geometry: { type: "LineString", coordinates: [[p.lng, p.lat], [GAM.lng, GAM.lat]] },
  })),
});

/* Editorial labelling: a map is not a database dump. Five names crowd the
   Guanacaste corner if every plant is labelled, so we name only the four
   that carry the story and hand-place each one. The rest stay as dots —
   the legend and the chip picker identify them. */
const LABELLED = {
  gam:        { text: "GAM",         side: "below" },
  reventazon: { text: "REVENTAZÓN",  side: "right" },
  miravalles: { text: "MIRAVALLES",  side: "left"  },
  moin:       { text: "MOÍN",        side: "right" },
};

/* Kept for reference; plants now render as native layers (collision-managed). */
function makeMarkerEl(plant) {
  const isLoad = plant.kind === "load";
  const c = isLoad ? GOLD : GLOW;
  const el = document.createElement("div");
  el.className = "en-th-marker" + (isLoad ? " is-load" : "");
  el.setAttribute("role", "img");
  el.setAttribute("aria-label", `${plant.name} — ${plant.detail || ""}`);
  el.innerHTML =
    `<span class="en-th-ring" style="border-color:${c}"></span>` +
    `<span class="en-th-core" style="background:${c}"></span>` +
    `<span class="en-th-label">${plant.name}</span>`;
  return el;
}

export default function TerrainHero({ compact = false }) {
  const holder = useRef(null);
  const mapRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!TOKEN || !holder.current || typeof window === "undefined") return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const pose = compact ? POSE.compact : POSE.wide;

    mapboxgl.accessToken = TOKEN;
    const map = new mapboxgl.Map({
      container: holder.current,
      /* Pure imagery — no labels, borders or roads. Critical: the streets
         variant made this read as a generic map screenshot. */
      style: "mapbox://styles/mapbox/satellite-v9",
      bounds: CR_BOUNDS,
      fitBoundsOptions: { padding: pose.padding },
      pitch: pose.pitch,
      bearing: pose.bearing,
      scrollZoom: false,
      boxZoom: false,
      doubleClickZoom: false,
      dragPan: !compact,
      dragRotate: !compact,
      touchZoomRotate: false,
      touchPitch: false,
      keyboard: false,
      attributionControl: { compact: true },
      antialias: true,
      fadeDuration: 200,
    });
    mapRef.current = map;

    const markers = [];

    map.on("style.load", () => {
      /* Real elevation, pushed hard enough that the cordillera reads */
      /* NO setTerrain here, deliberately. Terrain displaces the imagery in
         3D while DOM markers stay at sea level, so marks drift off their
         true coordinates (GAM and Moín landed in the ocean). On a planar
         map the projection is exact at any pitch, and the satellite
         imagery carries its own relief shading anyway. */

      map.setFog({
        color: NAVY,
        "high-color": NAVY2,
        "horizon-blend": 0.2,
        "space-color": "#060f22",
        "star-intensity": 0.05,
      });

      /* Coastline rim so the lit country has a crisp edge */
      map.addSource("th-coast", { type: "geojson", data: coastGeoJSON() });
      map.addLayer({
        id: "th-coast", type: "line", source: "th-coast",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": "#8fd8e8", "line-width": 0.7, "line-opacity": 0.28 },
      });

      /* Transmission network — thick enough to read over imagery */
      map.addSource("th-grid", { type: "geojson", data: gridGeoJSON() });
      map.addLayer({
        id: "th-grid-core", type: "line", source: "th-grid",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": "#bfe9f5", "line-width": 0.8, "line-opacity": 0.4 },
      });

      /* Plants as small precise marks in the brand typeface. Mapbox's glyph
         server only serves fonts uploaded to the style, so symbol layers
         cannot render IBM Plex Mono — DOM markers can, and with only nine
         points hand-placed labels beat an auto-placer anyway. */
      PLANTS_GEO.forEach((p) => {
        const lab = LABELLED[p.id];
        const el = document.createElement("div");
        el.className = "th-pt" + (p.kind === "load" ? " is-load" : "");
        el.setAttribute("role", "img");
        el.setAttribute("aria-label", `${p.name} — ${p.detail || ""}`);
        el.innerHTML =
          '<span class="th-ring"></span><span class="th-dot"></span>' +
          (lab ? `<span class="th-lab th-lab--${lab.side}">${lab.text}</span>` : "");
        markers.push(
          new mapboxgl.Marker({ element: el, anchor: "center" })
            .setLngLat([p.lng, p.lat]).addTo(map)
        );
      });

      setReady(true);
    });

    const ro = new ResizeObserver(() => map.resize());
    ro.observe(holder.current);

    return () => {
      ro.disconnect();
      markers.forEach((m) => m.remove());
      map.remove();
      mapRef.current = null;
    };
  }, [compact]);

  if (!TOKEN) return null;

  return (
    <div
      aria-label="Costa Rica — terreno satelital y red eléctrica"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      <div ref={holder} style={{ position: "absolute", inset: 0 }} />

      {/* Edge vignette so the map melts into the hero band */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(125% 95% at 55% 42%, transparent 52%, rgba(6,15,34,0.38) 84%, rgba(6,15,34,0.66) 100%)",
      }} />
      {/* Fade-in over the navy base — no flash of half-loaded tiles */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `linear-gradient(160deg, ${NAVY} 0%, ${NAVY2} 55%, #0a1830 100%)`,
        opacity: ready ? 0 : 1, transition: "opacity .9s ease",
      }} />

      <style>{`
        /* Precise editorial mark: a small solid dot inside a hairline ring.
           No glow halos — those read as dashboard, not publication. */
        .th-pt { position: relative; width: 15px; height: 15px; display: flex;
                 align-items: center; justify-content: center; pointer-events: none; }
        .th-dot { position: absolute; width: 5px; height: 5px; border-radius: 50%;
                  background: #fff; box-shadow: 0 0 3px rgba(0,0,0,0.7); }
        .th-ring { position: absolute; inset: 0; border-radius: 50%;
                   border: 1px solid rgba(255,255,255,0.7); }
        .th-pt.is-load { width: 19px; height: 19px; }
        .th-pt.is-load .th-dot { width: 7px; height: 7px; background: ${GOLD};
                                 box-shadow: 0 0 6px rgba(242,177,53,0.8); }
        .th-pt.is-load .th-ring { border-color: ${GOLD}; border-width: 1.2px; }

        /* Labels in the section's own mono, small and letter-spaced, with a
           soft shadow rather than the heavy black halo Mapbox draws. */
        .th-lab {
          position: absolute; white-space: nowrap;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9px; letter-spacing: 1.3px; font-weight: 500;
          color: rgba(255,255,255,0.94);
          text-shadow: 0 1px 3px rgba(0,0,0,0.85), 0 0 10px rgba(0,0,0,0.5);
        }
        .th-lab--below { top: 100%; left: 50%; transform: translateX(-50%); margin-top: 5px; }
        .th-lab--right { left: 100%; top: 50%; transform: translateY(-50%); margin-left: 7px; }
        .th-lab--left  { right: 100%; top: 50%; transform: translateY(-50%); margin-right: 7px; }
        .th-pt.is-load .th-lab { color: ${GOLD}; font-size: 10px; letter-spacing: 1.8px; font-weight: 600; }

        /* Mapbox chrome: attribution stays (ToS), restyled to fit */
        .mapboxgl-ctrl-bottom-right, .mapboxgl-ctrl-bottom-left { z-index: 2; }
        .mapboxgl-ctrl-attrib {
          background: rgba(6,15,34,0.55) !important;
          border-radius: 5px 0 0 0;
          font-family: 'IBM Plex Mono', monospace; font-size: 9px;
        }
        .mapboxgl-ctrl-attrib a { color: rgba(255,255,255,0.62) !important; }
        .mapboxgl-ctrl-logo { opacity: 0.35; transform: scale(0.62); transform-origin: bottom left; }
        .mapboxgl-ctrl-attrib-button { opacity: 0.4; transform: scale(0.8); }
        .mapboxgl-canvas:focus { outline: none; }
      `}</style>
    </div>
  );
}
