import {
  ICellRendererParams
} from 'ag-grid-community';

import {
  SkyCurrencyProperties
} from './currency-properties';

export interface SkyCellRendererCurrencyParams extends ICellRendererParams {
  skyComponentProperties?: SkyCurrencyProperties;
}
