import {
  NgModule
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  SkyCheckboxModule
} from '@skyux/forms';

import {
  SkyAgGridResourcesModule
} from '../../../shared';

import {
  SkyCellRendererRowSelectorComponent
} from '../cell-renderer-row-selector';

@NgModule({
  imports: [
    SkyAgGridResourcesModule,
    SkyCheckboxModule,
    FormsModule
  ],
  declarations: [
    SkyCellRendererRowSelectorComponent
  ],
  exports: [
    SkyCellRendererRowSelectorComponent
  ]
})
export class SkyCellRendererRowSelectorModule {
}
