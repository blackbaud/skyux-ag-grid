import {
  GridOptions
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

export const SKY_GRID_OPTIONS: GridOptions = {
  defaultColDef: {
    sortable: true,
    resizable: true,
    minWidth: 100
  },
  enterMovesDownAfterEdit: true,
  frameworkComponents: {
    'skyuxCheckboxComponent': SkyCellRendererRowSelectorComponent,
    'skyuxNumericEditorComponent': SkyCellEditorNumberComponent,
    'skyuxDatepickerEditorComponent': SkyCellEditorDatepickerComponent
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
