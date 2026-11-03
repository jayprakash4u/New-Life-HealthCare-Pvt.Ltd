import Link from 'next/link';
import type { ComponentProps } from 'react';
import {
  buttonStyles,
  type ButtonVariant,
  type ButtonSize,
} from './button-styles';

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Exclude<ButtonVariant, 'danger'>;
  size?: ButtonSize;
};

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonLinkProps) {
  return <Link {...props} className={buttonStyles(variant, size, className)} />;
}
