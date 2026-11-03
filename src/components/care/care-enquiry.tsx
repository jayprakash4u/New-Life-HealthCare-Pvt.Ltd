'use client';

import { useActionState, useId, useState } from 'react';
import { submitEnquiry } from '@/app/enquiry-actions';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { HeaderMessage, HeaderArrow } from '@/components/layout/header-icons';

export function CareEnquiry({ careName }: { careName: string }) {
  const formId = useId();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [question, setQuestion] = useState('');
  const [status, submit, pending] = useActionState(
    submitEnquiry.bind(null, 'Care enquiry'),
    '',
  );
  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button
          variant="booking"
          aria-label={`Open enquiry form for ${careName}`}
          className="fixed right-4 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] z-30 min-h-12 gap-3 px-4 shadow-lg lg:right-6 lg:bottom-6"
        >
          <HeaderMessage />
          Enquire now
        </Button>
      </DialogTrigger>
      <DialogContent
        title="Quick enquiry"
        description={careName}
        closeLabel="Close enquiry form"
        className="max-h-[calc(100dvh-2rem)] sm:top-auto sm:right-5 sm:bottom-[calc(5.25rem+env(safe-area-inset-bottom))] sm:left-auto sm:w-[23rem] sm:translate-x-0 sm:translate-y-0 lg:right-6 lg:bottom-6"
      >
        <form
          action={submit}
          aria-label={`Enquiry about ${careName}`}
          className="grid gap-4"
        >
          <input type="hidden" name="topic" value={careName ?? ''} />
          <p role="status" className="text-sm text-action">
            {status}
          </p>
          <div>
            <label
              htmlFor={`${formId}-name`}
              className="mb-2 block text-xs font-semibold"
            >
              Your name{' '}
              <span className="font-normal text-muted">(required)</span>
            </label>
            <Input
              id={`${formId}-name`}
              autoComplete="name"
              required
              maxLength={100}
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Full name"
              className="text-sm"
            />
          </div>
          <div>
            <label
              htmlFor={`${formId}-phone`}
              className="mb-2 block text-xs font-semibold"
            >
              Phone number{' '}
              <span className="font-normal text-muted">(required)</span>
            </label>
            <Input
              id={`${formId}-phone`}
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              maxLength={32}
              name="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Your contact number"
              className="text-sm"
            />
          </div>
          <div>
            <label
              htmlFor={`${formId}-question`}
              className="mb-2 block text-xs font-semibold"
            >
              Your question{' '}
              <span className="font-normal text-muted">(required)</span>
            </label>
            <Textarea
              id={`${formId}-question`}
              required
              maxLength={1500}
              name="message"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="How can our team help?"
              className="min-h-24 text-sm"
            />
          </div>
          <div>
            <Button
              type="submit"
              variant="booking"
              disabled={pending || !name.trim() || !question.trim()}
              className="min-h-12 w-full justify-between gap-3 px-4"
            >
              Send enquiry
              <HeaderArrow />
            </Button>
            <p className="mt-2.5 text-[11px] leading-relaxed text-muted">
              Our team will follow up using your contact details.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
