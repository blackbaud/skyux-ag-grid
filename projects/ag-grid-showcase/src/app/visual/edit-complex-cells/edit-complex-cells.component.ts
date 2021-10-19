import {
  Component,
  HostListener,
  OnInit
} from '@angular/core';

import { SkyThemeService } from '@skyux/theme';

import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent
} from 'ag-grid-community';

import {
  EDITABLE_GRID_DATA,
  EDITABLE_GRID_LOOKUP,
  EDITABLE_GRID_OPTIONS,
  EditableGridOption,
  EditableGridRow
} from './edit-complex-cells-data';

import {
  SkyAgGridService,
  SkyCellType
} from '@skyux/ag-grid';

@Component({
  selector: 'edit-complex-cells-visual',
  templateUrl: './edit-complex-cells.component.html',
  styleUrls: ['./edit-complex-cells.component.scss']
})
export class EditComplexCellsComponent implements OnInit {
  @HostListener('window:resize')
  public onWindowResize() {
    this.sizeGrid();
  }

  public gridData = EDITABLE_GRID_DATA;
  public editMode = false;
  public uneditedGridData: EditableGridRow[];
  public gridOptions: GridOptions;
  public gridApi: GridApi;
  public columnDefs: ColDef[];

  constructor(
    private agGridService: SkyAgGridService,
    public themeSvc: SkyThemeService
  ) { }

  public ngOnInit(): void {
    this.setColumnDefs();

    this.getGridOptions();

    this.themeSvc.settingsChange.subscribe(() => {
      this.getGridOptions();
    });

    this.uneditedGridData = this.cloneGridData(this.gridData);
  }

  public setColumnDefs(): void {
    this.columnDefs = [
      {
        colId: 'name',
        field: 'name',
        headerName: 'Name',
        minWidth: 220,
        editable: this.editMode,
        type: SkyCellType.Text
      },
      {
        colId: 'language',
        field: 'language',
        minWidth: 185,
        maxWidth: 235,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['English', 'Spanish', 'French', 'Portuguese', '(other)']
        },
        editable: this.editMode
      },
      {
        colId: 'validationAutocomplete',
        field: 'validationAutocomplete',
        minWidth: 185,
        maxWidth: 235,
        editable: this.editMode,
        type: [SkyCellType.Autocomplete, SkyCellType.Validator],
        cellEditorParams: {
          skyComponentProperties: {
            data: EDITABLE_GRID_OPTIONS
          }
        },
        cellRendererParams: {
          skyComponentProperties: {
            validator: (value: EditableGridOption) => !!value.validOption,
            validatorMessage: 'Please choose an odd number option'
          }
        }
      },
      {
        colId: 'validationCurrency',
        field: 'validationCurrency',
        minWidth: 185,
        maxWidth: 235,
        editable: this.editMode,
        type: [SkyCellType.CurrencyValidator]
      },
      {
        colId: 'validationDate',
        field: 'validationDate',
        minWidth: 185,
        maxWidth: 235,
        editable: this.editMode,
        type: [SkyCellType.Date, SkyCellType.Validator],
        cellRendererParams: {
          skyComponentProperties: {
            validator: (value: Date) => !!value && value > new Date(1985, 9, 26),
            validatorMessage: 'Please enter a future date'
          }
        }
      },
      {
        colId: 'lookupSingle',
        field: 'lookupSingle',
        minWidth: 185,
        maxWidth: 235,
        editable: this.editMode,
        type: SkyCellType.Lookup,
        cellEditorParams: {
          skyComponentProperties: {
            data: EDITABLE_GRID_LOOKUP,
            idProperty: 'id',
            descriptorProperty: 'name',
            selectMode: 'single'
          }
        },
        cellRendererParams: {
          skyComponentProperties: {
            descriptorProperty: 'name'
          }
        }
      },
      {
        colId: 'lookupMultiple',
        field: 'lookupMultiple',
        minWidth: 185,
        maxWidth: 235,
        editable: this.editMode,
        type: SkyCellType.Lookup,
        cellEditorParams: {
          skyComponentProperties: {
            data: EDITABLE_GRID_LOOKUP,
            idProperty: 'id',
            descriptorProperty: 'name',
            selectMode: 'multiple',
            enableShowMore: true
          }
        },
        cellRendererParams: {
          skyComponentProperties: {
            descriptorProperty: 'name'
          }
        }
      }
    ];
  }

  public cloneGridData(data: EditableGridRow[]): EditableGridRow[] {
    let clonedData: EditableGridRow[] = [];
    data.forEach(row => {
      clonedData.push({ ...row });
    });

    return clonedData;
  }

  public cancelEdits(): void {
    this.setEditMode(false);
    this.gridData = this.cloneGridData(this.uneditedGridData);
  }

  public setEditMode(editable: boolean): void {
    this.editMode = editable;
    this.setColumnDefs();
    this.gridApi.setColumnDefs(this.columnDefs);
    this.gridApi.redrawRows();
  }

  public saveData(): void {
    this.uneditedGridData = this.cloneGridData(this.gridData);
    this.setEditMode(false);
    alert('save your data here!');
  }

  public onGridReady(gridReadyEvent: GridReadyEvent): void {
    this.gridApi = gridReadyEvent.api;

    this.sizeGrid();
  }

  public sizeGrid(): void {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }

  private getGridOptions(): void {
    this.gridOptions = {
      suppressColumnVirtualisation: true,
      columnDefs: this.columnDefs,
      domLayout: 'normal',
      popupParent: document.body,
      onGridReady: gridReadyEvent => this.onGridReady(gridReadyEvent),
      onGridSizeChanged: () => { this.sizeGrid(); }
    };
    this.gridOptions = this.agGridService.getEditableGridOptions({ gridOptions: this.gridOptions });
    this.gridOptions.stopEditingWhenCellsLoseFocus = true;
  }
}
