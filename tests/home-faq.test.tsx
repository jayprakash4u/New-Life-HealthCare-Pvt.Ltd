import { expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HomeFaq } from '@/components/home/home-faq';
import { submitEnquiry } from '@/app/enquiry-actions';

vi.mock('@/app/enquiry-actions', () => ({ submitEnquiry: vi.fn() }));

it('expands a topic and sends the completed question to the clinic', async () => {
  vi.mocked(submitEnquiry).mockResolvedValue(
    'Your request was sent to the clinic.',
  );
  const user = userEvent.setup();
  render(<HomeFaq />);
  const summary = screen.getByText('Appointments & visiting');
  await user.click(summary);
  expect(summary.closest('details')?.open).toBe(true);
  const button = screen.getByRole('button', {
    name: 'Send question',
  }) as HTMLButtonElement;
  expect(button.disabled).toBe(true);
  await user.type(
    screen.getByRole('textbox', { name: 'Your question' }),
    'When can I visit?',
  );
  expect(button.disabled).toBe(false);
  await user.type(
    screen.getByRole('textbox', { name: 'Your name' }),
    'Test visitor',
  );
  await user.type(
    screen.getByRole('textbox', { name: 'Phone number' }),
    '9800000000',
  );
  await user.click(button);
  expect(
    await screen.findByText('Your request was sent to the clinic.'),
  ).toBeTruthy();
  const [source, , form] = vi.mocked(submitEnquiry).mock.calls[0];
  expect(source).toBe('Contact');
  expect(form.get('topic')).toBe('Homepage question');
  expect(form.get('message')).toBe('When can I visit?');
});
