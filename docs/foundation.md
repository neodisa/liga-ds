# Liga DS — Foundation

> The canonical reference for the Liga Design System. Every component, token, and decision
> traces back to this document. When in doubt, this file wins.
> Status: **living document**. Last updated 2026-06-02.

---

## 1. What Liga DS is

A **universal, production-grade, framework-internal React component library** — the kind a
serious product firm ships and dogfoods. Not a theme, not a Tailwind preset, not a wrapper
around someone else's kit. It owns its tokens, its accessibility, its API surface, and its
build output.

**Non-negotiables (the bar):**

- **Accessible by default** — WCAG 2.1 AA. Keyboard, screen reader, focus management, and
  color contrast are part of "done", not a later pass.
- **Token-driven** — no hardcoded colors, spacing, or radii in any component. Everything
  resolves through CSS custom properties.
- **Themeable** — light and dark out of the box, brandable by overriding semantic tokens.
- **Controlled + uncontrolled** — every stateful component supports both.
- **Composable** — small primitives compose into complex components; consumers compose too.
- **Zero styling lock-in for consumers** — they import our CSS; they don't have to adopt
  Tailwind, CSS-in-JS runtime, or any build plugin.
- **Tree-shakeable** — named ESM exports, `sideEffects` declared, per-component CSS.

---

## 2. Design principles

1. **Clarity over cleverness.** A component's API should be guessable. Prop names are boring
   on purpose (`variant`, `size`, `tone`, `disabled`, `loading`).
2. **One way to do the common thing.** Sensible defaults; variants for the rest.
3. **Accessible is the default path, not the opt-in.** You should have to work to make a
   Liga component inaccessible.
4. **The platform first.** Use native elements (`<button>`, `<input>`, `<dialog>` semantics,
   `<table>`) before reaching for ARIA. ARIA augments; it never replaces a real element.
5. **Tokens are the contract.** Visual change happens in tokens, not in component CSS.
6. **Predictable composition.** `forwardRef`, `className` and `style` passthrough, and
   `data-*` state hooks on every component so consumers can extend without forking.

---

## 3. Tech stack (LOCKED — reversible-with-cost)

| Concern | Choice | Why |
| --- | --- | --- |
| Language | **TypeScript 6** (strict) | Types are part of the public API. |
| UI runtime | **React 19** (peer dep `>=18`) | Built against current React; supports 18 & 19 consumers. |
| Build | **Vite 8 library mode** + `vite-plugin-dts` | ESM + CJS output, `.d.ts` emitted, fast. |
| Styling | **CSS custom properties (tokens) + CSS Modules** per component | Zero runtime, portable, no consumer lock-in, scoped class names. Native CSS nesting (no PostCSS dependency). |
| Docs / dev env | **Vite playground** (`/playground`, light/dark gallery) | Instantly runnable, fully controlled, Playwright-screenshotable. Storybook 10 deferred to finalize as an optional add-on — avoids heavy version-churny config and keeps the toolchain lean. |
| Unit / DOM tests | **Vitest + @testing-library/react** | Fast, Vite-native. |
| Interaction / visual tests | **Playwright** | Real-browser keyboard, focus, overlay behavior. |
| a11y assertions | **axe-core** (`@axe-core/playwright` + `vitest-axe`) | Automated WCAG checks in CI. |
| Package manager | **npm** (lockfile committed) | Lowest-friction default. |

**Why CSS Modules + CSS variables and not Tailwind / vanilla-extract / CSS-in-JS:**
A universal DS must not force its styling engine onto consumers. CSS variables + plain CSS
Modules ship as a single static stylesheet, work in any React app (Next.js, Vite, CRA,
Remix), have no runtime cost, and let brands re-theme by overriding `:root` variables. This
is the same architecture used by mature systems (Radix Themes, GitHub Primer CSS).

> If the user later mandates a different framework (Vue/Svelte) or styling engine, revisit
> this table — the token layer (§5) is engine-agnostic and survives the change.

---

## 4. Repository layout

```
Liga DS/
├── package.json
├── tsconfig.json
├── vite.config.ts            # library build
├── .storybook/               # Storybook config
├── src/
│   ├── index.ts              # public barrel (named exports)
│   ├── tokens/
│   │   ├── primitives.css    # raw scales  (--liga-blue-500 …)
│   │   ├── semantic.css      # role tokens (--liga-color-bg, --liga-color-accent …)
│   │   ├── themes.css        # [data-theme="light"|"dark"] overrides
│   │   ├── reset.css         # minimal, scoped reset
│   │   └── tokens.ts         # typed token references for JS consumers
│   ├── utils/                # cn(), useControllableState(), polymorphic types, ids, focus
│   ├── components/
│   │   └── <Component>/
│   │       ├── <Component>.tsx
│   │       ├── <Component>.module.css
│   │       ├── <Component>.stories.tsx
│   │       ├── <Component>.test.tsx
│   │       └── index.ts
│   └── styles.css            # imports tokens/* + reset; the consumer's one stylesheet
└── docs/                     # foundation + usage docs
```

---

## 5. Token architecture — SOURCED FROM FIGMA (not invented)

> **Single source of truth:** the Figma file **"❖ UI LIBRARY"** (fileKey `fOisEfYBh4z6VbkY6sOmSn`),
> 758 variables across 5 collections. We export it (figma-console MCP → `figma_export_tokens`
> css-vars) and transform it into the runtime layer. We use the **real Figma token names
> verbatim** — they are the firm's vocabulary; we do not rename or prefix them.

### The brand axis (not light/dark)
The theming axis is **brand**, with two modes from Figma: **Liga360** (default) and **United**.
Switching brand = overriding the *primitive values*; the semantic tokens are var-references that
follow automatically.
- `:root` = Liga360 primitives + semantics + font (Lato) + desktop sizes.
- `[data-brand="united"]` = the 163 primitive/value overrides that differ + font (e-Ukraine).

### Layer 1 — Primitives (Figma collection "Primitives", 160 vars)
Raw values named by value. Examples (Liga360):
- `--color-primary-{100…1000}` (brand purple `#7267E6` @500), `--color-neutral-solid-{100…1000}`
  (+125/150/350/450), `--color-dark-neutral-solid-*`, `--color-neutral-alpha-*`,
  `--color-other-colors-{red,blue,cool-green,warm-green,warm-yellow,orange,orange-red}-{100…1000}`.
- `--spacings-{0,2,4,6,8,12,16,20,24,32,36,40,48,64,80,100}` (px) and the semantic
  `--space-{0,025,050,075,100,150,200,250,300,400,450,500,600,800,1000,1200}` scale.
- `--corner-radius-{0,2,4,8,12,16,24,infinity}`.
- `--shadow-z-index-eleveation-{1,2,3}-{color,blur,spread}` (Elevation 1–3).

### Layer 2 — Semantic / "Tokens" (Figma collection "Tokens", 191 vars)
Role-based, var-referencing primitives. The vocabulary components consume:
- Text: `--text-{default,subtle,subtlest,disabled,hover,danger,warning,success,information,active,click,accent,alternative,brand-liga}`.
- Icon: `--icon-{default,subtle,subtlest,disabled,hover,brand,danger,warning,success,info,accent,active,click}`.
- Link: `--link-{default,click,visited}`.
- Containers — backgrounds: `--cntnr-bg-{primary,secondary,third,transperent}-{default,hover,active,selected,click,disabled}`,
  `--cntnr-bg-other-{page-background,readonly-elements,danger,success,warning,blue,neutral,…}`.
- Containers — borders: `--cntnr-border-{default,hover,disabled,selected,error,warning,success,info,active,alternative,white,subtlest}`.
- Containers — corners: `--cntnr-corner-{none,nano,small,normal,big,large,biggest,infinity}`.
- Buttons: `--btn-bg-{primary,secondary,danger,transperent,danger-secondary,transperent-danger}-{default,hover,active,click-pressed,disable,disable-alternative,hover-for-active,border-default,border-active}`, `--btn-corner-corner`.
- Status: `--status-filled-{primary,positive,negative,warning,blue,passive}`, `--status-trasperent-*`.
- Component-specific: `--checkbox-*`, `--chips-corner-*`, `--tag-corner-*`, `--field-corner-*`,
  `--tabs-corner-*`, `--dropdown-{bg,stroke,corner}-*`, `--table-bg-{defaulttable,zebra,secondarytable,thirdtable,hovertable}`,
  `--divider-divider`, `--skeleton-{default,shimmer}`, `--blanket-popup-background`, `--highlight-bg`.
- Data-viz: `--colors-color-{1…21}`, `--monochrome-color-{21…28}`, `--unique-colors-*`, `--node-*`.

> ⚠️ Figma typos are preserved verbatim because they are the literal variable names:
> `transperent` (transparent), `eleveation` (elevation), `trasperent`. Do not "fix" them in code —
> they must match Figma for round-trip.

### Typography (Figma collection "Typography", 360 vars → 26 published text styles)
- Responsive size tokens `--typo-sizes-h{100…800}`; H450–H800 shrink on tablet/mobile
  (e.g. H800 35→29, H700 29→24, H600 24→20) via `@media (max-width: 1023.98px)`.
- 26 text styles exposed as `.liga-typo-<name>` utility classes (e.g. `h300-regular` = body,
  `h300-cta`, `h600-bold`, `h800-medium`). Fonts: **Lato** (Liga360) / **e-Ukraine** (United).

### Breakpoints (Figma collection "Breakpoints", 18 vars)
`--screen-size-{375-mobile,768-tablet,1024,1280,1440-desktop,1648,1920,2460-2k}` + the responsive
`--typo-sizes-*` overrides above.

### Files
`src/tokens/tokens.generated.css` (generated — do not hand-edit), `typography.css`, `reset.css`,
`tokens.ts` (typed TS vocabulary). All bundled into one `liga-ds/styles.css`.

---

## 6. Accessibility baseline (WCAG 2.1 AA)

Applies to every component; called out per-component where there's nuance.

- **Contrast:** text ≥ 4.5:1, large text & UI/graphics ≥ 3:1. Verified per-brand with axe in a
  real browser (jsdom can't compute contrast).
- **Keyboard:** every interactive element reachable and operable by keyboard. Documented key
  map per component (Enter/Space/Esc/Arrows/Home/End as applicable).
- **Focus:** visible focus ring via `--color-primary-500` using `:focus-visible` (set in
  `reset.css`). Focus is trapped in modal overlays and restored to the trigger on close.
- **Semantics:** native element first; correct `role`, `aria-*`, and name/description wiring.
- **Motion:** honor `prefers-reduced-motion` — transitions reduce to near-instant.
- **Targets:** interactive targets ≥ 24×24px (AA), default control height 36–40px.
- **Testing:** `vitest-axe` on render in unit tests; `@axe-core/playwright` on built stories.

---

## 7. Component API conventions

Consistency here is what makes the system feel like one system.

- **Refs:** every component uses `React.forwardRef` to its root (or primary) DOM node.
- **Passthrough:** accept and merge `className` and `style`; spread remaining valid DOM props.
- **State hooks:** expose state as `data-*` attributes (`data-state="open"`,
  `data-disabled`, `data-loading`) so consumers can style states with their own CSS.
- **Controlled/uncontrolled:** `value`/`defaultValue` + `onValueChange` (or `checked`/`open`
  equivalents) via a shared `useControllableState`.
- **Polymorphism:** layout + text primitives accept `as` (e.g. `<Text as="h2">`). Interactive
  components do **not** use `as` (a Button must stay a `<button>`); instead they offer
  explicit composition slots where needed.
- **Variants:** prop vocabulary follows the Figma variant axes per component (e.g. Button
  `variant`: primary | secondary | danger | danger-secondary | transparent | transparent-danger).
  Sizes/states come from the component's real Figma variant matrix — **extracted per component,
  not assumed**.
- **Tokens only:** every visual value resolves to a Figma token CSS var; no hardcoded
  colors/radii/spacing in component CSS.
- **Naming:** PascalCase components, camelCase props, named exports only (no default exports).
- **Compound components** for multi-part widgets: `Tabs / Tabs.List / Tabs.Trigger /
  Tabs.Content`, `Dialog / Dialog.Trigger / Dialog.Content`, etc.
- **No required `id`s:** auto-generate with `useId` for label/aria wiring; allow override.

---

## 8. Component scope & build order — MIRRORS THE REAL LIBRARY

The Figma file has **231 component sets** (some are page templates / responsive previews /
animations, not atomic components). We build the **core atomic components** first — they cover
the bulk of real usage — in dependency order, each faithful to its Figma variant matrix
(extracted per component). Page-level composites (Header, Filters bar, Menu shells) and the
long tail follow once the atoms are solid.

| # | Batch | Real components (from Figma) | Notes |
| --- | --- | --- | --- |
| 0 | **Tokens & brand** | Primitives, Tokens, Typography, Breakpoints (Liga360 + United) | ✅ done |
| 1 | **Utils + Typography** | `cn`, `useControllableState`, polymorphic types, ids; **Text**, **Heading** | wraps the 26 text styles |
| 2 | **Button** | **Button** (600 variants: 6 visual variants × sizes × states × icon configs), **IconButton** | open page in Figma |
| 3 | **Text inputs** | **Input** (Text input, 1104 variants), **Textarea**, **Search Input**, **Field** (label/help/error) | corner = infinity |
| 4 | **Selection** | **Checkbox** (+ Checkbox & Text), **Radio** + **RadioGroup** (+ Radio & Text) | |
| 5 | **Dropdown** | **Dropdown / Select** (336 variants), dropdown menu items, **Menu** | uses Popover |
| 6 | **Tags & status** | **Tag**, **Chips**, **Badge / Status** (filled + transparent tones) | |
| 7 | **Overlays** | **Tooltip**, **Popover**, **Modal** | blanket/focus trap |
| 8 | **Navigation** | **Tabs**, **Filters bar** | |
| 9 | **Feedback** | **Spinner**, **Skeleton**, **Alert**, **Divider** | |
| 10 | **Data** | **Avatar** (User Icon), **Table** (15+ parts), **Datepicker** | Table is large |
| 11 | **Finalize** | gallery, package build, README, full per-brand a11y audit | everything |

> Scope honesty: "universal, as the firm has it" → we work through the inventory component by
> component until the core set + high-value composites are shipped. This is multi-session work;
> progress is tracked in the task list and `.design-engineer-plugin` memory.

---

## 9. Per-component "definition of done"

A component is done only when ALL of these hold:

1. Implemented in TS with `forwardRef`, className/style passthrough, controlled+uncontrolled.
2. Styled only via Figma tokens in a CSS Module; verified against the Figma reference; both
   brands (Liga360 + United) render correctly.
3. Keyboard + ARIA correct; focus handled; `prefers-reduced-motion` honored.
4. Unit test (render, props, interaction) + axe (`expectNoA11yViolations`) clean.
5. Playground story covering every variant/size/state; screenshot-verified vs Figma.
6. Passes the plugin's `design-system-auditor` (token compliance + aesthetic) review.
7. Exported from `src/index.ts`.

---

## 10. Workflow (how we build, given Autopilot mode)

For each batch: implement → self-test (typecheck + unit + axe) → audit via plugin agents →
fix → mark task done → checkpoint summary to the user → next batch. The user can interrupt
at any checkpoint to redirect. Foundation decisions (this doc) are only revisited if the
user pushes back on the stack or a primary-source constraint contradicts a choice.
