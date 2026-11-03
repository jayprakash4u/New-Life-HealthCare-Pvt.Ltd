import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TreatmentFaq } from '@/components/treatments/treatment-faq';
import { treatmentPages } from '@/config/treatment-pages';

it('opens and closes an FAQ disclosure', async () => {
  const user = userEvent.setup();
  render(<TreatmentFaq treatment={treatmentPages[0]} />);
  const summary = screen.getByText('How do I request an appointment?');
  const disclosure = summary.closest('details')!;
  expect(disclosure.open).toBe(false);
  await user.click(summary);
  expect(disclosure.open).toBe(true);
  await user.click(summary);
  expect(disclosure.open).toBe(false);
});
