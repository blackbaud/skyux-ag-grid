import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyAgGridModule } from '@skyux/ag-grid';
import { SkyE2eThemeSelectorModule } from '@skyux/e2e-client';
import { SkyToolbarModule } from '@skyux/layout';
import { AgGridModule } from 'ag-grid-angular';
import { CustomMultilineModule } from './custom-multiline/custom-multiline.module';

import { EditComplexCellsRoutingModule } from './edit-complex-cells-routing.module';
import { EditComplexCellsComponent } from './edit-complex-cells.component';

@NgModule({
  declarations: [EditComplexCellsComponent],
  imports: [
    AgGridModule,
    CommonModule,
    CustomMultilineModule,
    EditComplexCellsRoutingModule,
    SkyAgGridModule,
    SkyE2eThemeSelectorModule,
    SkyToolbarModule,
  ],
})
export class EditComplexCellsModule {}
