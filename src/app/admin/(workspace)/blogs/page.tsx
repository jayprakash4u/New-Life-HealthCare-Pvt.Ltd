import Link from 'next/link';
import { requireAdmin } from '@/lib/admin-auth';
import { getPublishedArticles } from '@/lib/admin-content';
import { getHomepageVisibility } from '@/lib/homepage-visibility';
import { deleteArticle } from '../../actions';
import { BlogsTable } from '@/components/admin/blogs-table';

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

  const visibilityMap: Record<string, boolean> = {};
  for (const article of articles) {
    visibilityMap[article.id] = visibility.get(article.id) ?? true;
  }

  const handleDelete = async (id: string) => {
    'use server';
    await deleteArticle(id);
  };

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

      {/* Articles DataTable */}
      <BlogsTable
        articles={articles}
        visibilityMap={visibilityMap}
        onDelete={handleDelete}
      />
    </div>
  );
}
