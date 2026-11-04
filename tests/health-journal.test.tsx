import { afterEach, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HealthJournal } from '@/components/home/health-journal';
import { LifeAtNewLife } from '@/components/home/life-at-new-life';
import { ContentRail } from '@/components/home/content-rail';
import { clinicVideos, healthArticles } from '@/config/journal';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it('links homepage articles and videos to their on-site destinations', () => {
  render(
    <>
      <HealthJournal />
      <LifeAtNewLife />
    </>,
  );
  for (const article of healthArticles) {
    expect(
      screen.getByRole('link', { name: article.title }).getAttribute('href'),
    ).toBe(article.href);
  }
  for (const video of clinicVideos) {
    expect(
      screen
        .getByRole('link', { name: video.title + ' — watch video' })
        .getAttribute('href'),
    ).toBe(video.href);
  }
  expect(
    screen.getByRole('link', { name: 'View all blogs' }).getAttribute('href'),
  ).toBe('/blogs');
  expect(
    screen.getByRole('link', { name: 'View all videos' }).getAttribute('href'),
  ).toBe('/videos');
});
it('scrolls by a card and disables the correct control at each end', async () => {
  const user = userEvent.setup();
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: true })),
  );
  render(
    <ContentRail
      id="test-updates"
      title="Test updates"
      viewAllHref="/blogs"
      items={healthArticles}
    />,
  );
  const rail = screen.getByRole('list');
  Object.defineProperties(rail, {
    clientWidth: { configurable: true, value: 300 },
    scrollWidth: { configurable: true, value: 1200 },
    scrollLeft: { configurable: true, writable: true, value: 0 },
  });
  vi.spyOn(rail.firstElementChild!, 'getBoundingClientRect').mockReturnValue({
    width: 260,
    height: 300,
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: 260,
    bottom: 300,
    toJSON: () => ({}),
  });
  const scrollBy = vi.fn();
  Object.defineProperty(rail, 'scrollBy', {
    configurable: true,
    value: scrollBy,
  });
  fireEvent.scroll(rail);
  expect(
    (
      screen.getByRole('button', {
        name: 'Previous health updates',
      }) as HTMLButtonElement
    ).disabled,
  ).toBe(true);
  await user.click(screen.getByRole('button', { name: 'Next health updates' }));
  expect(scrollBy).toHaveBeenLastCalledWith({ left: 280, behavior: 'auto' });
  rail.scrollLeft = 900;
  fireEvent.scroll(rail);
  expect(
    (
      screen.getByRole('button', {
        name: 'Next health updates',
      }) as HTMLButtonElement
    ).disabled,
  ).toBe(true);
  await user.click(
    screen.getByRole('button', { name: 'Previous health updates' }),
  );
  expect(scrollBy).toHaveBeenLastCalledWith({ left: -280, behavior: 'auto' });
});
