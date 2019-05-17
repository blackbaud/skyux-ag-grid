import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  ICellEditorAngularComp
} from 'ag-grid-angular';

@Component({
  selector: 'skyux-datepicker-cell-editor',
  templateUrl: './skyux-datepicker-cell-editor.component.html',
  styleUrls: ['./skyux-datepicker-cell-editor.component.scss']
})
export class SkyuxDatepickerCellEditorComponent implements ICellEditorAngularComp, AfterViewInit {
  private params: any;

  @ViewChild('datepicker', {read: ElementRef})
  public skyDatepicker: ElementRef;
  public currentDate: Date;
  public columnWidth: number;
  public rowHeight: number;

  public agInit(params: any) {
    console.log(params);
    this.params = params;
    this.currentDate = this.params.value;
    this.columnWidth = this.params.column.getActualWidth();
    this.rowHeight = this.params.node.rowHeight + 1;
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
