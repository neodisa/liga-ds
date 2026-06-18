import { Component, Input, ViewEncapsulation } from '@angular/core';

export type DividerOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'ld-divider',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: ``,
  host: {
    'role': 'separator',
    '[attr.aria-orientation]': 'orientation',
    '[class]': '"ld-divider ld-divider--" + orientation',
  },
  styles: [`
    ld-divider {
      display: block;
      border: none;
      background-color: var(--divider-divider);
      flex: none;
    }
    ld-divider.ld-divider--horizontal { width: 100%; height: 1px; }
    ld-divider.ld-divider--vertical   { width: 1px; align-self: stretch; min-height: 1em; }
  `],
})
export class LdDividerComponent {
  @Input() orientation: DividerOrientation = 'horizontal';
}
