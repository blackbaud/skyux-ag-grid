import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { expect } from '@skyux-sdk/testing';
import { SkyAgGridCellValidatorTooltipFixtureComponent } from '../fixtures/ag-grid-cell-validator-tooltip.component.fixture';
import { SkyAgGridFixtureComponent } from '../fixtures/ag-grid.component.fixture';
import { SkyAgGridFixtureModule } from '../fixtures/ag-grid.module.fixture';
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
    fixture.componentInstance.parameters = {};
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should toggle popover', fakeAsync(() => {
    const fixture = TestBed.createComponent(SkyAgGridCellValidatorTooltipComponent);
    fixture.componentInstance.validatorMessage = 'Test message ABC';
    fixture.componentInstance.parameters = {
      // @ts-ignore
      api: {
        addEventListener(eventType: string, listener: Function) {
        }
      },
      eGridCell: {
        // @ts-ignore
        addEventListener(eventType: string, listener: Function) {
        }
      },
      // @ts-ignore
      column: {
        colId: () => -1
      },
      rowIndex: -1
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
  }));

  it('should load a grid with validator columns', fakeAsync(() => {
    const gridFixture = TestBed.createComponent(SkyAgGridFixtureComponent);
    spyOn(gridFixture.componentInstance, 'gridReady');
    gridFixture.detectChanges();
    tick();
    flush();
    expect(gridFixture.componentInstance.gridReady).toHaveBeenCalled();
  }));
});
