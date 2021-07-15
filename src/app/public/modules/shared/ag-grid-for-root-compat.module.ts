import {
  NgModule
} from '@angular/core';

import {
  SkyCoreAdapterService
} from '@skyux/core';

/**
 * @internal
 * @deprecated This module can be removed after we upgrade SKY UX development dependencies to version 5.
 */
 @NgModule({
  providers: [
    SkyCoreAdapterService
  ]
})
export class SkyAgGridForRootCompatModule {}
