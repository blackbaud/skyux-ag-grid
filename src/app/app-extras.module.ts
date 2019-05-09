import {
  NgModule
} from '@angular/core';

import {
  AgGridModule
} from 'ag-grid-angular';

import {
  ReadonlyGridComponent
} from './visual/readonly-grid/readonly-grid.component';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyCheckboxModule,
  SkyRadioModule
} from '@skyux/forms';

import {
  SkyuxCheckboxGridCellComponent
} from './public/cell-renderers/skyux-checkbox-cell-renderer/skyux-checkbox-grid-cell.component';

import {
  SkyuxCheckboxWrapperModule
} from './public/cell-renderers/skyux-checkbox-cell-renderer/skyux-checkbox-wrapper/skyux-checkbox-wrapper.module';

import {
  SkyToolbarModule
} from '@skyux/layout';

@NgModule({
  declarations: [],
  imports: [
    AgGridModule.withComponents([SkyuxCheckboxGridCellComponent]),
    SkyuxCheckboxWrapperModule
  ],
  exports: [
    AgGridModule,
    SkyAppLinkModule,
    SkyCheckboxModule,
    SkyRadioModule,
    SkyToolbarModule
  ],
  entryComponents: [
    ReadonlyGridComponent
  ]
})
export class AppExtrasModule { }
