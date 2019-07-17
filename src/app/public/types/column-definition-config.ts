import {
  SkyCellEditorType
} from './cell-editor-type';

import {
  SkyCellRendererType
} from './cell-renderer-type';

export interface SkyColumnDefinitionConfig {
  cellEditorType?: SkyCellEditorType;
  cellRendererType?: SkyCellRendererType;
}
