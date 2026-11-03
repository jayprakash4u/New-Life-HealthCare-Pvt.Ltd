import Link from 'next/link';
import { contactConfig } from '@/config/contact';
import { Container } from '@/components/ui/container';
import { HeaderArrow } from '@/components/layout/header-icons';
import { AskQuestionCard } from './ask-question-card';

const topics = [
  {
    title: 'About New Life',
    answer: `New Life Health Care is a polyclinic at ${contactConfig.address}. We bring consultations and everyday health services together at our neighbourhood clinic.`,
    href: '/about',
    label: 'About our clinic',
  },
  {
    title: 'Patient care & services',
    answer:
      'You can enquire about general consultations, child and family healthcare, gynecology, ENT care, and diabetes, blood-pressure and gastric concerns. Laboratory tests, ultrasound, pharmacy support and other listed services are also available.',
    href: '/#plan-your-visit',
    label: 'Explore care options',
  },
  {
    title: 'Appointments & visiting',
    answer:
      'Select your treatment or service in the appointment form and send your request through WhatsApp. You can also call our clinic. Our team will confirm the available consultation time before your visit.',
    href: '/#plan-your-visit',
    label: 'Request a visit',
  },
  {
    title: 'Fees & consultation timings',
    answer:
      'Contact our team for the current consultation fees, doctor schedules and service availability. Please confirm these details before visiting the clinic.',
    href: '/contact',
    label: 'Contact our team',
  },
];

export function HomeFaq() {
  return (
    <section
      id="home-faq"
      aria-labelledby="home-faq-heading"
      className="scroll-mt-40 border-t border-line bg-canvas py-10 sm:py-12 lg:scroll-mt-48 lg:py-14"
    >
      <Container className="grid items-start gap-7 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:grid-cols-[23rem_minmax(0,1fr)] lg:gap-12">
        <div>
          <h2
            id="home-faq-heading"
            className="mb-5 text-[clamp(1.75rem,2.6vw,2.25rem)] leading-tight font-medium tracking-tight"
          >
            Feel free to ask us
          </h2>
          <AskQuestionCard />
        </div>
        <div className="grid min-w-0 gap-3 md:pt-1">
          {topics.map((topic) => (
            <details
              key={topic.title}
              name="home-faq-topics"
              className="group overflow-hidden rounded-md border border-line bg-canvas open:border-action/40"
            >
              <summary className="flex min-h-15 cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-sm leading-relaxed font-semibold text-ink marker:content-none hover:text-action focus-visible:outline-1 focus-visible:-outline-offset-1 [&::-webkit-details-marker]:hidden">
                {topic.title}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="shrink-0 text-action transition-transform group-open:rotate-180 motion-reduce:transition-none"
                  aria-hidden="true"
                >
                  <path d="m5 9 7 7 7-7" />
                </svg>
              </summary>
              <div className="border-t border-line bg-panel px-5 pt-4 pb-3">
                <p className="text-sm leading-7 text-muted">{topic.answer}</p>
                <Link
                  href={topic.href}
                  className="mt-2 inline-flex min-h-11 items-center gap-3 text-xs font-semibold text-action"
                >
                  {topic.label}
                  <HeaderArrow />
                </Link>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
