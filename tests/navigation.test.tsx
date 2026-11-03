import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SiteHeader } from '@/components/layout/site-header';
import { isNavigationActive } from '@/config/navigation';
import { services } from '@/config/services';
import { treatments } from '@/config/treatments';
import { HeroAccess } from '@/components/home/hero-access';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

describe('site navigation', () => {
  it('matches the current section without marking home or similarly named routes', () => {
    expect(isNavigationActive('/', '/')).toBe(true);
    expect(isNavigationActive('/services', '/')).toBe(false);
    expect(isNavigationActive('/services/checkup', '/services')).toBe(true);
    expect(isNavigationActive('/services-other', '/services')).toBe(false);
  });

  it('exposes the approved desktop links and current-page marker', () => {
    render(<SiteHeader />);
    const nav = within(
      screen.getByRole('navigation', { name: 'Main navigation' }),
    );
    expect(nav.getAllByRole('link').map((link) => link.textContent)).toEqual([
      'Home',
      'Our location',
      'Contact us',
      'Book an appointment',
    ]);
    const quickLinks = within(
      screen.getByRole('navigation', { name: 'Quick links' }),
    );
    expect(
      quickLinks
        .getByRole('link', { name: 'Find a doctor' })
        .getAttribute('href'),
    ).toBe('/doctors');
    expect(
      quickLinks.getByRole('link', { name: 'Blogs' }).getAttribute('href'),
    ).toBe('/blogs');
    expect(nav.getByRole('button', { name: 'About us' })).toBeTruthy();
    expect(nav.getByRole('button', { name: 'Services' })).toBeTruthy();
    expect(nav.getByRole('button', { name: 'Treatments' })).toBeTruthy();
    expect(
      nav.getByRole('link', { name: 'Our location' }).getAttribute('href'),
    ).toBe('/our-location');
    expect(
      nav.getByRole('link', { name: 'Home' }).getAttribute('aria-current'),
    ).toBe('page');
    expect(
      screen
        .getByRole('link', { name: 'Skip to content' })
        .getAttribute('href'),
    ).toBe('#main-content');
  });

  it('opens a navigation dropdown by keyboard and restores focus on Escape', async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    const trigger = within(
      screen.getByRole('navigation', { name: 'Main navigation' }),
    ).getByRole('button', { name: 'About us' });
    trigger.focus();
    await user.keyboard('{ArrowDown}');
    expect(
      await screen.findByRole('menuitem', { name: /About New Life/ }),
    ).toBeTruthy();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
    expect(document.activeElement).toBe(trigger);
  });

  it.each([
    ['Services', services],
    ['Treatments', treatments],
  ] as const)(
    'links every %s item to its available page or appointment request',
    async (label, itemsData) => {
      const user = userEvent.setup();
      render(
        <>
          <SiteHeader />
          <HeroAccess />
        </>,
      );
      await user.click(
        within(
          screen.getByRole('navigation', { name: 'Main navigation' }),
        ).getByRole('button', { name: label }),
      );
      const items = within(
        screen.getByRole('menu', { name: label }),
      ).getAllByRole('menuitem');
      expect(items).toHaveLength(itemsData.length);
      for (const service of itemsData) {
        expect(
          items.some(
            (item) =>
              item.getAttribute('href') ===
              (label === 'Treatments'
                ? `/treatments/${service.id}`
                : `/services/${service.id}`),
          ),
        ).toBe(true);
        expect(document.getElementById('plan-your-visit')?.tagName).toBe(
          'SECTION',
        );
      }
    },
  );

  it('keeps Our team inside About us in the mobile drawer', async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    await user.click(
      screen.getByRole('button', { name: 'Open navigation menu' }),
    );
    const mobile = within(
      screen.getByRole('navigation', { name: 'Mobile navigation' }),
    );
    const team = mobile.getByRole('link', { name: 'Our team' });
    const aboutGroup = team.closest('details');
    expect(aboutGroup?.querySelector('summary')?.textContent).toBe('About us');
    expect(aboutGroup?.open).toBe(false);
    await user.click(mobile.getByText('About us', { exact: true }));
    expect(aboutGroup?.open).toBe(true);
    expect(
      mobile.getByRole('link', { name: 'Our team' }).getAttribute('href'),
    ).toBe('/team');
  });

  it('opens the mobile menu and closes it when a destination is selected', async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    await user.click(
      screen.getByRole('button', { name: 'Open navigation menu' }),
    );
    const drawer = screen.getByRole('dialog', { name: 'Explore New Life' });
    const nav = within(drawer).getByRole('navigation', {
      name: 'Mobile navigation',
    });
    expect(
      within(nav)
        .getByRole('link', { name: 'Contact us' })
        .getAttribute('href'),
    ).toBe('/contact');
    await user.click(within(nav).getByRole('link', { name: 'Home' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });

  it.each([
    ['Treatments', treatments],
    ['Services', services],
  ] as const)(
    'updates the %s illustration on hover and keyboard focus',
    async (label, data) => {
      const user = userEvent.setup();
      render(<SiteHeader />);
      const trigger = within(
        screen.getByRole('navigation', { name: 'Main navigation' }),
      ).getByRole('button', { name: label });
      await user.click(trigger);
      const menu = within(screen.getByRole('menu', { name: label }));
      const preview = menu.getByTestId('care-menu-preview');
      const items = menu.getAllByRole('menuitem');
      expect(preview.getAttribute('data-care')).toBe(
        label === 'Treatments'
          ? '/treatments/general-consultations'
          : `/services/${data[0].id}`,
      );
      await user.hover(items[items.length - 1]);
      expect(preview.getAttribute('data-care')).toBe(
        items[items.length - 1].getAttribute('href'),
      );
      await user.keyboard('{Home}');
      await user.keyboard('{ArrowDown}');
      expect(preview.getAttribute('data-care')).toBe(
        items[1].getAttribute('href'),
      );
      await user.keyboard('{Escape}');
      await user.click(trigger);
      expect(
        screen.getByTestId('care-menu-preview').getAttribute('data-care'),
      ).toBe(items[0].getAttribute('href'));
    },
  );
});
