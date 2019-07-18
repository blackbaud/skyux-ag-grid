import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';

import {
  ICellRendererAngularComp
} from 'ag-grid-angular';

import {
  RowNode,
  RowSelectedEvent
} from 'ag-grid-community';

import {
  ICellRendererParams
} from 'ag-grid-community';

@Component({
  selector: 'sky-cell-renderer-row-selector',
  templateUrl: './cell-renderer-row-selector.component.html',
  styleUrls: ['./cell-renderer-row-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyCellRendererRowSelectorComponent implements ICellRendererAngularComp {
  private params: ICellRendererParams;
  public checked: boolean;
  public rowNode: RowNode;

  constructor(private changeDetection: ChangeDetectorRef) {}

  public agInit(params: ICellRendererParams): void {
    this.params = params;
    this.checked = this.params.value;
    this.rowNode = this.params.node;

    this.rowNode.addEventListener(RowNode.EVENT_ROW_SELECTED, (event: RowSelectedEvent) => { this.rowSelectedListener(event); });
    this.rowNode.setSelected(this.checked);
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
