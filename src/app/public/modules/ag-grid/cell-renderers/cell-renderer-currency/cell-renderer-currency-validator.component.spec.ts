import { TestBed } from '@angular/core/testing';
import { SkyAgGridFixtureModule } from '../../fixtures/ag-grid.module.fixture';
import { SkyAgGridCellRendererCurrencyValidatorComponent } from './cell-renderer-currency-validator.component';

describe('SkyAgGridCellRendererCurrencyValidatorComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyAgGridFixtureModule
      ]
    });
  });

  it('should create an instance', () => {
    const fixture = TestBed.createComponent(SkyAgGridCellRendererCurrencyValidatorComponent);
    fixture.componentInstance.cellRendererParams = {
      $scope: undefined,
      addRenderedRowListener(eventType: string, listener: Function): void {
      },
      api: undefined,
      colDef: undefined,
      // @ts-ignore
      column: {
        getActualWidth: () => 1
      },
      columnApi: undefined,
      context: undefined,
      data: undefined,
      eGridCell: undefined,
      eParentOfValue: undefined,
      formatValue(value: any): any {
      },
      getValue(): any {
      },
      node: undefined,
      refreshCell(): void {
      },
      rowIndex: 0,
      setValue(value: any): void {
      },
      value: undefined,
      valueFormatted: undefined
    };
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();

    expect(fixture.componentInstance.refresh({})).toBeFalse();
  });
});
