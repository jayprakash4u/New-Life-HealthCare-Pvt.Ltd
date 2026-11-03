# Core UI components

Import directly from `@/components/ui/<component-name>`. All shared components use Tailwind utilities. `cn()` merges conflicting overrides. Radius: `rounded-sm` = 2px, `rounded-md` = 4px, `rounded-lg` = 6px. Use full rounding only for circles such as loaders and native radios.

| Component   | API                                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------ |
| Button      | `variant`: primary, secondary, outline, ghost, danger; `size`: sm, md, lg; `loading`; defaults to `type="button"`  |
| Input       | Native input props including React 19 `ref`, disabled, required, aria-invalid                                      |
| Textarea    | Native textarea props; import from `textarea.tsx`                                                                  |
| Select      | Native select with option children; import from `select.tsx`                                                       |
| Checkbox    | Native checkbox props plus required `label`; controlled or uncontrolled                                            |
| Radio       | Native radio props plus required `label`; same `name` for exclusivity; `RadioGroup` requires `legend`              |
| Badge       | `variant`: neutral, brand, success, warning, danger, info                                                          |
| Card        | Compose CardHeader, CardTitle (h2), CardDescription, CardContent, CardFooter                                       |
| Dialog      | Dialog, DialogTrigger, DialogContent, DialogClose; content requires `title`, optional `description`                |
| Drawer      | Same composition with Drawer-prefixed exports; DrawerContent `side`: left or right                                 |
| Dropdown    | Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownLabel, DropdownSeparator, DropdownGroup          |
| Tooltip     | TooltipProvider, Tooltip, TooltipTrigger, TooltipContent                                                           |
| Table       | Table requires a region `label`; TableCaption, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell |
| Pagination  | Controlled `page`, `totalPages`, `onPageChange`; optional `disabled`                                               |
| Tabs        | Tabs, TabsList, TabsTrigger, TabsContent; `value` or `defaultValue`                                                |
| Skeleton    | Decorative placeholder sized with `className`; hidden from assistive technology                                    |
| Loader      | Live status; optional `label` and `size`: sm, md, lg                                                               |
| Empty State | EmptyState requires `title`; optional `description`, decorative `icon`, and `action`                               |

Interactive compositions belong inside a client component. Presentational primitives can remain server components when used without handlers. No global provider is added; wrap relevant subtrees in TooltipProvider.

## Forms

```tsx
import { Checkbox } from '@/components/ui/checkbox';
import { Radio, RadioGroup } from '@/components/ui/radio';

<Checkbox name="updates" label="Receive updates" />
<RadioGroup legend="Contact preference">
  <Radio name="contact" value="email" label="Email" defaultChecked />
  <Radio name="contact" value="phone" label="Phone" />
</RadioGroup>
```

Checkbox and Radio wrap their own labels; do not nest them inside another label. Input, Textarea, and Select need labels, optionally using Field. Pass matching `id`, `aria-describedby` (hint/error IDs), `aria-invalid`, and `required` attributes. Select retains native keyboard and mobile picker behavior. Use Button for actions, ButtonLink for navigation. Give icon-only buttons accessible names.

## Dialog and drawer

```tsx
'use client';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open details</Button>
  </DialogTrigger>
  <DialogContent title="Details" description="Review the information below.">
    <p>Panel content</p>
    <DialogClose asChild>
      <Button variant="outline">Done</Button>
    </DialogClose>
  </DialogContent>
</Dialog>;
```

Drawer uses the same pattern with Drawer-prefixed exports. It is a side panel, without swipe gestures. Both support Radix root `open` / `onOpenChange`, Escape and outside-click dismissal, focus containment in modal mode, scroll locking, and focus restoration. Content requires a title. Keep descriptions concise; use children for rich content. `asChild` requires one element that accepts received props and its ref.

## Dropdown and tooltip

```tsx
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from '@/components/ui/dropdown';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

<Dropdown>
  <DropdownTrigger asChild><Button variant="outline">Actions</Button></DropdownTrigger>
  <DropdownContent align="end">
    <DropdownItem onSelect={handleEdit}>Edit</DropdownItem>
    <DropdownItem disabled>Unavailable</DropdownItem>
    <DropdownItem destructive onSelect={handleDelete}>Delete</DropdownItem>
  </DropdownContent>
</Dropdown>
<TooltipProvider delayDuration={300}>
  <Tooltip>
    <TooltipTrigger asChild><Button variant="ghost">Help</Button></TooltipTrigger>
    <TooltipContent>Additional guidance</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

Dropdown is an action menu; Select is a form field. Use menu item `onSelect` for keyboard and pointer activation. Tooltip content is brief supporting text, with no interactive children. Essential instructions must also be visible elsewhere. Give icon-only triggers their own accessible name.

## Tabs and pagination

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Pagination } from '@/components/ui/pagination';

<Tabs defaultValue="overview">
  <TabsList aria-label="Record sections">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="history">History</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="history">History content</TabsContent>
</Tabs>
<Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
```

Page numbers are one-based integers; totalPages is a nonnegative integer. Zero results use page 1 and totalPages 0. Keep page within bounds when results change. Pagination renders a bounded set for large totals and never fetches data. Label multiple pagination regions distinctly. Tabs support Radix orientation, keyboard navigation, disabled triggers, and manual activation.

## Tables and feedback

```tsx
import { Table, TableCaption, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader } from '@/components/ui/loader';
import { EmptyState } from '@/components/ui/empty-state';

<Table label="Example records">
  <TableCaption>Example records</TableCaption>
  <TableHeader><TableRow><TableHead>Name</TableHead></TableRow></TableHeader>
  <TableBody><TableRow><TableCell>Example</TableCell></TableRow></TableBody>
</Table>
<Loader label="Loading records" />
<Skeleton className="h-6 w-48" />
<EmptyState title="No records yet" description="Records will appear here once added." />
```

Tables preserve HTML semantics with a focusable, labeled horizontal scroll region. Use TableHead `scope="row"` for row headers. Announce loading once using Loader and mark the relevant data region `aria-busy` while loading. Skeletons are decorative. Badge status must include meaningful text. EmptyState is static; the consuming feature can add live announcements for asynchronously changing results.

## Validation

`npm test` covers keyboard interactions, modal focus containment and restoration, descriptions, menu selection, tabs, tooltips, native choices, pagination, and Tailwind overrides. `npm run check` runs lint, types, and formatting; `npm run build` verifies production compilation. Browser and assistive-technology checks remain necessary when real pages are introduced.

References: [Tailwind theme variables](https://tailwindcss.com/docs/theme), [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog), [Radix Dropdown Menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu).
