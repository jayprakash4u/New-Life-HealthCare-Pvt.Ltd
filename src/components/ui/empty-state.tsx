import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid justify-items-center gap-3 rounded-lg border border-dashed border-line bg-raised px-6 py-12 text-center',
        className,
      )}
    >
      {icon && (
        <div className="mb-1 text-muted [&_svg]:size-8" aria-hidden="true">
          {icon}
        </div>
      )}
      <h2 className="text-lg font-semibold">{title}</h2>
      {description && (
        <p className="max-w-md text-sm text-muted">{description}</p>
      )}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
