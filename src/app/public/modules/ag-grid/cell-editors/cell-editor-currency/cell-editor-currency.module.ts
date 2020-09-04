import {
  NgModule
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  SkyAgGridResourcesModule
} from '../../../shared/ag-grid-resources.module';

import {
  SkyAgGridCellEditorCurrencyComponent
} from './cell-editor-currency.component';

import {
  SkyAutonumericModule
} from '@skyux/autonumeric';

@NgModule({
  imports: [
    SkyAgGridResourcesModule,
    FormsModule,
    SkyAutonumericModule
  ],
  declarations: [
    SkyAgGridCellEditorCurrencyComponent
  ],
  exports: [
    SkyAgGridCellEditorCurrencyComponent
  ]
})
export class SkyAgGridCellEditorCurrencyModule {
}
