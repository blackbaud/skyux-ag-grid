import {
  NgModule
} from '@angular/core';

import {
  SkyCellEditorDatepickerComponent
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
    SkyCellEditorDatepickerComponent
  ],
  exports: [
    SkyCellEditorDatepickerComponent
  ]
})
export class SkyCellEditorDatepickerModule {
}
