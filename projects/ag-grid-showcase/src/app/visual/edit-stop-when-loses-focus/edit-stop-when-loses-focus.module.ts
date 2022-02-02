import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyAgGridModule } from '@skyux/ag-grid';
import { SkyE2eThemeSelectorModule } from '@skyux/e2e-client';
import { SkyToolbarModule } from '@skyux/layout';
import { AgGridModule } from 'ag-grid-angular';

import { EditStopWhenLosesFocusRoutingModule } from './edit-stop-when-loses-focus-routing.module';
import { EditStopWhenLosesFocusComponent } from './edit-stop-when-loses-focus.component';

@NgModule({
  declarations: [EditStopWhenLosesFocusComponent],
  imports: [
    AgGridModule,
    CommonModule,
    EditStopWhenLosesFocusRoutingModule,
    SkyAgGridModule,
    SkyE2eThemeSelectorModule,
    SkyToolbarModule,
  ],
})
export class EditStopWhenLosesFocusModule {}
