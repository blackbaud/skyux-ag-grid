import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SkyInputBoxModule } from '@skyux/forms';
import { SkyLookupModule } from '@skyux/lookup';
import { SkyAgGridResourcesModule } from '../../../shared/ag-grid-resources.module';
import { SkyAgGridCellEditorLookupComponent } from './cell-editor-lookup.component';

@NgModule({
  declarations: [SkyAgGridCellEditorLookupComponent],
  exports: [SkyAgGridCellEditorLookupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SkyAgGridResourcesModule,
    SkyInputBoxModule,
    SkyLookupModule
  ]
})
export class SkyAgGridCellEditorLookupModule {
}
