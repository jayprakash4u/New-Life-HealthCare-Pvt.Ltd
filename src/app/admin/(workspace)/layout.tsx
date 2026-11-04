import { requireAdmin } from '@/lib/admin-auth';
import { WorkspaceNavigation } from '@/components/admin/workspace-navigation';
import { getAdminPages } from '@/lib/added-care';
import { listEnquiries } from '@/lib/enquiries';
import { logoutAdmin } from '../actions';

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  const [pages, enquiries] = await Promise.all([
    getAdminPages(),
    listEnquiries().catch(() => []),
  ]);

  const pendingEnquiries = enquiries.filter((e) => !e.resolved).length;

  return (
    <WorkspaceNavigation
      signOut={logoutAdmin}
      pendingEnquiries={pendingEnquiries}
      entries={pages
        .filter(
          ({ group, id }) =>
            group !== 'Articles' &&
            id !== 'blogs' &&
            ![
              'gallery',
              'team',
              'videos',
              'doctors',
              'home',
              'home-introduction',
            ].includes(id),
        )
        .map(({ id, label, group }) => ({ id, label, group }))}
    >
      {children}
    </WorkspaceNavigation>
  );
}
