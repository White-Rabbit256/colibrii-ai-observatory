# Persona Review Board

12 independent reviewers, run as **parallel read-only subagents** after the build gate. Each persona receives: the section files (view, data module, sub-components), the registry diffs, and `/knowledge/sections/<topic>.md`.

## Output contract (every persona, no exceptions)

```
PERSONA: <name>
TOP 3 STRENGTHS:
1–3. <specific, with file/component refs>
TOP 5 PROBLEMS:
1–5. <file:line or component-level, concrete, actionable — never vague>
VERDICT: SHIP | FIX-THEN-SHIP | BLOCK
```

- BLOCK = a defect that makes shipping irresponsible (wrong number, broken page, license violation, partisan slip, inaccessible core flow).
- FIX-THEN-SHIP = real problems, shippable after the listed fixes.
- SHIP = ≤ minor nits.

## Iteration loop
Orchestrator synthesizes all 12 into one ranked fix list → fixes → re-runs ONLY personas that returned BLOCK or FIX-THEN-SHIP → repeat until zero BLOCK and ≤2 minor FIX. **Max 3 full iterations**; remaining items go to the section's backlog in `/knowledge`.
