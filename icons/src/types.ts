import type { SVGProps } from 'react';

/** Props accepted by every Liga360 icon. Icons default to 1em (inherit font-size) and
 * `currentColor`. Pass `title` for an accessible name, or size via `width`/`height`/CSS. */
export type IconProps = SVGProps<SVGSVGElement> & {
  title?: string;
  titleId?: string;
};
