import Link from 'next/link';
import { requireAdmin } from '@/lib/admin-auth';
import { getAdminPages } from '@/lib/added-care';
import { CareTable } from '@/components/admin/care-table';

export default async function AdminServicesPage() {
  await requireAdmin();
  const allPages = await getAdminPages();
  const services = allPages
    .filter((page) => page.group === 'Services')
    .map((p) => ({
      id: p.id,
      label: p.label,
      body: p.body,
      path: p.path,
      image: p.image,
      imageAlt: p.imageAlt,
    }));

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-lg font-semibold text-ink tracking-tight">
              Clinic Services
            </h1>
            <span className="rounded-md border border-line bg-panel px-2 py-0.5 text-xs text-muted">
              {services.length} {services.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">
            Manage pathology laboratory, ultrasound imaging, pharmacy, and
            clinic consultations.
          </p>
        </div>
        <Link
          href="/admin/care/service"
          className="inline-flex items-center justify-center gap-1.5 rounded-md bg-action px-3.5 py-2 text-xs font-medium text-white shadow-2xs transition-colors hover:bg-action/90 self-start sm:self-auto"
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
          <span>Add Service</span>
        </Link>
      </div>

      {/* Services DataTable */}
      <CareTable items={services} kind="service" />
    </div>
  );
}
