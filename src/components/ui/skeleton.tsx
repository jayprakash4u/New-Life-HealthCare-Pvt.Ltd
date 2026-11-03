import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

export function Skeleton({
  className,
  ...props
}: Omit<ComponentProps<'div'>, 'children' | 'aria-hidden'>) {
  return (
    <div
      {...props}
      aria-hidden="true"
      className={cn(
        'h-4 w-full animate-pulse rounded-sm bg-line motion-reduce:animate-none',
        className,
      )}
    />
  );
}
