'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useKeyboardOffset } from '@/hooks/use-keyboard-offset';
import {
  contactLink,
  isNavigationActive,
  navigation,
  utilityNavigation,
  withAddedCare,
  type AddedCareLink,
} from '@/config/navigation';
import { contactConfig } from '@/config/contact';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import { ButtonLink } from '@/components/ui/button-link';
import { Container } from '@/components/ui/container';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { DesktopNavigation } from './desktop-navigation';
import { MobileActions } from './mobile-actions';
import styles from './site-header.module.css';
import {
  HeaderArrow,
  HeaderMessage,
  HeaderPhone,
  HeaderPin,
} from './header-icons';

export function SiteHeader({
  additions = [],
}: {
  additions?: readonly AddedCareLink[];
}) {
  const pathname = usePathname() ?? '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const compactMobileHeader = pathname === '/' || pathname === '/doctors';
  const menuTrigger = (
    <DrawerTrigger asChild>
      <Button className="gap-3 px-3.5" aria-label="Open navigation menu">
        <span className="text-sm">Menu</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden="true"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </Button>
    </DrawerTrigger>
  );
  return (
    <Drawer open={menuOpen} onOpenChange={setMenuOpen}>
      <a
        href="#main-content"
        className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-on-action focus:translate-y-0 focus:text-on-action"
      >
        Skip to content
      </a>
      <header
        className={cn(
          'sticky top-0 z-30 bg-canvas shadow-sm',
          pathname === '/' && 'max-sm:border-b max-sm:border-line',
        )}
      >
        <Container
          className={cn(
            'flex min-h-24 items-center justify-between gap-6 lg:min-h-29',
            compactMobileHeader && 'max-sm:min-h-20',
            pathname === '/' && 'max-sm:min-h-[4.25rem]',
          )}
        >
          <div
            className={cn(
              'flex shrink-0 items-center gap-7 py-2.5',
              pathname === '/' && 'max-sm:py-0',
            )}
          >
            <Link
              href="/"
              aria-label="New Life Health Care — home"
              className="shrink-0"
            >
              <Image
                src="/brand/new-life-logo-transparent.png"
                alt="New Life Health Care Pvt. Ltd."
                width={599}
                height={416}
                priority
                className={cn(
                  'h-auto w-28 lg:w-32',
                  compactMobileHeader && 'max-sm:w-24',
                )}
              />
            </Link>
            <p className="hidden border-l border-line py-2 pl-7 text-[17px] leading-snug font-medium text-ink xl:block">
              Health care,
              <br />
              <span className="text-muted">with you at the centre.</span>
            </p>
          </div>

          <div className="hidden flex-col items-end gap-2 py-3 lg:flex">
            <nav
              aria-label="Quick links"
              className="flex w-full items-center justify-end gap-5 border-b border-line pb-2 text-xs font-medium text-muted"
            >
              {utilityNavigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={
                    isNavigationActive(pathname, item.href) ? 'page' : undefined
                  }
                  className="py-1 hover:text-action aria-[current=page]:text-action"
                >
                  {item.label === 'Doctors' ? 'Find a doctor' : item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-7">
              <a
                href={contactConfig.phone.href}
                className="group flex min-h-14 items-center gap-3 text-ink hover:text-action"
              >
                <span className="flex size-11 items-center justify-center rounded-md bg-soft text-action">
                  <HeaderPhone />
                </span>
                <span>
                  <span className="mb-1 block text-[11px] text-muted">
                    Call for enquiries
                  </span>
                  <span className="block text-[17px] leading-tight font-semibold">
                    {contactConfig.phone.label}
                  </span>
                </span>
              </a>
              <span aria-hidden="true" className="h-10 w-px bg-line" />
              <a
                href={contactConfig.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp our team (opens in a new tab)"
                className="group flex min-h-14 items-center gap-3 text-ink hover:text-action"
              >
                <span className="flex size-11 items-center justify-center rounded-md bg-soft text-action">
                  <HeaderMessage />
                </span>
                <span>
                  <span className="mb-1 block text-[11px] text-muted">
                    WhatsApp our team
                  </span>
                  <span className="block text-[17px] leading-tight font-semibold">
                    {contactConfig.whatsapp.label}
                  </span>
                </span>
              </a>
              <div className="hidden border-l border-line pl-7 xl:block">
                <p className="mb-1 flex items-center gap-2 text-xs text-muted">
                  <HeaderPin />
                  Visit us
                </p>
                <p className="text-sm font-semibold text-ink">
                  Imadol, Lalitpur
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <a
              href={contactConfig.phone.href}
              aria-label={`Call ${contactConfig.phone.label}`}
              className={cn(
                'inline-flex size-11 items-center justify-center rounded-md border border-line text-action hover:bg-soft',
                pathname === '/' &&
                  'max-sm:w-auto max-sm:gap-2 max-sm:border-action max-sm:bg-action max-sm:px-3 max-sm:text-on-action max-sm:hover:bg-action-hover',
              )}
            >
              <HeaderPhone />
              {pathname === '/' && (
                <span className="text-xs font-semibold sm:hidden">
                  Call clinic
                </span>
              )}
            </a>
            <DrawerContent
              side="left"
              title="Explore New Life"
              closeLabel="Close navigation menu"
              headingGraphic={
                <Image
                  src="/brand/new-life-logo-transparent.png"
                  alt="New Life Health Care"
                  width={90}
                  height={62}
                  className="h-auto w-20"
                />
              }
              className={styles.mobileDrawer}
              bodyClassName="px-5 pt-0 pb-5"
            >
              <nav aria-label="Mobile navigation">
                {withAddedCare(navigation, additions).map((item) =>
                  'children' in item ? (
                    <details
                      key={item.label}
                      className="group border-b border-line"
                    >
                      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 py-3 text-sm font-medium text-ink marker:content-none hover:text-action [&::-webkit-details-marker]:hidden">
                        {item.label}
                        <svg
                          className="text-action transition-transform group-open:rotate-180"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          aria-hidden="true"
                        >
                          <path d="m3 6 5 5 5-5" />
                        </svg>
                      </summary>
                      <div className="grid border-t border-line bg-panel px-3 py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMenuOpen(false)}
                            className="flex min-h-12 items-center justify-between gap-3 py-3 text-sm font-medium text-ink hover:text-action"
                          >
                            {child.label}
                            <HeaderArrow className="shrink-0 text-action" />
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={
                        isNavigationActive(pathname, item.href)
                          ? 'page'
                          : undefined
                      }
                      className={cn(
                        'flex min-h-12 items-center justify-between gap-3 border-b border-line py-3 text-sm font-medium hover:text-action',
                        isNavigationActive(pathname, item.href)
                          ? 'text-action'
                          : 'text-ink',
                      )}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
                <ButtonLink
                  href="/#plan-your-visit"
                  variant="booking"
                  onClick={() => setMenuOpen(false)}
                  className="mt-6 w-full justify-between"
                >
                  Book an appointment
                  <HeaderArrow />
                </ButtonLink>
                <ButtonLink
                  href={contactLink.href}
                  onClick={() => setMenuOpen(false)}
                  variant="outline"
                  className="mt-3 w-full justify-between"
                >
                  {contactLink.label}
                  <HeaderArrow />
                </ButtonLink>
              </nav>
              <div className="mt-6 grid gap-3 text-sm">
                <a
                  href={contactConfig.phone.href}
                  className="flex min-h-11 items-center gap-3 text-action"
                >
                  <HeaderPhone />
                  Call {contactConfig.phone.label}
                </a>
                <a
                  href={contactConfig.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-3 text-action"
                  aria-label="WhatsApp our team (opens in a new tab)"
                >
                  <HeaderMessage />
                  WhatsApp our team
                </a>
              </div>
            </DrawerContent>
          </div>
        </Container>
        <div className="hidden bg-action lg:block">
          <Container>
            <DesktopNavigation pathname={pathname} additions={additions} />
          </Container>
        </div>
        {!compactMobileHeader && (
          <div className="border-t border-line bg-panel lg:hidden">
            <Container className="flex min-h-9 items-center justify-between gap-3 text-[11px] font-medium text-muted">
              <span>Imadol, Lalitpur</span>
              <a
                href={contactConfig.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp us (opens in a new tab)"
                className="inline-flex min-h-9 items-center gap-2 text-action"
              >
                WhatsApp us
                <HeaderArrow />
              </a>
            </Container>
          </div>
        )}
      </header>
      <MobileActions pathname={pathname}>{menuTrigger}</MobileActions>
    </Drawer>
  );
}
