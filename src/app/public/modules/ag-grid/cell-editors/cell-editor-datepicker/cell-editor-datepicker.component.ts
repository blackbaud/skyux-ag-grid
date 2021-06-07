import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Optional,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {
  SkyModalInstance
} from '@skyux/modals';

import {
  ICellEditorAngularComp
} from 'ag-grid-angular';

import {
  PopupComponent
} from 'ag-grid-community';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SkyAgGridCellEditorDatepickerComponent extends PopupComponent implements ICellEditorAngularComp {
  public columnWidth: number;
  public currentDate: Date;
  public rowHeightWithoutBorders: number;
  public skyComponentProperties: SkyDatepickerProperties = {};
  private params: SkyCellEditorDatepickerParams;
  private _isModalContext: boolean = false;

  @ViewChild('skyCellEditorDatepickerInput', { read: ElementRef })
  private datepickerInput: ElementRef;

  constructor(
    @Optional() private modalInstance: SkyModalInstance
  ) {
    super();
  }

  /**
   * agInit is called by agGrid once after the editor is created and provides the editor with the information it needs.
   * @param params The cell editor params that include data about the cell, column, row, and grid.
   */
  public agInit(params: SkyCellEditorDatepickerParams): void {
    this.params = params;
    this.currentDate = this.params.value;
    this.skyComponentProperties = this.params.skyComponentProperties || {};
    this.columnWidth = this.params.column.getActualWidth();
    this.rowHeightWithoutBorders = this.params.node && this.params.node.rowHeight - 4;
  }

  /**
   * afterGuiAttached is called by agGrid after the editor is rendered in the DOM. Once it is attached the editor is ready to be focused on.
   */
  public afterGuiAttached(): void {
    if (this.isModalContext) {
      this.focusOnDatepickerInput();
    }
  }

  /**
   * getValue is called by agGrid when editing is stopped to get the new value of the cell.
   */
  public getValue(): Date {
    if (this.isModalContext) {
      this.datepickerInput.nativeElement.blur();
    }
    return this.currentDate;
  }

  public focusOnDatepickerInput(): void {
    this.datepickerInput.nativeElement.focus();
  }

  public isPopup(): boolean {
    return !this.isModalContext;
  }

  public onDateChange(value: Date): void {
    this.currentDate = value;
    this.params.api.stopEditing(false);
  }

  public get isModalContext(): boolean {
    return this._isModalContext || !!this.modalInstance;
  }

  public set isModalContext(value: boolean) {
    this._isModalContext = value;
  }
}
