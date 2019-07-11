import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  expect
} from '@skyux-sdk/testing';

import {
  EditableGridComponent
} from './editable-grid.component';

import {
  AgGridModule
} from 'ag-grid-angular';

import {
  SkyAppTestModule
} from '@skyux-sdk/builder/runtime/testing/browser';

import {
  CellValueChangedEvent,
  GridApi,
  GridReadyEvent,
  RowNode
} from 'ag-grid-community';

import {
  EditableGridRow
} from './editable-grid-data';

describe('EditableGridComponent', () => {

  let fixture: ComponentFixture<EditableGridComponent>;
  let component: EditableGridComponent;
  let nativeElement: HTMLElement;
  let gridApi: GridApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyAppTestModule,
        AgGridModule.withComponents([])
      ]
    });

    fixture = TestBed.createComponent(EditableGridComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    gridApi = new GridApi();
  });

  it('renders an ag-grid with update rows', () => {
    spyOn(component, 'sizeGrid');
    fixture.detectChanges();

    let grid = nativeElement.querySelector('ag-grid-angular');

    expect(grid).toBeVisible();
  });

  describe('#setColumnDefs', () => {
    it('sets value and completed date columns to editable and all others to uneditable when editMode is true', () => {
      spyOn(component, 'sizeGrid');
      const editableColumns = ['value1', 'value2', 'value3', 'completedDate'];
      component.editMode = true;
      fixture.detectChanges();

      component.setColumnDefs();

      component.columnDefs.forEach(col => {
        if (editableColumns.includes(col.colId)) {
          expect(col.editable).toBeTruthy();
        } else {
          expect(col.editable).toBeFalsy();
        }
      });
    });

    it('sets all columns to uneditable if editMode is false', () => {
      spyOn(component, 'sizeGrid');
      component.editMode = false;
      fixture.detectChanges();

      component.setColumnDefs();

      component.columnDefs.forEach(col => {
        expect(col.editable).toBeFalsy();
      });
    });
  });

  describe('#cancelEdits', () => {
    it('calls setEditMode and sets the gridData to the uneditedGridData', () => {
      component.editMode = true;
      component.gridData = [{
        name: 'Goal',
        value1: 10,
        value2: 15,
        value3: 20,
        target: 40,
        completedDate: new Date('1/21/2019'),
        dueDate: new Date('1/31/2019')
      }];

      component.uneditedGridData = [{
        name: 'Goal',
        value1: 10,
        value2: 15,
        target: 40,
        dueDate: new Date('1/31/2019')
      }];

      spyOn(component, 'setEditMode');

      expect(component.gridData).not.toEqual(component.uneditedGridData);

      component.cancelEdits();

      expect(component.setEditMode).toHaveBeenCalledWith(false);
      expect(component.gridData).toEqual(component.uneditedGridData);
    });
  });

  describe('#setEditMode', () => {
    it('sets the column definitions and rerenders the grid as editable when editMode is changed to true', () => {
      let staticGrid: HTMLElement;
      let editableGrid: HTMLElement;
      component.gridApi = gridApi;
      spyOn(component, 'sizeGrid');
      spyOn(component, 'setColumnDefs');
      spyOn(component.gridApi, 'setColumnDefs');

      fixture.detectChanges();

      staticGrid = nativeElement.querySelector('ag-grid-angular:not(.sky-grid-edit-mode)');
      editableGrid = nativeElement.querySelector('ag-grid-angular.sky-grid-edit-mode');

      expect(component.editMode).toBeFalsy();
      expect(staticGrid).toBeVisible();
      expect(editableGrid).toBeNull();

      component.setEditMode(true);
      fixture.detectChanges();

      staticGrid = nativeElement.querySelector('ag-grid-angular:not(.sky-grid-edit-mode)');
      editableGrid = nativeElement.querySelector('ag-grid-angular.sky-grid-edit-mode');

      expect(component.editMode).toBeTruthy();
      expect(staticGrid).toBeNull();
      expect(editableGrid).toBeVisible();
      expect(component.setColumnDefs).toHaveBeenCalled();
      expect(component.gridApi.setColumnDefs).toHaveBeenCalled();
    });

    it('sets the column definitions and rerenders the grid as uneditable when editMode is changed to false', () => {
      let staticGrid: HTMLElement;
      let editableGrid: HTMLElement;
      component.gridApi = gridApi;
      component.editMode = true;
      spyOn(component, 'sizeGrid');
      spyOn(component, 'setColumnDefs');
      spyOn(component.gridApi, 'setColumnDefs');

      fixture.detectChanges();
      staticGrid = nativeElement.querySelector('ag-grid-angular:not(.sky-grid-edit-mode)');
      editableGrid = nativeElement.querySelector('ag-grid-angular.sky-grid-edit-mode');

      expect(component.editMode).toBeTruthy();
      expect(staticGrid).toBeNull();
      expect(editableGrid).toBeVisible();

      component.setEditMode(false);
      fixture.detectChanges();

      staticGrid = nativeElement.querySelector('ag-grid-angular:not(.sky-grid-edit-mode)');
      editableGrid = nativeElement.querySelector('ag-grid-angular.sky-grid-edit-mode');

      expect(component.editMode).toBeFalsy();
      expect(staticGrid).toBeVisible();
      expect(editableGrid).toBeNull();
      expect(component.setColumnDefs).toHaveBeenCalled();
      expect(component.gridApi.setColumnDefs).toHaveBeenCalled();
    });
  });

  describe('#saveData', () => {
    it('stops editing, sets edit mode, updates uneditedGridData, and alerts the user', () => {
      component.editMode = true;
      component.gridApi = gridApi;
      component.gridData = [{
        name: 'Goal',
        value1: 10,
        target: 40,
        dueDate: new Date('1/31/2019')
      }];
      spyOn(component, 'sizeGrid');
      spyOn(component, 'setEditMode');
      spyOn(component.gridApi, 'stopEditing');
      spyOn(window, 'alert');

      fixture.detectChanges();

      // make edits
      component.gridData[0].value2 = 11;

      expect(component.gridData).not.toEqual(component.uneditedGridData);

      component.saveData();
      fixture.detectChanges();

      expect(component.gridApi.stopEditing).toHaveBeenCalled();
      expect(component.gridData).toEqual(component.uneditedGridData);
      expect(component.setEditMode).toHaveBeenCalledWith(false);
      expect(window.alert).toHaveBeenCalled();
    });
  });

  describe('#onUpdateCellValueChanged', () => {
    let cellChangeEvent: CellValueChangedEvent;
    let rowNode: RowNode = new RowNode();

    beforeEach(() => {
      cellChangeEvent = {
        oldValue: undefined,
        newValue: undefined,
        column: undefined,
        colDef: {},
        value: undefined,
        node: rowNode,
        data: {},
        rowIndex: 1,
        rowPinned: undefined,
        context: {},
        api: undefined,
        columnApi: undefined,
        type: undefined
      };
    });

    it('recalculates the row total and refreshes the row when the cell\'s newValue is different than its oldValue', () => {
      component.gridApi = gridApi;
      cellChangeEvent.newValue = 17;
      spyOn(component, 'calculateRowTotal');
      spyOn(component.gridApi, 'refreshCells');

      component.onUpdateCellValueChanged(cellChangeEvent);

      expect(component.gridApi.refreshCells).toHaveBeenCalledWith({ rowNodes: [rowNode] });
      expect(component.calculateRowTotal).toHaveBeenCalled();
    });

    it('does not recalculate or refresh the row when the cell\'s newValue is not different than its oldValue', () => {
      component.gridApi = gridApi;
      cellChangeEvent.newValue = 17;
      cellChangeEvent.oldValue = 17;
      spyOn(component, 'calculateRowTotal');
      spyOn(component.gridApi, 'refreshCells');

      component.onUpdateCellValueChanged(cellChangeEvent);

      expect(component.gridApi.refreshCells).not.toHaveBeenCalledWith();
      expect(component.calculateRowTotal).not.toHaveBeenCalled();
    });
  });

  describe('#dateFormatter', () => {
    it('returns undefined for undefined dates', () => {
      const formattedDate = component.dateFormatter({ value: undefined });

      expect(formattedDate).toBeUndefined();
    });

    it('returns a defined date in MM/DD/YYYY format', () => {
      const formattedDate = component.dateFormatter({ value: new Date('December 31, 2019') });

      expect(formattedDate).toEqual('12/31/2019');
    });
  });

  describe('#calculateRowTotal', () => {
    it('returns 0 when a row has no set values for value1, value2, and value3', () => {
      let row: EditableGridRow = {
        name: 'Goal',
        dueDate: new Date('1/1/19'),
        target: 100
      };

      expect(component.calculateRowTotal(row)).toEqual(0);
    });

    it('returns the sum of a row\'s values for value1, value2, and value3', () => {
      let row: EditableGridRow = {
        name: 'Goal',
        dueDate: new Date('1/1/19'),
        target: 100,
        value1: 5,
        value2: 10,
        value3: 15
      };

      expect(component.calculateRowTotal(row)).toEqual(30);
    });
  });

  describe('#onGridReady', () => {
    it('sets gridApi and sizes the columns to fit', () => {
      const gridReadyEvent: GridReadyEvent = { api: gridApi, columnApi: undefined, type: 'GridReadyEvent' };
      spyOn(gridApi, 'sizeColumnsToFit');

      expect(component.gridApi).toBeUndefined();
      component.onGridReady(gridReadyEvent);

      expect(component.gridApi).toBe(gridApi);
      expect(component.gridApi.sizeColumnsToFit).toHaveBeenCalled();
    });
  });

  describe('#sizeGrid', () => {
    it('calls sizeColumnsToFit on the gridApi', () => {
      component.gridApi = gridApi;
      spyOn(component.gridApi, 'sizeColumnsToFit');

      component.sizeGrid();

      expect(component.gridApi.sizeColumnsToFit).toHaveBeenCalled();
    });
  });

  it('should pass accessibility', async(() => {
    spyOn(component, 'sizeGrid');
    fixture.detectChanges();
      expect(nativeElement).toBeAccessible();
  }));
});
