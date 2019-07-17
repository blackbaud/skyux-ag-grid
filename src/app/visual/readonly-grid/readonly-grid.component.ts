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
  RowSelectedEvent
} from 'ag-grid-community';

import {
  GridSizingMode,
  READONLY_GRID_DATA,
  ReadonlyGridRow,
  RowStatusNames
} from './readonly-grid-data';
import {
  SkyAgGridService
} from '../../public/ag-grid.service';

import {
  SkyCellRendererType
} from '../../public/types';

@Component({
  selector: 'readonly-grid-visual',
  templateUrl: './readonly-grid.component.html',
  styleUrls: ['../../public/styles/ag-grid-styles.scss', './readonly-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadonlyGridComponent implements OnInit {
  public gridData: ReadonlyGridRow[] = READONLY_GRID_DATA;
  public gridOptions: GridOptions;
  public gridApi: GridApi;
  public columnApi: ColumnApi;
  public readonly fitGridSizing: GridSizingMode = GridSizingMode.FIT;
  public readonly autoGridSizing: GridSizingMode = GridSizingMode.AUTO;
  public sizingMode: GridSizingMode = this.fitGridSizing;
  public columnDefs: ColDef[] = [
    this.agGridService.getColumnDefinition({
      field: 'selected',
      headerName: '',
      width: 50,
      minWidth: 50,
      maxWidth: 50,
      sortable: false
    }, { cellRendererType: SkyCellRendererType.RowSelector }),
    this.agGridService.getColumnDefinition({
      field: 'name',
      headerName: 'Goal Name'
    }),
    this.agGridService.getColumnDefinition({
      field: 'value',
      headerName: 'Current Value',
      type: 'number'
    }),
    this.agGridService.getColumnDefinition({
      field: 'startDate',
      headerName: 'Start Date',
      type: 'date',
      sort: 'asc'
    }),
    this.agGridService.getColumnDefinition({
      field: 'endDate',
      headerName: 'End Date',
      type: 'date'
    }),
    this.agGridService.getColumnDefinition({
      field: 'comment',
      headerName: 'Comment',
      minWidth: 400
    }),
    this.agGridService.getColumnDefinition({
      field: 'status',
      headerName: 'Status',
      sortable: false,
      cellRenderer: this.statusRenderer
    })];

  constructor(private agGridService: SkyAgGridService) { }

  public ngOnInit() {
    this.gridOptions = this.agGridService.getGridOptions();
    this.gridOptions.onGridReady = (gridReadyEvent: GridReadyEvent) => { this.onGridReady(gridReadyEvent); };
    this.gridOptions.onRowSelected = (rowSelectedEvent: RowSelectedEvent) => {
      rowSelectedEvent.data.selected = rowSelectedEvent.node.isSelected();
      this.gridApi.refreshCells({rowNodes: [rowSelectedEvent.node]});
    };
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
