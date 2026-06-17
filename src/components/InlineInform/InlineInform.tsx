import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './InlineInform.module.css';

export type InlineInformType = 'full' | 'line';
export type InlineInformBackground = 'grey' | 'white' | 'warning' | 'green';

export interface InlineInformAction {
  label: string;
  onClick: () => void;
  variant?: 'outline' | 'ghost';
}

export interface InlineInformProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  type?: InlineInformType;
  background?: InlineInformBackground;
  title?: ReactNode;
  icon?: ReactNode | false;
  actions?: InlineInformAction[];
  onClose?: () => void;
  closeLabel?: string;
}

const INFO_ICON = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 10.5v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="7.5" r="1.1" fill="currentColor" />
  </svg>
);

const CLOSE_ICON = (
  <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const InlineInform = forwardRef<HTMLDivElement, InlineInformProps>(function InlineInform(
  {
    type = 'full',
    background = 'grey',
    title,
    icon,
    actions,
    onClose,
    closeLabel = 'Закрити',
    className,
    children,
    ...rest
  },
  ref,
) {
  const resolvedIcon = icon === false ? null : (icon ?? INFO_ICON);
  const isLine = type === 'line';

  const actionsEl = actions && actions.length > 0 ? (
    <div className={styles.actions}>
      {actions.map((action, i) => (
        <button
          key={i}
          type="button"
          className={cn(styles.action, action.variant === 'ghost' ? styles.actionGhost : styles.actionOutline)}
          onClick={action.onClick}
        >
          {action.label}
        </button>
      ))}
    </div>
  ) : null;

  return (
    <div
      ref={ref}
      role="status"
      className={cn(
        styles.root,
        styles[`type-${type}`],
        styles[`bg-${background}`],
        className,
      )}
      {...rest}
    >
      {resolvedIcon ? (
        <span className={styles.icon} aria-hidden="true">
          {resolvedIcon}
        </span>
      ) : null}

      <div className={styles.body}>
        {!isLine && title != null && <div className={styles.title}>{title}</div>}
        {children != null && <div className={styles.description}>{children}</div>}
        {!isLine && actionsEl}
      </div>

      {isLine && actionsEl}

      {onClose ? (
        <button type="button" className={styles.close} aria-label={closeLabel} onClick={onClose}>
          {CLOSE_ICON}
        </button>
      ) : null}
    </div>
  );
});
