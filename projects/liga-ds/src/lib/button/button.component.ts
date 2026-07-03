import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { LdSpinnerComponent } from '../spinner/spinner.component';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'transparent'
  | 'danger'
  | 'danger-secondary'
  | 'danger-transparent';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'ld-button',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [NgTemplateOutlet, LdSpinnerComponent],
  template: `
    <button
      class="ld-button"
      [class]="buttonClass"
      [type]="type"
      [disabled]="disabled || loading"
      [attr.aria-busy]="loading || null"
      [attr.data-selected]="selected || null"
      (click)="onClick($event)"
    >
      @if (loading) {
        <span class="ld-button__icon" aria-hidden="true">
          <ld-spinner [size]="spinnerSize" color="inverse" />
        </span>
      } @else if (leftIconTpl) {
        <span class="ld-button__icon" aria-hidden="true">
          <ng-container [ngTemplateOutlet]="leftIconTpl" />
        </span>
      }

      <span class="ld-button__label">
        <ng-content />
      </span>

      @if (!loading && rightIconTpl) {
        <span class="ld-button__icon" aria-hidden="true">
          <ng-container [ngTemplateOutlet]="rightIconTpl" />
        </span>
      }
    </button>
  `,
  styles: [`
    .ld-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      font-family: var(--liga-font-family);
      text-transform: uppercase;
      text-decoration: none;
      white-space: nowrap;
      border: 1px solid var(--_bd, transparent);
      border-radius: var(--btn-corner-corner);
      background-color: var(--_bg);
      color: var(--_fg);
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color 300ms var(--liga-ease-out, ease-out),
        color 200ms ease,
        border-color 200ms ease;
    }
    .ld-button:focus-visible {
      outline: 2px solid var(--color-primary-500);
      outline-offset: 2px;
    }
    .ld-button:disabled,
    .ld-button[aria-disabled='true'] { cursor: not-allowed; }
    .ld-button[aria-busy='true'] { cursor: progress; }

    /* sizes */
    .ld-button--sm {
      height: 24px;
      padding: var(--space-050) var(--space-150);
      gap: var(--space-050);
      font-size: 12px;
      line-height: 16px;
      font-weight: 700;
      letter-spacing: 0;
    }
    .ld-button--md {
      height: 32px;
      padding: var(--space-050) var(--space-200);
      gap: var(--space-050);
      font-size: 14px;
      line-height: 20px;
      font-weight: 700;
      letter-spacing: 0.38px;
    }
    .ld-button--lg {
      height: 40px;
      padding: var(--space-100) var(--space-300);
      gap: var(--space-100);
      font-size: 14px;
      line-height: 20px;
      font-weight: 700;
      letter-spacing: 0.38px;
    }
    .ld-button--xl {
      height: 48px;
      padding: var(--space-100) var(--space-300);
      gap: var(--space-100);
      font-size: 14px;
      line-height: 20px;
      font-weight: 700;
      letter-spacing: 0.38px;
    }

    /* full-width */
    .ld-button--full-width { width: 100%; }

    /* icon slot */
    .ld-button__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: none;
    }
    .ld-button__icon svg { width: 100%; height: 100%; display: block; }
    .ld-button--sm .ld-button__icon { width: 18px; height: 18px; }
    .ld-button--md .ld-button__icon { width: 20px; height: 20px; }
    .ld-button--lg .ld-button__icon { width: 24px; height: 24px; }
    .ld-button--xl .ld-button__icon { width: 24px; height: 24px; }

    /* icon-only (square) */
    .ld-button--icon-only.ld-button--sm { width: 24px; padding: 0; }
    .ld-button--icon-only.ld-button--md { width: 32px; padding: 0; }
    .ld-button--icon-only.ld-button--lg { width: 40px; padding: 0; }
    .ld-button--icon-only.ld-button--xl { width: 48px; padding: 0; }

    /* primary */
    .ld-button--primary {
      --_bg: var(--btn-bg-primary-default);
      --_fg: var(--text-alternative);
      --_bd: transparent;
    }
    .ld-button--primary:hover:not(:disabled):not([data-selected]) { --_bg: var(--btn-bg-primary-hover); }
    .ld-button--primary:active:not(:disabled) { --_bg: var(--btn-bg-primary-click-pressed); }
    .ld-button--primary[data-selected] { --_bg: var(--btn-bg-primary-active); }
    .ld-button--primary[data-selected]:hover:not(:disabled) { --_bg: var(--btn-bg-primary-hover-for-active); }
    .ld-button--primary:disabled { --_bg: var(--btn-bg-primary-disable); --_fg: var(--text-disabled); }

    /* secondary — Figma: Type=Primary, Fill=Outline → text is text/default (dark), not accent */
    .ld-button--secondary {
      --_bg: var(--btn-bg-secondary-default);
      --_fg: var(--text-default);
      --_bd: var(--btn-bg-secondary-border-default);
    }
    .ld-button--secondary:hover:not(:disabled):not([data-selected]) {
      --_bg: var(--btn-bg-secondary-hover);
      --_fg: var(--text-alternative);
      --_bd: var(--btn-bg-secondary-hover);
    }
    .ld-button--secondary:active:not(:disabled) {
      --_bg: var(--btn-bg-secondary-click-pressed);
      --_bd: var(--btn-bg-secondary-click-pressed);
      --_fg: var(--text-accent);
    }
    .ld-button--secondary[data-selected] {
      --_bg: var(--btn-bg-secondary-active);
      --_bd: var(--btn-bg-secondary-border-active);
    }
    .ld-button--secondary:disabled {
      --_bg: var(--btn-bg-secondary-disable);
      --_fg: var(--text-disabled);
      --_bd: transparent;
    }

    /* transparent */
    .ld-button--transparent {
      --_bg: transparent;
      --_fg: var(--text-default);
      --_bd: transparent;
    }
    .ld-button--transparent:hover:not(:disabled):not([data-selected]) {
      --_bg: var(--cntnr-bg-third-hover);
      --_fg: var(--text-hover);
    }
    .ld-button--transparent:active:not(:disabled) { --_bg: var(--cntnr-bg-third-selected); }
    .ld-button--transparent[data-selected] {
      --_bg: var(--cntnr-bg-secondary-active);
      --_fg: var(--text-accent);
    }
    .ld-button--transparent:disabled { --_bg: transparent; --_fg: var(--text-disabled); }

    /* danger */
    .ld-button--danger {
      --_bg: var(--btn-bg-danger-default);
      --_fg: var(--text-alternative);
      --_bd: transparent;
    }
    .ld-button--danger:hover:not(:disabled):not([data-selected]) { --_bg: var(--btn-bg-danger-hover); }
    .ld-button--danger:active:not(:disabled) { --_bg: var(--btn-bg-danger-click-pressed); }
    .ld-button--danger[data-selected] { --_bg: var(--btn-bg-danger-active); }
    .ld-button--danger[data-selected]:hover:not(:disabled) { --_bg: var(--btn-bg-danger-hover-for-active); }
    .ld-button--danger:disabled { --_bg: var(--btn-bg-danger-disable); --_fg: var(--text-disabled); }

    /* danger-secondary */
    .ld-button--danger-secondary {
      --_bg: var(--btn-bg-danger-secondary-default);
      --_fg: var(--text-danger);
      --_bd: var(--cntnr-border-error);
    }
    .ld-button--danger-secondary:hover:not(:disabled):not([data-selected]) {
      --_bg: var(--btn-bg-danger-secondary-hover);
      --_fg: var(--text-alternative);
      --_bd: var(--btn-bg-danger-secondary-hover);
    }
    .ld-button--danger-secondary:active:not(:disabled) {
      --_bg: var(--btn-bg-danger-secondary-click-pressed);
      --_fg: var(--text-danger);
      --_bd: var(--btn-bg-danger-secondary-click-pressed);
    }
    .ld-button--danger-secondary:disabled {
      --_bg: var(--btn-bg-danger-secondary-disable);
      --_fg: var(--text-disabled);
      --_bd: transparent;
    }

    /* danger-transparent */
    .ld-button--danger-transparent {
      --_bg: transparent;
      --_fg: var(--text-danger);
      --_bd: transparent;
    }
    .ld-button--danger-transparent:hover:not(:disabled):not([data-selected]) {
      --_bg: var(--cntnr-bg-other-danger-danger);
    }
    .ld-button--danger-transparent:active:not(:disabled) {
      --_bg: var(--cntnr-bg-other-danger-dangerhover);
    }
    .ld-button--danger-transparent:disabled { --_bg: transparent; --_fg: var(--text-disabled); }
  `],
})
export class LdButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'lg';
  @Input() loading = false;
  @Input() disabled = false;
  @Input() selected = false;
  @Input() fullWidth = false;
  @Input() iconOnly = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @ContentChild('leftIcon') leftIconTpl?: TemplateRef<unknown>;
  @ContentChild('rightIcon') rightIconTpl?: TemplateRef<unknown>;

  @Output() ldClick = new EventEmitter<MouseEvent>();

  get buttonClass(): string {
    return [
      `ld-button--${this.variant}`,
      `ld-button--${this.size}`,
      this.fullWidth ? 'ld-button--full-width' : '',
      this.iconOnly ? 'ld-button--icon-only' : '',
    ].filter(Boolean).join(' ');
  }

  get spinnerSize(): 'sm' | 'md' | 'lg' {
    return this.size === 'xl' ? 'lg' : this.size === 'sm' ? 'sm' : this.size === 'md' ? 'md' : 'lg';
  }

  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.ldClick.emit(event);
    }
  }
}
