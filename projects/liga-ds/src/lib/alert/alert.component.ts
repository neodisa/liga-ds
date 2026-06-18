import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

const ICONS: Record<AlertTone, string> = {
  info: `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.6"/><path d="M10 9v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="10" cy="6.2" r="1" fill="currentColor"/></svg>`,
  success: `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.6"/><path d="m6.5 10.5 2.3 2.3 4.7-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  warning: `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2.5 18 16.5H2L10 2.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M10 8v3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="10" cy="14" r="1" fill="currentColor"/></svg>`,
  danger: `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.6"/><path d="M10 6v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="10" cy="14" r="1" fill="currentColor"/></svg>`,
  neutral: `<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.6"/><path d="M10 9v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="10" cy="6.2" r="1" fill="currentColor"/></svg>`,
};

@Component({
  selector: 'ld-alert',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (showIcon) {
      <span class="ld-alert__icon" aria-hidden="true" [innerHTML]="iconSvg"></span>
    }
    <div class="ld-alert__body">
      @if (title) {
        <div class="ld-alert__title">{{ title }}</div>
      }
      <div class="ld-alert__message"><ng-content /></div>
    </div>
    @if (closable) {
      <button type="button" class="ld-alert__close" [attr.aria-label]="closeLabel" (click)="ldClose.emit()">
        <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
      </button>
    }
  `,
  host: {
    '[attr.role]': 'role',
    '[class]': '"ld-alert ld-alert--tone-" + tone',
  },
  styles: [`
    ld-alert {
      --_bg: var(--cntnr-bg-other-neutral);
      --_border: var(--cntnr-border-default);
      --_accent: var(--text-default);
      display: flex;
      gap: var(--space-150);
      padding: var(--space-200);
      border: 1px solid var(--_border);
      border-radius: var(--cntnr-corner-normal);
      background-color: var(--_bg);
      color: var(--text-default);
      font-family: var(--liga-font-family);
    }
    ld-alert.ld-alert--tone-info    { --_bg: var(--cntnr-bg-other-blue);            --_border: var(--cntnr-border-info);    --_accent: var(--text-information); }
    ld-alert.ld-alert--tone-success { --_bg: var(--cntnr-bg-other-success);         --_border: var(--cntnr-border-success);  --_accent: var(--text-success); }
    ld-alert.ld-alert--tone-warning { --_bg: var(--cntnr-bg-other-warning);         --_border: var(--cntnr-border-warning);  --_accent: var(--text-warning); }
    ld-alert.ld-alert--tone-danger  { --_bg: var(--cntnr-bg-other-danger-danger);   --_border: var(--cntnr-border-error);    --_accent: var(--text-danger); }
    ld-alert.ld-alert--tone-neutral { --_bg: var(--cntnr-bg-other-neutral);         --_border: var(--cntnr-border-default);  --_accent: var(--text-default); }

    .ld-alert__icon {
      flex: none; width: 20px; height: 20px; margin-top: 1px;
      color: var(--_accent);
      display: inline-flex; align-items: center; justify-content: center;
    }
    .ld-alert__icon svg { width: 100%; height: 100%; display: block; }
    .ld-alert__body { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: var(--space-050); }
    .ld-alert__title { color: var(--_accent); font-size: 14px; line-height: 16px; font-weight: 600; letter-spacing: 0.15px; }
    .ld-alert__message { color: var(--text-default); font-size: 14px; line-height: 20px; letter-spacing: 0.29px; }
    .ld-alert__close {
      flex: none; width: 20px; height: 20px; margin: -2px -2px 0 0;
      padding: 0; border: none; background: transparent; color: var(--icon-subtle);
      border-radius: var(--cntnr-corner-small); cursor: pointer;
      display: inline-flex; align-items: center; justify-content: center; opacity: 0.7;
    }
    .ld-alert__close:hover { opacity: 1; }
    .ld-alert__close:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 1px; }
    .ld-alert__close svg { width: 12px; height: 12px; display: block; }
  `],
})
export class LdAlertComponent {
  @Input() tone: AlertTone = 'info';
  @Input() title?: string;
  @Input() hideIcon = false;
  @Input() closable = false;
  @Input() closeLabel = 'Dismiss';

  @Output() ldClose = new EventEmitter<void>();

  get role(): string { return this.tone === 'danger' || this.tone === 'warning' ? 'alert' : 'status'; }
  get showIcon(): boolean { return !this.hideIcon; }
  get iconSvg(): string { return ICONS[this.tone]; }
}
