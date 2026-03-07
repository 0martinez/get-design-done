# Design Questioning Guide

How to extract design intent from developers without using design jargon. This file is loaded by agents during the brief and exploration phases.

---

## Core Philosophy

Developers know what they want their product to feel like — they just can't express it in design terms. Your job is to translate their instincts into concrete visual decisions.

**Never ask**: "What color palette do you prefer?" or "Do you want a modular scale for typography?"
**Instead ask**: Show concrete comparisons. "More like Notion or more like Linear?" is worth a thousand abstract questions.

---

## Questioning Strategies

### 1. Product Identity (Start Here)

Ask through comparisons:
- "If your product were a physical object, would it be more like a Moleskine notebook or a whiteboard?"
- "Which of these feels closer to what you're building: Notion, Linear, Stripe, or Airbnb?"
- "Is this more 'professional tool people use at work' or 'personal app people enjoy using'?"
- "Picture someone using your product. Are they leaning forward (focused, productive) or leaning back (browsing, relaxing)?"

### 2. Visual Warmth

These questions determine the color temperature and softness of the design:
- "Should this feel warm and approachable (think: rounded corners, soft colors) or precise and professional (think: sharp edges, high contrast)?"
- "More 'handwritten note' or more 'printed report'?"
- "If this were a room, would it have wooden furniture or steel and glass?"

**Translation guide**:
- Warm/approachable → warm neutrals (cream, sand), generous radius, softer shadows
- Precise/professional → cool neutrals (slate, zinc), minimal radius, crisp borders
- Mix of both → warm surface colors + crisp typography

### 3. Density & Breathing Room

- "Should the screen feel full of information (like a dashboard) or spacious with lots of white space (like a landing page)?"
- "When users open your app, do they want to see everything at once or focus on one thing at a time?"
- "More Gmail inbox or more Apple Notes?"

**Translation guide**:
- Dense → compact spacing, smaller type scale, more items visible
- Spacious → generous spacing, larger type scale, progressive disclosure
- Adaptive → standard spacing with ability to toggle density

### 4. Color Confidence

- "Should color be bold and present (like Spotify) or quiet and minimal (like Notion)?"
- "Pick one: 'one bold color that stands out' or 'a few subtle colors that work together'"
- "Is there a color you already associate with this product? Even a vague sense — 'blue-ish' is fine."

**Translation guide**:
- Bold color presence → saturated accent, used on CTAs and key UI elements
- Quiet/minimal → desaturated palette, accent appears sparingly
- No color preference → start neutral, introduce accent based on product category

### 5. Typography Feel

- "Should the text feel modern and clean (like a tech product) or classic and editorial (like a magazine)?"
- "Large, bold headlines or understated, elegant ones?"
- "Is readability of long text important, or is most text short labels and titles?"

**Translation guide**:
- Modern/clean → geometric or neo-grotesque sans-serif (Inter, Geist, SF Pro)
- Classic/editorial → humanist sans-serif or serif (Source Serif, Literata, Lora)
- Technical/code → monospace-influenced (JetBrains Mono, IBM Plex Mono)

### 6. Complexity Discovery

These questions help scope the design system:
- "How many distinct screens or views does this product have? Roughly: under 5, 5-15, or 15+?"
- "Does it need to work on mobile, or is desktop the primary experience?"
- "Are there complex data views (tables, charts, dashboards) or mostly simple content?"

---

## Advanced Techniques

### The Three-Option Technique

When a choice is binary, it creates analysis paralysis. Instead, offer three concrete options:
- "For your sidebar, I see three directions: (A) minimal — just icons, (B) standard — icons + labels, (C) detailed — icons + labels + descriptions. Which feels right?"

### The "What Would Annoy You" Technique

Developers often know what they DON'T want better than what they DO want:
- "What's an example of a product whose design annoys you? What specifically bothers you?"
- "Are there any design trends you find particularly grating?"

### The Priority Triangle

Force a ranking between three competing values:
- "Rank these: looks impressive, is easy to use, ships fast. What's #1?"

### The Screenshot Test

If the user can share screenshots of designs they like:
- "What specifically do you like about this? Is it the colors, the layout, the typography, or just the overall feel?"
- "Would you change anything about it for your product?"

---

## Red Flags to Watch For

1. **"Just make it look good"** → Need more probing. Try the comparison technique.
2. **"Like Apple"** → Too vague. Ask: "Apple like the marketing site (dramatic, editorial) or Apple like the Settings app (functional, clean)?"
3. **"Modern"** → Means different things to everyone. Offer concrete modern variants.
4. **"Clean"** → Almost universal desire. Dig into what "clean" means: minimal content? White space? Aligned grid? Flat design?
5. **Conflicting references** → "I want it like both Notion AND Bloomberg Terminal." Identify which aspects of each they're drawn to.

---

## When to Stop Questioning

Move to synthesis when you have confident answers for:
1. Product personality (warm/cool, dense/spacious)
2. Color direction (at least neutral temperature + accent presence)
3. Typography feel (modern/classic/technical)
4. Primary platform and density needs
5. At least 2 concrete visual references the user likes

You don't need perfect answers. A strong brief with 70% confidence is better than endless questioning.
