# Workflow: help

Display GDD command reference.

---

**GDD** (Get Design Done) creates design systems and production-quality designs guided by encoded design expertise.

## Quick Start

1. `/gdd:new-design` — Initialize project (brief, research, tokens, roadmap)
2. `/gdd:spec-phase 1` — Specify the design system
3. `/gdd:render-phase 1` — Render it in your design tool
4. `/gdd:critique-phase 1` — Review the design
5. Repeat for each phase

## Core Workflow

```
/gdd:new-design → /gdd:explore-phase → /gdd:spec-phase → /gdd:render-phase → /gdd:critique-phase → repeat
```

### Project Initialization

**`/gdd:new-design`**
Initialize a new design project through a guided flow:
- Deep questioning to understand your product and visual direction
- Optional research (patterns, competitors, trends)
- Design requirements with DES-IDs
- Phase roadmap (Phase 1 is always Design System Foundation)

Creates `.design/` with BRIEF.md, REQUIREMENTS.md, ROADMAP.md, STATE.md

### Phase Workflow

**`/gdd:explore-phase <N>`** — Discuss your vision for a phase before specifying it
**`/gdd:spec-phase <N>`** — Create detailed design specification with token mapping
**`/gdd:render-phase <N>`** — Execute the design in your connected tool (or generate HTML/CSS)
**`/gdd:critique-phase <N>`** — Structured design review with severity ratings

### Design System

**`/gdd:edit-tokens`** — Modify design system tokens (colors, type, spacing)
**`/gdd:add-component`** — Add a new component pattern to the system

### Research & Inspiration

**`/gdd:inspire-phase <N>`** — Research design patterns for a specific phase

### Quality Auditing

**`/gdd:audit-consistency`** — Check all designs use tokens correctly
**`/gdd:audit-accessibility`** — WCAG AA compliance audit

### Export

**`/gdd:export`** — Export tokens as CSS custom properties, Tailwind config, or JSON

### Utility

**`/gdd:progress`** — Show project status and suggest next action
**`/gdd:resume-work`** — Restore context from previous session
**`/gdd:settings`** — Configure workflow preferences
**`/gdd:help`** — Show this reference

## Files & Structure

```
.design/
  BRIEF.md              — Product, users, brand, goals
  TOKENS.md             — Design system (single source of truth)
  REQUIREMENTS.md       — Design requirements (DES-01, DES-02...)
  ROADMAP.md            — Phase breakdown with success criteria
  STATE.md              — Session memory (<100 lines)
  config.json           — Adapter, preferences
  moodboard/            — Visual references
  research/             — Patterns, competitors, trends
  system/               — Detailed design system docs
  phases/
    01-design-system/
      CONTEXT.md        — Exploration notes
      SPEC.md           — Render-ready specification
      RENDERED.md       — Render log
      CRITIQUE.md       — Design review
    02-feature-name/
      ...
```

## Adapters

GDD is tool-agnostic. It detects which design tool MCP is available:
- **Paper**: Full visual rendering on canvas
- **Pencil**: (stub — coming soon)
- **Generic**: HTML/CSS specification output (no design tool needed)

## Philosophy

- **TOKENS.md is the single source of truth** — every design decision traces back to it
- **Phase 1 is always Design System** — colors, type, spacing before any screens
- **No design jargon** — questions use concrete visual comparisons
- **Critique, not verify** — design review is nuanced with severity levels, not pass/fail
- **Incremental rendering** — watch the design build up in real-time
