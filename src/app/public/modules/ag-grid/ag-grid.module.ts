import {
  NgModule
} from '@angular/core';

import {
  SkyCoreAdapterModule
} from '@skyux/core';

import {
  AgGridModule
} from 'ag-grid-angular';

import {
  SkyAgGridService
} from './ag-grid.service';

import {
  SkyAgGridComponent
} from './ag-grid.component';

import {
  SkyAgGridCellEditorAutocompleteComponent,
  SkyAgGridCellEditorAutocompleteModule,
  SkyAgGridCellEditorDatepickerComponent,
  SkyAgGridCellEditorDatepickerModule,
  SkyAgGridCellEditorNumberComponent,
  SkyAgGridCellEditorNumberModule,
  SkyAgGridCellEditorTextComponent,
  SkyAgGridCellEditorTextModule
} from './cell-editors';

import {
  SkyAgGridCellRendererRowSelectorComponent,
  SkyAgGridCellRendererRowSelectorModule
} from './cell-renderers';

@NgModule({
  declarations: [
    SkyAgGridComponent
  ],
  imports: [
    AgGridModule,
    SkyAgGridCellEditorAutocompleteModule,
    SkyAgGridCellEditorDatepickerModule,
    SkyAgGridCellEditorNumberModule,
    SkyAgGridCellRendererRowSelectorModule,
    SkyAgGridCellEditorTextModule,
    SkyCoreAdapterModule
  ],
  exports: [
    SkyAgGridComponent
  ],
  providers: [
    SkyAgGridService
  ],
  entryComponents: [
    SkyAgGridCellEditorAutocompleteComponent,
    SkyAgGridCellEditorDatepickerComponent,
    SkyAgGridCellEditorNumberComponent,
    SkyAgGridCellRendererRowSelectorComponent,
    SkyAgGridCellEditorTextComponent
  ]
})
export class SkyAgGridModule { }
