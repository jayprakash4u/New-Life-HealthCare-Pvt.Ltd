import { getDoctors } from '@/lib/content-library';
import Link from 'next/link';
import { HeroAccessSection } from './hero-access';
import { contactConfig } from '@/config/contact';
import { Container } from '@/components/ui/container';
import { buttonStyles } from '@/components/ui/button-styles';
import { HeroVideo } from './hero-video';
import type { EditableCopy } from '@/config/admin-pages';

function Arrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

export async function HeroSection({ copy }: { copy?: EditableCopy }) {
  return (
    <>
      <section
        aria-labelledby="hero-heading"
        className="relative isolate overflow-hidden bg-ink text-white"
      >
        <HeroVideo />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-ink/75 lg:bg-transparent lg:bg-[linear-gradient(90deg,rgba(8,35,34,0.9)_0%,rgba(8,35,34,0.72)_42%,rgba(8,35,34,0.12)_100%)]"
        />
        <Container className="pointer-events-none relative z-10 flex min-h-[min(32rem,72svh)] items-center pt-10 pb-22 sm:py-14 sm:pb-22 lg:min-h-[clamp(29rem,62svh,35rem)] lg:py-18">
          <div className="pointer-events-auto w-full min-w-0 max-w-xl">
            <p className="mb-5 flex items-center gap-2 text-[10px] font-medium tracking-[0.1em] text-white/90 uppercase sm:mb-6 sm:gap-3 sm:text-xs">
              <span
                aria-hidden="true"
                className="h-px w-6 shrink-0 bg-white/70 sm:w-9"
              />
              Your care. Your neighbourhood.
            </p>
            <h1
              id="hero-heading"
              className="text-[clamp(2rem,9.5vw,2.75rem)] leading-[1.08] font-medium tracking-[-0.04em] whitespace-pre-line sm:text-[clamp(2.75rem,5vw,4.5rem)]"
            >
              {copy?.title ?? 'A new day.\nA healthier you.'}
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/90 sm:mt-6 sm:text-lg">
              {copy?.body ??
                'Take the next step in your health with New Life Health Care. Here for you in Imadol, Lalitpur.'}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 min-[440px]:flex min-[440px]:flex-wrap sm:mt-8">
              <Link
                href="/#plan-your-visit"
                className={buttonStyles(
                  'booking',
                  'md',
                  'w-full gap-6 min-[440px]:w-auto',
                )}
              >
                Book an appointment
                <Arrow />
              </Link>
              <a
                href={contactConfig.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message on WhatsApp (opens in a new tab)"
                className={buttonStyles(
                  'outline',
                  'md',
                  'w-full border-white/60 bg-transparent text-white hover:bg-white/10 hover:text-white min-[440px]:w-auto',
                )}
              >
                Message on WhatsApp
              </a>
            </div>
          </div>
        </Container>
      </section>

      <HeroAccessSection roster={await getDoctors()} />
    </>
  );
}
