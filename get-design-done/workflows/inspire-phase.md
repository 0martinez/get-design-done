# Workflow: inspire-phase

Research and present design inspiration specific to a phase.

---

## Arguments

- `phaseNum` — the phase to research inspiration for

## Prerequisites

- BRIEF.md and ROADMAP.md exist

## Process

1. Read ROADMAP.md to understand what this phase covers
2. Read BRIEF.md for product context

3. Spawn `gdd-design-researcher` agent focused on:
   - UI patterns specifically for the components in this phase
   - How competitor products handle this specific screen/flow
   - Current best practices

4. Present findings conversationally:
   - "Here's how similar products handle [this screen]..."
   - Show 3-5 patterns with pros/cons
   - Recommend which patterns fit best for this product

5. Update research/ files if new findings are significant

## Output

Conversational presentation of inspiration and patterns. No files written unless the user asks to capture findings.
