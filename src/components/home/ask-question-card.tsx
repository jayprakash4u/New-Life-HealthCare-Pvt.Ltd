'use client';

import Image from 'next/image';
import { useActionState, useState } from 'react';
import { submitEnquiry } from '@/app/enquiry-actions';
import { Input } from '@/components/ui/input';

export function AskQuestionCard() {
  const [status, submit, pending] = useActionState(
    submitEnquiry.bind(null, 'Contact'),
    '',
  );
  const [question, setQuestion] = useState('');
  return (
    <div className="overflow-hidden rounded-md border border-line bg-canvas">
      <div className="relative aspect-[16/7] bg-soft">
        <Image
          src="/media/home/faq-question-demo.jpg"
          alt=""
          fill
          sizes="(min-width:1024px) 380px, (min-width:768px) 40vw, 100vw"
          className="object-cover object-[center_30%]"
        />
      </div>
      <form action={submit} aria-label="Ask our team" className="p-4 sm:p-5">
        <input type="hidden" name="topic" value="Homepage question" />
        <label htmlFor="home-question" className="sr-only">
          Your question
        </label>
        <div className="relative">
          <Input
            id="home-question"
            name="message"
            required
            maxLength={1000}
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask your question"
            className="min-h-14 pr-14 text-sm"
          />
          <button
            type="submit"
            disabled={pending || !question.trim()}
            aria-label="Send question"
            className="absolute top-1.5 right-1.5 flex size-11 items-center justify-center rounded-sm text-action hover:bg-soft disabled:cursor-not-allowed disabled:text-muted/50"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="m5 12 14-7-4 14-3-6-7-1Z" />
              <path d="m12 13 7-8" />
            </svg>
          </button>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1 text-sm font-medium">
            Your name
            <Input name="name" autoComplete="name" required maxLength={100} />
          </label>
          <label className="grid gap-1 text-sm font-medium">
            Phone number
            <Input
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              maxLength={32}
            />
          </label>
        </div>
        <p role="status" className="mt-2 text-sm text-action">
          {status}
        </p>
      </form>
    </div>
  );
}
