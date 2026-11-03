import { Container } from '@/components/ui/container';

const benefits = [
  {
    icon: 'lab',
    title: 'Laboratory testing',
    description: 'Enquire about the lab tests available at the clinic.',
  },
  {
    icon: 'preparation',
    title: 'Preparation guidance',
    description:
      'Ask about the preparation required for your specific laboratory test.',
  },
  {
    icon: 'clinic',
    title: 'Consultations in one place',
    description:
      'Consultation and diagnostic services at New Life Health Care.',
  },
  {
    icon: 'enquiry',
    title: 'Help before your visit',
    description:
      'Confirm availability, fees and any preparation with our team.',
  },
] as const;

function LabBenefitIcon({ kind }: { kind: (typeof benefits)[number]['icon'] }) {
  return (
    <svg
      width="76"
      height="76"
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-action"
    >
      {kind === 'lab' && (
        <>
          <path d="m33 16 9-9 14 14-9 9ZM31 18l-7 7 14 14 7-7m-13 3-4 4m-6 4 7-7 5 5-7 7Z" />
          <path d="M48 31c17 1 20 26-1 29M23 55h31M35 55v13m-19 0h47l3 5H13l3-5Z" />
          <circle
            cx="52"
            cy="38"
            r="6"
            className="fill-accent-soft stroke-accent-strong"
          />
        </>
      )}
      {kind === 'preparation' && (
        <>
          <rect x="17" y="14" width="46" height="58" rx="2" />
          <rect x="29" y="8" width="22" height="12" rx="2" fill="white" />
          <path d="M28 34h25M28 45h25M28 56h12" />
          <path d="m43 59 5 5 11-13" className="stroke-accent-strong" />
        </>
      )}
      {kind === 'clinic' && (
        <>
          <path d="M14 73V22h52v51M8 73h64M23 22V8h34v14M32 73V55h16v18M22 34h9m18 0h9M22 44h9m18 0h9" />
          <path d="M40 11v17m-8-8h16" className="stroke-accent-strong" />
          <path d="M38 64h1" />
        </>
      )}
      {kind === 'enquiry' && (
        <>
          <path d="M12 19a6 6 0 0 1 6-6h43a6 6 0 0 1 6 6v31a6 6 0 0 1-6 6H33L18 68V56a6 6 0 0 1-6-6V19Z" />
          <path d="M24 29h31M24 38h21" />
          <circle
            cx="55"
            cy="52"
            r="12"
            className="fill-accent-soft stroke-accent-strong"
          />
          <path d="m50 52 4 4 7-8" className="stroke-accent-strong" />
        </>
      )}
    </svg>
  );
}

export function LabBenefits() {
  return (
    <section
      id="why-new-life-labs"
      aria-labelledby="lab-benefits-heading"
      className="scroll-mt-40 border-t border-line bg-panel py-10 sm:py-12 lg:scroll-mt-48"
    >
      <Container>
        <div className="mb-7 text-center sm:mb-9">
          <h2
            id="lab-benefits-heading"
            className="text-[clamp(1.5rem,2.7vw,2rem)] leading-tight font-medium tracking-tight"
          >
            Why choose New Life for laboratory testing?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
            Testing and consultation support at your neighbourhood clinic.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {benefits.map((benefit) => (
            <li
              key={benefit.icon}
              className="relative isolate flex min-h-64 min-w-0 flex-col items-center overflow-hidden rounded-md border border-line bg-canvas px-5 py-7 text-center shadow-sm"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(var(--color-border)_0.7px,transparent_0.7px)] opacity-60 [background-size:18px_18px]"
              />
              <LabBenefitIcon kind={benefit.icon} />
              <h3 className="mt-6 max-w-56 text-base leading-snug font-semibold tracking-tight">
                {benefit.title}
              </h3>
              <p className="mt-3 max-w-56 text-xs leading-relaxed text-muted">
                {benefit.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
