import Link from 'next/link';
import { contactConfig } from '@/config/contact';
import { siteConfig } from '@/config/site';
import { Container } from '@/components/ui/container';
import styles from './site-footer.module.css';

const linkGroups = [
  {
    title: 'Patients',
    links: [
      { label: 'Book an appointment', href: '/#plan-your-visit' },
      { label: 'Find a doctor', href: '/doctors' },
      { label: 'Location & directions', href: '/our-location' },
      { label: 'Contact us', href: '/contact' },
    ],
  },
  {
    title: 'Clinical care',
    links: [
      {
        label: 'General consultations',
        href: '/treatments/general-consultations',
      },
      {
        label: 'Child & family health',
        href: '/treatments/child-family-health',
      },
      { label: 'Gynecology', href: '/treatments/gynecology' },
      {
        label: 'Diabetes, BP & gastric care',
        href: '/treatments/diabetes-bp-gastric-care',
      },
      { label: 'ENT care', href: '/treatments/ent-care' },
      { label: 'Gastroenterology', href: '/treatments/gastroenterology' },
    ],
  },
  {
    title: 'Diagnostics',
    links: [
      { label: 'Laboratory tests', href: '/services/laboratory' },
      { label: 'Ultrasound (USG)', href: '/services/ultrasound' },
    ],
  },
  {
    title: 'New Life',
    links: [
      { label: 'About us', href: '/about' },
      { label: 'Our team', href: '/team' },
      { label: 'Photo gallery', href: '/gallery' },
      { label: 'Health articles', href: '/blogs' },
      { label: 'Videos', href: '/videos' },
    ],
  },
];

function WhatsAppIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.03C9.36 7.03 9.08 7.09 8.84 7.35C8.6 7.61 7.93 8.24 7.93 9.53C7.93 10.82 8.87 12.06 9 12.23C9.13 12.4 10.86 15.06 13.5 16.21C14.13 16.48 14.62 16.64 15 16.77C15.63 16.97 16.2 16.94 16.65 16.87C17.15 16.8 18.19 16.24 18.4 15.63C18.63 15.03 18.63 14.51 18.56 14.4C18.49 14.3 18.32 14.24 18.06 14.11C17.8 13.98 16.53 13.35 16.3 13.26C16.07 13.17 15.9 13.13 15.73 13.39C15.56 13.65 15.07 14.24 14.92 14.4C14.77 14.57 14.62 14.6 14.36 14.47C14.1 14.34 13.26 14.07 12.27 13.18C11.5 12.5 10.98 11.65 10.83 11.39C10.68 11.13 10.81 10.99 10.94 10.86C11.06 10.74 11.2 10.55 11.33 10.4C11.45 10.25 11.5 10.14 11.58 9.97C11.66 9.8 11.62 9.65 11.56 9.53C11.5 9.4 11.03 8.24 10.83 7.76C10.63 7.28 10.44 7.34 10.29 7.34H9.95C9.81 7.34 9.69 7.03 9.53 7.03Z" />
    </svg>
  );
}

function FacebookIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TikTokIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    timeZone: 'Asia/Kathmandu',
  }).format(new Date());

  return (
    <footer className={styles.footer}>
      <Container>
        <div className="grid gap-8 py-9 sm:py-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,4fr)] lg:gap-10 lg:py-14">
          <div>
            <Link
              href="/"
              className={`${styles.brand} text-sm font-semibold uppercase`}
            >
              {siteConfig.legalName}
            </Link>
            <address className="mt-3 text-sm leading-relaxed not-italic">
              {contactConfig.address}
            </address>
            <p className="mt-4 text-sm leading-relaxed">
              <span className="font-medium text-white">Clinic hours</span>
              <br />
              Sun–Fri, 7:00 AM – 7:00 PM
              <br />
              Sat, 8:00 AM – 2:00 PM
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {contactConfig.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={styles.social}
                >
                  {social.label === 'Facebook' ? (
                    <FacebookIcon />
                  ) : (
                    <TikTokIcon />
                  )}
                </a>
              ))}
              <a
                href={contactConfig.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className={styles.social}
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          <nav
            aria-label="Footer links"
            className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-4 sm:gap-x-6"
          >
            {linkGroups.map(({ title, links }) => (
              <div key={title} className="min-w-0">
                <h2 className="text-xs font-semibold tracking-widest text-white uppercase">
                  {title}
                </h2>
                <ul className="mt-2 text-sm">
                  {links.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="inline-flex min-h-9 items-center py-1.5 leading-snug"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-x-5 gap-y-2 border-y border-white/20 py-4 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:[&>*+*]:border-l sm:[&>*+*]:border-white/25 sm:[&>*+*]:pl-5">
          <a href={contactConfig.phone.href}>
            Call <span className="text-white">{contactConfig.phone.label}</span>
          </a>
          <a
            href={`mailto:${contactConfig.email}`}
            className="min-w-0 [overflow-wrap:anywhere]"
          >
            Email <span className="text-white">{contactConfig.email}</span>
          </a>
          <Link href="/admin/login">Staff portal</Link>
        </div>

        <div className="flex flex-col gap-2 py-5 text-sm sm:flex-row sm:justify-between">
          <p>
            © {year} {siteConfig.legalName} All rights reserved.
          </p>
          <p>Serving Imadol & Kathmandu Valley</p>
        </div>
      </Container>
    </footer>
  );
}
