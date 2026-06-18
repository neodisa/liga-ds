/**
 * Liga DS — typed token references.
 * Mirrors the real Figma token system (fileKey fOisEfYBh4z6VbkY6sOmSn).
 * Components consume CSS variables directly in their CSS Modules; this module
 * provides the TS-level vocabulary (scales, tones, typography variants) used by
 * component prop types and for inline/style-based token references.
 */

/** Brand themes (Figma collection modes). Default brand is Liga360. */
export type Brand = 'liga360' | 'united';

/* ---- Spacing scale (semantic `space/*` tokens) ---- */
export const SPACE_SCALE = [
  '0', '025', '050', '075', '100', '150', '200', '250', '300', '400', '450', '500', '600', '800', '1000', '1200',
] as const;
export type Space = (typeof SPACE_SCALE)[number];
/** `space('100')` -> `var(--space-100)` (8px). */
export const space = (s: Space): string => `var(--space-${s})`;

/* ---- Corner radius scale (semantic `cntnr/corner/*` tokens) ---- */
export const RADIUS_SCALE = [
  'none', 'nano', 'small', 'normal', 'big', 'large', 'biggest', 'infinity',
] as const;
export type Radius = (typeof RADIUS_SCALE)[number];
/** `radius('normal')` -> `var(--cntnr-corner-normal)` (8px). */
export const radius = (r: Radius): string => `var(--cntnr-corner-${r})`;

/* ---- Elevation (effect styles Elevation 1–3) ---- */
export const ELEVATION_SCALE = ['1', '2', '3'] as const;
export type Elevation = (typeof ELEVATION_SCALE)[number];

/* ---- Semantic status tones (status/Filled/*, status/Transparent/*) ---- */
export type Tone = 'primary' | 'neutral' | 'success' | 'danger' | 'warning' | 'info';

/* ---- Typography: the 26 published Figma text styles ---- */
export const TYPOGRAPHY_VARIANTS = [
  'h100-regular', 'h100-medium', 'h100-semibold', 'h100-caps',
  'h200-regular', 'h200-medium', 'h200-semibold', 'h200-caps',
  'h300-regular', 'h300-regular-paragraph', 'h300-medium', 'h300-bold', 'h300-caps', 'h300-cta',
  'h400-regular', 'h400-regular-paragraph', 'h400-medium', 'h400-bold', 'h400-caps',
  'h450-regular', 'h450-medium', 'h450-bold', 'h450-caps',
  'h500-regular', 'h500-medium', 'h500-bold', 'h500-caps',
  'h600-regular', 'h600-medium', 'h600-bold', 'h600-caps',
  'h700-regular', 'h700-medium', 'h700-semibold', 'h700-bold', 'h700-caps',
  'h800-regular', 'h800-medium', 'h800-bold', 'h800-caps',
] as const;
export type TypographyVariant = (typeof TYPOGRAPHY_VARIANTS)[number];
/** Maps a typography variant to its global utility class. */
export const typographyClass = (v: TypographyVariant): string => `liga-typo-${v}`;

/** Reference any Liga CSS variable by its (un-prefixed) name: `cssVar('text-default')`. */
export const cssVar = (name: string): string => `var(--${name})`;
