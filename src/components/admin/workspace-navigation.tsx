'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Entry = { id: string; label: string; group: string };

const linkStyle =
  'flex min-h-10 items-center gap-3 rounded-md px-3 py-2 text-sm text-on-action focus-visible:outline-on-action hover:bg-on-action/15 hover:text-on-action aria-[current=page]:bg-action-active aria-[current=page]:font-semibold aria-[current=page]:text-on-action';

export function WorkspaceNavigation({
  entries,
  signOut,
  children,
}: {
  entries: readonly Entry[];
  signOut: () => Promise<void>;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const editorId = pathname.split('/')[3];
  const groups = [...new Set(entries.map(({ group }) => group))];
  const destinations = [
    {
      label: 'Home page',
      href: '/admin/home',
      active:
        pathname === '/admin/home' ||
        editorId === 'home' ||
        editorId === 'home-introduction',
      icon: '⌂',
    },
    {
      label: 'Enquiries',
      href: '/admin/enquiries',
      active: pathname === '/admin/enquiries',
      icon: '✉',
    },
    {
      label: 'Gallery',
      href: '/admin/library/gallery',
      active: pathname === '/admin/library/gallery' || editorId === 'gallery',
      icon: '▧',
    },
    {
      label: 'Doctors',
      href: '/admin/library/doctors',
      active: pathname === '/admin/library/doctors' || editorId === 'doctors',
      icon: '✚',
    },
    {
      label: 'Our Team',
      href: '/admin/library/team',
      active: pathname === '/admin/library/team' || editorId === 'team',
      icon: '♙',
    },
    {
      label: 'Videos',
      href: '/admin/library/videos',
      active: pathname === '/admin/library/videos' || editorId === 'videos',
      icon: '▷',
    },
    {
      label: 'Blogs',
      href: '/admin/blogs',
      active:
        pathname === '/admin/blogs' ||
        editorId === 'blogs' ||
        editorId?.startsWith('blog-'),
      icon: '▤',
    },
  ];
  const addService = pathname === '/admin/care/service';
  const addTreatment = pathname === '/admin/care/treatment';
  const current =
    (addService
      ? 'Add new service'
      : addTreatment
        ? 'Add new treatment'
        : undefined) ??
    destinations.find(({ active }) => active)?.label ??
    entries.find(({ id }) => id === editorId)?.label ??
    'Dashboard';
  const navigation = (
    <nav aria-label="Admin navigation" className="space-y-5 px-3 py-5">
      <div>
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-widest text-on-action">
          Overview
        </p>
        <Link
          href="/admin"
          aria-current={pathname === '/admin' ? 'page' : undefined}
          className={linkStyle}
        >
          <span aria-hidden className="text-on-action">
            ▦
          </span>{' '}
          Dashboard
        </Link>
      </div>
      <div>
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-widest text-on-action">
          Content
        </p>
        {destinations.map(({ label, href, active, icon }) => (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={linkStyle}
          >
            <span aria-hidden className="text-on-action">
              {icon}
            </span>{' '}
            {label}
          </Link>
        ))}
        {groups.map((group) => {
          const items = entries.filter((entry) => entry.group === group);
          const kind =
            group === 'Services'
              ? 'service'
              : group === 'Treatments'
                ? 'treatment'
                : null;
          const addHref = kind ? '/admin/care/' + kind : null;
          const adding = pathname === addHref;
          return (
            <details
              key={group}
              open={adding || items.some(({ id }) => editorId === id)}
            >
              <summary className="cursor-pointer rounded-md px-3 py-2.5 text-sm text-on-action hover:bg-on-action/15">
                {group}
              </summary>
              <ul className="ml-4 border-l border-on-action/25 pl-2">
                {addHref && (
                  <li>
                    <Link
                      href={addHref}
                      aria-current={adding ? 'page' : undefined}
                      className={linkStyle}
                    >
                      <span aria-hidden className="text-on-action">
                        +
                      </span>{' '}
                      Add new {kind}
                    </Link>
                  </li>
                )}
                {items.map(({ id, label }) => (
                  <li key={id}>
                    <Link
                      href={`/admin/pages/${id}`}
                      aria-current={editorId === id ? 'page' : undefined}
                      className={linkStyle}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          );
        })}
      </div>
    </nav>
  );
  const account = (
    <div className="border-t border-on-action/25 p-3">
      <Link href="/" className={linkStyle}>
        ↗ View live site
      </Link>
      <form action={signOut}>
        <button type="submit" className={`${linkStyle} w-full`}>
          Sign out
        </button>
      </form>
    </div>
  );
  return (
    <div className="min-h-dvh bg-panel lg:grid lg:grid-cols-[15.75rem_minmax(0,1fr)]">
      <aside className="bg-action text-on-action lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col">
        <Link
          href="/admin"
          className="hidden min-h-16 items-center gap-3 border-b border-on-action/25 px-4 py-3 lg:flex"
        >
          <Image
            src="/brand/new-life-health-care.png"
            alt=""
            width={599}
            height={416}
            className="h-auto w-16 shrink-0 rounded-sm bg-canvas p-1"
          />
          <span className="text-sm font-semibold">
            New Life Health Care
            <span className="block text-[10px] font-medium uppercase tracking-widest text-on-action">
              Admin panel
            </span>
          </span>
        </Link>
        <div
          key={pathname}
          className="hidden min-h-0 flex-1 overflow-y-auto lg:block"
        >
          {navigation}
        </div>
        <div className="hidden lg:block">{account}</div>
        <details key={`mobile-${pathname}`} className="lg:hidden">
          <summary className="flex cursor-pointer items-center gap-3 px-5 py-3 text-sm font-semibold">
            <Image
              src="/brand/new-life-health-care.png"
              alt=""
              width={599}
              height={416}
              className="h-auto w-16 shrink-0 rounded-sm bg-canvas p-1"
            />
            New Life admin menu
          </summary>
          {navigation}
          {account}
        </details>
      </aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-20 flex min-h-14 items-center justify-between gap-4 border-b border-line bg-canvas px-5 text-sm sm:px-7">
          <div className="flex min-w-0 items-center gap-2">
            <Link href="/admin" className="text-muted">
              Admin
            </Link>
            <span aria-hidden className="text-muted">
              ›
            </span>
            {(addService || addTreatment) && (
              <>
                <span className="hidden text-muted sm:inline">
                  {addService ? 'Services' : 'Treatments'}
                </span>
                <span aria-hidden className="hidden text-muted sm:inline">
                  ›
                </span>
              </>
            )}
            <span className="truncate font-medium">{current}</span>
          </div>
          <Link href="/" className="shrink-0 text-muted hover:text-action">
            View site ↗
          </Link>
        </header>
        <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
