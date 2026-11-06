'use client';

import * as Primitive from '@radix-ui/react-dialog';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type ModalContentProps = Omit<
  ComponentProps<typeof Primitive.Content>,
  'title' | 'aria-labelledby' | 'aria-describedby'
> & {
  title: string;
  description?: ReactNode;
  headingGraphic?: ReactNode;
  bodyClassName?: string;
  closeLabel?: string;
};

// Shared implementation keeps dialog and drawer focus/dismissal behavior aligned.
export function ModalContent({
  title,
  description,
  headingGraphic,
  bodyClassName,
  closeLabel = 'Close',
  children,
  className,
  presentation = 'dialog',
  side = 'right',
  ...props
}: ModalContentProps & {
  presentation?: 'dialog' | 'drawer';
  side?: 'left' | 'right';
}) {
  return (
    <Primitive.Portal>
      <Primitive.Overlay className="fixed inset-0 z-40 bg-ink/45" />
      <Primitive.Content
        {...(!description && { 'aria-describedby': undefined })}
        {...props}
        className={cn(
          'fixed z-50 flex flex-col overflow-hidden border border-line bg-raised text-ink shadow-xl',
          presentation === 'drawer'
            ? 'inset-y-0 w-[min(90vw,28rem)]'
            : 'top-1/2 left-1/2 max-h-[calc(100dvh-2rem)] w-[min(calc(100%-2rem),32rem)] -translate-x-1/2 -translate-y-1/2 rounded-lg',
          presentation === 'drawer' &&
            (side === 'right' ? 'right-0' : 'left-0'),
          className,
        )}
      >
        <div
          className={cn(
            'grid shrink-0 gap-2 border-b border-line p-6 pr-16',
            headingGraphic ? 'min-h-18 content-center px-5 py-2' : undefined,
          )}
        >
          {headingGraphic}
          <Primitive.Title
            className={headingGraphic ? 'sr-only' : 'text-xl font-semibold'}
          >
            {title}
          </Primitive.Title>
          {description && (
            <Primitive.Description className="text-sm text-muted">
              {description}
            </Primitive.Description>
          )}
        </div>
        <div
          className={cn(
            'min-h-0 overflow-y-auto overscroll-contain p-6',
            bodyClassName,
          )}
        >
          {children}
        </div>
        <Primitive.Close
          className="absolute top-3 right-3 inline-flex size-11 items-center justify-center rounded-md text-muted hover:bg-panel hover:text-ink"
          aria-label={closeLabel}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </Primitive.Close>
      </Primitive.Content>
    </Primitive.Portal>
  );
}
