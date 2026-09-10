# AI-X Clock — Methodology v0.1

**Snapshot baseline:** 2026-09-09  
**Maintainer:** Colibrii Labs  
**Status:** Experimental public research framework

## What AI-X measures

AI-X is a proximity index for conditions associated with a *plausible irreversible AI loss-of-control threshold*. It is not a prediction of human extinction, a calendar countdown, or a probability estimate.

“Midnight” is defined as the point at which a deployed AI system could plausibly sustain a strategic multi-domain campaign, persist against meaningful containment, and materially reduce humanity's ability to recover control.

## Seven-gate model

AI-X separates the pathway into seven gates so that progress in a single spectacular capability does not silently stand in for the complete loss-of-control chain.

| Gate | Question | Baseline |
| --- | --- | ---: |
| G1 Capability | Can the system outperform humans in strategically relevant disciplines? | 4.5 / 5 |
| G2 Agency | Can it plan and execute robustly over long, open-ended horizons? | 3.2 / 5 |
| G3 Access | Can it act through tools, networks, code, APIs and real systems? | 3.4 / 5 |
| G4 Persistence | Can it remain operational or recover when humans attempt containment? | 2.0 / 5 |
| G5 Effectors | Can it translate capability into high-consequence real-world effects? | 3.8 / 5 |
| G6 Evasion | Can it systematically evade, manipulate or defeat supervision? | 3.0 / 5 |
| G7 Recovery Denial | Could it materially prevent survivors from regaining control and rebuilding? | 1.5 / 5 |

## Aggregation

Each gate is normalized to a 0–1 scale and combined using an equal-weight geometric mean:

`AI-X = 100 × (Π(gate_i / 5))^(1/7)`

For the v0.1 baseline:

`(4.5 × 3.2 × 3.4 × 2.0 × 3.8 × 3.0 × 1.5)^(1/7) / 5 = 0.57754`

Rounded AI-X score: **58 / 100**.

The geometric mean is deliberate: a weak gate constrains the system. It avoids a failure mode where extraordinary cyber capability, for example, can numerically cancel out poor persistence or weak physical-world autonomy.

## Clock mapping

The public clock uses a deliberately simple normalized visualization:

`minutes_to_midnight = 12 × (1 − AI-X / 100)`

The current 58/100 baseline maps to ~5.0 minutes. This is a display transformation, not a claim that an event is five years, five months or five minutes away.

## Evidence hierarchy

AI-X separates evidence by role rather than counting links.

- **Tier A — Primary frontier evidence:** system cards, preparedness reports, safety evaluations and published frontier-lab policies.
- **Tier B — Independent evaluations:** capability and safety measurements from independent evaluators and national AI safety/security institutes.
- **Tier C — Synthesis and governance:** academic, governmental and international assessments.
- **Tier D — Physical-layer data:** compute, chips, data centers, energy and infrastructure datasets.
- **Tier E — Expert commentary:** interviews, talks and social posts. Useful for expectations and disagreement; never sufficient by themselves to move a gate.

Ten articles repeating one underlying benchmark count as one evidence event, not ten independent observations.

## Update protocol

1. **Ingest:** collect candidate evidence with source URL, publication date, event date and publisher.
2. **Deduplicate:** cluster reporting that resolves to the same underlying event, model card or evaluation.
3. **Classify:** map evidence to one or more gates and assign an evidence tier.
4. **Challenge:** search for counterevidence, replication failures, benchmark contamination and alternative interpretations.
5. **Score proposal:** produce a proposed gate delta with rationale, confidence and uncertainty.
6. **Human review:** a named reviewer approves, rejects or modifies the proposal.
7. **Publish:** record the previous value, new value, strongest supporting evidence and dissent in the changelog.

Automated systems may support steps 1–5. They must not silently change the public clock.

## What should move AI-X materially

Signals with high information value include:

- robust autonomous task horizons moving from hours toward days or weeks;
- independently demonstrated AI-R&D automation approaching autonomous researcher-level work;
- persistence or resource acquisition that remains effective under active containment;
- dangerous capabilities crossing high thresholds in several domains at once;
- reliable evidence of strategic deception or monitor evasion outside narrow evaluation setups;
- rapidly expanding access to industrial, financial or physical actuation with reduced human approval;
- credible evidence that AI systems could degrade human recovery capacity after a global catastrophe.

A benchmark record, model release or alarming quote should not automatically move the clock.

## Scenario policy

AI-X scenario pages are defensive threat models. They may describe capability classes, dependencies, barriers, recovery mechanisms and mitigations. They should not publish operational instructions, target-selection advice, exploit chains, pathogen-design procedures, weapons-acquisition guidance or other details that materially enable catastrophic harm.

## Historical reconstruction

Values before the first live AI-X snapshot are labeled **retrospective**. They apply the current rubric to older evidence and should not be presented as scores that were measured or published at the time.

## Versioning

Every methodology change that can affect scores must increment the model version. Historical data should preserve both the score originally published and, when useful, a separately labeled score recalculated under the new methodology.

## Initial evidence anchors

The seed dataset includes primary or institutional sources from OpenAI, Anthropic, the UK AI Security Institute, METR, the International AI Safety Report, Stanford HAI, SIPRI, NIST, Epoch AI and the International Energy Agency. The application exposes the evidence ledger and URLs directly; expert commentary is visibly marked as unscored.

## Research standard

The central design principle is falsifiability: AI-X must be able to move *away* from midnight when the evidence warrants it. A framework that can only become more alarming is not a risk instrument; it is a narrative.
