import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Textarea.module.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Error appearance + `aria-invalid`. */
  invalid?: boolean;
}

/** Textarea — multi-line text field. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid = false, className, rows = 3, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(styles.root, className)}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
});
