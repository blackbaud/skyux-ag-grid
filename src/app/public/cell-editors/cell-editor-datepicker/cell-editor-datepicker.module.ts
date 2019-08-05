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
  SkyCellEditorDatepickerComponent
} from '.';

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
