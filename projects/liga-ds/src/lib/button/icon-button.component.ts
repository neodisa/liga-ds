import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { LdSpinnerComponent } from '../spinner/spinner.component';
import { ButtonVariant, ButtonSize } from './button.component';

@Component({
  selector: 'ld-icon-button',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [NgTemplateOutlet, LdSpinnerComponent],
  template: `
    <button
      class="ld-button ld-button--icon-only"
      [class]="buttonClass"
      [type]="type"
      [disabled]="disabled || loading"
      [attr.aria-busy]="loading || null"
      [attr.aria-label]="ariaLabel"
    >
      @if (loading) {
        <span class="ld-button__icon" aria-hidden="true">
          <ld-spinner [size]="spinnerSize" color="inverse" />
        </span>
      } @else if (iconTpl) {
        <span class="ld-button__icon" aria-hidden="true">
          <ng-container [ngTemplateOutlet]="iconTpl" />
        </span>
      } @else {
        <ng-content />
      }
    </button>
  `,
})
export class LdIconButtonComponent {
  @Input() variant: ButtonVariant = 'transparent';
  @Input() size: ButtonSize = 'lg';
  @Input() loading = false;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input({ required: true }) ariaLabel!: string;

  @ContentChild('icon') iconTpl?: TemplateRef<unknown>;

  @Output() ldClick = new EventEmitter<MouseEvent>();

  get buttonClass(): string {
    return `ld-button--${this.variant} ld-button--${this.size}`;
  }

  get spinnerSize(): 'sm' | 'md' | 'lg' {
    return this.size === 'sm' ? 'sm' : this.size === 'md' ? 'md' : 'lg';
  }
}
