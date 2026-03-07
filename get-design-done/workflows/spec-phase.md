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

In express mode, proceed automatically. In interactive mode, present the spec's key decisions to the user via `AskUserQuestion` before writing the final SPEC.md.

The questions should be tailored to the phase content. Build 2-4 questions covering the most impactful design decisions, each with 2-4 concrete options (including previews where layout choices benefit from ASCII mockups).

### Example: Landing Page Hero Phase

```tool
AskUserQuestion({
  questions: [
    {
      question: "What layout do you prefer for the hero?",
      header: "Layout",
      multiSelect: false,
      options: [
        { label: "Asymmetric", description: "Text left (60%), visual right (40%). Editorial style.", preview: "ASCII mockup..." },
        { label: "Centered", description: "All content centered in a single column.", preview: "ASCII mockup..." }
      ]
    },
    {
      question: "Which headline do you prefer?",
      header: "Headline",
      multiSelect: false,
      options: [
        { label: "Option A", description: "Emphasizes the input method." },
        { label: "Option B", description: "Emphasizes the output." }
      ]
    },
    {
      question: "What visual element should accompany the text?",
      header: "Visual",
      multiSelect: false,
      options: [
        { label: "Terminal mockup", description: "Shows CLI in action. Signals dev tool." },
        { label: "Workflow diagram", description: "Visual pipeline: Brief → Tokens → Render." },
        { label: "No visual", description: "Pure typography. Maximum minimalism." }
      ]
    },
    {
      question: "What CTA style do you prefer?",
      header: "CTA",
      multiSelect: false,
      options: [
        { label: "Button", description: "Classic accent-colored button." },
        { label: "Install command", description: "Copyable npm install pill." }
      ]
    }
  ]
})
```

### Example: Design System Phase 1

```tool
AskUserQuestion({
  questions: [
    {
      question: "What color temperature for the neutral palette?",
      header: "Temperature",
      multiSelect: false,
      options: [
        { label: "Cool", description: "Slate, blue-gray undertones." },
        { label: "Warm", description: "Sand, cream undertones." },
        { label: "Neutral", description: "True gray, no color cast." }
      ]
    },
    {
      question: "What type scale ratio feels right?",
      header: "Scale",
      multiSelect: false,
      options: [
        { label: "Major Third (1.250)", description: "Balanced default. Good for most UIs." },
        { label: "Perfect Fourth (1.333)", description: "Clear hierarchy. Good for content-heavy pages." },
        { label: "Perfect Fifth (1.500)", description: "Dramatic contrast. Good for editorial." }
      ]
    }
  ]
})
```

### Guidelines for Gate Questions

- **2-4 questions max** — focus on decisions with the biggest visual impact
- **Use previews** for layout/composition choices (ASCII mockups)
- **Offer concrete options**, not abstract preferences — show the actual headline text, the actual layout structure
- **Include a recommended option** as first choice when there's a clear best default
- After user answers, incorporate their choices into the spec before writing

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
