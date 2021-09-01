import { NumericOptions } from '@skyux/core';

export interface SkyComponentProperties extends NumericOptions {
  validator?: (value: any) => boolean;
  validatorMessage?: string | ((value: any) => string);
}
