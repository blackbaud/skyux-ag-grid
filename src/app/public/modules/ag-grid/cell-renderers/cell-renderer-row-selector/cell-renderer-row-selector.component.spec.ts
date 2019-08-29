import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  expect
} from '@skyux-sdk/testing';

import {
  ICellRendererParams,
  RowClickedEvent,
  RowNode
} from 'ag-grid-community';

import {
  SkyCellClass
} from '../../types';

import {
  SkyAgGridFixtureComponent,
  SkyAgGridFixtureModule
} from '../../fixtures/';

import {
  SkyAgGridCellRendererRowSelectorComponent
} from '../cell-renderer-row-selector';

describe('SkyCellRendererCheckboxComponent', () => {
  let rowSelectorCellFixture: ComponentFixture<SkyAgGridCellRendererRowSelectorComponent>;
  let rowSelectorCellComponent: SkyAgGridCellRendererRowSelectorComponent;
  let rowSelectorCellNativeElement: HTMLElement;
  let cellRendererParams: ICellRendererParams;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyAgGridFixtureModule
      ]
    });

    rowSelectorCellFixture = TestBed.createComponent(SkyAgGridCellRendererRowSelectorComponent);
    rowSelectorCellNativeElement = rowSelectorCellFixture.nativeElement;
    rowSelectorCellComponent = rowSelectorCellFixture.componentInstance;
    cellRendererParams = {
      value: undefined,
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
  });

  it('renders a skyux checkbox in an ag grid', () => {
    let gridFixture = TestBed.createComponent(SkyAgGridFixtureComponent);
    let gridNativeElement = gridFixture.nativeElement;

    gridFixture.detectChanges();

    let element = gridNativeElement.querySelector(`.${SkyCellClass.RowSelector}`);
    expect(element).toBeVisible();
  });

  describe('agInit', () => {
    it('initializes the SkyuxCheckboxGridCellComponent properties', () => {
      let checked = true;
      let rowNode = new RowNode();
      cellRendererParams.value = checked;
      cellRendererParams.node = rowNode;
      spyOn(rowNode, 'setSelected');

      expect(rowSelectorCellComponent.checked).toBeUndefined();
      expect(rowSelectorCellComponent.rowNode).toBeUndefined();

      rowSelectorCellComponent.agInit(cellRendererParams);

      expect(rowSelectorCellComponent.checked).toEqual(checked);
      expect(rowSelectorCellComponent.rowNode).toEqual(rowNode);
      expect(rowSelectorCellComponent.rowNode.setSelected).toHaveBeenCalledWith(true);
    });
  });

  describe('updateRow', () => {
    it ('sets the rowNode selected property to the component\'s checked property', () => {
      let rowNode = new RowNode();
      rowSelectorCellComponent.checked = true;
      rowSelectorCellComponent.rowNode = rowNode;
      spyOn(rowSelectorCellComponent.rowNode, 'setSelected');

      rowSelectorCellComponent.updateRow();

      expect(rowSelectorCellComponent.rowNode.setSelected).toHaveBeenCalledWith(true);
    });
  });

  describe('refresh', () => {
    it ('returns false', () => {
      expect(rowSelectorCellComponent.refresh()).toBe(false);
    });
  });

  it('updates the checkmark when the row is selected', () => {
    let rowClickListener: Function;
    let rowNode = new RowNode();
    let rowClickedEvent: RowClickedEvent = {
      node: rowNode,
      data: undefined,
      rowIndex: undefined,
      rowPinned: undefined,
      context: undefined,
      api: undefined,
      columnApi: undefined,
      type: undefined
    };

    cellRendererParams.value = false;
    cellRendererParams.node = rowNode;

    spyOn(rowNode, 'setSelected');
    spyOn(rowNode, 'isSelected').and.returnValue(true);

    rowNode.addEventListener = (event, listener) => {
      // set event listener
      rowClickListener = listener;
    };
    spyOn(rowNode, 'addEventListener').and.callThrough();

    rowSelectorCellComponent.agInit(cellRendererParams);

    expect(rowSelectorCellComponent.checked).toBeFalsy();

    // trigger the rowClickEventListner
    rowClickListener(rowClickedEvent);

    expect(rowNode.addEventListener).toHaveBeenCalledWith(RowNode.EVENT_ROW_SELECTED, jasmine.any(Function));
    expect(rowSelectorCellComponent.checked).toEqual(true);
  });

  it('should pass accessibility', async(() => {
    rowSelectorCellFixture.detectChanges();

    rowSelectorCellFixture.whenStable().then(() => {
      expect(rowSelectorCellNativeElement).toBeAccessible();
    });
  }));
});
