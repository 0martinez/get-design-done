# Workflow: spec-phase

Create a detailed, render-ready design specification for a phase.

---

## Arguments

- `phaseNum` — the phase number to specify (required)

## Prerequisites

- `.design/` directory with BRIEF.md, ROADMAP.md
- For phase > 1: TOKENS.md must exist (created during Phase 1 rendering)
- Recommended: CONTEXT.md from explore-phase (not required)

## Initialization

```bash
node "{{GDD_ROOT}}/bin/gdd-tools.cjs" init phase {{PHASE_NUM}}
```

Read:
- BRIEF.md
- ROADMAP.md (phase requirements and success criteria)
- TOKENS.md (for token resolution)
- Phase CONTEXT.md (if available)
- Previous phase SPECs (for consistency)
- Reference files: component-patterns.md, layout-patterns.md

---

## Specification Process

### For Phase 1 (Design System Foundation)

Spawn `gdd-system-architect` agent with:
- BRIEF.md, MOODBOARD.md (if available), research SUMMARY.md (if available)
- Reference files: color-theory.md, typography-guide.md, spacing-systems.md
- Templates: tokens.md, system/*.md
- Output: TOKENS.md and system/ directory

The system architect creates:
1. TOKENS.md — the single source of truth
2. system/COLORS.md — detailed color documentation
3. system/TYPOGRAPHY.md — type scale documentation
4. system/SPACING.md — spacing documentation
5. system/ELEVATION.md — shadows and radii
6. system/COMPONENTS.md — component token usage
7. system/LAYOUT.md — layout grid and breakpoints

Then create the phase SPEC.md describing how to render the design system as visual artboards:
- Color palette artboard (swatches with labels)
- Type specimen artboard (all scale levels)
- Spacing reference (visual spacing scale)

### For Other Phases

Spawn `gdd-design-specifier` agent with:
- BRIEF.md, TOKENS.md, ROADMAP.md, CONTEXT.md
- Reference files: component-patterns.md, layout-patterns.md
- Output: phase SPEC.md

The specifier creates a detailed spec with:
- Layout structure (nesting, flexbox/grid)
- Token resolution table (every property → token → value)
- Visual hierarchy description
- Component specifications
- Interaction states
- Responsive behavior
- Render instructions (step-by-step for the renderer)

---

## Gate

Before writing the spec, present a summary to the user:
- Layout approach
- Key components
- Token usage
- Any assumptions made

In interactive mode, ask for approval. In express mode, proceed automatically.

---

## Output

Write `.design/phases/NN-name/SPEC.md`
If Phase 1: also write `.design/TOKENS.md` and `.design/system/*.md`

Update STATE.md:
- Status: specified
- Last Action: Specified Phase N

---

## Completion

```
Phase {{PHASE_NUM}} specification complete!

Spec: .design/phases/NN-name/SPEC.md
{{IF PHASE 1: Tokens: .design/TOKENS.md}}

Next: /gdd:render-phase {{PHASE_NUM}}    (execute the design)
```
