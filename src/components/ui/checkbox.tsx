import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type CheckboxProps = Omit<ComponentProps<'input'>, 'type' | 'children'> & {
  label: ReactNode;
};

export function Checkbox({
  label,
  className,
  disabled,
  ...props
}: CheckboxProps) {
  return (
    <label
      className={cn(
        'flex min-h-11 w-fit cursor-pointer items-center gap-3 text-sm',
        disabled && 'cursor-not-allowed opacity-50',
      )}
    >
      <input
        {...props}
        type="checkbox"
        disabled={disabled}
        className={cn(
          'size-4 shrink-0 accent-action aria-invalid:outline-negative',
          className,
        )}
      />
      <span>{label}</span>
    </label>
  );
}
