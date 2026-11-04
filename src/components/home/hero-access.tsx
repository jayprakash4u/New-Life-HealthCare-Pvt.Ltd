'use client';

import Link from 'next/link';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCareRequestHref } from '@/lib/care-request';
import { submitEnquiry } from '@/app/enquiry-actions';
import { Input } from '@/components/ui/input';
import { treatments } from '@/config/treatments';
import { doctors, type Doctor } from '@/config/doctors';
import { Container } from '@/components/ui/container';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CareIcon, type CareIconName } from '@/components/ui/care-icon';
import { Toast } from '@/components/ui/toast';

const shortcuts: Array<{
  title: string;
  detail: string;
  href: string;
  icon: CareIconName;
}> = [
  {
    title: 'General checkups',
    detail: 'Everyday health',
    href: getCareRequestHref('general-consultations'),
    icon: 'consultation',
  },
  {
    title: 'Child & family care',
    detail: 'Pediatric care',
    href: getCareRequestHref('child-family-health'),
    icon: 'family',
  },
  {
    title: 'Gynecology',
    detail: 'Women’s health',
    href: getCareRequestHref('gynecology'),
    icon: 'gynecology',
  },
  {
    title: 'Diabetes & BP',
    detail: 'Ongoing health',
    href: getCareRequestHref('diabetes-bp-gastric-care'),
    icon: 'heart',
  },
  {
    title: 'ENT care',
    detail: 'Ear, nose & throat',
    href: getCareRequestHref('ent-care'),
    icon: 'hearing',
  },
  {
    title: 'Gastroenterology',
    detail: 'Digestive care',
    href: getCareRequestHref('gastroenterology'),
    icon: 'digestive',
  },
];

export function HeroAccess({
  initialCare = '',
  roster = doctors,
}: {
  initialCare?: string;
  roster?: readonly Doctor[];
}) {
  const [care, setCare] = useState(() =>
    treatments.some((item) => item.id === initialCare) ? initialCare : '',
  );
  const selected = treatments.find((item) => item.id === care);
  const [doctorId, setDoctorId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const availableDoctors = roster.filter((doctor) => doctor.careId === care);
  const selectedDoctor = availableDoctors.find(
    (doctor) => doctor.id === doctorId,
  );

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await submitEnquiry('Visit request', '', formData);
      if (res && (res.includes('received') || res.includes('sent'))) {
        setToastMessage('Appointment request received! We will call to confirm.');
        setName('');
        setPhone('');
        setCare('');
        setDoctorId('');
      } else {
        setErrorMessage(res || 'Please verify your details and try again.');
      }
    } catch {
      setErrorMessage('Could not send request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="plan-your-visit"
      aria-label="Appointments and care options"
      className="scroll-mt-36 border-b border-line bg-soft py-6 sm:py-8 lg:scroll-mt-48 lg:py-10"
    >
      {/* Top-Right Floating Success Toast */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
        duration={5000}
      />

      <Container>
        <form
          onSubmit={handleSubmit}
          aria-label="Request an appointment"
          className="min-w-0 rounded-md border border-line bg-canvas p-4 shadow-sm sm:p-6"
        >
          <input type="hidden" name="topic" value={selected?.title ?? ''} />
          <input
            type="hidden"
            name="message"
            value={
              selectedDoctor
                ? (selectedDoctor.publishedByClinic
                    ? 'Preferred doctor: '
                    : 'Preferred sample profile: ') + selectedDoctor.name
                : ''
            }
          />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.85fr)]">
            <div className="min-w-0">
              <label htmlFor="appointment-care" className="sr-only">
                Treatment
              </label>
              <Select
                id="appointment-care"
                required
                value={care}
                onChange={(event) => {
                  setCare(event.target.value);
                  setDoctorId('');
                }}
                className="min-h-14 min-w-0 max-w-full truncate border-line bg-panel py-3.5 pr-8 pl-3 text-sm sm:pl-4"
              >
                <option value="" disabled>
                  Select treatment
                </option>
                {treatments.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </Select>
            </div>
            <div className="min-w-0">
              <label htmlFor="appointment-doctor" className="sr-only">
                Preferred doctor
              </label>
              <Select
                id="appointment-doctor"
                value={doctorId}
                onChange={(event) => setDoctorId(event.target.value)}
                disabled={!availableDoctors.length}
                className="min-h-14 min-w-0 max-w-full truncate border-line bg-panel py-3.5 pr-8 pl-3 text-sm sm:pl-4"
              >
                <option value="">
                  {!care
                    ? 'Choose a care area first'
                    : !availableDoctors.length
                      ? 'Our team will guide you'
                      : 'Select doctor (optional)'}
                </option>
                {availableDoctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                    {!doctor.publishedByClinic && ' (sample)'}
                  </option>
                ))}
              </Select>
            </div>
            <Button
              type="submit"
              variant="primary"
              className="min-h-14 w-full min-w-0 gap-2 px-3 text-sm sm:gap-3 sm:px-4 cursor-pointer"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <svg
                    className="size-4 animate-spin shrink-0 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Request an appointment</span>
                  <svg
                    className="shrink-0"
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
                </>
              )}
            </Button>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-sm font-medium">
              Your name
              <Input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
                maxLength={100}
                placeholder="Full name"
              />
            </label>
            <label className="grid gap-1 text-sm font-medium">
              Phone number
              <Input
                name="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                required
                maxLength={32}
                placeholder="Mobile number"
              />
            </label>
          </div>

          {/* Inline Error Message (only if validation fails) */}
          {errorMessage && (
            <p role="alert" className="mt-2.5 text-xs text-negative">
              {errorMessage}
            </p>
          )}

          <p className="mt-2 text-xs text-muted">
            The clinic will call to confirm availability.
          </p>
        </form>

        <nav
          aria-label="Explore care options"
          className="mt-4 grid grid-cols-2 gap-3 min-[480px]:grid-cols-3 sm:mt-6 lg:grid-cols-6 xl:gap-4"
        >
          {shortcuts.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex min-h-35 min-w-0 flex-col items-center justify-center rounded-md border border-line bg-canvas px-2 py-3 text-center text-ink transition-colors hover:border-action hover:bg-white hover:text-action sm:min-h-37 sm:px-3 sm:py-4"
            >
              <CareIcon
                name={item.icon}
                size={64}
                className="mb-2 size-14 shrink-0 text-action sm:mb-2.5 sm:size-16"
              />
              <span className="text-sm leading-snug font-semibold sm:text-[15px]">
                {item.title}
              </span>
              <span className="mt-1.5 text-[11px] leading-snug text-muted sm:text-xs sm:leading-relaxed">
                {item.detail}
              </span>
            </Link>
          ))}
        </nav>
      </Container>
    </section>
  );
}

function HeroAccessFromQuery({ roster }: { roster: readonly Doctor[] }) {
  const searchParams = useSearchParams();
  const care = searchParams.get('care') ?? '';
  return <HeroAccess key={care} initialCare={care} roster={roster} />;
}

export function HeroAccessSection({
  roster = doctors,
}: { roster?: readonly Doctor[] } = {}) {
  return (
    <Suspense fallback={<HeroAccess roster={roster} />}>
      <HeroAccessFromQuery roster={roster} />
    </Suspense>
  );
}
