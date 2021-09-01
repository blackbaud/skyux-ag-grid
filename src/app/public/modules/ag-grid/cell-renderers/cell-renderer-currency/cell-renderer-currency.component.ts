import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  Input
} from '@angular/core';

import {
  ICellRendererAngularComp
} from 'ag-grid-angular';
import { Column, GridApi } from 'ag-grid-community';

import {
  SkyCellRendererCurrencyParams
} from '../../types/cell-renderer-currency-params';
import { SkyCellRendererValidatorParams } from '../../types/cell-renderer-validator-params';
import { SkyComponentProperties } from '../../types/sky-component-properties';

@Component({
  selector: 'sky-ag-grid-cell-renderer-currency',
  templateUrl: './cell-renderer-currency.component.html',
  styleUrls: ['./cell-renderer-currency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SkyAgGridCellRendererCurrencyComponent implements ICellRendererAngularComp, SkyCellRendererValidatorParams {
  @Input()
  public api: GridApi;

  @Input()
  public column: Column;

  @Input()
  public eGridCell: HTMLElement;

  @Input()
  public set parameters(value: SkyCellRendererCurrencyParams) {
    this.updateProperties(value);
  }

  @Input()
  public rowIndex: number;

  public columnHeader: string;
  public columnWidth: number;
  public params: SkyCellRendererCurrencyParams;
  public rowHeightWithoutBorders: number;
  public rowNumber: number;
  public skyComponentProperties: SkyComponentProperties = {};
  public value: number;
  public showValidationTooltip = false;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {
  }

  /**
   * agInit is called by agGrid once after the renderer is created and provides the renderer with the information it needs.
   * @param params The cell renderer params that include data about the cell, column, row, and grid.
   */
  public agInit(params: SkyCellRendererCurrencyParams) {
    this.updateProperties(params);
  }

  public refresh(params: SkyCellRendererCurrencyParams): boolean {
    this.updateProperties(params);
    return true;
  }

  private updateProperties(params: SkyCellRendererCurrencyParams) {
    this.params = params;
    this.value = this.params.value;
    this.columnHeader = this.params.colDef && this.params.colDef.headerName;
    this.rowNumber = this.params.rowIndex + 1;
    this.columnWidth = this.params.column.getActualWidth();
    this.rowHeightWithoutBorders = this.params.node && this.params.node.rowHeight - 4;
    this.skyComponentProperties = this.params.skyComponentProperties || {};
    this.skyComponentProperties.format = 'currency';
    this.skyComponentProperties.minDigits = 2;
    if (this.params.skyComponentProperties?.validator && this.params.skyComponentProperties?.validatorMessage) {
      this.showValidationTooltip = !this.params.skyComponentProperties.validator(this.value);
    } else {
      this.showValidationTooltip = false;
    }
    this.changeDetector.markForCheck();
  }
}
