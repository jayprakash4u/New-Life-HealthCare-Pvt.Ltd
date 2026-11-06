import Image from 'next/image';
import Link from 'next/link';
import { HeaderArrow } from '@/components/layout/header-icons';
import { Container } from '@/components/ui/container';
import { servicePages } from '@/config/service-pages';
import { treatmentPages } from '@/config/treatment-pages';

const featuredCare = [
  ...treatmentPages
    .filter(({ id }) => id !== 'gastroenterology')
    .map((page) => ({ ...page, href: `/treatments/${page.id}` })),
  ...servicePages
    .filter(({ id }) => ['laboratory', 'ultrasound', 'pharmacy'].includes(id))
    .map((page) => ({ ...page, href: `/services/${page.id}` })),
];

export function SpecialtiesGrid() {
  return (
    <section
      aria-labelledby="home-specialties-heading"
      className="border-y border-line bg-panel py-10 sm:py-14 lg:py-16"
    >
      <Container>
        <div className="mx-auto mb-6 max-w-xl text-center sm:mb-9">
          <p className="mb-2 text-xs font-semibold tracking-widest text-action uppercase">
            Care in Imadol
          </p>
          <h2
            id="home-specialties-heading"
            className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight font-semibold tracking-tight text-balance text-ink"
          >
            Specialties &amp; services
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Explore consultations, diagnostics, and pharmacy services at New
            Life Health Care.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {featuredCare.map(({ href, title, image }) => (
            <li key={href} className="min-w-0">
              <Link
                href={href}
                className="group relative isolate flex min-h-40 h-full items-end overflow-hidden rounded-lg bg-soft p-2 sm:aspect-[5/4] sm:p-3"
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="-z-20 object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-black/40 to-transparent" />
                <span className="flex min-h-11 w-full items-center justify-between gap-1.5 rounded-md bg-canvas px-2.5 py-2 text-xs leading-snug font-semibold text-ink group-hover:text-action sm:gap-3 sm:px-3 sm:text-sm">
                  {title}
                  <HeaderArrow className="hidden shrink-0 text-action sm:block" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
