import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { requireAdmin } from '@/lib/admin-auth';
import { listEnquiries } from '@/lib/enquiries';
import { closeEnquiry } from '../../actions';

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  await requireAdmin();
  const { filter = 'all' } = await searchParams;
  const allEntries = await listEnquiries();

  const newCount = allEntries.filter(
    (e) => !e.resolved && !e.inProgress,
  ).length;
  const workingCount = allEntries.filter(
    (e) => !e.resolved && e.inProgress,
  ).length;
  const resolvedCount = allEntries.filter((e) => e.resolved).length;

  const filteredEntries = allEntries.filter((entry) => {
    if (filter === 'new') return !entry.resolved && !entry.inProgress;
    if (filter === 'working') return !entry.resolved && entry.inProgress;
    if (filter === 'resolved') return entry.resolved;
    return true;
  });

  const filterTabs = [
    { id: 'all', label: 'All Enquiries', count: allEntries.length },
    {
      id: 'new',
      label: 'New & Urgent',
      count: newCount,
      badgeColor: newCount > 0 ? 'bg-amber-100 text-amber-800' : undefined,
    },
    { id: 'working', label: 'In Progress', count: workingCount },
    { id: 'resolved', label: 'Resolved', count: resolvedCount },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-lg font-semibold text-ink tracking-tight">
              Patient Enquiries & Bookings
            </h1>
            {newCount > 0 && (
              <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                {newCount} needs follow-up
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-muted">
            Track inquiries, consultation appointment requests, and patient
            follow-up.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-line pb-3">
        {filterTabs.map((tab) => {
          const active = filter === tab.id;
          return (
            <Link
              key={tab.id}
              href={
                tab.id === 'all'
                  ? '/admin/enquiries'
                  : `/admin/enquiries?filter=${tab.id}`
              }
              className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                active
                  ? 'bg-action text-white shadow-xs'
                  : 'bg-canvas text-muted border border-line hover:border-action/40 hover:text-ink'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  active
                    ? 'bg-white/20 text-white'
                    : tab.badgeColor || 'bg-panel text-muted'
                }`}
              >
                {tab.count}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Enquiries Grid */}
      {filteredEntries.length === 0 ? (
        <div className="rounded-xl border border-line bg-canvas p-12 text-center">
          <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-soft text-action">
            <svg
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-ink text-base">
            No enquiries in this view
          </h3>
          <p className="mt-1 text-xs text-muted">
            There are no patient records currently matching the{' '}
            <span className="font-semibold">{filter}</span> status.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="flex flex-col justify-between rounded-xl border border-line bg-canvas p-5 shadow-2xs transition-all hover:border-action/40 hover:shadow-xs"
            >
              <div>
                {/* Status Bar */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-bold text-ink text-base">
                      {entry.name}
                    </h2>
                    <p className="mt-0.5 text-xs text-muted">
                      Source: {entry.source} ·{' '}
                      {new Date(entry.received).toLocaleString('en-NP', {
                        timeZone: 'Asia/Kathmandu',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      entry.resolved
                        ? 'bg-emerald-100 text-emerald-800'
                        : entry.inProgress
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {entry.resolved
                      ? '✓ Resolved'
                      : entry.inProgress
                        ? '⏳ In progress'
                        : '● New Enquiry'}
                  </span>
                </div>

                {/* Topic / Department */}
                <div className="mt-3 inline-block rounded-md bg-panel px-2.5 py-1 text-xs font-medium text-ink">
                  <span className="text-muted">Concern: </span>
                  <span className="font-semibold">{entry.topic}</span>
                </div>

                {/* Message Body */}
                <p className="mt-3 rounded-lg border border-line/60 bg-[#fbfdfc] p-3 text-xs leading-relaxed text-ink/90 whitespace-pre-wrap break-words">
                  {entry.message}
                </p>
              </div>

              {/* Patient Contact Links & Action Buttons */}
              <div className="mt-5 border-t border-line/70 pt-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={`tel:${entry.phone}`}
                      className="inline-flex items-center gap-1 rounded-md border border-line px-2.5 py-1.5 text-xs font-semibold text-action transition-colors hover:bg-soft"
                    >
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
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                      <span>{entry.phone}</span>
                    </a>

                    {entry.email && (
                      <a
                        href={`mailto:${entry.email}`}
                        className="inline-flex items-center gap-1 rounded-md border border-line px-2.5 py-1.5 text-xs font-semibold text-action transition-colors hover:bg-soft"
                      >
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
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                          />
                        </svg>
                        <span className="max-w-[140px] truncate">
                          {entry.email}
                        </span>
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {!entry.resolved && !entry.inProgress && (
                      <form action={closeEnquiry.bind(null, entry.id, true)}>
                        <Button type="submit" size="sm" variant="outline">
                          Start follow-up
                        </Button>
                      </form>
                    )}

                    {!entry.resolved && (
                      <form action={closeEnquiry.bind(null, entry.id, false)}>
                        <Button
                          size="sm"
                          type="submit"
                          className="bg-emerald-700 text-white hover:bg-emerald-800"
                        >
                          Mark resolved
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
