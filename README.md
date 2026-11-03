# New Life Health Care

Next.js foundation, responsive navigation, video hero, appointment shortcuts, health updates, videos, and footer. The header includes Home, About us, Treatments, Services, Patient guide, Gallery, and Contact us, with an accessible mobile drawer. Our team is nested under About us on desktop and mobile. Treatments and Services have distinct illustrated dropdowns, using source-backed content in src/config/treatments.ts and src/config/services.ts. Their links and the six care cards open the appointment panel with the selected care option prefilled. The footer includes verified business contact details and social links. The home hero uses the supplied public/herosection video.mp4, muted and looping with a pause/play control, a still-image fallback, and reduced-motion support. Other page content and business flows have not been built.

## Local development

Use Node.js 24 (see `.nvmrc`) and npm.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000` to review the header, video hero, appointment-and-icon section, clinic introduction, tabbed Life at New Life videos, health updates, and footer. The former treatment and service content sections and their component code remain removed. Video tabs filter the existing clinic media by category. Health and video cards use local clinic artwork and link to their original posts or the supplied clinic video; source details are in docs/journal-sources.md. The navigation destinations in `src/config/navigation.ts` reserve the future `/about`, `/team`, `/patient-guide`, `/gallery`, and `/contact` routes; those pages are not implemented yet. Business details in `src/config/contact.ts` were checked against the public Facebook About section on October 30, 2026. Opening hours were not available and are omitted.

```sh
npm run check
npm test
npm run build
```

`npm run check` runs ESLint, Next.js route generation, strict TypeScript, and formatting checks. `npm run build` verifies the production build. Commit `package-lock.json` with dependency changes; use `npm ci` for reproducible installs.

## Structure

```text
docs/                  Design decisions and standalone visual reference
public/brand/          Original supplied brand artwork
src/app/               Routing, root metadata, and global style imports
src/components/ui/     Shared presentation primitives and scoped CSS
src/config/            Public application configuration
src/lib/               Small shared utilities
src/styles/            Design tokens and global defaults
```

Use `@/` imports. Keep components server-rendered by default; add `'use client'` only to components needing browser APIs, state, or event handlers. Add feature folders when real features exist, rather than creating empty abstractions now.

## Design system

Read [the design decisions](docs/design-system.md) and [component usage](docs/ui-components.md). Run `npm run design:build`, then open `docs/design-system.html` directly in a browser to inspect the palette and control styling without adding a website route. Rebuild its generated CSS after style changes.

Tokens in `src/styles/tokens.css` are the source of truth. Tailwind's CSS-first theme in `src/styles/globals.css` maps them to utilities such as `bg-action`, `text-muted`, and `border-line`. Components use Tailwind utilities; `cn()` merges class overrides predictably. Buttons and inputs use `rounded-md` (4px), cards use `rounded-lg` (6px), and small details use `rounded-sm` (2px). Radix primitives provide focus management and keyboard behavior for overlays, menus, tooltips, and tabs.

## Component usage

```tsx
import { Button } from '@/components/ui/button';
import { ButtonLink } from '@/components/ui/button-link';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

<Button type="submit">Continue</Button>
<Button variant="outline">Cancel</Button>
<Button loading>Saving</Button>
<ButtonLink href="/your-future-route">View details</ButtonLink>
<Field id="full-name" label="Full name" required hint="As shown on your records.">
  <Input id="full-name" name="fullName" autoComplete="name" required aria-describedby="full-name-hint" />
</Field>
```

Use buttons for actions and links for navigation. Give icon-only buttons an accessible name. When a field has an error, pass `aria-invalid` and include the matching `id-error` in the control's `aria-describedby`; preserve the hint ID if present. Labels and required attributes must agree.

Keep secrets in untracked environment files. No environment variables or backend services are required yet. Add server-only data access and validation alongside actual features; keep sensitive data out of public configuration and browser logs.
"# New-Life-HealthCare-Pvt.Ltd" 
"# New-Life-HealthCare-Pvt.Ltd" 
"# New-Life-HealthCare-Pvt.Ltd" 
