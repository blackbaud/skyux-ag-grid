import {
  NgModule
} from '@angular/core';

import {
  SkyuxCheckboxWrapperComponent
} from './skyux-checkbox-wrapper.component';

import {
  SkyuxCheckboxGridCellComponent
} from '../skyux-checkbox-grid-cell.component';

import {
  SkyCheckboxModule
} from '@skyux/forms';

@NgModule({
  imports: [
    SkyCheckboxModule
  ],
  declarations: [
    SkyuxCheckboxWrapperComponent,
    SkyuxCheckboxGridCellComponent
  ],
  exports: [
    SkyuxCheckboxGridCellComponent
  ]
})
export class SkyuxCheckboxWrapperModule {
}
