import {
  AfterContentInit,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewContainerRef
} from '@angular/core';

import {
  SkyAffixAutoFitContext,
  SkyAffixService,
  SkyOverlayService
} from '@skyux/core';

import {
  AgGridAngular
} from 'ag-grid-angular';

import {
  RowNode
} from 'ag-grid-community';

import {
  Subject
} from 'rxjs';

import {
  takeUntil
} from 'rxjs/operators';

import {
  SkyAgGridRowDeleteComponent
} from './ag-grid-row-delete.component';

import {
  SkyAgGridRowDeleteCancelArgs
} from './types/ag-grid-row-delete-cancel-args';

import {
  SkyAgGridRowDeleteConfig
} from './types/ag-gird-row-delete-config';

import {
  SkyAgGridRowDeleteConfirmArgs
} from './types/ag-grid-row-delete-confirm-args';

import {
  SkyAgGridRowDeleteContents
} from './types/ag-grid-row-delete-contents';

@Directive({
  selector: '[skyAgGridRowDelete]'
})
export class SkyAgGridRowDeleteDirective implements AfterContentInit, OnDestroy {

  /**
   * Specifies the ids of the data in the rows on which inline delete's should be shown.
   */
  @Input()
  set rowDeleteIds(value: string[]) {
    this._rowDeleteIds = value;

    if (!value) {
      for (let config of this.rowDeleteConfigs) {
        this.destroyRowDelete(config.id);
      }

      this.changeDetector.markForCheck();

      return;
    }

    for (let id of value) {
      const existingConfig = this.rowDeleteConfigs
        .find(config => config.id === id);
      if (existingConfig) {
        existingConfig.pending = false;
      } else {
        this.rowDeleteConfigs.push({
          id: id,
          pending: false
        });

        let overlay = this.overlayService.create({
          enableScroll: true,
          showBackdrop: false,
          closeOnNavigation: true,
          enableClose: false,
          enablePointerEvents: true
        });

        overlay.attachTemplate(this.rowDeleteComponent.inlineDeleteTemplateRef,
          {
            $implicit: this.agGrid.api.getRowNode(id),
            tableWidth: () => { return this.tableWidth; },
            getRowDeleteItem: (row: RowNode) => { return this.getRowDeleteItem(row); },
            cancelRowDelete: (row: RowNode) => { return this.cancelRowDelete(row); },
            confirmRowDelete: (row: RowNode) => { this.confirmRowDelete(row); }
          });

        /**
         * We are manually setting the z-index here because overlays will always be on top of
         * the omnibar. This manual setting is 1 less than the omnibar's z-index of 1000. We
         * discussed changing the overlay service to allow for this but decided against that
         * change at this time due to its niche nature.
         */
        overlay.componentRef.instance.zIndex = '998';

        setTimeout(() => {
          const inlineDeleteRef = this.rowDeleteComponent.inlineDeleteRefs.toArray()
            .find(elRef => {
              return elRef.nativeElement.id === 'row-delete-ref-' + id;
            });
          let affixer = this.affixService.createAffixer(inlineDeleteRef);

          const rowElement: HTMLElement = this.elementRef.nativeElement.querySelector('[row-id="' + id + '"] div[aria-colindex="1"]');

          affixer.affixTo(rowElement, {
            autoFitContext: SkyAffixAutoFitContext.Viewport,
            isSticky: true,
            placement: 'above',
            verticalAlignment: 'top',
            horizontalAlignment: 'left',
            enableAutoFit: false
          });

          this.rowDeleteContents[id] = {
            affixer: affixer,
            overlay: overlay
          };
        });
      }
    }

    for (let config of this.rowDeleteConfigs) {
      if (value.indexOf(config.id) < 0) {
        this.destroyRowDelete(config.id);
      }
    }

    this.changeDetector.markForCheck();
  }

  get rowDeleteIds(): string[] {
    return this._rowDeleteIds;
  }

  /**
   * Emits a `SkyAgGridRowDeleteCancelArgs` object when a row's inline delete is cancelled.
   */
  @Output()
  public rowDeleteCancel = new EventEmitter<SkyAgGridRowDeleteCancelArgs>();

  /**
   * Emits a `SkyAgGridRowDeleteConfirmArgs` object when a row's inline delete is confirmed.
   */
  @Output()
  public rowDeleteConfirm = new EventEmitter<SkyAgGridRowDeleteConfirmArgs>();

  /**
   * Emits when the list of ids of the data in the rows where inline delete's are shown changes.
   */
  @Output()
  public rowDeleteIdsChange = new EventEmitter<string[]>();

  public rowDeleteConfigs: SkyAgGridRowDeleteConfig[] = [];

  public get tableWidth() {
    return this.elementRef.nativeElement.querySelectorAll('.sky-ag-grid')[0].offsetWidth;
  }

  @ContentChild(AgGridAngular)
  public agGrid: AgGridAngular;

  private ngUnsubscribe = new Subject();
  private rowDeleteComponent: SkyAgGridRowDeleteComponent;
  private rowDeleteContents: { [id: string]: SkyAgGridRowDeleteContents } = {};

  private _rowDeleteIds: string[];

  constructor(
    private affixService: SkyAffixService,
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef,
    private resolver: ComponentFactoryResolver,
    private overlayService: SkyOverlayService,
    private viewContainerRef: ViewContainerRef
  ) { }

  public ngAfterContentInit(): void {
    const factory = this.resolver.resolveComponentFactory(SkyAgGridRowDeleteComponent);
    this.rowDeleteComponent = this.viewContainerRef.createComponent(factory).instance;
    this.agGrid.rowDataChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.rowDeleteConfigs.forEach((config: SkyAgGridRowDeleteConfig) => {
          if (!this.agGrid.api.getRowNode(config.id)) {
            this.destroyRowDelete(config.id);
          } else {
            // We must reaffix things when the data changes because the rows rerender and the previous eleement that the delete was affixed
            // to is destroyed.
            const rowElement: HTMLElement = this.elementRef.nativeElement.querySelector('[row-id="' + config.id + '"] div[aria-colindex="1"]');

            this.rowDeleteContents[config.id].affixer.affixTo(rowElement, {
              autoFitContext: SkyAffixAutoFitContext.Viewport,
              isSticky: true,
              placement: 'above',
              verticalAlignment: 'top',
              horizontalAlignment: 'left',
              enableAutoFit: false
            });
          }
        });
        this.changeDetector.markForCheck();
      });

    this.agGrid.getRowNodeId = (data: any) => {
      return data.id.toString();
    };
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();

    Object.keys(this.rowDeleteContents).forEach(id => {
      this.destroyRowDelete(id);
    });
  }

  public cancelRowDelete(row: RowNode): void {
    this.rowDeleteConfigs = this.rowDeleteConfigs.filter(config => config.id !== row.id);
    this.rowDeleteCancel.emit({ id: row.id });

    this.destroyRowDelete(row.id);
  }

  public confirmRowDelete(row: RowNode): void {
    this.rowDeleteConfigs.find(config => config.id === row.id).pending = true;
    this.rowDeleteConfirm.emit({ id: row.id });
  }

  public getRowDeleteItem(row: RowNode): SkyAgGridRowDeleteConfig {
    return this.rowDeleteConfigs.find(rowDelete => rowDelete.id === row.id);
  }

  private destroyRowDelete(id: string): void {
    const rowDeleteContents = this.rowDeleteContents[id];

    /* sanity check */
    /* istanbul ignore else */
    if (rowDeleteContents) {
      rowDeleteContents.affixer.destroy();
      this.overlayService.close(rowDeleteContents.overlay);
      delete this.rowDeleteContents[id];
      this.rowDeleteConfigs = this.rowDeleteConfigs.filter(config => config.id !== id);
      this._rowDeleteIds = this.rowDeleteIds?.filter(arrayId => arrayId !== id);
      this.rowDeleteIdsChange.emit(this._rowDeleteIds);
    }
  }

}
