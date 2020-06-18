export enum SkyCellType {
  /**
   * **Edit mode**
   * <br>
   * Specifies that cells in the column will be edited as
   * [SKY UX autocomplete components](https://developer.blackbaud.com/skyux/components/autocomplete).
   * You can set any of the autocomplete component's properties by passing them in the
   * [column definition's `cellEditorParams` property](https://www.ag-grid.com/javascript-grid-column-properties/).
   * These params can be updated as other cell edits are made or
   * [provided dynamically](https://www.ag-grid.com/javascript-grid-cell-editing/#dynamic-parameters)
   * based on other cell values. See the demo for an example. Text can be entered
   * and a value selected from the provided list.
   * <br>
   * <br>
   * **Read-only mode**
   * <br>
   * Specifies that cells the column will display the currently selected value's name property by default.
   * If the autocomplete needs to show a different property or needs to be formatted in any way,
   * you can [define a `valueFormatter`](https://www.ag-grid.com/javascript-grid-value-formatters/)
   * on the column definition.
   */
  Autocomplete = 'skyCellAutocomplete',
  /**
   * **Edit mode**
   * <br>
   * Specifies that cells in the column will be edited as
   * [SKY UX datepicker components](https://developer.blackbaud.com/skyux/components/datepicker).
   * You can set any of the datepicker component's properties by passing them in the
   * [column definition's `cellEditorParams` property](https://www.ag-grid.com/javascript-grid-column-properties/).
   * These params can be updated as other cell edits are made or
   * [provided dynamically](https://www.ag-grid.com/javascript-grid-cell-editing/#dynamic-parameters)
   * based on other cell values. See the demo for an example. Date values can be entered.
   * <br>
   * <br>
   * **Read-only mode**
   * <br>
   * Specifies that cells in the column will display the currently selected date formatted as `MM-DD-YYYY`,
   * or the date format of the locale passed to `getGridOptions()`. If you would like to overwrite this format,
   * you can [define a `valueFormatter`](https://www.ag-grid.com/javascript-grid-value-formatters/)
   * on the column definition. See the demo for an example.
   */
  Date = 'skyCellDate',
  /**
   * **Edit mode**
   * <br>
   * Specifies that cells in the column will be edited as HTML number `inputs`. Only numbers can be entered.
   * <br>
   * <br>
   * **Read-only mode**
   * <br>
   * Specifies that cells in the column will render as the number value.
   */
  Number = 'skyCellNumber',
  /**
   * **Edit mode**
   * <br>
   * Specifies that cells in the column will be edited as HTML text `inputs`. Any characters can be entered.
   * <br>
   * <br>
   * **Read-only mode**
   * <br>
   * Specifies cells in the column will render as their string value.
   */
  Text = 'skyCellText',
  /**
   * **Edit and read-only modes**
   * <br>
   * Specifies that cells in the column will render as
   * [SKY UX checkbox components](https://developer.blackbaud.com/skyux/components/checkbox).
   * It allows the user to select multiple rows, and adds a highlight to selected rows.
   * The [ag-Grid `rowNode`](https://www.ag-grid.com/javascript-grid-row-node/) will be updated
   * to reflect the selected state.
   */
  RowSelector = 'skyCellRowSelector'
}
