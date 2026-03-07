Create a detailed, render-ready design specification for a phase.

Usage: /gdd:spec-phase <phase-number>

For Phase 1 (Design System Foundation), this creates TOKENS.md — the single source of truth for the entire design system. For other phases, it creates a detailed SPEC.md mapping every visual property to design tokens.

## Workflow

@get-design-done/workflows/spec-phase.md

## References

@get-design-done/references/color-theory.md
@get-design-done/references/typography-guide.md
@get-design-done/references/spacing-systems.md
@get-design-done/references/component-patterns.md
@get-design-done/references/layout-patterns.md

## Agents

- gdd-system-architect: Creates the design system (Phase 1)
- gdd-design-specifier: Creates detailed specs (other phases)

## Next Steps

After completion, run `/gdd:render-phase <N>` to execute the design.
