import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ContentChild,
  TemplateRef,
  ViewChild,
  ElementRef,
  OnDestroy,
  inject,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import {
  Overlay,
  OverlayRef,
  ConnectionPositionPair,
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  OverlayModule,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ViewContainerRef } from '@angular/core';

export type PopoverPlacement = 'top' | 'bottom' | 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

const POSITION_MAP: Record<string, ConnectionPositionPair[]> = {
  'bottom-start': [new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }, 0, 6)],
  'bottom-end':   [new ConnectionPositionPair({ originX: 'end',   originY: 'bottom' }, { overlayX: 'end',   overlayY: 'top' }, 0, 6)],
  'top-start':    [new ConnectionPositionPair({ originX: 'start', originY: 'top' },    { overlayX: 'start', overlayY: 'bottom' }, 0, -6)],
  'top-end':      [new ConnectionPositionPair({ originX: 'end',   originY: 'top' },    { overlayX: 'end',   overlayY: 'bottom' }, 0, -6)],
  'bottom':       [new ConnectionPositionPair({ originX: 'center', originY: 'bottom' }, { overlayX: 'center', overlayY: 'top' }, 0, 6)],
  'top':          [new ConnectionPositionPair({ originX: 'center', originY: 'top' },    { overlayX: 'center', overlayY: 'bottom' }, 0, -6)],
};

@Component({
  selector: 'ld-popover',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [OverlayModule, NgTemplateOutlet],
  template: `
    <span cdkOverlayOrigin #trigger="cdkOverlayOrigin" (click)="toggle()">
      <ng-content select="[ldPopoverTrigger]" />
    </span>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="isOpen"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayHasBackdrop]="true"
      cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
      (backdropClick)="close()"
      (detach)="close()"
    >
      <div class="ld-popover__content" role="dialog" [attr.aria-label]="ariaLabel">
        <ng-content select="[ldPopoverContent]" />
      </div>
    </ng-template>
  `,
  styles: [`
    .ld-popover__content {
      z-index: 1400;
      min-width: 180px;
      max-width: min(360px, calc(100vw - 16px));
      padding: var(--space-200);
      background-color: var(--cntnr-bg-primary-default);
      border: 1px solid var(--dropdown-stroke-default);
      border-radius: var(--cntnr-corner-big);
      box-shadow: 0 10px 30px rgb(15 23 42 / 0.12);
      color: var(--text-default);
      font-family: var(--liga-font-family);
      outline: none;
    }
  `],
})
export class LdPopoverComponent {
  @Input() placement: PopoverPlacement = 'bottom-start';
  @Input() ariaLabel?: string;
  @Input() open?: boolean;

  @Output() openChange = new EventEmitter<boolean>();

  isOpen = false;

  get positions(): ConnectionPositionPair[] {
    return POSITION_MAP[this.placement] ?? POSITION_MAP['bottom-start'];
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.openChange.emit(this.isOpen);
  }

  close(): void {
    this.isOpen = false;
    this.openChange.emit(false);
  }
}
