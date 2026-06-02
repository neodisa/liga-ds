import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Spinner } from '../Spinner/Spinner';
import styles from './Input.module.css';

export type InputSize = 'sm' | 'md' | 'lg' | 'xl';

const ICON_SIZE: Record<InputSize, number> = { sm: 16, md: 18, lg: 20, xl: 20 };

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** sm 24 · md 32 · lg 40 (default) · xl 48 */
  size?: InputSize;
  /** Icon rendered before the field. */
  leftIcon?: ReactNode;
  /** Icon rendered after the field. */
  rightIcon?: ReactNode;
  /** Error appearance + `aria-invalid`. */
  invalid?: boolean;
  /** Shows a trailing spinner. */
  loading?: boolean;
  /** className for the wrapper element (the field's visible box). */
  className?: string;
}

/**
 * Input — single-line text field. The wrapper carries the border/states; the inner
 * native `<input>` receives the forwarded ref and all standard input props.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = 'lg', leftIcon, rightIcon, invalid = false, loading = false, disabled, readOnly, className, ...rest },
  ref,
) {
  return (
    <div
      className={cn(styles.root, styles[`size-${size}`], className)}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      data-invalid={invalid || undefined}
    >
      {leftIcon ? (
        <span className={styles.icon} aria-hidden="true">
          {leftIcon}
        </span>
      ) : null}
      <input
        ref={ref}
        className={styles.input}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={invalid || undefined}
        {...rest}
      />
      {loading ? (
        <span className={styles.icon}>
          <Spinner size={ICON_SIZE[size]} />
        </span>
      ) : rightIcon ? (
        <span className={styles.icon} aria-hidden="true">
          {rightIcon}
        </span>
      ) : null}
    </div>
  );
});

const SearchGlyph = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8" />
    <path d="m17 17-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export interface SearchInputProps extends Omit<InputProps, 'leftIcon' | 'type'> {}

/** SearchInput — Input preset with a leading search glyph and `type="search"`. */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { placeholder = 'Search', ...rest },
  ref,
) {
  return <Input ref={ref} type="search" leftIcon={<SearchGlyph />} placeholder={placeholder} {...rest} />;
});
