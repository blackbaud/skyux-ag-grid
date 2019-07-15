import {
  NgModule
} from '@angular/core';

import {
  SkyCellEditorNumberComponent
} from './cell-editor-number.component';

import {
  FormsModule
} from '@angular/forms';

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
