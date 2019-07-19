import {
  TestBed
} from '@angular/core/testing';

import {
  SkyAgGridService
} from './ag-grid.service';

import {
  CellClassParams,
  ColDef,
  ColumnApi,
  GridOptions,
  ValueFormatterParams
} from 'ag-grid-community';

import {
  SkyCellClass,
  SkyCellType
} from './types';

describe('SyAgGridService', () => {
  let agGridService: SkyAgGridService;
  let defaultGridOptions: GridOptions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SkyAgGridService
      ]
    });

    agGridService = TestBed.get(SkyAgGridService);
    defaultGridOptions = agGridService.getGridOptions({ gridOptions: {}});
  });

  describe('#getGridOptions', () => {
    it('should return a default grid options configuration when no override options are passed', () => {

      expect(defaultGridOptions).toBeDefined();
      expect(defaultGridOptions.defaultColDef).toBeDefined();
    });

    it('overrides non-nested properties from the given options', () => {
      const newHeight = 1000;
      const overrideGridOptions: GridOptions = {
        headerHeight: newHeight,
        rowHeight: newHeight
      };
      const mergedGridOptions: GridOptions = agGridService.getGridOptions({ gridOptions: overrideGridOptions });

      expect(defaultGridOptions.headerHeight).not.toEqual(newHeight);
      expect(defaultGridOptions.rowHeight).not.toEqual(newHeight);
      expect(mergedGridOptions.headerHeight).toEqual(newHeight);
      expect(mergedGridOptions.rowHeight).toEqual(newHeight);
    });

    it('includes new provided columnTypes', () => {
      const newColumnType: ColDef = {
        width: 1000,
        sortable: false,
        editable: true
      };
      const overrideGridOptions: GridOptions = {
        columnTypes: {
          newType: newColumnType
        }
      };
      const mergedGridOptions: GridOptions = agGridService.getGridOptions({ gridOptions: overrideGridOptions });

      expect(mergedGridOptions.columnTypes.newType).toEqual(newColumnType);
      expect(mergedGridOptions.columnTypes[SkyCellType.Number]).toBeDefined();
      expect(mergedGridOptions.columnTypes[SkyCellType.Date]).toBeDefined();
      expect(mergedGridOptions.columnTypes[SkyCellType.RowSelector]).toBeDefined();
    });

    it('does not overwrite the default grid options columnTypes', () => {
      const overrideDateColumnType: ColDef = {
        width: 1000,
        sortable: false,
        editable: true,
        cellClass: 'random'
      };
      const defaultDateColumnType: ColDef = defaultGridOptions.columnTypes[SkyCellType.Date];
      defaultDateColumnType.valueFormatter = jasmine.any(Function);
      defaultDateColumnType.cellClassRules[SkyCellClass.Editable] = jasmine.any(Function);
      defaultDateColumnType.cellClassRules[SkyCellClass.Uneditable] = jasmine.any(Function);
      const overrideGridOptions: GridOptions = {
        columnTypes: {
          [SkyCellType.Date]: overrideDateColumnType
        }
      };

      const mergedGridOptions: GridOptions = agGridService.getGridOptions({ gridOptions: overrideGridOptions });

      expect(mergedGridOptions.columnTypes[SkyCellType.Date]).toEqual(defaultDateColumnType);
      expect(mergedGridOptions.columnTypes[SkyCellType.Number]).toBeDefined();
      expect(mergedGridOptions.columnTypes[SkyCellType.RowSelector]).toBeDefined();
    });

    it('overrides defaultColDef options that are not cellClassRules', () => {
      const overrideDefaultColDef: ColDef = {
        sortable: false,
        resizable: false
      };
      const defaultColDef: ColDef = defaultGridOptions.defaultColDef;
      const overrideGridOptions: GridOptions = {
        defaultColDef: overrideDefaultColDef
      };

      const mergedGridOptions: GridOptions = agGridService.getGridOptions({ gridOptions: overrideGridOptions });

      expect(mergedGridOptions.defaultColDef.sortable).not.toEqual(defaultColDef.sortable);
      expect(mergedGridOptions.defaultColDef.sortable).toEqual(overrideDefaultColDef.sortable);
      expect(mergedGridOptions.defaultColDef.resizable).not.toEqual(defaultColDef.resizable);
      expect(mergedGridOptions.defaultColDef.resizable).toEqual(overrideDefaultColDef.resizable);
    });

    it('does not override defaultColDef cellClassRules', () => {
      const overrideDefaultColDef: ColDef = {
        cellClassRules: {
          'new-rule': 'true'
        }
      };
      const overrideGridOptions: GridOptions = {
        defaultColDef: overrideDefaultColDef
      };

      const mergedGridOptions: GridOptions = agGridService.getGridOptions({ gridOptions: overrideGridOptions });

      expect(mergedGridOptions.defaultColDef.cellClassRules['new-rule']).toBeUndefined();
      expect(mergedGridOptions.defaultColDef.cellClassRules[SkyCellClass.Editable]).toBeDefined();
      expect(mergedGridOptions.defaultColDef.cellClassRules[SkyCellClass.Uneditable]).toBeDefined();
    });
  });

  describe('#dateFormatter', () => {
    let dateValueFormatter: Function;
    let dateValueFormatterParams: ValueFormatterParams;

    // remove the invisible characters IE11 includes in the output of toLocaleDateString
    // by creating a new string that only includes ASCII characters 47 - 57 (/0123456789)
    // https://stackoverflow.com/a/24874223/6178885
    function fixLocaleDateString(localeDate: string): string {
      let newStr = '';
      for (let i = 0; i < localeDate.length; i++) {
        const code = localeDate.charCodeAt(i);
        if (code >= 47 && code <= 57) {
          newStr += localeDate.charAt(i);
        }
      }
      return newStr;
    }

    beforeEach(() => {
      dateValueFormatter = defaultGridOptions.columnTypes[SkyCellType.Date].valueFormatter;
      dateValueFormatterParams = {
        value: undefined,
        node: undefined,
        data: undefined,
        colDef: undefined,
        column: undefined,
        columnApi: new ColumnApi(),
        api: undefined,
        context: undefined
      };
    });

    it('returns a date in the MM/DD/YYYY string format when no locale provided', () => {
      dateValueFormatterParams.value = new Date('12/1/2019');
      const formattedDate = dateValueFormatter(dateValueFormatterParams);
      const fixedFormattedDate = fixLocaleDateString(formattedDate);

      expect(fixedFormattedDate).toEqual('12/01/2019');
    });

    it('returns undefined when no date value is provided', () => {
      const formattedDate = dateValueFormatter(dateValueFormatterParams);

      expect(formattedDate).toBeUndefined();
    });

    it('returns a date in the DD/MM/YYYY string format when british english en-gb locale provided', () => {
      const britishGridOptions = agGridService.getGridOptions({ gridOptions: {}, locale: 'en-gb' });
      const britishDateValueFormatter = britishGridOptions.columnTypes[SkyCellType.Date].valueFormatter;
      dateValueFormatterParams.value = new Date('12/1/2019');

      const formattedDate = britishDateValueFormatter(dateValueFormatterParams);
      const fixedFormattedDate = fixLocaleDateString(formattedDate);

      expect(fixedFormattedDate).toEqual('01/12/2019');
    });
  });

  describe('getDefaultGridOptions getEditableFn', () => {
    let cellClassRuleEditableFunction: Function;
    let cellClassParams: CellClassParams;

    beforeEach(() => {
      const cellClassRuleEditable = defaultGridOptions.defaultColDef.cellClassRules[SkyCellClass.Editable];
      if (typeof cellClassRuleEditable === 'function') {
        cellClassRuleEditableFunction = cellClassRuleEditable;
      }

      cellClassParams = {
        value: undefined,
        data: undefined,
        node: undefined,
        rowIndex: undefined,
        $scope: undefined,
        api: undefined,
        columnApi: new ColumnApi(),
        context: undefined,
        colDef: {}
      };
    });

    it('returns true when the columnDefinion\'s editable property is true and checkinng for editable', () => {
      cellClassParams.colDef.editable = true;
      const editable = cellClassRuleEditableFunction(cellClassParams);

      expect(editable).toBeTruthy();
    });

    it('returns false when the columnDefinion\'s editable property is false and checking for editable', () => {
      cellClassParams.colDef.editable = false;
      const editable = cellClassRuleEditableFunction(cellClassParams);

      expect(editable).toBeFalsy();
    });

    it('returns false when the columnDefinion\'s editable property is undefined and checking for editable', () => {
      const editable = cellClassRuleEditableFunction(cellClassParams);

      expect(editable).toBeFalsy();
    });

    it('returns the result of the function when the columnDefinion\'s editable property is a function and checking for editable', () => {
      cellClassParams.colDef.editable = () => { return true; };
      spyOn(cellClassParams.columnApi, 'getColumn').and.returnValue(undefined);
      const editable = cellClassRuleEditableFunction(cellClassParams);

      expect(editable).toBeTruthy();
    });

    it('returns false when the columnDefinion\'s editable property is true and checking for uneditable', () => {
      let cellClassRuleUneditableFunction: Function;

      const cellClassRuleUneditable = defaultGridOptions.defaultColDef.cellClassRules[SkyCellClass.Uneditable];
      if (typeof cellClassRuleUneditable === 'function') {
        cellClassRuleUneditableFunction = cellClassRuleUneditable;
      }

      cellClassParams.colDef.editable = true;
      const editable = cellClassRuleUneditableFunction(cellClassParams);

      expect(editable).toBeFalsy();
    });
  });
});
