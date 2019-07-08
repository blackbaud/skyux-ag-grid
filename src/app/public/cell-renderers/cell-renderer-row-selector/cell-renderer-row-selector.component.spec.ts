import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  SkyAppTestModule
} from '@skyux-sdk/builder/runtime/testing/browser';

import {
  expect
} from '@skyux-sdk/testing';

import {
  SkyCellRendererRowSelectorComponent
} from './cell-renderer-row-selector.component';

import {
  SkyCellRendererRowSelectorModule
} from './cell-renderer-row-selector.module';

import {
  RowNode
} from 'ag-grid-community';

describe('Checkbox cell component', () => {
  let fixture: ComponentFixture<SkyCellRendererRowSelectorComponent>;
  let component: SkyCellRendererRowSelectorComponent;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyAppTestModule,
        SkyCellRendererRowSelectorModule
      ]
    });

    fixture = TestBed.createComponent(SkyCellRendererRowSelectorComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('renders a skyux checkbox', () => {
    fixture.detectChanges();

    let element = nativeElement.querySelector('sky-checkbox');
    expect(element).toBeVisible();
  });

  describe('#agInit', () => {
    it('initializes the SkyuxCheckboxGridCellComponent properties', () => {
      let checked = true;
      let rowNode: RowNode = new RowNode();

      let cellEditorParams = { value: checked, node: rowNode };

      expect(component.checked).toBeUndefined();
      expect(component.rowNode).toBeUndefined();

      component.agInit(cellEditorParams);

      expect(component.checked).toEqual(checked);
      expect(component.rowNode).toEqual(rowNode);
    });
  });

  describe('#updateRow', () => {
    it ('sets the rowNode selected property to the component\'s checked property', () => {
      let rowNode: RowNode = new RowNode();
      component.checked = true;
      component.rowNode = rowNode;
      spyOn(component.rowNode, 'setSelected');

      component.updateRow();

      expect(component.rowNode.setSelected).toHaveBeenCalledWith(true);
    });
  });

  describe('#refresh', () => {
    it ('returns false', () => {
      expect(component.refresh()).toBeFalsy();
    });
  });
});
