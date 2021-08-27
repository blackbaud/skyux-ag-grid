import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { expect } from '@skyux-sdk/testing';
import { SkyAgGridCellValidatorTooltipFixtureComponent } from '../fixtures/ag-grid-cell-validator-tooltip.component.fixture';
import { SkyAgGridFixtureComponent } from '../fixtures/ag-grid.component.fixture';
import { SkyAgGridFixtureModule } from '../fixtures/ag-grid.module.fixture';
import { SkyCellClass } from '../types/cell-class';
import { SkyAgGridCellValidatorTooltipComponent } from './ag-grid-cell-validator-tooltip.component';

// Borrowed from skyux-lookup src/app/public/modules/lookup/lookup.component.spec.ts
const isIE = window.navigator.userAgent.indexOf('rv:11.0') >= 0;

if (!isIE) {

  describe('SkyAgGridCellValidatorTooltipComponent', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          SkyAgGridFixtureModule
        ]
      });
    });

    it('should create an instance', () => {
      const fixture = TestBed.createComponent(SkyAgGridCellValidatorTooltipFixtureComponent);
      fixture.componentInstance.parameters = {};
      fixture.detectChanges();
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('should toggle popover', fakeAsync(() => {
      const fixture = TestBed.createComponent(SkyAgGridCellValidatorTooltipComponent);
      fixture.componentInstance.validatorMessage = 'Test message ABC';
      fixture.componentInstance.parameters = {
        // @ts-ignore
        api: {
          addEventListener(eventType: string, listener: Function) {
          }
        },
        eGridCell: {
          // @ts-ignore
          addEventListener(eventType: string, listener: Function) {
          }
        },
        // @ts-ignore
        column: {
          colId: () => -1
        },
        rowIndex: -1
      };
      fixture.detectChanges();
      expect(fixture.componentInstance).toBeTruthy();
      expect(fixture.componentInstance.indicatorShouldShow).toBeTrue();

      fixture.componentInstance.showPopover();
      tick();
      expect(fixture.componentInstance.indicatorShouldShow).toBeFalse();

      fixture.componentInstance.hidePopover();
      fixture.componentInstance.showIndicator();
      tick();
      expect(fixture.componentInstance.indicatorShouldShow).toBeTrue();
    }));

    it('should load a grid with validator columns', fakeAsync(() => {
      const gridFixture = TestBed.createComponent(SkyAgGridFixtureComponent);
      spyOn(gridFixture.componentInstance, 'gridReady');
      gridFixture.detectChanges();
      tick();
      flush();
      expect(gridFixture.componentInstance.gridReady).toHaveBeenCalled();
    }));

    describe('events', () => {
      const cellSelector = `.${SkyCellClass.Number}.${SkyCellClass.Invalid}`;
      let fixture: ComponentFixture<SkyAgGridFixtureComponent>;
      let component: SkyAgGridFixtureComponent;

      beforeEach(() => {
        fixture = TestBed.createComponent(SkyAgGridFixtureComponent);
        component = fixture.componentInstance;
      });

      it('should trigger editing events', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        flush();
        fixture.whenStable().then(() => {
          const api = component.gridApi;
          api.setFocusedCell(1, 'name');
          tick();
          flush();
          api.startEditingCell({
            colKey: 'nickname',
            rowIndex: 1
          });
          tick();
          flush();
          api.stopEditing(true);
          tick();
          flush();
          const cellElement = fixture.nativeElement.querySelector(cellSelector);
          expect(cellElement).toBeTruthy();
        });
      }));

      it('should trigger key navigation events', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        flush();
        fixture.whenStable().then(() => {
          const api = component.gridApi;
          const cellElement = fixture.nativeElement.querySelector(cellSelector);
          expect(cellElement).toBeTruthy();
          (cellElement as HTMLElement).dispatchEvent(new KeyboardEvent('keyup', {key: 'ArrowUp'}));
          tick();
          flush();
          fixture.whenStable().then(() => {
            let docElement: Element = cellElement.parentElement;
            while (docElement.parentElement) {
              docElement = docElement.parentElement;
            }
            const popoverElement = docElement.querySelector('.sky-popover-body');
            expect(popoverElement).toBeTruthy();

            api.startEditingCell({
              colKey: 'validNumber',
              rowIndex: 3
            });
            tick();
            flush();
            const editorElement = fixture.nativeElement.querySelector(`${cellSelector}.ag-cell-inline-editing`);
            expect(editorElement).toBeTruthy();
          });
        });
      }));
    });
  });

}
