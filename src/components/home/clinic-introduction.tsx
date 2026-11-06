import { readPageOverride } from '@/lib/admin-content';
import Image from 'next/image';
import Link from 'next/link';
import { clinicFacts } from '@/config/clinic-facts';
import { HeaderArrow } from '@/components/layout/header-icons';
import { Container } from '@/components/ui/container';

export async function ClinicIntroduction() {
  const copy = await readPageOverride('home-introduction');

  return (
    <section
      aria-labelledby="clinic-introduction-heading"
      className="border-y border-line bg-panel py-8 sm:py-12 lg:py-16"
    >
      <Container className="grid items-center gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
        <div className="min-w-0">
          <p className="mb-2.5 text-xs font-semibold tracking-wide text-action uppercase">
            Our clinic in Imadol
          </p>
          <h2
            id="clinic-introduction-heading"
            className="max-w-xl text-[clamp(1.75rem,4.5vw,2.75rem)] leading-tight font-semibold tracking-tight text-ink"
          >
            {copy?.title ?? 'Care that starts with listening'}
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed whitespace-pre-wrap text-muted">
            {copy?.body ??
              'Visit New Life Health Care in Imadol, Lalitpur, for consultations, diagnostics and pharmacy support.'}
          </p>
          <Link
            href="/#plan-your-visit"
            className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-action underline-offset-4 hover:underline"
          >
            Plan your visit
            <HeaderArrow />
          </Link>
        </div>

        <div className="min-w-0 overflow-hidden rounded-md border border-line bg-canvas">
          <div className="relative aspect-[16/9] bg-soft">
            <Image
              src={copy?.image ?? '/brand/hero-poster.jpg'}
              alt={
                copy?.image
                  ? (copy.imageAlt ?? '')
                  : 'Reception at New Life Health Care'
              }
              fill
              sizes="(min-width: 1024px) 50vw, 92vw"
              className="object-cover object-center"
            />
          </div>
          <dl
            aria-label="New Life at a glance"
            className="grid grid-cols-3 divide-x divide-line border-t border-line py-3 sm:py-4"
          >
            {clinicFacts.map((fact) => (
              <div
                key={fact.label}
                className="flex min-w-0 flex-col items-center gap-1 px-1 text-center sm:px-3"
              >
                <dt className="text-xs leading-snug text-muted">
                  {fact.label}
                </dt>
                <dd className="order-first text-2xl leading-none font-semibold text-action sm:text-3xl">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
