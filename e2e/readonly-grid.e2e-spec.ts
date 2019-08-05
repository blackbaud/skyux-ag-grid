import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

import {
  element,
  by
} from 'protractor';

import {
  SkyHostBrowserBreakpoint
} from '@skyux-sdk/e2e/host-browser/host-browser-breakpoint';

describe('Readonly grid', () => {

  beforeEach(() => {
    SkyHostBrowser.get('visual/readonly-grid');
  });

  describe('read mode', () => {
    const matchesPreviousReadonlyGrid = (screenSize: SkyHostBrowserBreakpoint, done: DoneFn) => {
      SkyHostBrowser.setWindowBreakpoint(screenSize);

      SkyHostBrowser.moveCursorOffScreen();

      expect('.readonly-grid').toMatchBaselineScreenshot(done, {
        screenshotName: `readonly-grid-${screenSize}`
      });
    };

    it('should match previous screenshot on large screens', (done) => {
      matchesPreviousReadonlyGrid('lg', done);
    });

    it('should match previous screenshot on extra small screens', (done) => {
      matchesPreviousReadonlyGrid('xs', done);
    });
  });

  describe('descending sort', () => {
    const matchesPreviousDescendingSortGrid = (screenSize: SkyHostBrowserBreakpoint, done: DoneFn) => {
       SkyHostBrowser.setWindowBreakpoint(screenSize);

      element(by.css('.ag-header-cell-sortable')).click();

      expect('.readonly-grid').toMatchBaselineScreenshot(done, {
        screenshotName: `readonly-grid-sort-desc-${screenSize}`
      });
    };

    it('should match previous screenshot on large screens', (done) => {
      matchesPreviousDescendingSortGrid('lg', done);
    });

    it('should match previous screenshot on extra small screens', (done) => {
      matchesPreviousDescendingSortGrid('xs', done);
    });
  });

  describe('ascending sort', () => {
    const matchesPreviousAscendingSortGrid = (screenSize: SkyHostBrowserBreakpoint, done: DoneFn) => {
       SkyHostBrowser.setWindowBreakpoint(screenSize);

      // click twice to sort by descending then ascending
      element(by.css('.ag-header-cell-sortable')).click();
      element(by.css('.ag-header-cell-sortable')).click();

      expect('.readonly-grid').toMatchBaselineScreenshot(done, {
        screenshotName: `readonly-grid-sort-asc-${screenSize}`
      });
    };

    it('should match previous screenshoton large screens', (done) => {
      matchesPreviousAscendingSortGrid('lg', done);
    });

    it('should match previous screenshoton extra small screens', (done) => {
      matchesPreviousAscendingSortGrid('xs', done);
    });
  });
});
