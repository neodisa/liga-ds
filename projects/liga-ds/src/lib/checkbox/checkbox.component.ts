import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  AfterViewInit,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ld-checkbox',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LdCheckboxComponent), multi: true }],
  template: `
    <label class="ld-checkbox" [class.ld-checkbox--disabled]="isDisabled">
      <input
        #nativeInput
        type="checkbox"
        class="ld-checkbox__input"
        [checked]="checked"
        [disabled]="isDisabled"
        (change)="onNativeChange($event)"
        (blur)="onTouched()"
      />
      <span class="ld-checkbox__box" aria-hidden="true">
        <svg class="ld-checkbox__check" viewBox="0 0 11 8" fill="none">
          <path d="M1 4.2 3.8 7 10 1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="ld-checkbox__dash"></span>
      </span>
      @if (hasLabel) {
        <span class="ld-checkbox__label"><ng-content /></span>
      }
    </label>
  `,
  styles: [`
    .ld-checkbox {
      display: inline-flex; align-items: center; gap: var(--space-100);
      cursor: pointer; font-family: var(--liga-font-family);
    }
    .ld-checkbox--disabled { cursor: not-allowed; }
    .ld-checkbox__input {
      position: absolute; width: 1px; height: 1px;
      margin: 0; padding: 0; opacity: 0; white-space: nowrap;
    }
    .ld-checkbox__box {
      position: relative; flex: none;
      width: 16px; height: 16px;
      display: inline-flex; align-items: center; justify-content: center;
      border-radius: var(--checkbox-corner-checkbox-corner);
      background-color: var(--cntnr-bg-primary-default);
      border: 1px solid var(--color-neutral-solid-500);
      color: var(--icon-alternative-active);
      transition: background-color 160ms ease, border-color 160ms ease;
    }
    .ld-checkbox:hover .ld-checkbox__input:not(:disabled):not(:checked):not(:indeterminate) ~ .ld-checkbox__box {
      border-color: var(--checkbox-color-hover-checkbox);
    }
    .ld-checkbox__input:checked ~ .ld-checkbox__box,
    .ld-checkbox__input:indeterminate ~ .ld-checkbox__box {
      background-color: var(--checkbox-color-default-checkbox);
      border-color: var(--checkbox-color-default-checkbox);
    }
    .ld-checkbox__input:focus-visible ~ .ld-checkbox__box { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }
    .ld-checkbox__input:disabled ~ .ld-checkbox__box { background-color: var(--cntnr-bg-primary-default); border-color: var(--cntnr-border-disabled); }
    .ld-checkbox__input:disabled:checked ~ .ld-checkbox__box,
    .ld-checkbox__input:disabled:indeterminate ~ .ld-checkbox__box {
      background-color: var(--btn-bg-primary-disable); border-color: var(--btn-bg-primary-disable);
    }
    .ld-checkbox__check, .ld-checkbox__dash { display: none; }
    .ld-checkbox__check { width: 11px; height: 8px; }
    .ld-checkbox__dash { width: 9px; height: 2px; border-radius: 1px; background-color: currentColor; }
    .ld-checkbox__input:checked:not(:indeterminate) ~ .ld-checkbox__box .ld-checkbox__check { display: block; }
    .ld-checkbox__input:indeterminate ~ .ld-checkbox__box .ld-checkbox__dash { display: block; }
    .ld-checkbox__label { color: var(--text-default); }
    .ld-checkbox__input:disabled ~ .ld-checkbox__label { color: var(--text-disabled); }
  `],
})
export class LdCheckboxComponent implements ControlValueAccessor, AfterViewInit {
  @Input() indeterminate = false;
  @Input() hasLabel = true;
  @Input() set disabled(v: boolean) { this.isDisabled = v; }

  @Output() ldChange = new EventEmitter<boolean>();

  @ViewChild('nativeInput') nativeInput!: ElementRef<HTMLInputElement>;

  checked = false;
  isDisabled = false;
  private onChange: (v: boolean) => void = () => {};
  onTouched: () => void = () => {};

  ngAfterViewInit(): void { this.syncIndeterminate(); }

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

  private syncIndeterminate(): void {
    if (this.nativeInput?.nativeElement) {
      this.nativeInput.nativeElement.indeterminate = this.indeterminate;
    }
  }

  ngOnChanges(): void { this.syncIndeterminate(); }
}
