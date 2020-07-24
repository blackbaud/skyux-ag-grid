import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  AgGridAngular
} from 'ag-grid-angular';

import {
  Column,
  ColumnMovedEvent,
  RowNode,
  RowSelectedEvent
} from 'ag-grid-community';

import {
  expect
} from '@skyux-sdk/testing';

import {
  SkyDataManagerService
} from '@skyux/data-manager';

import {
  SkyAgGridDataManagerFixtureComponent
} from './fixtures/ag-grid-data-manager.component.fixture';

import {
  SkyAgGridFixtureModule
} from './fixtures/ag-grid.module.fixture';

describe('SkyAgGridDataManagerAdapterDirective', () => {
  let agGridDataManagerFixture: ComponentFixture<SkyAgGridDataManagerFixtureComponent>;
  let agGridDataManagerFixtureComponent: SkyAgGridDataManagerFixtureComponent;
  let agGridComponent: AgGridAngular;
  let dataManagerService: SkyDataManagerService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [SkyAgGridFixtureModule],
      providers: [SkyDataManagerService]
    });

    agGridDataManagerFixture = TestBed.createComponent(SkyAgGridDataManagerFixtureComponent);
    agGridDataManagerFixtureComponent = agGridDataManagerFixture.componentInstance;
    dataManagerService = TestBed.inject(SkyDataManagerService);

    agGridDataManagerFixture.detectChanges();
    agGridComponent = agGridDataManagerFixtureComponent.agGrid;
  });

  it('should set columns visible based on the data state changes', async () => {
    spyOn(agGridComponent.columnApi, 'setColumnVisible');

    dataManagerService.updateDataState(agGridDataManagerFixtureComponent.initialDataState, 'unitTest');

    agGridDataManagerFixture.detectChanges();
    await agGridDataManagerFixture.whenStable();

    expect(agGridComponent.columnApi.setColumnVisible).toHaveBeenCalled();
  });

  it('should update the data state when a column is moved', () => {
    const colId = 'testCol';
    const colDef = { colId };
    const column = new Column(colDef, undefined, colId, true);

    spyOn(agGridComponent.columnApi, 'getAllDisplayedVirtualColumns').and.returnValue([column]);

    const columnMoved = {
      source: 'uiColumnMoved'
    } as ColumnMovedEvent;

    const updatedState = agGridDataManagerFixtureComponent.initialDataState;
    const viewState = updatedState.views[0];
    viewState.displayedColumnIds = [ colId ];

    spyOn(dataManagerService, 'updateDataState');
    agGridComponent.columnMoved.emit(columnMoved);

    expect(dataManagerService.updateDataState).toHaveBeenCalledWith(updatedState, agGridDataManagerFixtureComponent.viewConfig.id);
  });

  it('should update the data state when a row is selected', () => {
    const rowNode = new RowNode();
    rowNode.data = { id: '1' };
    spyOn(rowNode, 'isSelected').and.returnValue(true);

    const rowSelected = {
      node: rowNode
    } as RowSelectedEvent;

    const updatedState = agGridDataManagerFixtureComponent.initialDataState;
    updatedState.selectedIds = ['1'];

    spyOn(dataManagerService, 'updateDataState');
    agGridComponent.rowSelected.emit(rowSelected);

    expect(dataManagerService.updateDataState).toHaveBeenCalledWith(updatedState, agGridDataManagerFixtureComponent.viewConfig.id);
  });

  it('should update the data state when the sort changes', () => {
    const sortModel = [{ colId: 'name', sort: 'desc' }];
    const updatedState = agGridDataManagerFixtureComponent.initialDataState;
    updatedState.activeSortOption = {
      id: 'name',
      descending: true,
      propertyName: 'name',
      label: 'Name'
    };

    spyOn(agGridComponent.api, 'getSortModel').and.returnValue(sortModel);
    spyOn(dataManagerService, 'updateDataState');
    agGridComponent.sortChanged.emit();

    expect(dataManagerService.updateDataState).toHaveBeenCalledWith(updatedState, agGridDataManagerFixtureComponent.viewConfig.id);
  });

  describe('selecting rows', () => {

    it('should use the ag grid API to select all rows when onSelectAllClick is called', async () => {
      spyOn(agGridComponent.api, 'selectAll');

      agGridDataManagerFixture.detectChanges();
      await agGridDataManagerFixture.whenStable();

      const viewConfig = dataManagerService.getViewById(agGridDataManagerFixtureComponent.viewConfig.id);
      viewConfig.onSelectAllClick();

      expect(agGridComponent.api.selectAll).toHaveBeenCalled();
    });

    it('should use the ag grid API to deselect all rows when onClearAllClick is called', async () => {
      spyOn(agGridComponent.api, 'deselectAll');

      agGridDataManagerFixture.detectChanges();
      await agGridDataManagerFixture.whenStable();

      const viewConfig = dataManagerService.getViewById(agGridDataManagerFixtureComponent.viewConfig.id);
      viewConfig.onClearAllClick();

      expect(agGridComponent.api.deselectAll).toHaveBeenCalled();
    });
  });

  it('should throw an error if there are 2 grids in a component', () => {
    spyOn(console, 'error');
    agGridDataManagerFixtureComponent.displaySecondGrid = true;
    agGridDataManagerFixture.detectChanges();

    expect(console.error).toHaveBeenCalledWith('A data view may only have one active ag-Grid child component instance at a time.');
  });
});
