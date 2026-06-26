import { Component, Input, Output, EventEmitter, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ld-textarea',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LdTextareaComponent), multi: true }],
  template: `
    <textarea
      class="ld-textarea"
      [rows]="rows"
      [placeholder]="placeholder"
      [disabled]="isDisabled"
      [readOnly]="readOnly"
      [attr.aria-invalid]="invalid || null"
      [value]="value"
      (input)="onInput($event)"
      (blur)="onTouched()"
    ></textarea>
  `,
  styles: [`
    .ld-textarea {
      display: block;
      box-sizing: border-box;
      width: 100%;
      margin: 0;
      background-color: var(--cntnr-bg-primary-default);
      border: 1px solid var(--cntnr-border-default);
      border-radius: var(--cntnr-corner-normal);
      color: var(--text-default);
      font-family: var(--liga-font-family);
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.29px;
      font-weight: 400;
      padding: var(--space-100) var(--space-150);
      min-height: 80px;
      resize: vertical;
      outline: none;
      transition: border-color 200ms ease, box-shadow 200ms ease;
    }
    .ld-textarea::placeholder { color: var(--text-subtlest); opacity: 1; }
    .ld-textarea:hover:not(:disabled):not([readonly]):not([aria-invalid]) { border-color: var(--cntnr-border-hover); }
    .ld-textarea:focus-visible { border-color: var(--cntnr-border-active); box-shadow: 0 0 0 3px var(--color-primary-100); }
    .ld-textarea[aria-invalid] { border-color: var(--cntnr-border-error); }
    .ld-textarea[aria-invalid]:focus-visible { box-shadow: 0 0 0 3px var(--color-other-colors-red-100); }
    .ld-textarea[readonly] { background-color: var(--cntnr-bg-secondary-default); }
    .ld-textarea:disabled {
      background-color: var(--cntnr-bg-other-readonly-elements);
      border-color: var(--cntnr-border-disabled);
      color: var(--text-disabled);
      -webkit-text-fill-color: var(--text-disabled);
      cursor: not-allowed;
      resize: none;
    }
  `],
})
export class LdTextareaComponent implements ControlValueAccessor {
  @Input() rows = 3;
  @Input() placeholder = '';
  @Input() invalid = false;
  @Input() readOnly = false;

  @Output() ldChange = new EventEmitter<string>();

  value = '';
  isDisabled = false;
  private onChange: (v: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(v: string): void { this.value = v ?? ''; }
  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.isDisabled = d; }

  onInput(event: Event): void {
    const v = (event.target as HTMLTextAreaElement).value;
    this.value = v;
    this.onChange(v);
    this.ldChange.emit(v);
  }
}
