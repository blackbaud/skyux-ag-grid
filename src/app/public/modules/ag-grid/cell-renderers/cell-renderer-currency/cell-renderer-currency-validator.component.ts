import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  Input
} from '@angular/core';

import {
  ICellRendererAngularComp
} from 'ag-grid-angular';

import {
  SkyCellRendererValidatorParams
} from '../../types/cell-renderer-validator-params';

@Component({
  selector: 'sky-ag-grid-cell-renderer-currency-validator',
  templateUrl: 'cell-renderer-currency-validator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SkyAgGridCellRendererCurrencyValidatorComponent implements ICellRendererAngularComp {
  @Input()
  public set parameters(value: SkyCellRendererValidatorParams) {
    this.agInit(value);
  }

  public cellRendererParams: SkyCellRendererValidatorParams;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {
  }

  /**
   * agInit is called by agGrid once after the renderer is created and provides the renderer with the information it needs.
   * @param params The cell renderer params that include data about the cell, column, row, and grid.
   */
  public agInit(params: SkyCellRendererValidatorParams) {
    this.cellRendererParams = params;
    this.changeDetector.markForCheck();
  }

  public isNumeric(value: any) {
    return !isNaN(parseFloat(value));
  }

  public refresh(params: SkyCellRendererValidatorParams): boolean {
    this.agInit(params);
    return true;
  }
}
