import {
  Injectable
} from '@angular/core';

import {
  CellClassParams,
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
  SkyCellClass,
  SkyCellType
} from './types';

@Injectable()
export class SkyAgGridService {

  public getGridOptions(options: GridOptions = {}): GridOptions {
    const defaultGridOptions = this.getDefaultGridOptions();
    let mergedGridOptions: GridOptions = {
      ...defaultGridOptions,
      ...options,
      columnTypes: {
        ...options.columnTypes,
        ...defaultGridOptions.columnTypes
      },
      defaultColDef: {
        ...defaultGridOptions.defaultColDef,
        ...options.defaultColDef,
        cellClassRules: defaultGridOptions.defaultColDef.cellClassRules
      },
      icons: {
        ...defaultGridOptions.icons,
        ...options.icons
      }
    };

    return mergedGridOptions;
  }

  private getDefaultGridOptions(): GridOptions {
    const editableCellClassRules = {
      [SkyCellClass.Editable]: this.cellClassRuleIsEditable,
      [SkyCellClass.Uneditable]: this.cellClassRuleIsUneditable
    };
    const defaultSkyGridOptions: GridOptions = {
      columnTypes: {
        [SkyCellType.Number]: {
          cellClassRules: {
            [SkyCellClass.Number]: 'true',
            ...editableCellClassRules
          },
          cellEditorFramework: SkyCellEditorNumberComponent
        },
        [SkyCellType.Date]: {
          cellClassRules: {
            [SkyCellClass.Date]: 'true',
            ...editableCellClassRules
          },
          cellEditorFramework: SkyCellEditorDatepickerComponent,
          valueFormatter: this.dateFormatter
        },
        [SkyCellType.RowSelector]: {
          cellClassRules: {
            [SkyCellClass.Uneditable]: 'true'
          },
          cellRendererFramework: SkyCellRendererRowSelectorComponent,
          minWidth: 50,
          width: 50
        }
      },
      defaultColDef: {
        cellClassRules: editableCellClassRules,
        sortable: true,
        resizable: true,
        minWidth: 100
      },
      enterMovesDownAfterEdit: true,
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

    return defaultSkyGridOptions;
  }

  private dateFormatter(params: ValueFormatterParams): string | undefined {
    let dateConfig = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return params.value ? params.value.toLocaleDateString('en-us', dateConfig) : undefined;
  }

  private cellClassRuleIsEditable(params: CellClassParams): boolean {
    if (typeof params.colDef.editable === 'boolean') {
      return params.colDef.editable;
    } else if (typeof params.colDef.editable === 'function') {
      const column = params.columnApi.getColumn(params.colDef.field);
      return params.colDef.editable({ ...params, column });
    }
    return false;
  }

  private cellClassRuleIsUneditable(params: CellClassParams): boolean {
    if (typeof params.colDef.editable === 'boolean') {
      return !params.colDef.editable;
    } else if (typeof params.colDef.editable === 'function') {
      const column = params.columnApi.getColumn(params.colDef.field);
      return !params.colDef.editable({ ...params, column });
    }
    return true;
  }
}
