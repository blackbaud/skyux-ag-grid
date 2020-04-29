import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef
} from '@angular/core';

import {
  AgGridAngular
} from 'ag-grid-angular';

@Component({
  selector: 'sky-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAgGridComponent {

  @ContentChild(AgGridAngular)
  public agGrid: AgGridAngular;

  constructor(
    private elementRef: ElementRef
  ) { }

  public onGridKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;

    if (this.agGrid) {
      if (event.key === 'Tab') {
        const inEditMode = this.agGrid.api.getEditingCells().length > 0;
        if (!inEditMode) {
          const idToFocus = event.shiftKey ? 'nav-anchor-before' : 'nav-anchor-after';
          this.setFocusById(idToFocus);
        }
      } else if (event.key === 'Enter' && target.id === 'sky-ag-grid') {
        const columns = this.agGrid.columnApi.getAllDisplayedColumns();
        const firstColumn = columns && columns[0];
        const rowIndex = this.agGrid.api.getFirstDisplayedRow();

        if (firstColumn && rowIndex >= 0) {
          this.agGrid.api.setFocusedCell(rowIndex, firstColumn);
        }
      }
    }
  }

  public onAnchorFocus(event: FocusEvent): void {
    const gridId = 'sky-ag-grid';
    const relatedTarget = event.relatedTarget as HTMLElement;
    const previousFocusedId = relatedTarget && relatedTarget.id;
    const previousWasCell = relatedTarget && this.isGridCell(relatedTarget);
    console.log(relatedTarget);

    if (previousFocusedId !== gridId && !previousWasCell) {
      this.setFocusById(gridId);
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

  private setFocusById(id: string): void {
    this.elementRef.nativeElement.querySelector(`#${id}`).focus();
  }

  private isGridCell(element: HTMLElement): boolean {
    if (element.classList.contains('ag-cell')) {
      return true;
    } else if (element.parentElement) {
      return this.isGridCell(element.parentElement);
    }
    return false;
  }
}
