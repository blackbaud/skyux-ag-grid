import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, ValueFormatterParams } from 'ag-grid-community';
import { SkyCellValidatorParams } from '../../types/cell-renderer-validator-params';

@Component({
  selector: 'sky-ag-grid-cell-renderer-validator-tooltip',
  templateUrl: 'cell-renderer-validator-tooltip.component.html'
})
export class SkyAgGridCellRendererValidatorTooltipComponent implements ICellRendererAngularComp {
  public value: string;
  public validatorMessage: string;
  public cellRendererParams: ICellRendererParams;

  public agInit(params: SkyCellValidatorParams): void {
    this.cellRendererParams = params;
    if (typeof params.colDef.valueFormatter === 'function') {
      this.value = params.colDef.valueFormatter(params as ValueFormatterParams);
    } else {
      this.value = params.value;
    }
    this.validatorMessage = typeof params.validatorMessage === 'function' ? params.validatorMessage(params.value) : params.validatorMessage;
  }

  public refresh(params: any): boolean {
    return false;
  }
}
