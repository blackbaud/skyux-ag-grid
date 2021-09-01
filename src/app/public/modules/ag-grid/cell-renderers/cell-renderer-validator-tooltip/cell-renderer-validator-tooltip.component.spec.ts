import { TestBed } from '@angular/core/testing';
import { SkyAgGridFixtureModule } from '../../fixtures/ag-grid.module.fixture';
import { SkyAgGridCellRendererValidatorTooltipComponent } from './cell-renderer-validator-tooltip.component';

describe('SkyAgGridCellRendererValidatorTooltipComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyAgGridFixtureModule
      ]
    });
  });

  it('should create an instance', () => {
    const fixture = TestBed.createComponent(SkyAgGridCellRendererValidatorTooltipComponent);
    fixture.componentInstance.cellRendererParams = {
      $scope: undefined,
      addRenderedRowListener(eventType: string, listener: Function): void {
      },
      // @ts-ignore
      api: undefined,
      colDef: undefined,
      column: undefined,
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

    fixture.componentInstance.parameters = {
      ...fixture.componentInstance.cellRendererParams
    };
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();

    expect(fixture.componentInstance.refresh(fixture.componentInstance.cellRendererParams)).toBeTrue();

    fixture.componentInstance.cellRendererParams.colDef = {
      valueFormatter: (value) => `${value.value}`.toUpperCase()
    };
    expect(fixture.componentInstance.refresh(fixture.componentInstance.cellRendererParams)).toBeTrue();
  });
});
