import { CommonModule } from '@angular/common';
import {
  NgModule
} from '@angular/core';
import { SkyStatusIndicatorModule } from '@skyux/indicators';
import { SkyPopoverModule } from '@skyux/popovers';
import { SkyAgGridCellValidatorTooltipComponent } from './ag-grid-cell-validator-tooltip.component';

import {
  SkyAgGridCellValidatorDirective
} from './ag-grid-cell-validator.directive';

@NgModule({
  declarations: [
    SkyAgGridCellValidatorDirective,
    SkyAgGridCellValidatorTooltipComponent
  ],
  exports: [
    SkyAgGridCellValidatorDirective,
    SkyAgGridCellValidatorTooltipComponent
  ],
  imports: [
    CommonModule,
    SkyPopoverModule,
    SkyStatusIndicatorModule
  ]
})
export class SkyAgGridCellValidatorModule {}
