import { expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { WhyChooseUs } from '@/components/home/why-choose-us';

it('makes all four reasons available without opening tabs', () => {
  render(<WhyChooseUs />);
  const section = screen.getByRole('region', { name: 'Why choose New Life?' });
  expect(within(section).getAllByRole('article')).toHaveLength(4);
  expect(within(section).queryByRole('tablist')).toBeNull();
  expect(
    within(section).getByText(/Consultations, laboratory tests/),
  ).toBeTruthy();
  expect(within(section).getByText(/child and family health/)).toBeTruthy();
  expect(within(section).getByText(/Located in Imadol, Lalitpur/)).toBeTruthy();
  expect(within(section).getByText(/Call or message our team/)).toBeTruthy();
});
