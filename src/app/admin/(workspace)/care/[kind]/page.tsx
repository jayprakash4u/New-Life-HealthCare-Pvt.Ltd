import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/admin-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addCare } from '../../../actions';

export default async function AddCarePage({
  params,
  searchParams,
}: {
  params: Promise<{ kind: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();
  const { kind } = await params;
  if (kind !== 'service' && kind !== 'treatment') notFound();
  const { status } = await searchParams;
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold">Add new {kind}</h1>
      <p className="mt-2 text-sm text-muted">
        Publishing creates the public page and adds it to the matching menu.
      </p>
      {status && (
        <p role="alert" className="mt-4 text-sm text-negative">
          {status === 'duplicate'
            ? 'That page address is already in use. Choose a different name.'
            : status === 'invalid'
              ? 'Enter a name with at least one English letter or number and add an overview.'
              : 'Could not publish. Check the image format and size, then try again.'}
        </p>
      )}
      <form
        action={addCare.bind(null, kind)}
        className="mt-6 grid gap-5 rounded-md border border-line bg-canvas p-5"
      >
        <div className="border-b border-line pb-4">
          <h2 className="font-semibold">Page details</h2>
          <p className="mt-1 text-sm text-muted">
            Add the name, overview, and image shown on the website.
          </p>
        </div>
        <label className="grid gap-2 text-sm font-medium">
          Page and navigation name
          <Input
            name="title"
            required
            maxLength={160}
            aria-describedby="care-name-hint"
          />
          <span id="care-name-hint" className="text-xs font-normal text-muted">
            This name appears in the website menu and at the top of the public
            page.
          </span>
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Overview
          <textarea
            name="body"
            required
            maxLength={12000}
            rows={6}
            className="rounded-sm border border-line p-3"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Image (optional, up to 4 MB)
          <Input
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Image description
          <Input name="imageAlt" maxLength={200} />
        </label>
        <Button type="submit" className="justify-self-start">
          Publish {kind}
        </Button>
      </form>
    </div>
  );
}
