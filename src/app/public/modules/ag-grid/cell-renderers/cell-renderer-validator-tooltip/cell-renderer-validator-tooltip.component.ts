import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ValueFormatterParams } from 'ag-grid-community';
import { SkyCellRendererCurrencyParams } from '../../types/cell-renderer-currency-params';

@Component({
  selector: 'sky-ag-grid-cell-renderer-validator-tooltip',
  templateUrl: 'cell-renderer-validator-tooltip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAgGridCellRendererValidatorTooltipComponent implements ICellRendererAngularComp {
  @Input()
  public set params(value: SkyCellRendererCurrencyParams) {
    this.agInit(value);
  }

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
    return false;
  }
}
