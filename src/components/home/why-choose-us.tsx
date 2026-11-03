import { Container } from '@/components/ui/container';

const reasons = [
  {
    title: 'Care in one place',
    description:
      'Consultations, laboratory tests, ultrasound and pharmacy services at one clinic. Speak with our team about the care you need and the options available for your visit.',
  },
  {
    title: 'For every generation',
    description:
      'From child and family health to gynecology and senior checkups, New Life brings everyday healthcare closer to different members of your family.',
  },
  {
    title: 'Close to home',
    description:
      'Located in Imadol, Lalitpur, our neighbourhood clinic gives you a local place to discuss a health concern, arrange a checkup or follow up on earlier care.',
  },
  {
    title: 'A clear next step',
    description:
      'Call or message our team to discuss the service you need, check consultation times and confirm the details. Know what to expect before you come to the clinic.',
  },
] as const;

export function WhyChooseUs() {
  return (
    <section
      id="why-new-life"
      aria-labelledby="why-new-life-heading"
      className="scroll-mt-40 border-b border-line bg-canvas py-12 sm:py-14 lg:scroll-mt-48 lg:py-16"
    >
      <Container>
        <h2
          id="why-new-life-heading"
          className="mb-7 text-[clamp(1.75rem,2.6vw,2.25rem)] leading-tight font-medium tracking-tight"
        >
          Why choose New Life?
        </h2>
        <div className="grid overflow-hidden rounded-sm sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <article
              key={reason.title}
              className={`px-7 py-8 text-white sm:px-8 sm:py-10 lg:min-h-72 lg:px-9 lg:py-11 ${index % 2 === 0 ? 'bg-action' : 'bg-action-hover'}`}
            >
              <h3 className="min-h-[2.2em] max-w-[9ch] font-serif text-[1.625rem] leading-[1.1] font-normal tracking-[-0.025em] text-white">
                {reason.title}
              </h3>
              <div aria-hidden="true" className="mt-4 h-px w-12 bg-white/80" />
              <p className="mt-4 text-sm leading-[1.8] text-white/95">
                {reason.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
