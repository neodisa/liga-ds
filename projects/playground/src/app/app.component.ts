import { Component } from '@angular/core';
import { LdTextComponent } from '../../../liga-ds/src/lib/text/text.component';
import { LdHeadingComponent } from '../../../liga-ds/src/lib/heading/heading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LdTextComponent, LdHeadingComponent],
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
  `,
})
export class AppComponent {}
