# Typography System

## Font Stack

**Primary**: {{FONT_FAMILY}}
**Fallback**: {{FONT_FALLBACK}}
**Loaded weights**: {{LOADED_WEIGHTS}}

## Type Scale

Ratio: {{SCALE_RATIO}} ({{SCALE_NAME}})

| Level | Size | Weight | Line Height | Letter Spacing | Sample |
|-------|------|--------|-------------|----------------|--------|
| Display | {{DISPLAY_SIZE}} | {{DISPLAY_WEIGHT}} | {{DISPLAY_LH}} | {{DISPLAY_LS}} | — |
| H1 | {{H1_SIZE}} | {{H1_WEIGHT}} | {{H1_LH}} | {{H1_LS}} | — |
| H2 | {{H2_SIZE}} | {{H2_WEIGHT}} | {{H2_LH}} | {{H2_LS}} | — |
| H3 | {{H3_SIZE}} | {{H3_WEIGHT}} | {{H3_LH}} | {{H3_LS}} | — |
| Body | {{BODY_SIZE}} | {{BODY_WEIGHT}} | {{BODY_LH}} | {{BODY_LS}} | — |
| Body Small | {{BODY_SM_SIZE}} | {{BODY_SM_WEIGHT}} | {{BODY_SM_LH}} | {{BODY_SM_LS}} | — |
| Caption | {{CAPTION_SIZE}} | {{CAPTION_WEIGHT}} | {{CAPTION_LH}} | {{CAPTION_LS}} | — |
| Overline | {{OVERLINE_SIZE}} | {{OVERLINE_WEIGHT}} | {{OVERLINE_LH}} | {{OVERLINE_LS}} | — |

## Hierarchy Rules

1. Maximum 3 heading levels visible on any single screen
2. Display type uses tighter tracking; body uses normal
3. Overlines are always uppercase with wide tracking
4. Minimum text size: 14px (12px only for dense productivity UI)
5. Body text is never pure black or pure gray — calibrate to palette warmth

## Weight Contrast

- Pair heavy display (700-900) with light labels (300-400)
- Body text: 400 regular, 500 medium for emphasis, 600 semibold for strong emphasis
- Never use more than 3 weights on a single screen

## Line Length

- Optimal: 45-75 characters per line
- Max width for body text: {{MAX_PROSE_WIDTH}}
