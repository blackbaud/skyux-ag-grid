import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';

import {
  SkyLibResourcesService
} from '@skyux/i18n';

import {
  ICellRendererAngularComp
} from 'ag-grid-angular';

import {
  ICellRendererParams,
  RowNode,
  RowSelectedEvent
} from 'ag-grid-community';

@Component({
  selector: 'sky-cell-renderer-row-selector',
  templateUrl: './cell-renderer-row-selector.component.html',
  styleUrls: ['./cell-renderer-row-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyCellRendererRowSelectorComponent implements ICellRendererAngularComp, OnInit {
  public checked: boolean;
  public rowNode: RowNode;
  public checkboxLabel: string;
  private params: ICellRendererParams;
  private rowNumber: number;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private libResources: SkyLibResourcesService
    ) { }

  public agInit(params: ICellRendererParams): void {
    this.params = params;
    this.checked = this.params.value;
    this.rowNode = this.params.node;
    this.rowNumber = this.params.rowIndex + 1;

    this.rowNode.addEventListener(RowNode.EVENT_ROW_SELECTED, (event: RowSelectedEvent) => { this.rowSelectedListener(event); });
    this.rowNode.setSelected(this.checked);
  }

  public ngOnInit(): void {
    this.libResources.getString('sky_ag_grid_row_selector_aria_label', this.rowNumber)
    .subscribe(label => {
      this.checkboxLabel = label;
    });
  }

  public refresh(): boolean {
    return false;
  }

  public updateRow() {
    this.rowNode.setSelected(this.checked);
  }

  private rowSelectedListener(event: RowSelectedEvent) {
    this.checked = event.node.isSelected();
    this.changeDetection.markForCheck();
  }
}
