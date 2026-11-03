'use client';

import * as Primitive from '@radix-ui/react-tabs';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/cn';

export const Tabs = Primitive.Root;
export function TabsList({
  className,
  ...props
}: ComponentProps<typeof Primitive.List>) {
  return (
    <Primitive.List
      {...props}
      className={cn(
        'flex flex-wrap gap-1 border-b border-line data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-[orientation=vertical]:border-r data-[orientation=vertical]:border-b-0',
        className,
      )}
    />
  );
}
export function TabsTrigger({
  className,
  ...props
}: ComponentProps<typeof Primitive.Trigger>) {
  return (
    <Primitive.Trigger
      {...props}
      className={cn(
        'min-h-11 rounded-t-md border-b-2 border-transparent px-4 py-3 text-sm font-medium text-muted hover:bg-panel disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-action data-[state=active]:text-action',
        className,
      )}
    />
  );
}
export function TabsContent({
  className,
  ...props
}: ComponentProps<typeof Primitive.Content>) {
  return <Primitive.Content {...props} className={cn('py-6', className)} />;
}
