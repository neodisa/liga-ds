// Liga DS — Angular public API

export { LdTextComponent, type TextColor, type TextVariant } from './lib/text/text.component';
export { LdHeadingComponent, type HeadingLevel } from './lib/heading/heading.component';
export { LdSpinnerComponent, type SpinnerSize, type SpinnerColor } from './lib/spinner/spinner.component';
export { LdButtonComponent, type ButtonVariant, type ButtonSize } from './lib/button/button.component';
export { LdIconButtonComponent } from './lib/button/icon-button.component';

// Feedback
export { LdDividerComponent, type DividerOrientation } from './lib/divider/divider.component';
export { LdBadgeComponent, type BadgeTone, type BadgeVariant, type BadgeSize } from './lib/badge/badge.component';
export { LdSkeletonComponent } from './lib/skeleton/skeleton.component';
export { LdAvatarComponent, type AvatarSize } from './lib/avatar/avatar.component';
export { LdAlertComponent, type AlertTone } from './lib/alert/alert.component';
export { LdInlineInformComponent, type InlineInformType, type InlineInformBackground, type InlineInformAction } from './lib/inline-inform/inline-inform.component';

// Inputs
export { LdInputComponent, LdSearchInputComponent, type InputSize } from './lib/input/input.component';
export { LdTextareaComponent } from './lib/textarea/textarea.component';
export { LdFieldComponent } from './lib/field/field.component';

// Selection
export { LdCheckboxComponent } from './lib/checkbox/checkbox.component';
export { LdRadioComponent, LdRadioGroupComponent } from './lib/radio/radio.component';
export { LdSwitchComponent, type SwitchSize } from './lib/switch/switch.component';

// Labels
export { LdTagComponent } from './lib/tag/tag.component';
export { LdChipComponent } from './lib/chip/chip.component';

// Navigation
export { LdBreadcrumbsComponent, type BreadcrumbItem } from './lib/breadcrumbs/breadcrumbs.component';
export { LdPaginationComponent, type PaginationSize } from './lib/pagination/pagination.component';
export { LdTabsComponent, LdTabPanelComponent, type TabsVariant, type TabsSize } from './lib/tabs/tabs.component';

// Data
export { LdTableComponent, type TableColumn, type TableRow, type TableSize, type SortDirection } from './lib/table/table.component';

// Overlays (CDK)
export { LdTooltipDirective, LdTooltipBoxComponent, type TooltipPlacement } from './lib/tooltip/tooltip.directive';
export { LdPopoverComponent, type PopoverPlacement } from './lib/popover/popover.component';
export { LdModalComponent, LdModalContentComponent } from './lib/modal/modal.component';
export { LdSelectComponent, type SelectOption, type SelectSize } from './lib/select/select.component';
export { LdMenuComponent, type MenuItem, type MenuPlacement } from './lib/menu/menu.component';
export { LdDatePickerComponent } from './lib/date-picker/date-picker.component';

// Tokens — typed references to the Figma token system (CSS variables)
export {
  space,
  radius,
  cssVar,
  typographyClass,
  SPACE_SCALE,
  RADIUS_SCALE,
  ELEVATION_SCALE,
  TYPOGRAPHY_VARIANTS,
  type Brand,
  type Space,
  type Radius,
  type Elevation,
  type Tone,
  type TypographyVariant,
} from './tokens/tokens';
