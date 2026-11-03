import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type RadioProps = Omit<ComponentProps<'input'>, 'type' | 'children'> & {
  label: ReactNode;
};

export function Radio({ label, className, disabled, ...props }: RadioProps) {
  return (
    <label
      className={cn(
        'flex min-h-11 w-fit cursor-pointer items-center gap-3 text-sm',
        disabled && 'cursor-not-allowed opacity-50',
      )}
    >
      <input
        {...props}
        type="radio"
        disabled={disabled}
        className={cn('size-4 shrink-0 accent-action', className)}
      />
      <span>{label}</span>
    </label>
  );
}

export function RadioGroup({
  legend,
  className,
  children,
  ...props
}: ComponentProps<'fieldset'> & { legend: string }) {
  return (
    <fieldset
      {...props}
      className={cn('grid gap-1 border-0 p-0 disabled:opacity-50', className)}
    >
      <legend className="mb-2 text-sm font-semibold">{legend}</legend>
      {children}
    </fieldset>
  );
}
