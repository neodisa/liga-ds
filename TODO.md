# Liga DS — Angular Migration TODO

## Project
Angular 20.3.15 design system for Liga360 / United brands.
Replaced React 19 codebase. Source of truth: Figma file «❖ UI LIBRARY - v1.4»
(fileKey `fOisEfYBh4z6VbkY6sOmSn`), accessed via figma-console MCP.

## Architecture decisions (locked)
- **Framework:** Angular 20.3.15, standalone components, no NgModules
- **Overlays:** Angular CDK (Overlay, Portal) — Tooltip, Popover, Modal, Select, Menu
- **Build:** ng-packagr 20.3, workspace at root, library at `projects/liga-ds/`
- **Playground:** Angular app at `projects/playground/`, served `ng serve playground` (:4200)
- **Styling:** ViewEncapsulation.None + CSS custom-property tokens (same token layer as React)
- **State:** Angular Signals for reactive state inside components
- **TypeScript:** 5.8.x (Angular 20 requires >=5.8 <6.0)
- **Change detection:** Zone.js (provideZoneChangeDetection)
- **Prefix:** `ld-` (LdXxxComponent)
- **Heading:** role="heading" + aria-level (no native h1-h6 switch — Angular ng-content limitation)
- **Tokens:** `projects/liga-ds/src/tokens/` — unchanged from React version

## Per-component DoD
- [x] Component + styles (ViewEncapsulation.None, CSS custom properties)
- [x] Inputs typed, Outputs declared
- [x] Exported from `src/public-api.ts`
- [x] Playground story added to `projects/playground/src/app/app.component.ts`
- [x] Build verified (ng build liga-ds + ng build playground — zero errors)

## Components — 28 total

### Foundation
- [x] LdTextComponent — variant + color inputs
- [x] LdHeadingComponent — level 1-6, role/aria-level

### Actions
- [x] LdButtonComponent — variant (primary/secondary/transparent/danger/danger-secondary/danger-transparent), size (sm/md/lg/xl), loading, disabled, icon slots, ldClick
- [x] LdIconButtonComponent — icon-only variant, ariaLabel required
- [x] LdSpinnerComponent — size (sm/md/lg), color (default/inverse/accent)

### Inputs
- [x] LdInputComponent — type, size, prefix/suffix icon slots, search icon, loading, error/disabled/readonly states, ControlValueAccessor
- [x] LdSearchInputComponent — wraps LdInput with type=search preset
- [x] LdTextareaComponent — rows, resize, invalid state, ControlValueAccessor
- [x] LdFieldComponent — label (for linking), description (top/bottom), error wrapper

### Selection
- [x] LdCheckboxComponent — indeterminate, disabled, ControlValueAccessor
- [x] LdRadioComponent — standalone or within LdRadioGroupComponent
- [x] LdRadioGroupComponent — group with ControlValueAccessor, auto-name
- [x] LdSwitchComponent — size sm/md, ControlValueAccessor, role=switch

### Labels
- [x] LdBadgeComponent — tone (primary/success/danger/warning/info/neutral), variant (solid/subtle), size (sm/md), dot mode
- [x] LdTagComponent — same tone/variant tokens, removable + ldRemove
- [x] LdChipComponent — button element, aria-pressed for selected, ldToggle

### Feedback
- [x] LdAlertComponent — tone (info/success/warning/danger/neutral), title, closable, ldClose
- [x] LdDividerComponent — orientation horizontal/vertical
- [x] LdSkeletonComponent — lines mode, circle, custom width/height, shimmer animation
- [x] LdInlineInformComponent — type (full/line), background (grey/white/warning/green), actions, closable

### Overlays (Angular CDK)
- [x] LdTooltipDirective + LdTooltipBoxComponent — CDK Overlay ComponentPortal, placements, delay, keyboard accessible
- [x] LdPopoverComponent — cdkConnectedOverlay, trigger/content slots, backdrop
- [x] LdModalComponent + LdModalContentComponent — CDK Dialog, title/description/contentTpl, focus trap, ldClose

### Lists / Navigation
- [x] LdSelectComponent — cdkConnectedOverlay listbox, options array, size, ControlValueAccessor
- [x] LdMenuComponent — cdkConnectedOverlay, MenuItem[], separator, ldSelect, placement
- [x] LdTabsComponent + LdTabPanelComponent — variant (pill/underline), keyboard nav, count badge

### Data
- [x] LdBreadcrumbsComponent — BreadcrumbItem[], aria-current, chevron separator
- [x] LdPaginationComponent — siblingCount/boundaryCount algorithm, ellipsis, pageChange
- [x] LdAvatarComponent — size (sm/md/lg/xl), initials fallback, image error handling, square mode
- [x] LdDatePickerComponent — Ukrainian locale, 42-day grid, minDate/maxDate, ControlValueAccessor
- [x] LdTableComponent — columns/rows data-driven, sortable, zebra, hoverable, size

## Progress: 28 / 28 ✓
