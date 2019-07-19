import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  ICellEditorAngularComp
} from 'ag-grid-angular';

import {
  SkyDatepickerInputDirective
} from '@skyux/datetime';

import {
  ICellEditorParams
} from 'ag-grid-community';

@Component({
  selector: 'sky-cell-editor-datepicker',
  templateUrl: './cell-editor-datepicker.component.html',
  styleUrls: ['./cell-editor-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyCellEditorDatepickerComponent implements ICellEditorAngularComp {
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

  public agInit(params: ICellEditorParams) {
    this.params = params;
    this.currentDate = this.params.value;
    const cellEditorParams = this.params.colDef.cellEditorParams;
    this.minDate = cellEditorParams && cellEditorParams.minDate;
    this.maxDate = cellEditorParams && cellEditorParams.maxDate;
    this.disabled = cellEditorParams && cellEditorParams.disabled;
    this.dateFormat = cellEditorParams && cellEditorParams.dateFormat;
    this.startingDay = cellEditorParams && cellEditorParams.startingDay;
    this.columnWidth = this.params.column.getActualWidth();
    this.rowHeight = this.params.node.rowHeight + 1;
  }

  public afterGuiAttached() {
    this.datepickerInput.nativeElement.focus();
  }

  public getValue(): Date {
    this.inputDirective.writeValue(this.datepickerInput.nativeElement.value);
    return this.currentDate;
  }

  public isPopup() {
    return true;
  }
}
