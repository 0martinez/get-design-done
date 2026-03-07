# Spacing Systems Reference

---

## Base Unit Systems

### 4px Grid (Recommended for dense UI)

Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96

Good for: productivity tools, dashboards, data-heavy interfaces

### 8px Grid (Recommended for standard UI)

Scale: 8, 16, 24, 32, 48, 64, 96, 128

Good for: consumer apps, marketing sites, content-focused products

### Choosing Between Them

- If the product shows lots of data or has dense list views → 4px
- If the product prioritizes readability and breathing room → 8px
- When in doubt, start with 8px base and drop to 4px for compact areas

---

## The Container Principle

Spacing should create a visual nesting hierarchy:

```
Page margin:     space-xl or space-2xl (48-96px)
  Section gap:   space-lg (32-48px)
    Card padding: space-md (16-24px)
      Group gap:  space-sm (8-12px)
        Inline:   space-xs (4-8px)
```

The rule: **outer containers get more space, inner elements get less**.

---

## Token Mapping

### For 4px Base

| Token | Value | Multiplier | Usage |
|-------|-------|------------|-------|
| space-xs | 4px | 1x | Icon gaps, inline spacing |
| space-sm | 8px | 2x | Related elements, form fields |
| space-md | 16px | 4x | Card padding, group gaps |
| space-lg | 24px | 6x | Section gaps |
| space-xl | 48px | 12x | Major section breaks |
| space-2xl | 64px | 16x | Page-level spacing |

### For 8px Base

| Token | Value | Multiplier | Usage |
|-------|-------|------------|-------|
| space-xs | 8px | 1x | Tight gaps, inline |
| space-sm | 16px | 2x | Related elements |
| space-md | 24px | 3x | Groups, cards |
| space-lg | 32px | 4x | Sections |
| space-xl | 64px | 8x | Major breaks |
| space-2xl | 96px | 12x | Page-level |

---

## Vertical Rhythm

When line height is a multiple of the base unit, text naturally aligns to the spacing grid.

For 8px base with 16px body text:
- Line height: 24px (1.5 × 16px, and 3 × 8px base)
- Paragraph spacing: 16px or 24px (multiples of 8)

This creates a vertical rhythm where elements snap to invisible gridlines.

---

## Responsive Spacing

Spacing should scale down on smaller screens:

| Token | Desktop | Tablet | Mobile |
|-------|---------|--------|--------|
| space-xl | 64px | 48px | 32px |
| space-lg | 32px | 24px | 20px |
| space-md | 24px | 20px | 16px |
| space-sm | 16px | 12px | 8px |
| space-xs | 8px | 8px | 4px |

Reduction is not linear — small values stay stable, large values compress more.

---

## Spacing and Grouping (Gestalt)

Use spacing to communicate relationships:
- **Tight spacing** (space-xs, space-sm) → elements are related
- **Medium spacing** (space-md) → elements are in the same group
- **Wide spacing** (space-lg, space-xl) → elements are in different groups

This is more powerful than boxes or dividers for showing structure.

---

## Common Spacing Mistakes

1. **Everything equidistant**: Same gap everywhere = no visual grouping
2. **Too tight everywhere**: Dense layout without breathing room = claustrophobic
3. **Inconsistent padding**: Card A has 12px padding, Card B has 20px → looks broken
4. **Ignoring the grid**: Random values like 13px, 17px, 22px → subtle visual noise
5. **Fixed spacing on responsive layouts**: Not scaling spacing for mobile
