# Workflow: edit-tokens

Interactive editing of the design system tokens.

---

## Prerequisites

- TOKENS.md must exist

## Process

1. Read current TOKENS.md
2. Ask the user what they want to change:
   - Color adjustments
   - Typography changes
   - Spacing modifications
   - Add new tokens
   - Remove tokens

3. For each change:
   - Show the current value
   - Accept the new value
   - Validate (contrast ratios for colors, scale consistency for typography)
   - Preview impact: list which phases use this token

4. Write updated TOKENS.md
5. Update system/*.md files if affected

6. Warn if rendered phases may need re-rendering:
```
Token [name] changed from [old] to [new].
This token is used in phases: [list]
Run /gdd:render-phase N to update those designs.
```

## Update STATE.md

- Last Action: Edited tokens ([list of changed tokens])
- Add decision: "Changed [token] from [old] to [new] because [reason]"
