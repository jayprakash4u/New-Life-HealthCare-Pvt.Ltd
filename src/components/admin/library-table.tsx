'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { HomepageCheckbox } from './homepage-checkbox';
import { DataTablePagination, DataTableToolbar } from '@/components/ui/data-table-pagination';

export interface LibraryTableItem {
  id: string;
  title: string;
  detail: string;
  image: string;
  href: string;
}

interface LibraryTableProps {
  items: LibraryTableItem[];
  kind: 'gallery' | 'team' | 'videos';
  url: string;
  fromDoctors: boolean;
  visibilityMap?: Record<string, boolean>;
  onDelete: (kind: string, id: string, fromDoctors: boolean) => Promise<void>;
}

export function LibraryTable({
  items,
  kind,
  url,
  fromDoctors,
  visibilityMap = {},
  onDelete,
}: LibraryTableProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.detail.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q),
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
        pageSizeOptions={[10, 25, 50]}
        searchValue={search}
        onSearchChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        searchPlaceholder={`Search ${fromDoctors ? 'doctors' : kind}...`}
      />

      {/* Main Table */}
      <div className="overflow-hidden rounded-lg border border-line bg-canvas shadow-2xs">
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
              {paginatedItems.length === 0 ? (
                <tr>
                  <td
                    colSpan={kind === 'videos' || kind === 'team' ? 5 : 4}
                    className="px-4 py-8 text-center text-xs text-muted"
                  >
                    {search ? `No items match "${search}".` : 'No items found.'}
                  </td>
                </tr>
              ) : (
                paginatedItems.map((item) => {
                  const isVisibleOnHome = visibilityMap[item.id] ?? true;
                  return (
                    <tr
                      key={item.id}
                      className="transition-colors hover:bg-panel/30"
                    >
                      {/* Media & Title */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-md border border-line bg-panel">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt=""
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
                                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                  />
                                </svg>
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

                      {/* Detail / Category */}
                      <td className="px-4 py-3.5">
                        <span className="rounded bg-soft px-2 py-0.5 text-xs text-action font-medium line-clamp-1 max-w-[200px]">
                          {item.detail || 'General'}
                        </span>
                      </td>

                      {/* Homepage Checkbox */}
                      {(kind === 'videos' || kind === 'team') && (
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <HomepageCheckbox
                            kind={kind === 'team' ? 'doctor' : 'video'}
                            id={item.id}
                            title={item.title}
                            visible={isVisibleOnHome}
                          />
                        </td>
                      )}

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
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded border border-line bg-canvas px-2.5 py-1 text-xs text-muted hover:border-action hover:text-action transition-colors"
                          >
                            View ↗
                          </Link>
                          <Link
                            href={`${url}?edit=${item.id}`}
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
                                Delete
                              </Button>
                            </DialogTrigger>
                            <DialogContent
                              title="Delete Confirmation"
                              description={`Are you sure you want to delete "${item.title}"? This cannot be undone.`}
                              className="max-w-md"
                            >
                              <div className="flex justify-end gap-2 pt-4">
                                <DialogClose asChild>
                                  <Button variant="outline" size="sm">
                                    Cancel
                                  </Button>
                                </DialogClose>
                                <Button
                                  variant="primary"
                                  size="sm"
                                  disabled={deletingId === item.id}
                                  onClick={async () => {
                                    setDeletingId(item.id);
                                    await onDelete(kind, item.id, fromDoctors);
                                  }}
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                  {deletingId === item.id ? 'Deleting...' : 'Confirm Delete'}
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </td>
                    </tr>
                  );
                })
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

