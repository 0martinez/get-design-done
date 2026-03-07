# Typography Guide

Deep reference for typographic decisions. Loaded by the system architect agent.

---

## Font Selection Process

### Step 1: Determine Character

| Product Feel | Direction |
|-------------|-----------|
| SaaS / productivity tool | Geometric sans: Inter, Geist, SF Pro |
| Consumer / social | Humanist sans: Nunito, Lato, Source Sans |
| Editorial / content | Serif: Source Serif, Literata, Merriweather |
| Dev tools / technical | Monospace: JetBrains Mono, IBM Plex Mono |
| Premium / luxury brand | Display serif: Playfair Display, Instrument Serif |
| Startup / playful | Rounded: Nunito, Poppins, Plus Jakarta Sans |

### Step 2: Verify Availability

Always check font availability before specifying. In order of preference:
1. Fonts already loaded in the design document
2. System fonts (system-ui, -apple-system, SF Pro, Segoe UI)
3. Google Fonts (most reliable cross-platform)
4. Custom/licensed fonts (require explicit user confirmation)

### Step 3: Choose Weights

Minimum: 400 (Regular) + 600 or 700 (Bold)
Recommended: 300 (Light) + 400 (Regular) + 500 (Medium) + 700 (Bold)
Expressive: Add 200 (Thin) for display or 800/900 (Heavy) for impact

---

## Font Pairing

### Safe Pairings

| Heading | Body | Feel |
|---------|------|------|
| Inter 700 | Inter 400 | Clean, modern default |
| Geist 700 | Geist 400 | Tech-forward, crisp |
| Source Serif 700 | Source Sans 400 | Editorial with clarity |
| Playfair Display 700 | Inter 400 | Premium with readability |
| Cabinet Grotesk 800 | Inter 400 | Bold, contemporary |
| JetBrains Mono 700 | Inter 400 | Technical, precise |

### Pairing Rules

1. **One family is safest**: Use weight contrast within a single family
2. **Serif + Sans**: Classic combination; serif for headings, sans for body
3. **Never pair two decorative fonts**
4. **Match x-height**: Fonts with similar x-heights pair better
5. **Contrast, not conflict**: Pair geometric with humanist, not geometric with geometric

---

## Type Scales

### Generating a Scale

Start with body size (usually 16px), apply a ratio:

**Minor Third (1.200)** — compact, many levels
```
12 / 14 / 16 / 19 / 23 / 28 / 33 / 40
```

**Major Third (1.250)** — balanced default
```
12 / 14 / 16 / 20 / 25 / 31 / 39 / 49
```

**Perfect Fourth (1.333)** — clear hierarchy
```
12 / 14 / 16 / 21 / 28 / 38 / 50 / 67
```

**Perfect Fifth (1.500)** — dramatic, editorial
```
12 / 14 / 16 / 24 / 36 / 54 / 81
```

### Recommended Assignments

| Token | Scale Position | Typical Range |
|-------|---------------|---------------|
| display | 6-7 | 40-80px |
| heading-1 | 5-6 | 28-48px |
| heading-2 | 4-5 | 20-32px |
| heading-3 | 3-4 | 16-24px |
| body | 2 | 16px |
| body-small | 1 | 14px |
| caption | 0 | 12-13px |
| overline | 0 | 11-12px (uppercase) |

---

## Line Height Guidelines

| Context | Line Height | Rationale |
|---------|-------------|-----------|
| Display (40px+) | 1.1-1.15 | Large type needs tight leading |
| Headings (20-40px) | 1.2-1.3 | Clear but compact |
| Body text | 1.5-1.6 | Optimal readability |
| UI labels | 1.3-1.4 | Functional, not literary |
| Captions | 1.4-1.5 | Small text needs more air |

---

## Letter Spacing Guidelines

| Context | Letter Spacing | Rationale |
|---------|---------------|-----------|
| Display (40px+) | -0.02em to -0.04em | Tighten for cohesion |
| Headings | -0.01em to -0.02em | Slightly tight |
| Body text | 0em (normal) | Default tracking |
| Small text (12-14px) | 0em to 0.01em | Slightly open for legibility |
| Overlines / small caps | 0.05em to 0.1em | Open for style and legibility |

---

## Typographic Units in Design Tools

| Property | Preferred Unit | Notes |
|----------|---------------|-------|
| font-size | px | Absolute, predictable |
| letter-spacing | em | Scales proportionally with font size |
| line-height | px or unitless | Avoid subpixel values |
| paragraph spacing | px | Match spacing system |

---

## Common Mistakes

1. **Too many sizes**: If you have more than 8 distinct text sizes on a page, simplify
2. **No weight contrast**: All text at 400 weight = flat hierarchy
3. **Tiny body text**: Under 14px for primary reading → accessibility failure
4. **Inconsistent casing**: Mix of Title Case, sentence case, and ALL CAPS without a rule
5. **Line too wide**: Body text wider than 75 characters → hard to read
6. **Missing fallback**: Always specify a system fallback stack
