import {
  NgModule
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  SkyCellEditorNumberComponent
} from '.';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [
    SkyCellEditorNumberComponent
  ],
  exports: [
    SkyCellEditorNumberComponent
  ]
})
export class SkyCellEditorNumberModule {
}
