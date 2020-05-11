import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  expect
} from '@skyux-sdk/testing';

import {
  SkyCoreAdapterService
} from '@skyux/core';

import {
  SkyAgGridWrapperAdapterFixtureComponent
} from './fixtures/ag-grid-wrapper-adapter.component.fixture';

import {
  SkyAgGridWrapperAdapterService
} from './ag-grid-wrapper-adapter.service';

describe('SkyAgGridWrapperAdapterService', () => {
  let agGridWrapperService: SkyAgGridWrapperAdapterService;
  let agGridWrapperAdapterServiceFixture: ComponentFixture<SkyAgGridWrapperAdapterFixtureComponent>;

  let parentElement: HTMLElement;
  let childElement: HTMLElement;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [SkyAgGridWrapperAdapterFixtureComponent],
      providers: [
        SkyAgGridWrapperAdapterService,
        SkyCoreAdapterService
      ]
    });

    agGridWrapperAdapterServiceFixture = TestBed.createComponent(SkyAgGridWrapperAdapterFixtureComponent);
    agGridWrapperService = TestBed.get(SkyAgGridWrapperAdapterService);
    parentElement = agGridWrapperAdapterServiceFixture.nativeElement.querySelector('#parent');
    childElement = agGridWrapperAdapterServiceFixture.nativeElement.querySelector('#child');
  });

  describe('elementOrParentHasClass', () => {
    it('should return true if an element has the given class', () => {
      expect(agGridWrapperService.elementOrParentHasClass(childElement, 'class2')).toBe(true);
    });

    it('should return true if an element\'s parent has the given class', () => {
      expect(agGridWrapperService.elementOrParentHasClass(childElement, 'class1')).toBe(true);
    });

    it('should return false if neither the element or it\'s parent has the given class', () => {
      expect(agGridWrapperService.elementOrParentHasClass(childElement, 'fakeClass')).toBe(false);
    });
  });

  describe('setFocusedElementById', () => {
    it('should focus on the element in the given ref with the given ID', () => {
      expect(document.activeElement).not.toEqual(childElement);

      agGridWrapperService.setFocusedElementById(parentElement, 'child');

      expect(document.activeElement).toEqual(childElement);
    });
  });

  describe('getFocusedElement', () => {
    it('should return the element that currently has focus', () => {
      parentElement.focus();

      expect(agGridWrapperService.getFocusedElement()).toEqual(parentElement);
    });
  });

  describe('focusOnFocusableChildren', () => {
    it('should move focus to the first focusable child if there is one', () => {
      parentElement.focus();

      agGridWrapperService.focusOnFocusableChildren(parentElement);

      expect(document.activeElement).toEqual(childElement);
    });

    it('should leave focus on the given element if it has no focusable children', () => {
      childElement.focus();

      agGridWrapperService.focusOnFocusableChildren(childElement);

      expect(document.activeElement).toEqual(childElement);
    });
  });
});
