import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Spinner.module.css';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Diameter in pixels. Defaults to 20. */
  size?: number;
  /** Accessible label. When provided, the spinner is announced (role="status"); otherwise it is decorative. */
  label?: string;
}

/**
 * Spinner — indeterminate loading indicator. Uses `currentColor`, so it inherits the
 * surrounding text color (e.g. inside a Button).
 */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = 20, label, className, ...rest },
  ref,
) {
  const stroke = Math.max(1.5, size / 12);
  const r = (size - stroke) / 2;
  const c = size / 2;
  return (
    <span
      ref={ref}
      className={cn(styles.spinner, className)}
      role={label ? 'status' : undefined}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      {...rest}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
        <circle className={styles.track} cx={c} cy={c} r={r} stroke="currentColor" strokeWidth={stroke} />
        <circle
          className={styles.head}
          cx={c}
          cy={c}
          r={r}
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${(2 * Math.PI * r) * 0.25} ${(2 * Math.PI * r) * 0.75}`}
        />
      </svg>
    </span>
  );
});
