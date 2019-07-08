import {
  NgModule
} from '@angular/core';

import {
  SkyDatepickerCellEditorComponent
} from './cell-editor-datepicker.component';

import {
  SkyDatepickerModule
} from '@skyux/datetime';

import {
  FormsModule
} from '@angular/forms';

@NgModule({
  imports: [
    SkyDatepickerModule,
    FormsModule
  ],
  declarations: [
    SkyDatepickerCellEditorComponent
  ],
  exports: [
    SkyDatepickerCellEditorComponent
  ]
})
export class SkyCellEditorDatepickerModule {
}
