import Link from 'next/link';
import { getDoctors } from '@/lib/content-library';
import { getHomepageVisibility } from '@/lib/homepage-visibility';
import { DoctorCard } from '@/components/doctors/doctor-card';
import { Container } from '@/components/ui/container';
import { HeaderArrow } from '@/components/layout/header-icons';

export async function OurDoctors({ homepage = false }: { homepage?: boolean }) {
  const doctors = await getDoctors();
  const visibility = homepage
    ? await getHomepageVisibility(
        'doctor',
        doctors.map(({ id }) => id),
      )
    : undefined;

  // Show at most 4 doctor cards on the homepage (or about page preview)
  const featuredDoctors = homepage
    ? doctors.filter(({ id }) => visibility?.get(id) !== false).slice(0, 4)
    : doctors.slice(0, 4);

  if (!featuredDoctors.length) return null;
  const headingId = homepage ? 'home-doctors-heading' : 'about-doctors-heading';

  return (
    <section
      aria-labelledby={headingId}
      className="border-t border-line bg-panel py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <div className="mb-7 flex flex-wrap items-center justify-between gap-5 sm:mb-8">
          <h2
            id={headingId}
            className="scroll-mt-40 text-[clamp(1.75rem,2.6vw,2.25rem)] leading-tight font-medium tracking-tight text-ink lg:scroll-mt-48"
          >
            Our Doctors
          </h2>
          <Link
            href="/doctors"
            className="inline-flex min-h-11 shrink-0 items-center gap-3 text-sm font-medium text-action underline underline-offset-4"
          >
            View all doctors
            <HeaderArrow />
          </Link>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredDoctors.map((doctor) => (
            <li
              key={doctor.id}
              id={doctor.id}
              className="flex min-w-0 scroll-mt-48"
            >
              <DoctorCard doctor={doctor} headingLevel={3} variant="portrait" />
            </li>
          ))}
        </ul>

        {doctors.length > 4 && (
          <div className="mt-10 flex justify-center">
            <Link
              href="/doctors"
              className="inline-flex items-center gap-2 rounded-md border border-line bg-canvas px-6 py-2.5 text-sm font-medium text-action shadow-2xs transition-colors hover:border-action hover:bg-soft"
            >
              <span>View all doctors</span>
              <HeaderArrow />
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
