import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { expect } from '@skyux-sdk/testing';
import { SkyAgGridCellValidatorTooltipFixtureComponent } from '../fixtures/ag-grid-cell-validator-tooltip.component.fixture';
import { SkyAgGridFixtureModule } from '../fixtures/ag-grid.module.fixture';
import { SkyCellRendererCurrencyParams } from '../types/cell-renderer-currency-params';
import { SkyAgGridCellValidatorTooltipComponent } from './ag-grid-cell-validator-tooltip.component';

describe('SkyAgGridCellValidatorTooltipComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyAgGridFixtureModule
      ]
    });
  });

  it('should create an instance', () => {
    const fixture = TestBed.createComponent(SkyAgGridCellValidatorTooltipFixtureComponent);
    fixture.componentInstance.parameters = {
      api: undefined,
      column: undefined,
      eGridCell: undefined,
      rowIndex: 0,
      skyComponentProperties: undefined,
      value: undefined
    };
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should toggle popover', fakeAsync(() => {
    const fixture = TestBed.createComponent(SkyAgGridCellValidatorTooltipComponent);
    const parameters: SkyCellRendererCurrencyParams = {
      // @ts-ignore
      api: {
        addEventListener() {}
      },
      // @ts-ignore
      eGridCell: {
        addEventListener() {}
      },
      // @ts-ignore
      column: {
        colId: () => -1
      },
      rowIndex: -1
    };
    fixture.componentInstance.parameters = {
      ...parameters,
      skyComponentProperties: {
        validatorMessage: 'Test message ABC'
      }
    };
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
    expect(fixture.componentInstance.indicatorShouldShow).toBeTrue();

    fixture.componentInstance.showPopover();
    tick();
    expect(fixture.componentInstance.indicatorShouldShow).toBeFalse();

    fixture.componentInstance.hidePopover();
    fixture.componentInstance.showIndicator();
    tick();
    expect(fixture.componentInstance.indicatorShouldShow).toBeTrue();

    fixture.componentInstance.parameters = {
      ...parameters,
      skyComponentProperties: {
        validatorMessage: () => 'Test message XYZ'
      }
    };
    expect(fixture.componentInstance.validatorMessage).toBe('Test message XYZ');
  }));
});
