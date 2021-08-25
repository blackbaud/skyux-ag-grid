import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { SkyPopoverMessage, SkyPopoverMessageType } from '@skyux/popovers';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Events, ICellRendererParams } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { SkyCellRendererCurrencyParams } from '../types/cell-renderer-currency-params';

@Component({
  selector: 'sky-ag-grid-cell-validator-tooltip',
  styleUrls: ['ag-grid-cell-validator-tooltip.component.scss'],
  templateUrl: 'ag-grid-cell-validator-tooltip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAgGridCellValidatorTooltipComponent implements ICellRendererAngularComp, OnDestroy {
  @Input()
  public value: string;

  @Input()
  public validatorMessage: string;

  @Input()
  public set parameters(value: SkyCellRendererCurrencyParams) {
    this.agInit(value);
  }

  public display = true;
  public indicatorShouldShow = true;
  public popoverMessageStream = new Subject<SkyPopoverMessage>();

  private cellRendererParams: ICellRendererParams;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {
  }

  public ngOnDestroy(): void {
  }

  public agInit(params: ICellRendererParams): void {
    this.cellRendererParams = params;
    this.cellRendererParams.api.addEventListener(Events.EVENT_CELL_FOCUSED, () => {
      this.hidePopover();
    });
    this.cellRendererParams.api.addEventListener(Events.EVENT_CELL_EDITING_STARTED, () => {
      this.hidePopover();
    });
  }

  public hideIndicator(): void {
    setTimeout(() => {
      this.indicatorShouldShow = false;
      this.changeDetector.markForCheck();
    });
  }

  public hidePopover() {
    this.popoverMessageStream.next({ type: SkyPopoverMessageType.Close });
  }

  public refresh(params: any): boolean {
    return false;
  }

  public showIndicator(): void {
    setTimeout(() => {
      this.indicatorShouldShow = true;
      this.changeDetector.markForCheck();
    });
  }

  public showPopover() {
    this.popoverMessageStream.next({ type: SkyPopoverMessageType.Open });
  }
}
