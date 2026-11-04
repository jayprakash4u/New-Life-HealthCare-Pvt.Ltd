'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

export interface DataTableToolbarProps {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
  createPageUrl?: (page: number, newPageSize?: number) => string;
  children?: ReactNode;
  className?: string;
}

export function DataTableToolbar({
  pageSize,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50],
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  createPageUrl,
  children,
  className = '',
}: DataTableToolbarProps) {
  return (
    <div
      className={`flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      {/* Left side: Per Page Selector */}
      <div className="flex items-center gap-2 text-xs text-muted">
        <span>Show</span>
        <select
          aria-label="Rows per page"
          value={pageSize}
          onChange={(e) => {
            const newSize = Number(e.target.value);
            if (createPageUrl) {
              window.location.href = createPageUrl(1, newSize);
            } else {
              onPageSizeChange(newSize);
            }
          }}
          className="rounded-md border border-line bg-canvas px-2.5 py-1.5 text-xs text-ink focus:border-action focus:outline-none"
        >
          {pageSizeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span>entries per page</span>
      </div>

      {/* Right side: Search Box and Optional Extra Controls */}
      <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
        {children}
        {onSearchChange && (
          <div className="relative w-full sm:w-64">
            <input
              type="search"
              value={searchValue ?? ''}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-md border border-line bg-canvas py-1.5 pr-8 pl-8 text-xs text-ink placeholder:text-muted focus:border-action focus:outline-none"
            />
            <svg
              className="pointer-events-none absolute top-2 left-2.5 size-3.5 text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            {searchValue && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute top-1.5 right-2 size-4 text-muted hover:text-ink cursor-pointer"
                title="Clear search"
              >
                ×
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export interface DataTablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  showPageSize?: boolean;
  createPageUrl?: (page: number, newPageSize?: number) => string;
  useUrlParams?: boolean;
  className?: string;
}

export function DataTablePagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50],
  showPageSize = false,
  createPageUrl,
  useUrlParams = false,
  className = '',
}: DataTablePaginationProps) {
  const pagesCount = Math.max(1, totalPages);
  const activePage = Math.max(1, Math.min(currentPage, pagesCount));
  const startItem = totalItems === 0 ? 0 : (activePage - 1) * pageSize + 1;
  const endItem = Math.min(activePage * pageSize, totalItems);

  // Generate page numbers with ellipses
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (pagesCount <= 7) {
      for (let i = 1; i <= pagesCount; i++) pages.push(i);
    } else {
      pages.push(1);
      if (activePage > 3) pages.push('...');
      const start = Math.max(2, activePage - 1);
      const end = Math.min(pagesCount - 1, activePage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (activePage < pagesCount - 2) pages.push('...');
      pages.push(pagesCount);
    }
    return pages;
  };

  const getUrl = (pageNum: number, newSize?: number) => {
    if (createPageUrl) {
      return createPageUrl(pageNum, newSize);
    }
    if (newSize) {
      return `?page=${pageNum}&pageSize=${newSize}`;
    }
    return `?page=${pageNum}`;
  };

  const isUrlMode = useUrlParams || !!createPageUrl;

  return (
    <div
      className={`flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between text-xs text-muted ${className}`}
    >
      {/* Left: Entries Counter (and optional Page Size Selector if enabled) */}
      <div className="flex flex-wrap items-center gap-3">
        <span>
          Showing <span className="font-semibold text-ink">{startItem}</span> to{' '}
          <span className="font-semibold text-ink">{endItem}</span> of{' '}
          <span className="font-semibold text-ink">{totalItems}</span> entries
        </span>

        {showPageSize && pageSizeOptions && pageSizeOptions.length > 1 && (
          <div className="flex items-center gap-1.5 border-l border-line pl-3">
            <span>Show</span>
            {isUrlMode ? (
              <select
                aria-label="Rows per page"
                value={pageSize}
                onChange={(e) => {
                  const newSize = Number(e.target.value);
                  window.location.href = getUrl(1, newSize);
                }}
                className="rounded border border-line bg-canvas px-2 py-1 text-xs text-ink focus:border-action focus:outline-none"
              >
                {pageSizeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <select
                aria-label="Rows per page"
                value={pageSize}
                onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
                className="rounded border border-line bg-canvas px-2 py-1 text-xs text-ink focus:border-action focus:outline-none"
              >
                {pageSizeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}
            <span>per page</span>
          </div>
        )}
      </div>

      {/* Right: Page changer (Previous, 1, 2, 3... Next) kept on the right side below */}
      <nav aria-label="Table navigation" className="ml-auto flex items-center justify-end gap-1">
        {/* Previous Button */}
        {isUrlMode ? (
          <Link
            href={getUrl(Math.max(1, activePage - 1))}
            aria-disabled={activePage <= 1}
            tabIndex={activePage <= 1 ? -1 : undefined}
            className={`inline-flex items-center gap-1 rounded-md border border-line px-2.5 py-1.5 text-xs font-medium transition-colors ${
              activePage <= 1
                ? 'pointer-events-none opacity-40 bg-panel text-muted'
                : 'bg-canvas text-ink hover:border-action/40 hover:bg-panel'
            }`}
          >
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span>Previous</span>
          </Link>
        ) : (
          <button
            type="button"
            disabled={activePage <= 1}
            onClick={() => onPageChange?.(activePage - 1)}
            className="inline-flex items-center gap-1 rounded-md border border-line bg-canvas px-2.5 py-1.5 text-xs font-medium text-ink transition-colors hover:border-action/40 hover:bg-panel disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
          >
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span>Previous</span>
          </button>
        )}

        {/* Page Number Buttons: 1, 2, 3... */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((pageItem, index) => {
            if (pageItem === '...') {
              return (
                <span key={`ellipsis-${index}`} className="px-2 text-muted select-none">
                  …
                </span>
              );
            }

            const pageNum = Number(pageItem);
            const isActive = activePage === pageNum;

            if (isUrlMode) {
              return (
                <Link
                  key={pageNum}
                  href={getUrl(pageNum)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`inline-flex min-w-[2rem] items-center justify-center rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-action text-white shadow-2xs'
                      : 'border border-line bg-canvas text-ink hover:bg-panel hover:text-action'
                  }`}
                >
                  {pageNum}
                </Link>
              );
            }

            return (
              <button
                key={pageNum}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                disabled={isActive}
                onClick={() => onPageChange?.(pageNum)}
                className={`inline-flex min-w-[2rem] items-center justify-center rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-action text-white shadow-2xs cursor-default'
                    : 'border border-line bg-canvas text-ink hover:bg-panel hover:text-action'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        {isUrlMode ? (
          <Link
            href={getUrl(Math.min(pagesCount, activePage + 1))}
            aria-disabled={activePage >= pagesCount}
            tabIndex={activePage >= pagesCount ? -1 : undefined}
            className={`inline-flex items-center gap-1 rounded-md border border-line px-2.5 py-1.5 text-xs font-medium transition-colors ${
              activePage >= pagesCount
                ? 'pointer-events-none opacity-40 bg-panel text-muted'
                : 'bg-canvas text-ink hover:border-action/40 hover:bg-panel'
            }`}
          >
            <span>Next</span>
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        ) : (
          <button
            type="button"
            disabled={activePage >= pagesCount}
            onClick={() => onPageChange?.(activePage + 1)}
            className="inline-flex items-center gap-1 rounded-md border border-line bg-canvas px-2.5 py-1.5 text-xs font-medium text-ink transition-colors hover:border-action/40 hover:bg-panel disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
          >
            <span>Next</span>
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        )}
      </nav>
    </div>
  );
}
