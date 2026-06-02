import {
  forwardRef,
  type HTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import styles from './Table.module.css';

export type TableSize = 'sm' | 'md';
export type SortDirection = 'ascending' | 'descending' | 'none';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /** Alternating row backgrounds. */
  zebra?: boolean;
  /** Highlight rows on hover. */
  hoverable?: boolean;
  size?: TableSize;
  /** Visible caption (also the accessible name). */
  caption?: ReactNode;
}

function TableRoot({ zebra, hoverable, size = 'md', caption, className, children, ...rest }: TableProps) {
  return (
    <div className={styles.wrapper}>
      <table
        className={cn(styles.table, styles[`size-${size}`], zebra && styles.zebra, hoverable && styles.hoverable, className)}
        {...rest}
      >
        {caption ? <caption className={styles.caption}>{caption}</caption> : null}
        {children}
      </table>
    </div>
  );
}

export const TableHead = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableHead(props, ref) {
    return <thead ref={ref} {...props} />;
  },
);

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableBody(props, ref) {
    return <tbody ref={ref} {...props} />;
  },
);

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  function TableRow({ className, ...rest }, ref) {
    return <tr ref={ref} className={cn(styles.row, className)} {...rest} />;
  },
);

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Makes the header a sort control. */
  sortable?: boolean;
  /** Current sort direction (drives `aria-sort` + the indicator). */
  sortDirection?: SortDirection;
  /** Called when a sortable header is activated. */
  onSort?: () => void;
}

const SortIcon = () => (
  <svg className={styles.sortIcon} viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 3v8M4 8l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  function TableHeaderCell({ sortable, sortDirection = 'none', onSort, className, children, ...rest }, ref) {
    return (
      <th
        ref={ref}
        scope="col"
        aria-sort={sortable ? sortDirection : undefined}
        className={cn(styles.th, className)}
        {...rest}
      >
        {sortable ? (
          <button type="button" className={styles.sortButton} data-direction={sortDirection} onClick={onSort}>
            {children}
            <SortIcon />
          </button>
        ) : (
          children
        )}
      </th>
    );
  },
);

export const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
  function TableCell({ className, ...rest }, ref) {
    return <td ref={ref} className={cn(styles.td, className)} {...rest} />;
  },
);

/** Table — semantic, token-driven data table. Compound: `Table.Head/Body/Row/HeaderCell/Cell`. */
export const Table = Object.assign(TableRoot, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  HeaderCell: TableHeaderCell,
  Cell: TableCell,
});
