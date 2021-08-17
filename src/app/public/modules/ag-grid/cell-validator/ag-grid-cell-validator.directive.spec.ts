import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import {
  expect
} from '@skyux-sdk/testing';

import {
  Column,
  RowNode
} from 'ag-grid-community';

import {
  SkyAgGridCellValidatorFixtureComponent
 } from '../fixtures/ag-grid-cell-validator.component.fixture';

import {
  SkyAgGridFixtureModule
} from '../fixtures/ag-grid.module.fixture';

import {
  SkyCellValidatorParams
} from '../types/cell-renderer-validator-params';

describe('SkyAgGridCellRendererValidatorComponent', () => {

  let cellRendererParams: SkyCellValidatorParams;
  let validatorRendererInstance: SkyAgGridCellValidatorFixtureComponent;
  let validatorRendererFixture: ComponentFixture<SkyAgGridCellValidatorFixtureComponent>;
  let validatorRendererNativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyAgGridFixtureModule
      ]
    });

    validatorRendererFixture = TestBed.createComponent(SkyAgGridCellValidatorFixtureComponent);
    validatorRendererInstance = validatorRendererFixture.componentInstance;
    validatorRendererNativeElement = validatorRendererFixture.nativeElement;
    let column: Column = new Column(
      {
        colId: 'col'
      },
      undefined,
      'col',
      true);

    column.setActualWidth(200);

    let mockRendererInstance = {
      refresh: (params: any) => validatorRendererInstance.refresh(params)
    };

    cellRendererParams = {
      value: 123,
      column,
      node: new RowNode(),
      colDef: {},
      columnApi: undefined,
      data: undefined,
      rowIndex: undefined,
      api: {
        getCellRendererInstances: () => {
          return [mockRendererInstance];
        }
      },
      context: undefined,
      $scope: undefined,
      eGridCell: validatorRendererNativeElement,
      formatValue: undefined,
      validator: (value: number) => {
        const valid = value < 10;
        return valid;
      }
    } as SkyCellValidatorParams;
  });

  describe('initialization', () => {

    it('should not mark a cell as invalid if valid on initialization', fakeAsync(() => {
      cellRendererParams.value = 3;

      validatorRendererInstance.agInit(cellRendererParams);

      validatorRendererFixture.detectChanges();
      tick();
      validatorRendererFixture.detectChanges();

      expect(validatorRendererNativeElement.classList.contains('sky-ag-grid-cell-invalid')).toBeFalsy();
    }));

    it('should mark a cell as invalid if invalid on initialization', fakeAsync(() => {
      cellRendererParams.value = 14;

      validatorRendererInstance.agInit(cellRendererParams);

      validatorRendererFixture.detectChanges();
      tick();
      validatorRendererFixture.detectChanges();

      expect(validatorRendererNativeElement.classList.contains('sky-ag-grid-cell-invalid')).toBeTruthy();
    }));

    it('should notify the cell renderer when validation is valid on initialization', fakeAsync(() => {
      const validationSpy = spyOn(validatorRendererInstance, 'validationChange');
      cellRendererParams.value = 3;

      validatorRendererInstance.agInit(cellRendererParams);

      validatorRendererFixture.detectChanges();
      tick();
      validatorRendererFixture.detectChanges();
      expect(validationSpy).toHaveBeenCalledWith(3, true);
    }));

    it('should notify the cell renderer when validation is invalid on initialization', fakeAsync(() => {
      const validationSpy = spyOn(validatorRendererInstance, 'validationChange');
      cellRendererParams.value = 14;

      validatorRendererInstance.agInit(cellRendererParams);

      validatorRendererFixture.detectChanges();
      tick();
      validatorRendererFixture.detectChanges();
      expect(validationSpy).toHaveBeenCalledWith(14, false);
    }));

  });

  describe('validator update', () => {

    it('should update cell to invalid if vaildator change updates its state', fakeAsync(() => {
      cellRendererParams.value = 3;

      validatorRendererInstance.agInit(cellRendererParams);

      validatorRendererFixture.detectChanges();
      tick();
      validatorRendererFixture.detectChanges();

      expect(validatorRendererNativeElement.classList.contains('sky-ag-grid-cell-invalid')).toBeFalsy();

      cellRendererParams.validator = (value: number) => {
        const valid = value > 10;
        return valid;
      };

      validatorRendererInstance.agInit(Object.assign({}, cellRendererParams));

      validatorRendererFixture.detectChanges();
      tick();
      validatorRendererFixture.detectChanges();

      expect(validatorRendererNativeElement.classList.contains('sky-ag-grid-cell-invalid')).toBeTruthy();
    }));

    it('should update cell to valid if vaildator change updates its state', fakeAsync(() => {
      cellRendererParams.value = 14;

      validatorRendererInstance.agInit(cellRendererParams);

      validatorRendererFixture.detectChanges();
      tick();
      validatorRendererFixture.detectChanges();

      expect(validatorRendererNativeElement.classList.contains('sky-ag-grid-cell-invalid')).toBeTruthy();

      cellRendererParams.validator = (value: number) => {
        const valid = value > 10;
        return valid;
      };

      validatorRendererInstance.agInit(Object.assign({}, cellRendererParams));

      validatorRendererFixture.detectChanges();
      tick();
      validatorRendererFixture.detectChanges();

      expect(validatorRendererNativeElement.classList.contains('sky-ag-grid-cell-invalid')).toBeFalsy();
    }));

    it('should notify the cell renderer when validation is valid on initialization', fakeAsync(() => {
      const validationSpy = spyOn(validatorRendererInstance, 'validationChange');
      cellRendererParams.value = 3;

      validatorRendererInstance.agInit(cellRendererParams);

      validatorRendererFixture.detectChanges();
      tick();
      validatorRendererFixture.detectChanges();
      expect(validationSpy).toHaveBeenCalledWith(3, true);
      validationSpy.calls.reset();

      cellRendererParams.validator = (value: number) => {
        const valid = value > 10;
        return valid;
      };

      validatorRendererInstance.agInit(Object.assign({}, cellRendererParams));

      validatorRendererFixture.detectChanges();
      tick();
      validatorRendererFixture.detectChanges();

      expect(validationSpy).toHaveBeenCalledWith(3, false);
    }));

    it('should notify the cell renderer when validation is invalid on initialization', fakeAsync(() => {
      const validationSpy = spyOn(validatorRendererInstance, 'validationChange');
      cellRendererParams.value = 14;

      validatorRendererInstance.agInit(cellRendererParams);

      validatorRendererFixture.detectChanges();
      tick();
      validatorRendererFixture.detectChanges();
      expect(validationSpy).toHaveBeenCalledWith(14, false);
      validationSpy.calls.reset();

      cellRendererParams.validator = (value: number) => {
        const valid = value > 10;
        return valid;
      };

      validatorRendererInstance.agInit(Object.assign({}, cellRendererParams));

      validatorRendererFixture.detectChanges();
      tick();
      validatorRendererFixture.detectChanges();

      expect(validationSpy).toHaveBeenCalledWith(14, true);
    }));

  });

  describe('refresh', () => {

    it('should update cell to invalid if vaildator change updates its state', fakeAsync(() => {
      cellRendererParams.value = 3;

      validatorRendererInstance.agInit(cellRendererParams);

      validatorRendererFixture.detectChanges();
      tick();
      validatorRendererFixture.detectChanges();

      expect(validatorRendererNativeElement.classList.contains('sky-ag-grid-cell-invalid')).toBeFalsy();

      cellRendererParams.value = 14;

      (<any> cellRendererParams.api.getCellRendererInstances()[0]).refresh(cellRendererParams);

      validatorRendererFixture.detectChanges();
      tick();
      validatorRendererFixture.detectChanges();

      expect(validatorRendererNativeElement.classList.contains('sky-ag-grid-cell-invalid')).toBeTruthy();
    }));

    it('should update cell to valid if vaildator change updates its state', fakeAsync(() => {
      cellRendererParams.value = 14;

      validatorRendererInstance.agInit(cellRendererParams);

      validatorRendererFixture.detectChanges();
      tick();
      validatorRendererFixture.detectChanges();

      expect(validatorRendererNativeElement.classList.contains('sky-ag-grid-cell-invalid')).toBeTruthy();

      cellRendererParams.value = 3;

      (<any> cellRendererParams.api.getCellRendererInstances()[0]).refresh(cellRendererParams);

      validatorRendererFixture.detectChanges();
      tick();
      validatorRendererFixture.detectChanges();

      expect(validatorRendererNativeElement.classList.contains('sky-ag-grid-cell-invalid')).toBeFalsy();
    }));

    it('should notify the cell renderer when validation is valid on initialization', fakeAsync(() => {
      const validationSpy = spyOn(validatorRendererInstance, 'validationChange');
      cellRendererParams.value = 3;

      validatorRendererInstance.agInit(cellRendererParams);

      validatorRendererFixture.detectChanges();
      tick();
      validatorRendererFixture.detectChanges();
      expect(validationSpy).toHaveBeenCalledWith(3, true);
      validationSpy.calls.reset();

      cellRendererParams.value = 14;

      (<any> cellRendererParams.api.getCellRendererInstances()[0]).refresh(cellRendererParams);

      validatorRendererFixture.detectChanges();
      tick();
      validatorRendererFixture.detectChanges();

      expect(validationSpy).toHaveBeenCalledWith(14, false);
    }));

    it('should notify the cell renderer when validation is invalid on initialization', fakeAsync(() => {
      const validationSpy = spyOn(validatorRendererInstance, 'validationChange');
      cellRendererParams.value = 14;

      validatorRendererInstance.agInit(cellRendererParams);

      validatorRendererFixture.detectChanges();
      tick();
      validatorRendererFixture.detectChanges();
      expect(validationSpy).toHaveBeenCalledWith(14, false);
      validationSpy.calls.reset();

      cellRendererParams.value = 3;

      (<any> cellRendererParams.api.getCellRendererInstances()[0]).refresh(cellRendererParams);

      validatorRendererFixture.detectChanges();
      tick();
      validatorRendererFixture.detectChanges();

      expect(validationSpy).toHaveBeenCalledWith(3, true);
    }));

  });

});
