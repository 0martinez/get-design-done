# GDD Adapter Interface

This document defines the abstract operations that every design tool adapter must implement. Adapters are markdown files that map these abstract operations to specific MCP tool calls (or fallback behaviors).

Workflows and agents call abstract operations. The renderer agent reads the active adapter file and translates each abstract operation into the correct tool call for the connected design tool.

---

## Abstract Operations

### Surface Management

| Operation | Description | Inputs |
|-----------|-------------|--------|
| `create_surface` | Create a new artboard/canvas/frame | name, width, height |
| `get_surface_info` | Get artboard dimensions and metadata | surface_id (optional) |
| `list_surfaces` | List all artboards in the document | — |

### Content Rendering

| Operation | Description | Inputs |
|-----------|-------------|--------|
| `render_block` | Write an HTML block onto the surface | parent_id, html, position |
| `update_text` | Change the text content of a node | node_id, text |
| `update_styles` | Apply CSS-like styles to a node | node_id, styles_object |
| `clone_node` | Duplicate an existing node | node_id, new_name (optional) |
| `delete_node` | Remove a node from the tree | node_id |

### Reading & Inspection

| Operation | Description | Inputs |
|-----------|-------------|--------|
| `get_tree` | Get the layer tree summary | root_id (optional) |
| `get_children` | List direct children of a node | node_id |
| `get_node_info` | Get detailed info about a node | node_id |
| `get_styles` | Get computed CSS styles | node_ids[] |
| `screenshot` | Take a screenshot of the canvas | node_id (optional), scale |

### Typography

| Operation | Description | Inputs |
|-----------|-------------|--------|
| `get_fonts` | Get available font families info | — |
| `check_font` | Check if a specific font is available | family_name |

### Export

| Operation | Description | Inputs |
|-----------|-------------|--------|
| `export_jsx` | Export a node tree as JSX | node_id |
| `get_fill_image` | Get the fill image of a node | node_id |

### Lifecycle

| Operation | Description | Inputs |
|-----------|-------------|--------|
| `finish_working` | Signal that a batch of changes is complete | node_ids[] |

---

## Adapter File Format

Each adapter file must contain a markdown table mapping every abstract operation to its concrete implementation. The table format:

```
| Abstract Operation | Tool Call | Parameter Mapping |
```

If an operation is not supported by the tool, the adapter should specify `NOT_SUPPORTED` and describe a fallback behavior.

## Fallback Chain

When an adapter marks an operation as `NOT_SUPPORTED`:
1. The renderer should skip the operation
2. If it's a critical operation (render_block, create_surface), fall back to generating HTML/CSS specs in the phase RENDERED.md file
3. Never fail silently — always note what was skipped in the render log

## Adding a New Adapter

1. Copy `generic.md` as a starting point
2. Map each abstract operation to the new tool's MCP calls
3. Test with `/gdd:render-phase 1` to verify the mapping works
4. Submit as a PR to the GDD repository
