import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { SkyDataManagerModule } from '@skyux/data-manager';
import { SkyCheckboxModule } from '@skyux/forms';
import { SkyModalModule } from '@skyux/modals';

import { SkyAgGridModule } from 'projects/ag-grid/src/public-api';

import { SkyDataManagerFiltersModalVisualComponent } from './data-manager/data-filter-modal.component';
import { DataManagerVisualComponent } from './data-manager/data-manager-visual.component';
import { DataViewGridComponent } from './data-manager/data-view-grid.component';
import { DataViewRepeaterComponent } from './data-manager/data-view-repeater.component';

import { VisualComponent } from './visual.component';

@NgModule({
  declarations: [
    SkyDataManagerFiltersModalVisualComponent,
    DataManagerVisualComponent,
    DataViewGridComponent,
    DataViewRepeaterComponent,
    VisualComponent
  ],
  imports: [
    FormsModule,
    NoopAnimationsModule,
    RouterModule,
    SkyAgGridModule,
    SkyCheckboxModule,
    SkyDataManagerModule,
    SkyModalModule
  ]
})
export class VisualModule { }
