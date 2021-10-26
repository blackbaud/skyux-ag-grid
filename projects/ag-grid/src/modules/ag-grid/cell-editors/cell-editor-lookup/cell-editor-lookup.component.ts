import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef
} from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { IPopupComponent } from 'ag-grid-community/dist/lib/interfaces/iPopupComponent';
import { SkyCellEditorLookupParams } from '../../types/cell-editor-lookup-params';
import { applySkyLookupPropertiesDefaults, SkyLookupProperties } from '../../types/lookup-properties';

@Component({
  selector: 'sky-ag-grid-cell-editor-lookup',
  templateUrl: './cell-editor-lookup.component.html',
  styleUrls: ['./cell-editor-lookup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyAgGridCellEditorLookupComponent extends NgControl implements ICellEditorAngularComp, IPopupComponent<any> {

  public currentSelection: any[];
  public skyComponentProperties?: SkyLookupProperties;
  public isAlive = true;

  private params: SkyCellEditorLookupParams;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {
    super();
  }

  public agInit(params: SkyCellEditorLookupParams): void {
    this.params = params;
    if (!Array.isArray(this.params.value)) {
      throw new Error(`Lookup value must be an array`);
    }
    this.currentSelection = this.params.value;
    this.skyComponentProperties = this.updateComponentProperties(this.params);
    this.changeDetector.markForCheck();
  }

  public get control(): AbstractControl | null {
    return null;
  }

  public isCancelAfterEnd(): boolean {
    // Shut down components to commit values before final value syncs to grid.
    this.isAlive = false;
    this.changeDetector.detectChanges();
    return false;
  }

  public getGui(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  public getValue(): any {
    return this.currentSelection;
  }

  public isPopup(): boolean {
    return true;
  }

  public viewToModelUpdate(newValue: any[]): void {
    this.currentSelection = newValue;
    this.changeDetector.markForCheck();
  }

  /*istanbul ignore next*/
  public afterGuiAttached(): void {
    this.elementRef.nativeElement.querySelector('.sky-lookup-input')?.focus();
  }

  private updateComponentProperties(params: SkyCellEditorLookupParams): SkyLookupProperties {
    const skyLookupProperties = params.skyComponentProperties;
    return applySkyLookupPropertiesDefaults(skyLookupProperties);
  }
}
