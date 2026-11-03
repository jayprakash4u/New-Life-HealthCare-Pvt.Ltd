import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RelatedDoctors } from '@/components/doctors/related-doctors';
import { doctors } from '@/config/doctors';

it('shows only doctors matching the selected consultation', () => {
  render(<RelatedDoctors careId="general-consultations" />);
  const related = doctors.filter(
    (doctor) => doctor.careId === 'general-consultations',
  );
  expect(screen.getAllByRole('article')).toHaveLength(related.length);
  for (const doctor of related) {
    expect(
      screen.getByRole('heading', { level: 3, name: doctor.name }),
    ).toBeTruthy();
  }
  expect(screen.queryByText('Dr. Anisha Shrestha')).toBeNull();
  expect(
    screen.getByRole('link', { name: 'View all doctors' }).getAttribute('href'),
  ).toBe('/doctors');
});

it('omits the section when no profiles match', () => {
  const { container } = render(<RelatedDoctors careId="unknown" />);
  expect(container.childElementCount).toBe(0);
});
