// Liga DS — public API barrel.
// Components are exported here as they are built (see docs/foundation.md §8).
import './styles.css';

export const version = '0.1.0';

/* ---- Components ---- */
export { Text, type TextProps, type TextColor } from './components/Text';
export { Heading, type HeadingProps } from './components/Heading';
export {
  Button,
  IconButton,
  type ButtonProps,
  type IconButtonProps,
  type ButtonVariant,
  type ButtonSize,
} from './components/Button';
export { Spinner, type SpinnerProps } from './components/Spinner';
export {
  Input,
  SearchInput,
  type InputProps,
  type SearchInputProps,
  type InputSize,
} from './components/Input';
export { Textarea, type TextareaProps } from './components/Textarea';
export { Field, type FieldProps } from './components/Field';
export { Checkbox, type CheckboxProps } from './components/Checkbox';
export { Radio, RadioGroup, useRadioGroup, type RadioProps, type RadioGroupProps } from './components/Radio';
export { Switch, type SwitchProps, type SwitchSize } from './components/Switch';
export { Badge, type BadgeProps, type BadgeVariant, type BadgeSize } from './components/Badge';
export { Tag, type TagProps } from './components/Tag';
export { Chip, type ChipProps } from './components/Chip';
export { Alert, type AlertProps, type AlertTone } from './components/Alert';
export { Divider, type DividerProps } from './components/Divider';
export { Skeleton, type SkeletonProps } from './components/Skeleton';
export { Tooltip, type TooltipProps } from './components/Tooltip';
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  type PopoverProps,
  type PopoverContentProps,
} from './components/Popover';
export {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalTitle,
  ModalDescription,
  ModalClose,
  type ModalProps,
  type ModalContentProps,
} from './components/Modal';
export { Select, type SelectProps, type SelectOption, type SelectSize } from './components/Select';
export { Menu, MenuItem, MenuSeparator, type MenuProps, type MenuItemProps } from './components/Menu';
export {
  Tabs,
  TabsList,
  Tab,
  TabPanel,
  type TabsProps,
  type TabProps,
  type TabPanelProps,
  type TabsVariant,
  type TabsSize,
} from './components/Tabs';
export {
  Breadcrumbs,
  BreadcrumbItem,
  type BreadcrumbsProps,
  type BreadcrumbItemProps,
} from './components/Breadcrumbs';
export {
  Pagination,
  type PaginationProps,
  type PaginationSize,
} from './components/Pagination';
export { Avatar, type AvatarProps, type AvatarSize } from './components/Avatar';
export { DatePicker, type DatePickerProps } from './components/DatePicker';
export {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  type TableProps,
  type TableHeaderCellProps,
  type TableSize,
  type SortDirection,
} from './components/Table';

/* ---- Utilities ---- */
export { cn, type ClassValue, useControllableState, type UseControllableStateParams } from './utils';

export {
  type Brand,
  type Space,
  type Radius,
  type Elevation,
  type Tone,
  type TypographyVariant,
  SPACE_SCALE,
  RADIUS_SCALE,
  ELEVATION_SCALE,
  TYPOGRAPHY_VARIANTS,
  space,
  radius,
  typographyClass,
  cssVar,
} from './tokens/tokens';
