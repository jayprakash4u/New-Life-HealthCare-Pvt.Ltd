'use client';

import type { ComponentProps } from 'react';
import { Button } from './button';
import { cn } from '@/lib/cn';

type PaginationProps = Omit<ComponentProps<'nav'>, 'children'> & {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

export function Pagination({
  page,
  totalPages,
  onPageChange,
  disabled = false,
  className,
  'aria-label': ariaLabel = 'Pagination',
  ...props
}: PaginationProps) {
  if (
    !Number.isSafeInteger(totalPages) ||
    totalPages < 0 ||
    !Number.isSafeInteger(page) ||
    page < 1 ||
    page > Math.max(1, totalPages)
  ) {
    throw new RangeError(
      'Pagination requires a nonnegative integer totalPages and a page between 1 and max(1, totalPages).',
    );
  }
  const pages =
    totalPages === 0
      ? []
      : [...new Set([1, totalPages, page - 1, page, page + 1])]
          .filter((value) => value >= 1 && value <= totalPages)
          .sort((a, b) => a - b);
  return (
    <nav
      {...props}
      aria-label={ariaLabel}
      className={cn('flex flex-wrap items-center gap-1', className)}
    >
      <Button
        variant="outline"
        size="sm"
        disabled={disabled || page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>
      {pages.flatMap((value, index) => [
        ...(index > 0 && value - pages[index - 1] > 1
          ? [
              <span key={`gap-${value}`} aria-hidden="true">
                …
              </span>,
            ]
          : []),
        <Button
          key={value}
          size="sm"
          variant={page === value ? 'primary' : 'ghost'}
          aria-label={`Page ${value}`}
          aria-current={page === value ? 'page' : undefined}
          disabled={disabled}
          onClick={() => {
            if (value !== page) onPageChange(value);
          }}
        >
          {value}
        </Button>,
      ])}
      {totalPages === 0 && (
        <span className="px-3 text-sm text-muted">No pages</span>
      )}
      <Button
        variant="outline"
        size="sm"
        disabled={disabled || page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </nav>
  );
}
