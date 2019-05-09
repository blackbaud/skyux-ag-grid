import {
  Component
} from '@angular/core';

import {
  ICellRendererAngularComp
} from 'ag-grid-angular';

import {
  RowNode
} from 'ag-grid-community';

@Component({
  selector: 'skyux-checkbox-cell',
  templateUrl: './skyux-checkbox-grid-cell.component.html',
  styleUrls: ['./skyux-checkbox-grid-cell.component.scss']
})
export class SkyuxCheckboxGridCellComponent implements ICellRendererAngularComp {
  private params: any;
  public checked: boolean;
  public rowNode: RowNode;

  public agInit(params: any): void {
    this.params = params;
    this.checked = this.params.value;
    this.rowNode = this.params.node;
  }

  public refresh(): boolean {
    return false;
  }
}
