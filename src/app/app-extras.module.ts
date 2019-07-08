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
  SkyuxCheckboxGridCellComponent
} from './public/cell-renderers/checkbox-cell-renderer/checkbox-grid-cell.component';

import {
  SkyuxNumericCellEditorComponent
} from './public/cell-editors/numeric-cell-editor/numeric-cell-editor.component';

import {
  SkyuxDatepickerCellEditorComponent
} from './public/cell-editors/datepicker-cell-editor/datepicker-cell-editor.component';

import {
  SkyuxCheckboxGridCellModule
} from './public/cell-renderers/checkbox-cell-renderer/checkbox-grid-cell.module';

import {
  SkyuxDatepickerCellEditorModule
} from './public/cell-editors/datepicker-cell-editor/datepicker-cell-editor.module';

import {
  SkyToolbarModule
} from '@skyux/layout';

import {
  FormsModule
} from '@angular/forms';

@NgModule({
  declarations: [SkyuxNumericCellEditorComponent],
  imports: [
    AgGridModule.withComponents([
      SkyuxCheckboxGridCellComponent,
      SkyuxNumericCellEditorComponent,
      SkyuxDatepickerCellEditorComponent
    ]),
    SkyuxCheckboxGridCellModule,
    SkyuxDatepickerCellEditorModule,
    FormsModule
  ],
  exports: [
    AgGridModule,
    SkyAppLinkModule,
    SkyRadioModule,
    SkyToolbarModule
  ],
  entryComponents: []
})
export class AppExtrasModule { }
