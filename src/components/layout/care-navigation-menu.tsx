'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from '@/components/ui/dropdown';
import { CareIllustration } from '@/components/ui/care-illustration';
import type { CareIconName } from '@/components/ui/care-icon';
import { HeaderArrow } from './header-icons';
import { cn } from '@/lib/cn';

type CareMenuItem = {
  label: string;
  href: string;
  description: string;
  illustration: CareIconName;
  detail: string;
};

export function CareNavigationMenu({
  label,
  items,
  triggerClassName,
}: {
  label: string;
  items: readonly CareMenuItem[];
  triggerClassName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex] ?? items[0];

  return (
    <Dropdown
      modal={false}
      onOpenChange={(open) => {
        if (open) setActiveIndex(0);
      }}
    >
      <DropdownTrigger
        className={cn(triggerClassName, 'data-[state=open]:bg-action-active')}
      >
        {label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="m3 6 5 5 5-5" />
        </svg>
      </DropdownTrigger>
      <DropdownContent
        align="start"
        sideOffset={0}
        className="w-[min(56rem,calc(100vw-2rem))] rounded-t-none border-t-[3px] border-t-action p-0"
      >
        <div className="grid min-h-80 grid-cols-[minmax(0,1fr)_17rem]">
          <div className="grid content-start grid-cols-2 gap-1 p-4">
            {items.map((item, index) => (
              <DropdownItem
                key={item.href}
                asChild
                onPointerMove={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className={cn(
                  'items-start px-4 py-4',
                  activeIndex === index && 'bg-soft text-action',
                )}
              >
                <Link
                  href={item.href}
                  className="flex min-w-0 items-start justify-between gap-3"
                >
                  <span>
                    <span className="block text-sm leading-snug font-semibold">
                      {item.label}
                    </span>
                    <span className="mt-1.5 block text-xs leading-relaxed font-normal text-muted">
                      {item.description}
                    </span>
                  </span>
                  <HeaderArrow className="mt-0.5 shrink-0 text-action" />
                </Link>
              </DropdownItem>
            ))}
          </div>
          <figure
            aria-hidden="true"
            data-testid="care-menu-preview"
            data-care={active.href}
            className="flex min-w-0 flex-col justify-center border-l border-line bg-soft px-6 py-5"
          >
            <CareIllustration kind={active.illustration} />
            <figcaption className="mt-3">
              <p className="text-base leading-snug font-semibold text-ink">
                {active.label}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {active.detail}
              </p>
            </figcaption>
          </figure>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}
