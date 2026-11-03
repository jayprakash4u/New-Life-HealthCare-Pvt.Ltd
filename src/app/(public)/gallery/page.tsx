import { getGalleryPhotos } from '@/lib/content-library';
import { getPageCopy } from '@/lib/admin-content';
import type { Metadata } from 'next';
import Image from 'next/image';
import { PageIntro } from '@/components/layout/page-intro';
import { Container } from '@/components/ui/container';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Photos and highlights from New Life Health Care in Imadol, Lalitpur.',
};

export default async function GalleryPage() {
  const galleryPhotos = await getGalleryPhotos();
  const copy = await getPageCopy('gallery');
  return (
    <Container className="py-10 sm:py-14">
      <PageIntro title={copy.title} description={copy.body} />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleryPhotos.map((photo) => (
          <li key={photo.id} id={photo.id} className="scroll-mt-48">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="group w-full rounded-md text-left"
                  aria-label={`Enlarge ${photo.title}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-panel">
                    <Image
                      src={photo.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-opacity group-hover:opacity-90"
                    />
                  </div>
                  <span className="mt-4 block text-xs font-semibold text-action">
                    {photo.category}
                  </span>
                  <span className="mt-1 block text-lg font-semibold text-ink">
                    {photo.title}
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent
                title={photo.title}
                description={photo.category}
                className="w-[min(calc(100%-2rem),56rem)]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="90vw"
                  className="mx-auto max-h-[65dvh] w-auto object-contain"
                />
              </DialogContent>
            </Dialog>
          </li>
        ))}
      </ul>
    </Container>
  );
}
