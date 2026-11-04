import Link from 'next/link';
import { getAdminPages } from '@/lib/added-care';
import { requireAdmin } from '@/lib/admin-auth';
import { getPublishedArticles } from '@/lib/admin-content';
import { listEnquiries } from '@/lib/enquiries';
import { getLibraryItems } from '@/lib/content-library';
import { closeEnquiry } from '../actions';
import { Button } from '@/components/ui/button';

export default async function AdminDashboard() {
  await requireAdmin();

  const [adminPages, articles, enquiries, doctors, gallery, videos] =
    await Promise.all([
      getAdminPages(),
      getPublishedArticles(),
      listEnquiries().catch(() => []),
      getLibraryItems('team').catch(() => []),
      getLibraryItems('gallery').catch(() => []),
      getLibraryItems('videos').catch(() => []),
    ]);

  const pendingEnquiries = enquiries.filter((e) => !e.resolved);
  const recentEnquiries = enquiries.slice(0, 5);

  const servicesCount = adminPages.filter((p) => p.group === 'Services').length;
  const treatmentsCount = adminPages.filter(
    (p) => p.group === 'Treatments',
  ).length;

  const stats = [
    {
      title: 'Patient Enquiries',
      value: enquiries.length,
      subtitle: `${pendingEnquiries.length} pending follow-up`,
      alert: pendingEnquiries.length > 0,
      href: '/admin/enquiries',
      icon: (
        <svg
          className="size-4 text-amber-700"
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
      iconBg: 'bg-amber-50 border-amber-200/60',
    },
    {
      title: 'Doctors & Specialists',
      value: doctors.length,
      subtitle: 'Active medical roster',
      href: '/admin/library/doctors',
      icon: (
        <svg
          className="size-4 text-teal-800"
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
        </svg>
      ),
      iconBg: 'bg-teal-50 border-teal-200/60',
    },
    {
      title: 'Services & Treatments',
      value: servicesCount + treatmentsCount,
      subtitle: `${servicesCount} services · ${treatmentsCount} treatments`,
      href: '/admin/services',
      icon: (
        <svg
          className="size-4 text-blue-800"
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
      iconBg: 'bg-blue-50 border-blue-200/60',
    },
    {
      title: 'Articles & Media',
      value: articles.length + gallery.length + videos.length,
      subtitle: `${articles.length} blogs · ${gallery.length} photos · ${videos.length} videos`,
      href: '/admin/blogs',
      icon: (
        <svg
          className="size-4 text-purple-800"
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
      iconBg: 'bg-purple-50 border-purple-200/60',
    },
  ];

  const quickActions = [
    {
      title: 'Doctors & Specialists',
      desc: 'Update consultation profiles, specialties, and homepage showcase.',
      href: '/admin/library/doctors',
    },
    {
      title: 'Clinical Services',
      desc: 'Browse, edit details, or publish a new medical clinic service.',
      href: '/admin/services',
    },
    {
      title: 'Medical Treatments',
      desc: 'Manage clinical procedures, disease treatments, and patient care guides.',
      href: '/admin/treatments',
    },
    {
      title: 'Homepage Sections',
      desc: 'Configure visible sections, hero banner headlines, and clinic intro.',
      href: '/admin/home',
    },
    {
      title: 'Health Blogs & Articles',
      desc: 'Publish clinical guidance, medical news, and patient education posts.',
      href: '/admin/blogs',
    },
    {
      title: 'Photo Gallery & Facilities',
      desc: 'Manage clinic facility photos and patient moments.',
      href: '/admin/library/gallery',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4">
        <div>
          <h1 className="text-lg font-semibold text-ink tracking-tight">
            Clinic Overview
          </h1>
          <p className="mt-0.5 text-xs text-muted">
            New Life Health Care polyclinic administrative management portal.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-canvas px-2.5 py-1 text-xs text-muted">
            <span className="size-1.5 rounded-full bg-emerald-500"></span>
            Database connected
          </span>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-action px-3 py-1 text-xs font-medium text-white hover:bg-action/90 shadow-2xs transition-colors"
          >
            Live Site ↗
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.title}
            href={stat.href}
            className="group relative flex flex-col justify-between rounded-lg border border-line bg-canvas p-4 shadow-2xs transition-colors hover:border-action/40"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-muted uppercase tracking-wider">
                {stat.title}
              </span>
              <span
                className={`flex size-7 items-center justify-center rounded border ${stat.iconBg}`}
              >
                {stat.icon}
              </span>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold tracking-tight text-ink">
                  {stat.value}
                </span>
                {stat.alert && (
                  <span className="rounded bg-amber-100 px-1.5 py-0.2 text-[10px] font-medium text-amber-800">
                    Follow-up needed
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-muted">{stat.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Main Grid: Recent Enquiries & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Recent Enquiries */}
        <div className="space-y-3 lg:col-span-7">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-ink">
                Recent Patient Enquiries
              </h2>
              <p className="text-xs text-muted">
                Latest messages received via appointment and contact forms
              </p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-medium text-action hover:underline"
            >
              View all ({enquiries.length}) →
            </Link>
          </div>

          <div className="overflow-hidden rounded-lg border border-line bg-canvas shadow-2xs">
            {recentEnquiries.length === 0 ? (
              <div className="p-8 text-center text-xs text-muted">
                No patient enquiries received yet.
              </div>
            ) : (
              <div className="divide-y divide-line">
                {recentEnquiries.map((enquiry) => (
                  <div
                    key={enquiry.id}
                    className="flex flex-col gap-2.5 p-3.5 sm:flex-row sm:items-center sm:justify-between hover:bg-panel/20 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-ink text-xs">
                          {enquiry.name}
                        </span>
                        <span
                          className={`rounded px-1.5 py-0.2 text-[10px] font-medium ${
                            enquiry.resolved
                              ? 'bg-emerald-100 text-emerald-800'
                              : enquiry.inProgress
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {enquiry.resolved
                            ? 'Resolved'
                            : enquiry.inProgress
                              ? 'In progress'
                              : 'New'}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted">
                        {enquiry.topic} ·{' '}
                        {new Date(enquiry.received).toLocaleDateString(
                          'en-NP',
                          {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          },
                        )}
                      </p>
                      <p className="mt-0.5 line-clamp-1 text-xs text-ink/80">
                        {enquiry.message}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <a
                        href={`tel:${enquiry.phone}`}
                        className="rounded border border-line bg-canvas px-2 py-1 text-xs text-muted hover:border-action hover:text-action transition-colors"
                      >
                        Call
                      </a>
                      {!enquiry.resolved && (
                        <form
                          action={closeEnquiry.bind(
                            null,
                            enquiry.id,
                            !enquiry.inProgress,
                          )}
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            type="submit"
                            className="text-xs h-7 px-2"
                          >
                            {enquiry.inProgress ? 'Mark resolved' : 'Follow up'}
                          </Button>
                        </form>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Quick Management Shortcuts */}
        <div className="space-y-3 lg:col-span-5">
          <div>
            <h2 className="text-sm font-semibold text-ink">Quick Shortcuts</h2>
            <p className="text-xs text-muted">
              Frequently accessed clinic sections
            </p>
          </div>

          <div className="space-y-2">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-center justify-between rounded-lg border border-line bg-canvas p-3 shadow-2xs transition-colors hover:border-action/40 hover:bg-panel/30"
              >
                <div className="min-w-0 pr-3">
                  <h3 className="text-xs font-medium text-ink group-hover:text-action transition-colors">
                    {action.title}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-muted line-clamp-1">
                    {action.desc}
                  </p>
                </div>
                <span className="text-muted text-xs group-hover:text-action transition-colors">
                  →
                </span>
              </Link>
            ))}
          </div>

          {/* System status note */}
          <div className="rounded-lg border border-line bg-panel/60 p-3 text-xs text-muted">
            <div className="flex justify-between items-center text-[11px]">
              <span>Storage:</span>
              <span className="font-mono text-ink">MySQL · 84.46.243.3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
