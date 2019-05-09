import { GridOptions } from 'ag-grid-community';

export const SkyuxGridOptions: GridOptions = {
  defaultColDef: {
    sortable: true,
    resizable: true,
    minWidth: 100
  },
  suppressCellSelection: true,
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
  suppressDragLeaveHidesColumns: true
};
