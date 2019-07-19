import {
  NgModule
} from '@angular/core';

import {
  AgGridModule
} from 'ag-grid-angular';

import {
  SkyCellRendererRowSelectorComponent
} from './cell-renderers/cell-renderer-row-selector/cell-renderer-row-selector.component';

import {
  SkyCellEditorNumberComponent
} from './cell-editors/cell-editor-number/cell-editor-number.component';

import {
  SkyCellEditorDatepickerComponent
} from './cell-editors/cell-editor-datepicker/cell-editor-datepicker.component';

import {
  SkyCellRendererRowSelectorModule
} from './cell-renderers/cell-renderer-row-selector/cell-renderer-row-selector.module';

import {
  SkyCellEditorDatepickerModule
} from './cell-editors/cell-editor-datepicker/cell-editor-datepicker.module';

import {
  SkyCellEditorNumberModule
} from './cell-editors/cell-editor-number/cell-editor-number.module';

import {
  SkyAgGridService
} from './ag-grid.service';

@NgModule({
  declarations: [],
  imports: [
    AgGridModule,
    SkyCellRendererRowSelectorModule,
    SkyCellEditorDatepickerModule,
    SkyCellEditorNumberModule
  ],
  exports: [
    AgGridModule
  ],
  providers: [
    SkyAgGridService
  ],
  entryComponents: [
    SkyCellRendererRowSelectorComponent,
    SkyCellEditorNumberComponent,
    SkyCellEditorDatepickerComponent
  ]
})
export class SkyAgGridModule { }
