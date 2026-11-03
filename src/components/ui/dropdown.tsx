'use client';

import * as Primitive from '@radix-ui/react-dropdown-menu';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

export const Dropdown = Primitive.Root;
export const DropdownTrigger = Primitive.Trigger;
export const DropdownGroup = Primitive.Group;

export function DropdownContent({
  className,
  sideOffset = 6,
  collisionPadding = 12,
  ...props
}: ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Portal>
      <Primitive.Content
        {...props}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(
          'z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-44 overflow-y-auto rounded-md border border-line bg-raised p-1 text-sm text-ink shadow-md',
          className,
        )}
      />
    </Primitive.Portal>
  );
}
export function DropdownItem({
  className,
  destructive,
  ...props
}: ComponentProps<typeof Primitive.Item> & { destructive?: boolean }) {
  return (
    <Primitive.Item
      {...props}
      className={cn(
        'flex min-h-11 cursor-default items-center gap-2 rounded-sm px-3 py-2 outline-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-soft data-highlighted:text-action',
        destructive &&
          'text-negative data-highlighted:bg-negative-soft data-highlighted:text-negative',
        className,
      )}
    />
  );
}
export function DropdownLabel({
  className,
  ...props
}: ComponentProps<typeof Primitive.Label>) {
  return (
    <Primitive.Label
      {...props}
      className={cn('px-3 py-2 text-xs font-semibold text-muted', className)}
    />
  );
}
export function DropdownSeparator({
  className,
  ...props
}: ComponentProps<typeof Primitive.Separator>) {
  return (
    <Primitive.Separator
      {...props}
      className={cn('my-1 h-px bg-line', className)}
    />
  );
}
