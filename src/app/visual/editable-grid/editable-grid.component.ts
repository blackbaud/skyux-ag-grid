import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import {
  CellClassParams,
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
} from '../../public';

import {
  SkyCellType
} from '../../public';

@Component({
  selector: 'editable-grid-visual',
  templateUrl: './editable-grid.component.html',
  styleUrls: ['./editable-grid.component.scss'],
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
    this.gridOptions = this.agGridService.getGridOptions({ gridOptions: this.gridOptions });

    this.gridData.forEach((row: EditableGridRow) => {
      row.total = this.calculateRowTotal(row);
    });

    this.uneditedGridData = this.cloneGridData(this.gridData);
  }

  public setColumnDefs() {
    this.columnDefs = [
      {
        colId: 'name',
        field: 'name',
        headerName: 'Goal Name',
        minWidth: 220
      },
      {
        colId: 'completedDate',
        field: 'completedDate',
        headerName: 'Completed Date',
        editable: this.editMode,
        type: SkyCellType.Date,
        minWidth: 160,
        cellEditorParams: { startingDay: 1 }
      },
      {
        colId: 'value1',
        field: 'value1',
        headerName: 'Update 1',
        editable: this.editMode,
        onCellValueChanged: (changeEvent: CellValueChangedEvent) => this.onUpdateCellValueChanged(changeEvent),
        type: SkyCellType.Number
      },
      {
        colId: 'value2',
        field: 'value2',
        headerName: 'Update 2',
        editable: this.editMode,
        onCellValueChanged: (changeEvent: CellValueChangedEvent) => this.onUpdateCellValueChanged(changeEvent),
        type: SkyCellType.Number
      },
      {
        colId: 'value3',
        field: 'value3',
        headerName: 'Update 3',
        editable: this.editMode,
        onCellValueChanged: (changeEvent: CellValueChangedEvent) => this.onUpdateCellValueChanged(changeEvent),
        type: SkyCellType.Number
      },
      {
        colId: 'total',
        field: 'total',
        headerName: 'Current Total',
        type: SkyCellType.Number,
        cellClass: this.totalCellClass
      },
      {
        colId: 'target',
        field: 'target',
        headerName: 'Target Value',
        type: SkyCellType.Number
      },
      {
        colId: 'dueDate',
        field: 'dueDate',
        headerName: 'Due Date',
        type: SkyCellType.Date,
        sort: 'asc',
        minWidth: 160
      }
    ];
  }

  public cloneGridData(data: EditableGridRow[]): EditableGridRow[] {
    let clonedData: EditableGridRow[] = [];
    data.forEach(row => {
      clonedData.push( {...row});
    });

    return clonedData;
  }

  public cancelEdits() {
    this.setEditMode(false);
    this.gridData = this.cloneGridData(this.uneditedGridData);
  }

  public setEditMode(editable: boolean) {
    this.editMode = editable;
    this.setColumnDefs();
    this.gridApi.setColumnDefs(this.columnDefs);
    this.changeDetector.markForCheck();
  }

  public saveData() {
    this.gridApi.stopEditing();
    this.uneditedGridData = this.cloneGridData(this.gridData);
    this.setEditMode(false);
    alert('save your data here!');
  }

  public totalCellClass(params: CellClassParams) {
    const difference = params.data.target - params.data.total;
    const thresholdOne = params.data.target / 3;
    const thresholdTwo = thresholdOne * 2;
    if (difference >= thresholdTwo) {
      return 'red';
    } else if (difference >= thresholdOne) {
      return 'yellow';
    } else {
      return 'green';
    }
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
