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
    let cellEditorParams: ICellEditorParams;
    let column: Column;
    const columnWidth = 200;
    const rowNode: RowNode = new RowNode();
    rowNode.rowHeight = 37;

    beforeEach(() => {
      column = new Column(
        {
          colId: 'col'
        },
        undefined,
        'col',
        true);
      column.setActualWidth(columnWidth);

      cellEditorParams = {
        value: undefined,
        column,
        node: rowNode,
        keyPress: undefined,
        charPress: undefined,
        colDef: {},
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
    });

    it('initializes the SkyuxDatepickerCellEditorComponent properties', () => {
      const date = new Date('1/1/2019');
      cellEditorParams.value = date;

      expect(component.currentDate).toBeUndefined();
      expect(component.columnWidth).toBeUndefined();
      expect(component.rowHeight).toBeUndefined();

      component.agInit(cellEditorParams);

      expect(component.currentDate).toEqual(date);
      expect(component.columnWidth).toEqual(columnWidth);
      expect(component.rowHeight).toEqual(38);
    });

    it('sets the cellEditorParams', () => {
      const startingDay: number = 1;
      const minDate: Date = new Date('1/1/2019');
      const maxDate: Date = new Date('12/31/2019');
      const disabled: boolean = false;
      const dateFormat: string = 'DD/MM/YYYY';

      cellEditorParams.colDef.cellEditorParams = {
        startingDay,
        minDate,
        maxDate,
        disabled,
        dateFormat
      };

      expect(component.startingDay).toBeUndefined();
      expect(component.minDate).toBeUndefined();
      expect(component.maxDate).toBeUndefined();
      expect(component.disabled).toBeUndefined();
      expect(component.dateFormat).toBeUndefined();

      component.agInit(cellEditorParams);

      expect(component.startingDay).toEqual(startingDay);
      expect(component.minDate).toEqual(minDate);
      expect(component.maxDate).toEqual(maxDate);
      expect(component.disabled).toEqual(disabled);
      expect(component.dateFormat).toEqual(dateFormat);
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
