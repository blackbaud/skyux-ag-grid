import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  SkyAppTestUtility,
  expect
} from '@skyux-sdk/testing';

import {
  SkyAgGridFixtureComponent,
  SkyAgGridFixtureModule
} from './fixtures';

import {
  SkyAgGridWrapperComponent
} from '.';

fdescribe('SkyAgGridWrapperComponent', () => {
  let gridFixture: ComponentFixture<SkyAgGridFixtureComponent>;
  let gridComponent: SkyAgGridFixtureComponent;
  let skyAgGridWrapperComponent: SkyAgGridWrapperComponent;
  let gridNativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyAgGridFixtureModule
      ]
    });

    gridFixture = TestBed.createComponent(SkyAgGridFixtureComponent);
    gridNativeElement = gridFixture.nativeElement;
    gridComponent = gridFixture.componentInstance;
    skyAgGridWrapperComponent = gridComponent.skyAgGridWrapperComponent;

    gridFixture.detectChanges();
  });

  it('should render a sky ag-grid element', () => {
    expect(gridNativeElement).toBeVisible();
  });

  describe('keyboard navigation', () => {
    let skyAgGridDivEl: HTMLElement;
    beforeEach(() => {
      skyAgGridDivEl = gridNativeElement.querySelector(`#${skyAgGridWrapperComponent.gridId}`);
    });

    function fireKeydownOnGrid(key: string, shiftKey: boolean, previousFocusedEl?: HTMLElement): void {
      if (previousFocusedEl) {
        previousFocusedEl.focus();
      }

      SkyAppTestUtility.fireDomEvent(skyAgGridDivEl, 'keydown', {
        keyboardEventInit: {
          key,
          shiftKey
        }
      });

      gridFixture.detectChanges();
    }

    it('should not move focus when tab is pressed but cells are being edited', () => {
      skyAgGridWrapperComponent.agGrid.api.startEditingCell({ rowIndex: 0, colKey: 'nickname' });

      const focusedEl = document.activeElement;

      fireKeydownOnGrid('Tab', false);

      expect(document.activeElement).toEqual(focusedEl);
    });

    xit('should not move focus when a non-tab key is pressed', () => {
      const focusedEl = document.activeElement;

      console.log('troubleshooting');
      console.log(document.querySelectorAll);

      fireKeydownOnGrid('L', false);

      expect(document.activeElement).toEqual(focusedEl);
    });

    it(`should move focus to the anchor after the grid when tab is pressed, no cells are being edited,
      and the grid was previously focused`, () => {
      const afterAnchor = gridNativeElement.querySelector(`#${skyAgGridWrapperComponent.afterAnchorId}`);
      fireKeydownOnGrid('Tab', false, skyAgGridDivEl);

      expect(document.activeElement).toEqual(afterAnchor);
    });

    it (`should move focus to the anchor before the grid when shift + tab is pressed, no cells are being edited,
      and the grid was previous focused`, () => {
      const beforeAnchor = gridNativeElement.querySelector(`#${skyAgGridWrapperComponent.beforeAnchorId}`);
      fireKeydownOnGrid('Tab', true, skyAgGridDivEl);

      expect(document.activeElement).toEqual(beforeAnchor);
    });
  });

  describe('onAnchorFocus', () => {

    function focusOnAnchor(anchorEl: HTMLElement, previousFocusedEl: HTMLElement): void {
      previousFocusedEl.focus();

      anchorEl.focus();
    }

    it('should shift focus to the grid if it was not the previously focused element', () => {
      const afterAnchorEl = gridNativeElement.querySelector(`#${skyAgGridWrapperComponent.afterAnchorId}`) as HTMLElement;
      const afterButtonEl = gridNativeElement.querySelector('#button-after-grid') as HTMLElement;
      const gridEl = gridNativeElement.querySelector(`#${skyAgGridWrapperComponent.gridId}`);
      spyOn(skyAgGridWrapperComponent, 'onGridFocus');

      focusOnAnchor(afterAnchorEl, afterButtonEl);

      console.log('the active element');
      console.log(document.activeElement);
      expect(document.activeElement).toEqual(gridEl);
    });

    it('should not shift focus to the grid if it was the previously focused element', () => {
      const afterAnchorEl = gridNativeElement.querySelector(`#${skyAgGridWrapperComponent.afterAnchorId}`) as HTMLElement;
      const gridEl = gridNativeElement.querySelector(`#${skyAgGridWrapperComponent.gridId}`) as HTMLElement;
      spyOn(skyAgGridWrapperComponent, 'onGridFocus');

      focusOnAnchor(afterAnchorEl, gridEl);

      expect(document.activeElement).toEqual(afterAnchorEl);
    });
  });

  describe('onGridFocus', () => {
    it('should focus on the first cell if there are displayed cells', () => {
      const gridEl = gridNativeElement.querySelector(`#${skyAgGridWrapperComponent.gridId}`) as HTMLElement;
      gridEl.focus();

      expect(document.activeElement.classList.contains('ag-cell')).toBe(true);
    });

    it('should leave focus on the grid if there are no displayed cells', () => {
      const gridEl = gridNativeElement.querySelector(`#${skyAgGridWrapperComponent.gridId}`) as HTMLElement;
      spyOn(skyAgGridWrapperComponent.agGrid.columnApi, 'getAllDisplayedColumns').and.returnValue([]);
      gridEl.focus();

      expect(document.activeElement).toEqual(gridEl);
    });
  });
});
