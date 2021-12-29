import { NgModule } from '@angular/core';
import { SkyAgGridModule } from '@skyux/ag-grid';
import { SkyDataManagerModule } from '@skyux/data-manager';
import { SkyCheckboxModule } from '@skyux/forms';
import { SkyToolbarModule } from '@skyux/layout';
import { SkySearchModule } from '@skyux/lookup';
import { SkyModalModule } from '@skyux/modals';
import { SkyDropdownModule } from '@skyux/popovers';

import { AgGridModule } from 'ag-grid-angular';
import { DataManagerDataEntryGridDocsDemoFiltersModalComponent } from './data-manager-data-entry-grid-docs-demo-filter-modal.component';
import { SkyDataManagerDataEntryGridContextMenuComponent } from './data-manager-data-entry-grid-docs-demo-context-menu.component';
import { SkyDataManagerDataEntryGridEditModalComponent } from './data-manager-data-entry-grid-docs-demo-edit-modal.component';
import { SkyDataManagerDataEntryGridDemoComponent } from './data-manager-data-entry-grid-docs-demo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    SkyDataManagerDataEntryGridContextMenuComponent,
    SkyDataManagerDataEntryGridDemoComponent,
    SkyDataManagerDataEntryGridEditModalComponent,
    DataManagerDataEntryGridDocsDemoFiltersModalComponent,
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
    BrowserAnimationsModule,
  ],
  exports: [SkyDataManagerDataEntryGridDemoComponent],
  entryComponents: [
    SkyDataManagerDataEntryGridEditModalComponent,
    DataManagerDataEntryGridDocsDemoFiltersModalComponent,
  ],
})
export class SkyDataManagerDataEntryGridDocsDemoModule {}
