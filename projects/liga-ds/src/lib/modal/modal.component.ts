import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  inject,
  TemplateRef,
  ViewContainerRef,
  OnDestroy,
} from '@angular/core';
import { Dialog, DialogModule, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { A11yModule } from '@angular/cdk/a11y';
import { NgTemplateOutlet } from '@angular/common';
import { LdButtonComponent } from '../button/button.component';

@Component({
  selector: 'ld-modal-content',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [A11yModule, NgTemplateOutlet, LdButtonComponent],
  template: `
    <div class="ld-modal" cdkTrapFocus cdkTrapFocusAutoCapture role="dialog" aria-modal="true" [attr.aria-labelledby]="data?.titleId">
      @if (data?.title) {
        <h2 class="ld-modal__title" [id]="data?.titleId">{{ data.title }}</h2>
      }
      @if (data?.description) {
        <p class="ld-modal__desc">{{ data.description }}</p>
      }
      <button type="button" class="ld-modal__close" aria-label="Close" (click)="dialogRef.close()">
        <svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
      </button>
      <ng-container *ngTemplateOutlet="data?.contentTpl" />
    </div>
  `,
  styles: [`
    .ld-modal {
      position: relative;
      width: 100%;
      max-width: 480px;
      max-height: calc(100vh - 64px);
      overflow: auto;
      padding: var(--space-400);
      background-color: var(--cntnr-bg-primary-default);
      border-radius: var(--cntnr-corner-large);
      box-shadow: 0 20px 60px rgb(15 23 42 / 0.25);
      color: var(--text-default);
      font-family: var(--liga-font-family);
      outline: none;
    }
    .ld-modal__title {
      margin: 0 var(--space-600) var(--space-100) 0;
      font-size: 20px; line-height: 24px; font-weight: 600; color: var(--text-default);
    }
    .ld-modal__desc {
      margin: 0 0 var(--space-300);
      font-size: 14px; line-height: 20px; letter-spacing: 0.29px; color: var(--text-subtle);
    }
    .ld-modal__close {
      position: absolute; top: var(--space-200); right: var(--space-200);
      display: inline-flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; padding: 0;
      border: none; background: transparent;
      color: var(--icon-subtle); border-radius: var(--cntnr-corner-infinity);
      cursor: pointer; transition: background-color 120ms ease, color 120ms ease;
    }
    .ld-modal__close:hover { background-color: var(--cntnr-bg-third-hover); color: var(--icon-default); }
    .ld-modal__close:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }
    .ld-modal__close svg { width: 14px; height: 14px; display: block; }
  `],
})
export class LdModalContentComponent {
  dialogRef = inject(DialogRef);
  data: { title?: string; description?: string; titleId?: string; contentTpl?: TemplateRef<unknown> } = inject(DIALOG_DATA);
}

@Component({
  selector: 'ld-modal',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [DialogModule],
  template: `
    <span (click)="open()">
      <ng-content select="[ldModalTrigger]" />
    </span>
    <ng-template #contentTpl>
      <ng-content />
    </ng-template>
  `,
  styles: [`
    .cdk-overlay-backdrop.ld-modal-backdrop {
      background-color: var(--blanket-popup-background, rgb(0 0 0 / 0.5));
    }
  `],
})
export class LdModalComponent implements OnDestroy {
  @Input() title?: string;
  @Input() description?: string;
  @Input() contentTpl?: TemplateRef<unknown>;

  @Output() ldClose = new EventEmitter<void>();

  private dialog = inject(Dialog);
  private vcr = inject(ViewContainerRef);
  private dialogRef?: DialogRef<unknown, LdModalContentComponent>;

  open(): void {
    this.dialogRef = this.dialog.open<unknown, unknown, LdModalContentComponent>(LdModalContentComponent, {
      viewContainerRef: this.vcr,
      backdropClass: 'ld-modal-backdrop',
      panelClass: 'ld-modal-panel',
      data: {
        title: this.title,
        description: this.description,
        titleId: `ld-modal-title-${Math.random().toString(36).slice(2, 7)}`,
        contentTpl: this.contentTpl,
      },
    });
    this.dialogRef!.closed.subscribe(() => this.ldClose.emit());
  }

  close(): void { this.dialogRef?.close(); }

  ngOnDestroy(): void { this.dialogRef?.close(); }
}
