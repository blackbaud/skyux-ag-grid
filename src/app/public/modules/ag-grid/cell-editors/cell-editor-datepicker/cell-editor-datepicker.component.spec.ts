import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import {
  SkyTestComponentSelector
} from '@blackbaud/skyux-lib-testing';

import {
  expect
} from '@skyux-sdk/testing';

import {
  Column,
  RowNode
} from 'ag-grid-community';

import {
  SkyCellClass
} from '../../types';

import {
  SkyAgGridFixtureComponent,
  SkyAgGridFixtureModule
} from '../../fixtures';

import {
  SkyAgGridCellEditorDatepickerComponent
} from '../cell-editor-datepicker';

import {
  SkyCellEditorDatepickerParams
} from '../../types/cell-editor-datepicker-params';

describe('SkyCellEditorDatepickerComponent', () => {
  let datepickerEditorFixture: ComponentFixture<SkyAgGridCellEditorDatepickerComponent>;
  let datepickerEditorComponent: SkyAgGridCellEditorDatepickerComponent;
  let datepickerEditorNativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyAgGridFixtureModule
      ]
    });

    datepickerEditorFixture = TestBed.createComponent(SkyAgGridCellEditorDatepickerComponent);
    datepickerEditorNativeElement = datepickerEditorFixture.nativeElement;
    datepickerEditorComponent = datepickerEditorFixture.componentInstance;
  });

  describe('in ag grid', () => {
    let gridFixture: ComponentFixture<SkyAgGridFixtureComponent>;
    let gridNativeElement: HTMLElement;
    let dateCellElement: HTMLElement;

    beforeEach(() => {
      gridFixture = TestBed.createComponent(SkyAgGridFixtureComponent);
      gridNativeElement = gridFixture.nativeElement;

      gridFixture.detectChanges();

      dateCellElement = gridNativeElement.querySelector(`.${SkyCellClass.Date}`) as HTMLElement;
    });

    it('renders a skyux datepicker', () => {
      const datepickerEditorSelector = `.ag-popup-editor .sky-ag-grid-cell-editor-datepicker`;
      let datepickerEditorElement = gridNativeElement.querySelector(datepickerEditorSelector);

      expect(datepickerEditorElement).toBeNull();

      dateCellElement.click();

      datepickerEditorElement = gridNativeElement.querySelector(datepickerEditorSelector);

      expect(datepickerEditorElement).toBeVisible();
    });

    it('opens a datepicker calendar', () => {
      dateCellElement.click();

      const datepicker = SkyTestComponentSelector.selectDatepicker(
        gridFixture,
        'cell-datepicker'
      );

      datepicker.clickDatepickerCalenderButtonEl();

      const calendar = gridNativeElement.querySelector('sky-datepicker-calendar');
      expect(calendar).toBeVisible();
    });
  });

  describe('focus properties', () => {
    type focusProperty = 'buttonIsFocused' | 'calendarIsFocused' | 'inputIsFocused';

    function validateFocus(hasFocus: boolean, focusPropertyName: focusProperty, focusedEl?: HTMLElement): void {
      if (hasFocus && focusedEl) {
        focusedEl.focus();
      }

      expect(datepickerEditorComponent[focusPropertyName]).toBe(hasFocus);
    }

    function validateCalendarFocus(hasFocus: boolean, focusedEl?: HTMLElement): void {
      const datepicker = SkyTestComponentSelector.selectDatepicker(
        datepickerEditorFixture,
        'cell-datepicker'
      );

      datepicker.clickDatepickerCalenderButtonEl();
      datepickerEditorFixture.detectChanges();
      tick();

      validateFocus(hasFocus, 'calendarIsFocused', focusedEl);
    }

    it('should reflect the state of focus for the datepicker editor', fakeAsync(() => {
      datepickerEditorFixture.detectChanges();
      const inputEl = datepickerEditorNativeElement.querySelector('input') as HTMLElement;
      const buttonEl = datepickerEditorNativeElement.querySelector('.sky-dropdown-button') as HTMLElement;
      const dropdownContainerEl = datepickerEditorNativeElement.querySelector('.sky-popover-container') as HTMLElement;
      const selectedDayEl = datepickerEditorNativeElement.querySelector('td .sky-datepicker-btn-selected') as HTMLElement;

      expect(inputEl).toBeDefined();
      expect(buttonEl).toBeDefined();
      expect(dropdownContainerEl).toBeDefined();
      expect(selectedDayEl).toBeDefined();

      validateFocus(false, 'inputIsFocused');
      validateFocus(true, 'inputIsFocused', inputEl);
      validateFocus(false, 'buttonIsFocused');
      validateFocus(true, 'buttonIsFocused', buttonEl);

      validateCalendarFocus(false);
      validateCalendarFocus(true, dropdownContainerEl);
      validateCalendarFocus(true, selectedDayEl);
    }));
  });

  describe('calendarIsVisible property', () => {
    it('should reflect the visibility of the calendar element', fakeAsync(() => {
      datepickerEditorFixture.detectChanges();
      const datepicker = SkyTestComponentSelector.selectDatepicker(
        datepickerEditorFixture,
        'cell-datepicker'
      );

      expect(datepickerEditorComponent.calendarIsVisible).toBe(false);

      datepicker.clickDatepickerCalenderButtonEl();
      datepickerEditorFixture.detectChanges();
      tick();
      datepickerEditorFixture.detectChanges();

      expect(datepickerEditorComponent.calendarIsVisible).toBe(true);
    }));
  });

  describe('agInit', () => {
    let cellEditorParams: SkyCellEditorDatepickerParams;
    let column: Column;
    const columnWidth = 200;
    const rowNode = new RowNode();
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

    it('initializes the SkyAgGridCellEditorDatepickerComponent properties', fakeAsync(() => {
      const dateString = '01/01/2019';
      const date = new Date(dateString);
      const datepicker = SkyTestComponentSelector.selectDatepicker(
        datepickerEditorFixture,
        'cell-datepicker'
      );

      cellEditorParams.value = date;

      expect(datepickerEditorComponent.currentDate).toBeUndefined();
      expect(datepickerEditorComponent.columnWidth).toBeUndefined();
      expect(datepickerEditorComponent.rowHeight).toBeUndefined();

      datepickerEditorComponent.agInit(cellEditorParams);
      datepickerEditorFixture.detectChanges();
      tick();
      datepickerEditorFixture.detectChanges();

      expect(datepickerEditorComponent.currentDate).toEqual(date);
      expect(datepicker.date).toEqual(dateString);
      expect(datepickerEditorComponent.columnWidth).toEqual(columnWidth);
      expect(datepickerEditorComponent.rowHeight).toEqual(36);
    }));
  });

  describe('getValue', () => {
    it('updates value from input and returns currentDate', () => {
      const previousDate = new Date('1/1/2019');
      const elementDateValue = '12/1/2019';

      datepickerEditorComponent.columnWidth = 300;
      datepickerEditorComponent.rowHeight = 37;
      datepickerEditorComponent.currentDate = previousDate;

      datepickerEditorFixture.detectChanges();

      datepickerEditorComponent['datepickerInput'].nativeElement.value = elementDateValue;
      datepickerEditorFixture.detectChanges();

      expect(datepickerEditorComponent.getValue()).not.toEqual(previousDate);
    });
  });

  describe('afterGuiAttached', () => {
    it('focuses on the datepicker input after it attaches to the DOM', () => {
      datepickerEditorComponent.columnWidth = 300;
      datepickerEditorComponent.rowHeight = 37;
      datepickerEditorComponent.currentDate = new Date('7/12/2019');

      datepickerEditorFixture.detectChanges();

      const input = datepickerEditorNativeElement.querySelector('input');
      spyOn(input, 'focus');

      datepickerEditorComponent.afterGuiAttached();

      expect(input).toBeVisible();
      expect(input.focus).toHaveBeenCalled();
    });
  });

  describe('isPopup', () => {
    it('returns true', () => {
      expect(datepickerEditorComponent.isPopup()).toBeTruthy();
    });
  });

  it('should pass accessibility', async(() => {
    datepickerEditorComponent.columnWidth = 300;
    datepickerEditorComponent.rowHeight = 37;

    datepickerEditorFixture.detectChanges();

    expect(datepickerEditorNativeElement).toBeAccessible();
  }));

  it('should pass accessibility with calendar open', async(() => {
    const datepicker = SkyTestComponentSelector.selectDatepicker(
      datepickerEditorFixture,
      'cell-datepicker'
    );

    datepickerEditorComponent.columnWidth = 300;
    datepickerEditorComponent.rowHeight = 37;

    datepickerEditorFixture.detectChanges();

    datepicker.clickDatepickerCalenderButtonEl();

    expect(datepickerEditorNativeElement).toBeAccessible();
  }));
});
