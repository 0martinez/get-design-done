# Elevation System

## Shadow Scale

| Token | Value | Usage |
|-------|-------|-------|
| shadow-sm | {{SHADOW_SM}} | Cards, subtle lift |
| shadow-md | {{SHADOW_MD}} | Dropdowns, tooltips |
| shadow-lg | {{SHADOW_LG}} | Modals, dialogs |

## Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| radius-sm | {{RADIUS_SM}} | Inputs, tags, chips |
| radius-md | {{RADIUS_MD}} | Cards, buttons |
| radius-lg | {{RADIUS_LG}} | Modals, large containers |
| radius-full | 9999px | Pills, avatars, circular elements |

## Layering

| Layer | Z-Index | Elements |
|-------|---------|----------|
| Base | 0 | Page content |
| Raised | 1 | Cards, sticky headers |
| Dropdown | 10 | Menus, popovers |
| Overlay | 100 | Overlays, scrims |
| Modal | 1000 | Dialogs, modals |
| Toast | 10000 | Notifications, toasts |

## Guidelines

- Shadows should be barely visible — the suggestion of depth, not a heavy effect
- Prefer border-based elevation for light mode, shadow-based for dark mode
- Only 1-2 shadow levels should be visible on any screen at once
- Shadows use the palette's cool/warm tone, never pure black
