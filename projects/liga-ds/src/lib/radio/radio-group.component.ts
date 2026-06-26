import { Component, Input, Output, EventEmitter, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ld-radio-group',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `<ng-content />`,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LdRadioGroupComponent), multi: true }],
  host: {
    'role': 'radiogroup',
    '[attr.aria-disabled]': 'isDisabled || null',
  },
  styles: [`
    ld-radio-group { display: flex; flex-direction: column; gap: var(--space-100); }
    ld-radio-group[data-orientation='horizontal'] { flex-direction: row; flex-wrap: wrap; }
  `],
})
export class LdRadioGroupComponent implements ControlValueAccessor {
  @Input() name = `ld-radio-group-${Math.random().toString(36).slice(2, 7)}`;
  @Input() orientation: 'vertical' | 'horizontal' = 'vertical';

  @Output() ldChange = new EventEmitter<string>();

  value: string | null = null;
  isDisabled = false;

  private onChange: (v: string | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(v: string | null): void { this.value = v; }
  registerOnChange(fn: (v: string | null) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.isDisabled = d; }

  select(v: string): void {
    this.value = v;
    this.onChange(v);
    this.ldChange.emit(v);
  }
}
