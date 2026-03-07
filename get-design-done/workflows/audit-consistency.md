# Workflow: audit-consistency

Audit all rendered phases for design system consistency.

---

## Prerequisites

- TOKENS.md must exist
- At least one phase must be rendered

## Process

Spawn `gdd-token-auditor` agent with:
- TOKENS.md
- All phase RENDERED.md and SPEC.md files
- Design tool connection (if available)

The auditor:
1. Parses TOKENS.md into a token map
2. Scans each rendered phase for off-system values
3. Checks cross-phase consistency
4. Calculates compliance scores

## Output

Display the audit report with:
- Overall compliance percentage
- Per-phase compliance scores
- Off-system values found
- Cross-phase inconsistencies
- Recommendations

If compliance < 85%, suggest running `/gdd:edit-tokens` or re-rendering affected phases.
