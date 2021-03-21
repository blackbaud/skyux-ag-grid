import { NumericOptions } from '@skyux/core';
import { ICellRendererParams } from 'ag-grid-community';

export interface SkyCellRendererNumericParams extends ICellRendererParams {
  skyComponentProperties?: NumericOptions;
}
