import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '@/components/contact/contact-form';
import { contactConfig } from '@/config/contact';

it('requires a meaningful name and message before continuing to WhatsApp', async () => {
  const user = userEvent.setup();
  render(<ContactForm />);
  const button = screen.getByRole('button') as HTMLButtonElement;
  expect(button.disabled).toBe(true);
  await user.type(screen.getByLabelText(/Your name/), '   ');
  await user.type(screen.getByLabelText(/Your message/), '   ');
  expect(button.disabled).toBe(true);
  await user.clear(screen.getByLabelText(/Your name/));
  await user.type(screen.getByLabelText(/Your name/), 'Sita');
  await user.clear(screen.getByLabelText(/Your message/));
  await user.type(
    screen.getByLabelText(/Your message/),
    'Please confirm consultation times.',
  );
  await user.selectOptions(screen.getByRole('combobox'), 'Appointment enquiry');
  expect(button.disabled).toBe(false);
  const form = screen.getByRole('form', {
    name: 'How can we help?',
  }) as HTMLFormElement;
  expect(form.checkValidity()).toBe(true);
  expect(form.action).toBe(contactConfig.whatsapp.href);
  expect(form.target).toBe('_blank');
  const draft = new FormData(form).get('text') as string;
  expect(draft).toContain('Sita');
  expect(draft).toContain('Appointment enquiry');
  expect(draft).toContain('Please confirm consultation times.');
});
