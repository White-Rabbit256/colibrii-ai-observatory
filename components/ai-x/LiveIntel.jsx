"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./live-intel.module.css";

const COXON_POSTS = [
  {
    author: "Jacob Coxon",
    handle: "@hilbertspaess",
    date: "2026-09-08",
    quote: "racing straight to self-improving superintelligence and gambling with our lives.",
    url: "https://x.com/hilbertspaess/status/2097476196791709843",
    stance: "Lab race / recursive improvement",
  },
  {
    author: "Jacob Coxon",
    handle: "@hilbertspaess",
    date: "2026-09-08",
    quote: "Do not underestimate the power of this technology.",
    url: "https://x.com/hilbertspaess/status/2097476201283834281",
    stance: "Capability acceleration",
  },
  {
    author: "Jacob Coxon",
    handle: "@hilbertspaess",
    date: "2026-09-08",
    quote: "The people building AI earnestly believe that it could kill us all by the end of the decade.",
    url: "https://x.com/hilbertspaess/status/2097476203863224394",
    stance: "Existential-risk belief",
  },
];

export default function LiveIntel() {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let live = true;
    fetch("/api/ai-x/live", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("live feed unavailable");
        return res.json();
      })
      .then((data) => live && setPayload(data))
      .catch(() => live && setError(true));
    return () => { live = false; };
  }, []);

  const items = useMemo(() => payload?.items?.slice(0, 10) || [], [payload]);
  const refreshed = payload?.refreshedAt
    ? new Date(payload.refreshedAt).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    : "loading";

  return (
    <>
      <button
        type="button"
        className={styles.launcher}
        onClick={() => setOpen(true)}
        aria-label="Open AI-X live intelligence feed"
      >
        <span className={styles.pulse} aria-hidden="true" />
        <span><b>LIVE INTEL</b><small>daily refresh</small></span>
      </button>

      {open && (
        <div className={styles.backdrop} role="presentation" onMouseDown={() => setOpen(false)}>
          <aside
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="AI-X live intelligence"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className={styles.header}>
              <div>
                <span>AI-X / LIVE INTELLIGENCE</span>
                <h2>What changed since the last review?</h2>
                <p>Daily candidate evidence and frontier-lab commentary. Nothing here changes the clock until human review.</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close live intelligence">×</button>
            </header>

            <div className={styles.statusBar}>
              <span><i className={styles.dot} /> FEED ONLINE</span>
              <span>REFRESHED {refreshed}</span>
              <span>SCORE LOCKED · 58/100</span>
            </div>

            <section className={styles.block}>
              <div className={styles.blockTitle}>
                <span>01 / DAILY SIGNALS</span>
                <small>candidate evidence · unscored</small>
              </div>
              {error && <p className={styles.empty}>The live news feed could not refresh. Verified static evidence remains available on the main page.</p>}
              {!error && !payload && <p className={styles.empty}>Refreshing public sources…</p>}
              <div className={styles.feed}>
                {items.map((item, index) => (
                  <a key={`${item.url}-${index}`} className={styles.signal} href={item.url} target="_blank" rel="noreferrer">
                    <div><span>{item.category}</span><time>{item.date}</time></div>
                    <h3>{item.title}</h3>
                    <p>{item.source}</p>
                  </a>
                ))}
              </div>
            </section>

            <section className={styles.block}>
              <div className={styles.blockTitle}>
                <span>02 / X FIELD NOTES</span>
                <small>commentary · never scored alone</small>
              </div>
              <div className={styles.xGrid}>
                {COXON_POSTS.map((post) => (
                  <a key={post.url} className={styles.xCard} href={post.url} target="_blank" rel="noreferrer">
                    <div className={styles.xTop}><span>X</span><time>{post.date}</time></div>
                    <blockquote>“{post.quote}”</blockquote>
                    <div className={styles.xMeta}>
                      <div><b>{post.author}</b><span>{post.handle}</span></div>
                      <small>{post.stance} ↗</small>
                    </div>
                  </a>
                ))}
              </div>
              <p className={styles.policy}>AI-X treats X posts as Tier E commentary. They can flag a question for investigation, but cannot move a gate without stronger evidence.</p>
            </section>
          </aside>
        </div>
      )}
    </>
  );
}
