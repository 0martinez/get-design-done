# Spacing System

## Base Unit

**Base**: {{SPACE_BASE}}
**System**: {{SPACING_SYSTEM}}

## Scale

| Token | Value | Multiplier | Usage |
|-------|-------|------------|-------|
| space-xs | {{SPACE_XS}} | {{MULT_XS}} | Inline gaps, icon-to-label |
| space-sm | {{SPACE_SM}} | {{MULT_SM}} | Related element spacing |
| space-md | {{SPACE_MD}} | {{MULT_MD}} | Default group spacing |
| space-lg | {{SPACE_LG}} | {{MULT_LG}} | Section spacing |
| space-xl | {{SPACE_XL}} | {{MULT_XL}} | Major section breaks |
| space-2xl | {{SPACE_2XL}} | {{MULT_2XL}} | Page-level spacing |

## Container Principle

- Outer containers use larger spacing
- Inner elements use tighter spacing
- Padding decreases as nesting increases:
  - Page: space-xl / space-2xl
  - Section: space-lg
  - Card: space-md
  - Element group: space-sm
  - Inline: space-xs

## Rhythm

Consistent vertical rhythm uses the base unit as a grid.
Line heights should be multiples of the base unit for optical alignment.

## Density Modes

| Mode | Scale Factor | Use Case |
|------|-------------|----------|
| Comfortable | 1.0x | Marketing, landing pages |
| Default | 0.75x | Standard product UI |
| Compact | 0.5x | Data-dense dashboards |
