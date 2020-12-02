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

describe('Readonly grid', () => {
  // selectors
  const readonlyGrid = '.readonly-grid';
  const sortableHeaderCell = '.ag-header-cell-sortable';

  let currentTheme: string;
  let currentThemeMode: string;

  async function selectTheme(theme: string, mode: string): Promise<void> {
    currentTheme = theme;
    currentThemeMode = mode;

    return SkyVisualThemeSelector.selectTheme(theme, mode);
  }

  function getScreenshotName(name: string): string {
    if (currentTheme) {
      name += '-' + currentTheme;
    }

    if (currentThemeMode) {
      name += '-' + currentThemeMode;
    }

    return name;
  }

  function runTests(): void {
    describe('read mode', () => {
      async function matchesPreviousReadonlyGrid(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): Promise<void> {
        await SkyHostBrowser.setWindowBreakpoint(screenSize);

        await SkyHostBrowser.moveCursorOffScreen();

        expect(readonlyGrid).toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName(`readonly-grid-${screenSize}`)
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
      async function matchesPreviousDescendingSortGrid(screenSize: SkyHostBrowserBreakpoint, done: DoneFn): Promise<void> {
        await SkyHostBrowser.setWindowBreakpoint(screenSize);

        await element(by.css(sortableHeaderCell)).click();

        expect(readonlyGrid).toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName(`readonly-grid-sort-desc-${screenSize}`)
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

        expect(readonlyGrid).toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName(`readonly-grid-sort-asc-${screenSize}`)
        });
      }

      it('should match previous screenshoton large screens', (done) => {
        matchesPreviousAscendingSortGrid('lg', done);
      });

      it('should match previous screenshoton extra small screens', (done) => {
        matchesPreviousAscendingSortGrid('xs', done);
      });
    });
  }

  beforeEach(async () => {
    await SkyHostBrowser.get('visual/readonly-grid');
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
