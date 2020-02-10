import {
  Component,
  OnInit
} from '@angular/core';

import {
  ColumnApi,
  GridReadyEvent,
  GridOptions,
  ICellRendererParams
} from 'ag-grid-community';

import {
  READONLY_GRID_DATA,
  RowStatusNames
} from './readonly-grid-data';
import {
  SkyAgGridService,
  SkyCellType
} from '../../public';

let nextId = 0;

@Component({
  selector: 'readonly-grid-visual',
  templateUrl: './readonly-grid.component.html',
  styleUrls: ['./readonly-grid.component.scss']
})
export class ReadonlyGridComponent implements OnInit {
  public gridData = READONLY_GRID_DATA;
  public hasMore = true;
  public gridOptions: GridOptions;
  public columnApi: ColumnApi;
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
      type: SkyCellType.Date
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
      columnDefs: this.columnDefs,
      onGridReady: gridReadyEvent => this.onGridReady(gridReadyEvent)
    };
    this.gridOptions = this.agGridService.getGridOptions({ gridOptions: this.gridOptions });
  }

  public onScrollEnd(): void {
    if (this.hasMore) {
      // MAKE API REQUEST HERE
      // I am faking an API request because I don't have one to work with
      this.mockRemote().then((result: any) => {
        this.gridData = this.gridData.concat(result.data);
        this.hasMore = result.hasMore;
      });
    }
  }

  public mockRemote(): Promise<any> {
    const data: any[] = [];

    for (let i = 0; i < 8; i++) {
      data.push({
        name: `Item #${++nextId}`
      });
    }

    // Simulate async request.
    return new Promise((resolve: any) => {
      setTimeout(() => {
        resolve({
          data,
          hasMore: (nextId < 50)
        });
      }, 1000);
    });
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
