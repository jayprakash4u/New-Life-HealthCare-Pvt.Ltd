import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HomeFaq } from '@/components/home/home-faq';
import { contactConfig } from '@/config/contact';

it('expands a topic and prepares a question for WhatsApp without submitting it', async () => {
  const user = userEvent.setup();
  render(<HomeFaq />);
  const summary = screen.getByText('Appointments & visiting');
  await user.click(summary);
  expect(summary.closest('details')?.open).toBe(true);
  const button = screen.getByRole('button', {
    name: /Review question in WhatsApp/,
  }) as HTMLButtonElement;
  expect(button.disabled).toBe(true);
  await user.type(
    screen.getByRole('textbox', { name: 'Your question' }),
    'When can I visit?',
  );
  expect(button.disabled).toBe(false);
  const form = screen.getByRole('form', {
    name: 'Ask our team on WhatsApp',
  }) as HTMLFormElement;
  expect(form.action).toBe(contactConfig.whatsapp.href);
  expect(new FormData(form).get('text')).toContain('When can I visit?');
});
