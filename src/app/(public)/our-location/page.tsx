import { getPageCopy } from '@/lib/admin-content';
import type { Metadata } from 'next';
import { PageIntro } from '@/components/layout/page-intro';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button-link';
import { HeaderArrow, HeaderPin } from '@/components/layout/header-icons';
import { contactConfig } from '@/config/contact';

export const metadata: Metadata = {
  title: 'Our location',
  description:
    'Find New Life Health Care in Imadol, Lalitpur. Watch the location video and get directions.',
};

const mapQuery = encodeURIComponent(
  'New Life Health Care Imadol Lalitpur Nepal',
);
const mapHref = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
const mapEmbedHref = `https://maps.google.com/maps?q=${mapQuery}&output=embed`;

export default async function OurLocationPage() {
  const copy = await getPageCopy('location');
  return (
    <section
      id="our-location"
      aria-labelledby="visit-heading"
      className="bg-canvas py-10 sm:py-14"
    >
      <Container>
        <PageIntro title={copy.title} description={copy.body} />
        <div className="grid overflow-hidden rounded-md lg:grid-cols-[1.15fr_1fr]">
          <div className="flex items-center bg-ink">
            <video
              aria-label="New Life Health Care location video"
              className="aspect-video w-full"
              controls
              playsInline
              preload="none"
              poster="/brand/hero-poster.jpg"
              src="/vidoe%20location.mp4"
            >
              <a href="/vidoe%20location.mp4">Open the location video</a>
            </video>
          </div>
          <div className="flex flex-col justify-center bg-soft p-6 sm:p-9 lg:p-12">
            <div className="mb-5 flex items-center gap-3 text-action">
              <HeaderPin />
              <p className="text-[11px] font-semibold tracking-[0.12em] uppercase">
                Visit New Life
              </p>
            </div>
            <h2
              id="visit-heading"
              className="text-2xl font-medium tracking-tight sm:text-3xl"
            >
              Care in your neighbourhood.
            </h2>
            <address className="mt-4 text-base leading-relaxed text-muted not-italic">
              {contactConfig.address}
            </address>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Call our team to confirm consultation times and get help finding
              the clinic.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink
                href={mapHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Search on Google Maps (opens in a new tab)"
                className="gap-4"
              >
                Find us on Google Maps
                <HeaderArrow />
              </ButtonLink>
              <ButtonLink href="/#plan-your-visit" variant="outline">
                Plan your visit
              </ButtonLink>
            </div>
          </div>
          <iframe
            title="Map showing New Life Health Care in Imadol, Lalitpur"
            src={mapEmbedHref}
            loading="lazy"
            className="mt-6 h-72 w-full rounded-md border border-line bg-panel sm:h-96 lg:col-span-2"
          />
        </div>
      </Container>
    </section>
  );
}
