import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  expect
} from '@skyux-sdk/testing';

import {
  Column
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
  SkyAgGridCellRendererCurrencyComponent
} from './cell-renderer-currency.component';
import { SkyCellRendererCurrencyParams } from '../../types/cell-renderer-currency-params';

describe('SkyAgGridCellRendererCurrencyComponent', () => {
  let currencyRendererFixture: ComponentFixture<SkyAgGridCellRendererCurrencyComponent>;
  let currencyRendererComponent: SkyAgGridCellRendererCurrencyComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyAgGridFixtureModule
      ]
    });

    currencyRendererFixture = TestBed.createComponent(SkyAgGridCellRendererCurrencyComponent);
    currencyRendererComponent = currencyRendererFixture.componentInstance;

    currencyRendererFixture.detectChanges();
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
    it('initializes the SkyAgGridCellRendererCurrencyComponent properties', () => {
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

      let cellRendererParams: SkyCellRendererCurrencyParams = {
        value,
        colDef: { headerName: 'Test currency cell' },
        rowIndex: 1,
        column,
        skyComponentProperties: {
          currencySymbol: '$',
          decimalPlaces: 2
        }
      } as SkyCellRendererCurrencyParams;

      expect(currencyRendererComponent.value).toBeUndefined();
      expect(currencyRendererComponent.columnWidth).toBeUndefined();

      currencyRendererComponent.agInit(cellRendererParams);

      expect(currencyRendererComponent.value).toEqual(value);
      expect(currencyRendererComponent.columnWidth).toEqual(columnWidth);
    });
  });

  it('should pass accessibility', async(() => {
    currencyRendererFixture.detectChanges();

    currencyRendererFixture.whenStable().then(() => {
      expect(currencyRendererFixture.nativeElement).toBeAccessible();
    });
  }));
});
