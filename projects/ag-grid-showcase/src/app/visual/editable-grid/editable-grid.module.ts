import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyAgGridModule } from '@skyux/ag-grid';
import { SkyE2eThemeSelectorModule } from '@skyux/e2e-client';
import { SkyToolbarModule } from '@skyux/layout';
import { AgGridModule } from 'ag-grid-angular';

import { EditableGridRoutingModule } from './editable-grid-routing.module';
import { EditableGridComponent } from './editable-grid.component';

@NgModule({
  declarations: [EditableGridComponent],
  imports: [
    AgGridModule,
    CommonModule,
    EditableGridRoutingModule,
    SkyAgGridModule,
    SkyE2eThemeSelectorModule,
    SkyToolbarModule,
  ],
})
export class EditableGridModule {}
