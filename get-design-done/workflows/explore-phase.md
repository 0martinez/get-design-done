# Workflow: explore-phase

Interactive discussion to capture the user's vision for a specific design phase before specifying it.

---

## Arguments

- `phaseNum` — the phase number to explore (required)

## Prerequisites

- `.design/` directory exists with BRIEF.md, TOKENS.md (if phase > 1), ROADMAP.md

## Initialization

```bash
node "{{GDD_ROOT}}/bin/gdd-tools.cjs" init phase {{PHASE_NUM}}
```

Read:
- BRIEF.md (product context)
- ROADMAP.md (this phase's requirements and success criteria)
- TOKENS.md (if phase > 1, for design system context)
- Previous phase CONTEXT.md files (for continuity)

---

## Exploration Conversation

Load the questioning guide:
```
Read {{GDD_ROOT}}/references/design-questioning.md
```

The goal is to understand how the user envisions this specific phase. Use concrete visual comparisons, not design jargon.

### For Phase 1 (Design System)

Use `AskUserQuestion` to collect design system preferences:

```tool
AskUserQuestion({
  questions: [
    {
      question: "Should the color palette feel warm or cool?",
      header: "Temperature",
      multiSelect: false,
      options: [
        { label: "Cool", description: "Slate, blue-gray tones. Like Linear or Vercel." },
        { label: "Warm", description: "Cream, sand, earthy tones. Like Notion or Basecamp." },
        { label: "Neutral", description: "True gray, no color cast. Like GitHub." }
      ]
    },
    {
      question: "What accent color direction for buttons and links?",
      header: "Accent",
      multiSelect: false,
      options: [
        { label: "Blue", description: "Trust, stability, technology. The safe default." },
        { label: "Red / Vermillion", description: "Bold, warm, energetic. Stands out on neutral palettes." },
        { label: "Green / Teal", description: "Calm, modern, growth. Good for tools and productivity." },
        { label: "No preference", description: "Let the system architect decide based on the brief." }
      ]
    },
    {
      question: "How should the corners and overall shape feel?",
      header: "Shape",
      multiSelect: false,
      options: [
        { label: "Sharp (2-4px radius)", description: "Precise, technical, editorial. Like Linear." },
        { label: "Moderate (6-8px radius)", description: "Balanced, modern default. Like Stripe." },
        { label: "Rounded (12-16px radius)", description: "Soft, friendly, approachable. Like Notion." }
      ]
    }
  ]
})
```

Then ask a follow-up about density and typography if not already covered in BRIEF.md:

```tool
AskUserQuestion({
  questions: [
    {
      question: "How much breathing room should the designs have?",
      header: "Density",
      multiSelect: false,
      options: [
        { label: "Spacious", description: "Generous white space, like Apple or a luxury brand." },
        { label: "Balanced", description: "Standard spacing. Comfortable for most products." },
        { label: "Dense", description: "Information-rich, compact. Like a dashboard or IDE." }
      ]
    }
  ]
})
```

### For Other Phases

Use `AskUserQuestion` to collect phase-specific preferences:

```tool
AskUserQuestion({
  questions: [
    {
      question: "How do you picture this screen laid out?",
      header: "Layout",
      multiSelect: false,
      options: [
        { label: "Single column", description: "Centered content, focused reading flow." },
        { label: "Two columns", description: "Sidebar + content, or split layout." },
        { label: "Grid of cards", description: "Repeating card layout for collections." },
        { label: "Not sure", description: "Let the specifier decide based on content." }
      ]
    },
    {
      question: "What's the most important thing the user should see first?",
      header: "Priority",
      multiSelect: false,
      options: [
        { label: "A headline / value prop", description: "Text-first: communicate the message immediately." },
        { label: "A visual / image", description: "Visual-first: show don't tell." },
        { label: "A CTA / action", description: "Action-first: get the user to do something." },
        { label: "Data / content", description: "Content-first: let the information speak." }
      ]
    },
    {
      question: "What should this phase NOT try to do?",
      header: "Boundaries",
      multiSelect: true,
      options: [
        { label: "No animations / interactions", description: "Keep it static for now." },
        { label: "No responsive variants", description: "Desktop only, mobile comes later." },
        { label: "No dark mode variant", description: "Light mode only for this phase." },
        { label: "No edge cases", description: "Happy path only, no empty/error states." }
      ]
    }
  ]
})
```

Optionally, ask about visual references if the user might have them:

```tool
AskUserQuestion({
  questions: [
    {
      question: "Any product or site whose design feels close to what you imagine?",
      header: "Reference",
      multiSelect: false,
      options: [
        { label: "Linear", description: "Minimal, precise, dev-focused." },
        { label: "Stripe", description: "Premium, polished, editorial." },
        { label: "Notion", description: "Friendly, clean, flexible." },
        { label: "No reference", description: "Start fresh without a benchmark." }
      ]
    }
  ]
})
```

---

## Gate

Proceed to writing CONTEXT.md when you have:
- A clear vision statement for the phase
- At least 2 concrete deliverables
- User preferences documented
- Essential requirements vs. nice-to-haves separated

---

## Output

Write `.design/phases/NN-name/CONTEXT.md` with:
- Vision statement
- Deliverables
- User preferences
- Visual direction
- Essentials (must have)
- Boundaries (out of scope)

Update STATE.md:
- Status: exploring
- Last Action: Explored Phase N

---

## Completion

```
Phase {{PHASE_NUM}} exploration complete!

Vision captured in: .design/phases/NN-name/CONTEXT.md

Next: /gdd:spec-phase {{PHASE_NUM}}    (create detailed specification)
```
