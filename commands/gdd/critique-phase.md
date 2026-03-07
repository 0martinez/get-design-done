Review a rendered design phase with structured critique.

Usage: /gdd:critique-phase <phase-number>

Evaluates the design against 8 dimensions: visual hierarchy, design system consistency, color & contrast, typography, spacing, alignment, accessibility, and production readiness. Produces a grade (A-D) with severity-rated issues and actionable fixes.

## Workflow

@get-design-done/workflows/critique-phase.md

## References

@get-design-done/references/critique-framework.md
@get-design-done/references/accessibility-standards.md

## Agents

- gdd-design-critic: Produces structured critique with severity ratings

## Next Steps

If the critique passes, proceed to the next phase with `/gdd:explore-phase <N+1>`.
If revision is needed, fix issues and re-render with `/gdd:render-phase <N>`.
