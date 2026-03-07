# Color System

## Palette

### Neutrals

| Swatch | Token | Value | Usage |
|--------|-------|-------|-------|
| | neutral-50 | {{N50}} | Lightest background |
| | neutral-100 | {{N100}} | Secondary background |
| | neutral-200 | {{N200}} | Borders, dividers |
| | neutral-300 | {{N300}} | Disabled text |
| | neutral-400 | {{N400}} | Placeholder text |
| | neutral-500 | {{N500}} | Secondary text |
| | neutral-600 | {{N600}} | Body text |
| | neutral-700 | {{N700}} | Headings |
| | neutral-800 | {{N800}} | High emphasis text |
| | neutral-900 | {{N900}} | Maximum contrast |

### Accent

| Swatch | Token | Value | Usage |
|--------|-------|-------|-------|
| | accent-light | {{ACCENT_LIGHT}} | Background tint |
| | accent | {{ACCENT}} | Primary action |
| | accent-dark | {{ACCENT_DARK}} | Hover state |

### Semantic

| Swatch | Token | Value | Usage |
|--------|-------|-------|-------|
| | success | {{SUCCESS}} | Positive feedback |
| | warning | {{WARNING}} | Caution |
| | error | {{ERROR}} | Destructive / error |
| | info | {{INFO}} | Informational |

## Contrast Ratios

All text-background combinations must pass WCAG AA (4.5:1 for normal text, 3:1 for large text).

| Combination | Ratio | Pass |
|-------------|-------|------|
{{CONTRAST_TABLE}}

## Usage Guidelines

- **60-30-10 rule**: 60% neutral, 30% secondary, 10% accent
- Accent color should appear in no more than 2-3 elements per screen
- Never use accent as a background for large areas
- Semantic colors are reserved for feedback states only
