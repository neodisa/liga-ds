import { Component, Input, Output, EventEmitter, ViewEncapsulation, ContentChild, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { BadgeTone, BadgeSize } from '../badge/badge.component';

@Component({
  selector: 'ld-chip',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [NgTemplateOutlet],
  template: `
    <button
      type="button"
      class="ld-chip"
      [class]="chipClass"
      [attr.aria-pressed]="selected"
      [disabled]="disabled"
      (click)="ldToggle.emit(!selected)"
    >
      @if (leftIconTpl) {
        <span class="ld-chip__icon" aria-hidden="true"><ng-container [ngTemplateOutlet]="leftIconTpl" /></span>
      }
      <ng-content />
    </button>
  `,
  styles: [`
    .ld-chip {
      display: inline-flex; align-items: center; gap: var(--space-050);
      width: fit-content; font-family: var(--liga-font-family);
      border-radius: var(--cntnr-corner-infinity); white-space: nowrap; box-sizing: border-box;
      border: 1px solid transparent; cursor: pointer;
      transition: background-color 160ms ease, border-color 160ms ease, filter 120ms ease;
    }
    .ld-chip--size-sm { min-height: 18px; padding: 0 var(--space-075); font-size: 11px; line-height: 14px; font-weight: 600; letter-spacing: 0.18px; }
    .ld-chip--size-md { min-height: 24px; padding: 0 var(--space-100); font-size: 12px; line-height: 15px; font-weight: 600; letter-spacing: 0.25px; }
    .ld-chip:hover:not(:disabled) { filter: brightness(0.97); }
    .ld-chip:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }
    .ld-chip:disabled { cursor: not-allowed; opacity: 0.5; }

    /* subtle (off) */
    .ld-chip--subtle.ld-chip--tone-primary { background: var(--status-trasperent-primary);  color: var(--text-accent); }
    .ld-chip--subtle.ld-chip--tone-success { background: var(--status-trasperent-positive); color: var(--text-success); }
    .ld-chip--subtle.ld-chip--tone-danger  { background: var(--status-trasperent-negative); color: var(--text-danger); }
    .ld-chip--subtle.ld-chip--tone-warning { background: var(--status-trasperent-warning);  color: var(--text-warning); }
    .ld-chip--subtle.ld-chip--tone-info    { background: var(--status-trasperent-blue);     color: var(--text-information); }
    .ld-chip--subtle.ld-chip--tone-neutral { background: var(--status-trasperent-passive);  color: var(--text-default); }
    /* solid (selected) */
    .ld-chip--solid.ld-chip--tone-primary  { background: var(--status-filled-primary);  color: var(--text-alternative); }
    .ld-chip--solid.ld-chip--tone-success  { background: var(--status-filled-positive); color: var(--text-alternative); }
    .ld-chip--solid.ld-chip--tone-danger   { background: var(--status-filled-negative); color: var(--text-alternative); }
    .ld-chip--solid.ld-chip--tone-warning  { background: var(--status-filled-warning);  color: var(--text-alternative); }
    .ld-chip--solid.ld-chip--tone-info     { background: var(--status-filled-blue);     color: var(--text-alternative); }
    .ld-chip--solid.ld-chip--tone-neutral  { background: var(--status-filled-passive);  color: var(--text-alternative); }

    .ld-chip__icon { display: inline-flex; align-items: center; justify-content: center; flex: none; width: 14px; height: 14px; }
    .ld-chip__icon svg { width: 100%; height: 100%; display: block; }
  `],
})
export class LdChipComponent {
  @Input() tone: BadgeTone = 'neutral';
  @Input() size: BadgeSize = 'md';
  @Input() selected = false;
  @Input() disabled = false;

  @ContentChild('leftIcon') leftIconTpl?: TemplateRef<unknown>;

  @Output() ldToggle = new EventEmitter<boolean>();

  get chipClass(): string {
    return `ld-chip--tone-${this.tone} ld-chip--size-${this.size} ld-chip--${this.selected ? 'solid' : 'subtle'}`;
  }
}
