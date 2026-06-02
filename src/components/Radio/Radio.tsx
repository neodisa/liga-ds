import { forwardRef, type ChangeEvent, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { useRadioGroup } from './RadioGroup';
import styles from './Radio.module.css';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** The radio's value (required inside a RadioGroup). */
  value: string;
  /** Optional inline label. */
  children?: ReactNode;
}

/**
 * Radio — single radio button. Inside a `RadioGroup` it inherits the group's name,
 * selection, and disabled state; standalone it behaves as a native radio.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { value, disabled, className, children, name, checked, onChange, ...rest },
  ref,
) {
  const group = useRadioGroup();
  const inGroup = group !== null;

  const isDisabled = disabled ?? group?.disabled ?? false;
  const isChecked = inGroup ? group.value === value : checked;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (inGroup) group.setValue(value);
    onChange?.(e);
  };

  return (
    <label className={cn(styles.root, className)} data-disabled={isDisabled || undefined}>
      <input
        ref={ref}
        type="radio"
        className={styles.input}
        name={inGroup ? group.name : name}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        onChange={handleChange}
        {...rest}
      />
      <span className={styles.dot} aria-hidden="true" />
      {children != null && children !== false && <span className={styles.label}>{children}</span>}
    </label>
  );
});
