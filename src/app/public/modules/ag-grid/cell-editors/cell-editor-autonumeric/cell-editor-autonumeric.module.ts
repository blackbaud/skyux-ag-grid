import {
  NgModule
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  SkyAutonumericModule
} from '@skyux/autonumeric';

import {
  SkyAgGridResourcesModule
} from '../../../shared/ag-grid-resources.module';

import {
  SkyAgGridCellEditorAutonumericComponent
} from './cell-editor-autonumeric.component';

@NgModule({
  imports: [
    SkyAgGridResourcesModule,
    FormsModule,
    SkyAutonumericModule
  ],
  declarations: [
    SkyAgGridCellEditorAutonumericComponent
  ],
  exports: [
    SkyAgGridCellEditorAutonumericComponent
  ]
})
export class SkyAgGridCellEditorAutonumericModule {}
