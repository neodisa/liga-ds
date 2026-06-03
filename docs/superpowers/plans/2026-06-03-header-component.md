# Header Component Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `Header` app-shell composite (top app bar: leading logo + burger, centered primary nav, trailing action icons) faithfully from the Figma "❖ UI LIBRARY" Header source, to the Liga DS definition-of-done.

**Architecture:** A compound component (`Header` + `Header.Leading/Burger/Brand/Nav/NavItem/Actions`) assembled with `Object.assign`, mirroring `Tabs`/`Menu`. Layout, responsive collapse, and brand theming are pure CSS (CSS Module + Figma tokens via `data-brand`); the only JS state is the burger's controllable open flag (`useControllableState`). `Header.Burger` reuses the existing `IconButton`. Trailing actions and nav links are consumer-supplied; the component owns structure, tokens, a11y, and responsive behavior.

**Tech Stack:** React 19 + TypeScript 6, CSS Modules + CSS custom-property tokens, Vitest + @testing-library/react + axe-core. Build: Vite 8 library mode.

**Spec:** `docs/superpowers/specs/2026-06-03-header-component-design.md`

**Note — one refinement to the approved spec:** the plan adds a `Header.Leading` slot (a `<div>` wrapper around Burger + Brand). It mirrors the Figma "leading frame" (gap 8) and makes the three-group `space-between` layout deterministic. All other parts match the spec.

---

## Figma-derived facts (signed-in variant `644:4390`)

Use these exact measurements/tokens. Token CSS-var names below are the Liga DS vocabulary
(foundation §5) matched to the node `boundVariables`; the IDs in parentheses are for
verification via `figma_get_variables` if a name needs confirming during the build.

- **Root** `<header>`: height **56px**, `display:flex`, `align-items:center`,
  `justify-content:space-between`, `padding-inline:14px`, background **white** →
  `--cntnr-bg-primary-default` (id `114:3405`), elevation-2 drop shadow (effect style
  `152:13919`: color `#A8A8A8` @15%, blur 50, spread 10; ids `16224:636887/636888/636889`).
- **Leading group** (gap **8px** → `--space-100`): burger (24×24, hidden on desktop) + logo.
- **Brand/logo**: text color `--text-default` (id `114:3382`), internal gap 2px.
- **Nav group** (6 items, gap **8px** → `--space-100`). Each item: padding **4px 16px**
  (`--space-050` / `--space-200`), radius **3px** (→ `--cntnr-corner-nano`), text
  `--text-default` (id `108:3376`), font **Lato 16px / line-height 20px / letter-spacing 0.33px**.
  Real labels: Законодавство · Судова робота · Договори · Компанії та персони · Аналітика · Інструменти.
- **Actions group** (gap **16px** → `--space-200`, id `88:3449`): 24×24 icon triggers
  (search, favorites, notifications, help); icon color `--icon-default` (id `23923:29`).
- **Collapse breakpoint:** `max-width: 1023.98px` (matches foundation's tablet breakpoint).
  Below it: hide `.nav`, show `.burger`, hide any action marked `data-collapse="hide"`.

**Hover/active nav styling** is not present in the Default-state extract. Default below: hover =
`--color-primary-100` bg (consistent with the Tabs pill hover); active = `--text-active` +
`--color-primary-100` bg. **Verify against `_Header btn` (componentKey `955:12382`, 4 variants)
during Task 2** and adjust the two declarations if Figma's Hover/Active differ — this is the
only visual value not yet locked.

---

## File structure

- **Create** `src/components/Header/Header.tsx` — root + 6 sub-components, one CSS Module, `Object.assign`. Single focused file (~140 lines), same shape as `Tabs.tsx`.
- **Create** `src/components/Header/Header.module.css` — tokens-only styles + responsive media.
- **Create** `src/components/Header/Header.test.tsx` — unit + axe (both brands).
- **Create** `src/components/Header/index.ts` — barrel re-export.
- **Modify** `src/index.ts` — add the Header exports to the public barrel.
- **Modify** `playground/App.tsx` — add a Header demo section.

---

## Task 1: Header root + Leading + Brand

**Files:**
- Create: `src/components/Header/Header.tsx`
- Create: `src/components/Header/Header.module.css`
- Create: `src/components/Header/index.ts`
- Test: `src/components/Header/Header.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/Header/Header.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
  it('renders a banner landmark with the brand link', () => {
    render(
      <Header>
        <Header.Leading>
          <Header.Brand href="/">LIGA360</Header.Brand>
        </Header.Leading>
      </Header>,
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'LIGA360' })).toHaveAttribute('href', '/');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/Header/Header.test.tsx`
Expected: FAIL — cannot resolve `./Header` (module does not exist yet).

- [ ] **Step 3: Create the CSS Module**

Create `src/components/Header/Header.module.css`:

```css
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-200);
  min-height: 56px;
  padding-inline: 14px;
  box-sizing: border-box;
  background-color: var(--cntnr-bg-primary-default);
  /* Elevation 2 (Figma effect style 152:13919): #A8A8A8 @15%, blur 50, spread 10 */
  box-shadow: 0 0 50px 10px rgb(168 168 168 / 0.15);
  font-family: var(--liga-font-family);
}
.header[data-sticky] {
  position: sticky;
  top: 0;
  z-index: 100;
}
.header:not([data-signed-in]) .nav,
.header:not([data-signed-in]) .actions {
  display: none;
}

.leading {
  display: flex;
  align-items: center;
  gap: var(--space-100);
  flex: none;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-050);
  color: var(--text-default);
  text-decoration: none;
}
.brand:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
  border-radius: var(--cntnr-corner-small);
}
```

- [ ] **Step 4: Create the component file (root + Leading + Brand)**

This minimal version compiles cleanly under `noUnusedLocals` (no open-state/context yet — Task 4
adds those). Create `src/components/Header/Header.tsx`:

```tsx
import { forwardRef, type AnchorHTMLAttributes, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Header.module.css';

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /** Whether a user is signed in. When false, nav + actions are hidden (brand only). Default `true`. */
  signedIn?: boolean;
  /** Stick to the top of the viewport. Default `false`. */
  sticky?: boolean;
}

const HeaderRoot = forwardRef<HTMLElement, HeaderProps>(function HeaderRoot(
  { signedIn = true, sticky = false, className, children, ...rest },
  ref,
) {
  return (
    <header
      ref={ref}
      data-signed-in={signedIn || undefined}
      data-sticky={sticky || undefined}
      className={cn(styles.header, className)}
      {...rest}
    >
      {children}
    </header>
  );
});

export type HeaderLeadingProps = HTMLAttributes<HTMLDivElement>;
export const HeaderLeading = forwardRef<HTMLDivElement, HeaderLeadingProps>(function HeaderLeading(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={cn(styles.leading, className)} {...rest} />;
});

export type HeaderBrandProps = AnchorHTMLAttributes<HTMLAnchorElement>;
export const HeaderBrand = forwardRef<HTMLAnchorElement, HeaderBrandProps>(function HeaderBrand(
  { className, ...rest },
  ref,
) {
  return <a ref={ref} className={cn(styles.brand, className)} {...rest} />;
});

/** Header — app top bar. Compound: Header.Leading / Burger / Brand / Nav / NavItem / Actions. */
export const Header = Object.assign(HeaderRoot, {
  Leading: HeaderLeading,
  Brand: HeaderBrand,
});
```

- [ ] **Step 5: Create the barrel**

Create `src/components/Header/index.ts`:

```ts
export { Header, HeaderLeading, HeaderBrand, type HeaderProps, type HeaderLeadingProps, type HeaderBrandProps } from './Header';
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run src/components/Header/Header.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 7: Commit**

```bash
git add src/components/Header
git commit -m "feat(header): root + Leading + Brand slots"
```

---

## Task 2: Nav + NavItem (with active state)

**Files:**
- Modify: `src/components/Header/Header.tsx`
- Modify: `src/components/Header/Header.module.css`
- Modify: `src/components/Header/index.ts`
- Test: `src/components/Header/Header.test.tsx`

- [ ] **Step 1: Verify nav hover/active against Figma**

Run (figma-console MCP): `figma_get_component_details` with `componentKey: "955:12382"` (the
`_Header btn` set, 4 variants). Inspect the Hover and Active/Selected variants' fill +
text-color `boundVariables`. If they differ from the defaults below (`--color-primary-100`
hover bg, `--text-active` active text), update the `.navItem:hover` / `.navItem[data-active]`
declarations in Step 3 to the resolved tokens. Otherwise keep them.

- [ ] **Step 2: Write the failing test**

Add to `src/components/Header/Header.test.tsx` inside `describe('Header', …)`:

```tsx
  it('marks the active nav item with aria-current="page"', () => {
    render(
      <Header>
        <Header.Nav aria-label="Main">
          <Header.NavItem href="/law" active>Законодавство</Header.NavItem>
          <Header.NavItem href="/court">Судова робота</Header.NavItem>
        </Header.Nav>
      </Header>,
    );
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Законодавство' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Судова робота' })).not.toHaveAttribute('aria-current');
  });
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run src/components/Header/Header.test.tsx`
Expected: FAIL — `Header.Nav` / `Header.NavItem` are undefined.

- [ ] **Step 4: Add Nav + NavItem CSS**

Append to `src/components/Header/Header.module.css`:

```css
.nav {
  display: flex;
  align-items: center;
  gap: var(--space-100);
}

.navItem {
  display: inline-flex;
  align-items: center;
  padding: var(--space-050) var(--space-200);
  border-radius: var(--cntnr-corner-nano, 3px);
  color: var(--text-default);
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.33px;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease;
}
.navItem:hover {
  background-color: var(--color-primary-100);
}
.navItem:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
.navItem[data-active] {
  color: var(--text-active);
  background-color: var(--color-primary-100);
}

@media (prefers-reduced-motion: reduce) {
  .navItem {
    transition: none;
  }
}
```

- [ ] **Step 5: Add Nav + NavItem components**

In `src/components/Header/Header.tsx`, add before the `Object.assign` block:

```tsx
export interface HeaderNavProps extends HTMLAttributes<HTMLElement> {
  /** Accessible name for the nav landmark. */
  'aria-label': string;
}
export const HeaderNav = forwardRef<HTMLElement, HeaderNavProps>(function HeaderNav(
  { className, ...rest },
  ref,
) {
  return <nav ref={ref} className={cn(styles.nav, className)} {...rest} />;
});

export interface HeaderNavItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Marks the current page: sets `aria-current="page"` + active styling. */
  active?: boolean;
}
export const HeaderNavItem = forwardRef<HTMLAnchorElement, HeaderNavItemProps>(function HeaderNavItem(
  { active = false, className, ...rest },
  ref,
) {
  return (
    <a
      ref={ref}
      data-active={active || undefined}
      aria-current={active ? 'page' : undefined}
      className={cn(styles.navItem, className)}
      {...rest}
    />
  );
});
```

Update the `Object.assign` call to:

```tsx
export const Header = Object.assign(HeaderRoot, {
  Leading: HeaderLeading,
  Brand: HeaderBrand,
  Nav: HeaderNav,
  NavItem: HeaderNavItem,
});
```

- [ ] **Step 6: Update the barrel**

Replace `src/components/Header/index.ts` with:

```ts
export {
  Header,
  HeaderLeading,
  HeaderBrand,
  HeaderNav,
  HeaderNavItem,
  type HeaderProps,
  type HeaderLeadingProps,
  type HeaderBrandProps,
  type HeaderNavProps,
  type HeaderNavItemProps,
} from './Header';
```

- [ ] **Step 7: Run test to verify it passes**

Run: `npx vitest run src/components/Header/Header.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 8: Commit**

```bash
git add src/components/Header
git commit -m "feat(header): Nav + NavItem with active state"
```

---

## Task 3: Actions slot

**Files:**
- Modify: `src/components/Header/Header.tsx`
- Modify: `src/components/Header/Header.module.css`
- Modify: `src/components/Header/index.ts`
- Test: `src/components/Header/Header.test.tsx`

- [ ] **Step 1: Write the failing test**

Add inside `describe('Header', …)`:

```tsx
  it('renders trailing actions', () => {
    render(
      <Header>
        <Header.Actions>
          <button aria-label="Search">S</button>
        </Header.Actions>
      </Header>,
    );
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/Header/Header.test.tsx`
Expected: FAIL — `Header.Actions` is undefined.

- [ ] **Step 3: Add Actions CSS**

Append to `src/components/Header/Header.module.css`:

```css
.actions {
  display: flex;
  align-items: center;
  gap: var(--space-200);
  flex: none;
}
```

- [ ] **Step 4: Add the Actions component**

In `src/components/Header/Header.tsx`, add before `Object.assign`:

```tsx
export type HeaderActionsProps = HTMLAttributes<HTMLDivElement>;
export const HeaderActions = forwardRef<HTMLDivElement, HeaderActionsProps>(function HeaderActions(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={cn(styles.actions, className)} {...rest} />;
});
```

Add `Actions: HeaderActions,` to the `Object.assign` map.

- [ ] **Step 5: Update the barrel**

Add `HeaderActions,` and `type HeaderActionsProps,` to the export list in `src/components/Header/index.ts`.

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run src/components/Header/Header.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 7: Commit**

```bash
git add src/components/Header
git commit -m "feat(header): Actions slot"
```

---

## Task 4: Burger (controllable) + responsive collapse

**Files:**
- Modify: `src/components/Header/Header.tsx`
- Modify: `src/components/Header/Header.module.css`
- Modify: `src/components/Header/index.ts`
- Test: `src/components/Header/Header.test.tsx`

- [ ] **Step 1: Write the failing tests**

Add inside `describe('Header', …)`:

```tsx
  it('toggles the burger open state (uncontrolled) and reports changes', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Header onOpenChange={onOpenChange}>
        <Header.Leading>
          <Header.Burger aria-label="Open menu" icon={<svg aria-hidden="true" />} />
        </Header.Leading>
      </Header>,
    );
    const burger = screen.getByRole('button', { name: 'Open menu' });
    expect(burger).toHaveAttribute('aria-expanded', 'false');
    await user.click(burger);
    expect(burger).toHaveAttribute('aria-expanded', 'true');
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
  });

  it('respects a controlled open prop', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Header open onOpenChange={onOpenChange}>
        <Header.Leading>
          <Header.Burger aria-label="Open menu" icon={<svg aria-hidden="true" />} />
        </Header.Leading>
      </Header>,
    );
    const burger = screen.getByRole('button', { name: 'Open menu' });
    expect(burger).toHaveAttribute('aria-expanded', 'true');
    await user.click(burger);
    expect(burger).toHaveAttribute('aria-expanded', 'true'); // controlled: unchanged
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });
```

Update the test file's imports at the top to:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Header } from './Header';
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/components/Header/Header.test.tsx`
Expected: FAIL — `Header.Burger` is undefined.

- [ ] **Step 3: Add open-state + context, and wire the provider into HeaderRoot**

In `src/components/Header/Header.tsx`, replace the import block (the three import lines from
Task 1) with:

```tsx
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import { useControllableState } from '../../utils/useControllableState';
import { IconButton, type IconButtonProps } from '../Button/Button';
import styles from './Header.module.css';
```

Immediately below the imports, add the context:

```tsx
interface HeaderContextValue {
  burgerId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}
const HeaderContext = createContext<HeaderContextValue | null>(null);
function useHeaderContext(): HeaderContextValue {
  const ctx = useContext(HeaderContext);
  if (!ctx) throw new Error('Header.* must be used within <Header>');
  return ctx;
}
```

Replace the `HeaderProps` interface from Task 1 with (adds the burger-state props):

```tsx
export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /** Whether a user is signed in. When false, nav + actions are hidden (brand only). Default `true`. */
  signedIn?: boolean;
  /** Stick to the top of the viewport. Default `false`. */
  sticky?: boolean;
  /** Controlled burger open state. */
  open?: boolean;
  /** Initial burger open state (uncontrolled). Default `false`. */
  defaultOpen?: boolean;
  /** Called when the burger open state changes. */
  onOpenChange?: (open: boolean) => void;
}
```

Replace the `HeaderRoot` from Task 1 with (adds controllable state + provider + `data-open`):

```tsx
const HeaderRoot = forwardRef<HTMLElement, HeaderProps>(function HeaderRoot(
  { signedIn = true, sticky = false, open, defaultOpen = false, onOpenChange, className, children, ...rest },
  ref,
) {
  const [isOpen, setOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const burgerId = useId();
  return (
    <HeaderContext.Provider value={{ burgerId, open: isOpen, setOpen }}>
      <header
        ref={ref}
        data-signed-in={signedIn || undefined}
        data-sticky={sticky || undefined}
        data-open={isOpen || undefined}
        className={cn(styles.header, className)}
        {...rest}
      >
        {children}
      </header>
    </HeaderContext.Provider>
  );
});
```

- [ ] **Step 4: Add Burger CSS + responsive collapse**

Append to `src/components/Header/Header.module.css`:

```css
.burger {
  display: none;
}

@media (max-width: 1023.98px) {
  .nav {
    display: none;
  }
  .burger {
    display: inline-flex;
  }
  .header [data-collapse='hide'] {
    display: none;
  }
}
```

- [ ] **Step 5: Add the Burger component**

In `src/components/Header/Header.tsx`, add before `Object.assign`:

```tsx
export interface HeaderBurgerProps extends Omit<IconButtonProps, 'icon'> {
  /** The burger icon (e.g. an icon from `@neodisa/liga-ds/icons`). */
  icon: ReactNode;
}
export const HeaderBurger = forwardRef<HTMLButtonElement, HeaderBurgerProps>(function HeaderBurger(
  { className, onClick, 'aria-controls': ariaControls, ...rest },
  ref,
) {
  const { burgerId, open, setOpen } = useHeaderContext();
  return (
    <IconButton
      ref={ref}
      aria-expanded={open}
      aria-controls={ariaControls ?? burgerId}
      data-open={open || undefined}
      className={cn(styles.burger, className)}
      onClick={(e) => {
        onClick?.(e);
        setOpen(!open);
      }}
      {...rest}
    />
  );
});
```

Add `Burger: HeaderBurger,` to the `Object.assign` map (place it first, before `Leading`).

- [ ] **Step 6: Update the barrel**

Add `HeaderBurger,` and `type HeaderBurgerProps,` to `src/components/Header/index.ts`.

- [ ] **Step 7: Run tests to verify they pass**

Run: `npx vitest run src/components/Header/Header.test.tsx`
Expected: PASS (5 tests).

- [ ] **Step 8: Commit**

```bash
git add src/components/Header
git commit -m "feat(header): controllable Burger + responsive collapse"
```

---

## Task 5: signed-out behavior

**Files:**
- Test: `src/components/Header/Header.test.tsx` (`.module.css` already handles the hiding from Task 1)

- [ ] **Step 1: Write the failing test**

Add inside `describe('Header', …)`:

```tsx
  it('drops the signed-in flag when signedIn=false', () => {
    render(
      <Header signedIn={false}>
        <Header.Leading>
          <Header.Brand href="/">LIGA360</Header.Brand>
        </Header.Leading>
      </Header>,
    );
    expect(screen.getByRole('banner')).not.toHaveAttribute('data-signed-in');
  });

  it('sets the signed-in flag by default', () => {
    render(
      <Header>
        <Header.Leading>
          <Header.Brand href="/">LIGA360</Header.Brand>
        </Header.Leading>
      </Header>,
    );
    expect(screen.getByRole('banner')).toHaveAttribute('data-signed-in');
  });
```

- [ ] **Step 2: Run tests**

Run: `npx vitest run src/components/Header/Header.test.tsx`
Expected: PASS (7 tests) — the `data-signed-in={signedIn || undefined}` attribute + the
`.header:not([data-signed-in]) .nav/.actions { display:none }` rule (added in Task 1) already
implement this. If either test fails, fix the attribute/CSS to match, then re-run.

- [ ] **Step 3: Commit (only if anything changed)**

```bash
git add src/components/Header
git commit -m "test(header): signed-out hides nav + actions"
```

---

## Task 6: axe (both brands) + public export

**Files:**
- Modify: `src/index.ts`
- Test: `src/components/Header/Header.test.tsx`

- [ ] **Step 1: Write the failing tests**

Add to the top imports of `src/components/Header/Header.test.tsx`:

```tsx
import { expectNoA11yViolations } from '../../../test/axe';
```

Add a shared example + axe tests inside `describe('Header', …)`:

```tsx
  function FullExample() {
    return (
      <Header>
        <Header.Leading>
          <Header.Burger aria-label="Open menu" icon={<svg aria-hidden="true" />} />
          <Header.Brand href="/">LIGA360</Header.Brand>
        </Header.Leading>
        <Header.Nav aria-label="Main">
          <Header.NavItem href="/law" active>Законодавство</Header.NavItem>
          <Header.NavItem href="/court">Судова робота</Header.NavItem>
        </Header.Nav>
        <Header.Actions>
          <button aria-label="Search">S</button>
        </Header.Actions>
      </Header>
    );
  }

  it('has no a11y violations (Liga360)', async () => {
    const { container } = render(<FullExample />);
    await expectNoA11yViolations(container);
  });

  it('has no a11y violations (United brand)', async () => {
    const { container } = render(
      <div data-brand="united">
        <FullExample />
      </div>,
    );
    await expectNoA11yViolations(container);
  });
```

- [ ] **Step 2: Run tests to verify they fail or pass**

Run: `npx vitest run src/components/Header/Header.test.tsx`
Expected: PASS (9 tests). If axe reports a violation (e.g., a nested-banner or missing-name
rule), fix the markup until clean — do not silence the rule.

- [ ] **Step 3: Add Header to the public barrel**

In `src/index.ts`, add after the `Tabs` export block (or alongside the other components):

```tsx
export {
  Header,
  HeaderLeading,
  HeaderBurger,
  HeaderBrand,
  HeaderNav,
  HeaderNavItem,
  HeaderActions,
  type HeaderProps,
  type HeaderLeadingProps,
  type HeaderBrandProps,
  type HeaderNavProps,
  type HeaderNavItemProps,
  type HeaderActionsProps,
  type HeaderBurgerProps,
} from './components/Header';
```

- [ ] **Step 4: Verify the barrel export resolves**

Run: `npx vitest run src/smoke.test.tsx`
Expected: PASS (existing smoke test still green; the new export compiles).

- [ ] **Step 5: Commit**

```bash
git add src/components/Header src/index.ts
git commit -m "feat(header): axe both brands + export from public barrel"
```

---

## Task 7: playground story

**Files:**
- Modify: `playground/App.tsx`

- [ ] **Step 1: Import Header and icons**

In `playground/App.tsx`, add `Header` to the existing `@neodisa/liga-ds`-style import from the
local barrel (the file imports components from the local source — match how `Tabs` is imported,
around line 28). Add `Header,` to that import list. For icons, add (near other icon imports, if
any) an import from the icons source used by the playground; if the playground has no icon
imports yet, use inline `<svg width={20} height={20} aria-hidden="true" />` placeholders for the
burger and action icons (the component is icon-agnostic).

- [ ] **Step 2: Add a Header section**

Add a new section block following the existing section pattern (a heading comment + the demo),
near the Tabs section:

```tsx
{/* Components · Header */}
<section>
  <h2>Header</h2>
  <Header sticky>
    <Header.Leading>
      <Header.Burger aria-label="Open menu" icon={<svg width={24} height={24} aria-hidden="true" />} />
      <Header.Brand href="#">LIGA360</Header.Brand>
    </Header.Leading>
    <Header.Nav aria-label="Primary">
      <Header.NavItem href="#" active>Законодавство</Header.NavItem>
      <Header.NavItem href="#">Судова робота</Header.NavItem>
      <Header.NavItem href="#">Договори</Header.NavItem>
      <Header.NavItem href="#">Компанії та персони</Header.NavItem>
      <Header.NavItem href="#">Аналітика</Header.NavItem>
      <Header.NavItem href="#">Інструменти</Header.NavItem>
    </Header.Nav>
    <Header.Actions>
      <IconButton aria-label="Search" data-collapse="hide" icon={<svg width={20} height={20} aria-hidden="true" />} />
      <IconButton aria-label="Favorites" icon={<svg width={20} height={20} aria-hidden="true" />} />
      <IconButton aria-label="Notifications" icon={<svg width={20} height={20} aria-hidden="true" />} />
      <IconButton aria-label="Help" icon={<svg width={20} height={20} aria-hidden="true" />} />
    </Header.Actions>
  </Header>
</section>
```

Ensure `IconButton` is in the import list (it is already used elsewhere in the playground; if
not, add it).

- [ ] **Step 3: Run the playground build to verify it compiles**

Run: `npm run build:playground`
Expected: build succeeds (no TS/Vite errors).

- [ ] **Step 4: Commit**

```bash
git add playground/App.tsx
git commit -m "docs(header): playground story (signed-in, both brands via toggle, collapse)"
```

---

## Task 8: full verification

**Files:** none (verification only)

- [ ] **Step 1: Typecheck**

Run: `npm run typecheck`
Expected: PASS (no errors). Header sources are covered by `tsconfig.build.json`.

- [ ] **Step 2: Full unit + axe suite**

Run: `npm test`
Expected: PASS — previous 111 tests + the 9 new Header tests = 120 passing.

- [ ] **Step 3: Library build**

Run: `npm run build`
Expected: build succeeds; `Header` is included in `dist/liga-ds.js` and its types in
`dist/src/components/Header/Header.d.ts`.

- [ ] **Step 4: Visual parity check (manual, definition-of-done §5)**

Run `npm run dev`, open the playground, and compare the Header against the Figma frames at
**1920px** and **375px** widths, in **both brands** (toggle `data-brand`). Confirm: 56px height,
white bg + elevation shadow, 6 nav items with hover/active, trailing icons at 16px gap, and that
the nav collapses to the burger below 1024px. Capture screenshots if running the design-system
auditor.

- [ ] **Step 5: Final commit (if Step 4 required tweaks)**

```bash
git add -A
git commit -m "fix(header): visual parity tweaks vs Figma"
```

---

## Self-review (completed by plan author)

- **Spec coverage:** anatomy → Tasks 1–4; compound API → Tasks 1–4; responsive collapse →
  Task 4; signed-out → Task 5; tokens/brands → CSS in Tasks 1–4 + axe both brands Task 6;
  a11y (banner/nav/aria-current/burger aria-expanded) → Tasks 1,2,4,6; files + export → Tasks
  1–6; playground → Task 7; DoD verification → Task 8. Out-of-scope items (action panels, side
  nav, drawer content) are intentionally excluded. ✔
- **Placeholder scan:** no TBD/TODO; every code step has full code. The single deferred value
  (nav hover/active tokens) has an explicit verification step (Task 2 Step 1) with the Figma
  componentKey and a concrete default — not a placeholder. ✔
- **Type consistency:** `HeaderProps/HeaderLeadingProps/HeaderBrandProps/HeaderNavProps/`
  `HeaderNavItemProps/HeaderActionsProps/HeaderBurgerProps`, `HeaderContextValue`, and the
  `Object.assign` keys (`Leading/Burger/Brand/Nav/NavItem/Actions`) are consistent across tasks
  and the barrel/`src/index.ts` exports. ✔
