import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild
} from '@angular/core';

import {
  ICellRendererAngularComp
} from 'ag-grid-angular';

import {
  SkyAgGridCellValidatorDirective
} from '../cell-validator/ag-grid-cell-validator.directive';

import {
  SkyCellValidatorParams
} from '../types/cell-renderer-validator-params';

@Component({
  selector: 'sky-ag-grid-validator-fixture',
  templateUrl: './ag-grid-cell-validator.component.fixture.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAgGridCellValidatorFixtureComponent implements ICellRendererAngularComp {

  @ViewChild(SkyAgGridCellValidatorDirective)
  public validatorDirective: SkyAgGridCellValidatorDirective;

  public params: SkyCellValidatorParams;
  public value: number;

  constructor(private changeDetector: ChangeDetectorRef) {}

  /**
   * agInit is called by agGrid once after the renderer is created and provides the renderer with the information it needs.
   * @param params The cell renderer params that include data about the cell, column, row, and grid.
   */
  public agInit(params: SkyCellValidatorParams) {
    this.updateProperties(params);
  }

  public refresh(params: SkyCellValidatorParams): boolean {
    this.updateProperties(params);
    return true;
  }

  public validationChange(value: boolean): void {
    // console.log(value);
  }

  private updateProperties(params: SkyCellValidatorParams) {
    this.params = params;
    this.value = this.params.value;
    this.changeDetector.markForCheck();
  }
}
