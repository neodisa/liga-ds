import { Component, Input, ViewEncapsulation } from '@angular/core';

export type BadgeTone = 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
export type BadgeVariant = 'solid' | 'subtle';
export type BadgeSize = 'sm' | 'md';

@Component({
  selector: 'ld-badge',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `@if (!dot) { <ng-content /> }`,
  host: {
    '[class]': 'hostClass',
  },
  styles: [`
    ld-badge {
      display: inline-flex;
      align-items: center;
      gap: var(--space-050);
      width: fit-content;
      font-family: var(--liga-font-family);
      border-radius: var(--cntnr-corner-infinity);
      white-space: nowrap;
      box-sizing: border-box;
    }
    ld-badge.ld-badge--size-sm {
      min-height: 18px;
      padding: 0 var(--space-075);
      font-size: 11px;
      line-height: 14px;
      font-weight: 600;
      letter-spacing: 0.18px;
    }
    ld-badge.ld-badge--size-md {
      min-height: 24px;
      padding: 0 var(--space-100);
      font-size: 12px;
      line-height: 15px;
      font-weight: 600;
      letter-spacing: 0.25px;
    }
    ld-badge.ld-badge--dot {
      width: 8px; height: 8px;
      min-height: 0; padding: 0;
      border-radius: var(--cntnr-corner-infinity);
    }

    /* solid */
    ld-badge.ld-badge--solid.ld-badge--tone-primary  { background: var(--status-filled-primary);  color: var(--text-alternative); }
    ld-badge.ld-badge--solid.ld-badge--tone-success  { background: var(--status-filled-positive); color: var(--text-alternative); }
    ld-badge.ld-badge--solid.ld-badge--tone-danger   { background: var(--status-filled-negative); color: var(--text-alternative); }
    ld-badge.ld-badge--solid.ld-badge--tone-warning  { background: var(--status-filled-warning);  color: var(--text-alternative); }
    ld-badge.ld-badge--solid.ld-badge--tone-info     { background: var(--status-filled-blue);     color: var(--text-alternative); }
    ld-badge.ld-badge--solid.ld-badge--tone-neutral  { background: var(--status-filled-passive);  color: var(--text-alternative); }

    /* subtle */
    ld-badge.ld-badge--subtle.ld-badge--tone-primary { background: var(--status-trasperent-primary);  color: var(--text-accent); }
    ld-badge.ld-badge--subtle.ld-badge--tone-success { background: var(--status-trasperent-positive); color: var(--text-success); }
    ld-badge.ld-badge--subtle.ld-badge--tone-danger  { background: var(--status-trasperent-negative); color: var(--text-danger); }
    ld-badge.ld-badge--subtle.ld-badge--tone-warning { background: var(--status-trasperent-warning);  color: var(--text-warning); }
    ld-badge.ld-badge--subtle.ld-badge--tone-info    { background: var(--status-trasperent-blue);     color: var(--text-information); }
    ld-badge.ld-badge--subtle.ld-badge--tone-neutral { background: var(--status-trasperent-passive);  color: var(--text-default); }
  `],
})
export class LdBadgeComponent {
  @Input() tone: BadgeTone = 'neutral';
  @Input() variant: BadgeVariant = 'subtle';
  @Input() size: BadgeSize = 'md';
  @Input() dot = false;

  get hostClass(): string {
    return [
      'ld-badge',
      `ld-badge--tone-${this.tone}`,
      `ld-badge--${this.variant}`,
      this.dot ? 'ld-badge--dot' : `ld-badge--size-${this.size}`,
    ].join(' ');
  }
}
