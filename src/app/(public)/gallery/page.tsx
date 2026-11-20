import { getGalleryPhotos } from '@/lib/content-library';
import { getPageCopy } from '@/lib/admin-content';
import type { Metadata } from 'next';
import { PageIntro } from '@/components/layout/page-intro';
import { Container } from '@/components/ui/container';
import { GalleryGrid } from '@/components/gallery/gallery-grid';

export const metadata: Metadata = {
  title: 'Clinic Gallery',
  description:
    'Real photos, clinical facilities, doctor consultations, and patient care moments from New Life Health Care in Imadol, Lalitpur.',
};

export default async function GalleryPage() {
  const galleryPhotos = await getGalleryPhotos();
  const copy = await getPageCopy('gallery');

  return (
    <>
      <div className="border-b border-line bg-panel">
        <Container className="py-7 sm:py-10 [&>header]:mb-0">
          <PageIntro
            title={copy.title ?? 'Clinic Photo Gallery'}
            description={
              copy.body ??
              'Explore real photos of our clinic facilities, doctor consultation rooms, nursing care team, and patient visits in Imadol, Lalitpur.'
            }
          />
        </Container>
      </div>
      <Container className="py-7 sm:py-10 lg:py-12">
        <GalleryGrid photos={galleryPhotos} />
      </Container>
    </>
  );
}
