# Component Patterns Reference

Design rules for common UI components.

---

## Buttons

### Sizing

| Size | Height | Padding (H) | Font Size | Use Case |
|------|--------|-------------|-----------|----------|
| Small | 32px | 12px | 13-14px | Inline actions, table rows |
| Medium | 40px | 16px | 14-15px | Default, forms |
| Large | 48px | 24px | 16px | Primary CTAs, hero |

### Hierarchy

1. **Primary**: Filled with accent color. One per section maximum.
2. **Secondary**: Outlined or subdued fill. Supporting actions.
3. **Ghost/Tertiary**: Text only, no background. Low-emphasis actions.
4. **Destructive**: Error color. Only for irreversible actions.

### States

| State | Visual Change |
|-------|--------------|
| Default | Base appearance |
| Hover | Slight darken or background shift |
| Active/Pressed | Darker, slight scale-down |
| Focus | Visible focus ring (2px accent outline, 2px offset) |
| Disabled | 50% opacity, no pointer events |
| Loading | Spinner replaces label or shows beside it |

---

## Form Inputs

### Anatomy

```
[Label]
[  Placeholder text...          ] ← Input
[Helper text or error message]
```

### Sizing

| Size | Height | Use |
|------|--------|-----|
| Compact | 32px | Dense forms, filters |
| Default | 40px | Standard forms |
| Large | 48px | Onboarding, simple forms |

### States

- Default: neutral border
- Focus: accent border + optional ring
- Error: error color border + error message below
- Disabled: reduced opacity, not interactive
- Read-only: no border, text only appearance

### Rules

- Labels above inputs (not placeholder-as-label)
- Required fields: asterisk after label or "optional" tag on optional fields
- Error messages appear below the input, not as tooltips
- Group related fields visually (address, credit card)

---

## Cards

### Anatomy

```
[ Image (optional)               ]
[ Title                          ]
[ Description text               ]
[ Meta / Tags        ] [ Action  ]
```

### Variants

1. **Flat**: Border only, no shadow. Clean, modern.
2. **Elevated**: Subtle shadow. Distinguishes from background.
3. **Interactive**: Hover effect (lift or border change). For clickable cards.
4. **Compact**: Horizontal layout, smaller padding. For lists/feeds.

### Rules

- Consistent padding within a card set
- Image aspect ratio: consistent across a card grid
- Limit content: 2-3 lines of description max
- Action area: either entire card is clickable, or specific buttons

---

## Navigation

### Top Navigation Bar

- Height: 56px (mobile), 64px (desktop)
- Logo + primary nav items + utility items (search, profile)
- Active state: accent color indicator or bold text
- Mobile: collapses to hamburger + logo + key action

### Sidebar Navigation

- Width: 240-280px expanded, 56-64px collapsed (icon only)
- Groups with section headers
- Active item: accent background or left border indicator
- Scroll independently from main content

### Tab Navigation

- Horizontal tabs for switching views within a section
- Active tab: accent underline (2-3px) or filled background
- Max 5-7 visible tabs, overflow to scrollable or dropdown
- Tab content should not jump layout when switching

---

## Data Tables

### Anatomy

```
[ Column Header | Column Header | Column Header ]
[ Cell          | Cell          | Cell           ]
[ Cell          | Cell          | Cell           ]
```

### Rules

- Row height: 44px minimum (48-52px comfortable)
- Alternating row colors: optional, subtle (2-3% opacity difference)
- Sticky header for scrollable tables
- Right-align numerical data
- Left-align text data
- Action column: far right, consistent width

---

## Modals / Dialogs

### Sizing

| Size | Max Width | Use |
|------|-----------|-----|
| Small | 400px | Confirmations, simple inputs |
| Medium | 560px | Forms, detail views |
| Large | 720px | Complex content, multi-step |

### Rules

- Overlay: neutral-900 at 40-60% opacity
- Close: X button top-right + click-outside + Escape key
- Actions: right-aligned, primary action rightmost
- Focus trap: keyboard navigation stays within modal
- Stack on mobile: modal goes full-width with bottom-aligned actions

---

## Empty States

Every view should have a designed empty state:
- Illustration or icon (optional but effective)
- Clear explanation of what will appear here
- Primary action to populate the view
- No "no data" or blank screens

---

## Loading States

- Skeleton screens over spinners (for content areas)
- Inline spinners for buttons and small interactions
- Progress bars for deterministic operations
- Never block the entire page if only a section is loading
