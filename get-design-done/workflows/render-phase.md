# Workflow: render-phase

Execute the design specification in the connected design tool (or generate HTML/CSS specs).

---

## Arguments

- `phaseNum` — the phase number to render (required)

## Prerequisites

- Phase SPEC.md must exist
- TOKENS.md must exist
- Adapter must be configured in config.json

## Initialization

```bash
node "{{GDD_ROOT}}/bin/gdd-tools.cjs" init phase {{PHASE_NUM}}
```

Read:
- Phase SPEC.md (render instructions)
- TOKENS.md (for token resolution)
- config.json (adapter name)
- The active adapter file: `{{GDD_ROOT}}/adapters/{{ADAPTER}}.md`
- Reference file: render-strategies.md

---

## Rendering Process

### Step 1: Load Adapter

Read the adapter file and understand the operation mapping.

If adapter is "paper": MCP tools are `mcp__paper__*`
If adapter is "generic": All rendering goes to RENDERED.md as HTML/CSS

### Step 2: Font Verification (if design tool connected)

Before rendering any text:
1. Read the type scale from TOKENS.md
2. Use `check_font` (via adapter) to verify the primary font family is available
3. If not available, use `AskUserQuestion` to let the user choose an alternative:

```tool
AskUserQuestion({
  questions: [
    {
      question: "The font \"[Font Name]\" isn't available. Which alternative should we use?",
      header: "Font",
      multiSelect: false,
      options: [
        { label: "[Alternative 1]", description: "Most similar style and weight range." },
        { label: "[Alternative 2]", description: "Available on the system, good fallback." },
        { label: "[Alternative 3]", description: "Different character but verified available." }
      ]
    }
  ]
})
```

4. Check that required weights are available

### Step 3: Create Surface

Use `create_surface` (via adapter) to create the artboard:
- Name from SPEC.md
- Dimensions from SPEC.md

### Step 4: Incremental Rendering

Follow the render instructions from SPEC.md:

**For each visual group** (one per render call):
1. Resolve all token references to literal CSS values
2. Generate the HTML block (max ~15 lines)
3. Call `render_block` (via adapter) to place it on the canvas
4. Log the step in memory

**Every 2-3 render calls**:
1. Call `screenshot` (via adapter)
2. Evaluate against review checkpoints:
   - Spacing: even rhythm, no cramped areas?
   - Typography: readable, clear hierarchy?
   - Contrast: all text legible?
   - Alignment: consistent lanes?
   - Clipping: content cut off? (fix with height: "fit-content")
3. Fix any issues with `update_styles` or `update_text`
4. Log checkpoint result

### Step 5: Final Review

1. Full screenshot
2. Complete checkpoint evaluation
3. Verify token compliance

### Step 6: Finish

Call `finish_working` (via adapter) with all modified node IDs.

---

## Output

Write `.design/phases/NN-name/RENDERED.md` with:
- Surface info (artboard name, dimensions)
- All render steps logged
- Token resolution table
- Screenshot references
- Review checkpoint results

Update STATE.md:
- Status: rendered
- Last Action: Rendered Phase N

---

## Generic Adapter Rendering

When no design tool is connected:

1. Generate complete HTML + CSS for each component
2. Write to RENDERED.md in the documented format:
   - Per-component HTML code block
   - Per-component CSS code block
   - Token resolution notes
3. This output is copy-paste ready for any web project

---

## Completion

```
Phase {{PHASE_NUM}} rendered!

{{IF TOOL: Artboard created in [tool name]}}
{{IF GENERIC: HTML/CSS specs written to RENDERED.md}}

Render log: .design/phases/NN-name/RENDERED.md

Next: /gdd:critique-phase {{PHASE_NUM}}    (review the design)
```
