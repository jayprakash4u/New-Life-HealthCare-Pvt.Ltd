import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

export function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className={cn('rounded-lg border border-line bg-raised', className)}
    />
  );
}
export function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cn('grid gap-2 p-6', className)} />;
}
export function CardTitle({ className, ...props }: ComponentProps<'h2'>) {
  return <h2 {...props} className={cn('text-lg font-semibold', className)} />;
}
export function CardDescription({ className, ...props }: ComponentProps<'p'>) {
  return <p {...props} className={cn('text-sm text-muted', className)} />;
}
export function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return <div {...props} className={cn('px-6 pb-6', className)} />;
}
export function CardFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className={cn(
        'flex flex-wrap items-center gap-3 border-t border-line px-6 py-4',
        className,
      )}
    />
  );
}
