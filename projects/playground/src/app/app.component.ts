import { Component } from '@angular/core';
import { LdTextComponent } from '../../../liga-ds/src/lib/text/text.component';
import { LdHeadingComponent } from '../../../liga-ds/src/lib/heading/heading.component';
import { LdSpinnerComponent } from '../../../liga-ds/src/lib/spinner/spinner.component';
import { LdButtonComponent } from '../../../liga-ds/src/lib/button/button.component';
import { LdIconButtonComponent } from '../../../liga-ds/src/lib/button/icon-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LdTextComponent,
    LdHeadingComponent,
    LdSpinnerComponent,
    LdButtonComponent,
    LdIconButtonComponent,
  ],
  template: `
    <section>
      <h3>Components · Text</h3>

      <p class="label">body-l / body-m / body-s</p>
      <div class="col">
        <ld-text variant="body-l">Body Large — Lato 16/24 Regular</ld-text>
        <ld-text variant="body-m">Body Medium — Lato 14/20 Regular</ld-text>
        <ld-text variant="body-s">Body Small — Lato 12/16 Regular</ld-text>
      </div>

      <p class="label">labels</p>
      <div class="col">
        <ld-text variant="label-l">Label Large — 16/20 Semibold</ld-text>
        <ld-text variant="label-m">Label Medium — 14/16 Semibold</ld-text>
        <ld-text variant="label-s">Label Small — 12/16 Bold</ld-text>
      </div>

      <p class="label">colors</p>
      <div class="col">
        <ld-text color="default">default</ld-text>
        <ld-text color="subtle">subtle</ld-text>
        <ld-text color="subtlest">subtlest</ld-text>
        <ld-text color="accent">accent</ld-text>
        <ld-text color="success">success</ld-text>
        <ld-text color="warning">warning</ld-text>
        <ld-text color="danger">danger</ld-text>
      </div>
    </section>

    <section>
      <h3>Components · Heading</h3>
      <div class="col">
        <ld-heading [level]="1">Heading 1 — 40px Bold</ld-heading>
        <ld-heading [level]="2">Heading 2 — 32px Bold</ld-heading>
        <ld-heading [level]="3">Heading 3 — 24px Bold</ld-heading>
        <ld-heading [level]="4">Heading 4 — 20px Bold</ld-heading>
        <ld-heading [level]="5">Heading 5 — 16px Bold</ld-heading>
        <ld-heading [level]="6">Heading 6 — 14px Bold</ld-heading>
      </div>
    </section>

    <section>
      <h3>Components · Spinner</h3>
      <div class="row">
        <ld-spinner size="sm" />
        <ld-spinner size="md" />
        <ld-spinner size="lg" />
        <ld-spinner size="lg" color="accent" />
      </div>
    </section>

    <section>
      <h3>Components · Button — variants</h3>
      <div class="row">
        <ld-button variant="primary">Primary</ld-button>
        <ld-button variant="secondary">Secondary</ld-button>
        <ld-button variant="transparent">Transparent</ld-button>
        <ld-button variant="danger">Danger</ld-button>
        <ld-button variant="danger-secondary">Danger secondary</ld-button>
        <ld-button variant="danger-transparent">Danger ghost</ld-button>
      </div>

      <p class="label">sizes</p>
      <div class="row" style="align-items: flex-end">
        <ld-button size="sm">Small 24</ld-button>
        <ld-button size="md">Medium 32</ld-button>
        <ld-button size="lg">Large 40</ld-button>
        <ld-button size="xl">XLarge 48</ld-button>
      </div>

      <p class="label">states</p>
      <div class="row">
        <ld-button [loading]="true">Loading</ld-button>
        <ld-button [disabled]="true">Disabled</ld-button>
        <ld-button [selected]="true">Selected</ld-button>
        <ld-button [fullWidth]="true" style="max-width: 200px">Full width</ld-button>
      </div>
    </section>

    <section>
      <h3>Components · IconButton</h3>
      <div class="row">
        <ld-icon-button ariaLabel="Close" variant="transparent">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </ld-icon-button>
        <ld-icon-button ariaLabel="Add" variant="primary" size="sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </ld-icon-button>
        <ld-icon-button ariaLabel="Delete" variant="danger" size="md">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>
          </svg>
        </ld-icon-button>
        <ld-icon-button ariaLabel="Loading" [loading]="true" />
      </div>
    </section>
  `,
})
export class AppComponent {}
