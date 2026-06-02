import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Divider.module.css';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Default `horizontal`. */
  orientation?: 'horizontal' | 'vertical';
}

/** Divider — a 1px rule using the `--divider-divider` token. */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { orientation = 'horizontal', className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cn(styles.divider, styles[orientation], className)}
      {...rest}
    />
  );
});
