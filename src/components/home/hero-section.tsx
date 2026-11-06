import { getDoctors } from '@/lib/content-library';
import Link from 'next/link';
import { HeroAccessSection } from './hero-access';
import { contactConfig } from '@/config/contact';
import { Container } from '@/components/ui/container';
import { buttonStyles } from '@/components/ui/button-styles';
import { HeroVideo } from './hero-video';
import { homeHeroCopy, type EditableCopy } from '@/config/admin-pages';

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

export async function HeroSection({
  copy = homeHeroCopy,
}: {
  copy?: EditableCopy;
}) {
  return (
    <>
      <section
        aria-labelledby="hero-heading"
        className="relative isolate overflow-hidden bg-ink text-white"
      >
        <HeroVideo />
        <Container className="pointer-events-none relative z-10 flex items-center max-sm:w-[calc(100%-2.5rem)] max-sm:pt-[clamp(10.5rem,48vw,16rem)] max-sm:pb-6 sm:min-h-[min(32rem,72svh)] sm:py-14 sm:pb-22 lg:min-h-[clamp(29rem,62svh,35rem)] lg:py-18">
          <div className="pointer-events-auto w-full min-w-0 max-w-xl">
            <p className="mb-6 hidden items-center gap-3 text-xs font-medium tracking-[0.12em] text-white/90 uppercase sm:flex">
              <span
                aria-hidden="true"
                className="h-px w-9 shrink-0 bg-white/70"
              />
              Your care. Your neighbourhood.
            </p>
            <h1
              id="hero-heading"
              className="text-[clamp(2rem,8.5vw,3rem)] leading-[1.05] font-medium tracking-[-0.04em] whitespace-pre-line wrap-anywhere sm:text-[clamp(2.75rem,5vw,4.5rem)] sm:leading-[1.08]"
            >
              {copy.title === homeHeroCopy.title ? (
                <>
                  <span className="sm:hidden">Care close to home</span>
                  <span className="hidden sm:inline">{copy.title}</span>
                </>
              ) : (
                copy.title
              )}
            </h1>
            <p className="mt-6 hidden max-w-md text-lg leading-relaxed wrap-anywhere text-white/90 sm:block">
              {copy.body}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-8">
              <Link
                href="/#plan-your-visit"
                className={buttonStyles(
                  'booking',
                  'md',
                  'gap-3 px-4 max-sm:border-white max-sm:bg-white max-sm:text-ink max-sm:hover:bg-soft max-sm:hover:text-ink max-sm:active:bg-soft sm:gap-6 sm:px-5',
                )}
              >
                <span className="sm:hidden">Book a visit</span>
                <span className="hidden sm:inline">Book an appointment</span>
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
                  'hidden border-white/60 text-white hover:bg-white/10 hover:text-white sm:inline-flex',
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
