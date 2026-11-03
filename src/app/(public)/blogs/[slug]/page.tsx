import { getPageCopy, isArticleDeleted } from '@/lib/admin-content';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { healthArticles } from '@/config/journal';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return healthArticles.map(({ id }) => ({ slug: id }));
}

async function getArticle(params: Props['params']) {
  const { slug } = await params;
  const article = healthArticles.find(({ id }) => id === slug);
  if (!article || (await isArticleDeleted(`blog-${article.id}`))) notFound();
  const copy = await getPageCopy(`blog-${article.id}`);
  return {
    ...article,
    title: copy.title,
    image: copy.image ?? article.image,
    body: copy.body.split(/\n\s*\n/).filter(Boolean),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params);
  return { title: article.title, description: article.body[0] };
}

export default async function BlogArticlePage({ params }: Props) {
  const article = await getArticle(params);
  return (
    <Container className="py-10 sm:py-14">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/blogs"
          className="text-sm font-medium text-action underline underline-offset-4"
        >
          ← All blogs
        </Link>
        <p className="mt-7 text-sm font-semibold text-action">
          {article.category}
        </p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
          {article.title}
        </h1>
        <div className="mt-7 space-y-4 leading-7 text-muted">
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {article.source && (
            <p>
              <a
                href={article.source.href}
                className="text-action underline underline-offset-4"
              >
                {article.source.label}
              </a>
            </p>
          )}
        </div>
        <Image
          src={article.image}
          alt={`New Life Health Care poster for ${article.title}`}
          width={768}
          height={768}
          sizes="(min-width: 768px) 768px, 100vw"
          className="mt-8 h-auto max-w-full rounded-md border border-line"
        />
      </article>
    </Container>
  );
}
