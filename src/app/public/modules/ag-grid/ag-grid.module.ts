import {
  NgModule
} from '@angular/core';

import {
  SkyCoreAdapterModule,
  SkyViewkeeperModule
} from '@skyux/core';

import {
  AgGridModule
} from 'ag-grid-angular';

import {
  SkyAgGridService
} from './ag-grid.service';

import {
  SkyAgGridWrapperComponent
} from './ag-grid-wrapper.component';

import {
  SkyAgGridWrapperAdapterService
} from './ag-grid-wrapper-adapter.service';

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
    SkyAgGridWrapperComponent
  ],
  imports: [
    AgGridModule,
    SkyAgGridCellEditorAutocompleteModule,
    SkyAgGridCellEditorDatepickerModule,
    SkyAgGridCellEditorNumberModule,
    SkyAgGridCellRendererRowSelectorModule,
    SkyAgGridCellEditorTextModule,
    SkyCoreAdapterModule,
    SkyViewkeeperModule
  ],
  exports: [
    SkyAgGridWrapperComponent
  ],
  providers: [
    SkyAgGridService,
    SkyAgGridWrapperAdapterService
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
