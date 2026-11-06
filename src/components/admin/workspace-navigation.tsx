'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type Entry = { id: string; label: string; group: string };

interface WorkspaceNavigationProps {
  entries: readonly Entry[];
  signOut: () => Promise<void>;
  pendingEnquiries?: number;
  children: React.ReactNode;
}

export function WorkspaceNavigation({
  entries,
  signOut,
  pendingEnquiries = 0,
  children,
}: WorkspaceNavigationProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const editorId = pathname.split('/')[3];

  const isCarePage = pathname.startsWith('/admin/care/');
  const isServicesPage =
    pathname === '/admin/services' ||
    (isCarePage && pathname.includes('/service')) ||
    (pathname.startsWith('/admin/pages/') && editorId?.startsWith('service-'));
  const isTreatmentsPage =
    pathname === '/admin/treatments' ||
    (isCarePage && pathname.includes('/treatment')) ||
    (pathname.startsWith('/admin/pages/') &&
      editorId?.startsWith('treatment-'));

  const navGroups = [
    {
      title: 'Overview',
      items: [
        {
          label: 'Dashboard',
          href: '/admin',
          active: pathname === '/admin',
          icon: (
            <svg
              className="size-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <rect width="7" height="7" x="3" y="3" rx="1.5" />
              <rect width="7" height="7" x="14" y="3" rx="1.5" />
              <rect width="7" height="7" x="14" y="14" rx="1.5" />
              <rect width="7" height="7" x="3" y="14" rx="1.5" />
            </svg>
          ),
        },
        {
          label: 'Patient Enquiries',
          href: '/admin/enquiries',
          active: pathname === '/admin/enquiries',
          badge: pendingEnquiries > 0 ? pendingEnquiries : undefined,
          icon: (
            <svg
              className="size-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          ),
        },
      ],
    },
    {
      title: 'Clinical Care',
      items: [
        {
          label: 'Doctors & Specialists',
          href: '/admin/library/doctors',
          active:
            pathname === '/admin/library/doctors' ||
            pathname === '/admin/library/team' ||
            editorId === 'doctors' ||
            editorId === 'team',
          icon: (
            <svg
              className="size-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 11v6m-3-3h6"
              />
            </svg>
          ),
        },
        {
          label: 'Clinic Services',
          href: '/admin/services',
          active: isServicesPage,
          icon: (
            <svg
              className="size-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          ),
        },
        {
          label: 'Medical Treatments',
          href: '/admin/treatments',
          active: isTreatmentsPage,
          icon: (
            <svg
              className="size-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
          ),
        },
      ],
    },
    {
      title: 'Website & Content',
      items: [
        {
          label: 'Homepage Builder',
          href: '/admin/home',
          active:
            pathname === '/admin/home' ||
            editorId === 'home' ||
            editorId === 'home-introduction',
          icon: (
            <svg
              className="size-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          ),
        },
        {
          label: 'Photo Gallery',
          href: '/admin/library/gallery',
          active:
            pathname === '/admin/library/gallery' ||
            pathname === '/admin/gallery' ||
            editorId === 'gallery',
          icon: (
            <svg
              className="size-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          ),
        },
        {
          label: 'Video Showcase',
          href: '/admin/library/videos',
          active: pathname === '/admin/library/videos' || editorId === 'videos',
          icon: (
            <svg
              className="size-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
              />
            </svg>
          ),
        },
        {
          label: 'Health Blogs & News',
          href: '/admin/blogs',
          active:
            pathname === '/admin/blogs' ||
            editorId === 'blogs' ||
            editorId?.startsWith('blog-'),
          icon: (
            <svg
              className="size-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          ),
        },
        {
          label: 'About Clinic Page',
          href: '/admin/pages/about',
          active: editorId === 'about',
          icon: (
            <svg
              className="size-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          ),
        },
      ],
    },
  ];

  // Derive current page title for breadcrumb
  let currentTitle = 'Dashboard';
  for (const group of navGroups) {
    const matched = group.items.find((item) => item.active);
    if (matched) {
      currentTitle = matched.label;
      break;
    }
  }
  if (pathname === '/admin/care/service') currentTitle = 'Add New Service';
  if (pathname === '/admin/care/treatment') currentTitle = 'Add New Treatment';
  if (editorId && !currentTitle) {
    const entry = entries.find((e) => e.id === editorId);
    if (entry) currentTitle = entry.label;
  }

  const navContent = (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-6 px-3 py-4">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="px-3 pb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              {group.title}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = item.active;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`group flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-medium transition-all ${
                      active
                        ? 'bg-action text-white shadow-xs'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`transition-colors ${
                          active
                            ? 'text-white'
                            : 'text-slate-400 group-hover:text-white'
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className="flex size-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white shadow-xs">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Account & Status */}
      <div className="border-t border-white/10 p-3">
        <div className="mb-2 rounded-lg bg-black/20 p-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-medium text-slate-300">
              Admin Portal Active
            </span>
          </div>
          <p className="mt-1 text-[10px] text-slate-400">
            Connected to clinic database
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-white/15 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <span>Live site</span>
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
          <form action={signOut} className="shrink-0">
            <button
              type="submit"
              title="Sign out of admin"
              className="flex items-center justify-center rounded-md border border-white/15 p-1.5 text-slate-300 transition-colors hover:bg-red-500/20 hover:text-red-300"
            >
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh bg-[#f8faf9] lg:grid lg:grid-cols-[16.5rem_minmax(0,1fr)]">
      {/* Desktop Sidebar */}
      <aside className="hidden border-r border-[#1a3834] bg-[#0d2825] text-white lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col">
        {/* Brand header */}
        <Link
          href="/admin"
          className="flex min-h-16 items-center gap-3 border-b border-white/10 px-5 py-4 transition-colors hover:bg-white/5"
        >
          <div className="relative size-9 overflow-hidden rounded-md bg-white p-1 shadow-xs">
            <Image
              src="/brand/new-life-logo-transparent.png"
              alt="New Life"
              fill
              className="object-contain p-0.5"
            />
          </div>
          <div className="min-w-0">
            <span className="block truncate text-xs font-bold tracking-tight text-white">
              New Life Health Care
            </span>
            <span className="inline-block rounded-xs bg-emerald-500/20 px-1.5 py-0.2 text-[9px] font-semibold tracking-wider text-emerald-300 uppercase">
              Management Portal
            </span>
          </div>
        </Link>

        {/* Scrollable Nav Items */}
        <div className="flex-1 overflow-y-auto">{navContent}</div>
      </aside>

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-col">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 flex min-h-14 items-center justify-between gap-4 border-b border-line bg-white/95 px-5 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-md border border-line p-1.5 text-ink transition-colors hover:bg-panel lg:hidden"
              aria-label="Open navigation menu"
            >
              <svg
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>

            {/* Breadcrumb pills */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-xs text-muted"
            >
              <Link
                href="/admin"
                className="font-medium transition-colors hover:text-action"
              >
                Admin
              </Link>
              <span aria-hidden className="text-slate-300">
                /
              </span>
              <span className="font-semibold text-ink">{currentTitle}</span>
            </nav>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-line bg-canvas px-3 py-1.5 text-xs font-semibold text-muted shadow-2xs transition-all hover:border-action hover:text-action"
            >
              <span>View Website</span>
              <svg
                className="size-3.5"
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

            <div className="hidden items-center gap-2 border-l border-line pl-3 sm:flex">
              <div className="flex size-7 items-center justify-center rounded-full bg-soft text-xs font-bold text-action">
                A
              </div>
              <div className="text-left text-xs">
                <span className="block font-semibold text-ink leading-tight">
                  Admin
                </span>
                <span className="block text-[10px] text-muted leading-tight">
                  Clinic Staff
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Slide-Over Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-72 bg-[#0d2825] text-white shadow-xl">
              <div className="flex min-h-16 items-center justify-between border-b border-white/10 px-5">
                <div className="flex items-center gap-2.5">
                  <div className="relative size-8 overflow-hidden rounded-md bg-white p-1">
                    <Image
                      src="/brand/new-life-logo-transparent.png"
                      alt="New Life"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-bold text-white">
                    New Life Admin
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-md p-1.5 text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  <svg
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="h-[calc(100%-4rem)] overflow-y-auto">
                {navContent}
              </div>
            </div>
          </div>
        )}

        {/* Page Content Body */}
        <main className="flex-1 px-5 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
