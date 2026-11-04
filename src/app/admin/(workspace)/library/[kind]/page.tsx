import { HomepageCheckbox } from '@/components/admin/homepage-checkbox';
import { getHomepageVisibility } from '@/lib/homepage-visibility';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/admin-auth';
import { getLibraryItems } from '@/lib/content-library';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { treatments } from '@/config/treatments';
import { addDoctor, updateLibraryItem } from '../../../actions';

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
              {items.length} {items.length === 1 ? 'record' : 'records'}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">
            {kind === 'team'
              ? 'Manage doctor consultation profiles, specialties, and homepage placement.'
              : kind === 'videos'
                ? 'Manage clinic tours, patient care videos, and Life at New Life media.'
                : 'Manage facility photos and patient moments displayed in the gallery.'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {kind === 'team' && (
            <Link
              href={url + '?add=1'}
              className="inline-flex items-center gap-1.5 rounded-md bg-action px-3.5 py-2 text-xs font-medium text-white shadow-2xs hover:bg-action/90 transition-colors"
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span>Add Doctor</span>
            </Link>
          )}
          <Link
            className="rounded-md border border-line bg-canvas px-3 py-1.5 text-xs font-medium text-muted hover:border-action hover:text-action shadow-2xs transition-colors"
            href={'/admin/pages/' + section}
          >
            Edit Intro
          </Link>
        </div>
      </div>

      {status && (
        <div
          role="status"
          className={`flex items-center gap-2 rounded-md border px-3 py-2 text-xs ${
            status === 'error'
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}
        >
          <span>{status === 'error' ? '⚠' : '✓'}</span>
          <span>
            {status === 'homepage-saved'
              ? 'Homepage feature updated.'
              : status === 'saved'
                ? 'Changes published successfully.'
                : status === 'deleted'
                  ? 'Item removed from website.'
                  : 'Could not complete action. Please check the fields and image.'}
          </span>
        </div>
      )}

      {/* Add Doctor Form */}
      {kind === 'team' && add === '1' && (
        <form
          action={addDoctor.bind(null, fromDoctors)}
          className="rounded-lg border border-line bg-canvas p-5 shadow-2xs max-w-xl space-y-4"
        >
          <div className="border-b border-line pb-2.5">
            <h2 className="font-semibold text-ink text-sm">
              New Doctor Profile
            </h2>
            <p className="mt-0.5 text-xs text-muted">
              Add a consultant or medical specialist to the team directory.
            </p>
          </div>

          <label className="grid gap-1 text-xs font-medium text-ink">
            Full Name & Title
            <Input
              name="title"
              required
              maxLength={160}
              placeholder="e.g. Dr. Jane Doe, MBBS, MD"
            />
          </label>

          <label className="grid gap-1 text-xs font-medium text-ink">
            Specialty or Department
            <Input
              name="detail"
              required
              maxLength={240}
              placeholder="e.g. Consultant Gynecologist"
            />
          </label>

          <label className="grid gap-1 text-xs font-medium text-ink">
            Associated Department / Treatment
            <select
              name="careId"
              required
              defaultValue=""
              className="rounded-md border border-line p-2 text-xs bg-canvas text-ink"
            >
              <option value="" disabled>
                Select department
              </option>
              {treatments.map(({ id, title }) => (
                <option key={id} value={id}>
                  {title}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1 text-xs font-medium text-ink">
            Areas of Interest (one per line)
            <textarea
              name="interests"
              maxLength={500}
              rows={3}
              placeholder="e.g. Infertility Management&#10;High-risk Pregnancy"
              className="rounded-md border border-line p-2 text-xs bg-canvas text-ink"
            />
          </label>

          <label className="grid gap-1 text-xs font-medium text-ink">
            Doctor Photo (JPEG, PNG or WebP, up to 4 MB)
            <Input
              name="image"
              type="file"
              required
              accept="image/jpeg,image/png,image/webp"
            />
          </label>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="show-on-homepage"
              name="homepage"
              defaultChecked
              className="size-4 accent-action"
            />
            <label htmlFor="show-on-homepage" className="text-xs text-ink">
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

      {/* Directory Table */}
      <div className="overflow-hidden rounded-lg border border-line bg-canvas shadow-2xs">
        {items.length === 0 ? (
          <div className="p-8 text-center text-xs text-muted">
            No published items found in this section.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-line bg-panel/75 text-[11px] font-medium text-muted">
                  <th scope="col" className="px-4 py-3">
                    {kind === 'videos'
                      ? 'Video'
                      : kind === 'team'
                        ? 'Doctor Profile'
                        : 'Image'}
                  </th>
                  <th scope="col" className="px-4 py-3">
                    {kind === 'team' ? 'Specialty' : 'Category / Tag'}
                  </th>
                  {(kind === 'videos' || kind === 'team') && (
                    <th scope="col" className="px-4 py-3">
                      Show on Homepage
                    </th>
                  )}
                  <th scope="col" className="px-3 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {items.map((item) => {
                  const isFeatured = visibility?.get(item.id) ?? true;
                  return (
                    <tr
                      key={item.id}
                      className="transition-colors hover:bg-panel/30"
                    >
                      {/* Media & Title */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-md border border-line bg-panel">
                            <Image
                              src={item.image}
                              alt=""
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                            {kind === 'videos' && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                                <span className="flex size-4 items-center justify-center rounded-full bg-white/90 text-action text-[9px] shadow-2xs">
                                  ▶
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 max-w-[220px]">
                            <span className="block font-medium text-ink truncate">
                              {item.title}
                            </span>
                            <span className="block text-[11px] font-mono text-muted truncate">
                              {item.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category or Specialty */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="rounded bg-soft px-2 py-0.5 text-xs text-action font-medium">
                          {item.detail || 'General'}
                        </span>
                      </td>

                      {/* Homepage toggle */}
                      {(kind === 'videos' || kind === 'team') && (
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <HomepageCheckbox
                            kind={kind === 'team' ? 'doctor' : 'video'}
                            id={item.id}
                            title={item.title}
                            visible={isFeatured}
                          />
                        </td>
                      )}

                      {/* Status */}
                      <td className="px-3 py-3.5 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700">
                          <span className="size-1.5 rounded-full bg-emerald-500"></span>
                          Active
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            href={fromDoctors ? '/doctors' : item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded border border-line bg-canvas px-2.5 py-1 text-xs text-muted hover:border-action hover:text-action transition-colors"
                          >
                            View ↗
                          </Link>
                          <Link
                            href={url + '?edit=' + item.id}
                            className="rounded bg-soft px-2.5 py-1 text-xs font-medium text-action hover:bg-action hover:text-white transition-colors"
                          >
                            Edit
                          </Link>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-negative hover:bg-red-50 text-xs px-2 h-7"
                              >
                                Remove
                              </Button>
                            </DialogTrigger>
                            <DialogContent
                              title="Remove this item?"
                              description={`Remove “${item.title}” from the public website.`}
                            >
                              <form
                                action={updateLibraryItem.bind(
                                  null,
                                  kind,
                                  item.id,
                                  true,
                                  fromDoctors,
                                )}
                                className="flex justify-end gap-3"
                              >
                                <DialogClose asChild>
                                  <Button type="button" variant="outline">
                                    Cancel
                                  </Button>
                                </DialogClose>
                                <Button type="submit" variant="danger">
                                  Remove item
                                </Button>
                              </form>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
