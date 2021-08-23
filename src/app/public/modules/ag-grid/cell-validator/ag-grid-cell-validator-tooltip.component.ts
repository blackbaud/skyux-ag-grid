import { Component, ElementRef, ViewChild } from '@angular/core';
import { SkyPopoverComponent } from '@skyux/popovers/modules/popover/popover.component';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { SkyCellValidatorParams } from '../types/cell-renderer-validator-params';

@Component({
  selector: 'sky-ag-grid-cell-validator-tooltip',
  styleUrls: ['ag-grid-cell-validator-tooltip.component.scss'],
  templateUrl: 'ag-grid-cell-validator-tooltip.component.html'
})
export class SkyAgGridCellValidatorTooltipComponent implements ICellRendererAngularComp {
  public value: string;
  public validatorMessage: string;

  @ViewChild('validatorPopover')
  public validatorPopover: ElementRef<SkyPopoverComponent>;

  @ViewChild('focusableField')
  public focusableField: ElementRef<HTMLElement>;

  public indicatorShouldShow = true;

  public agInit(params: SkyCellValidatorParams): void {
    this.value = params.value;
    this.validatorMessage = typeof params.validatorMessage === 'function' ? params.validatorMessage(params.value) : params.validatorMessage;
  }

  public hideIndicator(): void {
    setTimeout(() => {
      this.indicatorShouldShow = false;
    });
  }

  public refresh(params: any): boolean {
    return false;
  }

  public showIndicator(): void {
    setTimeout(() => {
      this.indicatorShouldShow = true;
    });
  }

  public showPopover() {
    // @ts-ignore
    this.validatorPopover.positionNextTo(this.focusableField);
  }
}
