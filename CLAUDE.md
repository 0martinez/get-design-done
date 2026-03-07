# Get Design Done (GDD)

A meta-prompting, context engineering and design system framework for Claude Code. The design counterpart to [Get Shit Done](https://github.com/gsd-build/get-shit-done).

## What this is

GDD encodes expert design knowledge into structured reference files and guides developers through the questions a designer would ask — producing design systems and production-quality designs through any MCP-connected design tool.

## Architecture

- **`.claude/get-design-done/`** — Framework core (adapters, references, templates, workflows)
- **`.claude/agents/gdd-*.md`** — Specialized agent prompts
- **`.claude/commands/gdd/*.md`** — Slash command entry points
- **`.design/`** — Project artifacts (created per-project by `/gdd:new-design`)

## Key Commands

- `/gdd:new-design` — Initialize a new design project
- `/gdd:explore-phase N` — Discuss vision for phase N
- `/gdd:spec-phase N` — Create detailed design spec
- `/gdd:render-phase N` — Execute design in connected tool
- `/gdd:critique-phase N` — Structured design review
- `/gdd:help` — Full command reference

## Key Files

- `TOKENS.md` — Single source of truth for design system
- `BRIEF.md` — Product context and direction
- `ROADMAP.md` — Phase breakdown
- `STATE.md` — Session memory

## Conventions

- Phase 1 is always "Design System Foundation"
- All visual values resolve from TOKENS.md
- Adapters are markdown files mapping abstract ops to MCP calls
- No design jargon in user-facing interactions
- Critique uses severity levels (critical/major/minor/note), not pass/fail
