import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { SkyPopoverMessage, SkyPopoverMessageType } from '@skyux/popovers';
import { CellFocusedEvent, Events } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { SkyCellRendererCurrencyParams } from '../types/cell-renderer-currency-params';

@Component({
  selector: 'sky-ag-grid-cell-validator-tooltip',
  styleUrls: ['ag-grid-cell-validator-tooltip.component.scss'],
  templateUrl: 'ag-grid-cell-validator-tooltip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAgGridCellValidatorTooltipComponent {
  @Input()
  public value: string;

  @Input()
  public validatorMessage: string;

  @Input()
  public set parameters(value: SkyCellRendererCurrencyParams) {
    this.cellRendererParams = value;

    /*istanbul ignore next*/
    this.cellRendererParams.api?.addEventListener(Events.EVENT_CELL_FOCUSED, (eventParams: CellFocusedEvent) => {
      // We want to close any popovers that are opened when other cells are focused, but open a popover if the current cell is focused.
      if (eventParams.column.getColId() !== this.cellRendererParams.column.getColId() ||
        eventParams.rowIndex !== this.cellRendererParams.rowIndex) {
        this.hidePopover();
      }
    });

    /*istanbul ignore next*/
    this.cellRendererParams.eGridCell?.addEventListener('keyup', (event) => {
      if (['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp'].includes(event.key)) {
        this.showPopover();
      }
    });

    /*istanbul ignore next*/
    this.cellRendererParams.api?.addEventListener(Events.EVENT_CELL_EDITING_STARTED, () => {
      this.hidePopover();
    });
  }

  public indicatorShouldShow = true;
  public popoverMessageStream = new Subject<SkyPopoverMessage>();

  private cellRendererParams: SkyCellRendererCurrencyParams;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  public hideIndicator(): void {
    setTimeout(() => {
      this.indicatorShouldShow = false;
      this.changeDetector.markForCheck();
    });
  }

  public hidePopover() {
    this.popoverMessageStream.next({ type: SkyPopoverMessageType.Close });
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
