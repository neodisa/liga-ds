import { forwardRef } from 'react';
import { Text, type TextProps } from '../Text/Text';
import type { TypographyVariant } from '../../tokens/tokens';

export interface HeadingProps extends Omit<TextProps, 'as'> {
  /** Heading level 1–6. Renders the matching <h1>–<h6> and a sensible default text style. */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const LEVEL_VARIANT: Record<NonNullable<HeadingProps['level']>, TypographyVariant> = {
  1: 'h800-medium',
  2: 'h700-semibold',
  3: 'h600-medium',
  4: 'h500-medium',
  5: 'h450-medium',
  6: 'h400-medium',
};

/**
 * Heading — semantic <h1>–<h6> with a default text style per level (override with `variant`).
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { level = 2, variant, ...rest },
  ref,
) {
  return (
    <Text
      ref={ref}
      as={`h${level}` as const}
      variant={variant ?? LEVEL_VARIANT[level]}
      {...rest}
    />
  );
});
