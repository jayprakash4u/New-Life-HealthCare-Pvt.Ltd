import { treatmentGuides } from '@/config/treatment-guides';
import { Container } from '@/components/ui/container';
import { EntCareImages } from './ent-care-images';
import { ClinicalImageGallery } from './clinical-image-gallery';
import { treatmentClinicalImages } from '@/config/treatment-clinical-images';
import { ParagraphReferenceImage } from '@/components/care/paragraph-reference-image';

export function TreatmentCareGuide({ careId }: { careId: string }) {
  const guide = treatmentGuides[careId];
  if (!guide) return null;
  const gallery =
    careId === 'ent-care' ? (
      <EntCareImages />
    ) : treatmentClinicalImages[careId] ? (
      <ClinicalImageGallery
        items={treatmentClinicalImages[careId]}
        id={`${careId}-clinical-images`}
      />
    ) : null;
  return (
    <section
      id="treatment-care-guide"
      aria-labelledby="care-guide-heading"
      className="scroll-mt-40 border-t border-line bg-canvas py-12 sm:py-16 lg:scroll-mt-48"
    >
      <Container>
        <div className="max-w-5xl">
          <h2
            id="care-guide-heading"
            className="max-w-4xl text-[clamp(1.75rem,2.6vw,2.25rem)] leading-tight font-medium tracking-tight text-ink"
          >
            {guide.heading}
          </h2>
          <div aria-hidden="true" className="mt-4 h-px w-12 bg-accent" />
          <div className="mt-6 space-y-4 text-[15px] leading-[1.9] text-muted sm:text-base">
            {guide.introduction.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {gallery}
          <div className="mt-9 space-y-8 sm:mt-10 sm:space-y-9">
            {guide.topics.map((topic) => (
              <article key={topic.title}>
                <h3 className="text-lg leading-snug font-semibold text-ink sm:text-xl">
                  {topic.title}
                </h3>
                <div className="mt-3 space-y-3 text-[15px] leading-[1.9] text-muted sm:text-base">
                  {topic.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <ParagraphReferenceImage careId={careId} topic={topic.title} />
              </article>
            ))}
          </div>
          <p className="mt-9 border-t border-line pt-4 text-xs leading-6 text-muted">
            Further reading:{' '}
            {guide.sources.map((source, index) => (
              <span key={source.href}>
                {index > 0 && ' · '}
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  {source.label}
                </a>
              </span>
            ))}
          </p>
        </div>
      </Container>
    </section>
  );
}
