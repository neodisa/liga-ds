import { cloneElement, isValidElement, useState, type ReactElement, type ReactNode } from 'react';
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  FloatingPortal,
  type Placement,
} from '@floating-ui/react';
import styles from './Tooltip.module.css';

export interface TooltipProps {
  /** Tooltip content. If empty, nothing renders. */
  content: ReactNode;
  /** The trigger element (must accept a ref + event handlers). */
  children: ReactElement;
  /** Preferred placement. Default `top`. */
  placement?: Placement;
  /** Open delay in ms. Default 200. */
  delay?: number;
  /** Disable the tooltip. */
  disabled?: boolean;
}

/** Tooltip — hover/focus label. Accessible (role="tooltip", dismiss on Esc). */
export function Tooltip({ content, children, placement = 'top', delay = 200, disabled = false }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [offset(6), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false, delay: { open: delay, close: 80 }, enabled: !disabled });
  const focus = useFocus(context, { enabled: !disabled });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  const trigger = isValidElement(children)
    ? cloneElement(children, {
        ref: refs.setReference,
        ...getReferenceProps((children.props as Record<string, unknown>) ?? {}),
      } as Record<string, unknown>)
    : children;

  return (
    <>
      {trigger}
      {open && content != null && content !== false && (
        <FloatingPortal>
          <div ref={refs.setFloating} style={floatingStyles} className={styles.tooltip} {...getFloatingProps()}>
            {content}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
