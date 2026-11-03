'use client';

import * as Primitive from '@radix-ui/react-tooltip';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

export const TooltipProvider = Primitive.Provider;
export const Tooltip = Primitive.Root;
export const TooltipTrigger = Primitive.Trigger;

export function TooltipContent({
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
          'z-50 max-w-[min(18rem,calc(100vw-2rem))] rounded-md bg-ink px-3 py-2 text-xs text-on-action shadow-md',
          className,
        )}
      />
    </Primitive.Portal>
  );
}
