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
  GridOptions
} from 'ag-grid-community';

import {
  EDITABLE_GRID_DATA,
  EditableGridRow
} from './editable-grid-data';

import {
  SkyAgGridService
} from '../../public/ag-grid.service';
import { SkyCellEditorType } from '../../public/types';

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
  public gridOptions: GridOptions;
  public gridApi: GridApi;
  public editMode: boolean = false;
  public columnDefs: ColDef[];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private agGridService: SkyAgGridService
  ) { }

  public ngOnInit() {
    this.setColumnDefs();

    this.gridOptions = {
      rowSelection: 'none',
      suppressCellSelection: false,
      onGridReady: (gridReadyEvent: GridReadyEvent) => { this.onGridReady(gridReadyEvent); },
      onGridSizeChanged: () => { this.sizeGrid(); }
    };
    this.gridOptions = this.agGridService.getGridOptions(this.gridOptions);

    this.gridData.forEach((row: EditableGridRow) => {
      row.total = this.calculateRowTotal(row);
    });

    this.uneditedGridData = _cloneDeep(this.gridData);
  }

  public setColumnDefs() {
    this.columnDefs = [
      this.agGridService.getColumnDefinition({
        colId: 'name',
        field: 'name',
        headerName: 'Goal Name',
        minWidth: 220
      }),
      this.agGridService.getColumnDefinition({
        colId: 'value1',
        field: 'value1',
        headerName: 'Update 1',
        editable: this.editMode,
        onCellValueChanged: (changeEvent: CellValueChangedEvent) => this.onUpdateCellValueChanged(changeEvent)
      }, { cellEditorType: SkyCellEditorType.Number }),
      this.agGridService.getColumnDefinition({
        colId: 'value2',
        field: 'value2',
        headerName: 'Update 2',
        editable: this.editMode,
        onCellValueChanged: (changeEvent: CellValueChangedEvent) => this.onUpdateCellValueChanged(changeEvent)
      }, { cellEditorType: SkyCellEditorType.Number }),
      this.agGridService.getColumnDefinition({
        colId: 'value3',
        field: 'value3',
        headerName: 'Update 3',
        editable: this.editMode,
        onCellValueChanged: (changeEvent: CellValueChangedEvent) => this.onUpdateCellValueChanged(changeEvent)
      }, { cellEditorType: SkyCellEditorType.Number }),
      this.agGridService.getColumnDefinition({
        colId: 'total',
        field: 'total',
        headerName: 'Current Total',
        type: 'number'
      }),
      this.agGridService.getColumnDefinition({
        colId: 'target',
        field: 'target',
        headerName: 'Target Value',
        type: 'number'
      }),
      this.agGridService.getColumnDefinition({
        colId: 'completedDate',
        field: 'completedDate',
        headerName: 'Completed Date',
        editable: this.editMode,
        type: 'date',
        minWidth: 160
      }, { cellEditorType: SkyCellEditorType.Datepicker }),
      this.agGridService.getColumnDefinition({
        colId: 'dueDate',
        field: 'dueDate',
        headerName: 'Due Date',
        type: 'date',
        sort: 'asc',
        minWidth: 160
      })
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
