import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import { useControllableState } from '../../utils/useControllableState';
import styles from './Tabs.module.css';

interface TabsContextValue {
  value: string | undefined;
  setValue: (v: string) => void;
  idBase: string;
  orientation: 'horizontal' | 'vertical';
}
const TabsContext = createContext<TabsContextValue | null>(null);
function useTabs(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs.* must be used within <Tabs>');
  return ctx;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  children: ReactNode;
}

function TabsRoot({ value, defaultValue, onValueChange, orientation = 'horizontal', className, children, ...rest }: TabsProps) {
  const [val, setVal] = useControllableState<string | undefined>({
    value,
    defaultValue,
    onChange: onValueChange as (v: string | undefined) => void,
  });
  const idBase = useId();
  return (
    <TabsContext.Provider value={{ value: val, setValue: setVal, idBase, orientation }}>
      <div className={className} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export const TabsList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function TabsList(
  { className, onKeyDown, ...rest },
  ref,
) {
  const { orientation } = useTabs();

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    const nextKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
    const prevKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
    if (![nextKey, prevKey, 'Home', 'End'].includes(e.key)) return;
    const tabs = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'),
    );
    const current = document.activeElement as HTMLElement;
    const idx = tabs.indexOf(current as HTMLButtonElement);
    if (idx === -1) return;
    e.preventDefault();
    let next = idx;
    if (e.key === nextKey) next = (idx + 1) % tabs.length;
    else if (e.key === prevKey) next = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    tabs[next]?.focus();
    tabs[next]?.click();
  };

  return (
    <div
      ref={ref}
      role="tablist"
      aria-orientation={orientation}
      data-orientation={orientation}
      className={cn(styles.list, className)}
      onKeyDown={handleKeyDown}
      {...rest}
    />
  );
});

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Identifies this tab and its panel. */
  value: string;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { value, className, onClick, disabled, ...rest },
  ref,
) {
  const ctx = useTabs();
  const selected = ctx.value === value;
  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      id={`${ctx.idBase}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${ctx.idBase}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      data-selected={selected || undefined}
      disabled={disabled}
      className={cn(styles.tab, className)}
      onClick={(e) => {
        onClick?.(e);
        if (!disabled) ctx.setValue(value);
      }}
      {...rest}
    />
  );
});

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel(
  { value, className, ...rest },
  ref,
) {
  const ctx = useTabs();
  const selected = ctx.value === value;
  if (!selected) return null;
  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`${ctx.idBase}-panel-${value}`}
      aria-labelledby={`${ctx.idBase}-tab-${value}`}
      tabIndex={0}
      className={cn(styles.panel, className)}
      {...rest}
    />
  );
});

/** Tabs — accessible tablist. Compound: `Tabs.List` / `Tabs.Tab` / `Tabs.Panel`. */
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab,
  Panel: TabPanel,
});
