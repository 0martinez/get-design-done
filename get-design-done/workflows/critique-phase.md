# Workflow: critique-phase

Structured design review of a rendered phase.

---

## Arguments

- `phaseNum` — the phase number to critique (required)

## Prerequisites

- Phase RENDERED.md must exist
- TOKENS.md must exist

## Initialization

```bash
node "{{GDD_ROOT}}/bin/gdd-tools.cjs" init phase {{PHASE_NUM}}
```

Read:
- Phase RENDERED.md
- Phase SPEC.md (what was intended)
- TOKENS.md (for compliance checking)
- Reference files: critique-framework.md, accessibility-standards.md

---

## Critique Process

Spawn `gdd-design-critic` agent with:
- Phase RENDERED.md
- Phase SPEC.md
- TOKENS.md
- References: critique-framework.md, accessibility-standards.md
- Output: Phase CRITIQUE.md

If design tool is connected, the critic should:
1. Take a screenshot for visual evaluation
2. Use `get_styles` to read computed values for compliance checking

The critic evaluates 8 dimensions:
1. Visual Hierarchy
2. Design System Consistency
3. Color & Contrast
4. Typography
5. Spacing & Rhythm
6. Alignment
7. Accessibility
8. Production Readiness

---

## Output

Write `.design/phases/NN-name/CRITIQUE.md` with:
- Overall grade (A/B/C/D)
- Per-dimension severity ratings
- Issues table with suggested fixes
- Token compliance score
- Verdict: proceed / revise / major revision

Update STATE.md:
- Status: critiqued
- Last Action: Critiqued Phase N

---

## Post-Critique Actions

Parse the CRITIQUE.md issues table. Check for the Fix Type column — if the column is missing (legacy format), fall back to the original behavior below each path.

Based on the verdict and available fixes:

### Path A — Proceed (no actionable fixes)

Grade A or verdict=proceed with no token-fix/render-fix issues.

```
Phase {{PHASE_NUM}} critique: Grade [X] — [verdict]
Next: /gdd:explore-phase {{NEXT_PHASE}}
```

### Path B — Fixable issues exist

Issues with Fix Type `token-fix` or `render-fix` are present.

Present an interactive selection using AskUserQuestion:

```
AskUserQuestion({
  questions: [{
    question: "The critique found fixable issues. Which should I apply now?",
    header: "Apply Fixes",
    multiSelect: true,
    options: [
      { label: "[token] #N: short description", description: "severity — category — what changes" },
      { label: "[render] #N: short description", description: "severity — category — what changes" },
      ...
      { label: "Skip all — I'll handle these manually", description: "" }
    ]
  }]
})
```

Build the options list from the issues table. Prefix each label with `[token]` or `[render]` matching its Fix Type. Always include "Skip all" as the final option. Omit `spec-fix` and `note` issues from the selection (mention them as informational after).

**Applying selected fixes — execution order**:

1. **Token fixes first** (changes may cascade and make some render fixes unnecessary):
   - Read TOKENS.md
   - Apply the change (update value, add new token, etc.)
   - Write TOKENS.md
   - Warn about cascade: "Token updated — other rendered phases using this token may need re-rendering"

2. **Render fixes second**:
   - Use the adapter's MCP tools (update_styles / set_text_content) to apply the change
   - Take a screenshot to verify the fix visually

3. **Spec fixes**: Do not auto-apply. After fix execution, flag them:
   ```
   Spec-level issues (manual): re-specify with /gdd:spec-phase {{PHASE_NUM}}
   ```

4. **After all selected fixes are applied**:
   - Update STATE.md with fix log (which fixes applied, which skipped)
   - Take a final screenshot if render fixes were applied
   - Suggest next action:
     - If only token fixes applied → "Re-render to pick up token changes: /gdd:render-phase {{PHASE_NUM}}"
     - If render fixes applied → "Re-critique to verify: /gdd:critique-phase {{PHASE_NUM}}"
     - If all issues resolved → "Proceed to next phase: /gdd:explore-phase {{NEXT_PHASE}}"

### Path C — Major revision needed

Grade D or verdict=major revision.

```
Phase {{PHASE_NUM}} critique: Grade [X] — major revision needed
Re-specify the phase: /gdd:spec-phase {{PHASE_NUM}}
```

---

## Completion

Display the critique summary and suggest the appropriate next action.
