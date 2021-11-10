export enum SkyCellType {
  /**
   * **Edit mode**
   * Specifies that cells in the column will be edited as {@link https://developer.blackbaud.com/skyux/components/autocomplete | SKY UX autocomplete components}. You can set any of the autocomplete component's properties by passing them in the {@link https://www.ag-grid.com/javascript-grid-column-properties/ | column definition's `cellEditorParams` property}. These params can be updated as other cell edits are made or {@link https://www.ag-grid.com/javascript-grid-cell-editing/#dynamic-parameters | provided dynamically} based on other cell values. See the demo for an example. Text can be entered and a value selected from the provided list.
   *
   * **Read-only mode**
   * Specifies that cells the column will display the currently selected value's name property by default. If the autocomplete needs to show a different property or needs to be formatted in any way, you can {@link https://www.ag-grid.com/javascript-grid-value-formatters/ | define a `valueFormatter`} on the column definition.
   */
  Autocomplete = 'skyCellAutocomplete',
  /**
   * **Edit mode**
   * Specifies that cells in the column will be edited as a currency amount.
   *
   * **Read-only mode**
   * Formats the display as currency using {@link https://developer.blackbaud.com/skyux/components/numeric | SKY UX numeric components}.
   */
  Currency = 'skyCellCurrency',
  /**
   * **Edit and read-only modes**
   * Combines `SkyCellType.Currency` and `SkyCellType.Validator`, where the value is displayed as a currency and passed to a validator function.
   */
  CurrencyValidator = 'skyCellCurrencyValidator',
  /**
   * **Edit mode**
   * Specifies that cells in the column will be edited as {@link https://developer.blackbaud.com/skyux/components/datepicker | SKY UX datepicker components}. You can set any of the datepicker component's properties by passing them in the {@link https://www.ag-grid.com/javascript-grid-column-properties/ | column definition's `cellEditorParams` property}. These params can be updated as other cell edits are made or {@link https://www.ag-grid.com/javascript-grid-cell-editing/#dynamic-parameters | provided dynamically} based on other cell values. See the demo for an example. Date values can be entered.
   *
   * **Read-only mode**
   * Specifies that cells in the column will display the currently selected date formatted as `MM-DD-YYYY`, or the date format of the locale passed to `getGridOptions()`. If you would like to overwrite this format, you can {@link https://www.ag-grid.com/javascript-grid-value-formatters/ | define a `valueFormatter`} on the column definition. See the demo for an example.
   */
  Date = 'skyCellDate',
  Lookup = 'skyCellLookup',
  /**
   * **Edit mode**
   * Specifies that cells in the column will be edited as HTML number `inputs`. Only numbers can be entered.
   *
   * **Read-only mode**
   * Specifies that cells in the column will render as the number value.
   */
  Number = 'skyCellNumber',
  /**
   * **Edit and read-only modes**
   * Combines `SkyCellType.Number` and `SkyCellType.Validator`, where the value is displayed as a number and passed to a validator function.
   */
  NumberValidator = 'skyCellNumberValidator',
  /**
   * **Edit and read-only modes**
   * Specifies that cells in the column will render as {@link https://developer.blackbaud.com/skyux/components/checkbox | SKY UX checkbox components}. It allows the user to select multiple rows, and adds a highlight to selected rows. The {@link https://www.ag-grid.com/javascript-grid-row-node/ | Ag Grid `rowNode`} will be updated to reflect the selected state.
   */
  RowSelector = 'skyCellRowSelector',
  /**
   * **Edit mode**
   * Specifies that cells in the column will be edited as HTML text `inputs`. Any characters can be entered.
   *
   * **Read-only mode**
   * Specifies cells in the column will render as their string value.
   */
  Text = 'skyCellText',


  /**
   * **Edit and read-only modes**
   * Specifies cell in the column will be passed to a validator function which flags erroneous entries. You can set the validator function and message by passing them to {@link https://www.ag-grid.com/javascript-grid-column-properties/ | column definition's `cellRendererParams` property} as `skyComponentProperties.validator` and `skyComponentProperties.validatorMessage`. `SkyCellType.Validator` can be combined with other cell types, such as `SkyCellType.Autocomplete` or `SkyCellType.Date`, by using the array syntax for the {@link https://www.ag-grid.com/javascript-grid-column-properties/ | column definition's `type` property}.
   */
  Validator = 'skyCellValidator'
}
