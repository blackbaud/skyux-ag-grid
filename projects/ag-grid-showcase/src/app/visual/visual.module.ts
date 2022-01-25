import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SkyDataManagerModule } from '@skyux/data-manager';
import { SkyE2eThemeSelectorModule } from '@skyux/e2e-client';
import { SkyCheckboxModule } from '@skyux/forms';
import { SkyToolbarModule } from '@skyux/layout';
import { SkyInfiniteScrollModule, SkyRepeaterModule } from '@skyux/lists';
import { SkySearchModule } from '@skyux/lookup';
import { SkyModalModule } from '@skyux/modals';
import { SkyDropdownModule } from '@skyux/popovers';
import { AgGridModule } from 'ag-grid-angular';
import { SkyAgGridModule } from '@skyux/ag-grid';
import { SkyDataManagerFiltersModalVisualComponent } from './data-manager/data-filter-modal.component';
import { DataManagerVisualComponent } from './data-manager/data-manager-visual.component';
import { DataViewGridComponent } from './data-manager/data-view-grid.component';
import { DataViewRepeaterComponent } from './data-manager/data-view-repeater.component';
import { CustomMultilineModule } from './edit-complex-cells/custom-multiline/custom-multiline.module';
import { EditComplexCellsComponent } from './edit-complex-cells/edit-complex-cells.component';
import { SkyAgGridDemoComponent } from './edit-in-modal-grid/ag-grid-demo.component';
import { SkyAgGridEditModalComponent } from './edit-in-modal-grid/ag-grid-edit-modal.component';
import { EditStopWhenLosesFocusComponent } from './edit-stop-when-loses-focus/edit-stop-when-loses-focus.component';
import { EditableGridComponent } from './editable-grid/editable-grid.component';
import { ReadonlyGridContextMenuComponent } from './readonly-grid/readonly-grid-context-menu.component';
import { ReadonlyGridComponent } from './readonly-grid/readonly-grid.component';
import { VisualComponent } from './visual.component';

@NgModule({
  declarations: [
    DataManagerVisualComponent,
    DataViewGridComponent,
    DataViewRepeaterComponent,
    EditableGridComponent,
    EditComplexCellsComponent,
    EditStopWhenLosesFocusComponent,
    ReadonlyGridComponent,
    ReadonlyGridContextMenuComponent,
    SkyAgGridDemoComponent,
    SkyAgGridEditModalComponent,
    SkyDataManagerFiltersModalVisualComponent,
    VisualComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SkyE2eThemeSelectorModule,
    SkyModalModule,
    SkyCheckboxModule,
    FormsModule,
    SkyDataManagerModule,
    SkyAgGridModule,
    AgGridModule,
    SkyRepeaterModule,
    SkyToolbarModule,
    SkySearchModule,
    SkyInfiniteScrollModule,
    SkyDropdownModule,
    CustomMultilineModule,
  ],
})
export class VisualModule {}
