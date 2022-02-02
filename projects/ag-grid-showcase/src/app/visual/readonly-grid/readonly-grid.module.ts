import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyAgGridModule } from '@skyux/ag-grid';
import { SkyE2eThemeSelectorModule } from '@skyux/e2e-client';
import { SkyInfiniteScrollModule } from '@skyux/lists';
import { SkyDropdownModule } from '@skyux/popovers';
import { AgGridModule } from 'ag-grid-angular';
import { ReadonlyGridContextMenuComponent } from './readonly-grid-context-menu.component';

import { ReadonlyGridRoutingModule } from './readonly-grid-routing.module';
import { ReadonlyGridComponent } from './readonly-grid.component';

@NgModule({
  declarations: [ReadonlyGridComponent, ReadonlyGridContextMenuComponent],
  imports: [
    AgGridModule,
    CommonModule,
    ReadonlyGridRoutingModule,
    SkyAgGridModule,
    SkyE2eThemeSelectorModule,
    SkyInfiniteScrollModule,
    SkyDropdownModule,
  ],
})
export class ReadonlyGridModule {}
