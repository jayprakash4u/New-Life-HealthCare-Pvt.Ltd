import { expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { servicePages, findServicePage } from '@/config/service-pages';
import { ServiceOverview } from '@/components/services/service-overview';
import { getCareRequestHref } from '@/lib/care-request';
import { serviceGuides } from '@/config/service-guides';

it('keeps laboratory and ultrasound as distinct services and enquiry choices', () => {
  const laboratory = findServicePage('laboratory')!;
  const ultrasound = findServicePage('ultrasound')!;
  expect(laboratory.title).toBe('Laboratory');
  expect(ultrasound.title).toBe('Ultrasound');
  expect(getCareRequestHref(laboratory.id)).not.toBe(
    getCareRequestHref(ultrasound.id),
  );
  expect(findServicePage('lab-ultrasound')).toBeUndefined();
  expect(serviceGuides.laboratory.heading).not.toBe(
    serviceGuides.ultrasound.heading,
  );
});

it.each(servicePages)(
  'preserves the selected service for $title enquiries',
  (service) => {
    render(<ServiceOverview service={service} />);
    expect(
      screen.getByRole('heading', { level: 1, name: service.title }),
    ).toBeTruthy();
    expect(
      screen.getByRole('link', { name: service.action }).getAttribute('href'),
    ).toBe(getCareRequestHref(service.id));
    expect(screen.getByRole('img', { name: service.imageAlt })).toBeTruthy();
    const guide = serviceGuides[service.id];
    expect(screen.getByRole('heading', { name: guide.heading })).toBeTruthy();
    for (const topic of guide.topics) {
      expect(screen.getByRole('heading', { name: topic.title })).toBeTruthy();
    }
    const gallery = screen.getByRole('group', {
      name: 'Clinical reference images',
    });
    expect(within(gallery).getAllByRole('img').length).toBeGreaterThanOrEqual(
      3,
    );
  },
);

it('opens a service-specific FAQ and rejects unknown services', async () => {
  const user = userEvent.setup();
  const service = servicePages.find((item) => item.id === 'flu-vaccination')!;
  render(<ServiceOverview service={service} />);
  const summary = screen.getByText(service.question);
  await user.click(summary);
  expect(summary.closest('details')?.open).toBe(true);
  expect(findServicePage('unknown-service')).toBeUndefined();
});
