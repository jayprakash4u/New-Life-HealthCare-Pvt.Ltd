import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Radio, RadioGroup } from '@/components/ui/radio';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerTrigger, DrawerContent } from '@/components/ui/drawer';
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from '@/components/ui/dropdown';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { Pagination } from '@/components/ui/pagination';
import { cn } from '@/lib/cn';

describe('form behavior', () => {
  it('does not submit a form by default, and blocks loading actions', async () => {
    const user = userEvent.setup();
    const submit = vi.fn((event) => event.preventDefault());
    const action = vi.fn();
    render(
      <form onSubmit={submit}>
        <Button>Action</Button>
        <Button loading onClick={action}>
          Saving
        </Button>
      </form>,
    );
    await user.click(screen.getByRole('button', { name: 'Action' }));
    await user.click(screen.getByRole('button', { name: 'Saving' }));
    expect(submit).not.toHaveBeenCalled();
    expect(action).not.toHaveBeenCalled();
    expect(
      screen.getByRole('button', { name: 'Saving' }).getAttribute('aria-busy'),
    ).toBe('true');
  });

  it('supports label activation, disabled checkboxes, and exclusive radio selection', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Checkbox name="updates" label="Receive updates" />
        <Checkbox label="Unavailable" disabled />
        <RadioGroup legend="Contact method">
          <Radio name="contact" value="email" label="Email" defaultChecked />
          <Radio name="contact" value="phone" label="Phone" />
        </RadioGroup>
      </>,
    );
    await user.click(screen.getByText('Receive updates'));
    expect(
      (
        screen.getByRole('checkbox', {
          name: 'Receive updates',
        }) as HTMLInputElement
      ).checked,
    ).toBe(true);
    await user.click(screen.getByText('Unavailable'));
    expect(
      (
        screen.getByRole('checkbox', {
          name: 'Unavailable',
        }) as HTMLInputElement
      ).checked,
    ).toBe(false);
    await user.click(screen.getByLabelText('Phone'));
    expect((screen.getByLabelText('Phone') as HTMLInputElement).checked).toBe(
      true,
    );
    expect((screen.getByLabelText('Email') as HTMLInputElement).checked).toBe(
      false,
    );
  });
});

describe.each([
  ['Dialog', Dialog, DialogTrigger, DialogContent],
  ['Drawer', Drawer, DrawerTrigger, DrawerContent],
] as const)('%s behavior', (_name, Root, Trigger, Content) => {
  it('labels the modal, traps focus, closes on Escape, and restores the trigger', async () => {
    const user = userEvent.setup();
    render(
      <Root>
        <Trigger asChild>
          <Button>Open panel</Button>
        </Trigger>
        <Content title="Panel title" description="Panel explanation">
          <Button>Inside</Button>
        </Content>
      </Root>,
    );
    const trigger = screen.getByRole('button', { name: 'Open panel' });
    await user.click(trigger);
    const dialog = screen.getByRole('dialog', { name: 'Panel title' });
    const description = dialog.getAttribute('aria-describedby');
    expect(
      description && document.getElementById(description)?.textContent,
    ).toBe('Panel explanation');
    for (let i = 0; i < 4; i++) {
      await user.tab();
      expect(dialog.contains(document.activeElement)).toBe(true);
    }
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(document.activeElement).toBe(trigger);
  });
});

it('supports menu keyboard selection and skips disabled items', async () => {
  const user = userEvent.setup();
  const selected = vi.fn();
  render(
    <Dropdown>
      <DropdownTrigger asChild>
        <Button>Actions</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem disabled>Unavailable</DropdownItem>
        <DropdownItem onSelect={selected}>Edit</DropdownItem>
      </DropdownContent>
    </Dropdown>,
  );
  screen.getByRole('button', { name: 'Actions' }).focus();
  await user.keyboard('{ArrowDown}');
  await waitFor(() => expect(document.activeElement?.textContent).toBe('Edit'));
  await user.keyboard('{Enter}');
  expect(selected).toHaveBeenCalledOnce();
  expect(screen.queryByRole('menu')).toBeNull();
});

it('connects tab panels and supports arrow navigation', async () => {
  const user = userEvent.setup();
  render(
    <Tabs defaultValue="one">
      <TabsList aria-label="Sample tabs">
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two">Two</TabsTrigger>
      </TabsList>
      <TabsContent value="one">First panel</TabsContent>
      <TabsContent value="two">Second panel</TabsContent>
    </Tabs>,
  );
  screen.getByRole('tab', { name: 'One' }).focus();
  await user.keyboard('{ArrowRight}');
  expect(
    screen.getByRole('tab', { name: 'Two' }).getAttribute('aria-selected'),
  ).toBe('true');
  expect(screen.getByRole('tabpanel').textContent).toBe('Second panel');
});

it('shows a tooltip on keyboard focus and dismisses it with Escape', async () => {
  const user = userEvent.setup();
  render(
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Help</Button>
        </TooltipTrigger>
        <TooltipContent>Helpful detail</TooltipContent>
      </Tooltip>
    </TooltipProvider>,
  );
  await user.tab();
  expect((await screen.findByRole('tooltip')).textContent).toBe(
    'Helpful detail',
  );
  await user.keyboard('{Escape}');
  await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull());
});

describe('pagination', () => {
  it('limits rendered pages, marks the current page, and emits controlled changes', async () => {
    const user = userEvent.setup();
    const changed = vi.fn();
    render(<Pagination page={500} totalPages={1000} onPageChange={changed} />);
    expect(screen.getAllByRole('button').length).toBeLessThanOrEqual(7);
    expect(
      screen
        .getByRole('button', { name: 'Page 500' })
        .getAttribute('aria-current'),
    ).toBe('page');
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(changed).toHaveBeenLastCalledWith(501);
  });
  it('disables navigation when there are no results', async () => {
    const user = userEvent.setup();
    const changed = vi.fn();
    render(<Pagination page={1} totalPages={0} onPageChange={changed} />);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    await user.click(screen.getByRole('button', { name: 'Previous' }));
    expect(changed).not.toHaveBeenCalled();
  });
});

it('allows Tailwind class overrides without conflicting utility classes', () => {
  expect(cn('rounded-md px-4', 'rounded-sm px-2')).toBe('rounded-sm px-2');
});
