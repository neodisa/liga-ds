import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useMergeRefs,
  useRole,
  FloatingFocusManager,
  FloatingPortal,
} from '@floating-ui/react';
import { cn } from '../../utils/cn';
import { useControllableState } from '../../utils/useControllableState';
import styles from './DatePicker.module.css';

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const addMonths = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth() + n, 1);
const sameDay = (a: Date | null | undefined, b: Date | null | undefined) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const sameMonth = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
const iso = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

function monthGrid(view: Date): Date[] {
  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const dow = (first.getDay() + 6) % 7; // Monday = 0
  const start = addDays(first, -dow);
  return Array.from({ length: 42 }, (_, i) => addDays(start, i));
}

export interface DatePickerProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (value: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  minDate?: Date;
  maxDate?: Date;
  /** Intl locale for the month label and formatted value. Default `uk-UA`. */
  locale?: string;
  id?: string;
  'aria-label'?: string;
  className?: string;
}

/** DatePicker — calendar field with month navigation and keyboard grid navigation. */
export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(function DatePicker(
  {
    value,
    defaultValue = null,
    onChange,
    placeholder = 'дд.мм.рррр',
    disabled = false,
    invalid = false,
    minDate,
    maxDate,
    locale = 'uk-UA',
    id,
    className,
    ...aria
  },
  propRef,
) {
  const [selected, setSelected] = useControllableState<Date | null>({
    value,
    defaultValue,
    onChange: onChange as (v: Date | null) => void,
  });
  const [open, setOpen] = useState(false);
  const today = startOfDay(new Date());
  const [view, setView] = useState<Date>(() => (selected ? new Date(selected) : today));
  const [focusedDate, setFocusedDate] = useState<Date>(() => (selected ? new Date(selected) : today));
  const focusedDayRef = useRef<HTMLButtonElement>(null);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: (next) => {
      setOpen(next);
      if (next) {
        const base = selected ?? today;
        setView(new Date(base));
        setFocusedDate(new Date(base));
      }
    },
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [offset(6), flip({ padding: 8 }), shift({ padding: 8 })],
  });
  const click = useClick(context, { enabled: !disabled });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'dialog' });
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);
  const triggerRef = useMergeRefs([refs.setReference, propRef]);

  // keep the focused day's view in sync + focus it
  useEffect(() => {
    if (open) focusedDayRef.current?.focus();
  }, [open, focusedDate]);

  const outOfRange = (d: Date) => (minDate && d < startOfDay(minDate)) || (maxDate && d > startOfDay(maxDate));

  const choose = (d: Date) => {
    if (outOfRange(d)) return;
    setSelected(startOfDay(d));
    setOpen(false);
  };

  const moveFocus = (next: Date) => {
    setFocusedDate(next);
    if (!sameMonth(next, view)) setView(new Date(next.getFullYear(), next.getMonth(), 1));
  };

  const onGridKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const handlers: Record<string, () => Date | void> = {
      ArrowLeft: () => addDays(focusedDate, -1),
      ArrowRight: () => addDays(focusedDate, 1),
      ArrowUp: () => addDays(focusedDate, -7),
      ArrowDown: () => addDays(focusedDate, 7),
      Home: () => addDays(focusedDate, -((focusedDate.getDay() + 6) % 7)),
      End: () => addDays(focusedDate, 6 - ((focusedDate.getDay() + 6) % 7)),
      PageUp: () => addMonths(focusedDate, -1),
      PageDown: () => addMonths(focusedDate, 1),
    };
    if (e.key in handlers) {
      e.preventDefault();
      const next = handlers[e.key]!();
      if (next) moveFocus(next);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      choose(focusedDate);
    }
  };

  const days = monthGrid(view);
  const monthLabel = view.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  const valueLabel = selected
    ? selected.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' })
    : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        disabled={disabled}
        data-open={open || undefined}
        data-invalid={invalid || undefined}
        className={cn(styles.trigger, className)}
        {...aria}
        {...getReferenceProps()}
      >
        <span className={cn(styles.value, !valueLabel && styles.placeholder)}>{valueLabel ?? placeholder}</span>
        <svg className={styles.calIcon} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <rect x="3" y="4.5" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 8h14M7 3v3M13 3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false} initialFocus={focusedDayRef}>
            <div ref={refs.setFloating} className={styles.calendar} style={floatingStyles} {...getFloatingProps()}>
              <div className={styles.header}>
                <button type="button" className={styles.navBtn} aria-label="Previous month" onClick={() => setView(addMonths(view, -1))}>
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <span className={styles.monthLabel} aria-live="polite">{monthLabel}</span>
                <button type="button" className={styles.navBtn} aria-label="Next month" onClick={() => setView(addMonths(view, 1))}>
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
              <div className={styles.grid} role="grid" aria-label={monthLabel} onKeyDown={onGridKeyDown}>
                <div role="row" style={{ display: 'contents' }}>
                  {WEEKDAYS.map((w) => (
                    <span key={w} className={styles.weekday} role="columnheader" aria-label={w}>
                      {w}
                    </span>
                  ))}
                </div>
                {Array.from({ length: 6 }, (_, week) => (
                  <div role="row" style={{ display: 'contents' }} key={week}>
                    {days.slice(week * 7, week * 7 + 7).map((d) => {
                      const isFocused = sameDay(d, focusedDate);
                      const isSelected = sameDay(d, selected);
                      return (
                        <button
                          key={iso(d)}
                          ref={isFocused ? focusedDayRef : undefined}
                          type="button"
                          role="gridcell"
                          aria-selected={isSelected}
                          aria-current={sameDay(d, today) ? 'date' : undefined}
                          tabIndex={isFocused ? 0 : -1}
                          disabled={outOfRange(d)}
                          data-outside={!sameMonth(d, view) || undefined}
                          data-today={sameDay(d, today) || undefined}
                          data-selected={isSelected || undefined}
                          className={styles.day}
                          onClick={() => choose(d)}
                        >
                          {d.getDate()}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
});
