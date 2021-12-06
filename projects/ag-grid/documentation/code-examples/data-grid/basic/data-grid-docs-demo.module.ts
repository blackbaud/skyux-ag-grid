import { NgModule } from '@angular/core';
import { SkyAgGridModule } from '@skyux/ag-grid';
import { SkyDataManagerModule } from '@skyux/data-manager';
import { SkyToolbarModule } from '@skyux/layout';
import { SkySearchModule } from '@skyux/lookup';

import { AgGridModule } from 'ag-grid-angular';

import { SkyDataGridDemoComponent } from './data-grid-docs-demo.component';

@NgModule({
  declarations: [SkyDataGridDemoComponent],
  exports: [SkyDataGridDemoComponent],
  imports: [
    SkyToolbarModule,
    SkySearchModule,
    SkyDataManagerModule,
    SkyAgGridModule,
    AgGridModule,
  ],
})
export class SkyDataGridDocsDemoModule {}
