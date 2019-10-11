import {
  TemplateRef
} from '@angular/core';

import {
  ICellEditorParams
} from 'ag-grid-community';

export interface SkyCellEditorAutocompleteParams extends ICellEditorParams {
  skyComponentProperties?: {
    data?: any[];
    debounceTime?: number;
    descriptorProperty?: string;
    propertiesToSearch?: string[];
    search?: (searchText: string, data?: any[]) => any[] | Promise<any[]>;
    searchFilters?: (searchText: string, item: any) => boolean;
    searchResultsLimit?: number;
    searchResultTemplate?: TemplateRef<any>;
    searchTextMinimumCharacters?: number;
    selectionChange?: Function;
  };
}
