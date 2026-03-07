# Workflow: audit-accessibility

Audit all designs for WCAG AA accessibility compliance.

---

## Prerequisites

- TOKENS.md must exist
- At least one phase must be rendered

## Process

Spawn `gdd-accessibility-checker` agent with:
- TOKENS.md (color values for contrast calculation)
- All phase RENDERED.md files
- Reference: accessibility-standards.md
- Design tool connection (if available, for screenshots)

The checker:
1. Calculates contrast ratios for all text-on-background combinations
2. Checks touch target sizes
3. Verifies color is not the sole indicator of meaning
4. Checks typography minimums
5. Reviews focus indicator specifications

## Output

Display the accessibility audit with:
- Overall PASS/FAIL status
- Contrast ratio table with pass/fail per combination
- Touch target audit
- Color independence findings
- Critical issues (must fix)
- Recommendations (should fix)

If any critical issues: suggest specific fixes and which tokens/specs to update.
