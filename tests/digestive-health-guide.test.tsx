import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DigestiveHealthGuide } from '@/components/treatments/digestive-health-guide';

it('switches digestive information with clicks and keyboard navigation', async () => {
  const user = userEvent.setup();
  render(<DigestiveHealthGuide />);
  expect(screen.getByRole('tabpanel').textContent).toContain('Acid reflux');
  await user.click(screen.getByRole('tab', { name: 'Symptoms' }));
  expect(screen.getByRole('tabpanel').textContent).toContain(
    'Do not wait for an online appointment response',
  );
  await user.keyboard('{ArrowRight}{Enter}');
  expect(
    screen
      .getByRole('tab', { name: 'Consultation & care' })
      .getAttribute('aria-selected'),
  ).toBe('true');
  expect(screen.getByRole('tabpanel').textContent).toContain(
    'confirm consultation availability and fees',
  );
});
