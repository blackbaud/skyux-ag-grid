import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  ICellEditorAngularComp
} from 'ag-grid-angular';

import {
  ICellEditorParams
} from 'ag-grid-community';

@Component({
  selector: 'skyux-datepicker-cell-editor',
  templateUrl: './skyux-datepicker-cell-editor.component.html'
})
export class SkyuxDatepickerCellEditorComponent implements ICellEditorAngularComp, AfterViewInit {
  private params: ICellEditorParams;

  @ViewChild('datepicker', {read: ElementRef})
  public skyDatepicker: ElementRef;
  public currentDate: Date;
  public columnWidth: number;

  public agInit(params: ICellEditorParams) {
    this.params = params;
    this.currentDate = this.params.value;
    this.columnWidth = this.params.column.getActualWidth();
  }

  public ngAfterViewInit() {
    this.skyDatepicker.nativeElement.querySelector('.sky-dropdown-button-type-calendar').click();
  }

  public getValue(): Date {
    return this.currentDate;
  }

  public isPopup() {
    return true;
  }

  public onDateChange(newDate: Date) {
    this.currentDate = newDate;
  }
}
