# Paper Adapter

Maps GDD abstract operations to Paper MCP tool calls (`mcp__paper__*`).

Paper is a professional design tool for creating user interfaces on a 2D canvas. It accepts HTML/CSS for rendering content onto artboards.

---

## Operation Mapping

### Surface Management

| Abstract Operation | MCP Tool | Parameter Mapping |
|---|---|---|
| `create_surface` | `mcp__paper__create_artboard` | name, width, height |
| `get_surface_info` | `mcp__paper__get_basic_info` | — (returns all artboards) |
| `list_surfaces` | `mcp__paper__get_basic_info` | — (parse artboards from result) |

### Content Rendering

| Abstract Operation | MCP Tool | Parameter Mapping |
|---|---|---|
| `render_block` | `mcp__paper__write_html` | parentId -> parent_id, html -> html |
| `update_text` | `mcp__paper__set_text_content` | nodeId -> node_id, text -> content |
| `update_styles` | `mcp__paper__update_styles` | nodeIds -> [node_id], styles -> styles_object |
| `clone_node` | `mcp__paper__duplicate_nodes` | nodeIds -> [node_id] |
| `delete_node` | `mcp__paper__delete_nodes` | nodeIds -> [node_id] |

### Reading & Inspection

| Abstract Operation | MCP Tool | Parameter Mapping |
|---|---|---|
| `get_tree` | `mcp__paper__get_tree_summary` | nodeId -> root_id (optional) |
| `get_children` | `mcp__paper__get_children` | nodeId -> node_id |
| `get_node_info` | `mcp__paper__get_node_info` | nodeId -> node_id |
| `get_styles` | `mcp__paper__get_computed_styles` | nodeIds -> node_ids[] |
| `screenshot` | `mcp__paper__get_screenshot` | nodeId -> node_id (optional), scale -> scale |

### Typography

| Abstract Operation | MCP Tool | Parameter Mapping |
|---|---|---|
| `get_fonts` | `mcp__paper__get_basic_info` | — (returns loaded fonts) |
| `check_font` | `mcp__paper__get_font_family_info` | family -> family_name |

### Export

| Abstract Operation | MCP Tool | Parameter Mapping |
|---|---|---|
| `export_jsx` | `mcp__paper__get_jsx` | nodeId -> node_id |
| `get_fill_image` | `mcp__paper__get_fill_image` | nodeId -> node_id |

### Lifecycle

| Abstract Operation | MCP Tool | Parameter Mapping |
|---|---|---|
| `finish_working` | `mcp__paper__finish_working_on_nodes` | nodeIds -> node_ids[] |

---

## Paper-Specific Guidance

### Rendering Strategy

Paper renders HTML/CSS directly onto the canvas. When using `render_block`:

1. **Write small, write often.** Each `render_block` call should add roughly ONE visual group — a header, a single list row, a button group, a card shell.
2. **Never batch an entire component.** A card with a header, 4 rows, and a footer is 6+ separate `render_block` calls.
3. **Screenshot after every 2-3 modifications** using the critique checklist.

### Font Handling

- Always call `check_font` before using a font family for the first time.
- Prefer fonts already loaded in the document (shown in `get_surface_info` results).
- Use `px` for font sizes, `em` for letter spacing, `px` for line height.

### Review Checkpoints

After every 2-3 render_block calls, take a screenshot and evaluate:
- **Spacing**: Uneven gaps, cramped groups, empty areas
- **Typography**: Text too small, poor hierarchy
- **Contrast**: Low contrast text, elements blending into background
- **Alignment**: Elements that should share a lane but don't
- **Clipping**: Content cut off at edges (fix with height: "fit-content")

### Artboard Conventions

- Mobile: 375px wide
- Tablet: 768px wide
- Desktop: 1440px wide
- Use artboard width to determine layout approach

### Color Scheme

- Default to light mode unless user requests dark
- Use deliberate, minimal color — one intense accent > five competing colors
- Build palettes from neutrals first
