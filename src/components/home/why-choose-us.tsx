import { Container } from '@/components/ui/container';
import { CareIcon } from '@/components/ui/care-icon';
import { HeaderMessage, HeaderPin } from '@/components/layout/header-icons';

const reasons = [
  {
    title: 'Care in one place',
    icon: <CareIcon name="consultation" size={22} />,
    description:
      'Consultations, laboratory tests, ultrasound and pharmacy services at one clinic.',
  },
  {
    title: 'For every generation',
    icon: <CareIcon name="family" size={22} />,
    description:
      'From child and family health to gynecology and senior checkups, we care for different generations.',
  },
  {
    title: 'Close to home',
    icon: <HeaderPin />,
    description:
      'Located in Imadol, Lalitpur, our clinic is close by for checkups and follow-up visits.',
  },
  {
    title: 'A clear next step',
    icon: <HeaderMessage />,
    description:
      'Call or message our team to check consultation times and prepare for your visit.',
  },
] as const;

export function WhyChooseUs() {
  return (
    <section
      id="why-new-life"
      aria-labelledby="why-new-life-heading"
      className="scroll-mt-40 border-b border-line bg-panel py-10 sm:py-14 lg:scroll-mt-48 lg:py-16"
    >
      <Container>
        <h2
          id="why-new-life-heading"
          className="mb-7 text-[clamp(1.75rem,2.6vw,2.25rem)] leading-tight font-medium tracking-tight"
        >
          Why choose New Life?
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <article
              key={reason.title}
              className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-x-3 rounded-md border border-line bg-canvas p-4 lg:grid-cols-1 lg:gap-y-3 lg:p-6"
            >
              <span
                aria-hidden="true"
                className="flex size-10 items-center justify-center rounded-md bg-soft text-action"
              >
                {reason.icon}
              </span>
              <div>
                <h3 className="font-semibold tracking-tight text-ink">
                  {reason.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {reason.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
