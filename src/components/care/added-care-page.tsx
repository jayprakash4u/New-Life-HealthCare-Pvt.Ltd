import Image from 'next/image';
import { BookVisit } from '@/components/care/book-visit';
import { CareEnquiry } from '@/components/care/care-enquiry';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button-link';
import type { EditableCopy } from '@/config/admin-pages';

export function AddedCarePage({
  copy,
  kind,
}: {
  copy: EditableCopy;
  kind: 'service' | 'treatment';
}) {
  return (
    <article>
      <Container className="py-10 sm:py-16">
        <div
          className={
            copy.image ? 'grid items-start gap-8 lg:grid-cols-2' : 'max-w-3xl'
          }
        >
          <div>
            <p className="text-xs font-semibold tracking-widest text-action uppercase">
              {kind}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              {copy.title}
            </h1>
            <h2 className="mt-6 text-xl font-semibold">Overview</h2>
            <p className="mt-3 whitespace-pre-wrap text-muted">{copy.body}</p>
            {copy.serviceDetails?.highlights.length ? (
              <ul className="mt-4 list-disc space-y-1 pl-5">
                {copy.serviceDetails.highlights.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : null}
            <ButtonLink href="#book-your-visit" className="mt-6">
              {copy.serviceDetails?.action ?? 'Request a visit'}
            </ButtonLink>
          </div>
          {copy.image && (
            <Image
              src={copy.image}
              alt={copy.imageAlt ?? ''}
              width={720}
              height={480}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full rounded-sm"
            />
          )}
        </div>
        {copy.serviceDetails && (
          <details className="mt-8 max-w-3xl rounded-md border border-line p-4">
            <summary className="cursor-pointer font-semibold">
              {copy.serviceDetails.question}
            </summary>
            <p className="mt-3 text-muted">{copy.serviceDetails.answer}</p>
          </details>
        )}
      </Container>
      <BookVisit careName={copy.title} />
      <CareEnquiry careName={copy.title} />
    </article>
  );
}
