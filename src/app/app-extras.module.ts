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
} from './public/cell-renderers/skyux-checkbox-cell-renderer/skyux-checkbox-grid-cell.component';

import {
  SkyuxNumericCellEditorComponent
} from './public/cell-editors/skyux-numeric-cell-editor/skyux-numeric-cell-editor.component';

import {
  SkyuxDatepickerCellEditorComponent
} from './public/cell-editors/skyux-datepicker-cell-editor/skyux-datepicker-cell-editor.component';

import {
  SkyuxCheckboxGridCellModule
} from './public/cell-renderers/skyux-checkbox-cell-renderer/skyux-checkbox-grid-cell.module';

import {
  SkyuxDatepickerCellEditorModule
} from './public/cell-editors/skyux-datepicker-cell-editor/skyux-datepicker-cell-editor.module';

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
