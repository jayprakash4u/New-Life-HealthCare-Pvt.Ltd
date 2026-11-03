# Brand and interface foundation

Direction: calm, clear, professional healthcare. White space, strong legibility, restrained teal accents, slate neutrals, and nearly square controls with only a slight radius. Use 2px for small details, 4px for buttons and inputs, and 6px for cards. Reserve the full-radius token for circular indicators such as the loading spinner. Avoid decorative gradients, oversized shadows, and pill-shaped controls.

## Color roles

| Role                  | Color                  | Use                                                   |
| --------------------- | ---------------------- | ----------------------------------------------------- |
| Logo teal             | `#26998D`              | Approximate supplied brand color; artwork and accents |
| Logo slate            | `#778393`              | Approximate supplied secondary brand color            |
| Primary               | `#14776E`              | White-text buttons, links, focus rings                |
| Hover / pressed       | `#10645D` / `#0C514B`  | Primary interaction states                            |
| Soft teal             | `#EAF6F3`              | Secondary buttons and quiet highlights                |
| Main text             | `#1C3034`              | Headings and body                                     |
| Muted text            | `#52636B`              | Supporting copy and placeholders                      |
| Background / surface  | `#FFFFFF` / `#F6F9F8`  | Page and section surfaces                             |
| Border / input border | `#D9E3E0` / `#7B8C88`  | Decorative dividers / identifiable controls           |
| Success               | `#236343` on `#EDF7F0` | Positive status                                       |
| Warning               | `#855500` on `#FFF7E5` | Attention required                                    |
| Error                 | `#B42318` on `#FFF1EF` | Validation and destructive actions                    |
| Information           | `#245C86` on `#EEF5FC` | Neutral guidance                                      |

The supplied PNG (`public/brand/new-life-health-care.png`, 599 × 416) is the current logo for the navigation and design reference. Preserve its transparency and proportions; do not recreate or distort it. The original JPEG is retained as source artwork. Raster colors are a visual reference, not an official color specification. Use brand slate decoratively rather than for small text on white.

## Typography and rhythm

Use the local Segoe UI / Helvetica Neue / Arial system stack: no external font request or build-time network dependency. Body is 16px with 1.65 line height; labels and buttons are 14px, supporting text 14px. Headings use weight 600, a tighter 1.15 line height, and fluid sizes from 28–36px and 36–56px. Keep long text near 65 characters per line.

Spacing follows a 4px base: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 96. Use 8px inside small groups, 16–24px within blocks, and 48–96px between major sections when pages are introduced. The content container caps at 1200px with fluid 16–40px gutters.

## Components and states

- Primary: main action. Prefer one visually dominant action per group.
- Secondary: quiet filled teal for supporting actions.
- Outline: a visible alternative action.
- Ghost: low-emphasis actions on uncomplicated backgrounds.
- Danger: destructive actions only, accompanied by explicit wording.
- Controls: minimum 44px height, 4px radius, visible label, darker input border, and a 2px focus ring with a 3px offset.
- Small buttons retain a 44px minimum touch target; large buttons are 52px tall.
- Loading buttons keep their text and show a decorative spinner with `aria-busy`; callers should use meaningful text such as “Saving”.
- Errors use text and `aria-invalid`, not color alone. Use native input types and autocomplete where applicable.
- Movement is limited to short color transitions; reduced-motion preferences are respected.

## Architecture decisions

Next.js App Router and strict TypeScript provide the base. CSS custom properties centralize design decisions; Tailwind utilities style all shared components. The CSS-first Tailwind theme maps semantic tokens to utilities, while `tailwind-merge` resolves className overrides. Radix handles dialog, drawer, dropdown, tooltip, and tab interactions. Native HTML handles input, textarea, select, checkbox, and radio behavior. No state manager, API layer, authentication system, or speculative feature scaffolding is needed yet.

The standalone HTML reference uses CSS compiled from the same Tailwind entry point as the application (`npm run design:build`). It is a design document, not a production route. Root remains blank until page work is requested. See `ui-components.md` for each component's API and composition examples.

## Copper accent

Muted copper (#A66A3F) is a secondary accent. Booking buttons use #9A6038 with white text (5.12:1 contrast), darker hover and pressed states, and #FBF3EC for subtle booking highlights. Teal remains the primary brand and general-action colour. Use the booking button variant for appointment actions, rather than changing the primary variant globally.

Keep page backgrounds white and body text slate. Use copper for booking actions and occasional small icon details or short editorial rules. Within an icon group, retain fine slate outlines, use teal for most highlights, and limit copper to one or two details. Do not alternate heading colours, tint whole sections copper, or colour every icon with the accent. Supporting navigation actions such as viewing doctors retain the teal primary style.
