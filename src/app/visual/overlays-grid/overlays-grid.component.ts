import {
  Component,
  OnInit
} from '@angular/core';

import {
  GridApi,
  GridOptions,
  GridReadyEvent,
  ICellRendererParams,
  IGetRowsParams
} from 'ag-grid-community';

import {
  SkyAgGridService,
  SkyCellType
} from '../../public/public_api';

import {
  Observable,
  Subject
} from 'rxjs';
let nextId = 0;

/**
 * Note that the ag-grid guidelines state NOT to use the loading
 *  overlay for infinite scroll models as it would hide anything
 *  that is already loaded.
 */
@Component({
  selector: 'overlays-grid-visual',
  templateUrl: './overlays-grid.component.html'
})
export class OverlaysGridComponent implements OnInit {
  public gridApi: GridApi;
  public gridOptions: GridOptions;
  public hasMore = true;

  public columnDefs = [
    {
      field: 'name',
      headerName: 'Goal Name',
      autoHeight: true
    },
    {
      field: 'value',
      headerName: 'Current Value',
      type: SkyCellType.Number,
      maxWidth: 200
    },
    {
      field: 'comment',
      headerName: 'Comment',
      maxWidth: 500,
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams) => {
        return `<div style="white-space: normal">${params.value || ''}</div>`;
      }
    }];

  constructor(private agGridService: SkyAgGridService) { }

  public ngOnInit(): void {
    this.gridOptions = {
      columnDefs: this.columnDefs,
      onGridReady: gridReadyEvent => this.onGridReady(gridReadyEvent),
      pagination: true,
      paginationPageSize: 8,
      rowModelType: 'infinite',
      cacheBlockSize: 8
    };
    this.gridOptions = this.agGridService.getGridOptions({ gridOptions: this.gridOptions });
  }

  public showLoadingOverlay(): void {
    this.gridOptions.api.showLoadingOverlay();
  }

  public showNoRowsOverlay(): void {
    this.gridOptions.api.showNoRowsOverlay();
  }

  public hideOverlay(): void {
    this.gridOptions.api.hideOverlay();
  }

  public mockRemote(startRow: number): Observable<any> {
    this.showLoadingOverlay();
    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Convallis a cras semper auctor neque vitae tempus quam. Tempor orci eu lobortis elementum nibh tellus molestie. Tempus imperdiet nulla malesuada pellentesque elit.';
    const data: any[] = [];

    for (let i = 0; i < 8; i++) {
      data.push({
        name: `Item #${++nextId}`,
        value: nextId,
        comment: i % 3 === 0 ? lorem : ''
      });
    }

    let results = new Subject<any>();

    setTimeout(() => {
      results.next({
        data,
        hasMore: (nextId < 50)
      });
    }, 3000);
    return results;
  }

  public onGridReady(gridReadyEvent: GridReadyEvent): void {
    this.gridApi = gridReadyEvent.api;
    this.gridApi.sizeColumnsToFit();
    this.gridApi.resetRowHeights();

    let datasource = {
      getRows: (params: IGetRowsParams) => this.dataSourceGetRowData(params)
    };
    this.gridApi.setDatasource(datasource);
  }

  public dataSourceGetRowData(params: IGetRowsParams) {
    this.mockRemote(params.startRow).subscribe((result: any) => {
      this.hasMore = result.hasMore;
      let lastRow = -1;
      if (!this.hasMore) {
        lastRow = params.startRow + result.data.length;
      }
      this.hideOverlay();
      params.successCallback(result.data, lastRow);
    });
  }
}
