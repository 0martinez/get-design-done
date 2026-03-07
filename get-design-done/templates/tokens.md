---
generated: {{TIMESTAMP}}
status: draft
---

# Design Tokens

Single source of truth for the design system. Every render operation resolves tokens from this file.

## Colors

### Primary Palette

| Token | Value | Role |
|-------|-------|------|
| surface-primary | {{SURFACE_PRIMARY}} | Main background |
| surface-secondary | {{SURFACE_SECONDARY}} | Secondary background |
| surface-tertiary | {{SURFACE_TERTIARY}} | Cards, elevated surfaces |
| text-primary | {{TEXT_PRIMARY}} | Body text, headings |
| text-secondary | {{TEXT_SECONDARY}} | Supporting text, captions |
| text-tertiary | {{TEXT_TERTIARY}} | Placeholder, disabled |
| accent | {{ACCENT}} | Primary action, links |
| accent-subtle | {{ACCENT_SUBTLE}} | Hover states, highlights |
| border | {{BORDER}} | Dividers, input borders |
| border-subtle | {{BORDER_SUBTLE}} | Subtle separators |

### Semantic Colors

| Token | Value | Role |
|-------|-------|------|
| success | {{SUCCESS}} | Success states |
| warning | {{WARNING}} | Warning states |
| error | {{ERROR}} | Error states |
| info | {{INFO}} | Informational states |

## Typography

**Font Family**: {{FONT_FAMILY}}
**Fallback**: {{FONT_FALLBACK}}

### Type Scale

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| display | {{DISPLAY_SIZE}} | {{DISPLAY_WEIGHT}} | {{DISPLAY_LH}} | Hero headings |
| heading-1 | {{H1_SIZE}} | {{H1_WEIGHT}} | {{H1_LH}} | Page titles |
| heading-2 | {{H2_SIZE}} | {{H2_WEIGHT}} | {{H2_LH}} | Section headings |
| heading-3 | {{H3_SIZE}} | {{H3_WEIGHT}} | {{H3_LH}} | Subsection headings |
| body | {{BODY_SIZE}} | {{BODY_WEIGHT}} | {{BODY_LH}} | Body text |
| body-small | {{BODY_SM_SIZE}} | {{BODY_SM_WEIGHT}} | {{BODY_SM_LH}} | Secondary text |
| caption | {{CAPTION_SIZE}} | {{CAPTION_WEIGHT}} | {{CAPTION_LH}} | Captions, labels |
| overline | {{OVERLINE_SIZE}} | {{OVERLINE_WEIGHT}} | {{OVERLINE_LH}} | Category labels |

### Letter Spacing

| Token | Value | Usage |
|-------|-------|-------|
| tight | {{LS_TIGHT}} | Large display type |
| normal | {{LS_NORMAL}} | Body text |
| wide | {{LS_WIDE}} | Overlines, small caps |

## Spacing

**Base unit**: {{SPACE_BASE}}

| Token | Value | Usage |
|-------|-------|-------|
| space-xs | {{SPACE_XS}} | Tight element gaps |
| space-sm | {{SPACE_SM}} | Related element gaps |
| space-md | {{SPACE_MD}} | Group gaps |
| space-lg | {{SPACE_LG}} | Section gaps |
| space-xl | {{SPACE_XL}} | Major section gaps |
| space-2xl | {{SPACE_2XL}} | Page-level spacing |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| radius-sm | {{RADIUS_SM}} | Subtle rounding (inputs, tags) |
| radius-md | {{RADIUS_MD}} | Cards, buttons |
| radius-lg | {{RADIUS_LG}} | Modals, large containers |
| radius-full | 9999px | Pills, avatars |

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| shadow-sm | {{SHADOW_SM}} | Subtle lift (cards) |
| shadow-md | {{SHADOW_MD}} | Dropdowns, popovers |
| shadow-lg | {{SHADOW_LG}} | Modals, dialogs |

## Layout

**Max content width**: {{MAX_WIDTH}}
**Grid columns**: {{GRID_COLUMNS}}
**Gutter**: {{GUTTER}}

## Breakpoints

| Token | Value |
|-------|-------|
| mobile | 375px |
| tablet | 768px |
| desktop | 1024px |
| wide | 1440px |
