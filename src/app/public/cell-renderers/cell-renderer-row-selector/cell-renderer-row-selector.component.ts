import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

import {
  ICellRendererAngularComp
} from 'ag-grid-angular';

import {
  RowNode
} from 'ag-grid-community';

@Component({
  selector: 'sky-cell-renderer-row-selector',
  templateUrl: './cell-renderer-row-selector.component.html',
  styleUrls: ['./cell-renderer-row-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyCellRendererRowSelectorComponent implements ICellRendererAngularComp {
  private params: any;
  public checked: boolean;
  public rowNode: RowNode;

  public agInit(params: any): void {
    this.params = params;
    this.checked = this.params.value;
    this.rowNode = this.params.node;
  }

  public updateRow() {
    this.rowNode.setSelected(this.checked);
  }

  public refresh(): boolean {
    return false;
  }
}
