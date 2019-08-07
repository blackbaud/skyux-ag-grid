import {
  NgModule
} from '@angular/core';

import {
  AgGridModule
} from 'ag-grid-angular';

import {
  SkyAgGridService
} from './ag-grid.service';

import {
  SkyAgGridCellEditorDatepickerComponent,
  SkyCellEditorDatepickerModule,
  SkyAgGridCellEditorNumberComponent,
  SkyCellEditorNumberModule
} from './cell-editors';

import {
  SkyAgGridCellRendererRowSelectorComponent,
  SkyCellRendererRowSelectorModule
} from './cell-renderers';

@NgModule({
  declarations: [],
  imports: [
    AgGridModule,
    SkyCellEditorDatepickerModule,
    SkyCellEditorNumberModule,
    SkyCellRendererRowSelectorModule
  ],
  exports: [
    AgGridModule
  ],
  providers: [
    SkyAgGridService
  ],
  entryComponents: [
    SkyAgGridCellEditorDatepickerComponent,
    SkyAgGridCellEditorNumberComponent,
    SkyAgGridCellRendererRowSelectorComponent
  ]
})
export class SkyAgGridModule { }
