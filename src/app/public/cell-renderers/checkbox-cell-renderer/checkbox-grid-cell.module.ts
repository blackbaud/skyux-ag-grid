import {
  NgModule
} from '@angular/core';

import {
  SkyuxCheckboxGridCellComponent
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
    SkyuxCheckboxGridCellComponent
  ],
  exports: [
    SkyuxCheckboxGridCellComponent
  ]
})
export class SkyuxCheckboxGridCellModule {
}
