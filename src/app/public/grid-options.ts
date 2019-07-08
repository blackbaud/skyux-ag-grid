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
  SkyDatepickerCellEditorComponent
} from './cell-editors/cell-editor-datepicker/cell-editor-datepicker.component';

export const SKY_GRID_OPTIONS: GridOptions = {
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
    'skyuxCheckboxComponent': SkyCellRendererRowSelectorComponent,
    'skyuxNumericEditorComponent': SkyCellEditorNumberComponent,
    'skyuxDatepickerEditorComponent': SkyDatepickerCellEditorComponent
  }
};
