---
phase: {{PHASE_NUM}}
name: {{PHASE_NAME}}
status: critiqued
generated: {{TIMESTAMP}}
---

# Phase {{PHASE_NUM}}: {{PHASE_NAME}} — Design Critique

## Overall Assessment

**Grade**: {{GRADE}}
**Summary**: {{SUMMARY}}

## Detailed Review

### Visual Hierarchy
**Severity**: {{HIERARCHY_SEVERITY}}
{{HIERARCHY_NOTES}}

### Consistency with Design System
**Severity**: {{CONSISTENCY_SEVERITY}}
{{CONSISTENCY_NOTES}}

### Color & Contrast
**Severity**: {{COLOR_SEVERITY}}
{{COLOR_NOTES}}

### Typography
**Severity**: {{TYPOGRAPHY_SEVERITY}}
{{TYPOGRAPHY_NOTES}}

### Spacing & Rhythm
**Severity**: {{SPACING_SEVERITY}}
{{SPACING_NOTES}}

### Alignment
**Severity**: {{ALIGNMENT_SEVERITY}}
{{ALIGNMENT_NOTES}}

### Accessibility
**Severity**: {{A11Y_SEVERITY}}
{{A11Y_NOTES}}

### Production Readiness
**Severity**: {{PRODUCTION_SEVERITY}}
{{PRODUCTION_NOTES}}

## Issues

| # | Severity | Category | Description | Suggested Fix |
|---|----------|----------|-------------|---------------|
{{ISSUES_TABLE}}

## Severity Guide

- **critical**: Must fix before proceeding. Blocks usability or accessibility.
- **major**: Should fix. Noticeably impacts quality.
- **minor**: Nice to fix. Polish-level improvement.
- **note**: Observation for future reference.

## Token Compliance

{{TOKEN_COMPLIANCE}}

## Verdict

{{VERDICT}}
