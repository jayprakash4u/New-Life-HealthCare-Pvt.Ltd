import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

import { getAdminPages } from '@/lib/added-care';
import { findAdminPage } from '@/config/admin-pages';
import type { AddedCareLink } from '@/config/navigation';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const additions: AddedCareLink[] = (await getAdminPages())
    .filter(({ id }) => !findAdminPage(id))
    .map(({ title, path, body }) => ({
      label: title,
      href: path,
      description: body.slice(0, 90),
      detail: body.slice(0, 200),
      illustration: 'consultation',
    }));
  return (
    <div className="flex min-h-dvh flex-col max-lg:overflow-x-clip max-lg:pb-[calc(3.5rem+max(0.375rem,env(safe-area-inset-bottom)))]">
      <SiteHeader additions={additions} />
      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
