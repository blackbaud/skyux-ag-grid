import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import {
  NumericOptions } from '@skyux/core';

import {
  ICellRendererAngularComp
} from 'ag-grid-angular';

import {
  ICellRendererParams
} from 'ag-grid-community';

import {
  SkyCellRendererNumericParams
} from '../../types/cell-renderer-numeric-params';

@Component({
  templateUrl: './cell-renderer-numeric.component.html',
  styleUrls: ['./cell-renderer-numeric.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAgGridCellRendererNumericComponent implements ICellRendererAngularComp {
  public value: number;
  public skyComponentProperties: NumericOptions = {};

  public columnHeader: string;
  public columnWidth: number;
  public rowHeightWithoutBorders: number;
  public rowNumber: number;

  private params: SkyCellRendererNumericParams;

  /**
   * agInit is called by agGrid once after the renderer is created and provides the renderer with the information it needs.
   * @param params The cell renderer params that include data about the cell, column, row, and grid.
   */
  public agInit(params: SkyCellRendererNumericParams) {
    this.params = params;
    this.value = this.params.value;

    this.skyComponentProperties = this.params.skyComponentProperties ?? {};
    this.setCellMetadata(params);
  }

  public refresh(): boolean {
    return false;
  }

  private setCellMetadata(params: ICellRendererParams): void {
    this.columnHeader = params.colDef?.headerName ?? '';
    this.rowNumber = params.rowIndex + 1;
    this.columnWidth = params.column.getActualWidth();
    this.rowHeightWithoutBorders = params.node && params.node.rowHeight - 4;
  }
}
