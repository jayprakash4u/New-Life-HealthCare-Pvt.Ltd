import Image from 'next/image';
import Link from 'next/link';
import { contactConfig } from '@/config/contact';
import { contactLink, navigation } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { Container } from '@/components/ui/container';
import { buttonStyles } from '@/components/ui/button-styles';

function OutwardArrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M6 18 18 6M6 6h12v12" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m8 3 3 5-3 2c1.3 2.6 3.4 4.7 6 6l2-3 5 3v3a2 2 0 0 1-2 2C10 21 3 14 3 5a2 2 0 0 1 2-2h3Z" />
    </svg>
  );
}

const sectionHeading =
  'mb-5 text-[11px] font-semibold tracking-[0.14em] text-muted uppercase';
const footerLink =
  'inline-flex min-h-11 items-center gap-2 py-2 text-sm text-ink transition-colors hover:text-action';

export function SiteFooter() {
  const year = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    timeZone: 'Asia/Kathmandu',
  }).format(new Date());

  return (
    <footer className="border-t border-line bg-panel">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 border-b border-line py-9 sm:flex-row sm:items-center lg:py-11">
          <div className="border-l-2 border-action pl-5">
            <p className="mb-2 text-[10px] font-semibold tracking-[0.16em] text-action uppercase">
              A little guidance. A clear next step.
            </p>
            <h2 className="text-[clamp(1.375rem,2.5vw,1.875rem)] font-medium tracking-tight">
              Let’s talk about your care.
            </h2>
          </div>
          <a
            href={contactConfig.phone.href}
            className={buttonStyles(
              'primary',
              'md',
              'w-full shrink-0 gap-3 sm:w-auto',
            )}
          >
            <PhoneIcon />
            Call {contactConfig.phone.label}
          </a>
        </div>

        <div className="grid gap-x-10 gap-y-9 py-10 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.7fr_1.3fr_0.65fr] lg:gap-x-12 lg:py-12">
          <div>
            <Link
              href="/"
              aria-label="New Life Health Care — home"
              className="inline-flex rounded-sm"
            >
              <Image
                src="/brand/new-life-health-care.png"
                alt={siteConfig.legalName}
                width={599}
                height={416}
                className="h-auto w-36"
              />
            </Link>
            <p className="mt-5 max-w-56 text-sm leading-relaxed text-muted">
              Care, with you at the centre.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className={sectionHeading}>Explore</h3>
            <ul className="-mt-2">
              {[...navigation, contactLink].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className={sectionHeading}>Visit & connect</h3>
            <address className="text-sm leading-relaxed not-italic">
              <p className="mb-4 max-w-56 text-ink">{contactConfig.address}</p>
              <a
                href={`mailto:${contactConfig.email}`}
                className="inline-flex min-h-11 items-center break-all py-2 text-ink transition-colors hover:text-action"
              >
                {contactConfig.email}
              </a>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 text-sm">
                <span className="text-muted">WhatsApp</span>
                <a
                  href={contactConfig.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${contactConfig.whatsapp.label} (opens in a new tab)`}
                  className={footerLink}
                >
                  {contactConfig.whatsapp.label}
                  <OutwardArrow />
                </a>
              </div>
            </address>
          </div>

          <div>
            <h3 className={sectionHeading}>Follow along</h3>
            <ul className="-mt-2">
              {contactConfig.social.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} (opens in a new tab)`}
                    className={footerLink}
                  >
                    {social.label}
                    <OutwardArrow />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName} All rights reserved.
          </p>
          <span className="flex items-center gap-2.5">
            <span aria-hidden="true" className="h-px w-7 bg-action" />
            Imadol, Lalitpur
          </span>
        </div>
      </Container>
    </footer>
  );
}
