import {
  NgModule
} from '@angular/core';

import {
  SkyAgGridService
} from './ag-grid.service';

import {
  SkyAgGridCellEditorDatepickerComponent,
  SkyAgGridCellEditorDatepickerModule,
  SkyAgGridCellEditorNumberComponent,
  SkyAgGridCellEditorNumberModule
} from './cell-editors';

import {
  SkyAgGridCellRendererRowSelectorComponent,
  SkyAgGridCellRendererRowSelectorModule
} from './cell-renderers';

@NgModule({
  declarations: [],
  imports: [
    SkyAgGridCellEditorDatepickerModule,
    SkyAgGridCellEditorNumberModule,
    SkyAgGridCellRendererRowSelectorModule
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
