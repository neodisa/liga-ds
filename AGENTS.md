# AGENTS.md — using @neodisa/liga-ds

Instructions for AI coding assistants (Cursor, Claude Code, Copilot, v0, …).
**Drop this file into the root of your prototype repo** (as `AGENTS.md`, `CLAUDE.md`,
or `.cursor/rules`) so the assistant builds UI on the design system instead of from scratch.

## Rule

For any UI, use ready components from **`@neodisa/liga-ds`**. Do **not** hand-build
buttons / inputs / modals / tables, and do not add another UI kit (MUI, Chakra, shadcn…).

## Setup (once)

`~/.npmrc` (token from the team's pinned message — never commit it):

```ini
@neodisa:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<TOKEN>
```

```bash
npm install @neodisa/liga-ds
```

Import the stylesheet once at the app root:

```tsx
import '@neodisa/liga-ds/styles.css';
```

## Usage

```tsx
import { Button, Field, Input, Modal, Table } from '@neodisa/liga-ds';

<Field label="Email" required>
  <Input type="email" placeholder="you@liga.ua" />
</Field>;
```

Peer deps: `react >=18`, `react-dom >=18`.

## Components

`Text`, `Heading`, `Button`, `IconButton`, `Spinner`,
`Input`, `SearchInput`, `Textarea`, `Field`, `Checkbox`, `Radio` + `RadioGroup`, `Switch`, `Select`,
`Badge`, `Tag`, `Chip`, `Alert`, `Divider`, `Skeleton`,
`Tooltip`, `Popover`, `Modal`, `Menu`,
`Tabs` (`variant="pill" | "underline"`), `Breadcrumbs`, `Pagination`,
`Avatar`, `Table`, `DatePicker`.

Compound parts: `Tabs.List/Tab/Panel`, `Modal.Trigger/Content/Title/Description/Close`,
`Popover.Trigger/Content`, `Menu.Item/Separator`, `Table.Head/Body/Row/HeaderCell/Cell`,
`Breadcrumbs.Item`.

**Exact props live in the shipped TypeScript types** (`@neodisa/liga-ds` includes `.d.ts`) —
rely on editor autocomplete; don't guess prop names.

## Theming & tokens

- Brand theme via `data-brand="united"` on `<html>`/`<body>` (default is Liga360). Don't hardcode colors.
- Use design tokens — CSS vars (`var(--text-default)`, `var(--cntnr-bg-primary-default)`, …)
  or the helpers `space()`, `radius()`, `cssVar()` from the package. No arbitrary hex/px.
- Typography: use `Text` / `Heading` (40 published styles) rather than raw font sizes.
