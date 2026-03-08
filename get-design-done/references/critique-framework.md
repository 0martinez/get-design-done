# Design Critique Framework

Structured critique methodology for GDD design reviews. Loaded by the design critic agent.

---

## Critique Philosophy

Design critique is nuanced evaluation, not pass/fail testing. The goal is to identify what works, what doesn't, and what could be better — with actionable suggestions.

Critique is not personal. It evaluates the design against its stated goals and design system tokens.

---

## Critique Dimensions

### 1. Visual Hierarchy

**What to evaluate**:
- Is there a clear reading order?
- Does the most important element command attention?
- Are there competing focal points?
- Does the squint test pass? (Blur to 25% — can you still identify primary content?)

**Severity guide**:
- Critical: No clear hierarchy, user doesn't know where to look
- Major: Competing elements of equal visual weight
- Minor: Hierarchy exists but could be sharper

### 2. Design System Consistency

**What to evaluate**:
- Do all colors reference tokens from TOKENS.md?
- Do all text styles map to the type scale?
- Are spacing values from the spacing scale?
- Are border radii consistent?
- Are shadow levels consistent?

**Severity guide**:
- Critical: Significant off-system values throughout
- Major: Some off-system values or inconsistent token usage
- Minor: One or two values slightly off

### 3. Color & Contrast

**What to evaluate**:
- Does all text pass WCAG AA contrast ratios?
- Is the 60-30-10 ratio respected?
- Are semantic colors used appropriately?
- Is there visual monotony (all one tone)?
- Is there visual chaos (too many competing colors)?

**Severity guide**:
- Critical: Text fails contrast requirements
- Major: Accent overused or semantic colors misused
- Minor: Could benefit from more/less color variation

### 4. Typography

**What to evaluate**:
- Is text readable at intended sizes?
- Are heading levels used correctly (hierarchy)?
- Is line height comfortable for reading?
- Is letter spacing appropriate for each size?
- Are there more than 3 font sizes on screen?

**Severity guide**:
- Critical: Text too small to read, missing hierarchy
- Major: Inconsistent type styles, poor line height
- Minor: Tracking could be tightened on display type

### 5. Spacing & Rhythm

**What to evaluate**:
- Is spacing consistent within groups?
- Does spacing create clear visual grouping?
- Is the container principle followed (outer > inner)?
- Is there intentional variation (tight groups, generous sections)?
- Are there cramped areas or unnecessarily empty areas?

**Severity guide**:
- Critical: Spacing creates confusion about relationships
- Major: Inconsistent spacing breaks visual rhythm
- Minor: Small adjustments would improve flow

### 6. Alignment

**What to evaluate**:
- Do elements form consistent vertical and horizontal lanes?
- Are icons aligned across repeated rows?
- Are text baselines aligned where appropriate?
- Is the grid respected?

**Severity guide**:
- Critical: Obvious misalignment visible at a glance
- Major: Alignment issues in repeated elements (lists, tables)
- Minor: Subtle alignment that could be tightened

### 7. Accessibility

**What to evaluate**:
- Contrast ratios (4.5:1 normal text, 3:1 large text, 3:1 UI components)
- Touch target sizes (44x44px minimum)
- Color not used as sole indicator
- Focus indicators visible
- Text readable at larger sizes

**Severity guide**:
- Critical: Fails WCAG AA requirements
- Major: Marginal contrast, small touch targets
- Minor: Could improve to AAA level

### 8. Production Readiness

**What to evaluate**:
- Are interactive states defined?
- Are edge cases handled (long text, empty states)?
- Are responsive behaviors specified?
- Is the design achievable in code?
- Are there any rendering artifacts?

**Severity guide**:
- Critical: Design cannot be implemented as-is
- Major: Missing important states or edge cases
- Minor: Polish-level improvements needed

---

## Critique Output Format

```markdown
## Overall Assessment

**Grade**: A / B / C / D
**Summary**: One sentence verdict

## [Dimension Name]
**Severity**: pass / minor / major / critical
[Specific observations with references to elements]
[Suggested improvements]

## Issues Table

| # | Severity | Category | Fix Type | Description | Fix |
|---|----------|----------|----------|-------------|-----|
| 1 | critical | contrast | token-fix | Body text at 3.2:1 ratio | Darken text-secondary to #555 |
```

---

## Fix Types

Every issue must include a Fix Type to enable automated fix application.

| Fix Type | Meaning | Automated? | Example |
|----------|---------|------------|---------|
| `token-fix` | Update/add a value in TOKENS.md | Yes | "Add code font token", "Darken text-secondary" |
| `render-fix` | Update styles on rendered nodes via design tool | Yes | "Increase contrast on element", "Add border" |
| `spec-fix` | Requires SPEC.md changes and re-rendering | No (flagged) | "Restructure layout", "Add missing section" |
| `note` | Informational, no action needed | No | "Consider for future iteration" |

Classification rule: if the change should propagate to all future uses → token-fix. If it's a one-off rendered element adjustment → render-fix.

---

## Grading Rubric

| Grade | Meaning | Criteria |
|-------|---------|----------|
| A | Excellent | No critical/major issues, strong design craft |
| B | Good | No critical issues, 1-2 major issues, solid overall |
| C | Needs Work | 1+ critical or 3+ major issues |
| D | Significant Issues | Multiple critical issues, fundamental problems |

---

## Token Compliance Scoring

Count the percentage of visual properties that correctly reference design tokens:

| Score | Rating |
|-------|--------|
| 95-100% | Fully compliant |
| 85-94% | Mostly compliant |
| 70-84% | Partially compliant |
| < 70% | Non-compliant |
