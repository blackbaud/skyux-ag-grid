import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Column, GridApi, ValueFormatterParams } from 'ag-grid-community';
import { SkyCellRendererCurrencyParams } from '../../types/cell-renderer-currency-params';
import { SkyCellRendererValidatorParams } from '../../types/cell-renderer-validator-params';
import { SkyComponentProperties } from '../../types/sky-component-properties';

@Component({
  selector: 'sky-ag-grid-cell-renderer-validator-tooltip',
  templateUrl: 'cell-renderer-validator-tooltip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAgGridCellRendererValidatorTooltipComponent implements ICellRendererAngularComp, SkyCellRendererValidatorParams {
  @Input()
  public api: GridApi;

  @Input()
  public column: Column;

  @Input()
  public eGridCell: HTMLElement;

  @Input()
  public set parameters(value: SkyCellRendererCurrencyParams) {
    this.agInit(value);
  }

  @Input()
  public rowIndex: number;

  @Input()
  public skyComponentProperties: SkyComponentProperties;

  public cellRendererParams: SkyCellRendererCurrencyParams;
  public value: any;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {
  }

  public agInit(params: SkyCellRendererCurrencyParams): void {
    this.cellRendererParams = params;
    if (typeof params.colDef?.valueFormatter === 'function') {
      this.value = params.colDef.valueFormatter(params as ValueFormatterParams);
    } else {
      this.value = params.value;
    }
    this.changeDetector.markForCheck();
  }

  public refresh(params: any): boolean {
    this.agInit(params);
    return true;
  }
}
