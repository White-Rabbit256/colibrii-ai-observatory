"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { TH, TH_DARK, CO, CC, IND_MAP, CUR, GOV, DM, TABS, PARTNERS, cacheGet, cacheSet, mm, av, sco, sla } from "../data";
import { LoadCard, Grid, TabContent } from "../ui";
/* ── Lazy-loaded tab views (reduces initial JS bundle) ── */
const Home = dynamic(() => import("../HomeView").then(m => ({ default: m.Home })), { loading: () => <LoadCard d={0.02} /> });
const Algo = dynamic(() => import("../AlgoSecurityLeg").then(m => ({ default: m.Algo })), { loading: () => <LoadCard d={0.02} /> });
const SecTab = dynamic(() => import("../AlgoSecurityLeg").then(m => ({ default: m.SecTab })), { loading: () => <LoadCard d={0.02} /> });
const Leg = dynamic(() => import("../AlgoSecurityLeg").then(m => ({ default: m.Leg })), { loading: () => <LoadCard d={0.02} /> });
const Edu = dynamic(() => import("../EduGlossaryAbout").then(m => ({ default: m.Edu })), { loading: () => <LoadCard d={0.02} /> });
const Glos = dynamic(() => import("../EduGlossaryAbout").then(m => ({ default: m.Glos })), { loading: () => <LoadCard d={0.02} /> });
const Abt = dynamic(() => import("../EduGlossaryAbout").then(m => ({ default: m.Abt })), { loading: () => <LoadCard d={0.02} /> });
const Pymes = dynamic(() => import("../PymesAI").then(m => ({ default: m.Pymes })), { loading: () => <LoadCard d={0.02} /> });
const MediaView = dynamic(() => import("../MediaIntelligence").then(m => ({ default: m.MediaIntelligence })), { loading: () => <LoadCard d={0.02} /> });
import { PortalSidebar } from "./PortalSidebar";
import { BottomNav } from "./BottomNav";
const IndicatorDrawer = dynamic(() => import("./IndicatorDrawer").then(m => ({ default: m.IndicatorDrawer })), { ssr: false });
import { Icon } from "../system/Icon";
import { FACTS } from "../../data/facts";

/* ── Lazy-loaded heavy components (recharts / react-simple-maps) ── */
const IdxCompare = dynamic(() => import("../IndexCompareViews").then(m => ({ default: m.Idx })), { loading: () => <LoadCard d={0.02} /> });
const CompareView = dynamic(() => import("../IndexCompareViews").then(m => ({ default: m.Compare })), { loading: () => <LoadCard d={0.02} /> });
const Countries = dynamic(() => import("../CountryProfiles").then(m => ({ default: m.Countries })), { loading: () => <LoadCard d={0.02} /> });
const Simulator = dynamic(() => import("../PolicySimulator").then(m => ({ default: m.Simulator })), { loading: () => <LoadCard d={0.02} /> });
const ZF = dynamic(() => import("../FreeZonesPhysicalAI").then(m => ({ default: m.ZF })), { loading: () => <LoadCard d={0.02} /> });
const PAI = dynamic(() => import("../FreeZonesPhysicalAI").then(m => ({ default: m.PAI })), { loading: () => <LoadCard d={0.02} /> });

/* ── Lazy-loaded IMPACT tabs (UN/ITU/SDG) ── */
const SDGView = dynamic(() => import("../SDGAIForGood").then(m => ({ default: m.SDG })), { loading: () => <LoadCard d={0.02} /> });
const ReadinessView = dynamic(() => import("../ITUReadiness").then(m => ({ default: m.Readiness })), { loading: () => <LoadCard d={0.02} /> });
const GovernanceView = dynamic(() => import("../GlobalGovernance").then(m => ({ default: m.Governance })), { loading: () => <LoadCard d={0.02} /> });
const ShowcaseView = dynamic(() => import("../ImpactShowcase").then(m => ({ default: m.Showcase })), { loading: () => <LoadCard d={0.02} /> });

/* ── Lazy-loaded SECTORAL IMPACT tabs (AI for Good Report) ── */
const FoodView = dynamic(() => import("../FoodSecurity").then(m => ({ default: m.FoodSecurity })), { loading: () => <LoadCard d={0.02} /> });
const HealthView = dynamic(() => import("../HealthAI").then(m => ({ default: m.HealthAI })), { loading: () => <LoadCard d={0.02} /> });
const InfraView = dynamic(() => import("../InfraSmartCities").then(m => ({ default: m.InfraSmartCities })), { loading: () => <LoadCard d={0.02} /> });
const ClimateView = dynamic(() => import("../EnvironmentalAI").then(m => ({ default: m.EnvironmentalAI })), { loading: () => <LoadCard d={0.02} /> });

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Portal Shell v17
   Sidebar navigation · Indicator drawer · 14 tabs · 4 APIs
   Refactored from Portal.jsx — ALL state/API logic preserved
   ═══════════════════════════════════════════════════════════════ */

const WB = "https://api.worldbank.org/v2/country";
const GDELT_URL = "https://api.gdeltproject.org/api/v2/doc/doc?query=%22artificial+intelligence%22+%22costa+rica%22&mode=artlist&maxrecords=24&format=json&sort=datedesc&timespan=7d";
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
  const govData = GOV;
  const [mobileNav, setMobileNav] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerIndicator, setDrawerIndicator] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [dataWarning, setDataWarning] = useState(null);

  /* ── THEME TOKENS ── */
  const t = dark ? TH_DARK : TH;

  /* ── INIT (single mount effect: language + theme + scroll listener) ── */
  useEffect(() => {
    const sLang = typeof window !== "undefined" && localStorage.getItem("clb_lang");
    if (sLang === "en") setEn(true);
    const sTheme = typeof window !== "undefined" && localStorage.getItem("clb_theme");
    if (sTheme === "dark") setDark(true);
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── LANGUAGE PERSISTENCE ── */
  useEffect(() => {
    localStorage.setItem("clb_lang", en ? "en" : "es");
  }, [en]);

  /* ── DARK MODE PERSISTENCE ── */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("clb_theme", dark ? "dark" : "light");
  }, [dark]);

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
      const failures = [
        wbRes.status !== "fulfilled" || !wbRes.value || Object.keys(wbRes.value).length === 0 ? "World Bank" : null,
        gdeltRes.status !== "fulfilled" ? "GDELT News" : null,
        xrRes.status !== "fulfilled" ? "Exchange Rate" : null,
      ].filter(Boolean);
      if (failures.length > 0) setDataWarning(failures);
      setLoading(false);
    })();
  }, [fetchWB, fetchGDELT, fetchXR]);

  /* ── TAB PROPS ── */
  const tp = useMemo(() => ({
    en, t, idx, crS, crR, board, news, loading, xr, govData, dark, setTab,
    selectedCountry, setSelectedCountry,
    onIndicatorClick: (indicator) => { setDrawerIndicator(indicator); setDrawerOpen(true); },
    onExplore: () => setMobileNav(true)
  }), [en, t, idx, crS, crR, board, news, loading, xr, govData, dark, selectedCountry]);

  /* ── RENDER TAB ── */
  const renderTab = () => {
    if (loading) return (
      <div>
        <div style={{ marginBottom: 24 }}>
          <div className="skeleton" style={{ width: 120, height: 10, marginBottom: 8 }} />
          <div className="skeleton" style={{ width: "70%", height: 24, marginBottom: 8 }} />
          <div className="skeleton" style={{ width: "90%", height: 14, marginBottom: 4 }} />
          <div className="skeleton" style={{ width: "60%", height: 14 }} />
        </div>
        <Grid cols="repeat(auto-fit,minmax(200px,1fr))" gap={16}>
          {[1, 2, 3, 4, 5, 6].map(i => <LoadCard key={i} />)}
        </Grid>
        <div style={{ marginTop: 24 }}>
          <div className="skeleton" style={{ width: 100, height: 10, marginBottom: 8 }} />
          <div className="skeleton" style={{ width: "100%", height: 200, borderRadius: 12 }} />
        </div>
      </div>
    );
    switch (tab) {
      case "home": return <Home {...tp} />;
      case "media": return <MediaView {...tp} />;
      case "idx": return <IdxCompare {...tp} />;
      case "cmp": return <CompareView {...tp} />;
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
      /* ── IMPACT tabs (UN/ITU/SDG) ── */
      case "sdg": return <SDGView {...tp} />;
      case "readiness": return <ReadinessView {...tp} />;
      case "governance": return <GovernanceView {...tp} />;
      case "showcase": return <ShowcaseView {...tp} />;
      /* ── SECTORAL IMPACT tabs (AI for Good Report) ── */
      case "food": return <FoodView {...tp} />;
      case "health": return <HealthView {...tp} />;
      case "infra": return <InfraView {...tp} />;
      case "climate": return <ClimateView {...tp} />;
      default: return <Home {...tp} />;
    }
  };

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

        {/* ── DATA WARNING BANNER ── */}
        {dataWarning && (
          <div style={{ padding: "8px 16px", background: dark ? "#422006" : "#fffbeb", borderBottom: `1px solid ${dark ? "#854d0e" : "#fde68a"}`, display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: dark ? "#fbbf24" : "#92400e" }}>
            <span>⚠️</span>
            <span>{en ? `Some data sources are temporarily unavailable (${dataWarning.join(", ")}). Showing cached or partial data.` : `Algunas fuentes de datos no disponibles temporalmente (${dataWarning.join(", ")}). Mostrando datos en caché o parciales.`}</span>
            <button onClick={() => setDataWarning(null)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "inherit", padding: 4 }}>×</button>
          </div>
        )}

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
            © 2026 {FACTS.org} · {en ? `Built by ${FACTS.founder} & ${FACTS.cofounder} for Costa Rica` : `Construido por ${FACTS.founder} & ${FACTS.cofounder} para Costa Rica`}
          </p>
          <p style={{ fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>
            {en ? "Data from public international sources · Observatory analysis © 2026 Colibrii Labs · CC BY-NC 4.0" : "Datos de fuentes internacionales públicas · Análisis observatorio © 2026 Colibrii Labs · CC BY-NC 4.0"}
          </p>
        </footer>

        {/* ── MOBILE BOTTOM NAV ── */}
        <BottomNav tab={tab} setTab={setTab} en={en} setEn={setEn} t={t} dark={dark} setDark={setDark} onMoreClick={() => setMobileNav(true)} />
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
