import {
  NgModule
} from '@angular/core';

import {
  AgGridModule
} from 'ag-grid-angular';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyRadioModule
} from '@skyux/forms';

import {
  SkyCellRendererRowSelectorComponent
} from './public/cell-renderers/cell-renderer-row-selector/cell-renderer-row-selector.component';

import {
  SkyCellEditorNumberComponent
} from './public/cell-editors/cell-editor-number/cell-editor-number.component';

import {
  SkyCellEditorDatepickerComponent
} from './public/cell-editors/cell-editor-datepicker/cell-editor-datepicker.component';

import {
  SkyCellRendererRowSelectorModule
} from './public/cell-renderers/cell-renderer-row-selector/cell-renderer-row-selector.module';

import {
  SkyCellEditorDatepickerModule
} from './public/cell-editors/cell-editor-datepicker/cell-editor-datepicker.module';

import {
  SkyCellEditorNumberModule
} from './public/cell-editors/cell-editor-number/cell-editor-number.module';

import {
  SkyToolbarModule
} from '@skyux/layout';

import {
  SkyAgGridService
} from './public/ag-grid.service';

@NgModule({
  declarations: [],
  imports: [
    AgGridModule.withComponents([
      SkyCellRendererRowSelectorComponent,
      SkyCellEditorNumberComponent,
      SkyCellEditorDatepickerComponent
    ]),
    SkyCellRendererRowSelectorModule,
    SkyCellEditorDatepickerModule,
    SkyCellEditorNumberModule
  ],
  exports: [
    AgGridModule,
    SkyAppLinkModule,
    SkyRadioModule,
    SkyToolbarModule
  ],
  providers: [
    SkyAgGridService
  ],
  entryComponents: []
})
export class AppExtrasModule { }
