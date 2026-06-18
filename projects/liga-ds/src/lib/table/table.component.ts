import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

export type TableSize = 'sm' | 'md';
export type SortDirection = 'ascending' | 'descending' | 'none';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  sortDirection?: SortDirection;
}

export interface TableRow {
  [key: string]: unknown;
}

@Component({
  selector: 'ld-table',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="ld-table__wrapper">
      <table class="ld-table" [class]="tableClass">
        @if (caption) {
          <caption class="ld-table__caption">{{ caption }}</caption>
        }
        <thead>
          <tr>
            @for (col of columns; track col.key) {
              <th class="ld-table__th" scope="col" [attr.aria-sort]="col.sortable ? (col.sortDirection ?? 'none') : null">
                @if (col.sortable) {
                  <button type="button" class="ld-table__sort-btn" [attr.data-direction]="col.sortDirection ?? 'none'" (click)="ldSort.emit(col.key)">
                    {{ col.label }}
                    <svg class="ld-table__sort-icon" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M7 3v8M4 8l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                } @else {
                  {{ col.label }}
                }
              </th>
            }
          </tr>
        </thead>
        <tbody>
          @for (row of rows; track $index) {
            <tr class="ld-table__row">
              @for (col of columns; track col.key) {
                <td class="ld-table__td">{{ row[col.key] }}</td>
              }
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .ld-table__wrapper { width: 100%; overflow-x: auto; border: 1px solid var(--divider-divider); border-radius: var(--cntnr-corner-big); }
    .ld-table { width: 100%; border-collapse: collapse; font-family: var(--liga-font-family); color: var(--text-default); background-color: var(--table-bg-defaulttable); }
    .ld-table__caption { caption-side: top; text-align: left; padding: var(--space-150) var(--space-200); font-size: 14px; font-weight: 600; color: var(--text-default); }
    .ld-table__th { text-align: left; font-size: 12px; line-height: 15px; font-weight: 600; letter-spacing: 0.25px; color: var(--text-subtle); background-color: var(--table-bg-secondarytable); padding: var(--space-150) var(--space-200); border-bottom: 1px solid var(--divider-divider); white-space: nowrap; }
    .ld-table__td { font-size: 14px; line-height: 20px; letter-spacing: 0.29px; padding: var(--space-150) var(--space-200); border-bottom: 1px solid var(--divider-divider); vertical-align: middle; }
    .ld-table__row:last-child .ld-table__td { border-bottom: none; }
    .ld-table--zebra tbody .ld-table__row:nth-child(even) .ld-table__td { background-color: var(--table-bg-zebra); }
    .ld-table--hoverable tbody .ld-table__row:hover .ld-table__td { background-color: var(--table-bg-hovertable); }
    .ld-table--size-sm .ld-table__th,
    .ld-table--size-sm .ld-table__td { padding: var(--space-075) var(--space-150); }
    .ld-table__sort-btn { display: inline-flex; align-items: center; gap: var(--space-050); margin: 0; padding: 0; border: none; background: none; font: inherit; color: inherit; letter-spacing: inherit; cursor: pointer; }
    .ld-table__sort-btn:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; border-radius: var(--cntnr-corner-nano); }
    .ld-table__sort-icon { width: 14px; height: 14px; flex: none; color: var(--icon-subtle); }
    .ld-table__sort-btn[data-direction='ascending'] .ld-table__sort-icon,
    .ld-table__sort-btn[data-direction='descending'] .ld-table__sort-icon { color: var(--icon-accent); }
    .ld-table__sort-btn[data-direction='descending'] .ld-table__sort-icon { transform: rotate(180deg); }
  `],
})
export class LdTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() rows: TableRow[] = [];
  @Input() zebra = false;
  @Input() hoverable = false;
  @Input() size: TableSize = 'md';
  @Input() caption?: string;

  @Output() ldSort = new EventEmitter<string>();

  get tableClass(): string {
    return [
      `ld-table--size-${this.size}`,
      this.zebra ? 'ld-table--zebra' : '',
      this.hoverable ? 'ld-table--hoverable' : '',
    ].filter(Boolean).join(' ');
  }
}
