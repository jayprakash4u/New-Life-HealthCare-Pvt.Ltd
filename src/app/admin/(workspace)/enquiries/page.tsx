import { Button } from '@/components/ui/button';
import { requireAdmin } from '@/lib/admin-auth';
import { listEnquiries } from '@/lib/enquiries';
import { closeEnquiry } from '../../actions';

export default async function EnquiriesPage() {
  await requireAdmin();
  const entries = await listEnquiries();
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">Enquiries</h1>
      <p className="mt-2 text-sm text-muted">
        {entries.filter(({ resolved }) => !resolved).length} awaiting follow-up
      </p>
      <ul className="mt-6 grid gap-4 lg:grid-cols-2">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className="min-w-0 rounded-md border border-line bg-canvas p-5"
          >
            <div className="flex flex-wrap justify-between gap-2">
              <h2 className="font-semibold break-words">{entry.name}</h2>
              <span className="text-xs font-medium text-action">
                {entry.resolved
                  ? 'Resolved'
                  : entry.inProgress
                    ? 'In progress'
                    : 'New'}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">
              {entry.source} ·{' '}
              {new Date(entry.received).toLocaleString('en-NP', {
                timeZone: 'Asia/Kathmandu',
              })}
            </p>
            <p className="mt-3 text-sm font-medium">{entry.topic}</p>
            <p className="mt-1 text-sm whitespace-pre-wrap break-words">
              {entry.message}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <a href={`tel:${entry.phone}`} className="text-action underline">
                {entry.phone}
              </a>
              {entry.email && (
                <a
                  href={`mailto:${entry.email}`}
                  className="break-all text-action underline"
                >
                  {entry.email}
                </a>
              )}
              {!entry.resolved && !entry.inProgress && (
                <form action={closeEnquiry.bind(null, entry.id, true)}>
                  <Button type="submit" size="sm" variant="outline">
                    Start follow-up
                  </Button>
                </form>
              )}
              {!entry.resolved && (
                <form
                  action={closeEnquiry.bind(null, entry.id, false)}
                  className="ml-auto"
                >
                  <Button size="sm" variant="outline">
                    Mark resolved
                  </Button>
                </form>
              )}
            </div>
          </li>
        ))}
      </ul>
      {entries.length === 0 && (
        <p className="rounded-md border border-line bg-canvas p-5 text-sm text-muted">
          No enquiries yet.
        </p>
      )}
    </>
  );
}
