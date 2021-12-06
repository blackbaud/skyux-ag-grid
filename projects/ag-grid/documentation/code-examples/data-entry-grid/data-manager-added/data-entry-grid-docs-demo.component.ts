import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  SkyAgGridService,
  SkyCellType
} from '@skyux/ag-grid';

import {
  ColDef,
  ColumnApi,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ValueFormatterParams
} from 'ag-grid-community';

import {
  SkyDataManagerState,
  SkyDataViewConfig,
  SkyDataManagerService
} from '@skyux/data-manager';

import { SkyDataEntryGridContextMenuComponent } from './data-entry-grid-docs-demo-context-menu.component';
import { SKY_AG_GRID_DEMO_DATA } from './data-entry-grid-docs-demo-data';
import { SkyDataEntryGridEditModalContext } from './data-entry-grid-docs-demo-edit-modal-context';
import { SkyDataEntryGridEditModalComponent } from './data-entry-grid-docs-demo-edit-modal.component';
import { SkyModalCloseArgs, SkyModalService } from '@skyux/modals';

@Component({
  selector: 'app-data-entry-grid-docs-demo',
  templateUrl: './data-entry-grid-docs-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyDataEntryGridDemoComponent implements OnInit {
  public gridData = SKY_AG_GRID_DEMO_DATA;

  @Input()
  public items: any[] = [];

  public viewId = 'gridView';

  // new
  public columnDefs: ColDef[] = [
    {
      colId: 'selected',
      field: 'selected',
      type: SkyCellType.RowSelector,
    },
    {
      colId: 'context',
      headerName: '',
      maxWidth: 50,
      sortable: false,
      cellRendererFramework: SkyDataEntryGridContextMenuComponent,
    },
    {
      colId: 'name',
      field: 'name',
      headerName: 'Name',
    },
    {
      colId: 'age',
      field: 'age',
      headerName: 'Age',
      type: SkyCellType.Number,
      maxWidth: 60,
    },
    {
      colId: 'startDate',
      field: 'startDate',
      headerName: 'Start Date',
      type: SkyCellType.Date,
      sort: 'asc',
    },
    {
      colId: 'endDate',
      field: 'endDate',
      headerName: 'End Date',
      type: SkyCellType.Date,
      valueFormatter: this.endDateFormatter,
    },
    {
      colId: 'department',
      field: 'department',
      headerName: 'Department',
      type: SkyCellType.Autocomplete,
    },
    {
      colId: 'jobTitle',
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

  // old
  // public columnDefs: ColDef[] = [
  //   {
  //     colId: 'selected',
  //     field: 'selected',
  //     headerName: '',
  //     maxWidth: 50,
  //     type: SkyCellType.RowSelector,
  //     suppressMovable: true,
  //     lockPosition: true,
  //     lockVisible: true
  //   },
  //   {
  //     colId: 'name',
  //     field: 'name',
  //     headerName: 'Fruit name',
  //     width: 150
  //   },
  //   {
  //     colId: 'description',
  //     field: 'description',
  //     headerName: 'Description'
  //   }
  // ];

  public dataState = new SkyDataManagerState({});

  public viewConfig: SkyDataViewConfig = {
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
        label: 'selected',
        alwaysDisplayed: true,
      },

      {
        id: 'context',
        label: 'context',
        alwaysDisplayed: true,
      },
      {
        id: 'name',
        label: 'Name',
        description: 'The name of the employee.',
      },
      {
        id: 'age',
        label: 'Age',
        description: 'The age of the employee.',
      },
      {
        id: 'startDate',
        label: 'Start Date',
        description: 'The start date of the employee.',
      },
      {
        id: 'endDate',
        label: 'End Date',
        description: 'The end date of the employee.',
      },
      {
        id: 'department',
        label: 'Department',
        description: 'The department of the employee',
      },
      {
        id: 'jobTitle',
        label: 'Title',
        description: 'The job title of the employee.',
      },
      {
        id: 'validationCurrency',
        label: 'Validation Currency',
        description: 'An example column for currency validation.',
      },
      {
        id: 'validationDate',
        label: 'Validation Date',
        description: 'An example column for date validation.',
      },
    ]
  };

  public columnApi?: ColumnApi;
  public displayedItems: any[] = [];
  public gridApi?: GridApi;
  public gridInitialized = false;
  public gridOptions!: GridOptions;
  public isActive = false;

  constructor(
    private agGridService: SkyAgGridService,
    private changeDetector: ChangeDetectorRef,
    private dataManagerService: SkyDataManagerService,
    private modalService: SkyModalService,
  ) {}

  public ngOnInit(): void {
    this.displayedItems = this.items;

    this.dataManagerService.initDataView(this.viewConfig);

    this.gridOptions = this.agGridService.getGridOptions(
      {
        gridOptions: {
          columnDefs: this.columnDefs,
          onGridReady: this.onGridReady.bind(this)
        }
      });

    this.dataManagerService.getDataStateUpdates(this.viewId).subscribe(state => {
      this.dataState = state;
      this.setInitialColumnOrder();
      this.updateData();
      this.changeDetector.detectChanges();
    });

    this.dataManagerService.getActiveViewIdUpdates().subscribe(id => {
        this.isActive = id === this.viewId;
    });
  }

  public updateData(): void {
    this.sortItems();
    this.displayedItems = this.filterItems(this.searchItems(this.items));

    if (this.dataState.onlyShowSelected) {
      this.displayedItems = this.displayedItems.filter(item => item.selected);
    }
  }

  public setInitialColumnOrder(): void {
    let viewState = this.dataState.getViewStateById(this.viewId);
    let visibleColumns = viewState.displayedColumnIds;

    this.columnDefs.sort((col1, col2) => {
        let col1Index = visibleColumns.findIndex((colId: string) => colId === col1.colId);
        let col2Index = visibleColumns.findIndex((colId: string) => colId === col2.colId);

        if (col1Index === -1) {
          col1.hide = true;
          return 0;
        } else if (col2Index === -1) {
          col2.hide = true;
          return 0;
        } else {
          return col1Index - col2Index;
        }
    });

    this.gridInitialized = true;
  }

  public onGridReady(event: GridReadyEvent): void {
    this.columnApi = event.columnApi;
    this.gridApi = event.api;
    this.gridApi.sizeColumnsToFit();
    this.updateData();
  }

  public sortItems(): void {
    let sortOption = this.dataState.activeSortOption;
    if (this.columnApi && sortOption) {
      const allColumns = this.columnApi.getAllColumns() || [];
      allColumns.forEach(column => {
        if (column.getColId() === sortOption.propertyName) {
          column.setSort(sortOption.descending ? 'desc' : 'asc');
        } else {
          column.setSort('none');
        }
      });
    }
  }

  public searchItems(items: any[]): any[] {
    let searchedItems = items;
    let searchText = this.dataState && this.dataState.searchText;

    if (searchText) {
      searchedItems = items.filter(function (item: any) {
        let property: any;

        for (property in item) {
          if (item.hasOwnProperty(property) && (property === 'name' || property === 'description')) {
            const propertyText = item[property].toLowerCase();
            if (propertyText.indexOf(searchText) > -1) {
              return true;
            }
          }
        }

        return false;
      });
    }
    return searchedItems;
  }

  public filterItems(items: any[]): any[] {
    let filteredItems = items;
    let filterData = this.dataState && this.dataState.filterData;

    if (filterData && filterData.filters) {
      let filters = filterData.filters;
      filteredItems = items.filter((item: any) => {
        return ((filters.hideOrange && item.color !== 'orange') || !filters.hideOrange) &&
          ((filters.type !== 'any' && item.type === filters.type) || (!filters.type || filters.type === 'any'));
      });
    }

    return filteredItems;
  }

  public openModal(): void {
    const context = new SkyDataEntryGridEditModalContext();
    context.gridData = this.gridData;

    const options = {
      providers: [
        { provide: SkyDataEntryGridEditModalContext, useValue: context },
      ],
      ariaDescribedBy: 'docs-edit-grid-modal-content',
      size: 'large',
    };

    const modalInstance = this.modalService.open(
      SkyDataEntryGridEditModalComponent,
      options
    );

    modalInstance.closed.subscribe((result: SkyModalCloseArgs) => {
      if (result.reason === 'cancel' || result.reason === 'close') {
        alert('Edits canceled!');
      } else {
        this.gridData = result.data;
        if (this.gridApi) {
          this.gridApi.refreshCells();
        }
        alert('Saving data!');
      }
    });
  }

  public searchApplied(searchText: string | void): void {
    if (searchText) {
      this.dataState.searchText = searchText;
    } else {
      this.dataState.searchText = '';
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
