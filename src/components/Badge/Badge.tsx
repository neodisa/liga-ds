import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import type { Tone } from '../../tokens/tokens';
import styles from './Badge.module.css';

export type BadgeVariant = 'solid' | 'subtle';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic tone. Default `neutral`. */
  tone?: Tone;
  /** `solid` (filled) or `subtle` (tinted). Default `subtle`. */
  variant?: BadgeVariant;
  /** sm 18 · md 24. Default `md`. */
  size?: BadgeSize;
  /** Render as an 8px dot (ignores children). */
  dot?: boolean;
}

/** Badge — compact status pill / count / dot. */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = 'neutral', variant = 'subtle', size = 'md', dot = false, className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        styles.badge,
        styles[`tone-${tone}`],
        styles[variant],
        !dot && styles[`size-${size}`],
        dot && styles.dot,
        className,
      )}
      {...rest}
    >
      {dot ? null : children}
    </span>
  );
});

export { styles as badgeStyles };
