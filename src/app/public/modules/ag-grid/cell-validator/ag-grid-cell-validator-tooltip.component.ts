import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnInit } from '@angular/core';
import { SkyPopoverMessage, SkyPopoverMessageType } from '@skyux/popovers';
import { CellFocusedEvent, Column, Events, GridApi } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { SkyCellRendererValidatorParams } from '../types/cell-renderer-validator-params';
import { SkyComponentProperties } from '../types/sky-component-properties';

@Component({
  selector: 'sky-ag-grid-cell-validator-tooltip',
  styleUrls: ['ag-grid-cell-validator-tooltip.component.scss'],
  templateUrl: 'ag-grid-cell-validator-tooltip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAgGridCellValidatorTooltipComponent implements OnInit, SkyCellRendererValidatorParams {
  @Input()
  public api: GridApi;

  @Input()
  public column: Column;

  @Input()
  public eGridCell: HTMLElement;

  @Input()
  public rowIndex: number;

  @Input()
  public skyComponentProperties: SkyComponentProperties;

  @Input()
  public set value(value: any) {
    this._value = value;
    this.updateValidatorMessage();
    this.changeDetector.markForCheck();
  }

  public indicatorShouldShow = true;

  public set parameters(value: SkyCellRendererValidatorParams) {
    this.api = value.api;
    this.column = value.column;
    this.eGridCell = value.eGridCell;
    this.rowIndex = value.rowIndex;
    this.skyComponentProperties = value.skyComponentProperties;
    this.agInit();
  }

  public popoverMessageStream = new Subject<SkyPopoverMessage>();
  public validatorMessage: string;
  private _value: any;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private zone: NgZone
  ) { }

  public ngOnInit(): void {
    this.agInit();
  }

  public hideIndicator(): void {
    this.zone.run(() => {
      this.indicatorShouldShow = false;
      this.changeDetector.markForCheck();
    });
  }

  public hidePopover(): void {
    this.popoverMessageStream.next({ type: SkyPopoverMessageType.Close });
  }

  public showIndicator(): void {
    this.zone.run(() => {
      this.indicatorShouldShow = true;
      this.changeDetector.markForCheck();
    });
  }

  public showPopover(): void {
    this.popoverMessageStream.next({ type: SkyPopoverMessageType.Open });
  }

  private agInit() {
    this.updateValidatorMessage();

    /*istanbul ignore next*/
    this.api?.addEventListener(Events.EVENT_CELL_FOCUSED, (eventParams: CellFocusedEvent) => {
      // We want to close any popovers that are opened when other cells are focused, but open a popover if the current cell is focused.
      if (eventParams.column.getColId() !== this.column.getColId() ||
        eventParams.rowIndex !== this.rowIndex) {
        this.hidePopover();
      }
    });

    /*istanbul ignore next*/
    this.eGridCell?.addEventListener('keyup', (event) => {
      if (['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp'].includes(event.key)) {
        this.showPopover();
      }
    });

    /*istanbul ignore next*/
    this.api?.addEventListener(Events.EVENT_CELL_EDITING_STARTED, () => {
      this.hidePopover();
    });

    this.changeDetector.markForCheck();
  }

  private updateValidatorMessage(): void {
    if (typeof this.skyComponentProperties?.validatorMessage === 'function') {
      this.validatorMessage = this.skyComponentProperties.validatorMessage(this._value);
    } else {
      this.validatorMessage = this.skyComponentProperties?.validatorMessage;
    }
  }
}
