import { Component, Input, ViewEncapsulation } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

@Component({
  selector: 'ld-breadcrumbs',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    <nav class="ld-bc" [attr.aria-label]="ariaLabel">
      <ol class="ld-bc__list">
        @for (item of items; track item.label; let last = $last) {
          <li class="ld-bc__li">
            @if (item.current || !item.href) {
              <span class="ld-bc__item" [class.ld-bc__item--current]="item.current" [attr.aria-current]="item.current ? 'page' : null">
                {{ item.label }}
              </span>
            } @else {
              <a class="ld-bc__item ld-bc__item--link" [href]="item.href">{{ item.label }}</a>
            }
            @if (!last) {
              <span class="ld-bc__sep" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: [`
    .ld-bc { font-family: var(--liga-font-family); }
    .ld-bc__list { display: flex; flex-wrap: wrap; align-items: center; margin: 0; padding: 0; list-style: none; }
    .ld-bc__li { display: inline-flex; align-items: center; }
    .ld-bc__item { display: inline-flex; align-items: center; gap: var(--space-075); font-size: 14px; line-height: 20px; font-weight: 500; letter-spacing: 0.15px; border-radius: var(--cntnr-corner-small, 6px); color: var(--text-subtle); text-decoration: none; }
    .ld-bc__item--link { color: var(--link-default); cursor: pointer; transition: color 160ms ease; }
    .ld-bc__item--link:hover { color: var(--text-click); text-decoration: underline; }
    .ld-bc__item--link:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }
    .ld-bc__item--current { color: var(--text-default); font-weight: 600; }
    .ld-bc__sep { display: inline-flex; align-items: center; justify-content: center; margin: 0 var(--space-075); color: var(--icon-subtlest); }
    .ld-bc__sep svg { display: block; }
  `],
})
export class LdBreadcrumbsComponent {
  @Input() items: BreadcrumbItem[] = [];
  @Input() ariaLabel = 'Breadcrumb';
}
