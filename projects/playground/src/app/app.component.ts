import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LdTextComponent } from '../../../liga-ds/src/lib/text/text.component';
import { LdHeadingComponent } from '../../../liga-ds/src/lib/heading/heading.component';
import { LdSpinnerComponent } from '../../../liga-ds/src/lib/spinner/spinner.component';
import { LdButtonComponent } from '../../../liga-ds/src/lib/button/button.component';
import { LdIconButtonComponent } from '../../../liga-ds/src/lib/button/icon-button.component';
import { LdDividerComponent } from '../../../liga-ds/src/lib/divider/divider.component';
import { LdBadgeComponent } from '../../../liga-ds/src/lib/badge/badge.component';
import { LdSkeletonComponent } from '../../../liga-ds/src/lib/skeleton/skeleton.component';
import { LdAvatarComponent } from '../../../liga-ds/src/lib/avatar/avatar.component';
import { LdAlertComponent } from '../../../liga-ds/src/lib/alert/alert.component';
import { LdInlineInformComponent } from '../../../liga-ds/src/lib/inline-inform/inline-inform.component';
import { LdInputComponent, LdSearchInputComponent } from '../../../liga-ds/src/lib/input/input.component';
import { LdTextareaComponent } from '../../../liga-ds/src/lib/textarea/textarea.component';
import { LdFieldComponent } from '../../../liga-ds/src/lib/field/field.component';
import { LdCheckboxComponent } from '../../../liga-ds/src/lib/checkbox/checkbox.component';
import { LdRadioComponent, LdRadioGroupComponent } from '../../../liga-ds/src/lib/radio/radio.component';
import { LdSwitchComponent } from '../../../liga-ds/src/lib/switch/switch.component';
import { LdTagComponent } from '../../../liga-ds/src/lib/tag/tag.component';
import { LdChipComponent } from '../../../liga-ds/src/lib/chip/chip.component';
import { LdBreadcrumbsComponent } from '../../../liga-ds/src/lib/breadcrumbs/breadcrumbs.component';
import { LdPaginationComponent } from '../../../liga-ds/src/lib/pagination/pagination.component';
import { LdTabsComponent, LdTabPanelComponent } from '../../../liga-ds/src/lib/tabs/tabs.component';
import { LdTableComponent } from '../../../liga-ds/src/lib/table/table.component';
import { LdTooltipDirective } from '../../../liga-ds/src/lib/tooltip/tooltip.directive';
import { LdPopoverComponent } from '../../../liga-ds/src/lib/popover/popover.component';
import { LdSelectComponent } from '../../../liga-ds/src/lib/select/select.component';
import { LdMenuComponent } from '../../../liga-ds/src/lib/menu/menu.component';
import { LdDatePickerComponent } from '../../../liga-ds/src/lib/date-picker/date-picker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule, DatePipe,
    LdTextComponent, LdHeadingComponent, LdSpinnerComponent,
    LdButtonComponent, LdIconButtonComponent,
    LdDividerComponent, LdBadgeComponent, LdSkeletonComponent, LdAvatarComponent,
    LdAlertComponent, LdInlineInformComponent,
    LdInputComponent, LdSearchInputComponent, LdTextareaComponent, LdFieldComponent,
    LdCheckboxComponent, LdRadioComponent, LdRadioGroupComponent, LdSwitchComponent,
    LdTagComponent, LdChipComponent,
    LdBreadcrumbsComponent, LdPaginationComponent,
    LdTabsComponent, LdTabPanelComponent,
    LdTableComponent,
    LdTooltipDirective, LdPopoverComponent, LdSelectComponent, LdMenuComponent,
    LdDatePickerComponent,
  ],
  template: `
    <section>
      <h3>Text</h3>
      <div class="col">
        <ld-text variant="body-l">Body Large</ld-text>
        <ld-text variant="body-m">Body Medium</ld-text>
        <ld-text variant="body-s">Body Small</ld-text>
        <ld-text color="accent">accent</ld-text>
        <ld-text color="success">success</ld-text>
        <ld-text color="danger">danger</ld-text>
      </div>
    </section>

    <section>
      <h3>Heading</h3>
      <div class="col">
        <ld-heading [level]="1">Heading 1</ld-heading>
        <ld-heading [level]="2">Heading 2</ld-heading>
        <ld-heading [level]="3">Heading 3</ld-heading>
        <ld-heading [level]="4">Heading 4</ld-heading>
      </div>
    </section>

    <section>
      <h3>Spinner</h3>
      <div class="row">
        <ld-spinner size="sm" />
        <ld-spinner size="md" />
        <ld-spinner size="lg" />
        <ld-spinner size="lg" color="accent" />
      </div>
    </section>

    <section>
      <h3>Button</h3>
      <div class="row">
        <ld-button variant="primary">Primary</ld-button>
        <ld-button variant="secondary">Secondary</ld-button>
        <ld-button variant="transparent">Transparent</ld-button>
        <ld-button variant="danger">Danger</ld-button>
      </div>
      <div class="row" style="margin-top:8px; align-items:flex-end">
        <ld-button size="sm">SM</ld-button>
        <ld-button size="md">MD</ld-button>
        <ld-button size="lg">LG</ld-button>
        <ld-button size="xl">XL</ld-button>
        <ld-button [loading]="true">Loading</ld-button>
        <ld-button [disabled]="true">Disabled</ld-button>
      </div>
      <div class="row" style="margin-top:8px">
        <ld-icon-button ariaLabel="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </ld-icon-button>
      </div>
    </section>

    <section>
      <h3>Divider</h3>
      <ld-divider />
      <div class="row" style="height:40px; margin-top:8px">
        <span>Left</span>
        <ld-divider orientation="vertical" />
        <span>Right</span>
      </div>
    </section>

    <section>
      <h3>Badge</h3>
      <div class="row">
        <ld-badge tone="primary" variant="subtle">Primary</ld-badge>
        <ld-badge tone="success" variant="subtle">Success</ld-badge>
        <ld-badge tone="danger" variant="subtle">Danger</ld-badge>
        <ld-badge tone="warning" variant="solid">Warning solid</ld-badge>
        <ld-badge tone="info" variant="solid">Info solid</ld-badge>
        <ld-badge tone="neutral" [dot]="true" />
        <ld-badge tone="success" [dot]="true" />
      </div>
    </section>

    <section>
      <h3>Skeleton</h3>
      <div class="col" style="max-width:300px">
        <ld-skeleton height="20px" />
        <ld-skeleton height="20px" width="60%" />
        <div class="row">
          <ld-skeleton height="40px" [circle]="true" />
          <ld-skeleton height="40px" />
        </div>
        <ld-skeleton [lines]="3" height="16px" />
      </div>
    </section>

    <section>
      <h3>Avatar</h3>
      <div class="row">
        <ld-avatar size="sm" name="Сергій Архіпов" />
        <ld-avatar size="md" name="Іван Петренко" />
        <ld-avatar size="lg" />
        <ld-avatar size="xl" name="Anna M" [square]="true" />
      </div>
    </section>

    <section>
      <h3>Alert</h3>
      <div class="col">
        <ld-alert tone="info">Інформаційне повідомлення</ld-alert>
        <ld-alert tone="success" title="Успіх!">Операцію виконано успішно.</ld-alert>
        <ld-alert tone="warning" [closable]="true">Попередження: перевірте дані.</ld-alert>
        <ld-alert tone="danger" title="Помилка">Щось пішло не так.</ld-alert>
      </div>
    </section>

    <section>
      <h3>InlineInform</h3>
      <div class="col">
        <ld-inline-inform background="grey" title="Заголовок">Текст повідомлення тут</ld-inline-inform>
        <ld-inline-inform type="line" background="warning">Попередження: перевірте дані</ld-inline-inform>
        <ld-inline-inform background="green" [closable]="true">Зелений фон</ld-inline-inform>
      </div>
    </section>

    <section>
      <h3>Input</h3>
      <div class="col" style="max-width:360px">
        <ld-field label="Ім'я" description="Введіть ваше ім'я">
          <ld-input placeholder="Іван Петренко" />
        </ld-field>
        <ld-field label="Пошук">
          <ld-search-input placeholder="Пошук..." />
        </ld-field>
        <ld-field label="З помилкою" error="Поле обов'язкове">
          <ld-input placeholder="Обов'язкове поле" [invalid]="true" />
        </ld-field>
        <ld-textarea [rows]="3" placeholder="Введіть текст..." />
      </div>
    </section>

    <section>
      <h3>Checkbox</h3>
      <div class="col">
        <ld-checkbox [(ngModel)]="checked1">Checkbox unchecked</ld-checkbox>
        <ld-checkbox [(ngModel)]="checked2">Checkbox checked</ld-checkbox>
        <ld-checkbox [indeterminate]="true">Indeterminate</ld-checkbox>
        <ld-checkbox [disabled]="true">Disabled</ld-checkbox>
      </div>
    </section>

    <section>
      <h3>Radio</h3>
      <ld-radio-group [(ngModel)]="radioVal">
        <ld-radio value="a">Варіант A</ld-radio>
        <ld-radio value="b">Варіант B</ld-radio>
        <ld-radio value="c">Варіант C</ld-radio>
      </ld-radio-group>
      <p style="font-size:12px;color:var(--text-subtle)">Вибрано: {{ radioVal }}</p>
    </section>

    <section>
      <h3>Switch</h3>
      <div class="col">
        <ld-switch [(ngModel)]="switchVal" size="sm">Small switch</ld-switch>
        <ld-switch [(ngModel)]="switchVal" size="md">Medium switch ({{ switchVal ? 'on' : 'off' }})</ld-switch>
      </div>
    </section>

    <section>
      <h3>Tag</h3>
      <div class="row">
        <ld-tag tone="primary" variant="subtle">Primary</ld-tag>
        <ld-tag tone="success" variant="subtle">Success</ld-tag>
        <ld-tag tone="danger" variant="solid">Danger solid</ld-tag>
        <ld-tag tone="neutral" variant="subtle" [removable]="true">Removable</ld-tag>
      </div>
    </section>

    <section>
      <h3>Chip</h3>
      <div class="row">
        <ld-chip tone="primary" [selected]="chip1()" (ldToggle)="chip1.set($event)">Primary {{ chip1() ? '✓' : '' }}</ld-chip>
        <ld-chip tone="success" [selected]="chip2()" (ldToggle)="chip2.set($event)">Success</ld-chip>
        <ld-chip tone="neutral" [disabled]="true">Disabled</ld-chip>
      </div>
    </section>

    <section>
      <h3>Breadcrumbs</h3>
      <ld-breadcrumbs [items]="breadcrumbItems" />
    </section>

    <section>
      <h3>Pagination</h3>
      <ld-pagination [count]="10" [page]="page()" (pageChange)="page.set($event)" />
      <p style="font-size:12px;color:var(--text-subtle)">Сторінка: {{ page() }}</p>
    </section>

    <section>
      <h3>Tabs</h3>
      <ld-tabs [tabDefs]="tabDefs" defaultValue="one" variant="pill">
        <ld-tab-panel value="one">Вміст вкладки один</ld-tab-panel>
        <ld-tab-panel value="two">Вміст вкладки два</ld-tab-panel>
        <ld-tab-panel value="three">Вміст вкладки три</ld-tab-panel>
      </ld-tabs>
      <div style="margin-top:24px">
        <ld-tabs [tabDefs]="tabDefs" defaultValue="one" variant="underline">
          <ld-tab-panel value="one">Вміст 1 (underline)</ld-tab-panel>
          <ld-tab-panel value="two">Вміст 2 (underline)</ld-tab-panel>
          <ld-tab-panel value="three">Вміст 3 (underline)</ld-tab-panel>
        </ld-tabs>
      </div>
    </section>

    <section>
      <h3>Table</h3>
      <ld-table [columns]="tableColumns" [rows]="tableRows" [zebra]="true" [hoverable]="true" />
    </section>

    <section>
      <h3>Tooltip</h3>
      <div class="row">
        <ld-button ldTooltip="Hover over me!" tooltipPlacement="top">Top tooltip</ld-button>
        <ld-button ldTooltip="Bottom tooltip" tooltipPlacement="bottom">Bottom</ld-button>
        <ld-button ldTooltip="Left tooltip" tooltipPlacement="left">Left</ld-button>
        <ld-button ldTooltip="Right tooltip" tooltipPlacement="right">Right</ld-button>
      </div>
    </section>

    <section>
      <h3>Popover</h3>
      <ld-popover>
        <ld-button ldPopoverTrigger variant="secondary">Open popover</ld-button>
        <div ldPopoverContent>
          <p style="margin:0 0 8px">Popover content here</p>
          <ld-button size="sm">Action</ld-button>
        </div>
      </ld-popover>
    </section>

    <section>
      <h3>Select</h3>
      <div style="max-width:280px">
        <ld-select [options]="selectOptions" placeholder="Оберіть варіант..." [(ngModel)]="selectVal" />
        <p style="font-size:12px;color:var(--text-subtle);margin-top:4px">Вибрано: {{ selectVal }}</p>
      </div>
    </section>

    <section>
      <h3>Menu</h3>
      <ld-menu [items]="menuItems" (ldSelect)="onMenuSelect($event)">
        <ld-button ldMenuTrigger variant="secondary">Open menu</ld-button>
      </ld-menu>
      <p style="font-size:12px;color:var(--text-subtle)">{{ menuSelected }}</p>
    </section>

    <section>
      <h3>DatePicker</h3>
      <div style="max-width:280px">
        <ld-date-picker [(ngModel)]="dateVal" />
        <p style="font-size:12px;color:var(--text-subtle);margin-top:4px">Вибрано: {{ dateVal | date:'dd.MM.yyyy' }}</p>
      </div>
    </section>
  `,
})
export class AppComponent {
  checked1 = false;
  checked2 = true;
  radioVal = 'a';
  switchVal = true;
  chip1 = signal(false);
  chip2 = signal(true);
  page = signal(1);
  selectVal: string | null = null;
  menuSelected = '';
  dateVal: Date | null = null;

  breadcrumbItems = [
    { label: 'Головна', href: '#' },
    { label: 'Розділ', href: '#' },
    { label: 'Поточна сторінка', current: true },
  ];

  tabDefs = [
    { value: 'one', label: 'Перша', count: 12 },
    { value: 'two', label: 'Друга' },
    { value: 'three', label: 'Третя', disabled: false },
  ];

  tableColumns = [
    { key: 'name', label: 'Ім\'я', sortable: true },
    { key: 'role', label: 'Роль' },
    { key: 'status', label: 'Статус' },
  ];
  tableRows = [
    { name: 'Іван Петренко', role: 'Admin', status: 'Active' },
    { name: 'Марія Коваль', role: 'Editor', status: 'Active' },
    { name: 'Олег Бондар', role: 'Viewer', status: 'Inactive' },
  ];

  selectOptions = [
    { value: 'ua', label: 'Україна' },
    { value: 'pl', label: 'Польща' },
    { value: 'de', label: 'Німеччина' },
    { value: 'fr', label: 'Франція', disabled: true },
  ];

  menuItems = [
    { label: 'Редагувати', value: 'edit' },
    { label: 'Копіювати', value: 'copy' },
    { separator: true, label: '' },
    { label: 'Видалити', value: 'delete', danger: true },
  ];

  onMenuSelect(item: { label: string }): void {
    this.menuSelected = `Вибрано: ${item.label}`;
  }
}
