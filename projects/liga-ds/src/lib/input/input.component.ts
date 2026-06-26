import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  TemplateRef,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LdSpinnerComponent } from '../spinner/spinner.component';

export type InputSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'ld-input',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [NgTemplateOutlet, LdSpinnerComponent, FormsModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LdInputComponent), multi: true }],
  template: `
    @if (leftIconTpl) {
      <span class="ld-input__icon" aria-hidden="true">
        <ng-container [ngTemplateOutlet]="leftIconTpl" />
      </span>
    } @else if (type === 'search') {
      <span class="ld-input__icon" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.8"/><path d="m17 17-3.2-3.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
      </span>
    }
    <input
      class="ld-input__field"
      [type]="type"
      [placeholder]="placeholder"
      [disabled]="isDisabled"
      [readOnly]="readOnly"
      [attr.aria-invalid]="invalid || null"
      [value]="value"
      (input)="onInput($event)"
      (blur)="onTouched()"
    />
    @if (loading) {
      <span class="ld-input__icon">
        <ld-spinner [size]="spinnerSize" />
      </span>
    } @else if (rightIconTpl) {
      <span class="ld-input__icon" aria-hidden="true">
        <ng-container [ngTemplateOutlet]="rightIconTpl" />
      </span>
    }
  `,
  host: {
    '[class]': '"ld-input ld-input--size-" + size',
    '[attr.data-disabled]': 'isDisabled || null',
    '[attr.data-readonly]': 'readOnly || null',
    '[attr.data-invalid]': 'invalid || null',
  },
  styles: [`
    ld-input {
      display: inline-flex;
      align-items: center;
      gap: var(--space-100);
      box-sizing: border-box;
      width: 100%;
      background-color: var(--cntnr-bg-primary-default);
      border: 1px solid var(--cntnr-border-default);
      border-radius: var(--field-corner-field-corner);
      color: var(--text-default);
      transition: border-color 200ms ease, box-shadow 200ms ease;
    }
    ld-input:hover:not([data-disabled]):not([data-readonly]):not([data-invalid]) { border-color: var(--cntnr-border-hover); }
    ld-input:focus-within:not([data-disabled]) { border-color: var(--cntnr-border-active); box-shadow: 0 0 0 3px var(--color-primary-100); }
    ld-input[data-invalid]  { border-color: var(--cntnr-border-error); }
    ld-input[data-invalid]:focus-within { box-shadow: 0 0 0 3px var(--color-other-colors-red-100); }
    ld-input[data-readonly] { background-color: var(--cntnr-bg-secondary-default); }
    ld-input[data-disabled] { background-color: var(--cntnr-bg-other-readonly-elements); border-color: var(--cntnr-border-disabled); color: var(--text-disabled); cursor: not-allowed; }

    ld-input.ld-input--size-sm { height: 24px; padding: 0 var(--space-100); }
    ld-input.ld-input--size-md { height: 32px; padding: 0 var(--space-150); }
    ld-input.ld-input--size-lg { height: 40px; padding: 0 var(--space-200); }
    ld-input.ld-input--size-xl { height: 48px; padding: 0 var(--space-200); }

    .ld-input__field {
      flex: 1 1 auto; min-width: 0; width: 100%;
      margin: 0; border: none; outline: none; background: transparent;
      font-family: var(--liga-font-family); font-size: 14px; line-height: 16px;
      letter-spacing: 0.29px; font-weight: 400; color: inherit; padding: 0;
    }
    .ld-input__field::placeholder { color: var(--text-subtlest); opacity: 1; }
    .ld-input__field:disabled { cursor: not-allowed; color: var(--text-disabled); -webkit-text-fill-color: var(--text-disabled); }

    .ld-input__icon {
      display: inline-flex; align-items: center; justify-content: center;
      flex: none; color: var(--icon-subtle);
    }
    .ld-input__icon svg { width: 100%; height: 100%; display: block; }
    ld-input.ld-input--size-sm .ld-input__icon { width: 16px; height: 16px; }
    ld-input.ld-input--size-md .ld-input__icon { width: 18px; height: 18px; }
    ld-input.ld-input--size-lg .ld-input__icon,
    ld-input.ld-input--size-xl .ld-input__icon { width: 20px; height: 20px; }
  `],
})
export class LdInputComponent implements ControlValueAccessor {
  @Input() size: InputSize = 'lg';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() invalid = false;
  @Input() loading = false;
  @Input() readOnly = false;

  @ContentChild('leftIcon')  leftIconTpl?: TemplateRef<unknown>;
  @ContentChild('rightIcon') rightIconTpl?: TemplateRef<unknown>;

  @Output() ldChange = new EventEmitter<string>();

  value = '';
  isDisabled = false;
  private onChange: (v: string) => void = () => {};
  onTouched: () => void = () => {};

  get spinnerSize(): 'sm' | 'md' | 'lg' {
    return this.size === 'sm' ? 'sm' : this.size === 'md' ? 'md' : 'lg';
  }

  writeValue(v: string): void { this.value = v ?? ''; }
  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.isDisabled = d; }

  onInput(event: Event): void {
    const v = (event.target as HTMLInputElement).value;
    this.value = v;
    this.onChange(v);
    this.ldChange.emit(v);
  }
}

@Component({
  selector: 'ld-search-input',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [LdInputComponent, FormsModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LdSearchInputComponent), multi: true }],
  template: `<ld-input type="search" [size]="size" [placeholder]="placeholder" [invalid]="invalid" [loading]="loading" [readOnly]="readOnly" [(ngModel)]="value" (ldChange)="ldChange.emit($event)" />`,
})
export class LdSearchInputComponent implements ControlValueAccessor {
  @Input() size: InputSize = 'lg';
  @Input() placeholder = 'Search';
  @Input() invalid = false;
  @Input() loading = false;
  @Input() readOnly = false;

  @Output() ldChange = new EventEmitter<string>();

  value = '';
  private onChange: (v: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(v: string): void { this.value = v ?? ''; }
  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(_: boolean): void {}
}
