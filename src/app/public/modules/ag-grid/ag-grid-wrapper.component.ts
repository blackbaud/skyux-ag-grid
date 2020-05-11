import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef
} from '@angular/core';

import {
  AgGridAngular
} from 'ag-grid-angular';

import {
  SkyAgGridWrapperAdapterService
} from './ag-grid-wrapper-adapter.service';

let idIndex = 0;

@Component({
  selector: 'sky-ag-grid-wrapper',
  templateUrl: './ag-grid-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAgGridWrapperComponent {

  @ContentChild(AgGridAngular)
  public agGrid: AgGridAngular;

  public gridId: string;
  public beforeAnchorId: string;
  public afterAnchorId: string;

  constructor(
    private adapterService: SkyAgGridWrapperAdapterService,
    private elementRef: ElementRef
  ) {
    idIndex++;
    this.gridId = 'sky-ag-grid-' + idIndex;
    this.beforeAnchorId = 'sky-ag-grid-nav-anchor-before-' + idIndex;
    this.afterAnchorId = 'sky-ag-grid-nav-anchor-after-' + idIndex;
  }

  public onGridKeydown(event: KeyboardEvent): void {
    if (this.agGrid && event.key === 'Tab') {
      const inEditMode = this.agGrid.api.getEditingCells().length > 0;
      if (!inEditMode) {
        const idToFocus = event.shiftKey ? this.beforeAnchorId : this.afterAnchorId;
        this.adapterService.setFocusedElementById(this.elementRef.nativeElement, idToFocus);
      }
    }
  }

  public onAnchorFocus(event: FocusEvent): void {
    const gridId = this.gridId;
    const relatedTarget = event.relatedTarget as HTMLElement;
    const previousFocusedId = relatedTarget && relatedTarget.id;
    const previousWasCell = relatedTarget && this.adapterService.elementOrParentHasClass(relatedTarget, 'ag-cell');

    if (previousFocusedId !== gridId && !previousWasCell) {
      this.adapterService.setFocusedElementById(this.elementRef.nativeElement, this.gridId);
    }
  }

  public onGridFocus(): void {
    const columns = this.agGrid.columnApi.getAllDisplayedColumns();
    const firstColumn = columns && columns[0];
    const rowIndex = this.agGrid.api.getFirstDisplayedRow();

    if (firstColumn && rowIndex >= 0) {
      this.agGrid.api.setFocusedCell(rowIndex, firstColumn);
    }
  }
}
