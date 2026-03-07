# Accessibility Standards Reference

WCAG compliance rules and practical design accessibility guidelines.

---

## WCAG AA Requirements (Minimum Target)

### Perceivable

#### 1.1 Text Alternatives
- All images have alt text
- Decorative images use empty alt (`alt=""`)
- Complex images have extended descriptions

#### 1.3 Adaptable
- Information is not conveyed by color alone
- Content has a meaningful reading order
- Orientation is not restricted (works landscape and portrait)

#### 1.4 Distinguishable

**Contrast Ratios**:

| Element | Minimum Ratio | Rule |
|---------|--------------|------|
| Normal text (< 24px regular, < 18.66px bold) | 4.5:1 | AA |
| Large text (>= 24px regular, >= 18.66px bold) | 3:1 | AA |
| UI components (icons, borders, controls) | 3:1 | AA |
| Focus indicators | 3:1 | AA |

**Text Spacing**: Content must accommodate:
- Line height: at least 1.5x font size
- Paragraph spacing: at least 2x font size
- Letter spacing: at least 0.12x font size
- Word spacing: at least 0.16x font size

**Reflow**: Content is usable at 320px width (no horizontal scroll for vertical content).

### Operable

#### 2.1 Keyboard Accessible
- All functionality available via keyboard
- No keyboard traps
- Focus order matches visual order

#### 2.4 Navigable
- Skip-to-content link as first focusable element
- Page titles are descriptive
- Focus visible on all interactive elements
- Headings are descriptive and sequential

#### 2.5 Input Modalities
- **Touch targets**: Minimum 44x44 CSS pixels
- Touch targets have at least 8px gap between them
- Pointer gestures have single-pointer alternatives

### Understandable

#### 3.1 Readable
- Page language is specified (`lang` attribute)
- Abbreviations are explained

#### 3.2 Predictable
- Focus does not trigger unexpected changes
- Consistent navigation across pages
- Consistent component identification

#### 3.3 Input Assistance
- Error messages identify the field and describe the error
- Labels are associated with inputs
- Error prevention: confirm destructive actions

### Robust

#### 4.1 Compatible
- Valid HTML structure
- Name, role, value for all UI components
- Status messages announced to assistive technology

---

## Focus Indicators

### Recommended Style

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

### Rules

- Never use `outline: none` without a visible replacement
- Focus indicator must have 3:1 contrast against adjacent colors
- Focus indicator area must be at least as large as a 2px perimeter
- Custom focus styles should be consistent across all interactive elements

---

## Color Accessibility

### Don't Rely on Color Alone

Every use of color to convey meaning must have a secondary indicator:
- Error states: red color + error icon + error text
- Success states: green color + checkmark icon
- Chart data: color + pattern/shape
- Links: color + underline (or clearly different from surrounding text)

### Color Blindness Considerations

| Type | Affected Colors | Prevalence |
|------|----------------|-----------|
| Protanopia | Red-green | ~1% of males |
| Deuteranopia | Red-green | ~1% of males |
| Tritanopia | Blue-yellow | ~0.01% |
| Achromatopsia | All colors | ~0.003% |

**Safe combinations**: Blue + orange, blue + red (high contrast), purple + yellow.
**Risky combinations**: Red + green, green + brown, blue + purple.

---

## Touch Target Sizing

| Element | Minimum Size | Recommended |
|---------|-------------|-------------|
| Buttons | 44x44px | 48x48px |
| Links (inline) | 44px tall touch area | — |
| Checkboxes/Radios | 44x44px touch area | 24x24px visual + padding |
| Close buttons | 44x44px | 48x48px |
| List items | 44px tall | 48-56px tall |

Gap between touch targets: minimum 8px.

---

## Motion and Animation

### `prefers-reduced-motion`

Always respect this media query:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Animation Guidelines

- Essential animations (loading indicators): keep but simplify
- Decorative animations: disable entirely
- Parallax scrolling: disable
- Auto-playing video/GIF: pause by default

---

## Semantic Structure

### Heading Hierarchy

```
h1 — Page title (one per page)
  h2 — Section headings
    h3 — Subsection headings
      h4 — (use sparingly)
```

Never skip heading levels. Never use headings for visual styling — use CSS classes.

### Landmark Regions

| Role | HTML Element | Purpose |
|------|-------------|---------|
| banner | `<header>` | Site header/logo |
| navigation | `<nav>` | Navigation links |
| main | `<main>` | Primary content (one per page) |
| complementary | `<aside>` | Related content (sidebar) |
| contentinfo | `<footer>` | Site footer |

---

## Audit Checklist

Use this checklist for `/gdd:audit-accessibility`:

- [ ] All text passes contrast ratios (4.5:1 normal, 3:1 large)
- [ ] UI components have 3:1 contrast
- [ ] Touch targets are 44x44px minimum
- [ ] Color is not the sole indicator of meaning
- [ ] Focus indicators are visible and consistent
- [ ] Heading hierarchy is sequential
- [ ] Interactive elements are keyboard accessible
- [ ] Text is readable at 200% zoom
- [ ] Motion respects prefers-reduced-motion
- [ ] Form fields have visible labels
- [ ] Error messages are descriptive
- [ ] Alt text is present for meaningful images
