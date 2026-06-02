import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useMemo,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
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
  type Placement,
} from '@floating-ui/react';
import { cn } from '../../utils/cn';
import { useControllableState } from '../../utils/useControllableState';
import styles from './Popover.module.css';

interface PopoverContextValue {
  open: boolean;
  setOpen: (o: boolean) => void;
  modal: boolean;
  floating: ReturnType<typeof useFloating>;
  getReferenceProps: (props?: Record<string, unknown>) => Record<string, unknown>;
  getFloatingProps: (props?: Record<string, unknown>) => Record<string, unknown>;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext(): PopoverContextValue {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error('Popover.Trigger / Popover.Content must be used within <Popover>');
  return ctx;
}

export interface PopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: Placement;
  /** Trap focus and block the rest of the page while open. Default false. */
  modal?: boolean;
  children: ReactNode;
}

function PopoverRoot({
  open,
  defaultOpen = false,
  onOpenChange,
  placement = 'bottom-start',
  modal = false,
  children,
}: PopoverProps) {
  const [isOpen, setOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const floating = useFloating({
    open: isOpen,
    onOpenChange: setOpen,
    placement,
    middleware: [offset(6), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(floating.context);
  const dismiss = useDismiss(floating.context);
  const role = useRole(floating.context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const value = useMemo<PopoverContextValue>(
    () => ({ open: isOpen, setOpen, modal, floating, getReferenceProps, getFloatingProps }),
    [isOpen, setOpen, modal, floating, getReferenceProps, getFloatingProps],
  );

  return <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>;
}

export interface PopoverTriggerProps {
  children: ReactElement;
}

export const PopoverTrigger = forwardRef<HTMLElement, PopoverTriggerProps>(function PopoverTrigger(
  { children },
  propRef,
) {
  const ctx = usePopoverContext();
  const childRef = (children as { ref?: React.Ref<unknown> }).ref;
  const ref = useMergeRefs([ctx.floating.refs.setReference, propRef, childRef]);

  if (!isValidElement(children)) return null;
  return cloneElement(
    children,
    ctx.getReferenceProps({
      ref,
      'data-state': ctx.open ? 'open' : 'closed',
      ...(children.props as Record<string, unknown>),
    }) as Record<string, unknown>,
  );
});

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {}

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(function PopoverContent(
  { className, style, children, ...rest },
  propRef,
) {
  const ctx = usePopoverContext();
  const ref = useMergeRefs([ctx.floating.refs.setFloating, propRef]);

  if (!ctx.open) return null;

  return (
    <FloatingPortal>
      <FloatingFocusManager context={ctx.floating.context} modal={ctx.modal}>
        <div
          ref={ref}
          className={cn(styles.content, className)}
          style={{ ...ctx.floating.floatingStyles, ...style }}
          {...ctx.getFloatingProps(rest)}
        >
          {children}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
});

/** Popover — click-triggered floating panel. Compound: `Popover.Trigger` + `Popover.Content`. */
export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
});
