# Color Theory Reference

Deep reference for color palette generation. Loaded by the system architect agent.

---

## Palette Generation Methods

### Method 1: Neutral-First (Recommended)

1. Choose a temperature: warm, cool, or neutral
2. Create a 10-step neutral scale (50-900)
3. Add one accent color
4. Derive accent variants (light, default, dark)
5. Add semantic colors (success, warning, error, info)

### Method 2: Brand-Derived

1. Start with the brand color as accent
2. Find the temperature of the brand color
3. Build neutrals that share that temperature
4. Ensure the accent works at sufficient contrast

### Method 3: Analogous

1. Pick a base hue
2. Select 2-3 hues within 30 degrees on the color wheel
3. Vary saturation and lightness for each
4. Good for warm, harmonious palettes

---

## OKLCH Color Space

OKLCH (Lightness, Chroma, Hue) is the recommended color space for generating perceptually uniform scales.

```
oklch(L C H)
L: 0-1 (lightness)
C: 0-0.4 (chroma/saturation)
H: 0-360 (hue angle)
```

### Generating a Neutral Scale in OKLCH

Keep chroma very low (0.005-0.02) and vary lightness:

| Step | Lightness | Chroma | Example |
|------|-----------|--------|---------|
| 50 | 0.97 | 0.005 | Lightest background |
| 100 | 0.93 | 0.008 | Secondary background |
| 200 | 0.87 | 0.010 | Borders |
| 300 | 0.78 | 0.010 | Disabled |
| 400 | 0.65 | 0.010 | Placeholder |
| 500 | 0.55 | 0.010 | Secondary text |
| 600 | 0.45 | 0.010 | Body text |
| 700 | 0.35 | 0.010 | Headings |
| 800 | 0.25 | 0.008 | High emphasis |
| 900 | 0.15 | 0.005 | Maximum contrast |

For warm neutrals, use hue ~60-80 (yellow/orange). For cool, use hue ~240-260 (blue).

### Generating Accent Variants

Start with the main accent, then:
- **Light**: Increase L to 0.92-0.95, decrease C by 60%
- **Default**: The chosen accent
- **Dark**: Decrease L by 15-20%, increase C slightly

---

## Semantic Color Defaults

These work with most neutral palettes:

| Role | Warm Palette | Cool Palette |
|------|-------------|-------------|
| Success | oklch(0.55 0.15 145) | oklch(0.55 0.15 155) |
| Warning | oklch(0.65 0.15 70) | oklch(0.65 0.15 75) |
| Error | oklch(0.55 0.18 25) | oklch(0.55 0.18 20) |
| Info | oklch(0.55 0.12 240) | oklch(0.55 0.12 250) |

---

## Contrast Calculation

### WCAG 2.x Relative Luminance

```
L = 0.2126 * R + 0.7152 * G + 0.0722 * B
Contrast ratio = (L1 + 0.05) / (L2 + 0.05)
```

Where L1 is the lighter color's luminance and L2 is the darker.

### Quick Reference

| Text Size | Minimum Ratio | WCAG Level |
|-----------|--------------|------------|
| < 18.66px bold, < 24px regular | 4.5:1 | AA |
| >= 18.66px bold, >= 24px regular | 3:1 | AA |
| < 18.66px bold, < 24px regular | 7:1 | AAA |
| UI components, graphical objects | 3:1 | AA |

---

## Palette Anti-Patterns

1. **The SaaS gradient**: Purple/indigo accent + dark navy → dated 2019-2024
2. **Rainbow dashboard**: 5+ competing bright colors → no hierarchy
3. **Gray everything**: Neutral palette with no accent → lifeless
4. **Neon on dark**: Lime/cyan on near-black → eye strain
5. **Low-contrast "aesthetic"**: Light gray text on white → unreadable

---

## Color and Meaning

Colors carry cultural associations. Consider:

| Color Range | Common Associations |
|-------------|-------------------|
| Blue | Trust, stability, technology |
| Green | Growth, nature, success |
| Red | Urgency, error, passion |
| Orange/Amber | Warning, warmth, energy |
| Purple | Premium, creative, luxury |
| Teal | Calm, medical, modern |
| Warm neutrals | Organic, approachable, craft |
| Cool neutrals | Professional, technical, clean |

Choose accent colors that align with the product's personality, not just aesthetic preference.
