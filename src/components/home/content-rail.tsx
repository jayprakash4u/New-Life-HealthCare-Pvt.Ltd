'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { JournalItem } from '@/config/journal';
import { cn } from '@/lib/cn';

function Chevron({ direction }: { direction: 'previous' | 'next' }) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d={direction === 'previous' ? 'm15 5-7 7 7 7' : 'm9 5 7 7-7 7'} />
    </svg>
  );
}

export function ContentRail({
  id,
  title,
  viewAllHref,
  items,
  video = false,
  hideHeader = false,
  tone = 'light',
}: {
  id: string;
  title: string;
  viewAllHref: string;
  items: readonly JournalItem[];
  video?: boolean;
  hideHeader?: boolean;
  tone?: 'light' | 'teal';
}) {
  const railRef = useRef<HTMLUListElement>(null);
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(false);

  function updateScrollState() {
    const rail = railRef.current;
    if (!rail) return;
    setCanPrevious(rail.scrollLeft > 2);
    setCanNext(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 2);
  }

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(rail);
    return () => observer.disconnect();
  }, []);

  function move(direction: number) {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.firstElementChild;
    const step = (card?.getBoundingClientRect().width ?? rail.clientWidth) + 20;
    rail.scrollBy({
      left: direction * step,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  }

  return (
    <section
      aria-labelledby={hideHeader ? undefined : `${id}-heading`}
      aria-label={hideHeader ? title : undefined}
      className="min-w-0"
    >
      {!hideHeader && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 sm:mb-7">
          <h2
            id={`${id}-heading`}
            className="text-[clamp(1.75rem,2.6vw,2.25rem)] leading-tight font-medium tracking-tight"
          >
            {title}
          </h2>
          <Link
            href={viewAllHref}
            aria-label={video ? 'View all videos' : 'View all blogs'}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-medium text-action underline underline-offset-4"
          >
            View all
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M4 12h16m-6-6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      )}
      <ul
        id={id}
        ref={railRef}
        onScroll={updateScrollState}
        className={cn(
          'flex w-full min-w-0 max-w-full snap-x snap-mandatory items-stretch gap-5 overflow-x-auto overscroll-x-contain scroll-smooth pb-3 [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden',
          items.length === 1 && 'justify-center',
        )}
      >
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              'flex min-w-0 shrink-0 basis-[86%] snap-start min-[480px]:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-3.75rem)/4)]',
              items.length === 1 &&
                'max-w-md basis-full min-[480px]:basis-full lg:basis-full',
            )}
          >
            <Link
              href={item.href}
              aria-label={`${item.title}${video ? ' — watch video' : ''}`}
              className={cn(
                'group flex w-full min-w-0 flex-col overflow-hidden rounded-md border border-line bg-canvas text-ink transition-colors hover:border-action hover:text-action focus-visible:-outline-offset-4',
              )}
            >
              <div
                className={cn(
                  'relative shrink-0 bg-panel',
                  video ? 'aspect-[16/10]' : 'aspect-[16/9]',
                )}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes={
                    items.length === 1
                      ? '(min-width: 480px) 448px, 90vw'
                      : '(min-width: 1280px) 285px, (min-width: 1024px) 24vw, (min-width: 480px) 46vw, 85vw'
                  }
                  className={cn('object-cover', video && 'brightness-[0.85]')}
                  style={{ objectPosition: item.imagePosition ?? 'center' }}
                />
                {video ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className="flex size-14 items-center justify-center rounded-full bg-white/95 text-action shadow-sm transition-colors group-hover:bg-soft">
                        <svg
                          width="23"
                          height="23"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="m9 5 11 7-11 7V5Z" />
                        </svg>
                      </span>
                    </span>
                    <span className="absolute right-3 bottom-3 rounded-sm bg-ink/85 px-2 py-1 text-[11px] font-medium text-white">
                      {item.duration}
                    </span>
                  </>
                ) : null}
              </div>
              <div className={cn('flex flex-1 flex-col px-4', 'pt-4 pb-5')}>
                <p className="mb-2 text-[11px] font-medium tracking-wide text-action">
                  {item.category}
                </p>
                <h3 className="text-base leading-snug font-semibold tracking-[-0.01em]">
                  {item.title}
                </h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {(canPrevious || canNext) && (
        <div className="mt-3 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => move(-1)}
            disabled={!canPrevious}
            aria-controls={id}
            aria-label={`Previous ${video ? 'videos' : 'health updates'}`}
            className={cn(
              'inline-flex size-11 items-center justify-center rounded-md border border-line text-action hover:bg-soft disabled:cursor-not-allowed disabled:opacity-35',
              tone === 'teal' &&
                'border-white/45 text-white hover:bg-white/10 focus-visible:outline-white',
            )}
          >
            <Chevron direction="previous" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            disabled={!canNext}
            aria-controls={id}
            aria-label={`Next ${video ? 'videos' : 'health updates'}`}
            className={cn(
              'inline-flex size-11 items-center justify-center rounded-md border border-line text-action hover:bg-soft disabled:cursor-not-allowed disabled:opacity-35',
              tone === 'teal' &&
                'border-white/45 text-white hover:bg-white/10 focus-visible:outline-white',
            )}
          >
            <Chevron direction="next" />
          </button>
        </div>
      )}
    </section>
  );
}
