# AGENTS.md — using @neodisa/liga-ds

Instructions for AI coding assistants (Cursor, Claude Code, Copilot, …).
**Drop this file into the root of your prototype repo** (as `AGENTS.md`, `CLAUDE.md`,
or `.cursor/rules`) so the assistant builds UI on the design system instead of from scratch.

`@neodisa/liga-ds` is an **Angular 20** design system (standalone components, multi-brand
Liga360 / United, WCAG 2.1 AA).

## Rule

For any UI, use ready components from **`@neodisa/liga-ds`**. Do **not** hand-build
buttons / inputs / modals / tables, and do not add another UI kit (Angular Material, PrimeNG,
NG-ZORRO…). Don't hardcode colors, font sizes, or spacing — use system tokens (CSS variables).

## Environment

Angular >= 20. Peer deps the host app must have:
`@angular/core >=20`, `@angular/common >=20`, `@angular/cdk >=20.2`.

## Setup (once)

`~/.npmrc` (token with `read:packages` scope from the team's pinned message — never commit it):

```ini
@neodisa:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<TOKEN>
```

```bash
npm install @neodisa/liga-ds
```

Add the global stylesheets to the `styles` array of your build target in `angular.json`,
in this order:

```json
"styles": [
  "node_modules/@neodisa/liga-ds/src/tokens/reset.css",
  "node_modules/@neodisa/liga-ds/src/tokens/tokens.generated.css",
  "node_modules/@neodisa/liga-ds/src/tokens/typography.css",
  "src/styles.css"
]
```

Put the `liga-root` class on the element carrying base typography/background (usually `<body>`).

## Usage

Components are **standalone** — import the class, add it to your component's `imports`, use the
`ld-*` selector:

```ts
import { Component } from '@angular/core';
import { LdButtonComponent, LdFieldComponent, LdInputComponent } from '@neodisa/liga-ds';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [LdButtonComponent, LdFieldComponent, LdInputComponent],
  template: `
    <ld-field label="Email" [required]="true">
      <ld-input type="email" placeholder="you@liga.ua" />
    </ld-field>
    <ld-button variant="primary" size="md">Save</ld-button>
  `,
})
export class ExampleComponent {}
```

**Exact `@Input`/`@Output` names live in the shipped TypeScript types** (`@neodisa/liga-ds`
includes `.d.ts`) — rely on editor autocomplete; don't guess.

## Components (class · selector)

`LdTextComponent` · `ld-text`, `LdHeadingComponent` · `ld-heading`,
`LdButtonComponent` · `ld-button`, `LdIconButtonComponent` · `ld-icon-button`,
`LdSpinnerComponent` · `ld-spinner`,
`LdInputComponent` · `ld-input`, `LdSearchInputComponent` · `ld-search-input`,
`LdTextareaComponent` · `ld-textarea`, `LdFieldComponent` · `ld-field`,
`LdCheckboxComponent` · `ld-checkbox`, `LdRadioComponent` / `LdRadioGroupComponent` ·
`ld-radio` / `ld-radio-group`, `LdSwitchComponent` · `ld-switch`,
`LdSelectComponent` · `ld-select`,
`LdBadgeComponent` · `ld-badge`, `LdTagComponent` · `ld-tag`, `LdChipComponent` · `ld-chip`,
`LdAlertComponent` · `ld-alert`, `LdInlineInformComponent` · `ld-inline-inform`,
`LdDividerComponent` · `ld-divider`, `LdSkeletonComponent` · `ld-skeleton`,
`LdAvatarComponent` · `ld-avatar`,
`LdTooltipDirective` · `[ldTooltip]`, `LdPopoverComponent` · `ld-popover`,
`LdModalComponent` / `LdModalContentComponent` · `ld-modal` / `ld-modal-content`,
`LdMenuComponent` · `ld-menu`,
`LdTabsComponent` / `LdTabPanelComponent` · `ld-tabs` / `ld-tab-panel`,
`LdBreadcrumbsComponent` · `ld-breadcrumbs`, `LdPaginationComponent` · `ld-pagination`,
`LdTableComponent` · `ld-table`, `LdDatePickerComponent` · `ld-date-picker`.

Variant unions are exported with each component (e.g. `ButtonVariant`, `ButtonSize`,
`BadgeTone`, `TabsVariant`) — import them for typing.

## Icons

The 459-icon set is currently **React/SVGR only and not yet ported to Angular** — there is no
Angular icon export from `@neodisa/liga-ds` yet. For now, inline your own SVGs styled with
system tokens (`currentColor`, token-based sizing); don't pull a third-party icon kit.

## Theming & tokens

- Brand theme via `data-brand="united"` on `<html>`/`<body>` (default is Liga360). Keep the
  `liga-root` class on the base element. Don't hardcode colors.
- Use design tokens — CSS vars (`var(--text-default)`, `var(--cntnr-bg-primary-default)`, …)
  or the helpers `space()`, `radius()`, `cssVar()` exported from the package. No arbitrary hex/px.
- Typography: use `ld-text` / `ld-heading` (40 published styles) rather than raw font sizes.
