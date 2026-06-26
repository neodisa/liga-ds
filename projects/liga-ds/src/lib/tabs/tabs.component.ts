import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ContentChildren,
  QueryList,
  AfterContentInit,
  signal,
} from '@angular/core';

export type TabsVariant = 'pill' | 'underline';
export type TabsSize = 'sm' | 'md';

@Component({
  selector: 'ld-tab-panel',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `@if (active) { <div class="ld-tab-panel" role="tabpanel" [attr.id]="'panel-' + value" [attr.aria-labelledby]="'tab-' + value" tabindex="0"><ng-content /></div> }`,
  styles: [`.ld-tab-panel { margin-top: var(--space-300); color: var(--text-default); font-family: var(--liga-font-family); } .ld-tab-panel:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; border-radius: var(--cntnr-corner-small); }`],
})
export class LdTabPanelComponent {
  @Input({ required: true }) value!: string;
  active = false;
}

@Component({
  selector: 'ld-tabs',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [LdTabPanelComponent],
  template: `
    <div class="ld-tabs__list" role="tablist" [attr.data-variant]="variant" [attr.data-orientation]="orientation" (keydown)="onKeyDown($event)">
      @for (tab of tabDefs; track tab.value) {
        <button
          type="button"
          role="tab"
          class="ld-tabs__tab"
          [attr.id]="'tab-' + tab.value"
          [attr.aria-controls]="'panel-' + tab.value"
          [attr.aria-selected]="activeValue === tab.value"
          [attr.data-selected]="activeValue === tab.value || null"
          [attr.data-variant]="variant"
          [attr.data-size]="size"
          [disabled]="tab.disabled"
          [tabIndex]="activeValue === tab.value ? 0 : -1"
          (click)="select(tab.value)"
        >
          {{ tab.label }}
          @if (tab.count != null) {
            <span class="ld-tabs__count">{{ tab.count }}</span>
          }
        </button>
      }
    </div>
    <ng-content select="ld-tab-panel" />
  `,
  styles: [`
    .ld-tabs__list {
      display: inline-flex; align-items: center; gap: var(--space-050);
      font-family: var(--liga-font-family);
    }
    .ld-tabs__list[data-variant='underline'] { gap: var(--space-100); border-bottom: 1px solid var(--divider-divider); }
    .ld-tabs__list[data-orientation='vertical'] { flex-direction: column; align-items: stretch; }
    .ld-tabs__list[data-orientation='vertical'][data-variant='underline'] { border-bottom: none; border-inline-start: 1px solid var(--divider-divider); }

    .ld-tabs__tab {
      appearance: none; border: none; background: transparent; cursor: pointer;
      display: inline-flex; align-items: center; gap: var(--space-100);
      font-family: inherit; font-size: 14px; line-height: 16px; font-weight: 500; letter-spacing: 0.15px;
      color: var(--text-subtle); white-space: nowrap;
      transition: background-color 160ms ease, color 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
    }
    .ld-tabs__tab[data-size='sm'] { font-size: 13px; gap: var(--space-075); }
    .ld-tabs__tab:disabled { color: var(--text-disabled); cursor: not-allowed; }
    .ld-tabs__tab:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }

    /* pill */
    .ld-tabs__tab[data-variant='pill'] { border-radius: var(--tabs-corner-tabs-corner); padding: var(--space-100) var(--space-200); }
    .ld-tabs__tab[data-variant='pill'][data-size='sm'] { padding: var(--space-075) var(--space-150); }
    .ld-tabs__tab[data-variant='pill']:hover:not(:disabled):not([data-selected]) { background-color: var(--color-primary-100); color: var(--text-default); }
    .ld-tabs__tab[data-variant='pill'][data-selected] { background-color: var(--btn-bg-primary-active); color: var(--text-alternative); }
    .ld-tabs__tab[data-variant='pill'][data-selected] .ld-tabs__count { background-color: rgb(255 255 255 / 0.22); color: var(--text-alternative); }

    /* underline */
    .ld-tabs__tab[data-variant='underline'] { padding: var(--space-100) var(--space-100); border-radius: var(--cntnr-corner-small, 6px) var(--cntnr-corner-small, 6px) 0 0; border-bottom: 2px solid transparent; margin-bottom: -1px; }
    .ld-tabs__tab[data-variant='underline'][data-size='sm'] { padding: var(--space-075) var(--space-100); }
    .ld-tabs__tab[data-variant='underline']:hover:not(:disabled):not([data-selected]) { color: var(--text-default); }
    .ld-tabs__tab[data-variant='underline'][data-selected] { color: var(--text-active); border-bottom-color: var(--color-primary-500); }
    .ld-tabs__tab[data-variant='underline'][data-selected] .ld-tabs__count { background-color: var(--color-primary-100); color: var(--text-accent); }

    .ld-tabs__count {
      display: inline-flex; align-items: center; justify-content: center;
      min-width: 20px; height: 20px; padding: 0 var(--space-075);
      border-radius: var(--corner-radius-infinity);
      background-color: var(--color-primary-100); color: var(--text-default);
      font-size: 12px; line-height: 1; font-weight: 600;
    }
  `],
})
export class LdTabsComponent implements AfterContentInit {
  @Input() value?: string;
  @Input() defaultValue?: string;
  @Input() variant: TabsVariant = 'pill';
  @Input() size: TabsSize = 'md';
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() tabDefs: Array<{ value: string; label: string; disabled?: boolean; count?: number | string }> = [];

  @Output() valueChange = new EventEmitter<string>();

  @ContentChildren(LdTabPanelComponent) panels!: QueryList<LdTabPanelComponent>;

  activeValue?: string;

  ngAfterContentInit(): void {
    this.activeValue = this.value ?? this.defaultValue ?? this.tabDefs[0]?.value;
    this.syncPanels();
  }

  select(v: string): void {
    this.activeValue = v;
    this.valueChange.emit(v);
    this.syncPanels();
  }

  private syncPanels(): void {
    this.panels?.forEach(p => p.active = p.value === this.activeValue);
  }

  onKeyDown(e: KeyboardEvent): void {
    const isH = this.orientation === 'horizontal';
    const keys = {
      next: isH ? 'ArrowRight' : 'ArrowDown',
      prev: isH ? 'ArrowLeft' : 'ArrowUp',
    };
    const tabs = (e.currentTarget as HTMLElement).querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)');
    const idx = Array.from(tabs).indexOf(document.activeElement as HTMLButtonElement);
    if (idx === -1) return;
    let next = idx;
    if (e.key === keys.next) next = (idx + 1) % tabs.length;
    else if (e.key === keys.prev) next = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;
    e.preventDefault();
    tabs[next]?.focus();
    tabs[next]?.click();
  }
}
