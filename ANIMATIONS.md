# Animation Standards

This document defines the animation standards for Weedlog components. All animations must respect `prefers-reduced-motion: reduce`.

## Focus States

**All interactive elements must use the fade-in focus ring pattern.**

### Implementation

```css
.element:focus-visible {
  outline: var(--weedlog-border-width-thick) solid var(--weedlog-color-interactive-focus);
  outline-offset: var(--weedlog-focus-outline-offset);
  animation: focus-fade-in 200ms ease-out;
}

@keyframes focus-fade-in {
  from { outline-color: transparent; }
  to { outline-color: var(--weedlog-color-interactive-focus); }
}
```

### Characteristics
- **Duration:** 200ms
- **Easing:** ease-out
- **Effect:** Focus ring fades in from transparent to focus color
- **No pulsing or infinite animations**

---

## Pressable Elements

**Buttons, pills, chips, checkboxes, radio buttons, and other clickable elements.**

### Hover State: Smoke Animation

Pressable elements show rising smoke wisps when hovered:

```css
.pressable {
  position: relative;
  overflow: hidden;
  transition: background var(--weedlog-transition-fast),
              transform var(--weedlog-transition-fast);
}

.pressable-wisps {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 200ms ease-out;
}

.pressable:hover .pressable-wisps {
  opacity: 1;
}

.pressable-wisp {
  position: absolute;
  bottom: 0;
  width: var(--weedlog-spacing-1);
  height: var(--weedlog-spacing-3);
  background: var(--weedlog-color-brand-primary);
  border-radius: var(--weedlog-radius-full);
  opacity: 0;
  animation: wisp-rise 2s ease-out infinite;
}

.pressable-wisp:nth-child(1) {
  left: 15%;
  animation-delay: 0ms;
}

.pressable-wisp:nth-child(2) {
  left: 30%;
  animation-delay: 300ms;
}

.pressable-wisp:nth-child(3) {
  left: 50%;
  animation-delay: 600ms;
}

.pressable-wisp:nth-child(4) {
  left: 70%;
  animation-delay: 900ms;
}

.pressable-wisp:nth-child(5) {
  left: 85%;
  animation-delay: 1200ms;
}

@keyframes wisp-rise {
  0% {
    opacity: 0;
    transform: translateY(0) scaleX(1);
  }
  20% {
    opacity: 0.12;
  }
  60% {
    opacity: 0.06;
    transform: translateY(calc(-1 * var(--weedlog-spacing-8))) scaleX(1.5);
  }
  100% {
    opacity: 0;
    transform: translateY(calc(-1 * var(--weedlog-spacing-12))) scaleX(2);
  }
}
```

**Smoke hover characteristics:**
- **Count:** 5 wisps per element
- **Stagger:** 300ms delay between wisps
- **Duration:** 2s per cycle
- **Repeat:** Infinite while hovered
- **Color:** Brand primary (`#16a34a`) for light backgrounds, white for dark backgrounds
- **Subtlety:** Wisps fade in/out smoothly, peak opacity 12%
- **Container fades in:** The wisps container itself fades in on hover for smooth entrance

### Press State

Elements should contract when pressed and remain contracted while held:

```css
.pressable:active {
  transform: scale(0.97);
  transition: transform 100ms ease-out;
}
```

**Press characteristics:**
- **Scale:** 0.97 (3% reduction)
- **Duration:** 100ms
- **Easing:** ease-out
- **Behavior:** Stays small while pressed, returns to normal (scale 1.0) on release

### Example: Complete Pressable Button

```css
.button {
  position: relative;
  overflow: hidden;
  background: var(--weedlog-color-brand-primary);
  transition: background var(--weedlog-transition-fast),
              transform var(--weedlog-transition-fast);
}

.button-wisps {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 200ms ease-out;
}

.button:hover .button-wisps {
  opacity: 1;
}

.button-wisp {
  position: absolute;
  bottom: 0;
  width: var(--weedlog-spacing-1);
  height: var(--weedlog-spacing-3);
  background: rgba(255, 255, 255, 0.8);  /* White wisps for dark button */
  border-radius: var(--weedlog-radius-full);
  opacity: 0;
  animation: wisp-rise 2s ease-out infinite;
}

.button-wisp:nth-child(1) { left: 15%; animation-delay: 0ms; }
.button-wisp:nth-child(2) { left: 30%; animation-delay: 300ms; }
.button-wisp:nth-child(3) { left: 50%; animation-delay: 600ms; }
.button-wisp:nth-child(4) { left: 70%; animation-delay: 900ms; }
.button-wisp:nth-child(5) { left: 85%; animation-delay: 1200ms; }

.button:active {
  transform: scale(0.97);
  transition: transform 100ms ease-out;
}

.button:focus-visible {
  outline: var(--weedlog-border-width-thick) solid var(--weedlog-color-interactive-focus);
  outline-offset: var(--weedlog-focus-outline-offset);
  animation: focus-fade-in 200ms ease-out;
}

@keyframes wisp-rise {
  0% {
    opacity: 0;
    transform: translateY(0) scaleX(1);
  }
  20% {
    opacity: 0.12;
  }
  60% {
    opacity: 0.06;
    transform: translateY(calc(-1 * var(--weedlog-spacing-8))) scaleX(1.5);
  }
  100% {
    opacity: 0;
    transform: translateY(calc(-1 * var(--weedlog-spacing-12))) scaleX(2);
  }
}

@keyframes focus-fade-in {
  from { outline-color: transparent; }
  to { outline-color: var(--weedlog-color-interactive-focus); }
}

@media (prefers-reduced-motion: reduce) {
  .button-wisp,
  .button:active,
  .button:focus-visible {
    animation: none;
  }

  .button:active {
    transform: none;
  }

  .button-wisps {
    display: none;
  }
}
```

---

## The Organic Cloud Effect (Official)

The **Organic Cloud** is the official, production-ready wisp animation for Weedlog. It represents the refined, sophisticated version of the smoke hover effect.

### Characteristics

- **Wisp Count:** 23 wisps per element (dense organic cloud)
- **Widths:** Varied from 1.1x to 1.6x base width for natural dispersion
- **Heights:** Varied from `spacing-2` to `spacing-6` for organic appearance
- **Blur:** 1.0px soft filter blur for atmospheric softness
- **Opacity Gradient:** Each wisp uses a linear gradient fading from 100% at top to 0% at bottom (50% midpoint)
- **Animation Duration:** 2.2s to 4.3s, slower rise for contemplative effect
- **Stagger:** Varied animation delays and 5 different keyframe curves for organic feel
- **Colors:** Brand green + gray with flexible theming support

### Implementation Pattern

```css
.element-wisps {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 200ms ease-out;
}

.element:hover .element-wisps {
  opacity: 1;
}

.element-wisp {
  position: absolute;
  bottom: 0;
  border-radius: var(--weedlog-radius-full);
  opacity: 0;
  filter: blur(1.0px);
  background: linear-gradient(
    180deg,
    var(--weedlog-color-brand-primary),
    rgba(22, 163, 74, 0.3) 50%,
    rgba(22, 163, 74, 0)
  );
  animation: wisp-rise-organic 2.5s ease-out infinite;
}

/* 23 wisps with varied positioning, sizes, and delays */

@keyframes wisp-rise-organic {
  0% { opacity: 0.05; transform: translateY(0); }
  10% { opacity: 0.14; }
  50% { opacity: 0.09; }
  80% { opacity: 0; transform: translateY(-240px); }
  100% { opacity: 0; transform: translateY(-300px); }
}
```

### When to Use

- **Production buttons and interactive elements** where you want a premium, sophisticated feel
- **Call-to-action elements** where the animation should command attention subtly
- **Dark mode backgrounds** (use white wisps for contrast)
- **Light backgrounds** (use brand green + gray wisps)

### Accessibility

- Respects `prefers-reduced-motion: reduce` by hiding wisps completely
- No forced animation removes responsiveness or accessibility

### Color Variants

**Light Background (Brand Green + Gray):**
1. Pure brand green gradient
2. Sage green (muted)
3. Lime green (vibrant)
4. Moss green (warm)
5. Forest green (deep)

**Dark Background (White + Brand Accents):**
1. Pure white with brand tint
2. Cool white (bluish)
3. Warm white (golden)
4. Cream white (soft)
5. Ghost white (minimal)

---

## Implementation Checklist

### For Pressable Elements
- [ ] Add `position: relative` and `overflow: hidden`
- [ ] Add wisps container div in JSX/TSX
- [ ] Add 5 wisp elements with staggered delays (0ms, 300ms, 600ms, 900ms, 1200ms)
- [ ] Wisps container fades in on hover, contains infinite animations
- [ ] Implement press scale (0.97) on `:active`
- [ ] Add focus-visible fade-in (200ms)
- [ ] Include `prefers-reduced-motion` guard (hide wisps, disable animations)

### For All Interactive Elements
- [ ] Focus ring must use fade-in animation
- [ ] All transitions must respect motion preferences
- [ ] Test keyboard navigation
- [ ] Test with screen readers

---

## Design Token References

```css
/* Colors */
--weedlog-color-brand-primary: #16a34a;
--weedlog-color-interactive-focus: #22c55e;

/* Spacing */
--weedlog-spacing-1: 4px;
--weedlog-spacing-3: 12px;
--weedlog-spacing-8: 32px;
--weedlog-spacing-12: 48px;

/* Borders */
--weedlog-border-width-thick: 3px;
--weedlog-focus-outline-offset: 2px;

/* Radii */
--weedlog-radius-full: 9999px;

/* Transitions */
--weedlog-transition-fast: 120ms ease 0ms;
```

---

## Notes

- **Smoke on hover:** All pressable elements show rising wisps while hovered — creates consistent, playful feedback
- **Subtlety is key:** Wisps should be barely noticeable, not distracting
- **Performance:** Use `transform` and `opacity` for best performance
- **Accessibility:** Always include motion reduction guards (hide wisps completely)
- **Consistency:** Use these patterns across all components
- **Testing:** Test with keyboard, mouse, and touch inputs
