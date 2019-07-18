import {
  NgModule
} from '@angular/core';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyToolbarModule
} from '@skyux/layout';

import {
  SkyAgGridModule
} from './public/ag-grid.module';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    SkyAppLinkModule,
    SkyToolbarModule,
    SkyAgGridModule
  ],
  providers: [],
  entryComponents: []
})
export class AppExtrasModule { }
