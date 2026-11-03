'use client';

import { useEffect, useRef, useState } from 'react';

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const autoplay = () => {
      if (preference.matches) video.pause();
      else
        void video.play().catch(() => {
          /* Keep the still image when autoplay is blocked. */
        });
    };
    autoplay();
    preference.addEventListener('change', autoplay);
    return () => {
      preference.removeEventListener('change', autoplay);
      video.pause();
    };
  }, []);

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    setMessage('');
    if (!video.paused) video.pause();
    else {
      try {
        await video.play();
      } catch {
        setMessage('The video could not play. Please try again.');
      }
    }
  }

  return (
    <div className="absolute inset-0">
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-cover object-[58%_center] sm:object-center"
        poster="/brand/hero-poster.jpg"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setUnavailable(true);
          setPlaying(false);
        }}
      >
        <source src="/herosection%20video.mp4" type="video/mp4" />
      </video>
      {!unavailable && (
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={playing ? 'Pause clinic video' : 'Play clinic video'}
          className="absolute right-[var(--page-gutter)] bottom-5 z-20 inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/40 bg-ink/80 px-3 text-xs text-white transition-colors hover:bg-ink focus-visible:outline-white"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            {playing ? (
              <path d="M7 5h3v14H7zm7 0h3v14h-3z" />
            ) : (
              <path d="m8 4 12 8-12 8V4Z" />
            )}
          </svg>
          <span>{playing ? 'Pause video' : 'Play video'}</span>
        </button>
      )}
      <p
        role="status"
        className={
          unavailable || message
            ? 'absolute right-[var(--page-gutter)] bottom-18 left-[var(--page-gutter)] z-20 rounded-md bg-ink/90 px-4 py-3 text-xs text-white sm:left-auto sm:max-w-sm'
            : 'sr-only'
        }
      >
        {unavailable ? 'The clinic video is currently unavailable.' : message}
      </p>
    </div>
  );
}
