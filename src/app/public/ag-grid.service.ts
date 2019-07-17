import {
  Injectable
} from '@angular/core';

import {
  CellClassParams,
  ColDef,
  GridOptions,
  ValueFormatterParams
} from 'ag-grid-community';

import {
  SkyCellRendererRowSelectorComponent
} from './cell-renderers/cell-renderer-row-selector/cell-renderer-row-selector.component';

import {
  SkyCellEditorNumberComponent
} from './cell-editors/cell-editor-number/cell-editor-number.component';

import {
  SkyCellEditorDatepickerComponent
} from './cell-editors/cell-editor-datepicker/cell-editor-datepicker.component';

import {
  SkyCellEditorType,
  SkyCellRendererType,
  SkyColumnDefinitionConfig
} from './types';

type CellClassFunction = ((cellClassParams: CellClassParams) => string | string[]);
type CellClass = string | string[] | CellClassFunction;

function dateFormatter(params: ValueFormatterParams) {
    let dateConfig = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return params.value ? params.value.toLocaleDateString('en-us', dateConfig) : undefined;
}

const SKY_GRID_OPTIONS: GridOptions = {
  columnTypes: {
    number: {
      cellClass: 'purple'
    },
    date: {
      valueFormatter: dateFormatter
    }
  },
  defaultColDef: {
    sortable: true,
    resizable: true,
    minWidth: 100,
    cellClass: 'blah'
  },
  enterMovesDownAfterEdit: true,
  frameworkComponents: {
    [SkyCellRendererType.RowSelector]: SkyCellRendererRowSelectorComponent,
    [SkyCellEditorType.Number]: SkyCellEditorNumberComponent,
    [SkyCellEditorType.Datepicker]: SkyCellEditorDatepickerComponent
  },
  headerHeight: 37,
  icons: {
    sortDescending: '<i class="fa fa-caret-down"></i>',
    sortAscending: '<i class="fa fa-caret-up"></i>',
    columnMoveMove: '<i class="fa fa-arrows"></i>',
    columnMoveHide: '<i class="fa fa-arrows"></i>',
    columnMoveLeft: '<i class="fa fa-arrows"></i>',
    columnMoveRight: '<i class="fa fa-arrows"></i>',
    columnMovePin: '<i class="fa fa-arrows"></i>'
  },
  rowHeight: 37,
  rowMultiSelectWithClick: true,
  rowSelection: 'multiple',
  singleClickEdit: true,
  sortingOrder: ['desc', 'asc', 'null'],
  suppressCellSelection: true,
  suppressDragLeaveHidesColumns: true
};

@Injectable()
export class SkyAgGridService {

  public getGridOptions(options?: GridOptions): GridOptions {
    let mergedGridOptions: GridOptions = {
      ...SKY_GRID_OPTIONS,
      ...options
    };
    return mergedGridOptions;
  }

  public getColumnDefinition(initialColumnDefinition: ColDef, columnDefinitionConfig: SkyColumnDefinitionConfig = {}): ColDef {
    let mergedColumnDefinition: ColDef = {};
    Object.assign(mergedColumnDefinition, initialColumnDefinition);

    mergedColumnDefinition.cellClass = this.getCellClassFunction(initialColumnDefinition.cellClass, columnDefinitionConfig);

    if (this.isSkyCellEditorType(columnDefinitionConfig.cellEditorType)) {
      mergedColumnDefinition.cellEditor = columnDefinitionConfig.cellEditorType;
    }

    if (this.isSkyCellRendererType(columnDefinitionConfig.cellRendererType)) {
      mergedColumnDefinition.cellRenderer = columnDefinitionConfig.cellRendererType;
    }

    return mergedColumnDefinition;
  }

  private getCellClassFunction(initialCellClass: CellClass, columnDefinitionConfig: SkyColumnDefinitionConfig = {}): CellClassFunction {
    let cellClassFunction: CellClassFunction = (params: CellClassParams): string[] => {
      let cellClasses: string[] = [];

      if (typeof initialCellClass === 'string' || typeof initialCellClass === 'object') {
        cellClasses = this.createCellClasses(initialCellClass);
      } else if (typeof initialCellClass === 'function') {
        let calculatedCellClasses = initialCellClass(params);
        cellClasses = this.createCellClasses(calculatedCellClasses);
      }

      if (params.colDef.editable) {
        cellClasses.push('sky-cell-editable');
      } else {
        cellClasses.push('sky-cell-uneditable');
      }

      if (columnDefinitionConfig.cellEditorType === SkyCellEditorType.Number) {
        cellClasses.push('sky-cell-number');
      } else if (columnDefinitionConfig.cellEditorType === SkyCellEditorType.Datepicker) {
        cellClasses.push('sky-cell-date');
      }

      if (params.colDef.type === 'number') {
        cellClasses.push('sky-cell-number');
      }

      return cellClasses;
    };

    return cellClassFunction;
  }

  private createCellClasses(classes: string | string[]) {
    if (typeof classes === 'string') {
      return classes.split(' ');
    } else {
      return classes;
    }
  }

  private isSkyCellEditorType(type: string): boolean {
    return Object.values(SkyCellEditorType).includes(type);
  }

  private isSkyCellRendererType(type: string): boolean {
    return Object.values(SkyCellRendererType).includes(type);
  }
}
