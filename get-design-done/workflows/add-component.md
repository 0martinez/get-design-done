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

7. Show the component definition and ask for approval via `AskUserQuestion`:

```tool
AskUserQuestion({
  questions: [
    {
      question: "The [Component] definition is ready. How should we proceed?",
      header: "Approval",
      multiSelect: false,
      options: [
        { label: "Approve & save", description: "Add the component to COMPONENTS.md as defined." },
        { label: "Adjust variants", description: "Modify the variants (e.g., add/remove primary, ghost, etc.)." },
        { label: "Adjust sizing", description: "Change the size scale (heights, padding, font sizes)." },
        { label: "Start over", description: "Discard and redefine the component from scratch." }
      ]
    }
  ]
})
```

## Output

Updated system/COMPONENTS.md with the new component pattern.
