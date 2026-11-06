import Link from 'next/link';
import { useEffect, useRef, type ReactNode } from 'react';
import { contactConfig } from '@/config/contact';
import {
  HeaderCalendar,
  HeaderDoctors,
  HeaderMessage,
  HeaderPhone,
} from './header-icons';
import styles from './home-mobile-actions.module.css';

export function HomeMobileActions({
  children,
  doctorsPage = false,
}: {
  children: ReactNode;
  doctorsPage?: boolean;
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
      data-home-mobile-actions={doctorsPage ? 'doctors' : 'home'}
      className={styles.actions}
    >
      <Link href="/doctors" aria-current={doctorsPage ? 'page' : undefined}>
        <HeaderDoctors />
        Doctors
      </Link>
      <Link href="/#plan-your-visit" aria-label="Book an appointment">
        <HeaderCalendar />
        Book Appt
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
      <a href={contactConfig.phone.href}>
        <HeaderPhone />
        Call Us
      </a>
      {children}
    </nav>
  );
}
