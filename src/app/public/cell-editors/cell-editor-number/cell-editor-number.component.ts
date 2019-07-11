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
  ICellEditorParams
} from 'ag-grid-community';

@Component({
  selector: 'sky-cell-editor-numeric',
  templateUrl: './cell-editor-number.component.html',
  styleUrls: ['./cell-editor-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SkyCellEditorNumberComponent implements ICellEditorAngularComp {
  public value: number;
  private params: ICellEditorParams;
  private columnHeader: string;
  private rowNumber: number;

  @ViewChild('skyCellEditorNumeric', {read: ElementRef})
  public input: ElementRef;

  public agInit(params: ICellEditorParams): void {
    this.params = params;
    this.value = this.params.value;
    this.columnHeader = this.params.colDef.headerName;
    this.rowNumber = this.params.rowIndex + 1;
  }

  public getValue(): number {
    return this.value;
  }

  public afterGuiAttached() {
    this.input.nativeElement.focus();
  }

  public getAriaLabel() {
    return `Editable ${this.columnHeader} for row ${this.rowNumber}`;
  }
}
