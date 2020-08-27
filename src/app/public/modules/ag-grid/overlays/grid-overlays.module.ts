import { SkyAgGridLoadingOverlayComponent } from './ag-grid-loading-overlay.component';
import {
  NgModule
} from '@angular/core';
import { SkyWaitModule } from '@skyux/indicators';

@NgModule({
  imports: [
    SkyWaitModule
  ],
  declarations: [
    SkyAgGridLoadingOverlayComponent
  ],
  exports: [
    SkyAgGridLoadingOverlayComponent
  ]
})
export class SkyAgGridOverlaysModule {
}
