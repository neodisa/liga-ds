import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ContentChild,
  TemplateRef,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { OverlayModule, ConnectionPositionPair } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';

export interface MenuItem {
  label: string;
  value?: string;
  disabled?: boolean;
  danger?: boolean;
  separator?: boolean;
}

export type MenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

const MENU_POSITIONS: Record<MenuPlacement, ConnectionPositionPair[]> = {
  'bottom-start': [new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }, 0, 6)],
  'bottom-end':   [new ConnectionPositionPair({ originX: 'end',   originY: 'bottom' }, { overlayX: 'end',   overlayY: 'top' }, 0, 6)],
  'top-start':    [new ConnectionPositionPair({ originX: 'start', originY: 'top' },    { overlayX: 'start', overlayY: 'bottom' }, 0, -6)],
  'top-end':      [new ConnectionPositionPair({ originX: 'end',   originY: 'top' },    { overlayX: 'end',   overlayY: 'bottom' }, 0, -6)],
};

@Component({
  selector: 'ld-menu',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [OverlayModule, A11yModule, NgTemplateOutlet],
  template: `
    <span cdkOverlayOrigin #trigger="cdkOverlayOrigin" (click)="toggle()">
      <ng-content select="[ldMenuTrigger]" />
    </span>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayHasBackdrop]="true"
      cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
      (backdropClick)="close()"
      (detach)="close()"
    >
      <div class="ld-menu" role="menu" cdkTrapFocus (keydown.escape)="close()">
        @for (item of items; track item.label) {
          @if (item.separator) {
            <div class="ld-menu__separator" role="separator"></div>
          } @else {
            <button
              type="button"
              class="ld-menu__item"
              [class.ld-menu__item--danger]="item.danger"
              role="menuitem"
              [disabled]="item.disabled"
              (click)="selectItem(item)"
            >{{ item.label }}</button>
          }
        }
        <ng-container [ngTemplateOutlet]="contentTpl ?? null" />
      </div>
    </ng-template>
  `,
  styles: [`
    .ld-menu {
      z-index: 1400;
      min-width: 180px;
      max-width: min(320px, calc(100vw - 16px));
      padding: var(--space-050);
      background-color: var(--cntnr-bg-primary-default);
      border: 1px solid var(--dropdown-stroke-default);
      border-radius: var(--cntnr-corner-big);
      box-shadow: 0 10px 30px rgb(15 23 42 / 0.12);
      outline: none;
      font-family: var(--liga-font-family);
    }
    .ld-menu__item {
      display: flex; align-items: center; gap: var(--space-100);
      width: 100%; margin: 0; padding: var(--space-100) var(--space-150);
      border: none; background: transparent;
      border-radius: var(--cntnr-corner-small);
      font-family: inherit; font-size: 14px; line-height: 16px; letter-spacing: 0.29px;
      color: var(--text-default); text-align: left; cursor: pointer;
    }
    .ld-menu__item:hover:not(:disabled) { background-color: var(--highlight-bg, var(--color-primary-100)); }
    .ld-menu__item:disabled { color: var(--text-disabled); cursor: not-allowed; }
    .ld-menu__item--danger { color: var(--text-danger); }
    .ld-menu__item:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: -2px; }
    .ld-menu__separator { height: 1px; margin: var(--space-050) 0; background-color: var(--divider-divider); }
  `],
})
export class LdMenuComponent {
  @Input() items: MenuItem[] = [];
  @Input() placement: MenuPlacement = 'bottom-start';

  @ContentChild('menuContent') contentTpl?: TemplateRef<unknown>;

  @Output() ldSelect = new EventEmitter<MenuItem>();

  isOpen = signal(false);

  get positions(): ConnectionPositionPair[] {
    return MENU_POSITIONS[this.placement] ?? MENU_POSITIONS['bottom-start'];
  }

  toggle(): void { this.isOpen.update(v => !v); }
  close(): void { this.isOpen.set(false); }

  selectItem(item: MenuItem): void {
    if (item.disabled) return;
    this.ldSelect.emit(item);
    this.close();
  }
}
