"use client";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { PLANTS_GEO } from "./crGeo";
import { EN_ACCENT } from "../energiaData";
import { HV_ARCS } from "./hvArcs";
import { DATACENTERS } from "./datacenters";

/* ═══════════════════════════════════════════════════════════════
   ENERGÍA — SatelliteGlobe (real earth, real data)
   The Atlas Global on Mapbox's globe projection: actual satellite
   imagery on a 3D sphere with brand-navy atmosphere, carrying the
   SAME curated data layers as PowerGlobe — 22 HV interconnections
   (hvArcs.js, great-circle geometry), 26 AI/data-centre hubs
   (datacenters.js, sized by est. MW), the CR plant set and the
   Cañas·SIEPAC gold beacon. Mundo/Costa Rica camera toggle and
   layer chips preserved.

   Token-gated (NEXT_PUBLIC_MAPBOX_TOKEN): without it EnergiaDeep
   keeps rendering PowerGlobe, so nothing can break. Page scroll
   always wins (scrollZoom off); drag-to-rotate on; slow idle spin
   unless prefers-reduced-motion. Mapbox attribution retained.
   ═══════════════════════════════════════════════════════════════ */

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const NAVY = EN_ACCENT.navy;
const NAVY2 = EN_ACCENT.navy2 || "#10294f";
const TURQ = EN_ACCENT.turquoise;
const GLOW = EN_ACCENT.glow;
const GOLD = EN_ACCENT.gold;

const ARC_COLORS = { siepac: GOLD, hvdc: "#67E4F5", ac: TURQ, planned: "#8fb4d8" };
const CANAS = { lng: -85.09, lat: 10.43 };

const VIEWS = {
  mundo: { center: [-60, 16], zoom: 1.55, pitch: 0, bearing: 0 },
  cr: { center: [-84.2, 9.9], zoom: 6.1, pitch: 42, bearing: 12 },
};

/* Great-circle interpolation so long HVDC corridors curve over the sphere
   instead of slicing through it as straight projected lines. */
function greatCircle(a, b, segments = 64) {
  const d2r = Math.PI / 180, r2d = 180 / Math.PI;
  const lat1 = a[1] * d2r, lon1 = a[0] * d2r, lat2 = b[1] * d2r, lon2 = b[0] * d2r;
  const d = 2 * Math.asin(Math.sqrt(
    Math.sin((lat2 - lat1) / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin((lon2 - lon1) / 2) ** 2
  ));
  if (d < 1e-9) return [a, b];
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const f = i / segments;
    const A = Math.sin((1 - f) * d) / Math.sin(d);
    const B = Math.sin(f * d) / Math.sin(d);
    const x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2);
    const y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2);
    const z = A * Math.sin(lat1) + B * Math.sin(lat2);
    pts.push([Math.atan2(y, x) * r2d, Math.atan2(z, Math.sqrt(x * x + y * y)) * r2d]);
  }
  return pts;
}

const arcsGeoJSON = () => ({
  type: "FeatureCollection",
  features: HV_ARCS.map((a) => ({
    type: "Feature",
    properties: { id: a.id, kind: a.kind, mw: a.mw },
    geometry: {
      type: "LineString",
      coordinates: greatCircle([a.startLng, a.startLat], [a.endLng, a.endLat]),
    },
  })),
});

const hubsGeoJSON = (en) => ({
  type: "FeatureCollection",
  features: DATACENTERS.map((d) => ({
    type: "Feature",
    properties: {
      name: en ? d.name.en : d.name.es,
      tier: d.tier,
      mw: d.demandMw,
      r: Math.max(3, Math.min(11, Math.sqrt(d.demandMw) / 7)),
    },
    geometry: { type: "Point", coordinates: [d.lng, d.lat] },
  })),
});

const plantsGeoJSON = () => ({
  type: "FeatureCollection",
  features: PLANTS_GEO.map((p) => ({
    type: "Feature",
    properties: { name: p.name, kind: p.kind, isLoad: p.kind === "load" ? 1 : 0 },
    geometry: { type: "Point", coordinates: [p.lng, p.lat] },
  })),
});

const CHIP = (active) => ({
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 10.5, letterSpacing: 0.5, minHeight: 34, padding: "5px 12px",
  borderRadius: 999, cursor: "pointer",
  color: active ? "#06281f" : "rgba(255,255,255,0.78)",
  background: active ? `linear-gradient(135deg, ${TURQ}, ${GLOW})` : "rgba(6,15,34,0.62)",
  border: `1px solid ${active ? "transparent" : "rgba(0,181,168,0.35)"}`,
  backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
  transition: "all .25s ease",
});

export default function SatelliteGlobe({ en = false, compact = false }) {
  const holder = useRef(null);
  const mapRef = useRef(null);
  const spinRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [view, setView] = useState("mundo");
  const [layers, setLayers] = useState({ red: true, hubs: true, plantas: true });

  useEffect(() => {
    if (!TOKEN || !holder.current || typeof window === "undefined") return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    mapboxgl.accessToken = TOKEN;
    const map = new mapboxgl.Map({
      container: holder.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      projection: "globe",
      center: VIEWS.mundo.center,
      zoom: VIEWS.mundo.zoom,
      scrollZoom: false,
      boxZoom: false,
      doubleClickZoom: false,
      dragPan: true,
      dragRotate: false,
      touchZoomRotate: false,
      touchPitch: false,
      keyboard: false,
      attributionControl: true,
      antialias: true,
    });
    mapRef.current = map;

    const markers = [];

    map.on("style.load", () => {
      /* Brand atmosphere: the sphere floats in section navy, not Mapbox blue */
      map.setFog({
        color: NAVY,
        "high-color": NAVY2,
        "horizon-blend": 0.04,
        "space-color": "#050d1e",
        "star-intensity": 0.35,
      });

      /* HV interconnections — glow + core, colored by kind */
      map.addSource("sg-arcs", { type: "geojson", data: arcsGeoJSON() });
      map.addLayer({
        id: "sg-arcs-glow", type: "line", source: "sg-arcs",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": ["match", ["get", "kind"],
            "siepac", GOLD, "hvdc", "#67E4F5", "ac", TURQ, "planned", "#8fb4d8", TURQ],
          "line-width": 3.4, "line-opacity": 0.2, "line-blur": 2.5,
        },
      });
      map.addLayer({
        id: "sg-arcs-core", type: "line", source: "sg-arcs",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": ["match", ["get", "kind"],
            "siepac", GOLD, "hvdc", "#67E4F5", "ac", TURQ, "planned", "#8fb4d8", TURQ],
          "line-width": ["match", ["get", "kind"], "siepac", 1.7, 1.1],
          "line-opacity": ["match", ["get", "kind"], "planned", 0.45, 0.8],
          "line-dasharray": ["match", ["get", "kind"], "planned", ["literal", [1.5, 2.5]], ["literal", [1, 0]]],
        },
      });

      /* AI/data-centre hubs — sized by est. MW, tier-1 ringed */
      map.addSource("sg-hubs", { type: "geojson", data: hubsGeoJSON(en) });
      map.addLayer({
        id: "sg-hubs-halo", type: "circle", source: "sg-hubs",
        paint: {
          "circle-radius": ["+", ["get", "r"], 4],
          "circle-color": GLOW, "circle-opacity": 0.12,
        },
      });
      map.addLayer({
        id: "sg-hubs-core", type: "circle", source: "sg-hubs",
        paint: {
          "circle-radius": ["get", "r"],
          "circle-color": "#eafcff",
          "circle-opacity": 0.92,
          "circle-stroke-width": ["match", ["get", "tier"], 1, 1.6, 0.8],
          "circle-stroke-color": ["match", ["get", "tier"], 1, GOLD, GLOW],
        },
      });

      /* CR plants — visible when zoomed toward Costa Rica */
      map.addSource("sg-plants", { type: "geojson", data: plantsGeoJSON() });
      map.addLayer({
        id: "sg-plants", type: "circle", source: "sg-plants",
        minzoom: 4.5,
        paint: {
          "circle-radius": ["match", ["get", "isLoad"], 1, 6, 4],
          "circle-color": ["match", ["get", "isLoad"], 1, GOLD, GLOW],
          "circle-opacity": 0.95,
          "circle-stroke-width": 1.2,
          "circle-stroke-color": "rgba(255,255,255,0.75)",
        },
      });

      /* Cañas — SIEPAC gold beacon (DOM marker so it can pulse) */
      const beacon = document.createElement("div");
      beacon.className = "sg-beacon";
      beacon.setAttribute("role", "img");
      beacon.setAttribute("aria-label", en ? "Cañas — SIEPAC node, Costa Rica" : "Cañas — nodo SIEPAC, Costa Rica");
      beacon.innerHTML = `<span class="sg-beacon-ring"></span><span class="sg-beacon-core"></span><span class="sg-beacon-label">CAÑAS · SIEPAC</span>`;
      markers.push(new mapboxgl.Marker({ element: beacon, anchor: "center" }).setLngLat([CANAS.lng, CANAS.lat]).addTo(map));

      /* Hub tooltips */
      const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 10, className: "sg-popup" });
      map.on("mouseenter", "sg-hubs-core", (e) => {
        const f = e.features?.[0];
        if (!f) return;
        map.getCanvas().style.cursor = "pointer";
        popup.setLngLat(f.geometry.coordinates)
          .setHTML(`<strong>${f.properties.name}</strong><br/>~${f.properties.mw} MW (est.)`)
          .addTo(map);
      });
      map.on("mouseleave", "sg-hubs-core", () => {
        map.getCanvas().style.cursor = "";
        popup.remove();
      });

      setReady(true);

      /* Idle spin — pauses on interaction, honours reduced-motion */
      if (!reduced) {
        let userBusy = false;
        map.on("mousedown", () => { userBusy = true; });
        map.on("mouseup", () => { userBusy = false; });
        map.on("touchstart", () => { userBusy = true; });
        map.on("touchend", () => { userBusy = false; });
        spinRef.current = setInterval(() => {
          if (userBusy || map.getZoom() > 3.2 || document.hidden) return;
          const c = map.getCenter();
          map.easeTo({ center: [c.lng + 4, c.lat], duration: 2400, easing: (t) => t });
        }, 2400);
      }
    });

    const ro = new ResizeObserver(() => map.resize());
    ro.observe(holder.current);

    return () => {
      if (spinRef.current) clearInterval(spinRef.current);
      ro.disconnect();
      markers.forEach((m) => m.remove());
      map.remove();
      mapRef.current = null;
    };
  }, [en]);

  /* Camera toggle */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const pose = VIEWS[view];
    if (reduced) map.jumpTo(pose);
    else map.flyTo({ ...pose, duration: 2200, essential: false });
  }, [view, ready]);

  /* Layer visibility */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    const vis = (on) => (on ? "visible" : "none");
    ["sg-arcs-glow", "sg-arcs-core"].forEach((id) => map.getLayer(id) && map.setLayoutProperty(id, "visibility", vis(layers.red)));
    ["sg-hubs-halo", "sg-hubs-core"].forEach((id) => map.getLayer(id) && map.setLayoutProperty(id, "visibility", vis(layers.hubs)));
    if (map.getLayer("sg-plants")) map.setLayoutProperty("sg-plants", "visibility", vis(layers.plantas));
  }, [layers, ready]);

  if (!TOKEN) return null;

  const H = compact ? "min(72vw, 420px)" : 560;
  return (
    <div style={{ position: "relative", height: H, borderRadius: 16, overflow: "hidden", background: `linear-gradient(160deg, ${NAVY}, ${NAVY2})`, border: "1px solid rgba(0,181,168,0.3)" }}>
      <div ref={holder} style={{ position: "absolute", inset: 0 }} />

      {/* Loading veil */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `linear-gradient(160deg, ${NAVY}, ${NAVY2})`,
        opacity: ready ? 0 : 1, transition: "opacity .9s ease",
      }} />

      {/* View + layer controls */}
      <div style={{ position: "absolute", top: 12, right: 12, zIndex: 3, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
        <div style={{ display: "flex", gap: 6 }}>
          <button style={CHIP(view === "mundo")} onClick={() => setView("mundo")} aria-pressed={view === "mundo"}>{en ? "World" : "Mundo"}</button>
          <button style={CHIP(view === "cr")} onClick={() => setView("cr")} aria-pressed={view === "cr"}>Costa Rica</button>
        </div>
        <button style={CHIP(layers.plantas)} onClick={() => setLayers(l => ({ ...l, plantas: !l.plantas }))} aria-pressed={layers.plantas}>● {en ? "Plants" : "Plantas"}</button>
        <button style={CHIP(layers.red)} onClick={() => setLayers(l => ({ ...l, red: !l.red }))} aria-pressed={layers.red}>● {en ? "Grid" : "Red"}</button>
        <button style={CHIP(layers.hubs)} onClick={() => setLayers(l => ({ ...l, hubs: !l.hubs }))} aria-pressed={layers.hubs}>● Hubs IA</button>
      </div>

      {/* Title chip */}
      <div style={{ position: "absolute", top: 12, left: 14, zIndex: 3, pointerEvents: "none" }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 2, color: GLOW }}>
          {en ? "GLOBAL GENERATION ATLAS · SATELLITE" : "ATLAS GLOBAL DE GENERACIÓN · SATÉLITE"}
        </div>
        <div style={{ marginTop: 4, fontSize: 11, color: "rgba(255,255,255,0.55)", maxWidth: 380 }}>
          {en
            ? "Real imagery (Mapbox/Maxar) · 22 HV interconnections · 26 AI hubs (est.)"
            : "Imagen real (Mapbox/Maxar) · 22 interconexiones AT · 26 hubs IA (est.)"}
        </div>
      </div>

      <style>{`
        .sg-beacon { position: relative; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; pointer-events: none; }
        .sg-beacon-core { position: absolute; width: 8px; height: 8px; border-radius: 50%; background: ${GOLD}; box-shadow: 0 0 12px ${GOLD}; }
        .sg-beacon-ring { position: absolute; inset: 0; border-radius: 50%; border: 1.5px solid ${GOLD}; animation: sgPulse 3s ease-out infinite; }
        .sg-beacon-label { position: absolute; top: 100%; left: 50%; transform: translateX(-50%); margin-top: 4px; white-space: nowrap; font-family: 'IBM Plex Mono', monospace; font-size: 9px; letter-spacing: 1.2px; color: ${GOLD}; text-shadow: 0 1px 4px rgba(0,0,0,0.9); }
        @keyframes sgPulse { 0% { transform: scale(1); opacity: .8; } 70%, 100% { transform: scale(2.4); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .sg-beacon-ring { animation: none; } }
        .sg-popup .mapboxgl-popup-content {
          background: rgba(6,21,46,0.92); color: #eaf2ff; border: 1px solid rgba(34,211,238,0.4);
          border-radius: 9px; padding: 8px 11px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; line-height: 1.5;
        }
        .sg-popup .mapboxgl-popup-tip { border-top-color: rgba(6,21,46,0.92) !important; }
        .mapboxgl-ctrl-attrib { background: rgba(6,15,34,0.55) !important; border-radius: 5px 0 0 0; font-family: 'IBM Plex Mono', monospace; font-size: 9px; }
        .mapboxgl-ctrl-attrib a { color: rgba(255,255,255,0.62) !important; }
        .mapboxgl-ctrl-logo { opacity: 0.55; transform: scale(0.85); transform-origin: bottom left; }
        .mapboxgl-canvas:focus { outline: none; }
      `}</style>
    </div>
  );
}
