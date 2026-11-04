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

export interface ArticleItem {
  id: string;
  title: string;
  category: string;
  image: string;
  href: string;
}

interface BlogsTableProps {
  articles: ArticleItem[];
  visibilityMap: Record<string, boolean>;
  onDelete: (id: string) => Promise<void>;
}

export function BlogsTable({ articles, visibilityMap, onDelete }: BlogsTableProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredArticles = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q),
    );
  }, [articles, search]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredArticles.slice(start, start + pageSize);
  }, [filteredArticles, currentPage, pageSize]);

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
        searchPlaceholder="Search articles by title or category..."
      />

      {/* Main Table */}
      <div className="overflow-hidden rounded-lg border border-line bg-canvas shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-line bg-panel/75 text-[11px] font-medium text-muted">
                <th scope="col" className="px-4 py-3">
                  Article
                </th>
                <th scope="col" className="px-4 py-3">
                  Category
                </th>
                <th scope="col" className="px-4 py-3">
                  Show on Homepage
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
              {paginatedArticles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-xs text-muted">
                    {search ? `No articles match "${search}".` : 'No published articles found.'}
                  </td>
                </tr>
              ) : (
                paginatedArticles.map((article) => {
                  const isFeatured = visibilityMap[article.id] ?? true;
                  return (
                    <tr
                      key={article.id}
                      className="transition-colors hover:bg-panel/30"
                    >
                      {/* Media & Title */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="relative h-11 w-16 shrink-0 overflow-hidden rounded-md border border-line bg-panel">
                            <Image
                              src={article.image}
                              alt=""
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0 max-w-[280px]">
                            <span className="block font-medium text-ink truncate">
                              {article.title}
                            </span>
                            <span className="block text-[11px] font-mono text-muted truncate">
                              /blogs/{article.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="rounded bg-soft px-2 py-0.5 text-xs text-action font-medium">
                          {article.category}
                        </span>
                      </td>

                      {/* Homepage toggle */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <HomepageCheckbox
                          kind="blog"
                          id={article.id}
                          title={article.title}
                          visible={isFeatured}
                        />
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
                            href={article.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded border border-line bg-canvas px-2.5 py-1 text-xs text-muted hover:border-action hover:text-action transition-colors"
                          >
                            View ↗
                          </Link>
                          <Link
                            href={`/admin/pages/blog-${article.id}`}
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
                              title="Delete Article"
                              description={`Are you sure you want to remove "${article.title}"? This cannot be undone.`}
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
                                  disabled={deletingId === article.id}
                                  onClick={async () => {
                                    setDeletingId(article.id);
                                    await onDelete(article.id);
                                  }}
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                  {deletingId === article.id ? 'Deleting...' : 'Confirm Delete'}
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
        totalItems={filteredArticles.length}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
}

