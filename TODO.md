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
- [ ] Component + styles (ViewEncapsulation.None, CSS custom properties)
- [ ] Inputs typed, Outputs declared
- [ ] Exported from `src/public-api.ts`
- [ ] Playground story added to `projects/playground/src/app/app.component.ts`
- [ ] Screenshot verified

## Components — 28 total

### Foundation (done)
- [x] LdTextComponent — variant + color inputs
- [x] LdHeadingComponent — level 1-6, role/aria-level

### Actions
- [ ] LdButtonComponent — variant (primary/secondary/ghost/danger), size (sm/md/lg), loading, disabled, icon slots
- [ ] LdIconButtonComponent — icon-only variant
- [ ] LdSpinnerComponent — size, color

### Inputs
- [ ] LdInputComponent — type, size, prefix/suffix slots, error/disabled states
- [ ] LdSearchInputComponent — clearable
- [ ] LdTextareaComponent — rows, resize, error state
- [ ] LdFieldComponent — label, hint, error wrapper for any input

### Selection
- [ ] LdCheckboxComponent — indeterminate, error state
- [ ] LdRadioComponent — single radio button
- [ ] LdRadioGroupComponent — group with ControlValueAccessor
- [ ] LdSwitchComponent — size sm/md

### Labels
- [ ] LdBadgeComponent — variant, size, dot mode
- [ ] LdTagComponent — removable, addable
- [ ] LdChipComponent — selected state, filter mode

### Feedback
- [ ] LdAlertComponent — tone (info/success/warning/danger/neutral), title, onClose
- [ ] LdDividerComponent — orientation horizontal/vertical
- [ ] LdSkeletonComponent — lines, circle, custom height
- [ ] LdInlineInformComponent — type (full/line), background (grey/white/warning/green), actions, onClose

### Overlays (Angular CDK)
- [ ] LdTooltipComponent — CDK Overlay, keyboard accessible
- [ ] LdPopoverComponent — CDK Overlay, trigger/content slots
- [ ] LdModalComponent — CDK Dialog, title/description/close slots

### Lists / Navigation
- [ ] LdSelectComponent — CDK Overlay listbox, typeahead, option groups
- [ ] LdMenuComponent — CDK Overlay, MenuItem, MenuSeparator
- [ ] LdTabsComponent — variant (pill/underline), size, keyboard nav

### Data
- [ ] LdBreadcrumbsComponent — separator slot, BreadcrumbItem
- [ ] LdPaginationComponent — size, page/pageSize outputs
- [ ] LdAvatarComponent — size, fallback initials, image
- [ ] LdDatePickerComponent — UA locale calendar, range mode
- [ ] LdTableComponent — sortable columns, zebra, hover, TableHead/Body/Row/Cell

## Progress: 2 / 28
