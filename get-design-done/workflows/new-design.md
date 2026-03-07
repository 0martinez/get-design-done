# Workflow: new-design

Unified initialization workflow. Takes a user from zero to a complete design brief, research, design system foundation, and roadmap.

---

## Prerequisites

None — this is the entry point.

## Initialization

```bash
node "{{GDD_ROOT}}/bin/gdd-tools.cjs" init new-design
```

This returns paths to:
- `projectDir` — current working directory
- `designDir` — `.design/` path
- `exists` — whether `.design/` already exists
- `gddRoot` — GDD framework installation path
- `referencesDir`, `templatesDir`, `adaptersDir`

If `exists` is true, warn the user and ask whether to continue (will overwrite) or abort.

---

## Phase 1: Adapter Detection

Detect which design tool MCP is available:

1. Check for `mcp__paper__*` tools → adapter = "paper"
2. Check for `mcp__pencil__*` tools → adapter = "pencil"
3. No design tool found → adapter = "generic"

Store adapter choice in config.json.

If Paper is detected, call `mcp__paper__get_basic_info` to learn:
- Available artboards (if any)
- Loaded fonts
- Document dimensions

---

## Phase 2: Structured Questioning

Load the questioning guide for translation context:
```
Read {{GDD_ROOT}}/references/design-questioning.md
```

Use the `AskUserQuestion` tool to collect design preferences through structured questions. The user selects from predefined options — "Other" is always available for custom input.

### Batch 1: Identity & Direction

```tool
AskUserQuestion({
  questions: [
    {
      question: "Which product's visual style feels closest to what you're building?",
      header: "Style ref",
      options: [
        { label: "Linear", description: "Precise, minimal, dev-focused. Clean dark/light modes with sharp typography." },
        { label: "Notion", description: "Warm, approachable, flexible. Friendly with lots of white space." },
        { label: "Stripe", description: "Premium, polished, editorial. Rich gradients and confident typography." },
        { label: "Vercel", description: "Technical, stark, high-contrast. Developer-centric with monospace touches." }
      ],
      multiSelect: false
    },
    {
      question: "How should your product feel?",
      header: "Warmth",
      options: [
        { label: "Precise & professional", description: "Sharp edges, high contrast, cool neutrals. Think: steel and glass." },
        { label: "Warm & approachable", description: "Rounded corners, soft colors, warm neutrals. Think: wooden furniture." },
        { label: "Editorial & bold", description: "Dramatic typography, high contrast, strong visual personality. Think: design magazine." }
      ],
      multiSelect: false
    },
    {
      question: "What matters most for this design?",
      header: "Priority",
      options: [
        { label: "Looks impressive", description: "Should wow and capture attention at first glance." },
        { label: "Easy to understand", description: "Clarity and usability are the top priority." },
        { label: "Feels professional", description: "Should convey trust, credibility, and authority." }
      ],
      multiSelect: false
    },
    {
      question: "What typography direction feels right?",
      header: "Typography",
      options: [
        { label: "Modern & clean", description: "Geometric sans-serif like Inter, Geist, or SF Pro." },
        { label: "Classic & editorial", description: "Serif or humanist sans like Source Serif, Literata, or Lora." },
        { label: "Technical", description: "Monospace-influenced like JetBrains Mono or IBM Plex Mono." },
        { label: "Expressive & bold", description: "Display fonts with personality like Cabinet Grotesk or Fraunces." }
      ],
      multiSelect: false
    }
  ]
})
```

### Batch 2: Visual Details & Scope

```tool
AskUserQuestion({
  questions: [
    {
      question: "How should color be used in the design?",
      header: "Color",
      options: [
        { label: "One bold accent", description: "Neutral palette with one strong, intentional color moment." },
        { label: "Quiet & minimal", description: "Mostly neutrals, color appears sparingly and subtly." },
        { label: "Rich & expressive", description: "Multiple harmonious colors creating a vivid, energetic feel." }
      ],
      multiSelect: false
    },
    {
      question: "How spacious should the design feel?",
      header: "Density",
      options: [
        { label: "Spacious", description: "Generous white space, large type, focus on one thing at a time." },
        { label: "Balanced", description: "Standard spacing, clear sections, comfortable density." },
        { label: "Dense & information-rich", description: "Compact, lots visible at once. Like a dashboard or data tool." }
      ],
      multiSelect: false
    },
    {
      question: "What's the primary platform?",
      header: "Platform",
      options: [
        { label: "Desktop-first", description: "1440px wide, optimized for large screens." },
        { label: "Mobile-first", description: "375px wide, thumb-friendly, progressive disclosure." },
        { label: "Responsive (both)", description: "Must work well on all screen sizes." }
      ],
      multiSelect: false
    },
    {
      question: "Which visual trends do you want to avoid?",
      header: "Avoid",
      options: [
        { label: "SaaS gradient look", description: "Purple/indigo on dark navy. The 2019-2024 startup aesthetic." },
        { label: "Generic startup feel", description: "Illustration-heavy, pastel colors, rounded everything." },
        { label: "Too minimal/empty", description: "So stripped down it feels incomplete or lifeless." },
        { label: "Too corporate", description: "Stiff, formal, blue-heavy enterprise aesthetic." }
      ],
      multiSelect: true
    }
  ]
})
```

### Processing Answers

Use the questioning guide's **Translation guide** sections to convert selections into concrete design decisions:

| Selection | Maps to |
|-----------|---------|
| Style reference | Overall tone, visual benchmarks |
| Warmth | Color temperature, border radius, shadow softness |
| Priority | Trade-off decisions throughout the design |
| Typography | Font family search direction |
| Color | Accent strategy and palette approach |
| Density | Spacing scale (4px vs 8px base) |
| Platform | Artboard sizes and layout strategy |
| Avoid | Explicit constraints for the design system |

**Gate**: Proceed to brief synthesis when both batches are answered. If the user selected "Other" for critical questions (Style ref, Warmth, Typography), ask one follow-up `AskUserQuestion` to clarify their custom input.

---

## Phase 3: Brief Synthesis

Spawn the `gdd-brief-extractor` agent with:
- The conversation transcript / answers
- Template: `{{GDD_ROOT}}/templates/brief.md`
- Output: `.design/BRIEF.md`

The agent synthesizes answers into structured BRIEF.md.

---

## Phase 4: Workflow Configuration

Use `AskUserQuestion` to configure workflow preferences:

```tool
AskUserQuestion({
  questions: [
    {
      question: "How do you want to work through the design phases?",
      header: "Mode",
      options: [
        { label: "Interactive", description: "Confirm each step before proceeding. More control, more involvement." },
        { label: "Express (Recommended)", description: "Auto-proceed after initial questions. Faster, less interruptions." }
      ],
      multiSelect: false
    },
    {
      question: "Which optional agents should be enabled?",
      header: "Agents",
      options: [
        { label: "Researcher", description: "Explores UI patterns and competitor visual analysis." },
        { label: "Moodboard", description: "Collects visual references and synthesizes mood direction." },
        { label: "Critic", description: "Structured design review after each rendered phase." },
        { label: "Accessibility", description: "WCAG AA compliance checks on rendered designs." }
      ],
      multiSelect: true
    },
    {
      question: "What color scheme for the designs?",
      header: "Scheme",
      options: [
        { label: "Light mode (Recommended)", description: "Light backgrounds, dark text. Classic and safe default." },
        { label: "Dark mode", description: "Dark backgrounds, light text. Modern, dramatic feel." },
        { label: "Both", description: "Design system supports both. More work, more complete." }
      ],
      multiSelect: false
    }
  ]
})
```

Store in `.design/config.json`.

---

## Phase 5: Research (Optional)

If researcher agent is enabled:

Spawn `gdd-design-researcher` agent with:
- `.design/BRIEF.md`
- Output: `.design/research/`

Produces:
- `PATTERNS.md` — UI patterns for this product type
- `COMPETITORS.md` — competitive visual analysis
- `TRENDS.md` — current and timeless trends
- `SUMMARY.md` — actionable synthesis

---

## Phase 6: Moodboard (Optional)

If moodboard agent is enabled:

Spawn `gdd-moodboard-synthesizer` agent with:
- `.design/BRIEF.md`
- `.design/research/SUMMARY.md` (if available)
- Output: `.design/moodboard/MOODBOARD.md`

---

## Phase 7: Requirements Definition

Gather v1 design requirements from the brief:

1. Generate DES-IDs for each requirement (DES-01, DES-02, ...)
2. Categorize: v1 (must have), v2 (nice to have), out of scope
3. Each requirement specifies:
   - What screen/component it applies to
   - Acceptance criteria (how to verify it's done)
   - Priority

Write `.design/REQUIREMENTS.md`.

DES-01 through DES-05 should always cover the design system fundamentals:
- DES-01: Color palette with semantic roles
- DES-02: Typography scale with verified fonts
- DES-03: Spacing system with base unit
- DES-04: Elevation system (shadows, radii)
- DES-05: Component token patterns

---

## Phase 8: Roadmap Creation

Spawn `gdd-design-roadmapper` agent with:
- `.design/BRIEF.md`
- `.design/REQUIREMENTS.md`
- Template: `{{GDD_ROOT}}/templates/roadmap.md`
- Output: `.design/ROADMAP.md`

Phase 1 is always "Design System Foundation."

---

## Phase 9: State Initialization

Create `.design/STATE.md` from template with:
- Current Phase: 1 (Design System Foundation)
- Status: initialized
- Adapter: [detected adapter]
- Progress: [0/N] 0%

Create phase directory: `.design/phases/01-design-system/`

---

## Completion

Display summary to user:

```
Design project initialized!

Brief:        .design/BRIEF.md
Requirements: .design/REQUIREMENTS.md
Roadmap:      .design/ROADMAP.md (N phases)
Adapter:      [paper/pencil/generic]

Phase 1: Design System Foundation — ready

Next: /gdd:explore-phase 1    (discuss your vision for the design system)
  or: /gdd:spec-phase 1       (jump straight to specifying the design system)
```

---

## Auto Mode

If invoked with `--auto` and a description is provided:
1. Skip deep questioning — extract brief from the provided description
2. Use defaults for configuration
3. Auto-approve research and moodboard
4. Auto-generate requirements and roadmap
5. Present summary and suggest next step
