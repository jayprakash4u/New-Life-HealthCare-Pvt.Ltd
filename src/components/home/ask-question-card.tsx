'use client';

import { useActionState, useState } from 'react';
import { submitEnquiry } from '@/app/enquiry-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AskQuestionCard() {
  const [status, submit, pending] = useActionState(
    submitEnquiry.bind(null, 'Contact'),
    '',
  );
  const [question, setQuestion] = useState('');
  return (
    <div className="overflow-hidden rounded-md border border-line bg-canvas">
      <div className="border-b border-line bg-soft px-4 py-3 sm:px-5">
        <h3 className="font-semibold text-ink">Ask our team</h3>
      </div>
      <form
        action={submit}
        aria-label="Ask our team"
        className="grid gap-3 p-4 sm:p-5"
      >
        <input type="hidden" name="topic" value="Homepage question" />
        <label
          htmlFor="home-question"
          className="grid gap-1 text-sm font-medium"
        >
          Your question
          <textarea
            id="home-question"
            name="message"
            required
            maxLength={1000}
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask your question"
            rows={2}
            className="min-h-20 w-full resize-y rounded-md border border-input bg-raised px-4 py-3 text-base text-ink placeholder:text-muted focus-visible:border-focus"
          />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
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
        <Button
          type="submit"
          disabled={pending || !question.trim()}
          className="w-full"
        >
          {pending ? 'Sending…' : 'Send question'}
        </Button>
        <p role="status" className="text-sm text-action empty:hidden">
          {status}
        </p>
      </form>
    </div>
  );
}
