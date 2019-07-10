import {
  async,
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
  SkyCellEditorNumberComponent
} from './cell-editor-number.component';

describe('SkyCellEditorNumericComponent', () => {
  let fixture: ComponentFixture<SkyCellEditorNumberComponent>;
  let component: SkyCellEditorNumberComponent;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyAppTestModule
      ]
    });

    fixture = TestBed.createComponent(SkyCellEditorNumberComponent);
    nativeElement = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('renders a numeric input', () => {
    fixture.detectChanges();

    let element = nativeElement.querySelector('input[type="number"]');
    expect(element).toBeVisible();
  });

  describe('#agInit', () => {
    it('initializes the SkyuxNumericCellEditorComponent properties', () => {
      let value = 15;

      let cellEditorParams = { value };

      expect(component.value).toBeUndefined();

      component.agInit(cellEditorParams);

      expect(component.value).toEqual(value);
    });
  });

  describe('#getValue', () => {
    it('returns the value if it is set', () => {
      let value = 7;
      component.value = value;
      fixture.detectChanges();

      expect(component.getValue()).toBe(value);
    });

    it('returns the value if it is 0', () => {
      let value = 0;
      component.value = value;
      fixture.detectChanges();

      expect(component.getValue()).toBe(value);
    });

    it('returns undefined if the value is not set', () => {
      expect(component.getValue()).toBeUndefined();
    });
  });

  it('should pass accessibility', async(() => {
    component.label = 'grid number editor';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement).toBeAccessible();
    });
  }));
});
