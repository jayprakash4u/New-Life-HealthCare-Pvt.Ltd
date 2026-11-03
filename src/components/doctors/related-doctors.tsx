import Link from 'next/link';
import { getDoctors } from '@/lib/content-library';
import { Container } from '@/components/ui/container';
import { HeaderArrow } from '@/components/layout/header-icons';
import { CareIcon } from '@/components/ui/care-icon';
import { cn } from '@/lib/cn';
import { DoctorCard } from './doctor-card';

export async function RelatedDoctors({ careId }: { careId: string }) {
  const doctors = await getDoctors();
  const relatedDoctors = doctors.filter((doctor) => doctor.careId === careId);
  if (!relatedDoctors.length) return null;
  return (
    <section
      aria-labelledby="related-doctors-heading"
      className="border-t border-line bg-panel py-9 sm:py-12"
    >
      <Container
        className={cn(
          'grid min-w-0 gap-5 lg:gap-7',
          relatedDoctors.length === 1
            ? 'lg:grid-cols-[18rem_minmax(0,24rem)] lg:justify-center'
            : 'lg:grid-cols-[18rem_minmax(0,1fr)]',
        )}
      >
        <div className="flex flex-col rounded-md bg-action p-6 text-white sm:p-8 lg:p-7">
          <p className="mb-6 text-[10px] font-semibold tracking-[0.12em] text-white/75 uppercase">
            People behind your care
          </p>
          <h2
            id="related-doctors-heading"
            className="scroll-mt-40 text-[1.875rem] leading-[1.15] font-medium tracking-tight lg:scroll-mt-48"
          >
            Our medical
            <br />
            team.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/85">
            Explore the profiles for this consultation. Our team can help you
            confirm who is available for your visit.
          </p>
          <div className="mt-6 flex items-center gap-3 border-t border-white/25 pt-5 text-xs text-white/85">
            <CareIcon name="consultation" size={28} className="shrink-0" />
            <span>{relatedDoctors[0].specialty}</span>
          </div>
          <Link
            href="/doctors"
            className="mt-7 inline-flex min-h-12 items-center justify-between gap-3 rounded-md bg-white px-4 py-3 text-sm font-semibold text-action hover:bg-soft hover:text-action focus-visible:outline-white lg:mt-auto"
          >
            View all doctors
            <HeaderArrow />
          </Link>
        </div>
        <ul
          className={cn(
            'grid min-w-0 gap-5',
            relatedDoctors.length > 1 && 'sm:grid-cols-2',
          )}
        >
          {relatedDoctors.map((doctor) => (
            <li
              key={doctor.id}
              id={doctor.id}
              className="flex min-w-0 scroll-mt-48"
            >
              <DoctorCard doctor={doctor} headingLevel={3} variant="portrait" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
