export type ClassValue = string | number | false | null | undefined;

/** Minimal className combiner — filters falsy values and joins with spaces. */
export function cn(...values: ClassValue[]): string {
  let out = '';
  for (const v of values) {
    if (!v) continue;
    out += (out && ' ') + v;
  }
  return out;
}
