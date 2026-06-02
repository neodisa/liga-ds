import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
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
  useListItem,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTypeahead,
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
  type Placement,
} from '@floating-ui/react';
import { cn } from '../../utils/cn';
import styles from './Menu.module.css';

interface MenuContextValue {
  activeIndex: number | null;
  getItemProps: (props?: Record<string, unknown>) => Record<string, unknown>;
  setOpen: (o: boolean) => void;
}
const MenuContext = createContext<MenuContextValue | null>(null);
function useMenuContext(): MenuContextValue {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('Menu.Item / Menu.Separator must be used within <Menu>');
  return ctx;
}

export interface MenuProps {
  /** The trigger element (cloned with reference props). */
  trigger: ReactElement;
  placement?: Placement;
  children: ReactNode;
}

function MenuRoot({ trigger, placement = 'bottom-start', children }: MenuProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const elementsRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(6), flip({ padding: 8 }), shift({ padding: 8 })],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'menu' });
  const listNav = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    onMatch: setActiveIndex,
  });
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
    listNav,
    typeahead,
  ]);

  const ctx = useMemo<MenuContextValue>(
    () => ({ activeIndex, getItemProps, setOpen }),
    [activeIndex, getItemProps],
  );

  return (
    <>
      {isValidElement(trigger)
        ? cloneElement(
            trigger,
            getReferenceProps({
              ref: refs.setReference,
              ...(trigger.props as Record<string, unknown>),
            }) as Record<string, unknown>,
          )
        : trigger}
      <MenuContext.Provider value={ctx}>
        <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
          {open && (
            <FloatingPortal>
              <FloatingFocusManager context={context} modal={false}>
                <div
                  ref={refs.setFloating}
                  className={styles.menu}
                  style={floatingStyles}
                  {...getFloatingProps()}
                >
                  {children}
                </div>
              </FloatingFocusManager>
            </FloatingPortal>
          )}
        </FloatingList>
      </MenuContext.Provider>
    </>
  );
}

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Called when the item is chosen (also closes the menu). */
  onSelect?: () => void;
  /** Danger styling for destructive actions. */
  danger?: boolean;
  /** Leading icon. */
  icon?: ReactNode;
}

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(function MenuItem(
  { onSelect, danger, icon, disabled, className, children, ...rest },
  propRef,
) {
  const ctx = useMenuContext();
  const { ref, index } = useListItem({
    label: disabled ? null : typeof children === 'string' ? children : undefined,
  });
  const active = ctx.activeIndex === index;
  const mergedRef = useMergeRefs([ref, propRef]);

  return (
    <button
      ref={mergedRef}
      type="button"
      role="menuitem"
      disabled={disabled}
      tabIndex={active ? 0 : -1}
      data-active={active || undefined}
      className={cn(styles.item, danger && styles.danger, className)}
      {...rest}
      {...ctx.getItemProps({
        onClick() {
          if (disabled) return;
          onSelect?.();
          ctx.setOpen(false);
        },
      })}
    >
      {icon ? (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {children}
    </button>
  );
});

export const MenuSeparator = () => <div role="separator" className={styles.separator} />;

/** Menu — action menu (role="menu"). Pass the trigger via `trigger`; children are `Menu.Item`s. */
export const Menu = Object.assign(MenuRoot, {
  Item: MenuItem,
  Separator: MenuSeparator,
});
