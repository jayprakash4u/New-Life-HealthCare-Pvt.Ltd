'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import type { GalleryPhoto } from '@/config/gallery';
import { DataTablePagination } from '@/components/ui/data-table-pagination';

interface GalleryGridProps {
  photos: GalleryPhoto[];
}

export function GalleryGrid({ photos }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const categories = useMemo(() => {
    const set = new Set<string>();
    photos.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'All') return photos;
    return photos.filter((p) => p.category === selectedCategory);
  }, [photos, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredPhotos.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const paginatedPhotos = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPhotos.slice(start, start + pageSize);
  }, [filteredPhotos, currentPage, pageSize]);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-ink">
            Explore our clinic
          </h2>
          <p
            aria-live="polite"
            aria-atomic="true"
            className="mt-1 text-sm text-muted"
          >
            {filteredPhotos.length} photos · Select a photo to view it in full.
          </p>
        </div>
        <label className="grid min-w-0 gap-1.5 text-xs font-semibold text-ink sm:w-64">
          Browse by category
          <select
            value={selectedCategory}
            onChange={(event) => {
              setSelectedCategory(event.target.value);
              setPage(1);
            }}
            className="min-h-11 w-full rounded-md border border-line bg-canvas px-3 text-sm font-normal text-ink"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'All' ? 'All photos' : category}
              </option>
            ))}
          </select>
        </label>
      </div>

      {!filteredPhotos.length && (
        <p className="rounded-md border border-line bg-panel p-6 text-sm text-muted">
          No photos are available yet.
        </p>
      )}
      <ul className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-3">
        {paginatedPhotos.map((photo) => (
          <li
            key={photo.id}
            id={photo.id}
            className="group min-w-0 scroll-mt-48"
          >
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="block w-full cursor-pointer rounded-md text-left"
                  aria-label={`Enlarge ${photo.title}`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-panel">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <span
                      aria-hidden="true"
                      className="absolute right-2 bottom-2 flex size-8 items-center justify-center rounded-md bg-ink/80 text-white"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />
                      </svg>
                    </span>
                  </div>
                  <div className="pt-3">
                    <span className="block text-[11px] leading-relaxed font-medium text-action sm:text-xs">
                      {photo.category}
                    </span>
                    <h3 className="mt-1 text-sm leading-snug font-medium text-ink transition-colors group-hover:text-action sm:text-base">
                      {photo.title}
                    </h3>
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent
                title={photo.title}
                description={photo.category}
                className="w-[min(calc(100%-2rem),56rem)]"
              >
                <div className="space-y-3">
                  <div className="relative overflow-hidden rounded-lg bg-black/5">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      sizes="90vw"
                      className="mx-auto max-h-[70dvh] w-auto object-contain rounded-md"
                    />
                  </div>
                  <div className="px-1">
                    <p className="text-sm text-muted">{photo.alt}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </li>
        ))}
      </ul>

      {/* Pagination Bar (Right-Aligned) */}
      <DataTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredPhotos.length}
        pageSize={pageSize}
        onPageChange={setPage}
        className="border-t border-line pt-5"
      />
    </div>
  );
}
