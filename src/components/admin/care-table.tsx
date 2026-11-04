'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DataTablePagination, DataTableToolbar } from '@/components/ui/data-table-pagination';

export interface CareTableItem {
  id: string;
  label: string;
  body: string;
  path: string;
  image?: string;
  imageAlt?: string;
}

interface CareTableProps {
  items: CareTableItem[];
  kind: 'treatment' | 'service';
}

export function CareTable({ items, kind }: CareTableProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.body.toLowerCase().includes(q) ||
        item.path.toLowerCase().includes(q),
    );
  }, [items, search]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  return (
    <div className="space-y-3">
      {/* Table Toolbar: Page Size Selector on Left, Search Box on Right */}
      <DataTableToolbar
        pageSize={pageSize}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPage(1);
        }}
        pageSizeOptions={[5, 10, 20]}
        searchValue={search}
        onSearchChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        searchPlaceholder={`Search ${kind === 'treatment' ? 'treatments' : 'services'}...`}
      />

      {/* Main Table */}
      <div className="overflow-hidden rounded-lg border border-line bg-canvas shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-line bg-panel/75 text-[11px] font-medium text-muted">
                <th scope="col" className="px-4 py-3">
                  {kind === 'treatment' ? 'Treatment' : 'Service'}
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
              {paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-xs text-muted">
                    {search
                      ? `No ${kind === 'treatment' ? 'treatments' : 'services'} match "${search}".`
                      : `No ${kind === 'treatment' ? 'treatments' : 'services'} found.`}
                  </td>
                </tr>
              ) : (
                paginatedItems.map((item) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-panel/30"
                  >
                    {/* Media & Name */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-md border border-line bg-panel">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.imageAlt || item.label}
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
                                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 max-w-[220px]">
                          <span className="block font-medium text-ink truncate">
                            {item.label}
                          </span>
                          <span className="block text-[11px] font-mono text-muted truncate">
                            {item.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Overview */}
                    <td className="px-4 py-3.5 max-w-sm">
                      <p className="line-clamp-2 text-muted text-xs leading-relaxed">
                        {item.body}
                      </p>
                    </td>

                    {/* Route */}
                    <td className="px-3 py-3.5 whitespace-nowrap">
                      <span className="rounded border border-line/80 bg-panel px-2 py-0.5 font-mono text-[11px] text-muted">
                        {item.path}
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
                          href={item.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded border border-line bg-canvas px-2.5 py-1 text-xs text-muted hover:border-action hover:text-action transition-colors"
                        >
                          View ↗
                        </Link>
                        <Link
                          href={`/admin/pages/${item.id}`}
                          className="rounded bg-soft px-2.5 py-1 text-xs font-medium text-action hover:bg-action hover:text-white transition-colors"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls (Showing X to Y on left, Page Changer on right) */}
      <DataTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredItems.length}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
}

