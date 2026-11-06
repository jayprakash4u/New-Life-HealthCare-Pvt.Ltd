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
      className="bg-canvas py-10 sm:py-14 lg:py-16"
    >
      <Container className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-x-12">
        <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-soft lg:aspect-[4/3]">
          <Image
            src={copy?.image ?? '/brand/hero-poster.jpg'}
            alt={
              copy?.image
                ? (copy.imageAlt ?? '')
                : 'Reception at New Life Health Care'
            }
            fill
            sizes="(min-width: 1024px) 48vw, 92vw"
            className="object-cover object-center"
          />
        </div>
        <div className="max-w-2xl">
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
                New Life Health Care brings consultations, diagnostics and
                pharmacy support together in Imadol, Lalitpur.
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
        <aside
          aria-label="New Life at a glance"
          className="rounded-md border border-line bg-panel p-4 sm:p-6 lg:col-span-2"
        >
          <h3 className="mb-4 text-sm font-semibold text-ink">
            New Life at a glance
          </h3>
          <dl className="grid grid-cols-3 divide-x divide-line">
            {clinicFacts.map((fact) => (
              <div
                key={fact.label}
                className="flex min-w-0 flex-col items-center px-1 text-center sm:px-3"
              >
                <dt className="mt-2 text-xs leading-snug text-muted">
                  {fact.label}
                </dt>
                <dd className="order-first text-2xl leading-none font-semibold text-action sm:text-4xl">
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
