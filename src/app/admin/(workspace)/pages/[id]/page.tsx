import Link from 'next/link';
import Image from 'next/image';
import { findServicePage } from '@/config/service-pages';
import { findTreatmentPage } from '@/config/treatment-pages';
import { healthArticles } from '@/config/journal';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAdminPages } from '@/lib/added-care';
import { hasEditableImage } from '@/config/admin-pages';
import { requireAdmin } from '@/lib/admin-auth';
import {
  getPageCopy,
  isArticleDeleted,
  readPageOverride,
} from '@/lib/admin-content';
import { publishPage } from '../../../actions';

export default async function PageEditor({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const page = (await getAdminPages()).find((entry) => entry.id === id);
  if (!page) notFound();
  const isBlog = page.group === 'Articles';
  if (isBlog && (await isArticleDeleted(page.id))) notFound();
  const draft = await readPageOverride(page.id, true);
  const copy = draft ?? (await getPageCopy(page.id));
  const service =
    page.group === 'Services'
      ? findServicePage(page.id.slice('service-'.length))
      : undefined;
  const treatment =
    page.group === 'Treatments'
      ? findTreatmentPage(page.id.slice('treatment-'.length))
      : undefined;
  const article = isBlog
    ? healthArticles.find(({ id }) => page.id === 'blog-' + id)
    : undefined;
  const image =
    copy.image ??
    service?.image ??
    treatment?.image ??
    article?.image ??
    (page.id === 'home-introduction' ? '/brand/hero-poster.jpg' : undefined) ??
    (['about', 'team'].includes(page.id)
      ? '/brand/new-life-director.png'
      : undefined);
  const details = copy.serviceDetails ?? service;
  const { status } = await searchParams;
  return (
    <div className="mx-auto max-w-5xl">
      <Link
        href={
          isBlog || page.id === 'blogs'
            ? '/admin/blogs'
            : ['home', 'home-introduction'].includes(page.id)
              ? '/admin/home'
              : page.id === 'gallery'
                ? '/admin/gallery'
                : '/admin'
        }
        className="text-sm text-action underline underline-offset-4"
      >
        ←{' '}
        {isBlog || page.id === 'blogs'
          ? 'Blogs'
          : ['home', 'home-introduction'].includes(page.id)
            ? 'Homepage Content'
            : page.id === 'gallery'
              ? 'Gallery'
              : 'Dashboard'}
      </Link>
      <h1 className="mt-5 text-2xl font-semibold tracking-tight">
        {page.label}
      </h1>
      <Link
        href={page.path}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-sm text-action underline underline-offset-4"
      >
        View published page
      </Link>
      {status === 'draft' && (
        <p role="status" className="mt-5 text-sm text-action">
          Draft saved. Your public page is unchanged.
        </p>
      )}
      {status === 'saved' && (
        <p
          role="status"
          className="mt-5 rounded-md bg-soft p-3 text-sm text-action"
        >
          Changes published.
        </p>
      )}
      {status === 'invalid' && (
        <p role="alert" className="mt-5 text-sm text-negative">
          Enter a heading and check the character limits.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="mt-5 text-sm text-negative">
          Changes could not be saved. Please try again.
        </p>
      )}
      <form
        action={publishPage.bind(null, page.id)}
        className="mt-6 space-y-5 rounded-md border border-line bg-canvas p-5 shadow-xs sm:p-7"
      >
        <section aria-labelledby="editor-page-details">
          <h2 id="editor-page-details" className="mb-5 font-semibold">
            Page details
          </h2>
          <div
            className={
              hasEditableImage(page)
                ? 'grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_16rem]'
                : 'grid gap-5'
            }
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="page-title"
                  className="mb-2 block text-sm font-semibold"
                >
                  Page heading
                </label>
                <Input
                  id="page-title"
                  name="title"
                  defaultValue={copy.title.replaceAll('\n', ' ')}
                  required
                  maxLength={160}
                />
              </div>
              <div>
                <label
                  htmlFor="page-body"
                  className="mb-2 block text-sm font-semibold"
                >
                  {page.group === 'Articles'
                    ? 'Article text'
                    : 'Page introduction or overview'}
                </label>
                <textarea
                  id="page-body"
                  name="body"
                  defaultValue={copy.body}
                  rows={10}
                  maxLength={12000}
                  className="w-full rounded-md border border-line bg-canvas p-3 text-sm leading-6"
                  aria-describedby="paragraph-hint"
                />
                <p id="paragraph-hint" className="mt-2 text-xs text-muted">
                  Leave a blank line between paragraphs.
                </p>
              </div>
            </div>
            {hasEditableImage(page) && (
              <div className="space-y-4">
                {image && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">
                      {draft?.image ? 'Draft image' : 'Current image'}
                    </p>
                    <Image
                      src={image}
                      alt=""
                      width={320}
                      height={180}
                      className="aspect-video rounded-sm border border-line object-contain"
                    />
                  </div>
                )}
                {(page.group === 'Services' || page.group === 'Treatments') && (
                  <label className="grid gap-2 text-sm font-semibold">
                    Image description for screen readers
                    <Input
                      name="imageAlt"
                      maxLength={200}
                      defaultValue={
                        copy.imageAlt ??
                        service?.imageAlt ??
                        treatment?.imageAlt
                      }
                    />
                  </label>
                )}
                {hasEditableImage(page) && (
                  <label className="grid gap-2 text-sm font-semibold">
                    Replace main image
                    <Input
                      type="file"
                      name="image"
                      accept="image/jpeg,image/png,image/webp"
                    />
                    <span className="text-xs font-normal text-muted">
                      JPEG, PNG or WebP, up to 4 MB. Leave blank to keep the
                      current image.
                    </span>
                  </label>
                )}
              </div>
            )}
          </div>
        </section>
        {details && (
          <fieldset className="grid gap-4 rounded-md border border-line p-4">
            <legend className="px-2 font-semibold">Page content</legend>
            <label className="grid gap-2 text-sm font-medium">
              Highlights (one per line)
              <textarea
                name="highlights"
                rows={3}
                maxLength={500}
                defaultValue={details.highlights.join('\n')}
                className="rounded-sm border border-line p-3"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Enquiry button label
              <Input
                name="actionLabel"
                required
                maxLength={80}
                defaultValue={details.action}
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Frequently asked question
              <Input
                name="faqQuestion"
                required
                maxLength={200}
                defaultValue={details.question}
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Answer
              <textarea
                name="faqAnswer"
                required
                rows={3}
                maxLength={2000}
                defaultValue={details.answer}
                className="rounded-sm border border-line p-3"
              />
            </label>
          </fieldset>
        )}
        <div className="flex flex-wrap gap-3">
          <Button type="submit" name="intent" value="draft" variant="outline">
            Save draft
          </Button>
          <Button type="submit">Publish changes</Button>
        </div>
        {draft && (
          <details className="rounded-md border border-line bg-panel p-4">
            <summary className="cursor-pointer text-sm font-semibold">
              Preview saved draft
            </summary>
            <h2 className="mt-3 text-xl font-semibold">{draft.title}</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm text-muted">
              {draft.body}
            </p>
            {draft.image && (
              <Image
                src={draft.image}
                alt=""
                width={480}
                height={280}
                className="mt-4 h-auto max-w-full"
              />
            )}
          </details>
        )}
      </form>
    </div>
  );
}
