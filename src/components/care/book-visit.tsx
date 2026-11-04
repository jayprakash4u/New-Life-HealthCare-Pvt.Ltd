'use client';

import { useState } from 'react';
import { submitEnquiry } from '@/app/enquiry-actions';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Toast } from '@/components/ui/toast';

export function BookVisit({ careName }: { careName?: string }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');

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
        setToastMessage('Appointment request received!');
        setName('');
        setPhone('');
        setEmail('');
        setDate('');
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
      id="book-your-visit"
      aria-labelledby="book-visit-heading"
      className="scroll-mt-36 border-t border-line bg-canvas py-12 sm:py-16 lg:scroll-mt-48"
    >
      {/* Top-Right Success Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
        duration={4000}
      />

      <Container>
        <div className="grid gap-8 rounded-sm border-t-2 border-action bg-panel p-5 sm:p-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.7fr)] lg:gap-14 lg:p-10">
          <div>
            <p className="text-xs font-medium tracking-wide text-action">
              Visit New Life
            </p>
            <h2
              id="book-visit-heading"
              className="mt-3 text-[clamp(1.75rem,2.6vw,2.25rem)] leading-tight font-medium tracking-tight"
            >
              Book your visit
            </h2>
            <div aria-hidden="true" className="mt-4 h-px w-12 bg-accent" />
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
              Send a request. Our team will help confirm a suitable time for
              your visit.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="topic" value={careName ?? ''} />
            <input
              type="hidden"
              name="message"
              value={date ? 'Preferred date: ' + date : ''}
            />

            {/* Inline Error Message (only on invalid input) */}
            {errorMessage && (
              <p role="alert" className="mb-4 text-xs text-negative">
                {errorMessage}
              </p>
            )}

            <div className="grid gap-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="visit-name"
                  className="mb-2 block text-xs font-medium"
                >
                  Your name <span className="text-muted">(required)</span>
                </label>
                <Input
                  id="visit-name"
                  required
                  pattern=".*\S.*"
                  autoComplete="name"
                  maxLength={100}
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Full name"
                  className="border-line text-sm"
                />
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="visit-location"
                  className="mb-2 block text-xs font-medium"
                >
                  Clinic location
                </label>
                <Input
                  id="visit-location"
                  readOnly
                  value="Imadol, Lalitpur"
                  className="border-line bg-soft text-sm text-action"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="visit-phone"
                  className="mb-2 block text-xs font-medium"
                >
                  Phone <span className="text-muted">(required)</span>
                </label>
                <Input
                  id="visit-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  maxLength={25}
                  pattern="\+?[0-9 ]{7,24}"
                  name="phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Phone number"
                  className="border-line text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="visit-email"
                  className="mb-2 block text-xs font-medium"
                >
                  Email <span className="text-muted">(optional)</span>
                </label>
                <Input
                  id="visit-email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email address"
                  className="border-line text-sm"
                />
              </div>
              <div className="min-w-0 sm:col-span-2">
                <label
                  htmlFor="visit-date"
                  className="mb-2 block text-xs font-medium"
                >
                  Preferred date <span className="text-muted">(optional)</span>
                </label>
                <Input
                  id="visit-date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="min-w-0 border-line text-sm"
                />
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-muted">
                Our team will follow up using your contact details.
              </p>
              <Button
                type="submit"
                variant="booking"
                disabled={submitting || !name.trim() || !phone.trim()}
                className="shrink-0 gap-6 cursor-pointer"
              >
                {submitting ? 'Sending request...' : 'Request a visit'}{' '}
                <span aria-hidden="true">&rarr;</span>
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
