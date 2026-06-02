import { forwardRef, useRef, useState } from 'react';
import {
  autoUpdate,
  flip,
  offset,
  size as sizeMiddleware,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTypeahead,
  FloatingFocusManager,
  FloatingPortal,
} from '@floating-ui/react';
import { cn } from '../../utils/cn';
import { useControllableState } from '../../utils/useControllableState';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  size?: SelectSize;
  disabled?: boolean;
  invalid?: boolean;
  id?: string;
  name?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-required'?: boolean;
  className?: string;
}

const Chevron = () => (
  <svg className={styles.chevron} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Check = () => (
  <svg className={styles.check} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="m3 8 3.2 3.2L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Select — accessible single-select listbox (keyboard nav + typeahead). */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    options,
    value,
    defaultValue,
    onChange,
    placeholder = 'Select…',
    size = 'lg',
    disabled = false,
    invalid = false,
    id,
    name,
    className,
    ...aria
  },
  propRef,
) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useControllableState<string | undefined>({
    value,
    defaultValue,
    onChange: onChange as (v: string | undefined) => void,
  });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const selectedIndex = options.findIndex((o) => o.value === selected);
  const listRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>(options.map((o) => o.label));
  labelsRef.current = options.map((o) => o.label);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(6),
      flip({ padding: 8 }),
      sizeMiddleware({
        apply({ rects, elements }) {
          elements.floating.style.setProperty('--liga-anchor-width', `${rects.reference.width}px`);
        },
      }),
    ],
  });

  const handleSelect = (index: number) => {
    const opt = options[index];
    if (!opt || opt.disabled) return;
    setSelected(opt.value);
    setOpen(false);
    setActiveIndex(null);
  };

  const click = useClick(context, { enabled: !disabled });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'listbox' });
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    selectedIndex: selectedIndex >= 0 ? selectedIndex : null,
    onNavigate: setActiveIndex,
    loop: true,
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    selectedIndex: selectedIndex >= 0 ? selectedIndex : null,
    onMatch: open ? setActiveIndex : (index) => handleSelect(index),
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
    listNav,
    typeahead,
  ]);

  const triggerRef = useMergeRefs([refs.setReference, propRef]);
  const selectedOption = options[selectedIndex];

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        name={name}
        disabled={disabled}
        data-open={open || undefined}
        data-invalid={invalid || undefined}
        className={cn(styles.trigger, styles[`size-${size}`], className)}
        {...aria}
        {...getReferenceProps()}
      >
        <span className={cn(styles.value, !selectedOption && styles.placeholder)}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <Chevron />
      </button>

      {open && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              className={styles.listbox}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {options.map((opt, index) => {
                const isSelected = opt.value === selected;
                return (
                  <div
                    key={opt.value}
                    ref={(node) => {
                      listRef.current[index] = node;
                    }}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={opt.disabled || undefined}
                    data-active={activeIndex === index || undefined}
                    data-selected={isSelected || undefined}
                    className={styles.option}
                    {...getItemProps({
                      onClick: () => handleSelect(index),
                    })}
                  >
                    <span>{opt.label}</span>
                    {isSelected ? <Check /> : null}
                  </div>
                );
              })}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
});
