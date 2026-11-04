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
    <Container className="py-10 sm:py-14">
      <PageIntro
        title={copy.title ?? 'Clinic Photo Gallery'}
        description={
          copy.body ??
          'Explore real photos of our clinic facilities, doctor consultation rooms, nursing care team, and patient visits in Imadol, Lalitpur.'
        }
      />
      <GalleryGrid photos={galleryPhotos} />
    </Container>
  );
}
