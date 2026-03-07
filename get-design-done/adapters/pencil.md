# Pencil Adapter (Stub)

Maps GDD abstract operations to Pencil MCP tool calls (`mcp__pencil__*`).

> **Status**: This adapter is a stub. Pencil MCP tool names and parameters should be filled in once the Pencil MCP server specification is available.

---

## Operation Mapping

### Surface Management

| Abstract Operation | MCP Tool | Parameter Mapping |
|---|---|---|
| `create_surface` | `mcp__pencil__create_canvas` | TBD |
| `get_surface_info` | `mcp__pencil__get_info` | TBD |
| `list_surfaces` | `mcp__pencil__list_canvases` | TBD |

### Content Rendering

| Abstract Operation | MCP Tool | Parameter Mapping |
|---|---|---|
| `render_block` | `mcp__pencil__add_element` | TBD |
| `update_text` | `mcp__pencil__set_text` | TBD |
| `update_styles` | `mcp__pencil__set_styles` | TBD |
| `clone_node` | `mcp__pencil__duplicate` | TBD |
| `delete_node` | `mcp__pencil__delete` | TBD |

### Reading & Inspection

| Abstract Operation | MCP Tool | Parameter Mapping |
|---|---|---|
| `get_tree` | `mcp__pencil__get_tree` | TBD |
| `get_children` | `mcp__pencil__get_children` | TBD |
| `get_node_info` | `mcp__pencil__get_node` | TBD |
| `get_styles` | `mcp__pencil__get_styles` | TBD |
| `screenshot` | `mcp__pencil__screenshot` | TBD |

### Typography

| Abstract Operation | MCP Tool | Parameter Mapping |
|---|---|---|
| `get_fonts` | `NOT_SUPPORTED` | Fallback: use system fonts |
| `check_font` | `NOT_SUPPORTED` | Fallback: assume availability |

### Export

| Abstract Operation | MCP Tool | Parameter Mapping |
|---|---|---|
| `export_jsx` | `NOT_SUPPORTED` | Fallback: generate from spec |
| `get_fill_image` | `NOT_SUPPORTED` | Fallback: skip |

### Lifecycle

| Abstract Operation | MCP Tool | Parameter Mapping |
|---|---|---|
| `finish_working` | `mcp__pencil__flush` | TBD |
