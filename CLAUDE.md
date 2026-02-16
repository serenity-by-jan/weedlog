# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Description

**Weedlog** — Keep track of your favorite buds with your buds. A social cannabis tracking app.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build tool:** Vite
- **Routing:** React Router v7 (`react-router-dom`)
- **Styling:** Plain CSS (no Tailwind, no CSS-in-JS)
- **Font:** Bricolage Grotesque (loaded via Google Fonts, weights 200–800)
- **Design tokens:** JSON source files in `tokens/` → built to CSS via Style Dictionary
- **Linting:** ESLint with `eslint-plugin-jsx-a11y` for accessibility
- **Component dev:** Storybook

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build (runs `tsc -b && vite build`)
- `npm run lint` — lint with ESLint (includes accessibility checks)
- `npm run tokens:build` — regenerate `src/tokens.css` from `tokens/*.json`
- `npx tsc --noEmit` — type-check only

## Architecture

- `tokens/tokens.json` — single-file design token source (all colors, spacing, typography, shape, effects)
- `tokens/build.mjs` — Style Dictionary build script
- `src/tokens.css` — **auto-generated** CSS custom properties (do not edit directly — edit `tokens/*.json` and run `npm run tokens:build`)
- `src/components/` — React components, each with a co-located `.css` file
- `src/index.css` — global reset, font import, and tokens import
- `src/main.tsx` — app entry point with BrowserRouter
- `src/App.tsx` — route definitions

## Routes

- `/` — Landing page
- `/design` — Design system explorer (font showcase, logo gallery, color audit with UI components)

## Styling Conventions

- **All visual CSS values must reference tokens from `src/tokens.css`** — no hardcoded colors, spacing, font sizes, radii, or border widths in component stylesheets. Only structural CSS values (e.g. `flex`, `100%`, `0`, `none`, `1`) remain as literals.
- **Focus states:** Implement focus rings using `outline` + `outline-offset`, not pseudo-elements or extra DOM nodes. Use `var(--border-width-3)` for outline width, `var(--color-focus)` for color, and `var(--focus-outline-offset)` for offset. Apply only on `:focus-visible`. Include a subtle pulse animation on the outline color.

## Design Token Workflow

1. Edit `tokens/tokens.json`
2. Run `npm run tokens:build` to regenerate `src/tokens.css`
3. The JSON files are the source of truth — compatible with Figma Tokens plugin and Style Dictionary ecosystem
