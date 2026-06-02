import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import { useControllableState } from '../../utils/useControllableState';
import styles from './RadioGroup.module.css';

interface RadioGroupContextValue {
  name: string;
  value: string | undefined;
  setValue: (v: string) => void;
  disabled?: boolean;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Shared `name` for the radios (auto-generated if omitted). */
  name?: string;
  /** Controlled selected value. */
  value?: string;
  /** Initial value (uncontrolled). */
  defaultValue?: string;
  /** Called with the newly selected value. */
  onChange?: (value: string) => void;
  /** Disable every radio in the group. */
  disabled?: boolean;
  /** Layout direction. Default `vertical`. */
  orientation?: 'vertical' | 'horizontal';
  children: ReactNode;
}

/** RadioGroup — manages a set of Radios (shared name + single selected value). */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  { name, value, defaultValue, onChange, disabled, orientation = 'vertical', className, children, ...rest },
  ref,
) {
  const autoName = useId();
  const [val, setVal] = useControllableState<string | undefined>({
    value,
    defaultValue,
    onChange: onChange as (v: string | undefined) => void,
  });

  return (
    <div
      ref={ref}
      role="radiogroup"
      className={cn(styles.group, styles[orientation], className)}
      {...rest}
    >
      <RadioGroupContext.Provider
        value={{ name: name ?? autoName, value: val, setValue: setVal, disabled }}
      >
        {children}
      </RadioGroupContext.Provider>
    </div>
  );
});

export function useRadioGroup(): RadioGroupContextValue | null {
  return useContext(RadioGroupContext);
}
