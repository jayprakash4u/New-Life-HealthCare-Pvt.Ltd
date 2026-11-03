import { getPageCopy } from '@/lib/admin-content';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { OurStrengths } from '@/components/about/our-strengths';
import { OurDoctors } from '@/components/about/our-doctors';
import { BookVisit } from '@/components/care/book-visit';
import { MissionVisionValues } from '@/components/about/mission-vision-values';
import { ButtonLink } from '@/components/ui/button-link';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'About New Life',
  description:
    'Get to know New Life Health Care, a polyclinic in Imadol, Lalitpur, bringing consultations and everyday health services together in one place.',
};

export default async function AboutPage() {
  const copy = await getPageCopy('about');
  return (
    <>
      <section
        aria-labelledby="about-heading"
        className="border-b border-line bg-canvas pt-7 pb-10 sm:pt-9 sm:pb-14 lg:pb-16"
      >
        <Container>
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-3 text-xs text-muted sm:mb-10"
          >
            <Link href="/" className="hover:text-action">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">About New Life</span>
          </nav>
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
            <div className="max-w-xl py-2 lg:py-6">
              <h1
                id="about-heading"
                className="text-[clamp(1.8rem,2.8vw,2.5rem)] leading-tight font-medium tracking-tight text-ink"
              >
                {copy.title}
              </h1>
              <div aria-hidden="true" className="mt-4 h-px w-14 bg-accent" />
              <p className="mt-4 text-sm font-medium text-ink">
                Director, New Life Health Care
              </p>
              {copy.body
                .split(/\n\s*\n/)
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p
                    key={index}
                    className="mt-4 text-[15px] leading-7 text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              <ButtonLink href="/doctors" className="mt-7 gap-6">
                View our team of doctors
                <span aria-hidden="true">&rarr;</span>
              </ButtonLink>
            </div>
            <figure className="min-w-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-soft md:aspect-[4/5] lg:aspect-[6/5]">
                <Image
                  src={copy.image ?? '/brand/new-life-director.png'}
                  alt="Director of New Life Health Care seated in the clinic office"
                  fill
                  priority
                  sizes="(min-width: 1280px) 568px, (min-width: 768px) 46vw, 100vw"
                  className="object-cover object-[58%_55%]"
                />
              </div>
            </figure>
          </div>
        </Container>
      </section>
      <MissionVisionValues />
      <OurStrengths />
      <OurDoctors />
      <BookVisit />
    </>
  );
}
