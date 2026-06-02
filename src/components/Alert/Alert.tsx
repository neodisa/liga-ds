import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './Alert.module.css';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Semantic tone. Default `info`. */
  tone?: AlertTone;
  /** Optional bold title above the message. */
  title?: ReactNode;
  /** Custom leading icon. Pass `false` to hide the icon. */
  icon?: ReactNode | false;
  /** Renders a close button that calls this handler. */
  onClose?: () => void;
  /** Accessible label for the close button. Default "Dismiss". */
  closeLabel?: string;
}

const DEFAULT_ICON: Record<AlertTone, ReactNode> = {
  info: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 9v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="10" cy="6.2" r="1" fill="currentColor" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="m6.5 10.5 2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2.5 18 16.5H2L10 2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 8v3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="10" cy="14" r="1" fill="currentColor" />
    </svg>
  ),
  danger: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 6v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="10" cy="14" r="1" fill="currentColor" />
    </svg>
  ),
  neutral: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 9v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="10" cy="6.2" r="1" fill="currentColor" />
    </svg>
  ),
};

/** Alert — inline banner conveying status. danger/warning announce as `alert`, others as `status`. */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { tone = 'info', title, icon, onClose, closeLabel = 'Dismiss', className, children, role, ...rest },
  ref,
) {
  const resolvedIcon = icon === false ? null : (icon ?? DEFAULT_ICON[tone]);
  const resolvedRole = role ?? (tone === 'danger' || tone === 'warning' ? 'alert' : 'status');

  return (
    <div ref={ref} role={resolvedRole} className={cn(styles.alert, styles[`tone-${tone}`], className)} {...rest}>
      {resolvedIcon ? (
        <span className={styles.icon} aria-hidden="true">
          {resolvedIcon}
        </span>
      ) : null}
      <div className={styles.body}>
        {title != null && title !== false && <div className={styles.title}>{title}</div>}
        {children != null && children !== false && <div className={styles.message}>{children}</div>}
      </div>
      {onClose ? (
        <button type="button" className={styles.close} aria-label={closeLabel} onClick={onClose}>
          <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      ) : null}
    </div>
  );
});
