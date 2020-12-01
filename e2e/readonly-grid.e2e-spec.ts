import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

import {
  SkyHostBrowserBreakpoint
} from '@skyux-sdk/e2e/host-browser/host-browser-breakpoint';

import {
  by,
  element
} from 'protractor';

describe('Readonly grid', () => {

  // selectors
  const readonlyGrid = '.readonly-grid';
  const sortableHeaderCell = '.ag-header-cell-sortable';

  beforeEach(() => {
    SkyHostBrowser.get('visual/readonly-grid');
  });

  describe('read mode', () => {
    function matchesPreviousReadonlyGrid(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): void {
      SkyHostBrowser.setWindowBreakpoint(screenSize);

      SkyHostBrowser.moveCursorOffScreen();

      expect(readonlyGrid).toMatchBaselineScreenshot(done, {
        screenshotName: `readonly-grid-${screenSize}`
      });
    }

    it('should match previous screenshot on large screens', (done) => {
      matchesPreviousReadonlyGrid('lg', done);
    });

    it('should match previous screenshot on extra small screens', (done) => {
      matchesPreviousReadonlyGrid('xs', done);
    });
  });

  describe('descending sort', () => {
    function matchesPreviousDescendingSortGrid(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): void {
      SkyHostBrowser.setWindowBreakpoint(screenSize);

      element(by.css(sortableHeaderCell)).click();

      expect(readonlyGrid).toMatchBaselineScreenshot(done, {
        screenshotName: `readonly-grid-sort-desc-${screenSize}`
      });
    }

    it('should match previous screenshot on large screens', (done) => {
      matchesPreviousDescendingSortGrid('lg', done);
    });

    it('should match previous screenshot on extra small screens', (done) => {
      matchesPreviousDescendingSortGrid('xs', done);
    });
  });

  describe('ascending sort', () => {
    function matchesPreviousAscendingSortGrid(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): void {
      SkyHostBrowser.setWindowBreakpoint(screenSize);

      // click twice to sort by descending then ascending
      element(by.css(sortableHeaderCell)).click();
      element(by.css(sortableHeaderCell)).click();

      expect(readonlyGrid).toMatchBaselineScreenshot(done, {
        screenshotName: `readonly-grid-sort-asc-${screenSize}`
      });
    }

    it('should match previous screenshoton large screens', (done) => {
      matchesPreviousAscendingSortGrid('lg', done);
    });

    it('should match previous screenshoton extra small screens', (done) => {
      matchesPreviousAscendingSortGrid('xs', done);
    });
  });

  describe('row delete', () => {
    function matchesPreviousRowDeleteGrid(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): void {
      SkyHostBrowser.setWindowBreakpoint(screenSize);

      // click twice to sort by descending then ascending
      element(by.css('[row-id="0"] .sky-dropdown-button')).click();
      element.all(by.css('.sky-dropdown-item button')).get(0).click();

      SkyHostBrowser.moveCursorOffScreen();

      expect(readonlyGrid).toMatchBaselineScreenshot(done, {
        screenshotName: `readonly-grid-row-delete-${screenSize}`
      });
    }

    it('should match previous screenshoton large screens', (done) => {
      matchesPreviousRowDeleteGrid('lg', done);
    });

    it('should match previous screenshoton extra small screens', (done) => {
      matchesPreviousRowDeleteGrid('xs', done);
    });
  });
});
