import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

import {
  element,
  by
} from 'protractor';

describe('Editable grid', () => {

  beforeEach(() => {
    SkyHostBrowser.get('visual/readonly-grid');
  });

  it('should match previous read only grid screenshot', (done) => {
    SkyHostBrowser.setWindowBreakpoint('lg');
    SkyHostBrowser.moveCursorOffScreen();
    expect('.readonly-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'readonly-grid-lg'
    });
  });

  it('should match previous read only grid in screenshot on tiny screens', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.moveCursorOffScreen();
    expect('.readonly-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'readonly-grid-xs'
    });
  });

  it('should match previous screenshot with descending sort indication', (done) => {
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('.ag-header-cell-sortable')).click();
    expect('.readonly-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'readonly-grid-sort-desc-lg'
    });
  });

  it('should match previous screenshot with descending sort indication on tiny screens', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('.ag-header-cell-sortable')).click();
    expect('.readonly-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'readonly-grid-sort-desc-xs'
    });
  });

  it('should match previous screenshot with ascending sort indication', (done) => {
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('.ag-header-cell-sortable')).click();
    element(by.css('.ag-header-cell-sortable')).click();
    expect('.readonly-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'readonly-grid-sort-asc-lg'
    });
  });

  it('should match previous screenshot with ascending sort indication on tiny screens', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('.ag-header-cell-sortable')).click();
    element(by.css('.ag-header-cell-sortable')).click();
    expect('.readonly-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'readonly-grid-sort-asc-xs'
    });
  });
});
