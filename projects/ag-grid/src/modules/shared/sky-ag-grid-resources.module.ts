/**
 * NOTICE: DO NOT MODIFY THIS FILE!
 * The contents of this file were automatically generated by
 * the 'ng generate @skyux/i18n:lib-resources-module modules/shared/sky-ag-grid' schematic.
 * To update this file, simply rerun the command.
 */

import { NgModule } from '@angular/core';
import {
  getLibStringForLocale,
  SkyAppLocaleInfo,
  SkyI18nModule,
  SkyLibResources,
  SkyLibResourcesProvider,
  SKY_LIB_RESOURCES_PROVIDERS
} from '@skyux/i18n';

const RESOURCES: { [locale: string]: SkyLibResources } = {
  'EN-US': {"sky_ag_grid_row_selector_aria_label":{"message":"Row selector for row {0}"},"sky_ag_grid_cell_editor_number_aria_label":{"message":"Editable number {0} for row {1}"},"sky_ag_grid_cell_editor_text_aria_label":{"message":"Editable text {0} for row {1}"},"sky_ag_grid_cell_editor_autocomplete_aria_label":{"message":"Editable autocomplete {0} for row {1}"},"sky_ag_grid_cell_renderer_currency_aria_label":{"message":"Editable currency {0} for row {1}"}},
};

export class SkyAgGridResourcesProvider implements SkyLibResourcesProvider {
  public getString(localeInfo: SkyAppLocaleInfo, name: string): string {
    return getLibStringForLocale(RESOURCES, localeInfo.locale, name);
  }
}

/**
 * Import into any component library module that needs to use resource strings.
 */
@NgModule({
  exports: [SkyI18nModule],
  providers: [{
    provide: SKY_LIB_RESOURCES_PROVIDERS,
    useClass: SkyAgGridResourcesProvider,
    multi: true
  }]
})
export class SkyAgGridResourcesModule { }
