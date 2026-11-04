'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import type { GalleryPhoto } from '@/config/gallery';

interface GalleryGridProps {
  photos: GalleryPhoto[];
}

export function GalleryGrid({ photos }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

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

  return (
    <div className="space-y-8">
      {/* Category filter tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/60 pb-4">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          const count =
            category === 'All'
              ? photos.length
              : photos.filter((p) => p.category === category).length;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-action text-white shadow-sm'
                  : 'bg-panel/70 text-muted hover:bg-panel hover:text-ink'
              }`}
            >
              <span>{category}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-semibold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-canvas text-muted'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Gallery Cards Grid */}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPhotos.map((photo) => (
          <li
            key={photo.id}
            id={photo.id}
            className="group scroll-mt-48 overflow-hidden rounded-xl border border-border/40 bg-surface shadow-xs transition-all hover:border-action/30 hover:shadow-md"
          >
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="w-full text-left cursor-pointer"
                  aria-label={`Enlarge ${photo.title}`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-panel">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-102"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-xs opacity-0 transition-opacity group-hover:opacity-100">
                      View full photo
                    </span>
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-block rounded-md bg-action/10 px-2.5 py-0.5 text-[11px] font-semibold text-action uppercase tracking-wide">
                        {photo.category}
                      </span>
                    </div>
                    <h3 className="mt-2 text-base font-semibold text-ink line-clamp-1 group-hover:text-action transition-colors">
                      {photo.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted line-clamp-2 leading-relaxed">
                      {photo.alt}
                    </p>
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
    </div>
  );
}

