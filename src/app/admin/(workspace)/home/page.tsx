import Image from 'next/image';
import Link from 'next/link';
import { requireAdmin } from '@/lib/admin-auth';
import { homepageSections } from '@/config/homepage-sections';
import { getHomepageVisibility } from '@/lib/homepage-visibility';
import { HomepageCheckbox } from '@/components/admin/homepage-checkbox';

const previews = {
  hero: {
    image: '/brand/hero-poster.jpg',
    description: 'Hero headline and appointment form.',
  },
  introduction: {
    image: '/brand/hero-poster.jpg',
    description: 'Clinic introduction, background photo, and clinic figures.',
  },
  videos: {
    image: '/media/journal/clinic-tour.jpg',
    description: 'Videos selected in the Videos library.',
  },
  'why-choose-us': {
    image: null,
    description: 'The reasons patients choose New Life.',
  },
  blog: {
    image: '/media/journal/kist-collaboration.jpg',
    description: 'Articles selected in the Blogs library.',
  },
  faq: {
    image: '/media/home/faq-question-demo.jpg',
    description: 'Common questions and the enquiry form.',
  },
} as const;

export default async function AdminHome({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();
  const [visibility, { status }] = await Promise.all([
    getHomepageVisibility(
      'section',
      homepageSections.map(({ id }) => id),
    ),
    searchParams,
  ]);
  return (
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Homepage</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Homepage Content
          </h1>
          <p className="mt-2 text-sm text-muted">
            Choose a section to manage its content or visibility.
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-action underline underline-offset-4"
        >
          View page ↗
        </Link>
      </header>
      {status === 'homepage-saved' && (
        <p role="status" className="mt-4 text-sm text-action">
          Homepage visibility saved.
        </p>
      )}
      {status === 'homepage-error' && (
        <p role="alert" className="mt-4 text-sm text-negative">
          Could not save the change. Try again.
        </p>
      )}
      <ol className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {homepageSections.map((section, index) => (
          <li
            key={section.id}
            className="flex flex-col overflow-hidden rounded-md border border-line bg-canvas"
          >
            <div className="relative grid aspect-[5/2] place-items-center bg-soft">
              {previews[section.id].image ? (
                <Image
                  src={previews[section.id].image!}
                  alt=""
                  fill
                  sizes="(min-width:1280px) 360px, (min-width:640px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <span
                  aria-hidden
                  className="text-4xl font-semibold text-action"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <h2 className="font-semibold">{section.label}</h2>
              <p className="mb-2 flex-1 text-sm text-muted">
                {previews[section.id].description}
              </p>
              {'required' in section ? (
                <span className="text-sm text-muted">Always shown</span>
              ) : (
                <HomepageCheckbox
                  kind="section"
                  id={section.id}
                  title={section.label}
                  visible={visibility.get(section.id) ?? true}
                />
              )}
              {'href' in section && (
                <Link
                  href={section.href}
                  className="text-sm font-medium text-action underline underline-offset-4"
                >
                  {section.id === 'blog' || section.id === 'videos'
                    ? 'Manage items'
                    : 'Edit content'}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
