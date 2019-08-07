import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  SkyDatepickerInputDirective
} from '@skyux/datetime';

import {
  ICellEditorAngularComp
} from 'ag-grid-angular';

import {
  ICellEditorParams
} from 'ag-grid-community';

@Component({
  selector: 'sky-ag-grid-cell-editor-datepicker',
  templateUrl: './cell-editor-datepicker.component.html',
  styleUrls: ['./cell-editor-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAgGridCellEditorDatepickerComponent implements ICellEditorAngularComp {
  private params: ICellEditorParams;

  @ViewChild('skyCellEditorDatepickerInput', {read: ElementRef})
  public datepickerInput: ElementRef;

  @ViewChild(SkyDatepickerInputDirective)
  public inputDirective: SkyDatepickerInputDirective;

  public currentDate: Date;
  public minDate: Date;
  public maxDate: Date;
  public disabled: boolean;
  public dateFormat: string;
  public startingDay: number;
  public columnWidth: number;
  public rowHeight: number;

  constructor(private el: ElementRef) {}

  public agInit(params: ICellEditorParams) {
    this.params = params;
    this.currentDate = this.params.value;
    this.columnWidth = this.params.column.getActualWidth();
    this.rowHeight = this.params.node.rowHeight + 1;

    const cellEditorParams = this.params.colDef.cellEditorParams;
    if (cellEditorParams) {
      this.minDate = cellEditorParams.minDate;
      this.maxDate = cellEditorParams.maxDate;
      this.disabled = cellEditorParams.disabled;
      this.dateFormat = cellEditorParams.dateFormat;
      this.startingDay = cellEditorParams.startingDay;
    }
  }

  public afterGuiAttached(): void {
    this.focusOnDatepickerInput();
  }

  public getValue(): Date {
    this.inputDirective.detectInputValueChange();
    return this.currentDate;
  }

  public isPopup(): boolean {
    return true;
  }

  public onDatepickerKeydown(e: KeyboardEvent): void {
    const targetEl = e.target as HTMLElement;

    if (targetEl && e.keyCode === 9) {
      const calendarEl = this.el.nativeElement.querySelector('sky-datepicker-calendar');
      const calendarElStyles = calendarEl && getComputedStyle(calendarEl);

      // stop event propagation to prevent the grid from moving to the next cell if there is an element target, the tab key was pressed, and
      // the tab key press is a tab right and the target is either an input or
      if (((!e.shiftKey && (targetEl.tagName === 'INPUT' ||
      // the calendar button when the calendar is open or
      (targetEl.tagName === 'BUTTON' && calendarElStyles.visibility === 'visible'))) ||
      // the tab key press is a tab left and the target is the calendar button or
      (e.shiftKey && targetEl.tagName === 'BUTTON')) ||
      // the tab key press is a tab left and the target is the calendar
      (e.shiftKey && targetEl.tagName === 'SKY-DAYPICKER')) {
        e.stopPropagation();
      }
    }
  }

  public focusOnDatepickerInput(): void {
    this.datepickerInput.nativeElement.focus();
  }
}
