import {
  NgModule
} from '@angular/core';

import {
  SkyToolbarModule
} from '@skyux/layout';

import {
  SkyAppLinkModule
} from '@skyux/router';

import {
  SkyAgGridModule
} from './public';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    SkyAgGridModule,
    SkyAppLinkModule,
    SkyToolbarModule
  ],
  providers: [],
  entryComponents: []
})
export class AppExtrasModule { }
