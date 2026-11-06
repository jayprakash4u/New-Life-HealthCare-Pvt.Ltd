import Link from 'next/link';
import { useEffect, useRef, type ReactNode } from 'react';
import { contactConfig } from '@/config/contact';
import {
  HeaderCalendar,
  HeaderDoctors,
  HeaderHome,
  HeaderMessage,
} from './header-icons';
import styles from './mobile-actions.module.css';

export function MobileActions({
  children,
  pathname,
}: {
  children: ReactNode;
  pathname: string;
}) {
  const actionsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const actions = actionsRef.current;
    const viewport = window.visualViewport;
    if (!actions || !viewport) return;

    let inset = 0;
    function alignWithVisibleBottom() {
      if (!actions || !viewport) return;
      const bounds = actions.getBoundingClientRect();
      // Recover the unshifted bottom because the previous inset moves the bar.
      const visibleBottom = viewport.offsetTop + viewport.height;
      const nextInset =
        bounds.height > 0 && viewport.scale === 1
          ? Math.max(0, Math.round(bounds.bottom + inset - visibleBottom))
          : 0;
      if (nextInset === inset) return;
      inset = nextInset;
      actions.style.setProperty('--mobile-actions-inset', `${inset}px`);
    }

    alignWithVisibleBottom();
    viewport.addEventListener('resize', alignWithVisibleBottom);
    viewport.addEventListener('scroll', alignWithVisibleBottom);
    return () => {
      viewport.removeEventListener('resize', alignWithVisibleBottom);
      viewport.removeEventListener('scroll', alignWithVisibleBottom);
      actions.style.removeProperty('--mobile-actions-inset');
    };
  }, []);

  return (
    <nav
      ref={actionsRef}
      aria-label="Quick access"
      data-mobile-actions={pathname === '/' ? 'home' : ''}
      className={styles.actions}
    >
      <Link
        href="/"
        aria-current={pathname === '/' ? 'page' : undefined}
      >
        <HeaderHome />
        Home
      </Link>
      <Link
        href="/doctors"
        aria-current={pathname === '/doctors' ? 'page' : undefined}
      >
        <HeaderDoctors />
        Doctors
      </Link>
      <a
        href={contactConfig.whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp (opens in a new tab)"
        className={styles.chat}
      >
        <HeaderMessage />
        Chat
      </a>
      <Link href="/#plan-your-visit" aria-label="Book an appointment">
        <HeaderCalendar />
        Book Appt
      </Link>
      {children}
    </nav>
  );
}
