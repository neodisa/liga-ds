import {
  cloneElement,
  forwardRef,
  isValidElement,
  useId,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import { typographyClass } from '../../tokens/tokens';
import { Text } from '../Text/Text';
import styles from './Field.module.css';

export interface FieldProps {
  /** Field label. Rendered as a `<label>` wired to the control via `htmlFor`. */
  label?: ReactNode;
  /** Helper text. */
  description?: ReactNode;
  /** Where the description sits relative to the control. Default `bottom`. */
  descriptionPlacement?: 'top' | 'bottom';
  /** Error message. When present, the control gets `aria-invalid` and an `alert` is announced. */
  error?: ReactNode;
  /** Marks the field required (visual asterisk + `aria-required` on the control). */
  required?: boolean;
  /** Explicit id for the control (otherwise auto-generated). */
  id?: string;
  /** The single form control (e.g. `<Input />`). */
  children: ReactElement<Record<string, unknown>>;
  className?: string;
}

/**
 * Field — pairs a label, optional description, and error message with a single control,
 * wiring `id`, `aria-describedby`, `aria-invalid`, and `aria-required` automatically.
 */
export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  { label, description, descriptionPlacement = 'bottom', error, required = false, id: idProp, children, className },
  ref,
) {
  const reactId = useId();
  const id = idProp ?? `${reactId}-control`;
  const descId = `${reactId}-desc`;
  const errId = `${reactId}-err`;

  const hasDescription = description != null && description !== false;
  const hasError = error != null && error !== false;
  const describedBy =
    [hasDescription ? descId : null, hasError ? errId : null].filter(Boolean).join(' ') || undefined;

  const control = isValidElement(children)
    ? cloneElement(children, {
        id,
        'aria-describedby': describedBy,
        'aria-invalid': hasError || undefined,
        'aria-required': required || undefined,
        invalid: hasError || undefined,
      })
    : children;

  const descriptionEl = hasDescription ? (
    <Text as="div" id={descId} variant="h200-regular" className={styles.description}>
      {description}
    </Text>
  ) : null;

  return (
    <div ref={ref} className={cn(styles.field, className)}>
      {label != null && label !== false && (
        <label htmlFor={id} className={cn(typographyClass('h300-medium'), styles.label)}>
          {label}
          {required && (
            <span aria-hidden="true" className={styles.required}>
              {' '}
              *
            </span>
          )}
        </label>
      )}
      {descriptionPlacement === 'top' && descriptionEl}
      {control}
      {descriptionPlacement === 'bottom' && descriptionEl}
      {hasError && (
        <Text as="div" id={errId} role="alert" variant="h200-regular" className={styles.error}>
          {error}
        </Text>
      )}
    </div>
  );
});
