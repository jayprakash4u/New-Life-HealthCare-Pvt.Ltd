import { ButtonLink } from '@/components/ui/button-link';
import { Container } from '@/components/ui/container';

const strengths = [
  {
    title: 'Care with attention',
    description:
      'We aim to give each person the attention they deserve, with time to discuss concerns, ask questions and understand the next step in their care.',
    icon: (
      <>
        <circle cx="12" cy="9" r="6" />
        <path d="m8 14-2 7 6-3 6 3-2-7" />
        <path d="m9 9 2 2 4-4" className="stroke-accent-strong" />
      </>
    ),
  },
  {
    title: 'Honesty and clear communication',
    description:
      'Clear information matters. We encourage conversations about the care available, consultation details and what to expect before your visit.',
    icon: (
      <>
        <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z" />
        <path d="m8 12 3 3 5-6" className="stroke-accent-strong" />
      </>
    ),
  },
  {
    title: 'Compassion and respect',
    description:
      'Every visit is personal. Our approach is to listen with patience and treat you and your family with warmth, dignity and respect.',
    icon: (
      <>
        <path d="M12 20S3 14.5 3 8a4.5 4.5 0 0 1 9-1 4.5 4.5 0 0 1 9 1c0 6.5-9 12-9 12Z" />
        <path d="M9 11h6m-3-3v6" className="stroke-accent-strong" />
      </>
    ),
  },
  {
    title: 'Care that works together',
    description:
      'Consultations, laboratory tests, ultrasound and pharmacy support come together at New Life, helping you access everyday health services in one place.',
    icon: (
      <>
        <path d="M12 7v4m0 0-6 5m6-5 6 5" />
        <circle cx="12" cy="4" r="3" />
        <circle cx="5" cy="18" r="3" />
        <circle cx="19" cy="18" r="3" />
        <circle
          cx="12"
          cy="11"
          r="1.3"
          className="fill-accent stroke-accent-strong"
        />
      </>
    ),
  },
];

export function OurStrengths() {
  return (
    <section
      aria-labelledby="strengths-heading"
      className="bg-canvas py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <div className="flex flex-col gap-4 border-b border-line pb-7 md:flex-row md:items-end md:justify-between md:gap-12">
          <h2
            id="strengths-heading"
            className="shrink-0 text-[clamp(1.75rem,2.6vw,2.25rem)] leading-tight font-medium tracking-tight text-ink"
          >
            Our Strengths
          </h2>
        </div>
        <div className="grid md:grid-cols-2 md:gap-x-14 lg:gap-x-20">
          {strengths.map((strength) => (
            <article
              key={strength.title}
              className="flex items-start gap-5 border-b border-line py-7 sm:gap-6 sm:py-9"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 size-12 shrink-0 text-action sm:size-14"
              >
                {strength.icon}
              </svg>
              <div>
                <h3 className="text-base leading-6 font-semibold text-ink sm:text-lg">
                  {strength.title}
                </h3>
                <p className="mt-2.5 max-w-md text-sm leading-6 text-muted">
                  {strength.description}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex justify-start">
          <ButtonLink
            href="/#plan-your-visit"
            variant="outline"
            className="gap-7"
          >
            Explore our care <span aria-hidden="true">&rarr;</span>
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
