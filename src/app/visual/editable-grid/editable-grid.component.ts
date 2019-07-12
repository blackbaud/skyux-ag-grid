import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import {
  CellValueChangedEvent,
  ColDef,
  GridApi,
  GridReadyEvent,
  GridOptions,
  ValueFormatterParams
} from 'ag-grid-community';

import {
  EDITABLE_GRID_DATA,
  EditableGridRow
} from './editable-grid-data';

import {
  SKY_GRID_OPTIONS
} from '../../public/grid-options';

const _cloneDeep = require('lodash.clonedeep');

@Component({
  selector: 'editable-grid-visual',
  templateUrl: './editable-grid.component.html',
  styleUrls: ['../../public/styles/ag-grid-styles.scss', './editable-grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditableGridComponent implements OnInit {
  public gridData: EditableGridRow[] = EDITABLE_GRID_DATA;
  public uneditedGridData: EditableGridRow[];
  public gridOptions: GridOptions = SKY_GRID_OPTIONS;
  public gridApi: GridApi;
  public editMode: boolean = false;
  public columnDefs: ColDef[];

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  public ngOnInit() {
    this.setColumnDefs();

    this.gridOptions.columnDefs = this.columnDefs;
    this.gridOptions.onGridReady = (gridReadyEvent: GridReadyEvent) => { this.onGridReady(gridReadyEvent); };
    this.gridOptions.rowSelection = 'none';
    this.gridOptions.suppressCellSelection = false;
    this.gridOptions.onGridSizeChanged = () => { this.sizeGrid(); };

    this.gridData.forEach((row: EditableGridRow) => {
      row.total = this.calculateRowTotal(row);
    });

    this.uneditedGridData = _cloneDeep(this.gridData);
  }

  public setColumnDefs() {
    this.columnDefs = [
      {
        colId: 'name',
        field: 'name',
        headerName: 'Goal Name',
        cellClass: 'sky-cell-uneditable',
        minWidth: 220
      },
      {
        colId: 'value1',
        field: 'value1',
        headerName: 'Update 1',
        editable: this.editMode,
        cellClass: 'sky-cell-editable sky-cell-number',
        onCellValueChanged: (changeEvent: CellValueChangedEvent) => this.onUpdateCellValueChanged(changeEvent),
        cellEditor: 'skyuxNumericEditorComponent'
      },
      {
        colId: 'value2',
        field: 'value2',
        headerName: 'Update 2',
        editable: this.editMode,
        cellClass: 'sky-cell-editable sky-cell-number',
        onCellValueChanged: (changeEvent: CellValueChangedEvent) => this.onUpdateCellValueChanged(changeEvent),
        cellEditor: 'skyuxNumericEditorComponent'
      },
      {
        colId: 'value3',
        field: 'value3',
        headerName: 'Update 3',
        editable: this.editMode,
        cellClass: 'sky-cell-editable sky-cell-number',
        onCellValueChanged: (changeEvent: CellValueChangedEvent) => this.onUpdateCellValueChanged(changeEvent),
        cellEditor: 'skyuxNumericEditorComponent'
      },
      {
        colId: 'total',
        field: 'total',
        headerName: 'Current Total',
        cellClass: 'sky-cell-uneditable sky-cell-number'
      },
      {
        colId: 'target',
        field: 'target',
        headerName: 'Target Value',
        cellClass: 'sky-cell-uneditable sky-cell-number'
      },
      {
        colId: 'completedDate',
        field: 'completedDate',
        headerName: 'Completed Date',
        editable: this.editMode,
        valueFormatter: this.dateFormatter,
        cellClass: 'sky-cell-editable sky-cell-date',
        cellEditor: 'skyuxDatepickerEditorComponent',
        minWidth: 160
      },
      {
        colId: 'dueDate',
        field: 'dueDate',
        headerName: 'Due Date',
        valueFormatter: this.dateFormatter,
        sort: 'asc',
        cellClass: 'sky-cell-uneditable',
        minWidth: 160
      }
    ];
  }

  public cancelEdits() {
    this.setEditMode(false);
    this.gridData = _cloneDeep(this.uneditedGridData);
  }

  public setEditMode(editable: boolean) {
    this.editMode = editable;
    this.setColumnDefs();
    this.gridApi.setColumnDefs(this.columnDefs);
    this.changeDetector.markForCheck();
  }

  public saveData() {
    this.gridApi.stopEditing();
    this.uneditedGridData = _cloneDeep(this.gridData);
    this.setEditMode(false);
    alert('save your data here!');
  }

  public onUpdateCellValueChanged(cellValueChangedData: CellValueChangedEvent) {
    if (cellValueChangedData.newValue !== cellValueChangedData.oldValue) {
      cellValueChangedData.data.total = this.calculateRowTotal(cellValueChangedData.data);
      this.gridApi.refreshCells({rowNodes: [cellValueChangedData.node]});
    }
  }

  public dateFormatter(params: ValueFormatterParams) {
    let dateConfig = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return params.value ? params.value.toLocaleDateString('en-us', dateConfig) : undefined;
  }

  public calculateRowTotal(row: EditableGridRow) {
    let rowValue = 0;
    if (row.value1 !== undefined) {
      rowValue = rowValue + row.value1;
    }
    if (row.value2 !== undefined) {
      rowValue = rowValue + row.value2;
    }
    if (row.value3 !== undefined) {
      rowValue = rowValue + row.value3;
    }

    return rowValue;
  }

  public onGridReady(gridReadyEvent: GridReadyEvent) {
    this.gridApi = gridReadyEvent.api;

    this.sizeGrid();
  }

  public sizeGrid() {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }
}
