import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  forwardRef,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayModule, ConnectionPositionPair } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SelectSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ld-select',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [OverlayModule, A11yModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LdSelectComponent), multi: true }],
  template: `
    <button
      type="button"
      class="ld-select__trigger"
      [class]="triggerClass"
      [disabled]="isDisabled"
      [attr.data-open]="isOpen() || null"
      [attr.data-invalid]="invalid || null"
      [attr.aria-expanded]="isOpen()"
      [attr.aria-haspopup]="'listbox'"
      cdkOverlayOrigin
      #trigger="cdkOverlayOrigin"
      (click)="toggle()"
      (keydown)="onTriggerKey($event)"
    >
      <span class="ld-select__value" [class.ld-select__placeholder]="!selectedLabel">
        {{ selectedLabel || placeholder }}
      </span>
      <svg class="ld-select__chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayMinWidth]="triggerWidth"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayHasBackdrop]="true"
      cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
      (backdropClick)="close()"
      (detach)="close()"
    >
      <div class="ld-select__listbox" role="listbox" cdkTrapFocus>
        @for (opt of options; track opt.value) {
          <div
            class="ld-select__option"
            role="option"
            [attr.aria-selected]="value === opt.value"
            [attr.aria-disabled]="opt.disabled || null"
            [attr.data-selected]="value === opt.value || null"
            (click)="!opt.disabled && selectOpt(opt.value)"
          >
            {{ opt.label }}
            @if (value === opt.value) {
              <svg class="ld-select__check" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="m3 8 3.2 3.2L13 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            }
          </div>
        }
      </div>
    </ng-template>
  `,
  styles: [`
    .ld-select__trigger {
      display: inline-flex; align-items: center; gap: var(--space-100);
      box-sizing: border-box; width: 100%;
      background-color: var(--cntnr-bg-primary-default);
      border: 1px solid var(--cntnr-border-default);
      border-radius: var(--field-corner-field-corner);
      color: var(--text-default); font-family: var(--liga-font-family);
      text-align: left; cursor: pointer;
      transition: border-color 200ms ease, box-shadow 200ms ease;
    }
    .ld-select__trigger:hover:not(:disabled):not([data-invalid]) { border-color: var(--cntnr-border-hover); }
    .ld-select__trigger[data-open], .ld-select__trigger:focus-visible {
      border-color: var(--cntnr-border-active);
      box-shadow: 0 0 0 3px var(--color-primary-100); outline: none;
    }
    .ld-select__trigger[data-invalid] { border-color: var(--cntnr-border-error); }
    .ld-select__trigger:disabled { background-color: var(--cntnr-bg-other-readonly-elements); border-color: var(--cntnr-border-disabled); color: var(--text-disabled); cursor: not-allowed; }
    .ld-select__trigger.ld-select__trigger--sm { height: 24px; padding: 0 var(--space-100); }
    .ld-select__trigger.ld-select__trigger--md { height: 32px; padding: 0 var(--space-150); }
    .ld-select__trigger.ld-select__trigger--lg { height: 40px; padding: 0 var(--space-200); }
    .ld-select__value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 14px; line-height: 16px; letter-spacing: 0.29px; }
    .ld-select__placeholder { color: var(--text-subtlest); }
    .ld-select__chevron { flex: none; width: 16px; height: 16px; color: var(--icon-subtle); transition: transform 160ms ease; }
    .ld-select__trigger[data-open] .ld-select__chevron { transform: rotate(180deg); }

    .ld-select__listbox {
      z-index: 1400; max-height: 288px; overflow-y: auto; padding: var(--space-050);
      background-color: var(--cntnr-bg-primary-default);
      border: 1px solid var(--dropdown-stroke-default);
      border-radius: var(--cntnr-corner-big);
      box-shadow: 0 10px 30px rgb(15 23 42 / 0.12); outline: none;
      font-family: var(--liga-font-family);
    }
    .ld-select__option {
      display: flex; align-items: center; gap: var(--space-100);
      padding: var(--space-100) var(--space-150);
      border-radius: var(--cntnr-corner-small);
      font-size: 14px; line-height: 16px; letter-spacing: 0.29px;
      color: var(--text-default); cursor: pointer; user-select: none;
    }
    .ld-select__option:hover:not([aria-disabled]) { background-color: var(--highlight-bg, var(--color-primary-100)); }
    .ld-select__option[data-selected] { color: var(--text-accent); font-weight: 500; }
    .ld-select__option[aria-disabled] { color: var(--text-disabled); cursor: not-allowed; }
    .ld-select__check { margin-left: auto; flex: none; width: 16px; height: 16px; color: var(--icon-accent); }
  `],
})
export class LdSelectComponent implements ControlValueAccessor {
  @Input() options: SelectOption[] = [];
  @Input() placeholder = 'Select…';
  @Input() size: SelectSize = 'lg';
  @Input() invalid = false;

  @Output() ldChange = new EventEmitter<string>();

  value: string | null = null;
  isDisabled = false;
  isOpen = signal(false);
  triggerWidth = 0;

  readonly positions: ConnectionPositionPair[] = [
    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }, 0, 4),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' },    { overlayX: 'start', overlayY: 'bottom' }, 0, -4),
  ];

  private onChange: (v: string | null) => void = () => {};
  onTouched: () => void = () => {};

  get selectedLabel(): string | undefined {
    return this.options.find(o => o.value === this.value)?.label;
  }
  get triggerClass(): string { return `ld-select__trigger--${this.size}`; }

  writeValue(v: string | null): void { this.value = v; }
  registerOnChange(fn: (v: string | null) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.isDisabled = d; }

  toggle(): void { this.isOpen.update(v => !v); }
  close(): void { this.isOpen.set(false); this.onTouched(); }

  selectOpt(v: string): void {
    this.value = v;
    this.onChange(v);
    this.ldChange.emit(v);
    this.close();
  }

  onTriggerKey(e: KeyboardEvent): void {
    if (e.key === 'Escape') this.close();
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.isOpen.set(true); }
  }
}
