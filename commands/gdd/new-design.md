Initialize a new design project through the GDD guided workflow.

Usage: /gdd:new-design [--auto]

The --auto flag enables hands-off mode: provide a product description and GDD will automatically run through brief extraction, research, requirements, and roadmap creation.

## Workflow

@get-design-done/workflows/new-design.md

## References

@get-design-done/references/design-questioning.md
@get-design-done/references/design-principles.md

## Agents

- gdd-brief-extractor: Synthesizes user answers into BRIEF.md
- gdd-design-researcher: Researches UI patterns and competitors
- gdd-moodboard-synthesizer: Collects visual references
- gdd-design-roadmapper: Creates phase roadmap from brief

## Generated Artifacts

- `.design/BRIEF.md` — Product context and design direction
- `.design/config.json` — Adapter and workflow preferences
- `.design/REQUIREMENTS.md` — Design requirements with DES-IDs
- `.design/ROADMAP.md` — Phase breakdown with success criteria
- `.design/STATE.md` — Session memory
- `.design/research/` — Patterns, competitors, trends (if research enabled)
- `.design/moodboard/` — Visual references (if moodboard enabled)

## Next Steps

After completion, run `/gdd:explore-phase 1` to discuss the design system, or `/gdd:spec-phase 1` to jump straight to specification.
