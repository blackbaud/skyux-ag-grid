import {
  NgModule
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  SkyDatepickerModule
} from '@skyux/datetime';

import {
  SkyAgGridCellEditorDatepickerComponent
} from '../cell-editor-datepicker';

@NgModule({
  imports: [
    FormsModule,
    SkyDatepickerModule
  ],
  declarations: [
    SkyAgGridCellEditorDatepickerComponent
  ],
  exports: [
    SkyAgGridCellEditorDatepickerComponent
  ]
})
export class SkyAgGridCellEditorDatepickerModule {
}
