import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

export function Table({
  label,
  className,
  ...props
}: ComponentProps<'table'> & { label: string }) {
  return (
    <div
      className="w-full overflow-x-auto rounded-lg border border-line"
      role="region"
      aria-label={label}
      tabIndex={0}
    >
      <table
        {...props}
        className={cn('w-full border-collapse text-left text-sm', className)}
      />
    </div>
  );
}
export function TableCaption({
  className,
  ...props
}: ComponentProps<'caption'>) {
  return (
    <caption
      {...props}
      className={cn(
        'caption-bottom px-4 py-3 text-left text-sm text-muted',
        className,
      )}
    />
  );
}
export function TableHeader(props: ComponentProps<'thead'>) {
  return <thead {...props} />;
}
export function TableBody(props: ComponentProps<'tbody'>) {
  return <tbody {...props} />;
}
export function TableFooter(props: ComponentProps<'tfoot'>) {
  return <tfoot {...props} />;
}
export function TableRow({ className, ...props }: ComponentProps<'tr'>) {
  return (
    <tr
      {...props}
      className={cn(
        'border-b border-line last:border-b-0 hover:bg-panel',
        className,
      )}
    />
  );
}
export function TableHead({
  className,
  scope = 'col',
  ...props
}: ComponentProps<'th'>) {
  return (
    <th
      {...props}
      scope={scope}
      className={cn('bg-panel px-4 py-3 font-semibold text-ink', className)}
    />
  );
}
export function TableCell({ className, ...props }: ComponentProps<'td'>) {
  return <td {...props} className={cn('px-4 py-3 align-top', className)} />;
}
