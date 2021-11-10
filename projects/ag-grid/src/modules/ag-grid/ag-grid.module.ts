import {
  CommonModule
} from '@angular/common';

import {
  NgModule
} from '@angular/core';

import {
  SkyViewkeeperModule
} from '@skyux/core';

import {
  AgGridModule
} from 'ag-grid-angular';

import {
  SkyDataManagerModule
} from '@skyux/data-manager';

import {
  SkyInlineDeleteModule
} from '@skyux/layout';

import {
  SkyAgGridWrapperComponent
} from './ag-grid-wrapper.component';

import {
  SkyAgGridCellEditorAutocompleteComponent
} from './cell-editors/cell-editor-autocomplete/cell-editor-autocomplete.component';

import {
  SkyAgGridCellEditorAutocompleteModule
} from './cell-editors/cell-editor-autocomplete/cell-editor-autocomplete.module';

import {
  SkyAgGridCellEditorDatepickerComponent
} from './cell-editors/cell-editor-datepicker/cell-editor-datepicker.component';

import {
  SkyAgGridCellEditorDatepickerModule
} from './cell-editors/cell-editor-datepicker/cell-editor-datepicker.module';

import {
  SkyAgGridCellEditorLookupModule
} from './cell-editors/cell-editor-lookup/cell-editor-lookup.module';

import {
  SkyAgGridCellEditorNumberComponent
} from './cell-editors/cell-editor-number/cell-editor-number.component';

import {
  SkyAgGridCellEditorNumberModule
} from './cell-editors/cell-editor-number/cell-editor-number.module';

import {
  SkyAgGridCellEditorTextComponent
} from './cell-editors/cell-editor-text/cell-editor-text.component';

import {
  SkyAgGridCellEditorTextModule
} from './cell-editors/cell-editor-text/cell-editor-text.module';

import {
  SkyAgGridCellRendererCurrencyValidatorComponent
} from './cell-renderers/cell-renderer-currency/cell-renderer-currency-validator.component';

import {
  SkyAgGridCellRendererLookupModule
} from './cell-renderers/cell-renderer-lookup/cell-renderer-lookup.module';

import {
  SkyAgGridCellRendererRowSelectorComponent
} from './cell-renderers/cell-renderer-row-selector/cell-renderer-row-selector.component';

import {
  SkyAgGridCellRendererRowSelectorModule
} from './cell-renderers/cell-renderer-row-selector/cell-renderer-row-selector.module';

import {
  SkyAgGridDataManagerAdapterDirective
} from './ag-grid-data-manager-adapter.directive';

import {
  SkyAgGridCellRendererCurrencyModule
} from './cell-renderers/cell-renderer-currency/cell-renderer-currency.module';

import {
  SkyAgGridCellRendererCurrencyComponent
} from './cell-renderers/cell-renderer-currency/cell-renderer-currency.component';

import {
  SkyAgGridRowDeleteComponent
} from './ag-grid-row-delete.component';

import {
  SkyAgGridRowDeleteDirective
} from './ag-grid-row-delete.directive';

import {
  SkyAgGridCellEditorCurrencyModule
} from './cell-editors/cell-editor-currency/cell-editor-currency.module';

import {
  SkyAgGridCellEditorCurrencyComponent
} from './cell-editors/cell-editor-currency/cell-editor-currency.component';

import {
  SkyAgGridCellRendererValidatorTooltipComponent
} from './cell-renderers/cell-renderer-validator-tooltip/cell-renderer-validator-tooltip.component';

import {
  SkyAgGridCellRendererValidatorTooltipModule
} from './cell-renderers/cell-renderer-validator-tooltip/cell-renderer-validator-tooltip.module';

import {
  SkyAgGridCellValidatorModule
} from './cell-validator/ag-grid-cell-validator.module';

/**
 * In addition to the `@skyux/ag-grid` package, you need to install the {@link https://www.ag-grid.com/angular-grid/ | `ag-grid-angular`} and {@link https://www.npmjs.com/package/ag-grid-community" | `ag-grid-community`} packages. After installation, you need to make any exports from `SkyAgGridModule` available to your SPA by adding the module to the `exports` section of your SPA's main module. For example, if you are using the SKY UX SDK, add `SkyAgGridModule` as an export in your `app-sky.module.ts` file. Next, in the `app-extras.module.ts` file, add `AgGridModule.withComponents([])` to the `imports` section and `AgGridModule` to the `exports` section. If you define your own cell editors or renderers, add them to the list passed to {@link https://www.ag-grid.com/angular-more-details/#angular-components" | `withComponents()`}.
 *
 * ***If you use the data entry grid with {@link https://www.ag-grid.com/documentation/angular/licensing/" | the enterprise version of AG Grid instead of the free community version}, the data entry grid turns on all enterprise features by default.***
 *
 * ## AG Grid styles
 *
 * To add the SKY UX styles for AG Grid to your SPA, include `"@skyux/ag-grid/css/sky-ag-grid.css"` in the `styles` section of your `skyuxconfig.json`. For editable grids, include the class `sky-ag-grid-editable` on the `ag-grid-angular` element.
 *
 * ## AG Grid wrapper component
 *
 * The `sky-ag-grid-wrapper` component provides WCAG-compliant keyboard navigation and sticky column headers for grids that use auto height. Use the `sky-ag-grid-wrapper`  component to wrap all instances of `ag-grid-angular`. The wrapper does not constrain standard AG Grid functionality.
 *
 * ## Data manager directive
 *
 * If you use a data entry grid within a {@link https://developer.blackbaud.com/skyux-data-manager/docs/data-manager" | data manager component}, the `skyAgGridDataManagerAdapter` directive can manage some standard interactions between the data entry grid and the data manager service. Add the directive should to the `sky-data-view` element that contains the data entry grid to intialize properties from the data state and keep the data entry grid in sync with the data state. When the data entry grid changes, the data state is updated, and when the data state changes, the data entry grid responds to the changes. The directive manages:
 *
 * - column visibility and order
 * - selected rows
 * - active sort state when selected by column header
 *
 * Other properties of the data state, such as filters and applying the sort, still need to be implemented for each use.
 *
 * ## Passing cell editor parameters
 *
 * You can pass inputs to the SKY UX components used in cell editors via the {@link https://www.ag-grid.com/javascript-grid-column-properties/" | column definition's `cellEditorParams` property}. The component properties are nested under `skyComponentProperties`. All component properties should be supported, and you can see the defined types by importing `SkyCellEditorDatepickerProperties` or `SkyCellEditorAutocompleteProperties`. `cellEditorParams` can also be a function that returns a param object for dynamic editing params. See the demo for examples of using an object or a function.
 *
 * ## Using other SKY UX components in columns
 *
 * For full control over a SKY UX component rendered in a cell, you can create your own {@link https://www.ag-grid.com/javascript-grid-cell-rendering-components/" | cell renderer} and place the component inside it. For example, to include a context menu in your grid, you create a cell renderer and place the context menu in the cell renderer. See the demo for an example.
 *
 */
@NgModule({
  declarations: [
    SkyAgGridDataManagerAdapterDirective,
    SkyAgGridRowDeleteComponent,
    SkyAgGridRowDeleteDirective,
    SkyAgGridWrapperComponent
  ],
  imports: [
    AgGridModule,
    CommonModule,
    SkyAgGridCellEditorAutocompleteModule,
    SkyAgGridCellEditorDatepickerModule,
    SkyAgGridCellEditorLookupModule,
    SkyAgGridCellEditorNumberModule,
    SkyAgGridCellEditorCurrencyModule,
    SkyAgGridCellRendererCurrencyModule,
    SkyAgGridCellRendererLookupModule,
    SkyAgGridCellRendererRowSelectorModule,
    SkyAgGridCellRendererValidatorTooltipModule,
    SkyAgGridCellValidatorModule,
    SkyAgGridCellEditorTextModule,
    SkyDataManagerModule,
    SkyInlineDeleteModule,
    SkyViewkeeperModule
  ],
  exports: [
    SkyAgGridDataManagerAdapterDirective,
    SkyAgGridRowDeleteComponent,
    SkyAgGridRowDeleteDirective,
    SkyAgGridWrapperComponent
  ],
  entryComponents: [
    SkyAgGridCellEditorAutocompleteComponent,
    SkyAgGridCellEditorDatepickerComponent,
    SkyAgGridCellEditorNumberComponent,
    SkyAgGridCellEditorCurrencyComponent,
    SkyAgGridCellRendererCurrencyComponent,
    SkyAgGridCellRendererCurrencyValidatorComponent,
    SkyAgGridCellRendererRowSelectorComponent,
    SkyAgGridCellRendererValidatorTooltipComponent,
    SkyAgGridCellEditorTextComponent,
    SkyAgGridRowDeleteComponent
  ]
})
export class SkyAgGridModule { }
