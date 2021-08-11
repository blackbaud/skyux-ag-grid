import {
  NgModule
} from '@angular/core';

import {
  SkyAgGridCellValidatorDirective
} from './ag-grid-cell-validator.directive';

@NgModule({
  declarations: [
    SkyAgGridCellValidatorDirective
  ],
  exports: [
    SkyAgGridCellValidatorDirective
  ]
})
export class SkyAgGridCellValidatorModule {}
