# Service pages

All six Services menu options resolve through `src/app/services/[slug]/page.tsx`. Overview copy, enquiry labels, images and service-specific FAQ content are maintained in `src/config/service-pages.ts`. Shared presentation is in `src/components/services/`.

The pages use the existing teal palette, copper enquiry actions, minimal corner radius and responsive layouts. Each enquiry link prefills the matching service in the home appointment panel. Unknown service slugs return a 404.

Service scope follows `docs/services-research.md`. Pages direct visitors to confirm current fees, availability, preparation requirements and visit arrangements with the clinic. They do not invent hours, prices, vaccine stock, diagnostic packages or clinical outcomes.

All supporting photographs are AI-generated illustrations of fictional people. Breast screening, hearing tests and senior checkups reuse the relevant existing treatment illustrations; laboratory, pharmacy and vaccination pages have dedicated illustrations in `public/media/services/`. The page images are labelled as illustrative.
