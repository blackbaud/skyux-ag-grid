import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { SkyCellRendererCurrencyParams } from '../../types/cell-renderer-currency-params';

@Component({
  selector: 'sky-ag-grid-cell-renderer-currency-validator',
  templateUrl: 'cell-renderer-currency-validator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAgGridCellRendererCurrencyValidatorComponent implements ICellRendererAngularComp {
  public validatorMessage: string;
  public cellRendererParams: SkyCellRendererCurrencyParams;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {
  }

  public agInit(params: SkyCellRendererCurrencyParams): void {
    this.cellRendererParams = params;
    this.changeDetector.markForCheck();
  }

  public refresh(params: any): boolean {
    this.agInit(params);
    return false;
  }
}
