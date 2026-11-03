import Link from 'next/link';
import { getAdminPages } from '@/lib/added-care';
import { requireAdmin } from '@/lib/admin-auth';
import { getPublishedArticles } from '@/lib/admin-content';

const shortcuts = [
  {
    label: 'Edit homepage',
    href: '/admin/pages/home',
    description: 'Update the main heading and welcome copy.',
  },
  {
    label: 'Edit clinic information',
    href: '/admin/pages/about',
    description: 'Update the director’s message.',
  },
  {
    label: 'View public website',
    href: '/',
    description: 'Review the published site.',
  },
];

export default async function AdminDashboard() {
  await requireAdmin();
  const adminPages = await getAdminPages();
  const articleCount = (await getPublishedArticles()).length;
  const groups = [...new Set(adminPages.map((page) => page.group))];

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-sm text-muted">
        Choose a page from the admin menu to edit and publish its content.
      </p>
      <dl className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {groups.map((group) => (
          <div
            key={group}
            className="rounded-md border border-line bg-canvas p-5 shadow-xs"
          >
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
              {group}
            </dt>
            <dd className="mt-4 text-3xl font-semibold text-ink">
              {group === 'Articles'
                ? articleCount
                : adminPages.filter((page) => page.group === group).length}
            </dd>
          </div>
        ))}
      </dl>
      <section
        aria-labelledby="admin-shortcuts"
        className="mt-6 rounded-md border border-line bg-canvas shadow-xs"
      >
        <h2
          id="admin-shortcuts"
          className="border-b border-line px-5 py-4 text-lg font-semibold"
        >
          Quick actions
        </h2>
        <ul className="divide-y divide-line">
          {shortcuts.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-panel"
              >
                <span>
                  <span className="block text-sm font-semibold text-ink">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    {item.description}
                  </span>
                </span>
                <span aria-hidden="true" className="text-action">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
