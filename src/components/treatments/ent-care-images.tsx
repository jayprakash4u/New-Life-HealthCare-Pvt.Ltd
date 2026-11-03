import Image from 'next/image';

const careAreas = [
  {
    id: 'ear',
    title: 'Outer-ear infection',
    description: 'Clinical example of otitis externa affecting the outer ear.',
    alt: 'Clinical photograph of an ear affected by otitis externa',
    image: '/media/treatments/ent-otitis-externa.jpg',
    author: 'James Heilman, MD',
    source: 'https://commons.wikimedia.org/wiki/File:OtitisExterna10.JPG',
    license: 'CC BY 3.0',
    licenseHref: 'https://creativecommons.org/licenses/by/3.0/',
  },
  {
    id: 'nose',
    title: 'Nasal polyp',
    description: 'Clinical example showing a polyp inside a nostril.',
    alt: 'Clinical close-up photograph of a nasal polyp inside a nostril',
    image: '/media/treatments/ent-nasal-polyp.jpg',
    author: '© MathieuMD / Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Polype_nasal.jpg',
    license: 'CC BY-SA 3.0',
    licenseHref: 'https://creativecommons.org/licenses/by-sa/3.0/',
  },
  {
    id: 'throat',
    title: 'Tonsillitis',
    description: 'Clinical example of inflammation in the tonsil area.',
    alt: 'Clinical photograph of a throat affected by tonsillitis',
    image: '/media/treatments/ent-tonsillitis.jpg',
    author: 'CDC / PHIL 6323',
    source:
      'https://commons.wikimedia.org/wiki/File:Tonsillitis_-_cdc_6323.jpg',
    license: 'Public domain',
    licenseHref:
      'https://commons.wikimedia.org/wiki/File:Tonsillitis_-_cdc_6323.jpg#Licensing',
  },
  {
    id: 'perforated-eardrum',
    title: 'Perforated eardrum',
    description: 'Clinical view of a perforation in the eardrum.',
    alt: 'Clinical otoscopy photograph showing a perforated eardrum',
    image: '/media/treatments/ent-perforated-eardrum.jpg',
    author: 'Michael Hawke, MD',
    source:
      'https://commons.wikimedia.org/wiki/File:Traumatic_Perforation_of_the_Tympanic_Membrane.jpg',
    license: 'CC BY 4.0',
    licenseHref: 'https://creativecommons.org/licenses/by/4.0/',
  },
  {
    id: 'impacted-earwax',
    title: 'Impacted earwax',
    description: 'Clinical view of an earwax plug in the ear canal.',
    alt: 'Clinical otoscopy photograph showing earwax inside the ear canal',
    image: '/media/treatments/ent-impacted-earwax.jpg',
    author: 'Didier Descouens',
    source: 'https://commons.wikimedia.org/wiki/File:BouchonCerumen.jpg',
    license: 'CC BY-SA 3.0',
    licenseHref: 'https://creativecommons.org/licenses/by-sa/3.0/',
  },
  {
    id: 'tonsil-stone',
    title: 'Tonsil stone',
    description: 'Clinical example of a tonsil stone, indicated by the arrow.',
    alt: 'Clinical photograph with an arrow pointing to a tonsil stone',
    image: '/media/treatments/ent-tonsil-stone.jpg',
    author: 'Phreezinc / Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Tonsilstone.jpg',
    license: 'Public domain',
    licenseHref:
      'https://commons.wikimedia.org/wiki/File:Tonsilstone.jpg#Licensing',
  },
];

export function EntCareImages() {
  return (
    <div
      id="ent-clinical-images"
      role="group"
      aria-label="Clinical reference images"
      className="mt-8 scroll-mt-44 border-b border-line pb-7 sm:mt-9 lg:scroll-mt-48"
    >
      <div className="grid gap-7 sm:grid-cols-3 sm:gap-5">
        {careAreas.map((area) => (
          <figure
            key={area.id}
            id={`ent-example-${area.id}`}
            className="min-w-0 scroll-mt-44 lg:scroll-mt-48"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-panel">
              <Image
                src={area.image}
                alt={area.alt}
                fill
                sizes="(min-width:1280px) 328px, (min-width:640px) 30vw, 92vw"
                className="object-contain"
              />
            </div>
            <figcaption className="pt-4">
              <h3 className="text-base leading-snug font-semibold text-ink">
                {area.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {area.description}
              </p>
              <p className="mt-3 text-[10px] leading-5 text-muted">
                <a
                  href={area.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  {area.author}
                </a>
                {' · '}
                <a
                  href={area.licenseHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  {area.license}
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
