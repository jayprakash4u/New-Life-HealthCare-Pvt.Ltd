import { cn } from '@/lib/cn';

export type ButtonVariant =
  'primary' | 'booking' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const variants = {
  primary:
    'bg-action text-on-action hover:bg-action-hover hover:text-on-action active:bg-action-active',
  booking:
    'bg-accent-strong text-on-accent hover:bg-accent-hover hover:text-on-accent active:bg-accent-active',
  secondary: 'bg-soft text-action hover:bg-soft-hover hover:text-action-hover',
  outline:
    'border-action bg-transparent text-action hover:bg-soft hover:text-action-hover',
  ghost: 'bg-transparent text-action hover:bg-soft hover:text-action-hover',
  danger: 'bg-negative text-on-action hover:bg-negative-hover',
} satisfies Record<ButtonVariant, string>;
const sizes = {
  sm: 'px-4 py-2',
  md: 'px-5 py-3',
  lg: 'min-h-13 px-6 py-4 text-base',
} satisfies Record<ButtonSize, string>;

export function buttonStyles(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
) {
  return cn(
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-transparent text-center text-sm leading-tight font-semibold no-underline transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  );
}

export const spinnerStyles =
  'inline-block size-[1em] shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none';
