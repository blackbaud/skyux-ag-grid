import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { SkyCellType, SkyAgGridService } from '@skyux/ag-grid';
import { SkyDataViewConfig } from '@skyux/data-manager';
import { SkyDocsDemoControlPanelChange } from '@skyux/docs-tools';
import { SkyModalService, SkyModalCloseArgs } from '@skyux/modals';

import {
  GridApi,
  GridReadyEvent,
  GridOptions,
  ValueFormatterParams,
} from 'ag-grid-community';

import { SKY_AG_GRID_DEMO_DATA } from './data-grid-docs-demo-data';

@Component({
  selector: 'app-data-grid-docs-demo',
  templateUrl: './data-grid-docs-demo.component.html',
})
export class SkyDataGridDemoComponent {
  public columnDefs = [
    {
      field: 'selected',
      type: SkyCellType.RowSelector,
    },
    {
      field: 'name',
      headerName: 'Name',
    },
    {
      field: 'age',
      headerName: 'Age',
      type: SkyCellType.Number,
      maxWidth: 60,
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      type: SkyCellType.Date,
      sort: 'asc',
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      type: SkyCellType.Date,
      valueFormatter: this.endDateFormatter,
    },
    {
      field: 'department',
      headerName: 'Department',
      type: SkyCellType.Autocomplete,
    },
    {
      field: 'jobTitle',
      headerName: 'Title',
      type: SkyCellType.Autocomplete,
    },
    {
      colId: 'validationCurrency',
      field: 'validationCurrency',
      type: [SkyCellType.CurrencyValidator],
    },
    {
      colId: 'validationDate',
      field: 'validationDate',
      type: [SkyCellType.Date, SkyCellType.Validator],
      cellRendererParams: {
        skyComponentProperties: {
          validator: (value: Date) => !!value && value > new Date(1985, 9, 26),
          validatorMessage: 'Please enter a future date',
        },
      },
    },
  ];

  public gridApi: GridApi | undefined;
  public gridData = SKY_AG_GRID_DEMO_DATA;
  public gridOptions: GridOptions;
  public searchText: string = '';
  public viewConfig: SkyDataViewConfig;
  public viewId = 'gridView';

  constructor(
    private agGridService: SkyAgGridService,
    private changeRef: ChangeDetectorRef
  ) {
    this.viewConfig = {
      id: this.viewId,
      name: 'Grid View',
      icon: 'table',
      searchEnabled: true,
      sortEnabled: true,
      multiselectToolbarEnabled: true,
      columnPickerEnabled: true,
      filterButtonEnabled: true,
      columnOptions: [
        {
          id: 'selected',
          alwaysDisplayed: true,
          label: 'selected',
        },
        {
          id: 'name',
          label: 'Fruit name',
          description: 'The name of the fruit.',
        },
        {
          id: 'description',
          label: 'Description',
          description: 'Some information about the fruit.',
        },
      ],
    };

    this.gridOptions = {
      columnDefs: this.columnDefs,
      onGridReady: (gridReadyEvent) => this.onGridReady(gridReadyEvent),
    };
    this.gridOptions = this.agGridService.getGridOptions({
      gridOptions: this.gridOptions,
    });
  }

  public onGridReady(gridReadyEvent: GridReadyEvent): void {
    this.gridApi = gridReadyEvent.api;

    this.gridApi.sizeColumnsToFit();
  }

  public searchApplied(searchText: string | void): void {
    if (searchText) {
      this.searchText = searchText;
    } else {
      this.searchText = '';
    }
    if (this.gridApi) {
      this.gridApi.setQuickFilter(searchText);
    }
  }

  private endDateFormatter(params: ValueFormatterParams): string {
    const dateConfig = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return params.value
      ? params.value.toLocaleDateString('en-us', dateConfig)
      : 'N/A';
  }
}
