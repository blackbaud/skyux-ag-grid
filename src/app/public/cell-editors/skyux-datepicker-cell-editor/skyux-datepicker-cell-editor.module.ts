import {
  NgModule
} from '@angular/core';

import {
  SkyuxDatepickerCellEditorComponent
} from './skyux-datepicker-cell-editor.component';

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
    SkyuxDatepickerCellEditorComponent
  ],
  exports: [
    SkyuxDatepickerCellEditorComponent
  ]
})
export class SkyuxDatepickerCellEditorModule {
}
