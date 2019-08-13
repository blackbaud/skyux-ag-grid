import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  SkyAppTestUtility,
  expect
} from '@skyux-sdk/testing';

import {
  Column,
  ICellEditorParams,
  RowNode
} from 'ag-grid-community';

import {
  SkyCellClass
} from '../../../../types';

import {
  SkyAgGridFixtureComponent,
  SkyAgGridFixtureModule
} from '../../fixtures';

import {
  SkyAgGridCellEditorDatepickerComponent
} from '../cell-editor-datepicker';

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

      const calendarButton = gridNativeElement.querySelector('.sky-dropdown-button-type-calendar') as HTMLButtonElement;
      calendarButton.click();

      const calendar = gridNativeElement.querySelector('sky-datepicker-calendar');
      expect(calendar).toBeVisible();
    });
  });

  describe('#agInit', () => {
    let cellEditorParams: ICellEditorParams;
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

    it('initializes the SkyuxDatepickerCellEditorComponent properties', () => {
      const date = new Date('1/1/2019');
      cellEditorParams.value = date;

      expect(datepickerEditorComponent.currentDate).toBeUndefined();
      expect(datepickerEditorComponent.columnWidth).toBeUndefined();
      expect(datepickerEditorComponent.rowHeight).toBeUndefined();

      datepickerEditorComponent.agInit(cellEditorParams);

      expect(datepickerEditorComponent.currentDate).toEqual(date);
      expect(datepickerEditorComponent.columnWidth).toEqual(columnWidth);
      expect(datepickerEditorComponent.rowHeight).toEqual(38);
    });

    it('sets the cellEditorParams', () => {
      const startingDay = 1;
      const minDate = new Date('1/1/2019');
      const maxDate = new Date('12/31/2019');
      const disabled = false;
      const dateFormat = 'DD/MM/YYYY';

      cellEditorParams.colDef.cellEditorParams = {
        startingDay,
        minDate,
        maxDate,
        disabled,
        dateFormat
      };

      expect(datepickerEditorComponent.startingDay).toBeUndefined();
      expect(datepickerEditorComponent.minDate).toBeUndefined();
      expect(datepickerEditorComponent.maxDate).toBeUndefined();
      expect(datepickerEditorComponent.disabled).toBeUndefined();
      expect(datepickerEditorComponent.dateFormat).toBeUndefined();

      datepickerEditorComponent.agInit(cellEditorParams);

      expect(datepickerEditorComponent.startingDay).toEqual(startingDay);
      expect(datepickerEditorComponent.minDate).toEqual(minDate);
      expect(datepickerEditorComponent.maxDate).toEqual(maxDate);
      expect(datepickerEditorComponent.disabled).toEqual(disabled);
      expect(datepickerEditorComponent.dateFormat).toEqual(dateFormat);
    });
  });

  describe('#getValue', () => {
    it('updates value from input and returns currentDate', (done) => {
      const previousDate = new Date('1/1/2019');
      const elementDateValue = '12/1/2019';
      const elementDate = new Date(elementDateValue);

      datepickerEditorComponent.columnWidth = 300;
      datepickerEditorComponent.rowHeight = 37;
      datepickerEditorComponent.currentDate = previousDate;

      datepickerEditorFixture.detectChanges();

      datepickerEditorComponent.datepickerInput.nativeElement.value = elementDateValue;
      datepickerEditorFixture.detectChanges();

      setTimeout(() => { done(); }, 4000);

      expect(datepickerEditorComponent.getValue()).toEqual(elementDate);
    });
  });

  describe('#afterGuiAttached', () => {
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

  describe('#isPopup', () => {
    it('returns true', () => {
      expect(datepickerEditorComponent.isPopup()).toBeTruthy();
    });
  });

  describe('#onDatepickerKeydown', () => {
    const validateTabbingEventPropagation = (targetEl: HTMLElement, isTabLeft: boolean, isPropagated: boolean, key: string = 'tab') => {
      const stopPropagationSpy = jasmine.createSpy();

      SkyAppTestUtility.fireDomEvent(targetEl, 'keydown', {
        keyboardEventInit: {
          key,
          shiftKey: isTabLeft
        },
        customEventInit: {
          stopPropagation: stopPropagationSpy
        }
      });

      if (isPropagated) {
        expect(stopPropagationSpy).toHaveBeenCalled();
      } else {
        expect(stopPropagationSpy).not.toHaveBeenCalled();
      }
    };

    it('stops event propagation for tab right keydown when the target is the datepicker input', () => {
      const datepickerInputEl = datepickerEditorFixture.nativeElement.querySelector('input');

      validateTabbingEventPropagation(datepickerInputEl, false, true);
    });

    it('stops event propagation for tab left keydown when the target is the calendar button', () => {
      datepickerEditorFixture.detectChanges();

      const calendarButtonEl = datepickerEditorFixture.nativeElement.querySelector('.sky-dropdown-button-type-calendar');

      validateTabbingEventPropagation(calendarButtonEl, true, true);
    });

    it('stops event propagation for tab right keydown when the target is the calendar button and the calendar is open', async(() => {
      datepickerEditorFixture.detectChanges();

      const calendarButtonEl = datepickerEditorFixture.nativeElement.querySelector('.sky-dropdown-button-type-calendar');
      calendarButtonEl.click();

      datepickerEditorFixture.whenStable().then(() => {
        datepickerEditorFixture.detectChanges();

        validateTabbingEventPropagation(calendarButtonEl, false, true);
      });
    }));

    it('stops event propagation for tab left keydown when the target is the daypicker and the calendar is open', async(() => {
      datepickerEditorFixture.detectChanges();

      const calendarButtonEl = datepickerEditorFixture.nativeElement.querySelector('.sky-dropdown-button-type-calendar');
      calendarButtonEl.click();

      datepickerEditorFixture.whenStable().then(() => {
        datepickerEditorFixture.detectChanges();

        const daypickerEl = datepickerEditorFixture.nativeElement.querySelector('sky-daypicker');

        validateTabbingEventPropagation(daypickerEl, true, true);
      });
    }));

    it('does not stop event propagation for tab right keydown when the target is the calendar button and the calendar is closed', () => {
      datepickerEditorFixture.detectChanges();

      const calendarButtonEl = datepickerEditorFixture.nativeElement.querySelector('.sky-dropdown-button-type-calendar');

      validateTabbingEventPropagation(calendarButtonEl, false, false);
    });

    it('does not stop event propagation for non-tab key presses', () => {
      const datepickerInputEl = datepickerEditorFixture.nativeElement.querySelector('input');

      validateTabbingEventPropagation(datepickerInputEl, false, false, 'space');
    });
  });

  it('should pass accessibility', async(() => {
    datepickerEditorComponent.columnWidth = 300;
    datepickerEditorComponent.rowHeight = 37;

    datepickerEditorFixture.detectChanges();

    expect(datepickerEditorNativeElement).toBeAccessible();
  }));

  it('should pass accessibility with calendar open', async(() => {
    datepickerEditorComponent.columnWidth = 300;
    datepickerEditorComponent.rowHeight = 37;

    datepickerEditorFixture.detectChanges();

    const calendarButton = datepickerEditorNativeElement.querySelector('.sky-dropdown-button-type-calendar') as HTMLButtonElement;
    calendarButton.click();

    expect(datepickerEditorNativeElement).toBeAccessible();
  }));
});
