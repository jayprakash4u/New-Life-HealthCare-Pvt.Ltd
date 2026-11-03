import { getPageCopy } from '@/lib/admin-content';
import type { Metadata } from 'next';
import { PageIntro } from '@/components/layout/page-intro';
import { Container } from '@/components/ui/container';
import { getClinicVideos } from '@/lib/content-library';

export const metadata: Metadata = {
  title: 'Videos',
  description: 'Watch videos from New Life Health Care.',
};

export default async function VideosPage() {
  const clinicVideos = await getClinicVideos();
  const copy = await getPageCopy('videos');
  return (
    <Container className="py-10 sm:py-14">
      <PageIntro title={copy.title} description={copy.body} />
      <ul className="grid gap-6">
        {clinicVideos.map((video) => (
          <li key={video.id} id={video.id} className="scroll-mt-48">
            <article className="grid items-center gap-6 rounded-md border border-line bg-panel p-5 sm:p-7 lg:grid-cols-[1.6fr_1fr]">
              <video
                controls
                playsInline
                preload="metadata"
                poster={video.image}
                src={video.src}
                aria-label={video.title}
                className="aspect-video w-full rounded-sm bg-ink"
              />
              <div>
                <p className="mb-2 text-xs font-semibold text-action">
                  {video.category}
                </p>
                <h2 className="text-2xl font-medium">{video.title}</h2>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Container>
  );
}
