import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

export type InlineInformType = 'full' | 'line';
export type InlineInformBackground = 'grey' | 'white' | 'warning' | 'green';

export interface InlineInformAction {
  label: string;
  onClick: () => void;
  variant?: 'outline' | 'ghost';
}

const INFO_SVG = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9.5" stroke="currentColor" stroke-width="1.5"/><path d="M12 10.5v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="7.5" r="1.1" fill="currentColor"/></svg>`;

@Component({
  selector: 'ld-inline-inform',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (showIcon) {
      <span class="ld-ii__icon" aria-hidden="true" [innerHTML]="iconSvg"></span>
    }
    <div class="ld-ii__body">
      @if (!isLine && title) {
        <div class="ld-ii__title">{{ title }}</div>
      }
      <div class="ld-ii__desc"><ng-content /></div>
      @if (!isLine && actions?.length) {
        <div class="ld-ii__actions">
          @for (a of actions; track a.label) {
            <button type="button" [class]="'ld-ii__action ld-ii__action--' + (a.variant ?? 'outline')" (click)="a.onClick()">{{ a.label }}</button>
          }
        </div>
      }
    </div>
    @if (isLine && actions?.length) {
      <div class="ld-ii__actions">
        @for (a of actions; track a.label) {
          <button type="button" [class]="'ld-ii__action ld-ii__action--' + (a.variant ?? 'outline')" (click)="a.onClick()">{{ a.label }}</button>
        }
      </div>
    }
    @if (closable) {
      <button type="button" class="ld-ii__close" [attr.aria-label]="closeLabel" (click)="ldClose.emit()">
        <svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
      </button>
    }
  `,
  host: {
    'role': 'status',
    '[class]': '"ld-ii ld-ii--" + type + " ld-ii--bg-" + background',
  },
  styles: [`
    ld-ii {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: var(--space-150);
      padding: var(--space-200);
      border-radius: var(--cntnr-corner-big);
      color: var(--text-default);
      font-family: var(--liga-font-family);
    }
    ld-ii.ld-ii--line { align-items: center; }
    ld-ii.ld-ii--bg-grey    { background: var(--cntnr-bg-secondary-default); }
    ld-ii.ld-ii--bg-white   { background: var(--cntnr-bg-primary-default); }
    ld-ii.ld-ii--bg-warning { background: var(--color-other-colors-orange-red-100); }
    ld-ii.ld-ii--bg-green   { background: var(--color-other-colors-warm-green-100); }

    .ld-ii__icon {
      flex: none; width: 24px; height: 24px;
      color: var(--icon-default);
      display: flex; align-items: center; justify-content: center;
    }
    .ld-ii__icon svg { width: 100%; height: 100%; display: block; }
    .ld-ii__body { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: var(--space-075); }
    .ld-ii__title { font-size: 16px; line-height: 20px; font-weight: 700; letter-spacing: 0.13px; }
    .ld-ii__desc  { font-size: 16px; line-height: 24px; font-weight: 400; letter-spacing: 0.33px; }
    .ld-ii__actions { display: flex; flex-direction: row; gap: var(--space-150); align-items: center; flex: none; }
    .ld-ii__action {
      display: inline-flex; align-items: center; justify-content: center;
      height: 24px; padding: 0 var(--space-150);
      border-radius: var(--cntnr-corner-infinity);
      font-family: var(--liga-font-family); font-size: 12px; font-weight: 700;
      letter-spacing: 0; text-transform: uppercase;
      cursor: pointer; border: 1px solid transparent;
      transition: opacity 0.15s ease; white-space: nowrap;
    }
    .ld-ii__action:hover { opacity: 0.75; }
    .ld-ii__action:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }
    .ld-ii__action--outline { background: var(--cntnr-bg-primary-default); border-color: var(--cntnr-border-default); color: var(--text-default); }
    .ld-ii__action--ghost   { background: transparent; border-color: transparent; color: var(--text-accent); }
    .ld-ii__close {
      flex: none; width: 24px; height: 24px; padding: 0;
      border: none; background: transparent; color: var(--icon-subtle); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      border-radius: var(--cntnr-corner-small);
    }
    .ld-ii__close:hover { opacity: 0.7; }
    .ld-ii__close:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }
    .ld-ii__close svg { width: 14px; height: 14px; display: block; }
  `],
})
export class LdInlineInformComponent {
  @Input() type: InlineInformType = 'full';
  @Input() background: InlineInformBackground = 'grey';
  @Input() title?: string;
  @Input() hideIcon = false;
  @Input() actions?: InlineInformAction[];
  @Input() closable = false;
  @Input() closeLabel = 'Закрити';

  @Output() ldClose = new EventEmitter<void>();

  get isLine(): boolean { return this.type === 'line'; }
  get showIcon(): boolean { return !this.hideIcon; }
  get iconSvg(): string { return INFO_SVG; }
}
