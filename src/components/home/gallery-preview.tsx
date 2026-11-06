import Link from 'next/link';
import { HeaderArrow } from '@/components/layout/header-icons';
import { Container } from '@/components/ui/container';
import { getGalleryPhotos } from '@/lib/content-library';
import { GalleryPhotoRail } from './gallery-photo-rail';

export async function GalleryPreview() {
  const photos = (await getGalleryPhotos()).slice(0, 8);
  if (!photos.length) return null;

  return (
    <section
      aria-labelledby="home-gallery-heading"
      className="bg-canvas py-10 sm:py-14 lg:py-16"
    >
      <Container>
        <div className="mb-6 text-center sm:mb-8">
          <p className="mb-2 text-xs font-semibold tracking-widest text-action uppercase">
            Our gallery
          </p>
          <h2
            id="home-gallery-heading"
            className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight font-semibold tracking-tight text-ink"
          >
            A look <span className="text-action">inside New Life</span>
          </h2>
        </div>
        <GalleryPhotoRail photos={photos} />
        <div className="mt-6 text-center sm:mt-8">
          <Link
            href="/gallery"
            className="inline-flex min-h-11 items-center justify-center gap-3 rounded-md bg-action px-5 text-sm font-semibold text-on-action hover:bg-action-hover"
          >
            View full gallery
            <HeaderArrow />
          </Link>
        </div>
      </Container>
    </section>
  );
}
