import { forwardRef, useState, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

import styles from './Avatar.module.css';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Image source. Falls back to initials/icon if missing or it fails to load. */
  src?: string;
  /** Alt text / accessible name. Defaults to `name`. */
  alt?: string;
  /** Person's name — used to derive initials when there is no image. */
  name?: string;
  size?: AvatarSize;
  /** Rounded-square instead of circle. */
  square?: boolean;
}

function initials(name?: string): string {
  if (!name) return '';
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? '').join('');
}

/** Avatar — circular (or square) user image with initials fallback. */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt, name, size = 'md', square = false, className, ...rest },
  ref,
) {
  const [failed, setFailed] = useState(false);
  const label = alt ?? name;
  const showImage = src && !failed;
  const text = initials(name);

  return (
    <span
      ref={ref}
      role="img"
      aria-label={label}
      className={cn(styles.avatar, styles[`size-${size}`], square && styles.square, className)}
      {...rest}
    >
      {showImage ? (
        <img className={styles.img} src={src} alt="" onError={() => setFailed(true)} />
      ) : text ? (
        <span aria-hidden="true">{text}</span>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="60%" height="60%">
          <circle cx="12" cy="8" r="4" fill="currentColor" />
          <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" fill="currentColor" />
        </svg>
      )}
    </span>
  );
});
