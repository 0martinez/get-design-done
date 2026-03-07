# Workflow: resume-work

Restore context from a previous session.

---

## Initialization

```bash
node "{{GDD_ROOT}}/bin/gdd-tools.cjs" init resume
```

---

## Context Restoration

1. Read STATE.md for:
   - Current phase and status
   - Last action taken
   - Recent decisions
   - Active blockers
   - Session continuity notes

2. Read BRIEF.md summary (first 10 lines)

3. Read current phase's latest artifact:
   - If explored → show CONTEXT.md summary
   - If specified → show SPEC.md summary
   - If rendered → show RENDERED.md summary
   - If critiqued → show CRITIQUE.md verdict

---

## Output

```
Welcome back!

Project: [name from BRIEF.md]
Current: Phase N — [name] ([status])
Last action: [from STATE.md]
Progress: [bar]

Recent decisions:
- [decision 1]
- [decision 2]

Next: [suggested command based on status]
```

Update STATE.md session timestamp.
