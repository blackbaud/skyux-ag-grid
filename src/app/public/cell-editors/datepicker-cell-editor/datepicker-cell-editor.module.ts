import {
  NgModule
} from '@angular/core';

import {
  SkyDatepickerCellEditorComponent
} from './datepicker-cell-editor.component';

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
export class SkyuxDatepickerCellEditorModule {
}
