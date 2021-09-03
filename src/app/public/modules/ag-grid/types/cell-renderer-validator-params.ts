import { ICellRendererParams } from 'ag-grid-community';
import { SkyComponentProperties } from './sky-component-properties';

export interface SkyCellRendererValidatorParams extends ICellRendererParams {
  skyComponentProperties: SkyComponentProperties;
}
