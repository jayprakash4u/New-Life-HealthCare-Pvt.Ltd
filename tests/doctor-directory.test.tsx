import { expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DoctorDirectory } from '@/components/doctors/doctor-directory';
import { doctors } from '@/config/doctors';
import { getCareRequestHref } from '@/lib/care-request';

it('combines name search with specialty filters and recovers from no results', async () => {
  const user = userEvent.setup();
  render(<DoctorDirectory doctors={doctors} />);
  await user.type(screen.getByRole('searchbox'), 'anisha');
  expect(screen.getAllByRole('article')).toHaveLength(1);
  await user.selectOptions(screen.getByRole('combobox'), 'ENT care');
  expect(screen.queryByRole('article')).toBeNull();
  expect(screen.getByText('No matching profiles')).toBeTruthy();
  await user.click(screen.getByRole('button', { name: 'Clear filters' }));
  expect(screen.getAllByRole('article')).toHaveLength(doctors.length);
});

it('shows a sample profile and links the appointment to its consultation area', async () => {
  const user = userEvent.setup();
  render(<DoctorDirectory doctors={doctors} />);
  await user.click(
    screen.getByRole('button', { name: `View profile of ${doctors[0].name}` }),
  );
  const dialog = screen.getByRole('dialog', { name: doctors[0].name });
  expect(within(dialog).getByText(/Sample profile/)).toBeTruthy();
  expect(within(dialog).getByRole('link').getAttribute('href')).toBe(
    getCareRequestHref(doctors[0].careId),
  );
  await user.keyboard('{Escape}');
  expect(screen.queryByRole('dialog')).toBeNull();
});
