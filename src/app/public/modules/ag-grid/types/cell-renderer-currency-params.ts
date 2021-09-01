import {
  ICellRendererParams
} from 'ag-grid-community';

import {
  SkyComponentProperties
} from './sky-component-properties';

export interface SkyCellRendererCurrencyParams extends ICellRendererParams {
  skyComponentProperties?: SkyComponentProperties;
}
