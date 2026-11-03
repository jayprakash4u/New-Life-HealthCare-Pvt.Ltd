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

const labels = { gallery: 'Gallery', team: 'Our Team', videos: 'Videos' };

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
    kind === 'videos'
      ? await getHomepageVisibility(
          'video',
          items.map(({ id }) => id),
        )
      : undefined;
  const selected = items.find(({ id }) => id === edit);
  const url = '/admin/library/' + section;
  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">
            {fromDoctors ? 'Doctors' : labels[kind]}
          </h1>
          <p className="mt-2 text-sm text-muted">
            Manage the items shown on the public website.
          </p>
        </div>
        <Link
          className="text-sm font-medium text-action underline"
          href={'/admin/pages/' + section}
        >
          Edit page introduction
        </Link>
      </header>
      {status && (
        <p role="status" className="mt-4 text-sm text-action">
          {status === 'homepage-saved'
            ? 'Homepage visibility saved.'
            : status === 'saved'
              ? 'Changes published.'
              : status === 'deleted'
                ? 'Item removed from the public website.'
                : 'Could not save. Check the fields and image file.'}
        </p>
      )}
      {kind === 'team' && (
        <Link
          href={url + '?add=1'}
          className="mt-4 inline-flex rounded-md bg-action px-4 py-2 text-sm font-semibold text-on-action"
        >
          Add doctor
        </Link>
      )}
      {kind === 'team' && add === '1' && (
        <form
          action={addDoctor.bind(null, fromDoctors)}
          className="mt-6 grid max-w-2xl gap-4 rounded-md border border-line bg-canvas p-5"
        >
          <h2 className="font-semibold">New doctor profile</h2>
          <label className="grid gap-2 text-sm">
            Full name
            <Input name="title" required maxLength={160} />
          </label>
          <label className="grid gap-2 text-sm">
            Specialty
            <Input name="detail" required maxLength={240} />
          </label>
          <label className="grid gap-2 text-sm">
            Treatment for appointment selection
            <select
              name="careId"
              required
              defaultValue=""
              className="rounded-sm border border-line p-3"
            >
              <option value="" disabled>
                Select a treatment
              </option>
              {treatments.map(({ id, title }) => (
                <option key={id} value={id}>
                  {title}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            Areas of interest (optional, one per line)
            <textarea
              name="interests"
              maxLength={500}
              rows={3}
              className="rounded-sm border border-line p-3"
            />
          </label>
          <label className="grid gap-2 text-sm">
            Doctor photo (JPEG, PNG or WebP, up to 4 MB)
            <Input
              name="image"
              type="file"
              required
              accept="image/jpeg,image/png,image/webp"
            />
          </label>
          <div className="flex items-center gap-4">
            <Button type="submit">Publish doctor</Button>
            <Link href={url} className="text-sm text-action underline">
              Cancel
            </Link>
          </div>
        </form>
      )}
      {selected && (
        <form
          action={updateLibraryItem.bind(
            null,
            kind,
            selected.id,
            false,
            fromDoctors,
          )}
          className="mt-6 grid max-w-2xl gap-4 rounded-md border border-line bg-canvas p-5"
        >
          <h2 className="font-semibold">Edit {selected.title}</h2>
          <label className="grid gap-2 text-sm">
            Name or title
            <Input
              name="title"
              required
              maxLength={160}
              defaultValue={selected.title}
            />
          </label>
          <label className="grid gap-2 text-sm">
            {kind === 'gallery'
              ? 'Image description'
              : kind === 'team'
                ? 'Specialty'
                : 'Category'}
            <Input
              name="detail"
              maxLength={240}
              defaultValue={selected.detail}
            />
          </label>
          <label className="grid gap-2 text-sm">
            Replace {kind === 'videos' ? 'thumbnail' : 'photo'} (optional)
            <Input
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
            />
          </label>
          <div className="flex items-center gap-4">
            <Button type="submit">Publish changes</Button>
            <Link href={url} className="text-sm text-action underline">
              Cancel
            </Link>
          </div>
        </form>
      )}
      <section className="mt-6 rounded-md border border-line bg-canvas">
        <h2 className="border-b border-line px-5 py-4 font-semibold">
          Published items ({items.length})
        </h2>
        {items.length === 0 && (
          <p className="p-5 text-sm text-muted">No published items.</p>
        )}
        <ul className="divide-y divide-line">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center gap-4 p-4 sm:px-5"
            >
              <Image
                src={item.image}
                alt=""
                width={96}
                height={64}
                className="h-16 w-24 rounded-sm object-cover"
              />
              <div className="min-w-40 flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="mt-1 text-sm text-muted">{item.detail}</p>
              </div>
              {kind === 'videos' && (
                <HomepageCheckbox
                  kind="video"
                  id={item.id}
                  title={item.title}
                  visible={visibility?.get(item.id) ?? true}
                />
              )}
              <div className="flex items-center gap-4 text-sm">
                <Link
                  href={fromDoctors ? '/doctors' : item.href}
                  target="_blank"
                  className="text-action underline"
                  aria-label={'View ' + item.title}
                >
                  View
                </Link>
                <Link
                  href={url + '?edit=' + item.id}
                  className="text-action underline"
                  aria-label={'Edit ' + item.title}
                >
                  Edit
                </Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-negative"
                      aria-label={'Delete ' + item.title}
                    >
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    title="Remove this item?"
                    description={item.title}
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
                        Delete
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
