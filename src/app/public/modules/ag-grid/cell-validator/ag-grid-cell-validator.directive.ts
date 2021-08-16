import {
  AfterViewInit,
  Directive,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  SkyAgGridCellValidatorAdapterService
} from './ag-grid-cell-validator-adapter.service';

import {
  SkyCellValidatorParams
} from '../types/cell-renderer-validator-params';

/**
 * Directive that can be used inside a cell renderer to validate the value of the cell against a provided validation function.
 * If invalid, the cell will have a class applied which will style the cell with a read error border.
 */
@Directive({
  selector: '[skyAgGridCellValidator]',
  providers: [SkyAgGridCellValidatorAdapterService]
})
export class SkyAgGridCellValidatorDirective implements AfterViewInit {

  /**
   * Sets up the cell validator. These parameters will include a validation function that is used to validate the cell's value.
   * @param validatorParams The cell renderer paramaters. This will be the same parameters that is passed into the cell renderer
   * via the `agInit` and `refresh` methods.
   */
  @Input()
  public set skyAgGridCellValidator(validatorParams: SkyCellValidatorParams) {
    this.validatorParams = validatorParams;
    this.setupRefresh();
    this.validate();
  }

  /**
   * Fires when the validation result changes.
   */
  @Output()
  public skyAgGridCellValidatorChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private validatorParams: SkyCellValidatorParams;

  constructor(
    private adapterService: SkyAgGridCellValidatorAdapterService
  ) { }

  public ngAfterViewInit() {
    setTimeout(() => {
      this.setupRefresh();
    });
  }

  private setupRefresh(): void {
    if (this.validatorParams && this.validatorParams.validator) {
      let rendererInstance = this.validatorParams.api.getCellRendererInstances({
        columns: [this.validatorParams.colDef.colId], rowNodes: [this.validatorParams.node]
      })[0];

      /* istanbul ignore else */
      if (rendererInstance) {
        const currentRefresh = rendererInstance.refresh;
        rendererInstance.refresh = (refreshParams: SkyCellValidatorParams) => {
          this.validatorParams = refreshParams;
          const rendererRefreshResult = currentRefresh(this.validatorParams);
          this.validate();
          return rendererRefreshResult;
        };
      }
    }
  }

  private validate() {
    if (this.validatorParams?.validator) {
      if (!this.validatorParams.validator(this.validatorParams.value)) {
        this.skyAgGridCellValidatorChange.emit(false);
        this.adapterService.setValidatorClass(this.validatorParams.eGridCell);
      } else {
        this.skyAgGridCellValidatorChange.emit(true);
        this.adapterService.removeValidatorClass(this.validatorParams.eGridCell);
      }
    }
  }
}
