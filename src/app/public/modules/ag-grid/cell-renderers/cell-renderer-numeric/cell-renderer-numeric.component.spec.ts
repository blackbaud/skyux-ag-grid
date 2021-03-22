import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  async
} from '@angular/core/testing';

import {
  By
} from '@angular/platform-browser';

import {
  expect,
  expectAsync,
  SkyAppTestUtility
} from '@skyux-sdk/testing';

import {
  Column,
  RowNode
} from 'ag-grid-community';

import {
  NumericOptions
} from '@skyux/core';

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
  SkyAgGridCellRendererNumericComponent
} from './cell-renderer-numeric.component';

import {
  SkyCellRendererNumericParams
} from '../../types/cell-renderer-numeric-params';

describe('SkyAgGridCellRendererNumericComponent', () => {
  let fixture: ComponentFixture<SkyAgGridCellRendererNumericComponent>;
  let component: SkyAgGridCellRendererNumericComponent;
  let nativeElement: HTMLElement;
  let cellRendererParams: SkyCellRendererNumericParams;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAgGridFixtureModule]
    });

    fixture = TestBed.createComponent(SkyAgGridCellRendererNumericComponent);
    nativeElement = fixture.nativeElement;
    component = fixture.componentInstance;
    const column: Column = new Column({ colId: 'col' }, undefined, 'col', true);

    column.setActualWidth(200);

    cellRendererParams = {
      value: 123,
      column,
      node: new RowNode(),
      colDef: {},
      columnApi: undefined,
      data: undefined,
      rowIndex: undefined,
      api: undefined,
      context: undefined,
      $scope: undefined,
      eGridCell: undefined,
      formatValue: undefined,
      skyComponentProperties: {} as NumericOptions
    } as SkyCellRendererNumericParams;
  });

  it('renders a skyux numeric renderer in an ag grid', () => {
    let gridFixture = TestBed.createComponent(SkyAgGridFixtureComponent);
    let gridNativeElement = gridFixture.nativeElement;

    gridFixture.detectChanges();

    const element = gridNativeElement.querySelector(`.${SkyCellClass.Numeric}`);
    expect(element).toBeVisible();
  });

  describe('formatting', () => {
    it('should format the number with skyNumeric', fakeAsync(() => {
      cellRendererParams.value = 123;
      cellRendererParams.skyComponentProperties.minDigits = 5;
      component.agInit(cellRendererParams);

      fixture.detectChanges();
      tick();

      const element = fixture.debugElement.query(By.css('span[data-test-id="numericText"'));
      expect(SkyAppTestUtility.getText(element)).toBe('123.00000');
    }));
    it('should format the currency with skyNumeric', fakeAsync(() => {
      cellRendererParams.value = 123;
      cellRendererParams.skyComponentProperties.format = 'currency';
      cellRendererParams.skyComponentProperties.iso = 'USD';
      cellRendererParams.skyComponentProperties.locale = 'en-CA';
      cellRendererParams.skyComponentProperties.minDigits = 2;
      component.agInit(cellRendererParams);

      fixture.detectChanges();
      tick();

      const element = fixture.debugElement.query(By.css('span[data-test-id="numericText"'));
      expect(SkyAppTestUtility.getText(element)).toBe('US$123.00');
    }));
  });

  describe('agInit', () => {
    it('initializes the SkyAgGridCellRendererNumericComponent properties', fakeAsync(() => {
      cellRendererParams.value = 123;
      cellRendererParams.skyComponentProperties.minDigits = 3;
      cellRendererParams.skyComponentProperties.digits = 3;

      expect(component.value).toBeUndefined();

      component.agInit(cellRendererParams);

      fixture.detectChanges();
      tick();

      expect(component.value).toBe(123);
      expect(component.skyComponentProperties.minDigits).toBe(3);
      expect(component.skyComponentProperties.digits).toBe(3);
    }));
  });

  describe('refresh', () => {
    it('returns false', () => expect(component.refresh()).toBe(false));
  });

  it('should pass accessibility', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expectAsync(nativeElement).toBeAccessible();
    });
  }));
});
