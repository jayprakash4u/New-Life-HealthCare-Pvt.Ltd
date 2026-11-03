import Image from 'next/image';

// Extra illustrations belong to the matching paragraph only. Main galleries stay unchanged.
const references = [
  {
    careId: 'hearing-tests',
    topic: 'What to ask about a hearing assessment',
    image: '/media/paragraphs/audiogram-example.jpg',
    width: 500,
    height: 423,
    caption:
      'Educational audiogram example showing mixed hearing loss in the left ear.',
    author: 'W. B. Alshuaib, J. M. Al-Kandari and S. M. Hasan',
    source:
      'https://commons.wikimedia.org/wiki/File:An_audiogram_with_mixed_hearing_loss_for_the_left_ear.jpg',
    license: 'CC BY 3.0',
    licenseHref: 'https://creativecommons.org/licenses/by/3.0/',
    size: 'max-w-md',
  },
  {
    careId: 'ultrasound',
    topic: 'Different scans look at different areas',
    image: '/media/paragraphs/fetal-ultrasound-example.jpg',
    width: 223,
    height: 297,
    caption: 'Educational example of a 3D fetal ultrasound at 20 weeks.',
    author: 'Staecker',
    source: 'https://commons.wikimedia.org/wiki/File:3dultrasound_20_weeks.jpg',
    license: 'Public domain',
    licenseHref:
      'https://commons.wikimedia.org/wiki/File:3dultrasound_20_weeks.jpg#Licensing',
    size: 'max-w-56',
  },
  {
    careId: 'ent-care',
    topic: 'Nasal blockage and sinus-related concerns',
    image: '/media/paragraphs/nasal-septum-example.jpg',
    width: 500,
    height: 580,
    caption: 'Educational CT reference showing a deviated nasal septum.',
    author: 'Mike Gerkin',
    source:
      'https://commons.wikimedia.org/wiki/File:Deviated_Septum_CT_Scan.jpg',
    license: 'CC BY-SA 3.0',
    licenseHref: 'https://creativecommons.org/licenses/by-sa/3.0/',
    size: 'max-w-xs',
  },
] as const;

export function ParagraphReferenceImage({
  careId,
  topic,
}: {
  careId: string;
  topic: string;
}) {
  const reference = references.find(
    (item) => item.careId === careId && item.topic === topic,
  );
  if (!reference) return null;
  return (
    <figure
      id={`${careId}-paragraph-reference`}
      className={`mt-6 w-full scroll-mt-44 lg:scroll-mt-48 ${reference.size}`}
    >
      <div className="overflow-hidden rounded-sm border border-line bg-panel p-3">
        <Image
          src={reference.image}
          alt={reference.caption}
          width={reference.width}
          height={reference.height}
          sizes="(min-width:640px) 448px, 90vw"
          className="mx-auto h-auto max-w-full"
        />
      </div>
      <figcaption className="mt-3 text-xs leading-6 text-muted">
        {reference.caption}
        <span className="mt-1 block text-[10px] leading-5">
          <a
            href={reference.source}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            {reference.author}
          </a>
          {' · '}
          <a
            href={reference.licenseHref}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            {reference.license}
          </a>
        </span>
      </figcaption>
    </figure>
  );
}
