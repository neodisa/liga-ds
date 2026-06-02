import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Skeleton.module.css';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: number | string;
  height?: number | string;
  /** Round (avatar) shape. */
  circle?: boolean;
  /** Render N stacked lines (last one shorter). Overrides children. */
  lines?: number;
}

const dim = (v: number | string | undefined) => (typeof v === 'number' ? `${v}px` : v);

/** Skeleton — animated loading placeholder. Decorative (aria-hidden). */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { width, height = '1em', circle = false, lines, className, style, ...rest },
  ref,
) {
  if (lines && lines > 1) {
    return (
      <div ref={ref} className={cn(styles.lines, className)} aria-hidden="true" {...rest}>
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            className={styles.skeleton}
            style={{ height: dim(height), width: i === lines - 1 ? '60%' : '100%' }}
          />
        ))}
      </div>
    );
  }

  const s: CSSProperties = {
    width: dim(width) ?? (circle ? dim(height) : '100%'),
    height: dim(height),
    ...style,
  };
  return (
    <div
      ref={ref}
      className={cn(styles.skeleton, circle && styles.circle, className)}
      style={s}
      aria-hidden="true"
      {...rest}
    />
  );
});
