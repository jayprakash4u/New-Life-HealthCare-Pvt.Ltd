import Image from 'next/image';
import Link from 'next/link';
import { contactConfig } from '@/config/contact';
import { siteConfig } from '@/config/site';
import { Container } from '@/components/ui/container';
import styles from './site-footer.module.css';

function OutwardArrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}

function PhoneIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      className="size-3.5 text-action shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg
      className="size-4 text-action shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5"
      />
    </svg>
  );
}

function MapPinIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );
}

function MailIcon({ className = 'size-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
}

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
    <footer
      className={`${styles.footer} border-t border-line bg-panel text-ink`}
    >
      {/* 1. Pre-Footer Banner: Quick Booking & Call CTA */}
      <div
        className={`${styles.banner} border-b border-line bg-canvas/60 py-9 sm:py-11`}
      >
        <Container>
          <div
            className={`${styles.invitation} flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-gradient-to-br from-panel via-canvas to-panel p-6 sm:p-8 lg:flex-row lg:items-center shadow-2xs`}
          >
            <div className="max-w-xl">
              <span
                className={`${styles.eyebrow} inline-flex items-center gap-1.5 rounded-full bg-action/10 px-3 py-1 text-[11px] font-semibold text-action uppercase tracking-wider`}
              >
                <span className="size-1.5 rounded-full bg-action animate-pulse" />
                Compassionate Healthcare in Imadol
              </span>
              <h2 className="mt-2.5 text-xl font-bold tracking-tight text-ink sm:text-2xl">
                Plan your visit
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-muted">
                Request an appointment or speak with our team in Imadol.
              </p>
            </div>

            <div
              className={`${styles.ctas} flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0`}
            >
              <Link
                href="/#plan-your-visit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-action px-5 py-2.5 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-action/90"
              >
                <CalendarIcon />
                <span>Book an Appointment</span>
                <OutwardArrow />
              </Link>
              <a
                href={contactConfig.phone.href}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-canvas px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:border-action hover:text-action hover:bg-panel shadow-2xs"
              >
                <PhoneIcon className="size-4 text-action" />
                <span>Call {contactConfig.phone.label}</span>
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* 2. Main 4-Column Footer */}
      <div className={`${styles.directory} py-12 lg:py-14`}>
        <Container>
          <div
            className={`${styles.columns} grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8`}
          >
            {/* Column 1: Clinic Profile & Working Hours (4 cols) */}
            <div className={`${styles.profile} lg:col-span-4 space-y-4`}>
              <Link
                href="/"
                aria-label="New Life Health Care — home"
                className="inline-flex"
              >
                <Image
                  src="/brand/new-life-health-care.png"
                  alt={siteConfig.legalName}
                  width={599}
                  height={416}
                  className="h-auto w-44 sm:w-48 max-w-full object-contain"
                />
              </Link>
              <p className="text-xs leading-relaxed text-muted max-w-sm">
                Consultations and diagnostics in Imadol, Lalitpur.
              </p>

              {/* Operating Hours Card */}
              <div
                className={`${styles.hours} rounded-xl border border-line bg-canvas p-3.5 text-xs text-muted shadow-2xs max-w-sm`}
              >
                <div className="flex items-center gap-2 font-semibold text-ink mb-2">
                  <ClockIcon />
                  <span>Clinic Hours & OPD Schedule</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between border-b border-line/60 pb-1.5">
                    <span>Sunday – Friday:</span>
                    <span className="font-semibold text-ink">
                      7:00 AM – 7:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between pt-0.5">
                    <span>Saturday:</span>
                    <span className="font-semibold text-ink">
                      8:00 AM – 2:00 PM
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-2 text-[11px] text-muted">
                <ShieldCheckIcon />
                <span>Government Registered Healthcare Facility • Imadol</span>
              </div>
            </div>

            {/* Column 2: Quick Links (2 cols) */}
            <div className={`${styles.links} lg:col-span-2 space-y-3`}>
              <h3 className="text-xs font-bold tracking-wider text-ink uppercase">
                Quick Links
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    href="/"
                    className="text-muted hover:text-action transition-colors inline-block py-0.5"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/doctors"
                    className="text-muted hover:text-action transition-colors inline-block py-0.5"
                  >
                    Doctors & Specialists
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-muted hover:text-action transition-colors inline-block py-0.5"
                  >
                    About New Life
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team"
                    className="text-muted hover:text-action transition-colors inline-block py-0.5"
                  >
                    Our Medical Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gallery"
                    className="text-muted hover:text-action transition-colors inline-block py-0.5"
                  >
                    Photo Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blogs"
                    className="text-muted hover:text-action transition-colors inline-block py-0.5"
                  >
                    Health Articles & News
                  </Link>
                </li>
                <li>
                  <Link
                    href="/videos"
                    className="text-muted hover:text-action transition-colors inline-block py-0.5"
                  >
                    Video Showcase
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted hover:text-action transition-colors inline-block py-0.5"
                  >
                    Contact & Enquiries
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Treatments & Services (3 cols) */}
            <div className={`${styles.links} lg:col-span-3 space-y-3`}>
              <h3 className="text-xs font-bold tracking-wider text-ink uppercase">
                Clinical Care
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    href="/treatments/general-consultations"
                    className="text-muted hover:text-action transition-colors inline-block py-0.5"
                  >
                    General Consultations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/treatments/child-family-health"
                    className="text-muted hover:text-action transition-colors inline-block py-0.5"
                  >
                    Child & Family Healthcare
                  </Link>
                </li>
                <li>
                  <Link
                    href="/treatments/gynecology"
                    className="text-muted hover:text-action transition-colors inline-block py-0.5"
                  >
                    Gynecology & Women’s Health
                  </Link>
                </li>
                <li>
                  <Link
                    href="/treatments/diabetes-bp-gastric-care"
                    className="text-muted hover:text-action transition-colors inline-block py-0.5"
                  >
                    Diabetes, BP & Gastric Care
                  </Link>
                </li>
                <li>
                  <Link
                    href="/treatments/ent-care"
                    className="text-muted hover:text-action transition-colors inline-block py-0.5"
                  >
                    ENT Care (Ear, Nose, Throat)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/treatments/gastroenterology"
                    className="text-muted hover:text-action transition-colors inline-block py-0.5"
                  >
                    Gastroenterology Consultations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/laboratory"
                    className="text-muted hover:text-action transition-colors inline-block py-0.5"
                  >
                    Diagnostic Pathology & Lab Tests
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/ultrasound"
                    className="text-muted hover:text-action transition-colors inline-block py-0.5"
                  >
                    Ultrasound (USG) Diagnostics
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Location (3 cols) */}
            <div className={`${styles.contact} lg:col-span-3 space-y-3`}>
              <h3 className="text-xs font-bold tracking-wider text-ink uppercase">
                Visit & Contact
              </h3>

              <div className="space-y-3 text-xs text-muted">
                <div className="flex items-start gap-2.5">
                  <MapPinIcon className="mt-0.5 size-4 text-action shrink-0" />
                  <div>
                    <p className="text-ink font-medium leading-snug">
                      {contactConfig.address}
                    </p>
                    <Link
                      href="/our-location"
                      className="inline-flex items-center gap-1 text-[11px] text-action hover:underline mt-1 font-medium"
                    >
                      <span>Find on Map & Directions</span>
                      <OutwardArrow />
                    </Link>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-1">
                  <PhoneIcon className="size-4 text-action shrink-0" />
                  <div>
                    <span className="block text-[10px] text-muted uppercase tracking-wider">
                      Direct Reception
                    </span>
                    <a
                      href={contactConfig.phone.href}
                      className="text-ink font-semibold hover:text-action transition-colors"
                    >
                      {contactConfig.phone.label}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-1">
                  <WhatsAppIcon className="size-4 text-[#25D366] shrink-0" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="block text-[10px] text-muted uppercase tracking-wider">
                        WhatsApp Enquiries
                      </span>
                      <span className="inline-block size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <a
                      href={contactConfig.whatsapp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink font-semibold hover:text-action transition-colors inline-flex items-center gap-1"
                    >
                      <span>{contactConfig.whatsapp.label}</span>
                      <OutwardArrow />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-1">
                  <MailIcon className="size-4 text-action shrink-0" />
                  <a
                    href={`mailto:${contactConfig.email}`}
                    className="text-ink break-all hover:text-action transition-colors"
                  >
                    {contactConfig.email}
                  </a>
                </div>

                {/* Social Channels */}
                <div className="pt-2">
                  <span className="block text-[10px] font-semibold text-muted uppercase tracking-wider mb-2">
                    Connect With Us
                  </span>
                  <div className="flex items-center gap-2">
                    {contactConfig.social.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${social.label} (opens in a new tab)`}
                        className="inline-flex size-8 items-center justify-center rounded-lg border border-line bg-canvas text-ink transition-all hover:border-action hover:text-action hover:bg-panel shadow-2xs"
                      >
                        {social.label === 'Facebook' ? (
                          <FacebookIcon className="size-4 text-[#1877F2]" />
                        ) : (
                          <TikTokIcon className="size-4 text-ink" />
                        )}
                      </a>
                    ))}
                    <a
                      href={contactConfig.whatsapp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="inline-flex size-8 items-center justify-center rounded-lg border border-line bg-canvas text-[#25D366] transition-all hover:border-[#25D366] hover:bg-emerald-50 shadow-2xs"
                    >
                      <WhatsAppIcon className="size-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* 3. Bottom Bar: Legal, Rights & Quick Admin */}
      <div className={`${styles.legal} border-t border-line bg-canvas/80 py-5 text-xs text-muted`}>
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
              <p>
                © {year} {siteConfig.legalName} All rights reserved.
              </p>
              <span className="hidden sm:inline text-line">•</span>
              <span className="text-[11px] text-muted">
                Serving Imadol & Kathmandu Valley
              </span>
            </div>

            <div className="flex items-center gap-3.5 text-xs">
              <Link
                href="/our-location"
                className="hover:text-action transition-colors"
              >
                Location
              </Link>
              <span className="text-line">•</span>
              <Link
                href="/blogs"
                className="hover:text-action transition-colors"
              >
                Health Blogs
              </Link>
              <span className="text-line">•</span>
              <Link
                href="/admin/login"
                className="text-muted/70 hover:text-action transition-colors"
              >
                Staff Portal
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
