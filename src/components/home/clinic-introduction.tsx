import { readPageOverride } from '@/lib/admin-content';
import Image from 'next/image';
import Link from 'next/link';
import { clinicFacts } from '@/config/clinic-facts';
import { Container } from '@/components/ui/container';
import { buttonStyles } from '@/components/ui/button-styles';

export async function ClinicIntroduction() {
  const copy = await readPageOverride('home-introduction');
  return (
    <section
      aria-labelledby="clinic-introduction-heading"
      className="overflow-hidden bg-canvas pt-12 sm:pt-16 lg:pt-20"
    >
      <Container className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="relative isolate overflow-hidden px-0 py-6 sm:py-10 lg:py-12 lg:pr-20">
          <Image
            src={copy?.image ?? '/brand/hero-poster.jpg'}
            alt=""
            fill
            sizes="(min-width: 1024px) 850px, 100vw"
            className="-z-20 object-cover object-right"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-linear-to-r from-canvas/95 via-canvas/85 to-canvas/60 sm:to-canvas/25"
          />
          <div className="max-w-2xl px-5 sm:px-8 lg:px-10">
            <p className="mb-4 text-xs font-semibold tracking-[0.12em] text-action uppercase">
              Get to know New Life
            </p>
            <h2
              id="clinic-introduction-heading"
              className="text-[clamp(1.75rem,2.6vw,2.25rem)] leading-tight font-medium tracking-tight"
            >
              {copy?.title ?? (
                <>
                  Care that starts
                  <br />
                  <span className="text-action">with listening.</span>
                </>
              )}
            </h2>
            {copy ? (
              <p className="mt-5 max-w-xl whitespace-pre-wrap text-[15px] leading-7 text-muted">
                {copy.body}
              </p>
            ) : (
              <>
                <p className="mt-5 max-w-xl text-[15px] leading-7 text-muted">
                  New Life Health Care is a polyclinic in Imadol, Lalitpur. We
                  bring consultations and everyday health services together in
                  one place, so it’s easier to take the next step in your care.
                </p>
                <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
                  From family health and gynecology consultations to laboratory
                  tests, ultrasound and pharmacy support, our team can help you
                  explore the care available and plan your visit.
                </p>
              </>
            )}
            <Link
              href="/#plan-your-visit"
              className={buttonStyles('primary', 'md', 'mt-7 gap-6')}
            >
              Plan your visit
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M4 12h16m-6-6 6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
        <aside
          aria-label="New Life at a glance"
          className="flex flex-col justify-center rounded-md bg-action px-6 py-8 text-white sm:px-8 lg:rounded-none lg:py-10"
        >
          <h3 className="mb-6 text-lg font-semibold">New Life at a glance</h3>
          <dl className="grid gap-5 min-[480px]:grid-cols-3 lg:grid-cols-1">
            {clinicFacts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col border-t border-white/30 pt-5"
              >
                <dt className="mt-2 text-xs font-medium tracking-wide text-white/85">
                  {fact.label}
                </dt>
                <dd className="order-first text-4xl leading-none font-semibold">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </Container>
    </section>
  );
}
