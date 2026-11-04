import { expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HeroAccess } from '@/components/home/hero-access';
import { treatments } from '@/config/treatments';
import { doctors } from '@/config/doctors';

it('filters optional doctors by treatment care and clears a doctor when the treatment changes', async () => {
  const user = userEvent.setup();
  render(<HeroAccess />);
  const care = screen.getByLabelText('Treatment');
  const doctor = screen.getByRole('combobox', {
    name: /Preferred doctor/,
  }) as HTMLSelectElement;
  expect(doctor.disabled).toBe(true);
  await user.selectOptions(care, 'gynecology');
  const sample = doctors.find((item) => item.careId === 'gynecology')!;
  await user.selectOptions(doctor, sample.id);
  const form = screen.getByRole('form') as HTMLFormElement;
  expect(new FormData(form).get('message')).toContain(sample.name);
  await user.selectOptions(care, 'ent-care');
  expect(doctor.value).toBe('');
  expect(new FormData(form).get('message')).not.toContain(sample.name);
});

it('links care shortcuts to the appointment panel with a valid treatment selection', () => {
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
      treatments.some((item) => item.id === target.searchParams.get('care')),
    ).toBe(true);
  }
});

it('prefills a requested treatment option and rejects unknown options', () => {
  const { rerender } = render(<HeroAccess initialCare="ent-care" />);
  expect(
    (screen.getByLabelText('Treatment') as HTMLSelectElement).value,
  ).toBe('ent-care');
  rerender(<HeroAccess key="unknown" initialCare="unknown" />);
  expect(
    (screen.getByLabelText('Treatment') as HTMLSelectElement).value,
  ).toBe('');
});
