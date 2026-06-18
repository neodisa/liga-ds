import { Component, Input, ViewEncapsulation, signal } from '@angular/core';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

function initials(name?: string): string {
  if (!name) return '';
  return name.trim().split(/\s+/).slice(0, 2).map(p => p[0]?.toUpperCase() ?? '').join('');
}

@Component({
  selector: 'ld-avatar',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (showImage()) {
      <img class="ld-avatar__img" [src]="src" alt="" (error)="onImgError()" />
    } @else if (text) {
      <span aria-hidden="true">{{ text }}</span>
    } @else {
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="60%" height="60%">
        <circle cx="12" cy="8" r="4" fill="currentColor" />
        <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" fill="currentColor" />
      </svg>
    }
  `,
  host: {
    'role': 'img',
    '[attr.aria-label]': 'ariaLabel',
    '[class]': 'hostClass',
  },
  styles: [`
    ld-avatar {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: none;
      overflow: hidden;
      background-color: var(--cntnr-bg-third-default);
      color: var(--text-subtle);
      font-family: var(--liga-font-family);
      font-weight: 600;
      line-height: 1;
      border-radius: var(--cntnr-corner-infinity);
      user-select: none;
    }
    ld-avatar.ld-avatar--square { border-radius: var(--cntnr-corner-normal); }
    .ld-avatar__img { width: 100%; height: 100%; object-fit: cover; display: block; }
    ld-avatar.ld-avatar--sm { width: 24px; height: 24px; font-size: 11px; }
    ld-avatar.ld-avatar--md { width: 32px; height: 32px; font-size: 12px; }
    ld-avatar.ld-avatar--lg { width: 40px; height: 40px; font-size: 14px; }
    ld-avatar.ld-avatar--xl { width: 48px; height: 48px; font-size: 16px; }
  `],
})
export class LdAvatarComponent {
  @Input() src?: string;
  @Input() alt?: string;
  @Input() name?: string;
  @Input() size: AvatarSize = 'md';
  @Input() square = false;

  private _failed = signal(false);

  get showImage(): () => boolean {
    return () => !!this.src && !this._failed();
  }
  get text(): string { return initials(this.name); }
  get ariaLabel(): string | undefined { return this.alt ?? this.name; }
  get hostClass(): string {
    return ['ld-avatar', `ld-avatar--${this.size}`, this.square ? 'ld-avatar--square' : ''].filter(Boolean).join(' ');
  }

  onImgError(): void { this._failed.set(true); }
}
