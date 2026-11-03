import Link from 'next/link';
import type { TreatmentPageData } from '@/config/treatment-pages';
import { contactConfig } from '@/config/contact';
import { Container } from '@/components/ui/container';
import { HeaderArrow } from '@/components/layout/header-icons';

export function TreatmentFaq({ treatment }: { treatment: TreatmentPageData }) {
  const questions = [
    {
      question: `What is included in ${treatment.title}?`,
      answer: treatment.description,
    },
    {
      question: 'How do I request an appointment?',
      answer:
        'Use the appointment button on this page to open the form with your consultation already selected. You can then send your request through WhatsApp, or call our clinic to enquire.',
    },
    {
      question: 'How can I check consultation fees and doctor timings?',
      answer:
        'Please contact our team for the current consultation fees and available doctor timings before your visit. Our team will confirm the appointment time with you.',
    },
    {
      question: 'Where is New Life Health Care?',
      answer: `Our clinic is at ${contactConfig.address}. Call our team if you need help finding us.`,
    },
  ];
  return (
    <section
      id="treatment-faq"
      aria-labelledby="treatment-faq-heading"
      className="scroll-mt-40 border-t border-line bg-canvas py-9 sm:py-12 lg:scroll-mt-48"
    >
      <Container className="grid items-start gap-7 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-7">
        <div className="lg:pr-4">
          <p className="mb-3 text-[10px] font-semibold tracking-[0.12em] text-action uppercase">
            Before your visit
          </p>
          <h2
            id="treatment-faq-heading"
            className="text-[1.875rem] leading-tight font-medium tracking-tight"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            A few practical details to help you plan your consultation.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex min-h-11 items-center gap-3 text-sm font-medium text-action underline underline-offset-4"
          >
            Ask our team
            <HeaderArrow />
          </Link>
        </div>
        <div className="min-w-0 border-t border-line">
          {questions.map((item) => (
            <details
              key={item.question}
              name={`treatment-faq-${treatment.id}`}
              className="group border-b border-line open:bg-panel"
            >
              <summary className="flex min-h-18 cursor-pointer list-none items-center justify-between gap-5 px-4 py-5 text-sm leading-relaxed font-semibold text-ink marker:content-none hover:text-action sm:px-5 sm:text-[15px] [&::-webkit-details-marker]:hidden">
                {item.question}
                <svg
                  className="shrink-0 text-action transition-transform group-open:rotate-45 motion-reduce:transition-none"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="max-w-3xl px-4 pb-5 text-sm leading-7 text-muted sm:px-5">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
