import {
  NgModule
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  SkyCellEditorNumberComponent
} from '../cell-editor-number';

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
