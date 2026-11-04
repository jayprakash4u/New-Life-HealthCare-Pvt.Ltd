import Image from 'next/image';
import Link from 'next/link';
import { requireAdmin } from '@/lib/admin-auth';
import { homepageSections } from '@/config/homepage-sections';
import { getHomepageVisibility } from '@/lib/homepage-visibility';
import { HomepageCheckbox } from '@/components/admin/homepage-checkbox';

const previews = {
  hero: {
    image: '/brand/hero-poster.jpg',
    description:
      'Hero headline, looping video banner, and fast appointment form.',
  },
  doctors: {
    image: null,
    description:
      'Doctor portraits, consultation specialties, and appointment shortcuts.',
  },
  introduction: {
    image: '/brand/hero-poster.jpg',
    description:
      'Clinic introduction, director overview, and clinic milestones.',
  },
  videos: {
    image: '/media/journal/clinic-tour.jpg',
    description: 'Patient video guides and Life at New Life footage.',
  },
  'why-choose-us': {
    image: null,
    description: 'Core clinic highlights and why patients trust New Life.',
  },
  blog: {
    image: '/media/journal/kist-collaboration.jpg',
    description: 'Featured clinical health journal updates and articles.',
  },
  faq: {
    image: '/media/home/faq-question-demo.jpg',
    description: 'Frequently asked patient questions and direct enquiry form.',
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
    <div className="space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-lg font-semibold text-ink tracking-tight">
              Homepage Content & Sections
            </h1>
            <span className="rounded-md border border-line bg-panel px-2 py-0.5 text-xs text-muted">
              {homepageSections.length} sections
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">
            Toggle which content blocks are visible to visitors on the public
            homepage, or edit their copy.
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-line bg-canvas px-3 py-1.5 text-xs font-medium text-muted hover:border-action hover:text-action shadow-2xs transition-colors self-start sm:self-auto"
        >
          <span>View Public Homepage</span>
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
      </header>

      {status === 'homepage-saved' && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-800"
        >
          <span>✓</span>
          <span>Homepage section visibility updated successfully.</span>
        </div>
      )}

      {status === 'homepage-error' && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 p-3 text-xs font-semibold text-red-800"
        >
          <span>⚠</span>
          <span>Could not save visibility changes. Please try again.</span>
        </div>
      )}

      <ol className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {homepageSections.map((section, index) => (
          <li
            key={section.id}
            className="flex flex-col overflow-hidden rounded-xl border border-line bg-canvas shadow-2xs transition-all hover:border-action/40 hover:shadow-xs"
          >
            <div className="relative grid aspect-[16/8] place-items-center bg-panel">
              {previews[section.id].image ? (
                <Image
                  src={previews[section.id].image!}
                  alt=""
                  fill
                  sizes="(min-width:1280px) 360px, (min-width:640px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-action/60">
                  <span className="text-3xl font-extrabold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold">
                    Homepage Block
                  </span>
                </div>
              )}
              <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-ink shadow-2xs backdrop-blur-xs">
                Section #{index + 1}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h2 className="font-bold text-ink text-base">{section.label}</h2>
              <p className="mt-1 flex-1 text-xs text-muted leading-relaxed">
                {previews[section.id].description}
              </p>

              <div className="mt-4 border-t border-line/70 pt-3 flex flex-col gap-2.5">
                {'required' in section ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                    <span className="size-1.5 rounded-full bg-emerald-500"></span>
                    Always Visible (Core Hero)
                  </span>
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
                    className="inline-flex items-center gap-1 text-xs font-semibold text-action hover:underline"
                  >
                    <span>
                      {section.id === 'doctors'
                        ? 'Manage Doctor Cards'
                        : section.id === 'blog' || section.id === 'videos'
                          ? 'Manage Items'
                          : 'Edit Section Text'}
                    </span>
                    <span>→</span>
                  </Link>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
