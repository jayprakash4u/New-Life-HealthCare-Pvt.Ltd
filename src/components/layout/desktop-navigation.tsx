'use client';

import Link from 'next/link';
import {
  primaryNavigation,
  withAddedCare,
  type AddedCareLink,
  contactLink,
  isNavigationActive,
} from '@/config/navigation';
import { cn } from '@/lib/cn';
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from '@/components/ui/dropdown';
import { HeaderArrow } from './header-icons';
import { CareNavigationMenu } from './care-navigation-menu';

export function DesktopNavigation({
  pathname,
  additions = [],
}: {
  pathname: string;
  additions?: readonly AddedCareLink[];
}) {
  const itemClass =
    'inline-flex min-h-15 flex-1 items-center justify-center gap-2 border-b-[3px] border-transparent px-2 pt-[3px] text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-white xl:px-4 xl:text-[15px]';
  return (
    <nav aria-label="Main navigation" className="flex w-full items-stretch">
      {withAddedCare(primaryNavigation, additions).map((item) => {
        const active =
          isNavigationActive(pathname, item.href) ||
          (pathname !== contactLink.href &&
            'children' in item &&
            item.children.some((child) =>
              isNavigationActive(pathname, child.href),
            ));
        const className = cn(
          itemClass,
          active && 'border-white bg-action-active',
        );
        if ('menuLayout' in item && item.menuLayout === 'wide')
          return (
            <CareNavigationMenu
              key={item.label}
              label={item.label}
              items={item.children}
              triggerClassName={className}
            />
          );
        if ('children' in item)
          return (
            <Dropdown key={item.label} modal={false}>
              <DropdownTrigger
                className={cn(className, 'data-[state=open]:bg-action-active')}
              >
                {item.label}
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
                className="w-72 rounded-t-none border-t-[3px] border-t-action p-2"
              >
                {item.children.map((child) => (
                  <DropdownItem key={child.href} asChild className="px-3 py-3">
                    <Link
                      href={child.href}
                      aria-current={
                        isNavigationActive(pathname, child.href)
                          ? 'page'
                          : undefined
                      }
                      className="flex items-center justify-between gap-5"
                    >
                      <span>
                        <span className="block text-sm font-semibold">
                          {child.label}
                        </span>
                        <span className="mt-1 block text-xs font-normal text-muted">
                          {child.description}
                        </span>
                      </span>
                      <HeaderArrow className="shrink-0 text-action" />
                    </Link>
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>
          );
        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={
              isNavigationActive(pathname, item.href) ? 'page' : undefined
            }
            className={className}
          >
            {item.label}
          </Link>
        );
      })}
      <Link
        href={contactLink.href}
        aria-current={
          isNavigationActive(pathname, contactLink.href) ? 'page' : undefined
        }
        className={cn(
          itemClass,
          isNavigationActive(pathname, contactLink.href) &&
            'border-white bg-action-active',
        )}
      >
        {contactLink.label}
      </Link>
      <Link
        href="/#plan-your-visit"
        className="my-2 ml-3 inline-flex min-h-11 shrink-0 items-center justify-center gap-3 rounded-md bg-accent-strong px-4 text-sm font-semibold whitespace-nowrap text-on-accent hover:bg-accent-hover hover:text-on-accent focus-visible:outline-white"
      >
        Book an appointment
        <HeaderArrow />
      </Link>
    </nav>
  );
}
