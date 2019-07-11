import {
  async,
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
  SkyDatepickerCellEditorComponent
} from './cell-editor-datepicker.component';

import {
  SkyCellEditorDatepickerModule
} from './cell-editor-datepicker.module';

import {
  Column,
  ICellEditorParams,
  RowNode
} from 'ag-grid-community';

describe('SkyCellEditorDatepickerComponent', () => {
  let fixture: ComponentFixture<SkyDatepickerCellEditorComponent>;
  let component: SkyDatepickerCellEditorComponent;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyAppTestModule,
        SkyCellEditorDatepickerModule
      ]
    });

    fixture = TestBed.createComponent(SkyDatepickerCellEditorComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('renders a skyux datepicker', () => {
    fixture.detectChanges();

    let element = nativeElement.querySelector('sky-datepicker');
    expect(element).toBeVisible();
  });

  describe('#agInit', () => {
    it('initializes the SkyuxDatepickerCellEditorComponent properties', () => {
      let date = new Date('1/1/19');
      let columnWidth = 200;
      let rowNode: RowNode = new RowNode();
      rowNode.rowHeight = 37;
      let column: Column = new Column(
        {
          colId: 'col'
        },
        undefined,
        'col',
        true);
      column.setActualWidth(columnWidth);

      let cellEditorParams: ICellEditorParams = {
        value: date,
        column,
        node: rowNode,
        keyPress: undefined,
        charPress: undefined,
        colDef: undefined,
        columnApi: undefined,
        data: undefined,
        rowIndex: undefined,
        api: undefined,
        cellStartedEdit: undefined,
        onKeyDown: undefined,
        context: undefined,
        $scope: undefined,
        stopEditing: undefined,
        eGridCell: undefined,
        parseValue: undefined,
        formatValue: undefined
      };

      expect(component.currentDate).toBeUndefined();
      expect(component.columnWidth).toBeUndefined();
      expect(component.rowHeight).toBeUndefined();

      component.agInit(cellEditorParams);

      expect(component.currentDate).toEqual(date);
      expect(component.columnWidth).toEqual(columnWidth);
      expect(component.rowHeight).toEqual(38);
    });
  });

  describe('#getValue', () => {
    it('returns currentDate', () => {
      let currentDate = new Date('1/1/19');
      component.currentDate = currentDate;

      expect(component.getValue()).toEqual(currentDate);
    });
  });

  describe('#isPopup', () => {
    it ('returns true', () => {
      expect(component.isPopup()).toBeTruthy();
    });
  });

  it('should pass accessibility', async(() => {
    fixture.detectChanges();
    expect(nativeElement).toBeAccessible();
  }));
});
