"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TH, TH_DARK, CO, CC, IND_MAP, CUR, GOV, DM, TABS, PARTNERS, cacheGet, cacheSet, mm, av, sco, sla } from "./data";
import { LoadCard, Sk, Grid, TabContent, PartnerBar } from "./ui";
import { Home } from "./HomeView";
import { Idx, Compare } from "./IndexCompareViews";
import { Countries } from "./CountryProfiles";
import { Simulator } from "./PolicySimulator";
import { ZF, PAI } from "./FreeZonesPhysicalAI";
import { Algo, SecTab, Leg } from "./AlgoSecurityLeg";
import { Edu, Glos, Abt } from "./EduGlossaryAbout";

/* ═══════════════════════════════════════════════════════════════
   COLIBRII LABS — Portal Shell v13
   Dark mode · Framer AnimatePresence · 13 tabs · 4 APIs
   ═══════════════════════════════════════════════════════════════ */

const WB = "https://api.worldbank.org/v2/country";
const GDELT_URL = "https://api.gdeltproject.org/api/v2/doc/doc?query=%22artificial+intelligence%22+%22costa+rica%22&mode=artlist&maxrecords=8&format=json&sort=datedesc&timespan=72h";
const XR_URL = "https://open.er-api.com/v6/latest/USD";

export default function Portal() {
  /* ── STATE ── */
  const [en, setEn] = useState(false);
  const [dark, setDark] = useState(false);
  const [tab, setTab] = useState("home");
  const [idx, setIdx] = useState({});       // { CC: { D1:.., D2:.., ..., composite } }
  const [crS, setCrS] = useState(null);     // CR composite score
  const [crR, setCrR] = useState(null);     // CR rank
  const [board, setBoard] = useState([]);   // sorted leaderboard
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [xr, setXr] = useState(null);       // CRC/USD rate
  const [govData] = useState(GOV);
  const [mobileNav, setMobileNav] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  /* ── THEME TOKENS (reactive to dark mode) ── */
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

  /* ── API FETCHING ── */
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
    // Normalize per indicator
    const norm = {};
    CC.forEach(c => { norm[c] = {}; });
    inds.forEach(ind => {
      const vals = CC.map(c => raw[c][ind]?.v ?? null);
      const { inv } = IND_MAP[ind];
      const normed = mm(inv ? vals.map(v => v == null ? null : -v) : vals);
      CC.forEach((c, i) => { norm[c][ind] = normed[i]; });
    });
    // Aggregate per dimension
    const scores = {};
    CC.forEach(c => {
      const dims = {};
      Object.entries(DM).forEach(([dk]) => {
        const dimInds = Object.entries(IND_MAP).filter(([, v]) => v.d === dk).map(([k]) => k);
        dims[dk] = av(dimInds.map(ind => norm[c][ind]));
      });
      // Inject curated D4, D6
      if (CUR[c]) { dims.D4 = CUR[c].D4; dims.D6 = CUR[c].D6; }
      // Composite
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
      const articles = d.articles?.slice(0, 8) || [];
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
    en, t, idx, crS, crR, board, news, loading, xr, govData, dark, setTab
  }), [en, t, idx, crS, crR, board, news, loading, xr, govData, dark]);

  /* ── RENDER TAB ── */
  const renderTab = () => {
    switch (tab) {
      case "home": return <Home {...tp} />;
      case "idx": return <Idx {...tp} />;
      case "cmp": return <Compare {...tp} />;
      case "countries": return <Countries {...tp} />;
      case "sim": return <Simulator {...tp} />;
      case "zf": return <ZF {...tp} />;
      case "pai": return <PAI {...tp} />;
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
    <div style={{ minHeight: "100vh" }}>
      {/* ── SKIP TO CONTENT (a11y) ── */}
      <a href="#main-content" className="skip-to-content">{en ? "Skip to content" : "Ir al contenido"}</a>

      {/* ═══════════════════════════════════════════════════════════
         GLASS HEADER
         ═══════════════════════════════════════════════════════════ */}
      <header className="glass-header no-print" style={{ position: "sticky", top: 0, zIndex: 100, padding: "10px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setTab("home")}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: t.grad1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 14, filter: "brightness(10)" }}>◈</span>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, fontFamily: "'Fraunces',serif", color: t.tx }}>Colibrii Labs</div>
              <div style={{ fontSize: 9, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", letterSpacing: 1 }}>AI OBSERVATORY</div>
            </div>
          </div>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Exchange rate */}
            {xr && (
              <div className="hide-mobile" style={{ fontSize: 11, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>
                $1 = ₡{xr.toFixed(0)}
              </div>
            )}

            {/* Dark mode toggle */}
            <div className="theme-toggle" onClick={() => setDark(!dark)} role="switch" aria-checked={dark} aria-label={en ? "Toggle dark mode" : "Modo oscuro"} tabIndex={0} onKeyDown={e => e.key === "Enter" && setDark(!dark)}>
              <span style={{ position: "absolute", left: 5, fontSize: 10, zIndex: 1 }}>☀</span>
              <span style={{ position: "absolute", right: 5, fontSize: 10, zIndex: 1 }}>☾</span>
            </div>

            {/* Language toggle */}
            <button onClick={() => setEn(!en)} style={{ padding: "4px 10px", fontSize: 11, fontWeight: 700, border: `1px solid ${t.bd}`, borderRadius: 6, background: t.sf, color: t.tx2, fontFamily: "'IBM Plex Mono',monospace" }} aria-label={en ? "Switch to Spanish" : "Cambiar a inglés"}>
              {en ? "ES" : "EN"}
            </button>

            {/* Mobile hamburger */}
            <button className="hide-mobile" style={{ display: "none" }} />
            <button onClick={() => setMobileNav(!mobileNav)} style={{ display: "none", padding: 6, border: "none", background: "transparent", fontSize: 18, color: t.tx2 }} className="show-mobile-only">☰</button>
            {/* Show hamburger on mobile via media query — using inline check */}
            <button onClick={() => setMobileNav(!mobileNav)} style={{ padding: 6, border: "none", background: "transparent", fontSize: 18, color: t.tx2 }} className="hide-mobile" aria-label="Menu">
              {/* This button only shown on mobile via negative class trick — actual show is below */}
            </button>
          </div>
        </div>

        {/* ── Desktop Navigation ── */}
        <nav className="hide-mobile" style={{ maxWidth: 1100, margin: "6px auto 0", display: "flex", gap: 2, overflowX: "auto", paddingBottom: 4 }} aria-label="Main navigation">
          {TABS.map(t2 => (
            <button key={t2.id} onClick={() => setTab(t2.id)} className={`nav-pill ${tab === t2.id ? "active" : ""}`} aria-current={tab === t2.id ? "page" : undefined}>
              <span style={{ fontSize: 13 }}>{t2.ic}</span>
              <span className="hide-xs">{en ? t2.le : t2.l}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* ── Mobile Nav Overlay ── */}
      <AnimatePresence>
        {mobileNav && (
          <>
            <motion.div className="mobile-nav-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileNav(false)} />
            <motion.div className="mobile-nav-panel" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }}>
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <span style={{ fontWeight: 700, fontFamily: "'Fraunces',serif", fontSize: 16 }}>Colibrii Labs</span>
                  <button onClick={() => setMobileNav(false)} style={{ border: "none", background: "transparent", fontSize: 20, color: t.tx2 }}>✕</button>
                </div>
                {TABS.map(t2 => (
                  <button key={t2.id} onClick={() => { setTab(t2.id); setMobileNav(false); }}
                    style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "12px 8px", border: "none", background: tab === t2.id ? "var(--surface)" : "transparent", color: tab === t2.id ? "var(--cyan)" : "var(--text2)", fontSize: 14, fontWeight: tab === t2.id ? 600 : 400, borderRadius: 8, textAlign: "left" }}>
                    <span>{t2.ic}</span> {en ? t2.le : t2.l}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════
         MAIN CONTENT
         ═══════════════════════════════════════════════════════════ */}
      <main id="main-content" style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px 60px" }}>
        <AnimatePresence mode="wait">
          <TabContent id={tab} key={tab}>
            {renderTab()}
          </TabContent>
        </AnimatePresence>
      </main>

      {/* ═══════════════════════════════════════════════════════════
         FOOTER
         ═══════════════════════════════════════════════════════════ */}
      <footer className="no-print" style={{ borderTop: `1px solid ${t.bd}`, padding: "20px", textAlign: "center" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 12, color: t.tx3, marginBottom: 4 }}>
            © 2026 Colibrii Labs · {en ? "Built by Andrés for Costa Rica" : "Construido por Andrés para Costa Rica"}
          </p>
          <p style={{ fontSize: 10, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace" }}>
            {en ? "Data from public international sources · Observatory analysis © 2026 Colibrii Labs · CC BY-NC 4.0" : "Datos de fuentes internacionales públicas · Análisis observatorio © 2026 Colibrii Labs · CC BY-NC 4.0"}
          </p>
          <p style={{ fontSize: 9, color: t.tx3, fontFamily: "'IBM Plex Mono',monospace", marginTop: 2 }}>
            {en ? "Zero cookies · Zero tracking · Zero user data" : "Cero cookies · Cero rastreo · Cero datos usuario"}
          </p>
        </div>
      </footer>

      {/* ── SCROLL-TO-TOP ── */}
      <button className={`scroll-to-top no-print ${showScrollTop ? "visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label={en ? "Scroll to top" : "Ir arriba"}>
        ↑
      </button>
    </div>
  );
}
