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
      className="pt-9 sm:pt-12"
    >
      <Container className="grid items-center gap-5 md:grid-cols-2 md:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(12rem,0.58fr)]">
        <div className="min-w-0 lg:pb-10">
          <p className="mb-3 text-xs font-semibold tracking-widest text-action uppercase">
            Our clinic in Imadol
          </p>
          <h2
            id="clinic-introduction-heading"
            className="max-w-[18ch] text-[clamp(1.875rem,4vw,3rem)] leading-[1.12] font-semibold tracking-tight text-balance text-ink"
          >
            {copy?.title ?? 'Care that starts with listening'}
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed whitespace-pre-wrap text-muted">
            {copy?.body ??
              'Visit New Life Health Care in Imadol, Lalitpur, for consultations, diagnostics and pharmacy support.'}
          </p>
          <Link
            href="/#plan-your-visit"
            className="mt-5 inline-flex min-h-11 items-center gap-3 rounded-md bg-action px-4 text-sm font-semibold text-on-action hover:bg-action-hover"
          >
            Plan your visit
            <HeaderArrow />
          </Link>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-panel lg:mb-10 lg:aspect-[4/3]">
          <Image
            src={copy?.image ?? '/brand/hero-poster.jpg'}
            alt={
              copy?.image
                ? (copy.imageAlt ?? '')
                : 'Reception at New Life Health Care'
            }
            fill
            sizes="(min-width: 1024px) 38vw, (min-width: 768px) 46vw, 92vw"
            className="object-cover"
          />
        </div>
        <dl
          aria-label="New Life at a glance"
          className="grid grid-cols-3 divide-x divide-white/25 rounded-t-lg bg-(--clinic-feature-teal) px-2 py-4 text-white md:col-span-2 lg:col-span-1 lg:grid-cols-1 lg:content-center lg:divide-x-0 lg:divide-y lg:self-stretch lg:px-6"
        >
          {clinicFacts.map((fact) => (
            <div
              key={fact.label}
              className="relative flex min-w-0 flex-col gap-1 px-2 text-center lg:px-2 lg:py-4 lg:text-left"
            >
              <span
                aria-hidden="true"
                className="absolute top-1/2 -left-9 hidden size-6 -translate-y-1/2 rounded-full bg-linear-to-r from-[#184975] to-[#35a9a1] lg:block"
              />
              <dt className="text-xs leading-snug font-medium">{fact.label}</dt>
              <dd className="order-first text-2xl leading-none font-semibold tabular-nums sm:text-3xl lg:text-4xl">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
