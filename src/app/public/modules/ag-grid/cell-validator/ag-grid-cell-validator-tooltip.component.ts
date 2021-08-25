import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { SkyPopoverMessage, SkyPopoverMessageType } from '@skyux/popovers';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { CellFocusedEvent, Events, ICellRendererParams } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { SkyCellRendererCurrencyParams } from '../types/cell-renderer-currency-params';

@Component({
  selector: 'sky-ag-grid-cell-validator-tooltip',
  styleUrls: ['ag-grid-cell-validator-tooltip.component.scss'],
  templateUrl: 'ag-grid-cell-validator-tooltip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAgGridCellValidatorTooltipComponent implements ICellRendererAngularComp {
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
  ) { }

  public agInit(params: ICellRendererParams): void {
    this.cellRendererParams = params;

    this.cellRendererParams.api.addEventListener(Events.EVENT_CELL_FOCUSED, (eventParams: CellFocusedEvent) => {
      // We want to close any popovers that are opened when other cells are focused, but open a popover if the current cell is focused.
      if (eventParams.column.getColId() !== this.cellRendererParams.column.getColId() ||
        eventParams.rowIndex !== this.cellRendererParams.rowIndex) {
        this.hidePopover();
      } else {
        // This timeout is needed to ensure that we are not conflicting with the native click trigger when the cell is focused using a
        // click. Without this, the popover will close as soon as it opens when a cilck is used as this opens it and then the click is
        // registered as one that closes the popover.
        setTimeout(() => {
          this.showPopover();
        }, 100);
      }
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
