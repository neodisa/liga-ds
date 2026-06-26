import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ld-skeleton',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (lines && lines > 1) {
      @for (i of lineItems; track i) {
        <span
          class="ld-skeleton__bone"
          [style.height]="dimHeight"
          [style.width]="i === lines - 1 ? '60%' : '100%'"
        ></span>
      }
    }
  `,
  host: {
    'aria-hidden': 'true',
    '[class]': 'hostClass',
    '[style.width]'  : 'resolvedWidth',
    '[style.height]' : 'lines && lines > 1 ? null : dimHeight',
  },
  styles: [`
    @keyframes ld-skeleton-shimmer {
      from { background-position: 200% 0; }
      to   { background-position: -200% 0; }
    }
    .ld-skeleton-bone,
    ld-skeleton:not(.ld-skeleton--lines) {
      display: block;
      background-color: var(--skeleton-default);
      background-image: linear-gradient(
        90deg,
        var(--skeleton-default) 25%,
        var(--skeleton-shimmer) 50%,
        var(--skeleton-default) 75%
      );
      background-size: 200% 100%;
      animation: ld-skeleton-shimmer 1.4s linear infinite;
      border-radius: var(--cntnr-corner-small);
    }
    ld-skeleton.ld-skeleton--circle { border-radius: var(--cntnr-corner-infinity); }
    ld-skeleton.ld-skeleton--lines {
      display: flex;
      flex-direction: column;
      gap: var(--space-100);
      background: none;
      animation: none;
    }
    .ld-skeleton__bone {
      display: block;
      background-color: var(--skeleton-default);
      background-image: linear-gradient(
        90deg,
        var(--skeleton-default) 25%,
        var(--skeleton-shimmer) 50%,
        var(--skeleton-default) 75%
      );
      background-size: 200% 100%;
      animation: ld-skeleton-shimmer 1.4s linear infinite;
      border-radius: var(--cntnr-corner-small);
    }
    @media (prefers-reduced-motion: reduce) {
      ld-skeleton, .ld-skeleton__bone { animation: none; }
    }
  `],
})
export class LdSkeletonComponent {
  @Input() width?: string | number;
  @Input() height: string | number = '1em';
  @Input() circle = false;
  @Input() lines?: number;

  get lineItems(): number[] {
    return this.lines ? Array.from({ length: this.lines }, (_, i) => i) : [];
  }
  get dimHeight(): string {
    const h = this.height;
    return typeof h === 'number' ? `${h}px` : h;
  }
  get resolvedWidth(): string | null {
    if (this.lines && this.lines > 1) return null;
    if (this.width != null) return typeof this.width === 'number' ? `${this.width}px` : this.width;
    if (this.circle) return this.dimHeight;
    return '100%';
  }
  get hostClass(): string {
    const cls = ['ld-skeleton'];
    if (this.circle) cls.push('ld-skeleton--circle');
    if (this.lines && this.lines > 1) cls.push('ld-skeleton--lines');
    return cls.join(' ');
  }
}
