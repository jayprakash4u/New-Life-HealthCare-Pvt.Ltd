import { Container } from '@/components/ui/container';

const values = [
  {
    title: 'Respect',
    description: 'Listen carefully. Treat every person with dignity.',
  },
  {
    title: 'Clarity',
    description: 'Make information understandable and welcome questions.',
  },
  {
    title: 'Connection',
    description: 'Work together around the needs of each person.',
  },
];

export function MissionVisionValues() {
  return (
    <section
      id="mission-vision-values"
      aria-labelledby="purpose-heading"
      className="scroll-mt-40 border-b border-line bg-canvas py-12 sm:py-16 lg:scroll-mt-48 lg:py-20"
    >
      <Container>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
          <h2
            id="purpose-heading"
            className="text-[clamp(1.75rem,2.6vw,2.25rem)] leading-tight font-medium tracking-tight text-ink"
          >
            Mission, Vision &amp; Values
          </h2>
        </div>
        <div className="grid overflow-hidden rounded-sm lg:grid-cols-3">
          <article className="bg-action p-6 text-white sm:p-8 lg:p-9">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[11px] font-semibold tracking-[0.12em] text-white/80 uppercase">
                Our mission
              </p>
              <svg
                aria-hidden="true"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="size-12 shrink-0 text-white/75"
              >
                <circle cx="24" cy="24" r="18" />
                <circle cx="24" cy="24" r="11" />
                <circle
                  cx="24"
                  cy="24"
                  r="3"
                  className="fill-white stroke-white"
                />
              </svg>
            </div>
            <h3 className="mt-7 font-serif text-[1.625rem] leading-snug font-normal tracking-tight text-white">
              Care within reach.
            </h3>
            <div aria-hidden="true" className="mt-4 h-px w-12 bg-white/80" />
            <p className="mt-4 text-sm leading-7 text-white/95">
              To bring consultations and everyday health services closer to
              families in Imadol, with attentive listening, clear guidance and
              support for the next step in their care.
            </p>
          </article>
          <article className="bg-action-hover p-6 text-white sm:p-8 lg:p-9">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[11px] font-semibold tracking-[0.12em] text-white/80 uppercase">
                Our vision
              </p>
              <svg
                aria-hidden="true"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                className="size-12 shrink-0 text-white/75"
              >
                <path d="M5 30h38M10 36h28M16 42h16M13 30a11 11 0 0 1 22 0M24 6v6M8 14l4 4m28-4-4 4" />
                <path d="M24 19v5" className="stroke-white" />
              </svg>
            </div>
            <h3 className="mt-7 font-serif text-[1.625rem] leading-snug font-normal tracking-tight text-white">
              A healthier community.
            </h3>
            <div aria-hidden="true" className="mt-4 h-px w-12 bg-white/80" />
            <p className="mt-4 text-sm leading-7 text-white/95">
              To be a trusted neighbourhood clinic where people feel comfortable
              seeking advice, asking questions and taking an active role in
              their own and their family’s wellbeing.
            </p>
          </article>
          <article className="bg-action p-6 text-white sm:p-8 lg:p-9">
            <p className="flex min-h-12 items-center text-[11px] font-semibold tracking-[0.12em] text-white/80 uppercase">
              Our values
            </p>
            <h3 className="mt-7 font-serif text-[1.625rem] leading-snug font-normal tracking-tight text-white">
              The way we care.
            </h3>
            <div aria-hidden="true" className="mt-4 h-px w-12 bg-white/80" />
            <dl className="mt-6 grid gap-5">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="border-l-2 border-white/35 pl-4"
                >
                  <dt className="text-sm font-semibold text-white">
                    {value.title}
                  </dt>
                  <dd className="mt-1 text-xs leading-6 text-white/90">
                    {value.description}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      </Container>
    </section>
  );
}
