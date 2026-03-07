# Render Strategies Reference

How to execute designs through the adapter layer. Loaded by the renderer agent.

---

## Incremental Rendering

The user watches the design build up in real-time. This is a feature, not a limitation.

### Principles

1. **One visual group per render call**: header, single list row, button group, card shell
2. **Never batch an entire component**: Break complex components into 3-8 render calls
3. **Screenshot every 2-3 modifications**: Evaluate using the review checklist
4. **Build top-down**: Start with the container, add content progressively

### Rendering Order

For any screen or component:
1. Create the surface (artboard) with correct dimensions
2. Render the outermost container/background
3. Add the primary content area structure
4. Fill in primary content (headings, hero elements)
5. Add secondary content (body text, descriptions)
6. Add supporting elements (metadata, tags, badges)
7. Add interactive elements (buttons, inputs, icons)
8. Screenshot and critique
9. Adjust and polish

---

## Token Resolution

Every design property must be resolved from TOKENS.md before rendering.

### Resolution Process

1. Read the SPEC.md for the phase
2. For each visual property in the spec, find the corresponding token
3. Resolve the token to its literal CSS value from TOKENS.md
4. Apply the literal value in the render call

### Example Resolution

```
Spec says: "Heading uses heading-1 token"
TOKENS.md says: heading-1 | 32px | 700 | 40px
Render with: font-size: 32px; font-weight: 700; line-height: 40px;

Spec says: "Background uses surface-primary"
TOKENS.md says: surface-primary | #FAFAF9 | Main background
Render with: background-color: #FAFAF9;
```

### Never Hard-Code

If a value isn't in TOKENS.md, either:
1. Add it to TOKENS.md first, then render
2. Flag it as an off-system value in RENDERED.md

---

## Adapter-Mediated Rendering

### With a Connected Design Tool (Paper, Pencil)

```
SPEC.md → Token resolution → Abstract operation → Adapter mapping → MCP tool call
```

The renderer agent:
1. Reads the adapter file to learn the tool-specific mapping
2. Translates each abstract operation to the concrete MCP call
3. Executes the call with resolved token values
4. Logs each step in RENDERED.md

### Without a Design Tool (Generic Adapter)

```
SPEC.md → Token resolution → HTML/CSS generation → Write to RENDERED.md
```

The renderer agent:
1. Generates standards-compliant HTML/CSS
2. Inlines all token-resolved values
3. Writes each section to RENDERED.md
4. Provides copy-paste-ready code

---

## Layer Naming Convention

When creating layers in the design tool, use descriptive, hierarchical names:

```
Phase-01-Design-System/
  Color-Palette/
    Primary/
    Neutrals/
    Semantic/
  Type-Specimen/
    Heading-Scale/
    Body-Samples/
  Spacing-Grid/
```

Rules:
- PascalCase with hyphens for multi-word names
- Phase prefix for top-level groups
- Never use auto-generated names (Layer 1, Frame 42)

---

## Review Checkpoint Protocol

After every 2-3 render calls, take a screenshot and evaluate:

1. **Spacing**: Are gaps even? Any cramped areas? Clear visual rhythm?
2. **Typography**: Text readable? Clear hierarchy between heading/body/caption?
3. **Contrast**: Low-contrast text? Elements blending into background?
4. **Alignment**: Shared vertical/horizontal lanes? Icons aligned across rows?
5. **Clipping**: Content cut off at edges? (Fix with height: "fit-content")
6. **Repetition**: Too grid-like? Vary scale/weight/spacing for visual interest.

Document each checkpoint in RENDERED.md with:
- Screenshot reference
- What was evaluated
- Any issues found and how they were fixed

---

## Handling Rendering Failures

| Issue | Resolution |
|-------|-----------|
| Font not available | Fall back to system font, note in RENDERED.md |
| Artboard too small | Increase dimensions, re-render |
| Content clipping | Set overflow dimension to "fit-content" |
| Color rendering differs | Verify hex values, check color space |
| Layout breaks | Simplify HTML structure, use flexbox |
| Tool disconnection | Switch to generic adapter, continue with HTML/CSS |

---

## Performance Tips

- Reuse structure with clone_node + update_text/update_styles when building repeated elements (list rows, card grids)
- Don't re-render entire sections to fix small issues — use targeted update_styles or update_text calls
- Group related changes before calling finish_working
