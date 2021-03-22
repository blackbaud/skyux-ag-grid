import {
  NgModule
} from '@angular/core';

import {
  SkyAgGridResourcesModule
} from '../../../shared/ag-grid-resources.module';

import {
  SkyAgGridCellRendererNumericComponent
} from './cell-renderer-numeric.component';

import {
  SkyNumericModule
} from '@skyux/core';

@NgModule({
  imports: [
    SkyAgGridResourcesModule,
    SkyNumericModule
  ],
  declarations: [
    SkyAgGridCellRendererNumericComponent
  ],
  exports: [
    SkyAgGridCellRendererNumericComponent
  ]
})
export class SkyAgGridCellRendererNumericModule {}
