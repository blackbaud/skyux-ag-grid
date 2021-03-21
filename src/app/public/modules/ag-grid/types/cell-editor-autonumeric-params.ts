import { SkyAutonumericOptions } from '@skyux/autonumeric';
import { ICellEditorParams } from 'ag-grid-community';

export interface SkyCellEditorAutonumericParams extends ICellEditorParams {
  skyComponentProperties?: SkyAutonumericOptions;
}
