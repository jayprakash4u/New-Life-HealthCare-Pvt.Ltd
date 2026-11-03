import { expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HeroAccess } from '@/components/home/hero-access';
import { services } from '@/config/services';
import { treatments } from '@/config/treatments';
import { contactConfig } from '@/config/contact';
import { doctors } from '@/config/doctors';

it('filters optional doctors by care and clears a doctor when the care changes', async () => {
  const user = userEvent.setup();
  render(<HeroAccess />);
  const care = screen.getByLabelText('Treatment or service');
  const doctor = screen.getByRole('combobox', {
    name: /Preferred doctor/,
  }) as HTMLSelectElement;
  expect(doctor.disabled).toBe(true);
  await user.selectOptions(care, 'gynecology');
  const sample = doctors.find((item) => item.careId === 'gynecology')!;
  await user.selectOptions(doctor, sample.id);
  const form = screen.getByRole('form') as HTMLFormElement;
  expect(new FormData(form).get('text')).toContain(sample.name);
  expect(new FormData(form).get('text')).toContain('sample profile');
  await user.selectOptions(care, 'laboratory');
  expect(doctor.value).toBe('');
  expect(doctor.disabled).toBe(true);
  expect(new FormData(form).get('text')).not.toContain(sample.name);
});

it('requires a care selection and prepares the correct WhatsApp request', async () => {
  const user = userEvent.setup();
  render(<HeroAccess />);
  const form = screen.getByRole('form', {
    name: 'Request an appointment on WhatsApp',
  }) as HTMLFormElement;
  expect(form.checkValidity()).toBe(false);
  await user.selectOptions(
    screen.getByLabelText('Treatment or service'),
    'ent-care',
  );
  expect(form.checkValidity()).toBe(true);
  expect(form.getAttribute('action')).toBe(contactConfig.whatsapp.href);
  expect(form.getAttribute('target')).toBe('_blank');
  const draft = new FormData(form).get('text') as string;
  expect(draft).toContain('request an appointment for ENT care');
  expect(draft).toContain('available times');
});

it('links care shortcuts to the appointment panel with a valid care selection', () => {
  render(<HeroAccess />);
  const links = within(
    screen.getByRole('navigation', { name: 'Explore care options' }),
  ).getAllByRole('link');
  expect(links).toHaveLength(6);
  for (const link of links) {
    const target = new URL(link.getAttribute('href')!, 'http://localhost');
    expect(target.hash).toBe('#plan-your-visit');
    expect(document.getElementById('plan-your-visit')?.tagName).toBe('SECTION');
    expect(
      [...treatments, ...services].some(
        (item) => item.id === target.searchParams.get('care'),
      ),
    ).toBe(true);
  }
});

it('prefills a requested care option and rejects unknown options', () => {
  const { rerender } = render(<HeroAccess initialCare="hearing-tests" />);
  expect(
    (screen.getByLabelText('Treatment or service') as HTMLSelectElement).value,
  ).toBe('hearing-tests');
  rerender(<HeroAccess key="unknown" initialCare="unknown" />);
  expect(
    (screen.getByLabelText('Treatment or service') as HTMLSelectElement).value,
  ).toBe('');
});
