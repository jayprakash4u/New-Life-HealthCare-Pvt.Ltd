import { beforeEach, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { doctors } from '@/config/doctors';
import { OurDoctors } from '@/components/about/our-doctors';
import { getDoctors } from '@/lib/content-library';
import { getHomepageVisibility } from '@/lib/homepage-visibility';

vi.mock('@/lib/content-library', () => ({ getDoctors: vi.fn() }));
vi.mock('@/lib/homepage-visibility', () => ({
  getHomepageVisibility: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(getDoctors).mockResolvedValue([...doctors]);
  vi.mocked(getHomepageVisibility).mockResolvedValue(new Map());
});

it('shows at most four homepage doctors and excludes hidden doctors', async () => {
  vi.mocked(getHomepageVisibility).mockResolvedValue(
    new Map([[doctors[0].id, false]]),
  );
  render(await OurDoctors({ homepage: true }));
  expect(screen.queryByRole('heading', { name: doctors[0].name })).toBeNull();
  expect(screen.getAllByRole('article')).toHaveLength(4);
});

it('omits the homepage section when all doctors are hidden', async () => {
  vi.mocked(getHomepageVisibility).mockResolvedValue(
    new Map(doctors.map(({ id }) => [id, false])),
  );
  expect(await OurDoctors({ homepage: true })).toBeNull();
});

it('keeps the about page preview independent of homepage selections', async () => {
  render(await OurDoctors({}));
  expect(screen.getAllByRole('article')).toHaveLength(4);
  expect(getHomepageVisibility).not.toHaveBeenCalled();
});
