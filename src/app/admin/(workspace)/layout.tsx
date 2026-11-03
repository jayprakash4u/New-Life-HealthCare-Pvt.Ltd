import { requireAdmin } from '@/lib/admin-auth';
import { WorkspaceNavigation } from '@/components/admin/workspace-navigation';
import { getAdminPages } from '@/lib/added-care';
import { logoutAdmin } from '../actions';

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  return (
    <WorkspaceNavigation
      signOut={logoutAdmin}
      entries={(await getAdminPages())
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
