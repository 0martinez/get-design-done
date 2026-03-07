# Generic Adapter (No Design Tool)

Fallback adapter when no design tool MCP is connected. Instead of rendering to a visual canvas, all operations produce HTML/CSS specifications written to the phase's RENDERED.md file.

This adapter enables GDD to work without any design tool — useful for:
- Generating design specs for handoff to a designer
- Creating HTML/CSS that can be pasted into any tool
- Working in environments where no MCP design tool is available

---

## Operation Mapping

### Surface Management

| Abstract Operation | MCP Tool | Fallback Behavior |
|---|---|---|
| `create_surface` | `NOT_SUPPORTED` | Write surface dimensions to RENDERED.md header |
| `get_surface_info` | `NOT_SUPPORTED` | Read from RENDERED.md metadata |
| `list_surfaces` | `NOT_SUPPORTED` | List sections in RENDERED.md |

### Content Rendering

| Abstract Operation | MCP Tool | Fallback Behavior |
|---|---|---|
| `render_block` | `NOT_SUPPORTED` | Append HTML block to RENDERED.md under appropriate section |
| `update_text` | `NOT_SUPPORTED` | Update text in RENDERED.md HTML block |
| `update_styles` | `NOT_SUPPORTED` | Update inline styles in RENDERED.md HTML block |
| `clone_node` | `NOT_SUPPORTED` | Duplicate HTML section in RENDERED.md |
| `delete_node` | `NOT_SUPPORTED` | Remove HTML section from RENDERED.md |

### Reading & Inspection

| Abstract Operation | MCP Tool | Fallback Behavior |
|---|---|---|
| `get_tree` | `NOT_SUPPORTED` | Parse RENDERED.md structure |
| `get_children` | `NOT_SUPPORTED` | Parse RENDERED.md section children |
| `get_node_info` | `NOT_SUPPORTED` | Read RENDERED.md section |
| `get_styles` | `NOT_SUPPORTED` | Extract inline styles from RENDERED.md |
| `screenshot` | `NOT_SUPPORTED` | Skip — note in render log |

### Typography

| Abstract Operation | MCP Tool | Fallback Behavior |
|---|---|---|
| `get_fonts` | `NOT_SUPPORTED` | Use Google Fonts defaults from tokens |
| `check_font` | `NOT_SUPPORTED` | Assume Google Fonts availability |

### Export

| Abstract Operation | MCP Tool | Fallback Behavior |
|---|---|---|
| `export_jsx` | `NOT_SUPPORTED` | Convert RENDERED.md HTML to JSX |
| `get_fill_image` | `NOT_SUPPORTED` | Skip |

### Lifecycle

| Abstract Operation | MCP Tool | Fallback Behavior |
|---|---|---|
| `finish_working` | `NOT_SUPPORTED` | Write completion marker to RENDERED.md |

---

## RENDERED.md Format (Generic Adapter)

When using the generic adapter, RENDERED.md becomes the primary output artifact:

```markdown
# Phase N: [Name] — Rendered Specs

**Surface**: [width] x [height]
**Adapter**: generic (HTML/CSS specs only)
**Generated**: [timestamp]

## Section: [Component Name]

### HTML
\`\`\`html
<div class="component-name">
  ...
</div>
\`\`\`

### CSS
\`\`\`css
.component-name {
  ...
}
\`\`\`

### Notes
- Token references resolved inline
- [Any design decisions or alternatives noted]
```

This format allows the HTML/CSS to be directly used in any web project or pasted into a design tool manually.
