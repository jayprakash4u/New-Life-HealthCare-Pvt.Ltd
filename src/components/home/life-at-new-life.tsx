import { getHomepageVisibility } from '@/lib/homepage-visibility';
import Link from 'next/link';
import { getClinicVideos } from '@/lib/content-library';
import { Container } from '@/components/ui/container';
import { ContentRail } from './content-rail';

export async function LifeAtNewLife() {
  const videos = await getClinicVideos();
  const visibility = await getHomepageVisibility(
    'video',
    videos.map(({ id }) => id),
  );
  const clinicVideos = videos.filter(({ id }) => visibility.get(id) !== false);
  if (!clinicVideos.length) return null;
  return (
    <section
      id="life-at-new-life"
      aria-labelledby="life-at-new-life-heading"
      className="relative isolate scroll-mt-28 overflow-hidden bg-ink py-10 text-white sm:py-14 lg:scroll-mt-48 lg:py-16"
    >
      <svg
        className="pointer-events-none absolute -right-10 -bottom-10 -z-10 w-[32rem] opacity-[0.06]"
        viewBox="0 0 400 260"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="270" cy="130" r="115" />
        <circle cx="270" cy="130" r="90" />
        <path d="M0 140h120l25-40 30 80 35-120 35 80h155" />
      </svg>
      <Container>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-x-4 gap-y-1 sm:mb-7">
          <div>
            <h2
              id="life-at-new-life-heading"
              className="text-[clamp(1.75rem,2.6vw,2.25rem)] leading-tight font-medium tracking-tight"
            >
              Life at New Life
            </h2>
          </div>
          <Link
            href="/videos"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white underline underline-offset-4 hover:text-white focus-visible:outline-white"
          >
            View all videos
            <svg
              width="14"
              height="14"
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
        <ContentRail
          id="life-videos"
          title="Clinic videos"
          viewAllHref="/videos"
          items={clinicVideos}
          video
          hideHeader
          tone="teal"
        />
      </Container>
    </section>
  );
}
