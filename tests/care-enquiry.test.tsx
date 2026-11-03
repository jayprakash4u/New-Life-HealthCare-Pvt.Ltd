import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CareEnquiry } from '@/components/care/care-enquiry';
import { contactConfig } from '@/config/contact';

it.each(['General consultations', 'Laboratory', 'Ultrasound'])(
  'prepares an enquiry for %s and restores focus when closed',
  async (careName) => {
    const user = userEvent.setup();
    render(<CareEnquiry careName={careName} />);
    const trigger = screen.getByRole('button', {
      name: `Open enquiry form for ${careName}`,
    });
    await user.click(trigger);
    expect(screen.getByRole('dialog', { name: 'Quick enquiry' })).toBeTruthy();
    expect(screen.getByText(careName)).toBeTruthy();
    const submit = screen.getByRole('button', {
      name: /Continue enquiry on WhatsApp/,
    }) as HTMLButtonElement;
    expect(submit.disabled).toBe(true);
    await user.type(screen.getByLabelText(/Your name/), 'Sita');
    await user.type(screen.getByLabelText(/Phone number/), '9800000000');
    await user.type(
      screen.getByLabelText(/Your question/),
      'Please confirm availability.',
    );
    expect(submit.disabled).toBe(false);
    const form = screen.getByRole('form', {
      name: `Enquiry about ${careName}`,
    }) as HTMLFormElement;
    const draft = new FormData(form).get('text') as string;
    expect(draft).toContain(careName);
    expect(draft).toContain('Sita');
    expect(draft).toContain('9800000000');
    expect(draft).toContain('Please confirm availability.');
    expect(form.action).toBe(contactConfig.whatsapp.href);
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  },
);
