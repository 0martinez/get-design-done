# Design Principles Reference

Core design knowledge for GDD agents. This file encodes the visual design expertise that informs every decision.

---

## Visual Hierarchy

The single most important principle. Every screen must have a clear reading order.

### How to Create Hierarchy

1. **Size contrast**: The most important element should be noticeably larger. A 2:1 ratio between heading and body creates strong hierarchy; 1.5:1 is subtle.
2. **Weight contrast**: Pair heavy display type (700-900) with light labels (300-400). Maximum contrast between display and body weights.
3. **Color contrast**: Primary content in high-contrast color, secondary in reduced contrast. Use opacity or muted values, not gray.
4. **Spatial hierarchy**: More whitespace around important elements. Generous padding signals importance.
5. **Position**: Top-left has highest natural priority (in LTR layouts). Primary actions go where eyes land.

### The Squint Test

Blur your vision or zoom out to 25%. If you can still identify the primary element, hierarchy works. If everything blurs into sameness, hierarchy is too flat.

---

## Color

### Building Palettes

1. **Start with neutrals**: Pick an off-white and a near-black, slightly warm or cool. The palette should feel complete before any accent is introduced.
2. **Add neutral midtones**: 2-3 grays between your extremes, matching the warm/cool temperature.
3. **One accent**: Choose one intense, beautiful color. If it could appear on a poster, book cover, or street sign, it's probably timeless.
4. **Derive accent variants**: Light (backgrounds), default (actions), dark (hover/pressed).
5. **Semantic colors last**: Success, warning, error. These are functional, not decorative.

### The 60-30-10 Rule

- 60% dominant neutral (backgrounds)
- 30% secondary neutral (text, borders, secondary surfaces)
- 10% accent (CTAs, active states, highlights)

### Contrast Requirements (WCAG)

- **Normal text** (under 24px / 18.66px bold): 4.5:1 minimum
- **Large text** (24px+ / 18.66px+ bold): 3:1 minimum
- **UI components** (borders, icons): 3:1 minimum
- **Target**: Always aim for AA. AAA (7:1) for body text is ideal.

### Color Temperature

- **Warm neutrals** (cream, sand, warm gray) → approachable, organic, human
- **Cool neutrals** (slate, zinc, blue-gray) → professional, technical, precise
- **True neutrals** → safe but potentially sterile. Pick a lean.

### What to Avoid

- Bright accent + dark navy background (the "SaaS startup 2019-2024" look)
- Pure black (#000) text on pure white (#fff) — too harsh
- More than 2 accent colors competing for attention
- Gradients as a substitute for a color decision (unless intentional brand)

---

## Typography

### Choosing Fonts

The font carries more personality than any other design element.

| Feel | Font Categories | Examples |
|------|----------------|----------|
| Modern, clean | Geometric/Neo-grotesque | Inter, Geist, SF Pro, Helvetica |
| Warm, human | Humanist sans | Source Sans, Nunito, Lato |
| Editorial, premium | Serif | Source Serif, Literata, Lora, Playfair |
| Technical | Monospace | JetBrains Mono, IBM Plex Mono, Fira Code |
| Expressive display | Variable display | Fraunces, Instrument Serif, Cabinet Grotesk |

### Type Scale

Use a mathematical ratio for harmonious sizes:

| Ratio | Name | Feel |
|-------|------|------|
| 1.200 | Minor Third | Subtle, compact |
| 1.250 | Major Third | Default, balanced |
| 1.333 | Perfect Fourth | Clear, spacious |
| 1.414 | Augmented Fourth | Dramatic |
| 1.500 | Perfect Fifth | Editorial, high contrast |

### Key Rules

1. **Maximum contrast between display and labels**: Heavy display (700+) with light labels (300-400).
2. **Tighter tracking on large type**: -0.02em to -0.04em on display sizes.
3. **Open tracking on small caps/overlines**: 0.05em to 0.1em.
4. **Body text is never pure black or pure gray**: Calibrate to palette temperature.
5. **Minimum 14px for body text**: 12px only for dense productivity UI or stylistic uppercase labels.
6. **Line height**: 1.4-1.6 for body, 1.1-1.2 for display, 1.3 for UI labels.

---

## Spacing

### Base Unit System

Pick a base unit (4px or 8px) and derive all spacing from multiples:

**4px base**: 4, 8, 12, 16, 24, 32, 48, 64, 96
**8px base**: 8, 16, 24, 32, 48, 64, 96, 128

### The Container Principle

Spacing should decrease as nesting increases:
- Page padding: 48-96px
- Section gap: 32-48px
- Card padding: 16-24px
- Element group: 8-12px
- Inline gap: 4-8px

### Deliberate Variation

- **Tighter** to group related elements
- **Generous** to let hero content breathe
- Uneven spacing creates visual rhythm — don't make everything equidistant

---

## Layout

### Asymmetry Over Sameness

A perfectly symmetric grid reads as generic. Introduce intentional asymmetry:
- Large headline left, small metadata right
- One oversized card alongside smaller ones
- Off-center hero with generous margin on one side

### Scale Contrast

Pair extremes for visual interest:
- Very large headline next to very small label text
- Full-width image next to narrow text column
- Dense data table with generous padding around it

### White Space

White space is a design tool, not wasted space:
- It directs attention
- It signals premium quality
- It groups related content (Gestalt proximity)
- When in doubt, add more

---

## Accessibility

Beyond contrast ratios:
- **Focus indicators**: Visible, high-contrast focus ring on all interactive elements
- **Touch targets**: Minimum 44x44px on mobile
- **Don't rely on color alone**: Use icons, labels, or patterns alongside color
- **Motion**: Respect `prefers-reduced-motion`
- **Text sizing**: Design must accommodate 200% browser zoom
- **Semantic structure**: Heading levels should be sequential (h1 → h2 → h3)

---

## Production Readiness Checklist

A design is production-ready when:
1. Every color references a design token
2. Every text style maps to a type scale level
3. Every spacing value is from the spacing scale
4. Interactive states are defined (default, hover, active, focus, disabled)
5. Responsive behavior is specified
6. Contrast ratios pass WCAG AA
7. Touch targets meet minimum sizes
8. Content handles edge cases (long text, empty states, loading)
