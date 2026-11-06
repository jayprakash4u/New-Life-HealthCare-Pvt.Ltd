'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { contactConfig } from '@/config/contact';
import {
  HeaderCalendar,
  HeaderDoctors,
  HeaderHome,
  HeaderMessage,
} from './header-icons';
import styles from './mobile-actions.module.css';

/**
 * Returns the height of the on-screen keyboard in pixels.
 *
 * On browsers that expose the VisualViewport API we compare the layout
 * viewport height (`window.innerHeight`) against the visible area
 * (`visualViewport.height` + `visualViewport.offsetTop`). The difference
 * is the amount of screen real estate hidden behind the keyboard.
 *
 * When the VisualViewport API is unavailable (older browsers, some test
 * runners, SSR) we fall back to 0 so the bar stays visible rather than
 * permanently hidden.
 */
function useKeyboardHeight(): number {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    let keyboard = 0;
    function measure() {
      if (!viewport) return;
      // Ignore pinch-zoom measurements — the offset is unreliable then.
      if (viewport.scale !== 1) {
        if (keyboard !== 0) {
          keyboard = 0;
          setHeight(0);
        }
        return;
      }
      // The visible bottom edge of the layout viewport.
      const visibleBottom = viewport.offsetTop + viewport.height;
      // The full layout viewport height (what the page can scroll within).
      const layoutBottom = window.innerHeight;
      const next = Math.max(0, Math.round(layoutBottom - visibleBottom));
      if (next !== keyboard) {
        keyboard = next;
        setHeight(next);
      }
    }

    viewport.addEventListener('resize', measure);
    viewport.addEventListener('scroll', measure);
    measure();

    return () => {
      viewport.removeEventListener('resize', measure);
      viewport.removeEventListener('scroll', measure);
    };
  }, []);

  return height;
}

export function MobileActions({
  children,
  pathname,
}: {
  children: ReactNode;
  pathname: string;
}) {
  const actionsRef = useRef<HTMLElement>(null);
  const keyboardHeight = useKeyboardHeight();
  const keyboardOpen = keyboardHeight > 0;

  useEffect(() => {
    const actions = actionsRef.current;
    if (!actions) return;

    // When the keyboard opens we want the bar to lift above it AND stay
    // visually hidden so it never overlaps focused form fields. We drive
    // both behaviours from a single CSS custom property so the transition
    // is smooth and jitter-free.
    const offset = keyboardOpen ? keyboardHeight : 0;
    actions.style.setProperty('--mobile-actions-offset', `${offset}px`);
    actions.style.setProperty(
      '--mobile-actions-opacity',
      keyboardOpen ? '0' : '1',
    );

    // Expose the keyboard state at the document level so the page layout can
    // drop its bottom content padding while the keyboard is open. This lets
    // the page scroll naturally so the focused input stays visible above the
    // keyboard instead of being squeezed behind the fixed bar.
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.keyboardOpen = keyboardOpen
        ? 'true'
        : 'false';
    }
  }, [keyboardHeight, keyboardOpen]);

  useEffect(
    () => () => {
      if (typeof document !== 'undefined') {
        delete document.documentElement.dataset.keyboardOpen;
      }
    },
    [],
  );

  return (
    <nav
      ref={actionsRef}
      aria-label="Quick access"
      data-mobile-actions={pathname === '/' ? 'home' : ''}
      data-keyboard-open={keyboardOpen ? 'true' : 'false'}
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