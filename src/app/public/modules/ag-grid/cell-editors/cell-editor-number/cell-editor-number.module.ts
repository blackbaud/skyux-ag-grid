import {
  NgModule
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  SkyAgGridResourcesModule
} from '../../../shared';

import {
  SkyCellEditorNumberComponent
} from '../cell-editor-number';

@NgModule({
  imports: [
    SkyAgGridResourcesModule,
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
