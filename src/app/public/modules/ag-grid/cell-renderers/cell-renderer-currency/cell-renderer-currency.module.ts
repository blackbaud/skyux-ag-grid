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
  SkyAgGridCellRendererCurrencyComponent
} from './cell-renderer-currency.component';

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
    SkyAgGridCellRendererCurrencyComponent
  ],
  exports: [
    SkyAgGridCellRendererCurrencyComponent
  ]
})
export class SkyAgGridCellRendererCurrencyModule {
}
