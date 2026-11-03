# Treatment pages

All five Treatments menu options use `src/app/treatments/[slug]/page.tsx` and the shared `TreatmentOverview` component. Content is maintained in `src/config/treatment-pages.ts`; unknown treatments return a 404.

Each page includes an overview, relevant consultation areas, an appointment link with the care option preselected, and matching sample doctor profiles. Service scope follows `docs/services-research.md`.

Images in `public/media/treatments/` are AI-generated illustrations featuring fictional people. They were created for this website design and are labelled as illustrative on the pages. They do not document real clinic consultations. The images cover general consultations, family care, gynecology, ongoing-health consultations and ENT care.
