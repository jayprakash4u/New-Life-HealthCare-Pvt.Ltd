import type { ComponentProps } from 'react';
import {
  buttonStyles,
  spinnerStyles,
  type ButtonVariant,
  type ButtonSize,
} from './button-styles';

type ButtonProps = ComponentProps<'button'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  type = 'button',
  className,
  children,
  'aria-busy': ariaBusy,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || ariaBusy}
      className={buttonStyles(variant, size, className)}
    >
      {loading && <span className={spinnerStyles} aria-hidden="true" />}
      {children}
    </button>
  );
}
