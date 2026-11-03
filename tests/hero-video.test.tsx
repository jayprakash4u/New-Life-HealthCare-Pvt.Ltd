import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HeroVideo } from '@/components/home/hero-video';

beforeEach(() => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function (
    this: HTMLMediaElement,
  ) {
    Object.defineProperty(this, 'paused', { configurable: true, value: false });
    this.dispatchEvent(new Event('play'));
    return Promise.resolve();
  });
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(function (
    this: HTMLMediaElement,
  ) {
    Object.defineProperty(this, 'paused', { configurable: true, value: true });
    this.dispatchEvent(new Event('pause'));
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it('plays muted and lets the visitor pause and resume the hero video', async () => {
  const user = userEvent.setup();
  const { container } = render(<HeroVideo />);
  expect(container.querySelector('video')?.muted).toBe(true);
  await user.click(
    await screen.findByRole('button', { name: 'Pause clinic video' }),
  );
  expect(container.querySelector('video')?.paused).toBe(true);
  await user.click(screen.getByRole('button', { name: 'Play clinic video' }));
  expect(container.querySelector('video')?.paused).toBe(false);
});

it('shows a still image without autoplay for reduced-motion visitors', () => {
  vi.mocked(window.matchMedia).mockReturnValue({
    matches: true,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  } as unknown as MediaQueryList);
  const { container } = render(<HeroVideo />);
  expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  expect(container.querySelector('video')?.poster).toContain(
    '/brand/hero-poster.jpg',
  );
  expect(
    screen.getByRole('button', { name: 'Play clinic video' }),
  ).toBeTruthy();
});

it('keeps a usable play control when the browser blocks autoplay', async () => {
  vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValue(
    new Error('Playback blocked'),
  );
  const user = userEvent.setup();
  render(<HeroVideo />);
  await user.click(screen.getByRole('button', { name: 'Play clinic video' }));
  await waitFor(() =>
    expect(screen.getByRole('status').textContent).toContain(
      'Please try again',
    ),
  );
});
