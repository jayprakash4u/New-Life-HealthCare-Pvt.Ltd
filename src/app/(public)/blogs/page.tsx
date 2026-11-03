import { getPageCopy, getPublishedArticles } from '@/lib/admin-content';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'Blogs',
  description:
    'Explore health articles and clinic news from New Life Health Care.',
};

export default async function BlogsPage() {
  const [copy, articles] = await Promise.all([
    getPageCopy('blogs'),
    getPublishedArticles(),
  ]);
  return (
    <section className="bg-canvas py-10 sm:py-14">
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="mb-7 flex gap-3 text-sm text-muted"
        >
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Blogs</span>
        </nav>
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-4 text-muted">{copy.body}</p>
        <ul className="mt-8 grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article) => (
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
                    className="object-cover"
                    style={{ objectPosition: article.imagePosition }}
                  />
                </div>
                <h2 className="mt-3 text-lg leading-snug font-semibold text-action group-hover:underline">
                  {article.title}
                </h2>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
