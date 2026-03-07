# Workflow: progress

Show project status and suggest next action.

---

## Initialization

```bash
node "{{GDD_ROOT}}/bin/gdd-tools.cjs" init resume
```

Read:
- STATE.md (current position)
- ROADMAP.md (phase breakdown)

---

## Display

```bash
node "{{GDD_ROOT}}/bin/gdd-tools.cjs" roadmap-progress
```

Show:
1. Progress bar with percentage
2. Current phase and status
3. Per-phase status breakdown
4. Recent decisions from STATE.md

---

## Next Action Routing

Based on current state, suggest the appropriate next command:

| State | Suggestion |
|-------|-----------|
| Phase not started | `/gdd:explore-phase N` |
| Phase explored | `/gdd:spec-phase N` |
| Phase specified | `/gdd:render-phase N` |
| Phase rendered | `/gdd:critique-phase N` |
| Phase critiqued (pass) | `/gdd:explore-phase N+1` |
| Phase critiqued (revise) | `/gdd:render-phase N` (fix issues first) |
| All phases complete | `/gdd:audit-consistency` and `/gdd:audit-accessibility` |
