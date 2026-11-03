import type { TreatmentPageData } from '@/config/treatment-pages';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button-link';
import { HeaderArrow, HeaderPhone } from '@/components/layout/header-icons';
import { contactConfig } from '@/config/contact';
import { getCareRequestHref } from '@/lib/care-request';
import { RelatedDoctors } from '@/components/doctors/related-doctors';
import { TreatmentFaq } from './treatment-faq';
import { ClinicVideoFeature } from './clinic-video-feature';
import { CareEnquiry } from '@/components/care/care-enquiry';
import { BookVisit } from '@/components/care/book-visit';
import { DigestiveHealthGuide } from './digestive-health-guide';
import { TreatmentCareGuide } from './treatment-care-guide';

export function TreatmentOverview({
  treatment,
}: {
  treatment: TreatmentPageData;
}) {
  return (
    <article className="bg-canvas">
      <section
        aria-labelledby="treatment-heading"
        className="pt-6 pb-10 sm:pt-8 sm:pb-14 lg:pb-16"
      >
        <Container>
          <nav
            aria-label="Breadcrumb"
            className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted"
          >
            <Link href="/" className="hover:text-action">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span>Treatments</span>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{treatment.title}</span>
          </nav>
          <div className="mb-8 border-b border-line pb-6 sm:mb-10 sm:pb-8">
            <h1
              id="treatment-heading"
              className="text-[clamp(1.375rem,4.2vw,3.25rem)] leading-[1.12] font-medium tracking-[-0.04em] whitespace-nowrap"
            >
              {treatment.headingLead}
              {treatment.headingLead ? ' ' : ''}
              <span className="text-action">{treatment.headingAccent}</span>
            </h1>
          </div>
          <div className="grid items-start gap-8 md:grid-cols-[1.1fr_1fr] lg:gap-14">
            <div className="max-w-xl md:py-2">
              <div className="mb-5 flex items-center gap-3">
                <span aria-hidden="true" className="h-6 w-0.5 bg-action" />
                <h2 className="text-[1.5rem] leading-tight font-semibold tracking-tight">
                  Overview
                </h2>
              </div>
              <div className="space-y-4 text-sm leading-7 text-muted sm:text-base">
                {treatment.overview.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className={index === 0 ? 'text-ink' : undefined}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <ul
                aria-label="Consultation areas"
                className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-5 text-sm text-muted"
              >
                {treatment.highlights.map((label) => (
                  <li key={label} className="flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="shrink-0 text-action"
                      aria-hidden="true"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                    {label}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                <ButtonLink
                  href={getCareRequestHref(treatment.id)}
                  variant="booking"
                  className="min-h-12 gap-5"
                >
                  Request an appointment
                  <HeaderArrow />
                </ButtonLink>
                <a
                  href={contactConfig.phone.href}
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-action"
                >
                  <HeaderPhone />
                  {contactConfig.phone.label}
                </a>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-soft md:aspect-[5/4] lg:aspect-[4/3]">
              <Image
                src={treatment.image}
                alt={treatment.imageAlt}
                fill
                priority
                sizes="(min-width:1280px) 540px, (min-width:768px) 44vw, 100vw"
                className="object-cover object-center"
              />
              <span className="absolute right-3 bottom-3 rounded-sm bg-white/90 px-2 py-1 text-[10px] font-medium text-muted">
                Illustrative image
              </span>
            </div>
          </div>
        </Container>
      </section>
      {treatment.id === 'gastroenterology' && <DigestiveHealthGuide />}
      <TreatmentCareGuide careId={treatment.id} />
      <RelatedDoctors careId={treatment.id} />
      <ClinicVideoFeature />
      <TreatmentFaq treatment={treatment} />
      <BookVisit key={`booking-${treatment.id}`} careName={treatment.title} />
      <CareEnquiry key={treatment.id} careName={treatment.title} />
    </article>
  );
}
