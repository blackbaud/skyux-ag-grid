import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import {
  ColumnApi,
  GridReadyEvent,
  GridOptions,
  ICellRendererParams
} from 'ag-grid-community';

import {
  GridSizingMode,
  READONLY_GRID_DATA,
  ReadonlyGridRow,
  RowStatusNames
} from './readonly-grid-data';
import {
  SkyAgGridService,
  SkyCellType
} from '../../public';

@Component({
  selector: 'readonly-grid-visual',
  templateUrl: './readonly-grid.component.html',
  styleUrls: ['./readonly-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadonlyGridComponent implements OnInit {
  public gridData: ReadonlyGridRow[] = READONLY_GRID_DATA;
  public gridOptions: GridOptions;
  public columnApi: ColumnApi;
  public readonly fitGridSizing: GridSizingMode = GridSizingMode.FIT;
  public readonly autoGridSizing: GridSizingMode = GridSizingMode.AUTO;
  public sizingMode: GridSizingMode = this.fitGridSizing;
  public columnDefs = [
    {
      field: 'selected',
      headerName: '',
      maxWidth: 50,
      sortable: false,
      type: SkyCellType.RowSelector
    },
    {
      field: 'name',
      headerName: 'Goal Name'
    },
    {
      field: 'value',
      headerName: 'Current Value',
      type: SkyCellType.Number
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      type: SkyCellType.Date,
      sort: 'asc'
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      type: SkyCellType.Date
    },
    {
      field: 'comment',
      headerName: 'Comment',
      minWidth: 400
    },
    {
      field: 'status',
      headerName: 'Status',
      sortable: false,
      cellRenderer: this.statusRenderer
    }];

  constructor(private agGridService: SkyAgGridService) { }

  public ngOnInit(): void {
    this.gridOptions = {
      onGridReady: gridReadyEvent => this.onGridReady(gridReadyEvent)
    };
    this.gridOptions = this.agGridService.getGridOptions({ gridOptions: this.gridOptions });
  }

  public statusRenderer(cellRendererParams: ICellRendererParams): string {
    const iconClassMap = {
      [RowStatusNames.BEHIND]: 'fa-warning',
      [RowStatusNames.CURRENT]: 'fa-clock-o',
      [RowStatusNames.COMPLETE]: 'fa-check'
    };
    return `<div class="status ${cellRendererParams.value.toLowerCase()}">
              <i class="fa ${iconClassMap[cellRendererParams.value]}"></i> ${cellRendererParams.value}
            </div>`;
  }

  public onGridReady(gridReadyEvent: GridReadyEvent): void {
    this.columnApi = gridReadyEvent.columnApi;

    this.columnApi.autoSizeColumns(['name', 'value', 'startDate', 'endDate', 'comment', 'status']);
  }
}
