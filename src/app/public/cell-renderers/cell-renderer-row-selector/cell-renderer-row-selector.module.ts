import {
  NgModule
} from '@angular/core';

import {
  SkyCellRendererRowSelectorComponent
} from './cell-renderer-row-selector.component';

import {
  SkyCheckboxModule
} from '@skyux/forms';

import {
  FormsModule
} from '@angular/forms';

@NgModule({
  imports: [
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
