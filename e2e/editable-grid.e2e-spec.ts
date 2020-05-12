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

  // selectors
  const dateCell = '.sky-ag-grid-cell-editable.sky-ag-grid-cell-date';
  const autocompleteCell = '.sky-ag-grid-cell-editable.sky-ag-grid-cell-autocomplete';
  const editButton = '#edit-btn';
  const editableGrid = '.editable-grid';
  const sortableHeaderCell = '.ag-header-cell-sortable';

  beforeEach(() => {
    SkyHostBrowser.get('visual/editable-grid');
  });

  describe('read mode', () => {
    function matchesPreviousEditableGrid(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): void {
      SkyHostBrowser.setWindowBreakpoint(screenSize);

      SkyHostBrowser.moveCursorOffScreen();

      expect(editableGrid).toMatchBaselineScreenshot(done, {
        screenshotName: `editable-grid-read-${screenSize}`
      });
    }

    it('should match previous editable grid on large screens', (done) => {
      matchesPreviousEditableGrid('lg', done);
    });

    it('should match previous editable grid on extra small screens', (done) => {
      matchesPreviousEditableGrid('xs', done);
    });
  });

  describe('edit mode', () => {
    function matchesPreviousEditableGridInEditMode(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): void {
      SkyHostBrowser.setWindowBreakpoint(screenSize);

      element(by.css(editButton)).click();

      expect(editableGrid).toMatchBaselineScreenshot(done, {
        screenshotName: `editable-grid-edit-${screenSize}`
      });
    }

    it('should match previous editable grid on large screens', (done) => {
      matchesPreviousEditableGridInEditMode('lg', done);
    });

    it('should match previous editable grid on extra small screens', (done) => {
      matchesPreviousEditableGridInEditMode('xs', done);
    });
  });

  describe('descending sort', () => {
    function matchesPreviousDescendingSortGrid(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): void {
      SkyHostBrowser.setWindowBreakpoint(screenSize);

      element(by.css(sortableHeaderCell)).click();

      expect(editableGrid).toMatchBaselineScreenshot(done, {
        screenshotName: `editable-grid-sort-desc-${screenSize}`
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

      expect(editableGrid).toMatchBaselineScreenshot(done, {
        screenshotName: `editable-grid-sort-asc-${screenSize}`
      });
    }

    it('should match previous screenshot on large screens', (done) => {
      matchesPreviousAscendingSortGrid('lg', done);
    });

    it('should match previous screenshot on extra small screens', (done) => {
      matchesPreviousAscendingSortGrid('xs', done);
    });
  });

  describe('number editing', () => {
    function matchesPreviousNumberEditingGrid(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): void {
      SkyHostBrowser.setWindowBreakpoint(screenSize);

      element(by.css(editButton)).click();

      element(by.css('.sky-ag-grid-cell-editable.sky-ag-grid-cell-number')).click();

      expect(editableGrid).toMatchBaselineScreenshot(done, {
        screenshotName: `editable-grid-edit-number-${screenSize}`
      });
    }

    it('should match previous screenshot on large screens', (done) => {
      matchesPreviousNumberEditingGrid('lg', done);
    });

    it('should match previous screenshot on extra small screens', (done) => {
      matchesPreviousNumberEditingGrid('xs', done);
    });
  });

  describe('text editing', () => {
    function matchesPreviousTextEditingGrid(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): void {
      SkyHostBrowser.setWindowBreakpoint(screenSize);

      element(by.css(editButton)).click();

      element(by.css('.sky-ag-grid-cell-editable.sky-ag-grid-cell-text')).click();

      expect(editableGrid).toMatchBaselineScreenshot(done, {
        screenshotName: `editable-grid-edit-text-${screenSize}`
      });
    }

    it('should match previous screenshot on large screens', (done) => {
      matchesPreviousTextEditingGrid('lg', done);
    });

    it('should match previous screenshot on extra small screens', (done) => {
      matchesPreviousTextEditingGrid('xs', done);
    });
  });

  describe('date text input editing', () => {
    function matchesPreviousDateTextEditingGrid(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): void {
      SkyHostBrowser.setWindowBreakpoint(screenSize);

      element(by.css(editButton)).click();

      element(by.css(dateCell)).click();

      expect(editableGrid).toMatchBaselineScreenshot(done, {
        screenshotName: `editable-grid-edit-date-${screenSize}`
      });
    }

    it('should match previous screenshot on large screens', (done) => {
      matchesPreviousDateTextEditingGrid('lg', done);
    });

    it('should match previous screenshot on extra small screens', (done) => {
      matchesPreviousDateTextEditingGrid('xs', done);
    });
  });

  describe('date calendar editing', () => {
    function matchesPreviousDateCalendarEditingGrid (screenSize: SkyHostBrowserBreakpoint, done: DoneFn): void {
      SkyHostBrowser.setWindowBreakpoint(screenSize);

      element(by.css(editButton)).click();

      SkyHostBrowser.scrollTo(dateCell);
      element(by.css(dateCell)).click();

      element(by.css('.sky-input-group-datepicker-btn')).click();

      expect(editableGrid).toMatchBaselineScreenshot(done, {
        screenshotName: `editable-grid-edit-date-cal-${screenSize}`
      });
    }

    it('should match previous screenshot on large screens', (done) => {
      matchesPreviousDateCalendarEditingGrid('lg', done);
    });

    it('should match previous screenshot on extra small screens', (done) => {
      matchesPreviousDateCalendarEditingGrid('xs', done);
    });
  });

  describe('autocomplete input editing', () => {
    function matchesPreviousAutocompleteInputEditingGrid (screenSize: SkyHostBrowserBreakpoint, done: DoneFn): void {
      SkyHostBrowser.setWindowBreakpoint(screenSize);

      element(by.css(editButton)).click();

      SkyHostBrowser.scrollTo(autocompleteCell);
      element(by.css(autocompleteCell)).click();

      expect(editableGrid).toMatchBaselineScreenshot(done, {
        screenshotName: `editable-grid-edit-autocomplete-input-${screenSize}`
      });
    }

    it('should match previous screenshot on large screens', (done) => {
      matchesPreviousAutocompleteInputEditingGrid('lg', done);
    });
  });

  describe('autocomplete dropdown editing', () => {
    function matchesPreviousAutocompleteDropdownEditingGrid(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): void {
      const input = element(by.css(autocompleteCell));
      SkyHostBrowser.setWindowBreakpoint(screenSize);

      element(by.css(editButton)).click();

      SkyHostBrowser.scrollTo(autocompleteCell);
      input.value = 'j';
      input.click();
      browser.actions().sendKeys('j').perform();

      browser.wait(() => {
        return browser.isElementPresent(
          element(by.css('.sky-dropdown-item'))
        );
      });

      expect(editableGrid).toMatchBaselineScreenshot(done, {
        screenshotName: `editable-grid-edit-autocomplete-dropdown-${screenSize}`
      });
    }

    it('should match previous screenshot on large screens', (done) => {
      matchesPreviousAutocompleteDropdownEditingGrid('lg', done);
    });
  });
});
