import { getHomepageVisibility } from '@/lib/homepage-visibility';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/admin-auth';
import { getLibraryItems, type LibraryKind } from '@/lib/content-library';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { treatments } from '@/config/treatments';
import { addDoctor, updateLibraryItem } from '../../../actions';
import { LibraryTable } from '@/components/admin/library-table';

const labels = {
  gallery: 'Photo Gallery',
  team: 'Doctors & Specialists',
  videos: 'Video Showcase',
};

export default async function LibraryPage({
  params,
  searchParams,
}: {
  params: Promise<{ kind: string }>;
  searchParams: Promise<{ edit?: string; status?: string; add?: string }>;
}) {
  await requireAdmin();
  const { kind: section } = await params;
  const fromDoctors = section === 'doctors';
  const kind = fromDoctors ? 'team' : section;
  if (kind !== 'gallery' && kind !== 'team' && kind !== 'videos') notFound();
  const [items, { edit, status, add }] = await Promise.all([
    getLibraryItems(kind),
    searchParams,
  ]);
  const visibility =
    kind === 'videos' || kind === 'team'
      ? await getHomepageVisibility(
          kind === 'team' ? 'doctor' : 'video',
          items.map(({ id }) => id),
        )
      : undefined;
  const selected = items.find(({ id }) => id === edit);
  const url = '/admin/library/' + section;

  const visibilityMap: Record<string, boolean> = {};
  if (visibility) {
    for (const item of items) {
      visibilityMap[item.id] = visibility.get(item.id) ?? true;
    }
  }

  const handleDelete = async (
    itemKind: string,
    id: string,
    isFromDoctors: boolean,
  ) => {
    'use server';
    await updateLibraryItem(
      itemKind as LibraryKind,
      id,
      true,
      isFromDoctors,
      new FormData(),
    );
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-lg font-semibold text-ink tracking-tight">
              {fromDoctors ? 'Doctors & Specialists' : labels[kind]}
            </h1>
            <span className="rounded-md border border-line bg-panel px-2 py-0.5 text-xs text-muted">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">
            {kind === 'gallery' &&
              'Manage clinic photographs, consultation chambers, and facility showcases.'}
            {kind === 'team' &&
              'Manage medical doctor profiles, specialties, and outpatient consultation routing.'}
            {kind === 'videos' &&
              'Manage health guides, patient walkthroughs, and clinic video features.'}
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {kind === 'team' && (
            <Link
              href={add ? url : `${url}?add=1`}
              className="inline-flex items-center gap-1.5 rounded-md bg-action px-3 py-1.5 text-xs font-medium text-white shadow-2xs hover:bg-action/90 transition-colors"
            >
              <span>+ Add Doctor</span>
            </Link>
          )}
          <Link
            href={
              kind === 'gallery'
                ? '/gallery'
                : kind === 'team'
                  ? '/doctors'
                  : '/videos'
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-line bg-canvas px-3 py-1.5 text-xs font-medium text-muted hover:border-action hover:text-action shadow-2xs transition-colors"
          >
            <span>View Public Page</span>
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
        </div>
      </div>

      {/* Notifications */}
      {status === 'homepage-saved' && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-md bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs text-emerald-800"
        >
          <span>✓</span>
          <span>Homepage showcase updated.</span>
        </div>
      )}

      {status === 'saved' && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-md bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs text-emerald-800"
        >
          <span>✓</span>
          <span>Item details successfully updated.</span>
        </div>
      )}

      {status === 'added' && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-md bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs text-emerald-800"
        >
          <span>✓</span>
          <span>New doctor profile created and published.</span>
        </div>
      )}

      {status === 'deleted' && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-md bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs text-emerald-800"
        >
          <span>✓</span>
          <span>Item successfully removed.</span>
        </div>
      )}

      {/* Add New Doctor Form */}
      {add && kind === 'team' && (
        <form
          action={addDoctor.bind(null, fromDoctors)}
          className="rounded-lg border border-line bg-canvas p-5 shadow-2xs max-w-xl space-y-4"
        >
          <div className="border-b border-line pb-2.5">
            <h2 className="font-semibold text-ink text-sm">
              Add New Doctor Profile
            </h2>
            <p className="mt-0.5 text-xs text-muted">
              Publish a new clinician or specialist to the New Life team.
            </p>
          </div>

          <label className="grid gap-1 text-xs font-medium text-ink">
            Doctor Full Name
            <Input
              name="name"
              required
              maxLength={120}
              placeholder="e.g. Dr. Jane Doe, MBBS, MD"
            />
          </label>

          <label className="grid gap-1 text-xs font-medium text-ink">
            Clinical Specialty
            <Input
              name="specialty"
              required
              maxLength={160}
              placeholder="e.g. Consultant Gynecologist"
            />
          </label>

          <label className="grid gap-1 text-xs font-medium text-ink">
            Care Area Routing
            <select
              name="careId"
              required
              className="rounded-md border border-line bg-canvas px-3 py-2 text-xs text-ink focus:border-action focus:outline-none"
            >
              <option value="">Select clinical department</option>
              {treatments.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1 text-xs font-medium text-ink">
            Clinical Interests (one per line)
            <textarea
              name="interests"
              rows={3}
              placeholder="e.g. Infertility Management&#10;High-risk Pregnancy"
              className="rounded-md border border-line bg-canvas p-2.5 text-xs text-ink focus:border-action focus:outline-none"
            />
          </label>

          <label className="grid gap-1 text-xs font-medium text-ink">
            Doctor Photo (optional)
            <Input
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
            />
          </label>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="show-on-homepage"
              name="homepage"
              defaultChecked
              className="size-4 rounded border-line text-action focus:ring-action"
            />
            <label
              htmlFor="show-on-homepage"
              className="text-xs text-ink font-medium"
            >
              Show doctor on public homepage
            </label>
          </div>

          <div className="flex items-center gap-2.5 pt-3 border-t border-line">
            <Button type="submit" size="sm">
              Save Doctor
            </Button>
            <Link
              href={url}
              className="rounded-md border border-line px-3 py-1.5 text-xs text-muted hover:text-ink"
            >
              Cancel
            </Link>
          </div>
        </form>
      )}

      {/* Edit Selected Item Form */}
      {selected && (
        <form
          action={updateLibraryItem.bind(
            null,
            kind,
            selected.id,
            false,
            fromDoctors,
          )}
          className="rounded-lg border border-line bg-canvas p-5 shadow-2xs max-w-xl space-y-4"
        >
          <div className="border-b border-line pb-2.5">
            <h2 className="font-semibold text-ink text-sm">
              Edit {selected.title}
            </h2>
            <p className="mt-0.5 text-xs text-muted">
              Update information or replace cover media.
            </p>
          </div>

          <label className="grid gap-1 text-xs font-medium text-ink">
            {kind === 'team' ? 'Doctor Name' : 'Item Title'}
            <Input
              name="title"
              required
              maxLength={160}
              defaultValue={selected.title}
            />
          </label>

          <label className="grid gap-1 text-xs font-medium text-ink">
            {kind === 'gallery'
              ? 'Caption'
              : kind === 'team'
                ? 'Specialty'
                : 'Category / Tag'}
            <Input
              name="detail"
              maxLength={240}
              defaultValue={selected.detail}
            />
          </label>

          <label className="grid gap-1 text-xs font-medium text-ink">
            Replace {kind === 'videos' ? 'Thumbnail' : 'Photo'} (optional)
            <Input
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
            />
          </label>

          <div className="flex items-center gap-2.5 pt-3 border-t border-line">
            <Button type="submit" size="sm">
              Save Changes
            </Button>
            <Link
              href={url}
              className="rounded-md border border-line px-3 py-1.5 text-xs text-muted hover:text-ink"
            >
              Cancel
            </Link>
          </div>
        </form>
      )}

      {/* Directory DataTable with Pagination */}
      <LibraryTable
        items={items}
        kind={kind}
        url={url}
        fromDoctors={fromDoctors}
        visibilityMap={visibilityMap}
        onDelete={handleDelete}
      />
    </div>
  );
}
