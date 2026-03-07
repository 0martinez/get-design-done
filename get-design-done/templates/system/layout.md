# Layout System

## Grid

**Columns**: {{GRID_COLUMNS}}
**Gutter**: {{GUTTER}}
**Max width**: {{MAX_WIDTH}}
**Margin**: auto (centered)

## Breakpoints

| Name | Width | Columns | Behavior |
|------|-------|---------|----------|
| Mobile | 375px | 4 | Stack layout |
| Tablet | 768px | 8 | Adapted layout |
| Desktop | 1024px | 12 | Full layout |
| Wide | 1440px | 12 | Expanded layout |

## Common Patterns

### Single Column
- Max width: {{MAX_PROSE_WIDTH}}
- Centered with auto margins
- Use for: articles, forms, settings

### Sidebar + Content
- Sidebar: 240-280px fixed
- Content: fluid remainder
- Collapse sidebar on mobile

### Dashboard Grid
- Cards in responsive grid
- Min card width: 300px
- Gap: space-md

### Split Screen
- 50/50 or 40/60 split
- Use for: auth pages, onboarding
- Stack on mobile

## Container Widths

| Name | Max Width | Usage |
|------|-----------|-------|
| narrow | 640px | Forms, dialogs, articles |
| default | 1024px | General content |
| wide | 1280px | Dashboards, data tables |
| full | 100% | Edge-to-edge layouts |

## Responsive Strategy

- Mobile-first: base styles for smallest screen
- Progressive enhancement at each breakpoint
- Avoid hiding critical content on mobile — restructure instead
- Touch targets: minimum 44x44px on mobile
