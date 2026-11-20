import { getPageCopy } from '@/lib/admin-content';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { DoctorCard } from '@/components/doctors/doctor-card';
import { PageIntro } from '@/components/layout/page-intro';
import { Container } from '@/components/ui/container';
import { getDoctors } from '@/lib/content-library';
import { HeaderArrow } from '@/components/layout/header-icons';

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet the leadership and explore consultation profiles at New Life Health Care.',
};

export default async function TeamPage() {
  const doctors = await getDoctors();
  const copy = await getPageCopy('team');
  return (
    <Container className="py-7 sm:py-10">
      <div className="mb-7 border-b border-line pb-6 sm:mb-9 sm:pb-8 [&>header]:mb-0">
        <PageIntro title={copy.title} description="" />
      </div>
      <section
        aria-labelledby="leadership-heading"
        className="grid overflow-hidden rounded-md border border-line bg-panel md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
      >
        <figure className="min-w-0 bg-canvas p-3 sm:p-4">
          <div className="relative aspect-[3/2] overflow-hidden rounded-sm md:aspect-[4/3]">
            <Image
              src={copy.image ?? '/brand/new-life-director.png'}
              alt="Director of New Life Health Care in the clinic office"
              fill
              sizes="(min-width: 768px) 40vw, 92vw"
              className="object-cover object-[58%_55%]"
            />
          </div>
          <figcaption className="px-1 pt-3 pb-1 text-xs leading-relaxed text-muted">
            Director’s office · New Life Health Care
          </figcaption>
        </figure>
        <div className="flex flex-col items-start justify-center border-t border-line p-5 sm:p-8 md:border-t-0 md:border-l lg:p-10">
          <p className="mb-3 text-xs font-semibold tracking-wide text-action uppercase">
            The people behind New Life
          </p>
          <h2
            id="leadership-heading"
            className="text-[clamp(1.75rem,2.6vw,2.25rem)] leading-tight font-medium tracking-tight text-ink"
          >
            Clinic leadership
          </h2>
          <div aria-hidden="true" className="mt-4 h-0.5 w-12 bg-action" />
          <p className="mt-4 text-sm font-medium text-ink">
            Director, New Life Health Care
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted sm:text-[15px]">
            Get to know the leadership of our Imadol clinic. Read the director’s
            message to learn more about New Life and our approach to everyday
            healthcare.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-3 rounded-md bg-action px-4 py-2.5 text-sm font-semibold text-on-action hover:bg-action-hover"
          >
            Read the director’s message
            <HeaderArrow className="shrink-0" />
          </Link>
        </div>
      </section>
      <section aria-labelledby="team-profiles-heading" className="mt-12">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="team-profiles-heading" className="text-2xl font-medium">
            Consultation profiles
          </h2>
          <Link
            href="/doctors"
            className="text-sm font-medium text-action underline underline-offset-4"
          >
            Browse doctor directory
          </Link>
        </div>
        <p className="mb-6 text-sm text-muted">
          Contact the clinic to confirm doctor availability.
        </p>
        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {doctors.map((doctor) => (
            <li
              key={doctor.id}
              id={doctor.id}
              className="flex min-w-0 scroll-mt-48"
            >
              <DoctorCard doctor={doctor} headingLevel={3} variant="featured" />
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
