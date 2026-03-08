# Get Design Done (GDD)

[![npm](https://img.shields.io/npm/v/get-design-done)](https://www.npmjs.com/package/get-design-done)

A meta-prompting, context engineering and design system framework for [Claude Code](https://claude.ai/claude-code). The design counterpart to [Get Shit Done](https://github.com/gsd-build/get-shit-done).

GDD encodes expert design knowledge and guides developers through the questions a designer would ask — producing design systems and production-quality designs through any MCP-connected design tool.

<!-- TODO: Add demo GIF or screenshot here -->

## Install

```bash
npx get-design-done
```

This walks you through choosing global (`~/.claude/`, all projects) or local (`./.claude/`, this project only).

For CI or non-interactive use, pass flags directly:

```bash
npx get-design-done --global   # all projects
npx get-design-done --local    # this project only
```

## Quick Start

```
/gdd:new-design              # Initialize project (brief, research, tokens, roadmap)
/gdd:spec-phase 1            # Specify the design system
/gdd:render-phase 1          # Render it in your design tool
/gdd:critique-phase 1        # Review the design
```

Then repeat `/gdd:explore-phase N` -> `/gdd:spec-phase N` -> `/gdd:render-phase N` -> `/gdd:critique-phase N` for each phase.

## How It Works

GDD is a collection of specialized agents, reference files, and workflow prompts that run inside Claude Code. When you start a new design, GDD interviews you about your product through concrete visual comparisons — not abstract design jargon. Your answers feed into a structured brief, which agents use to generate a complete design system (`TOKENS.md`) covering colors, typography, spacing, and more. From there, each phase is specified, rendered through your connected design tool via MCP adapters, and reviewed with structured critique. The design knowledge lives in reference files so you don't need any — GDD asks the questions a designer would ask, then builds it for you.

## What It Does

### No design jargon

GDD asks concrete questions through visual comparisons — "More like Notion or Linear?" — not abstract terminology. Design expertise stays encoded in reference files that agents load behind the scenes.

### Tool-agnostic via adapters

Adapters are markdown files mapping abstract operations to MCP tool calls. Currently supports:

- **Paper** — full visual rendering on canvas
- **Pencil** — design generation and editing in `.pen` files
- **Generic** — HTML/CSS spec output (no design tool needed)

Adding a new tool = writing one markdown file. See `get-design-done/adapters/adapter-interface.md`.

### Design system as source of truth

`TOKENS.md` holds every design decision — colors, typography, spacing, shadows, radii. Every render operation resolves tokens to literal CSS values. Every critique checks compliance.

### Structured critique, not pass/fail

Design review evaluates 8 dimensions (hierarchy, consistency, contrast, typography, spacing, alignment, accessibility, production readiness) with severity ratings (critical/major/minor/note).

## Commands

| Command | Purpose |
|---------|---------|
| `/gdd:new-design` | Initialize project: brief, research, requirements, roadmap |
| `/gdd:explore-phase N` | Discuss vision for a phase |
| `/gdd:spec-phase N` | Create detailed design specification |
| `/gdd:render-phase N` | Execute design in connected tool |
| `/gdd:critique-phase N` | Structured design review |
| `/gdd:edit-tokens` | Modify design system tokens |
| `/gdd:add-component` | Add component pattern to system |
| `/gdd:inspire-phase N` | Research design patterns for a phase |
| `/gdd:audit-consistency` | Token compliance audit |
| `/gdd:audit-accessibility` | WCAG AA accessibility audit |
| `/gdd:export` | Export as CSS, Tailwind, or JSON |
| `/gdd:progress` | Show status, suggest next action |
| `/gdd:resume-work` | Restore context from previous session |
| `/gdd:settings` | Configure preferences |
| `/gdd:help` | Full command reference |

## Workflow

```
Brief -> Explore -> Spec -> Render -> Critique -> (next phase)
```

Phase 1 is always **Design System Foundation** — colors, type, spacing established before any screens.

## Project Structure

After running `/gdd:new-design`:

```
.design/
  BRIEF.md              # Product, users, brand, goals
  TOKENS.md             # Design system (single source of truth)
  REQUIREMENTS.md       # Design requirements (DES-01, DES-02...)
  ROADMAP.md            # Phase breakdown with success criteria
  STATE.md              # Session memory
  config.json           # Adapter, preferences
  moodboard/            # Visual references
  research/             # Patterns, competitors, trends
  system/               # Detailed design system docs
  phases/
    01-design-system/
      CONTEXT.md        # Exploration notes
      SPEC.md           # Render-ready specification
      RENDERED.md       # Render log
      CRITIQUE.md       # Design review
```

## Requirements

- [Claude Code](https://claude.ai/claude-code) CLI
- For visual rendering: a design tool with MCP support (e.g., [Paper](https://paper.design))
- Without a design tool: GDD outputs HTML/CSS specs via the generic adapter

## License

MIT
