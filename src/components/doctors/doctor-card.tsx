'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Doctor } from '@/config/doctors';
import { getCareRequestHref } from '@/lib/care-request';
import { Button } from '@/components/ui/button';
import { ButtonLink } from '@/components/ui/button-link';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/cn';
import styles from './doctor-card.module.css';

export function DoctorCard({
  doctor,
  headingLevel = 2,
  variant = 'default',
}: {
  doctor: Doctor;
  headingLevel?: 2 | 3;
  variant?: 'default' | 'portrait' | 'featured';
}) {
  const Heading = headingLevel === 3 ? 'h3' : 'h2';
  const featured = variant === 'featured';
  return (
    <article
      aria-labelledby={`doctor-${doctor.id}`}
      className="flex w-full flex-col overflow-hidden rounded-lg border border-line bg-canvas transition-colors hover:border-action/50"
    >
      {variant === 'portrait' ? (
        <>
          <div className="relative aspect-[4/3] overflow-hidden bg-soft">
            <Image
              src={doctor.image}
              alt={
                doctor.publishedByClinic
                  ? doctor.name
                  : `Illustrative portrait for ${doctor.name}, sample profile`
              }
              fill
              sizes="(min-width: 1280px) 400px, (min-width: 1024px) 32vw, (min-width: 640px) 46vw, 95vw"
              className="object-cover object-[center_20%]"
            />
            <span className="absolute top-3 left-3 rounded-sm bg-white/90 px-2 py-1 text-[9px] font-medium tracking-wide text-muted uppercase">
              Sample profile
            </span>
          </div>
          <div className="flex-1 px-5 py-5">
            <Heading
              id={`doctor-${doctor.id}`}
              className="text-lg leading-snug font-semibold tracking-tight"
            >
              {doctor.name}
            </Heading>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {doctor.specialty}
            </p>
          </div>
        </>
      ) : (
        <div className={cn('flex-1 p-5 sm:p-6', featured && styles.summary)}>
          {!featured && (
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="text-[10px] font-medium tracking-[0.06em] text-muted uppercase">
                Sample profile
              </span>
              <span aria-hidden="true" className="h-px w-10 bg-action/30" />
            </div>
          )}
          <div className="flex items-start gap-4">
            <Image
              src={doctor.image}
              alt={
                doctor.publishedByClinic
                  ? doctor.name
                  : `Illustrative portrait for ${doctor.name}, sample profile`
              }
              width={160}
              height={160}
              sizes="80px"
              className={cn(
                'size-20 shrink-0 rounded-md border border-line bg-soft object-cover object-top',
                featured && styles.photo,
              )}
            />
            <div className="min-w-0">
              <Heading
                id={`doctor-${doctor.id}`}
                className="text-lg leading-snug font-semibold tracking-tight"
              >
                {doctor.name}
              </Heading>
              <p className="mt-2 text-sm leading-relaxed text-action">
                {doctor.specialty}
              </p>
              {featured && !doctor.publishedByClinic && (
                <span className={styles.badge}>Sample profile</span>
              )}
            </div>
          </div>
          {!featured && (
            <div className="mt-6 flex flex-wrap gap-2">
              {doctor.interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-sm border border-line bg-panel px-2 py-1 text-[11px] leading-relaxed text-muted"
                >
                  {interest}
                </span>
              ))}
            </div>
          )}
          <p
            className={cn(
              'mt-6 border-t border-line pt-4 text-xs text-muted',
              featured && styles.location,
            )}
          >
            New Life Health Care <span aria-hidden="true">·</span> Imadol,
            Lalitpur
          </p>
        </div>
      )}
      <div
        className={cn(
          'grid grid-cols-2 border-t border-line',
          featured && styles.actions,
        )}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              aria-label={`View profile of ${doctor.name}`}
              className={cn(
                'h-full rounded-none px-3 py-4 text-xs',
                featured && styles.profile,
              )}
            >
              View profile
            </Button>
          </DialogTrigger>
          <DialogContent
            title={doctor.name}
            description={
              featured && doctor.publishedByClinic
                ? 'New Life Health Care · Imadol, Lalitpur'
                : 'Sample profile — final clinic details pending'
            }
          >
            <p className="mb-5 text-sm font-medium text-action">
              {doctor.specialty}
            </p>
            {(!featured || !doctor.publishedByClinic) && (
              <p className="text-sm leading-relaxed text-muted">
                This profile demonstrates the directory design. Qualifications,
                professional registration, experience, consultation fees and
                visiting hours will be added with the clinic’s confirmed
                details.
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-2">
              {doctor.interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-sm bg-soft px-3 py-2 text-xs text-action"
                >
                  {interest}
                </span>
              ))}
            </div>
            <ButtonLink
              href={getCareRequestHref(doctor.careId)}
              className="mt-7 w-full"
            >
              Enquire about this consultation
            </ButtonLink>
          </DialogContent>
        </Dialog>
        <Link
          href={getCareRequestHref(doctor.careId)}
          aria-label={`Book an appointment for ${doctor.specialty}`}
          className={cn(
            'flex items-center justify-center border-l border-line bg-accent-soft px-3 py-4 text-center text-xs font-semibold text-accent-strong hover:bg-accent-strong hover:text-on-accent',
            featured && styles.booking,
          )}
        >
          Book an appointment
        </Link>
      </div>
    </article>
  );
}
