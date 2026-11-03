import Image from 'next/image';
import Link from 'next/link';
import type { ServicePageData } from '@/config/service-pages';
import { contactConfig } from '@/config/contact';
import { getCareRequestHref } from '@/lib/care-request';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button-link';
import { CareIcon } from '@/components/ui/care-icon';
import { HeaderArrow, HeaderPhone } from '@/components/layout/header-icons';
import { ServiceFaq } from './service-faq';
import { LabBenefits } from './lab-benefits';
import { CareEnquiry } from '@/components/care/care-enquiry';
import { ServiceCareGuide } from './service-care-guide';

export function ServiceOverview({ service }: { service: ServicePageData }) {
  return (
    <article className="bg-canvas">
      <section
        aria-labelledby="service-heading"
        className="pt-6 pb-10 sm:pt-8 sm:pb-14"
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
            <span>Services</span>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{service.title}</span>
          </nav>
          <div className="mb-8 flex items-center justify-between gap-5 border-b border-line pb-6 sm:mb-10 sm:pb-8">
            <h1
              id="service-heading"
              className="min-w-0 text-[clamp(1.5rem,4vw,3.25rem)] leading-[1.15] font-medium tracking-[-0.04em]"
            >
              {service.headingLead}
              {service.headingLead ? ' ' : ''}
              <span className="text-action">{service.headingAccent}</span>
            </h1>
            <CareIcon
              name={service.icon}
              size={40}
              className="hidden size-10 shrink-0 text-action sm:block"
            />
          </div>
          <div className="grid items-start gap-8 md:grid-cols-[1.1fr_1fr] lg:gap-14">
            <div className="max-w-xl md:py-2">
              <p className="mb-4 text-[10px] font-semibold tracking-[0.12em] text-accent-strong uppercase">
                Support for your everyday health
              </p>
              <h2 className="mb-5 text-[1.5rem] leading-tight font-semibold tracking-tight">
                Overview
              </h2>
              <div className="space-y-4 text-sm leading-7 text-muted sm:text-base">
                {service.overview.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className={index === 0 ? 'text-ink' : undefined}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <ul
                aria-label="Service highlights"
                className="mt-6 grid gap-3 border-t border-line pt-5 text-sm text-muted"
              >
                {service.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-3">
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
                    {highlight}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                <ButtonLink
                  href={getCareRequestHref(service.id)}
                  variant="booking"
                  className="min-h-12 gap-5"
                >
                  {service.action}
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
            <figure className="min-w-0 overflow-hidden rounded-md border border-line bg-panel">
              <div className="relative aspect-[4/3] bg-soft md:aspect-[5/4] lg:aspect-[4/3]">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  priority
                  sizes="(min-width:1280px) 540px, (min-width:768px) 44vw, 100vw"
                  className={
                    service.id === 'ultrasound'
                      ? 'object-contain'
                      : 'object-cover object-center'
                  }
                />
                <span className="absolute right-3 bottom-3 rounded-sm bg-white/90 px-2 py-1 text-[10px] font-medium text-muted">
                  {service.id === 'ultrasound'
                    ? 'Educational ultrasound image'
                    : 'Illustrative image'}
                </span>
              </div>
            </figure>
          </div>
        </Container>
      </section>
      {service.id === 'laboratory' && <LabBenefits />}
      <ServiceCareGuide serviceId={service.id} />
      <ServiceFaq service={service} />
      <CareEnquiry key={service.id} careName={service.title} />
    </article>
  );
}
