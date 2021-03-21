import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { SkyAutonumericOptions } from '@skyux/autonumeric';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { SkyCellEditorAutonumericParams } from '../../types/cell-editor-autonumeric-params';
import { ICellEditorParams } from 'ag-grid-community';

@Component({
  selector: 'sky-ag-grid-cell-editor-autonumeric',
  templateUrl: './cell-editor-autonumeric.component.html',
  styleUrls: ['./cell-editor-autonumeric.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAgGridCellEditorAutonumericComponent implements ICellEditorAngularComp {
  public value: number;
  /**
   * Autonumeric params
   * @see [@skyux/autonumeric](https://github.com/blackbaud/skyux-autonumeric)
   * @see [Autonumeric.js](http://autonumeric.org/guide)
   */
  public autonumericOptions: SkyAutonumericOptions;

  public columnHeader: string;
  public columnWidth: number;
  public rowHeightWithoutBorders: number;
  public rowNumber: number;

  private params: SkyCellEditorAutonumericParams;

  @ViewChild('skyCellEditorAutonumeric', { read: ElementRef })
  private input: ElementRef;

  /**
   * agInit is called by agGrid once after the editor is created and provides the editor with the information it needs.
   * @param params The cell editor params that include data about the cell, column, row, and grid.
   */
  public agInit(params: SkyCellEditorAutonumericParams): void {
    this.params = params;
    this.value = this.params.value;
    this.autonumericOptions = this.params.skyComponentProperties;

    this.setCellMetadata(params);
  }

  /**
   * afterGuiAttached is called by agGrid after the editor is rendered in the DOM. Once it is attached the editor is ready to be focused on.
   */
  public afterGuiAttached(): void {
    setTimeout(() => this.input.nativeElement.focus());
  }

  /**
   * getValue is called by agGrid when editing is stopped to get the new value of the cell.
   */
  public getValue(): number {
    return this.value;
  }

  private setCellMetadata(params: ICellEditorParams): void {
    this.columnHeader = params.colDef?.headerName ?? '';
    this.rowNumber = params.rowIndex + 1;
    this.columnWidth = params.column.getActualWidth();
    this.rowHeightWithoutBorders = params.node && params.node.rowHeight - 4;
  }
}
