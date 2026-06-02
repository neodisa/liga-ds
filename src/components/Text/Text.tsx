import { forwardRef, type ElementType, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { typographyClass, type TypographyVariant } from '../../tokens/tokens';
import styles from './Text.module.css';

export type TextColor =
  | 'default'
  | 'subtle'
  | 'subtlest'
  | 'disabled'
  | 'danger'
  | 'warning'
  | 'success'
  | 'information'
  | 'accent'
  | 'alternative'
  | 'brand'
  | 'inherit';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Defaults to `span`. */
  as?: ElementType;
  /** One of the 26 published Figma text styles. Defaults to body (`h300-regular`). */
  variant?: TypographyVariant;
  /** Semantic text color token. Defaults to `default`. */
  color?: TextColor;
  /** Text alignment. */
  align?: 'start' | 'center' | 'end';
  /** Truncate to a single line with an ellipsis. */
  truncate?: boolean;
}

/**
 * Text — the typographic primitive. Applies one of the published Figma text styles
 * and a semantic color token. Polymorphic via `as`.
 */
export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { as, variant = 'h300-regular', color = 'default', align, truncate, className, ...rest },
  ref,
) {
  // The rendered element is dynamic; its prop shape can't be statically known here,
  // so the local element type is intentionally loose. The public API stays typed.
  const Comp: any = as ?? 'span';
  return (
    <Comp
      ref={ref}
      className={cn(
        typographyClass(variant),
        styles.text,
        styles[`color-${color}`],
        align && styles[`align-${align}`],
        truncate && styles.truncate,
        className,
      )}
      {...rest}
    />
  );
});
