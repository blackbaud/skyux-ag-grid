import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  ICellRendererAngularComp
} from 'ag-grid-angular';

import {
  SkyCellRendererCurrencyParams
} from '../../types/cell-renderer-currency-params';

import {
  SkyCurrencyProperties
} from '../../types/currency-properties';

@Component({
  selector: 'sky-ag-grid-cell-editor-currency',
  templateUrl: './cell-editor-currency.component.html',
  styleUrls: ['./cell-editor-currency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SkyAgGridCellEditorCurrencyComponent implements ICellRendererAngularComp {
  public value: any;
  public skyComponentProperties: SkyCurrencyProperties = {};
  public columnHeader: string;
  public columnWidth: number;
  public rowHeightWithoutBorders: number;
  public rowNumber: number;
  private params: SkyCellRendererCurrencyParams;

  @ViewChild('skyCellEditorCurrency', { read: ElementRef })
  private input: ElementRef;

  /**
   * agInit is called by agGrid once after the editor is created and provides the editor with the information it needs.
   * @param params The cell editor params that include data about the cell, column, row, and grid.
   */
  public agInit(params: SkyCellRendererCurrencyParams) {
    this.params = params;
    this.value = this.params.value;
    this.columnHeader = this.params.colDef && this.params.colDef.headerName;
    this.rowNumber = this.params.rowIndex + 1;
    this.skyComponentProperties = this.params.skyComponentProperties || {};
  }

  public refresh(): boolean {
    return false;
  }

  /**
   * afterGuiAttached is called by agGrid after the editor is rendered in the DOM. Once it is attached the editor is ready to be focused on.
   */
  public afterGuiAttached(): void {
    this.input.nativeElement.focus();
  }

  /**
   * getValue is called by agGrid when editing is stopped to get the new value of the cell.
   */
  public getValue(): number {
    return this.value;
  }
}
