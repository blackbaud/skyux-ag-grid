import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { SkyCellRendererLookupParams } from '../../types/cell-renderer-lookup-params';
import { applySkyLookupPropertiesDefaults, SkyLookupProperties } from '../../types/lookup-properties';

@Component({
  selector: 'sky-cell-renderer-lookup',
  templateUrl: './cell-renderer-lookup.component.html',
  styleUrls: ['./cell-renderer-lookup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SkyAgGridCellRendererLookupComponent implements ICellRendererAngularComp {
  public value: string = '';
  private lookupProperties: SkyLookupProperties;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {
  }

  public agInit(params: SkyCellRendererLookupParams): void {
    this.lookupProperties = applySkyLookupPropertiesDefaults(params);
    this.value = (params.value || [])
      .map((value) => value[this.lookupProperties.descriptorProperty])
      .filter((value) => value !== '' && value !== undefined)
      .join(', ');
    this.changeDetector.markForCheck();
  }

  public refresh(params: SkyCellRendererLookupParams): boolean {
    this.agInit(params);
    return true;
  }
}
