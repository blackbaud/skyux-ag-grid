import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { SkyCellType, SkyAgGridService } from '@skyux/ag-grid';
import { SkyModalService, SkyModalCloseArgs } from '@skyux/modals';

import {
  GridApi,
  GridReadyEvent,
  GridOptions,
  ValueFormatterParams,
} from 'ag-grid-community';

import { SkyDataEntryGridContextMenuComponent } from './data-entry-grid-docs-demo-context-menu.component';
import { SKY_AG_GRID_DEMO_DATA } from './data-entry-grid-docs-demo-data';
import { SkyDataEntryGridEditModalContext } from './data-entry-grid-docs-demo-edit-modal-context';
import { SkyDataEntryGridEditModalComponent } from './data-entry-grid-docs-demo-edit-modal.component';

@Component({
  selector: 'app-data-entry-grid-docs-demo',
  templateUrl: './data-entry-grid-docs-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkyDataEntryGridDemoComponent {
  public gridData = SKY_AG_GRID_DEMO_DATA;
  public columnDefs = [
    {
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
  public gridOptions: GridOptions;
  public searchText: string = '';

  constructor(
    private agGridService: SkyAgGridService,
    private modalService: SkyModalService,
    private changeDetection: ChangeDetectorRef
  ) {
    this.gridOptions = {
      columnDefs: this.columnDefs,
      onGridReady: (gridReadyEvent) => this.onGridReady(gridReadyEvent),
    };
    this.gridOptions = this.agGridService.getGridOptions({
      gridOptions: this.gridOptions,
    });
    this.changeDetection.markForCheck();
  }

  public onGridReady(gridReadyEvent: GridReadyEvent): void {
    this.gridApi = gridReadyEvent.api;
    this.gridApi.sizeColumnsToFit();
    this.changeDetection.markForCheck();
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
