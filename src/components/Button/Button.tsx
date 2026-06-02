import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Spinner } from '../Spinner/Spinner';
import styles from './Button.module.css';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'transparent'
  | 'danger'
  | 'danger-secondary'
  | 'danger-transparent';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

const ICON_SIZE: Record<ButtonSize, number> = { sm: 18, md: 20, lg: 24, xl: 24 };

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant (maps to the Figma Type × Fill matrix). Default `primary`. */
  variant?: ButtonVariant;
  /** sm 24 · md 32 · lg 40 (default) · xl 48 — heights from Figma. */
  size?: ButtonSize;
  /** Icon before the label. */
  leftIcon?: ReactNode;
  /** Icon after the label. */
  rightIcon?: ReactNode;
  /** Shows a spinner and blocks interaction. */
  loading?: boolean;
  /** Stretch to the full width of the container. */
  fullWidth?: boolean;
  /** Persisted "selected"/active appearance (toggle buttons). */
  selected?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'lg',
    leftIcon,
    rightIcon,
    loading = false,
    fullWidth = false,
    selected = false,
    disabled = false,
    type = 'button',
    className,
    children,
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading;
  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      data-selected={selected || undefined}
      className={cn(
        styles.button,
        styles[`variant-${variant}`],
        styles[`size-${size}`],
        fullWidth && styles.fullWidth,
        className,
      )}
      {...rest}
    >
      {loading ? (
        <span className={styles.icon}>
          <Spinner size={ICON_SIZE[size]} />
        </span>
      ) : leftIcon ? (
        <span className={styles.icon} aria-hidden="true">
          {leftIcon}
        </span>
      ) : null}
      {children != null && children !== false && <span className={styles.label}>{children}</span>}
      {!loading && rightIcon ? (
        <span className={styles.icon} aria-hidden="true">
          {rightIcon}
        </span>
      ) : null}
    </button>
  );
});

export interface IconButtonProps
  extends Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'children' | 'fullWidth'> {
  /** The icon to render. */
  icon: ReactNode;
  /** Required — icon-only buttons must have an accessible name. */
  'aria-label': string;
}

/** IconButton — square, icon-only Button. Defaults to the `transparent` (ghost) variant. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, variant = 'transparent', size = 'lg', className, ...rest },
  ref,
) {
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      leftIcon={icon}
      className={cn(styles.iconOnly, className)}
      {...rest}
    />
  );
});
