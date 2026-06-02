import { useCallback, useRef, useState } from 'react';

export interface UseControllableStateParams<T> {
  /** Controlled value. When provided (not `undefined`), the component is controlled. */
  value?: T;
  /** Initial value for the uncontrolled case. */
  defaultValue?: T;
  /** Called whenever the value should change (both controlled and uncontrolled). */
  onChange?: (value: T) => void;
}

/**
 * Bridges controlled and uncontrolled usage. Returns the current value and a setter
 * that updates internal state only when uncontrolled, and always calls `onChange`.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateParams<T>): [T, (next: T) => void] {
  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState<T | undefined>(defaultValue);

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const current = (isControlled ? value : uncontrolled) as T;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next);
      onChangeRef.current?.(next);
    },
    [isControlled],
  );

  return [current, setValue];
}
