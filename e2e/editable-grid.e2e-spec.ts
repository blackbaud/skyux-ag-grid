import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

import {
  SkyHostBrowserBreakpoint
} from '@skyux-sdk/e2e/host-browser/host-browser-breakpoint';

import {
  browser,
  by,
  element
} from 'protractor';

describe('Editable grid', () => {

  beforeEach(() => {
    SkyHostBrowser.get('visual/editable-grid');
  });

  describe('read mode', () => {
    const matchesPreviousEditableGrid = (screenSize: SkyHostBrowserBreakpoint, done: DoneFn) => {
      SkyHostBrowser.setWindowBreakpoint(screenSize);

      SkyHostBrowser.moveCursorOffScreen();

      expect('.editable-grid').toMatchBaselineScreenshot(done, {
        screenshotName: `editable-grid-read-${screenSize}`
      });
    };

    it('should match previous editable grid on large screens', (done) => {
      matchesPreviousEditableGrid('lg', done);
    });

    it('should match previous editable grid on extra small screens', (done) => {
      matchesPreviousEditableGrid('xs', done);
    });
  });

  describe('edit mode', () => {
    const matchesPreviousEditableGridInEditMode = (screenSize: SkyHostBrowserBreakpoint, done: DoneFn) => {
      SkyHostBrowser.setWindowBreakpoint(screenSize);

      element(by.css('#edit-btn')).click();

      expect('.editable-grid').toMatchBaselineScreenshot(done, {
        screenshotName: `editable-grid-edit-${screenSize}`
      });
    };

    it('should match previous editable grid on large screens', (done) => {
      matchesPreviousEditableGridInEditMode('lg', done);
    });

    it('should match previous editable grid on extra small screens', (done) => {
      matchesPreviousEditableGridInEditMode('xs', done);
    });
  });

  describe('descending sort', () => {
    const matchesPreviousDescendingSortGrid = (screenSize: SkyHostBrowserBreakpoint, done: DoneFn) => {
      SkyHostBrowser.setWindowBreakpoint(screenSize);

      element(by.css('.ag-header-cell-sortable')).click();

      expect('.editable-grid').toMatchBaselineScreenshot(done, {
        screenshotName: `editable-grid-sort-desc-${screenSize}`
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

      expect('.editable-grid').toMatchBaselineScreenshot(done, {
        screenshotName: `editable-grid-sort-asc-${screenSize}`
      });
    };

    it('should match previous screenshot on large screens', (done) => {
      matchesPreviousAscendingSortGrid('lg', done);
    });

    it('should match previous screenshot on extra small screens', (done) => {
      matchesPreviousAscendingSortGrid('xs', done);
    });
  });

  describe('number editing', () => {
    const matchesPreviousNumberEditingGrid = (screenSize: SkyHostBrowserBreakpoint, done: DoneFn) => {
      SkyHostBrowser.setWindowBreakpoint(screenSize);

      element(by.css('#edit-btn')).click();

      element(by.css('.sky-ag-grid-cell-editable.sky-ag-grid-cell-number')).click();

      expect('.editable-grid').toMatchBaselineScreenshot(done, {
        screenshotName: `editable-grid-edit-number-${screenSize}`
      });
    };

    it('should match previous screenshot on large screens', (done) => {
      matchesPreviousNumberEditingGrid('lg', done);
    });

    it('should match previous screenshot on extra small screens', (done) => {
      matchesPreviousNumberEditingGrid('xs', done);
    });
  });

  describe('date text input editing', () => {
    const matchesPreviousDateTextEditingGrid = (screenSize: SkyHostBrowserBreakpoint, done: DoneFn) => {
      SkyHostBrowser.setWindowBreakpoint(screenSize);

      element(by.css('#edit-btn')).click();

      element(by.css('.sky-ag-grid-cell-editable.sky-ag-grid-cell-date')).click();

      expect('.editable-grid').toMatchBaselineScreenshot(done, {
        screenshotName: `editable-grid-edit-date-${screenSize}`
      });
    };

    it('should match previous screenshot on large screens', (done) => {
      matchesPreviousDateTextEditingGrid('lg', done);
    });

    it('should match previous screenshot on extra small screens', (done) => {
      matchesPreviousDateTextEditingGrid('xs', done);
    });
  });

  describe('date calendar editing', () => {
    const matchesPreviousDateCalendarEditingGrid = (screenSize: SkyHostBrowserBreakpoint, done: DoneFn) => {
      SkyHostBrowser.setWindowBreakpoint(screenSize);

      element(by.css('#edit-btn')).click();

      SkyHostBrowser.scrollTo('.sky-ag-grid-cell-editable.sky-ag-grid-cell-date');
      element(by.css('.sky-ag-grid-cell-editable.sky-ag-grid-cell-date')).click();

      element(by.css('.sky-dropdown-button-type-calendar')).click();

      expect('.editable-grid').toMatchBaselineScreenshot(done, {
        screenshotName: `editable-grid-edit-date-cal-${screenSize}`
      });
    };

    it('should match previous screenshot on large screens', (done) => {
      matchesPreviousDateCalendarEditingGrid('lg', done);
    });

    it('should match previous screenshot on extra small screens', (done) => {
      matchesPreviousDateCalendarEditingGrid('xs', done);
    });
  });

  describe('autocomplete input editing', () => {
    it('should match previous screenshot on large screens', (done) => {
      SkyHostBrowser.setWindowBreakpoint('lg');

      element(by.css('#edit-btn')).click();

      SkyHostBrowser.scrollTo('.sky-ag-grid-cell-editable.sky-ag-grid-cell-autocomplete');
      element(by.css('.sky-ag-grid-cell-editable.sky-ag-grid-cell-autocomplete')).click();

      expect('.editable-grid').toMatchBaselineScreenshot(done, {
        screenshotName: `editable-grid-edit-autocomplete-input-lg`
      });
    });
  });

  describe('autocomplete dropdown editing', () => {
    it('should match previous screenshot on large screens', (done) => {
      const input = element(by.css('.sky-ag-grid-cell-editable.sky-ag-grid-cell-autocomplete'));

      SkyHostBrowser.setWindowBreakpoint('lg');

      element(by.css('#edit-btn')).click();

      SkyHostBrowser.scrollTo('.sky-ag-grid-cell-editable.sky-ag-grid-cell-autocomplete');

      input.value = 'j';
      input.click();
      browser.actions().sendKeys('j').perform();

      browser.wait(() => {
        return browser.isElementPresent(
          element(by.css('.sky-dropdown-item'))
        );
      });

      expect('.editable-grid').toMatchBaselineScreenshot(done, {
        screenshotName: `editable-grid-edit-autocomplete-dropdown-lg`
      });
    });
  });
});
