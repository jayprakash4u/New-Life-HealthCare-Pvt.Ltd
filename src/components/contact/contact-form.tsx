'use client';

import { useActionState, useState } from 'react';
import { submitEnquiry } from '@/app/enquiry-actions';
import { Input, Select, Textarea } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const topics = [
  'General enquiry',
  'Appointment enquiry',
  'Tests & services',
  'Feedback',
] as const;

export function ContactForm() {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState<string>(topics[0]);
  const [message, setMessage] = useState('');
  const [status, submit, pending] = useActionState(
    submitEnquiry.bind(null, 'Contact'),
    '',
  );
  return (
    <form
      action={submit}
      aria-labelledby="contact-form-heading"
      className="rounded-lg border border-line bg-canvas p-5 sm:p-8 lg:p-9"
    >
      <p role="status" className="text-sm text-action">
        {status}
      </p>
      <p className="mb-3 text-[11px] font-semibold tracking-[0.12em] text-action uppercase">
        Start a conversation
      </p>
      <h2
        id="contact-form-heading"
        className="text-2xl font-medium tracking-tight"
      >
        How can we help?
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Ask about a visit, a consultation, or the services available at New
        Life.
      </p>
      <div className="mt-7 grid gap-5">
        <label className="grid gap-2 text-sm font-semibold">
          Phone number
          <Input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            maxLength={32}
          />
        </label>
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block text-sm font-semibold"
          >
            Your name <span className="font-normal text-muted">(required)</span>
          </label>
          <Input
            id="contact-name"
            autoComplete="name"
            required
            maxLength={100}
            pattern=".*\S.*"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Full name"
            className="text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="contact-topic"
            className="mb-2 block text-sm font-semibold"
          >
            What is your enquiry about?
          </label>
          <Select
            id="contact-topic"
            name="topic"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            className="text-sm"
          >
            {topics.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
        </div>
        <div>
          <label
            htmlFor="contact-message"
            className="mb-2 block text-sm font-semibold"
          >
            Your message{' '}
            <span className="font-normal text-muted">(required)</span>
          </label>
          <Textarea
            id="contact-message"
            required
            maxLength={1500}
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Tell us how we can help."
            className="min-h-36 text-sm"
          />
        </div>
        <div>
          <Button
            type="submit"
            disabled={pending || !name.trim() || !message.trim()}
            className="min-h-12 w-full justify-between gap-4"
          >
            Send enquiry
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M6 18 18 6M6 6h12v12" />
            </svg>
          </Button>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            Our team will follow up using your contact details.
          </p>
        </div>
      </div>
    </form>
  );
}
