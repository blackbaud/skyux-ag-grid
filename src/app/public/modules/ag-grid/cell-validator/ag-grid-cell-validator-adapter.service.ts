import {
  Injectable,
  Renderer2,
  RendererFactory2
} from '@angular/core';

/**
 * @internal
 */
@Injectable()
export class SkyAgGridCellValidatorAdapterService {
  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(undefined, undefined);
  }

  public removeValidatorClass(element: HTMLElement): void {
    this.renderer.removeClass(element, 'sky-ag-grid-cell-invalid');
  }

  public setValidatorClass(element: HTMLElement): void {
    this.renderer.addClass(element, 'sky-ag-grid-cell-invalid');
  }
}
