import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  SkyAppTestModule
} from '@skyux-sdk/builder/runtime/testing/browser';

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
  SkyCellEditorDatepickerComponent,
  SkyCellEditorDatepickerModule
} from '.';

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
    nativeElement = fixture.nativeElement;
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

      expect(component.currentDate).toBeUndefined();
      expect(component.columnWidth).toBeUndefined();
      expect(component.rowHeight).toBeUndefined();

      component.agInit(cellEditorParams);

      expect(component.currentDate).toEqual(date);
      expect(component.columnWidth).toEqual(columnWidth);
      expect(component.rowHeight).toEqual(38);
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

  describe('#onDatepickerKeydown', () => {
    const validateTabbingEventPropagation = (targetEl: HTMLElement, isTabLeft: boolean, isEventPropagated: boolean) => {
      const stopPropagationSpy = jasmine.createSpy();

      SkyAppTestUtility.fireDomEvent(targetEl, 'keydown', {
        keyboardEventInit: {
          key: 'tab',
          shiftKey: isTabLeft
        },
        customEventInit: {
          keyCode: 9,
          stopPropagation: stopPropagationSpy
        }
      });

      if (isEventPropagated) {
        expect(stopPropagationSpy).toHaveBeenCalled();
      } else {
        expect(stopPropagationSpy).not.toHaveBeenCalled();
      }
    };

    it('stops event propagation for tab right keydown when the target is the datepicker input', () => {
      const datepickerInputEl = fixture.nativeElement.querySelector('input');

      validateTabbingEventPropagation(datepickerInputEl, false, true);
    });

    it('stops event propagation for tab left keydown when the target is the calendar button', () => {
      fixture.detectChanges();

      const calendarButtonEl = fixture.nativeElement.querySelector('.sky-dropdown-button-type-calendar');

      validateTabbingEventPropagation(calendarButtonEl, true, true);
    });

    it('stops event propagation for tab right keydown when the target is the calendar button and the calendar is open', async(() => {
      fixture.detectChanges();

      const calendarButtonEl = fixture.nativeElement.querySelector('.sky-dropdown-button-type-calendar');
      calendarButtonEl.click();

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        validateTabbingEventPropagation(calendarButtonEl, false, true);
      });
    }));

    it('stops event propagation for tab left keydown when the target is the daypicker and the calendar is open', async(() => {
      fixture.detectChanges();

      const calendarButtonEl = fixture.nativeElement.querySelector('.sky-dropdown-button-type-calendar');
      calendarButtonEl.click();

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        const daypickerEl = fixture.nativeElement.querySelector('sky-daypicker');

        validateTabbingEventPropagation(daypickerEl, true, true);
      });
    }));

    it('does not stop event propagation for tab right keydown when the target is the calendar button and the calendar is closed', () => {
      fixture.detectChanges();

      const calendarButtonEl = fixture.nativeElement.querySelector('.sky-dropdown-button-type-calendar');

      validateTabbingEventPropagation(calendarButtonEl, false, false);
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
