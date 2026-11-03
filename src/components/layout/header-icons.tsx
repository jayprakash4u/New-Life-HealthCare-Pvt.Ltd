import type { ReactNode } from 'react';

function Icon({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
export function HeaderArrow({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </Icon>
  );
}
export function HeaderPhone() {
  return (
    <Icon>
      <path d="m8 3 3 5-3 2c1.3 2.6 3.4 4.7 6 6l2-3 5 3v3a2 2 0 0 1-2 2C10 21 3 14 3 5a2 2 0 0 1 2-2h3Z" />
    </Icon>
  );
}
export function HeaderMessage() {
  return (
    <Icon>
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5Z" />
      <path d="M8 11h9M8 14h5" />
    </Icon>
  );
}
export function HeaderPin() {
  return (
    <Icon>
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Icon>
  );
}
