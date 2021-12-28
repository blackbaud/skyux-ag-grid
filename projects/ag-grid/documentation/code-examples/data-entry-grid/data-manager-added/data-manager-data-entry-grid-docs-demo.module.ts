import { NgModule } from '@angular/core';
import { SkyAgGridModule } from '@skyux/ag-grid';
import { SkyDataManagerModule } from '@skyux/data-manager';
import { SkyCheckboxModule } from '@skyux/forms';
import { SkyToolbarModule } from '@skyux/layout';
import { SkySearchModule } from '@skyux/lookup';
import { SkyModalModule } from '@skyux/modals';
import { SkyDropdownModule } from '@skyux/popovers';

import { AgGridModule } from 'ag-grid-angular';
import { DataManagerDataGridDocsDemoFiltersModalComponent } from '../../data-grid/data-manager-added/data-manager-data-grid-docs-demo-filter-modal.component';

import { SkyDataManagerDataEntryGridContextMenuComponent } from './data-manager-data-entry-grid-docs-demo-context-menu.component';
import { SkyDataManagerDataEntryGridEditModalComponent } from './data-manager-data-entry-grid-docs-demo-edit-modal.component';
import { SkyDataManagerDataEntryGridDemoComponent } from './data-manager-data-entry-grid-docs-demo.component';

@NgModule({
  declarations: [
    SkyDataManagerDataEntryGridContextMenuComponent,
    SkyDataManagerDataEntryGridDemoComponent,
    SkyDataManagerDataEntryGridEditModalComponent,
    DataManagerDataGridDocsDemoFiltersModalComponent,
  ],
  imports: [
    AgGridModule.withComponents([
      SkyDataManagerDataEntryGridContextMenuComponent,
    ]),
    SkyToolbarModule,
    SkySearchModule,
    AgGridModule,
    SkyAgGridModule,
    SkyModalModule,
    SkyDropdownModule,
    SkyDataManagerModule,
    SkyCheckboxModule,
  ],
  exports: [SkyDataManagerDataEntryGridDemoComponent],
  entryComponents: [
    SkyDataManagerDataEntryGridEditModalComponent,
    DataManagerDataGridDocsDemoFiltersModalComponent,
  ],
})
export class SkyDataManagerDataEntryGridDocsDemoModule {}
