import {
  NgModule
} from '@angular/core';

import {
  SkyCheckboxGridCellComponent
} from './checkbox-grid-cell.component';

import {
  SkyCheckboxModule
} from '@skyux/forms';

import {
  FormsModule
} from '@angular/forms';

@NgModule({
  imports: [
    SkyCheckboxModule,
    FormsModule
  ],
  declarations: [
    SkyCheckboxGridCellComponent
  ],
  exports: [
    SkyCheckboxGridCellComponent
  ]
})
export class SkyuxCheckboxGridCellModule {
}
