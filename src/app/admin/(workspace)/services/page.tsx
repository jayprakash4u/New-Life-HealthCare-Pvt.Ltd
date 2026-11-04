import Image from 'next/image';
import Link from 'next/link';
import { requireAdmin } from '@/lib/admin-auth';
import { getAdminPages } from '@/lib/added-care';

export default async function AdminServicesPage() {
  await requireAdmin();
  const allPages = await getAdminPages();
  const services = allPages.filter((page) => page.group === 'Services');

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

      {/* Services Directory Table */}
      <div className="overflow-hidden rounded-lg border border-line bg-canvas shadow-2xs">
        {services.length === 0 ? (
          <div className="p-8 text-center text-xs text-muted">
            No clinic services found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-line bg-panel/75 text-[11px] font-medium text-muted">
                  <th scope="col" className="px-4 py-3">
                    Service
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Overview
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Route
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {services.map((service) => (
                  <tr
                    key={service.id}
                    className="transition-colors hover:bg-panel/30"
                  >
                    {/* Media & Name */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-md border border-line bg-panel">
                          {service.image ? (
                            <Image
                              src={service.image}
                              alt={service.imageAlt || service.label}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-soft text-action">
                              <svg
                                className="size-5 opacity-60"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 max-w-[220px]">
                          <span className="block font-medium text-ink truncate">
                            {service.label}
                          </span>
                          <span className="block text-[11px] font-mono text-muted truncate">
                            {service.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Overview */}
                    <td className="px-4 py-3.5 max-w-sm">
                      <p className="line-clamp-2 text-muted text-xs leading-relaxed">
                        {service.body}
                      </p>
                    </td>

                    {/* Route */}
                    <td className="px-3 py-3.5 whitespace-nowrap">
                      <span className="rounded border border-line/80 bg-panel px-2 py-0.5 font-mono text-[11px] text-muted">
                        {service.path}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-3 py-3.5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700">
                        <span className="size-1.5 rounded-full bg-emerald-500"></span>
                        Published
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={service.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded border border-line bg-canvas px-2.5 py-1 text-xs text-muted hover:border-action hover:text-action transition-colors"
                        >
                          View ↗
                        </Link>
                        <Link
                          href={`/admin/pages/${service.id}`}
                          className="rounded bg-soft px-2.5 py-1 text-xs font-medium text-action hover:bg-action hover:text-white transition-colors"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
