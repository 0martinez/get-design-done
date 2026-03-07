# Component Patterns

## Buttons

### Primary
- Background: accent token
- Text: surface-primary token (or white)
- Border radius: radius-md
- Padding: space-sm horizontal, space-xs vertical
- Font: body weight 500

### Secondary
- Background: transparent
- Border: 1px border token
- Text: text-primary token
- Same sizing as primary

### Ghost
- Background: transparent
- No border
- Text: accent token
- Hover: accent-subtle background

## Inputs

- Height: 40px (default), 32px (compact)
- Border: 1px border token
- Border radius: radius-sm
- Padding: space-sm horizontal
- Focus: accent border, optional accent-subtle ring
- Placeholder: text-tertiary token

## Cards

- Background: surface-tertiary or surface-primary
- Border: 1px border-subtle (or shadow-sm)
- Border radius: radius-md
- Padding: space-md
- Prefer flat cards (border) over shadowed in light mode

## Navigation

- Height: 56px (mobile), 64px (desktop)
- Background: surface-primary
- Border bottom: 1px border-subtle
- Active indicator: accent token

## Lists

- Row height: 44px minimum (touch target)
- Divider: 1px border-subtle
- Padding: space-sm vertical, space-md horizontal
- Consistent vertical lane alignment for icons and actions

## Modals

- Max width: 480px (small), 640px (medium), 800px (large)
- Border radius: radius-lg
- Shadow: shadow-lg
- Overlay: neutral-900 at 50% opacity
- Padding: space-lg
