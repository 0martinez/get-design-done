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

Based on the verdict:

**Proceed**: Phase is complete. Suggest next phase.
```
Phase {{PHASE_NUM}} critique: Grade [X] — [verdict]
Next: /gdd:explore-phase {{NEXT_PHASE}}
```

**Revise**: Issues found that need fixing.
```
Phase {{PHASE_NUM}} critique: Grade [X] — revision needed
[N] issues found ([critical], [major], [minor])

Fix the issues, then re-render: /gdd:render-phase {{PHASE_NUM}}
```

**Major revision**: Fundamental problems.
```
Phase {{PHASE_NUM}} critique: Grade [X] — major revision needed
Re-specify the phase: /gdd:spec-phase {{PHASE_NUM}}
```

---

## Completion

Display the critique summary and suggest the appropriate next action.
