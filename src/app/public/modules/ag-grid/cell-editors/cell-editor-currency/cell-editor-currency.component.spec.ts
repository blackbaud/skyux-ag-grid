import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  expect
} from '@skyux-sdk/testing';

import {
  Column,
  ICellEditorParams
} from 'ag-grid-community';

import {
  SkyCellClass
} from '../../types/cell-class';

import {
  SkyAgGridFixtureComponent
} from '../../fixtures/ag-grid.component.fixture';

import {
  SkyAgGridFixtureModule
} from '../../fixtures/ag-grid.module.fixture';

import {
  SkyAgGridCellEditorCurrencyComponent
} from './cell-editor-currency.component';

describe('SkyCellEditorCurrencyComponent', () => {
  let currencyEditorFixture: ComponentFixture<SkyAgGridCellEditorCurrencyComponent>;
  let currencyEditorComponent: SkyAgGridCellEditorCurrencyComponent;
  let currencyEditorNativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyAgGridFixtureModule
      ]
    });

    currencyEditorFixture = TestBed.createComponent(SkyAgGridCellEditorCurrencyComponent);
    currencyEditorNativeElement = currencyEditorFixture.nativeElement;
    currencyEditorComponent = currencyEditorFixture.componentInstance;

    currencyEditorFixture.detectChanges();
  });

  it('renders a currency input when editing a currency cell in an ag grid', () => {
    const gridFixture = TestBed.createComponent(SkyAgGridFixtureComponent);
    const gridNativeElement = gridFixture.nativeElement;

    gridFixture.detectChanges();

    const currencyCellElement = gridNativeElement.querySelector(`.${SkyCellClass.Currency}`);
    const currencyCellEditorSelector = `.ag-cell-inline-editing.${SkyCellClass.Currency}`;
    let inputElement = gridNativeElement.querySelector(currencyCellEditorSelector);

    expect(inputElement).toBeNull();

    currencyCellElement.click();

    inputElement = gridNativeElement.querySelector(currencyCellEditorSelector);

    expect(inputElement).toBeVisible();
  });

  describe('agInit', () => {
    it('initializes the SkyCellEditorCurrencyComponent properties', () => {
      const value = 123456;
      const columnWidth = 100;
      const column = new Column(
        {
          colId: 'col'
        },
        undefined,
        'col',
        true);

      column.setActualWidth(columnWidth);

      let cellEditorParams: ICellEditorParams = {
        value,
        colDef: { headerName: 'Test currency cell' },
        rowIndex: 1,
        column,
        node: undefined,
        keyPress: undefined,
        charPress: undefined,
        columnApi: undefined,
        data: undefined,
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

      expect(currencyEditorComponent.value).toBeUndefined();
      expect(currencyEditorComponent.columnWidth).toBeUndefined();

      currencyEditorComponent.agInit(cellEditorParams);

      expect(currencyEditorComponent.value).toEqual(value);
      expect(currencyEditorComponent.columnWidth).toEqual(columnWidth);
    });
  });

  describe('getValue', () => {
    it('returns the value if it is set', () => {
      let value = 123;
      currencyEditorComponent.value = value;

      currencyEditorFixture.detectChanges();

      expect(currencyEditorComponent.getValue()).toBe(value);
    });

    describe('afterGuiAttached', () => {
      it('focuses on the input after it attaches to the DOM', () => {
        currencyEditorFixture.detectChanges();

        const input = currencyEditorNativeElement.querySelector('input');
        spyOn(input, 'focus');

        currencyEditorComponent.afterGuiAttached();

        expect(input).toBeVisible();
        expect(input.focus).toHaveBeenCalled();
      });
    });

    it('returns undefined if the value is not set', () => {
      expect(currencyEditorComponent.getValue()).toBeUndefined();
    });
  });

  it('should pass accessibility', async(() => {
    currencyEditorFixture.detectChanges();

    currencyEditorFixture.whenStable().then(() => {
      expect(currencyEditorFixture.nativeElement).toBeAccessible();
    });
  }));
});
