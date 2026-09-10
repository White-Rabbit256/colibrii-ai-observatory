"use client";

import { useMemo, useState } from "react";
import {
  aixSnapshot,
  computeMetrics,
  frontierVoices,
  gates,
  historicalSnapshots,
  methodology,
  scenarios,
  signals,
  sources,
} from "../../data/aix";
import styles from "./aix.module.css";

const NAV = [
  ["overview", "Overview"],
  ["gates", "7 Gates"],
  ["scenarios", "Scenarios"],
  ["evidence", "Evidence"],
  ["methodology", "Methodology"],
];

function Trend({ value }) {
  if (value === "up") return <span aria-label="rising trend">↗</span>;
  if (value === "down") return <span aria-label="falling trend">↘</span>;
  return <span aria-label="stable trend">→</span>;
}

function ScoreRail({ score }) {
  return (
    <div className={styles.scoreRail} aria-label={`${score} out of 5`}>
      <span style={{ width: `${(score / 5) * 100}%` }} />
    </div>
  );
}

function SourceLink({ sourceId, compact = false }) {
  const source = sources.find((item) => item.id === sourceId);
  if (!source) return null;
  return (
    <a
      className={compact ? styles.sourceChip : styles.sourceLink}
      href={source.url}
      target="_blank"
      rel="noreferrer"
    >
      <span>Tier {source.tier}</span>
      {source.organization}
      {!compact && <b>↗</b>}
    </a>
  );
}

function SectionHeader({ kicker, title, body, aside }) {
  return (
    <header className={styles.sectionHeader}>
      <div>
        <span className={styles.kicker}>{kicker}</span>
        <h2>{title}</h2>
        {body && <p>{body}</p>}
      </div>
      {aside && <div className={styles.sectionAside}>{aside}</div>}
    </header>
  );
}

export default function AIxExperience() {
  const [activeGate, setActiveGate] = useState(gates[0].id);
  const [selectedYear, setSelectedYear] = useState(2026);
  const [tier, setTier] = useState("All");
  const gate = gates.find((item) => item.id === activeGate) || gates[0];
  const snapshot = historicalSnapshots.find((item) => item.year === selectedYear) || historicalSnapshots.at(-1);

  const filteredSources = useMemo(
    () => (tier === "All" ? sources : sources.filter((source) => source.tier.startsWith(tier))),
    [tier]
  );

  return (
    <main className={styles.root}>
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <nav className={styles.nav} aria-label="AI-X sections">
        <a className={styles.brand} href="#overview" aria-label="AI-X Clock home">
          <span className={styles.brandMark}>X</span>
          <span>AI-X CLOCK</span>
        </a>
        <div className={styles.navLinks}>
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`}>{label}</a>
          ))}
        </div>
        <a className={styles.colibriiLink} href="/app">COLIBRII LABS <span>↗</span></a>
      </nav>

      <div id="main-content">
        <section className={styles.hero} id="overview">
          <div className={styles.heroNoise} aria-hidden="true" />
          <div className={styles.heroCopy}>
            <div className={styles.statusLine}>
              <span className={styles.liveDot} />
              <span>VERSION {aixSnapshot.version}</span>
              <span>SNAPSHOT {aixSnapshot.asOf}</span>
            </div>
            <h1>
              How close are we to<br />
              <em>losing control?</em>
            </h1>
            <p className={styles.heroIntro}>
              AI-X tracks the technological conditions that could make a catastrophic AI loss-of-control event plausible. It is an evidence index — not a prediction of extinction.
            </p>
            <div className={styles.heroActions}>
              <a href="#gates" className={styles.primaryButton}>Explore the seven gates</a>
              <a href="#methodology" className={styles.textButton}>Read methodology <span>↓</span></a>
            </div>
          </div>

          <div className={styles.clockPanel}>
            <div
              className={styles.clockDial}
              style={{ "--clock-progress": `${aixSnapshot.score * 3.6}deg` }}
              aria-label={`${aixSnapshot.minutesToMidnight} minutes to the AI-X loss-of-control threshold`}
            >
              <div className={styles.clockInner}>
                <span className={styles.clockEyebrow}>AI-X CLOCK</span>
                <strong>{String(aixSnapshot.minutesToMidnight).padStart(2, "0")}:00</strong>
                <span>TO MIDNIGHT</span>
              </div>
              <span className={`${styles.tick} ${styles.tick12}`} />
              <span className={`${styles.tick} ${styles.tick3}`} />
              <span className={`${styles.tick} ${styles.tick6}`} />
              <span className={`${styles.tick} ${styles.tick9}`} />
            </div>
            <div className={styles.clockStats}>
              <div><span>Risk index</span><b>{aixSnapshot.score}<small>/100</small></b></div>
              <div><span>State</span><b className={styles.elevated}>{aixSnapshot.level}</b></div>
              <div><span>Uncertainty</span><b>{aixSnapshot.uncertaintyMinutes[0]}–{aixSnapshot.uncertaintyMinutes[1]}<small> min</small></b></div>
            </div>
          </div>
        </section>

        <section className={styles.definitionStrip} aria-label="What midnight means">
          <span>WHAT MIDNIGHT MEANS</span>
          <p>{aixSnapshot.definition}</p>
          <strong>≠ extinction probability</strong>
        </section>

        <section className={styles.section} id="gates">
          <SectionHeader
            kicker="01 / SYSTEM MODEL"
            title="Seven gates to irreversible loss of control"
            body="A high-performing model is not enough. AI-X asks whether seven separate barriers are being crossed. Weak gates constrain the total score through geometric aggregation."
            aside={<><span>Composite</span><strong>57.75</strong><small>→ 58 / 100</small></>}
          />

          <div className={styles.gateWorkspace}>
            <div className={styles.gateList} role="list" aria-label="AI-X gates">
              {gates.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.gateCard} ${item.id === activeGate ? styles.gateActive : ""}`}
                  onClick={() => setActiveGate(item.id)}
                  aria-pressed={item.id === activeGate}
                >
                  <div className={styles.gateTop}>
                    <span>{item.number}</span>
                    <span className={styles.trend}><Trend value={item.trend} /></span>
                  </div>
                  <div className={styles.gateName}>{item.name}</div>
                  <div className={styles.gateScore}>{item.score.toFixed(1)}<small>/5</small></div>
                  <ScoreRail score={item.score} />
                  <div className={styles.confidence}>{item.confidence} confidence</div>
                </button>
              ))}
            </div>

            <article className={styles.gateDetail} aria-live="polite">
              <div className={styles.detailHeader}>
                <div>
                  <span>{gate.number} / ACTIVE GATE</span>
                  <h3>{gate.name}</h3>
                </div>
                <strong>{gate.score.toFixed(1)}<small>/5</small></strong>
              </div>
              <p className={styles.detailSummary}>{gate.summary}</p>
              <div className={styles.bottleneck}>
                <span>CURRENT BOTTLENECK</span>
                <p>{gate.bottleneck}</p>
              </div>
              <div className={styles.detailMeta}>
                <div><span>Trend</span><b><Trend value={gate.trend} /> {gate.trend === "up" ? "Rising" : "Stable"}</b></div>
                <div><span>Confidence</span><b>{gate.confidence}</b></div>
              </div>
              <div className={styles.detailSources}>
                <span>EVIDENCE ANCHORS</span>
                <div>{gate.sourceIds.map((id) => <SourceLink key={id} sourceId={id} compact />)}</div>
              </div>
            </article>
          </div>
        </section>

        <section className={`${styles.section} ${styles.historySection}`} id="history">
          <SectionHeader
            kicker="02 / TRAJECTORY"
            title="Move backward through the risk landscape"
            body="Historical values are retrospective model reconstructions, not measurements published at the time. They show how the same rubric reads earlier capability states."
          />
          <div className={styles.historyGrid}>
            <div className={styles.historyReadout}>
              <span>{snapshot.status === "current" ? "CURRENT SNAPSHOT" : "RETROSPECTIVE"}</span>
              <strong>{snapshot.year}</strong>
              <div><b>{snapshot.score}</b><small>/100</small></div>
              <p>{snapshot.minutes.toFixed(1)} minutes to midnight · {snapshot.label}</p>
            </div>
            <div className={styles.timelineControl}>
              <div className={styles.yearLine} aria-hidden="true"><span style={{ width: `${((selectedYear - 2022) / 4) * 100}%` }} /></div>
              <div className={styles.yearButtons}>
                {historicalSnapshots.map((item) => (
                  <button
                    key={item.year}
                    type="button"
                    className={item.year === selectedYear ? styles.yearActive : ""}
                    onClick={() => setSelectedYear(item.year)}
                  >
                    <span>{item.year}</span>
                    <small>{item.score}</small>
                  </button>
                ))}
              </div>
              <div className={styles.historyNote}>
                <span>Interpretation</span>
                <p>AI-X is designed to move both directions. Better containment, slower dangerous-capability growth, stronger recovery capacity or evidence that current trends do not generalize can move the clock away from midnight.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="scenarios">
          <SectionHeader
            kicker="03 / PATHWAYS"
            title="Catastrophe is a chain, not a button"
            body="These pathways are defensive threat models. They describe required capability classes and limiting barriers without providing operational instructions for causing harm."
          />
          <div className={styles.scenarioGrid}>
            {scenarios.map((scenario, index) => (
              <article className={styles.scenarioCard} key={scenario.id}>
                <div className={styles.scenarioIndex}>{String(index + 1).padStart(2, "0")}</div>
                <div className={styles.scenarioBody}>
                  <div className={styles.scenarioTopline}>
                    <span>PROXIMITY <b>{scenario.proximity.toFixed(1)}/5</b></span>
                    <span>CONSEQUENCE <b>{scenario.consequence}</b></span>
                  </div>
                  <h3>{scenario.name}</h3>
                  <p>{scenario.summary}</p>
                  <div className={styles.gatePills}>{scenario.gates.map((g) => <span key={g}>{g}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.signalSection}`} id="signals">
          <SectionHeader
            kicker="04 / CHANGELOG"
            title="What can move the clock"
            body="Every movement must resolve to dated evidence and an explicit gate change. Headlines alone do not move AI-X."
          />
          <div className={styles.signalLayout}>
            <div className={styles.signalTimeline}>
              {signals.map((signal) => (
                <article key={`${signal.date}-${signal.title}`} className={styles.signalItem}>
                  <time>{signal.date}</time>
                  <div className={styles.signalMarker} aria-hidden="true" />
                  <div>
                    <span>{signal.type}</span>
                    <h3>{signal.title}</h3>
                    <p>{signal.detail}</p>
                    <SourceLink sourceId={signal.sourceId} compact />
                  </div>
                </article>
              ))}
            </div>
            <aside className={styles.monitorCard}>
              <span>WATCHLIST</span>
              <h3>Seven indicators that matter more than benchmark hype</h3>
              <ol>
                <li><b>Autonomy horizon</b><span>hours → days → weeks</span></li>
                <li><b>AI R&amp;D automation</b><span>assistant → researcher</span></li>
                <li><b>Persistence</b><span>survival under containment</span></li>
                <li><b>Dangerous capability breadth</b><span>multi-domain thresholds</span></li>
                <li><b>Monitorability</b><span>deception / evaluation gaming</span></li>
                <li><b>Physical actuation</b><span>robots, industry, logistics</span></li>
                <li><b>Recovery capacity</b><span>human ability to regain control</span></li>
              </ol>
            </aside>
          </div>
        </section>

        <section className={styles.section} id="compute">
          <SectionHeader
            kicker="05 / PHYSICAL LAYER"
            title="Intelligence still runs on steel, silicon and power"
            body="Compute growth accelerates capability, while energy, chips, networking and data-center construction remain physical constraints that a digital model cannot wish away."
          />
          <div className={styles.metricsGrid}>
            {computeMetrics.map((metric) => (
              <article key={metric.label} className={styles.metricCard}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <p>{metric.note}</p>
                {metric.sourceId && <SourceLink sourceId={metric.sourceId} compact />}
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.voicesSection}`} id="voices">
          <SectionHeader
            kicker="06 / FRONTIER VOICES"
            title="Important opinions, deliberately kept out of the score"
            body="Statements from frontier-lab leaders and researchers can reveal expectations and disagreements. AI-X displays them as context, never as substitute evidence."
          />
          <div className={styles.voicesGrid}>
            {frontierVoices.map((voice) => (
              <figure key={`${voice.name}-${voice.date}`} className={styles.voiceCard}>
                <div className={styles.voiceLabel}>COMMENTARY · NOT SCORED</div>
                <blockquote>“{voice.quote}”</blockquote>
                <figcaption>
                  <div><strong>{voice.name}</strong><span>{voice.role}</span></div>
                  <a href={voice.url} target="_blank" rel="noreferrer">X · {voice.date} ↗</a>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className={styles.section} id="evidence">
          <SectionHeader
            kicker="07 / EVIDENCE LEDGER"
            title="The number is only as useful as the trail behind it"
            body="Sources are separated by evidentiary role so that a lab claim, an independent evaluation and an expert opinion are never silently treated as equivalent."
          />
          <div className={styles.filterBar} role="group" aria-label="Filter evidence by tier">
            {["All", "A", "B", "C", "D"].map((item) => (
              <button key={item} type="button" onClick={() => setTier(item)} className={tier === item ? styles.filterActive : ""}>
                {item === "All" ? "All evidence" : `Tier ${item}`}
              </button>
            ))}
          </div>
          <div className={styles.evidenceTable}>
            <div className={styles.evidenceHead}><span>Tier</span><span>Source</span><span>Evidence</span><span>Date</span><span /></div>
            {filteredSources.map((source) => (
              <a key={source.id} className={styles.evidenceRow} href={source.url} target="_blank" rel="noreferrer">
                <span className={styles.tierBadge}>{source.tier}</span>
                <span><b>{source.organization}</b><small>{source.kind}</small></span>
                <span>{source.title}</span>
                <time>{source.date}</time>
                <span>↗</span>
              </a>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.methodSection}`} id="methodology">
          <SectionHeader
            kicker="08 / METHODOLOGY"
            title="A clock that can be audited — and move backward"
            body="AI-X intentionally makes weak links matter. A model cannot reach a plausible irreversible-loss threshold merely by being excellent at one dangerous task."
          />
          <div className={styles.methodGrid}>
            <article className={styles.formulaCard}>
              <span>CORE AGGREGATION</span>
              <div className={styles.formula}>AI-X = 100 × (∏(gᵢ / 5))<sup>1/7</sup></div>
              <p>{methodology.aggregation}</p>
              <div className={styles.formulaResult}>
                <span>Current calculation</span>
                <code>(4.5 × 3.2 × 3.4 × 2.0 × 3.8 × 3.0 × 1.5)<sup>1/7</sup> / 5 = 57.75%</code>
              </div>
            </article>
            <article className={styles.methodCard}>
              <span>PUBLICATION RULE</span>
              <h3>Automation proposes. Humans publish.</h3>
              <p>{methodology.publication}</p>
              <div className={styles.reviewFlow}>
                <span>INGEST</span><i>→</i><span>DEDUPLICATE</span><i>→</i><span>CLASSIFY</span><i>→</i><span>REVIEW</span><i>→</i><span>PUBLISH</span>
              </div>
            </article>
            <article className={styles.methodCard}>
              <span>NON-CLAIM</span>
              <h3>Five minutes does not mean five years.</h3>
              <p>{aixSnapshot.caveat} The dial is a normalized visual mapping of the composite index, not a calendar.</p>
            </article>
          </div>
          <div className={styles.tierLegend}>
            {Object.entries(methodology.evidenceTiers).map(([key, value]) => (
              <div key={key}><strong>{key}</strong><p>{value}</p></div>
            ))}
          </div>
        </section>

        <section className={styles.closing}>
          <span>AI-X / COLIBRII LABS</span>
          <h2>Measure the distance.<br />Expose the assumptions.</h2>
          <p>AI-X exists to make an uncertain debate inspectable: what changed, which barrier moved, how strong the evidence is, and what would have to happen for the clock to move back.</p>
          <div><a href="#overview">Back to clock ↑</a><a href="/app">Explore Colibrii Labs ↗</a></div>
        </section>
      </div>
    </main>
  );
}
