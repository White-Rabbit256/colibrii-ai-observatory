"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { TH, TH_DARK, CO, CC, IND_MAP, CUR, GOV, DM, TABS, PARTNERS, cacheGet, cacheSet, mm, av, sco, sla } from "../data";
import { LoadCard, Grid, TabContent } from "../ui";
import { Home } from "../HomeView";
import { Idx, Compare } from "../IndexCompareViews";
import { Countries } from "../CountryProfiles";
import { Simulator } from "../PolicySimulator";
import { ZF, PAI } from "../FreeZonesPhysicalAI";
import { Algo, SecTab, Leg } from "../AlgoSecurityLeg";
import { Edu, Glos, Abt } from "../EduGlossaryAbout";
import { Pymes } from "../PymesAI";
import { MediaIntelligence } from "../MediaIntelligence";
import { PortalSidebar } from "./PortalSidebar";
import { BottomNav } from "./BottomNav";
import { IndicatorDrawer } from "./IndicatorDrawer";
import { Icon } from "../system/Icon";
import { FACTS } from "../../data/facts";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Portal Shell v17
   Sidebar navigation · Indicator drawer · 14 tabs · 4 APIs
   Refactored from Portal.jsx — ALL state/API logic preserved
   ═══════════════════════════════════════════════════════════════ */

const WB = "https://api.worldbank.org/v2/country";
const GDELT_URL = "https://api.gdeltproject.org/api/v2/doc/doc?query=%22artificial+intelligence%22+%22costa+rica%22&mode=artlist&maxrecords=24&format=json&sort=datedesc&timespan=72h";
const XR_URL = "https://open.er-api.com/v6/latest/USD";

export default function PortalShell() {
  /* ── STATE ── */
  const [en, setEn] = useState(false);
  const [dark, setDark] = useState(false);
  const [tab, setTab] = useState("home");
  const [idx, setIdx] = useState({});
  const [crS, setCrS] = useState(null);
  const [crR, setCrR] = useState(null);
  const [board, setBoard] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [xr, setXr] = useState(null);
  const [govData] = useState(GOV);
  const [mobileNav, setMobileNav] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerIndicator, setDrawerIndicator] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  /* ── THEME TOKENS ── */
  const t = dark ? TH_DARK : TH;

  /* ── DARK MODE ── */
  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("clb_theme");
    if (saved === "dark") setDark(true);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("clb_theme", dark ? "dark" : "light");
  }, [dark]);

  /* ── SCROLL-TO-TOP ── */
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── SCROLL RESET ON TAB CHANGE ── */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [tab]);

  /* ── API FETCHING (preserved exactly from Portal.jsx) ── */
  const fetchWB = useCallback(async () => {
    const cached = cacheGet("wb");
    if (cached) return cached;
    const codes = CC.join(";");
    const inds = Object.keys(IND_MAP);
    const reqs = inds.map(ind => fetch(`${WB}/${codes}/indicator/${ind}?format=json&per_page=500&date=2018:2024&source=2`).then(r => r.json()).catch(() => null));
    const results = await Promise.allSettled(reqs);
    const raw = {};
    CC.forEach(c => { raw[c] = {}; });
    results.forEach((res, i) => {
      if (res.status !== "fulfilled" || !res.value?.[1]) return;
      const ind = inds[i];
      res.value[1].forEach(row => {
        if (!row.value || !row.countryiso3code || !CC.includes(row.countryiso3code)) return;
        const cc = row.countryiso3code;
        if (!raw[cc][ind] || row.date > raw[cc][ind].year) raw[cc][ind] = { v: row.value, year: row.date };
      });
    });
    const norm = {};
    CC.forEach(c => { norm[c] = {}; });
    inds.forEach(ind => {
      const vals = CC.map(c => raw[c][ind]?.v ?? null);
      const { inv } = IND_MAP[ind];
      const normed = mm(inv ? vals.map(v => v == null ? null : -v) : vals);
      CC.forEach((c, i) => { norm[c][ind] = normed[i]; });
    });
    const scores = {};
    CC.forEach(c => {
      const dims = {};
      Object.entries(DM).forEach(([dk]) => {
        const dimInds = Object.entries(IND_MAP).filter(([, v]) => v.d === dk).map(([k]) => k);
        dims[dk] = av(dimInds.map(ind => norm[c][ind]));
      });
      if (CUR[c]) { dims.D4 = CUR[c].D4; dims.D6 = CUR[c].D6; }
      dims.composite = Object.entries(DM).reduce((s, [dk, { w }]) => s + (dims[dk] ?? 0) * w, 0);
      scores[c] = dims;
    });
    cacheSet("wb", scores);
    return scores;
  }, []);

  const fetchGDELT = useCallback(async () => {
    const cached = cacheGet("gdelt");
    if (cached) return cached;
    try {
      const r = await fetch(GDELT_URL);
      const d = await r.json();
      const articles = d.articles?.slice(0, 24) || [];
      cacheSet("gdelt", articles);
      return articles;
    } catch { return []; }
  }, []);

  const fetchXR = useCallback(async () => {
    const cached = cacheGet("xr");
    if (cached) return cached;
    try {
      const r = await fetch(XR_URL);
      const d = await r.json();
      const rate = d.rates?.CRC;
      if (rate) cacheSet("xr", rate);
      return rate || null;
    } catch { return null; }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [wbRes, gdeltRes, xrRes] = await Promise.allSettled([fetchWB(), fetchGDELT(), fetchXR()]);
      const scores = wbRes.status === "fulfilled" ? wbRes.value : {};
      setIdx(scores);
      if (scores.CRI) setCrS(scores.CRI.composite);
      const sorted = CC.map(c => ({ code: c, ...CO[c], ...scores[c] })).sort((a, b) => (b.composite ?? 0) - (a.composite ?? 0));
      setBoard(sorted);
      const crIdx = sorted.findIndex(x => x.code === "CRI");
      setCrR(crIdx >= 0 ? crIdx + 1 : null);
      setNews(gdeltRes.status === "fulfilled" ? gdeltRes.value : []);
      setXr(xrRes.status === "fulfilled" ? xrRes.value : null);
      setLoading(false);
    })();
  }, [fetchWB, fetchGDELT, fetchXR]);

  /* ── TAB PROPS ── */
  const tp = useMemo(() => ({
    en, t, idx, crS, crR, board, news, loading, xr, govData, dark, setTab,
    selectedCountry, setSelectedCountry,
    onIndicatorClick: (indicator) => { setDrawerIndicator(indicator); setDrawerOpen(true); }
  }), [en, t, idx, crS, crR, board, news, loading, xr, govData, dark, selectedCountry]);

  /* ── RENDER TAB ── */
  const renderTab = () => {
    switch (tab) {
      case "home": return <Home {...tp} />;
      case "media": return <MediaIntelligence {...tp} />;
      case "idx": return <Idx {...tp} />;
      case "cmp": return <Compare {...tp} />;
      case "countries": return <Countries {...tp} />;
      case "sim": return <Simulator {...tp} />;
      case "zf": return <ZF {...tp} />;
      case "pai": return <PAI {...tp} />;
      case "pymes": return <Pymes {...tp} />;
      case "algo": return <Algo {...tp} />;
      case "sec": return <SecTab {...tp} />;
      case "leg": return <Leg {...tp} />;
      case "edu": return <Edu {...tp} />;
      case "glos": return <Glos {...tp} />;
      case "about": return <Abt {...tp} />;
      default: return <Home {...tp} />;
    }
  };

  /* ── LOADING STATE ── */
  if (loading) return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
        <div className="skeleton" style={{ width: 32, height: 32, borderRadius: "50%" }} />
        <div className="skeleton" style={{ width: 200, height: 20 }} />
      </div>
      <Grid cols="repeat(auto-fit,minmax(200px,1fr))" gap={16}>
        {[1, 2, 3, 4, 5, 6].map(i => <LoadCard key={i} />)}
      </Grid>
    </div>
  );

  return (
    <div className="portal-layout">
      {/* ── SKIP TO CONTENT (a11y) ── */}
      <a href="#main-content" className="skip-to-content">{en ? "Skip to content" : "Ir al contenido"}</a>

      {/* ── SIDEBAR ── */}
      <PortalSidebar
        tab={tab}
        setTab={setTab}
        en={en}
        setEn={setEn}
        dark={dark}
        setDark={setDark}
        t={t}
        mobileOpen={mobileNav}
        setMobileOpen={setMobileNav}
      />

      {/* ── MAIN AREA ── */}
      <div className="portal-main">
        {/* Mobile header bar */}
        <header className="portal-mobile-header no-print">
          <button
            className="portal-mobile-menu-btn"
            onClick={() => setMobileNav(true)}
            aria-label="Open menu"
          >
            <Icon name="menu" size={20} color={t.tx2} />
          </button>
          <Link href="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: 6 }} className="portal-mobile-title">
            <img src="/colibrii-logo.png" alt="Colibrii Labs" className="logo-iridescent" style={{ width: 32, height: 32 }} />
            <span style={{ fontWeight: 800, fontFamily: "var(--font-display, 'Playfair Display', serif)", fontSize: 14, color: t.tx }}>Colibrii Labs</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {xr && (
              <span style={{ fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>
                ₡{Math.round(xr - 3)} compra · ₡{Math.round(xr + 3)} venta
              </span>
            )}
          </div>
        </header>

        {/* Desktop top bar with exchange rate */}
        <div className="portal-topbar no-print">
          {xr && (
            <div style={{ fontSize: 11, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", display: "flex", alignItems: "center", gap: 8 }}>
              <span>$1 USD → ₡{Math.round(xr - 3)} {en ? "buy" : "compra"} · ₡{Math.round(xr + 3)} {en ? "sell" : "venta"}</span>
              <span style={{ fontSize: 9, opacity: 0.6 }}>{en ? "(estimated)" : "(estimado)"}</span>
              <span style={{ fontSize: 9, opacity: 0.4 }}>open.er-api.com</span>
            </div>
          )}
          <div style={{ fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>
            {en ? "Zero cookies · Zero tracking" : "Cero cookies · Cero rastreo"}
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <main id="main-content" className="portal-content">
          <AnimatePresence mode="wait">
            <TabContent id={tab} key={tab}>
              {renderTab()}
            </TabContent>
          </AnimatePresence>
        </main>

        {/* ── FOOTER ── */}
        <footer className="portal-footer no-print">
          <p style={{ fontSize: 12, color: t.tx3, marginBottom: 4 }}>
            © 2026 {FACTS.org} · {en ? `Built by ${FACTS.founder} for Costa Rica` : `Construido por ${FACTS.founder} para Costa Rica`}
          </p>
          <p style={{ fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>
            {en ? "Data from public international sources · Observatory analysis © 2026 Colibrii Labs · CC BY-NC 4.0" : "Datos de fuentes internacionales públicas · Análisis observatorio © 2026 Colibrii Labs · CC BY-NC 4.0"}
          </p>
        </footer>

        {/* ── MOBILE BOTTOM NAV ── */}
        <BottomNav tab={tab} setTab={setTab} en={en} t={t} onMoreClick={() => setMobileNav(true)} />
      </div>

      {/* ── INDICATOR DRAWER ── */}
      <IndicatorDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        indicator={drawerIndicator}
        en={en}
        t={t}
      />

      {/* ── SCROLL-TO-TOP ── */}
      <button
        className={`scroll-to-top no-print ${showScrollTop ? "visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={en ? "Scroll to top" : "Ir arriba"}
      >
        ↑
      </button>
    </div>
  );
}
