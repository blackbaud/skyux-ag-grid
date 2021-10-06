import { NgModule } from '@angular/core';
import { SkyAgGridModule } from '@skyux/ag-grid';
import { SkyToolbarModule } from '@skyux/layout';

import { AgGridModule } from 'ag-grid-angular';

import { SkyDataEntryGridContextMenuComponent } from './data-entry-grid-context-menu.component';
import { SkyDataEntryGridDemoComponent } from './data-entry-grid-demo.component';
import { SkyDataEntryGridEditModalComponent } from './data-entry-grid-edit-modal.component';

@NgModule({
  imports: [
    AgGridModule.withComponents([SkyDataEntryGridContextMenuComponent]),
  ],
  exports: [AgGridModule, SkyAgGridModule, SkyToolbarModule],
  declarations: [
    SkyDataEntryGridEditModalComponent,
    SkyDataEntryGridDemoComponent,
    SkyDataEntryGridContextMenuComponent,
  ],
})
export class SkyDataEntryGridDemoModule {}
