import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  inject,
  forwardRef,
  Optional,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LdRadioGroupComponent } from './radio-group.component';

@Component({
  selector: 'ld-radio',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    <label class="ld-radio" [class.ld-radio--disabled]="isDisabled">
      <input
        type="radio"
        class="ld-radio__input"
        [name]="groupName"
        [value]="value"
        [checked]="isChecked"
        [disabled]="isDisabled"
        (change)="onNativeChange()"
        (blur)="onTouched()"
      />
      <span class="ld-radio__dot" aria-hidden="true"></span>
      @if (hasLabel) {
        <span class="ld-radio__label"><ng-content /></span>
      }
    </label>
  `,
  styles: [`
    .ld-radio { display: inline-flex; align-items: center; gap: var(--space-100); cursor: pointer; font-family: var(--liga-font-family); }
    .ld-radio--disabled { cursor: not-allowed; }
    .ld-radio__input { position: absolute; width: 1px; height: 1px; margin: 0; padding: 0; opacity: 0; white-space: nowrap; }
    .ld-radio__dot {
      position: relative; flex: none; width: 16px; height: 16px;
      border-radius: var(--cntnr-corner-infinity);
      background-color: var(--cntnr-bg-primary-default);
      border: 1px solid var(--color-neutral-solid-500);
      transition: border-color 160ms ease;
    }
    .ld-radio__dot::after {
      content: ''; position: absolute; inset: 0; margin: auto;
      width: 8px; height: 8px; border-radius: var(--cntnr-corner-infinity);
      background-color: var(--checkbox-color-default-checkbox);
      transform: scale(0); transition: transform 160ms var(--liga-ease-out, ease-out);
    }
    .ld-radio:hover .ld-radio__input:not(:disabled):not(:checked) ~ .ld-radio__dot { border-color: var(--checkbox-color-hover-checkbox); }
    .ld-radio__input:checked ~ .ld-radio__dot { border-color: var(--checkbox-color-default-checkbox); }
    .ld-radio__input:checked ~ .ld-radio__dot::after { transform: scale(1); }
    .ld-radio__input:focus-visible ~ .ld-radio__dot { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }
    .ld-radio__input:disabled ~ .ld-radio__dot { border-color: var(--cntnr-border-disabled); background-color: var(--cntnr-bg-primary-default); }
    .ld-radio__input:disabled:checked ~ .ld-radio__dot { border-color: var(--btn-bg-primary-disable); }
    .ld-radio__input:disabled:checked ~ .ld-radio__dot::after { background-color: var(--btn-bg-primary-disable); }
    .ld-radio__label { color: var(--text-default); }
    .ld-radio__input:disabled ~ .ld-radio__label { color: var(--text-disabled); }
  `],
})
export class LdRadioComponent {
  @Input({ required: true }) value!: string;
  @Input() name?: string;
  @Input() disabled?: boolean;
  @Input() checked?: boolean;
  @Input() hasLabel = true;

  @Output() ldChange = new EventEmitter<string>();

  onTouched: () => void = () => {};

  private group = inject(LdRadioGroupComponent, { optional: true });

  get groupName(): string { return this.group?.name ?? this.name ?? ''; }
  get isChecked(): boolean { return this.group ? this.group.value === this.value : !!this.checked; }
  get isDisabled(): boolean { return this.disabled ?? this.group?.isDisabled ?? false; }

  onNativeChange(): void {
    if (this.group) {
      this.group.select(this.value);
    }
    this.ldChange.emit(this.value);
  }
}

export { LdRadioGroupComponent };
