import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
};

// Pass matching id, aria-describedby and aria-invalid to the nested control.
export function Field({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {required && <span> (required)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-negative" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
