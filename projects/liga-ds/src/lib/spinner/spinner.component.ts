import { Component, Input, ViewEncapsulation } from '@angular/core';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerColor = 'default' | 'inverse' | 'accent';

@Component({
  selector: 'ld-spinner',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    <svg
      class="ld-spinner__svg"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        class="ld-spinner__track"
        cx="12" cy="12" r="10"
        stroke-width="2.5"
      />
      <path
        class="ld-spinner__arc"
        d="M12 2a10 10 0 0 1 10 10"
        stroke-width="2.5"
        stroke-linecap="round"
      />
    </svg>
  `,
  host: {
    '[class]': '"ld-spinner ld-spinner--" + size + " ld-spinner--color-" + color',
    'role': 'status',
    '[attr.aria-label]': '"Loading"',
  },
  styles: [`
    ld-spinner {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    ld-spinner.ld-spinner--sm { width: 18px; height: 18px; }
    ld-spinner.ld-spinner--md { width: 20px; height: 20px; }
    ld-spinner.ld-spinner--lg { width: 24px; height: 24px; }

    .ld-spinner__svg {
      width: 100%;
      height: 100%;
      animation: ld-spin 0.8s linear infinite;
    }
    .ld-spinner__track {
      stroke: currentColor;
      opacity: 0.25;
    }
    .ld-spinner__arc {
      stroke: currentColor;
    }

    ld-spinner.ld-spinner--color-default { color: var(--text-default); }
    ld-spinner.ld-spinner--color-inverse { color: var(--text-alternative); }
    ld-spinner.ld-spinner--color-accent  { color: var(--color-primary-500); }

    @keyframes ld-spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
  `],
})
export class LdSpinnerComponent {
  @Input() size: SpinnerSize = 'md';
  @Input() color: SpinnerColor = 'default';
}
