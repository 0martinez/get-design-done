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

## Post-Audit Actions

### Path A — Clean

No cross-phase inconsistencies found. Display the compliance score and completion message:

```
Audit complete — {{SCORE}}% compliance, no cross-phase inconsistencies.
```

### Path B — Fixable inconsistencies found

Cross-phase inconsistencies or off-system values are present.

Present an interactive selection using AskUserQuestion:

```
AskUserQuestion({
  questions: [{
    question: "The audit found cross-phase inconsistencies. Which should I fix now?",
    header: "Fix Inconsistencies",
    multiSelect: true,
    options: [
      { label: "[token] #N: short description", description: "severity — phases affected — what changes" },
      { label: "[render] #N: short description", description: "severity — phases affected — what changes" },
      ...
      { label: "Skip all — I'll handle these manually", description: "" }
    ]
  }]
})
```

Build the options list from the inconsistencies table. Prefix each label with `[token]` if the fix requires a TOKENS.md change, or `[render]` if the fix requires updating rendered nodes via MCP. Always include "Skip all" as the final option.

**Applying selected fixes — execution order**:

1. **Token fixes first** (changes may cascade and make some render fixes unnecessary):
   - Read TOKENS.md
   - Apply the change (update value, add new token, etc.)
   - Write TOKENS.md
   - Warn about cascade: "Token updated — other rendered phases using this token may need re-rendering"

2. **Render fixes second**:
   - Use the adapter's MCP tools (update_styles / set_text_content) to apply the change
   - Take a screenshot to verify the fix visually

3. **After all selected fixes are applied**:
   - Update AUDIT-CONSISTENCY.md with an applied/skipped log
   - Take a final screenshot if render fixes were applied
   - Suggest next action:
     - If token fixes applied → "Re-render affected phases to pick up token changes"
     - If render fixes applied → "Re-audit to verify: /gdd:audit-consistency"
     - If all inconsistencies resolved → "All phases consistent. Continue with next design task.\n\nTip: Run /clear before starting the next phase to free up context."
