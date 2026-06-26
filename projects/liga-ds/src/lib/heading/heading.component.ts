import { Component, Input, ViewEncapsulation } from '@angular/core';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

@Component({
  selector: 'ld-heading',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `<ng-content />`,
  host: {
    'role': 'heading',
    '[attr.aria-level]': 'level',
    '[class]': '"ld-heading ld-heading--" + level',
    'style': 'display: block',
  },
  styles: [`
    ld-heading {
      font-family: var(--liga-font-family);
      margin: 0;
      color: var(--text-default);
    }
    ld-heading.ld-heading--1 { font-size: var(--typo-sizes-h1, 40px); line-height: 1.2;  font-weight: 700; letter-spacing: -0.5px; }
    ld-heading.ld-heading--2 { font-size: var(--typo-sizes-h2, 32px); line-height: 1.25; font-weight: 700; letter-spacing: -0.3px; }
    ld-heading.ld-heading--3 { font-size: var(--typo-sizes-h3, 24px); line-height: 1.3;  font-weight: 700; letter-spacing: 0; }
    ld-heading.ld-heading--4 { font-size: var(--typo-sizes-h4, 20px); line-height: 1.35; font-weight: 700; letter-spacing: 0.1px; }
    ld-heading.ld-heading--5 { font-size: var(--typo-sizes-h5, 16px); line-height: 1.4;  font-weight: 700; letter-spacing: 0.13px; }
    ld-heading.ld-heading--6 { font-size: var(--typo-sizes-h6, 14px); line-height: 1.4;  font-weight: 700; letter-spacing: 0.15px; }
  `],
})
export class LdHeadingComponent {
  @Input() level: HeadingLevel = 3;
}
