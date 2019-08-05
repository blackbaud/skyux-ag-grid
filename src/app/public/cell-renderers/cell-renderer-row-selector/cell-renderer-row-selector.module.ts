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
  SkyCellRendererRowSelectorComponent
} from '.';

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
