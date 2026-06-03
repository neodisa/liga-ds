# Header component — design

**Date:** 2026-06-03
**Status:** Approved
**Roadmap:** foundation.md §8 batch 8 (Navigation) / page-level composite. First of the
app-shell composites; **Side Navigation ("left menu") is the next, separate component.**

## Problem / goal

Liga DS ships 30 atomic components but no app-shell composites. Apps need the **Header** —
the top app bar (logo, primary nav, action icons, user). Build it faithfully from the Figma
"❖ UI LIBRARY - v1.4" source (`fileKey fOisEfYBh4z6VbkY6sOmSn`, page "Header"), to the same
definition-of-done (§9) as every other component: tokens-only, both brands, full a11y, tests.

## Figma source (authoritative)

- Component set **`Header`** — `nodeId 8708:22128`, variant axis **`Signed in` = {True, False}`**.
- Responsive preview frames on the page: **1921, 1648, 1440, 1280, 1024, 768, 600, 375**
  (`1411:2659` … `1411:2666`) — define the reflow / collapse behavior.
- Action parts: `Header / Actions` (`21722:20161`), `_Header btn` (`955:12382`),
  `_Favorites`, `_Notifications`, `_Help`, `_More`, `_Language`, `_User profile actions`,
  `_Burger menu` (`5949:29028`), `Logo / Liga360` (`7877:21119`), `User Icon / LIGA 360`.
- United brand: `LIGA UNITED header option` + `UNITED` sections (verify brand deltas).
- **Side Navigation Menu / Liga360** (`1518:28837`) — the left menu, **out of scope here**.

Exact token names (background, text, icon, hover, active, divider, heights, gaps) and the
precise collapse breakpoint are extracted per-node from `boundVariables` during implementation
(`figma_get_component_for_development` / `figma_get_variables`). Nothing visual is invented.

## Anatomy

Single-row bar (~56px), full-bleed, brand background, three regions:

1. **Leading** — `Burger` (shown only when collapsed) + `Brand`/logo (a link).
2. **Center** — primary `Nav`: horizontal links with an active state. Hidden below the
   collapse breakpoint; its items move into the burger drawer (drawer content is composed
   later, not in this iteration).
3. **Trailing** — `Actions` cluster: icon-button triggers (search, favorites, notifications,
   help) + `Avatar`. Search hides on mobile.

**Signed-out** (`signedIn={false}`) renders only `Brand`.

## API — compound, slot-based (foundation §7)

Mirrors `Tabs`/`Modal`/`Menu`: a root with attached sub-components via `Object.assign`.

- **`Header`** → `<header role="banner">`. Props: `signedIn?: boolean` (default `true`),
  `sticky?: boolean`, plus `className`/`style` passthrough and `forwardRef` to the `<header>`.
  Owns layout + responsive collapse purely in CSS (no JS for layout). Brand background from
  tokens; brand axis via the existing `data-brand` mechanism (no Header-specific brand prop).
- **`Header.Brand`** → an `<a>` (logo slot). `href`, children = the brand logo (consumer
  supplies the brand-correct logo). Default `aria-label` overridable.
- **`Header.Nav`** → `<nav aria-label="…">` wrapping items; horizontal on desktop, hidden
  below the collapse breakpoint.
- **`Header.NavItem`** → `<a>` with `active?` → sets `aria-current="page"`, `data-active`, and
  the active token style. Hover/focus from tokens.
- **`Header.Actions`** → layout-only trailing wrapper (gap/alignment). Consumers drop our
  `IconButton` (with icons from `@neodisa/liga-ds/icons`) and `Avatar`.
- **`Header.Burger`** → built on `IconButton`. `aria-label`, `aria-expanded`, `aria-controls`.
  Controlled/uncontrolled open state (`open` / `defaultOpen` / `onOpenChange`) via the shared
  `useControllableState`. Visible only when collapsed (CSS). Emits open state only — the drawer
  content is wired to the Side Navigation in the next iteration.

**Decision to resolve in implementation:** if Figma's `_Header btn` differs materially from our
`IconButton` (size/hover background), add a thin `Header.Action` wrapper; otherwise reuse
`IconButton`. Default assumption: reuse `IconButton`.

## Responsive behavior

- Breakpoints taken from the Figma frames (1921→375). On wide widths the center `Nav` is
  visible and `Burger` hidden; at the collapse breakpoint (1024 or 1280 — confirmed from the
  frames during implementation) `Nav` hides, `Burger` shows, and the search action hides.
- Implemented with CSS `@media` (and/or container queries) keyed to the Figma breakpoint
  tokens (`--screen-size-*`). The only JS is the burger's open state.
- `prefers-reduced-motion` honored for any transition.

## Tokens & brands

- Every visual value resolves to a Figma token CSS var (`--cntnr-bg-*`, `--text-*`, `--icon-*`,
  the nav active token, divider/height/gap tokens) — exact names lifted from the Header nodes.
  No hardcoded color/space/radius.
- Both brands render correctly via `data-brand`. The United header has its own Figma section;
  brand deltas (colors, possibly layout) are verified and reflected. Brand logo itself is
  consumer-supplied through `Header.Brand`.

## Accessibility (foundation §6 / §9)

- `<header role="banner">` landmark; `<nav aria-label>`; active item `aria-current="page"`.
- `Burger`: `aria-expanded`, `aria-controls`, `aria-label`; keyboard operable. Drawer
  focus-trap is the drawer/side-nav's responsibility (next iteration).
- Icon-only triggers each carry an `aria-label` (via `IconButton`).
- Tab order leading → nav → trailing; `:focus-visible` rings from `reset.css`.
- `vitest-axe` clean on render for **both brands**.

## Files (existing component pattern)

- `src/components/Header/Header.tsx` — `Header` + `Brand` + `Nav` + `NavItem` + `Actions` +
  `Burger`, composed with `Object.assign`; named exports + prop types.
- `src/components/Header/Header.module.css` — tokens-only, native CSS nesting.
- `src/components/Header/Header.test.tsx` — render, compound parts, active state, burger
  controlled/uncontrolled toggle, signed-out, axe (both brands).
- `src/components/Header/index.ts`.
- Re-export from `src/index.ts`.
- Playground story: signed-in/out, both brands, resize (collapse), active nav, actions+avatar.

## Definition of done (foundation §9 — all must hold)

1. TS + `forwardRef` + className/style passthrough + controlled/uncontrolled burger.
2. Tokens-only CSS module; verified vs Figma; both brands correct.
3. Keyboard + ARIA correct; focus handled; reduced-motion honored.
4. Unit tests + axe clean.
5. Playground story covering every variant/state; screenshot-verified vs Figma.
6. Passes the plugin design-system-auditor (token + aesthetic) review.
7. Exported from `src/index.ts`.

## Out of scope (this iteration)

- Action dropdown panels (notifications, favorites, help, language, user profile) — composed by
  consumers from existing `Popover`/`Menu`.
- Burger **drawer content** and the **Side Navigation ("left menu")** — next component; `Burger`
  only exposes open state + `aria-controls` to wire it later.
- Search input expansion beyond show/hide.

## Verification

- `npm run typecheck`, `npm test` (incl. axe) green.
- Playground renders the Header at desktop + mobile widths, both brands; visual parity checked
  against the Figma frames (1920 and 375 at minimum).
- Plugin design-system-auditor pass.
