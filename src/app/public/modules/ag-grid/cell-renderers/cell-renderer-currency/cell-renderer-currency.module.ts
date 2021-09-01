import { CommonModule } from '@angular/common';
import {
  NgModule
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  SkyNumericModule
} from '@skyux/core';

import {
  SkyAgGridResourcesModule
} from '../../../shared/ag-grid-resources.module';

import {
  SkyAgGridCellRendererCurrencyComponent
} from './cell-renderer-currency.component';

import {
  SkyAgGridCellValidatorModule
} from '../../cell-validator/ag-grid-cell-validator.module';

@NgModule({
  imports: [
    CommonModule,
    SkyAgGridResourcesModule,
    SkyAgGridCellValidatorModule,
    FormsModule,
    SkyNumericModule
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
