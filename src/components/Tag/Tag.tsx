import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { badgeStyles, type BadgeVariant, type BadgeSize } from '../Badge/Badge';
import type { Tone } from '../../tokens/tokens';
import styles from './Tag.module.css';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Leading icon. */
  leftIcon?: ReactNode;
  /** When provided, renders a remove (×) button that calls this on click. */
  onRemove?: () => void;
  /** Accessible label for the remove button. Default "Remove". */
  removeLabel?: string;
  children: ReactNode;
}

/** Tag — labelled pill, optionally with a leading icon and a remove button. */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { tone = 'neutral', variant = 'subtle', size = 'md', leftIcon, onRemove, removeLabel = 'Remove', className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        badgeStyles.badge,
        badgeStyles[`tone-${tone}`],
        badgeStyles[variant],
        badgeStyles[`size-${size}`],
        className,
      )}
      {...rest}
    >
      {leftIcon ? (
        <span className={styles.icon} aria-hidden="true">
          {leftIcon}
        </span>
      ) : null}
      {children}
      {onRemove ? (
        <button type="button" className={styles.remove} aria-label={removeLabel} onClick={onRemove}>
          <svg viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      ) : null}
    </span>
  );
});
