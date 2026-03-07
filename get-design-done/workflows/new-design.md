# Workflow: new-design

Unified initialization workflow. Takes a user from zero to a complete design brief, research, design system foundation, and roadmap.

---

## Prerequisites

None — this is the entry point.

## Initialization

```bash
node "{{GDD_ROOT}}/bin/gdd-tools.cjs" init new-design
```

This returns paths to:
- `projectDir` — current working directory
- `designDir` — `.design/` path
- `exists` — whether `.design/` already exists
- `gddRoot` — GDD framework installation path
- `referencesDir`, `templatesDir`, `adaptersDir`

If `exists` is true, warn the user and ask whether to continue (will overwrite) or abort.

---

## Phase 1: Adapter Detection

Detect which design tool MCP is available:

1. Check for `mcp__paper__*` tools → adapter = "paper"
2. Check for `mcp__pencil__*` tools → adapter = "pencil"
3. No design tool found → adapter = "generic"

Store adapter choice in config.json.

If Paper is detected, call `mcp__paper__get_basic_info` to learn:
- Available artboards (if any)
- Loaded fonts
- Document dimensions

---

## Phase 2: Deep Questioning

Load the questioning guide:
```
Read {{GDD_ROOT}}/references/design-questioning.md
```

Conduct an interactive conversation to understand:

1. **Product Identity**: What they're building, who it's for, what it does
2. **Visual Warmth**: Warm/approachable vs. precise/professional
3. **Density**: Spacious vs. information-dense
4. **Color Confidence**: Bold accent vs. quiet minimal
5. **Typography Feel**: Modern vs. classic vs. technical
6. **Complexity**: Number of screens, platform, data complexity

Use the questioning techniques from the reference:
- **Comparison technique**: "More like Notion or Linear?"
- **Three-option technique**: Offer three concrete choices, not binary
- **"What annoys you" technique**: What designs do they dislike?
- **Priority triangle**: Rank: impressive, easy to use, ships fast

**Gate**: When you have confident answers for product personality, color direction, typography feel, platform, and at least 2 visual references — proceed to synthesis.

---

## Phase 3: Brief Synthesis

Spawn the `gdd-brief-extractor` agent with:
- The conversation transcript / answers
- Template: `{{GDD_ROOT}}/templates/brief.md`
- Output: `.design/BRIEF.md`

The agent synthesizes answers into structured BRIEF.md.

---

## Phase 4: Workflow Configuration

Ask the user to configure preferences:

1. **Mode**: Interactive (confirm each step) or Express (auto-approve after initial questions)
2. **Agents**: Enable/disable optional agents:
   - Researcher (explores patterns and competitors)
   - Moodboard (collects visual references)
   - Critic (reviews rendered designs)
   - Accessibility checker
3. **Color scheme preference**: Light mode (default) or dark mode

Store in `.design/config.json`.

---

## Phase 5: Research (Optional)

If researcher agent is enabled:

Spawn `gdd-design-researcher` agent with:
- `.design/BRIEF.md`
- Output: `.design/research/`

Produces:
- `PATTERNS.md` — UI patterns for this product type
- `COMPETITORS.md` — competitive visual analysis
- `TRENDS.md` — current and timeless trends
- `SUMMARY.md` — actionable synthesis

---

## Phase 6: Moodboard (Optional)

If moodboard agent is enabled:

Spawn `gdd-moodboard-synthesizer` agent with:
- `.design/BRIEF.md`
- `.design/research/SUMMARY.md` (if available)
- Output: `.design/moodboard/MOODBOARD.md`

---

## Phase 7: Requirements Definition

Gather v1 design requirements from the brief:

1. Generate DES-IDs for each requirement (DES-01, DES-02, ...)
2. Categorize: v1 (must have), v2 (nice to have), out of scope
3. Each requirement specifies:
   - What screen/component it applies to
   - Acceptance criteria (how to verify it's done)
   - Priority

Write `.design/REQUIREMENTS.md`.

DES-01 through DES-05 should always cover the design system fundamentals:
- DES-01: Color palette with semantic roles
- DES-02: Typography scale with verified fonts
- DES-03: Spacing system with base unit
- DES-04: Elevation system (shadows, radii)
- DES-05: Component token patterns

---

## Phase 8: Roadmap Creation

Spawn `gdd-design-roadmapper` agent with:
- `.design/BRIEF.md`
- `.design/REQUIREMENTS.md`
- Template: `{{GDD_ROOT}}/templates/roadmap.md`
- Output: `.design/ROADMAP.md`

Phase 1 is always "Design System Foundation."

---

## Phase 9: State Initialization

Create `.design/STATE.md` from template with:
- Current Phase: 1 (Design System Foundation)
- Status: initialized
- Adapter: [detected adapter]
- Progress: [0/N] 0%

Create phase directory: `.design/phases/01-design-system/`

---

## Completion

Display summary to user:

```
Design project initialized!

Brief:        .design/BRIEF.md
Requirements: .design/REQUIREMENTS.md
Roadmap:      .design/ROADMAP.md (N phases)
Adapter:      [paper/pencil/generic]

Phase 1: Design System Foundation — ready

Next: /gdd:explore-phase 1    (discuss your vision for the design system)
  or: /gdd:spec-phase 1       (jump straight to specifying the design system)
```

---

## Auto Mode

If invoked with `--auto` and a description is provided:
1. Skip deep questioning — extract brief from the provided description
2. Use defaults for configuration
3. Auto-approve research and moodboard
4. Auto-generate requirements and roadmap
5. Present summary and suggest next step
