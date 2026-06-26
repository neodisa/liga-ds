import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

export type TextColor =
  | 'default' | 'subtle' | 'subtlest' | 'disabled'
  | 'inverse' | 'accent' | 'success' | 'warning' | 'danger' | 'information';

export type TextVariant =
  | 'body-l' | 'body-m' | 'body-s'
  | 'label-l' | 'label-m' | 'label-s'
  | 'h100' | 'h100-caps' | 'h200' | 'h200-caps'
  | 'h300' | 'h300-caps' | 'h400' | 'h400-caps';

@Component({
  selector: 'ld-text',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `<ng-content />`,
  host: {
    '[class]': '"ld-text " + variantClass + " " + colorClass',
  },
  styles: [`
    ld-text {
      display: inline;
      font-family: var(--liga-font-family);
    }

    ld-text.ld-text--body-l  { font-size: 16px; line-height: 24px; font-weight: 400; letter-spacing: 0.33px; }
    ld-text.ld-text--body-m  { font-size: 14px; line-height: 20px; font-weight: 400; letter-spacing: 0.29px; }
    ld-text.ld-text--body-s  { font-size: 12px; line-height: 16px; font-weight: 400; letter-spacing: 0.25px; }
    ld-text.ld-text--label-l { font-size: 16px; line-height: 20px; font-weight: 600; letter-spacing: 0.13px; }
    ld-text.ld-text--label-m { font-size: 14px; line-height: 16px; font-weight: 600; letter-spacing: 0.15px; }
    ld-text.ld-text--label-s { font-size: 12px; line-height: 16px; font-weight: 700; letter-spacing: 0.25px; }
    ld-text.ld-text--h100      { font-size: 10px; line-height: 12px; font-weight: 400; letter-spacing: 0.5px; }
    ld-text.ld-text--h100-caps { font-size: 10px; line-height: 12px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase; }
    ld-text.ld-text--h200      { font-size: 12px; line-height: 16px; font-weight: 600; letter-spacing: 0.1px; }
    ld-text.ld-text--h200-caps { font-size: 12px; line-height: 16px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; }
    ld-text.ld-text--h300      { font-size: 14px; line-height: 20px; font-weight: 600; letter-spacing: 0.1px; }
    ld-text.ld-text--h300-caps { font-size: 14px; line-height: 20px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; }
    ld-text.ld-text--h400      { font-size: 16px; line-height: 20px; font-weight: 700; letter-spacing: 0.13px; }
    ld-text.ld-text--h400-caps { font-size: 16px; line-height: 20px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; }

    ld-text.ld-text--color-default     { color: var(--text-default); }
    ld-text.ld-text--color-subtle      { color: var(--text-subtle); }
    ld-text.ld-text--color-subtlest    { color: var(--text-subtlest); }
    ld-text.ld-text--color-disabled    { color: var(--text-disabled); }
    ld-text.ld-text--color-inverse     { color: var(--text-inverse); }
    ld-text.ld-text--color-accent      { color: var(--text-accent); }
    ld-text.ld-text--color-success     { color: var(--text-success); }
    ld-text.ld-text--color-warning     { color: var(--text-warning); }
    ld-text.ld-text--color-danger      { color: var(--text-danger); }
    ld-text.ld-text--color-information { color: var(--text-information); }
  `],
})
export class LdTextComponent {
  @Input() variant: TextVariant = 'body-m';
  @Input() color: TextColor = 'default';

  get variantClass(): string {
    return `ld-text--${this.variant}`;
  }

  get colorClass(): string {
    return `ld-text--color-${this.color}`;
  }
}
