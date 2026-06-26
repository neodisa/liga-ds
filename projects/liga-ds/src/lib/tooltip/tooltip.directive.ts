import {
  Directive,
  Input,
  HostListener,
  OnDestroy,
  ViewContainerRef,
  inject,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  Overlay,
  OverlayRef,
  ConnectionPositionPair,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'ld-tooltip-box',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `<div class="ld-tooltip" role="tooltip">{{ text }}</div>`,
  styles: [`
    .ld-tooltip {
      z-index: 1600; max-width: 260px;
      padding: var(--space-075) var(--space-100);
      border-radius: var(--cntnr-corner-small);
      background-color: var(--color-neutral-solid-900);
      color: var(--text-alternative);
      font-family: var(--liga-font-family);
      font-size: 12px; line-height: 15px; letter-spacing: 0.25px;
      box-shadow: 0 4px 12px rgb(15 23 42 / 0.18);
    }
  `],
})
export class LdTooltipBoxComponent {
  text = '';
}

@Directive({
  selector: '[ldTooltip]',
  standalone: true,
})
export class LdTooltipDirective implements OnDestroy {
  @Input('ldTooltip') content = '';
  @Input() tooltipPlacement: TooltipPlacement = 'top';
  @Input() tooltipDelay = 200;
  @Input() tooltipDisabled = false;

  private overlay = inject(Overlay);
  private vcr = inject(ViewContainerRef);
  private overlayRef?: OverlayRef;
  private openTimer?: ReturnType<typeof setTimeout>;

  @HostListener('mouseenter') @HostListener('focusin') show(): void {
    if (this.tooltipDisabled || !this.content) return;
    this.openTimer = setTimeout(() => this.open(), this.tooltipDelay);
  }

  @HostListener('mouseleave') @HostListener('focusout') @HostListener('keydown.escape') hide(): void {
    clearTimeout(this.openTimer);
    this.close();
  }

  ngOnDestroy(): void { this.close(); clearTimeout(this.openTimer); }

  private open(): void {
    if (this.overlayRef?.hasAttached()) return;
    const el = this.vcr.element.nativeElement as HTMLElement;
    const positions = this.buildPositions();
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().flexibleConnectedTo(el).withPositions(positions),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
    const portal = new ComponentPortal(LdTooltipBoxComponent, this.vcr);
    const ref = this.overlayRef.attach(portal);
    ref.instance.text = this.content;
  }

  private close(): void {
    this.overlayRef?.detach();
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
  }

  private buildPositions(): ConnectionPositionPair[] {
    const fallbacks: Record<string, ConnectionPositionPair[]> = {
      top:    [this.pos('center','top','center','bottom',0,-6), this.pos('center','bottom','center','top',0,6)],
      bottom: [this.pos('center','bottom','center','top',0,6),  this.pos('center','top','center','bottom',0,-6)],
      left:   [this.pos('start','center','end','center',-6,0),   this.pos('end','center','start','center',6,0)],
      right:  [this.pos('end','center','start','center',6,0),    this.pos('start','center','end','center',-6,0)],
    };
    return fallbacks[this.tooltipPlacement] ?? fallbacks['top'];
  }

  private pos(ox: 'start'|'center'|'end', oy: 'top'|'center'|'bottom', ix: 'start'|'center'|'end', iy: 'top'|'center'|'bottom', dx: number, dy: number): ConnectionPositionPair {
    return new ConnectionPositionPair({ originX: ox, originY: oy }, { overlayX: ix, overlayY: iy }, dx, dy);
  }
}
