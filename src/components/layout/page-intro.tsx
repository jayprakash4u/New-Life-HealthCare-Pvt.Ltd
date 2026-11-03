import Link from 'next/link';

export function PageIntro({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="mb-8 sm:mb-10">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex gap-3 text-sm text-muted"
      >
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{title}</span>
      </nav>
      <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-muted whitespace-pre-line">
          {description}
        </p>
      )}
    </header>
  );
}
