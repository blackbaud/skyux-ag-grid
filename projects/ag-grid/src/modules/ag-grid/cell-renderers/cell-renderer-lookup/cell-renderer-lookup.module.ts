import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyAgGridCellRendererLookupComponent } from './cell-renderer-lookup.component';

@NgModule({
  declarations: [SkyAgGridCellRendererLookupComponent],
  exports: [SkyAgGridCellRendererLookupComponent],
  imports: [CommonModule]
})
export class SkyAgGridCellRendererLookupModule {
}
