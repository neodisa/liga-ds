import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  forwardRef,
  signal,
  computed,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayModule, ConnectionPositionPair } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

function startOfDay(d: Date): Date { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
function addDays(d: Date, n: number): Date { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
function addMonths(d: Date, n: number): Date { return new Date(d.getFullYear(), d.getMonth() + n, 1); }
function sameDay(a: Date | null, b: Date | null): boolean { return !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
function monthGrid(view: Date): Date[] {
  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const dow = (first.getDay() + 6) % 7;
  const start = addDays(first, -dow);
  return Array.from({ length: 42 }, (_, i) => addDays(start, i));
}

@Component({
  selector: 'ld-date-picker',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [OverlayModule, A11yModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LdDatePickerComponent), multi: true }],
  template: `
    <button
      type="button"
      class="ld-dp__trigger"
      [disabled]="isDisabled"
      [attr.data-open]="isOpen() || null"
      [attr.data-invalid]="invalid || null"
      cdkOverlayOrigin
      #trigger="cdkOverlayOrigin"
      (click)="toggle()"
    >
      <span [class.ld-dp__placeholder]="!value()">{{ displayValue() }}</span>
      <svg class="ld-dp__cal-icon" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="1.5" y="2.5" width="15" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/>
        <path d="M1.5 7h15" stroke="currentColor" stroke-width="1.5"/>
        <path d="M6 1v3M12 1v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayHasBackdrop]="true"
      cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
      (backdropClick)="close()"
      (detach)="close()"
    >
      <div class="ld-dp__calendar" cdkTrapFocus (keydown.escape)="close()">
        <div class="ld-dp__header">
          <button type="button" class="ld-dp__nav-btn" aria-label="Previous month" (click)="prevMonth()">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4l-4 4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <span class="ld-dp__month-label">{{ monthLabel() }}</span>
          <button type="button" class="ld-dp__nav-btn" aria-label="Next month" (click)="nextMonth()">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
        <div class="ld-dp__grid">
          @for (wd of weekdays; track wd) {
            <div class="ld-dp__weekday">{{ wd }}</div>
          }
          @for (day of grid(); track day.getTime()) {
            <button
              type="button"
              class="ld-dp__day"
              [class.ld-dp__day--outside]="day.getMonth() !== viewMonth().getMonth()"
              [class.ld-dp__day--selected]="sameDay(day, value())"
              [class.ld-dp__day--today]="sameDay(day, today)"
              [disabled]="isDayDisabled(day)"
              [attr.aria-pressed]="sameDay(day, value())"
              (click)="selectDay(day)"
            >{{ day.getDate() }}</button>
          }
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .ld-dp__trigger {
      display: inline-flex; align-items: center; gap: var(--space-100);
      box-sizing: border-box; width: 100%; height: 40px;
      padding: 0 var(--space-200);
      background-color: var(--cntnr-bg-primary-default);
      border: 1px solid var(--cntnr-border-default);
      border-radius: var(--field-corner-field-corner);
      color: var(--text-default); font-family: var(--liga-font-family);
      font-size: 14px; letter-spacing: 0.29px; text-align: left; cursor: pointer;
      transition: border-color 200ms ease, box-shadow 200ms ease;
    }
    .ld-dp__trigger:hover:not(:disabled) { border-color: var(--cntnr-border-hover); }
    .ld-dp__trigger[data-open], .ld-dp__trigger:focus-visible { border-color: var(--cntnr-border-active); box-shadow: 0 0 0 3px var(--color-primary-100); outline: none; }
    .ld-dp__trigger[data-invalid] { border-color: var(--cntnr-border-error); }
    .ld-dp__trigger:disabled { background-color: var(--cntnr-bg-other-readonly-elements); border-color: var(--cntnr-border-disabled); color: var(--text-disabled); cursor: not-allowed; }
    .ld-dp__trigger > span { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .ld-dp__placeholder { color: var(--text-subtlest); }
    .ld-dp__cal-icon { flex: none; width: 18px; height: 18px; color: var(--icon-subtle); }

    .ld-dp__calendar {
      z-index: 1400; width: 280px; padding: var(--space-200);
      background-color: var(--cntnr-bg-primary-default);
      border: 1px solid var(--dropdown-stroke-default);
      border-radius: var(--cntnr-corner-big);
      box-shadow: 0 10px 30px rgb(15 23 42 / 0.12); outline: none;
      font-family: var(--liga-font-family);
    }
    .ld-dp__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-150); }
    .ld-dp__month-label { font-size: 14px; font-weight: 600; color: var(--text-default); text-transform: capitalize; }
    .ld-dp__nav-btn {
      display: inline-flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; padding: 0;
      border: none; background: transparent; border-radius: var(--cntnr-corner-small);
      color: var(--icon-default); cursor: pointer; transition: background-color 120ms ease;
    }
    .ld-dp__nav-btn:hover { background-color: var(--cntnr-bg-third-hover); }
    .ld-dp__nav-btn:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }
    .ld-dp__nav-btn svg { display: block; }

    .ld-dp__grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
    .ld-dp__weekday { text-align: center; font-size: 12px; font-weight: 600; color: var(--text-subtle); padding: var(--space-050) 0 var(--space-100); }
    .ld-dp__day {
      appearance: none; border: none; background: transparent; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      aspect-ratio: 1; border-radius: var(--cntnr-corner-infinity);
      font-family: inherit; font-size: 13px; color: var(--text-default);
      transition: background-color 120ms ease, color 120ms ease;
    }
    .ld-dp__day:hover:not(:disabled) { background-color: var(--color-primary-100); color: var(--text-accent); }
    .ld-dp__day:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }
    .ld-dp__day:disabled { color: var(--text-disabled); cursor: not-allowed; }
    .ld-dp__day--outside { color: var(--text-subtlest); }
    .ld-dp__day--today { font-weight: 700; color: var(--text-accent); }
    .ld-dp__day--selected { background-color: var(--btn-bg-primary-active); color: var(--text-alternative); }
    .ld-dp__day--selected:hover:not(:disabled) { background-color: var(--btn-bg-primary-hover); }
  `],
})
export class LdDatePickerComponent implements ControlValueAccessor {
  @Input() placeholder = 'дд.мм.рррр';
  @Input() invalid = false;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() locale = 'uk-UA';

  @Output() ldChange = new EventEmitter<Date>();

  readonly weekdays = WEEKDAYS;
  readonly today = startOfDay(new Date());
  readonly sameDay = sameDay;

  value = signal<Date | null>(null);
  viewMonth = signal<Date>(startOfDay(new Date()));
  isOpen = signal(false);
  isDisabled = false;

  readonly positions: ConnectionPositionPair[] = [
    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }, 0, 4),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' },    { overlayX: 'start', overlayY: 'bottom' }, 0, -4),
  ];

  readonly grid = computed(() => monthGrid(this.viewMonth()));
  readonly monthLabel = computed(() =>
    this.viewMonth().toLocaleDateString(this.locale, { month: 'long', year: 'numeric' })
  );
  readonly displayValue = computed(() => {
    const v = this.value();
    if (!v) return this.placeholder;
    return v.toLocaleDateString(this.locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
  });

  private onChange: (v: Date | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(v: Date | null): void {
    this.value.set(v ? startOfDay(v) : null);
    if (v) this.viewMonth.set(startOfDay(new Date(v.getFullYear(), v.getMonth(), 1)));
  }
  registerOnChange(fn: (v: Date | null) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.isDisabled = d; }

  toggle(): void { this.isOpen.update(v => !v); }
  close(): void { this.isOpen.set(false); this.onTouched(); }
  prevMonth(): void { this.viewMonth.update(d => addMonths(d, -1)); }
  nextMonth(): void { this.viewMonth.update(d => addMonths(d, 1)); }

  selectDay(day: Date): void {
    if (this.isDayDisabled(day)) return;
    const d = startOfDay(day);
    this.value.set(d);
    this.onChange(d);
    this.ldChange.emit(d);
    this.close();
  }

  isDayDisabled(day: Date): boolean {
    if (this.isDisabled) return true;
    if (this.minDate && day < startOfDay(this.minDate)) return true;
    if (this.maxDate && day > startOfDay(this.maxDate)) return true;
    return false;
  }
}
