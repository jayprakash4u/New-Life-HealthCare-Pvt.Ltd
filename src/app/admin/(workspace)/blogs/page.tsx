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
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Blogs</h1>
          <p className="mt-2 text-sm text-muted">
            Manage the articles published on your website.
          </p>
        </div>
        <Link
          href="/admin/pages/blogs"
          className="text-sm font-medium text-action underline underline-offset-4"
        >
          Edit page introduction
        </Link>
      </div>
      {status === 'homepage-saved' && (
        <p role="status" className="mt-4 text-sm text-action">
          Homepage visibility saved.
        </p>
      )}
      {status === 'homepage-error' && (
        <p role="alert" className="mt-4 text-sm text-negative">
          Could not update the homepage. Try again.
        </p>
      )}
      {status === 'deleted' && (
        <p role="status" className="mt-5 text-sm text-action">
          Article removed from the website.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="mt-5 text-sm text-negative">
          The article could not be deleted. Please try again.
        </p>
      )}
      <div className="my-6 max-w-sm rounded-md border border-line bg-canvas p-5 shadow-xs">
        <p className="text-xs font-semibold tracking-wide text-muted uppercase">
          Total posts
        </p>
        <p className="mt-4 text-3xl font-semibold">{articles.length}</p>
      </div>
      <div>
        <section
          aria-labelledby="existing-posts"
          className="rounded-md border border-line bg-canvas p-5 shadow-xs"
        >
          <h2 id="existing-posts" className="mb-4 font-semibold">
            Published posts
          </h2>
          {articles.length === 0 ? (
            <p className="text-sm text-muted">
              There are no published articles.
            </p>
          ) : (
            <ul className="space-y-3">
              {articles.map((article) => (
                <li
                  key={article.id}
                  className="flex flex-wrap items-center gap-3 rounded-md border border-line p-3 text-sm"
                >
                  <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-sm bg-panel">
                    <Image
                      src={article.image}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-32 flex-1">
                    <p className="font-semibold">{article.title}</p>
                    <span className="mt-1 inline-block rounded-sm bg-soft px-2 py-0.5 text-xs font-medium text-action">
                      {article.category}
                    </span>
                  </div>
                  <HomepageCheckbox
                    kind="blog"
                    id={article.id}
                    title={article.title}
                    visible={visibility.get(article.id) ?? true}
                  />
                  <div className="ml-auto flex items-center gap-3">
                    <Link
                      href={article.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${article.title} (opens in a new tab)`}
                      className="font-medium text-action underline underline-offset-4"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/pages/blog-${article.id}`}
                      aria-label={`Edit ${article.title}`}
                      className="font-medium text-action underline underline-offset-4"
                    >
                      Edit
                    </Link>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          aria-label={`Delete ${article.title}`}
                          className="text-negative"
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
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit" variant="danger">
                            Delete article
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
