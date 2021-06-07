import {
  CommonModule
} from '@angular/common';

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
} from './cell-editor-datepicker.component';

@NgModule({
  imports: [
    SkyDatepickerModule,
    FormsModule,
    CommonModule
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
