import { getPageCopy, getPublishedArticles } from '@/lib/admin-content';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { DataTablePagination } from '@/components/ui/data-table-pagination';

export const metadata: Metadata = {
  title: 'Health Blogs & Articles',
  description:
    'Explore health articles, wellness tips, and clinic news from New Life Health Care.',
};

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const [copy, articles, { page: pageParam }] = await Promise.all([
    getPageCopy('blogs'),
    getPublishedArticles(),
    searchParams,
  ]);

  const pageSize = 8;
  const totalItems = articles.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const rawPage = Number(pageParam) || 1;
  const page = Math.max(1, Math.min(rawPage, totalPages));

  const start = (page - 1) * pageSize;
  const paginatedArticles = articles.slice(start, start + pageSize);

  return (
    <section className="bg-canvas py-10 sm:py-14">
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="mb-7 flex gap-3 text-sm text-muted"
        >
          <Link href="/" className="hover:text-action">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Blogs</span>
        </nav>
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-4 text-muted">{copy.body}</p>

        {paginatedArticles.length === 0 ? (
          <div className="mt-8 rounded-lg border border-line p-12 text-center text-muted">
            No articles published yet.
          </div>
        ) : (
          <div className="mt-8 space-y-8">
            <ul className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {paginatedArticles.map((article) => (
                <li key={article.id} className="min-w-0">
                  <Link
                    href={article.href}
                    className="group block rounded-md"
                  >
                    <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-panel">
                      <Image
                        src={article.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 48vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-102"
                        style={{ objectPosition: article.imagePosition }}
                      />
                    </div>
                    <span className="mt-3 block text-xs font-semibold text-action uppercase tracking-wide">
                      {article.category}
                    </span>
                    <h2 className="mt-1 text-base leading-snug font-semibold text-ink group-hover:text-action transition-colors">
                      {article.title}
                    </h2>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Server-Side Pagination (Right-Aligned) */}
            <DataTablePagination
              currentPage={page}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={pageSize}
              createPageUrl={(p, s) => (s ? `/blogs?page=${p}&pageSize=${s}` : `/blogs?page=${p}`)}
              className="pt-6 border-t border-line"
            />
          </div>
        )}
      </Container>
    </section>
  );
}
