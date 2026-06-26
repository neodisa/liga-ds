import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ld-field',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (label) {
      <label class="ld-field__label" [attr.for]="fieldId">
        {{ label }}
        @if (required) { <span class="ld-field__required" aria-hidden="true"> *</span> }
      </label>
    }
    @if (description && descriptionPlacement === 'top') {
      <div class="ld-field__desc">{{ description }}</div>
    }
    <ng-content />
    @if (description && descriptionPlacement === 'bottom') {
      <div class="ld-field__desc">{{ description }}</div>
    }
    @if (error) {
      <div class="ld-field__error" role="alert">{{ error }}</div>
    }
  `,
  host: { 'class': 'ld-field' },
  styles: [`
    ld-field {
      display: flex;
      flex-direction: column;
      gap: var(--space-075);
      font-family: var(--liga-font-family);
    }
    .ld-field__label { color: var(--text-default); font-size: 14px; font-weight: 600; line-height: 16px; letter-spacing: 0.15px; cursor: default; }
    .ld-field__required { color: var(--text-danger); }
    .ld-field__desc { color: var(--text-subtle); font-size: 12px; line-height: 16px; }
    .ld-field__error { color: var(--text-danger); font-size: 12px; line-height: 16px; }
  `],
})
export class LdFieldComponent {
  @Input() label?: string;
  @Input() description?: string;
  @Input() descriptionPlacement: 'top' | 'bottom' = 'bottom';
  @Input() error?: string;
  @Input() required = false;
  @Input() fieldId?: string;
}
