import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { badgeStyles, type BadgeSize } from '../Badge/Badge';
import type { Tone } from '../../tokens/tokens';
import styles from './Chip.module.css';

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  tone?: Tone;
  size?: BadgeSize;
  /** Selected (pressed) state — fills solid; otherwise subtle. */
  selected?: boolean;
  leftIcon?: ReactNode;
}

/** Chip — interactive, toggleable pill (subtle when off, solid when selected). */
export const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { tone = 'neutral', size = 'md', selected = false, leftIcon, className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={selected}
      className={cn(
        badgeStyles.badge,
        badgeStyles[`tone-${tone}`],
        badgeStyles[selected ? 'solid' : 'subtle'],
        badgeStyles[`size-${size}`],
        styles.chip,
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
    </button>
  );
});
