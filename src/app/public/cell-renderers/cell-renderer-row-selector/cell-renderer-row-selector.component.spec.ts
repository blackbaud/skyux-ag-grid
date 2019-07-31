import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  SkyAppTestModule
} from '@skyux-sdk/builder/runtime/testing/browser';

import {
  expect
} from '@skyux-sdk/testing';

import {
  SkyCellRendererRowSelectorComponent
} from './cell-renderer-row-selector.component';

import {
  SkyCellRendererRowSelectorModule
} from './cell-renderer-row-selector.module';

import {
  ICellRendererParams,
  RowNode,
  RowClickedEvent
} from 'ag-grid-community';

describe('SkyCellRendererCheckboxComponent', () => {
  let fixture: ComponentFixture<SkyCellRendererRowSelectorComponent>;
  let component: SkyCellRendererRowSelectorComponent;
  let nativeElement: HTMLElement;
  let cellRendererParams: ICellRendererParams;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyAppTestModule,
        SkyCellRendererRowSelectorModule
      ]
    });

    fixture = TestBed.createComponent(SkyCellRendererRowSelectorComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
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

  it('renders a skyux checkbox', () => {
    fixture.detectChanges();

    let element = nativeElement.querySelector('sky-checkbox');
    expect(element).toBeVisible();
  });

  describe('#agInit', () => {
    it('initializes the SkyuxCheckboxGridCellComponent properties', () => {
      let checked = true;
      let rowNode: RowNode = new RowNode();
      cellRendererParams.value = checked;
      cellRendererParams.node = rowNode;
      spyOn(rowNode, 'setSelected');

      expect(component.checked).toBeUndefined();
      expect(component.rowNode).toBeUndefined();

      component.agInit(cellRendererParams);

      expect(component.checked).toEqual(checked);
      expect(component.rowNode).toEqual(rowNode);
      expect(component.rowNode.setSelected).toHaveBeenCalledWith(true);
    });
  });

  describe('#updateRow', () => {
    it ('sets the rowNode selected property to the component\'s checked property', () => {
      let rowNode: RowNode = new RowNode();
      component.checked = true;
      component.rowNode = rowNode;
      spyOn(component.rowNode, 'setSelected');

      component.updateRow();

      expect(component.rowNode.setSelected).toHaveBeenCalledWith(true);
    });
  });

  describe('#refresh', () => {
    it ('returns false', () => {
      expect(component.refresh()).toBeFalsy();
    });
  });

  it('updates the checkmark when the row is selected', () => {
    let rowClickListener: Function;
    let rowNode: RowNode = new RowNode();
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

    rowNode.addEventListener = (event: string, listener: Function) => {
      // set event listener
      rowClickListener = listener;
    };
    spyOn(rowNode, 'addEventListener').and.callThrough();

    component.agInit(cellRendererParams);

    expect(component.checked).toBeFalsy();

    // trigger the rowClickEventListner
    rowClickListener(rowClickedEvent);

    expect(rowNode.addEventListener).toHaveBeenCalledWith(RowNode.EVENT_ROW_SELECTED, jasmine.any(Function));
    expect(component.checked).toEqual(true);
  });

  it('should pass accessibility', () => {
    fixture.detectChanges();

    expect(nativeElement).toBeAccessible();
  });
});
