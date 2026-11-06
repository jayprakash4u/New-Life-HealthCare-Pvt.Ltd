import { getHomepageVisibility } from '@/lib/homepage-visibility';
import Link from 'next/link';
import { getClinicVideos } from '@/lib/content-library';
import { HeaderArrow } from '@/components/layout/header-icons';
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
      className="scroll-mt-28 bg-(--clinic-feature-teal) py-8 text-white sm:py-12 lg:scroll-mt-48 lg:py-14"
    >
      <Container>
        <div className="mb-4 text-center sm:mb-6">
          <p className="mb-2 text-xs font-semibold tracking-widest text-white/90 uppercase">
            Inside the clinic
          </p>
          <h2
            id="life-at-new-life-heading"
            className="text-[clamp(1.625rem,3vw,2.25rem)] leading-tight font-semibold tracking-tight"
          >
            Life at New Life
          </h2>
          <Link
            href="/videos"
            className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-md border border-white/60 px-4 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-white"
          >
            View all videos
            <HeaderArrow />
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
