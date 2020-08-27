import { ILoadingOverlayAngularComp } from 'ag-grid-angular';
import { Component } from '@angular/core';

/** AG-Grid custom overlay component
 *  @see <a href="https://www.ag-grid.com/javascript-grid-overlay-component/">AgGrid Docs</a>
 */
@Component({
  selector: 'grid-loading-overlay',
  templateUrl: './ag-grid-loading-overlay.component.html'
})

export class SkyAgGridLoadingOverlayComponent implements ILoadingOverlayAngularComp {
  public agInit(params: any): void {
  }
}
