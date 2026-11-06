'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { HeaderArrow } from '@/components/layout/header-icons';
import type { GalleryPhoto } from '@/config/gallery';

export function GalleryPhotoRail({ photos }: { photos: GalleryPhoto[] }) {
  const rail = useRef<HTMLUListElement>(null);
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const list = rail.current;
    if (!list) return;
    const update = () => {
      setCanPrevious(list.scrollLeft > 1);
      setCanNext(list.scrollWidth - list.clientWidth - list.scrollLeft > 1);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(list);
    list.addEventListener('scroll', update, { passive: true });
    return () => {
      observer.disconnect();
      list.removeEventListener('scroll', update);
    };
  }, []);

  function move(direction: number) {
    const list = rail.current;
    const first = list?.children[0];
    const second = list?.children[1];
    if (!list || !first || !second) return;
    const step =
      second.getBoundingClientRect().left - first.getBoundingClientRect().left;
    list.scrollBy({
      left: direction * step,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  }

  const controlClass =
    'flex size-11 items-center justify-center rounded-full border border-line bg-panel text-action hover:bg-soft disabled:opacity-40';

  return (
    <div className="grid min-w-0 grid-cols-2 items-center gap-3 lg:grid-cols-[auto_minmax(0,1fr)_auto]">
      <button
        type="button"
        aria-label="Previous photos"
        aria-controls="home-gallery-photos"
        disabled={!canPrevious}
        onClick={() => move(-1)}
        className={`justify-self-end ${controlClass}`}
      >
        <HeaderArrow className="rotate-180" />
      </button>
      <ul
        id="home-gallery-photos"
        ref={rail}
        tabIndex={0}
        aria-label="Clinic photos"
        className="col-span-2 row-start-1 flex min-w-0 snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain [scrollbar-width:none] sm:gap-4 lg:col-span-1 lg:col-start-2 [&::-webkit-scrollbar]:hidden"
      >
        {photos.map(({ id, src, alt }) => (
          <li
            key={id}
            className="relative aspect-[4/3] shrink-0 basis-[85%] snap-start overflow-hidden rounded-lg bg-panel sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-3rem)/4)]"
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 23vw, (min-width: 640px) 48vw, 82vw"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
      <button
        type="button"
        aria-label="Next photos"
        aria-controls="home-gallery-photos"
        disabled={!canNext}
        onClick={() => move(1)}
        className={controlClass}
      >
        <HeaderArrow />
      </button>
    </div>
  );
}
