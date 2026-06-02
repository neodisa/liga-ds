import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './Switch.module.css';

export type SwitchSize = 'sm' | 'md';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** `sm` 44×24 · `md` 60×32. Default `md`. */
  size?: SwitchSize;
  /** Marks the control invalid (error styling). */
  invalid?: boolean;
  /** Optional inline label rendered after the track. */
  children?: ReactNode;
}

/**
 * Switch — accessible on/off toggle. Renders a native checkbox with `role="switch"`,
 * so it works in forms and with the keyboard. Supports controlled (`checked`),
 * uncontrolled (`defaultChecked`), `disabled` and `invalid`.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { size = 'md', invalid = false, disabled, className, children, ...rest },
  ref,
) {
  return (
    <label
      className={cn(styles.root, className)}
      data-size={size}
      data-disabled={disabled || undefined}
    >
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        className={styles.input}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        {...rest}
      />
      <span className={styles.track} data-invalid={invalid || undefined} aria-hidden="true">
        <span className={styles.thumb} />
      </span>
      {children != null && children !== false && <span className={styles.label}>{children}</span>}
    </label>
  );
});
