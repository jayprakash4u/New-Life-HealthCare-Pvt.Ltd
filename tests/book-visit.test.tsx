import { expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookVisit } from '@/components/care/book-visit';
import { contactConfig } from '@/config/contact';

it('validates visit details and prepares a request for the clinic without claiming a confirmed booking', async () => {
  const user = userEvent.setup();
  render(<BookVisit careName="Gastroenterology" />);
  const button = screen.getByRole('button') as HTMLButtonElement;
  const form = screen.getByRole('form') as HTMLFormElement;
  expect(button.disabled).toBe(true);
  await user.type(screen.getByLabelText(/Your name/), 'Sita Sharma');
  await user.type(screen.getByLabelText(/Phone/), '+9779800000000');
  await user.type(screen.getByLabelText(/Email/), 'sita@example.com');
  fireEvent.change(screen.getByLabelText(/Preferred date/), {
    target: { value: '2026-12-02' },
  });
  expect(button.disabled).toBe(false);
  expect(form.checkValidity()).toBe(true);
  expect(form.action).toBe(contactConfig.whatsapp.href);
  expect(form.target).toBe('_blank');
  const draft = new FormData(form).get('text') as string;
  expect(draft).toContain('Sita Sharma');
  expect(draft).toContain('+9779800000000');
  expect(draft).toContain('sita@example.com');
  expect(draft).toContain('2026-12-02');
  expect(draft).toContain('Please confirm');
  expect(draft).toContain('Consultation: Gastroenterology');
  await user.clear(screen.getByLabelText(/Phone/));
  await user.type(screen.getByLabelText(/Phone/), 'invalid');
  expect(form.checkValidity()).toBe(false);
});
