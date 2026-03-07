Execute the design specification in your connected design tool.

Usage: /gdd:render-phase <phase-number>

Reads the phase SPEC.md, resolves all tokens from TOKENS.md to literal CSS values, and renders incrementally through the detected design tool adapter (Paper, Pencil, or generic HTML/CSS output).

## Workflow

@get-design-done/workflows/render-phase.md

## References

@get-design-done/references/render-strategies.md

## Adapters

@get-design-done/adapters/adapter-interface.md

## Agents

- gdd-renderer: Executes designs via the adapter layer

## Next Steps

After completion, run `/gdd:critique-phase <N>` to review the design.
