import Image from 'next/image';

export type ClinicalImage = {
  id: string;
  title: string;
  description: string;
  alt: string;
  image: string;
  author: string;
  authorHref?: string;
  source: string;
  license: string;
  licenseHref: string;
};

export function ClinicalImageGallery({
  items,
  id,
}: {
  items: readonly ClinicalImage[];
  id: string;
}) {
  return (
    <div
      id={id}
      role="group"
      aria-label="Clinical reference images"
      className="mt-8 scroll-mt-44 border-b border-line pb-7 sm:mt-9 lg:scroll-mt-48"
    >
      <div className="grid gap-7 sm:grid-cols-3 sm:gap-5">
        {items.map((item) => (
          <figure
            key={item.id}
            id={`${id}-${item.id}`}
            className="min-w-0 scroll-mt-44 lg:scroll-mt-48"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-panel">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width:1280px) 328px, (min-width:640px) 30vw, 92vw"
                className="object-contain"
              />
            </div>
            <figcaption className="pt-4">
              <h3 className="text-base leading-snug font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {item.description}
              </p>
              <p className="mt-3 text-[10px] leading-5 text-muted">
                <a
                  href={item.authorHref ?? item.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  {item.author}
                </a>
                {' · '}
                <a
                  href={item.licenseHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  {item.license}
                </a>
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-4 text-[11px] leading-5 text-muted">
        Educational clinical images, not New Life patient cases.
      </p>
    </div>
  );
}
