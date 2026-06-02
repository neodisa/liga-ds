import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { useControllableState } from '../../utils/useControllableState';
import styles from './Pagination.module.css';

export type PaginationSize = 'sm' | 'md';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Total number of pages. */
  count: number;
  /** Controlled current page (1-based). */
  page?: number;
  /** Uncontrolled initial page (1-based). Default `1`. */
  defaultPage?: number;
  /** Fired with the next page when the user navigates. */
  onPageChange?: (page: number) => void;
  /** Pages shown on each side of the current page. Default `1`. */
  siblingCount?: number;
  /** Pages shown at the start and end. Default `1`. */
  boundaryCount?: number;
  /** Disable the whole control. */
  disabled?: boolean;
  /** `sm` 28px · `md` 36px. Default `md`. */
  size?: PaginationSize;
  /** Accessible name for the navigation landmark. Default `Pagination`. */
  'aria-label'?: string;
  /** Custom label for each page button (e.g. for i18n). */
  getItemAriaLabel?: (type: 'page' | 'previous' | 'next', page: number, selected: boolean) => string;
}

function range(start: number, end: number): number[] {
  return Array.from({ length: Math.max(end - start + 1, 0) }, (_, i) => start + i);
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function defaultItemLabel(type: 'page' | 'previous' | 'next', page: number, selected: boolean): string {
  if (type === 'previous') return 'Go to previous page';
  if (type === 'next') return 'Go to next page';
  return selected ? `Page ${page}` : `Go to page ${page}`;
}

/**
 * Pagination — page navigation. Controlled (`page` + `onPageChange`) or uncontrolled
 * (`defaultPage`). Collapses long ranges with ellipses via `siblingCount`/`boundaryCount`.
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    count,
    page,
    defaultPage = 1,
    onPageChange,
    siblingCount = 1,
    boundaryCount = 1,
    disabled = false,
    size = 'md',
    className,
    'aria-label': ariaLabel = 'Pagination',
    getItemAriaLabel = defaultItemLabel,
    ...rest
  },
  ref,
) {
  const [current, setCurrent] = useControllableState<number>({
    value: page,
    defaultValue: defaultPage,
    onChange: onPageChange,
  });
  const activePage = Math.min(Math.max(current ?? 1, 1), Math.max(count, 1));

  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

  const siblingsStart = Math.max(
    Math.min(activePage - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(activePage + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0]! - 2 : count - 1,
  );

  const items: Array<number | 'ellipsis'> = [
    ...startPages,
    ...(siblingsStart > boundaryCount + 2
      ? (['ellipsis'] as const)
      : boundaryCount + 1 < count - boundaryCount
        ? [boundaryCount + 1]
        : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < count - boundaryCount - 1
      ? (['ellipsis'] as const)
      : count - boundaryCount > boundaryCount
        ? [count - boundaryCount]
        : []),
    ...endPages,
  ];

  const go = (p: number) => {
    if (disabled) return;
    const next = Math.min(Math.max(p, 1), count);
    if (next !== activePage) setCurrent(next);
  };

  const atStart = activePage <= 1;
  const atEnd = activePage >= count;

  const sizeIcon = size === 'sm' ? styles.sm : undefined;

  return (
    <nav ref={ref} aria-label={ariaLabel} className={cn(styles.nav, className)} {...rest}>
      <ul className={cn(styles.list, sizeIcon)} data-size={size}>
        <li>
          <button
            type="button"
            className={cn(styles.item, styles.arrow)}
            onClick={() => go(activePage - 1)}
            disabled={disabled || atStart}
            aria-label={getItemAriaLabel('previous', activePage - 1, false)}
          >
            <ChevronLeft />
          </button>
        </li>

        {items.map((item, i) =>
          item === 'ellipsis' ? (
            <li key={`e${i}`}>
              <span className={styles.ellipsis} aria-hidden="true">
                …
              </span>
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                className={cn(styles.item, item === activePage && styles.selected)}
                aria-current={item === activePage ? 'page' : undefined}
                aria-label={getItemAriaLabel('page', item, item === activePage)}
                onClick={() => go(item)}
                disabled={disabled}
              >
                {item}
              </button>
            </li>
          ),
        )}

        <li>
          <button
            type="button"
            className={cn(styles.item, styles.arrow)}
            onClick={() => go(activePage + 1)}
            disabled={disabled || atEnd}
            aria-label={getItemAriaLabel('next', activePage + 1, false)}
          >
            <ChevronRight />
          </button>
        </li>
      </ul>
    </nav>
  );
});
