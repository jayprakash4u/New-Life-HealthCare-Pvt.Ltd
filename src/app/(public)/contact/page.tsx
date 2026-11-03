import { getPageCopy } from '@/lib/admin-content';
import type { Metadata } from 'next';
import Link from 'next/link';
import { contactConfig } from '@/config/contact';
import { Container } from '@/components/ui/container';
import { ContactForm } from '@/components/contact/contact-form';
import {
  HeaderPhone,
  HeaderMessage,
  HeaderArrow,
} from '@/components/layout/header-icons';

export const metadata: Metadata = {
  title: 'Contact us',
  description:
    'Contact New Life Health Care in Imadol, Lalitpur. Call 01-5253554, message our team on WhatsApp, or enquire about your next visit.',
};

export default async function ContactPage() {
  const copy = await getPageCopy('contact');
  return (
    <>
      <section
        aria-labelledby="contact-heading"
        className="bg-panel pt-7 pb-10 sm:pt-9 sm:pb-14 lg:pb-16"
      >
        <Container>
          <nav
            aria-label="Breadcrumb"
            className="mb-7 flex items-center gap-3 text-xs text-muted"
          >
            <Link href="/" className="hover:text-action">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Contact us</span>
          </nav>
          <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
            <div>
              <p className="mb-4 text-[11px] font-semibold tracking-[0.12em] text-action uppercase">
                We’re here to help
              </p>
              <h1
                id="contact-heading"
                className="text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.1] font-medium whitespace-pre-line tracking-tight"
              >
                {copy.title}
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                {copy.body}
              </p>
              <div className="mt-8 divide-y divide-line border-y border-line">
                <a
                  href={contactConfig.phone.href}
                  className="group flex items-center gap-4 py-5"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-md border border-line bg-canvas text-action">
                    <HeaderPhone />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-muted">
                      Call our clinic
                    </span>
                    <span className="mt-1 block text-lg font-semibold group-hover:text-action">
                      {contactConfig.phone.label}
                    </span>
                  </span>
                  <HeaderArrow className="text-action" />
                </a>
                <a
                  href={contactConfig.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${contactConfig.whatsapp.label} (opens in a new tab)`}
                  className="group flex items-center gap-4 py-5"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-md border border-line bg-canvas text-action">
                    <HeaderMessage />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-muted">
                      Message on WhatsApp
                    </span>
                    <span className="mt-1 block text-lg font-semibold group-hover:text-action">
                      {contactConfig.whatsapp.label}
                    </span>
                  </span>
                  <HeaderArrow className="text-action" />
                </a>
                <a
                  href={`mailto:${contactConfig.email}`}
                  className="group flex items-center gap-4 py-5"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-md border border-line bg-canvas text-action">
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="1" />
                      <path d="m3 6 9 7 9-7" />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-muted">Email us</span>
                    <span className="mt-1 block text-sm leading-relaxed font-semibold break-all group-hover:text-action sm:text-base">
                      {contactConfig.email}
                    </span>
                  </span>
                  <HeaderArrow className="shrink-0 text-action" />
                </a>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
                <span className="text-muted">Stay connected</span>
                {contactConfig.social.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label} (opens in a new tab)`}
                    className="inline-flex min-h-11 items-center gap-2 font-medium text-action underline underline-offset-4"
                  >
                    {item.label}
                    <HeaderArrow />
                  </a>
                ))}
              </div>
            </div>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
