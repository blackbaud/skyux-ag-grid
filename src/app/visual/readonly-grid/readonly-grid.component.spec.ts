import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  expect
} from '@skyux-sdk/testing';

import {
  ReadonlyGridComponent
} from './readonly-grid.component';

import {
  GridSizingMode,
  RowStatusNames
} from './readonly-grid-data';

import {
  AgGridModule
} from 'ag-grid-angular';

import {
  SkyAppTestModule
} from '@skyux-sdk/builder/runtime/testing/browser';

import {
  ColumnApi,
  GridApi,
  GridReadyEvent,
  ICellRendererParams,
  ValueFormatterParams
} from 'ag-grid-community';

describe('ReadonlyGridComponent', () => {

  let fixture: ComponentFixture<ReadonlyGridComponent>;
  let component: ReadonlyGridComponent;
  let nativeElement: HTMLElement;
  let gridApi: GridApi;
  let columnApi: ColumnApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyAppTestModule,
        AgGridModule.withComponents([])
      ]
    });

    fixture = TestBed.createComponent(ReadonlyGridComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    gridApi = new GridApi();
    columnApi = new ColumnApi();
  });

  it('renders an ag-grid', () => {
    spyOn(component, 'sizeGrid');
    fixture.detectChanges();

    let grid = nativeElement.querySelector('ag-grid-angular');

    expect(grid).toBeVisible();
  });

  describe('#dateFormatter', () => {
    it('returns a date in MM/DD/YYYY format', () => {
      let dateFormatterParams: ValueFormatterParams = {
        value: new Date('December 31, 2019'),
        node: undefined,
        data: undefined,
        colDef: undefined,
        column: undefined,
        api: undefined,
        columnApi: undefined,
        context: undefined
      };
      const formattedDate = component.dateFormatter(dateFormatterParams);

      expect(formattedDate).toEqual('12/31/2019');
    });
  });

  describe('#statusRenderer', () => {
    it('returns a div wrapped icon with the correct classes for a status that is Current', () => {
      let cellRendererParams: ICellRendererParams = {
        value: RowStatusNames.CURRENT,
        node: undefined,
        getValue: undefined,
        setValue: undefined,
        valueFormatted: undefined,
        formatValue: undefined,
        data: undefined,
        colDef: undefined,
        column: undefined,
        $scope: undefined,
        api: undefined,
        columnApi: undefined,
        rowIndex: undefined,
        context: undefined,
        refreshCell: undefined,
        eGridCell: undefined,
        eParentOfValue: undefined,
        addRenderedRowListener: undefined
      };
      const statusHtml = fixture.componentInstance.statusRenderer(cellRendererParams);

      expect(statusHtml).toContain('<div class="status current">');
      expect(statusHtml).toContain('<i class="fa fa-clock-o"></i> Current');
    });
  });

  describe('#onGridReady', () => {
    it('sets gridApi and columnApi and sizes the columns', () => {
      const gridReadyEvent: GridReadyEvent = { api: gridApi, columnApi: columnApi, type: 'GridReadyEvent' };

      spyOn(component, 'sizeGrid');
      spyOn(gridApi, 'forEachNode');

      expect(component.gridApi).toBeUndefined();
      expect(component.columnApi).toBeUndefined();

      component.onGridReady(gridReadyEvent);

      expect(component.gridApi).toBe(gridApi);
      expect(component.columnApi).toBe(columnApi);
      expect(component.sizeGrid).toHaveBeenCalled();
      expect(gridApi.forEachNode).toHaveBeenCalled();
    });
  });

  describe('#sizeGrid', () => {
    it('calls sizeColumnsToFit on the gridApi when sizingMode is fit', () => {
      component.gridApi = gridApi;
      component.columnApi = columnApi;
      component.sizingMode = GridSizingMode.FIT;
      spyOn(component.gridApi, 'sizeColumnsToFit');

      component.sizeGrid();

      expect(component.gridApi.sizeColumnsToFit).toHaveBeenCalled();
    });

    it('calls autoSizeColumns on the columnApi when sizingMode is auto', () => {
      component.gridApi = gridApi;
      component.columnApi = columnApi;
      component.sizingMode = GridSizingMode.AUTO;
      spyOn(component.columnApi, 'autoSizeColumns');

      component.sizeGrid();

      expect(component.columnApi.autoSizeColumns).toHaveBeenCalled();
    });
  });

  it('should pass accessibility', async(() => {
    spyOn(component, 'sizeGrid');
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeAccessible();
  }));
});
