import Link from 'next/link';
import type { ServicePageData } from '@/config/service-pages';
import { contactConfig } from '@/config/contact';
import { Container } from '@/components/ui/container';
import { HeaderArrow } from '@/components/layout/header-icons';

export function ServiceFaq({ service }: { service: ServicePageData }) {
  const questions = [
    { question: service.question, answer: service.answer },
    {
      question: 'How do I send an enquiry?',
      answer:
        'Use the enquiry button on this page to open the form with this service selected. Send your request through WhatsApp, or call our clinic directly.',
    },
    {
      question: 'How can I check fees and availability?',
      answer:
        'Contact our team for the current charges and service availability before you visit. Our team can also tell you whether any specific arrangements are needed for the service you are asking about.',
    },
    {
      question: 'Where can I visit the clinic?',
      answer: `New Life Health Care is at ${contactConfig.address}. Contact our team if you need help finding the clinic.`,
    },
  ];
  return (
    <section
      id="service-faq"
      aria-labelledby="service-faq-heading"
      className="scroll-mt-40 bg-canvas py-9 sm:py-12 lg:scroll-mt-48"
    >
      <Container className="grid items-start gap-7 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-7">
        <div>
          <p className="mb-3 text-[10px] font-semibold tracking-[0.12em] text-accent-strong uppercase">
            Before your visit
          </p>
          <h2
            id="service-faq-heading"
            className="text-[1.875rem] leading-tight font-medium tracking-tight"
          >
            Frequently asked questions
          </h2>
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
              name={`service-faq-${service.id}`}
              className="group border-b border-line open:bg-panel"
            >
              <summary className="flex min-h-18 cursor-pointer list-none items-center justify-between gap-5 px-4 py-5 text-sm leading-relaxed font-semibold marker:content-none hover:text-action focus-visible:outline-1 focus-visible:-outline-offset-1 sm:px-5 sm:text-[15px] [&::-webkit-details-marker]:hidden">
                {item.question}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="shrink-0 text-action transition-transform group-open:rotate-45 motion-reduce:transition-none"
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
