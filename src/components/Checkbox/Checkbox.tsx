import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Renders the indeterminate (semi-checked) visual and sets the DOM property. */
  indeterminate?: boolean;
  /** Optional inline label. */
  children?: ReactNode;
}

/**
 * Checkbox — accessible native checkbox with the Liga box visual. Supports controlled
 * (`checked`), uncontrolled (`defaultChecked`), and `indeterminate`.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { indeterminate = false, disabled, className, children, ...rest },
  ref,
) {
  const innerRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement, []);

  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label className={cn(styles.root, className)} data-disabled={disabled || undefined}>
      <input ref={innerRef} type="checkbox" className={styles.input} disabled={disabled} {...rest} />
      <span className={styles.box} aria-hidden="true">
        <svg className={styles.check} viewBox="0 0 11 8" fill="none">
          <path d="M1 4.2 3.8 7 10 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className={styles.dash} />
      </span>
      {children != null && children !== false && <span className={styles.label}>{children}</span>}
    </label>
  );
});
