import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  useClick,
  useDismiss,
  useFloating,
  useId,
  useInteractions,
  useMergeRefs,
  useRole,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
} from '@floating-ui/react';
import { cn } from '../../utils/cn';
import { useControllableState } from '../../utils/useControllableState';
import styles from './Modal.module.css';

interface ModalContextValue {
  open: boolean;
  setOpen: (o: boolean) => void;
  floating: ReturnType<typeof useFloating>;
  getReferenceProps: (p?: Record<string, unknown>) => Record<string, unknown>;
  getFloatingProps: (p?: Record<string, unknown>) => Record<string, unknown>;
  labelId: string | undefined;
  descriptionId: string | undefined;
  setLabelId: (id: string | undefined) => void;
  setDescriptionId: (id: string | undefined) => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);
function useModalContext(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('Modal.* must be used within <Modal>');
  return ctx;
}

export interface ModalProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

function ModalRoot({ open, defaultOpen = false, onOpenChange, children }: ModalProps) {
  const [isOpen, setOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const [labelId, setLabelId] = useState<string | undefined>();
  const [descriptionId, setDescriptionId] = useState<string | undefined>();

  const floating = useFloating({ open: isOpen, onOpenChange: setOpen });
  const click = useClick(floating.context);
  const dismiss = useDismiss(floating.context, { outsidePressEvent: 'mousedown' });
  const role = useRole(floating.context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const value = useMemo<ModalContextValue>(
    () => ({ open: isOpen, setOpen, floating, getReferenceProps, getFloatingProps, labelId, descriptionId, setLabelId, setDescriptionId }),
    [isOpen, setOpen, floating, getReferenceProps, getFloatingProps, labelId, descriptionId],
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export const ModalTrigger = forwardRef<HTMLElement, { children: ReactElement }>(function ModalTrigger(
  { children },
  propRef,
) {
  const ctx = useModalContext();
  const childRef = (children as { ref?: React.Ref<unknown> }).ref;
  const ref = useMergeRefs([ctx.floating.refs.setReference, propRef, childRef]);
  if (!isValidElement(children)) return null;
  return cloneElement(
    children,
    ctx.getReferenceProps({ ref, ...(children.props as Record<string, unknown>) }) as Record<string, unknown>,
  );
});

export interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible label when there is no Modal.Title. */
  'aria-label'?: string;
}

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(function ModalContent(
  { className, children, ...rest },
  propRef,
) {
  const ctx = useModalContext();
  const ref = useMergeRefs([ctx.floating.refs.setFloating, propRef]);
  if (!ctx.open) return null;

  return (
    <FloatingPortal>
      <FloatingOverlay className={styles.overlay} lockScroll>
        <FloatingFocusManager context={ctx.floating.context}>
          <div
            ref={ref}
            className={cn(styles.modal, className)}
            aria-labelledby={ctx.labelId}
            aria-describedby={ctx.descriptionId}
            {...ctx.getFloatingProps(rest)}
          >
            {children}
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
});

export const ModalTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(function ModalTitle(
  { className, id: idProp, ...rest },
  ref,
) {
  const ctx = useModalContext();
  const autoId = useId();
  const id = idProp ?? autoId;
  useEffect(() => {
    ctx.setLabelId(id);
    return () => ctx.setLabelId(undefined);
  }, [ctx, id]);
  return <h2 ref={ref} id={id} className={cn(styles.title, className)} {...rest} />;
});

export const ModalDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function ModalDescription({ className, id: idProp, ...rest }, ref) {
    const ctx = useModalContext();
    const autoId = useId();
    const id = idProp ?? autoId;
    useEffect(() => {
      ctx.setDescriptionId(id);
      return () => ctx.setDescriptionId(undefined);
    }, [ctx, id]);
    return <p ref={ref} id={id} className={cn(styles.description, className)} {...rest} />;
  },
);

export interface ModalCloseProps extends HTMLAttributes<HTMLButtonElement> {
  'aria-label'?: string;
}

export const ModalClose = forwardRef<HTMLButtonElement, ModalCloseProps>(function ModalClose(
  { className, onClick, 'aria-label': ariaLabel = 'Close', ...rest },
  ref,
) {
  const ctx = useModalContext();
  return (
    <button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      className={cn(styles.close, className)}
      onClick={(e) => {
        onClick?.(e);
        ctx.setOpen(false);
      }}
      {...rest}
    >
      <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </button>
  );
});

/** Modal — accessible dialog with scrim, focus trap, and scroll lock. */
export const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Content: ModalContent,
  Title: ModalTitle,
  Description: ModalDescription,
  Close: ModalClose,
});
