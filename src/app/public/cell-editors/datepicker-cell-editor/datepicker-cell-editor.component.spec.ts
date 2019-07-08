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
  SkyuxDatepickerCellEditorComponent
} from './datepicker-cell-editor.component';

import {
  SkyuxDatepickerCellEditorModule
} from './datepicker-cell-editor.module';

import {
  Column,
  RowNode
} from 'ag-grid-community';

describe('Datepicker editor component', () => {
  let fixture: ComponentFixture<SkyuxDatepickerCellEditorComponent>;
  let component: SkyuxDatepickerCellEditorComponent;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyAppTestModule,
        SkyuxDatepickerCellEditorModule
      ]
    });

    fixture = TestBed.createComponent(SkyuxDatepickerCellEditorComponent);
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

      let cellEditorParams = { value: date, column, node: rowNode };

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

  describe('#onDateChange', () => {
    it ('sets currentDate to the changed date input', () => {
      let newDate = new Date('1/31/19');
      component.currentDate = new Date('1/1/19');

      expect(component.currentDate).not.toEqual(newDate);

      component.onDateChange(newDate);

      expect(component.currentDate).toEqual(newDate);
    });
  });

  describe('#isPopup', () => {
    it ('returns true', () => {
      expect(component.isPopup()).toBeTruthy();
    });
  });
});
