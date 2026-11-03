import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

const variants = {
  neutral: 'bg-panel text-muted',
  brand: 'bg-soft text-action',
  success: 'bg-positive-soft text-positive',
  warning: 'bg-caution-soft text-caution',
  danger: 'bg-negative-soft text-negative',
  info: 'bg-information-soft text-information',
};

type BadgeProps = ComponentProps<'span'> & {
  variant?: 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';
};

export function Badge({
  variant = 'neutral',
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={cn(
        'inline-flex items-center gap-1 rounded-sm px-2 py-1 text-xs leading-snug font-semibold',
        variants[variant],
        className,
      )}
    />
  );
}
