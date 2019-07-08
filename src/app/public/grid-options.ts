import {
  GridOptions
} from 'ag-grid-community';

import {
  SkyuxCheckboxGridCellComponent
} from './cell-renderers/checkbox-cell-renderer/checkbox-grid-cell.component';

import {
  SkyuxNumericCellEditorComponent
} from './cell-editors/numeric-cell-editor/numeric-cell-editor.component';

import {
  SkyuxDatepickerCellEditorComponent
} from './cell-editors/datepicker-cell-editor/datepicker-cell-editor.component';

export const SKYUX_GRID_OPTIONS: GridOptions = {
  defaultColDef: {
    sortable: true,
    resizable: true,
    minWidth: 100
  },
  rowSelection: 'multiple',
  rowMultiSelectWithClick: true,
  suppressCellSelection: true,
  enterMovesDownAfterEdit: true,
  rowHeight: 37,
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
  singleClickEdit: true,
  suppressDragLeaveHidesColumns: true,
  frameworkComponents: {
    'skyuxCheckboxComponent': SkyuxCheckboxGridCellComponent,
    'skyuxNumericEditorComponent': SkyuxNumericCellEditorComponent,
    'skyuxDatepickerEditorComponent': SkyuxDatepickerCellEditorComponent
  }
};
