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
  SkyCellEditorAutocompleteParams
} from '../../types/cell-editor-autocomplete-params';

import {
  SkyAutocompleteProperties
} from '../../types/autocomplete-properties';

@Component({
  selector: 'sky-ag-grid-cell-editor-autocomplete',
  templateUrl: './cell-editor-autocomplete.component.html',
  styleUrls: ['./cell-editor-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAgGridCellEditorAutocompleteComponent implements ICellEditorAngularComp {
  public currentSelection: any;

  public columnWidth: number;
  public rowHeight: number;
  public columnHeader: string;
  public rowNumber: number;
  public skyComponentProperties: SkyAutocompleteProperties = {};
  private params: SkyCellEditorAutocompleteParams;

  @ViewChild('skyCellEditorAutocomplete', {read: ElementRef})
  public input: ElementRef;

  public agInit(params: SkyCellEditorAutocompleteParams) {
    this.params = params;
    this.currentSelection = this.params.value;
    this.columnWidth = this.params.column && this.params.column.getActualWidth();
    this.rowHeight = this.params.node && this.params.node.rowHeight - 1;
    this.columnHeader = this.params.colDef && this.params.colDef.headerName;
    this.rowNumber = this.params.rowIndex + 1;
    this.skyComponentProperties = this.params.skyComponentProperties || {};
  }

  public afterGuiAttached(): void {
    this.input.nativeElement.focus();
  }

  public getValue(): any {
    return this.currentSelection;
  }

  public isPopup(): boolean {
    return true;
  }
}
