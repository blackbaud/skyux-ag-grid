import {
  ICellEditorParams
} from 'ag-grid-community';

export interface SkyCellEditorDatepickerParams extends ICellEditorParams {
  skyComponentProperties?: {
    dateFormat?: string;
    disabled?: boolean;
    maxDate?: Date;
    minDate?: Date;
    skyDatepickerNoValidate?: boolean;
    startingDay?: number;
  };
}
