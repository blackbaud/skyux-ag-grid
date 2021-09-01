import { Column, GridApi } from 'ag-grid-community';
import { SkyComponentProperties } from './sky-component-properties';

export interface SkyCellRendererValidatorParams {
  value: any;
  api: GridApi;
  column: Column;
  eGridCell: HTMLElement;
  rowIndex: number;
  skyComponentProperties: SkyComponentProperties;
}
