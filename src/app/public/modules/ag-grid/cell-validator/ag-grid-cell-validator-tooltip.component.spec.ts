import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { expect } from '@skyux-sdk/testing';
import { SkyAgGridCellValidatorTooltipFixtureComponent } from '../fixtures/ag-grid-cell-validator-tooltip.component.fixture';
import { SkyAgGridFixtureComponent } from '../fixtures/ag-grid.component.fixture';
import { SkyAgGridFixtureModule } from '../fixtures/ag-grid.module.fixture';
import { SkyCellClass } from '../types/cell-class';

// Borrowed from skyux-lookup src/app/public/modules/lookup/lookup.component.spec.ts
const isIE = window.navigator.userAgent.indexOf('rv:11.0') >= 0;

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

  if (!isIE) {

  it('should load a grid with validator columns', fakeAsync(() => {
    const gridFixture = TestBed.createComponent(SkyAgGridFixtureComponent);
    spyOn(gridFixture.componentInstance, 'gridReady');
    gridFixture.detectChanges();
    tick();
    flush();
    expect(gridFixture.componentInstance.gridReady).toHaveBeenCalled();
  }));

  it('should display an invalid number', fakeAsync(() => {
    const gridFixture = TestBed.createComponent(SkyAgGridFixtureComponent);
    gridFixture.detectChanges();
    tick();
    flush();

    const cellSelector = `.${SkyCellClass.Number}.${SkyCellClass.Invalid}`;

    const cellElement = gridFixture.nativeElement.querySelector(cellSelector);
    expect(cellElement).toBeTruthy();
  }));

  it('should refresh cells', fakeAsync(() => {
    const gridFixture = TestBed.createComponent(SkyAgGridFixtureComponent);
    gridFixture.detectChanges();
    tick();
    flush();

    gridFixture.componentInstance.gridApi.refreshCells({
      rowNodes: [
        gridFixture.componentInstance.gridApi.getDisplayedRowAtIndex(3)
      ]
    });

    gridFixture.detectChanges();
    tick();
    flush();

    const cellSelector = `.${SkyCellClass.Number}.${SkyCellClass.Invalid}`;

    const cellElement = gridFixture.nativeElement.querySelector(cellSelector);
    expect(cellElement).toBeTruthy();
  }));

  it('should trigger events', fakeAsync(() => {
    const gridFixture = TestBed.createComponent(SkyAgGridFixtureComponent);
    gridFixture.detectChanges();
    tick();
    flush();

    gridFixture.componentInstance.gridApi.setFocusedCell(1, 'name');

    tick();
    flush();

    gridFixture.componentInstance.gridApi.startEditingCell({
      colKey: 'nickname',
      rowIndex: 1
    });

    tick();
    flush();

    const cellSelector = `.${SkyCellClass.Number}.${SkyCellClass.Invalid}`;

    const cellElement = gridFixture.nativeElement.querySelector(cellSelector);
    expect(cellElement).toBeTruthy();
    (cellElement as HTMLElement).dispatchEvent(new KeyboardEvent('keyup', {key: 'ArrowUp'}));

    tick();
    flush();

    let docElement: Element = cellElement.parentElement;
    while (docElement.parentElement) {
      docElement = docElement.parentElement;
    }
    const popoverElement = docElement.querySelector('.sky-popover-body');
    expect(popoverElement).toBeTruthy();

    gridFixture.componentInstance.gridApi.startEditingCell({
      colKey: 'validNumber',
      rowIndex: 3
    });

    tick();
    flush();

    const editorElement = gridFixture.nativeElement.querySelector(`${cellSelector}.ag-cell-inline-editing`);
    expect(editorElement).toBeTruthy();
  }));

  }

});
