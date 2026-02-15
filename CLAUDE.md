# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Description

**Weedlog** — Keep track of your favorite buds with your buds. A social cannabis tracking app.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build tool:** Vite
- **Styling:** Plain CSS (no Tailwind, no CSS-in-JS)
- **Font:** Rubik (loaded via Google Fonts)

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build (runs `tsc -b && vite build`)
- `npx tsc --noEmit` — type-check only

## Architecture

- `src/tokens.css` — all design tokens as CSS custom properties (imported via `index.css`)
- `src/components/` — React components, each with a co-located `.css` file
- `src/index.css` — global reset, font import, and tokens import
- `src/App.tsx` — root component, renders page-level components

## Styling Conventions

- **All visual CSS values must reference tokens from `src/tokens.css`** — no hardcoded colors, spacing, font sizes, radii, or border widths in component stylesheets. Only structural CSS values (e.g. `flex`, `100%`, `0`, `none`, `1`) remain as literals.
- **Focus states:** Implement focus rings using `outline` + `outline-offset`, not pseudo-elements or extra DOM nodes. Use `var(--border-width-3)` for outline width, `var(--color-focus)` for color, and `var(--focus-outline-offset)` for offset. Apply only on `:focus-visible`. Include a subtle pulse animation on the outline color.
