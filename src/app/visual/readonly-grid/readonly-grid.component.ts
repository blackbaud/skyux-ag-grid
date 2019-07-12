import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import {
  ColumnApi,
  ColDef,
  GridApi,
  GridReadyEvent,
  GridOptions,
  ICellRendererParams,
  RowNode,
  RowSelectedEvent,
  ValueFormatterParams
} from 'ag-grid-community';

import {
  GridSizingMode,
  READONLY_GRID_DATA,
  ReadonlyGridRow,
  RowStatusNames
} from './readonly-grid-data';

import {
  SKY_GRID_OPTIONS
} from '../../public/grid-options';

@Component({
  selector: 'readonly-grid-visual',
  templateUrl: './readonly-grid.component.html',
  styleUrls: ['../../public/styles/ag-grid-styles.scss', './readonly-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadonlyGridComponent implements OnInit {
  public gridData: ReadonlyGridRow[] = READONLY_GRID_DATA;
  public gridOptions: GridOptions = SKY_GRID_OPTIONS;
  public gridApi: GridApi;
  public columnApi: ColumnApi;
  public readonly fitGridSizing: GridSizingMode = GridSizingMode.FIT;
  public readonly autoGridSizing: GridSizingMode = GridSizingMode.AUTO;
  public sizingMode: GridSizingMode = this.fitGridSizing;
  public columnDefs: ColDef[] = [
    {
      field: 'selected',
      headerName: '',
      cellRenderer: 'skyuxCheckboxComponent',
      width: 50,
      minWidth: 50,
      maxWidth: 50
    },
    {
      field: 'name',
      headerName: 'Goal Name'
    },
    {
      field: 'value',
      headerName: 'Current Value',
      cellClass: 'sky-cell-number'
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      valueFormatter: this.dateFormatter,
      sort: 'asc'
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      valueFormatter: this.dateFormatter
    },
    {
      field: 'comment',
      headerName: 'Comment'
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: false,
      cellRenderer: this.statusRenderer
    }];

  public ngOnInit() {
    this.gridOptions.columnDefs = this.columnDefs;
    this.gridOptions.onGridReady = (gridReadyEvent: GridReadyEvent) => { this.onGridReady(gridReadyEvent); };
    this.gridOptions.onRowSelected = (rowSelectedEvent: RowSelectedEvent) => {
      rowSelectedEvent.data.selected = rowSelectedEvent.node.isSelected();
      this.gridApi.refreshCells({rowNodes: [rowSelectedEvent.node]});
    };
  }

  public dateFormatter(params: ValueFormatterParams) {
    let dateConfig = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return params.value.toLocaleDateString('en-US', dateConfig);
  }

  public statusRenderer(cellRendererParams: ICellRendererParams) {
    const iconClassMap = {
      [RowStatusNames.BEHIND]: 'fa-warning',
      [RowStatusNames.CURRENT]: 'fa-clock-o',
      [RowStatusNames.COMPLETE]: 'fa-check'
    };
    return `<div class="status ${cellRendererParams.value.toLowerCase()}">
              <i class="fa ${iconClassMap[cellRendererParams.value]}"></i> ${cellRendererParams.value}
            </div>`;
  }

  public onGridReady(gridReadyEvent: GridReadyEvent) {
    this.gridApi = gridReadyEvent.api;
    this.columnApi = gridReadyEvent.columnApi;

    this.columnApi.autoSizeColumns(['name', 'value', 'startDate', 'endDate', 'comment', 'status']);

    this.gridApi.forEachNode((rowNode: RowNode) => {
      if (rowNode.data.selected) {
        rowNode.setSelected(true);
      }
    });
  }
}
