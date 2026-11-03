import { getPageCopy } from '@/lib/admin-content';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { DoctorCard } from '@/components/doctors/doctor-card';
import { PageIntro } from '@/components/layout/page-intro';
import { Container } from '@/components/ui/container';
import { getDoctors } from '@/lib/content-library';

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet the leadership and explore consultation profiles at New Life Health Care.',
};

export default async function TeamPage() {
  const doctors = await getDoctors();
  const copy = await getPageCopy('team');
  return (
    <Container className="py-10 sm:py-14">
      <PageIntro title={copy.title} description={copy.body} />
      <section
        aria-labelledby="leadership-heading"
        className="grid items-center gap-6 overflow-hidden rounded-md border border-line bg-panel md:grid-cols-2"
      >
        <div className="relative aspect-[3/2]">
          <Image
            src={copy.image ?? '/brand/new-life-director.png'}
            alt="Director of New Life Health Care in the clinic office"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="px-6 pb-6 md:p-8">
          <h2 id="leadership-heading" className="text-2xl font-medium">
            Clinic leadership
          </h2>
          <p className="mt-3 text-muted">Director, New Life Health Care</p>
          <Link
            href="/about"
            className="mt-5 inline-block font-medium text-action underline underline-offset-4"
          >
            Read the director’s message
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
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <li
              key={doctor.id}
              id={doctor.id}
              className="flex min-w-0 scroll-mt-48"
            >
              <DoctorCard doctor={doctor} headingLevel={3} variant="portrait" />
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
