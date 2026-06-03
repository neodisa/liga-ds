import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import { useControllableState } from '../../utils/useControllableState';
import { IconButton, type IconButtonProps } from '../Button/Button';
import styles from './Header.module.css';

interface HeaderContextValue {
  burgerId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}
const HeaderContext = createContext<HeaderContextValue | null>(null);
function useHeaderContext(): HeaderContextValue {
  const ctx = useContext(HeaderContext);
  if (!ctx) throw new Error('Header.* must be used within <Header>');
  return ctx;
}

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /** Whether a user is signed in. When false, nav + actions are hidden (brand only). Default `true`. */
  signedIn?: boolean;
  /** Stick to the top of the viewport. Default `false`. */
  sticky?: boolean;
  /** Controlled burger open state. */
  open?: boolean;
  /** Initial burger open state (uncontrolled). Default `false`. */
  defaultOpen?: boolean;
  /** Called when the burger open state changes. */
  onOpenChange?: (open: boolean) => void;
}

const HeaderRoot = forwardRef<HTMLElement, HeaderProps>(function HeaderRoot(
  { signedIn = true, sticky = false, open, defaultOpen = false, onOpenChange, className, children, ...rest },
  ref,
) {
  const [isOpen, setOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const burgerId = useId();
  return (
    <HeaderContext.Provider value={{ burgerId, open: isOpen, setOpen }}>
      <header
        ref={ref}
        data-signed-in={signedIn || undefined}
        data-sticky={sticky || undefined}
        data-open={isOpen || undefined}
        className={cn(styles.header, className)}
        {...rest}
      >
        {children}
      </header>
    </HeaderContext.Provider>
  );
});

export type HeaderLeadingProps = HTMLAttributes<HTMLDivElement>;
export const HeaderLeading = forwardRef<HTMLDivElement, HeaderLeadingProps>(function HeaderLeading(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={cn(styles.leading, className)} {...rest} />;
});

export type HeaderBrandProps = AnchorHTMLAttributes<HTMLAnchorElement>;
export const HeaderBrand = forwardRef<HTMLAnchorElement, HeaderBrandProps>(function HeaderBrand(
  { className, ...rest },
  ref,
) {
  return <a ref={ref} className={cn(styles.brand, className)} {...rest} />;
});

export interface HeaderNavProps extends HTMLAttributes<HTMLElement> {
  /** Accessible name for the nav landmark. */
  'aria-label': string;
}
export const HeaderNav = forwardRef<HTMLElement, HeaderNavProps>(function HeaderNav(
  { className, ...rest },
  ref,
) {
  return <nav ref={ref} className={cn(styles.nav, className)} {...rest} />;
});

export interface HeaderNavItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Marks the current page: sets `aria-current="page"` + active styling. */
  active?: boolean;
}
export const HeaderNavItem = forwardRef<HTMLAnchorElement, HeaderNavItemProps>(function HeaderNavItem(
  { active = false, className, ...rest },
  ref,
) {
  return (
    <a
      ref={ref}
      data-active={active || undefined}
      aria-current={active ? 'page' : undefined}
      className={cn(styles.navItem, className)}
      {...rest}
    />
  );
});

export type HeaderActionsProps = HTMLAttributes<HTMLDivElement>;
export const HeaderActions = forwardRef<HTMLDivElement, HeaderActionsProps>(function HeaderActions(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={cn(styles.actions, className)} {...rest} />;
});

export interface HeaderBurgerProps extends Omit<IconButtonProps, 'icon'> {
  /** The burger icon (e.g. an icon from `@neodisa/liga-ds/icons`). */
  icon: ReactNode;
}
export const HeaderBurger = forwardRef<HTMLButtonElement, HeaderBurgerProps>(function HeaderBurger(
  { className, onClick, 'aria-controls': ariaControls, ...rest },
  ref,
) {
  const { burgerId, open, setOpen } = useHeaderContext();
  return (
    <IconButton
      ref={ref}
      aria-expanded={open}
      aria-controls={ariaControls ?? burgerId}
      data-open={open || undefined}
      className={cn(styles.burger, className)}
      onClick={(e) => {
        onClick?.(e);
        setOpen(!open);
      }}
      {...rest}
    />
  );
});

/** Header — app top bar. Compound: Header.Leading / Burger / Brand / Nav / NavItem / Actions. */
export const Header = Object.assign(HeaderRoot, {
  Leading: HeaderLeading,
  Burger: HeaderBurger,
  Brand: HeaderBrand,
  Nav: HeaderNav,
  NavItem: HeaderNavItem,
  Actions: HeaderActions,
});
