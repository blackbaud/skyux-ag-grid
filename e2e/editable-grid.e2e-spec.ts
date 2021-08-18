import {
  expect,
  SkyHostBrowser,
  SkyVisualThemeSelector
} from '@skyux-sdk/e2e';

import {
  SkyHostBrowserBreakpoint
} from '@skyux-sdk/e2e/host-browser/host-browser-breakpoint';

import {
  browser,
  by,
  element,
  ExpectedConditions
} from 'protractor';

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

function cycleThroughThemes(runTests: () => void) {
  currentTheme = undefined;
  currentThemeMode = undefined;

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
}

describe('Editable grid', () => {

  // selectors
  const dateCell = '.sky-ag-grid-cell-editable.sky-ag-grid-cell-date';
  const autocompleteCell = '.sky-ag-grid-cell-editable.sky-ag-grid-cell-autocomplete';
  const editButton = '#edit-btn';
  const editableGrid = '.editable-grid';
  const sortableHeaderCell = '.ag-header-cell-sortable';

  function runTests(): void {
    describe('read mode', () => {
      async function matchesPreviousEditableGrid(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): Promise<void> {
        await SkyHostBrowser.setWindowBreakpoint(screenSize);

        await SkyHostBrowser.moveCursorOffScreen();

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
      async function matchesPreviousEditableGridInEditMode(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): Promise<void> {
        await SkyHostBrowser.setWindowBreakpoint(screenSize);

        await element(by.css(editButton)).click();

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
      async function matchesPreviousDescendingSortGrid(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): Promise<void> {
        await SkyHostBrowser.setWindowBreakpoint(screenSize);

        await element(by.css(sortableHeaderCell)).click();

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
      async function matchesPreviousAscendingSortGrid(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): Promise<void> {
        SkyHostBrowser.setWindowBreakpoint(screenSize);

        // click twice to sort by descending then ascending
        await element(by.css(sortableHeaderCell)).click();
        await element(by.css(sortableHeaderCell)).click();

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
      async function matchesPreviousNumberEditingGrid(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): Promise<void> {
        await SkyHostBrowser.setWindowBreakpoint(screenSize);

        await element(by.css(editButton)).click();

        await element(by.css('.sky-ag-grid-cell-editable.sky-ag-grid-cell-number')).click();

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
      async function matchesPreviousTextEditingGrid(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): Promise<void> {
        await SkyHostBrowser.setWindowBreakpoint(screenSize);

        await element(by.css(editButton)).click();

        await element(by.css('.sky-ag-grid-cell-editable.sky-ag-grid-cell-text')).click();

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
      async function matchesPreviousDateTextEditingGrid(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): Promise<void> {
        await SkyHostBrowser.setWindowBreakpoint(screenSize);

        await element(by.css(editButton)).click();

        await element(by.css(dateCell)).click();

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

    describe('autocomplete input editing', () => {
      async function matchesPreviousAutocompleteInputEditingGrid (screenSize: SkyHostBrowserBreakpoint, done: DoneFn): Promise<void> {
        await SkyHostBrowser.setWindowBreakpoint(screenSize);

        await element(by.css(editButton)).click();

        await element(by.css(autocompleteCell)).click();

        expect(editableGrid).toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('editable-grid-edit-autocomplete-input', screenSize)
        });
      }

      it('should match previous screenshot on large screens', (done) => {
        matchesPreviousAutocompleteInputEditingGrid('lg', done);
      });
    });

    describe('autocomplete dropdown editing', () => {
      async function matchesPreviousAutocompleteDropdownEditingGrid(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): Promise<void> {
        const cell = element(by.css(autocompleteCell));
        await SkyHostBrowser.setWindowBreakpoint(screenSize);

        await element(by.css(editButton)).click();

        await cell.click();
        const input = element(by.css(`${autocompleteCell} input`));
        input.value = 'j';
        await browser.actions().sendKeys('j').perform();

        await browser.wait(
          ExpectedConditions.presenceOf(element(by.css('.sky-autocomplete-results'))),
          1200,
          'Autocomplete results dropdown took too long to appear.'
        );

        expect(editableGrid).toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('editable-grid-edit-autocomplete-dropdown', screenSize)
        });
      }

      it('should match previous screenshot on large screens', (done) => {
        matchesPreviousAutocompleteDropdownEditingGrid('lg', done);
      });
    });
  }

  beforeEach(async () => {
    await SkyHostBrowser.get('visual/editable-grid');
  });

  cycleThroughThemes(runTests);
});

describe('Editable grid, complex cells', () => {

  // selectors
  const selectCell = '.ag-body-viewport [aria-colindex="2"]';
  const selectCellTrigger = '.ag-body-viewport [aria-colindex="2"] .ag-picker-field-display';
  const selectList = '.ag-select-list';
  const editButton = '#edit-btn';

  function runTests(): void {

    describe('select focus', () => {
      async function matchesPreviousNumberEditingGrid(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): Promise<void> {
        await SkyHostBrowser.setWindowBreakpoint(screenSize);

        await element(by.css(editButton)).click();

        await element(by.css(selectCell)).click();

        expect(selectCell).toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('editable-grid-edit-select-focus', screenSize)
        });

        await element(by.css(selectCellTrigger)).click();

        expect(selectList).toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('editable-grid-edit-select-list', screenSize)
        });
      }

      it('should match previous screenshot on large screens', (done) => {
        matchesPreviousNumberEditingGrid('lg', done);
      });

      it('should match previous screenshot on extra small screens', (done) => {
        matchesPreviousNumberEditingGrid('xs', done);
      });
    });
  }

  beforeEach(async () => {
    await SkyHostBrowser.get('visual/edit-complex-cells');
  });

  cycleThroughThemes(runTests);
});
