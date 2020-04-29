import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  SkyDatepickerInputDirective,
  SkyDatepickerComponent
} from '@skyux/datetime';

import {
  ICellEditorAngularComp
} from 'ag-grid-angular';

import {
  SkyCellEditorDatepickerParams
} from '../../types/cell-editor-datepicker-params';

import {
  SkyDatepickerProperties
} from '../../types/datepicker-properties';

@Component({
  selector: 'sky-ag-grid-cell-editor-datepicker',
  templateUrl: './cell-editor-datepicker.component.html',
  styleUrls: ['./cell-editor-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAgGridCellEditorDatepickerComponent implements ICellEditorAngularComp {
  public currentDate: Date;
  public columnWidth: number;
  public rowHeight: number;
  public skyComponentProperties: SkyDatepickerProperties = {};
  private params: SkyCellEditorDatepickerParams;

  @ViewChild('skyCellEditorDatepickerInput', { read: ElementRef })
  private datepickerInput: ElementRef;

  @ViewChild(SkyDatepickerInputDirective)
  private inputDirective: SkyDatepickerInputDirective;

  @ViewChild(SkyDatepickerComponent)
  private datepickerComponent: SkyDatepickerComponent;

  public get inputIsFocused(): boolean {
    return this.inputDirective.inputIsFocused;
  }

  public get buttonIsFocused(): boolean {
    return this.datepickerComponent.buttonIsFocused;
  }

  public get calendarIsFocused(): boolean {
    return this.datepickerComponent.calendarIsFocused;
  }

  public get calendarIsVisible(): boolean {
    return this.datepickerComponent.calendarIsVisible;
  }

  constructor() { }

  /**
   * agInit is called by agGrid once after the editor is created and provides the editor with the information it needs.
   * @param params The cell editor params that include data about the cell, column, row, and grid.
   */
  public agInit(params: SkyCellEditorDatepickerParams): void {
    this.params = params;
    this.currentDate = this.params.value;
    this.columnWidth = this.params.column.getActualWidth();
    this.rowHeight = this.params.node.rowHeight - 1;
    this.skyComponentProperties = this.params.skyComponentProperties || {};
  }

  /**
   * afterGuiAttached is called by agGrid after the editor is rendered in the DOM. Once it is attached the editor is ready to be focused on.
   */
  public afterGuiAttached(): void {
    this.focusOnDatepickerInput();
  }

  /**
   * getValue is called by agGrid when editing is stopped to get the new value of the cell.
   */
  public getValue(): Date {
    this.inputDirective.detectInputValueChange();
    return this.currentDate;
  }

  /**
   * isPopup is called by agGrid to determine if the editor should be rendered as a cell or as a popup over the cell being edited.
   */
  public isPopup(): boolean {
    return true;
  }

  public test(event: Event) {
    console.log('hello');
  }

  public blah(event: Event) {
    console.log('meh');
  }

  public focusOnDatepickerInput(): void {
    this.datepickerInput.nativeElement.focus();
  }
}
