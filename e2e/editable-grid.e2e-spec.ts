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
    SkyHostBrowser.get('visual/editable-grid');
  });

  it('should match previous editable grid in read mode screenshot', (done) => {
    SkyHostBrowser.setWindowBreakpoint('lg');
    SkyHostBrowser.moveCursorOffScreen();
    expect('.editable-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'editable-grid-read-lg'
    });
  });

  it('should match previous editable grid in read mode screenshot on tiny screens', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');
    SkyHostBrowser.moveCursorOffScreen();
    expect('.editable-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'editable-grid-read-xs'
    });
  });

  it('should match previous editable grid in edit mode screenshot', (done) => {
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('#edit-btn')).click();
    expect('.editable-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'editable-grid-edit-lg'
    });
  });

  it('should match previous editable grid in edit mode screenshot on tiny screens', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('#edit-btn')).click();
    expect('.editable-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'editable-grid-edit-xs'
    });
  });

  it('should match previous screenshot with descending sort indication', (done) => {
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('.ag-header-cell-sortable')).click();
    expect('.editable-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'editable-grid-sort-desc-lg'
    });
  });

  it('should match previous screenshot with descending sort indication on tiny screens', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('.ag-header-cell-sortable')).click();
    expect('.editable-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'editable-grid-sort-desc-xs'
    });
  });

  it('should match previous screenshot with ascending sort indication', (done) => {
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('.ag-header-cell-sortable')).click();
    element(by.css('.ag-header-cell-sortable')).click();
    expect('.editable-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'editable-grid-sort-asc-lg'
    });
  });

  it('should match previous screenshot with ascending sort indication on tiny screens', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('.ag-header-cell-sortable')).click();
    element(by.css('.ag-header-cell-sortable')).click();
    expect('.editable-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'editable-grid-sort-asc-xs'
    });
  });

  it('should match previous editable grid with number editing screenshot', (done) => {
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('#edit-btn')).click();
    element(by.css('.sky-cell-editable.sky-cell-number')).click();
    expect('.editable-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'editable-grid-edit-number-lg'
    });
  });

  it('should match previous editable grid with number editing screenshot on tiny screens', (done) => {
    SkyHostBrowser.setWindowBreakpoint('xs');
    element(by.css('#edit-btn')).click();
    element(by.css('.sky-cell-editable.sky-cell-number')).click();
    expect('.editable-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'editable-grid-edit-number-xs'
    });
  });

  it('should match previous editable grid with date text editing screenshot', (done) => {
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('#edit-btn')).click();
    element(by.css('.sky-cell-editable.sky-cell-date')).click();
    expect('.editable-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'editable-grid-edit-date-lg'
    });
  });

  it('should match previous editable grid with date calendar editing screenshot', (done) => {
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('#edit-btn')).click();
    element(by.css('.sky-cell-editable.sky-cell-date')).click();
    element(by.css('.sky-dropdown-button-type-calendar')).click();
    expect('.editable-grid').toMatchBaselineScreenshot(done, {
      screenshotName: 'editable-grid-edit-date-cal-lg'
    });
  });
});
