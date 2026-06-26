import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnChanges } from '@angular/core';

export type PaginationSize = 'sm' | 'md';

@Component({
  selector: 'ld-pagination',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    <nav class="ld-pag" [attr.aria-label]="ariaLabel">
      <ul class="ld-pag__list" [attr.data-size]="size">
        <li>
          <button type="button" class="ld-pag__item ld-pag__arrow"
            [disabled]="disabled || page <= 1"
            aria-label="Go to previous page"
            (click)="go(page - 1)">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M12 5l-5 5 5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </li>
        @for (item of items; track item; let i = $index) {
          <li>
            @if (item === -1) {
              <span class="ld-pag__ellipsis" aria-hidden="true">…</span>
            } @else {
              <button type="button" class="ld-pag__item"
                [class.ld-pag__item--selected]="item === page"
                [attr.aria-current]="item === page ? 'page' : null"
                [attr.aria-label]="item === page ? 'Page ' + item : 'Go to page ' + item"
                [disabled]="disabled"
                (click)="go(item)">{{ item }}</button>
            }
          </li>
        }
        <li>
          <button type="button" class="ld-pag__item ld-pag__arrow"
            [disabled]="disabled || page >= count"
            aria-label="Go to next page"
            (click)="go(page + 1)">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M8 5l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  `,
  styles: [`
    .ld-pag { font-family: var(--liga-font-family); }
    .ld-pag__list { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-050); margin: 0; padding: 0; list-style: none; }
    .ld-pag__item {
      appearance: none; border: none; background: transparent; cursor: pointer;
      display: inline-flex; align-items: center; justify-content: center;
      box-sizing: border-box; min-width: 36px; height: 36px; padding: 0 var(--space-075);
      border-radius: var(--corner-radius-infinity);
      font-family: inherit; font-size: 14px; line-height: 1; font-weight: 500;
      color: var(--text-default); transition: background-color 160ms ease, color 160ms ease;
    }
    .ld-pag__list[data-size='sm'] .ld-pag__item { min-width: 28px; height: 28px; font-size: 13px; }
    .ld-pag__item:hover:not(:disabled):not(.ld-pag__item--selected) { background-color: var(--color-primary-100); color: var(--text-accent); }
    .ld-pag__item:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }
    .ld-pag__item:disabled { cursor: not-allowed; color: var(--text-disabled); }
    .ld-pag__item--selected { background-color: var(--btn-bg-primary-active); color: var(--text-alternative); }
    .ld-pag__arrow { color: var(--icon-subtle); padding: 0; }
    .ld-pag__arrow:hover:not(:disabled) { background-color: var(--color-primary-100); color: var(--text-accent); }
    .ld-pag__arrow:disabled { color: var(--icon-disabled); background: transparent; }
    .ld-pag__arrow svg { display: block; }
    .ld-pag__ellipsis { display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; min-width: 36px; height: 36px; color: var(--text-subtle); user-select: none; }
    .ld-pag__list[data-size='sm'] .ld-pag__ellipsis { min-width: 28px; height: 28px; }
  `],
})
export class LdPaginationComponent implements OnChanges {
  @Input() count = 1;
  @Input() page = 1;
  @Input() siblingCount = 1;
  @Input() boundaryCount = 1;
  @Input() disabled = false;
  @Input() size: PaginationSize = 'md';
  @Input() ariaLabel = 'Pagination';

  @Output() pageChange = new EventEmitter<number>();

  items: (number | -1)[] = [];

  ngOnChanges(): void { this.buildItems(); }

  go(p: number): void {
    const next = Math.min(Math.max(p, 1), this.count);
    if (next !== this.page && !this.disabled) {
      this.page = next;
      this.pageChange.emit(next);
      this.buildItems();
    }
  }

  private buildItems(): void {
    const { count, page, siblingCount, boundaryCount } = this;
    const range = (a: number, b: number) => Array.from({ length: Math.max(b - a + 1, 0) }, (_, i) => a + i);
    const start = range(1, Math.min(boundaryCount, count));
    const end = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);
    const sibStart = Math.max(Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1), boundaryCount + 2);
    const sibEnd = Math.min(Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2), end.length > 0 ? end[0]! - 2 : count - 1);

    const items: (number | -1)[] = [
      ...start,
      ...(sibStart > boundaryCount + 2 ? ([-1] as const) : boundaryCount + 1 < count - boundaryCount ? [boundaryCount + 1] : []),
      ...range(sibStart, sibEnd),
      ...(sibEnd < count - boundaryCount - 1 ? ([-1] as const) : count - boundaryCount > boundaryCount ? [count - boundaryCount] : []),
      ...end,
    ];
    this.items = [...new Set(items)].filter(n => n === -1 || (n >= 1 && n <= count));
  }
}
