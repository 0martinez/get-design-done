# Workflow: add-component

Add a new component pattern to the design system.

---

## Prerequisites

- TOKENS.md must exist
- system/COMPONENTS.md must exist

## Process

1. Ask the user what component to add (or accept as argument)
2. Load reference: component-patterns.md
3. Check if the component already exists in system/COMPONENTS.md

4. Define the component:
   - States (default, hover, active, focus, disabled)
   - Sizes (if applicable)
   - Token usage for each property
   - Variants (primary, secondary, ghost, etc.)

5. Append to system/COMPONENTS.md
6. Optionally add to TOKENS.md if new tokens are needed

7. Show the component definition and ask for approval

## Output

Updated system/COMPONENTS.md with the new component pattern.
