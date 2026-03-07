# Workflow: export

Export the design system as code artifacts.

---

## Prerequisites

- TOKENS.md must exist

## Export Formats

### CSS Custom Properties

```bash
node "{{GDD_ROOT}}/bin/gdd-tools.cjs" tokens-to-css
```

Generates a `:root { }` block with all tokens as CSS custom properties.
Output: `design-tokens.css`

### Tailwind Config

```bash
node "{{GDD_ROOT}}/bin/gdd-tools.cjs" tokens-to-tailwind
```

Generates a `tailwind.config.js` extending the default theme with design tokens.
Output: `tailwind.config.js`

### JSON Tokens

Parse TOKENS.md and output as structured JSON.
Output: `design-tokens.json`

### JSX Components

If phases have been rendered with a design tool, use `export_jsx` (via adapter) to export component JSX.

---

## Process

1. Ask the user which format(s) they want:
   - CSS Custom Properties
   - Tailwind Config
   - JSON Tokens
   - JSX Components (requires design tool)
   - All of the above

2. Generate selected exports
3. Write to project root (or user-specified directory)
4. Show summary of exported files
