import {
  expect,
  SkyHostBrowser,
  SkyVisualThemeSelector
} from '@skyux-sdk/e2e';

import {
  SkyHostBrowserBreakpoint
} from '@skyux-sdk/e2e/host-browser/host-browser-breakpoint';

import {
  by,
  element
} from 'protractor';

describe('Editable grid', () => {

  // selectors
  const dateCell = '.sky-ag-grid-cell-editable.sky-ag-grid-cell-date';
  const editButton = '#edit-btn';
  const editableGrid = '.editable-grid';
  const sortableHeaderCell = '.ag-header-cell-sortable';

  let currentTheme: string;
  let currentThemeMode: string;

  async function selectTheme(theme: string, mode: string): Promise<void> {
    currentTheme = theme;
    currentThemeMode = mode;

    return SkyVisualThemeSelector.selectTheme(theme, mode);
  }

  function getScreenshotName(name: string, size: string): string {
    if (currentTheme) {
      name += '-' + currentTheme;
    }

    if (currentThemeMode) {
      name += '-' + currentThemeMode;
    }

    name += '-' + size;

    return name;
  }

  function runTests(): void {
    describe('read mode', () => {
      function matchesPreviousEditableGrid(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): void {
        SkyHostBrowser.setWindowBreakpoint(screenSize);

        SkyHostBrowser.moveCursorOffScreen();

        expect(editableGrid).toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('editable-grid-read', screenSize)
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
          screenshotName: getScreenshotName('editable-grid-edit', screenSize)
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
          screenshotName: getScreenshotName('editable-grid-sort-desc', screenSize)
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
          screenshotName: getScreenshotName('editable-grid-sort-asc', screenSize)
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
          screenshotName: getScreenshotName('editable-grid-edit-number', screenSize)
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
          screenshotName: getScreenshotName('editable-grid-edit-text', screenSize)
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
          screenshotName: getScreenshotName('editable-grid-edit-date', screenSize)
        });
      }

      it('should match previous screenshot on large screens', (done) => {
        matchesPreviousDateTextEditingGrid('lg', done);
      });

      it('should match previous screenshot on extra small screens', (done) => {
        matchesPreviousDateTextEditingGrid('xs', done);
      });
    });
  }

  beforeEach(async () => {
    await SkyHostBrowser.get('visual/editable-grid');
  });

  runTests();

  describe('when modern theme', () => {

    beforeEach(async () => {
      await selectTheme('modern', 'light');
    });

    runTests();

  });

  describe('when modern theme in dark mode', () => {

    beforeEach(async () => {
      await selectTheme('modern', 'dark');
    });

    runTests();

  });
});
