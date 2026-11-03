import Link from 'next/link';
import { getClinicVideos } from '@/lib/content-library';
import { Container } from '@/components/ui/container';
import { HeaderArrow } from '@/components/layout/header-icons';

export async function ClinicVideoFeature() {
  const clinicVideos = await getClinicVideos();
  const video = clinicVideos[0];
  if (!video) return null;

  return (
    <section
      id="clinic-videos"
      aria-labelledby="clinic-videos-heading"
      className="scroll-mt-40 border-t border-line bg-canvas py-9 sm:py-12 lg:scroll-mt-48"
    >
      <Container>
        <div className="mb-6 flex items-end justify-between gap-5 border-b border-line">
          <h2
            id="clinic-videos-heading"
            className="-mb-px border-b-2 border-action pb-3 text-[1.5rem] leading-tight font-medium tracking-tight sm:text-[1.75rem]"
          >
            Care at New Life
          </h2>
          <Link
            href="/videos"
            className="mb-1 inline-flex min-h-11 shrink-0 items-center gap-2 text-xs font-medium text-action underline underline-offset-4"
          >
            View all videos
            <HeaderArrow />
          </Link>
        </div>
        <div className="grid items-center gap-6 lg:grid-cols-[1.45fr_1fr]">
          <video
            controls
            playsInline
            preload="none"
            poster={video.image}
            src={video.src}
            aria-label={video.title}
            className="aspect-video w-full rounded-md bg-ink"
          />
          <div>
            <h3 className="text-xl font-semibold tracking-tight">
              {video.title}
            </h3>
            <p className="mt-2 text-sm text-muted">{video.category}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
