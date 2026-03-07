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

Ask about:
1. **Color temperature**: "Should the palette feel warm (cream, sand tones) or cool (slate, blue-gray)?"
2. **Accent color**: "Do you have a color in mind for buttons and links? Even a vague direction — 'something blue' — is helpful."
3. **Typography**: "Should the text feel modern and clean (like a tech product) or warm and readable (like a blog)?"
4. **Density**: "More breathing room (like Apple) or more packed with info (like a dashboard)?"
5. **Roundedness**: "Sharp corners (like Linear) or rounded corners (like Notion)?"

### For Other Phases

Ask about:
1. **Layout**: "How do you picture this screen laid out? Sidebar? Single column? Grid of cards?"
2. **Priority**: "What's the most important thing the user should see first on this screen?"
3. **Reference**: "Any specific product or screenshot that's close to what you imagine?"
4. **Boundaries**: "What should this phase NOT try to do?"
5. **Interaction**: "Any specific interactions? Hover effects, animations, expandable sections?"

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
