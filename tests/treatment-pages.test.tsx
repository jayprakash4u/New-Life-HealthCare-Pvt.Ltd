import { expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { treatmentPages, findTreatmentPage } from '@/config/treatment-pages';
import { TreatmentOverview } from '@/components/treatments/treatment-overview';
import { getCareRequestHref } from '@/lib/care-request';
import { treatmentGuides } from '@/config/treatment-guides';

it.each(treatmentPages)(
  'opens the correct appointment care for $title',
  (treatment) => {
    render(<TreatmentOverview treatment={treatment} />);
    expect(
      screen.getByRole('heading', { level: 1, name: treatment.title }),
    ).toBeTruthy();
    expect(
      screen
        .getByRole('link', { name: 'Request an appointment' })
        .getAttribute('href'),
    ).toBe(getCareRequestHref(treatment.id));
    expect(screen.getByRole('heading', { name: 'Overview' })).toBeTruthy();
    const clinicalGallery = screen.getByRole('group', {
      name: 'Clinical reference images',
    });
    expect(
      within(clinicalGallery).getAllByRole('img').length,
    ).toBeGreaterThanOrEqual(3);
    const guide = treatmentGuides[treatment.id];
    if (guide) {
      expect(screen.getByRole('heading', { name: guide.heading })).toBeTruthy();
      for (const topic of guide.topics) {
        expect(screen.getByRole('heading', { name: topic.title })).toBeTruthy();
      }
    } else {
      expect(
        screen.getByRole('tablist', { name: 'Digestive health information' }),
      ).toBeTruthy();
    }
    expect(
      screen.getByRole('heading', { name: 'Book your visit' }),
    ).toBeTruthy();
    const bookingForm = screen.getByRole('form', {
      name: 'Book your visit on WhatsApp',
    }) as HTMLFormElement;
    expect(new FormData(bookingForm).get('text')).toContain(
      `Consultation: ${treatment.title}`,
    );
    expect(screen.getByRole('img', { name: treatment.imageAlt })).toBeTruthy();
  },
);

it('does not resolve unknown treatments', () => {
  expect(findTreatmentPage('unknown-treatment')).toBeUndefined();
});
