import {
  Children,
  forwardRef,
  isValidElement,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import styles from './Breadcrumbs.module.css';

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  /** Node placed between items. Default: a chevron. */
  separator?: ReactNode;
  /** Accessible name for the navigation landmark. Default `Breadcrumb`. */
  'aria-label'?: string;
  children: ReactNode;
}

function BreadcrumbsRoot({
  separator = <ChevronRight />,
  className,
  children,
  'aria-label': ariaLabel = 'Breadcrumb',
  ...rest
}: BreadcrumbsProps) {
  const items = Children.toArray(children).filter(isValidElement);
  return (
    <nav aria-label={ariaLabel} className={cn(styles.nav, className)} {...rest}>
      <ol className={styles.list}>
        {items.map((child, i) => (
          <li key={child.key ?? i} className={styles.li}>
            {child}
            {i < items.length - 1 && (
              <span className={styles.separator} aria-hidden="true">
                {separator}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export interface BreadcrumbItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Marks the current page — renders non-interactive text with `aria-current="page"`. */
  current?: boolean;
  /** Optional leading icon (e.g. a home glyph). */
  icon?: ReactNode;
  children: ReactNode;
}

export const BreadcrumbItem = forwardRef<HTMLAnchorElement, BreadcrumbItemProps>(
  function BreadcrumbItem({ current = false, icon, href, className, children, ...rest }, ref) {
    const content = (
      <>
        {icon != null && (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
      </>
    );

    if (current || href == null) {
      return (
        <span
          className={cn(styles.item, current && styles.current, className)}
          aria-current={current ? 'page' : undefined}
        >
          {content}
        </span>
      );
    }

    return (
      <a ref={ref} href={href} className={cn(styles.item, styles.link, className)} {...rest}>
        {content}
      </a>
    );
  },
);

/** Breadcrumbs — navigation trail. Compound: `Breadcrumbs.Item`. */
export const Breadcrumbs = Object.assign(BreadcrumbsRoot, {
  Item: BreadcrumbItem,
});
