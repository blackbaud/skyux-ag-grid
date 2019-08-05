import {
  Injectable
} from '@angular/core';

import {
  CellClassParams,
  GridOptions,
  ValueFormatterParams
} from 'ag-grid-community';

import {
  SkyCellClass,
  SkyCellEditorDatepickerComponent,
  SkyCellEditorNumberComponent,
  SkyCellRendererRowSelectorComponent,
  SkyCellType,
  SkyGetGridOptionsArgs
} from '.';

/**
 * A service that provides default styling and behavior for agGrids in SKY UX SPAs.
 */
@Injectable()
export class SkyAgGridService {

  /**
   * Get SKY UX gridOptions to create your agGrid with default SKY styling and behavior.
   * @param args options to be applied to the default SKY UX agGrid gridOptions.
   */
  public getGridOptions(args: SkyGetGridOptionsArgs): GridOptions {
    const defaultGridOptions = this.getDefaultGridOptions(args);

    let mergedGridOptions: GridOptions = {
      ...defaultGridOptions,
      ...args.gridOptions,
      columnTypes: {
        ...args.gridOptions.columnTypes,
        // apply default second to prevent consumers from overwriting our default column types
        ...defaultGridOptions.columnTypes
      },
      defaultColDef: {
        ...defaultGridOptions.defaultColDef,
        ...args.gridOptions.defaultColDef,
        // allow consumers to override all defaultColDef properties except cellClassRules, which we reserve for styling
        cellClassRules: defaultGridOptions.defaultColDef.cellClassRules
      },
      icons: {
        ...defaultGridOptions.icons,
        ...args.gridOptions.icons
      }
    };

    return mergedGridOptions;
  }

  private getDefaultGridOptions(args: SkyGetGridOptionsArgs): GridOptions {
    // cellClassRules can be functions or string expressions
    const cellClassRuleTrueExpression = 'true';

    function getEditableFn(flip?: boolean) {
      return function (params: CellClassParams): boolean {
        let isEditable = params.colDef.editable;

        if (typeof isEditable === 'function') {
          const column = params.columnApi.getColumn(params.colDef.field);
          isEditable = isEditable({ ...params, column });
        }

        return flip ? !isEditable : isEditable;
      };
    }

    const editableCellClassRules = {
      [SkyCellClass.Editable]: getEditableFn(),
      [SkyCellClass.Uneditable]: getEditableFn(true)
    };

    const defaultSkyGridOptions: GridOptions = {
      columnTypes: {
        [SkyCellType.Number]: {
          cellClassRules: {
            [SkyCellClass.Number]: cellClassRuleTrueExpression,
            ...editableCellClassRules
          },
          cellEditorFramework: SkyCellEditorNumberComponent
        },
        [SkyCellType.Date]: {
          cellClassRules: {
            [SkyCellClass.Date]: cellClassRuleTrueExpression,
            ...editableCellClassRules
          },
          cellEditorFramework: SkyCellEditorDatepickerComponent,
          valueFormatter: (params) => this.dateFormatter(params, args.locale)
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

  private dateFormatter(params: ValueFormatterParams, locale: string = 'us-en'): string | undefined {
    let dateConfig = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return params.value && params.value.toLocaleDateString(locale, dateConfig);
  }
}
