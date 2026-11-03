import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

const controlStyles =
  'min-h-11 w-full rounded-md border border-input bg-raised px-4 py-3 leading-snug text-ink placeholder:text-muted focus-visible:border-focus focus-visible:outline-1 focus-visible:-outline-offset-1 disabled:cursor-not-allowed disabled:bg-panel disabled:text-muted aria-invalid:border-negative';

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input {...props} className={cn(controlStyles, className)} />;
}

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return (
    <textarea
      {...props}
      className={cn(controlStyles, 'min-h-32 resize-y', className)}
    />
  );
}

export function Select({ className, ...props }: ComponentProps<'select'>) {
  return <select {...props} className={cn(controlStyles, className)} />;
}
