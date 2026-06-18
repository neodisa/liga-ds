import { Component, Input, Output, EventEmitter, ViewEncapsulation, ContentChild, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { BadgeTone, BadgeVariant, BadgeSize } from '../badge/badge.component';

@Component({
  selector: 'ld-tag',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [NgTemplateOutlet],
  template: `
    @if (leftIconTpl) {
      <span class="ld-tag__icon" aria-hidden="true"><ng-container [ngTemplateOutlet]="leftIconTpl" /></span>
    }
    <ng-content />
    @if (removable) {
      <button type="button" class="ld-tag__remove" [attr.aria-label]="removeLabel" (click)="ldRemove.emit()">
        <svg viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
    }
  `,
  host: { '[class]': 'hostClass' },
  styles: [`
    ld-tag {
      display: inline-flex; align-items: center; gap: var(--space-050);
      width: fit-content; font-family: var(--liga-font-family);
      border-radius: var(--cntnr-corner-infinity); white-space: nowrap; box-sizing: border-box;
    }
    ld-tag.ld-tag--size-sm { min-height: 18px; padding: 0 var(--space-075); font-size: 11px; line-height: 14px; font-weight: 600; letter-spacing: 0.18px; }
    ld-tag.ld-tag--size-md { min-height: 24px; padding: 0 var(--space-100); font-size: 12px; line-height: 15px; font-weight: 600; letter-spacing: 0.25px; }

    ld-tag.ld-tag--solid.ld-tag--tone-primary  { background: var(--status-filled-primary);  color: var(--text-alternative); }
    ld-tag.ld-tag--solid.ld-tag--tone-success  { background: var(--status-filled-positive); color: var(--text-alternative); }
    ld-tag.ld-tag--solid.ld-tag--tone-danger   { background: var(--status-filled-negative); color: var(--text-alternative); }
    ld-tag.ld-tag--solid.ld-tag--tone-warning  { background: var(--status-filled-warning);  color: var(--text-alternative); }
    ld-tag.ld-tag--solid.ld-tag--tone-info     { background: var(--status-filled-blue);     color: var(--text-alternative); }
    ld-tag.ld-tag--solid.ld-tag--tone-neutral  { background: var(--status-filled-passive);  color: var(--text-alternative); }
    ld-tag.ld-tag--subtle.ld-tag--tone-primary { background: var(--status-trasperent-primary);  color: var(--text-accent); }
    ld-tag.ld-tag--subtle.ld-tag--tone-success { background: var(--status-trasperent-positive); color: var(--text-success); }
    ld-tag.ld-tag--subtle.ld-tag--tone-danger  { background: var(--status-trasperent-negative); color: var(--text-danger); }
    ld-tag.ld-tag--subtle.ld-tag--tone-warning { background: var(--status-trasperent-warning);  color: var(--text-warning); }
    ld-tag.ld-tag--subtle.ld-tag--tone-info    { background: var(--status-trasperent-blue);     color: var(--text-information); }
    ld-tag.ld-tag--subtle.ld-tag--tone-neutral { background: var(--status-trasperent-passive);  color: var(--text-default); }

    .ld-tag__icon { display: inline-flex; align-items: center; justify-content: center; flex: none; width: 14px; height: 14px; }
    .ld-tag__icon svg { width: 100%; height: 100%; display: block; }
    .ld-tag__remove {
      display: inline-flex; align-items: center; justify-content: center;
      flex: none; width: 16px; height: 16px;
      margin-inline-start: 2px; margin-inline-end: -4px;
      padding: 0; border: none; background: transparent; color: inherit;
      border-radius: var(--cntnr-corner-infinity); cursor: pointer; opacity: 0.65;
      transition: opacity 120ms ease, background-color 120ms ease;
    }
    .ld-tag__remove:hover { opacity: 1; background-color: var(--color-neutral-alpha-200); }
    .ld-tag__remove:focus-visible { outline: 2px solid currentColor; outline-offset: 1px; opacity: 1; }
    .ld-tag__remove svg { width: 10px; height: 10px; display: block; }
  `],
})
export class LdTagComponent {
  @Input() tone: BadgeTone = 'neutral';
  @Input() variant: BadgeVariant = 'subtle';
  @Input() size: BadgeSize = 'md';
  @Input() removable = false;
  @Input() removeLabel = 'Remove';

  @ContentChild('leftIcon') leftIconTpl?: TemplateRef<unknown>;

  @Output() ldRemove = new EventEmitter<void>();

  get hostClass(): string {
    return `ld-tag ld-tag--tone-${this.tone} ld-tag--${this.variant} ld-tag--size-${this.size}`;
  }
}
