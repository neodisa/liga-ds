# Liga DS

A universal, accessible, production-grade **React design system** for LigaZakon products —
built directly from the **"❖ UI LIBRARY"** Figma source (real tokens, real component specs),
not invented. Multi-brand (**Liga360** / **United**), token-driven, WCAG 2.1 AA.

> Canonical design reference: **[docs/foundation.md](docs/foundation.md)** — principles, token
> architecture, accessibility baseline, API conventions, and the component roadmap.

---

## Install

```bash
npm install liga-ds
```

Peer dependencies: `react >=18`, `react-dom >=18`.

## Usage

Import the stylesheet once (at your app root), then use components:

```tsx
import 'liga-ds/styles.css';
import { Button, Field, Input, Select } from 'liga-ds';

export function Example() {
  return (
    <Field label="Email" description="We never share it." required>
      <Input type="email" placeholder="you@liga.ua" />
    </Field>
  );
}
```

### Theming (brands)

The theming axis is **brand**, not light/dark. Default is Liga360. Switch by setting
`data-brand` on any ancestor (usually `<html>` or `<body>`), and add the `liga-root` class
to the element that should carry base typography/background:

```html
<body class="liga-root" data-brand="united">…</body>
```

| Brand | `data-brand` | Font |
| --- | --- | --- |
| Liga360 (default) | _none_ or `liga360` | Lato |
| United | `united` | e-Ukraine |

Provide the brand fonts (Lato / e-Ukraine) in your app; the system falls back to a system
font stack if they aren't loaded.

### Tokens

Every value resolves to a Figma token CSS variable (real names, e.g. `--text-default`,
`--cntnr-bg-primary-default`, `--btn-bg-danger-hover`, `--cntnr-corner-normal`). Reference them
in your own CSS, or use the typed helpers:

```ts
import { space, radius, cssVar, type Tone } from 'liga-ds';
space('100');          // → var(--space-100)  (8px)
radius('normal');      // → var(--cntnr-corner-normal)  (8px)
cssVar('text-accent'); // → var(--text-accent)
```

---

## Components

| Family | Components |
| --- | --- |
| **Typography** | `Text`, `Heading` (26 published text styles) |
| **Actions** | `Button`, `IconButton` (6 variants × 4 sizes × states), `Spinner` |
| **Forms** | `Input`, `SearchInput`, `Textarea`, `Field`, `Checkbox`, `Radio` + `RadioGroup`, `Select` |
| **Status** | `Badge`, `Tag`, `Chip` (6 tones, solid/subtle) |
| **Selection (rich)** | `Select` (listbox + typeahead), `Menu` (`Menu.Item` / `Menu.Separator`) |
| **Feedback** | `Alert`, `Divider`, `Skeleton` |
| **Overlays** | `Tooltip`, `Popover`, `Modal` (focus-trapped, dismissible) |
| **Navigation** | `Tabs` (`Tabs.List` / `Tabs.Tab` / `Tabs.Panel`) |
| **Data** | `Avatar`, `Table` (`Table.Head/Body/Row/HeaderCell/Cell`, zebra · hover · sortable), `DatePicker` |

All components: `forwardRef`, `className`/`style` passthrough, controlled + uncontrolled where
stateful, full keyboard + ARIA, both brands verified. 27 components, 94 tests (incl. axe).

### Roadmap (not yet built)

Only app-shell composites from the Figma library remain, to be built with the same fidelity
and definition-of-done: **Header**, **Filters bar**, **Burger** menu.

---

## Development

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite playground (component gallery + brand toggle) at `localhost:5173` |
| `npm run build` | Library build → `dist/` (ESM + CJS + `.d.ts` + `liga-ds.css`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest + Testing Library + axe |

**Stack:** React 19 / TypeScript 6 / Vite 8 (library mode) · CSS custom-property tokens + CSS
Modules (zero consumer styling lock-in) · `@floating-ui/react` for overlay positioning &
focus management · Vitest + axe for unit + accessibility tests.

### Regenerating tokens from Figma

The runtime token layer (`src/tokens/tokens.generated.css`) is generated from the Figma file
via the figma-console MCP (`figma_export_tokens` → css-vars) and the transform script. Do not
hand-edit the generated file; edit tokens in Figma and re-export.

## License

MIT
