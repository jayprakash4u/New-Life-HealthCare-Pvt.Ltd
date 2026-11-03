import { updateHomepageVisibility } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';
import type { HomepageKind } from '@/lib/homepage-visibility';

export function HomepageCheckbox({
  kind,
  id,
  title,
  visible,
}: {
  kind: HomepageKind;
  id: string;
  title: string;
  visible: boolean;
}) {
  return (
    <form
      action={updateHomepageVisibility.bind(null, kind, id)}
      className="flex flex-wrap items-center gap-2 text-sm"
    >
      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          name="homepage"
          defaultChecked={visible}
          aria-label={'Show ' + title + ' on homepage'}
          className="size-4 accent-action"
        />
        Show on homepage
      </label>
      <Button size="sm" variant="outline" type="submit">
        Save
      </Button>
    </form>
  );
}
