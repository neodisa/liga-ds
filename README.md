# Liga DS

A universal, accessible, production-grade **Angular design system** for LigaZakon products —
built directly from the **"❖ UI LIBRARY"** Figma source (real tokens, real component specs),
not invented. Multi-brand (**Liga360** / **United**), token-driven, WCAG 2.1 AA.

> Canonical design reference: **[docs/foundation.md](docs/foundation.md)** — principles, token
> architecture, accessibility baseline, API conventions, and the component roadmap.

---

## Install

The package is published privately to **GitHub Packages** as `@neodisa/liga-ds`.

**1. Point the `@neodisa` scope at GitHub Packages** — add to your project's (or `~/`) `.npmrc`:

```ini
@neodisa:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

**2. Authenticate** — each consumer needs a GitHub token with the **`read:packages`** scope
(Settings → Developer settings → Personal access tokens). Export it (don't commit it):

```bash
export GITHUB_TOKEN=ghp_xxx   # token with read:packages
```

**3. Install:**

```bash
npm install @neodisa/liga-ds
```

This pulls the **built package only** (no source). Peer dependencies: `@angular/core >=20`,
`@angular/common >=20`, `@angular/cdk >=20.2`.

> Alternative (no registry, requires git read access to the private repo):
> `npm install github:neodisa/liga-ds#<tag>`

## Usage

### 1. Global styles

The system ships three global stylesheets (reset, tokens, typography). Add them to the
`styles` array of your build target in `angular.json`, **in this order**:

```json
"styles": [
  "node_modules/@neodisa/liga-ds/src/tokens/reset.css",
  "node_modules/@neodisa/liga-ds/src/tokens/tokens.generated.css",
  "node_modules/@neodisa/liga-ds/src/tokens/typography.css",
  "src/styles.css"
]
```

Component styles are bundled into the components themselves (`ViewEncapsulation.None`) and
injected at runtime — there is nothing else to import per component.

Put the `liga-root` class on the element that should carry base typography/background
(usually `<body>`):

```html
<body class="liga-root">…</body>
```

### 2. Components

Components are **standalone** — import the class and add it to your component's `imports`,
then use its `ld-*` selector in the template:

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

Exact `@Input`/`@Output` names live in the shipped TypeScript types (`.d.ts` ships in the
package) — rely on editor autocomplete; don't guess.

### Theming (brands)

The theming axis is **brand**, not light/dark. Default is Liga360. Switch by setting
`data-brand` on any ancestor (usually `<html>` or `<body>`), and keep the `liga-root` class
on the element that carries base typography/background:

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
in your own CSS, or use the typed helpers exported from the package:

```ts
import { space, radius, cssVar, type Tone } from '@neodisa/liga-ds';
space('100');          // → var(--space-100)  (8px)
radius('normal');      // → var(--cntnr-corner-normal)  (8px)
cssVar('text-accent'); // → var(--text-accent)
```

---

## Components

All components are standalone, `ld-*`-selectored, fully keyboard-accessible with ARIA, and
verified in both brands.

| Family | Component (class · selector) |
| --- | --- |
| **Typography** | `LdTextComponent` · `ld-text`, `LdHeadingComponent` · `ld-heading` (40 published text styles) |
| **Actions** | `LdButtonComponent` · `ld-button`, `LdIconButtonComponent` · `ld-icon-button`, `LdSpinnerComponent` · `ld-spinner` |
| **Forms** | `LdInputComponent` · `ld-input`, `LdSearchInputComponent` · `ld-search-input`, `LdTextareaComponent` · `ld-textarea`, `LdFieldComponent` · `ld-field`, `LdCheckboxComponent` · `ld-checkbox`, `LdRadioComponent` / `LdRadioGroupComponent` · `ld-radio` / `ld-radio-group`, `LdSwitchComponent` · `ld-switch`, `LdSelectComponent` · `ld-select` |
| **Status / Labels** | `LdBadgeComponent` · `ld-badge`, `LdTagComponent` · `ld-tag`, `LdChipComponent` · `ld-chip` |
| **Feedback** | `LdAlertComponent` · `ld-alert`, `LdInlineInformComponent` · `ld-inline-inform`, `LdDividerComponent` · `ld-divider`, `LdSkeletonComponent` · `ld-skeleton` |
| **Overlays (CDK)** | `LdTooltipDirective` · `[ldTooltip]`, `LdPopoverComponent` · `ld-popover`, `LdModalComponent` / `LdModalContentComponent` · `ld-modal` / `ld-modal-content`, `LdMenuComponent` · `ld-menu` |
| **Navigation** | `LdTabsComponent` / `LdTabPanelComponent` · `ld-tabs` / `ld-tab-panel`, `LdBreadcrumbsComponent` · `ld-breadcrumbs`, `LdPaginationComponent` · `ld-pagination` |
| **Data** | `LdAvatarComponent` · `ld-avatar`, `LdTableComponent` · `ld-table` (zebra · hover · sortable), `LdDatePickerComponent` · `ld-date-picker` |

Variant unions are exported alongside each component, e.g.:

```ts
import type { ButtonVariant, ButtonSize } from '@neodisa/liga-ds';
// ButtonVariant: 'primary' | 'secondary' | 'transparent' | 'danger' | 'danger-secondary' | 'danger-transparent'
// ButtonSize:    'sm' | 'md' | 'lg' | 'xl'
```

### Icons

The icon set (459 icons generated from the **IconPack Liga360** Figma library) currently ships
as **React/SVGR** components under [`icons/`](icons/) and is **not yet ported to Angular** — it
is not exported from `@neodisa/liga-ds` for Angular consumers. Until the Angular port lands,
inline your own SVGs styled with system tokens, or track the roadmap below. Don't pull a
third-party icon kit.

### Roadmap (not yet built)

- **Angular icon components** — port the 459-icon set to standalone Angular components /
  directive, exposed as `@neodisa/liga-ds/icons` (size via `width`/`height`, color via
  `currentColor`, accessible `title`).
- **App-shell composites** from the Figma library: **Header**, **Filters bar**, **Burger** menu —
  same fidelity and definition-of-done as the rest.

---

## Development

This is an Angular CLI workspace: the library lives in `projects/liga-ds`, the demo gallery in
`projects/playground`.

| Script | What it does |
| --- | --- |
| `npm start` | `ng serve playground` — component gallery + brand toggle |
| `npm run build` | `ng build liga-ds` — library build → `projects/liga-ds/dist` (FESM2022 + `.d.ts` + token CSS assets) |
| `npm run typecheck` | `tsc --noEmit` against the library tsconfig |
| `npm test` | `ng test liga-ds` (component specs are being ported) |

**Stack:** Angular 20 / TypeScript 5.8 · standalone components · CSS custom-property tokens
(`ViewEncapsulation.None`, zero consumer styling lock-in) · `@angular/cdk` for overlay
positioning & focus management · packaged with **ng-packagr**.

### Publishing

Publishing is automated on a version tag (see `.github/workflows/publish.yml`). Two things to
know:

- **Build in production (partial compilation) before publishing.** ng-packagr's dev build uses
  *full* compilation mode, which is not publishable — the generated `prepublishOnly` guard will
  refuse it. Publish from a production build.
- **Bump the version.** The registry holds the previous React builds at `0.1.0` / `0.2.0`; the
  Angular line starts at `1.0.0` (React→Angular is a full breaking change). Publish from a
  matching `v*` tag (`v1.0.0`).

### Regenerating tokens from Figma

The runtime token layer (`projects/liga-ds/src/tokens/tokens.generated.css`) is generated from
the Figma file via the figma-console MCP (`figma_export_tokens` → css-vars) and the transform
script. Do not hand-edit the generated file; edit tokens in Figma and re-export.

## License

MIT
