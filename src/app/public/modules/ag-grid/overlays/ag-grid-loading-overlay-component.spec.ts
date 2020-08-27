import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@skyux-sdk/testing';

import { SkyAgGridLoadingOverlayComponent } from './ag-grid-loading-overlay.component';
import { SkyWaitModule } from '@skyux/indicators';

describe('AgGridLoadingOverlay', () => {
  let gridLoadingOverlayFixture: ComponentFixture<SkyAgGridLoadingOverlayComponent>;
  let gridLoadingOverlayComponent: SkyAgGridLoadingOverlayComponent;
  let gridLoadingOverlayNativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SkyWaitModule
      ],
      providers: [

      ],
      declarations: [
        SkyAgGridLoadingOverlayComponent
      ]
    });
    gridLoadingOverlayFixture = TestBed.createComponent(SkyAgGridLoadingOverlayComponent);
    gridLoadingOverlayNativeElement = gridLoadingOverlayFixture.nativeElement;
    gridLoadingOverlayComponent = gridLoadingOverlayFixture.componentInstance;
  });
  afterEach(() => {
    gridLoadingOverlayFixture.destroy();
  });

  it('renders a wait element', () => {
    gridLoadingOverlayFixture.detectChanges();
    const element = gridLoadingOverlayNativeElement.querySelector('.sky-wait');
    expect(element).toBeVisible();
  });

});
