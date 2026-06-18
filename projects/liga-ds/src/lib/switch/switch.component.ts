import { Component, Input, Output, EventEmitter, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type SwitchSize = 'sm' | 'md';

@Component({
  selector: 'ld-switch',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LdSwitchComponent), multi: true }],
  template: `
    <label class="ld-switch" [attr.data-size]="size" [class.ld-switch--disabled]="isDisabled">
      <input
        type="checkbox"
        role="switch"
        class="ld-switch__input"
        [checked]="checked"
        [disabled]="isDisabled"
        [attr.aria-invalid]="invalid || null"
        (change)="onNativeChange($event)"
        (blur)="onTouched()"
      />
      <span class="ld-switch__track" [attr.data-invalid]="invalid || null" aria-hidden="true">
        <span class="ld-switch__thumb"></span>
      </span>
      @if (hasLabel) {
        <span class="ld-switch__label"><ng-content /></span>
      }
    </label>
  `,
  styles: [`
    .ld-switch { display: inline-flex; align-items: center; gap: var(--space-100); cursor: pointer; font-family: var(--liga-font-family); }
    .ld-switch--disabled { cursor: not-allowed; }
    .ld-switch__input { position: absolute; width: 1px; height: 1px; margin: 0; padding: 0; opacity: 0; white-space: nowrap; }
    .ld-switch__track {
      position: relative; flex: none;
      display: inline-flex; align-items: center;
      box-sizing: border-box; padding: 4px;
      border-radius: var(--corner-radius-infinity);
      background-color: var(--cntnr-bg-primary-default);
      border: 1px solid var(--cntnr-border-default);
      transition: background-color 160ms ease, border-color 160ms ease;
    }
    .ld-switch[data-size='md'] .ld-switch__track { width: 60px; height: 32px; }
    .ld-switch[data-size='sm'] .ld-switch__track { width: 44px; height: 24px; }
    .ld-switch__thumb {
      display: block; border-radius: 50%;
      background-color: var(--color-neutral-solid-500);
      transition: transform 160ms ease, background-color 160ms ease;
      transform: translateX(0);
    }
    .ld-switch[data-size='md'] .ld-switch__thumb { width: 24px; height: 24px; }
    .ld-switch[data-size='sm'] .ld-switch__thumb { width: 16px; height: 16px; }
    .ld-switch__input:checked ~ .ld-switch__track { border-color: var(--cntnr-border-selected); }
    .ld-switch__input:checked ~ .ld-switch__track .ld-switch__thumb { background-color: var(--color-primary-500); }
    .ld-switch[data-size='md'] .ld-switch__input:checked ~ .ld-switch__track .ld-switch__thumb { transform: translateX(28px); }
    .ld-switch[data-size='sm'] .ld-switch__input:checked ~ .ld-switch__track .ld-switch__thumb { transform: translateX(20px); }
    .ld-switch:hover .ld-switch__input:not(:disabled):not(:checked) ~ .ld-switch__track { border-color: var(--cntnr-border-hover); }
    .ld-switch:hover .ld-switch__input:not(:disabled):checked ~ .ld-switch__track .ld-switch__thumb { background-color: var(--color-primary-600); }
    .ld-switch__input:focus-visible ~ .ld-switch__track { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }
    .ld-switch__track[data-invalid] { border-color: var(--cntnr-border-error); }
    .ld-switch__input:disabled ~ .ld-switch__track { border-color: var(--cntnr-border-disabled); background-color: var(--cntnr-bg-primary-disabled); }
    .ld-switch__input:disabled ~ .ld-switch__track .ld-switch__thumb { background-color: var(--color-neutral-solid-400); }
    .ld-switch__input:disabled:checked ~ .ld-switch__track .ld-switch__thumb { background-color: var(--btn-bg-primary-disable); }
    .ld-switch__label { color: var(--text-default); }
    .ld-switch__input:disabled ~ .ld-switch__label { color: var(--text-disabled); }
  `],
})
export class LdSwitchComponent implements ControlValueAccessor {
  @Input() size: SwitchSize = 'md';
  @Input() invalid = false;
  @Input() hasLabel = true;

  @Output() ldChange = new EventEmitter<boolean>();

  checked = false;
  isDisabled = false;
  private onChange: (v: boolean) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(v: boolean): void { this.checked = !!v; }
  registerOnChange(fn: (v: boolean) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.isDisabled = d; }

  onNativeChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.checked = checked;
    this.onChange(checked);
    this.ldChange.emit(checked);
  }
}
