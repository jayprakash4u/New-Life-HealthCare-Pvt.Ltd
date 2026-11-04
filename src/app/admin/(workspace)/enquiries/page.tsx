import Link from 'next/link';
import { requireAdmin } from '@/lib/admin-auth';
import { listEnquiries } from '@/lib/enquiries';
import { closeEnquiry } from '../../actions';
import { EnquiriesTable } from '@/components/admin/enquiries-table';

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
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-lg font-semibold text-ink tracking-tight">
              Patient Enquiries & Bookings
            </h1>
            <span className="rounded-md border border-line bg-panel px-2 py-0.5 text-xs text-muted">
              {allEntries.length} {allEntries.length === 1 ? 'record' : 'records'}
            </span>
            {newCount > 0 && (
              <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                {newCount} needs follow-up
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-muted">
            Track inquiries, consultation appointment requests, and patient follow-up.
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

      {/* Enquiries List Table View */}
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
        <EnquiriesTable
          entries={filteredEntries}
          onAction={closeEnquiry}
        />
      )}
    </div>
  );
}
