import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ClinicVideoFeature } from '@/components/treatments/clinic-video-feature';
import { clinicVideos } from '@/config/journal';

it('plays the featured clinic video locally and links to the video library', () => {
  render(<ClinicVideoFeature />);
  const video = clinicVideos[0];
  const player = screen.getByLabelText(video.title);
  expect(player.tagName).toBe('VIDEO');
  expect(player.getAttribute('src')).toBe(video.src);
  expect(player.hasAttribute('controls')).toBe(true);
  expect(
    screen.getByRole('link', { name: 'View all videos' }).getAttribute('href'),
  ).toBe('/videos');
});
