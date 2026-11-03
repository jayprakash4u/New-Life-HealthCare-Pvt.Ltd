import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

export function Container({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className={cn(
        'mx-auto w-[calc(100%-2*var(--page-gutter))] max-w-[var(--container-max)]',
        className,
      )}
    />
  );
}
