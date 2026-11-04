'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface ToastProps {
  message: string | null;
  onClose?: () => void;
  duration?: number;
}

export function Toast({ message, onClose, duration = 4500 }: ToastProps) {
  const [mounted, setMounted] = useState(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onCloseRef.current?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration]);

  if (!mounted || !message) return null;

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      className="fixed top-6 right-6 z-[99999] flex max-w-sm items-center gap-3 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-medium text-white shadow-2xl transition-all"
      style={{
        boxShadow:
          '0 20px 30px -10px rgba(6, 78, 59, 0.4), 0 10px 15px -5px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <div className="flex-1 text-left">
        <p className="font-semibold text-white leading-tight">Success</p>
        <p className="text-xs text-emerald-100 mt-0.5 leading-snug">{message}</p>
      </div>
      <button
        type="button"
        onClick={() => onCloseRef.current?.()}
        className="ml-2 -mr-1 inline-flex size-7 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-emerald-800 hover:text-white cursor-pointer"
        aria-label="Dismiss notification"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>,
    document.body,
  );
}
