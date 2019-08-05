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
  SkyCellEditorDatepickerComponent,
  SkyCellEditorDatepickerModule,
  SkyCellEditorNumberComponent,
  SkyCellEditorNumberModule
} from './cell-editors';

import {
  SkyCellRendererRowSelectorComponent,
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
    SkyCellEditorDatepickerComponent,
    SkyCellEditorNumberComponent,
    SkyCellRendererRowSelectorComponent
  ]
})
export class SkyAgGridModule { }
