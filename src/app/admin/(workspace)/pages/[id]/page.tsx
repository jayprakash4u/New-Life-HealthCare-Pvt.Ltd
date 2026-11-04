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

  const backHref =
    isBlog || page.id === 'blogs'
      ? '/admin/blogs'
      : ['home', 'home-introduction'].includes(page.id)
        ? '/admin/home'
        : page.id === 'gallery'
          ? '/admin/library/gallery'
          : ['team', 'doctors'].includes(page.id)
            ? '/admin/library/doctors'
            : page.group === 'Services'
              ? '/admin/services'
              : page.group === 'Treatments'
                ? '/admin/treatments'
                : '/admin';

  const backLabel =
    isBlog || page.id === 'blogs'
      ? 'Blogs'
      : ['home', 'home-introduction'].includes(page.id)
        ? 'Homepage Content'
        : page.id === 'gallery'
          ? 'Photo Gallery'
          : ['team', 'doctors'].includes(page.id)
            ? 'Doctors & Specialists'
            : page.group === 'Services'
              ? 'Clinic Services'
              : page.group === 'Treatments'
                ? 'Medical Treatments'
                : 'Dashboard';

  return (
    <div className="space-y-5 max-w-4xl">
      {/* Navigation & Header */}
      <div className="border-b border-line pb-4">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 text-xs text-muted hover:text-action transition-colors"
        >
          <span>←</span>
          <span>Back to {backLabel}</span>
        </Link>
        <div className="mt-2.5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg font-semibold text-ink tracking-tight">
                {page.label}
              </h1>
              <span className="rounded border border-line bg-panel px-2 py-0.5 text-xs text-muted">
                {page.group}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted">
              Edit the live copy, banner image, and public details for this
              page.
            </p>
          </div>
          <Link
            href={page.path}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-line bg-canvas px-3 py-1.5 text-xs font-medium text-muted hover:border-action hover:text-action shadow-2xs transition-colors self-start sm:self-auto"
          >
            <span>View Published Page</span>
            <svg
              className="size-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </Link>
        </div>
      </div>

      {status === 'draft' && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-lg bg-blue-50 border border-blue-200 p-3 text-xs font-semibold text-blue-800"
        >
          <span>ℹ</span>
          <span>Draft saved. Your public page remains unchanged.</span>
        </div>
      )}

      {status === 'saved' && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-800"
        >
          <span>✓</span>
          <span>Changes published successfully to the website.</span>
        </div>
      )}

      {status === 'invalid' && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-xs font-semibold text-red-800"
        >
          <span>⚠</span>
          <span>
            Enter a heading and ensure character limits are respected.
          </span>
        </div>
      )}

      {status === 'error' && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-xs font-semibold text-red-800"
        >
          <span>⚠</span>
          <span>Changes could not be saved. Please try again.</span>
        </div>
      )}

      <form
        action={publishPage.bind(null, page.id)}
        className="space-y-6 rounded-xl border border-line bg-canvas p-6 shadow-2xs sm:p-8"
      >
        <section aria-labelledby="editor-page-details" className="space-y-5">
          <div className="border-b border-line pb-3">
            <h2
              id="editor-page-details"
              className="font-bold text-ink text-base"
            >
              Page Content
            </h2>
            <p className="mt-0.5 text-xs text-muted">
              Main headline, body description, and media.
            </p>
          </div>

          <label className="grid gap-1.5 text-xs font-semibold text-ink">
            Page Heading / Title
            <Input
              name="title"
              required
              maxLength={160}
              defaultValue={copy.title}
              className="text-sm"
            />
          </label>

          <label className="grid gap-1.5 text-xs font-semibold text-ink">
            Page Overview / Description
            <textarea
              name="body"
              required
              rows={8}
              maxLength={12000}
              defaultValue={copy.body}
              className="rounded-md border border-line p-3 text-xs leading-relaxed bg-canvas"
            />
          </label>

          {/* Image Section */}
          <div className="rounded-xl border border-line/80 bg-panel/50 p-4 space-y-4">
            <h3 className="font-semibold text-ink text-xs uppercase tracking-wide">
              Page Imagery
            </h3>
            {image && (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="relative h-28 w-44 shrink-0 overflow-hidden rounded-lg border border-line bg-panel">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="176px"
                    className="object-cover"
                  />
                </div>
                {hasEditableImage(page) && (
                  <div className="flex-1 space-y-3">
                    <label className="grid gap-1 text-xs font-semibold text-ink">
                      Replace Image
                      <Input
                        type="file"
                        name="image"
                        accept="image/jpeg,image/png,image/webp"
                      />
                      <span className="text-[11px] font-normal text-muted">
                        JPEG, PNG or WebP, up to 4 MB. Leave blank to keep
                        current image.
                      </span>
                    </label>

                    <label className="grid gap-1 text-xs font-semibold text-ink">
                      Image Alt Text (accessibility description)
                      <Input
                        name="imageAlt"
                        maxLength={200}
                        defaultValue={copy.imageAlt}
                        placeholder="Briefly describe the image for screen readers"
                      />
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {details && (
          <fieldset className="space-y-4 rounded-xl border border-line bg-panel/30 p-5">
            <legend className="px-2 font-bold text-ink text-xs uppercase tracking-wider">
              Care & Service Details
            </legend>

            <label className="grid gap-1.5 text-xs font-semibold text-ink">
              Highlights / Key Care Points (one per line)
              <textarea
                name="highlights"
                rows={3}
                maxLength={500}
                defaultValue={details.highlights.join('\n')}
                className="rounded-md border border-line p-3 text-xs bg-canvas"
              />
            </label>

            <label className="grid gap-1.5 text-xs font-semibold text-ink">
              Action Button Label
              <Input
                name="actionLabel"
                required
                maxLength={80}
                defaultValue={details.action}
              />
            </label>

            <label className="grid gap-1.5 text-xs font-semibold text-ink">
              Frequently Asked Question
              <Input
                name="faqQuestion"
                required
                maxLength={200}
                defaultValue={details.question}
              />
            </label>

            <label className="grid gap-1.5 text-xs font-semibold text-ink">
              Question Answer
              <textarea
                name="faqAnswer"
                required
                rows={3}
                maxLength={2000}
                defaultValue={details.answer}
                className="rounded-md border border-line p-3 text-xs bg-canvas"
              />
            </label>
          </fieldset>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-line">
          <Button type="submit">Publish Changes</Button>
          <Button type="submit" name="intent" value="draft" variant="outline">
            Save Draft (Unpublished)
          </Button>
          <Link
            href={backHref}
            className="rounded-md border border-line px-3 py-2 text-xs font-medium text-muted hover:text-ink ml-auto"
          >
            Cancel
          </Link>
        </div>

        {draft && (
          <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4">
            <p className="font-bold text-blue-900 text-xs uppercase tracking-wide">
              Saved Unpublished Draft
            </p>
            <h4 className="mt-2 text-base font-bold text-ink">{draft.title}</h4>
            <p className="mt-1 whitespace-pre-wrap text-xs text-muted leading-relaxed">
              {draft.body}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
