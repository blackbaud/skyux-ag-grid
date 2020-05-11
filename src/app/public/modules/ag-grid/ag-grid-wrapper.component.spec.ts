import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  ElementRef
} from '@angular/core';

import {
  SkyAppTestUtility,
  expect
} from '@skyux-sdk/testing';

import {
  AgGridAngular
} from 'ag-grid-angular';

import {
  Column,
  ColumnApi,
  GridApi
} from 'ag-grid-community';

import {
  SkyAgGridWrapperAdapterService
} from './ag-grid-wrapper-adapter.service';

import {
  SkyAgGridWrapperComponent,
  SkyAgGridModule
} from '.';

describe('SkyAgGridWrapperComponent', () => {
  let gridWrapperAdapterService: SkyAgGridWrapperAdapterService;
  let gridWrapperFixture: ComponentFixture<SkyAgGridWrapperComponent>;
  let gridWrapperComponent: SkyAgGridWrapperComponent;
  let gridWrapperNativeElement: HTMLElement;
  let elementRef: ElementRef;

  const agGrid: AgGridAngular = {
    api: new GridApi(),
    columnApi: new ColumnApi()
  } as AgGridAngular;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyAgGridModule
      ]
    });

    gridWrapperFixture = TestBed.createComponent(SkyAgGridWrapperComponent);
    gridWrapperAdapterService = TestBed.get(SkyAgGridWrapperAdapterService);
    gridWrapperComponent = gridWrapperFixture.componentInstance;
    gridWrapperNativeElement = gridWrapperFixture.nativeElement;
    elementRef = gridWrapperFixture.elementRef;
    gridWrapperComponent.agGrid = agGrid;

    gridWrapperFixture.detectChanges();
  });

  it('should render a sky ag-grid element', () => {
    expect(gridWrapperNativeElement).toBeVisible();
  });

  describe('onGridKeydown', () => {
    let skyAgGridDivEl: HTMLElement;
    beforeEach(() => {
      skyAgGridDivEl = gridWrapperNativeElement.querySelector(`#${gridWrapperComponent.gridId}`);
    });

    function fireKeydownOnGrid(key: string, shiftKey: boolean): void {
      SkyAppTestUtility.fireDomEvent(skyAgGridDivEl, 'keydown', {
        keyboardEventInit: {
          key,
          shiftKey
        }
      });

      gridWrapperFixture.detectChanges();
    }

    it('should not move focus when tab is pressed but cells are being edited', () => {
      spyOn(gridWrapperAdapterService, 'setFocusedElementById');
      spyOn(agGrid.api, 'getEditingCells').and.returnValue(['editingCell']);

      fireKeydownOnGrid('Tab', false);

      expect(gridWrapperAdapterService.setFocusedElementById).not.toHaveBeenCalled();
    });

    it('should not move focus when a non-tab key is pressed', () => {
      spyOn(gridWrapperAdapterService, 'setFocusedElementById');

      fireKeydownOnGrid('L', false);

      expect(gridWrapperAdapterService.setFocusedElementById).not.toHaveBeenCalled();
    });

    it(`should move focus to the anchor after the grid when tab is pressed, no cells are being edited,
      and the grid was previously focused`, () => {
      spyOn(agGrid.api, 'getEditingCells').and.returnValue([]);
      spyOn(gridWrapperAdapterService, 'getFocusedElement').and.returnValue(skyAgGridDivEl);
      spyOn(gridWrapperAdapterService, 'setFocusedElementById');

      fireKeydownOnGrid('Tab', false);

      expect(gridWrapperAdapterService.setFocusedElementById).toHaveBeenCalledWith(
        gridWrapperNativeElement, gridWrapperComponent.afterAnchorId);
    });

    it(`should move focus to the anchor before the grid when shift + tab is pressed, no cells are being edited,
      and the grid was previous focused`, () => {
      spyOn(agGrid.api, 'getEditingCells').and.returnValue([]);
      spyOn(gridWrapperAdapterService, 'getFocusedElement').and.returnValue(skyAgGridDivEl);
      spyOn(gridWrapperAdapterService, 'setFocusedElementById');

      fireKeydownOnGrid('Tab', true);

      expect(gridWrapperAdapterService.setFocusedElementById).toHaveBeenCalledWith(
        gridWrapperNativeElement, gridWrapperComponent.beforeAnchorId);
    });
  });

  describe('onAnchorFocus', () => {

    function focusOnAnchor(anchorEl: HTMLElement, previousFocusedEl: HTMLElement): void {
      SkyAppTestUtility.fireDomEvent(anchorEl, 'focusin', {
        customEventInit: {
          relatedTarget: previousFocusedEl
        }
      });

      gridWrapperFixture.detectChanges();
    }

    it('should shift focus to the grid if it was not the previously focused element', () => {
      const afterAnchorEl = gridWrapperNativeElement.querySelector(`#${gridWrapperComponent.afterAnchorId}`) as HTMLElement;
      const afterButtonEl = gridWrapperNativeElement.querySelector('#button-after-grid') as HTMLElement;
      spyOn(gridWrapperAdapterService, 'setFocusedElementById');

      focusOnAnchor(afterAnchorEl, afterButtonEl);

      expect(gridWrapperAdapterService.setFocusedElementById).toHaveBeenCalledWith(gridWrapperNativeElement, gridWrapperComponent.gridId);
    });

    it('should not shift focus to the grid if it was the previously focused element', () => {
      const afterAnchorEl = gridWrapperNativeElement.querySelector(`#${gridWrapperComponent.afterAnchorId}`) as HTMLElement;
      const gridEl = gridWrapperNativeElement.querySelector(`#${gridWrapperComponent.gridId}`) as HTMLElement;
      spyOn(gridWrapperAdapterService, 'setFocusedElementById');

      focusOnAnchor(afterAnchorEl, gridEl);

      expect(gridWrapperAdapterService.setFocusedElementById).not.toHaveBeenCalled();
    });
  });

  describe('onGridFocus', () => {

    function focusOnGrid(): void {
      const gridEl = gridWrapperNativeElement.querySelector(`#${gridWrapperComponent.gridId}`) as HTMLElement;

      gridEl.focus();
    }
    it('should focus on the first cell if there are displayed cells', () => {
      const column = new Column({}, {}, 'name', true);
      const rowIndex = 0;

      spyOn(agGrid.columnApi, 'getAllDisplayedColumns').and.returnValue([column]);
      spyOn(agGrid.api, 'getFirstDisplayedRow').and.returnValue(rowIndex);
      spyOn(agGrid.api, 'setFocusedCell');

      focusOnGrid();

      expect(agGrid.api.setFocusedCell).toHaveBeenCalledWith(rowIndex, column);
    });

    it('should leave focus on the grid if there are no displayed cells', () => {
      spyOn(agGrid.columnApi, 'getAllDisplayedColumns').and.returnValue([]);
      spyOn(agGrid.api, 'getFirstDisplayedRow').and.returnValue(undefined);
      spyOn(agGrid.api, 'setFocusedCell');

      focusOnGrid();

      expect(agGrid.api.setFocusedCell).not.toHaveBeenCalled();
    });
  });
});
