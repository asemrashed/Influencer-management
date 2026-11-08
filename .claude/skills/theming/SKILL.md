---
name: theming
description: Use when writing any component styling, changing colors/typography/spacing, adding dark mode, or applying a client's brand. Token system for the single app (no theme catalog).
---

# Theming — tokens, not themes

One app, one design system. A client's look = a small brand file. (The 10–15 alternative designs and the landing page are out of scope.)

## Tokens
- Defined once in `packages/ui/src/styles/tokens.css` using Tailwind 4 `@theme` + CSS variables. Semantic names: `background, foreground, surface, surface-muted, border, ring, primary, primary-foreground, secondary, accent, muted, muted-foreground, success, warning, danger, info` (+ `-foreground` pairs), `radius-sm/md/lg`, `font-sans/heading`, spacing scale, shadows.
- Light and dark values per token (`:root` / `.dark`); `next-themes` toggles the class (pass the CSP nonce).
- Components use only semantic utilities. FORBIDDEN outside `tokens.css`: hex/rgb/hsl/oklch literals, raw palette classes (`bg-blue-500`), arbitrary values (`w-[13px]`, `text-[#fff]`), inline `style` colors.

## Per-client brand
`clients/<name>/theme.json`: `{ brand: {primary, accent}, radius, fontHeading, fontBody, logo, favicon, name }`. A build step (`scripts/build-theme`, W0) generates `theme.generated.css` overriding token variables; it derives foreground colors, and FAILS the build if any text/background pair is below WCAG AA (4.5:1 normal, 3:1 large/UI). Fonts via `next/font` only. Logo/images via `next/image`.
- Clients may change tokens only. Layout/component changes → core feature behind a toggle, or `clients/<name>/` extension with approval.

## States & density
Hover/focus/disabled/error states are tokens too. Respect `prefers-color-scheme` first, user choice stored in localStorage (try/catch). Respect `prefers-reduced-motion`.

## Review checklist
No literals; dark mode checked; contrast script green; no component takes a color prop except through a `tone` enum mapped to tokens.
