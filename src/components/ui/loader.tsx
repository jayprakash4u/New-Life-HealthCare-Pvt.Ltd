import { cn } from '@/lib/cn';
import { spinnerStyles } from './button-styles';

const sizes = { sm: 'text-sm', md: 'text-xl', lg: 'text-3xl' };

export function Loader({
  label = 'Loading',
  size = 'md',
  className,
}: {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  return (
    <span
      role="status"
      className={cn(
        'inline-flex items-center justify-center text-action',
        sizes[size],
        className,
      )}
    >
      <span className={spinnerStyles} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
}
