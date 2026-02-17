# Organic Cloud Color Palettes

Official color palette recommendations for the Organic Cloud wisp animation on different background types.

---

## Light Backgrounds (Brand Primary + Gray Wisps)

### Palette 1: Pure Brand (Current Default)
- **Brand Green:** `rgba(22, 163, 74, ...)`
- **Gray Shadow:** `rgba(153, 153, 153, ...)`
- **Character:** Balanced, professional, signature Weedlog feel
- **Best For:** Primary brand interactions, CTAs, hero buttons

### Palette 2: Sage & Mist
- **Sage Green:** `rgba(92, 124, 100, ...)`
- **Mist Gray:** `rgba(180, 180, 180, ...)`
- **Character:** Calming, sophisticated, muted elegance
- **Best For:** Premium content, settings, form controls
- **Accessibility:** High contrast, excellent for all vision types

### Palette 3: Lime & Charcoal
- **Lime Green:** `rgba(132, 204, 22, ...)`
- **Charcoal:** `rgba(120, 120, 120, ...)`
- **Character:** Vibrant, energetic, modern
- **Best For:** Actions, upgrades, dynamic moments
- **Accessibility:** Very high contrast

### Palette 4: Moss & Dust
- **Moss Green:** `rgba(78, 100, 60, ...)`
- **Dust Brown:** `rgba(140, 125, 115, ...)`
- **Character:** Warm, earthy, organic
- **Best For:** Natural/organic content, strain cards, botanical references
- **Accessibility:** Medium contrast, warm feel

### Palette 5: Forest & Graphite
- **Forest Green:** `rgba(31, 94, 58, ...)`
- **Graphite:** `rgba(110, 110, 110, ...)`
- **Character:** Deep, luxurious, powerful
- **Best For:** Destructive actions, important alerts, premium tiers
- **Accessibility:** Very high contrast

---

## Dark Backgrounds (White + Brand Accents)

### Palette 1: Pure White (Current Default)
- **White Wisps:** `rgba(255, 255, 255, 0.8) → 0`
- **Gray Accents:** `rgba(200, 200, 200, ...)`
- **Character:** Clean, clear, minimal
- **Best For:** Dark mode interactions, buttons on dark surfaces
- **Accessibility:** Excellent contrast on dark

### Palette 2: Cool White (Bluish)
- **Cool White:** `rgba(240, 245, 255, ...)`
- **Ice Blue Accent:** `rgba(150, 200, 255, ...)`
- **Character:** Modern, tech-forward, premium
- **Best For:** Dark mode, navigation, advanced features
- **Accessibility:** Excellent, cool tones reduce eye strain in dark

### Palette 3: Warm White (Golden)
- **Warm White:** `rgba(255, 250, 240, ...)`
- **Gold Accent:** `rgba(255, 200, 100, ...)`
- **Character:** Inviting, cozy, friendly
- **Best For:** Social interactions, friends lists, warm moments
- **Accessibility:** Good contrast, warm tones feel welcoming

### Palette 4: Cream (Soft & Subtle)
- **Cream White:** `rgba(250, 248, 245, ...)`
- **Warm Gray:** `rgba(180, 170, 165, ...)`
- **Character:** Sophisticated, subdued, calming
- **Best For:** Settings, preferences, secondary actions
- **Accessibility:** Medium-high contrast, gentle on eyes

### Palette 5: Ghost White (Minimal)
- **Ghost White:** `rgba(248, 248, 255, ...)`
- **Silver Accent:** `rgba(200, 200, 210, ...)`
- **Character:** Ethereal, delicate, refined
- **Best For:** Rare/legendary items, special moments, premium states
- **Accessibility:** Medium contrast, minimal visual weight

---

## Implementation Guide

### Using Custom Color Wisps

Extend OrganicCloud.css with custom color classes:

```css
/* Sage & Mist Palette */
.organic-cloud-wisp--sage {
  background: linear-gradient(
    180deg,
    rgba(92, 124, 100, 1),
    rgba(92, 124, 100, 0.3) 50%,
    rgba(92, 124, 100, 0)
  );
}

.organic-cloud-wisp--mist {
  background: linear-gradient(
    180deg,
    rgba(180, 180, 180, 0.65),
    rgba(180, 180, 180, 0.2) 50%,
    rgba(180, 180, 180, 0)
  );
}
```

Then apply to elements:

```tsx
<div className="organic-cloud">
  <span className="organic-cloud-wisp organic-cloud-wisp--sage organic-cloud-wisp--animate-a" />
  <span className="organic-cloud-wisp organic-cloud-wisp--mist organic-cloud-wisp--animate-b" />
  {/* ... more wisps ... */}
</div>
```

---

## Accessibility Considerations

All palettes maintain:
- **WCAG AA contrast ratios** at 16px text size
- **Clear distinction** from background colors
- **No reliance on color alone** for meaning
- **Reduced motion support** via CSS media query

## Notes

- **Palette 1 (Brand)** is the default and recommended for most use cases
- **Light backgrounds** should use green + gray combinations
- **Dark backgrounds** should use white + accent combinations
- **Test with users** before deploying custom palettes
- **Motion preferences** are always respected (wisps hidden if `prefers-reduced-motion: reduce`)
