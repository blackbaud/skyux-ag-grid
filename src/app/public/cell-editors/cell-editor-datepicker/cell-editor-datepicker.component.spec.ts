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
  SkyCellEditorDatepickerComponent
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
  let fixture: ComponentFixture<SkyCellEditorDatepickerComponent>;
  let component: SkyCellEditorDatepickerComponent;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyAppTestModule,
        SkyCellEditorDatepickerModule
      ]
    });

    fixture = TestBed.createComponent(SkyCellEditorDatepickerComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('renders a skyux datepicker', () => {
    component.columnWidth = 300;
    component.rowHeight = 37;
    component.currentDate = new Date('7/12/2019');
    fixture.detectChanges();

    const element = nativeElement.querySelector('sky-datepicker');
    expect(element).toBeVisible();
  });

  it('opens a datepicker calendar', () => {
    component.columnWidth = 300;
    component.rowHeight = 37;
    component.currentDate = new Date('7/12/2019');
    fixture.detectChanges();
    const calendarButton = nativeElement.querySelector('.sky-dropdown-button-type-calendar') as HTMLButtonElement;
    calendarButton.click();

    const calendar = nativeElement.querySelector('sky-datepicker-calendar');
    expect(calendar).toBeVisible();
  });

  describe('#agInit', () => {
    it('initializes the SkyuxDatepickerCellEditorComponent properties', () => {
      const date = new Date('1/1/2019');
      const columnWidth = 200;
      const rowNode: RowNode = new RowNode();
      rowNode.rowHeight = 37;
      const column: Column = new Column(
        {
          colId: 'col'
        },
        undefined,
        'col',
        true);
      column.setActualWidth(columnWidth);

      const cellEditorParams: ICellEditorParams = {
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
    it('updates value from input and returns currentDate', (done) => {
      const previousDate = new Date('1/1/2019');
      const elementDateValue = '12/1/2019';
      const elementDate = new Date(elementDateValue);
      component.columnWidth = 300;
      component.rowHeight = 37;
      component.currentDate = previousDate;
      fixture.detectChanges();

      component.datepickerInput.nativeElement.value = elementDateValue;
      fixture.detectChanges();

      setTimeout(() => { done(); }, 4000);

      expect(component.getValue()).toEqual(elementDate);
    });
  });

  describe('#afterGuiAttached', () => {
    it('focuses on the datepicker input after it attaches to the DOM', () => {
      component.columnWidth = 300;
      component.rowHeight = 37;
      component.currentDate = new Date('7/12/2019');
      fixture.detectChanges();
      const input = nativeElement.querySelector('input');
      spyOn(input, 'focus');

      component.afterGuiAttached();

      expect(input).toBeVisible();
      expect(input.focus).toHaveBeenCalled();
    });
  });

  describe('#isPopup', () => {
    it('returns true', () => {
      expect(component.isPopup()).toBeTruthy();
    });
  });

  it('should pass accessibility', async(() => {
    component.columnWidth = 300;
    component.rowHeight = 37;
    fixture.detectChanges();
    expect(nativeElement).toBeAccessible();
  }));

  it('should pass accessibility with calendar open', async(() => {
    component.columnWidth = 300;
    component.rowHeight = 37;
    fixture.detectChanges();
    const calendarButton = nativeElement.querySelector('.sky-dropdown-button-type-calendar') as HTMLButtonElement;
    calendarButton.click();

    expect(nativeElement).toBeAccessible();
  }));
});
