import { SkyAffixer, SkyOverlayInstance } from '@skyux/core';

/**
 * Model for tracking the affixer and overlay of a row delete's inline delete.
 * @internal
 */
export interface SkyAgGridRowDeleteContents {
  affixer: SkyAffixer;
  overlay: SkyOverlayInstance;
}
