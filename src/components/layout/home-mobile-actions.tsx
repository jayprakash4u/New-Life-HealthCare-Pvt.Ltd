import Link from 'next/link';
import type { ReactNode } from 'react';
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
  return (
    <nav
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
