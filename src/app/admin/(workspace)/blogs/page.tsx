import { HomepageCheckbox } from '@/components/admin/homepage-checkbox';
import { getHomepageVisibility } from '@/lib/homepage-visibility';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { requireAdmin } from '@/lib/admin-auth';
import { getPublishedArticles } from '@/lib/admin-content';
import { deleteArticle } from '../../actions';

export default async function AdminBlogs({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();
  const [articles, { status }] = await Promise.all([
    getPublishedArticles(),
    searchParams,
  ]);
  const visibility = await getHomepageVisibility(
    'blog',
    articles.map(({ id }) => id),
  );

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-lg font-semibold text-ink tracking-tight">
              Health Articles & Blog Publications
            </h1>
            <span className="rounded-md border border-line bg-panel px-2 py-0.5 text-xs text-muted">
              {articles.length} {articles.length === 1 ? 'article' : 'articles'}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">
            Manage educational health articles, clinic updates, and publications
            featured on the website.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Link
            href="/admin/pages/blogs"
            className="rounded-md border border-line bg-canvas px-3 py-1.5 text-xs font-medium text-muted hover:border-action hover:text-action shadow-2xs transition-colors"
          >
            Edit Blog Intro
          </Link>
          <Link
            href="/blogs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md bg-action px-3 py-1.5 text-xs font-medium text-white shadow-2xs hover:bg-action/90 transition-colors"
          >
            <span>View Public Blog</span>
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

      {/* Notifications */}
      {status === 'homepage-saved' && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-md bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs text-emerald-800"
        >
          <span>✓</span>
          <span>Homepage article visibility updated.</span>
        </div>
      )}

      {status === 'deleted' && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-md bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs text-emerald-800"
        >
          <span>✓</span>
          <span>Article removed from website.</span>
        </div>
      )}

      {status === 'error' && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-800"
        >
          <span>⚠</span>
          <span>Could not complete action. Please try again.</span>
        </div>
      )}

      {/* Articles Table */}
      <div className="overflow-hidden rounded-lg border border-line bg-canvas shadow-2xs">
        {articles.length === 0 ? (
          <div className="p-8 text-center text-xs text-muted">
            No published articles found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-line bg-panel/75 text-[11px] font-medium text-muted">
                  <th scope="col" className="px-4 py-3">
                    Article
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Show on Homepage
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {articles.map((article) => {
                  const isFeatured = visibility.get(article.id) ?? true;
                  return (
                    <tr
                      key={article.id}
                      className="transition-colors hover:bg-panel/30"
                    >
                      {/* Media & Title */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-md border border-line bg-panel">
                            <Image
                              src={article.image}
                              alt=""
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0 max-w-[280px]">
                            <span className="block font-medium text-ink truncate">
                              {article.title}
                            </span>
                            <span className="block text-[11px] font-mono text-muted truncate">
                              /blogs/{article.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="rounded bg-soft px-2 py-0.5 text-xs text-action font-medium">
                          {article.category}
                        </span>
                      </td>

                      {/* Homepage toggle */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <HomepageCheckbox
                          kind="blog"
                          id={article.id}
                          title={article.title}
                          visible={isFeatured}
                        />
                      </td>

                      {/* Status */}
                      <td className="px-3 py-3.5 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700">
                          <span className="size-1.5 rounded-full bg-emerald-500"></span>
                          Published
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            href={article.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded border border-line bg-canvas px-2.5 py-1 text-xs text-muted hover:border-action hover:text-action transition-colors"
                          >
                            View ↗
                          </Link>
                          <Link
                            href={`/admin/pages/blog-${article.id}`}
                            className="rounded bg-soft px-2.5 py-1 text-xs font-medium text-action hover:bg-action hover:text-white transition-colors"
                          >
                            Edit
                          </Link>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-negative hover:bg-red-50 text-xs px-2 h-7"
                              >
                                Delete
                              </Button>
                            </DialogTrigger>
                            <DialogContent
                              title="Delete article?"
                              description={`Remove “${article.title}” from the public website.`}
                            >
                              <form
                                action={deleteArticle.bind(
                                  null,
                                  `blog-${article.id}`,
                                )}
                                className="flex justify-end gap-3"
                              >
                                <DialogClose asChild>
                                  <Button variant="outline" type="button">
                                    Cancel
                                  </Button>
                                </DialogClose>
                                <Button type="submit" variant="danger">
                                  Delete article
                                </Button>
                              </form>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
