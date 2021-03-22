import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  flush
} from '@angular/core/testing';

import {
  expect,
  expectAsync
} from '@skyux-sdk/testing';

import {
  Column,
  ICellEditorParams
} from 'ag-grid-community';

import {
  SkyCellClass
} from '../../types/cell-class';

import {
  SkyAgGridFixtureComponent
} from '../../fixtures/ag-grid.component.fixture';

import {
  SkyAgGridFixtureModule
} from '../../fixtures/ag-grid.module.fixture';

import {
  SkyAgGridCellEditorAutonumericComponent
} from './cell-editor-autonumeric.component';

describe('SkyAgGridCellEditorAutonumericComponent', () => {
  // We've had some issue with grid rendering causing the specs to timeout in IE. Extending it slightly to help.
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 7500;

  let fixture: ComponentFixture<SkyAgGridCellEditorAutonumericComponent>;
  let component: SkyAgGridCellEditorAutonumericComponent;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SkyAgGridFixtureModule]
    });

    fixture = TestBed.createComponent(SkyAgGridCellEditorAutonumericComponent);
    nativeElement = fixture.nativeElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('renders a autonumeric input when editing a Numeric cell in an ag grid', fakeAsync(() => {
    const gridFixture = TestBed.createComponent(SkyAgGridFixtureComponent);
    const gridNativeElement = gridFixture.nativeElement;

    gridFixture.detectChanges();
    flush();

    const getEditElement = () => gridNativeElement.querySelector(`.ag-cell-inline-editing.${SkyCellClass.Numeric}`);

    const cellElement = gridNativeElement.querySelector(`.${SkyCellClass.Numeric}`);
    expect(cellElement).toBeDefined();

    let inputElement = getEditElement();
    expect(inputElement).toBeNull();

    cellElement.click();
    gridFixture.detectChanges();
    tick();

    inputElement = getEditElement();
    expect(inputElement).toBeVisible();
  }));

  describe('agInit', () => {
    it('initializes the SkyAgGridCellEditorAutonumericComponent properties', () => {
      const value = 15;
      const columnWidth = 100;
      const column = new Column({ colId: 'col' }, undefined, 'col', true);

      column.setActualWidth(columnWidth);

      let cellEditorParams: ICellEditorParams = {
        value,
        colDef: { headerName: 'Test numeric cell' },
        rowIndex: 1,
        column,
        node: undefined,
        keyPress: undefined,
        charPress: undefined,
        columnApi: undefined,
        data: undefined,
        api: undefined,
        cellStartedEdit: undefined,
        onKeyDown: undefined,
        context: undefined,
        $scope: undefined,
        stopEditing: undefined,
        eGridCell: undefined,
        parseValue: undefined,
        formatValue: undefined
      };

      expect(component.value).toBeUndefined();
      expect(component.columnWidth).toBeUndefined();

      component.agInit(cellEditorParams);

      expect(component.value).toEqual(value);
      expect(component.columnWidth).toEqual(columnWidth);
    });
  });

  describe('getValue', () => {
    it('returns the value if it is set', () => {
      component.value = 7;

      fixture.detectChanges();

      expect(component.getValue()).toBe(7);
    });

    it('returns the value if it is 0', () => {
      component.value = 0;

      fixture.detectChanges();

      expect(component.getValue()).toBe(0);
    });

    it('returns undefined if the value is not set', () => expect(component.getValue()).toBeUndefined());
  });

  describe('afterGuiAttached', () => {
    it('focuses on the input after it attaches to the DOM', fakeAsync(() => {
      fixture.detectChanges();

      const input = nativeElement.querySelector('input');
      spyOn(input, 'focus');

      component.afterGuiAttached();
      tick();

      expect(input).toBeVisible();
      expect(input.focus).toHaveBeenCalled();
    }));
  });

  it('should pass accessibility', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    await expectAsync(fixture.nativeElement).toBeAccessible();
  });

});
