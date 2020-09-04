import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  ICellRendererAngularComp
} from 'ag-grid-angular';

import {
  SkyCellRendererCurrencyParams
} from '../../types/cell-renderer-currency-params';

import {
  SkyCurrencyProperties
} from '../../types/currency-properties';

@Component({
  selector: 'sky-ag-grid-cell-renderer-currency',
  templateUrl: './cell-renderer-currency.component.html',
  styleUrls: ['./cell-renderer-currency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SkyAgGridCellRendererCurrencyComponent implements ICellRendererAngularComp {
  public value: any;
  public skyComponentProperties: SkyCurrencyProperties = {};
  public columnHeader: string;
  public columnWidth: number;
  public rowHeightWithoutBorders: number;
  public rowNumber: number;
  private params: SkyCellRendererCurrencyParams;

  @ViewChild('skyCellRendererCurrency', { read: ElementRef })

  /**
   * agInit is called by agGrid once after the renderer is created and provides the renderer with the information it needs.
   * @param params The cell renderer params that include data about the cell, column, row, and grid.
   */
  public agInit(params: SkyCellRendererCurrencyParams) {
    this.params = params;
    this.value = this.params.value;
    this.columnHeader = this.params.colDef && this.params.colDef.headerName;
    this.rowNumber = this.params.rowIndex + 1;
    this.skyComponentProperties = this.params.skyComponentProperties || {};
  }

  public refresh(): boolean {
    return false;
  }
}
