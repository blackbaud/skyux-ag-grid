import {
  ICellRendererParams
} from 'ag-grid-community';

export interface SkyCellValidatorParams extends ICellRendererParams {
  validator?: (value: any) => boolean;
}
